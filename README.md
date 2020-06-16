# Realize

As applications scale, it becomes more difficult to track state and to have a holistic overview of the component hierarchy. Realize is a tool to help developers visualize the structure and state flow of their React applications, especially when they are  growing in scale and complexity. It currently supports React v.16.8.

## Installation:
1. Run `npm i`
2. Run `npm build`
3. Load the extension into Firefox via Load Temporary Addon - `about:debugging#/runtime/this-firefox`
4. Navigate to a React website and open the Realize dev tools panel
5. Click the extension icon (Browser Action) to hook in Realize
6. Trigger a state change to populate the component tree

* Realize requires React Dev Tools to be installed before use.
* For optimal performance, Realize is best used with React applications launched from a local server. When running production builds, due to the minification, component names will display differently (they display as only one letter).
* After downloading, the Realize extension can be found as a tab in the dev tools panel.
* To view the tree hierarchy, click on a stateful element on the app to begin. The tree will live update as more components are accessed.

## Functionality:
* Utilize the search bar to search for any component that exists in the tree. The search will bring you to the first top-most level component that matches.
* Clicking a node component will display information about state, children, props, and hooks (if utilized).
* Click on center to center tree
* Click on state to view all the state that exists in the tree and where the state is being passed. State is indicated by a pulsing animation behind the node.

## To navigate the tree:
* Shift + mouse scroll will zoom the tree in and out
* Shift + left click will allow you to move the tree around in the panel
