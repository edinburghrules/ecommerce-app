import React from 'react';
import './product-list-page.scss';
import { Route, Switch } from 'react-router-dom';
import FilterCategories from '../../../components/fiter-categories/filter-categories';
import Filters from '../../../components/filters/filters.jsx';
import ProductList from '../../../components/products/product-list/product-list';
import {
  mensShoeLinks,
  womensShoeLinks,
} from '../../../navigation-links/navigation-links';

class ProductListPage extends React.Component {
  state = {};
  render() {
    const {
      match: { params, path },
      location,
    } = this.props;
    let options;
    if (params.collection === 'mens-shoes') {
      options = mensShoeLinks;
    } else if (params.collection === 'womens-shoes') {
      options = womensShoeLinks;
    }
    return (
      <div className='product-list-page'>
        <div className='product-list-page__filters'>
          <FilterCategories options={options} />
          <Filters />
        </div>
        <Switch>
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
    );
  }
}

export default ProductListPage;
