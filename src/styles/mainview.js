import { StyleSheet, Dimensions } from 'react-native';
import { getBaseStyle as getBaseStyle } from './baseStyle';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const basestyle = getBaseStyle();

export const getStyles = (theme) => StyleSheet.create({
    ...basestyle,
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    textInputContainer: {
      flex: 6,
      paddingHorizontal: 10,
    },
    textInputStyle: {
      flex: 1,
      minWidth: '100%',
    },
    buttonContainer: {
      flex:1,
      padding: 5,
      minHeight: 20,
    },

});