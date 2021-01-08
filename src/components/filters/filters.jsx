import React from 'react';
import './filters.scss';
import { withRouter } from 'react-router-dom';

class Filters extends React.Component {
  state = {
    black: false,
  };

  handleSelect = (e) => {
    this.setState(
      (prevState) => ({
        [e.target.id]: !prevState[e.target.id],
      }),
      () => {
        if (this.state[e.target.id]) {
          this.props.history.push({
            pathname: this.props.location.pathname,
            search: '?' + new URLSearchParams({ color: e.target.id }),
          });
        } else {
          this.props.history.push({
            pathname: this.props.match.url,
          });
        }
      }
    );
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
                <label className={this.state.black ? 'active' : ''}>
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
              <li>
                <label className={this.state.grey ? 'active' : ''}>
                  <button
                    id='grey'
                    onClick={this.handleSelect}
                    className={
                      this.state.grey
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
