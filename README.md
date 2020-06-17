# Realize

As applications scale, it becomes more difficult to track state and to have a holistic overview of the component hierarchy. Realize is a tool to help developers visualize the structure and state flow of their React applications, especially when they are  growing in scale and complexity. It currently supports React v.16.8.


### Installation:
1. Clone the repo onto your computer
2. Run `npm i` from inside the root directory
3. Run `npm build`
4. Load the extension from `build/extension` into Firefox via Load Temporary Addon (found by navigating to `about:debugging#/runtime/this-firefox`)
5. Navigate to a website that uses React and open the Realize dev tools panel
7. Trigger a state change to populate the component tree

**Prerequisites**
- Realize requires React Dev Tools to be installed before use.
-  For optimal performance, Realize is best used with React applications launched from a local server in development mode. Minification reduces production websites component names`

### Functionality:
* Utilize the search bar to search for any component that exists in the tree. The search will bring you to the first top-most level component that matches.
* Clicking a node component will display information about state, children, props, and hooks (if utilized).
* Click on center to center tree
* Click on state to view all the state that exists in the tree and where the state is being passed. State is indicated by a pulsing animation behind the node.

### To navigate the tree:
* Shift + mouse scroll will zoom the tree in and out
* Shift + left click will allow you to move the tree around in the panel
