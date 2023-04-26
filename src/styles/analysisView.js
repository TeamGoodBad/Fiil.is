import {StyleSheet} from 'react-native';
import {getBaseStyle} from './baseStyle';
import {ratingWords} from '../storage/analysis';

const basestyle = getBaseStyle();

export const getStyles = theme =>
  StyleSheet.create({
    ...basestyle,
    chipContainer: {
      padding: 10,
      flex: 7,
      rowGap: 10,
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
