import { useState } from 'react';
import { Pressable, View, Dimensions } from 'react-native';
import { Text, Button, TextInput, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";

import { UserDB } from "../storage/userdata";
import Stars from "../components/Stars";

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;


const MainView = ({ navigation }) => {
  const theme = useTheme();
  const [testField, setTestField] = useMMKVStorage("test", UserDB, "");
  const [rating, setRating] = useState(0);

  const handlePress = index => {
    setRating(index);
    return index;
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
        <Text variant="headlineLarge" color={theme.colors.onSurface}>
          Miten päiväsi on mennyt?
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
          value={testField}
          onChangeText={text => setTestField(text)}
        />
        <Button style={{ margin: 20, width: 200 }} mode="contained">
          Tallenna
        </Button>
      </View>
    </View>
  );
};

export default MainView;
