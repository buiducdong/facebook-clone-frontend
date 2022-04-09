import React, { useState, memo } from 'react';
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

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user } = auth;
  const dispatch = useDispatch();

  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('/user/logout');
      localStorage.removeItem('firstLogin');
      localStorage.removeItem('fb_user');
      dispatch({ type: ACTIONS.LOGOUT });
    } catch (err) {}
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
          <input type='text' placeholder='Tìm kiếm trên Facebook'></input>
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
          <p>Tìm bạn bè</p>
        </div>
        <div>
          <Link to={`/profile/${user._id}`} className='header__info'>
            <Avatar imgSrc={user.avatar} />
            <span>{auth ? user.username : 'noname'}</span>
          </Link>
        </div>
        <div className='header__icon'>
          <AppsIcon />
        </div>
        <div className='header__icon'>
          <MessageIcon />
        </div>
        <div className='header__icon'>
          <NotificationsIcon />
        </div>
        <div className='header__icon' onClick={() => setShowLogout(!showLogout)}>
          <ArrowDropDownIcon />
          {showLogout && (
            <div className='logout__model'>
              <div className='info'>
                <AvatarMidium imgSrc={user.avatar} />
                <div className='info__text'>
                  <h4 className='username'>{auth ? user.username : 'bronze'}</h4>
                  <p>Xem trang cá nhân của bạn</p>
                </div>
              </div>
              <div className='feedback'>
                <div className='icon'>
                  <AnnouncementIcon />
                </div>
                <div className='text'>
                  <h4>Đóng góp ý kiến</h4>
                  <p>Hãy chung tay cải thiện Facebook.</p>
                </div>
              </div>
              <div className='choose'>
                <div className='icon'>
                  <SettingsIcon />
                </div>
                <div className='text'>
                  <p>Cài đặt & quyền riêng tư</p>
                </div>
              </div>
              <div className='choose'>
                <div className='icon'>
                  <HelpIcon />
                </div>
                <div className='text'>
                  <p>Trợ giúp & hỗ trợ</p>
                </div>
              </div>
              <div className='choose'>
                <div className='icon'>
                  <Brightness2Icon />
                </div>
                <div className='text'>
                  <p>Màn hình & trợ năng</p>
                </div>
              </div>
              <Link to={'/'} className='choose' onClick={handleLogout}>
                <div className='icon'>
                  <LogoutIcon />
                </div>
                <div className='text'>
                  <p>Đăng xuất</p>
                </div>
              </Link>
              <p style={{ fontSize: '13px', padding: '10px' }}>
                Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo · Cookie ·
                Xem thêm · Meta © 2022
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
