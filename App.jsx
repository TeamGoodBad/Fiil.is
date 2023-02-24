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
  MD2DarkTheme,
  MD2LightTheme
} from 'react-native-paper';

import MainView from './src/screens/MainView';
import CalendarView from './src/screens/CalendarView';
import AnalysisView from './src/screens/AnalysisView';
import SettingsView from './src/screens/SettingsView';
import AuthenticationView from './src/screens/AuthenticationView';


const App = () => {
  const Tab = createMaterialBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const CombinedDefaultTheme = {
    ...MD2LightTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...MD2LightTheme.colors,
      ...NavigationDefaultTheme.colors,
    },
  };
  const CombinedDarkTheme = {
    ...MD2DarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...MD2DarkTheme.colors,
      ...NavigationDarkTheme.colors,
    },
  };

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
    <PaperProvider theme={{CombinedDefaultTheme}}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        {AuthenticationWrapper}
      </NavigationContainer>
    </PaperProvider>
  );
};
export default App;
