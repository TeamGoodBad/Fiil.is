import { MMKVInstance, MMKVLoader } from "react-native-mmkv-storage";

const ENTRIES_INDEX_KEY = "entriesIndex";
const ENTRY_KEY = "entry";
export const CURRENT_TEXT_KEY = "currentText";
export const CURRENT_RATING_KEY = "currentRating";
export const CURRENT_EDITING_STARTED = "currentEditingStarted";
const SCHEMA_VERSION_KEY = "schema";
const MONTH_INDEX_KEY = "month";

const dateToKey = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const dateToEntryKey = (date: Date) => `${ENTRY_KEY}.${dateToKey(date)}`;
const dateToMonthIndexKey = (date: Date) => `${MONTH_INDEX_KEY}.${date.getFullYear()}-${date.getMonth() + 1}`
const entryKeyToMonthIndexKey = (entryKey: string) => {
    const exploded = entryKey.split(":");
    if (exploded.length != 2) console.error("Entry key is not of correct form!");
    const date = exploded[1];
    let explodedDate = date.split("-");
    if (explodedDate.length != 3) console.error("Entry key is not of correct form!");
    explodedDate.pop();
    return explodedDate.join("-");
}

export const UserDB: MMKVInstance = new MMKVLoader()
    .withEncryption()
    .withInstanceID("userdata")
    .initialize();

// Upgrade database schema if required
{
    const version = UserDB.getInt(SCHEMA_VERSION_KEY);
    switch (version) {
        case null: // Schema version prior to 1 did not contain version information
            // Upgrade from v0 to v1
            console.log("Upgrading db to v1");

            // Build month indexes
            for (const entryKey of UserDB.getArray(ENTRIES_INDEX_KEY) as string[]) {
                const monthIndexKey = entryKeyToMonthIndexKey(entryKey);
                let monthIndex = UserDB.getArray(monthIndexKey);
                if (monthIndex == null) monthIndex = [];
                if (!monthIndex.includes(entryKey)) monthIndex.push(entryKey);
                UserDB.setArray(monthIndexKey, monthIndex);    
            }
    }

    // Bump schema version
    UserDB.setInt(SCHEMA_VERSION_KEY, 1);
}


interface Entry {
    rating: number,
    text: string,
    date: Date,
}


export const EMPTY_ENTRY: Entry = {
    rating: -1,
    text: "",
    date: new Date(0),
}


/**
 * @returns the whole database in JSON format
 */
export const dump: () => Promise<string> = async () => {
    const object: any = {};

    await Promise.all([
        // Add all string values
        Promise.all((await UserDB.indexer.strings.getAll() as [string, string][])
            .map(async (field: [string, string]) => object[field[0]] = field[1])),

        // all number values
        Promise.all((await UserDB.indexer.numbers.getAll() as [string, number][])
            .map(async (field: [string, number]) => object[field[0]] = field[1])),

        // objects
        Promise.all((await UserDB.indexer.maps.getAll() as [string, any][])
            .map(async (field: [string, any]) => object[field[0]] = field[1])),

        // and indexes
        Promise.all((await UserDB.indexer.arrays.getAll() as [string, string[]][])
            .map(async (field: [string, string[]]) => object[field[0]] = field[1])),
    ]);

    return JSON.stringify(object);
}


/**
 * Adds entry to db. Entry must be an object in form of:
 * {rating: integer, text: string}.
 * @param {Entry} entry
 */
export const setEntry = async (entry: Entry) => {
    // Add to db
    const entryKey = dateToEntryKey(entry.date);
    await UserDB.setMapAsync(entryKey, entry);

    // Update entry index
    let index = await UserDB.getArrayAsync(ENTRIES_INDEX_KEY);
    if (index == null) index = [];
    if (!index.includes(entryKey)) index.push(entryKey);
    await UserDB.setArrayAsync(ENTRIES_INDEX_KEY, index);

    // Update month index
    const monthIndexKey = dateToMonthIndexKey(entry.date);
    let monthIndex = await UserDB.getArrayAsync(monthIndexKey);
    if (monthIndex == null) monthIndex = [];
    if (!monthIndex.includes(entryKey)) monthIndex.push(entryKey);
    await UserDB.setArrayAsync(monthIndexKey, monthIndex);    
}


/**
 * Retrieves entry from db by spesific date
 * @param {Date} date with time of day ignored
 * @returns {Entry} or `null` if not found
 */
export const getEntry = async (date: Date): Promise<Entry | null | undefined> => {
    const key = dateToEntryKey(date);
    return await UserDB.getMapAsync(key);
}


/**
 * Clears all user data
 */
export const clearUserDB = () => UserDB.clearStore();


interface EntryFilter {
    minDate?: Date,
    maxDate?: Date,
    minRating?: number,
    maxRating?: number,
    containsText?: string,
    containsWords?: string[],
}


/**
 * Returns all entries from db with given filtering options applied
 * @param {EntryFilter} [filter] filtering rules
 * @returns {Promise<Entry[]>} Array of matching entries
 * @example
 * // Returns all entries in db
 * await getEntries();
 * // Returns all entries with minimum rating of 4 from or after 12.3.2023
 * await getEntries({ minRating: 4, minDate: new Date(2023, 3, 12)});
 */
export const getEntries = async (filter: EntryFilter = {}): Promise<Entry[]> => {
    // Get list of all entry keys in db
    let index = await UserDB.getArrayAsync(ENTRIES_INDEX_KEY) as string[];
    if (index == null) index = [];

    // Retrieve all entries in db
    // TODO: Optimize with saving month indexes
    let entries: Entry[] = await Promise.all(index.map(async (key: string) => {
        let entry = await UserDB.getMapAsync<Entry | undefined | null>(key);
        if (!entry) entry = EMPTY_ENTRY;

        // Turn date string into date object
        entry.date = new Date(entry.date);
        return entry;
    }));


    // Apply filters
    
    if (filter.minDate) {
        // Don't take time of day into consideration
        const f = filter.minDate!;
        const date = new Date(f.getFullYear(), f.getMonth(), f.getDate());
        entries = entries.filter((entry) => entry.date.getTime() >= date.getTime());
    }

    if (filter.maxDate) {
        // Same as above
        const f = filter.maxDate!;
        const date = new Date(f.getFullYear(), f.getMonth(), f.getDate() + 1);
        entries = entries.filter((entry) => entry.date.getTime() < date.getTime());
    }

    if (filter.minRating) {
        entries = entries.filter((entry) => entry.rating >= filter.minRating!);
    }

    if (filter.maxRating) {
        entries = entries.filter((entry) => entry.rating <= filter.maxRating!)
    }

    if (filter.containsText) {
        entries = entries.filter((entry) =>
            entry.text.toLocaleLowerCase().includes(filter.containsText!.toLocaleLowerCase()));
    }

    if (filter.containsWords) {
        // TODO: Optimize with word indexes
        entries = entries.filter((entry) => {
            const entryWords: string[] = entry.text
                // Split to words by new lines and spaces
                .split("\n")
                .flatMap(a => a.split(" "))
                // and convert to lowercase
                .map(a => a.toLocaleLowerCase());
            const filterWords: string[] = filter.containsWords!.map(a => a.toLocaleLowerCase());

            // Filter entry out if any of the words was not found in entry
            for (const word of filterWords) {
                if (!entryWords.includes(word)) return false;
            }
            return true;
        });
    }

    return entries;
}
