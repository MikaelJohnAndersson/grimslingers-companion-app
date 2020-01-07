import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export default Layout = props => {
    const { children } = props;
    const [applyMargin, setApplyMargin] = useState(false);

    const onContentSizeChange = (_, contentHeight) => {
        if(contentHeight >= windowHeight) {
            !applyMargin && setApplyMargin(true);
        }
    };

    return (
        <View>
            <ScrollView
                bounces={ false }
                style={ styles.container }
                contentContainerStyle={{
                    flexGrow: 1,
                    minHeight: '100%',
                }}
                onContentSizeChange={ onContentSizeChange }>
                <Image
                    source={ require('../../assets/images/old-paper.jpg') }
                    style={ styles.bgimg }/>
                <Image
                    style={ styles.footerimg }
                    source={ require('../../assets/images/grimslinger.png')}/>
                { children }
                { applyMargin && <View style={{ marginBottom: 200 }}/> }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    bgimg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.5,
    },
    footerimg: {
        position: 'absolute',
        bottom: 0,
        width: windowWidth,
        resizeMode: 'cover',
    },
  });