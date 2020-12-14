import React from 'react';
import './slider.scss';
import { SliderImage } from './slider-image';
import img1 from '../../assets/hero1.jpg';
import img5 from '../../assets/hero5.jpg';
import img3 from '../../assets/hero3.jpg';
import leftArrow from '../../assets/001-arrow.png';
import rightArrow from '../../assets/002-right-1.png';

class Slider extends React.Component {
  constructor() {
    super();

    this.state = {
      x: 0,
    };

    this.sliderCategories = [
      {
        id: 'Autumn Collection',
        src: img1,
      },
      {
        id: "Women's Knitwear",
        src: img5,
      },
      {
        id: "Men's Minimal Essentials",
        src: img3,
      },
    ];
  }

  previous = () => {
    if (this.state.x === 0) {
      this.setState({
        x: 0,
      });
    } else {
      this.setState((prevState) => ({
        x: prevState.x + 100,
      }));
    }
  };

  next = () => {
    if (this.state.x === -100 * (this.sliderCategories.length - 1)) {
      this.setState({
        x: -200,
      });
    } else {
      this.setState((prevState) => ({
        x: prevState.x - 100,
      }));
    }
  };

  render() {
    const { x } = this.state;

    return (
      <div className='slider'>
        {this.sliderCategories.map((slide, i) => (
          <div
            className='slider__page'
            key={i}
            style={{ transform: `translateX(${x}%)` }}
          >
            <SliderImage details={slide} />
          </div>
        ))}
        <div className='slider__btns'>
          <button
            onClick={this.previous}
            className='slider__btn slider__btn--prev'
            disabled={this.state.x === 0}
          >
            <img className='slider__btn-img' src={leftArrow} />
          </button>
          <button
            onClick={this.next}
            className='slider__btn slider__btn--next'
            disabled={this.state.x === -200}
          >
            <img className='slider__btn-img' src={rightArrow} />
          </button>
        </div>
      </div>
    );
  }
}

export default Slider;
