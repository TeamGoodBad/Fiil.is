import { List } from "react-native-paper";
import { View } from "react-native";
import { getEntries } from "../storage/userdata";
import { useEffect, useState } from "react";


/**
 * @returns A view containing all entries saved to db
 */
const EntryList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const updateEntries = async () => setEntries(await getEntries());
    updateEntries();
  }, []);


  return (
    <View>
      {entries.map(entry => <List.Item title={entry.date} description={entry.text} key={entry.date}/>)}
    </View>
  );
};

export default EntryList;
