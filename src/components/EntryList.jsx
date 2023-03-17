import { List } from "react-native-paper";
import { ScrollView } from "react-native";
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
    <ScrollView>
      {entries.map(entry => <List.Item title={entry.date.toString()} description={entry.text} key={entry.date.toString()}/>)}
    </ScrollView>
  );
};

export default EntryList;
