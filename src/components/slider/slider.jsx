import React from 'react';
import './slider.scss';

class Slider extends React.Component {
  render() {
    return (
      <div className='slider'>
        <div className='slider__list-container'>
          <ul className='slider__list'>
            <li className='slider__list-item'>
              <img
                className='slider__img'
                src='/assets/hero1.jpg'
                alt='hero1'
              />
            </li>
            <li className='slider__list-item'>
              <img
                className='slider__img'
                src='/assets/hero2.jpg'
                alt='hero2'
              />
            </li>
            <li className='slider__list-item'>
              <img
                className='slider__img'
                src='/assets/hero3.jpg'
                alt='hero3'
              />
            </li>
          </ul>
        </div>
        <div className='slider__buttons'>
          <button className='slider__button slider__button--prev'>
            previous
          </button>
          <button className='slider__button slider__button--next'>next</button>
        </div>
        <div className='slider__nav'>
          <button className='slider__nav-item'></button>
          <button className='slider__nav-item'></button>
          <button className='slider__nav-item'></button>
        </div>
      </div>
    );
  }
}

export default Slider;
