import React from 'react';
import { Link } from 'react-router-dom';
import './create.scss';
import CloseIcon from '@mui/icons-material/Close';
import { AvatarMidium } from '../../components/avatar/Avatar';
import { useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';

const Create = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return (
    <div className='create'>
      <div className='create__sidebar'>
        <div className='create__sidebar__header'>
          <Link to={'/'} className='create__sidebar__header-close'>
            <CloseIcon />
          </Link>
          <div className='create__sidebar__header-logo'>
            <img
              src='https://res.cloudinary.com/bonba/image/upload/v1646627124/facebook-clone/logo-facebook_g92m4j.png'
              alt=''
            />
          </div>
        </div>
        <div className='create__sidebar__setting'>
          <h2>Tin của bạn</h2>
          <SettingsIcon className='icon' />
        </div>
        <div className='create__sidebar__authInfo'>
          <AvatarMidium imgsrc={user.avatar} />
          <p>{user.username}</p>
        </div>
      </div>
      <div className='create__container'>
        <div className='create__container__image str'>
          <SettingsIcon className='icon' />
          <p>Tạo tin ảnh</p>
        </div>
        <div className='create__container__document str'>
          <SettingsIcon className='icon' />
          <p>Tạo tin dạng văn bản</p>
        </div>
      </div>
    </div>
  );
};

export default Create;
