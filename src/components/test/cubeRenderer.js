import React, { Component } from 'react';

export default class CubeRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.valueCubed(),
    };
  }

  valueCubed() {
    return this.props.value * this.props.value * this.props.value;
  }

  render() {
    return <span>{this.state.value}</span>;
  }
}