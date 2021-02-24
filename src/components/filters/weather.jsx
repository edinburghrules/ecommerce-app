import React from "react";
import { captialiseFirstLetter } from "./filtersUtils";
import hovercheck from "../../assets/hovercheck.png";
import checked from "../../assets/checked.png";

// Get category and apply filters e.g. if category is hi-tops only show wet weather

const WEATHER_OPTIONS = ["wet", "dry"];

const WeatherFilters = (props) => {
  const { selectedBestFor, handleCheck } = props;
  return (
    <React.Fragment>
      {WEATHER_OPTIONS.map((weatherOption, index) => (
        <label
          className={selectedBestFor.includes(weatherOption) ? "active" : ""}
          onChange={handleCheck}
          key={index}
        >
          <input id={weatherOption} type="checkbox" />
          <span>
            <img className="hover-checked" src={hovercheck} alt="hover check" />
            <img className="checked" src={checked} alt="check" />
          </span>
          {captialiseFirstLetter(weatherOption)}
        </label>
      ))}
    </React.Fragment>
  );
};

export default WeatherFilters;
