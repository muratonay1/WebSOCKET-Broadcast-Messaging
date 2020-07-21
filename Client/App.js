import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import Routerflux from "./Routerflux";
console.disableYellowBox = true;
export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Routerflux />
        </View>
      </SafeAreaView>
    )
  }
}