import React, { useState } from 'react';
import { connect } from 'react-redux';
import ImageView from '../images/ImageView';
import InstructionsHeader from '../text/InstructionsHeader';
import DescText from '../text/DescText';
import imageCollection from '../../utils/ImageCollection';
import ScalableImage from '../images/ScalableImage';
import Layout from '../layout/Layout';
import Container from '../layout/Container';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

const mapStateToProps = ({ activeMap }) => ({
    map: activeMap,
});

const SetupScreen = props => {
    const { map } = props;
    const [modalVisible, setModalVisible] = useState(false);

    //TODO: Loading indicator
    if (!map) {
        return <View><Text>Loading</Text></View>
    }
    const images = imageCollection[map.title];

    const toggleModal = () => setModalVisible(!modalVisible);

    return (
        <Layout>
            { map.setup.map(step => {
                return (
                    <Container key={ step.title }>
                        <InstructionsHeader title={ step.title } subtitle={ step.subtitle }/>
                        <FlatList
                            style={ styles.cardList }
                            data={ step.cards }
                            renderItem={({ item: card }) => (
                                <DescText>{ `\u2022 ${ card }` }</DescText>
                            )}
                            keyExtractor={(_, i) => `key-${ i }` }/>
                        <DescText emphasis>{ `Total number of cards: ${ step.cardsTotal }` }</DescText>
                    </Container>
                );
            }) }
            <Container>
                <InstructionsHeader title="STEP FOUR" subtitle="layout"/>
                <TouchableOpacity onPress={ toggleModal}>
                    <ScalableImage style={ styles.layoutImg } source={ images.layout }/>
                </TouchableOpacity>
            </Container>
            <ImageView
                image={ images.layout }
                visible={ modalVisible }
                onClose={ toggleModal }/>
        </Layout>
    );
};

const styles = StyleSheet.create({
    cardList: {
        marginBottom: 15,
    },
    headerImg: {
        width: windowWidth,
        resizeMode: 'contain',
    },
    layoutImg: {
        width: '100%',
        height: 500,
    },
});

export default connect(mapStateToProps)(SetupScreen);