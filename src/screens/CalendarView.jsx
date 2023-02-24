import React, {useState} from "react"
import { View } from "react-native"
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';



const CalendarView = ({navigation}) => {
  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
      <Text>Calendar View</Text>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />

    </View>
  );
}

export default CalendarView;