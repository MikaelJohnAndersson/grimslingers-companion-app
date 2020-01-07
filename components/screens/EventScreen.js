import React from 'react';
import Container from '../layout/Container';
import Layout from '../layout/Layout';
import ContentHeader from '../text/ContentHeader';
import EventDescription from '../EventDescription';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default EventScreen = props => {
    const event = props.navigation.getParam('event', null);
    const { value: cardValue , suit: cardSuit } = event.card;

    return (
        <Layout>
            <Container>
                <ContentHeader
                    title={ event.title }
                    subtitle={  `${ cardValue.capitalize() } of ${ cardSuit }` }/>
            </Container>
            <EventDescription description={ event.desc }/>
            { event.resolution && (
                <View style={ styles.container }>
                    <Container>
                        <Text style={ styles.phaseTitle }>RESOLUTION</Text>
                        <View style={ styles.phaseContentCont }>
                            <Text style={ styles.contentInstr }>
                                { event.resolution }
                            </Text>
                        </View>
                    </Container>
                </View>
            )}
            { event.phases && event.phases.map(phase => {
                return (
                    <View key={ phase.title } style={ styles.container }>
                        <Container>
                            <Text style={ styles.phaseTitle }>{ phase.title }</Text>
                            <Text style={ styles.phaseSubTitle }>{ phase.subtitle }</Text>
                            { phase.content.map(content => {
                                return (
                                    <View
                                        key={ content.title }
                                        style={ styles.phaseContentCont }>
                                        <Text style={ styles.contentTitle }>
                                            { content.title }
                                            <Text style={ styles.contentSummary }>
                                                { `: ${ content.summary }` }
                                            </Text>
                                        </Text>
                                        { content.desc && (
                                            <View style={ styles.contentDescContainer }>
                                                <Text style={ styles.contentDesc }>
                                                    { content.desc }
                                                </Text>
                                            </View>
                                        )}
                                        { content.instructions && (
                                            <View style={ styles.contentInstrContainer }>
                                                <Text style={ styles.contentInstr }>
                                                    { content.instructions }
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                );
                            }) }
                        </Container>
                    </View>
                );
            }) }
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    contentDesc: {
        fontSize: 15,
        fontFamily: 'im-fell-english-italic',
        color: '#831915',
    },
    contentDescContainer: {
        paddingTop: 15,
    },
    contentInstrContainer: {
        paddingTop: 15,
    },
    contentInstr: {
        fontSize: 20,
        fontFamily: 'myriad-pro-condensed',
        color: '#831915',
    },
    contentTitle: {
        fontSize: 20,
        fontFamily: 'myriad-pro-condensed-bold',
        color: '#831915',
        textDecorationLine: 'underline',
        textTransform: 'uppercase',
    },
    contentSummary: {
        fontSize: 20,
        fontFamily: 'myriad-pro-condensed-bold',
        color: '#831915',
        textDecorationColor: 'transparent',
        textTransform: 'none',
    },
    phaseTitle: {
        fontSize: 30,
        fontFamily: 'myriad-pro-condensed-bold',
        color: '#831915',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    phaseSubTitle: {
        fontSize: 20,
        fontFamily: 'im-fell-english-italic',
        color: '#831915',
        textAlign: 'center',
    },
    phaseContentCont: {
       paddingTop: 20,
       paddingBottom: 10,
    },
    resolutionText: {
        fontSize: 20,
        color: '#831915',
        fontFamily: 'im-fell-english',
    },
});