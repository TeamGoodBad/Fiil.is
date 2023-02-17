import {View, Text} from "react-native"
import NavigationBar from "../components/NavigationBar";

const MainView = ({navigation}) => {
  return (
    <View> 
      <Text>Main View</Text>
      <NavigationBar navigation={navigation}/>
    </View >
  );
}

export default MainView;