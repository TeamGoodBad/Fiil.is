import { View } from 'react-native';
import { Title } from 'react-native-paper';

import Stars from './Stars';
import { getBaseStyle } from '../styles/baseStyle';

const TitleAndStars = ({ stars, titleContent }) => {
    const styles = getBaseStyle();

    return (
    <View style={styles.titleAndStarsContainer}>
        <View style={styles.titleContainer}>
            <Title>
                {titleContent}
            </Title>
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