import React from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator, Dimensions, Image, Text} from 'react-native';
const {width, height} = Dimensions.get('window');

class ProgressDialog extends React.PureComponent {
  render() {
    const {loading} = this.props;
    return loading ? (
      <View
        style={{
          backgroundColor: 'rgba(00,00,00,0.5)',
          opacity: 0.8,
          position: 'absolute',
          height: height,
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 3,
          shadowOpacity: 0.2,
          shadowRadius: 1,
          shadowOffset: {height: 3, width: 0},
        }}>
       {this.props.paginationLoader ?  <ActivityIndicator style ={{}} color="#fb3b3bff" size="large" /> :    <View
          style={{
            // height: 70,
             width: 240,
            backgroundColor: 'white',
            //paddingTop: 15,
            flexDirection: 'row',
            justifyContent:'center',
            padding:10,

            borderRadius:4
          }}>
            <ActivityIndicator style ={{alignSelf: 'center',  marginEnd:20}} color="#fb3b3bff" size="large" />
          <Text
            style={{
              fontFamily: 'Poppins',
              fontSize: 16,
              fontWeight: 'bold',
              fontStyle: 'normal',
              alignSelf: 'center',
            
            }}>
            {this.props.dialogText+"..."}
          </Text>
          
        </View>
        }
      </View>
    ) : null;
  }
}
ProgressDialog.defaultProps = {
  loading: false,
};

ProgressDialog.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default ProgressDialog;
