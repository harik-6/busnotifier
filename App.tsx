import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, useWindowDimensions } from "react-native";
import LoginScreen from './src/pages/login';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/pages/home';
import Colors from './src/constants/colors';

const { Navigator, Screen } = createStackNavigator();

const App = () => {
  const [isLoggedIn, setLogIn] = useState<boolean>(false);
  return (
    <>
      <View style={{
        width: useWindowDimensions().width,
        height: useWindowDimensions().height,
      }} >
        <NavigationContainer theme={{
          dark: true,
          colors: {
            ...DefaultTheme.colors,
            text: "#000000",
            primary: Colors.blue,
            background: "#FFFFFF"
          }
        }} >
          {
            isLoggedIn ?
              <Navigator initialRouteName="Home" >
                <Screen options={{
                  headerTintColor: "white",
                  headerTitleContainerStyle: {
                    paddingLeft: 8,
                  },
                  headerStyle: {
                    backgroundColor: Colors.blue
                  }
                }} name="Home" component={HomeScreen} />
              </Navigator>
              : <Navigator>
                <Screen name="Login" options={{
                  headerShown: false
                }}>
                  {props => <LoginScreen {...props} setUserLogin={setLogIn} />}
                </Screen>
              </Navigator>
          }
        </NavigationContainer>
      </View>

    </>
  );
};


export default App;
