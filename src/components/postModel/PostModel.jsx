import React, { useEffect, useState, useRef } from 'react';
import Avatar from '../avatar/Avatar';
import './postModel.scss';
import { useSelector } from 'react-redux';
import PeopleIcon from '@mui/icons-material/People';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const PostModel = ({ handleCloseForm }) => {
  //redux
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user } = auth;

  // state
  const [showAddImg, setShowAddImg] = useState(false);
  const [file, setFile] = useState(false);
  const [loading, setLoading] = useState(false);

  const desc = useRef();

  const handleCloseFormm = () => {
    handleCloseForm();
  };
  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const handlePreviewImg = (e) => {
    const imgFile = e.target.files[0];

    imgFile.preview = URL.createObjectURL(imgFile);
    setFile(imgFile);
  };
  const handleSubmitt = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newPost = {
        userId: user._id,
        desc: desc.current.value,
      };
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('/upload/upload_post', formData, {
          headers: { 'content-type': 'multipart/form-data', Authorization: token },
        });
        newPost.img = res.data.url;
      }
      await axios.post('/post/create', newPost, {
        headers: { Authorization: token },
      });
      setLoading(false);
      window.location.reload();
    } catch (err) {
      return err.response.data.msg;
    }
  };
  return (
    <div className='postt'>
      <div className='postModel'>
        <h3>
          T???o b??i vi???t
          <span onClick={handleCloseFormm}>
            <ClearIcon />
          </span>
        </h3>

        <form className='post__body' onSubmit={handleSubmitt}>
          <div className='info'>
            <Avatar imgSrc={user.avatar} />
            <div className='info__text'>
              <p>{user.username}</p>
              <div className='public'>
                <PeopleIcon />
                <span>B???n b??</span>
                <ArrowDropDownIcon />
              </div>
            </div>
          </div>
          <div className='post__image'>
            <div className='post__things'>
              {/* <input
                ref={user.desc}
                type='text'
                placeholder={`${user.username} oi, Ban dang nghi gi the ?`}
              /> */}
              <textarea
                name='desc'
                id='desc'
                cols='30'
                rows='3'
                ref={desc}
                placeholder={`${user.username} ??i, B???n ??ang ngh?? g?? th??? ?`}
                style={{ fontSize: `${showAddImg ? '18px' : '24px'} ` }}
              ></textarea>
            </div>
            {showAddImg && (
              <div className='add-img'>
                {file ? (
                  <div className='shareImg'>
                    <img src={file.preview} alt='img' />
                    <ClearIcon
                      className='cancelImg'
                      onClick={() => {
                        setFile(null);
                      }}
                    />
                  </div>
                ) : (
                  <label htmlFor='file' className='add-image'>
                    <h5>Th??m ???nh/video</h5>
                    <input
                      style={{ display: 'none' }}
                      type='file'
                      id='file'
                      onChange={handlePreviewImg}
                    />
                    <ClearIcon
                      className='cancelAddImg'
                      onClick={() => {
                        setShowAddImg(!showAddImg);
                      }}
                    />
                  </label>
                )}
              </div>
            )}
            <div className='share__bottom'>
              <p>Th??m v??o b??i vi???t</p>
              <div className='icon__post'>
                <PermMediaIcon
                  onClick={() => setShowAddImg(!showAddImg)}
                  className='img__icon'
                />
                <EmojiEmotionsIcon className='emoj__icon' />
                <MoreHorizIcon />
              </div>
            </div>
          </div>
          <div className='post__bottom'>
            <button type='submit' disabled={loading ? true : false}>
              {loading ? <CircularProgress size={10} /> : '????ng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModel;
