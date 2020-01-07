import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

export default Container = props => {
    const { children } = props;

    return <View style={ styles.root }>{ children }</View>;
};

const styles = StyleSheet.create({
    root: {
        paddingLeft: 20,
        paddingRight: 20,
    },
});