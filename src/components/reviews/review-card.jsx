import React from "react";
import "./review-card.scss";
import starOutline from "../../assets/star0dark.svg";
import starFilled from "../../assets/star1dark.svg";
import { format } from "date-fns";
import renderHTML from "react-render-html";

const ReviewCard = ({ review }) => {
  const displayRatingStars = () => {
    const starArr = [];

    for (let i = 0; i < 5; i++) {
      if (i < review.rating) {
        starArr.push(
          <img
            className="review-card__star"
            src={starFilled}
            alt="filled star"
          />
        );
      } else {
        starArr.push(
          <img
            className="review-card__star"
            src={starOutline}
            alt="unfilled star"
          />
        );
      }
    }

    return starArr;
  };

  return (
    <div className="review-card">
      <div className="review-card__name">
        <span>{format(new Date(review.date), "d/M/y")}</span>
        <span>{review.name}</span>
      </div>
      <div className="review-card__stars">
        {displayRatingStars().map((star, index) => {
          return <span key={index}>{star}</span>;
        })}
      </div>
      <div className="review-card__review">
        <h4>{review.title}</h4>
        <p>{renderHTML(review.content)}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
