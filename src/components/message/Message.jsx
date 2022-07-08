import React, { useEffect, useRef } from 'react';
import './message.scss';
import Avatar from '../avatar/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReplyIcon from '@mui/icons-material/Reply';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

const Message = ({ auth, message }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);
  return (
    <div className='message' ref={scrollRef}>
      <p className='message__created'>2 ngày trước</p>
      <div className={`message__container ${auth ? 'auth' : ''}`}>
        {!auth && (
          <div className='message__container__avatar'>
            <Avatar imgsrc='https://res.cloudinary.com/bonba/image/upload/v1653611341/avatar/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f3836735954786e67304e714c43773d3d2d3639303836323532312e313538303039636436323762653066643531393237363736313233302e6a7067_rhtio5.jpg' />
          </div>
        )}
        <div className='message__container__text'>{message.message}</div>
        <div className='message__container__action'>
          <span>
            <SentimentSatisfiedAltIcon />
          </span>
          <span>
            <ReplyIcon />
          </span>
          <span>
            <MoreVertIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
