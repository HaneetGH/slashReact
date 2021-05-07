import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {CustomButton, CustomTextInput, ProgressDialog} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import service from '../service';
import {SplashSvg, TopHeader, DotsSvg, BottamIconSvg} from '../assets/Svgs';
import {useHeaderHeight} from '@react-navigation/stack';

//import { connect } from 'react-redux';
//const headerHeight = Header.HEIGHT;

export default class VerifyMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      isvalid: false,
      loading: false,
    };
  }

  VarifyMobileNo = () => {
    const {mobile} = this.state;
    if (mobile == '') {
      Toast.show('Please Enter Mobile Number', Toast.SHORT);
    } else if (isNaN(mobile)) {
      Toast.show('Please Enter Valid Mobile Number', Toast.SHORT);
    } else if (mobile.length < 10) {
      Toast.show('Please Enter Valid Mobile Number', Toast.SHORT);
    } else {
      Keyboard.dismiss();
     
      this.setState({loading: true});

      service
        .post('User/login', {phone: mobile})

        .then(response => {
          this.setState({loading: false});

          let responseData = response.data;

          console.log(responseData);

          if (responseData.status == '1') {
            Toast.show('Otp Send to your mobile', Toast.SHORT);
            Toast.show(responseData.data.otp, Toast.LONG);

            this.props.navigation.replace('OTPScreen', {
              data: responseData.data,
            });
          } else if (responseData.status == '0') {
            this.props.navigation.replace('Register', {PhoneNo: mobile});
          } else {
            Toast.show(responseData.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    const {isvalid, mobile, loading} = this.state;
    return (
      <SafeAreaView
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar backgroundColor="#fb3b3b" />
        {/* <KeyboardAwareScrollView enableAutomaticScroll = {false} contentContainerStyle ={{flex:1}}>   */}

        <ScrollView
          contentContainerStyle={{
            flex: 1,
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <TopHeader style={{alignSelf: 'flex-end'}} />

          <View style={{flex: 1}}>
            <View style={{...styles.mainContainer}}>
              <SplashSvg style={{marginBottom: 5}} />
              <Text style={styles.slashBills}>SLASH BILLS. WIN BIG.</Text>

              <CustomTextInput
                style={{marginVertical: 20}}
                isCheck={isvalid ? true : false}
                value={mobile}
                onChangeText={text => this.setState({mobile: text} ,()=> {
                 // console.log(mobile.length );
                  if(isNaN(mobile)){
                    this.setState({isvalid: false});
                  }else if(mobile.length+1 == 10){
                    this.setState({isvalid: true});
                  } else{
                    this.setState({isvalid: false});
                  }
                } )}
                keyboardType="numeric"
                maxLength={10}
                placeholder="Enter your mobile number"
              />

              <CustomButton btnText="Get OTP" onPress={this.VarifyMobileNo} />
            </View>

            <View style={{flex: 0.5, justifyContent: 'flex-end'}}>
              <View style={{flexDirection: 'row'}}>
                <BottamIconSvg />
                <Text style={styles.teranoEcommerce}>
                  Terano Ecommerce Pvt. Ltd
                </Text>
              </View>
            </View>
          </View>
          {/* </KeyboardAwareScrollView> */}
        </ScrollView>

        <ProgressDialog
          paginationLoader
          loading={loading}
          dialogText="Loading"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    // backgroundColor:'green'
  },
  slashBills: {
    // width: 192,
    height: 20,
    opacity: 0.8,
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 2.6,
  },
  artboard1: {
    // width: 390,
    height: 72,
    marginBottom: 12,
  },
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

// const mapStateToProps = (state) => ({ user: state.user, token: state.token });
// const mapDispatchToProps = {clear};
// export default connect(mapStateToProps,mapDispatchToProps)(Splash);
