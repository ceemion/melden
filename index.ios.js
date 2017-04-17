/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet
} from 'react-native';

import * as firebase from 'firebase';
import Firebase from './melden/firebase/init';

import Login from './melden/views/Login';
import CreateAccount from './melden/views/CreateAccount';
import Tasks from './melden/views/Tasks';
import Expenses from './melden/views/Expenses';
import Reports from './melden/views/Reports';
import Profile from './melden/views/Profile';

class Melden extends Component {

  constructor(props) {
    super(props);

    Firebase.initialise();

    this.getInitialView();

    this.state = {
      userLoaded: false,
      initialView: null
    };

    this.getInitialView = this.getInitialView.bind(this);
  }

  getInitialView() {
    firebase.auth().onAuthStateChanged((user) => {

      let initialView = user ? "Tasks" : "Login";

      this.setState({
        userLoaded: true,
        initialView: initialView
      })
    });
  }

  static renderScene(route, navigator) {
    switch (route.name) {
      case "Login":
        return (<Login navigator={navigator} />);
        break;

      case "CreateAccount":
        return (<CreateAccount navigator={navigator} />);
        break;

      case "Tasks":
        return (<Tasks navigator={navigator} />);
        break;

      case "Expenses":
        return (<Expenses navigator={navigator} />);
        break;

      case "Reports":
        return (<Reports navigator={navigator} />);
        break;

        case "Profile":
        return (<Profile navigator={navigator} />);
        break;
    }
  }

  static configureScene(route) {
    if (route.sceneConfig) {
      return (route.sceneConfig);
    } else {
      return ({
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {}
      });
    }
  }

  render() {
    if (this.state.userLoaded) {
      return (
          <Navigator
              initialRoute={{name: this.state.initialView}}
              renderScene={Melden.renderScene}
              configureScene={Melden.configureScene}
          />);
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Melden', () => Melden);
