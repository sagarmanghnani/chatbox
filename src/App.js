import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatkit from '@pusher/chatkit';
import {tokenUrl, instanceLocator} from './configchat';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import Messagepage from './components/Message';
import Getmessage from './components/Getmessage';


class App extends Component {

  constructor()
  {
    super()
    this.state = {
      messages:[],
      check:Number
    }
    this.connectChatKit = this.connectChatKit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
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
      this.hangover.subscribeToRoom({
          roomId: 17309268,
          hooks: {
              onNewMessage: message => {
                  console.log('message.text: ', message);
                  this.setState({
                    messages: [...this.state.messages, message],
                  });
              }
          }
      })
  })
  }

  sendMessage(text)
  {
    
    console.log(this.hangover);
    this.hangover.sendMessage({
      text,
      roomId:17309268
    });
  }


  render() {
    return (
      <div className="App">
        <div>{this.currentUser}</div>
        <Messagepage messaging = {this.state.messages}/>
        <Getmessage submitMessage = {this.sendMessage}/>
      </div>
    );
  }
}

export default App;
