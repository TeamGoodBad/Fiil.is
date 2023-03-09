import { View, Button } from "react-native"
import { Text } from 'react-native-paper';
import CodePin from 'react-native-pin-code';

import { checkPin } from "../storage/settings";


const AuthenticationView = ({ navigation }) => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="OHITA!" onPress={() => navigation.navigate("Tabs")} />
      <CodePin
        number={4}
        checkPinCode={async (code, callback) => callback(await checkPin(code))}
        success={() => navigation.navigate("Tabs")}
        text="Kirjaa salasana"
        error="Väärin"
        keyboardType="numeric"
        obfuscation={true}
      />
    </View>
  );
}

export default AuthenticationView;
