import React, { useState } from 'react';
import {
    Image,
    View,
} from 'react-native';

export default ScalableImage = props => {
    const { source, style } = props;
    const [styles, setStyles] = useState({ ...style });

    const updateSize = ev => {
        const { nativeEvent: { layout }} = ev;
        const maxHeight = layout.height;
        const maxWidth = layout.width;

        const srcHeight = Image.resolveAssetSource(source).height;
        const srcWidth = Image.resolveAssetSource(source).width;

        const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

        setStyles({
            ...styles,
            height: srcHeight * ratio,
            width: srcWidth * ratio,
        });
    };

    return (
        <View style={ styles } onLayout={ updateSize }>
            <Image style={{ ...styles, resizeMode: 'cover' }}
                source={ source }/>
        </View>
    );
};