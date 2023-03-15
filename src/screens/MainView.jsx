import { useState } from 'react';
import { Pressable, View, Dimensions } from 'react-native';
import { Text, Button, TextInput, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";
import moment from 'moment';

import { CURRENT_TEXT_KEY, CURRENT_RATING_KEY, UserDB, setEntry } from "../storage/userdata";
import Stars from "../components/Stars";

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;


const MainView = ({ navigation }) => {
  const theme = useTheme();

  const [text, setText] = useMMKVStorage(CURRENT_TEXT_KEY, UserDB, "");
  const [rating, setRating] = useMMKVStorage(CURRENT_RATING_KEY, UserDB, -1);


  const handlePress = index => {
    setRating(index);
    return index;
  }


  /**
   * Saves current temporary entry to database with given date
   * @param {Date} date Entry date. Time of day is ignored.
   */
  const saveEntry = async () => {
    const entry = {
      rating: rating,
      text: text,
      date: new Date(),
    };
    await setEntry(entry); // Save to db with current date
  }


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <View
        style={{
          display: 'flex',
          height: WINDOW_HEIGHT * 0.2,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Text variant="titleMedium">
          {moment().format('DD.MM.YYYY').toString()}
        </Text>
      </View>

      <Stars
        rating={rating}
        editable={true}
        onChange={(handlePress)} />

      <View
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          multiline={true}
          mode="outlined"
          placeholder={'Kerro lisää...'}
          style={{ height: WINDOW_HEIGHT * 0.4, width: '100%' }}
          value={text}
          onChangeText={text => setText(text)}
        />
        <Button
          style={{ margin: 20, width: 200 }}
          mode="contained"
          onPress={() => saveEntry()}
        >
          Tallenna
        </Button>
      </View>
    </View>
  );
};

export default MainView;
