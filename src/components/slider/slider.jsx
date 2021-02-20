import React from "react";
import "./slider.scss";
import { SliderImage } from "./slider-image";
import leftArrow from "../../assets/001-arrow.png";
import rightArrow from "../../assets/002-right-1.png";

class Slider extends React.Component {
  constructor() {
    super();

    this.state = {
      x: 0,
    };
  }

  componentDidMount = () => {
    if (this.props.imageIndex) {
      this.setState({
        x: this.props.imageIndex * 100 * -1,
      });
    } else {
      this.setState({
        index: 0,
      });
    }
  };

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
    this.setState((prevState) => ({
      x: (prevState.x -= 100),
    }));
  };

  render() {
    const { x } = this.state;
    return (
      <div className="slider">
        {this.props.slideItems.map((slide, i) => (
          <div
            className="slider__page"
            key={i}
            style={{ transform: `translateX(${x}%)` }}
          >
            <SliderImage slide={slide} />
          </div>
        ))}
        <div className="slider__btns">
          <button
            onClick={this.previous}
            className="slider__btn slider__btn--prev"
            disabled={this.state.x === 0}
          >
            <img className="slider__btn-img" src={leftArrow} alt="left arrow" />
          </button>
          <button
            onClick={this.next}
            className="slider__btn slider__btn--next"
            disabled={
              this.state.x === (this.props.slideItems.length - 1) * 100 * -1
            }
          >
            <img
              className="slider__btn-img"
              src={rightArrow}
              alt="right arrow"
            />
          </button>
        </div>
      </div>
    );
  }
}

export default Slider;
