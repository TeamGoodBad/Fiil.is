import { View, Platform } from "react-native";
import { Snackbar, Switch } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { List } from "react-native-paper";
import CodePin from 'react-native-pin-code';

import { DebugView } from "./DebugView";
import { SettingsDB, setPin, clearPin, PIN_KEY } from '../storage/settings';
import { useMMKVStorage } from "react-native-mmkv-storage";
import { useState } from "react";


const SettingsList = ({ navigation }) => {
  const [pin, _] = useMMKVStorage(PIN_KEY, SettingsDB, "");

  /** Returns correct right arrow -like icon for current platform */
  const PlatformRight = () => Platform.OS == "ios" ? "chevron-right" : "arrow-right";

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

  // Called when user toggles pin setting
  const togglePin = async () => {
    if (pin == "") {
      navigation.navigate("Set PIN");
    } else {
      await clearPin();
    }
  }

  return (
    <View>
      <List.Item
        title="Require PIN"
        description="Ask for PIN-code on app start"
        left={(props) => <List.Icon {...props} icon="safe" />}
        right={() => <Switch
          value={pin != ""}
          onValueChange={togglePin}
        />}
        onPress={togglePin}
      />
      {DebugViewListItem()}
    </View>
  );
};


/** View for setting new pin */
const SetPinView = ({ navigation }) => {
  const [pinToConfirm, setPinToConfirm] = useState("");
  const [hasFailedPinConfirm, setHasFailedPinConfirm] = useState(false);

  // 1st time pin
  if (pinToConfirm == "") {
    return (
      <View>
        <CodePin
          number={4}
          checkPinCode={(code, callback) => {
            setPinToConfirm(code);
            callback(true);
          }}
          text="Uusi PIN"
          keyboardType="numeric"
          success={() => {}}
          obfuscation={true}
        />
        <Snackbar
          visible={hasFailedPinConfirm}
          onDismiss={() => setHasFailedPinConfirm(false)}
          duration={Snackbar.DURATION_MEDIUM}
          action={{ icon: "close" }}
        > Annetut PIN-koodit erosivat toisistaan!
        </Snackbar>
      </View>
    );
  }

  // 2nd time confirm
  return (
    <CodePin
      number={4}
      checkPinCode={(code, callback) => {
        if (pinToConfirm == code) {
          // Pins match
          setPin(pinToConfirm);
          setPinToConfirm("");
          setHasFailedPinConfirm(false);
          navigation.navigate("Top");
        } else {
          // Pins did not match
          setHasFailedPinConfirm(true);
          setPinToConfirm("");
        }
        callback(true);
      }}
      success={() => {}}
      text="Vahvista PIN"
      keyboardType="numeric"
      obfuscation={true}
    />
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
        name="Set PIN"
        component={SetPinView}
      />
    </Stack.Navigator>
  )
}

export default SettingsView;
