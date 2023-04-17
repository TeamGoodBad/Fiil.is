import React from 'react';
import NotificationModule from '../modules/NotificationModule';
import {Button} from 'react-native-paper';

const NewModuleButton = () => {
    const onPress = () => {
        console.log('We did invoke the native module here!');
        NotificationModule.createNotification('testiOtsikko', 'testiTeksti', 14, 2, 0);
    };

    return (
        <Button mode='contained-tonal' onPress={onPress}>Native Module</Button>
    );
};

export default NewModuleButton;

