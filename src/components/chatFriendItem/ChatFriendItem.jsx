import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConverReceiverInfo,
  listMessenger,
} from '../../redux/actions/conversationAction';

const ChatFiendItem = ({ conversation }) => {
  const dispatch = useDispatch();
  const messengerList = useSelector((state) => state.messengerList);
  const { messengers } = messengerList;
  const [receiverInfo, setReceiverInfo] = useState({});

  const auth = useSelector((state) => state.auth);
  const {
    user: { _id },
  } = auth;

  const receiverId = conversation.members.find((d) => d !== _id);
  useEffect(() => {
    const fetData = async () => {
      const { data: receiverInfo } = await axios.get(
        `/user/get_user_info?userId=${receiverId}`
      );
      setReceiverInfo(receiverInfo);
    };
    fetData();
  }, [receiverId, dispatch, conversation]);

  const handleGetMessage = () => {
    const existsMessenger = messengers?.some((m, i) => {
      return m.receiverInfo?._id === receiverInfo?._id;
    });
    if (!existsMessenger) {
      dispatch(listMessenger({ id: conversation?._id }));
    }
  };
  return (
    <div onClick={handleGetMessage} className='chatFriend'>
      <div className='chatFriend__avatar'>
        <img src={receiverInfo?.avatar} alt='avatar' />
      </div>
      <div className='chatFriend__info'>
        <div className='chatFriend__info--name'>{receiverInfo?.username}</div>
        <div className='chatFriend__info--chat'>This function is not complete</div>
      </div>
    </div>
  );
};

export default ChatFiendItem;
