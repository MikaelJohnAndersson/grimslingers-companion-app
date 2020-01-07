import React from 'react';
import Modal from 'react-native-modal';
import {
    Image,
    StyleSheet,
} from 'react-native';

export default ImageView = props => {
    const { onClose, image, visible } = props;

    return (
        <Modal
            isVisible={ visible }
            onBackdropPress={ onClose }>
                <Image source={ image } style={ styles.image }/>
        </Modal>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        resizeMode: 'contain',
    },
});