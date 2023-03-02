import {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Text, Button, TextInput, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MainView = ({navigation}) => {
  const [stars, setStars] = useState([false, false, false, false, false]);
  const theme = useTheme();

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
          height: '20%',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Text variant="headlineLarge" color={theme.colors.onSurface}>
          Miten päiväsi on mennyt?
        </Text>
      </View>
      <View
        style={{
          height: '20%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        {stars.map((star, index) => {
          return (
            <Pressable onPress={e => handlePress(index)} key={index}>
              <MaterialCommunityIcons
                name={star ? 'star' : 'star-outline'}
                size={76}
              />
            </Pressable>
          );
        })}
      </View>
      <View
        style={{
          height: '55%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          multiline={true}
          mode="outlined"
          placeholder={'Kerro lisää...'}
          style={{height: 400, width: '100%'}}
        />
        <Button style={{margin: 10, width: 200}} mode="contained">
          Save
        </Button>
      </View>
    </View>
  );
};

export default MainView;
