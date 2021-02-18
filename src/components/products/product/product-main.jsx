import React from "react";
import "./product-main.scss";
import { capitaliseFirstLetter } from "../../../utils/text-formatting/text-formatting";
import deliveryIcon from "../../../assets/package.svg";
import downArrowIcon from "../../../assets/down-chevron.svg";
class ProductMain extends React.Component {
  state = {
    index: 0,
    selectedSize: null,
  };

  handleVariantSelect = (index) => {
    this.props.handleVariantSelect(index);
  };

  handleSizeSelect = (size) => {
    if (this.state.selectedSize === size) {
      this.setState({
        selectedSize: null,
      });
    } else {
      this.setState({
        selectedSize: size,
      });
    }
  };

  handleAccordion = (e) => {
    if (e.currentTarget.className === "product-main__accordion-btn") {
      const accordionBtn = e.currentTarget;
      const accordionContent = accordionBtn.nextElementSibling;
      const prevAccordionContent = accordionBtn.previousElementSibling;
      const nextAccordionContent =
        accordionContent.nextElementSibling.nextElementSibling;
      const nextAccordionBtn =
        nextAccordionContent !== null &&
        nextAccordionContent.previousElementSibling;
      const prevAccordionBtn =
        accordionBtn.previousElementSibling !== null &&
        accordionBtn.previousElementSibling.previousElementSibling;

      // If accordion content is already open
      if (accordionContent.style.maxHeight) {
        accordionContent.style.paddingBottom = "0";
        accordionContent.style.opacity = "0";
        accordionContent.style.maxHeight = null;
        accordionBtn.lastChild.style.transform = "rotate(0deg)";
      } else {
        // If accordion content is closed, close previous accordion content section
        if (prevAccordionContent !== null && prevAccordionBtn !== null) {
          prevAccordionContent.style.paddingBottom = "0";
          prevAccordionContent.style.maxHeight = null;
          prevAccordionBtn.lastChild.style.transform = "rotate(0deg)";
        }
        // If accordion content is close, close next accordion content section
        if (
          nextAccordionContent !== null &&
          nextAccordionContent.style.maxHeight !== null
        ) {
          nextAccordionContent.style.paddingBottom = "0";
          nextAccordionContent.style.maxHeight = null;
          nextAccordionBtn.lastChild.style.transform = "rotate(0deg)";
        }
        // If accordion content is close, open it
        accordionBtn.lastChild.style.transform = "rotate(180deg)";
        accordionContent.style.paddingBottom = "6rem";
        accordionContent.style.opacity = "1";
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      }
    }
  };

  render() {
    const { product, variantIndex } = this.props;
    const { selectedSize } = this.state;
    if (product.colors === undefined || product.variants === undefined) {
      return <h1>LOADING</h1>;
    } else {
      return (
        <div className="product-main">
          <h1 className="product-main__title">{product.name}</h1>
          <p className="product-main__price">£{product.price}</p>
          <div className="product-main__variants-container">
            <span>STANDARD EDITION:</span> {""}
            <span>{capitaliseFirstLetter(product.colors[variantIndex])}</span>
            <div className="product-main__variants">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={
                    variantIndex === index
                      ? "product-main__variant active"
                      : "product-main__variant"
                  }
                >
                  <div
                    className={`product-main__variant-color product-main__variant-color--${color}`}
                    onClick={() => this.handleVariantSelect(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="product-main__variant-sizes-container">
            <span>SELECT SIZE:</span>
            <div className="product-main__variant-sizes">
              {product.variants[variantIndex].sizes.map((size, index) => (
                <div
                  key={index}
                  onClick={() => this.handleSizeSelect(size.size)}
                  className={
                    selectedSize === size.size
                      ? "product-main__variant-size active"
                      : "product-main__variant-size"
                  }
                >
                  <p>UK</p>
                  {size.size}
                </div>
              ))}
            </div>
          </div>
          <div className="product-main__cart-container">
            <button
              disabled={selectedSize == null}
              className={
                selectedSize
                  ? "product-main__add-to-cart-btn"
                  : "product-main__add-to-cart-btn disabled "
              }
            >
              {selectedSize ? "ADD TO CART" : "SELECT SIZE"}
            </button>
            <div className="product-main__cart">
              <img src={deliveryIcon} alt="delivery" />
              <p className="">Free delivery and 30 day returns!</p>
            </div>
          </div>

          <div className="product-main__accordion-container">
            <div className="product-main__accordion">
              <button
                onClick={(e) => this.handleAccordion(e)}
                className="product-main__accordion-btn"
              >
                CORE FEATURES
                <img src={downArrowIcon} />
              </button>
              <div className="product-main__accordion-content">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </div>

              <button
                onClick={(e) => this.handleAccordion(e)}
                className="product-main__accordion-btn"
              >
                DESCRIPTION
                <img src={downArrowIcon} />
              </button>
              <div className="product-main__accordion-content">
                <p>{product.description}</p>
              </div>

              <button
                onClick={(e) => this.handleAccordion(e)}
                className="product-main__accordion-btn"
              >
                DELIVERY & RETURNS
                <img src={downArrowIcon} />
              </button>
              <div className="product-main__accordion-content">
                {<p>{product.delivery}</p>}
              </div>

              <button
                onClick={(e) => this.handleAccordion(e)}
                className="product-main__accordion-btn"
              >
                CARE GUIDE
                <img src={downArrowIcon} />
              </button>
              <div className="product-main__accordion-content">
                {<p>{product.care}</p>}
              </div>
              <button className="product-main__accordion-btn"></button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ProductMain;
