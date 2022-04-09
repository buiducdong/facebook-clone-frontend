import React, { useState } from 'react';
import './register.scss';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

const Register = ({ handleClose }) => {
  const initialState = {
    email: '',
    username: '',
    password: '',
    cf_password: '',
    success: '',
    err: '',
  };

  const [user, setUser] = useState(initialState);
  const { email, username, password, cf_password, success, err } = user;

  const handleClosee = () => {
    handleClose();
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, success: '', err: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cf_password) {
      return setUser({ ...user, err: 'Password dit not match', success: '' });
    }
    try {
      const res = await axios.post('/user/register', { email, username, password });
      setUser({ ...user, success: res.data.msg, err: '' });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, success: '', err: err.response.data.msg });
    }
  };

  return (
    <div className='register'>
      <div className='register__form'>
        <div className='register__header'>
          <div className='close' onClick={handleClosee}>
            <ClearIcon />
          </div>
          <div className='register__title'>Đăng ký</div>
          <div className='register__desc'>Nhanh chóng và dễ dàng.</div>
          {err && err}
          {success && success}
        </div>
        <form onSubmit={handleSubmit} className='register__post'>
          <div className='register__input'>
            <input
              type='text'
              placeholder='Họ tên'
              name='username'
              id='username'
              value={username}
              onChange={handleChangeInput}
            />
          </div>
          <div className='register__input'>
            <input
              type='text'
              placeholder='Số di động hoặc email'
              name='email'
              id='email'
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div className='register__input'>
            <input
              type='password'
              placeholder='Mật khẩu mới'
              name='password'
              id='password'
              value={password}
              onChange={handleChangeInput}
            />
          </div>
          <div className='register__input'>
            <input
              type='password'
              placeholder='Nhập lại Mật khẩu mới'
              name='cf_password'
              id='cf_password'
              value={cf_password}
              onChange={handleChangeInput}
            />
          </div>
          <div className='register__btn'>
            <button type='submit' name='registerbtn' id='registerbtn'>
              Đăng ký
            </button>
          </div>
          <div className='register__link'>
            Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách dữ liệu và
            Chính sách cookie của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi
            qua SMS và hủy nhận bất kỳ lúc nào.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
