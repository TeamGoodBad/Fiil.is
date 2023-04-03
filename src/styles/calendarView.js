
import { StyleSheet } from 'react-native';
import { getBaseStyle } from './baseStyle';


export const getStyles = (theme) => StyleSheet.create({
    base: getBaseStyle().container,
    container: {
      flex: 1,
      padding: 10,
      height: '100%',
      backgroundColor: theme.colors.background,
    },
    scrollContainer: {
      flex: 6
    },
    modalContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 15,
      marginHorizontal: "5%",
      marginTop: "10%",
      marginBottom: "15%",
      borderRadius: 10,
    },
    text: {
      color: theme.colors.onBackground,
      fontFamily: theme.fontFamily,

      fontVariant: 'title',
    },
    dateSyles: {
      marginLeft: "30%",
      fontSize: 30,
    }
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
