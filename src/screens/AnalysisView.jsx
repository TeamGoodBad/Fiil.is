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
import TitleAndStars from '../components/TitleAndStars';
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
      <TitleAndStars
        stars={{rating: rating, editable: true, onChange: handlePress}}
        titleContent={"Valitse haluamasi tähtimäärä"} />
      <View style={styles.midContainer}>
        <View style={styles.titleContainer}>
          <Title>
            {rating+1} tähden päivissä sanoja:
          </Title>
        </View>
        
        <View style={styles.chipContainer}>
          <Chip>Sana</Chip>
          <Chip>Sana</Chip>
          <Chip>Sana</Chip>
          <Chip>Sana</Chip>
        </View>
      </View>
    </View>
  );
};

export default AnalysisView;
