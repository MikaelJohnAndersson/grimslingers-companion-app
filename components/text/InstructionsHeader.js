import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

export default InstructionsHeader = props => {
    const { title, subtitle } = props;

    return (
        <View style={ styles.container }>
            <Text style={ styles.mainHeader }>{ title }</Text>
            <Text
                adjustsFontSizeToFit={ true }
                numberOfLines={ 1 }
                style={ styles.subHeader }>
                    { subtitle }
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 30,
        borderBottomColor: '#831915',
        borderBottomWidth: 5,
        borderTopColor: '#831915',
        borderTopWidth: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },
    mainHeader: {
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'ncaa-wyoming-cowboys',
        color: '#831915',
    },
    subHeader: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'ncaa-wyoming-cowboys',
        color: 'rgba(0, 0, 0, 0.5)',
    }
  });