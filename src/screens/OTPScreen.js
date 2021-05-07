import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  Text,
  Keyboard,
  ScrollView,
  StatusBar
} from 'react-native';
import {CustomButton,ProgressDialog} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from "react-native-simple-toast";
import service from '../service';
import {connect} from 'react-redux'
import {saveUserData} from '../store/action'
import {SplashSvg, TopHeader, DotsSvg, BottamIconSvg} from '../assets/Svgs';


class OTPScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      height: 100,
       loading: false,
       data: props.route.params.data,
    };
  }


  componentDidMount(){
    console.log("data",this.state.data ) ;
  }

  getApiData = () => {
    const {data,code} = this.state ;
  

    if (code == '') {
      Toast.show('Please Enter OTP', Toast.SHORT);
    } else {
      Keyboard.dismiss();
      this.setState({loading: true});
      service
        .post('User/submitOtp', {otp: code, uid:data.uid})

        .then(response => {
          console.log(response.data);
          this.setState({loading: false});

          let responseData = response.data ;

          if (responseData.status == "1") {
             Toast.show(responseData.message);
             this.setState({code:''})
     
             this.props.saveUserData(responseData.data) ;

            this.props.navigation.replace('Home');

            //this.storeUserId(response.data.data);
            //this.props.saveUserId(response.data.data);
          } else {
            Toast.show(responseData.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };


   resendOTPApi=()=>{
     const {data} = this.state ;
      this.setState({loading: true});

       console.log("data.uid",data.uid) ;

      service
        .post('User/resendOtp', {uid:data.uid})

        .then(response => {
          console.log( "response",response.data);
          this.setState({loading: false});

          if (response.data.status == "1") {
            Toast.show(response.data.message,Toast.SHORT);
  
          } else {
            Toast.show(response.data.message,Toast.SHORT);
          }
        })
        .catch(function(error) {
          console.log(error);
        });

   }

  render() {
    const {loading,code} = this.state ;
    return (
      <SafeAreaView
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1, backgroundColor: 'white'}}>

<StatusBar  backgroundColor = "#fb3b3b" />
        
        <TopHeader style={{alignSelf: 'flex-end'}} />
    
        <ScrollView > 
            <View style={styles.mainContainer}>
                <SplashSvg style={{marginBottom: 5}} />
                <Text style={styles.slashBills}>SLASH BILLS. WIN BIG.</Text>
              
              <Text style={{...styles.enter4,marginTop:5}}>
                Enter 4 digit code sent to your number
              </Text>

              <SmoothPinCodeInput
                //containerStyle={{alignSelf: 'center'}}
                value={code}
                containerStyle={{marginVertical: 25, alignSelf: 'center'}}
                onTextChange={code => this.setState({code})}
                restrictToNumbers
                cellStyle={{
                  shadowColor: 'rgba(255, 181, 181, 0.04)',
                  shadowOffset: {width: 3, height: 0},
                  shadowRadius: 8,
                  borderRadius: 8,
                  borderColor: '#fb3b3b',
                  borderWidth: 1,
                  backgroundColor: '#ffffff',
                }}
                cellStyleFocused={{borderWidth: 1}}
                cellSpacing={15}
                cellSize={45}
                textStyle={styles.layer9}
              />

              <CustomButton btnText="Continue"   onPress={this.getApiData} />

              <View style={{flexDirection: 'row', alignSelf: 'center',marginVertical:20}}>
                <Text style={{...styles.enter4, fontSize: 14}}>
                  Didn't receive code ?
                </Text>

                <Text
                   onPress ={this.resendOTPApi}
                  style={styles.didnT}>
                  {' '}
                  Resend
                </Text>
              </View>
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
        
        <ProgressDialog paginationLoader  loading ={loading} dialogText = "Loading"/>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  subview: {
    marginHorizontal: 35,
    marginVertical: 35,
    //marginTop:35,
    borderRadius: 30,
    backgroundColor: '#F5F6FC',
    borderWidth: 0.6,
    justifyContent: 'center',
  },
  txt: {
    // fontFamily: 'MerriweatherSans-Bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 0.4,
  },
  didnT: {
    color: '#fbb03b',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
    marginVertical: 10,
    // letterSpacing: 'normal',
    lineHeight: 22,
  },
  enter4: {
    marginTop: 10,
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
    lineHeight: 22,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop:'10%'
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
    // width: 390,
    height: 72,
    marginBottom: 12,
  },
  layer9: {
    color: '#fb3b3b',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    textAlign: 'center',
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

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = { saveUserData };
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(OTPScreen);


