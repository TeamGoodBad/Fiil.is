import React from 'react';
import NotificationModule from '../modules/NotificationModule';
import {Button} from 'react-native-paper';

/** Creates a button with onPress-function
 *  It sets an alarm / notification that triggers at given time
 *  More info: ../modules/NotificationModule
*/
const NewModuleButton = () => {
    const onPress = () => {
        console.log('We did invoke the native module here!');
        NotificationModule.createNotification(
            'testiOtsikko',
            'testiTeksti',
            14, //hours
            5,  // minutes
            0   // seconds
        );
    };

    return (
        <Button mode='contained-tonal' onPress={onPress}>Native Module</Button>
    );
};

export default NewModuleButton;

