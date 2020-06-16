/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */

const throttle = require('lodash.throttle');

// need to define types here
declare global {
  interface devTools {
    renderers: { size?: number };
    onCommitFiberRoot(any?);
  }

  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: devTools;
  }

  interface component {
    name: any;
    node?: any;
    state?: object;
    stateType?: { stateful: boolean; receiving: boolean; sending: any } | -1;
    hooks?: [string];
    children?: [string] | [];
    props?: object;
  }
}

function hook() {
  const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  // if devtools not activated
  if (!devTools) {
    console.log("looks like you don't have react devtools activated");
    return;
  }

  // if hook can't find react
  if (devTools.renderers && devTools.renderers.size < 1) {
    console.log("looks like this page doesn't use react");
    return;
  }

  // patch react devtools function called on render
  devTools.onCommitFiberRoot = (function (original) {
    return function (...args) {
      const fiberDOM = args[1];
      const rootNode = fiberDOM.current.stateNode.current;
      const arr = [];
      try {
        throttledRecurse(rootNode.child, arr);
        if (arr.length > 0) sendToContentScript(arr[0]);
      } catch (error) {
        console.log(error);
        // sendToContentScript(error);
      }

      return original(...args);
    };
  })(devTools.onCommitFiberRoot);
}

// message sending function
function sendToContentScript(tree) {
  console.log(tree);
  window.postMessage({ tree }, '*');
}

const clean = (item, depth = 0): any => {
  // base case
  if (depth > 10) return 'max recursion depth reached';
  if (typeof item !== 'object' && typeof item !== 'function') return item;

  // if item is composite
  if (item === null) return null;
  if (typeof item === 'object') {
    let result;
    if (item.$$typeof && typeof item.$$typeof === 'symbol') {
      return item.type && typeof item.type !== 'string'
        ? `<${item.type.name} />`
        : 'React component';
    }
    if (Array.isArray(item)) {
      result = [];
      item.forEach((elem, idx) => {
        result[idx] = clean(elem, depth + 1);
      });
    } else {
      result = {};
      Object.keys(item).forEach((key) => {
        result[key] = clean(item[key], depth + 1);
      });
    }
    return result;
  }
  if (typeof item === 'function') {
    return `function: ${item.name}()`;
  }
};

const getName = (node, component, parentArr): void | -1 => {
  if (!node.type || !node.type.name) {
    // this is a misc fiber node or html element, continue without appending
    if (node.child) recurse(node.child, parentArr);
    if (node.sibling) recurse(node.sibling, parentArr);
    return -1;
  } else {
    // if valid, extract component name
    component.name = node.type.name;
  }
};

const getState = (node, component): void => {
  const llRecurse = (stateNode, arr): any => {
    arr.push(clean(stateNode.memoizedState));

    if (
      stateNode.next &&
      stateNode.memoizedState !== stateNode.next.memoizedState
    )
      llRecurse(stateNode.next, arr);
  };

  // if no state, exit
  if (!node.memoizedState) return;
  // if state stored in linked list
  if (node.memoizedState.memoizedState) {
    component.state = [];
    llRecurse(node.memoizedState, component.state);
    return;
  }

  // not linked list
  component.state = clean(node.memoizedState);
};

const getProps = (node, component): void => {
  if (node.memoizedProps && Object.keys(node.memoizedProps).length > 0) {
    const props = {};
    Object.keys(node.memoizedProps).forEach((prop) => {
      props[prop] = clean(node.memoizedProps[prop]);
    });

    component.props = props;
  }
};

const getHooks = (node, component): void => {
  if (node._debugHookTypes) component.hooks = node._debugHookTypes;
};

const getChildren = (node, component, parentArr): void => {
  const children = [];

  if (node.child) {
    recurse(node.child, children);
  }
  if (node.sibling) recurse(node.sibling, parentArr);

  //   console.log(children.length);
  if (children.length > 0) component.children = children;
};

const getStateType = (component): void => {
  const stateType = {
    stateful: !!component.state,
    receiving: !!component.props,
    sending:
      component.children && component.children.some((child) => child.props),
  };

  if (Object.values(stateType).some((isTrue) => isTrue)) {
    component.stateType = stateType;
  }
};

const throttledRecurse = throttle(recurse, 300);

// function for fiber tree traversal
function recurse(node: any, parentArr) {
  const component: component = {
    name: '',
    // node,
  };

  // if invalid component, recursion will contine, exit here
  if (getName(node, component, parentArr) === -1) return;
  getState(node, component);
  if (component.name === 'App') delete component.state;
  getProps(node, component);
  getHooks(node, component);
  // insert component into parent's children array
  parentArr.push(component);
  // below functions must execute after inner recursion
  getChildren(node, component, parentArr);
  getStateType(component);
}

hook();

export { clean };
