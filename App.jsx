import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainView from './src/screens/MainView';
import CalendarView from './src/screens/CalendarView';
import AnalysisView from './src/screens/AnalysisView';
import SettingsView from './src/screens/SettingsView';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Main' component={MainView} />
        <Stack.Screen name='Calendar' component={CalendarView} />
        <Stack.Screen name='Analysis' component={AnalysisView} />
        <Stack.Screen name='Settings' component={SettingsView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
