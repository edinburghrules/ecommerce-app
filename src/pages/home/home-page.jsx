import React from "react";
import "./home.scss";
import MainMenu from "../../components/main-menu/main-menu";
import Slider from "../../components/slider/slider";
import img1 from "../../assets/hero1.jpg";
import img5 from "../../assets/hero5.jpg";
import img3 from "../../assets/hero3.jpg";

const Home = () => {
  const sliderCategories = [
    {
      id: "Autumn Collection",
      src: img1,
    },
    {
      id: "Women's Knitwear",
      src: img5,
    },
    {
      id: "Men's Minimal Essentials",
      src: img3,
    },
  ];
  return (
    <div className="homepage">
      <Slider slideItems={sliderCategories} />
      <MainMenu />
    </div>
  );
};

export default Home;
