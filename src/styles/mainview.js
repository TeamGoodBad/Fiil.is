import { StyleSheet, Dimensions } from 'react-native';
import { getStyle } from './baseStyle';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export const getStyles = (theme) => StyleSheet.create({
    base: getStyle().container,
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    textInputStyle: {
      flex: 1,
      width: '95%',
    },
    dateText: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    }
});