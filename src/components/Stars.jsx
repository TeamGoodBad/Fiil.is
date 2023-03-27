import {useState, useEffect, useRef} from 'react';
import {Pressable, View, Dimensions, Animated} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WINDOW_HEIGHT = Dimensions.get('window').height;

// rating - how many stars checked by indexes: 0,1,2,3,4
// editable - is it possible to change rating
const Stars = ({rating, editable, onChange}) => {
  const [stars, setStars] = useState([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (rating < -1) {
      return;
    }
    const newArray = Array(5)
      .fill(true)
      .fill(false, rating + 1);
    setStars(newArray);
  }, [rating]);

  const theme = useTheme();
  const handlePress = index => {
    const newStars = stars.map((s, i) => {
      if (i <= index) {
        return true;
      }
      return false;
    });
    setStars(newStars);
    if (editable) onChange(index);
    return index;
  };

  return (
    <Animated.View
      style={{
        height: WINDOW_HEIGHT * 0.12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingBottom: 10,
        opacity: fadeAnim,
      }}>
      {stars.map((star, index) => {
        return (
          <Pressable
            onPress={e => (editable ? handlePress(index) : null)}
            key={index}>
            <MaterialCommunityIcons
              color={theme.colors.stars[`star${index}`]}
              name={star ? 'star' : 'star-outline'}
              size={60}
            />
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

export default Stars;
