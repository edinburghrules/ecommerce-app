import React from "react";
import "./filter-categories.scss";
import { NavLink, Link, withRouter } from "react-router-dom";

class FilterCategories extends React.Component {
  state = {
    currentCategory: null,
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
    if (this.props.match.params.category) {
      this.setState({
        currentCategory: this.props.match.params.category
          .replace("-", " ")
          .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
      });
    } else {
      this.setState({
        currentCategory: this.props.match.params.collection
          .replace("ns", "n's")
          .replace("-", " ")
          .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
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
            if (index === 0) {
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
            } else if (index < options.length - 1) {
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
            } else {
              console.log(options.length);
              return null;
            }
          })}
      </div>
    );
  }
}

export default withRouter(FilterCategories);
