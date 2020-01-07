import * as types from '../actions/types';

export default reducer = (state = null, action) => {
    const { mapId, chapterTitle, partId } = action;
    let updatedStoryProgress;

    switch (action.type) {
        case types.SET_ACTIVE_MAP:
            const activeMap = Object.values(state.maps).find(map => map._id === mapId);
            const storyProgress = activeMap.chapters.map((c, chapterIndex) => {
                return {
                    title: c.title,
                    isCompleted: false,
                    completedParts: c.parts.reduce((obj, part) => ({
                        ...obj,
                        [part._id]: {
                            isCompleted: false,
                            isRead: false,
                            isUnlocked: chapterIndex === 0 && part.order === 0,
                            order: part.order,
                        },
                    }), {})
                }
            });
            
            return {
                ...state,
                activeMap,
                storyProgress
            };
        case types.SET_CHAPTER_PART_READ:
            updatedStoryProgress = [...state.storyProgress].map(c => {
                if (c.title === chapterTitle) {
                    return {
                        ...c,
                        completedParts: {
                            ...c.completedParts,
                            [partId]: {
                                ...c.completedParts[partId],
                                isRead: true
                            },
                        }
                    };
                }
                else return c;
            })
            return {
                ...state,
                storyProgress: updatedStoryProgress,
            };
        case types.SET_CHAPTER_PART_COMPLETE:
            updatedStoryProgress = [...state.storyProgress].map(c => {
                if (c.title === chapterTitle) {
                    // Set chapter part completed
                    let updatedChapter = {
                        title: c.title,
                        completedParts: {
                            ...c.completedParts,
                            [partId]: {
                                ...c.completedParts[partId],
                                isCompleted: true,
                            }
                        },
                    };

                    updatedChapter.isCompleted = (
                        Object.values(updatedChapter.completedParts).every(
                            part => part.isCompleted
                        )
                    );
                    // If chapter was not completed, unlock next story part
                    if (!updatedChapter.isCompleted) {
                        const partOrder = updatedChapter.completedParts[partId].order;
                        const nextPartId = Object.keys(c.completedParts).find(
                            id => updatedChapter.completedParts[id].order === partOrder + 1
                        )

                        updatedChapter = {
                            ...updatedChapter,
                            completedParts: {
                                ...updatedChapter.completedParts,
                                [nextPartId]: {
                                    ...updatedChapter.completedParts[nextPartId],
                                    isUnlocked: true
                                }
                            },
                        };
                    }

                    return updatedChapter;
                }
                else return c;
            }).map((c, i, arr) => {
                const firstPartId = Object.keys(c.completedParts).find(id => {
                    return c.completedParts[id].order === 0;
                });
                const firstPart = c.completedParts[firstPartId];
                // If previous chapter was completed, unlock first part of chapter
                if ((arr[i - 1] && arr[i - 1].isCompleted) && !firstPart.isUnlocked) {
                    return {
                        ...c,
                        completedParts: {
                            ...c.completedParts,
                            [firstPartId]: {
                                ...firstPart,
                                isUnlocked: true
                            }
                        }
                    }
                }
                else return c;
            })
            
            return {
                ...state,
                storyProgress: updatedStoryProgress
            };
        default:
            return state
    }
};