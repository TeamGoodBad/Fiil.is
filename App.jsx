import React from 'react';
import {Text, View} from 'react-native';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>🎉 Hello, world! 🥳</Text>
      <Text>CI/CD seems to be working as well!</Text>
    </View>
  );
};
export default App;
