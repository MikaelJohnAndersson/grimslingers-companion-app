import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';

export default PrimaryButton = props => {
    const { disabled, label, onPress } = props;

    const stateStyle = disabled ? 'disabled': 'enabled';

    return (
        <TouchableOpacity
            style={ styles.outerContainer }
            onPress={ onPress }>
            <View style={{
                ...styles.innerContainer,
                ...styles[stateStyle]
            }}>
                <Text
                    numberOfLines={ 1 }
                    adjustsFontSizeToFit={ true }
                    style={ styles.btntext }>
                        { label }
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    innerContainer: {
        width: 'auto',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#831915',
        borderRadius: 5,
    },
    enabled: {
        shadowRadius: 2,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 }, 
    },
    disabled: {
        backgroundColor: '#000',
    },
    btntext: {
        fontSize: 40,
        color: '#FFF',
        textTransform: 'uppercase',
        fontFamily: 'myriad-pro-condensed-bold',
    },
});