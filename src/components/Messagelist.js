import React, { Component } from 'react'

//trying to use functional components
function Messagelist(props)
{
  return(
    <div>
    <div>{props.userName}</div>
    <div>{props.text}</div>
  </div>
  )
   
}

export default Messagelist
