import React from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme
} from 'react-native-paper';
import { useColorScheme } from 'react-native';

import MainView from './src/screens/MainView';
import CalendarView from './src/screens/CalendarView';
import AnalysisView from './src/screens/AnalysisView';
import SettingsView from './src/screens/SettingsView';
import AuthenticationView from './src/screens/AuthenticationView';


const App = () => {
  const scheme = useColorScheme();
  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...NavigationDefaultTheme.colors,
      primary: "rgb(73, 81, 195)",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(224, 224, 255)",
      onPrimaryContainer: "rgb(0, 0, 110)",
      secondary: "rgb(92, 93, 114)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(225, 224, 249)", // tab boksin valintaväri
      onSecondaryContainer: "rgb(25, 26, 44)", // tab boxin valitun iconin väri
      tertiary: "rgb(120, 83, 107)",
      onTertiary: "rgb(255, 255, 255)",
      tertiaryContainer: "rgb(255, 216, 238)",
      onTertiaryContainer: "rgb(46, 17, 38)",
      error: "rgb(186, 26, 26)",
      onError: "rgb(255, 255, 255)",
      errorContainer: "rgb(255, 218, 214)",
      onErrorContainer: "rgb(65, 0, 2)",
      background: "rgb(255, 251, 255)", // perus taustaväri
      onBackground: "rgb(27, 27, 31)",
      surface: "rgb(255, 251, 255)",
      onSurface: "rgb(27, 27, 31)", // perus tekstin väri
      surfaceVariant: "rgb(228, 225, 236)", // text inputin tausta
      onSurfaceVariant: "rgb(70, 70, 79)", // tab boxin valitsemattomat iconit
      outline: "rgb(119, 118, 128)",
      outlineVariant: "rgb(199, 197, 208)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(48, 48, 52)",
      inverseOnSurface: "rgb(243, 239, 244)",
      inversePrimary: "rgb(191, 194, 255)",
      elevation: {
        level0: "transparent",
        level1: "rgb(246, 243, 252)",
        level2: "rgb(240, 237, 250)", // tab boxin tausta
        level3: "rgb(235, 232, 248)",
        level4: "rgb(233, 231, 248)",
        level5: "rgb(230, 227, 247)"
      },
      surfaceDisabled: "rgba(27, 27, 31, 0.12)",
      onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
      backdrop: "rgba(48, 48, 56, 0.4)"
    },
  };
  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...NavigationDarkTheme.colors,
      primary: "rgb(191, 194, 255)", // mm. contained napin väri
      onPrimary: "rgb(20, 25, 148)", // mm. contained napin tekstin väri
      primaryContainer: "rgb(48, 55, 170)",
      onPrimaryContainer: "rgb(224, 224, 255)",
      secondary: "rgb(197, 196, 221)",
      onSecondary: "rgb(46, 47, 66)",
      secondaryContainer: "rgb(68, 69, 89)", // tab boksin valintaväri
      onSecondaryContainer: "rgb(225, 224, 249)", // tab boxin valitun iconin väri
      tertiary: "rgb(232, 185, 213)",
      onTertiary: "rgb(70, 38, 59)",
      tertiaryContainer: "rgb(94, 60, 82)",
      onTertiaryContainer: "rgb(255, 216, 238)",
      error: "rgb(255, 180, 171)",
      onError: "rgb(105, 0, 5)",
      errorContainer: "rgb(147, 0, 10)",
      onErrorContainer: "rgb(255, 180, 171)",
      background: "rgb(27, 27, 31)", // perus taustaväri
      onBackground: "rgb(229, 225, 230)",
      surface: "rgb(27, 27, 31)",
      onSurface: "rgb(229, 225, 230)", // perus tekstin väri
      surfaceVariant: "rgb(70, 70, 79)", // (ainakin) text inputin tausta
      onSurfaceVariant: "rgb(199, 197, 208)", // tab boxin valitsemattomat iconit
      outline: "rgb(145, 143, 154)",
      outlineVariant: "rgb(70, 70, 79)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(229, 225, 230)",
      inverseOnSurface: "rgb(48, 48, 52)",
      inversePrimary: "rgb(73, 81, 195)",
      elevation: {
        level0: "transparent",
        level1: "rgb(35, 35, 42)",
        level2: "rgb(40, 40, 49)", // tab boxin tausta
        level3: "rgb(45, 45, 56)",
        level4: "rgb(47, 47, 58)",
        level5: "rgb(50, 50, 62)"
      },
      surfaceDisabled: "rgba(229, 225, 230, 0.12)",
      onSurfaceDisabled: "rgba(229, 225, 230, 0.38)",
      backdrop: "rgba(48, 48, 56, 0.4)"
    }
  };
  const Tab = createMaterialBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  // Tab navigator
  const Tabs = () => {
    return (
      <Tab.Navigator labeled={false}>
        <Tab.Screen
          name='Main'
          component={MainView}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="notebook-edit" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Calendar'
          component={CalendarView}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Analysis'
          component={AnalysisView}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="lightbulb-on-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Settings'
          component={SettingsView}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  // Wraps authentication view with rest of the app
  const AuthenticationWrapper = (
    <Stack.Navigator>
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
