import { MMKVLoader } from "react-native-mmkv-storage";

const ENTRIES_INDEX_KEY = "entriesIndex";
const ENTRY_KEY = "entry";
export const CURRENT_TEXT_KEY = "currentText";
export const CURRENT_RATING_KEY = "currentRating";

const dateToKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
const dateToEntryKey = (date: Date) => `${ENTRY_KEY}.${dateToKey(date)}`;

export const UserDB: any = new MMKVLoader()
    .withEncryption()
    .withInstanceID("userdata")
    .initialize();


interface Entry {
    rating: number,
    text: string,
    date: Date,
}


/**
 * @returns the whole database in JSON format
 */
export const dump: () => Promise<string> = async () => {
    const object: any = {};

    await Promise.all([
        // Add all string values
        Promise.all((await UserDB.indexer.strings.getAll())
            .map(async (field: [string, string]) => object[field[0]] = field[1])),

        // all number values
        Promise.all((await UserDB.indexer.numbers.getAll())
            .map(async (field: [string, number]) => object[field[0]] = field[1])),

        // objects
        Promise.all((await UserDB.indexer.maps.getAll())
            .map(async (field: [string, any]) => object[field[0]] = field[1])),

        // and indexes
        Promise.all((await UserDB.indexer.arrays.getAll())
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

    // Update indexes
    let index = await UserDB.getArrayAsync(ENTRIES_INDEX_KEY);
    if (index == null) index = [];
    if (!index.includes(entryKey)) index.push(entryKey);
    await UserDB.setArrayAsync(ENTRIES_INDEX_KEY, index);
}


/**
 * Retrieves entry from db by spesific date
 * @param {Date} date with time of day ignored
 * @returns {Entry} or `null` if not found
 */
// Returns null if entry is not found.
export const getEntry = async (date: Date): Promise<Entry|null> => {
    const key = dateToEntryKey(date);
    return await UserDB.getMapAsync(key);
}


/**
 * Clears all user data
 */
export const clearUserDB = () => UserDB.clearStore();


/**
 * @returns All entries in db
 */
export const getEntries = async (): Promise<Entry[]> => {
    let index = await UserDB.getArrayAsync(ENTRIES_INDEX_KEY);
    if (index == null) index = [];
    const entries = await Promise.all(index.map((key: string) => UserDB.getMapAsync(key)));
    return entries;
}