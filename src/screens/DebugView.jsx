import { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { Switch, useTheme, Button, Text, Subheading } from 'react-native-paper';
import { generateMockEntries } from '../storage/mock-entries';
import { dump, clearUserDB } from '../storage/userdata';


export const DebugView = ({ navigation }) => {
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
        <Button mode="elevated" onPress={async () => console.log(await dump())}>
          Dumppaa UserDB konsoliin
        </Button>
        <Button mode="elevated" onPress={() => clearUserDB()}>
          Pyyhi UserDB
        </Button>
        <Button mode="elevated" onPress={() => navigation.navigate("Entry List")}>
          Sivulistaus
        </Button>
        <Button mode="elevated" onPress={() => generateMockEntries()}>
          Luo puppumerkintöjä
        </Button>
      </View>
    </View>
  );
};
