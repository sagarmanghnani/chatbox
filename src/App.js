import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatkit from '@pusher/chatkit';
import {tokenUrl, instanceLocator} from './configchat';
import { ChatManager, TokenProvider } from '@pusher/chatkit'


class App extends Component {

  constructor()
  {
    super()
    this.state = {
      messages:[],
      check:Number
    }
    this.connectChatKit = this.connectChatKit.bind(this);

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
      currentUser.subscribeToRoom({
          roomId: 17309268,
          hooks: {
              onNewMessage: message => {
                  console.log('message.text: ', message);
                  this.setState({
                    //messages: [...this.state.messages, message.text]
                    messages: this.state.messages.push(4)
                    
                  });
                  console.log( "type of messages "+ (this.state.messages));
              }
          }
      })
  })
  }

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
