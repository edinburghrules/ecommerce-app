import React, { useEffect } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../components/loading/loading";
import MainMenu from "../../components/main-menu/main-menu";
import homeHero from "../../assets/rain-collection-hero.webp";

const Home = (props) => {
  useEffect(() => {
    return () => {
      if (
        (props.location.state && props.location.state.fromCheckout) ||
        (props.location.state && props.location.state.fromOrderConfirmation)
      ) {
        props.history.goForward();
      }
    };
  });

  if (props.loading) {
    return (
      <Loading
        style={{
          height: "100%",
          width: "100%",
          transform: "translateY(50rem)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }
  return (
    <div className="homepage">
      <div className="homepage__hero-container">
        <img className="homepage__hero-image" src={homeHero} alt="hero" />
        <div className="homepage__hero-content">
          <h1 className="homepage__hero-title">Run in the Rain.</h1>
          <p className="homepage__hero-sub">
            Performance running shoes designed for running in the rain.
          </p>
          <div className="homepage__hero-links">
            <Link
              className="homepage__hero-link"
              to={`/collection/mens-shoes?weather=wet&bestfor=running`}
            >
              MENS
            </Link>
            <Link
              className="homepage__hero-link"
              to={`/collection/womens-shoes?weather=wet&bestfor=running`}
            >
              WOMENS
            </Link>
          </div>
        </div>
      </div>
      <div>
        <MainMenu />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.async.loadingSignin,
});

export default connect(mapStateToProps)(Home);
