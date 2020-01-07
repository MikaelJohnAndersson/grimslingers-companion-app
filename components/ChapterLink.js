import React from 'react';
import { connect } from 'react-redux';
import Container from './layout/Container';
import TextBadge from './TextBadge';
import {
    ImageBackground,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

const mapStateToProps = ({ storyProgress }, { title }) => ({
    chapterProgress: storyProgress.find(chapter => chapter.title === title),
});

const ChapterLink = props => {
    const { chapterProgress, locked, onPress, title, subtitle } = props;

    const hasUnreadParts = Object.values(chapterProgress.completedParts).some(
        part => part.isUnlocked && !part.isRead,
    )

    const withLock = content => {
        return (
            <View>
                <View style={ styles.lockContainer }>
                    <Icon name="padlock" size={ 80 }/>
                </View>
                <View style={{
                    ...styles.btnContainer,
                    opacity: 0.5,
                }}>
                    { content }
                </View>
            </View>
        );
    };

    const content = (
        <ImageBackground
            style={{ width: '100%' }}
            imageStyle={{ resizeMode: 'stretch' }}
            source={ require('../assets/images/old-paper-btn.png') }>
                { hasUnreadParts && <TextBadge label="new part unlocked"/> }
                <View style={{ padding: 20 }}>
                    { subtitle && (
                        <Text style={ styles.subtitle }>
                            { subtitle }
                        </Text>
                    )}
                    <Text
                        style={ styles.title }
                        numberOfLines={ 1 }
                        adjustsFontSizeToFit={ true }>
                            { title }
                    </Text>
                </View>
        </ImageBackground>
    );

    let chapterLink; 

    if (locked) {
        chapterLink = withLock(content);
    }
    else chapterLink = (
        <TouchableOpacity onPress={ onPress }>
            <View style={{
                ...styles.btnContainer,
                ...styles.btnContainerUnlocked
            }}>
                { content }
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ marginBottom: 20 }}>
            <Container>
                { chapterLink }
            </Container>
        </View>
    );
};

const styles = StyleSheet.create({
    lockContainer: {
        width:'100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'im-fell-english-bold',
        color: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'im-fell-english-bold',
        color: '#831915',
        textDecorationLine: 'underline',
    },
    btnContainer: {
        borderRadius: 5,
    },
    btnContainerUnlocked: {
        shadowRadius: 2,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
    },
});

export default connect(mapStateToProps)(ChapterLink);