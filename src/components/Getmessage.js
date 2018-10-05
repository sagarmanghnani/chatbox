import React, { Component } from 'react'
import '../css/Getmessage.css';
export class Getmessage extends Component {
  
  constructor()
  {
      super()
      this.state = {
          formMessage:'',
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
        <div className = "row getmessage-config">
          <div className = "col-lg-9 col-md-9">
            <form onSubmit = {() => {this.props.submitMessage(this.state.formMessage)}}>
                <input type = "text" placeholder = "Enter message here" onChange = {this.handleChange} value = {this.state.formMessage} disabled={this.props.disableds} className = "input-message"/>
            </form>
          </div>

          <div className = "col-lg-3 col-md-3">
            <button onClick = {() => this.props.submitMessage(this.state.formMessage)} className = "setButton">click</button>
          </div>

        </div>
      </div>
    )
  }
}
//why onclick requires arrow function, without it, it is not functioning properly
export default Getmessage
