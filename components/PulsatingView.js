import React, { useEffect, useState } from 'react';
import {
    Animated,
} from 'react-native';

const ANIM_DURATION = 500;

export default PulsatingView = props => {
    const { children, style } = props;
    const [scale] = useState(new Animated.Value(1));
    useEffect(() => {
        const animation = Animated.sequence([
            Animated.timing(scale, { toValue: 1.1, duration: ANIM_DURATION }),
            Animated.timing(scale, { toValue: 1, duration: ANIM_DURATION }),
        ]);

        Animated.loop(animation).start();
    }, []);

    return (
        <Animated.View style={{ ...style, transform: [{ scale: scale }, { perspective: 1000 }]}}>
            { children }
        </Animated.View>
    );
};