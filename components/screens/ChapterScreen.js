import React from 'react';
import { connect } from 'react-redux';
import {
    completeChapterPart,
    setChapterPartRead
} from '../../actions';
import Layout from '../layout/Layout';
import ContentHeader from '../text/ContentHeader';
import Container from '../layout/Container';
import ChapterPartPager from '../ChapterPartPager';
import PrimaryButton from '../PrimaryButton';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const mapStateToProps = ({ storyProgress }, { navigation }) => {
    const chapter = navigation.getParam('chapter', null);
    const { completedParts } = storyProgress.find(c => c.title === chapter.title);

    return { completedParts };
};

const ChapterScreen = props => {
    const { dispatch, completedParts, navigation } = props;
    const chapter = navigation.getParam('chapter', null);

    const onCompletePartButtonPress = id => {
        dispatch(completeChapterPart(chapter.title, id));
    };

    const onPartPageChange = partId => {
        if (!completedParts[partId].isRead) {
            dispatch(setChapterPartRead(chapter.title, partId));
        }
    };

    const unlockedParts = chapter.parts.filter(
        part => completedParts[part._id].isUnlocked,
    );

    const pages = unlockedParts.map(part => {
        const isLastPart = part.order === (chapter.parts.length - 1);
        const isCompleted = completedParts[part._id].isCompleted;

        let buttonLabel;
        if (isCompleted && isLastPart) buttonLabel = 'chapter completed'
        else if (isCompleted) buttonLabel = `${ part.title } completed`
        else if (isLastPart) buttonLabel = 'complete chapter'
        else buttonLabel = `complete ${ part.title }`

        return (
            <Container>
                { part.title && (
                    <View style={{ marginBottom: 20 }}>
                        <Text
                            adjustsFontSizeToFit={ true }
                            numberOfLines={ 2 }
                            style={ styles.partTitle }>
                            { part.title }
                            <Text style={ styles.partSubtitle }>
                                : { part.subtitle }
                            </Text>
                        </Text>
                        <View style={ styles.divider }/>
                    </View>
                )}
                { part.subparts.map((subpart, i) => {
                    return (
                        <View key={ i }>
                            { subpart.content && (
                                <Text style={ styles.content }>
                                    { subpart.content }
                                </Text>
                            )}
                            { subpart.instructions.map((instr, i) => {
                                return (
                                    <View key={ i }>
                                        { instr.summary && (
                                            <View style={ styles.instructionsCont }>
                                                <Text style={{
                                                    ...styles.instructionsHeader,
                                                    ...styles[instr.type]
                                                }}>
                                                    { instr.type }
                                                    <Text style={ styles.instructionsSummary }>
                                                        { `: ${ instr.summary }` }
                                                    </Text>
                                                </Text>
                                            </View>
                                        )}
                                        { instr.description && (
                                            <Text style={ styles.instructionsDesc }>
                                                { instr.description }
                                            </Text>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    );
                })}
                <View style={{ marginTop: 30 }}>
                    <PrimaryButton
                        disabled={ isCompleted }
                        label={ buttonLabel }
                        onPress={ () => onCompletePartButtonPress(part._id) }/>
                </View>
            </Container>
        );
    });

    return (
        <Layout>
            <ContentHeader
                title={ chapter.title }
                subtitle={ chapter.subtitle }
            />
            <ChapterPartPager
                pages={ pages }
                parts={ chapter.parts }
                chapterProgress={ completedParts }
                onPartPageChange={ onPartPageChange }
            />   
        </Layout>
    );
};

const styles = StyleSheet.create({
    content: {
        fontFamily: 'im-fell-english',
        fontSize: 15,
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#831915',
        opacity: 0.5
    },
    instructionsCont: {
        marginBottom: 10,
    },
    instructionsDesc: {
        fontFamily: 'myriad-pro-condensed',
        fontSize: 20,
        color: '#831915',
        marginBottom: 10,
    },
    instructionsSummary: {
        textDecorationColor: 'transparent',
        textTransform: 'none',
    },
    instructionsHeader: {
        fontFamily: 'myriad-pro-condensed-bold',
        fontSize: 20,
        textDecorationLine: 'underline',
        textTransform: 'uppercase',
    },
    partTitle: {
        fontSize: 15,
        fontFamily: 'im-fell-english-bold',
        color: '#831915',
        marginBottom: 1,
        marginTop: 1,
        textTransform: 'uppercase',
    },
    action: {
        color: '#831915',
    },
    objective: {
        color: '#4200FF'
    },
    prerequisite: {
        color: '#36751C',
    },
});

export default connect(mapStateToProps)(ChapterScreen);