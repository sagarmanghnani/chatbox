import React, { Component } from 'react'
import '../css/Roomlist.css';
export class Roomlist extends Component {

    
  render() {
      const orderedList = [...this.props.rooms].sort((a,b) => a.id - b.id);
      //console.log("ordered list");
      //console.log(this.props.rooms);
    return (
      <div className = "roomsize-config">
        <h3 className = "room-heading">Your Rooms</h3>
        {orderedList.map(rooms => {
           if(this.props.roomid == rooms.id)
           {
             this.active = 'active';
           }
           else
           {
             this.active = '';
           }
           return(

               <div onClick = {() => {this.props.subscribeRoom(rooms.id)}} className = "roomlist"><a href="#" className = {this.active}># {rooms.name}</a></div>
           )
        })}
      </div>
    )
  }
}

export default Roomlist
