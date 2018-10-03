import React, { Component } from 'react'

export class Roomlist extends Component {
  render() {
    return (
      <div>
        {this.props.rooms.map(rooms => {
           return(
               <li onClick = {() => {this.props.subscribeRoom(rooms.id)}}><a href="#"># {rooms.name}</a></li>
           )
        })}
      </div>
    )
  }
}

export default Roomlist
