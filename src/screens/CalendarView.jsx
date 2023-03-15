import React, { useState } from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { Button, Text, Modal, Portal, useTheme } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import Stars from '../components/Stars';

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
      padding: 15,
      margin: 20,
      marginTop: 40,
    },
    text: {
      color: theme.colors.onBackground,
    }
  });

  const handlePress = async (date) => {
    setSelectedStartDate(date);
    setEntry({date: date, rating: 2, text:"changed to " + date.format('DD.MM.YYYY').toString() + testiteksti});
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
          <Stars rating={entry.rating} editable={false} />
          <ScrollView>
            <Text>
              {entry.date.toString()} {entry.text}
            </Text>
          </ScrollView>
          <Button
            mode="elevated"
            onPress={hideModal}
            style={{margin: 5}}>
            Takaisin
          </Button>
          
        </Modal>
      </Portal>
      <CalendarPicker
        weekdays={finDays}
        months={finMonths}
        startFromMonday={true}
        showDayStragglers={true}
        previousTitle={"◄"} // "Edellinen"
        nextTitle={"►"}     // "Seuraava"
        textStyle={styles.text}
        onDateChange={handlePress}
      />
    </View>

  );
}


const testiteksti = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. In quis leo aliquet massa bibendum sagittis id consectetur sem. Nam et ligula ullamcorper, luctus ipsum ac, consequat nisi. Maecenas ornare elit vitae justo maximus finibus. Vestibulum tincidunt sapien at mi ullamcorper, pellentesque scelerisque arcu tempus. Quisque eu libero augue. Praesent cursus purus nec neque pulvinar tempor. Morbi non enim eu sapien ullamcorper molestie sed blandit tellus. Aliquam erat volutpat. Integer ac pellentesque sem, id pharetra odio. Sed egestas non ex eget commodo. Duis tellus felis, accumsan in velit id, tempus pretium purus. Sed quis euismod purus. Quisque nec metus vestibulum, ultricies erat mollis, mattis turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis arcu vel velit commodo aliquet. Sed nec libero eget risus vehicula viverra. \nMaecenas venenatis ornare est. In urna diam, consectetur at feugiat et, porttitor ut augue. Duis elementum nec erat ut ullamcorper. Cras gravida mattis tempor. Etiam sed tempor nulla. Etiam velit turpis, aliquet sed ligula vitae, lacinia cursus magna. Nunc semper consectetur mollis. Nam commodo risus lacinia ultrices volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed bibendum augue sed dapibus aliquam. Pellentesque tristique urna ac sodales luctus. Duis urna quam, molestie quis elementum consequat, sollicitudin in purus. Mauris gravida in justo sed feugiat. Phasellus cursus, ligula quis sodales aliquam, velit nibh lacinia felis, ut aliquet lorem dolor a nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis vel sapien in erat maximus sagittis. \nNam at viverra est. Sed id imperdiet libero, vitae ullamcorper elit. Fusce eget nibh nec mi hendrerit consectetur non id nulla. Vivamus vel commodo est, nec lobortis massa. Sed pretium in lacus vitae posuere. Aenean ullamcorper commodo nulla dapibus consectetur. Nullam non magna vitae turpis pulvinar porta nec sit amet lectus. Pellentesque tincidunt odio vel elementum elementum. Nulla posuere quam malesuada convallis ornare. Integer consectetur sodales mauris, eu molestie metus blandit non. Praesent fringilla tempus ullamcorper. Cras nec diam mauris. Morbi eu egestas dui. Vivamus vitae erat mollis, lacinia est at, varius neque.";

export default CalendarView;