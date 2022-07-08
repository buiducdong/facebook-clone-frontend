import './story.scss';
import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import AddCircleIcon from '@mui/icons-material/AddCircle';

const Story = ({ story }) => {
  // store redux
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  return (
    <div className='story'>
      <Link to={`/stories/create`} className='story__item story__auth-avatar'>
        <img src={user?.avatar} alt='avatar' />
        <AddCircleIcon className='addIcon' />
      </Link>
      {story.map((storyy, i) => (
        <StoryItem key={i} story={storyy} />
      ))}
    </div>
  );
};

const StoryItem = ({ story }) => {
  const [userStory, setUserStory] = useState({});
  // store redux
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  useEffect(() => {
    const fetUser = async () => {
      try {
        const res = await axios.get(`/user/get_user_info?userId=${story.userId}`);
        setUserStory(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetUser();

    return () => {
      setUserStory({});
    };
  }, [story]);

  return (
    <Link to={`/stories/${user._id}`} key={story.id} className='story__item'>
      <p>{userStory?.username}</p>
      <img src={story.image} alt='story' />
    </Link>
  );
};

export default memo(Story);
