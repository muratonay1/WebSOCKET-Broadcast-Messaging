import React, { Component } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from "react-native-router-flux";
import Tag from './Connection.js';
import styles from './style.js';
export default class Start extends Component {
  constructor(props) 
  {
    super(props);
    this.state = {
      startTag: '',
      regular:''
    }
  }
  loginActivity() 
  {
    if(this.state.startTag.trim().length!=0)
    {
      Tag.TAG=this.state.startTag;
      Actions.Messages();
    }
    else{
      Alert.alert("Error","Name not null!")
    }
  }
  render() {
    return (
      <View style={styles.Start_Main}>
        <View style={styles.StartViews}>
        </View>
        <View style={styles.StartViews}>
          <Text style={styles.Start_Text}>Choose Username</Text>
          <TextInput
            onChangeText={(input) => this.setState({ startTag: input })}
            style={styles.StartText}
          />
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => this.loginActivity()}
          >
            <Text style={{ fontSize: 19 }}>Connect</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.StartBottomView}>
        </View>
      </View>
    )
  }
}