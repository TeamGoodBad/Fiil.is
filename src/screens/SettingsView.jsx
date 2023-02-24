import { View, Text } from "react-native"
import { ActivityIndicator, useTheme } from 'react-native-paper';

const SettingsView = ({navigation}) => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.secondary }}> 
      <Text>Settings View</Text>
      <ActivityIndicator animating={true} color={theme.colors.onSecondary} />
    </View>
  );
}

export default SettingsView;