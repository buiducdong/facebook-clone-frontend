import React, { useEffect, useState, memo } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Story from '../story/Story';

const Feed = ({ userId }) => {
  // store redux
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  // state
  const [posts, setPosts] = useState([]);
  const [story, setStory] = useState([]);

  // get posts
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = userId
          ? await axios.get(`/post/getUserPost/${userId}`)
          : await axios.get('/post/getPost');
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (err) {
        return err.response.data.msg;
      }
    };
    getPost();
    return () => {
      setPosts([]);
    };
  }, [userId]);

  // get stories
  useEffect(() => {
    try {
      const getStory = async () => {
        const res = await axios.get('/story/getStories');
        setStory(res.data.splice(0, 4));
      };
      getStory();
    } catch (err) {
      console.log(err);
    }

    return () => {
      setStory([]);
    };
  }, []);

  const FeedHome = () => {
    return (
      <div className='feed'>
        <Story story={story} />
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    );
  };

  const FeedProfile = () => {
    return (
      <div className='feed'>
        {userId === user._id && <Share username='a' />}
        {posts.map((post) => (
          <Post username='a' key={post._id} post={post} />
        ))}
      </div>
    );
  };

  return <>{userId ? <FeedProfile /> : <FeedHome />}</>;
};

export default memo(Feed);
