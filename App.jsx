import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainView from './src/screens/MainView';
import CalendarView from './src/screens/CalendarView';
import AnalysisView from './src/screens/AnalysisView';
import SettingsView from './src/screens/SettingsView';

const App = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator labeled={true}>
        <Tab.Screen name='Main' component={MainView} />
        <Tab.Screen name='Calendar' component={CalendarView} />
        <Tab.Screen name='Analysis' component={AnalysisView} />
        <Tab.Screen name='Settings' component={SettingsView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
