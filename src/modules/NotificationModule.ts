/**
 * This exposes the native NotificationModule module as a JS module.
 * This has a function 'createNotification' which takes
 * the following parameters:
 *
 * 1. String title: a string representing the title of the notification
 * 2. String mainText: a string representing the main text of the notification
 * 3. Integer hours: the hour for notification (0-23)
 * 4. Integer minutes: the minute for notification (0-59)
 * 5. Integer seconds: the second for notification (0-59)
 */

import {NativeModules} from 'react-native';
const {NotificationModule} = NativeModules;

interface NotificationInterface {
    createNotification(title: string, mainText: string, hours: number, minutes: number, seconds: number): void;
}
export default NotificationModule as NotificationInterface;
