import MoreHoriz from '@mui/icons-material/MoreHoriz';
import React, { useEffect, useState, memo } from 'react';
import Avatar, { AvatarLarg } from '../../components/avatar/Avatar';
import Header from '../../components/header/Header';
import './profile.scss';
import Feed from '../../components/feed/Feed';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Message from '@mui/icons-material/Message';
import { dispatchFollow, dispatchUnFollow } from '../../redux/actions/authAction';

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user: authUser } = auth;

  const dispatch = useDispatch();
  const useParam = useParams();
  const userId = useParam.userId;

  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(authUser.followings?.includes(user?._id));
  useEffect(() => {
    const getUserInfo = async () => {
      const res =
        userId === authUser._id
          ? { data: authUser }
          : await axios.get(`/user/get_user_info?userId=${userId}`);
      setUser(res.data);
    };
    getUserInfo();
    return () => {
      setUser({});
    };
  }, [userId, authUser, token]);

  useEffect(() => {
    setFollowed(authUser.followings?.includes(user?._id));
  }, [authUser, user?._id]);

  useEffect(() => {
    if (user?._id) {
      const getFriend = async () => {
        const res = await axios.get(`/user/get_friends?userId=${user?._id}`);
        setFriends(res.data);
      };
      getFriend();
    }
  }, [followed, user]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/user/${user?._id}/unfollow`, {
          authId: authUser._id,
        });
        dispatch(dispatchUnFollow(user._id));
      } else {
        await axios.put(`/user/${user?._id}/follow`, {
          authId: authUser._id,
        });
        dispatch(dispatchFollow(user._id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />
      <div className='profile'>
        <div className='profile__header'>
          <div className='coverPicture'>
            <img src={user.coverPicture} alt='coverPicture'></img>
          </div>
          <div className='profile__header__info'>
            <div className='profile__header__left'>
              <AvatarLarg imgSrc={user.avatar} />
              <div className='name'>
                <h2>{user.username}</h2>
                <p>{user?.followings?.length} bạn bè</p>
                <div className='profile__friend'>
                  <Avatar imgSrc={user.avatar} />
                  <Avatar imgSrc={user.avatar} />
                  <Avatar imgSrc={user.avatar} />
                  <Avatar imgSrc={user.avatar} />
                </div>
              </div>
            </div>
            <div className='profile__header__right'>
              {authUser._id === userId ? (
                <>
                  <div className='add__story'>
                    <p>Thêm vào tin</p>
                  </div>
                  <div className='edit__story'>
                    <p>Chỉnh sửa trang cá nhân</p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{ display: 'flex', color: 'white', alignItems: 'center' }}
                    className='add__story'
                  >
                    <Message />
                    <p style={{ marginLeft: '8px' }}>Nhắn tin</p>
                  </div>
                  {followed ? (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#dddbdbe0',
                        }}
                        className='edit__story'
                        onClick={handleFollow}
                      >
                        <img
                          style={{ height: '16px', width: '16px', marginRight: '8px' }}
                          src='https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/c9BbXR9AzI1.png'
                          alt='addFr'
                        />
                        <p>Đang theo dõi</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{ display: 'flex', alignItems: 'center' }}
                        className='edit__story'
                        onClick={handleFollow}
                      >
                        <img
                          style={{ height: '16px', width: '16px', marginRight: '8px' }}
                          src='https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/33EToHSZ94f.png'
                          alt='addFr'
                        />
                        <p>Theo dõi</p>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className='divider'></div>
          <div className='profile__tap'>
            <ul>
              <li>Bài viết</li>
              <li>Giới thiệu </li>
              <li>Bạn bè</li>
              <li>Ảnh</li>
              <li>Video</li>
              <li>Check in</li>
              <li>Xem thêm</li>
            </ul>
            <div className='horizan'>
              <MoreHoriz />
            </div>
          </div>
        </div>

        <div className='profile__body'>
          <div className='profile__body__left'>
            {friends.map((friend, index) => {
              return (
                <div key={index}>
                  <h2>{friend.username}</h2>
                </div>
              );
            })}
          </div>
          <Feed userId={userId} />
        </div>
      </div>
    </>
  );
};

export default memo(Profile);
