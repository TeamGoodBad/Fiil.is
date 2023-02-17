import {View, Text} from "react-native"
import NavigationBar from "../components/NavigationBar";

const AnalysisView = ({navigation}) => {
  return (
    <View> 
      <Text>Analysis View</Text>
      <NavigationBar navigation={navigation}/>
    </View>
  );
}

export default AnalysisView;