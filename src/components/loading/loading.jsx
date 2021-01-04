import React from 'react';
import './loading.scss';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className='loading'>
      <Spinner
        style={{
          height: '3rem',
          width: '3rem',
          borderWidth: '.4rem',
          color: '#666',
        }}
        animation='border'
      />
    </div>
  );
};

export default Loading;
