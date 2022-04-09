import React, { useEffect, useRef, memo } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../avatar/Avatar';
import './comment.scss';
import CommentBlock from './CommentBlock';

const Comment = ({ post, changeInput, commentInput, handleSubmitComment, comment }) => {
  const auth = useSelector((state) => state.auth);
  const { user: authUser } = auth;
  const inputref = useRef();
  useEffect(() => {
    inputref.current.focus();
  }, []);

  return (
    <div className='comment'>
      <div className='comment__header'>
        <p>Xem câu trả lời trước đó</p>
        <p>Tất cả bình luận</p>
      </div>
      <div className='comment__send'>
        <Avatar imgsrc={authUser.avatar} />
        <div className='comment__input'>
          <input
            ref={inputref}
            type='text'
            placeholder='Viết bình luận...'
            value={commentInput}
            onChange={(e) => changeInput(e.target.value)}
            onKeyPress={handleSubmitComment}
          />
          <span>Nhấn Enter để đăng</span>
        </div>
      </div>
      <div className='comment__body'>
        {comment?.map((cmt) => (
          <CommentBlock key={cmt._id} commentContent={cmt} />
        ))}
      </div>
      <div className='comment__bottom'>Xem thêm bình luận</div>
    </div>
  );
};

export default memo(Comment);
