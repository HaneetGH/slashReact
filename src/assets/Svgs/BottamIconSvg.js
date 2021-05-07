import React from "react";
import Svg, {
    G,
    Path
  } from 'react-native-svg';

class BottamIconSvg extends React.Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="85"
        height="85"
        viewBox="0 0 108 108"
      >
        <Path
          fill="#fbb03b"
          d="M0 108V87.494L82.445 5.05c5.663-5.663 14.844-5.663 20.506 0 5.663 5.663 5.663 14.844 0 20.506L20.506 108z"
        > </Path>
        <Path
          fill="#fff"
          d="M82.04 16c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z"
        > </Path>
        <Path
          fill="#fb3b3b"
          d="M0 39.491l23.238-23.238c5.662-5.663 14.843-5.663 20.506 0s5.663 14.844 0 20.507L0 80.503z"
        > </Path>
        <Path
          fill="#fff"
          d="M23 27c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z"
        > </Path>
        <G>
          <Path
            fill="#fb3b3b"
            d="M27.977 108L70.28 65.696c5.663-5.662 14.844-5.662 20.507 0 5.663 5.663 5.663 14.844 0 20.507L68.99 108z"
          > </Path>
          <Path
            fill="#fff"
            d="M70.335 76c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z"
          > </Path>
        </G>
      </Svg>
    );
  }
}

export default BottamIconSvg;