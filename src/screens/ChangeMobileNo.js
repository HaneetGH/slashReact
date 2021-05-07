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
} from 'react-native';
import {CustomButton, CustomTextInput,ProgressDialog,Header} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from "react-native-simple-toast";
import service from '../service';


//import { connect } from 'react-redux';

export default class ChangeMobileNo extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      mobile: '', 
      isvalid: false,
      loading:false
    };
  }
  
  
  VarifyMobileNo = () => {
    const {mobile} = this.state ;
    if (mobile == '') {
      Toast.show('Please Enter Mobile Number',Toast.SHORT);
    } else if (isNaN(mobile)) {
      Toast.show('Please Enter Valid Mobile Number',Toast.SHORT);
    } else if(mobile.length < 10 ){
      Toast.show('Please Enter Valid Mobile Number',Toast.SHORT);
    }
    else {
      Keyboard.dismiss()
      this.setState({isvalid: true});
      this.setState({loading: true});
    

      service
        .post('User/login',{phone:mobile})

        .then(response => {
          console.log(response.data);
          this.setState({loading: false});

           let responseData = response.data;

           console.log(responseData) ;
          
          if (responseData.status == "1") {
             Toast.show("Otp Send to your mobile",Toast.SHORT);
              this.props.navigation.replace('OTPScreen',{data:responseData.data});
           // this.setState({Data: response.data.data});
          } else{
            Toast.show(responseData.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  
  
  
  render() {
    const {isvalid,mobile,loading} =this.state ;
    return (
      <ImageBackground
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1, backgroundColor: 'white',}}
        source={require('../assets/Images/bg.png')}>
       
       
       <SafeAreaView style ={{flex:1}}>
       <Header  HeaderName="Change Mobile Number" />
          <KeyboardAwareScrollView enableAutomaticScroll = {false} contentContainerStyle ={{flex:1}}>  
            <View style={styles.mainContainer} > 
            <Image
              style={styles.artboard1}
              source={require('../assets/Images/appLogo.png')}
            />
            <Text style={styles.slashBills}>SLASH BILLS. WIN BIG.</Text>
          
         
            <CustomTextInput style={{marginVertical: 20}} 
              isCheck = {isvalid ? true :false }
              value={mobile}
              onChangeText={text => this.setState({mobile: text})}
              keyboardType="numeric" 
              maxLength={10} 
              placeholder= "Enter your new mobile number"/>
            
            
             <CustomButton
              btnText="Get OTP"
              onPress={ this.VarifyMobileNo }
            />
           
            </View>
            </KeyboardAwareScrollView>
           
            <Text style={styles.teranoEcommerce}>Terano Ecommerce Pvt. Ltd</Text>
          
          </SafeAreaView>
          <ProgressDialog paginationLoader  loading ={loading} dialogText = "Loading"/>
      </ImageBackground>
     
    );
    
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
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
  teranoEcommerce: {
    opacity: 0.5,
    color: '#707070',
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
  },
});

// const mapStateToProps = (state) => ({ user: state.user, token: state.token });
// const mapDispatchToProps = {clear};
// export default connect(mapStateToProps,mapDispatchToProps)(Splash);
