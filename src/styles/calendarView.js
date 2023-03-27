import {StyleSheet} from 'react-native';
import {getStyle} from './baseStyle';

export const getStyles = theme =>
  StyleSheet.create({
    base: getStyle().container,
    container: {
      flex: 1,
      padding: 10,
      height: '100%',
      backgroundColor: theme.colors.background,
    },
    modalContainer: {
      minHeight: 200,
      backgroundColor: theme.colors.background,
      padding: 15,
      margin: 20,
      marginTop: 60,
      marginBottom: 60,
      borderRadius: 10,
    },
    text: {
      color: theme.colors.onBackground,
      fontFamily: theme.fontFamily,
    },
  });

export const getFin = () => {
  const finDays = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'];
  const finMonths = [
    'Tammikuu',
    'Helmikuu',
    'Maaliskuu',
    'Huhtikuu',
    'Toukokuu',
    'Kesäkuu',
    'Heinäkuu',
    'Elokuu',
    'Syyskuu',
    'Lokakuu',
    'Marraskuu',
    'Joulukuu',
  ];
  return {days: finDays, months: finMonths};
};
