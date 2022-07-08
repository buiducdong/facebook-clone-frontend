import React, { useEffect, memo, useRef } from 'react';
import './homePage.scss';
import Headers from '../../components/header/Header';
import SideBar from '../../components/sidebar/SideBar';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightBar/RightBar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';
import {
  dispatchLogin,
  dispatchGetUser,
  fetchUser,
} from '../../redux/actions/authAction';
import MessengerDialogBox from '../../components/messengerDialogBox/MessengerDialogBox';

const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const socket = useRef();

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null);
        dispatch({ type: 'GET_TOKEN', payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        // dispatch(dispatchLogin());
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

  // connect socket
  useEffect(() => {
    socket.current = io('ws://localhost:8000');
  }, []);

  // list user online
  useEffect(() => {
    auth.user && socket.current.emit('addUser', auth.user._id);
    socket.current.on('listUser', (users) => console.log(users));
  }, [auth.user, socket]);

  console.log(socket);
  return (
    <>
      <Headers />
      <div className='container'>
        <SideBar />
        <Feed />
        <RightBar />
      </div>
      <MessengerDialogBox socket={socket} />
    </>
  );
};

export default memo(HomePage);
