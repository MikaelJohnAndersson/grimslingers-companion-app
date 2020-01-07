import React from 'react';
import { connect } from 'react-redux';
import {
    setActiveMap,
} from '../../actions';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const mapStateToProps = ({ maps }) => ({
    maps
});

const MapListScreen = props => {
    const { navigation: { navigate }, maps, dispatch } = props;

    const onPressListItem = mapId => {
        dispatch(setActiveMap(mapId)).then(navigate('Map'));
    };

    return (
        <View style={ styles.container }>
            <FlatList
                data={ maps }
                renderItem={({ item: map }) => (
                    <TouchableOpacity onPress={ () => onPressListItem(map._id) }>
                        <Text style={ styles.item }>{ map.title }</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, i) => item._id.toString() }/>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default connect(mapStateToProps)(MapListScreen);
