import {useState, useRef, useEffect} from 'react';
import {
  Pressable,
  View,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import {Text, Title, Divider, useTheme, Chip} from 'react-native-paper';

import Stars from '../components/Stars';
import {getStyles} from '../styles/analysisView';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const AnalysisView = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const theme = useTheme();

  const slideAnim = useRef(new Animated.Value(-300)).current; // Initial value for opacity: 0

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
        <View style={styles.chipContainer}>
          <Chip style={{top: slideAnim}}>Sana</Chip>
          <Chip style={{top: slideAnim}}>Sana</Chip>
          <Chip style={{top: slideAnim}}>Sana</Chip>
          <Chip style={{top: slideAnim}}>Sana</Chip>
          <Chip style={{top: slideAnim}}>Sana</Chip>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AnalysisView;
