import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

class Sort extends React.Component {
  state = {
    sortBy: "",
  };
  handleChange = (e) => {
    this.setState(
      {
        sortBy: e.target.value,
      },
      () => {
        const colorQueryString = this.props.location.search
          ? queryString.parse(this.props.location.search).colors
          : false;
        const weatherQueryString = this.props.location.search
          ? queryString.parse(this.props.location.search).weather
          : false;
        const bestForQueryString = this.props.location.search
          ? queryString.parse(this.props.location.search).bestfor
          : false;

        if (this.state.sortBy) {
          this.props.history.push({
            pathname: this.props.location.pathname,
            search:
              "?" +
              new URLSearchParams({
                sort: this.state.sortBy,
                ...(colorQueryString && {
                  colors: colorQueryString.split(","),
                }),
                ...(bestForQueryString && {
                  bestfor: bestForQueryString.split(","),
                }),
                ...(weatherQueryString && {
                  weather: weatherQueryString.split(","),
                }),
              }),
          });
        } else {
          this.props.history.push({
            pathname: this.props.location.pathname,
            search:
              "?" +
              new URLSearchParams({
                ...(colorQueryString && {
                  colors: colorQueryString.split(","),
                }),
                ...(bestForQueryString && {
                  bestfor: bestForQueryString.split(","),
                }),
                ...(weatherQueryString && {
                  weather: weatherQueryString.split(","),
                }),
              }),
          });
        }
      }
    );
  };
  render() {
    return (
      <select onChange={(e) => this.handleChange(e)} style={{ height: "2rem" }}>
        <option value="">Sort by</option>
        <option id="desc" value="desc">
          Price: Highest to lowest
        </option>
        <option id="asc" value="asc">
          Price: Lowest to highest
        </option>
      </select>
    );
  }
}

export default withRouter(Sort);
