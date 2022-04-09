import React, { useEffect, memo } from 'react';
import './homePage.scss';
import Headers from '../../components/header/Header';
import SideBar from '../../components/sidebar/SideBar';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightBar/RightBar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  dispatchLogin,
  dispatchGetUser,
  fetchUser,
} from '../../redux/actions/authAction';

const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null);
        dispatch({ type: 'GET_TOKEN', payload: res.data.access_token });
      };
      getToken();
      console.log('get Token');
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
      console.log('get User');
    }
  }, [token, dispatch]);

  const { user } = auth;
  useEffect(() => {
    localStorage.setItem('fb_user', JSON.stringify(user));
  }, [user]);
  return (
    <>
      <Headers />
      <div className='container'>
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
};

export default memo(HomePage);
