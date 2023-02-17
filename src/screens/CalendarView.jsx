import {View, Text} from "react-native"
import NavigationBar from "../components/NavigationBar";

const CalendarView = ({navigation}) => {
  return (
    <View> 
      <Text>Calendar View</Text>
      <NavigationBar navigation={navigation}/>
    </View>
  );
}

export default CalendarView;