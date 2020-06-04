import * as d3 from '../../libraries/d3.min.js';
import { data } from './data-example.js';

// Store 66% of the users screen width for creating the tree
const panelWidth = Math.floor(screen.width * 0.66);

// ##########################################   BUILDING THE TREE
function createTree(inputData) {
  // Clear any previous tree data to avoid overlap
  d3.selectAll("circle.node").remove()
  d3.selectAll("line.link").remove()
  d3.selectAll("text.label").remove()
  // Creates a function which will later create the co-ordinates for the tree structure
  let treeLayout = d3.tree().size([panelWidth - 80, 1920]);

  // Creates a heirarchical data structure based on the object passed into it
  let root = d3.hierarchy(inputData); // using fake data here
  // // Can check out what the structure looks like
  console.log('Nodes',root.descendants()) // -> shows the nested object of nodes
  // console.log(root.links()) // -> shows the array on links which connect the nodes

  // Creates x and y values on each node of root.
  // We will later use this x and y values to:
  // 1. position the circles (after joining the root.descendents data to svg circles)
  // 2. create links between the circles (after creating lines using root.links that go from x to y)
  treeLayout(root); 

  // SELECT a g object with node as their class
  d3.select("svg g.nodes")
    .selectAll("circle.node") // select ALL circle objects with nodes as class (there are none)
    .data(root.descendants()) // attach the data to each of the nodes
    .enter() // as there are no nodes we will make them using enter (and attach the data)
    .append("circle") // add all the circle objects
    .classed("node", true) // add classes of node to each of them
    .attr("cx", function (d) { // set its x coordinates
      return d.x;
    }) 
    .attr("cy", function (d) { // set its y coordinate
      return d.y;
    }) 
    .attr("r", 7) // set radius of the circle size

  // Add tex"nodes:",t labels at the same x / y co-ordinates as the nodes
  d3.selectAll('svg g.nodes')
    .selectAll('text.label')
    .data(root.descendants())
    .enter()
    .append('text')
    .classed("label", true)
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

  // Grabs all nodes and adds 'click' event listener
  let nodes = d3.selectAll('circle.node')
  nodes.on('click', function(datum, index, nodes) {
    console.log(datum.data)
    populatePanel(datum.data)
  })
}

// DELETE WHEN LIVE
createTree(data.data[0]);
createTree(data.data[0].children[0]);

// ##########################################   TREE ZOOMING / PANNING / CENTERING
// Grab svg and g elements | create d3.zoom() instance
const svg = d3.select("#tree")
const g = d3.select("#treeG");
const zoom = d3.zoom()

// Updates the g position based on user interactions (gets invoked inside startZoom())
function zoomed() {
  g.attr("transform", d3.event.transform);
}

// Start and end zoom functions for event listener
function startZoom() {
  // Set zoom event listener on svg
  svg.call(zoom.on("zoom", zoomed));
}

function endZoom() {
  // remove zoom listener
  svg.on(".zoom", null);
}

// Grab body element
let bodyElement = document.getElementsByTagName('body')[0];

// Attach eventlistener for 'option' keydown and trigger startZoom()
bodyElement.addEventListener('keydown', event => {
  if (event.keyCode === 18){
    startZoom()
  }
})

// Remove zoom on key release
bodyElement.addEventListener('keyup', event => {
  if (event.keyCode === 18){
    endZoom()
  }
})

// Centering the tree
// Function to reset svg so tree is centered
function centerTree() {
  svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity)
}

// Add event listener to the center tree button
document.getElementById("center-tree").addEventListener("click", centerTree);


// ################################# POPULATING THE PANEL
// name - String
// state - object
// stateCategory
// props - array?
// hooks if functional

function populatePanel(dataObj) {
  // Clear the previous data
  clearPanel()
  // Grab the info panel element
  const infoPanel = document.getElementById('info-panel');
  // Add the name bar
  addNameBar(infoPanel, dataObj.name);
  // If has state, add state panel
  if (dataObj.state) addState(infoPanel, dataObj.state);
  // Add props panel
  if (dataObj.props) addProps(infoPanel, dataObj.props);
  // Add list of hooks ? needed?
  // Add children panel
  if (dataObj.children) addChildren(infoPanel, dataObj.children)
}

function clearPanel() {
  const infoPanel = document.getElementById('info-panel');
  infoPanel.innerHTML = '';
}

function addNameBar(infoPanel, componentName) {
  const titleBar = document.createElement('div');
  titleBar.className = 'component-title-bar';
  titleBar.innerHTML = `<div class="title">${componentName}</div>`
  infoPanel.appendChild(titleBar);
}

function addState(infoPanel, stateObject) {
  const statePanel = document.createElement('div');
  statePanel.id = 'state-panel'
  statePanel.innerHTML = `<div class="title-bar">
                            <div id="state-title">State</div>
                            <div id="state-type">${stateObject.stateType}</div>
                          </div>
                          <div id="state-properties">
                          </div>`
  infoPanel.appendChild(statePanel);
  const stateProperties = document.getElementById('state-properties')
  for (let property in stateObject) {
    const statePropBar = document.createElement('div');
    statePropBar.className = 'property-bar';
    statePropBar.innerHTML = `<div class="property-name">${property}</div>
                              <div class="property-value">${stateObject[property]}</div>`
    stateProperties.appendChild(statePropBar);
  }
}

function addProps(infoPanel, propsObject){
  const propsPanel = document.createElement('div');
  propsPanel.id = 'props-panel';
  propsPanel.innerHTML = `<div class="title-bar">
                            <div id="props-title">Props</div>
                          </div>
                          <div id="props-properties"></div>`;
  infoPanel.appendChild(propsPanel);
  const propsProperties = document.getElementById('props-properties');
  for (let property in propsObject){
    const propBar = document.createElement('div');
    propBar.className = 'propBar';
    propBar.innerHTML = `<div class="property-name>${property}</div>
                         <div class="property-value">${propsObject[property]}</div>`;
    propsProperties.appendChild(propBar);

  }
}


function addChildren(infoPanel, childrenObject){
  const childrenPanel = document.createElement('div');
  childrenPanel.id = 'children-panel';
  childrenPanel.innerHTML = `<div class="title-bar">
                            <div id="children-title">Children</div>
                          </div>
                          <div id="children-properties"></div>`;
  infoPanel.appendChild(childrenPanel);
  const childrenProperties = document.getElementById('children-properties');
  for (let property in childrenObject){
    const childrenBar = document.createElement('div');
    childrenBar.className = 'childrenBar';
    childrenBar.innerHTML = `<div class="property-name>${property}</div>
                         <div class="property-value">${childrenObject[property]}</div>`;
    childrenProperties.appendChild(childrenBar);

  }
}

  // Exporting the objects w/ nodes here (change Name)
  let objectNode = root.descendants;
  export default  objectNode;
