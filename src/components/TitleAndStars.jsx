import { View, Text } from 'react-native';
import { Title, Button} from 'react-native-paper';

import Stars from './Stars';
import { getBaseStyle } from '../styles/baseStyle';



const TitleAndStars = ({ stars, titleContent, buttonContent }) => {
    const styles = getBaseStyle();

    let button = null;
    if (buttonContent) {
        if (buttonContent.isButton) {
            button = (
                <View>
                    <Button
                    mode="contained"
                    onPress={() => buttonContent.onPress()}>
                    {buttonContent.text} 
                    </Button> 
                </View>
            )
        }
    }
    

    return (
    <View style={styles.titleAndStarsContainer}>
        <View style={styles.titleContainer}>
            <Title style={{paddingLeft: '4%'}}>
                {titleContent}
            </Title>
            {button}
        </View>
        <View style={styles.starsContainer}>
            <Stars
                rating={stars.rating}
                editable={stars.editable}
                onChange={stars.onChange} />
        </View>

    </View>
    );
}

export default TitleAndStars;