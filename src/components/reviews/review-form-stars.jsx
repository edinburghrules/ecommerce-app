import React from "react";
import "./review-form-stars.scss";
import reviewFormStar from "../../assets/reviewformstar.svg";
import reviewFormStarFilled from "../../assets/reviewformfilledstar.svg";

class ReviewFormStars extends React.Component {
  state = {
    maxRating: 5,
    currentHoverIndex: 0,
    selectedRating: null,
  };

  handleHover = (i) => {
    this.setState({
      currentHoverIndex: i,
      selectedRating: null,
    });
  };

  resetStars = () => {
    this.setState({
      currentHoverIndex: 0,
    });
  };

  selectRating = (i) => {
    this.setState(
      {
        selectedRating: i,
      },
      () => {
        this.props.handleGetRating(this.state.selectedRating);
      }
    );
  };

  resetRating = () => {
    this.setState({
      selectedRating: null,
    });
  };

  render() {
    let stars = [];

    for (let i = 1; i <= this.state.maxRating; i++) {
      if (this.state.selectedRating === null) {
        if (
          i == this.state.currentHoverIndex ||
          i < this.state.currentHoverIndex
        ) {
          stars.push(
            <img
              onClick={() => this.selectRating(i)}
              onMouseOver={() => this.handleHover(i)}
              key={i}
              src={reviewFormStarFilled}
            />
          );
        } else {
          stars.push(
            <img
              onMouseOver={() => this.handleHover(i)}
              key={i}
              src={reviewFormStar}
            />
          );
        }
      } else {
        if (i <= this.state.selectedRating) {
          stars.push(
            <img
              onClick={() => this.selectRating(i)}
              onMouseOver={() => this.handleHover(i)}
              key={i}
              src={reviewFormStarFilled}
            />
          );
        } else {
          stars.push(
            <img
              onMouseOver={() => this.handleHover(i)}
              key={i}
              src={reviewFormStar}
            />
          );
        }
      }
    }
    return (
      <div className="review-form-stars" onMouseLeave={this.resetStars}>
        {stars}
      </div>
    );
  }
}

export default ReviewFormStars;
