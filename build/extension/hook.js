/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./extension/backend/hook.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./extension/backend/hook.ts":
/*!***********************************!*\
  !*** ./extension/backend/hook.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/* eslint-disable no-param-reassign */\r\n/* eslint-disable no-undef */\r\n/* eslint-disable no-use-before-define */\r\n/* eslint-disable func-names */\r\n/* eslint-disable no-underscore-dangle */\r\nexports.__esModule = true;\r\nexports.clean = void 0;\r\nfunction hook() {\r\n    var devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;\r\n    // if devtools not activated\r\n    if (!devTools) {\r\n        console.log(\"looks like you don't have react devtools activated\");\r\n        return;\r\n    }\r\n    // if hook can't find react\r\n    if (devTools.renderers && devTools.renderers.size < 1) {\r\n        console.log(\"looks like this page doesn't use react\");\r\n        return;\r\n    }\r\n    // patch react devtools function called on render\r\n    devTools.onCommitFiberRoot = (function (original) {\r\n        return function () {\r\n            var args = [];\r\n            for (var _i = 0; _i < arguments.length; _i++) {\r\n                args[_i] = arguments[_i];\r\n            }\r\n            var fiberDOM = args[1];\r\n            var rootNode = fiberDOM.current.stateNode.current;\r\n            var arr = [];\r\n            try {\r\n                recurse(rootNode.child, arr);\r\n                sendToContentScript(arr[0]);\r\n            }\r\n            catch (error) {\r\n                console.log(error);\r\n                // sendToContentScript(error);\r\n            }\r\n            return original.apply(void 0, args);\r\n        };\r\n    })(devTools.onCommitFiberRoot);\r\n}\r\n// message sending function\r\nfunction sendToContentScript(tree) {\r\n    console.log(tree);\r\n    window.postMessage({ tree: tree }, '*');\r\n}\r\nvar clean = function (item, depth) {\r\n    if (depth === void 0) { depth = 0; }\r\n    // base case\r\n    if (depth > 10)\r\n        return 'max recursion depth reached';\r\n    if (typeof item !== 'object' && typeof item !== 'function')\r\n        return item;\r\n    // if item is composite\r\n    if (item === null)\r\n        return null;\r\n    if (typeof item === 'object') {\r\n        var result_1;\r\n        if (item.$$typeof && typeof item.$$typeof === 'symbol') {\r\n            return item.type && typeof item.type !== 'string'\r\n                ? \"<\" + item.type.name + \" />\"\r\n                : 'React component';\r\n        }\r\n        if (Array.isArray(item)) {\r\n            result_1 = [];\r\n            item.forEach(function (elem, idx) {\r\n                result_1[idx] = clean(elem, depth + 1);\r\n            });\r\n        }\r\n        else {\r\n            result_1 = {};\r\n            Object.keys(item).forEach(function (key) {\r\n                result_1[key] = clean(item[key], depth + 1);\r\n            });\r\n        }\r\n        return result_1;\r\n    }\r\n    if (typeof item === 'function') {\r\n        return \"function: \" + item.name + \"()\";\r\n    }\r\n};\r\nexports.clean = clean;\r\nvar getName = function (node, component, parentArr) {\r\n    if (!node.type || !node.type.name) {\r\n        // this is a misc fiber node or html element, continue without appending\r\n        if (node.child)\r\n            recurse(node.child, parentArr);\r\n        if (node.sibling)\r\n            recurse(node.sibling, parentArr);\r\n        return -1;\r\n    }\r\n    else {\r\n        // if valid, extract component name\r\n        component.name = node.type.name;\r\n    }\r\n};\r\nvar getState = function (node, component) {\r\n    var llRecurse = function (stateNode, arr) {\r\n        arr.push(clean(stateNode.memoizedState));\r\n        if (stateNode.next &&\r\n            stateNode.memoizedState !== stateNode.next.memoizedState)\r\n            llRecurse(stateNode.next, arr);\r\n    };\r\n    // if no state, exit\r\n    if (!node.memoizedState)\r\n        return;\r\n    // if state stored in linked list\r\n    if (node.memoizedState.memoizedState) {\r\n        component.state = [];\r\n        llRecurse(node.memoizedState, component.state);\r\n        return;\r\n    }\r\n    // not linked list\r\n    component.state = clean(node.memoizedState);\r\n};\r\nvar getProps = function (node, component) {\r\n    if (node.memoizedProps && Object.keys(node.memoizedProps).length > 0) {\r\n        var props_1 = {};\r\n        Object.keys(node.memoizedProps).forEach(function (prop) {\r\n            props_1[prop] = clean(node.memoizedProps[prop]);\r\n        });\r\n        component.props = props_1;\r\n    }\r\n};\r\nvar getHooks = function (node, component) {\r\n    if (node._debugHookTypes)\r\n        component.hooks = node._debugHookTypes;\r\n};\r\nvar getChildren = function (node, component, parentArr) {\r\n    var children = [];\r\n    if (node.child) {\r\n        recurse(node.child, children);\r\n    }\r\n    if (node.sibling)\r\n        recurse(node.sibling, parentArr);\r\n    //   console.log(children.length);\r\n    if (children.length > 0)\r\n        component.children = children;\r\n};\r\nvar getStateType = function (component) {\r\n    var stateType = {\r\n        stateful: !!component.state,\r\n        receiving: !!component.props,\r\n        sending: component.children && component.children.some(function (child) { return child.props; }),\r\n    };\r\n    if (Object.values(stateType).some(function (isTrue) { return isTrue; })) {\r\n        component.stateType = stateType;\r\n    }\r\n};\r\n// function for fiber tree traversal\r\nfunction recurse(node, parentArr) {\r\n    var component = {\r\n        name: '',\r\n    };\r\n    // if invalid component, recursion will contine, exit here\r\n    if (getName(node, component, parentArr) === -1)\r\n        return;\r\n    getState(node, component);\r\n    //   if (component.name === 'App') delete component.state;\r\n    getProps(node, component);\r\n    getHooks(node, component);\r\n    // insert component into parent's children array\r\n    parentArr.push(component);\r\n    // below functions must execute after inner recursion\r\n    getChildren(node, component, parentArr);\r\n    getStateType(component);\r\n}\r\nhook();\r\n\n\n//# sourceURL=webpack:///./extension/backend/hook.ts?");

/***/ })

/******/ });