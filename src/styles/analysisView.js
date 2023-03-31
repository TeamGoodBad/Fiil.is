import {StyleSheet} from 'react-native';
import {getBaseStyle} from './baseStyle';

const basestyle = getBaseStyle();

export const getStyles = theme =>
  StyleSheet.create({
    ...basestyle,
    chipContainer: {
      flex: 7,
      overflow: 'scroll',
      rowGap: 10,
      padding: '5%',
    },
    containerCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    midContainer: {
      flex: 7,
      borderWidth: 1,
      borderColor: theme.colors.onBackground,
      borderRadius: 5,
      margin: 10,
    },
    chipStyle: {
      backgroundColor: theme.colors.onPrimaryContainer,
    },
  });
