import ACTIONS from '.';
import axios from 'axios';

export const dispatchLogin = () => {
  return {
    type: ACTIONS.LOGIN,
  };
};

export const fetchUser = async (token) => {
  const res = await axios.get('/user/get_auth_info', {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetUser = (res) => {
  return {
    type: ACTIONS.GET_USER,
    payload: {
      user: res.data,
      isAdmin: res.data.role === 1 ? true : false,
    },
  };
};

export const dispatchFollow = (userId) => {
  return {
    type: ACTIONS.FOLLOW,
    payload: userId,
  };
};

export const dispatchUnFollow = (userId) => {
  return {
    type: ACTIONS.UNFOLLOW,
    payload: userId,
  };
};
