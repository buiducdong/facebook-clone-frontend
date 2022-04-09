import React from 'react';
import './avatar.scss';

const Avatar = ({ imgsrc }) => {
  return (
    <div className='avatar'>
      <img
        src={
          imgsrc
            ? imgsrc
            : 'https://res.cloudinary.com/bonba/image/upload/v1642412567/avatar/admin2_fvvzux.png'
        }
        alt='avatar'
      ></img>
    </div>
  );
};

export default Avatar;

export const AvatarMidium = ({ imgsrc }) => {
  return (
    <div className='avatarMidium'>
      <img
        src={
          imgsrc
            ? imgsrc
            : 'https://res.cloudinary.com/bonba/image/upload/v1642412567/avatar/admin2_fvvzux.png'
        }
        alt='avatar'
      ></img>
    </div>
  );
};

export const AvatarLarg = ({ imgsrc }) => {
  return (
    <div className='avatarLarg'>
      <img
        src={
          imgsrc
            ? imgsrc
            : 'https://res.cloudinary.com/bonba/image/upload/v1642412567/avatar/admin2_fvvzux.png'
        }
        alt='avatar'
      ></img>
    </div>
  );
};
