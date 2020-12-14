import React from 'react';

export const SliderImage = ({ details }) => {
  return (
    <div className='slider__img' style={{ backgroundImage: `url(${details.src})` }}>
      <div className='slider__img-content'>
        <h1 className='slider__img-title'>{details.id}</h1>
        <button className='slider__img-btn'>SHOP NOW</button>
      </div>
    </div>
  );
};
