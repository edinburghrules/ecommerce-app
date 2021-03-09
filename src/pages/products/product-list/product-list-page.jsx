import React from "react";
import "./product-list-page.scss";
import { Route, Switch } from "react-router-dom";
import Filters from "../../../components/filters/filters.jsx";
import ProductList from "../../../components/products/product-list/product-list";
import {
  mensShoeLinks,
  womensShoeLinks,
  mensApparelLinks,
  womensApparelLinks,
} from "../../../navigation-links/navigation-links";
import Sort from "../../../components/sort/sort";

class ProductListPage extends React.Component {
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

    console.log(params);
    return (
      <React.Fragment>
        <div className="product-list-page">
          <div className="product-list-page__filters">
            <Filters category={params.category} options={options} />
          </div>
          <div>
            <div className='product-list-page__sort-filter'>
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
