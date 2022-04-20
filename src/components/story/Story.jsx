import './story.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const Story = () => {
  const stories = [
    { id: 1, name: 'story1' },
    { id: 2, name: 'story2' },
    { id: 3, name: 'story3' },
    { id: 4, name: 'story4' },
    { id: 5, name: 'story5' },
  ];
  return (
    <div className='story'>
      {stories.map((story) => (
        <Link to={`/stories/${story.id}`} key={story.id} className='story__item'>
          <p>{story.id}</p>
          <h3>{story.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default Story;
