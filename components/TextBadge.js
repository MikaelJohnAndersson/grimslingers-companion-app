import React from 'react';
import PulsatingView from '../components/PulsatingView';
import {
    StyleSheet,
    Text,
} from 'react-native';

export default TextBadge = props => {
    const { label } = props;

    return (
        <PulsatingView style={ styles.container }>
            <Text style={ styles.text }>{ label }</Text>
        </PulsatingView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: -20,
        width: 100,
        textAlign: 'center',
    },
    text: {
        zIndex: 999,
        color: '#2F1000',
        fontSize: 18,
        lineHeight: 18,
        textShadowOffset: { x: 1, y: 1 },
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowRadius: 2,
        fontFamily: 'im-fell-english-bold',
        textAlign: 'center',
        transform: [
            { rotate: '20deg' }
        ],
    },
});