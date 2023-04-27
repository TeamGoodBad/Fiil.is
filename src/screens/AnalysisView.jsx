import {useState, useRef, useEffect} from 'react';
import {View, SafeAreaView, Animated, ScrollView} from 'react-native';
import {Text, Title, Divider, useTheme, ProgressBar} from 'react-native-paper';
import {ratingWords} from '../storage/analysis';
import LinearGradient from 'react-native-linear-gradient';
import TitleAndStars from '../components/TitleAndStars';

import Stars from '../components/Stars';
import {getStyles} from '../styles/analysisView';

const AnalysisView = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const [words, setWords] = useState([]);
  const [most, setMost] = useState(0);

  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(-300)).current; // Initial value for opacity: 0

  useEffect(() => {
    ratingWords(rating).then(res => {
      setWords(res);
      const values = res.map(a => {
        return a[1];
      });
      const sorted = values.sort(function (a, b) {
        return a - b;
      });
      setMost(sorted[sorted.length - 1]);
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
    <View style={styles.base}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.background]}
        style={{
          display: 'flex',
          flex: 3,
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <SafeAreaView />
        <TitleAndStars
          stars={{rating: rating, editable: true, onChange: handlePress}}
          titleContent={'Valitse tähtimäärä'}
        />
      </LinearGradient>
      <Divider />
      <View style={styles.chipContainer}>
        <ScrollView>
          {words.map(word => {
            return (
              <View
                style={{
                  marginBottom: 10,
                  backgroundColor: theme.colors.primaryContainer,
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                key={word[0]}>
                <Text
                  style={{
                    width: '50%',
                    color: theme.colors.onPrimaryContainer,
                  }}>
                  {' '}
                  {word[0]}
                </Text>
                <View style={{width: '50%'}}>
                  <View
                    style={{
                      backgroundColor: '#F78725',
                      width: `${(word[1] / most) * 100}%`,
                      height: '80%',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default AnalysisView;
