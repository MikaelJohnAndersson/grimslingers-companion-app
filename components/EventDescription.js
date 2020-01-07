import React from 'react';
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default EventDescription = props => {
    const { description } = props;

    return (
        <ImageBackground
            style={ styles.descBg }
            source={ require('../assets/images/torn-paper.png') }
            imageStyle={{
                resizeMode: "stretch",
            }}>
            <View style={ styles.descContainer }>
                <Container>
                    <Text style={ styles.desc }>{ description }</Text>
                </Container>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    descBg: {
        width: '100%',
    },
    desc: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'im-fell-english',
        textAlign: 'center'
    },
    descContainer: {
        paddingTop: 30,
        paddingBottom: 30,
    },
});