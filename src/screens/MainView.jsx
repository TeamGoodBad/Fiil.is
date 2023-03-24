import { View, Keyboard } from 'react-native';
import { Title, Button, TextInput, useTheme } from 'react-native-paper';
import { useMMKVStorage } from "react-native-mmkv-storage";
import moment from 'moment';

import { CURRENT_TEXT_KEY, CURRENT_RATING_KEY, UserDB, setEntry, getEntries, CURRENT_EDITING_STARTED } from "../storage/userdata";
import Stars from "../components/Stars";
import { getStyles } from "../styles/mainview";
import { useEffect, useState } from 'react';


const MainView = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [text, setText] = useMMKVStorage(CURRENT_TEXT_KEY, UserDB, "");
  const [rating, setRating] = useMMKVStorage(CURRENT_RATING_KEY, UserDB, -1);
  const [editingStarted, setEditingStarted] = useMMKVStorage(CURRENT_EDITING_STARTED, UserDB, null);

  const handlePress = index => {
    setRating(index);
    return index;
  }

  // Change to older entry if editing
  useEffect(() => {
    if (route.params && route.params.selectedEntry) {
      const { selectedEntry } = route.params;
      const parsedSelectedEntry = JSON.parse(selectedEntry);

      setText(parsedSelectedEntry.text);
      setRating(parsedSelectedEntry.rating);
      setEditingStarted(moment(parsedSelectedEntry.date).toISOString());
      console.log(parsedSelectedEntry);
    }
  }, [route.params]);

  // Lataa muistista tallennetun entryn halutulle päivälle. Jos entryä ei ole, ei tee mitään.
  const loadEntryFromDateIfSaved = async (date) => {
    getEntries({minDate: date, maxDate: date}).then(entries => {
      if (entries.length > 0) {
        setText(entries[0].text);
        setRating(entries[0].rating);
      }
    });
  }

  // Wipe current entry if editing of it was started "yesterday"
  useEffect(() => {
    let now = new Date();
    let then = new Date(editingStarted ? editingStarted : now);
    // `now.getMonth() * 40` to wipe even if user manages to use app about a month apart
    if (now.getMonth() * 40 + now.getDate() != then.getMonth() * 40 + then.getDate()) {
      setText("");
      setRating(-1);
      loadEntryFromDateIfSaved(now);
      //loadEntryFromDateIfSaved(new Date());
      setEditingStarted(now.toISOString());
    }
  }, []);


  /**
   * Saves current temporary entry to database with given date
   * @param {Date} date Entry date. Time of day is ignored.
   */
  const saveEntry = async () => {
    const entry = {
      rating: rating,
      text: text,
      date: new Date(editingStarted),
    };
    await setEntry(entry); // Save to db
    Keyboard.dismiss();
  };

  return (
    <View
      style={styles.base}>
      <View style={styles.container}>
        <View style={styles.topView}>
          <Title>
            {moment(editingStarted).format('DD.MM.YYYY').toString()}
          </Title>
          <Stars
            rating={rating}
            editable={true}
            onChange={(handlePress)} />
        </View>
        <TextInput
          multiline={true}
          mode="outlined"
          placeholder={'Tänään...'}
          style={styles.textInputStyle}
          value={text}
          onChangeText={text => { setText(text) }}
        />
        <Button
          style={styles.buttonStyle}
          mode="contained"
          onPress={() => saveEntry()}>
          Tallenna
        </Button>
      </View>
    </View>
  );
};

export default MainView;