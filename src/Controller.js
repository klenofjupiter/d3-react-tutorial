import React, { Component } from 'react';
import Viz from './Viz.js'

export default class Controller extends Component {
  state = {
	  color: "", 
	  width: "", 
	  toDraw: [], 
	}

  onSubmit = (evt) => {
  	evt.preventDefault(); 
  	const newShape = {
  	   color: this.state.color, 
  	   width: this.state.width,
  	}
    this.setState({ toDraw: [...this.state.toDraw, newShape]})
  } 

  onChange = (evt) => {
  	this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    return(
      <div className="controller">
        <form onSubmit={this.onSubmit}>
        <label htmlFor="colorSelect">pick a color:</label>
        <select id="colorSelect" name="color" onChange={this.onChange} value={this.state.color||"default"}>
          <option disabled value="default">choose</option>
          <option value="red">red</option>
          <option value="orange">orange</option>
          <option value="yellow">yellow</option>
        </select>
        <label htmlFor="pixelInput">how big:</label>
        <input id="pixelInput" name="width" onChange={this.onChange} />
        <button type="submit">draw!</button>
        </form>
        { this.state.toDraw.length ? <Viz shapes={this.state.toDraw}/> : null}
      </div>

    )
  }
}