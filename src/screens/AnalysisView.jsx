import { useState } from 'react';
import { Pressable, View, Dimensions } from 'react-native';
import {
  Text,
  Button,
  TextInput,
  Divider,
  useTheme,
  Chip,
} from 'react-native-paper';

import Stars from "../components/Stars";

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const AnalysisView = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const theme = useTheme();

  const handlePress = index => {
    setRating(index);
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

      <Stars
        rating={rating}
        editable={true}
        onChange={(handlePress)} />

      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text variant="headlineMedium" color={theme.colors.onSurface}>
          {rating+1} tähden päivissä sanoja
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
