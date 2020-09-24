import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


const StateRenderer = ({ data }) => {

  let state = "New";
  if (data.state == 2) {
    state = "Pending";
  } else if (data.state == 3) {
    state = "Offered";
  } else if (data.state == 4) {
    state = "Sold";
  }

  return (
    <span style={{ color: '#17a2b8' }}>{state}</span>
  );
}
export default StateRenderer;
