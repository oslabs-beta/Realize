import * as d3 from '../../libraries/d3.min.js';
import { data } from './data-example.js';
// THIS PAGE IS TO STORE THE JAVASCRIPT NEEDED INSIDE THE DEVTOOLS PANEL

// ALSO, FROM HERE WE CAN SEND MESSAGES TO THE BACKGROUND.js
// EXAMPLE BELOW WHERE WE SEND A SCRIPT TO BACKGROUND.js
// THIS SCRIPT IS THEN RUN IN THE OPEN WINDOW BY BACKGROUND.JS

/**
EXAMPLE
When the user clicks the 'message' button,
send a message to the background script.
*/
const scriptToAttach = "alert('Hi from the devtools');";
document.getElementById("alert-button").addEventListener("click", () => {
  chrome.runtime.sendMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    script: scriptToAttach
  });
});

// EXAMPLE 2 - You can also eval scripts into main pages

const evalString = "document.getElementById('body').style.backgroundColor = 'pink'"
document.getElementById("color-button").addEventListener("click", () => {
  chrome.devtools.inspectedWindow.eval(evalString);
});

// Can also manipulate the HTML of the dev tools directly
document.getElementById('title-panel').style.color = 'white'



// Creates a function which will add
let treeLayout = d3.tree().size([920, 1920]);

// Creates a heirarchical data structure based on the object passed into it
let root = d3.hierarchy(data.data[0]); // using fake data here
console.log("ROOT");
console.log(root);

// Can check out what the structure looks like
console.log(root.descendants());
console.log("LINKS", root.links());

treeLayout(root); // Creates x and y values on each node of root.
// We will later use this x and y values to:
// 1. position the circles (after joining the root.descendents data to svg circles)
// 2. create links between the circles (after creating lines using root.links that go from x to y)

// SELECT a g object with node as their class
d3.select("svg g.nodes")
  .selectAll("circle.node") // select ALL circle objects with nodes as class (there are none)
  .data(root.descendants()) // attach the data to each of the nodes
  .enter() // as there are no nodes we will make them using enter (and attach the data)
  .append("circle") // add all the circle objects
  .classed("node", true) // add classes of node to each of them
  .attr("cx", function (d) {
    return d.x;
  }) // set its x coordinate
  .attr("cy", function (d) {
    return d.y;
  }) // set its y coordinate
  .attr("r", 7) // set radius of the circle size

// Add text labels at the same x / y co-ordinates as the nodes
d3.selectAll('svg g.nodes')
  .selectAll('text.label')
  .data(root.descendants())
  .enter()
  .append('text')
  .style("text-anchor", "middle")
  .style("fill", "white")
  .text(d => d.data.name)
  .attr('x', d => d.x)
  .attr('y', d => d.y - 10)


d3.select("svg g.links") // select the g object with class links
  .selectAll("line.link") // select all the line objects with class link - ain't any so we gunna create them
  .data(root.links()) // attach the links data
  .enter() // add the nodes that are missing
  .append("line") // by creating a line object
  .classed("link", true) // set the class
  .attr("x1", function (d) {
    return d.source.x;
  }) // set the source x and y coordinates
  .attr("y1", function (d) {
    return d.source.y;
  })
  .attr("x2", function (d) {
    return d.target.x;
  }) // set the target x and y coordinates
  .attr("y2", function (d) {
    return d.target.y;
  });
  
// Functionality for zooming
const svg = d3.select("#tree")
const g = d3.select("#treeG");
function zoomed() {
  g.attr("transform", d3.event.transform);
}

function startZoom() {
  svg.call(d3.zoom()
    .on("zoom", zoomed));
}

function endZoom() {
  svg.on(".zoom", null);
}

// Grab 
let bodyElement = document.getElementsByTagName('body')[0];

bodyElement.addEventListener('keydown', event => {
  if (event.keyCode === 18){
    console.log('keydown')
    startZoom()
  }
})

bodyElement.addEventListener('keyup', event => {
  if (event.keyCode === 18){
    console.log('keyup')
    endZoom()
  }
})

function centerTree(x, y) {
  console.log('fired')
  g.transition()
    .duration(750)
    .attr("transform", "translate(" + x + "," + y + ")")
  g.attr("transform", d3.translate(x, y))
}
 
document.getElementById("center-tree").addEventListener("click", centerTree);