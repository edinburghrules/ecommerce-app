import React from 'react';
import './filters.scss';
import { withRouter } from 'react-router-dom';
import { urlParamsHandler } from './filtersUtils';
import FilterCategories from '../fiter-categories/filter-categories';

class Filters extends React.Component {
  state = { colors: [] };

  clearFilters = () => {
    this.setState({
      colors: [],
    });
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
          urlParamsHandler(this.state.colors, history, location, selectedColor);
        }
      );
    } else {
      // If color has NOT been previously selected, add it
      this.setState(
        (prevState) => ({
          colors: [...prevState.colors, selectedColor],
        }),
        () => {
          urlParamsHandler(this.state.colors, history, location, selectedColor);
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
              <ul>
                <li>
                  <label
                    className={
                      this.state.colors.includes('black') ? 'active' : ''
                    }
                  >
                    <button
                      id='black'
                      onClick={this.handleSelect}
                      className={
                        this.state.colors.includes('black')
                          ? 'filters__color-btn filters__color-btn--black active'
                          : 'filters__color-btn filters__color-btn--black'
                      }
                    ></button>
                    Black
                  </label>
                </li>
                <li>
                  <label
                    className={
                      this.state.colors.includes('grey') ? 'active' : ''
                    }
                  >
                    <button
                      id='grey'
                      onClick={this.handleSelect}
                      className={
                        this.state.colors.includes('grey')
                          ? 'filters__color-btn filters__color-btn--grey active'
                          : 'filters__color-btn filters__color-btn--grey'
                      }
                    ></button>
                    Grey
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className='filters__sizes'>
            <hr />
            <p>BEST FOR</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Filters);
