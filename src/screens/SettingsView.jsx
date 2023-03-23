import { View, Platform, StyleSheet, Dimensions , SafeAreaView, Button} from "react-native";
import { useState } from "react";
import { Snackbar, Switch, useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { List } from "react-native-paper";
import CodePin from 'react-native-pin-code';
import { useMMKVStorage } from "react-native-mmkv-storage";
import notifee from '@notifee/react-native';


import { DebugView } from "./DebugView";
import { SettingsDB, setPin, clearPin, PIN_KEY } from '../storage/settings';
import EntryList from "../components/EntryList";
import { getStyles, getPinStyles } from "../styles/settingsView";



const SettingsList = ({ navigation }) => {
  const [pin, _] = useMMKVStorage(PIN_KEY, SettingsDB, "");

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }


  /** Returns correct right arrow -like icon for current platform */
  const PlatformRight = () => Platform.OS == "ios" ? "chevron-right" : "arrow-right";

  const DebugViewListItem = () => {
    // Return nothing if not in debug mode
    if (!__DEV__) return;

    return (
      <List.Item
        title="Debug"
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
    <SafeAreaView style={{flex:1}}>
    <View>
      <List.Item
        title="PIN-lukitus"
        description="Lukitse sovellus PIN koodilla"
        left={(props) => <List.Icon {...props} icon="safe" />}
        right={() => <Switch
          value={pin != ""}
          onValueChange={togglePin}
        />}
        onPress={togglePin}
      />
      {DebugViewListItem()}
      <Button title="Display Notification" onPress={() => onDisplayNotification()} />
    </View>
    </SafeAreaView>

  );
};


/** View for setting new pin */
const SetPinView = ({ navigation }) => {
  const [pinToConfirm, setPinToConfirm] = useState("");
  const [hasFailedPinConfirm, setHasFailedPinConfirm] = useState(false);
  const theme = useTheme();

  const pinStyle = getPinStyles(theme);

  // 1st time pin
  if (pinToConfirm == "") {
    return (
      <View style={{flex:1}}>
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
          containerStyle={pinStyle.container}
          containerPinStyle={pinStyle.containerPin}
          pinStyle={pinStyle.pin}
          textStyle={pinStyle.text}
          errorStyle={pinStyle.error}
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
      containerStyle={pinStyle.container}
      containerPinStyle={pinStyle.containerPin}
      pinStyle={pinStyle.pin}
      textStyle={pinStyle.text}
      errorStyle={pinStyle.error}
    />
  );
};


const SettingsView = () => {
  const Stack = createNativeStackNavigator();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.base}>
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
        <Stack.Screen
          name="Entry List"
          component={EntryList}
        />
      </Stack.Navigator>
    </View>
  )
}

export default SettingsView;
