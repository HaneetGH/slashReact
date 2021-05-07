import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  Pressable,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import {Icon, Header, CustomTextInput, CustomButton} from '../components';
import {launchImageLibrary} from 'react-native-image-picker';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {uploadedImage: ''};
  }

  SelectLibrary = () => {
    const options = {
      //  title: 'Select Avatar',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source1 = {uri: response.uri};
        this.setState({uploadedImage: source1}, () =>
          console.log('uploadedImage', this.state.uploadedImage),
        );
      }
    });
  };

  render() {
    const {navigate, replace} = this.props.navigation;
    const {uploadedImage} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fbfbfb'}}>
        <Header HeaderName="My Account" />
        <View style={{marginHorizontal: 16, flex: 1, marginTop: 16}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {uploadedImage == '' ? (
              <Image style={styles.ImageView} />
            ) : (
              <Image
                style={{...styles.ImageView, borderWidth: 0}}
                source={uploadedImage}
              />
            )}
            <Pressable
              onPress={() => this.SelectLibrary()}
              style={styles.circleView}>
              <Icon
                type="Entypo"
                name="camera"
                style={{color: '#fb3b3b', fontSize: 14}}
              />
            </Pressable>
          </View>

          <View
            style={{
              ...styles.cardView,
              flex: 1,
              marginHorizontal: -16,
              marginTop: '30%',
            }}>
            <View style={{marginHorizontal:10}}>
              <CustomTextInput
                isSearch
                styles={{color: '#2b2e39'}}
                style={{...styles.txtInput, marginTop: 20}}
                placeholder="Enter your Fullname "
              />
              <CustomTextInput
                isSearch
                styles={{color: '#2b2e39'}}
                style={styles.txtInput}
                placeholder="Enter your email address"
              />
              <CustomButton style={{marginTop: 30 }} btnText="Save" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    shadowOffset: {width: 3, height: 0},
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    padding: 8,
    elevation: 3,
    borderTopStartRadius: 20,
    borderTopRightRadius: 20,
  },
  circleView: {
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
    borderColor: '#fb3b3b',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25,
    marginStart: 60,
    // position:'absolute',
    // top:75,
    // right:150,
  },
  txtInput: {
    width: '100%',
    borderRadius: 6,
    //borderWidth: 2,
    borderColor: '#f3f3f3',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    marginTop: 15,
  },
  ImageView: {
    width: 95,
    height: 95,
    borderRadius: 100 / 2,
    borderWidth: 0.4,
    borderColor: '#fb3b3b',
  },
});
