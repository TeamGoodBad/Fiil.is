import React, {useEffect, useState} from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import {Button, Modal, Portal, useTheme, Paragraph} from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import TitleAndStars from '../components/TitleAndStars';

import {getStyles, getFin} from '../styles/calendarView';
import {EMPTY_ENTRY, getEntries} from '../storage/userdata';

const CalendarView = ({navigation}) => {
  //Navigoi main menuun
  const handleEditPress = () => {
    //console.log(selectedEntry)
    hideModal();
    navigation.navigate('Main', {selectedEntry: JSON.stringify(selectedEntry)});
  };

  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [customDatesStyles, setCustomDatesStyles] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(EMPTY_ENTRY);

  const startDate = selectedDate
    ? selectedDate.format('DD.MM.YYYY').toString()
    : ''; // FIXME: Always formats time in Finnish locale

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

    getEntries({minDate: monthStart, maxDate: monthEnd}).then(entries => {
      setCustomDatesStyles(
        entries.map(entry => {
          return {
            date: moment(entry.date),
            style: {backgroundColor: theme.colors.stars[`star${entry.rating}`]},
            textStyle: {color: 'black'}, // sets the font color
            containerStyle: [], // extra styling for day container
            allowDisabled: true, // allow custom style to apply to disabled dates
          };
        }),
      );
    });
  }, [currentMonth]);

  // Show correct entry when seleted date is changed
  useEffect(() => {
    if (!selectedDate) return;

    getEntries({
      minDate: selectedDate.toDate(),
      maxDate: selectedDate.toDate(),
    }).then(results => {
      if (results.length == 0) {
        setSelectedEntry(EMPTY_ENTRY);
        return;
      }
      showModal();
      const result = results[0];
      setSelectedEntry(result);
    });
  }, [selectedDate]);

  return (
    <SafeAreaView style={{flex: 1, height: '100%'}}>
      <View style={styles.base}>
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}>
            <TitleAndStars
              stars={{rating: selectedEntry.rating, editable: false}}
              titleContent={startDate}
              buttonContent={{
                isButton: true,
                onPress: hideModal,
                text: '  ✕  ',
              }}
            />
            <View style={{flex: 8}}>
              <ScrollView showsVerticalScrollIndicator={true}>
                <Paragraph>{selectedEntry.text}</Paragraph>
              </ScrollView>
              <Button
                title="Edit"
                onPress={handleEditPress}
                mode="elevated"
                style={{margin: 5}}>
                Muokkaa
              </Button>
            </View>
          </Modal>
        </Portal>
        <CalendarPicker
          weekdays={fin.days}
          months={fin.months}
          startFromMonday={true}
          previousTitle={'⟽'} // "Edellinen"
          nextTitle={'⟾'} // "Seuraava"
          textStyle={styles.text}
          customDatesStyles={customDatesStyles}
          onDateChange={date => setSelectedDate(date)}
          onMonthChange={date => setCurrentMonth(date)}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarView;
