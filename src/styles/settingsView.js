import { StyleSheet, Dimensions } from 'react-native';
import { getBaseStyle } from './baseStyle';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const basestyle = getBaseStyle();

export const getStyles = (theme) => StyleSheet.create({
    ...basestyle,
    containerCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    chipContainer: {
        overflow: 'scroll',
        flexDirection: 'column',
        rowGap: 10,
        padding: '5%',
    }
});

export const getPinStyles = (theme) => StyleSheet.create({
    container: {
      height: 150,
      width: WINDOW_WIDTH,
      backgroundColor: theme.colors.background,
    },
    containerPin: {
      height: 40,
      width: WINDOW_WIDTH,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: 20,
    },
    pin: {
      backgroundColor: theme.colors.surfaceVariant,
      textAlign: 'center',
      flex: 1,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 5,
      shadowColor: '#00000000',
      shadowOffset: {width: 1,height : 1},
      shadowRadius: 5,
      shadowOpacity : 0.4
    },
    text: {
      textAlign: 'center',
      color: theme.colors.onBackground,
      fontSize: 20,
      marginTop: 30
    },
    error: {
      textAlign: 'center',
      color: theme.colors.error,
      paddingTop: 10 
    }
  });