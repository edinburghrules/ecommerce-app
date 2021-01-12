import React from 'react';
import './filters.scss';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class Filters extends React.Component {
  state = {};

  handleSelect = (e) => {
    // save color to either true or false
    this.setState(
      (prevState) => ({
        [e.target.id]: !prevState[e.target.id],
      }),
      () => {
        // if the color we have clicked on is true add or remove search params
        var paramsArr = [];

        if (this.state[e.target.id]) {
          for (var i in this.state) {
            if (this.state[i]) {
              paramsArr = [...paramsArr, i];
            }
          }
          console.log(paramsArr);
          this.props.history.push({
            pathname: this.props.location.pathname,
            search: '?' + new URLSearchParams({ colors: paramsArr }),
          });
        } else {
          const params =
            this.props.location.search.length > 0
              ? queryString.parse(this.props.location.search)
              : false;

          const filteredParamsArr =
            params &&
            params.colors.split(',').filter((param) => param !== e.target.id);

          if (filteredParamsArr.length > 0) {
            this.props.history.push({
              pathname: this.props.location.pathname,
              search: '?' + new URLSearchParams({ colors: filteredParamsArr }),
            });
          } else {
            this.props.history.push({
              pathname: this.props.location.pathname,
            });
          }
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
