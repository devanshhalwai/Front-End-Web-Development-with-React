import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments:[], isLoading:false }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload, isLoading:false};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload, isLoading:false};

    case ActionTypes.ADD_COMMENT:
        var comment = action.payload;
        return { ...state, comments: state.comments.concat(comment), isLoading:false};
        
    case ActionTypes.ADD_COMMENT_LOADING:
        return {...state, comments:state.comments, errMess:null, isLoading:true };
    default:
      return state;
  }
};