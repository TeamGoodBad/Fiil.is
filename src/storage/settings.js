import { MMKVLoader } from "react-native-mmkv-storage";

const PIN_KEY = "pin";

export const MMKV = new MMKVLoader()
        .withInstanceID("settings")
        .initialize();


// Retruns true if user has set key
export const HasPin = async (pin) => {
    return MMKV.indexer.hasKey(PIN_KEY);
}


// Returns true if pin is correct, false if not.
// Always returns true if pin has not been set!
export const CheckPin = async (pin) => {
    if (!HasPin(pin)) return true;
    let pin2 = await MMKV.getStringAsync(PIN_KEY, null);
    return pin == pin2;
}


// Sets new pin
export const SetPin = async (pin) => {
    await NMKV.setStringAsync(PIN_KEY, pin);
}