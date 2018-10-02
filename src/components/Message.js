import React, { Component } from 'react';
import Messagelist from './Messagelist';
export class Messagepage extends Component {


  render() {
    return (
      <div>
         {this.props.messaging.map((message, index) => {
           return(
             <Messagelist userName = {message.senderId} text = {message.text}/>
           ) 
         })}
      </div>
    )
  }
}

export default Messagepage
