import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from './src/components';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Platform,
  Image,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {
  Splash,
  VerifyMobile,
  OTPScreen,
  Register,
  Home,
  CategoryDetails,
  AddBill,
  MyAccountDetails,
  ChangeMobileNo,
  RedeemPoints,
  EditProfile,
  Help,
  CategoriesListing,
} from './src';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const BannerWidth = Dimensions.get('window').width;

//const isFocused = useIsFocused();

const CustomTabButton = props => (
  <TouchableOpacity
    activeOpacity={0.9}
    {...props}
    style={
      props.accessibilityState.selected
        ? [
            props.style,
            {
              borderBottomColor: '#fb3b3b',
              borderBottomWidth: 2,
              marginHorizontal: 15,
            },
          ]
        : props.style
    }
  />
);

function MyTabBar({state, descriptors, navigation}) {
  // console.log(
  //   'state',
  //   state,
  //   'descriptors',
  //   descriptors,
  //   'navigation',
  //   navigation,
  // );

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 25,
        marginStart: 35/2,
        shadowColor: 'rgba(236, 211, 211, 0.26)',
        shadowOffset: {width: 3, height: 0},
        shadowRadius: 16,
        borderRadius: 28,
        backgroundColor: '#ffffff',
        elevation:5,
        justifyContent: 'center',
        alignItems: 'center',
        width: BannerWidth - 35,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 5,
          height: 44,
         
          //alignSelf:'center'
        
          //
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBrLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, alignItems: 'center'}}>
              {label == 'Home' ? (
                <Icon
                  type={'FontAwesome'}
                  name={'home'}
                  style={{
                    fontSize: 20,
                    color: isFocused ? '#fb3b3b' : '#fb3b3b',
                  }}
                />
              ) : label == 'Account' ? (
                <Icon
                  type={'FontAwesome'}
                  name={'user'}
                  style={{
                    fontSize: 20,
                    color: isFocused ? '#fb3b3b' : '#fb3b3b',
                  }}
                />
              ) : (
                label == 'Categories' && (
                  <Image
                    style={{width: 18, height: 18}}
                    source={require('./src/assets/Images/category.png')}
                  />
                )
              )}

              <Text
                style={{
                  color: isFocused ? '#fb3b3b' : 'white',
                  fontFamily: 'Poppins',
                  fontSize: 10,
                  fontWeight: '400',
                }}>
                {label}
              </Text>

              <View
                style={{
                  backgroundColor: isFocused ? '#fb3b3b' : 'white',
                  height: isFocused ? 3 : 0,
                  width: 40,
                  marginTop: 4,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default class App extends React.Component {
  HomeStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />

        {/* <Stack.Screen name="CategoriesListing" component={CategoriesListing} /> */}
      </Stack.Navigator>
    );
  };

  CategoryStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="CategoriesListing">
        <Stack.Screen name="CategoriesListing" component={CategoriesListing} />

        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
  };

  AccountStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="MyAccountDetails"
          component={MyAccountDetails}
        />
      </Stack.Navigator>
    );
  };

  BottamTabView = () => {
    return (
      <Tab.Navigator backBehavior="none"
        tabBar={props => <MyTabBar {...props} />}
        // initialRouteName="Home"
        // backBehavior="none"
        // //lazy = {false}
        // screenOptions={({route, navigation}) => ({
        //   tabBarIcon: ({focused, color, size}) => {
        //     let iconName;
        //     size = focused ? 24 : 22;
        //     if (route.name === 'Home') {
        //       iconName = focused ? 'home' : 'home';

        //       return (
        //         <Icon
        //           type="FontAwesome"
        //           name={iconName}
        //           size={size}
        //           color={color}
        //         />
        //       );
        //     } else if (route.name === 'Categories') {
        //       size = focused ? 22 : 18;
        //       return (
        //         <Image
        //           style={{width: size, height: size}}
        //           source={require('./src/assets/Images/category.png')}
        //         />
        //       );
        //     } else if (route.name === 'Account') {
        //       iconName = focused ? 'user' : 'user';

        //       return (
        //         <Icon
        //           type="FontAwesome"
        //           name={iconName}
        //           size={size}
        //           color={color}
        //         />
        //       );
        //     }
        //     return (
        //       <Icon
        //         type="MaterialCommunityIcons"
        //         name={iconName}
        //         size={27}
        //         color={color}
        //       />
        //     );
        //   },
        //   tabBarLabel: navigation.isFocused() ? route.name : '',
        // })}
        // tabBarOptions={{
        //   activeTintColor: '#fb3b3b',
        //   inactiveTintColor: '#fb3b3b',
        //   keyboardHidesTabBar: true,

        //   labelStyle: {
        //     fontFamily: 'Poppins',
        //     fontSize: 10,
        //     fontWeight: '400',
        //     fontStyle: 'normal',
        //     textAlign: 'center',
        //     marginTop: -8,
        //   },
        //   tabStyle: {
        //     justifyContent: 'center',
        //     height: 47,
        //   },

        //   style: {
        //     height: 47,

        //     marginBottom: 5,
        //     marginHorizontal: 12,
        //     shadowColor: 'rgba(236, 211, 211, 0.26)',
        //     shadowOffset: {width: 3, height: 0},
        //     shadowRadius: 16,
        //     borderRadius: 28,
        //     backgroundColor: 'white',
        //   },

        // }}
      >
        <Tab.Screen
          name="Home"
          component={this.HomeStack}
          // options={{
          //   tabBarButton: CustomTabButton,
          // }}
        />
        <Tab.Screen
          name="Categories"
          component={this.CategoryStack}
          // options={{
          //   tabBarButton: CustomTabButton,
          // }}
        />
        <Tab.Screen
          name="Account"
          component={this.AccountStack}
          // options={{
          //   tabBarButton: CustomTabButton,
          // }}
        />
      </Tab.Navigator>
    );
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName="Home">
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="Home" component={this.BottamTabView} />
              <Stack.Screen name="VerifyMobile" component={VerifyMobile} />
              <Stack.Screen name="OTPScreen" component={OTPScreen} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen
                name="CategoryDetails"
                component={CategoryDetails}
              />
              <Stack.Screen name="AddBill" component={AddBill} />
              <Stack.Screen name="ChangeMobileNo" component={ChangeMobileNo} />
              <Stack.Screen name="RedeemPoints" component={RedeemPoints} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="Help" component={Help} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
