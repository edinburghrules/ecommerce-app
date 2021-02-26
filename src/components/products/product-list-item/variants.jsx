import React from "react";
import "./variants.scss";

const Variants = (props) => {
  console.log(props.product);
  return (
    <div className="variant-sizes">
      <h5>Quick Add</h5>
      <div className="variant-sizes__list">
        {props.variants[props.renderBy].sizes &&
          props.variants[props.renderBy].sizes.map(
            ({ size, stockQty }, index) => {
              return (
                <button
                  // onClick={() => this.quickAdd(variant, size)}
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

export default Variants;
