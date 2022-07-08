import axios from 'axios';
import {
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_REQUEST,
  GET_CONVERSATION_SUCCESS,
  GET_CONVER_RECEIVERINFO_FAIL,
  GET_CONVER_RECEIVERINFO_REQUEST,
  GET_CONVER_RECEIVERINFO_SUCCESS,
  MESSENGER_LIST_FAIL,
  MESSENGER_LIST_REQUEST,
  MESSENGER_LIST_SUCCESS,
} from '../constants/conversationContants';

// GET CONVERSATION
export const getConversation = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CONVERSATION_REQUEST });
    const { token } = getState();

    const {
      auth: {
        user: { _id },
      },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const { data } = await axios.get(`/conversation`, config);

    dispatch({ type: GET_CONVERSATION_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message ? err.response.data.message : err.message;

    if (message === 'Not Authorized, token failed') {
      console.log(message);
    } else {
      console.log(message);
    }
    dispatch({
      type: GET_CONVERSATION_FAIL,
      payload: message,
    });
  }
};

// GET CONVERSATION RECEIVERINFO
// export const getConverReceiverInfo = (receiverId) => async (dispatch, getState) => {
//   try {
//     //dispatch({ type: GET_CONVER_RECEIVERINFO_REQUEST });
//     const { token } = getState();

//     const {
//       auth: {
//         user: { _id },
//       },
//     } = getState();
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//     };
//     const { data } = await axios.get(`/user/get_user_info?userId=${receiverId}`);

//     dispatch({ type: GET_CONVER_RECEIVERINFO_SUCCESS, payload: data });
//   } catch (err) {
//     const message =
//       err.response && err.response.data.message ? err.response.data.message : err.message;

//     console.log({ message });
//     dispatch({
//       type: GET_CONVER_RECEIVERINFO_FAIL,
//       payload: message,
//     });
//   }
// };

// GET MESSENGER
export const listMessenger =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: MESSENGER_LIST_REQUEST });
      const { token } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      };

      const { data } = await axios.get(`/message/${id}`, config);

      dispatch({ type: MESSENGER_LIST_SUCCESS, payload: data });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      dispatch({ type: MESSENGER_LIST_FAIL, payload: message });
    }
  };
