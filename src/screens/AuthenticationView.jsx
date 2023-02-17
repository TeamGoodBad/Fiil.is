import {View, Text} from "react-native"
import NavigationBar from "../components/NavigationBar";

const AuthenticationView = ({navigation}) => {
  return (
    <View> 
      <Text>Authentication view</Text>
      <NavigationBar navigation={navigation}/>
    </View>
  );
}

export default AuthenticationView;