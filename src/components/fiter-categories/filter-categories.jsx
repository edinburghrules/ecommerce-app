import React from "react";
import "./filter-categories.scss";
import { NavLink, Link, withRouter } from "react-router-dom";

class FilterCategories extends React.Component {
  state = {
    currentCategory: null,
  };
  componentDidMount = () => {
    if (this.props.location.state) {
      this.props.options.forEach((option) => {
        this.setState({
          currentCategory: this.props.location.state.heading,
        });
      });
    } else {
      this.setState({
        currentCategory: this.props.options[0].title,
      });
    }
  };
  setPathHeader = (currentCategory) => {
    this.props.clearFilters();
    this.setState({ currentCategory });
  };
  render() {
    const { currentCategory } = this.state;
    const { options } = this.props;
    return (
      <div className="filter-categories">
        {options &&
          options.map((option, index) => {
            if (index === 0)
              return (
                <div className="filter-categories__path" key={index}>
                  <Link to="/">Home</Link>
                  <span>/</span>
                  <Link
                    to={`${option.path}`}
                    onClick={() => this.setPathHeader(option.title)}
                  >
                    {" "}
                    {option.title}
                  </Link>{" "}
                  <span> /</span>
                  <h3>{currentCategory}</h3>
                </div>
              );
            else {
              return (
                <NavLink
                  className="filter-categories__link"
                  key={index}
                  to={`${option.path}`}
                  onClick={() => this.setPathHeader(option.title)}
                >
                  {option.title}
                </NavLink>
              );
            }
          })}
      </div>
    );
  }
}

export default withRouter(FilterCategories);
