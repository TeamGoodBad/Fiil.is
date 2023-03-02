import { MMKVLoader } from "react-native-mmkv-storage";

const ENTRIES_INDEX_KEY = "entriesIndex";
const ENTRY_KEY = "entry";

const dateToKey = (date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
const dateToEntryKey = (date) => `${ENTRY_KEY}:${dateToKey(date)}`;

export const MMKV = new MMKVLoader()
    .withEncryption()
    .withInstanceID("userdata")
    .initialize();


// Adds entry to db.
export const AddEntry = async (date, entry) => {
    let key = dateToEntryKey(date);
    MMKV.asyncSetMap(key, entry);
}


// Retrieves entry from db by date.
// Returns null if entry is not found
export const GetEntry = async (date) => {
    let key = dateToEntryKey(date);
    return MMKV.asyncGetMap(key);
}
