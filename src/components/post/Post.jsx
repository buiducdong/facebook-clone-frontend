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
import Comment from '../comment/Comment';

const Post = ({ post, username }) => {
  //state
  const auth = useSelector((state) => state.auth);
  const { user: authUser } = auth;
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser._id));
  const [like, setLike] = useState(post.likes?.length);
  const [comment, setComment] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [modelPost, setModelPost] = useState(false);

  //redux
  const [displayComment, setDisplayComment] = useState(false);
  const token = useSelector((state) => state.token);

  //get User info
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

  //get Comment
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('/comment/getComment/' + post._id);
      const totalCmt = res.data;
      setComment(
        totalCmt.sort((cmt1, cmt2) => {
          return new Date(cmt2.createdAt) - new Date(cmt1.createdAt);
        })
      );
    };
    fetchPost();
  }, [post._id]);

  //handle Like Post
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

  //handle Change Input Comment
  const handleChangeInput = (input) => {
    setCommentInput(input);
  };

  // handle Create Comment
  const handleSubmitComment = async (e) => {
    try {
      if (e.key === 'Enter' && commentInput) {
        const newComment = {
          senderId: authUser._id,
          postId: post._id,
          comment: commentInput,
        };
        const res = await axios.post('/comment/create', newComment);
        setComment([res.data, ...comment]);
        setCommentInput('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle Post Action
  const handlePostAction = async () => {
    try {
      await axios.delete('/post/delete/' + post._id, {
        headers: { Authorization: token },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='post' style={{ width: `${username && `500px`}` }}>
      <div className='post__top'>
        <div className='post__avatar'>
          <Avatar imgsrc={user?.avatar} />
        </div>
        <div className='post__info'>
          <Link to={`/profile/${post.userId}`}>
            <p className='post__name'>{user?.username}</p>
          </Link>
          <p className='post__date'>{post.createdAt}</p>
        </div>
        <div className='post__icon' onClick={() => setModelPost(!modelPost)}>
          <MoreHorizIcon />
          {modelPost && post.userId === authUser._id && (
            <div className='post__model-action'>
              <>
                <p onClick={handlePostAction}>Xóa bài viết</p>
                <p>Sửa bài viết</p>
              </>
            </div>
          )}
        </div>
      </div>
      <div className='post__middle'>
        <div className='post__desc'>
          <p>{post?.desc}</p>
        </div>
        <div className='post__img'>
          {post.img && <img src={post.img} alt='img_post'></img>}
        </div>
      </div>
      <div className='post__bottom'>
        <div className='post__display'>
          <div
            className='post__display-like'
            style={{ fontSize: '16px', lineHeight: '24px' }}
          >
            {like ? (
              <div style={{ display: 'flex', alightItem: 'center' }}>
                <img
                  style={{ height: '24px', width: '24px', marginRight: '8px' }}
                  src='https://res.cloudinary.com/bonba/image/upload/v1649493823/facebook-clone/like_yc297d.png'
                  alt=''
                />
                {like}
              </div>
            ) : (
              'Hãy là người đầu tiên like post này'
            )}
          </div>
          <div className='post__display-comment'>
            <p>{comment.length} bình luận</p>
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
            <span>Thích</span>
          </div>
          <div
            className='post__action-icon'
            onClick={() => setDisplayComment(!displayComment)}
          >
            <ChatBubbleOutlineIcon />
            <span>Bình luận</span>
          </div>
          <div className='post__action-icon'>
            <ShareIcon />
            <span>Chia sẻ</span>
          </div>
        </div>
        {displayComment && (
          <Comment
            post={post}
            changeInput={handleChangeInput}
            commentInput={commentInput}
            handleSubmitComment={handleSubmitComment}
            comment={comment}
          />
        )}
      </div>
    </div>
  );
};

export default memo(Post);
