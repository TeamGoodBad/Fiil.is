import { View, StyleSheet } from "react-native";
import { useTheme, Button } from 'react-native-paper';
import { generateMockEntries } from '../storage/mock-entries';
import { dump, clearUserDB } from '../storage/userdata';

import NotificationButton from "../components/NotificationButton";


export const DebugView = ({ navigation }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    setting: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: '20%',
      paddingLeft: '20%',
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.content}>
        <Button mode="elevated" onPress={async () => console.log(await dump())}>
          Dumppaa UserDB konsoliin
        </Button>
        <Button mode="elevated" onPress={() => clearUserDB()}>
          Pyyhi UserDB
        </Button>
        <Button mode="elevated" onPress={() => navigation.navigate("Entry List")}>
          Sivulistaus
        </Button>
        <Button mode="elevated" onPress={() => generateMockEntries()}>
          Luo puppumerkintöjä
        </Button>
        <NotificationButton />
      </View>
    </View>
  );
};
