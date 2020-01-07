import React, { useCallback, useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import Icon from '../components/Icon';
import {
    Dimensions,
    Image,
    View,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const ITEM_WIDTH = 100;
const ITEM_HEIGHT = 100;
const MARGIN = 10;

const VALUES = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
const SUITS = ['clubs', 'diamonds', 'spades', 'hearts'];

export default EventPicker = props => {
    const { onChange } = props;
    const [activeIndexes, setActiveIndexes] = useState({ value: 1, suit: 1 });
    const onScrollDebounce = useCallback(debounce((offsetX, type) => {
        const activeIndex = Math.round(offsetX / (ITEM_WIDTH + (MARGIN * 2))) + 1;
        setActiveIndexes(state => ({ ...state, [type]: activeIndex }));
    }, 20), []);
    useEffect(() => {
        const activeValue = VALUES[activeIndexes.value];
        const activeSuit = SUITS[activeIndexes.suit];

        if (activeValue && activeSuit) {
            onChange(activeValue, activeSuit);
        }
    }, [activeIndexes]);

    const ValueItem = ({ value }) => {
        const isActive = VALUES[activeIndexes.value] === value;
        const activeSuit = SUITS[activeIndexes.suit];
        const suitIsRed = activeSuit === 'hearts' || activeSuit === 'diamonds';
        let style = isActive ? styles.textItemText : { ...styles.textItemText, opacity: 0.3 }
        
        if (suitIsRed) {
            style = { ...style, color: '#831915' };
        }

        return (
            <View style={ styles.textItem }>
                <View>
                    <Text
                        numberOfLines={ 1 }
                        adjustsFontSizeToFit
                        style={ style }>
                        { value }
                    </Text>
                </View>
            </View>
        );
    };

    const SuitItem = ({ suit }) => {
        const isActive = SUITS[activeIndexes.suit] === suit;
        const suitStyles = isActive ? { ...styles.suitItem, ...styles.suitItemActive } : styles.suitItem;
        const color = suit === 'diamonds' || suit === 'hearts' ? '#831915' : '#000000';

        return <Icon name={ suit } color={ color } style={ suitStyles }/>;
    };

    const onScroll = (ev, type) => {
        const { nativeEvent: { contentOffset :{ x }}} = ev;
        onScrollDebounce(x, type);
    };

    const margin = (windowWidth / 2) - ((ITEM_WIDTH + (MARGIN * 2)) / 2);
    const contentOffset = -(margin - (ITEM_WIDTH + (MARGIN * 2)));

    return (
        <>
            <View style={ styles.alignerContainer }>
                <View style={ styles.aligner }>
                    <Image
                        source={ require('../assets/images/grunge-frame.png') }
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'stretch',
                            opacity: 0.7,
                        }}/>
                </View>
            </View>
            <View style={ styles.container }>
                <FlatList
                    style={ styles.list }
                    onScroll={ ev => onScroll(ev, 'suit') }
                    data={ SUITS }
                    renderItem={({ item: suit }) => <SuitItem suit={ suit }/>}
                    contentContainerStyle={{ height: 'auto' }} 
                    contentOffset={{ x: contentOffset }}
                    contentInset={{ left: margin, right: margin }}
                    horizontal={ true }
                    showsHorizontalScrollIndicator={ false }
                    snapToAlignment="center"
                    snapToInterval={ ITEM_WIDTH + (MARGIN * 2) }
                    decelerationRate="fast"
                    keyExtractor={(item, i) => `${ item }-${ i }`}/>
                <FlatList
                    style={ styles.list }
                    onScroll={ ev => onScroll(ev, 'value') }
                    data={ VALUES }
                    renderItem={({ item: value }) => <ValueItem value={ value }/>}
                    contentContainerStyle={{ height: 'auto' }} 
                    contentOffset={{ x: contentOffset }}
                    contentInset={{ left: margin, right: margin }}
                    horizontal={ true }
                    showsHorizontalScrollIndicator={ false }
                    snapToAlignment="center"
                    snapToInterval={ ITEM_WIDTH + (MARGIN * 2) }
                    decelerationRate="fast"
                    keyExtractor={(item, i) => `${ item }-${ i }`}/>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
    },
    alignerContainer: {
        alignItems: 'center',
        position: 'absolute',
        width: windowWidth,
        height: windowHeight,
    },
    aligner: {
        width: ITEM_WIDTH + (MARGIN * 2) + 30,
        height: 230,
        marginTop: 125,
    },
    list: {
        paddingTop: 10,
    },
    textItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: MARGIN + 2,
        marginRight: MARGIN - 2,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
    },
    textItemText: {
        fontSize: 80,
        fontFamily: 'ncaa-wyoming-cowboys',
    },
    suitItem: {
        fontSize: ITEM_WIDTH - (MARGIN * 2),
        marginLeft: MARGIN * 2,
        marginRight: MARGIN * 2,
        opacity: 0.3,
    },
    suitItemActive: {
        opacity: 1,
    },
});