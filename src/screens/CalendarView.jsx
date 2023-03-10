import React, { useState } from "react"
import { View, Alert, Button } from "react-native"
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';



const CalendarView = ({ navigation }) => {
  const [text, setText] = useState("");


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Calendar View</Text>
      <CalendarList
         onDayPress={day => {
    console.log('selected day', day);
  }}  
      />
      

    </View>
  );
}

export default CalendarView;