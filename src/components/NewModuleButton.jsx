import React from 'react';
import {NativeModules} from 'react-native';
import {Button} from 'react-native-paper';

const NewModuleButton = () => {
    const onPress = () => {
        console.log('We will invoke the native module here!');
    };

    return (
        <Button onPress={onPress}>Native Module</Button>
    );
};

export default NewModuleButton;

