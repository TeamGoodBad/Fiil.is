import {useState, useRef, useEffect} from 'react';
import {
  Pressable,
  View,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Title, Divider, useTheme, Chip} from 'react-native-paper';

import Stars from '../components/Stars';
import {getStyles} from '../styles/analysisView';
import TitleAndStars from '../components/TitleAndStars';

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
    <View style={{flex: 1, backgroundColor: '#051049'}}>
      <LinearGradient
        colors={['#0067CE', 'purple']}
        style={{
          display: 'flex',
          height: '40%',
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <SafeAreaView style={{flex: 1}} />
        <Text variant="displaySmall" style={{padding: 20, color: '#fff'}}>
          {rating + 1} ⭐️ päivissä sanoja:
        </Text>
        <Stars rating={rating} editable={true} onChange={handlePress} />
      </LinearGradient>
      <View style={styles.chipContainer}>
        <Chip style={{top: slideAnim}}>Sana</Chip>
        <Chip style={{top: slideAnim}}>Sana</Chip>
        <Chip style={{top: slideAnim}}>Sana</Chip>
        <Chip style={{top: slideAnim}}>Sana</Chip>
        <Chip style={{top: slideAnim}}>Sana</Chip>
      </View>
    </View>
  );
};

export default AnalysisView;
