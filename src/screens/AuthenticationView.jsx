import { StyleSheet, View, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import CodePin from 'react-native-pin-code';

import { checkPin } from "../storage/settings";

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const AuthenticationView = ({ navigation }) => {
  const theme = useTheme();
  const pinStyle = StyleSheet.create({
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
      color: theme.colors.onSurfaceVariant,
      fontSize: 20,
      marginTop: 30
    },
    error: {
      textAlign: 'center',
      color: theme.colors.error,
      paddingTop: 10 
    }
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CodePin
        number={4}
        checkPinCode={async (code, callback) => callback(await checkPin(code))}
        success={() => navigation.navigate("Tabs")}
        text="Kirjaa PIN"
        error="Väärin"
        keyboardType="numeric"
        obfuscation={true}
        containerStyle={pinStyle.container}
        containerPinStyle={pinStyle.containerPin}
        pinStyle={pinStyle.pin}
        textStyle={pinStyle.text}
        errorStyle={pinStyle.error}
      />
    </View>
  );
}

export default AuthenticationView;
