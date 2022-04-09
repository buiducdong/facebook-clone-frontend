import React, { useState, memo } from 'react';
import Avatar from '../avatar/Avatar';
import './sideBar.scss';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StoreIcon from '@mui/icons-material/Store';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useSelector } from 'react-redux';

const SideBar = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const [showMore, setShowMore] = useState(false);

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <Avatar imgsrc={user.avatar} />
            <span>{auth ? user.username : 'yourname'}</span>
          </li>
          <li className='sidebarListItem'>
            <GroupIcon className='sidebarIcon' />
            <span className='sidebarListItemText'>Bạn bè</span>
          </li>
          <li className='sidebarListItem'>
            <LiveTvIcon className='sidebarIcon' />
            <span className='sidebarListItemText'>Watch</span>
          </li>
          <li className='sidebarListItem'>
            <GroupsIcon className='sidebarIcon' />
            <span className='sidebarListItemText'>Nhóm</span>
          </li>
          <li className='sidebarListItem'>
            <StoreIcon className='sidebarIcon' />
            <span className='sidebarListItemText'>Marketplace</span>
          </li>
          <li className='sidebarListItem'>
            <AccessTimeIcon className='sidebarIcon' />
            <span className='sidebarListItemText'>Kỉ niệm</span>
          </li>
          {showMore ? (
            <>
              <li className='sidebarListItem'>
                <AccessTimeIcon className='sidebarIcon' />
                <span className='sidebarListItemText'>Kỉ niệm</span>
              </li>
              <li className='sidebarListItem'>
                <AccessTimeIcon className='sidebarIcon' />
                <span className='sidebarListItemText'>Kỉ niệm</span>
              </li>
              <li className='sidebarListItem'>
                <AccessTimeIcon className='sidebarIcon' />
                <span className='sidebarListItemText'>Kỉ niệm</span>
              </li>
              <li className='sidebarListItem'>
                <AccessTimeIcon className='sidebarIcon' />
                <span className='sidebarListItemText'>Kỉ niệm</span>
              </li>
              <li className='sidebarListItem'>
                <AccessTimeIcon className='sidebarIcon' />
                <span className='sidebarListItemText'>Kỉ niệm</span>
              </li>
              <li className='sidebarListItem'>
                <AccessTimeIcon className='sidebarIcon' />
                <span className='sidebarListItemText'>Kỉ niệm</span>
              </li>
              <li className='sidebarListItem' onClick={() => setShowMore(!showMore)}>
                <ExpandLessIcon className='sidebarExpenIcon' />
                <span className='sidebarListItemText'>Ẩn bớt</span>
              </li>
            </>
          ) : (
            <li className='sidebarListItem' onClick={() => setShowMore(!showMore)}>
              <ExpandMoreIcon className='sidebarExpenIcon' />
              <span className='sidebarListItemText'>Xem thêm</span>
            </li>
          )}
        </ul>
      </div>
      <div className='sidebar__bottom'>
        <span>Lối tắt của bạn</span>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <AccessTimeIcon className='sidebarIcon' />
            <p className='sidebarListItemText'>Kỉ niệm</p>
          </li>
          <li className='sidebarListItem'>
            <AccessTimeIcon className='sidebarIcon' />
            <p className='sidebarListItemText'>Kỉ niệm</p>
          </li>
        </ul>
        <p>
          Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo · Cookie · · Meta ©
          2022
        </p>
      </div>
    </div>
  );
};

export default memo(SideBar);
