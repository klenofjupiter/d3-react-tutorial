import React, { Component } from 'react';
import * as d3 from 'd3';


export default class Viz extends Component {

  componentDidMount() {
  	this.draw(this.props)
  }
  componentDidUpdate(prevProps){
    //this makes sure we don't redraw unnecessarily --
    //only when we add a new shape
    if(this.props.shapes.length !== prevProps.shapes.length){
      d3.select('.viz > *').remove();
      this.draw(this.props)
    }

  }


  render() {
    return (
      <div className="viz" />
    )
  }
  
  draw = (props) => {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    d3.select('.viz').append('svg')
    .attr('height', h)
    .attr('width', w)
    .attr('id', 'svg-viz')

    const bubbles = props.shapes
    const max = d3.max(bubbles)
  	const radiusScale = d3.scaleSqrt().domain([0, max]).range([0, max])

  	const simulation = d3.forceSimulation()
		.force('x', d3.forceX(w/3).strength(0.05))
		.force('y', d3.forceY(h/3).strength(0.05))
		.force('charge', d3.forceManyBody().strength(-1300))
		.force('collide', d3.forceCollide(d => radiusScale(d.number)+1))

	const circles = d3.select('#svg-viz').selectAll('circle')
	  .data(props.shapes)
	  .enter()
	  .append('svg:circle')
	  .attr('r', d => d.width/2+"px")
	  .style('fill', (d) => d.color ? d.color : 'purple')

	simulation.nodes(props.shapes)
	.on('tick', ticked)
	
	function ticked() {
  	  circles
  	  .attr('cx', d => d.x)
  	  .attr('cy', d => d.y)
  	}
  }
}