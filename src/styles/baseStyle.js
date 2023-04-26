import {StyleSheet} from 'react-native';

/**
 * Style, which takes care of the biggest container / view
 * @returns style, which should be used as the base
 */
export const getBaseStyle = () =>
  StyleSheet.create({
    base: {
      flex: 1,
      /* marginTop: 20, */
    },
    starsContainer: {
      flex: 1,
      minHeight: 25,
      justifyContent: 'flex-start',
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      justifyContent: 'space-between',
    },
    titleAndStarsContainer: {
      flex: 2,
      justifyContent: 'flex-start',
      minHeight: 20,
    },
  });
