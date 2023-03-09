import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";

export const PIN_KEY = "pin";

export const SettingsDB = new MMKVLoader()
    .withInstanceID("settings")
    .withEncryption()
    .initialize();


/**
 * Retruns true if user has set pin. 
 * @returns `true` if user has set pin
 */
export const hasPin = () => SettingsDB.getString(PIN_KEY, "") != "";


/**
 * Returns true if pin is correct, false if not.
 * Always returns false if pin has not been set!
 * @param {string} pin 
 * @returns `true` if given pin is correct
 */
export const checkPin = async (pin) => await SettingsDB.getStringAsync(PIN_KEY, "") == pin;


// Sets new pin
/**
 * Sets new pin overriding the current one
 * @param {string} pin
 */
export const setPin = async (pin) => await SettingsDB.setStringAsync(PIN_KEY, pin);


/**
 * Clears pin
 */
export const clearPin = async () => await SettingsDB.setStringAsync(PIN_KEY, "");
