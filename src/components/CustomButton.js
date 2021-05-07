import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import Icon from '../components/IconNB';

class CustomButton extends React.PureComponent {
  render() {
    return (
      <Pressable
        onPress={this.props.onPress}
        style={[
          styles.rectangle7,
          this.props.style,
          {backgroundColor: '#fb3b3b'},
        ]}>
        <Text style={[styles.getOtp, this.props.btnTxStyle]}>
          {this.props.btnText}
        </Text>
      </Pressable>
    );
  }
}
const styles = StyleSheet.create({
  rectangle7: {
    // height: 48,
    paddingHorizontal: 20,
    width: '98%',
    shadowColor: 'rgba(251, 59, 59, 0.08)',
    shadowOffset: {width: 3, height: 0},
    shadowRadius: 5,
    borderRadius: 6,
    elevation: 1,
    borderColor: '#fb3b3b',
    borderWidth: 1,
  },

  getOtp: {
    paddingVertical: 9,
    color: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'left',
    letterSpacing: 1.05,
    alignSelf: 'center',
  },
});
export default CustomButton;
