import React from "react";
import ReactDOM from "react-dom";
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
import queryString from "query-string";
import { CSSTransition } from "react-transition-group";
import closeArrowIcon from "../../assets/close-arrow.png";

class Filters extends React.Component {
  state = { colors: [], bestFors: [], weather: [] };

  componentDidMount = () => {
    if (this.props.filtersOpen) {
      document.body.style.overflow = "hidden";
    }

    let colorsFromURL =
      queryString.parse(this.props.location.search).colors &&
      queryString.parse(this.props.location.search).colors.split(",");

    let bestforFromURL =
      queryString.parse(this.props.location.search).bestfor &&
      queryString.parse(this.props.location.search).bestfor.split(",");

    let weatherFromURL =
      queryString.parse(this.props.location.search).weather &&
      queryString.parse(this.props.location.search).weather.split(",");

    this.setState({
      colors: colorsFromURL ? colorsFromURL : [],
      bestFors: bestforFromURL ? bestforFromURL : [],
      weather: weatherFromURL ? weatherFromURL : [],
    });
  };

  componentDidUpdate = () => {
    if (this.props.filtersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

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
      if (
        selected === "wet" ||
        selected === "dry" ||
        selected === "cool" ||
        selected === "warm"
      ) {
        this.setState(
          (prevState) => ({
            ...prevState,
            weather: [
              selected,
              ...prevState.weather.filter(
                (weatherItem) => weatherItem !== selected
              ),
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
            ...prevState,
            bestFors: [
              selected,
              ...prevState.bestFors.filter(
                (bestForItem) => bestForItem !== selected
              ),
            ],
          }),
          () => {
            // ADD FILTERS TO URL
            bestForUrlParamsHandler(this.state.bestFors, history, location);
          }
        );
      }
    } else {
      if (
        selected === "wet" ||
        selected === "dry" ||
        selected === "cool" ||
        selected === "warm"
      ) {
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
    if (this.props.windowWidth > 990) {
      return (
        <div className="filters-container">
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
            {!this.props.category && (
              <div className="filters__bestfor">
                <hr />
                <p>BEST FOR</p>
                <div className="filters__bestfor-options">
                  <BestForFilters
                    selectedBestFor={this.state.bestFors}
                    handleCheck={this.handleCheck}
                  />
                </div>
              </div>
            )}
            <div className="filters__weather">
              <hr />
              <p>WEATHER CONDITIONS</p>
              <div className="filters__weather-options">
                <WeatherFilters
                  selectedWeather={this.state.weather}
                  handleCheck={this.handleCheck}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return ReactDOM.createPortal(
        <React.Fragment>
          <CSSTransition
            unmountOnExit
            mountOnEnter
            in={this.props.filtersOpen}
            classNames="filters-fade"
            timeout={400}
          >
            <div className="filters__overlay"></div>
          </CSSTransition>
          <CSSTransition
            unmountOnExit
            mountOnEnter
            in={this.props.filtersOpen}
            classNames="filters-slide"
            timeout={{
              enter: 200,
              exit: 1000,
            }}
          >
            <div className="filters-container">
              <div className="filters-container__top">
                <img
                  onClick={this.props.handleFiltersOpen}
                  className="filters-container__close"
                  src={closeArrowIcon}
                  alt="close arrow"
                />
              </div>

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
                {!this.props.category && (
                  <div className="filters__bestfor">
                    <hr />
                    <p>BEST FOR</p>
                    <div className="filters__bestfor-options">
                      <BestForFilters
                        selectedBestFor={this.state.bestFors}
                        handleCheck={this.handleCheck}
                      />
                    </div>
                  </div>
                )}
                <div className="filters__weather">
                  <hr />
                  <p>WEATHER CONDITIONS</p>
                  <div className="filters__weather-options">
                    <WeatherFilters
                      selectedWeather={this.state.weather}
                      handleCheck={this.handleCheck}
                    />
                  </div>
                </div>
                <button
                  onClick={this.props.handleFiltersOpen}
                  className="filters__btn filters__btn--done"
                >
                  DONE
                </button>
              </div>
            </div>
          </CSSTransition>
        </React.Fragment>,
        document.getElementById("root")
      );
    }
  }
}

export default withRouter(Filters);
