import React, { Component } from 'react';
import Messagelist from './Messagelist';
import ReactDom from 'react-dom';
export class Messagepage extends Component {


  componentWillUpdate()
  {
    const node = ReactDom.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight 
  }
  componentDidUpdate()
  {
    if(this.shouldScrollToBottom)
    {
      //scrollTop is the height or distance we are down from the main screen height or how far we have go down till now(scroll)
      //scrollHeight is total height of the scrollable content
      const node = ReactDom.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }
  render() {
    if(!this.props.joinRoom)
    {
      return(
        <div>Enter Room first</div>
      )
    }
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
