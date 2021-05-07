import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,

  ImageBackground,
  Keyboard,
  StatusBar
} from 'react-native';
import {CustomButton, CustomTextInput, ProgressDialog} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import service from '../service';
import Toast from 'react-native-simple-toast';
import {SplashSvg, TopHeader, DotsSvg, BottamIconSvg} from '../assets/Svgs';

//import { connect } from 'react-redux';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNo: props.route.params.PhoneNo,
      fullName: '',
      email: '',
      loading: false,
    };
  }

  componentDidMount() {}

  registrationApi = () => {
    const {fullName, email, phoneNo} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (fullName == '') {
      Toast.show('Please Enter FullName', Toast.SHORT);
    } else if (email == '') {
      Toast.show('Please Enter Email Address');
    } else if (reg.test(email) === false) {
      Toast.show('Please Enter valid Email Address');
    } else {
      Keyboard.dismiss();
      this.setState({loading: true});

      let params = {
        name: fullName,
        dob: '',
        phone: phoneNo,
        email: email,
      };

      service
        .post('User/userSignup', params)
        .then(response => {
          this.setState({loading: false});
          let responseData = response.data;

          console.log('Register', responseData);

          if (responseData.status == '1') {
            Toast.show(responseData.message, Toast.SHORT);
            Toast.show(responseData.data.otp, Toast.LONG);
            
            this.props.navigation.replace('OTPScreen', {
              data: responseData.data,
            });
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
    const {fullName, email, loading} = this.state;

    return (
      <SafeAreaView
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1, backgroundColor: 'white'}}>
          <StatusBar  backgroundColor = "#fb3b3b" />
        <TopHeader style={{alignSelf: 'flex-end'}} />

        <ScrollView 
          //enableAutomaticScroll={false}
          contentContainerStyle={{flex:1 }}
          >

          <View style={styles.mainContainer}>
            <Text style={styles.getStarted}>Get Started</Text>

            <Text style={styles.youWill}>
              You will need to provide basic information to get exciting offers
            </Text>

            <CustomTextInput
              style={{marginVertical: 20}}
              keyboardType="default"
              placeholder="Enter your Fullname"
              value={fullName}
              onChangeText={text => this.setState({fullName: text})}
               keyboardType="visible-password"
            />

            <CustomTextInput
              //style={{}}
              // keyboardType="email-address"
              placeholder="Enter your email address"
              value={email}
              onChangeText={text => this.setState({email: text})}
              keyboardType="visible-password"
            />

            <CustomButton
              style={{marginTop: 20}}
              btnText="Continue"
              onPress={this.registrationApi}
            />
          </View>
          
        </ScrollView>
        <View style={{flex: 0.5, justifyContent: 'flex-end'}}>
          <View style={{flexDirection: 'row'}}>
            <BottamIconSvg />
            <Text style={styles.teranoEcommerce}>
              Terano Ecommerce Pvt. Ltd
            </Text>
          </View>
        </View>

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
    fontStyle: 'normal',
    textAlign: 'center',
    letterSpacing: 2.6,
    lineHeight: 19,
  },
  artboard1: {
    height: 72,
    marginBottom: 12,
  },
  getStarted: {
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'center',
    //letterSpacing: 'normal',
    lineHeight: 22,
  },
  youWill: {
    marginHorizontal: 20,
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 22,
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
  },
});

// const mapStateToProps = (state) => ({ user: state.user, token: state.token });
// const mapDispatchToProps = {clear};
// export default connect(mapStateToProps,mapDispatchToProps)(Splash);
