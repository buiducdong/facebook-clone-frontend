import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './create.scss';
import CloseIcon from '@mui/icons-material/Close';
import { AvatarMidium } from '../../components/avatar/Avatar';
import { useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';

const Create = () => {
  // store redux
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user } = auth;

  // state
  const [file, setFile] = useState(false);
  const [loading, setLoading] = useState(false);

  // remove preview imgage in file
  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const handlePreviewImg = (e) => {
    const fileImg = e.target.files[0];
    fileImg.preview = URL.createObjectURL(fileImg);
    setFile(fileImg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('/upload/upload_story', formData, {
          headers: { 'content-type': 'multipart/form-data', Authorization: token },
        });
        await axios.post(
          '/story/create',
          {
            image: res.data.url,
            userId: user._id,
          },
          { Authorization: token }
        );
        setFile(false);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div className='create'>
      <div className='create__sidebar'>
        <div className='create__sidebar__header'>
          <Link to={'/'} className='create__sidebar__header-close'>
            <CloseIcon />
          </Link>
          <div className='create__sidebar__header-logo'>
            <img
              src='https://res.cloudinary.com/bonba/image/upload/v1646627124/facebook-clone/logo-facebook_g92m4j.png'
              alt=''
            />
          </div>
        </div>
        <div className='create__sidebar__setting'>
          <h2>Tin của bạn</h2>
          <SettingsIcon className='icon' />
        </div>
        <div className='create__sidebar__authInfo'>
          <AvatarMidium imgsrc={user.avatar} />
          <p>{user.username}</p>
        </div>
        {file && (
          <>
            <div className='add--text'>
              <p>Aa</p>
              Thêm văn bản
            </div>
            <div className='create__sidebar__bottom'>
              <span onClick={() => setFile(false)}>Bỏ</span>
              <span onClick={handleSubmit}>{loading ? 'is loading' : 'Chia sẻ lên tin'}</span>
            </div>
          </>
        )}
      </div>
      <div className='create__container'>
        {file ? (
          <div className='previewImg'>
            <p>Xem trước</p>
            <img src={file.preview} alt='story' />
          </div>
        ) : (
          <>
            <label htmlFor='img-file' className='create__container__image str'>
              <SettingsIcon className='icon' />
              <p>Tạo tin ảnh</p>
              <input
                type='file'
                id='img-file'
                onChange={handlePreviewImg}
                style={{ display: 'none' }}
              />
            </label>
            <label htmlFor='text-file' className='create__container__document str'>
              <SettingsIcon className='icon' />
              <p>Tạo tin dạng văn bản</p>
              <input type='file' id='text-file' style={{ display: 'none' }} />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default Create;
