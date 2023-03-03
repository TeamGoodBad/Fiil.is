import { View, Button } from "react-native"
import { Text } from 'react-native-paper';
import CodePin from 'react-native-pin-code';

const AuthenticationView = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Authentication view</Text>
      <Button title="OHITA!" onPress={() => navigation.navigate("Tabs")} />
      <CodePin
        number={4}
        code="1111" //TODO lisää linkki databaseen jolloin käyttäjän oma salasana
        success={() => navigation.navigate("Tabs")} 
        text="Kirjaa salasana" 
        error="Väärin" 
        autoFocusFirst={false} 
        keyboardType="numeric"
      />
      
    </View>
  );
}

export default AuthenticationView;