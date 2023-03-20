import { StyleSheet, View, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import CodePin from 'react-native-pin-code';

import { checkPin } from "../storage/settings";
import { getPinStyles } from "../styles/settingsView";

const AuthenticationView = ({ navigation }) => {
  const theme = useTheme();
  const pinStyle = getPinStyles(theme);

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
