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
    // patch react devtools function called on render
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
                console.log(arr);
                sendToContentScript(arr[0]);
            }
            catch (error) {
                console.log(error);
                // sendToContentScript(error);
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
var clean = function (item) { };
var getName = function (node, component, parentArr) {
    if (!node.type || !node.type.name) {
        // this is a misc fiber node or html element, continue without appending
        if (node.child)
            recurse(node.child, parentArr);
        if (node.sibling)
            recurse(node.sibling, parentArr);
        return -1;
    }
    else {
        // if valid, extract component name
        component.name = node.type.name;
    }
};
var getProps = function (node, component) {
    if (node.memoizedProps && Object.keys(node.memoizedProps).length > 0) {
        var cleanProps_1 = {};
        Object.keys(node.memoizedProps).forEach(function (prop) {
            cleanProps_1[prop] = node.memoizedProps[prop];
            if (typeof cleanProps_1[prop] === 'function')
                cleanProps_1[prop] = "f " + prop + "()";
            if (cleanProps_1[prop] &&
                cleanProps_1[prop].$$typeof &&
                typeof cleanProps_1[prop].$$typeof === 'symbol')
                cleanProps_1[prop] = cleanProps_1[prop].type
                    ? "<" + cleanProps_1[prop].type.name + " />"
                    : 'react component';
        });
        component.props = cleanProps_1;
    }
};
var getStateRefactor = function (node, component) {
    var llRecurse = function (stateNode, arr) {
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
        if (stateNode.next &&
            stateNode.memoizedState !== stateNode.next.memoizedState)
            llRecurse(stateNode.next, arr);
    };
    // if no state
    if (!node.memoizedState)
        return;
    // if state stored in linked list
    if (node.memoizedState.memoizedState) {
        component.state = [];
        llRecurse(node.memoizedState, component.state);
    }
    // not linked list
    component.state = node.memoizedState;
};
// recursion for state linked list
function getState(stateNode, arr) {
    if (Array.isArray(stateNode.memoizedState)) {
        var stateArr_2 = [];
        stateNode.memoizedState.forEach(function (elem) {
            // clean elements of state arr if they are react components
            if (elem.$$typeof && typeof elem.$$typeof === 'symbol') {
                console.log('bad state here');
                stateArr_2.push("<" + elem.type.name + " />");
            }
            else {
                stateArr_2.push(elem);
            }
        });
        arr.push(stateArr_2);
    }
    else {
        arr.push(stateNode.memoizedState);
    }
    if (stateNode.next &&
        stateNode.memoizedState !== stateNode.next.memoizedState)
        getState(stateNode.next, arr);
}
var getHooks = function (node, component) {
    if (node._debugHookTypes)
        component.hooks = node._debugHookTypes;
};
var getChildren = function (node, component, parentArr) {
    var children = [];
    if (node.child) {
        recurse(node.child, children);
    }
    if (node.sibling)
        recurse(node.sibling, parentArr);
    //   console.log(children.length);
    if (children.length > 0)
        component.children = children;
};
var getStateType = function (component) {
    var stateType = {
        stateful: !!component.state,
        receiving: !!component.props,
        sending: component.children && component.children.some(function (child) { return child.props; })
    };
    if (Object.values(stateType).some(function (isTrue) { return isTrue; })) {
        component.stateType = stateType;
    }
};
// TODO: write conditions and separate funcs for class and functional components
function recurse(node, parentArr) {
    var component = {
        name: ''
    };
    if (getName(node, component, parentArr) === -1)
        return;
    getStateRefactor(node, component);
    // get state
    // if functional component, traverse state linked list
    //   if (node.memoizedState && node.memoizedState.memoizedState) {
    //     component.state = [];
    //     getState(node.memoizedState, component.state);
    //   } else if (node.memoizedState) component.state = node.memoizedState;
    if (component.name === 'App')
        delete component.state;
    getProps(node, component);
    getHooks(node, component);
    // insert component into parent's children array
    parentArr.push(component);
    // below functions must execute after inner recursion
    getChildren(node, component, parentArr);
    getStateType(component);
}
hook();
