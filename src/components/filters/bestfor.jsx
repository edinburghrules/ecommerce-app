import React from "react";
import { captialiseFirstLetter } from "./filtersUtils";
import hovercheck from "../../assets/hovercheck.png";
import checked from "../../assets/checked.png";

// Get category and apply filters e.g. if category is hi-tops only show wet weather

const BEST_FOR_OPTIONS = ["running", "casual"];

const BestForFilters = (props) => {
  const { selectedBestFor, handleCheck } = props;
  return (
    <React.Fragment>
      {BEST_FOR_OPTIONS.map((bestForOption, index) => (
        <label
          className={selectedBestFor.includes(bestForOption) ? "active" : ""}
          onChange={handleCheck}
          key={index}
        >
          <input
            onChange={handleCheck}
            checked={selectedBestFor.includes(bestForOption)}
            id={bestForOption}
            type="checkbox"
          />
          <span>
            <img className="hover-checked" src={hovercheck} alt="hover check" />
            <img className="checked" src={checked} alt="check" />
          </span>
          {captialiseFirstLetter(bestForOption)}
        </label>
      ))}
    </React.Fragment>
  );
};

export default BestForFilters;
