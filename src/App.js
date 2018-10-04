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
      this.hangover.getJoinableRooms().then(roomss => {
        console.log(roomss);
        console.log(this.hangover.rooms);
        this.setState({
          joinableRooms:[...this.state.joinableRooms, roomss],
          joinedRooms:this.hangover.rooms
        })
      })
      //this.roomSubscription();
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
    }).then(room => {
      this.setState({
        roomId:room.id
      })
    })
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
        <div>{this.currentUser}</div>
        <Roomlist rooms = {[...this.state.joinableRooms, ...this.state.joinedRooms]} subscribeRoom = {this.roomSubscription}/>
        <Messagepage messaging = {this.state.messages}/>
        <Getmessage submitMessage = {this.sendMessage} disableds={!this.state.roomId}/>
        <Newroom getNewRoom = {this.newRoom}/>
      </div>
    );
  }
}

export default App;
