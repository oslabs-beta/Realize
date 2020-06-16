import * as d3 from '../../libraries/d3.min.js';

// ##########################################   OVERALL FUNCTION
function addInteractionsListeners(panelInstance) {
  const zoom = d3.zoom();
  addZoomListener(zoom);
  addCenterTreeListener(zoom);
  addShowStateListener();
  addClickListeners(panelInstance)
}

// Utility function for transitions
let t = d3.transition()
          .duration(750)
          .ease(d3.easeLinear);

let tSlow = d3.transition()
              .duration(0)
              .ease(d3.easeLinear);

// ##########################################   TREE ZOOMING / PANNING
const zoom = d3.zoom();

function addZoomListener(zoom) {
  // Grab body element
  let bodyElement = document.getElementsByTagName('body')[0];

  // Attach eventlistener for 'option' keydown and trigger startZoom()
  bodyElement.addEventListener('keydown', (event) => {
    if (event.keyCode === 16) {
      startZoom(zoom);
    }
  });

  // Remove zoom on key release
  bodyElement.addEventListener('keyup', (event) => {
    if (event.keyCode === 16) {
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
    let nodes = d3.selectAll('circle.background-node')
    let color;
    let linkColor;
    let size;
    if (stateShown) {
      // default colors
      color = '#707070'
      linkColor = '#606060'
      size = 6
      stateShown = false
    } else {
      // state showns colors
      color = '#1eabd5'
      linkColor = '#1eabd5'
      size = 10
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

    let links = d3.selectAll('path.link');
    links.each(function(d){
      console.log(d)
      if (d.source.data.stateType){
        if(d.source.data.stateType.sending && d.target.data.stateType.receiving){
          d3.select(this)
            .transition(t)
            .style('stroke', linkColor)
        }
      }
    })
  }
}

// invokes closedUpdateNodes so returned function is passed to event listener
function addShowStateListener() {
  document.getElementById('show-state').addEventListener('click', closedUpdateNodes()) 
}

// Grabs all nodes and adds 'click' event listener
function addClickListeners(panelInstance){
  let nodes = d3.selectAll('circle.node');
  let selected;
  let originalColor;
  nodes.on('click', function (datum, index, nodes) {
    if(d3.event.shiftKey) console.log("SHIFT PRESSED") // FOR USE WITH NESTING CHILDREN
    if (selected) {
      selected.interrupt()
      selected.style('fill', originalColor)
    }
    selected = d3.select(this);
    originalColor = selected.attr('fill')
    selected.style("fill", '#eee')
    // function repeat(){
    //   selected.style("fill", '#F6CF63')
    //           .transition(t)
    //           .attr('r', 8)
    //           .transition(t)
    //           .attr('r', 7)
    //           .on('end', repeat)
    // }
    // repeat()
    panelInstance.update(datum.data);
  });
}


//#################################### Search Function
function highlightNodes(lowerCaseInput) {
  let selected = d3.selectAll('circle.node')
    .filter(function(d){
      d.data.name.toLowerCase() === lowerCaseInput;
    })

    selected.transition(t)
            .attr('r', 10)
            .transition(t)
            .attr('r', 7)
            .transition(t)
            .attr('r', 10)
            .transition(t)
            .attr('r', 7)
            .transition(t)
            .attr('r', 10)
            .transition(t)
            .attr('r', 7)
}


export { addInteractionsListeners, highlightNodes };

// Resources for collapsable trees:
// - http://bl.ocks.org/robschmuecker/7926762
// - https://www.codeproject.com/tips/1021936/creating-vertical-collapsible-tree-with-d-js
