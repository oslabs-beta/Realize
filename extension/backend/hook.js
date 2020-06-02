/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
function hook() {
  console.log('hooked');
  const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (!devTools) {
    console.log('this page does not use React');
    return;
  }

  devTools.onCommitFiberRoot = (function (original) {
    return function (...args) {
      const fiberDOM = args[1];
      const rootNode = fiberDOM.current.stateNode.current;
      const arr = [];
      recurse(rootNode.child, arr);
      console.log('fibertree: ', arr);
      // sendToServer(arr);
      return original(...args);
    };
  })(devTools.onCommitFiberRoot);
}

function sendToServer(arr) {
  fetch('/receive', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arr),
  });
}

function getProps(props) {
  const cleanProps = {};
  Object.keys(props).forEach((prop) => {
    cleanProps[prop] = props[prop];
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
function getStateType(node, component) {
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
  component.stateType = getStateType(node, component);
  if (component.stateType === -1) delete component.stateType;

  // remove children arr if none added in recursion
  if (component.children.length === 0) delete component.children;

  // remove state if App component
  if (!component.stateType && component.state === null) delete component.state;
}

hook();

// module.exports = hook;
