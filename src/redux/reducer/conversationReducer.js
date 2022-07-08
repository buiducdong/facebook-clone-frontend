import {
  ADD_NEW_MESSAGE,
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_REQUEST,
  GET_CONVERSATION_RESET,
  GET_CONVERSATION_SUCCESS,
  MESSENGER_LIST_DELETE,
  MESSENGER_LIST_FAIL,
  MESSENGER_LIST_REQUEST,
  MESSENGER_LIST_RESET,
  MESSENGER_LIST_SUCCESS,
} from '../constants/conversationContants';

export const getConversationReducer = (state, action) => {
  switch (action.type) {
    case GET_CONVERSATION_REQUEST:
      return { loading: true, ...state };
    case GET_CONVERSATION_SUCCESS:
      return { loading: false, conversations: action.payload };
    case GET_CONVERSATION_FAIL:
      return { loading: false, error: action.payload };
    case GET_CONVERSATION_RESET:
      return {};
    default:
      return { ...state };
  }
};

export const messengerListReducer = (state = { messengers: [] }, action) => {
  switch (action.type) {
    case MESSENGER_LIST_REQUEST:
      return { loading: true, ...state };
    case MESSENGER_LIST_SUCCESS:
      return {
        loading: false,
        messengers: [...state.messengers, action.payload],
      };
    case ADD_NEW_MESSAGE:
      let arr = [];
      const statee = state.messengers.map((m) => {
        const newMessage =
          m.messages[0].conversationId === action.payload.conversationId
            ? { ...m, messages: [...m.messages, action.payload] }
            : m;
        return arr.push(newMessage);
      });
      return {
        loading: false,
        messengers: arr,
      };

    case MESSENGER_LIST_DELETE:
      return {
        loading: false,
        messengers: state.messengers.filter(
          (m) => m.receiverInfo._id !== action.payload.receiverId
        ),
      };
    case MESSENGER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MESSENGER_LIST_RESET:
      return { messengers: [] };
    default:
      return { ...state };
  }
};
