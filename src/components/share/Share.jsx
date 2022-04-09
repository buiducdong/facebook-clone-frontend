import React, { useState, memo } from 'react';
import './share.scss';
import Avatar from '../avatar/Avatar';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useSelector } from 'react-redux';
import PostModel from '../postModel/PostModel';

const Share = ({ username }) => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const [modelPost, setModelPost] = useState(false);
  const handleCloseForm = () => {
    setModelPost(false);
  };
  return (
    <div className='share' style={{ width: `${username && `500px`}` }}>
      <div className='share__top'>
        <Avatar imgSrc={user.avatar} />
        <label onClick={() => setModelPost(!modelPost)}>
          {auth ? user.username : 'Bronze'} ơi, bạn đang nghĩ gì thế?
        </label>
      </div>
      <div className='share__bootom'>
        <div className='share__icon'>
          <VideoCameraFrontIcon className='live__icon' />
          <span>Video trực tiếp</span>
        </div>
        <div className='share__icon' onClick={() => setModelPost(!modelPost)}>
          <PermMediaIcon className='video__icon' />
          <span>Ảnh/Video</span>
        </div>
        <div className='share__icon'>
          <EmojiEmotionsIcon className='emoi__icon' />
          <span>{username ? 'Cảm xúc trong đời' : 'Cảm xúc/Hoạt động'}</span>
        </div>
      </div>
      {modelPost && <PostModel handleCloseForm={handleCloseForm} />}
    </div>
  );
};

export default memo(Share);
