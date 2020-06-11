import * as d3 from '../../libraries/d3.min.js';

// ##########################################   BUILDING THE TREE
function createTree(inputData) {
  

  // Clear any previous tree data to avoid overlap
  d3.selectAll("circle.node").remove()
  d3.selectAll("line.link").remove()
  d3.selectAll("text.label").remove()

  // Creates a heirarchical data structure based on the object passed into it
  let root = d3.hierarchy(inputData); // using fake data here
  // // Can check out what the structure looks like
  console.log('Nodes',root.descendants()) // -> shows the nested object of nodes
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
    .style('text-anchor', 'middle')
    .style('fill', 'white')
    .text((d) => d.data.name)
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y - 10);

  d3.select('svg g.links') // select the g object with class links
    .selectAll('line.link') // select all the line objects with class link - ain't any so we gunna create them
    .data(root.links()) // attach the links data
    .enter() // add the nodes that are missing
    .append('line') // by creating a line object
    .classed('link', true) // set the class
    .attr('x1', function (d) {
      return d.source.x;
    }) // set the source x and y coordinates
    .attr('y1', function (d) {
      return d.source.y;
    })
    .attr('x2', function (d) {
      return d.target.x;
    }) // set the target x and y coordinates
    .attr('y2', function (d) {
      return d.target.y;
    });

  // Grabs all nodes and adds 'click' event listener
  let nodes = d3.selectAll('circle.node');
  nodes.on('click', function (datum, index, nodes) {
    console.log(datum.data);
    populatePanel(datum.data);
  });
}

export {createTree};