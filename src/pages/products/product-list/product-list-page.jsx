import React from "react";
import "./product-list-page.scss";
import { Route, Switch, Link } from "react-router-dom";
import Filters from "../../../components/filters/filters.jsx";
import ProductList from "../../../components/products/product-list/product-list";
import { formatUrl } from "../../../utils/text-formatting/text-formatting";
import {
  mensShoeLinks,
  womensShoeLinks,
  mensApparelLinks,
  womensApparelLinks,
} from "../../../navigation-links/navigation-links";
import Sort from "../../../components/sort/sort";
import mobileFiltersicon from "../../../assets/filters.svg";

class ProductListPage extends React.Component {
  state = { filtersOpen: false, windowWidth: window.innerWidth };

  handleFiltersOpen = () => {
    this.setState((prevState) => ({
      filtersOpen: !prevState.filtersOpen,
    }));
  };

  listener = window.addEventListener("resize", () => {
    this.setState({ windowWidth: window.innerWidth });
  });

  render() {
    const {
      match: { params, path },
      location,
    } = this.props;
    let options;
    if (params.collection === "mens-shoes") {
      options = mensShoeLinks;
    } else if (params.collection === "womens-shoes") {
      options = womensShoeLinks;
    } else if (params.collection === "mens-apparel") {
      options = mensApparelLinks;
    } else if (params.collection === "womens-apparel") {
      options = womensApparelLinks;
    }
    return (
      <React.Fragment>
        <div className="product-list-page">
          <div className="product-list-page__filters">
            <div className="product-list-page__mobile-header">
              {this.state.windowWidth < 990 && (
                <React.Fragment>
                  {params.category ? (
                    <Link to={`/collection/${params.collection}`}>
                      {formatUrl(params.collection)}
                    </Link>
                  ) : (
                    <h1>{formatUrl(params.collection)}</h1>
                  )}
                  {params.category && <h1>{formatUrl(params.category)}</h1>}
                </React.Fragment>
              )}
            </div>
            <Filters
              windowWidth={this.state.windowWidth}
              handleFiltersOpen={this.handleFiltersOpen}
              filtersOpen={this.state.filtersOpen}
              category={params.category}
              options={options}
            />
          </div>
          <div>
            <div className="product-list-page__sort-filter">
              {this.state.windowWidth < 990 && (
                <img
                  onClick={this.handleFiltersOpen}
                  src={mobileFiltersicon}
                  alt="filter icon"
                />
              )}
              <Sort />
            </div>
            <Switch>
              {/* Give routes keys to cause re-render */}
              <Route
                key={location.key}
                exact
                path={`${path}`}
                render={(routeProps) => <ProductList {...routeProps} />}
              />
              <Route
                key={location.key}
                path={`${path}/:category`}
                render={(routeProps) => <ProductList {...routeProps} />}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductListPage;
