import { View, Button } from "react-native"
import CodePin from 'react-native-pin-code';

import { checkPin } from "../storage/settings";


const AuthenticationView = ({ navigation }) => {
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
      />
    </View>
  );
}

export default AuthenticationView;
