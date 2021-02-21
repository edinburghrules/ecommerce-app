import React from "react";
import "./product-page.scss";
import { Link } from "react-router-dom";
import zoomIcon from "../../../assets/zoom.svg";
import ProductMain from "../../../components/products/product/product-main";
import Modal from "../../../components/modal/modal";
import Loading from "../../../components/loading/loading";
import { connect } from "react-redux";
import {
  getAllProducts,
  getProduct,
} from "../../../redux/actions/productActions";
import { capitaliseFirstLetterArr } from "../../../utils/text-formatting/text-formatting";
import ReviewCard from "../../../components/reviews/review-card";

class ProductPage extends React.Component {
  state = {
    index: 0,
    modalOpen: false,
    imageIndex: null,
  };

  componentDidMount = () => {
    this.props.getProduct(
      this.props.match.params.collection,
      this.props.match.params.id
    );
    this.setState({
      index: this.props.location.state.variantIndex,
    });
  };

  handleVariantSelect = (index) => {
    this.setState({
      index,
    });
  };

  handleImageOpen = (index) => {
    this.setState((prevState) => ({
      modalOpen: !prevState.modalOpen,
      imageIndex: index,
    }));
  };

  handleImageClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  getAverageReviewStars = () => {
    let rating = 0;
    this.props.reviews.forEach((review) => {
      rating += review.rating;
    });
    const average = rating / this.props.reviews.length;
    return Math.ceil(average);
  };

  render() {
    const { modalOpen, imageIndex } = this.state;
    const { product, reviews } = this.props;

    if (!reviews) return <h1>LOADING</h1>;

    return (
      <React.Fragment>
        {this.props.loading && <Loading />}
        {this.props.product && (
          <div className="product-page">
            <div className="product-page__product-container">
              <Modal
                modalOpen={modalOpen}
                imageIndex={imageIndex}
                onClose={this.handleImageClose}
                content={
                  product.variants && product.variants[this.state.index].images
                }
              />
              <div className="product-page__left-column">
                {product.variants &&
                  product.variants[this.state.index].images.map(
                    (image, index) => (
                      <div
                        key={index}
                        onClick={() => this.handleImageOpen(index)}
                        className="product-page__img-container"
                      >
                        <button>
                          <img src={zoomIcon} alt="plus" />
                        </button>
                        <img
                          key={index}
                          className="product-page__img"
                          src={image.src}
                          alt={product.name}
                        />
                      </div>
                    )
                  )}
              </div>
              <div className="product-page__right-column">
                <Link className="product-page__navigation" to={"/"}>
                  Home
                </Link>
                <Link
                  className="product-page__navigation"
                  to={{
                    pathname: `/collection/${this.props.match.params.collection}`,
                    state: {
                      heading: capitaliseFirstLetterArr(
                        this.props.match.params.collection
                      ),
                    },
                  }}
                >
                  /{" "}
                  {capitaliseFirstLetterArr(this.props.match.params.collection)}
                </Link>
                <Link
                  className="product-page__navigation"
                  to={{
                    pathname: `/collection/${this.props.match.params.collection}/${this.props.match.params.category}`,
                    state: {
                      heading: capitaliseFirstLetterArr(
                        this.props.match.params.category
                      ),
                    },
                  }}
                >
                  / {capitaliseFirstLetterArr(this.props.match.params.category)}
                </Link>
                <ProductMain
                  handleVariantSelect={this.handleVariantSelect}
                  variantIndex={this.state.index}
                  product={this.props.product}
                />
              </div>
            </div>
            <div className="product-page__reviews-container">
              <h2>Feedback from Customers</h2>
              <h3>{product.name && product.name}</h3>
              <p>{reviews && this.getAverageReviewStars()} out of 5 stars</p>
              <div className="product-page__reviews-list">
                {reviews &&
                  reviews.map((review, index) => (
                    <ReviewCard review={review} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.product,
  loading: state.async.loadingProducts,
  reviews: state.reviews.reviews,
});

const mapActionsToProps = {
  getAllProducts,
  getProduct,
};

export default connect(mapStateToProps, mapActionsToProps)(ProductPage);
