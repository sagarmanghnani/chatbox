import React, { Component } from 'react';

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
      <div>
        <form onSubmit={this.handleSubmit}>
            <input type = "text" placeholder = "Create New Room" onChange = {this.handleChange} value = {this.state.roomName}/>
            <button type = "submit">+</button>
        </form>
        
      </div>
    )
  }
}

export default Newroom
