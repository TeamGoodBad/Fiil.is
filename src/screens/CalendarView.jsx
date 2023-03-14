import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

import { getEntry } from "../storage/userdata";




const CalendarView = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const startDate = selectedStartDate ? selectedStartDate.format('DD.MM.YYYY').toString() : ''; //Ota valittu päivä

  const [entry, setEntry] = useState({date: new Date(2023, 2, 1), rating: 0, text: "This is madness"});

  const handlePress = async (date) => {
    setSelectedStartDate(date);
    setEntry({date: date, rating: 2, text:"changed to " + date.format('DD.MM.YYYY').toString()});
    setModalVisible(true);
  }

  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {rr
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Valittu: {startDate}</Text>
            <Text style={styles.modalText}>
              {entry.date.toString()} {entry.text}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <CalendarPicker onDateChange={handlePress} />
    </View>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CalendarView;