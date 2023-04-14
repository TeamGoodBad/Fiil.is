import { View, Platform, SafeAreaView, Alert } from 'react-native';
import { useState } from "react";
import { Snackbar, Switch, useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { List } from "react-native-paper";
import CodePin from 'react-native-pin-code';
import { useMMKVStorage } from "react-native-mmkv-storage";
import Share from "react-native-share";
import DocumentPicker from 'react-native-document-picker';
import { readFile } from "react-native-fs";

import { DebugView } from "./DebugView";
import { SettingsDB, setPin, clearPin, PIN_KEY, DAY_CHANGE_KEY } from '../storage/settings';
import EntryList from "../components/EntryList";
import { getStyles, getPinStyles } from "../styles/settingsView";
import { dump, load, UserDB } from "../storage/userdata";


const SettingsList = ({ navigation }) => {
  const [pin] = useMMKVStorage(PIN_KEY, SettingsDB, "");
  const [dayChange, setDayChange] = useMMKVStorage(DAY_CHANGE_KEY, SettingsDB, false);

  /** Returns correct right arrow -like icon for current platform */
  const PlatformRight = () =>
    Platform.OS == 'ios' ? 'chevron-right' : 'arrow-right';

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
    if (pin == '') {
      navigation.navigate('Set PIN');
    } else {
      await clearPin();
    }
  };

  const toggleDayChange = () => setDayChange(!dayChange);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <List.Item
          title="PIN-lukitus"
          description="Lukitse sovellus PIN koodilla"
          left={props => <List.Icon {...props} icon="safe" />}
          right={() => <Switch value={pin != ''} onValueChange={togglePin} />}
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
          title="Tuo"
          description="Tuo tietokanta tiedostosta."
          left={(props) => <List.Icon {...props} icon="database-import" />}
          onPress={() => {
            Alert.alert(
              "Varoitus!",
              "Operaatio ylikirjoittaa aikaisemmat merkinnät. Haluatko varmasti jatkaa?",
              [
                {
                  text: "Peruuta",
                  style: "cancel",
                },
                {
                  text: "Ok",
                  style: "default",
                  onPress: () => DocumentPicker.pickSingle()
                    .then((response) => readFile(response.uri, "utf8"))
                    .then((contents) => {
                      load(contents);
                      Alert.alert("Tuonti", "Tuonti onnistui!");
                    })
                    .catch((err) => console.log(err.message, err.code))
                }
              ],
              {
                cancelable: true,
              }
            )
          }}
        />
        <List.Item
          title="Vie"
          description="Vie tietokanta tiedostoon."
          left={(props) => <List.Icon {...props} icon="database-export" />}
          onPress={() => {
            dump(false).then((dump => {
              const Buffer = require("buffer").Buffer;
              const dump64 = new Buffer(dump).toString("base64");
              const dateStr = (new Date()).toJSON();
              Share.open({
                title: "Fiil.is database export",
                filename: `feelis-export-${dateStr}`,
                url: `data:application/json;base64,${dump64}`,
              }).then((res) => console.log(res))
                .catch((err) => {
                  err && console.log(err);
                });
            }))
          }}
        />
        {DebugViewListItem()}
      </View>
    </SafeAreaView>
  );
};

/** View for setting new pin */
const SetPinView = ({ navigation }) => {
  const [pinToConfirm, setPinToConfirm] = useState('');
  const [hasFailedPinConfirm, setHasFailedPinConfirm] = useState(false);
  const theme = useTheme();

  const pinStyle = getPinStyles(theme);

  // 1st time pin
  if (pinToConfirm == '') {
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
          action={{ icon: 'close' }}>
          {' '}
          Annetut PIN-koodit erosivat toisistaan!
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
          setPinToConfirm('');
          setHasFailedPinConfirm(false);
          navigation.navigate('Top');
        } else {
          // Pins did not match
          setHasFailedPinConfirm(true);
          setPinToConfirm('');
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
        <Stack.Screen name="Debug" component={DebugView} />
        <Stack.Screen name="Set PIN" component={SetPinView} />
        <Stack.Screen name="Entry List" component={EntryList} />
      </Stack.Navigator>
    </View>
  );
};

export default SettingsView;
