import React, { useState } from 'react';
import './loginPage.scss';
import Register from './Register';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { dispatchLogin } from '../../redux/actions/authAction';
import { CircularProgress } from '@mui/material';

const LoginPage = () => {
  const [displayRegister, setDisplayRegister] = useState(false);
  const handleClose = () => {
    setDisplayRegister(!displayRegister);
  };

  const initialState = {
    email: '',
    password: '',
    success: '',
    err: '',
  };

  const [user, setUser] = useState(initialState);
  const { email, password, success, err } = user;
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, success: '', err: '' });
  };

  const handleSubmit = async (e) => {
    setIsFetching(true);
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', { email, password });
      setUser({ ...user, success: res.data.msg, err: '' });
      localStorage.setItem('firstLogin', true);

      dispatch(dispatchLogin());
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, success: '', err: err.response.data.msg });
    }
    setIsFetching(false);
  };
  return (
    <>
      <div className='login'>
        <div className='login__left'>
          <img
            src='https://res.cloudinary.com/bonba/image/upload/v1646878238/facebook-clone/dF5SId3UHWd_ky7mjb.svg'
            alt='facebook'
          />
          <p>
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
          </p>
        </div>
        <div className='login__right'>
          {err && <h2>{err}</h2>}
          {success && <h2>{success}</h2>}
          <form onSubmit={handleSubmit} className='login__form'>
            <div className='login__input'>
              <input
                type='text'
                placeholder='Email hoặc số điện thoại'
                name='email'
                id='email'
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <div className='login__input'>
              <input
                type='password'
                placeholder='Mật khẩu'
                name='password'
                id='password'
                value={password}
                onChange={handleChangeInput}
              />
            </div>
            <div className='login__btn'>
              <button disabled={isFetching} type='submit' name='loginbtn' id='loginbtn'>
                {isFetching ? (
                  <CircularProgress size={20} color={'inherit'} />
                ) : (
                  'Đăng nhập'
                )}
              </button>
            </div>
            <div className='login__link'>
              <a href='#f'>Quên mật khẩu?</a>
            </div>
            <div className='divider'></div>
            <div className='register__btn'>
              <span className='registerBtn' onClick={handleClose}>
                Tạo tài khoản mới
              </span>
            </div>
          </form>
        </div>
      </div>
      {displayRegister && <Register handleClose={handleClose} />}
    </>
  );
};

export default LoginPage;
