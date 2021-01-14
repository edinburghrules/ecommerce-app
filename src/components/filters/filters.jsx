import React from 'react';
import './filters.scss';
import { withRouter } from 'react-router-dom';
import {
  colorsUrlParamsHandler,
  bestForUrlParamsHandler,
} from './filtersUtils';
import FilterCategories from '../fiter-categories/filter-categories';
import ColorFilters from './colors';
import BestForFilters from './bestfor';

class Filters extends React.Component {
  state = { colors: [], bestFors: [] };

  clearFilters = () => {
    this.setState({
      colors: [],
      bestFors: [],
    });
  };

  handleCheck = (e) => {
    const { history, location } = this.props;
    const selectedBestFor = e.target.id;
    const checked = e.target.checked;
    if (checked) {
      this.setState(
        (prevState) => ({
          ...prevState,
          bestFors: [selectedBestFor, ...prevState.bestFors],
        }),
        () => {
          // ADD FILTERS TO URL
          bestForUrlParamsHandler(this.state.bestFors, history, location);
        }
      );
    } else {
      this.setState(
        (prevState) => ({
          prevState,
          bestFors: [
            ...prevState.bestFors.filter(
              (bestFor) => bestFor !== selectedBestFor
            ),
          ],
        }),
        () => {
          // ADD FILTERS TO URL
          bestForUrlParamsHandler(this.state.bestFors, history, location);
        }
      );
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
        <div className='filters'>
          <h4>Filter By:</h4>
          <div className='filters__colors'>
            <hr />
            <p>COLOURS</p>
            <div className='filters__color-options'>
              <ColorFilters
                handleSelect={this.handleSelect}
                selectedColors={this.state.colors}
              />
            </div>
          </div>
          <div className='filters__bestfor'>
            <hr />
            <p>BEST FOR</p>
            <div className='filters__best-for-options'>
              <BestForFilters handleCheck={this.handleCheck} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Filters);
