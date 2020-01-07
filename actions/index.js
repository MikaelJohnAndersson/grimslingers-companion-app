import * as types from './types';

export const setActiveMap = mapId => dispatch => Promise.resolve().then(() => {
    return dispatch({
        type: types.SET_ACTIVE_MAP,
        mapId,
    });
});

export const setChapterPartRead = (chapterTitle, partId) => dispatch => Promise.resolve().then(() => {
    return dispatch({
        type: types.SET_CHAPTER_PART_READ,
        chapterTitle,
        partId
    });
});

export const completeChapterPart = (chapterTitle, partId) => dispatch => Promise.resolve().then(() => {
    return dispatch({
        type: types.SET_CHAPTER_PART_COMPLETE,
        chapterTitle,
        partId
    });
});