import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  LogBox,
  Dimensions
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Icon, ProgressDialog, Header} from '../components';

const ImageBaseUrl = 'http://3.129.90.7:4500/Image/resources/';

const BannerWidth = Dimensions.get('window').width;

class CategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.route.params.items,
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    console.log('data@@', this.state.data);
  }

  renderItem = ({item}) => (
    <View style={{marginVertical: 12}}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 80 / 2,
          // marginHorizontal: 3,
          //borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: 'rgba(0, 0, 0, 0.06)',
          shadowRadius: 6,
        }}>
        <Image
          style={{width: 80, height: 80, borderRadius: 80 / 2}}
          source={require('../assets/Images/mens.png')}
        />
        <Text
          style={{
            color: '#2b2e39',
            fontFamily: 'Poppins',
            fontSize: 12,
            fontWeight: '500',
          }}>
          Men
        </Text>
      </View>
    </View>
  );

  renderItemOffers = ({item}) => (
    <View style={[styles.cardView, {marginVertical: 5}]}>
      <Text
        style={{
          color: '#fb3b3b',
          fontFamily: 'Poppins',
          fontSize: 16,
          fontWeight: '600',
        }}>
        FLAT 50% OFF
      </Text>
      <Text
        style={{
          opacity: 0.6,
          color: '#2b2e39',
          fontFamily: 'Poppins',
          fontSize: 12,
          fontWeight: '400',
          marginVertical:5,
        }}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et ut labore et
      </Text>

      <Text
        style={{
          opacity: 0.8,
          color: '#fbb03b',
          fontFamily: 'Poppins',
          fontSize: 10,
          fontWeight: '400',
        }}>
        offer valid till 26th February 2021
      </Text>
    </View>
  );

  render() {
    const {data} = this.state;
    console.log(ImageBaseUrl+data.storeLogo);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Header isShown HeaderName={data.storeName} />
        

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[{marginHorizontal: 16, flex: 1}]}>
            <View style={styles.imgageViews}>
              <Image
                style={{width:150,height:150,borderRadius:6}}
               // source ={{uri:"http://3.129.90.7:4500/Image/resources/Untitled design (5).png"}}
                 //source={require('../assets/Images/pizza.png')}
                 source={{uri: "http://3.129.90.7:4500/Image/resources/"+data.storeLogo}}
              />
            </View>

            <View style={styles.cardView}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    marginVertical: 10,
                    justifyContent: 'space-between',
                  },
                ]}>
                <View style={{flex: 1}}>
                  <Text style={styles.MainViewText}>{data.storeName}</Text>
                  <Text
                    numberOfLines={3}
                    style={[styles.subText, {marginVertical: 5 ,marginEnd:5}]}>
                    {data.storeAddress}
                  </Text>

                  <Text
                    style={{
                      opacity: 0.8,
                      color: '#2b2e39',
                      fontFamily: 'Poppins',
                      fontSize: 12,
                      fontWeight: '400',
                      fontStyle: 'normal',
                    }}>
                    { data.distance !== undefined ? (data.distance / 1000).toFixed(1) + '  kms away from you' :" 0 kms away from you"  }
                  </Text>
                </View>

                <View style={styles.ratingSection}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.ratingTxt}>4.4</Text>
                    <Icon
                      type="FontAwesome"
                      name="star"
                      style={{
                        color: 'white',
                        marginStart: 8,
                        fontSize: 15,
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                  <Text style={styles.ratingTxt2}>rating</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <Pressable style={styles.circleView}>
                  <Icon
                    type="Ionicons"
                    name="call"
                    style={{color: '#fb3b3b', fontSize: 19}}
                  />
                </Pressable>
                <Pressable style={[styles.circleView, {marginHorizontal: 18}]}>
                  <Icon
                    type="FontAwesome"
                    name="location-arrow"
                    style={{color: '#fb3b3b', fontSize: 19}}
                  />
                </Pressable>
                <Pressable style={styles.circleView}>
                  <Icon
                    type="MaterialCommunityIcons"
                    name="web"
                    style={{color: '#fb3b3b', fontSize: 21}}
                  />
                </Pressable>
              </View>
            </View>

            {/* <View style={{marginVertical: 12}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#2b2e39',
                    fontFamily: 'Poppins',
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  Products Category
                </Text>

                <Text
                  style={{
                    opacity: 0.5,
                    color: '#2b2e39',
                    fontFamily: 'Poppins',
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  View All
                </Text>
              </View>

              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={JsonData.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
              />
            </View> */}

            {/* <FlatList
              nestedScrollEnabled={false}
              data={JsonData.data}
              renderItem={this.renderItemOffers}
              keyExtractor={item => item.id}
            /> */}
          </View>
        </ScrollView>

        <Pressable 
        //onPress ={()=>this.props.navigation.navigate('AddBill')}
          style={{
            ...styles.addBill,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
             top: '80%',
           // bottom: 0,
             left: 20,
           // right: 0,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              type="Ionicons"
              name="document-sharp"
              style={{color: 'white', fontSize: 17, alignSelf: 'center'}}
            />
            <Text
              style={{
                color: '#ffffff',
                fontFamily: 'Poppins',
                fontWeight: '400',
                alignSelf: 'center',
                marginStart: 8,
              }}>
              Add Bill
            </Text>
          </View>
        </Pressable>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  imgageViews: {
    height: 150,
    //backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

    //marginHorizontal: -16,
  },
  MainViewText: {
    color: '#2b2e39',
    fontFamily: 'Poppins',
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 21,
  },
  cardView: {
    // shadowColor: 'rgba(188, 188, 188, 0.08)',
    // // backgroundColor:'gray',
    // shadowOffset: {width: 2, height: 0},
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // borderRadius: 5,
    // borderColor: '#fbfbfb',
    // borderWidth: 1,
    // backgroundColor: '#ffffff',
    // padding: 4,
    // elevation: 5,

    shadowColor: 'rgba(188, 188, 188, 0.08)',
    shadowOffset: {width: 2, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderColor: '#fbfbfb',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    elevation: 2,
    marginVertical: 6,
    padding: 5,
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
  ratingSection: {
    width: 58,
    height: 58,
    borderRadius: 9,
    backgroundColor: '#19b95f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingTxt: {
    color: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    //lineHeight: 'normal',
  },
  ratingTxt2: {
    color: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
  },
  circleView: {
    width: 42,
    height: 42,
    borderColor: '#fb3b3b',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderRadius: 42 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBill: {
    width: 108,
    height: 40,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 3, height: 0},
    shadowRadius: 6,
    borderRadius: 31,
    backgroundColor: '#fb3b3b',
  },
});
export default CategoryDetails;
