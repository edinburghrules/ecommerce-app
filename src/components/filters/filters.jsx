import React from 'react';
import './filters.scss';

class Filters extends React.Component {
  state = {
    black: false,
  };git adc
  handleSelect = (e) => {
    this.setState((prevState) => ({
      [e.target.id]: !prevState[e.target.id],
    }));
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
                  className={this.state.black ? 'active' : ''}
                >
                  <button
                    id='black'
                    onClick={this.handleSelect}
                    className={
                      this.state.black
                        ? 'filters__color-btn filters__color-btn--black active'
                        : 'filters__color-btn filters__color-btn--black'
                    }
                  ></button>
                  Black
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

export default Filters;
