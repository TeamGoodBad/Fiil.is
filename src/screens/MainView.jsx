import { View } from "react-native";
import { Text, TextInput } from 'react-native-paper';

const MainView = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
      <Text>Main View</Text>
      <TextInput
        style={{height: 40}}
      />
    </View >
  );
}

export default MainView;