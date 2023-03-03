import { View } from "react-native";
import { Text, TextInput } from 'react-native-paper';
import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";
import { UserDB } from "../storage/userdata";


const MainView = ({ navigation }) => {
  const [testField, setTestField] = useMMKVStorage("test", UserDB, "");

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main View</Text>
      <TextInput
        style={{ height: 40 }}
        value={testField}
        onChangeText={text => setTestField(text)}
      />
    </View >
  );
}

export default MainView;
