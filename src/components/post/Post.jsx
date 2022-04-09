import React, { useEffect, useState, memo } from 'react';
import './post.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '../avatar/Avatar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Post = ({ post, username }) => {
  const auth = useSelector((state) => state.auth);
  const { user: authUser } = auth;
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser._id));
  const [like, setLike] = useState(post.likes?.length);
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.get(`/user/get_user_info?userId=${post.userId}`);
      setUser(res.data);
    };
    getUserInfo();
    return () => {
      setUser(null);
    };
  }, [post.userId]);

  const handleLikePost = async () => {
    try {
      await axios.put(`/post/${post._id}/handleLike`, {
        authId: authUser._id,
      });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='post' style={{ width: `${username && `500px`}` }}>
      <div className='post__top'>
        <div className='post__avatar'>
          <Avatar imgSrc={user?.avatar} />
        </div>
        <div className='post__info'>
          <Link to={`/profile/${post.userId}`}>
            <p className='post__name'>{user?.username}</p>
          </Link>
          <p className='post__date'>{post.createdAt}</p>
        </div>
        <div className='post__icon'>
          <MoreHorizIcon />
        </div>
      </div>
      <div className='post__middle'>
        <div className='post__desc'>
          <p>{post?.desc}</p>
        </div>
        <div className='post__img'>
          <img
            src={
              post
                ? post.img
                : 'https://res.cloudinary.com/bonba/image/upload/v1646491547/avatar/po0v8ukptpx9vjghqc5g.jpg'
            }
            alt='img_post'
          ></img>
        </div>
      </div>
      <div className='post__bottom'>
        <div className='post__display'>
          <div className='post__display-like' style={{ fontSize: '14px' }}>
            {like ? `${like} like` : 'Hãy là người đầu tiên like post này'}
          </div>
          <div className='post__display-comment'>
            <p>4.5k binh luan</p>
          </div>
        </div>
        <div className='divider'></div>
        <div className='post__action'>
          <div
            style={{ color: `${isLiked ? 'blue' : ''}` }}
            className='post__action-icon'
            onClick={handleLikePost}
          >
            <ThumbUpAltIcon />
            <span>Thich</span>
          </div>
          <div className='post__action-icon'>
            <ChatBubbleOutlineIcon />
            <span>Binh luan</span>
          </div>
          <div className='post__action-icon'>
            <ShareIcon />
            <span>Chia se</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Post);
