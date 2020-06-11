import * as d3 from '../../libraries/d3.min.js';

// ##########################################   OVERALL FUNCTION
function addInterationsListeners() {
  const zoom = d3.zoom();
  addZoomListener(zoom);
  addCenterTreeListener(zoom);
  addShowStateListener();
  addSearchListener();
}

// Utility function for transitions
let t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

// ##########################################   TREE ZOOMING / PANNING
const zoom = d3.zoom();

function addZoomListener(zoom) {
  // Grab body element
  let bodyElement = document.getElementsByTagName('body')[0];

  // Attach eventlistener for 'option' keydown and trigger startZoom()
  bodyElement.addEventListener('keydown', (event) => {
    if (event.keyCode === 18) {
      startZoom(zoom);
    }
  });

  // Remove zoom on key release
  bodyElement.addEventListener('keyup', (event) => {
    if (event.keyCode === 18) {
      endZoom();
    }
  });
}

// ZOOM Utility functions
// Updates the g position based on user interactions (gets invoked inside startZoom())
function zoomed() {
  const g = d3.select('#treeG');
  g.attr('transform', d3.event.transform);
}

// Start and end zoom functions for event listener
function startZoom(zoom) {
  // Set zoom event listener on svg
  const svg = d3.select('#tree');
  svg.call(zoom.on('zoom', zoomed));
}

function endZoom() {
  // remove zoom listener
  const svg = d3.select('#tree');
  svg.on('.zoom', null);
}


// ##########################################   CENTER TREE
// Centering the tree (resource which might help - http://bl.ocks.org/robschmuecker/7926762)

function addCenterTreeListener(zoom) {
  // Function to reset svg so tree is centered
  function centerTree() {
    const svg = d3.select('#tree');
    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
  }

  // Add event listener to the center tree button
  document.getElementById('center-tree').addEventListener('click', centerTree);
}

// ##########################################   STATE FLOW

// Updating to show state
function closedUpdateNodes() {
  // Set up transition
  // create closure for stateShown
  let stateShown = false;
  return function updateNodes(){
    let nodes = d3.selectAll('circle.node')
    let color;
    let size;
    if (stateShown) {
      color = '#14a897'
      size = 7
      stateShown = false
    } else {
      color = '#E45F59'
      size = 14
      stateShown = true
    };
    nodes.each(function(d) {
      if (d.data.stateType){
        if(d.data.stateType.stateful) {
          d3.select(this).transition(t)
                      .style("fill", color)
                      .attr('r', size)
        }
      }
    })
    let button = d3.select('#show-state')
    stateShown ? button.transition(t).style('color', color)  : button.transition(t).style('color', 'white')
  }
}

// invokes closedUpdateNodes so returned function is passed to event listener
function addShowStateListener() {
  document.getElementById('show-state').addEventListener('click', closedUpdateNodes()) 
}

// ##########################################   SEARCH
function highlightNodes(){
  let keyword = document.getElementById('searchBox').value;
  d3.selectAll('circle.node')
    .each(function(d){
      if (d.data.name === keyword) {
        d3.select(this).transition(t)
                      .style("fill", 'blue')
                      .attr('r', 14)
      }
    })
}

function addSearchListener(){
  const searchBox = document.getElementById('searchBox');
  searchBox.addEventListener('search', highlightNodes)
}


export { addInterationsListeners };