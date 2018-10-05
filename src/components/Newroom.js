import React, { Component } from 'react';
import '../css/Newroom.css'
export class Newroom extends Component {

  constructor()
  {
      super();
      this.state = {
          roomName:''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e)
  {
    this.setState({
        roomName:e.target.value
    });
}

  handleSubmit(e)
  {
    console.log("handleSubmit")
    //e.preventDefault();
    this.props.getNewRoom(this.state.roomName);
    this.setState({
        roomName:''
    });
  }
  render() {
    return (
      <div className = "row">
        <div className = "col-lg-9 col-md-9 col-sm-9">
          <form onSubmit={this.handleSubmit}>
              <input type = "text" placeholder = "Create New Room" onChange = {this.handleChange} value = {this.state.roomName}/>
          </form>
        </div>
        <div className = "col-lg-3 col-md-3 col-sm-3"><button type = "submit" className = "newroom-button">+</button></div>
        
      </div>
    )
  }
}

export default Newroom
