import './stories.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Stories = () => {
  const param = useParams();
  return (
    <div className='stories'>
      {/* <Link to={'..'}>back</Link>
      <h2>Story {param.idUser}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        ...
      </Swiper> */}
      <div className='stories__sidebar'>
        <div className='stories__sidebar__header'>
          <div className='stories__sidebar__header-close'>
            <CloseIcon />
          </div>
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
      <div className='stories__container'></div>
    </div>
  );
};

export default Stories;
