import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabScreens from './TabScreens';
import AuthenticationView from '../screens/AuthenticationView';

  /** Wraps authentication view with rest of the app */
export default AuthenticationWrapper = ({ pin }) => {
    const Stack = createNativeStackNavigator();

    return (
    <Stack.Navigator initialRouteName={pin != "" ? "Authentication" : "Tabs"}>
      <Stack.Screen
        name="Authentication"
        component={AuthenticationView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={TabScreens}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    );
}