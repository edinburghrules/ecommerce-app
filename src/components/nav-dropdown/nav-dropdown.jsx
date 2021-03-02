import React from "react";
import "./nav-dropdown.scss";
import { withRouter, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const NavDropdown = ({
  handleClose,
  mensDesktopOpen,
  womensDesktopOpen,
  linksToRender,
  history,
}) => {
  return (
    <React.Fragment>
      <CSSTransition
        unmountOnExit
        mountOnEnter
        in={mensDesktopOpen || womensDesktopOpen}
        classNames="fade"
        timeout={400}
      >
        <div className="dropdown__overlay" />
      </CSSTransition>
      <CSSTransition
        unmountOnExit
        mountOnEnter
        in={mensDesktopOpen || womensDesktopOpen}
        classNames="drop"
        timeout={{
          enter: 200,
          exit: 1000,
        }}
      >
        <div id="close-dropdown" className="nav-dropdown" onClick={handleClose}>
          <div className="nav-dropdown__column">
            {linksToRender &&
              linksToRender.apparelLinks.map(({ path, title }, i) => (
                <Link to={path} key={i}>
                  {title}
                </Link>
              ))}
          </div>
          <div className="nav-dropdown__column">
            {linksToRender &&
              linksToRender.shoeLinks.map(({ path, title }, i) => (
                <Link to={path} key={i}>
                  {title}
                </Link>
              ))}
          </div>
          <div className="categories">
            {linksToRender &&
              linksToRender.collectionLinks.map(({ path, title, img }, i) => (
                <div key={i}>
                  {img && <img src={img} />}
                  <Link className='category-link' to={path}>{title}</Link>
                </div>
              ))}
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default withRouter(NavDropdown);
