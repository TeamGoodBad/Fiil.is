import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Modal, Portal, useTheme } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';

const CalendarView = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  

  const [entry, setEntry] = useState({date: new Date(2023, 2, 1), rating: 0, text: "This is madness"});

  const finDays = ['Ma','Ti','Ke','To','Pe','La','Su'];
  const finMonths = ['Tammikuu','Helmikuu','Maaliskuu',
                      'Huhtikuu','Toukokuu','Kesäkuu',
                      'Heinäkuu','Elokuu','Syyskuu',
                      'Lokakuu','Marraskuu','Joulukuu'];
  const startDate = selectedStartDate ? 
    selectedStartDate.format('DD.MM.YYYY').toString() : '';
  
  const theme = useTheme();
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.colors.background,
    },
    modalContainer: {
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    text: {
      color: theme.colors.onBackground,
    }
  });

  const handlePress = async (date) => {
    setSelectedStartDate(date);
    setEntry({date: date, rating: 2, text:"changed to " + date.format('DD.MM.YYYY').toString()});
    showModal();
  }

  return (
    
    <View style={{ flex: 1, alignItems: 'center'}}>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
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
      <CalendarPicker
        weekdays={finDays}
        months={finMonths}
        startFromMonday={true}
        showDayStragglers={true}
        previousTitle={"Edellinen"}
        nextTitle={"Seuraava"}
        textStyle={styles.text}
        onDateChange={handlePress}
      />
    </View>

  );
}

export default CalendarView;