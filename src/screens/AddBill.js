import React from 'react';
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
import {
  Icon,
  ProgressDialog,
  Header,
  CustomTextInput,
  CustomButton,
} from '../components';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import StarRating from 'react-native-star-rating';

class AddBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImage: '',
      isDatePickerVisible: false,
      dob: null,
      modalVisible: false,
      starCount: 3.5,
    };
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

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideStartDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = date => {
    console.log('date@@', Moment(date).format('MM/DD/YYYY'));
    this.setState({dob: Moment(date, 'MM/DD/YYYY').format('MM/DD/YYYY')});

    this.hideStartDatePicker();
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  ShowModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setState({modalVisible: false});
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              onPress={() => this.setState({modalVisible: false})}
              type="AntDesign"
              name="closecircle"
              style={{
                color: '#fb3b3b',
                fontSize: 24,
                alignSelf: 'flex-end',
                margin: 7,
              }}
            />
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.numberTxt}>10</Text>
              <Text
                style={{
                  height: 28,
                  color: '#fbb03b',
                  fontFamily: 'Poppins',
                  fontSize: 20,
                  fontWeight: '300',
                  //  marginVertical:20
                  // marginTop: -15,
                }}>
                Slash Points
              </Text>

              <Text
                style={{
                  width: 168,
                  //  height: 22,
                  color: '#2b2e39',
                  fontFamily: 'Poppins',
                  fontSize: 16,
                  fontWeight: '400',
                  lineHeight: 17,
                  marginTop: 10,
                  marginBottom:20
                }}>
                have been rewarded
              </Text>

              <StarRating 
                disabled={false}
                maxStars={5}
                emptyStar={'star-o'}
                fullStar={'star'}
                halfStar={'star-half-empty'}
                iconSet={'FontAwesome'}
                rating={this.state.starCount}
                selectedStar={rating => this.onStarRatingPress(rating)}
                fullStarColor={'#fbb03b'}
                halfStarColor={'#fbb03b'}
                emptyStarColor={'#fbb03b'}
                starSize = {27}
                //containerStyle ={{padding:10}}
              />

              <Text
                style={{
                  color: '#2b2e39',
                  fontFamily: 'Poppins',
                  fontSize: 12,
                  fontWeight: '400',
                  lineHeight: 17,
                  marginTop: 10,
                }}>
                Give your review about this shop
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {uploadedImage, dob} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Header HeaderName="Add Bills" />

        {this.ShowModal()}

        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={this.hideStartDatePicker}
        />

        <ScrollView>
          <View style={{marginHorizontal: 16, flex: 1, marginVertical: 16}}>
            <Text
              style={{
                color: '#2b2e39',
                fontFamily: 'Poppins',
                fontSize: 18,
                fontWeight: '600',
              }}>
              Upload your bill copy
            </Text>

            <View style={{marginTop: 15}}>
              <CustomTextInput
                isSearch
                styles={{color: '#2b2e39'}}
                style={styles.txtInput}
                placeholder="Bill Amount"
              />
              <CustomTextInput
                isSearch
                styles={{color: '#2b2e39'}}
                style={{...styles.txtInput, marginVertical: 10}}
                placeholder="Bill No"
              />

              <CustomTextInput
                onPress={this.showDatePicker}
                editable={false}
                dropDown
                isSearch
                styles={{color: '#2b2e39'}}
                style={styles.txtInput}
                placeholder={dob == null ? 'Date Of Purchase' : dob}
              />

              <Text
                style={{
                  opacity: 0.8,
                  color: '#fb3b3b',
                  fontFamily: 'Poppins',
                  fontSize: 12,
                  fontWeight: '400',
                  marginTop: 5,
                  marginStart: 4,
                }}>
                Bill is not valid after 3 days of purchase
              </Text>

              {uploadedImage !== '' && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      borderWidth: 0.7,
                      borderColor: '#fb3b3b',
                    }}
                    source={uploadedImage}
                  />
                </View>
              )}

              <Pressable
                onPress={this.SelectLibrary}
                style={{
                  width: '98%',
                  shadowColor: 'rgba(251, 59, 59, 0.08)',
                  shadowOffset: {width: 3, height: 0},
                  shadowRadius: 8,
                  borderRadius: 6,
                  elevation: 6,
                  borderColor: '#fb3b3b',
                  borderWidth: 1,
                  marginVertical: 12,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    type="Feather"
                    name="upload"
                    style={{color: '#fb3b3b', fontSize: 19}}
                  />

                  <Text style={styles.uploadBillTxt}>Upload Bill Copy</Text>
                </View>
              </Pressable>

              <CustomButton
                onPress={() => this.setState({modalVisible: true})}
                btnText="Submit"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  txtInput: {
    width: '100%',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#f3f3f3',

    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  uploadBillTxt: {
    paddingVertical: 13,
    opacity: 0.8,
    color: '#fb3b3b',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    marginStart: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(00,00,00,0.2)',
  },
  modalView: {
    //margin: 15,
    width: 327,
    height: 300,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 3, height: 0},
    shadowRadius: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  numberTxt: {
    color: '#ffd043',
    fontFamily: 'Poppins',
    fontSize: 70,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'center',
    letterSpacing: 7.9,
    height: 80,
    //lineHeight: 75,
  },
});
export default AddBill;
