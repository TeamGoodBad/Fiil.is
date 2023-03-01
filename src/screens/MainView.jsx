import {View} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MainView = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <View
        style={{
          height: '40%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <MaterialCommunityIcons name="star" size={76} />
        <MaterialCommunityIcons name="star" size={76} />
        <MaterialCommunityIcons name="star" size={76} />
        <MaterialCommunityIcons name="star" size={76} />
        <MaterialCommunityIcons name="star" size={76} />
      </View>
      <View
        style={{
          height: '55%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          multiline={true}
          mode="outlined"
          placeholder={'How has your day gone?'}
          style={{height: 400, width: '100%'}}
        />
        <Button style={{margin: 10, width: 200}} mode="contained">
          Save
        </Button>
      </View>
    </View>
  );
};

export default MainView;
