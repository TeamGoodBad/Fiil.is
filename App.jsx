import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Provider as PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { useMMKVStorage } from 'react-native-mmkv-storage';

import TabScreens from './src/routes/TabScreens';
import AuthenticationView from './src/screens/AuthenticationView';
import { CombinedDefaultTheme, CombinedDarkTheme } from "./src/theme";
import { PIN_KEY, SettingsDB } from './src/storage/settings';

const App = () => {
  const scheme = useColorScheme();
  const Stack = createNativeStackNavigator();

  const [pin, _] = useMMKVStorage(PIN_KEY, SettingsDB, "");

  /** Tab navigator */
  const Tabs = TabScreens;

  /** Wraps authentication view with rest of the app */
  const AuthenticationWrapper = (
    <Stack.Navigator initialRouteName={pin != "" ? "Authentication" : "Tabs"}>
      <Stack.Screen
        name="Authentication"
        component={AuthenticationView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  return (
    <PaperProvider theme={scheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
      <NavigationContainer theme={scheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
        {AuthenticationWrapper}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
