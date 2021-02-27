import React from "react";
import "./sizes.scss";
import { connect } from "react-redux";
import { addToCart } from "../../../../redux/actions/cartActions";

const Sizes = (props) => {
  const { product, variantIndex, addToCart, authenticated } = props;

  const quickAdd = (size) => {
    const productToAdd = {
      name: product.name,
      category: product.category,
      collection: product.collection,
      color: product.variants[variantIndex].color,
      id: product.id,
      image: product.variants[variantIndex].images[0].src,
      price: product.price,
      qty: 1,
      size: size,
    };
    addToCart(productToAdd, authenticated);
  };
  return (
    <div className="variant-sizes">
      <h5>Quick Add</h5>
      <div className="variant-sizes__list">
        {props.variants[props.variantIndex].sizes &&
          props.variants[props.variantIndex].sizes.map(
            ({ size, stockQty }, index) => {
              return (
                <button
                  onClick={() => quickAdd(size)}
                  key={index}
                  disabled={stockQty === 0}
                  className={
                    stockQty > 0
                      ? "variant-sizes__size variant-sizes__size--active"
                      : "variant-sizes__size variant-sizes__size--disabled"
                  }
                >
                  <p>UK</p>
                  <p>{size}</p>
                </button>
              );
            }
          )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
});

const mapActionsToProps = { addToCart };

export default connect(mapStateToProps, mapActionsToProps)(Sizes);
