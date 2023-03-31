import { MMKVInstance, MMKVLoader } from "react-native-mmkv-storage";

const ENTRIES_INDEX_KEY = "entriesIndex";
const ENTRY_KEY = "entry";
export const CURRENT_TEXT_KEY = "currentText";
export const CURRENT_RATING_KEY = "currentRating";
export const CURRENT_EDITING_STARTED = "currentEditingStarted";
const SCHEMA_VERSION_KEY = "schema";
const MONTH_INDEX_KEY = "month";
const MONTH_INDEXES_KEY = "monthIndex"; // Index of all month indexes
const RATING_INDEX_KEY = "rating";
const WORD_INDEX_KEY = "word";
const WORD_INDEXES_KEY = "wordIndex"; // Index of all word indexes
/** Current schema version */
const SCHEMA_VERSION = 2;
/** Worst possible rating */
const MIN_RATING = -1;
/** Best possible rating */
const MAX_RATING = 4;


const dateToKey = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const dateToEntryKey = (date: Date) => `${ENTRY_KEY}.${dateToKey(date)}`;
const dateToMonthIndexKey = (date: Date) => `${MONTH_INDEX_KEY}.${date.getFullYear()}-${date.getMonth() + 1}`
const entryKeyToMonthIndexKey = (entryKey: string) => {
    let exploded = entryKey.match(/\d+/g);
    if (!exploded || exploded.length != 3) {
        console.error(`Entry key is not of correct form: ${entryKey}`);
        return "error";
    }
    exploded.pop();
    return MONTH_INDEX_KEY + "." + exploded.join("-");
}
const ratingToRatingIndexKey = (rating: number) => `${RATING_INDEX_KEY}.${rating}`;
const wordToWordIndexKey = (word: string) => `${WORD_INDEX_KEY}.${word}`;


export const UserDB: MMKVInstance = new MMKVLoader()
    .withEncryption()
    .withInstanceID("userdata")
    .initialize();


/** Represents one diary entry. */
interface Entry {
    rating: number,
    text: string,
    date: Date,
}


/** A dummy entry. */
export const EMPTY_ENTRY: Entry = {
    rating: -1,
    text: "",
    date: new Date(0),
}


/**
 * @param includeIndexes Should the dump contain index data?
 * @returns the whole database in JSON format.
 */
export const dump: (includeIndexes?: boolean) => Promise<string> = async (includeIndexes = true) => {
    const object: any = {};

    await Promise.all([
        // Add all string values
        Promise.all((await UserDB.indexer.strings.getAll() as [string, string][])
            .map(async (field: [string, string]) => object[field[0]] = field[1])),

        // number values
        Promise.all((await UserDB.indexer.numbers.getAll() as [string, number][])
            .map(async (field: [string, number]) => object[field[0]] = field[1])),

        // objects
        Promise.all((await UserDB.indexer.maps.getAll() as [string, any][])
            .map(async (field: [string, any]) => object[field[0]] = field[1])),

        // and optionally indexes
        Promise.all(!includeIndexes && [] || (await UserDB.indexer.arrays.getAll() as [string, string[]][])
            .map(async (field: [string, string[]]) => object[field[0]] = field[1])),
    ]); 

    return JSON.stringify(object);
}


/**
 * Loads data to database from JSON dump.
 * @param json Data to be loaded in JSON format.
 */
export const load: (json: string) => Promise<void> = async (json) => {
    const data = JSON.parse(json);

    // Add all entries to db
    for (const key in data.keys) {
        if (key.startsWith(ENTRY_KEY)) {
            let entry: Entry = data[key];
            entry.date = new Date(entry.date);
            setEntry(entry);
        }
    }

    // The indexes will update automatically via `setEntry(...)`
}


/** Splits text to individual words in lowercase. */
const splitToWords = (text: string): string[] => text
    .toLocaleLowerCase()
    .split("\n") // Split string by newlines
    .flatMap(a => a.split(" ")) // ...and spaces
    .map(a => a.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')) // Filter out special characters
    .filter(a => a != ""); // Remove empty "words"


/**
 * Adds entry to db.
 * @param {Entry} entry
 */
export const setEntry = async (entry: Entry) => {
    // Remove entry first if it is already saved
    await removeEntry(entry.date);

    // Add to db
    const entryKey = dateToEntryKey(entry.date);
    await UserDB.setMapAsync(entryKey, entry);

    // Update entry index
    await pushToIndex(ENTRIES_INDEX_KEY, entryKey);

    // Update month index
    const monthIndexKey = dateToMonthIndexKey(entry.date);
    await pushToIndex(monthIndexKey, entryKey);

    // Update index of month indexes
    await pushToIndex(MONTH_INDEXES_KEY, monthIndexKey);

    // Update rating indexes
    const ratingIndexKey = ratingToRatingIndexKey(entry.rating);
    await pushToIndex(ratingIndexKey, entryKey);

    // Update indexes for all individual words
    await Promise.all(splitToWords(entry.text).map(async (word) => {
        const wordIndexKey = wordToWordIndexKey(word);
        // Word indexes
        await pushToIndex(wordIndexKey, entryKey);
        // Index of word indexes
        await pushToIndex(WORD_INDEXES_KEY, wordIndexKey);
    }));
}


/**
 * Removes entry from db.
 * @param date entry date to be cleared
 */
export const removeEntry = async (date: Date) => {
    const entry = await getEntry(date);
    if (!entry) return;
    const entryKey = dateToEntryKey(entry.date);

    // Remove from entry index
    await removeFromIndex(ENTRIES_INDEX_KEY, entryKey);

    // Remove from month index
    const monthIndexKey = dateToMonthIndexKey(entry.date);
    await removeFromIndex(monthIndexKey, entryKey);

    // Remove month from index of month indexes if month is empty
    UserDB.getArrayAsync(monthIndexKey).then(async (index) => {
        if (index == null || index?.length == 0) {
            await removeFromIndex(MONTH_INDEXES_KEY, monthIndexKey);
        }
    });

    // Remove from rating indexes
    const ratingIndexKey = ratingToRatingIndexKey(entry.rating);
    await removeFromIndex(ratingIndexKey, entryKey);

    // Remove from word indexes
    await Promise.all(splitToWords(entry.text).map(async (word) => {
        const wordIndexKey = wordToWordIndexKey(word);
        // Word indexes
        await removeFromIndex(wordIndexKey, entryKey);
        // Remove word index from index of word indexes if word index is empty
        UserDB.getArrayAsync(wordIndexKey).then(async (index) => {
            if (index == null || index?.length == 0) {
                await removeFromIndex(WORD_INDEXES_KEY, wordIndexKey);
            }
        });
    }));

    // Remove entry
    UserDB.removeItem(entryKey);
}


/** Pushes string data to index. */
const pushToIndex = async (indexKey: string, data: string): Promise<void> => {
    let index = await UserDB.getArrayAsync(indexKey);
    if (index == null) index = [];
    if (!index.includes(data)) index.push(data);
    await UserDB.setArrayAsync(indexKey, index);
}


/** Removes string data from index. */
const removeFromIndex = async (indexKey: string, data: string): Promise<void> => {
    const index: string[] | null | undefined = await UserDB.getArrayAsync(indexKey);
    if (!index) return;
    const filtered = index.filter(a => a != data);

    // Remove index from db if it would otherwise be empty
    if (filtered.length == 0) {
        UserDB.removeItem(indexKey);
        return;
    }

    await UserDB.setArrayAsync(indexKey, filtered);
}


/**
 * Retrieves entry from db by specific date.
 * @param {Date} date with time of day ignored
 * @returns {Entry} or `null` if not found
 */
export const getEntry = async (date: Date): Promise<Entry | null> => {
    const key = dateToEntryKey(date);
    let entry: Entry | null | undefined = await UserDB.getMapAsync(key);
    if (!entry) return null;
    entry.date = new Date(entry.date); // Date string to date object conversion
    return entry;
}


/**
 * Clears all user data.
 */
export const clearUserDB = () => UserDB.clearStore();


/** Represents a search query for entries. Used as an argument for `getEntries(...)`. */
interface EntryFilter {
    minDate?: Date,
    maxDate?: Date,
    minRating?: number,
    maxRating?: number,
    containsText?: string,
    containsWords?: string[],
}


/**
 * Returns all entries from db with given filtering options applied.
 * @param {EntryFilter} [filter] filtering rules
 * @returns {Promise<Entry[]>} Array of matching entries
 * @example
 * // Returns all entries in db
 * await getEntries();
 * // Returns all entries with minimum rating of 4 from or after 12.3.2023
 * await getEntries({ minRating: 4, minDate: new Date(2023, 3, 12)});
 */
export const getEntries = async (filter: EntryFilter = {}): Promise<Entry[]> => {
    let keys: string[] = [];

    // Go from most advantageous optimization to least advantageous, because only one can be applied
    // at once. If no optimizations can be utilized, just get all entries.

    // Optimize with word indexes
    if (filter.containsWords) {
        const words = filter.containsWords!;
        keys = [...new Set( // Convert array to set and back to array in order to eliminate duplicates
            (await Promise.all(
                words.map(async (word: string) => {

                    // Get keys for entries containing word from db
                    const lowerCaseWord = word.toLocaleLowerCase();
                    const entiresWithWord: string[] | null | undefined = 
                        await UserDB.getArrayAsync(wordToWordIndexKey(lowerCaseWord));

                    // And push them to keys
                    if (!entiresWithWord) return [];
                    return entiresWithWord;
                })
            )).flat()
        )];
    }

    // Optimize with month indexes
    else if (filter.minDate || filter.maxDate) {
        const monthIndexes: string[] = await UserDB.getArrayAsync(MONTH_INDEXES_KEY) || [];
        for (const monthKey of monthIndexes) {

            // Get year and month from month index key
            const exploded = monthKey.match(/\d+/g);
            if (!exploded || exploded.length != 2) return [];
            const [year, month] = exploded.map(str => Number(str));
            
            // Don't proceed if the month is not in range
            if (filter.minDate) {
                if (year == filter.minDate.getFullYear()) {
                    if (month < filter.minDate.getMonth() + 1) continue;
                }
                else if (year < filter.minDate.getFullYear()) continue;
            }
            if (filter.maxDate) {
                if (year == filter.maxDate.getFullYear()) {
                    if (month > filter.maxDate.getMonth() + 1) continue;
                }
                else if (year > filter.maxDate.getFullYear()) continue;
            }

            // Add all entry keys from month
            const entryKeys: string[] = await UserDB.getArrayAsync(monthKey) || [];
            for (const key of entryKeys) keys.push(key);
        }
    }

    // Optimize with rating indexes
    else if (filter.minRating || filter.maxRating) {
        const minRating = filter.minRating || MIN_RATING;
        const maxRating = filter.maxRating || MAX_RATING;
        for (let rating = minRating; rating <= maxRating; rating++) {
            const ratingIndexKey = ratingToRatingIndexKey(rating);
            const entryKeys: string[] = await UserDB.getArrayAsync(ratingIndexKey) || [];
            for (const key of entryKeys) keys.push(key);
        }
    }

    // Don't optimize
    else keys = await UserDB.getArrayAsync(ENTRIES_INDEX_KEY) || [];

    // No need to proceed if we have no keys
    if (keys.length == 0) return [];
    
    // Fetch entries for keys
    let entries: Entry[] = await Promise.all(keys.map(async (key: string) => {
        let entry = await UserDB.getMapAsync<Entry | undefined | null>(key) || EMPTY_ENTRY;

        // Turn date string into date object
        entry.date = new Date(entry.date);
        return entry;
    }))


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
        entries = entries.filter((entry) => entry.rating <= filter.maxRating!);
    }

    if (filter.containsText) {
        entries = entries.filter((entry) =>
            entry.text.toLocaleLowerCase().includes(filter.containsText!.toLocaleLowerCase()));
    }

    if (filter.containsWords) {
        entries = entries.filter((entry) => {
            const entryWords = splitToWords(entry.text);
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


/** Updates database schema. Ran automatically on app start. */
const update: () => Promise<void> = async () => {
    const entries: string[] | null | undefined = await UserDB.getArrayAsync(ENTRIES_INDEX_KEY);

    // Just write current schema version if db is empty
    if (!Array.isArray(entries)) {
        UserDB.setInt(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
        console.log("Db initiated");
        return;
    }

    // Do all necessary version upgrades
    const version = UserDB.getInt(SCHEMA_VERSION_KEY);
    switch (version) {
        case null: // Schema version prior to 1 did not contain version information
            console.log("Upgrading db to v1");

            Promise.all(entries.map(async (entryKey) => {
                const monthIndexKey = entryKeyToMonthIndexKey(entryKey);
                // Month index
                await pushToIndex(monthIndexKey, entryKey);
                // Index of month indexes
                await pushToIndex(MONTH_INDEXES_KEY, monthIndexKey);
            }));
        case 1:
            console.log("Upgrading db to v2");

            await Promise.all(entries.map(async (entryKey) => {
                const entry = await UserDB.getMapAsync(entryKey) as Entry;

                // Rating indexes
                const ratingIndexKey = ratingToRatingIndexKey(entry.rating);
                await pushToIndex(ratingIndexKey, entryKey);

                // Indexes for all individual words
                await Promise.all(splitToWords(entry.text).map(async (word) => {
                    const wordIndexKey = wordToWordIndexKey(word);
                    // Word indexes
                    await pushToIndex(wordIndexKey, entryKey);
                    // Index of word indexes
                    await pushToIndex(WORD_INDEXES_KEY, wordIndexKey);
                }));
            }));
    }

    // Bump schema version
    UserDB.setInt(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
}
// Update on init
update();
