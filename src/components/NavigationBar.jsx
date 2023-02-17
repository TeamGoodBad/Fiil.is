import { View, Text, StyleSheet, Button } from "react-native"



const NavigationBar = ({ navigation }) => {
  return (
    <View>
      <Button title="Main" onPress={() => { navigation.navigate('Main'); }} />
      <Button title="Settings" onPress={() => { navigation.navigate('Settings'); }} />
      <Button title="Calendar" onPress={() => { navigation.navigate('Calendar'); }} />
      <Button title="Analysis" onPress={() => { navigation.navigate('Analysis'); }} />
    </View>
  );
}

export default NavigationBar;