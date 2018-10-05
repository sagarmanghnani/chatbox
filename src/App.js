import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatkit from '@pusher/chatkit';
import {tokenUrl, instanceLocator} from './configchat';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import Messagepage from './components/Message';
import Getmessage from './components/Getmessage';
import { Roomlist } from './components/Roomlist';
import Newroom from './components/Newroom';
import { Grid, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

  constructor()
  {
    super()
    this.state = {
      messages:[],
      joinableRooms:[],
      joinedRooms:[],
      roomId:null,
      isRoomEntered:false,
    }
    this.connectChatKit = this.connectChatKit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.roomSubscription = this.roomSubscription.bind(this);
    this.newRoom = this.newRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
  }
  componentDidMount()
  {
      this.connectChatKit()
  }

  connectChatKit()
  {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'sagarmanghnani',
      tokenProvider: new Chatkit.TokenProvider({
          url: tokenUrl
      })
  })
  
  
  chatManager.connect()
  .then(currentUser => {
      //setting up currentUser as property is not working
      this.hangover = currentUser;
      this.getRooms();
      //this.roomSubscription();
  })
  }

  getRooms()
  {
    this.hangover.getJoinableRooms().then(roomss => {
      console.log( "rooms to be joined"+ roomss);
      console.log(this.hangover.rooms);
      this.setState({
        joinableRooms:roomss,
        joinedRooms:this.hangover.rooms
      })
    })
  }

  roomSubscription(roomsID)
  {
    this.setState({messages:[]})
    this.hangover.subscribeToRoom({
      roomId: roomsID,
      hooks: {
          onNewMessage: message => {
              console.log('message.text: ', message);
              this.setState({
                messages: [...this.state.messages, message],
              });
          }
      }
    })
    .then(room => {
      this.setState({
          roomId: room.id
      })
      this.getRooms()
  })
  .catch(err => console.log('error on subscribing to room: ', err))
  }

  sendMessage(text)
  {
    
    console.log(this.hangover);
    this.hangover.sendMessage({
      text,
      roomId:this.state.roomId
    });
  }

  newRoom(roomName)
  {
    console.log("new Room");
    this.hangover.createRoom({
      name:roomName
    }).then(room => {
      this.roomSubscription(room.id);
    })
    .catch(err => {console.log(err)})
  }

 
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className = "row">
            <div className = "col-lg-3 col-md-4" className = "setRoomList"><Roomlist rooms = {[...this.state.joinableRooms, ...this.state.joinedRooms]} subscribeRoom = {this.roomSubscription} roomid = {this.state.roomId}/></div>
            <div className = "col-lg-9 col-md-8"><Messagepage messaging = {this.state.messages} joinRoom={this.state.roomId}/></div>
          </div>
          <div className = "row">
            <div className = "col-lg-3 col-md-4"><Newroom getNewRoom = {this.newRoom}/></div>
            <div className = "col-lg-9 col-md-8"><Getmessage submitMessage = {this.sendMessage} disableds={!this.state.roomId}/></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
