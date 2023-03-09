import { View, Platform } from "react-native";
import { Switch } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { List } from "react-native-paper";
import CodePin from 'react-native-pin-code';

import { DebugView } from "./DebugView";
import { SettingsDB, setPin, hasPin, clearPin, PIN_KEY } from '../storage/settings';
import { useMMKVStorage } from "react-native-mmkv-storage";


const ConfirmPinView = () => {
  return (
    <CodePin
      number={4}
      checkPinCode={(code, callback) => callback(code == pin)}
      success={async () => {
        await navigation.navigate("Top");
        await clearPin();
      }}
      text="Kirjaa salasana"
      error="Väärin"
      keyboardType="numeric"
      obfuscation={true}
    />
  );
};


const SetPinView = ({ navigation }) => {
  return (
    <CodePin
      number={4}
      checkPinCode={(code, callback) => {
          setPin(code);
          callback(true);
      }}
      success={() => { navigation.navigate("Top"); }}
      text="Uusi PIN"
      error="Väärin"
      keyboardType="numeric"
    />
  );
};


const SettingsList = ({ navigation }) => {
  const [pin, _] = useMMKVStorage(PIN_KEY, SettingsDB, "");

  // Returns correct right arrow -like icon for current platform
  const PlatformRight = () => Platform.OS === "ios" ? "chevron-right" : "arrow-right";

  const DebugViewListItem = () => {
    // Return nothing if not in debug mode
    if (!__DEV__) return;

    return (
      <List.Item
        title="Debug view"
        description="Development shananigans"
        left={(props) => <List.Icon {...props} icon="bug" />}
        right={(props) => <List.Icon {...props} icon={PlatformRight()} />}
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
        right={() => <Switch
          value={pin != ""}
          onValueChange={async (value) => {
            if (value) {
              navigation.navigate("SetPin");
            } else {
              await clearPin();
            }
          }}
        />}
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
      />
      <Stack.Screen
        name="Debug"
        component={DebugView}
      />
      <Stack.Screen
        name="SetPin"
        component={SetPinView}
      />
      <Stack.Screen
        name="ConfirmPin"
        component={ConfirmPinView}
      />
    </Stack.Navigator>
  )
}

export default SettingsView;
