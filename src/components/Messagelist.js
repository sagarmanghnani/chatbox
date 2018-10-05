import React, { Component } from 'react';
import '../css/Messagelist.css';

//trying to use functional components
function Messagelist(props)
{
  return(
    <div className = "message">
      <div className = "message-username">{props.userName}</div>
      <div className = "message-text">{props.text}</div>
  </div>
  )
   
}

export default Messagelist
