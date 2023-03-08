import { MMKVLoader } from "react-native-mmkv-storage";

const ENTRIES_INDEX_KEY = "entriesIndex";
const ENTRY_KEY = "entry";

const dateToKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
const dateToEntryKey = (date: Date) => `${ENTRY_KEY}:${dateToKey(date)}`;

export const UserDB: any = new MMKVLoader()
    .withEncryption()
    .withInstanceID("userdata")
    .initialize();

interface Entry {
    rating: number,
    text: string,
}

/**
 * Adds entry to db. Entry must be an object in form of:
 * {rating: integer, text: string}.
 * @param {Entry} entry
 * @param {Date} date
 */
export const setEntry = async (entry: Entry, date: Date) => {
    let key = dateToEntryKey(date);
    UserDB.asyncSetMap(key, entry);
}


/**
 * Retrieves entry from db by spesific date
 * @param {Date} date with time of day ignored
 * @returns {Entry} or `null` if not found
 */
// Returns null if entry is not found.
export const getEntry = async (date: Date): Promise<Entry|null> => {
    let key = dateToEntryKey(date);
    return await UserDB.asyncGetMap(key);
}
