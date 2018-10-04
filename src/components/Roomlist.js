import React, { Component } from 'react'

export class Roomlist extends Component {

    
  render() {
      const orderedList = [...this.props.rooms].sort((a,b) => a.id - b.id);
      console.log(orderedList);
    return (
      <div>
        {orderedList.map(rooms => {
           return(
               <li onClick = {() => {this.props.subscribeRoom(rooms.id)}}><a href="#"># {rooms.name}</a></li>
           )
        })}
      </div>
    )
  }
}

export default Roomlist
