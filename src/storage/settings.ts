import { MMKVLoader } from "react-native-mmkv-storage";

/** Key value for getting pin code from `SettingsDB` */
export const PIN_KEY = "pin";
export const DAY_CHANGE_KEY = "changeDayAt3am";
export const NOTIFICATIONS_ON = "notificationsOn";


/** MMKV key-value database object for settings */
export const SettingsDB = new MMKVLoader()
    .withInstanceID("settings")
    .withEncryption()
    .initialize();


/**
 * Retruns true if user has set pin. 
 * @returns `true` if user has set pin
 */
export const hasPin = async () => await SettingsDB.getStringAsync(PIN_KEY) != "";


/**
 * Returns true if pin is correct, false if not.
 * NOTE: Always returns false if pin has not been set.
 * @param {string} pin 
 * @returns `true` if given pin is correct
 */
export const checkPin = async (pin: string) => await SettingsDB.getStringAsync(PIN_KEY) == pin;


// Sets new pin
/**
 * Sets new pin overriding the current one.
 * @param {string} pin
 */
export const setPin = async (pin: string) => await SettingsDB.setStringAsync(PIN_KEY, pin);


/**
 * Clears pin.
 */
export const clearPin = async () => await SettingsDB.setStringAsync(PIN_KEY, "");
