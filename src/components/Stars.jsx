import { useState } from 'react';
import { Pressable, View, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WINDOW_HEIGHT = Dimensions.get('window').height;

// rating - how many stars checked
// editable - is it possible to change rating
const Stars = ({ rating, editable }) => {
  const [stars, setStars] = useState(
    Array(5).fill(true).fill(false, rating)
  );
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
    <View style={{
      height: WINDOW_HEIGHT * 0.15,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    }}>
      {stars.map((star, index) => {
        return (
          <Pressable onPress={e => editable ? handlePress(index) : null} key={index}>
            <MaterialCommunityIcons
              color={theme.colors.stars[("star"+index)]}
              name={star ? 'star' : 'star-outline'}
              size={76}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default Stars;
