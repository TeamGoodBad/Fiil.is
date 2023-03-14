import { useMemo } from 'react';
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const getCalendarStyles = (theme) => StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: theme.background,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
    });

function useCalendarStyles() {
    const { theme } = useTheme();

    const styles = useMemo(() => getCalendarStyles({ theme }), [theme]);

    return styles;
}

export default useCalendarStyles;