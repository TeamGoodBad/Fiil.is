import { useState } from 'react';
import { View, Text } from "react-native";
import { Switch, useTheme } from 'react-native-paper';

const SettingsView = ({navigation}) => {
  const [onOff, setOnOff] = useState(true);
  const theme = useTheme();
  const color = onOff ? theme.colors.tertiaryContainer : theme.colors.background
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color }}> 
      <Text>Settings View</Text>
      <Switch
        color={theme.colors.onTertiaryContainer}
        value={onOff}
        onValueChange={() => setOnOff(onOff ? false : true)} />
    </View>
  );
}

export default SettingsView;