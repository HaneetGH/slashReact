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
  Keyboard,
  FlatList,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import service from '../service';
import {Icon, CustomTextInput, ProgressDialog} from '../components';

export default class CategoriesListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      lat: null,
      lng: null,
      currentCity: '',
      CurrentAddress: '',

      CategoryData: [],
      SingleCategory:[{
        id:0,
        storeType_name:"All"
     }],

      page: 1,

      searchText: '',
      filteredData: [],
    };
  }

  componentDidMount() {
     this.FindLocation();

    // this.didBlurSubscription = this.props.navigation.addListener(
    //     'focus',
    //     () => {
    //       this.FindLocation();
    //     }
    //   );
      
  }

  componentWillUnmount() {
    this.didBlurSubscription;
  }

  FindLocation = () => {
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
              this.CategoryApiCall();
            }
          })
          .catch(error => alert(error));
      },

      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      // { enableHighAccuracy: true, timeout: 20000 }
    );
  };

  CategoryApiCall = () => {
    const {CategoryData,SingleCategory} = this.state;

    this.setState({loading: true});
    service
      .get(
        'StoreMaster/getStoreTypeList',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        this.setState({loading: false});

        let data = response.data;
        console.log("data",data);
        if (data.status == '1') {
          this.setState({
        //     CategoryData:[ ...SingleCategory , ...data.data],
        //   });
        CategoryData:data.data,
    });
        }
      })
      .catch(error => {
        this.setState({loading: true});
        console.log(error);
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

  searchItems = text => {
    let newData = this.state.CategoryData.filter(item => {
      const itemData = `${item.storeType_name.toUpperCase()}`;
      const textData = text.toUpperCase();
      if (text.length > 0) {
        return itemData.indexOf(textData) > -1;
      }
    });

    this.setState({
        filteredData: newData,
        searchText: text,
      });

}


  renderItem = ({item}) => {
   // console.log("item_id",item.id);
   
    return <Pressable
      key={item.vid}
      onPress={() =>
       //  alert("inProgress")
        this.props.navigation.navigate('CategoryListingDetails', {store_Id: item.id , store_Name:item.storeType_name })
      }
      style={styles.cardView} >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
          
        }} >
        <Text
          style={{
            color: '#535353',
            fontFamily: 'Poppins',
            fontSize: 15,
            fontWeight: '500',
            alignSelf: 'center',
          }}>
          {item.storeType_name}
        </Text>

        <Icon
          type="MaterialIcons"
          name="navigate-next"
          style={{
            fontSize: 23,
            color: '#2b2e39',
            opacity: 0.05,
            alignSelf: 'center',
          }}
        />
      </View>
    </Pressable>
  }

  render() {
    const {
      currentCity,
      CurrentAddress,
      loading,
      CategoryData,
      page,
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
               onChangeText={text => this.searchItems(text)}
               value={this.state.searchText}
            />

            <Text
              style={{
                opacity: 0.8,
                color: '#2b2e39',
                fontFamily: 'Poppins',
                fontWeight: '400',
              }}>
              Choose category
            </Text>

            <View style={{marginVertical: 10}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={searchText == '' ? CategoryData : filteredData}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={this._listEmptyComponent}
              />
            </View>
          </View>
        </Pressable>

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
  iconStyle: {fontSize: 20, color: '#fb3b3b'},
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
  cardView: {
    flex: 1,
    shadowColor: 'rgba(239, 239, 239, 0.19)',
    shadowOffset: {width: 2, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderColor: '#fbfbfb',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#f6f6f4',
    elevation: 2,
    marginVertical: 6,
    padding: 5,
    marginHorizontal: 1,
  },
});
