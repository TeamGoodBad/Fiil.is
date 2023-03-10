import {useState} from 'react';
import {Pressable, View, Dimensions} from 'react-native';
import {
  Text,
  Button,
  TextInput,
  Divider,
  useTheme,
  Chip,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const AnalysisView = ({navigation}) => {
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
        marginTop: '20%',
      }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text variant="headlineLarge" color={theme.colors.onSurface}>
          Valitse haluamasi tähtimäärä
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text variant="headlineMedium" color={theme.colors.onSurface}>
          {stars.filter(s => s).length} tähden päivissä sanoja
        </Text>
      </View>
      <Divider />
      <View
        style={{
          overflow: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          rowGap: 10,
          padding: '5%',
        }}>
        <Chip>Sana</Chip>
        <Chip>Sana</Chip>
        <Chip>Sana</Chip>
        <Chip>Sana</Chip>
      </View>
    </View>
  );
};

export default AnalysisView;
