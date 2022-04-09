import React, { useEffect, useState, memo } from 'react';
import Avatar from '../avatar/Avatar';
import axios from 'axios';

const CommentBlock = ({ commentContent }) => {
  const [userCmt, setUserCmt] = useState({});
  useEffect(() => {
    const fetUser = async () => {
      try {
        const res = await axios.get(
          `/user/get_user_info?userId=${commentContent.senderId}`
        );
        setUserCmt(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetUser();
  }, [commentContent]);
  return (
    <div className='comment__block'>
      <Avatar imgsrc={userCmt?.avatar} />
      <div className='comment__block__content'>
        <p style={{ fontWeight: '600', fontSize: '14px' }}>{userCmt?.username}</p>
        <p>{commentContent?.comment}</p>
        <div className='comment__block__action'>
          <p>Thích</p>
          <p>Phản hồi</p>
          <p>39 phút</p>
        </div>
      </div>
    </div>
  );
};

export default memo(CommentBlock);
