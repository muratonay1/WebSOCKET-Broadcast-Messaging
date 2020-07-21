import React, { Component } from 'react';
import { View, Text, Alert, TextInput, Dimensions, TouchableOpacity, Switch } from 'react-native';
import { Actions } from "react-native-router-flux";
import styles from './style.js';
import Tag from './Connection';
console.disableYellowBox = true;
var CON_STAT;
var CONNECTION = new WebSocket('ws://192.168.1.5:8000');
CONNECTION.onopen = function () {
  try {
    CON_STAT = true;
  } catch (error) {
    CON_STAT = false
    console.log(error);
  }
};
CONNECTION.onmessage = function (input) 
{
  try 
  {
    var SERVER_MESSAGE = JSON.parse(input.data)
  } catch (error) 
  {
    console.log("SERVER MESSAGE ERROR!: Info:\n", error)
  }
  switch (SERVER_MESSAGE.type) 
  {
    case "login":
      responseLogin(SERVER_MESSAGE.success);
      break;
    case "messageOffer":
      responseMessage(SERVER_MESSAGE.message, SERVER_MESSAGE.name)
      break;
    case "broadcast":
      responseBroadcast(SERVER_MESSAGE.message, SERVER_MESSAGE.name)
      break;
    case "UserNotFound":
      responseUserFoundMessage(SERVER_MESSAGE.value)
    default:
      console.log("unknown server response")
      break;
  }
}
function sendServer(message) 
{
  console.log("message: ", message)
  CONNECTION.send(JSON.stringify(message));
};
function responseLogin(success) 
{
  if (success) 
  {
    Alert.alert("Welcome " + Tag.TAG)
  }
  else 
  {
    Alert.alert("Warning", "Choose a different username")
    Actions.Start();
  }
}
function responseMessage(message, connectedName) 
{
  Alert.alert("Message from ",connectedName +" Message: ",message);
}
function responseBroadcast(message, from) 
{
  Alert.alert("Message from ",from +" Message: ",message)
}
function responseUserFoundMessage(val) 
{
  Alert.alert("User not found!")
  console.log(val)
}

export default class Messages extends Component {
  constructor(props) 
  {
    super(props)
    this.state = 
    {
      person: '',
      switch_val: false,
      switch_text: 'OFF',
      color: 'red',
      message: ''
    }
  }
  componentWillMount() 
  {
    if(CON_STAT)
    {
      sendServer({
        type: "login",
        name: Tag.TAG
      })
    }
    else
    {
      Alert.alert("socket connection error")
      Actions.Start()
    }
  }
  clickEvent() 
  {
    if (this.state.switch_val) 
    {
      sendServer({
        type: 'broadcast',
        name: Tag.TAG,
        message: this.state.message
      })
    }
    else 
    {
      sendServer({
        type: 'messageOffer',
        name: Tag.TAG,
        callename: this.state.person,
        message: this.state.message
      })
    }
  }

  textRender = () => 
  {
    if (this.state.switch_val) 
    {
      return null;
    }
    else 
    {
      return (
        <View>
          <TextInput
            onChangeText={(input) => this.setState({ person: input })}
            style={styles.TextInput}
            placeholder="    Person Name"
          />
        </View>
      )
    }
  }
  render() {
    return (
      <View style={styles.Main}>
        <Text style={styles.Text}>USER: {Tag.TAG}</Text>
        <View style={styles.CustomViewContainer}>
          <Text style={styles.Text}>WebSocket & React Native</Text>
          {this.textRender()}
          <TextInput
            onChangeText={(input) => this.setState({ message: input })}
            style={styles.TextInput}
            placeholder="    Message"
          />
          <Text style={styles.SWT_TEXT_TOP}>Broadcast</Text>
          <Text style={{  color: this.state.color }}>{this.state.switch_text}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#25d366" }}
            thumbColor={this.state.switch_val ? "#25d366" : "#f4f3f4"}
            onValueChange={(val) => this.setState({
              switch_val: !this.state.switch_val,
              switch_text: this.state.switch_val ? 'OFF' : 'ON',
              color: this.state.switch_text === 'OFF' ? '#25d366' : 'red'
            })}
            value={this.state.switch_val}
            style={{ size: 10 }}
          />
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => this.clickEvent()}
          >
            <Text style={{ fontSize: 19 }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}