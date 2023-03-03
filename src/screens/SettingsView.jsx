import { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { Switch, useTheme, Button, Appbar, Text, Subheading} from 'react-native-paper';

const SettingsView = ({navigation}) => {
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
    <View style={{flex:1}}>
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Settings View" />
      </Appbar.Header>
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
}



export default SettingsView;
