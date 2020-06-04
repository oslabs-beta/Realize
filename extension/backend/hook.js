/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
function hook() {
  const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (devTools.renderers.size < 1) {
    console.log("looks like this page doesn't use react");
    return;
  }

  devTools.onCommitFiberRoot = (function (original) {
    return function (...args) {
      const fiberDOM = args[1];
      const rootNode = fiberDOM.current.stateNode.current;
      const arr = [];
      recurse(rootNode.child, arr);
      sendToContentScript(arr[0]);
      return original(...args);
    };
  })(devTools.onCommitFiberRoot);
}

// message sending function
function sendToContentScript(tree) {
  console.log(tree);
  window.postMessage({ tree }, '*');
}

function getProps(props) {
  const cleanProps = {};
  Object.keys(props).forEach((prop) => {
    cleanProps[prop] = props[prop];
    if (typeof cleanProps[prop] === 'function')
      cleanProps[prop] = `f ${prop}()`;
  });

  return cleanProps;
}

// recursion for state linked list
function getState(stateNode, arr) {
  //   arr.push('something');
  arr.push(stateNode.memoizedState);
  // && stateNode.next.memoizedState.tag !== 5
  if (stateNode.next && stateNode.next.memoizedState.tag !== 5)
    // ^^^
    // DEFINITELY CHECK THIS OUT
    getState(stateNode.next, arr);
}

// get type of state
function getStateType(component) {
  // has own state
  const stateful = !!component.state;

  // receives props from parent
  const receiving = !!component.props;

  // has children that receive props
  const sending =
    component.children && component.children.some((child) => child.props);

  if (!stateful && !receiving && !sending) return -1;

  return {
    stateful,
    receiving,
    sending,
  };
}

// TODO: write conditions and separate funcs for class and functional components
function recurse(node, parentArr) {
  const component = {
    name: '',
    // node,
  };

  // get name
  if (node.type) {
    if (node.type.name) {
      component.name = node.type.name;
    } else {
      // this is an html element
      // continue traversal without adding to data obj
      if (node.child) recurse(node.child, parentArr);
      if (node.sibling) recurse(node.sibling, parentArr);
      return;
    }
  } else {
    // this is a misc fiber node
    // continue traversal without adding to data obj
    if (node.child) recurse(node.child, parentArr);
    if (node.sibling) recurse(node.sibling, parentArr);
    return;
  }

  // get state
  // if functional component, traverse state linked list
  if (node.memoizedState && node.memoizedState.memoizedState) {
    component.state = [];
    getState(node.memoizedState, component.state);
  } else if (node.memoizedState) component.state = node.memoizedState;

  // get props
  if (node.memoizedProps && Object.keys(node.memoizedProps).length > 0)
    component.props = getProps(node.memoizedProps);

  // get hooks
  if (node._debugHookTypes) component.hooks = node._debugHookTypes;

  if (component.name === 'App') component.state = null;

  // insert component into parent's children array
  parentArr.push(component);

  // get children/ siblings
  if (node.child) {
    component.children = [];
    recurse(node.child, component.children);
  }
  if (node.sibling) recurse(node.sibling, parentArr);

  // get state type
  component.stateType = getStateType(component);
  if (component.stateType === -1) delete component.stateType;

  // remove children arr if none added in recursion
  if (component.children.length === 0) delete component.children;

  // remove state if App component
  if (!component.stateType && component.state === null) delete component.state;
}

hook();
