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
import {Icon, Header, JsonData} from '../components';
import {connect} from 'react-redux';
import {clear} from '../store/action';

class MyAccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {
    console.log('user', this.props.user);
  }

  ClearAppData = () => {
    this.setState({modalVisible: false});
    this.props.clear();
    this.props.navigation.replace('VerifyMobile');
  };

  ShowLogoutModal = () => {
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
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text
                style={{
                  color: '#2b2e39',
                  fontFamily: 'Poppins',
                  fontSize: 16,
                  fontWeight: '400',
                }}>
                Are you sure you want to logout ?
              </Text>

              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Pressable
                  onPress={() => this.setState({modalVisible: false})}
                  style={styles.btnView}>
                  <Text style={styles.txtLogout}>No</Text>
                </Pressable>

                <Pressable
                  onPress={this.ClearAppData}
                  style={{
                    ...styles.btnView,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    borderColor: '#fb3b3b',
                    borderWidth: 1,
                    marginStart: 20,
                  }}>
                  <Text style={{...styles.txtLogout, color: '#fb3b3b'}}>
                    Yes
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  iselectedItem = item => {
    const {navigate, replace} = this.props.navigation;

    if (item.id == 4) {
      this.setState({modalVisible: true});
    }
    // else {
    //   navigate(item.navigate);
    // }
  };

  render() {
    const {navigate, replace} = this.props.navigation;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fbfbfb'}}>
        <Header isBackIconShow={false} HeaderName="My Account" />

        {this.ShowLogoutModal()}

        <View style={{marginHorizontal: 16, flex: 1, marginTop: 10}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{width: 100, height: 100, borderRadius: 100 / 2}}
              source={require('../assets/Images/Splash.png')}
            />

            <Text style={styles.name1}>{this.props.user.name}</Text>
            <Text style={styles.email1}>{this.props.user.email}</Text>
          </View>

          <Pressable
           // onPress={() => navigate('EditProfile')}
            style={{...styles.editBg, marginVertical: 13}}>
            <Icon
              name="edit"
              type="FontAwesome"
              style={{fontSize: 20, color: '#2b2e39', opacity: 0.5}}
            />
          </Pressable>

          <View
            style={{
              ...styles.cardView,
              flex: 1,
              marginHorizontal: -16,
             
            }}>
          <ScrollView>   
            <View style ={{flex:1, 
              // marginTop: 25,
              alignItems: 'center'}}>
              {JsonData.AccountData.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => this.iselectedItem(item)}
                    style={styles.ViewMain}>
                    <View
                      style={{
                        ...styles.borderBackground,
                        backgroundColor: item.bgColor,
                      }}>
                      <Icon
                        type={item.type}
                        name={item.iconName}
                        style={{fontSize: 22, color: item.iconColor}}
                      />
                    </View>
                    <Text style={styles.txtName}>{item.txtName}</Text>
                  </Pressable>
                );
              })}
            </View>
            </ScrollView>  
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  name1: {
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
  },
  email1: {
    opacity: 0.8,
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
  },
  editBg: {
    width: 36,
    height: 36,
    shadowColor: '#ffffff',
    shadowOffset: {width: 3, height: 0},
    shadowRadius: 6,
    borderRadius: 5,
    borderColor: '#f3f3f3',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  cardView: {
    // shadowColor: 'rgba(188, 188, 188, 0.08)',
    // backgroundColor:'gray',
    shadowOffset: {width: 3, height: 0},
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    //borderRadius: 5,
    //  borderColor: '#fbfbfb',
    borderStyle: 'solid',
    // borderWidth: 1,
    backgroundColor: '#ffffff',
    //padding: 8,
    elevation: 8,
    borderTopStartRadius: 20,
    borderTopRightRadius: 20,
  },

  borderBackground: {
    width: 46,
    //height: 40,
    borderRadius: 5,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtName: {
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '400',
    marginStart: 10,
  },
  ViewMain: {
    width: '90%',
    //height: 55,
    borderRadius: 10,
    borderColor: '#f3f3f3',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 13,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(00,00,00,0.2)',
  },
  modalView: {
    width: 327,
    height: 132,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 3, height: 0},
    shadowRadius: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  btnView: {
    width: 112,
    height: 37,
    borderRadius: 2,
    backgroundColor: '#fb3b3b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLogout: {
    color: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
  },
});

const mapStateToProps = state => ({
  user: state.user,
});
const mapDispatchToProps = {clear};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountDetails);
