import React from 'react';
import './avatar.scss';
import { useSelector } from 'react-redux';

const Avatar = ({ imgSrc }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className='avatar'>
      <img
        src={
          auth
            ? imgSrc
            : 'https://res.cloudinary.com/bonba/image/upload/v1646627124/facebook-clone/logo-facebook_g92m4j.png'
        }
        alt='avatar'
      ></img>
    </div>
  );
};

export default Avatar;

export const AvatarMidium = ({ imgSrc }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className='avatarMidium'>
      <img
        src={
          auth
            ? imgSrc
            : 'https://res.cloudinary.com/bonba/image/upload/v1646627124/facebook-clone/logo-facebook_g92m4j.png'
        }
        alt='avatar'
      ></img>
    </div>
  );
};

export const AvatarLarg = ({ imgSrc }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className='avatarLarg'>
      <img
        src={
          auth
            ? imgSrc
            : 'https://res.cloudinary.com/bonba/image/upload/v1646627124/facebook-clone/logo-facebook_g92m4j.png'
        }
        alt='avatar'
      ></img>
    </div>
  );
};
