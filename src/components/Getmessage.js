import React, { Component } from 'react'

export class Getmessage extends Component {
  
  constructor()
  {
      super()
      this.state = {
          formMessage:''
      }
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e)
  {
    
    this.setState({
        formMessage: e.target.value
    });
  }
  
    render() {

    return (
      <div>
        <form>
            <input type = "text" placeholder = "Enter message here" onChange = {this.handleChange} value = {this.state.formMessage}/>
        </form>
        <button onClick = {() => this.props.submitMessage(this.state.formMessage)}>click</button>
      </div>
    )
  }
}

export default Getmessage
