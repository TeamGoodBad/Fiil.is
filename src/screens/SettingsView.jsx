import { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { Switch, useTheme, Button, Appbar, Text, Subheading } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { List } from "react-native-paper";

import { SettingsDB } from '../storage/settings';

const DebugMenu = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const theme = useTheme();
  const color = isSwitchOn ? theme.colors.secondaryContainer : theme.colors.background

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const styles = StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: color,
    },
    setting: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: '20%',
      paddingLeft: '20%',
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.content}>
        <View style={styles.setting}>
          <Subheading>Värinvaihto</Subheading>
          <Switch
            color={theme.colors.onSecondaryContainer}
            value={isSwitchOn}
            onValueChange={onToggleSwitch} />
        </View>
        <View style={styles.setting}>
          <Text>Värinvaihto nro 2</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch} />
        </View>
        <Button accessibilityLabel="Tyhjä nappi" mode="elevated">
          Nappi, joka ei tee mitään
        </Button>
      </View>
    </View>
  );
};


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
    )
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
  )
};


const SettingsView = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsList}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Debug"
        component={DebugMenu}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}

export default SettingsView;
