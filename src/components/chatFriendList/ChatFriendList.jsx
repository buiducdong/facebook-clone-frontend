import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversation, listMessenger } from '../../redux/actions/conversationAction';
import './chatFriendList.scss';
import ChatFriendItem from '../chatFriendItem/ChatFriendItem';

const ChatFriendList = () => {
  const conversateionList = useSelector((state) => state.conversationList);
  const { conversations, loading, error, receiverInfo } = conversateionList;
  const dispatch = useDispatch();
  useEffect(() => {
    !conversations && dispatch(getConversation());
  }, [dispatch, conversations]);
  return (
    <div className='chatFriendList'>
      <div className='chatFriendList__header'>
        <h2>Chat</h2>
        <div className='chatFriendList__header--icons'>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
      </div>
      <div className='chatFriendList__search'>
        <input type='text' placeholder='Tìm kiếm trên Messenger' />
      </div>
      {error && <h2>{error}</h2>}
      <div className='chatFriendList__body'>
        {loading ? (
          <h2>loading ...</h2>
        ) : (
          conversations?.map((conversation, i) => (
            <ChatFriendItem conversation={conversation} key={i} />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatFriendList;
