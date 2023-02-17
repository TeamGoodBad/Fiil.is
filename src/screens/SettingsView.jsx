import {View, Text} from "react-native"
import NavigationBar from "../components/NavigationBar";

const SettingsView = ({navigation}) => {
  return (
    <View> 
      <Text>Settings View</Text>
      <NavigationBar navigation={navigation}/>
    </View>
  );
}

export default SettingsView;