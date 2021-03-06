import React from "react";
import ReactDOM from "react-dom";
import "./mobile-nav.scss";
import { Link, withRouter } from "react-router-dom";
import user from "../../assets/001-user.png";
import shopping from "../../assets/shopping-bag.png";
import closebutton from "../../assets/close-button.png";
import rightArrow from "../../assets/002-right-1.png";
import leftArrow from "../../assets/001-arrow.png";
import { CSSTransition } from "react-transition-group";

const MobileNav = ({
  linksToRender,
  mensMobileOpen,
  womensMobileOpen,
  goBack,
  handleMensMenu,
  handleWomensMenu,
  handleProductDropdown,
  apparelDropdown,
  shoesDropdown,
  collectionsDropdown,
  mobileOpen,
  handleCartOpen,
  handleMobileOpen,
  x,
}) => {
  return ReactDOM.createPortal(
    <CSSTransition
      in={mobileOpen}
      timeout={200}
      mountOnEnter
      unmountOnExit
      classNames="mobile-slideout"
    >
      <div className="mobile-menu">
        <div className="mobile-menu__content-container">
          <div className="mobile-menu__top-buttons">
            <img
              className="mobile-menu__close-btn"
              src={closebutton}
              onClick={handleMobileOpen}
              alt="close button"
            />
            <div className="mobile-menu__logo">
              <h1>apparel.</h1>
            </div>
            <div className="mobile-menu__user-btns">
              <img src={user} alt="user login" />
              <img onClick={handleCartOpen} src={shopping} alt="shopping bag" />
            </div>
          </div>
          <div className="mobile-menu__content">
            <div className="mobile-menu__links-container">
              <div
                className="mobile-menu__links"
                style={{ transform: `translateX(-${x}%)` }}
              >
                <div onClick={handleMensMenu}>
                  <p className="mobile-menu__link">Mens</p>
                  <img src={rightArrow} alt="left arrow" />
                </div>
                <div onClick={handleWomensMenu}>
                  <p className="mobile-menu__link">Womens</p>
                  <img src={rightArrow} alt="left arrow" />
                </div>
              </div>
              {/* DYNAMIC MENU CONTENT */}
              <div
                className="mobile-menu__links"
                style={{ transform: `translateX(-${x}%)` }}
              >
                <div
                  onClick={goBack}
                  style={{
                    justifyContent: "flex-start",
                    background: "#f5f5f5",
                  }}
                >
                  <img
                    style={{ marginRight: "2rem" }}
                    src={leftArrow}
                    alt="left arrow"
                  />
                  <p className="mobile-menu__link">
                    {mensMobileOpen && "Mens"}
                    {womensMobileOpen && "Womens"}
                  </p>
                </div>
                {linksToRender &&
                  linksToRender.apparelLinks.map((link, i) => {
                    if (i === 0) {
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            handleProductDropdown(link);
                          }}
                          className="mobile-menu__dropdown-header"
                        >
                          <p className="mobile-menu__link">{link.title}</p>
                          <img
                            style={{
                              transition: "transform .1s",
                              transform: apparelDropdown
                                ? "rotate(90deg)"
                                : "rotate(0deg)",
                            }}
                            src={rightArrow}
                            alt="right arrow"
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className={
                            apparelDropdown
                              ? "mobile-menu__dropdown-link"
                              : "mobile-menu__dropdown-link hide"
                          }
                        >
                          <Link
                            to={link.path}
                            onClick={handleMobileOpen}
                            className="mobile-menu__link hide"
                          >
                            {link.title}
                          </Link>
                        </div>
                      );
                    }
                  })}
                {linksToRender &&
                  linksToRender.shoeLinks.map((link, i) => {
                    if (i === 0) {
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            handleProductDropdown(link);
                          }}
                          className="mobile-menu__dropdown-header"
                        >
                          <p className="mobile-menu__link">{link.title}</p>
                          <img
                            style={{
                              transition: "transform .1s",
                              transform: shoesDropdown
                                ? "rotate(90deg)"
                                : "rotate(0deg)",
                            }}
                            src={rightArrow}
                            alt="right arrow"
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className={
                            shoesDropdown
                              ? "mobile-menu__dropdown-link"
                              : "mobile-menu__dropdown-link hide"
                          }
                        >
                          <Link
                            to={link.path}
                            onClick={handleMobileOpen}
                            className="mobile-menu__link"
                          >
                            {link.title}
                          </Link>
                        </div>
                      );
                    }
                  })}
                {linksToRender &&
                  linksToRender.collectionLinks.map((link, i) => {
                    if (i === 0) {
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            handleProductDropdown(link);
                          }}
                          className="mobile-menu__dropdown-header"
                        >
                          <p className="mobile-menu__link">{link.title}</p>
                          <img
                            style={{
                              transition: "transform .1s",
                              transform: collectionsDropdown
                                ? "rotate(90deg)"
                                : "rotate(0deg)",
                            }}
                            src={rightArrow}
                            alt="right arrow"
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className={
                            collectionsDropdown
                              ? "mobile-menu__dropdown-link"
                              : "mobile-menu__dropdown-link hide"
                          }
                        >
                          <Link
                            to={link.path}
                            onClick={handleMobileOpen}
                            className="mobile-menu__link"
                          >
                            {link.title}
                          </Link>
                        </div>
                      );
                    }
                  })}
              </div>
              {/* DYNAMIC MENU CONTENT */}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default withRouter(MobileNav);
