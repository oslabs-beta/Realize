import * as d3 from '../../libraries/d3.min.js';
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

let data = {
  name: "Main Parent",
  children: [
    {
      name: "child1",
      children: [
        {
          name: "grandchild 1",
          value: "1",
        },
        {
          name: "grandchild 2",
          value: "2",
        },
        {
          name: "grandchild 3",
          value: "3",
        },
      ],
    },
    {
      name: "child2",
      children: [
        {
          name: "grandchild 100",
          value: "100",
        },
        {
          name: "grandchild 200",
          value: "200",
        },
        {
          name: "grandchild 300",
          value: "300",
        },
        {
          name: "grandchild 400",
          value: "400",
        },
        {
          name: "grandchild 500",
          value: "500",
        },
      ],
    },
  ],
};

// Creates a function which will add
let treeLayout = d3.tree().size([400, 200]);

// Creates a heirarchical data structure based on the object passed into it
let root = d3.hierarchy(data);
console.log("ROOT");
console.log(root);

// Can check out what the structure looks like
console.log(root.descendants());
console.log(root.links());

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
  .attr("r", 7); // set radius of the circle size

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