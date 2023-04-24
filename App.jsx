import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Provider as PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import {useMMKVStorage} from 'react-native-mmkv-storage';


import {CombinedDefaultTheme, CombinedDarkTheme} from './src/theme';
import {PIN_KEY, SettingsDB} from './src/storage/settings';
import AuthenticationWrapper from './src/routes/AuthenticationWrapper';

const App = () => {
  const scheme = useColorScheme();

  const [pin, _] = useMMKVStorage(PIN_KEY, SettingsDB, '');

  const notificationTime = {hours: 12, minutes: 0, seconds: 0};

  return (
    <PaperProvider
      theme={scheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
      <NavigationContainer
        theme={scheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
        <AuthenticationWrapper pin={pin} />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
