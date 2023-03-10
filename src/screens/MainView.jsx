import { useState } from 'react';
import { Pressable, View, Dimensions } from 'react-native';
import { Text, Button, TextInput, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";

import { UserDB } from "../storage/userdata";

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;


const MainView = ({ navigation }) => {
  const [stars, setStars] = useState([false, false, false, false, false]);
  const theme = useTheme();
  const [testField, setTestField] = useMMKVStorage("test", UserDB, "");

  const handlePress = index => {
    const newStars = stars.map((s, i) => {
      if (i <= index) {
        return true;
      }
      return false;
    });
    setStars(newStars);
    return index;
  };

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
        <Text variant="headlineLarge" color={theme.colors.onSurface}>
          Miten päiväsi on mennyt?
        </Text>
      </View>
      <View
        style={{
          height: WINDOW_HEIGHT * 0.15,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        {stars.map((star, index) => {
          return (
            <Pressable onPress={e => handlePress(index)} key={index}>
              <MaterialCommunityIcons
                color={'yellow'}
                name={star ? 'star' : 'star-outline'}
                size={76}
              />
            </Pressable>
          );
        })}
      </View>
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

          style={{height: WINDOW_HEIGHT * 0.3, width: '100%'}}
        />
        <Button style={{margin: '5%', width: 200}} mode="contained">
          Tallenna
        </Button>
      </View>
    </View>
  );
};

export default MainView;
