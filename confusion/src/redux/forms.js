import * as ActionTypes from './ActionTypes';
export const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};

export const Feedback = (state = { feedback: InitialFeedback }, action) => {
    switch (action.type) {
      case ActionTypes.POST_FEEDBACK:
          return state;
      default:
        return state;
    }
  };