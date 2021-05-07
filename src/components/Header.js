import React from 'react';
import {StyleSheet, View, Text, Button, Pressable} from 'react-native';
import Icon from '../components/IconNB';
import {withNavigation} from '@react-navigation/compat';

class Header extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 46,
          marginHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Pressable style={{flexDirection: 'row'}}>
         {this.props.isBackIconShow  == false ? null :    <Icon
            onPress={() => this.props.navigation.goBack(null)}
            name="md-arrow-back"
            type="Ionicons"
            style={{fontSize: 23}}
          />
          }
          <Text style={styles.herderTxt}>{this.props.HeaderName}</Text>
        </Pressable>

        {this.props.isShown && (
          <Icon
            name="heart"
            type="AntDesign"
            style={{fontSize: 23, color: '#fb3b3b'}}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  herderTxt: {
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 21,
    marginStart: 20,
  },
});
export default withNavigation(Header);
