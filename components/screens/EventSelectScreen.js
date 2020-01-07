import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast'
import Layout from '../layout/Layout';
import InstructionsHeader from '../text/InstructionsHeader';
import Container from '../layout/Container';
import EventPicker from '../EventPicker';
import DescText from '../text/DescText';
import PrimaryButton from '../PrimaryButton';
import {
    Platform,
    StyleSheet,
    ToastAndroid,
    View,
} from 'react-native';

const mapStateToProps = ({ activeMap }) => ({
    map: activeMap,
});

const EventSelectScreen = props => {
    const { navigation, map } = props;
    const [selectedEvent, setSelectedEvent] = useState({ value: '', suit: '' });
    const toastRef = useRef(null);

    const onButtonPress = () => {
        const { value: selValue, suit: selSuit } = selectedEvent;
        const event = map.events.find(({ card }) => card.value === selValue && card.suit === selSuit);
        
        if (event) {
            navigation.navigate('Event', { event: event });
        }
        else {
            const message = `Not a valid event card for ${ map.title }`;
            Platform.OS === 'ios' ?
            toastRef.current.show(message)
            : ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    };

    const onEventPickerChange = (value, suit) => {
        const { value: selValue, suit: selSuit } = selectedEvent;

        if(!(value === selValue) || !(suit === selSuit)) {
            setSelectedEvent({ value: value, suit: suit });
        }
    };

    return (
        <Layout>
            <Toast
                style={ styles.toast }
                ref={ toastRef }
                textStyle={ styles.toastText }
                position='center'/>
            <Container>
                <InstructionsHeader title="Select event" subtitle="Swipe to change values"/>
            </Container>
            <EventPicker onChange={ onEventPickerChange }/>
            <View style={ styles.summary }>
                <DescText emphasis>
                    {`${ selectedEvent.value.capitalize() } of ${ selectedEvent.suit.capitalize() }`}
                </DescText>
            </View>
            <PrimaryButton
                label="Start event"
                onPress={ onButtonPress }/>
        </Layout>
    );
};

const styles = StyleSheet.create({
    summary: {
        alignItems: 'center',
        marginBottom: 30,
    },
    toast: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
});

export default connect(mapStateToProps)(EventSelectScreen);