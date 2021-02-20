import React from "react";

export const SliderImage = ({ slide }) => {
  return (
    <div
      className="slider__img"
      style={{ backgroundImage: `url(${slide.src})` }}
    >
      <div className="slider__img-content"></div>
    </div>
  );
};
