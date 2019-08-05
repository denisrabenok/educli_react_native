import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Navigation from "./components/Navigation.js";
import SplashScreen from 'react-native-smart-splash-screen'
import { Alert } from 'react-native'
const store = configureStore();

export default class App extends Component {
  componentDidMount() {
    console.log('splash test');
    // Alert.alert('splash test');
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 3000,
    })
  }
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}