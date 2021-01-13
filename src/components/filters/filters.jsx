import React from 'react';
import './filters.scss';
import { withRouter } from 'react-router-dom';
import { paramsHandler } from './filtersUtils';

class Filters extends React.Component {
  state = { colors: [] };

  handleSelect = (e) => {
    // save color to either true or false
    if (this.state.colors.includes(e.target.id)) {
      this.setState(
        (prevState) => ({
          colors: [
            ...prevState.colors.filter((color) => color !== e.target.id),
          ],
        }),
        () => {
          paramsHandler(
            this.state.colors,
            this.props.history,
            this.props.location,
            e.target.id
          );
        }
      );
    } else {
      this.setState(
        (prevState) => ({
          colors: [...prevState.colors, e.target.id],
        }),
        () => {
          // if the color we have clicked on is true add or remove search params
          paramsHandler(
            this.state.colors,
            this.props.history,
            this.props.location,
            e.target.id
          );
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
