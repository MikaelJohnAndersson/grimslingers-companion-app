import React from 'react';
import { connect } from 'react-redux';
import Layout from '../layout/Layout';
import InstructionsHeader from '../text/InstructionsHeader';
import Container from '../layout/Container';
import ChapterLink from '../ChapterLink';

const mapStateToProps = ({ activeMap, storyProgress }) => ({
    map: activeMap,
    storyProgress,
});

const ChapterSelectScreen = props => {
    const { navigation, map, storyProgress } = props;
    
    const onChapterPress = chapter => {
        navigation.navigate('Chapter', { chapter: chapter });
    };

    return (
        <Layout>
            <Container>
                <InstructionsHeader
                    title="Chapters"
                    subtitle="Fulfill prerequisites to progress"/>
            </Container>
            { map.chapters.map(chapter => {
                const completedChaptersIndex = storyProgress.findIndex(
                    c => c.title === chapter.title
                );

                let prevChapterComplete;
                if (completedChaptersIndex === 0){
                    prevChapterComplete = true;
                }
                else {
                    prevChapterComplete = storyProgress[completedChaptersIndex - 1].isCompleted;
                }

                return (
                    <ChapterLink
                        locked={ !prevChapterComplete }
                        key={ chapter.title }
                        title={ chapter.title }
                        subtitle={ chapter.subtitle }
                        onPress={ () => onChapterPress(chapter) }/>
                )
            }) }
        </Layout>
    );
};

export default connect(mapStateToProps)(ChapterSelectScreen);