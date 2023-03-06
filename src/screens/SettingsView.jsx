import { View } from "react-native";
import { Switch } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { List } from "react-native-paper";

import { DebugView } from "./DebugView";
import { SettingsDB } from '../storage/settings';


const SettingsList = ({ navigation }) => {
  const DebugViewListItem = () => {
    // Return nothing if not in debug mode
    if (!__DEV__) return;

    return (
      <List.Item
        title="Debug view"
        description="Development shananigans"
        left={(props) => <List.Icon {...props} icon="bug" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => navigation.navigate("Debug")}
      />
    );
  };

  return (
    <View>
      <List.Item
        title="Require PIN"
        description="Ask for PIN-code on app start"
        left={(props) => <List.Icon {...props} icon="safe" />}
        right={() => <Switch />}
      />
      {DebugViewListItem()}
    </View>
  );
};


const SettingsView = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Top"
        component={SettingsList}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Debug"
        component={DebugView}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}

export default SettingsView;
