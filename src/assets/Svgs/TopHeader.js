import React from "react";
import Svg, {
    G,
    Path,
   
  } from 'react-native-svg';

class TopHeader extends React.Component {
 
    constructor(props){
        super(props)
    }
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="85"
        height="88"
        viewBox="0 0 122 126"
        {...this.props}
      >
        <Path
          fill="#fbb03b"
          d="M4.836 121.612c-5.662-5.663-5.662-14.844 0-20.506L105.942 0H122v24.954l-96.657 96.658a14.455 14.455 0 01-10.253 4.247 14.46 14.46 0 01-10.254-4.247z"
        ></Path>
        <Path
          fill="#fff"
          d="M6 110c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z"
        ></Path>
        <Path
          fill="#fb3b3b"
          d="M24.253 54.193c-5.663-5.663-5.663-14.844 0-20.507L57.939 0h41.013L44.759 54.193a14.455 14.455 0 01-10.253 4.247c-3.71 0-7.422-1.416-10.253-4.247z"
        ></Path>
        <Path
          fill="#fff"
          d="M24 43.85c0-5.524 4.477-10 10-10s10 4.476 10 10c0 5.522-4.477 10-10 10s-10-4.478-10-10z"
        ></Path>
        <G>
          <Path
            fill="#fb3b3b"
            d="M70.589 104.343c-5.663-5.662-5.663-14.843 0-20.506L122 32.426v41.011l-30.906 30.906a14.452 14.452 0 01-10.252 4.247 14.455 14.455 0 01-10.253-4.247z"
          ></Path>
          <Path
            fill="#fff"
            d="M70.784 94c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z"
          ></Path>
        </G>
      </Svg>
    );
  }
}

export default TopHeader;
