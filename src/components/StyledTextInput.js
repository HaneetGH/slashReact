import React, {Component} from 'react';
import {TextInput, StyleSheet, View, Pressable} from 'react-native';
import {Icon} from '../components';

class StyledTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  focus = isFocused => () => {
    this.setState({
      focused: isFocused,
    });
    this.props.onFocus && this.props.onFocus();
  };

  render() {
    const {isError} = this.props;
    return (
      <Pressable onPress ={this.props.onPress}
        style={[
          {
            //height: 47,
            paddingHorizontal: 20,
            paddingVertical: 1,
            borderRadius: 4,
            elevation: 1,
           
            width: '98%',
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#fb3b3b',
            shadowOffset: {height: 1, width: 0},
            shadowOpacity: 0.2,
            shadowRadius: 1,
          },
          this.props.style,
        ]}>
        {this.props.isSearchIcon && (
          <Icon
            name="search"
            type="MaterialIcons"
            style={{color: '#2b2e39', fontSize: 22, marginEnd: 5}}
          />
        )}

        <TextInput
          {...this.props}
          onFocus={this.focus(true)}
          onBlur={this.focus(false)}
          placeholderTextColor={this.props.isSearch ? '#2b2e39' : '#fb3b3b'}
          underlineColorAndroid="transparent"
          spellCheck = {false}
          autoCorrect = {false}
          autoCapitalize="none"
          style={[
            {
              // paddingHorizontal: 20,
              // paddingVertical: 10,
              // borderRadius: 4,
              // elevation: 1,
              // shadowOpacity: 0.2,
              // shadowRadius: 1,
              width: '98%',
              // shadowOffset: { height: 1, width: 0 },
              // borderWidth: this.state.focused || isError ? 1 : 1,
              // borderColor: this.state.focused ? "#fb3b3b" : "#fb3b3b"
            },
            styles.rectangle12,
            styles.enterYour,
            this.props.styles,
          ]}
        />

        {this.props.isCheck && (
          <Icon
            name="checkcircle"
            type="AntDesign"
            style={{color: '#3bfba1ff', fontSize: 22, marginEnd: 5}}
          />
        )}
        {this.props.dropDown && (
          <Icon
            name="caretdown"
            type="AntDesign"
            style={{color: '#2b2e39', fontSize: 15, marginEnd: 5}}
          />
        )}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  rectangle12: {
    height: 40,
    borderRadius: 6,
  },
  enterYour: {
    color: '#fb3b3b',
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '400',
    fontStyle: 'normal',
  },
});
export default StyledTextInput;
