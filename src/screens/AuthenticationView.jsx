import { View, Text, Button } from "react-native"

const AuthenticationView = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Authentication view</Text>
      <Button title="Authenticate!" onPress={() => navigation.navigate("Tabs")} />
    </View>
  );
}

export default AuthenticationView;