import React, { useState, memo, useEffect } from 'react';
import './header.scss';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import AppsIcon from '@mui/icons-material/Apps';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Avatar, { AvatarMidium } from '../avatar/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import HelpIcon from '@mui/icons-material/Help';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ACTIONS from '../../redux/actions';
import { Link } from 'react-router-dom';
import ChatFriendList from '../chatFriendList/ChatFriendList';
import {
  GET_CONVERSATION_RESET,
  MESSENGER_LIST_RESET,
} from '../../redux/constants/conversationContants';

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const dispatch = useDispatch();

  const [showLogout, setShowLogout] = useState(false);
  const [showMesseger, setShowMessenger] = useState(false);

  useEffect(() => {
    const isShowModel = () => {
      showMesseger && setShowMessenger(!showMesseger);
      showLogout && setShowLogout(false);
    };
    window.addEventListener('click', isShowModel);

    return () => {
      window.removeEventListener('click', isShowModel);
    };
  }, [showMesseger, showLogout]);

  const handleLogout = async () => {
    try {
      await axios.post('/user/logout');
      localStorage.removeItem('firstLogin');
      localStorage.removeItem('fb_user');
      dispatch({ type: ACTIONS.LOGOUT });
      dispatch({ type: GET_CONVERSATION_RESET });
      dispatch({ type: MESSENGER_LIST_RESET });
    } catch (err) {}
  };

  const handleShowMessenger = () => {
    setShowMessenger(!showMesseger);
  };

  const handleShowLogout = () => {
    setShowLogout(!showLogout);
  };
  return (
    <div className='header'>
      <div className='header__left'>
        <img
          src='https://res.cloudinary.com/bonba/image/upload/v1646627124/facebook-clone/logo-facebook_g92m4j.png'
          alt='logo'
        />
        <div className='header__input'>
          <SearchIcon className='search-icon' />
          <input type='text' placeholder='T??m ki???m tr??n Facebook'></input>
        </div>
      </div>
      <div className='header__middle'>
        <div className='header__option active'>
          <Link to={'/'}>
            <HomeIcon />
          </Link>
        </div>
        <div className='header__option'>
          <PeopleIcon />
        </div>
        <div className='header__option'>
          <GroupsIcon />
        </div>
      </div>
      <div className='header__right'>
        <div className='header__find_fr'>
          <p>T??m b???n b??</p>
        </div>
        <div>
          <Link to={`/profile/${user._id}`} className='header__info'>
            <Avatar imgsrc={user.avatar} />
            <span>{auth ? user.username : 'noname'}</span>
          </Link>
        </div>
        <div className='header__icon'>
          <AppsIcon />
        </div>
        <div className='header__icon' onClick={handleShowMessenger}>
          <MessageIcon />
        </div>
        <div className='header__icon'>
          <NotificationsIcon />
        </div>
        <div className='header__icon' onClick={handleShowLogout}>
          <ArrowDropDownIcon />
          {showLogout && (
            <div className='logout__model'>
              <div className='info'>
                <AvatarMidium imgsrc={user.avatar} />
                <div className='info__text'>
                  <h4 className='username'>{auth ? user.username : 'bronze'}</h4>
                  <p>Xem trang c?? nh??n c???a b???n</p>
                </div>
              </div>
              <div className='feedback'>
                <div className='icon'>
                  <AnnouncementIcon />
                </div>
                <div className='text'>
                  <h4>????ng g??p ?? ki???n</h4>
                  <p>H??y chung tay c???i thi???n Facebook.</p>
                </div>
              </div>
              <div className='choose'>
                <div className='icon'>
                  <SettingsIcon />
                </div>
                <div className='text'>
                  <p>C??i ?????t & quy???n ri??ng t??</p>
                </div>
              </div>
              <div className='choose'>
                <div className='icon'>
                  <HelpIcon />
                </div>
                <div className='text'>
                  <p>Tr??? gi??p & h??? tr???</p>
                </div>
              </div>
              <div className='choose'>
                <div className='icon'>
                  <Brightness2Icon />
                </div>
                <div className='text'>
                  <p>M??n h??nh & tr??? n??ng</p>
                </div>
              </div>
              <Link to={'/'} className='choose' onClick={handleLogout}>
                <div className='icon'>
                  <LogoutIcon />
                </div>
                <div className='text'>
                  <p>????ng xu???t</p>
                </div>
              </Link>
              <p style={{ fontSize: '13px', padding: '10px' }}>
                Quy???n ri??ng t?? ?? ??i???u kho???n ?? Qu???ng c??o ?? L???a ch???n qu???ng c??o ?? Cookie ??
                Xem th??m ?? Meta ?? 2022
              </p>
            </div>
          )}
        </div>
      </div>
      {showMesseger && <ChatFriendList />}
    </div>
  );
};

export default memo(Header);
