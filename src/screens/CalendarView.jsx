import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, Modal, Portal, useTheme } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';

const CalendarView = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const startDate = selectedStartDate ? selectedStartDate.format('DD.MM.YYYY').toString() : ''; //Ota valittu päivä

  const [entry, setEntry] = useState({date: new Date(2023, 2, 1), rating: 0, text: "This is madness"});

  const theme = useTheme();

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handlePress = async (date) => {
    setSelectedStartDate(date);
    setEntry({date: date, rating: 2, text:"changed to " + date.format('DD.MM.YYYY').toString()});
    showModal();
  }


  const containerStyle = {backgroundColor: theme.colors.background, padding: 20};
  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Valittu: {startDate}</Text>
          <Text>
            {entry.date.toString()} {entry.text}
          </Text>
          <Button
            mode="elevated"
            onPress={hideModal}>
            Hide
          </Button>
        </Modal>
      </Portal>
      <CalendarPicker onDateChange={handlePress} />
    </View>

  );
}

export default CalendarView;