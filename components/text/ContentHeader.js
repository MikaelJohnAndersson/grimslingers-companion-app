import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default ContentHeader = props => {
    const { title, subtitle } = props;

    return (
        <View style={ styles.container }>
            <Text style={ styles.subtitle }>{ subtitle }</Text>
            <Text
                style={ styles.title }
                numberOfLines={ 1 }
                adjustsFontSizeToFit>
                    { title }
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginBottom: 15,
    },
    title: {
        justifyContent: 'center',
        fontSize: 30,
        fontFamily: 'im-fell-english-bold',
        color: '#831915',
        textTransform: 'uppercase',
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'im-fell-english-bold',
        color: 'rgba(0, 0, 0, 0.5)',
        textAlign: 'center'
    },
});