import {useState, useRef, useEffect} from 'react';
import {
  Pressable,
  View,
  Dimensions,
  SafeAreaView,
  Animated,
  ScrollView,
} from 'react-native';
import {Text, Title, Divider, useTheme, Chip} from 'react-native-paper';
import {ratingWords} from '../storage/analysis';

import Stars from '../components/Stars';
import {getStyles} from '../styles/analysisView';
import TitleAndStars from '../components/TitleAndStars';

const AnalysisView = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const [words, setWords] = useState([]);
  const theme = useTheme();

  const slideAnim = useRef(new Animated.Value(-300)).current; // Initial value for opacity: 0

  useEffect(() => {
    ratingWords(rating).then(res => {
      setWords(res);
    });
  }, [rating]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [slideAnim]);

  const handlePress = index => {
    setRating(index);
    return index;
  };

  const styles = getStyles(theme);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.base}>
        <View style={styles.containerCenter}>
          <Title>Valitse haluamasi tähtimäärä</Title>
        </View>

        <Stars rating={rating} editable={true} onChange={handlePress} />

        <View style={styles.containerCenter}>
          <Title>{rating + 1} tähden päivissä sanoja:</Title>
        </View>
        <Divider />
        <ScrollView style={styles.chipContainer}>
          {words.map(word => {
            return (
              <Chip style={{marginBottom: 10}} key={word[0]}>
                {word[0]}
              </Chip>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AnalysisView;
