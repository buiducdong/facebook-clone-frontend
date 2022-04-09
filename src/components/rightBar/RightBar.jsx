import React, { memo } from 'react';
import './rightBar.scss';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar } from '@mui/material';

const RightBar = () => {
  return (
    <div className='rightbar'>
      <div className='rightbar__top'>
        <p className='rightbar__top-title'>Được tài trợ</p>
        <div className='rightbar__top-web'>
          <img
            src='https://res.cloudinary.com/bonba/image/upload/v1646491547/avatar/po0v8ukptpx9vjghqc5g.jpg'
            alt='img'
          />
          <div className='rightbar__top-info'>
            <p className='rightbar__top-name'>name.com</p>
            <p className='rightbar__top-link'>link.com</p>
          </div>
        </div>
      </div>
      <div className='divider'></div>
      <div className='rightbar__middle'>
        <div className='rightbar__middle-header'>
          <div className='rightbar__middle-title'>Người liên hệ</div>
          <div className='rightbar__middle-icon'>
            <div className='iconn'>
              <SearchIcon />
            </div>
            <div className='iconn'>
              <VideoCallIcon />
            </div>
            <div className='iconn'>
              <MoreHorizIcon />
            </div>
          </div>
        </div>
        <ul className='rightbarList'>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Bạn bè</span>
          </li>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Watch</span>
          </li>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Nhóm</span>
          </li>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Watch</span>
          </li>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Nhóm</span>
          </li>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Watch</span>
          </li>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Nhóm</span>
          </li>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Watch</span>
          </li>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Nhóm</span>
          </li>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Watch</span>
          </li>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Nhóm</span>
          </li>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Watch</span>
          </li>
          <li className='rightbarListItem'>
            <Avatar />
            <span className='rightbarListItemText'>Nhóm</span>
          </li>
        </ul>
      </div>
      <div className='rightbar__bottom'></div>
    </div>
  );
};

export default memo(RightBar);
