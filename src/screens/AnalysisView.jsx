import { useState } from 'react';
import { Pressable, View, Dimensions } from 'react-native';
import {
  Text,
  Title,
  Divider,
  useTheme,
  Chip,
} from 'react-native-paper';

import Stars from "../components/Stars";
import { getStyles } from "../styles/analysisView";


const AnalysisView = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const theme = useTheme();

  const handlePress = index => {
    setRating(index);
    return index;
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.base}>
      <View style={styles.titleContainer}>
        <Title>
          Valitse haluamasi tähtimäärä
        </Title>
      </View>

      <View style={styles.starsContainer}>
        <Stars
          rating={rating}
          editable={true}
          onChange={(handlePress)} />
      </View>
      
      <View style={styles.containerCenter}>
        <Title>
          {rating+1} tähden päivissä sanoja:
        </Title>
      </View>
      <Divider />
      
      <View style={styles.chipContainer}>
        <Chip>Sana</Chip>
        <Chip>Sana</Chip>
        <Chip>Sana</Chip>
        <Chip>Sana</Chip>
      </View>
    </View>
  );
};

export default AnalysisView;
