import React from 'react';
import CountdownTimer from "react-component-countdown-timer";

const TimerRenderer = ({ data }) => {


  return (
    <CountdownTimer count={3600} />
  );
}
export default TimerRenderer;
