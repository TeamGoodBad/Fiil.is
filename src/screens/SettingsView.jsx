import { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { Switch, useTheme, Button, Title, Text } from 'react-native-paper';


const SettingsView = ({ navigation }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const theme = useTheme();
  const color = isSwitchOn ? theme.colors.tertiaryContainer : theme.colors.background

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const styles = StyleSheet.create({
    title: {
      alignSelf: 'center',
      paddingTop: 5,
      paddingBottom: 5
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color,
    },
    setting: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <Title style={styles.title}>
        Settings View
      </Title>
      <View style={styles.content}>
        <View style={styles.setting}>
          <Text>Värinvaihto</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch} />
        </View>
        <View style={styles.setting}>
          <Text>Värinvaihto</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch} />
        </View>

        <Button mode="outlined">
          Nappi, joka ei tee mitään
        </Button>

        <Text>{require('../../package.json').version}</Text>
      </View>
    </View>
  );
}

export default SettingsView;
