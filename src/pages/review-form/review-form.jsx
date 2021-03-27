import React from "react";
import "./review-form.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css";
import ReviewFormStars from "../../components/reviews/review-form-stars";
import { addProductReview } from "../../redux/actions/reviewActions";

class ReviewForm extends React.Component {
  state = {
    reviewRating: 0,
    reviewTitle: "",
    reviewBody: "",
  };

  handleGetRating = (rating) => {
    this.setState({
      reviewRating: rating,
    });
  };

  handleReviewBody = (html) => {
    this.setState({
      reviewBody: html,
    });
  };

  handleReviewTitle = (e) => {
    this.setState({
      reviewTitle: e.target.value,
    });
  };

  handleReviewSubmit = (e) => {
    e.preventDefault();
    this.props.addProductReview(
      {
        ...this.state,
        ...this.props.location.state.orderDetails,
        itemId: this.props.location.state.orderItem.id,
      },
      this.props.history
    );
  };

  componentWillUnmount = () => {
    this.setState({
      reviewRating: 0,
      reviewTitle: "",
      reviewBody: "",
    });
  };

  render() {
    const { image, name, price } = this.props.location.state.orderItem;
    const { email } = this.props.location.state.orderDetails;
    return (
      <div className="review-form">
        <h1>Review {name}</h1>
        <div className="review-form__section">
          <div className="review-form__product-image">
            <img src={image} alt={name} />
          </div>
          <div className="review-form__details">
            <div>
              <Link to={`/account/${email}`}>Account</Link>
              <p className="review-form__product-name">{name}</p>
              <p className="review-form__product-price">£{price}</p>
            </div>
            <div className="review-form__review">
              <div className="review-form__stars">
                <ReviewFormStars handleGetRating={this.handleGetRating} />
              </div>
              <div className="review-form__form">
                <form onSubmit={(e) => this.handleReviewSubmit(e)}>
                  <input
                    value={this.state.reviewTitle}
                    onChange={this.handleReviewTitle}
                    id="reviewTitle"
                    className="review-form__form-title"
                    type="text"
                    placeholder="Review title"
                  />
                  <ReactQuill
                    id="reviewBody"
                    formats={ReviewForm.formats}
                    modules={ReviewForm.modules}
                    value={this.state.reviewBody}
                    onChange={this.handleReviewBody}
                    theme="snow"
                    placeholder="Write your review"
                  />
                  <div className="review-form__btn-container">
                    <button className="review-form__btn" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReviewForm.modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

ReviewForm.formats = ["bold", "italic", "underline", "strike"];

const mapActionsToProps = {
  addProductReview,
};

export default connect(null, mapActionsToProps)(ReviewForm);
