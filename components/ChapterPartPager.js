import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Container from './layout/Container';
import Icon from './Icon';
import PulsatingView from '../components/PulsatingView';
import { FontAwesome } from '@expo/vector-icons';
import {
    Animated,
    Dimensions,
    View,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const ChapterPartPager = props => {
    const { chapterProgress, pages, parts, onPartPageChange } = props;
    const scrollViewRef = useRef(null);
    const [viewablePartIndex, setViewablePartIndex] = useState(0);
    const [position, setPosition] = useState(Animated.divide(new Animated.Value(0), screenWidth));
    const [pagesHeight, setPagesHeight] = useState(pages.reduce((_, page) => ({ [page.order]: null }), {}));
    const [viewableHeight, setViewableHeight] = useState(pagesHeight[0]);
    useEffect(() => {
        if (!viewableHeight && pagesHeight[viewablePartIndex]) {
            setViewableHeight(pagesHeight[viewablePartIndex]);
        }
    }, [pagesHeight]);
    useEffect(() => {
        const partId = Object.keys(chapterProgress).find(
            id => chapterProgress[id].order === viewablePartIndex
        );
        if (partId) {
            onPartPageChange(partId)
        }
    }, [viewablePartIndex]);

    const onPageLayout = ev => {
        const { nativeEvent: { layout: { x, height } }} = ev;
        const index = Math.round(x / screenWidth);
        setPagesHeight({ ...pagesHeight, [index]: height });
    };

    const onScroll = ev => {
        const { nativeEvent: { contentOffset: { x }}} = ev;
        const index = Math.round(x / screenWidth);
        
        if (index !== viewablePartIndex) {
            pagesHeight[index] !== viewableHeight && setViewableHeight(pagesHeight[index]);
            setViewablePartIndex(index);
        }
        setPosition(Animated.divide(x, screenWidth));
    };

    const onPartButtonPress = i => {
        scrollViewRef.current.scrollTo({ x: i * screenWidth });
    };

    const PartButton = props => {
        const { isUnread, label, onPress, disabled, left, right } = props;
        const margin = left ? 'marginLeft' : 'marginRight';
        const iconName = left ? 'angle-left': 'angle-right';
        const color = disabled ? 'rgba(0, 0, 0, 0.3)' : '#0275f5';
        const style = {
            [margin]: 5,
            fontSize: 18,
            lineHeight: 25,
            fontFamily: 'im-fell-english-bold',
            color: color,
            textTransform: 'lowercase',
            padding: 1,
        };

        const icon = <FontAwesome name={ iconName } size={ 25 } color={ color }/>;

        const btn = (
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={ onPress }
                disabled={ disabled }>
                { left && icon }
                <Text 
                    adjustsFontSizeToFit={ true }
                    numberOfLines={ 1 }
                    style={ style }>
                    { label }
                </Text>
                { right && icon }
            </TouchableOpacity>
        );
        
        if(!disabled && isUnread) {
            return <PulsatingView>{ btn }</PulsatingView>;
        } else return btn;
    };

    return (
        <>
            <Container>
                    { parts.length > 1 && (
                        <View style={ styles.pagesNav }>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                { parts[viewablePartIndex - 1] && (
                                    <PartButton
                                        disabled={ !pages[viewablePartIndex - 1] }
                                        left
                                        label={ parts[viewablePartIndex - 1].title }
                                        onPress={ () => onPartButtonPress(viewablePartIndex - 1) }/>
                                )}
                            </View>
                            <View style={ styles.indicatorsContainer }>
                                { parts.map((_, i) => {
                                    const opacity = position.interpolate({
                                        inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                                        outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
                                        extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
                                    });

                                    const isLocked = !pages[i];

                                    const indicator = (
                                        <Animated.View
                                            key={ i }
                                            style={{ ...styles.indicator, opacity }}/>
                                    );

                                    return isLocked ? (
                                        <View key={ i } style={ styles.lockIcon }>
                                            <Icon key={ i } name="padlock" size={ 20 }/>
                                        </View>
                                    ): indicator;
                                })}
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}>
                                { parts[viewablePartIndex + 1] && (
                                    <PartButton
                                        right
                                        disabled={ !pages[viewablePartIndex + 1] }
                                        isUnread={ !chapterProgress[parts[viewablePartIndex + 1]._id].isRead }
                                        label={ parts[viewablePartIndex + 1].title }
                                        onPress={ () => onPartButtonPress(viewablePartIndex + 1) }/>
                                )}
                            </View>
                        </View>
                    ) }
            </Container>
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'flex-start',
                    maxHeight: viewableHeight || 'auto'
                }}
                horizontal={ true }
                pagingEnabled={ true }
                showsHorizontalScrollIndicator={ false }
                bounces={ false }
                scrollEventThrottle={ 16 }
                scrollEnabled={ false }
                onScroll={ onScroll }
                ref={ scrollViewRef }>
                    { pages.map((page, i) => (
                        <View
                            key={ i }
                            style={ styles.pageContainer }
                            onLayout={ onPageLayout }>
                                { page }
                        </View>
                    )) }
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    lockIcon: {
        opacity: 0.3,
        margin: 4,
    },
    indicator: {
        height: 10,
        width: 10,
        backgroundColor:'#595959',
        borderRadius: 5,
        margin: 8,
    },
    indicatorsContainer: {
        flexDirection: 'row',
    },
    pagesNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    pageContainer: {
        width: screenWidth,
        flex: 1,
    },
});

export default connect()(ChapterPartPager);