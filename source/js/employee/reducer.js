export const initialState = {
  list: [],
  item: {},
  isLoading: false
};

const ActionType = {
  SET_LIST: `SET_LIST`,
  SET_ITEM: `SET_ITEM`,
  SET_IS_LOADING: `SET_IS_LOADING`,
};

const ActionCreator = {
  setList: (payload) => ({
    type: ActionType.SET_LIST,
    payload,
  }),

  setItem: (payload) => ({
    type: ActionType.SET_ITEM,
    payload,
  }),

  setIsLoading: (payload) => ({
    type: ActionType.SET_IS_LOADING,
    payload,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_LIST:
      return Object.assign({}, state, {
        list: action.payload,
      });
    case ActionType.SET_ITEM:
      return Object.assign({}, state, {
        item: action.payload,
      });
    case ActionType.SET_IS_LOADING:
      return Object.assign({}, state, {
        isLoading: action.payload,
      });
    default: return state;
  }
};

const Operation = {
  loadList: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsLoading(true));
    return api.get(`list-all-with-prop.php`)
      .then((response) => {

        const sortedItems = response.data.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }).map(item => ({...item, sername: item.name.split(' ').join('').toUpperCase() }));
      
        const uniqueItems = [...new Map(sortedItems.map(item => [item['sername'], item])).values()];
        
        dispatch(ActionCreator.setList(uniqueItems));
        dispatch(ActionCreator.setIsLoading(false));
      });
  },

  loadItem: (id) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsLoading(true));
    return api.get(`detail-d.php?id=${id}`)
      .then((response) => {
        dispatch(ActionCreator.setItem(response.data));
        dispatch(ActionCreator.setIsLoading(false));
       });
  },
};

export {ActionCreator, ActionType, Operation, reducer}
