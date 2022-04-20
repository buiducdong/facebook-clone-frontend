import './story.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AddCircleIcon from '@mui/icons-material/AddCircle';

const Story = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const stories = [
    { id: 1, name: 'story1' },
    { id: 2, name: 'story2' },
    { id: 3, name: 'story3' },
    { id: 4, name: 'story4' },
  ];
  return (
    <div className='story'>
      <Link to={`/stories/create`} className='story__item story__auth-avatar'>
        <img src={user?.avatar} alt='avatar' />
        <AddCircleIcon className='addIcon' />
      </Link>
      {stories.map((story) => (
        <Link to={`/stories/${story.id}`} key={story.id} className='story__item'>
          <p>{story.id}</p>
          <h3>{story.name}</h3>
          <img
            src='https://res.cloudinary.com/bonba/image/upload/v1649341034/facebook-clone/posts/ce6pafbuxawhihejyr83.jpg'
            alt='story'
          />
        </Link>
      ))}
    </div>
  );
};

export default Story;
