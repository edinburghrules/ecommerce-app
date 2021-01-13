import React from 'react';
import './filters.scss';
import { withRouter } from 'react-router-dom';
import { paramsHandler } from './filtersUtils';

class Filters extends React.Component {
  state = { colors: [] };

  handleSelect = (e) => {
    const { history, location } = this.props;
    const selectedColor = e.target.id;
    // If color has been previously selected
    if (this.state.colors.includes(selectedColor)) {
      this.setState(
        (prevState) => ({
          colors: [
            ...prevState.colors.filter((color) => color !== selectedColor),
          ],
        }),
        () => {
          paramsHandler(this.state.colors, history, location, selectedColor);
        }
      );
    } else {
      // If colr has NOT been previously selected
      this.setState(
        (prevState) => ({
          colors: [...prevState.colors, selectedColor],
        }),
        () => {
          paramsHandler(this.state.colors, history, location, selectedColor);
        }
      );
    }
  };
  render() {
    return (
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
                  className={this.state.colors.includes('grey') ? 'active' : ''}
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
          <p>SIZES</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Filters);
