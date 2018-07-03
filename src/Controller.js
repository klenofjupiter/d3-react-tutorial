import React, { Component } from 'react';
import Viz from './Viz.js'

export default class Controller extends Component {
  constructor() {
  	super();
	this.state = {
	  color: "", 
	  width: "", 
	  toDraw: [], 
	}
	this.onSubmit = this.onSubmit.bind(this);
	this.onChange = this.onChange.bind(this);
  }

  onSubmit(evt) {
	evt.preventDefault(); 
	const newShape = {
	   color: this.state.color, 
	   width: this.state.width,
	}
    this.setState({ toDraw: [...this.state.toDraw, newShape]})
  } 

  onChange(evt) {
  	this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    return(
      <div className="controller">
        <form onSubmit={this.onSubmit}>
        <label>pick a color:</label>
        <select name="color" onChange={this.onChange} >
          <option disabled selected="selected" value="">choose</option>
          <option value="red">red</option>
          <option value="orange">orange</option>
          <option value="yellow">yellow</option>
        </select>
        <label>how big:</label>
        <input name="width" onChange={this.onChange} />
        <button type="submit">draw!</button>
        </form>
        { this.state.toDraw.length ? <Viz shapes={this.state.toDraw}/> : null}
      </div>

    )
  }
}