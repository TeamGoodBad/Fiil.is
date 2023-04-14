/**
 * This exposes the native NotificationModule module as a JS module.
 * This has a function 'createNotification' which takes
 * the following parameters:
 *
 * 1. String title: a string representing the title of the notification
 * 2. String mainText: a string representing the main text of the notification
 */

import {NativeModules} from 'react-native';
const {NotificationModule} = NativeModules;

interface NotificationInterface {
    createNotification(title: string, mainText: string): void;
}
export default NotificationModule as NotificationInterface;
