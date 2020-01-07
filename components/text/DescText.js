import React from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';

export default DescText = props => {
    const { children, emphasis } = props;
    const style = emphasis ? styles.emphasis : styles.normal;

    return <Text style={ style }>{ children }</Text>;
};

const styles = StyleSheet.create({
    normal: {
        fontSize: 25,
        fontFamily: 'myriad-pro-condensed',
    },
    emphasis: {
        fontSize: 25,
        fontFamily: 'myriad-pro-condensed-bold',
        color: '#831915',
    },
  });