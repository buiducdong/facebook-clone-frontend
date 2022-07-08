import { combineReducers } from 'redux';

import auth from './authReducer';
import { getConversationReducer, messengerListReducer } from './conversationReducer';
import socketReducer from './socketReducer';
import token from './tokenReducer';

export default combineReducers({
  auth,
  token,
  conversationList: getConversationReducer,
  messengerList: messengerListReducer,
});
