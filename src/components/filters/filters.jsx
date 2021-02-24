import React from "react";
import "./filters.scss";
import { withRouter } from "react-router-dom";
import {
  colorsUrlParamsHandler,
  bestForUrlParamsHandler,
  weatherParamsHandler,
} from "./filtersUtils";
import FilterCategories from "../fiter-categories/filter-categories";
import ColorFilters from "./colors";
import BestForFilters from "./bestfor";
import WeatherFilters from "./weather";

class Filters extends React.Component {
  state = { colors: [], bestFors: [], weather: [] };

  clearFilters = () => {
    this.setState({
      colors: [],
      bestFors: [],
      weather: [],
    });
  };

  handleCheck = (e) => {
    const { history, location } = this.props;
    const selected = e.target.id;
    const checked = e.target.checked;
    if (checked) {
      if (selected === "wet" || selected === "dry") {
        this.setState(
          (prevState) => ({
            ...prevState,
            weather: [selected, ...prevState.weather],
          }),
          () => {
            // ADD FILTERS TO URL
            weatherParamsHandler(this.state.weather, history, location);
          }
        );
      } else {
        this.setState(
          (prevState) => ({
            ...prevState,
            bestFors: [selected, ...prevState.bestFors],
          }),
          () => {
            // ADD FILTERS TO URL
            bestForUrlParamsHandler(this.state.bestFors, history, location);
          }
        );
      }
    } else {
      if (selected === "wet" || selected === "dry") {
        this.setState(
          (prevState) => ({
            prevState,
            weather: [
              ...prevState.weather.filter((weather) => weather !== selected),
            ],
          }),
          () => {
            // ADD FILTERS TO URL
            weatherParamsHandler(this.state.weather, history, location);
          }
        );
      } else {
        this.setState(
          (prevState) => ({
            prevState,
            bestFors: [
              ...prevState.bestFors.filter((bestFor) => bestFor !== selected),
            ],
          }),
          () => {
            // ADD FILTERS TO URL
            bestForUrlParamsHandler(this.state.bestFors, history, location);
          }
        );
      }
    }
  };

  handleSelect = (e) => {
    const { history, location } = this.props;
    const selectedColor = e.target.id;
    // If color has been previously selected, remove it
    if (this.state.colors.includes(selectedColor)) {
      this.setState(
        (prevState) => ({
          colors: [
            ...prevState.colors.filter((color) => color !== selectedColor),
          ],
        }),
        () => {
          colorsUrlParamsHandler(
            { colors: this.state.colors, selectedColor },
            history,
            location
          );
        }
      );
    } else {
      // If color has NOT been previously selected, add it
      this.setState(
        (prevState) => ({
          colors: [...prevState.colors, selectedColor],
        }),
        () => {
          colorsUrlParamsHandler(
            { colors: this.state.colors, selectedColor },
            history,
            location
          );
        }
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <FilterCategories
          options={this.props.options}
          clearFilters={this.clearFilters}
        />
        <div className="filters">
          <h4>Filter By:</h4>
          <div className="filters__colors">
            <hr />
            <p>COLOURS</p>
            <div className="filters__color-options">
              <ColorFilters
                handleSelect={this.handleSelect}
                selectedColors={this.state.colors}
              />
            </div>
          </div>
          <div className="filters__bestfor">
            <hr />
            <p>BEST FOR</p>
            <div className="filters__best-for-options">
              <BestForFilters
                selectedBestFor={this.state.bestFors}
                handleCheck={this.handleCheck}
              />
            </div>
          </div>
          <div className="filters__bestfor">
            <hr />
            <p>WEATHER CONDITIONS</p>
            <div className="filters__best-for-options">
              <WeatherFilters
                selectedBestFor={this.state.bestFors}
                handleCheck={this.handleCheck}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Filters);
