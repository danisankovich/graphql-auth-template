import React from 'react';
import Header from './Header';
import { hashHistory} from 'react-router';

export default (props) => {
  return (
    <div className="container">
      <Header />
      {props.children}
    </div>
  )
}
