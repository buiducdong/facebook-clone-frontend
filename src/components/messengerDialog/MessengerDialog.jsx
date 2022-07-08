import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../avatar/Avatar';
import Message from '../message/Message';
import './messengerDialog.scss';
import CloseIcon from '@mui/icons-material/Close';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ThumbUpSharpIcon from '@mui/icons-material/ThumbUpSharp';
import GifBoxSharpIcon from '@mui/icons-material/GifBoxSharp';
import PermMediaSharpIcon from '@mui/icons-material/PermMediaSharp';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { io } from 'socket.io-client';

const MessengerDialog = ({ messenger, socket }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const { messages, receiverInfo } = messenger;
  const [arrivalMessage, setArrivalMessage] = useState();

  const [newMessage, setNewMessage] = useState('');

  const scrollRef = useRef();
  const [messagesCpn, setMessagesCpn] = useState(messages);
  console.log(messagesCpn);

  useEffect(() => {
    socket.current.on('getMessage', (data) => {
      setMessagesCpn([
        ...messagesCpn,
        {
          sender: data.senderId,
          message: data.message,
          createAt: Date.now(),
          conversationid: data.conversationId,
        },
      ]);
    });
  }, [socket, messagesCpn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      message: newMessage,
      conversationId: messages[0].conversationId,
    };

    socket.current.emit('sendMessage', {
      senderId: user._id,
      message: newMessage,
      receiverId: receiverInfo._id,
      conversationId: messages[0].conversationId,
    });

    try {
      const { data } = await axios.post('/message', message);
      dispatch({ type: 'ADD_NEW_MESSAGE', payload: data });
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDialogMessage = () => {
    dispatch({
      type: 'MESSENGER_LIST_DELETE',
      payload: { receiverId: receiverInfo._id },
    });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='messengerDialog'>
      <div className='messengerDialog__header'>
        <div className='messengerDialog__header__avatar'>
          <Avatar imgsrc={receiverInfo?.avatar} />
        </div>
        <div className='messengerDialog__header__info'>
          <h2>{receiverInfo?.username}</h2>
          <p>dang hoat dong</p>
        </div>
        <div className='messengerDialog__header__action'>
          <span className='messengerDialog__header__icon'>
            <PhoneIcon />
          </span>
          <span className='messengerDialog__header__icon'>
            <VideocamIcon />
          </span>
          <span className='messengerDialog__header__icon'>
            <HorizontalRuleIcon />
          </span>
          <span
            onClick={handleDeleteDialogMessage}
            className='messengerDialog__header__icon'
          >
            <CloseIcon />
          </span>
        </div>
      </div>

      <div className='messengerDialog__body'>
        {messagesCpn?.map((message, i) => {
          if (message.sender === user._id) {
            return <Message key={i} message={message} auth />;
          } else {
            return <Message key={i} message={message} />;
          }
        })}
      </div>
      <form className='messengerDialog__bottom' onSubmit={handleSubmit}>
        <span className='messengerDialog__bottom__icon'>
          <AddCircleSharpIcon />
        </span>
        {!newMessage.trim() && (
          <>
            <span className='messengerDialog__bottom__icon'>
              <PermMediaSharpIcon />
            </span>
            <span className='messengerDialog__bottom__icon'>
              <GifBoxSharpIcon />
            </span>
          </>
        )}

        <input
          className='messengerDialog__bottom__search'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type='text'
          placeholder='Aa'
        />
        <span className='messengerDialog__bottom__icon'>
          {newMessage.trim() ? (
            <button
              style={{ border: 'none', backgroundColor: 'transparent' }}
              type='submit'
            >
              <SendIcon type='sumit' />
            </button>
          ) : (
            <ThumbUpSharpIcon />
          )}
        </span>
      </form>
    </div>
  );
};

export default MessengerDialog;
