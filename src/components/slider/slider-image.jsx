import React from "react";

export const SliderImage = ({ slide }) => {
  return (
    <div className="slider__img">
      <img src={slide.src} alt="slide" />
    </div>
  );
};
