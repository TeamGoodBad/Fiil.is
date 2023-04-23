import {useState, useRef, useEffect} from 'react';
import {View, SafeAreaView, Animated, ScrollView} from 'react-native';
import {Text, Title, Divider, useTheme, ProgressBar} from 'react-native-paper';
import {ratingWords} from '../storage/analysis';

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
              <View
                style={{
                  marginBottom: 10,
                  backgroundColor: '#deefe9',
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                key={word[0]}>
                <Text style={{width: '50%'}}> {word[0]}</Text>
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
    </SafeAreaView>
  );
};

export default AnalysisView;
