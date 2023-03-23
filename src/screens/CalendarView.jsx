import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text, Modal, Portal, useTheme, Paragraph } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

import Stars from '../components/Stars';
import { getStyles, getFin } from '../styles/calendarView';
import { EMPTY_ENTRY, getEntries } from '../storage/userdata';


const CalendarView = ({ navigation }) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [customDatesStyles, setCustomDatesStyles] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(EMPTY_ENTRY);

  const startDate = selectedDate ?
    selectedDate.format('DD.MM.YYYY').toString() : ''; // FIXME: Always formats time in Finnish locale

  const fin = getFin();
  const styles = getStyles(theme);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);


  // Update calendar day colors from db when current month is changed
  useEffect(() => {
    if (!currentMonth) return;

    let monthStart = currentMonth.toDate();
    monthStart.setDate(1);
    let monthEnd = new Date(currentMonth.toDate());
    monthEnd.setDate(32);

    getEntries({ minDate: monthStart, maxDate: monthEnd }).then((entries) => {
      setCustomDatesStyles(entries.map(entry => {
        return {
          date: moment(entry.date),
          style: { backgroundColor: theme.colors.stars[`star${entry.rating}`] },
          textStyle: { color: 'black' }, // sets the font color
          containerStyle: [], // extra styling for day container
          allowDisabled: true, // allow custom style to apply to disabled dates
        }
      }));
    });
  }, [currentMonth]);


  // Show correct entry when seleted date is changed
  useEffect(() => {
    if (!selectedDate) return;

    getEntries({ minDate: selectedDate.toDate(), maxDate: selectedDate.toDate() }).then((results) => {
      if (results.length == 0) {
        setSelectedEntry(EMPTY_ENTRY);
        return;
      };
      showModal();
      const result = results[0];
      setSelectedEntry(result);
    });
  }, [selectedDate]);


  return (
    <View style={styles.base}>
      <Portal>
{/*         <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <Text>Valittu: {startDate}</Text>
          <Stars rating={selectedEntry.rating} editable={false} />
          <ScrollView>
            <Paragraph>
              {selectedEntry.date.toString()} {selectedEntry.text}
            </Paragraph>
          </ScrollView>
          <Button
            mode="elevated"
            onPress={hideModal}
            style={{ margin: 5 }}>
            Takaisin
          </Button>
        </Modal> */}
        
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.dateSyles}>{startDate}</Text>
          <Stars rating={selectedEntry.rating} editable={false} />
          <ScrollView>
            <Paragraph>
              {/* {selectedEntry.date.toString()} */}
              
               {selectedEntry.text}
            </Paragraph>
          </ScrollView>
          <Button
            mode="elevated"
            onPress={hideModal}
            style={{ margin: 5 }}>
            Takaisin
          </Button>
        </Modal> 

      </Portal>
      <CalendarPicker
        weekdays={fin.days}
        months={fin.months}
        startFromMonday={true}
        previousTitle={"⟽"} // "Edellinen"
        nextTitle={"⟾"}     // "Seuraava"
        textStyle={styles.text}
        customDatesStyles={customDatesStyles}
        onDateChange={(date) => setSelectedDate(date)}
        onMonthChange={(date) => setCurrentMonth(date)}
      />
    </View>
  );
}

export default CalendarView;
