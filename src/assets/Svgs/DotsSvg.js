import React from "react";
import Svg, {
    Path
  } from 'react-native-svg';


class DotsSvg extends React.Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="8"
        viewBox="0 0 40 8"

        {...this.props}
      >

        <Path fill="#fca939" d="M16 4a4 4 0 118 0 4 4 0 01-8 0z"></Path>
        <Path
          fill="#fc2929"
          d="M0 4a4 4 0 118 0 4 4 0 01-8 0zM32 4a4 4 0 118 0 4 4 0 01-8 0z"
        ></Path>
      </Svg>
    );
  }
}

export default DotsSvg;