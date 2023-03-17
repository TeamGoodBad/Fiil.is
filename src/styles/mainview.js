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
    earlierViewThatHadTextInside: {
      height: WINDOW_HEIGHT * 0.2,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    viewForTextInputAndButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle: {
      flex: 5,
      width: '95%',
    },
    buttonStyle: {
      margin: 10,
    },
    topView: {
      height: 100,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 10,
    }
});