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
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Alert,
  BackHandler,
} from 'react-native';
import {Icon, CustomTextInput, ProgressDialog} from '../components';
import JsonData from '../components/JsonData';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import service from '../service';
import Carousel from 'react-native-banner-carousel';
import NetInfo from '@react-native-community/netinfo';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = Dimensions.get('window').height;

const ImageBaseUrl = 'http://3.129.90.7:4500/Image/resources/';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      lat: null,
      lng: null,
      currentCity: '',
      CurrentAddress: '',

      UserData: [],
      loadingExtraData: false,
      page: 1,
      BannarData: [],

      searchText: '',
      selectedId: 1,
      filteredData: [], 
      isFirstTimePageLoading: true,
      selectedApi: '',
      
    };
  }
 
  componentDidMount() {
    this.bannerListApiCall();
    this.requestLocationPermission();

    // this.didBlurSubscription = this.props.navigation.addListener(
    //   'focus',
    //   () => {
    //     console.log('store_Id', this.props.route.params);

    //     const store_Id = this.props.route.params ;

    //      this.setState({store_Id: store_Id})  
    //     {
    //       store_Id == undefined && 
    //     }
       
    
    //     console.log('store_Id', store_Id);
    //   }
    // );
  }

  // componentWillUnmount() {
  //   this.didBlurSubscription;
  // }


  requestLocationPermission = async () => {
    const {replace} = this.props.navigation;

    if (Platform.OS === 'ios') {
      {
        this.SearchDataByLocation();
      }
    } else {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'App Geolocation Permission',
          message: "App needs access to your phone's location.",
          //buttonNeutral: "Ask Me Later",
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted!!!!');

         this.SearchDataByLocation();

        
          
      } else {
        Alert.alert(
          "App need access to your phone's location",
          "Please update your device's settings in order to use this app",
          [{text: 'OK', onPress: () => BackHandler.exitApp()}],
        );
      }
    }
  };

  SearchDataByLocation = () => {
    this.setState({loading: true});

    Geolocation.getCurrentPosition(
      position => {
        let data = position.coords;
        var pos = {
          lat: data.latitude,
          lng: data.longitude,
        };
        console.log('data', data);

        Geocoder.geocodePosition(pos)
          .then(res => {
            if (data.latitude !== null && data.longitude !== null) {
              this.setState({loading: false});
              this.setState({
                lat: data.latitude,
                lng: data.longitude,
                currentCity: res[0].locality,
                CurrentAddress: res[0].formattedAddress,
              });

             this.filterAPICall()

             
            }
          })
          .catch(error => alert(error));
      },

       error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
     
    );
  };

  filterAPICall = () => {
    const {page, UserData, lat, lng} = this.state;
    this.setState({loading: true});

    let params = {lat: lat, long: lng, page: page};
    console.log('params', params , "filterAPICall called");

    service
      .post('Vendor/vendorListApp', params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        this.setState({loading: false});

        let data = response.data;
        if (data.status == '1') {
          this.setState({
            UserData: page === 1 ? data.data : [...UserData, ...data.data],
          });
        }
      })
      .catch(error => {
        // this.setState({loading: false});
        console.log(error);
      });
  };

  bannerListApiCall = () => {
    service
      .get('Banner/bannerList', {})
      .then(response => {
        let data = response.data;

        if (data.status == '1') {
          this.setState({BannarData: data.data});
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  LoadMoreRandomData = () => {
    const {page} = this.state;

    this.setState(
      {
        page: page + 1,
      },
      () => {
        this.filterAPICall()
      },
    );
  };

  renderPage(image, index) {
    return (
      <View style={{}} key={index}>
        <Image style={{height: 180}} source={{uri: ImageBaseUrl + image}} />
      </View>
    );
  }

 

  renderItem = ({item}) => (
    <Pressable
      key={item.vid}
      onPress={() =>
        this.props.navigation.navigate('CategoryDetails', {items: item})
      }
      style={styles.cardMain}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: 90,
            height: 90,
            backgroundColor: 'white',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 75, height: 75, alignSelf: 'center'}}
            source={{uri: ImageBaseUrl + item.storeLogo}}
            //source={require('../assets/Images/pizza.png')}
          />
        </View>

        <View style={{marginStart: 8, flex: 1, alignSelf: 'center'}}>
          <Text numberOfLines={1} style={{...styles.nearBy, textAlign: 'left'}}>
            {item.storeName}
          </Text>
          <Text
            numberOfLines={2}
            style={{...styles.subText, marginVertical: 4}}>
            {item.storeAddress}
          </Text>

          <View style={{flexDirection: 'row', flex: 1}}>
            <View
              style={{
                borderRadius: 2,
                backgroundColor: item.rating < 5.0 ? '#fbb03b' : '#19b95f',
                flexDirection: 'row',
                padding: 2,
                alignSelf: 'center',
              }}>
              <Text style={{...styles.ratingTxt}}>
                5.0
                {/* {item.rating} */}
              </Text>
              <Icon
                type="FontAwesome"
                name="star"
                style={{color: 'white', marginStart: 2}}
              />
            </View>

            <Text
              style={{
                ...styles.subText,
                fontSize: 10,
                alignSelf: 'center',
                marginHorizontal: 15,
                opacity: 1,
              }}>
             {item.distance !== undefined ?  (item.distance / 1000).toFixed(1) + '  km' : "0 km" } 
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...styles.subText,
                fontSize: 10,
                alignSelf: 'center',
                color: '#fb3b3b',
                opacity: 1,
                flex: 1,
              }}>
              Flat 30% OFF
              {/* {item.discount} */}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  search = searchText => {
    this.setState({searchText: searchText});

    let filteredData = this.state.UserData.filter(item => {
      return item.storeName.includes(searchText);
    });

    console.log('iiri', filteredData.length, 'searchText', searchText);

    if (filteredData.length == 0) {
      this.setState({UserData: []});
    } else {
      this.setState({UserData: filteredData});
    }
  };

  searchItems = text => {
    let newData = this.state.UserData.filter(item => {
      const itemData = `${item.storeName.toUpperCase()}`;
      const textData = text.toUpperCase();
      if (text.length > 0) {
        return itemData.indexOf(textData) > -1;
      }
    });

    this.setState({
      filteredData: newData,
      searchText: text,
    });
  };

  _listEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={styles.cityName}>No Data Found</Text>
      </View>
    );
  };

  render() {
    const {
      currentCity,
      CurrentAddress,
      loading,
      UserData,
      page,
      BannarData,
      selectedId,
      filteredData,
      searchText,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Pressable
          onPress={() => Keyboard.dismiss()}
          style={{marginTop: 16, flex: 1}}>
          <View style={{marginHorizontal: 16}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type="FontAwesome"
                    name="location-arrow"
                    style={styles.iconStyle}
                  />
                  <Text style={styles.cityName}>{currentCity}</Text>
                </View>
                <Text
                  numberOfLines={1}
                  style={{...styles.houseNo, marginEnd: 10, marginVertical: 7}}>
                  {CurrentAddress}
                </Text>
              </View>

              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Icon
                  type="Ionicons"
                  name="ios-notifications-outline"
                  style={styles.iconStyle}
                />
                <Icon
                  type="AntDesign"
                  name="hearto"
                  style={{...styles.iconStyle, marginHorizontal: 12}}
                />
                <Icon type="AntDesign" name="scan1" style={styles.iconStyle} />
              </View>
            </View>

            <CustomTextInput
              isSearch
              isSearchIcon
              styles={{color: '#2b2e39'}}
              style={{
                borderRadius: 1,
                height: 40,
                borderWidth: 0,
                marginVertical: 12,
              }}
              placeholder="Search by shop or products"
              placeholderTextColor="green"
              // onChangeText={this.search}
              onChangeText={text => this.searchItems(text)}
              value={this.state.searchText}
            />
          </View>

          <ScrollView>
            <View>
              <View style={{marginVertical: 1}}>
                <Carousel
                  activePageIndicatorStyle={styles.ellipse11}
                  pageIndicatorStyle={{backgroundColor: 'white'}}
                  autoplay
                  autoplayTimeout={3000}
                  loop
                  index={0}
                  //pageSize={BannerWidth}
                >
                  {BannarData.map((item, index) =>
                    this.renderPage(item.banner_image, index),
                  )}
                </Carousel>
              </View>

              <View style={{marginHorizontal: 16}}>
                <Pressable
                  // onPress={() => this.SearchDataByLocation('FromFilter')}
                  style={{flexDirection: 'row', marginVertical: 8}}>
                  <Icon
                    name="direction"
                    type="Entypo"
                    style={{
                      ...styles.iconStyle,
                      fontSize: 18,
                      marginEnd: 10,
                      alignSelf: 'center',
                    }}
                  />
                  <Text style={styles.nearBy}>Near By Stores</Text>
                </Pressable>

                <FlatList
                  nestedScrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  // data={  filteredData && filteredData.length > 0 ? filteredData : UserData
                  // }
                  data={searchText == '' ? UserData : filteredData}
                  renderItem={this.renderItem}
                  extraData={this.state}
                  keyExtractor={(item, index) => index}
                  onEndReachedThreshold={0}
                  onEndReached={this.LoadMoreRandomData}
                  ListEmptyComponent={this._listEmptyComponent}
                />
                {loading && page !== 1 && (
                  <ActivityIndicator
                    color="#fb3b3bff"
                    style={{marginLeft: 8}}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </Pressable>

        {page == 1 && (
          <ProgressDialog
            paginationLoader
            loading={loading}
            dialogText="Loading"
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cityName: {
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
    marginStart: 5,
    lineHeight: 21,
  },
  houseNo: {
    // opacity: 0.8,
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
    lineHeight: 21,
  },
  iconStyle: {fontSize: 20, color: '#fb3b3b'},
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  nearBy: {
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    textAlign: 'center',
    lineHeight: 21,
  },
  searchIcon: {
    padding: 10,
  },
  cardMain: {
    flex: 1,
    shadowColor: 'rgba(181, 181, 181, 0.1)',
    shadowOffset: {width: 2, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderColor: '#fbfbfb',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    elevation: 5,
    marginVertical: 5,
    padding: 9,
    marginHorizontal: 1,
  },
  subText: {
    opacity: 0.6,
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
  },
  ratingTxt: {
    color: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '400',
    fontStyle: 'normal',
    // textAlignVertical:'center'
  },
  ellipse11: {
    width: 6,
    height: 6,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 3, height: 0},
    shadowRadius: 6,
    backgroundColor: '#fb3b3b',
  },
});
