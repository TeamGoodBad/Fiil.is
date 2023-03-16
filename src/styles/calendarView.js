import { StyleSheet } from 'react-native';
import { getStyle } from './baseStyle';


export const getStyles = (theme) => StyleSheet.create({
    base: getStyle().container,
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.colors.background,
    },
    modalContainer: {
      flex: 3,
      backgroundColor: theme.colors.background,
      padding: 15,
      margin: 20,
      marginTop: 40,
    },
    text: {
      color: theme.colors.onBackground,
    }
});