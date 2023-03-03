import { View, Button } from "react-native"
import { Text } from 'react-native-paper';
import { MMKV } from "../storage/settings";

const AuthenticationView = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Authentication view</Text>
      <Button title="Authenticate!" onPress={() => navigation.navigate("Tabs")} />
    </View>
  );
}

export default AuthenticationView;