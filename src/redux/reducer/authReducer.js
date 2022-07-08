import ACTIONS from '../actions';

const initialState = {
  user: JSON.parse(localStorage.getItem('fb_user')) || {},
  isLogged: JSON.parse(localStorage.getItem('firstLogin')) || false,
  isAdmin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
      };
    case ACTIONS.LOGOUT:
      return {
        user: {},
        isLogged: false,
        isAdmin: false,
      };
    case ACTIONS.FOLLOW:
      return {
        ...state,
        user: { ...state.user, followings: [...state.user.followings, action.payload] },
      };
    case ACTIONS.UNFOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter((fl) => fl !== action.payload),
        },
      };
    default:
      return state;
  }
};

export default authReducer;
