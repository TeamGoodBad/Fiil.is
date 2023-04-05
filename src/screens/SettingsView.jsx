import { View, Platform } from "react-native";
import { useState } from "react";
import { Snackbar, Switch, useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { List } from "react-native-paper";
import CodePin from 'react-native-pin-code';
import { useMMKVStorage } from "react-native-mmkv-storage";
import Share from "react-native-share";

import { DebugView } from "./DebugView";
import { SettingsDB, setPin, clearPin, PIN_KEY, DAY_CHANGE_KEY } from '../storage/settings';
import EntryList from "../components/EntryList";
import { getStyles, getPinStyles } from "../styles/settingsView";
import { dump, UserDB } from "../storage/userdata";



const SettingsList = ({ navigation }) => {
  const [pin] = useMMKVStorage(PIN_KEY, SettingsDB, "");
  const [dayChange, setDayChange] = useMMKVStorage(DAY_CHANGE_KEY, SettingsDB, false);

  /** Returns correct right arrow -like icon for current platform */
  const PlatformRight = () => Platform.OS == "ios" ? "chevron-right" : "arrow-right";

  const DebugViewListItem = () => {
    // Return nothing if not in debug mode
    if (!__DEV__) return;

    return (
      <List.Item
        title="Debug"
        description="Development shananigans."
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

  const toggleDayChange = () => setDayChange(!dayChange);

  return (
    <View>
      <List.Item
        title="PIN-lukitus"
        description="Lukitsee sovelluksen PIN koodilla."
        left={(props) => <List.Icon {...props} icon="safe" />}
        right={() => <Switch
          value={pin != ""}
          onValueChange={togglePin}
        />}
        onPress={togglePin}
      />
      <List.Item
        title="Aloita päivä kello 3:00"
        description="Asettaa sivun vaihtumisen ajankohdan keskiyöstä kolmeen aamuyöstä."
        left={(props) => <List.Icon {...props} icon="weather-night" />}
        right={() => <Switch
          value={dayChange}
          onValueChange={toggleDayChange}
        />}
        onPress={toggleDayChange}
      />
      <List.Item
        title="Vie"
        description="Vie tietokanta muihin sovelluksiin."
        left={(props) => <List.Icon {...props} icon="weather-night" />}
        onPress={() => {
          dump(false).then((dump => {
            Share.open({ title: "Fiil.is database export", type: "application/json", message: dump })
              .then((res) => { console.log(res); })
              .catch((err) => { err && console.log(err); });
          }))
        }}
      />
      {DebugViewListItem()}
    </View>
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
      <View style={{ flex: 1 }}>
        <CodePin
          number={4}
          checkPinCode={(code, callback) => {
            setPinToConfirm(code);
            callback(true);
          }}
          text="Uusi PIN"
          keyboardType="numeric"
          success={() => { }}
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
      success={() => { }}
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
