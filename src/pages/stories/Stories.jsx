import './stories.scss';
// import swiper react component
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
// swip styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Stories = () => {
  const param = useParams();
  const [stories, setStories] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/story/getStories');
      setStories(data);
    };
    fetchData();
  }, []);
  return (
    <div className='stories'>
      <div className='stories__sidebar'>
        <div className='stories__sidebar__header'>
          <Link to={'/'} className='stories__sidebar__header-close'>
            <CloseIcon />
          </Link>
          <div className='stories__sidebar__header-logo'>
            <img
              src='https://res.cloudinary.com/bonba/image/upload/v1646627124/facebook-clone/logo-facebook_g92m4j.png'
              alt=''
            />
          </div>
        </div>
        <h2>Tin</h2>
        <p>Kho lưu trữ . Cài đặt</p>
        <p>Tin của bạn</p>
      </div>
      <div className='stories__container'>
        <Swiper
          spaceBetween={30}
          centeredSlides
          navigation
          pagination={{ clickable: true }}
          modules={[Autoplay, Navigation, Pagination]}
          className='mySwiper'
          autoplay={{ delay: 6000, disableOnInteraction: false }}
        >
          {stories?.map((story, i) => (
            //<StorySwiperr key={i} story={story} />
            <SwiperSlide>
              <img src={story.image} alt='story' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export const StorySwiperr = ({ story }) => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/user/get_user_info?userId=${story.userId}`);
      setUserInfo(data);
    };
    fetchData();
  });
  return (
    <SwiperSlide>
      <img src={story.image} alt='story' />
      {/* <p>{userInfo?.username}</p> */}
    </SwiperSlide>
  );
};
export default Stories;
