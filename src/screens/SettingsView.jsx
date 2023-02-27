import {View, Text} from "react-native"

const SettingsView = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
      <Text>Settings View</Text>
      <Text>{require('../../package.json').version}</Text>
    </View>
  );
}

export default SettingsView;