import {createSelector} from 'reselect';

const getListSelector = (state) => state.list;
const getItemSelector = (state) => state.item;
const getIsLoadingSelector = (state) => state.isLoading;

export {getListSelector, getItemSelector, getIsLoadingSelector}
