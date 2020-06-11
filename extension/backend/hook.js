"use strict";
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
exports.__esModule = true;
function hook() {
    var devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    // if devtools not activated
    if (!devTools) {
        console.log("looks like you don't have react devtools activated");
        return;
    }
    // if hook can't find react
    if (devTools.renderers.size < 1) {
        console.log("looks like this page doesn't use react");
        return;
    }
    //   console.log('hook being inserted');
    devTools.onCommitFiberRoot = (function (original) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var fiberDOM = args[1];
            var rootNode = fiberDOM.current.stateNode.current;
            var arr = [];
            try {
                recurse(rootNode.child, arr);
                sendToContentScript(arr[0]);
            }
            catch (error) {
                console.log(error);
            }
            return original.apply(void 0, args);
        };
    })(devTools.onCommitFiberRoot);
}
// message sending function
function sendToContentScript(tree) {
    console.log(tree);
    window.postMessage({ tree: tree }, '*');
}
// get props and clean
function getProps(props) {
    var cleanProps = {};
    Object.keys(props).forEach(function (prop) {
        cleanProps[prop] = props[prop];
        if (typeof cleanProps[prop] === 'function')
            cleanProps[prop] = "f " + prop + "()";
        if (cleanProps[prop] &&
            cleanProps[prop].$$typeof &&
            typeof cleanProps[prop].$$typeof === 'symbol')
            cleanProps[prop] = cleanProps[prop].type
                ? "<" + cleanProps[prop].type.name + " />"
                : 'react component';
    });
    return cleanProps;
}
// recursion for state linked list
function getState(stateNode, arr) {
    if (Array.isArray(stateNode.memoizedState)) {
        var stateArr_1 = [];
        stateNode.memoizedState.forEach(function (elem, idx) {
            // clean elements of state arr if they are react components
            if (elem.$$typeof && typeof elem.$$typeof === 'symbol') {
                console.log('bad state here');
                stateArr_1.push("<" + elem.type.name + " />");
            }
            else {
                stateArr_1.push(elem);
            }
        });
        arr.push(stateArr_1);
    }
    else {
        arr.push(stateNode.memoizedState);
    }
    if (stateNode.next && stateNode.next.memoizedState.tag !== 5)
        // ^^^
        // DEFINITELY CHECK THIS OUT
        getState(stateNode.next, arr);
}
// get type of state
function getStateType(component) {
    // has own state
    var stateful = !!component.state;
    // receives props from parent
    var receiving = !!component.props;
    // has children that receive props
    var sending = component.children && component.children.some(function (child) { return child.props; });
    if (!stateful && !receiving && !sending)
        return -1;
    return {
        stateful: stateful,
        receiving: receiving,
        sending: sending
    };
}
// TODO: write conditions and separate funcs for class and functional components
function recurse(node, parentArr) {
    var component = {
        name: ''
    };
    // get name
    if (node.type) {
        if (node.type.name) {
            component.name = node.type.name;
        }
        else {
            // this is an html element
            // continue traversal without adding to data obj
            if (node.child)
                recurse(node.child, parentArr);
            if (node.sibling)
                recurse(node.sibling, parentArr);
            return;
        }
    }
    else {
        // this is a misc fiber node
        // continue traversal without adding to data obj
        if (node.child)
            recurse(node.child, parentArr);
        if (node.sibling)
            recurse(node.sibling, parentArr);
        return;
    }
    // get state
    // if functional component, traverse state linked list
    if (node.memoizedState && node.memoizedState.memoizedState) {
        component.state = [];
        getState(node.memoizedState, component.state);
    }
    else if (node.memoizedState)
        component.state = node.memoizedState;
    // get props
    if (node.memoizedProps && Object.keys(node.memoizedProps).length > 0)
        component.props = getProps(node.memoizedProps);
    // get hooks
    if (node._debugHookTypes)
        component.hooks = node._debugHookTypes;
    if (component.name === 'App')
        delete component.state;
    // insert component into parent's children array
    parentArr.push(component);
    // get children/ siblings
    if (node.child) {
        component.children = [];
        recurse(node.child, component.children);
    }
    if (node.sibling)
        recurse(node.sibling, parentArr);
    // get state type
    component.stateType = getStateType(component);
    if (component.stateType === -1)
        delete component.stateType;
    // remove children arr if none added in recursion
    if (component.children.length === 0)
        delete component.children;
}
hook();
