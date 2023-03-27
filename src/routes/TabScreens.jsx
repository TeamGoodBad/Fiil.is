import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainView from '../screens/MainView';
import CalendarView from '../screens/CalendarView';
import AnalysisView from '../screens/AnalysisView';
import SettingsView from '../screens/SettingsView';

const Tab = createMaterialBottomTabNavigator();

export default TabScreens = () => {
    return (
      <Tab.Navigator
        labeled={true}
        shifting={true}>
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