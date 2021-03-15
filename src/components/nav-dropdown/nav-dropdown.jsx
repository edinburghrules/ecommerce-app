import React from "react";
import "./nav-dropdown.scss";
import { withRouter, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const NavDropdown = ({
  handleMensDropdownOpen,
  mensDropdownOpen,
  womensDropdownOpen,
  handleWomensDropdownOpen,
  linksToRender,
}) => {
  return (
    <React.Fragment>
      <CSSTransition
        unmountOnExit
        mountOnEnter
        in={mensDropdownOpen || womensDropdownOpen}
        classNames="fade"
        timeout={400}
      >
        <div className="dropdown__overlay" />
      </CSSTransition>
      <CSSTransition
        unmountOnExit
        mountOnEnter
        in={mensDropdownOpen || womensDropdownOpen}
        classNames="drop"
        timeout={{
          enter: 200,
          exit: 1000,
        }}
      >
        <div id="close-dropdown" className="nav-dropdown">
          <div className="nav-dropdown__column">
            {linksToRender &&
              linksToRender.apparelLinks.map(({ path, title }, i) => (
                <Link
                  onClick={
                    mensDropdownOpen
                      ? handleMensDropdownOpen
                      : handleWomensDropdownOpen
                  }
                  to={path}
                  key={i}
                >
                  {title}
                </Link>
              ))}
          </div>
          <div className="nav-dropdown__column">
            {linksToRender &&
              linksToRender.shoeLinks.map(({ path, title }, i) => (
                <Link
                  onClick={
                    mensDropdownOpen
                      ? handleMensDropdownOpen
                      : handleWomensDropdownOpen
                  }
                  to={path}
                  key={i}
                >
                  {title}
                </Link>
              ))}
          </div>
          <div className="nav-dropdown__collections">
            {linksToRender &&
              linksToRender.collectionLinks.map(({ path, title, img }, i) => (
                <div key={i}>
                  {img && <img src={img} alt='collection' />}
                  <Link
                    className="nav-dropdown__collections-link"
                    onClick={
                      mensDropdownOpen
                        ? handleMensDropdownOpen
                        : handleWomensDropdownOpen
                    }
                    to={path}
                  >
                    {title}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default withRouter(NavDropdown);
