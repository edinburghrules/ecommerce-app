import React, { Component } from 'react';
import './cart.scss';
import closeButton from '../../assets/close-button.png';
import shopping from '../../assets/002-shopping-bag.png';

class Cart extends Component {
  state = {
    isEmpty: true,
  };
  render() {
    const { isEmpty } = this.state;
    const { handleClose, cartMenuWidth } = this.props;
    return (
      <div className='cart' style={{ width: `${cartMenuWidth}vw` }}>
        <div className='cart__top'>
          <img
            id='close-cart'
            onClick={handleClose}
            className='cart__close-btn'
            src={closeButton}
            alt='close'
          />
          <div className='cart__delivery-container'>
            <div className='cart__total-container'>
              <div className='cart__total'>
                <p>1</p>
              </div>
              <img className='cart__icon' src={shopping} alt='cart' />
            </div>
            <p className='cart__free-delivery'>
              You're £50 away from free delivery
            </p>
            <div className='cart__progress-bar'></div>
          </div>
        </div>
        <div className='cart__content'>
          {isEmpty && <h1>Your Cart is Empty</h1>}
          <div className='cart__product-categories'>
            <button className='cart__product-btn'>Shop Mens</button>
            <button className='cart__product-btn'>Shop Women</button>
            <button className='cart__product-btn'>Shop Collections</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
