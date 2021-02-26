import React from "react";
import { captialiseFirstLetter } from "./filtersUtils";
import hovercheck from "../../assets/hovercheck.png";
import checked from "../../assets/checked.png";

// Get category and apply filters e.g. if category is hi-tops only show wet weather

const WEATHER_OPTIONS = ["wet", "dry"];

const WeatherFilters = (props) => {
  const { selectedWeather, handleCheck } = props;
  console.log();
  return (
    <React.Fragment>
      {WEATHER_OPTIONS.map((weatherOption, index) => (
        <label
          className={selectedWeather.includes(weatherOption) ? "active" : ""}
          onChange={handleCheck}
          key={index}
        >
          <input
            // onChange={() => {}}
            // checked={selectedWeather.includes(weatherOption)}
            id={weatherOption}
            type="checkbox"
          />
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
