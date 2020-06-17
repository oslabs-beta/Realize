import * as d3 from '../../libraries/d3.js';
import { addInteractionsListeners } from './interactions';
import addSearchListener from './search';

// ##########################################   BUILDING THE TREE
function createTree(inputData, panelInstance) {
  

  // Clear any previous tree data to avoid overlap
  // d3.selectAll("circle.node").remove()
  // d3.selectAll("line.link").remove()
  // d3.selectAll("text.label").remove()
  d3.select('#error-message')
      .style('display', 'none')
  d3.select('#button-bar')
    .style('display', 'block')
  d3.selectAll("svg g.links").html("")
  d3.selectAll("svg g.nodes").html("")

  // Creates a heirarchical data structure based on the object passed into it
  let root = d3.hierarchy(inputData); // using fake data here
  // // Can check out what the structure looks like
  // console.log('Nodes',root.descendants()) // -> shows the nested object of nodes
  // console.log(root.links()) // -> shows the array on links which connect the nodes

  // Store 66% of the users screen width for creating the tree
  const panelWidth = Math.floor(screen.width * 0.66);

  // Find out the height of the tree and size the svg accordingly (each level havin 95px)
  const dataHeight = root.height;
  const treeHeight = dataHeight * 95;
  const svgHeight = Math.max(window.innerHeight, treeHeight)

  // Creates a function which will later create the co-ordinates for the tree structure
  let treeLayout = d3.tree().size([panelWidth - 80, treeHeight]);
  d3.select('#tree')
    .attr('height', svgHeight + 80)

  // Creates x and y values on each node of root.
  // We will later use this x and y values to:
  // 1. position the circles (after joining the root.descendents data to svg circles)
  // 2. create links between the circles (after creating lines using root.links that go from x to y)
  treeLayout(root);

  // create additional nodes for interactions
  d3.select('svg g.nodes')
    .selectAll('circle.background-node') // select ALL circle objects with nodes as class (there are none)
    .data(root.descendants()) // attach the data to each of the nodes
    .enter() // as there are no nodes we will make them using enter (and attach the data)
    .append('circle') // add all the circle objects
    .classed('background-node', true) // add classes of node to each of them
    .attr('cx', function (d) {
      // set its x coordinates
      return d.x;
    })
    .attr('cy', function (d) {
      // set its y coordinate
      return d.y;
    })
    .attr('r', 6); // set radius of the circle size


  // SELECT a g object with nodes as their class
  d3.select('svg g.nodes')
    .selectAll('circle.node') // select ALL circle objects with nodes as class (there are none)
    .data(root.descendants()) // attach the data to each of the nodes
    .enter() // as there are no nodes we will make them using enter (and attach the data)
    .append('circle') // add all the circle objects
    .classed('node', true) // add classes of node to each of them
    .attr('cx', function (d) {
      // set its x coordinates
      return d.x;
    })
    .attr('cy', function (d) {
      // set its y coordinate
      return d.y;
    })
    .attr('r', 7); // set radius of the circle size

  

  // Add text nodes:",t labels at the same x / y co-ordinates as the nodes
  d3.selectAll('svg g.nodes')
    .selectAll('text.label')
    .data(root.descendants())
    .enter()
    .append('text')
    .classed('label', true)
    .style('fill', 'white')
    .style('text-anchor', 'middle')
    .text((d) => d.data.name)
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y - 10);

    // Links with straight lines
  // d3.select('svg g.links') // select the g object with class links
  //   .selectAll('line.link') // select all the line objects with class link - ain't any so we gunna create them
  //   .data(root.links()) // attach the links data
  //   .enter() // add the nodes that are missing
  //   .append('line') // by creating a line object
  //   .classed('link', true) // set the class
  //   .attr('x1', function (d) {
  //     return d.source.x;
  //   }) // set the source x and y coordinates
  //   .attr('y1', function (d) {
  //     return d.source.y;
  //   })
  //   .attr('x2', function (d) {
  //     return d.target.x;
  //   }) // set the target x and y coordinates
  //   .attr('y2', function (d) {
  //     return d.target.y;
  //   });

    // Links with Curves
    // Link for potentially making curves more extreme - https://stackoverflow.com/questions/44958789/d3-v4-how-to-use-linkradial-to-draw-a-link-between-two-points
    d3.select('svg g.links') // select the g object with class links
      .selectAll('path.link') // select all the line objects with class link - ain't any so we gunna create them
      .data(root.links())
      .join("path")
      .classed('link', true)
      // .attr("d", function(d) {
      //     var x0 = d.source.x;
      //     var y0 = d.source.y;
      //     var y1 = d.target.y;
      //     var x1 = d.target.x;
      //     var k = 10;
        
      //     var path = d3.path()
      //     path.moveTo(x0, y0)
      //     path.bezierCurveTo(x1,y0-k,x0,y1-k,x1,y1);
      //     path.lineTo(x1,y1);
        
      //     return path.toString();
      //   })
      // OR, nicer curves
      .attr("d", d3.linkVertical()
              .x(d => d.x)
              .y(d => d.y))
      .attr("fill", "none")
      .attr("stroke", "#e8e888")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)

    let namesArray = []
    d3.selectAll('circle.node')
      .each(function(d){
        namesArray.push(d.data.name)
      })
    
    let uniqueNamesArray = [...new Set(namesArray)];
    addInteractionsListeners(panelInstance)
    addSearchListener(uniqueNamesArray);
    //addSearchListener(namesArray) // If we want multpile components with the same name
}

export {createTree};