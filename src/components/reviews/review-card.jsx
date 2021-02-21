import React from "react";
import "./review-card.scss";
import starOutline from "../../assets/star0.svg";
import starFilled from "../../assets/star1.svg";

const ReviewCard = ({ review }) => {
  const displayRatingStars = () => {
    const starArr = [];
    for (let i = 0; i < review.rating; i++) {
      starArr.push(<img className="star" src={starFilled} alt="filled star" />);
    }

    const emptyStars = 5 - review.rating;

    for (let i = 0; i < emptyStars; i++) {
      starArr.push(
        <img className="star" src={starOutline} alt="unfilled star" />
      );
    }

    return starArr;
  };

  return (
    <div className="review-card">
      <div className="review-card__name">
        <span>{review.name}</span>
        <span>{review.date}</span>
      </div>
      <div className="review-card__stars">
        {displayRatingStars().map((star, index) => {
          return <span key={index}>{star}</span>;
        })}
      </div>
      <div className="review-card__review">
        <h4>{review.title}</h4>
        <p>{review.content}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
