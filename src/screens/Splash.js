import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  PermissionsAndroid,
  ImageBackground,
  Platform,
  Alert,
  BackHandler,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import {SplashSvg, TopHeader, DotsSvg, BottamIconSvg} from '../assets/Svgs';
import Geolocation from 'react-native-geolocation-service';

class Splash extends React.PureComponent {
  componentDidMount() {
    const{replace} = this.props.navigation ;

    setTimeout(() => {
     // replace('VerifyMobile');
      let user = this.props.user ;
      if(user.uid !== undefined && user.uid !== null ){
        replace('Home');
      }else{
        replace('VerifyMobile');
        // this.requestCameraPermission()

      }

    }, 1000);
  }

 

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
         <StatusBar  backgroundColor = "#fb3b3b" />
        <TopHeader style={{alignSelf: 'flex-end'}} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <SplashSvg style={{marginBottom: 20}} />
        </View>

        <View
          style={{
            flex: 0.1,
            alignItems: 'center',
          }}>
          <DotsSvg />
        </View>

        <View style={{flexDirection: 'row'}}>
          <BottamIconSvg />
          <Text style={styles.teranoEcommerce}>Terano Ecommerce Pvt. Ltd</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  teranoEcommerce: {
    opacity: 0.5,
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: 25,

    marginHorizontal: 25,
    // flex:1,
  },
});

const mapStateToProps = state => ({user: state.user});
export default connect(mapStateToProps)(Splash);
