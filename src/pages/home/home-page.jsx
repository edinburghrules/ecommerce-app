import React from "react";
import "./home.scss";
import MainMenu from "../../components/main-menu/main-menu";
import homeHero from "../../assets/rain-collection-hero.webp";
import materialImage from "../../assets/materials-img.png";
import woolmanImage from "../../assets/woolman.webp";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";

const Home = () => {
  return (
    <div className="homepage">
      <div className="homepage__hero-container">
        <img className="homepage__hero-image" src={homeHero} />
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
      <div className="homepage__materials">
        <img
          className="homepage__materials-image"
          src={materialImage}
          alt="wool"
        />
        <div className="homepage__materials-information">
          <img
            className="homepage__woolman-img"
            src={woolmanImage}
            alt="woolman"
          />
          <div className="homepage__materials-content">
            <h3>
              Mother Nature is our muse. Building on her handiwork, we’re
              finding new uses for materials that exist right in front of us.
              Like wool from merino sheep, who have the best hair in nature.
            </h3>
            <p>
              But even great locks need a trim from time to time. With fibers
              that are 20% the diameter of human hair, our superfine merino wool
              is breathable, temperature-regulating, and moisture-wicking, all
              without that irritating scratchiness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
