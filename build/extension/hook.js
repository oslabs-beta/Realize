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
/******/ 	return __webpack_require__(__webpack_require__.s = "./extension/backend/hook.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./extension/backend/hook.js":
/*!***********************************!*\
  !*** ./extension/backend/hook.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _devtools_panel_search_example_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../devtools/panel/search-example.js */ \"./extension/devtools/panel/search-example.js\");\n/* eslint-disable no-param-reassign */\n/* eslint-disable no-undef */\n/* eslint-disable no-use-before-define */\n/* eslint-disable func-names */\n/* eslint-disable no-underscore-dangle */\n\n// Importing the D3 array from panel.js\n\n// importing data example\n\n\nfunction hook() {\n  const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;\n\n  if (devTools.renderers.size < 1) {\n    console.log(\"looks like this page doesn't use react\");\n    return;\n  }\n\n  devTools.onCommitFiberRoot = (function (original) {\n    return function (...args) {\n      const fiberDOM = args[1]; \n      const rootNode = fiberDOM.current.stateNode.current;\n      const arr = [];\n      recurse(rootNode.child, arr);\n      //console.log('Search Data:', searchData);\n\n      // component name hardcoded \n      let compName = 'App';\n      console.log('searchhhhh', findComp(_devtools_panel_search_example_js__WEBPACK_IMPORTED_MODULE_0__[\"searchData\"], compName));\n      sendToContentScript(arr[0]);\n      return original(...args);\n    };\n  })(devTools.onCommitFiberRoot);\n}\n\n// declare global variable to hold name\nlet name = 'App';\n\n// Recursively go over the tree until we find the name of a component\nfunction findComp(tree, compName) {\n  // Base case\n  if (tree[name] === compName) return tree;\n\n  // If it does not have any children\n  if (!tree[name]) return -1;\n\n  // Iterate over the array(one we get from D3)\n  tree.children.forEach((child) => {\n    findComp(child, compName);\n  });\n}\n\n// message sending function\nfunction sendToContentScript(tree) {\n  console.log(tree);\n  window.postMessage({ tree }, '*');\n}\n\nfunction getProps(props) {\n  const cleanProps = {};\n  Object.keys(props).forEach((prop) => {\n    cleanProps[prop] = props[prop];\n    if (typeof cleanProps[prop] === 'function')\n      cleanProps[prop] = `f ${prop}()`;\n  });\n\n  return cleanProps;\n}\n\n// recursion for state linked list\nfunction getState(stateNode, arr) {\n  //   arr.push('something');\n  arr.push(stateNode.memoizedState);\n  // && stateNode.next.memoizedState.tag !== 5\n  if (stateNode.next && stateNode.next.memoizedState.tag !== 5)\n    // ^^^\n    // DEFINITELY CHECK THIS OUT\n    getState(stateNode.next, arr);\n}\n\n// get type of state\nfunction getStateType(component) {\n  // has own state\n  const stateful = !!component.state;\n\n  // receives props from parent\n  const receiving = !!component.props;\n\n  // has children that receive props\n  const sending =\n    component.children && component.children.some((child) => child.props);\n\n  if (!stateful && !receiving && !sending) return -1;\n\n  return {\n    stateful,\n    receiving,\n    sending,\n  };\n}\n\n// TODO: write conditions and separate funcs for class and functional components\nfunction recurse(node, parentArr) {\n  const component = {\n    name: '',\n    // node,\n  };\n\n  // get name\n  if (node.type) {\n    if (node.type.name) {\n      component.name = node.type.name;\n    } else {\n      // this is an html element\n      // continue traversal without adding to data obj\n      if (node.child) recurse(node.child, parentArr);\n      if (node.sibling) recurse(node.sibling, parentArr);\n      return;\n    }\n  } else {\n    // this is a misc fiber node\n    // continue traversal without adding to data obj\n    if (node.child) recurse(node.child, parentArr);\n    if (node.sibling) recurse(node.sibling, parentArr);\n    return;\n  }\n\n  // get state\n  // if functional component, traverse state linked list\n  if (node.memoizedState && node.memoizedState.memoizedState) {\n    component.state = [];\n    getState(node.memoizedState, component.state);\n  } else if (node.memoizedState) component.state = node.memoizedState;\n\n  // get props\n  if (node.memoizedProps && Object.keys(node.memoizedProps).length > 0)\n    component.props = getProps(node.memoizedProps);\n\n  // get hooks\n  if (node._debugHookTypes) component.hooks = node._debugHookTypes;\n\n  if (component.name === 'App') component.state = null;\n\n  // insert component into parent's children array\n  parentArr.push(component);\n\n  // get children/ siblings\n  if (node.child) {\n    component.children = [];\n    recurse(node.child, component.children);\n  }\n  if (node.sibling) recurse(node.sibling, parentArr);\n\n  // get state type\n  component.stateType = getStateType(component);\n  if (component.stateType === -1) delete component.stateType;\n\n  // remove children arr if none added in recursion\n  if (component.children.length === 0) delete component.children;\n\n  // remove state if App component\n  if (!component.stateType && component.state === null) delete component.state;\n}\n\nhook();\n\n\n//# sourceURL=webpack:///./extension/backend/hook.js?");

/***/ }),

/***/ "./extension/devtools/panel/search-example.js":
/*!****************************************************!*\
  !*** ./extension/devtools/panel/search-example.js ***!
  \****************************************************/
/*! exports provided: searchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"searchData\", function() { return searchData; });\nconst searchData = \n    [\n        {\n          \"data\": {\n            \"name\": \"App\",\n            \"state\": null,\n            \"stateType\": {\n              \"stateful\": false,\n              \"receiving\": false,\n              \"sending\": true\n            }\n          },\n          \"height\": 8,\n          \"depth\": 0,\n          \"x\": 716.3000000000001,\n          \"y\": 0\n        },\n        {\n          \"data\": {\n            \"name\": \"BrowserRouter\",\n            \"props\": {},\n            \"stateType\": {\n              \"stateful\": false,\n              \"receiving\": true,\n              \"sending\": true\n            }\n          },\n          \"height\": 7,\n          \"depth\": 1,\n          \"x\": 716.3000000000001,\n          \"y\": 95\n        },\n        {\n          \"data\": {\n            \"name\": \"Router\",\n            \"state\": {\n              \"location\": {\n                \"pathname\": \"/\",\n                \"search\": \"\",\n                \"hash\": \"\",\n                \"key\": \"pwbb3b\"\n              }\n            },\n            \"props\": {\n              \"history\": {\n                \"length\": 5,\n                \"action\": \"PUSH\",\n                \"location\": {\n                  \"pathname\": \"/\",\n                  \"search\": \"\",\n                  \"hash\": \"\",\n                  \"key\": \"pwbb3b\"\n                }\n              }\n            },\n            \"stateType\": {\n              \"stateful\": true,\n              \"receiving\": true,\n              \"sending\": true\n            }\n          },\n          \"height\": 6,\n          \"depth\": 2,\n          \"x\": 716.3000000000001,\n          \"y\": 190\n        },\n        {\n          \"data\": {\n            \"name\": \"Switch\",\n            \"props\": {},\n            \"stateType\": {\n              \"stateful\": false,\n              \"receiving\": true,\n              \"sending\": true\n            }\n          },\n          \"height\": 5,\n          \"depth\": 3,\n          \"x\": 716.3000000000001,\n          \"y\": 285\n        },\n        {\n          \"data\": {\n            \"name\": \"ProtectedRoute\",\n            \"props\": {\n              \"exact\": true,\n              \"path\": \"/\",\n              \"component\": \"f component()\",\n              \"location\": {\n                \"pathname\": \"/\",\n                \"search\": \"\",\n                \"hash\": \"\",\n                \"key\": \"pwbb3b\"\n              },\n              \"computedMatch\": {\n                \"path\": \"/\",\n                \"url\": \"/\",\n                \"isExact\": true,\n                \"params\": {}\n              }\n            },\n            \"stateType\": {\n              \"stateful\": false,\n              \"receiving\": true,\n              \"sending\": true\n            }\n          },\n          \"height\": 4,\n          \"depth\": 4,\n          \"x\": 716.3000000000001,\n          \"y\": 380\n        },\n        {\n          \"data\": {\n            \"name\": \"Route\",\n            \"props\": {\n              \"exact\": true,\n              \"path\": \"/\",\n              \"location\": {\n                \"pathname\": \"/\",\n                \"search\": \"\",\n                \"hash\": \"\",\n                \"key\": \"pwbb3b\"\n              },\n              \"computedMatch\": {\n                \"path\": \"/\",\n                \"url\": \"/\",\n                \"isExact\": true,\n                \"params\": {}\n              },\n              \"render\": \"f render()\"\n            },\n            \"stateType\": {\n              \"stateful\": false,\n              \"receiving\": true,\n              \"sending\": true\n            }\n          },\n          \"height\": 3,\n          \"depth\": 5,\n          \"x\": 716.3000000000001,\n          \"y\": 475\n        },\n        {\n          \"data\": {\n            \"name\": \"Home\",\n            \"state\": {\n              \"graphData\": {\n                \"dates\": [\n                  \"2019-01-01\",\n                  \"2019-02-01\",\n                  \"2019-03-01\",\n                  \"2019-04-01\",\n                  \"2019-05-01\",\n                  \"2019-06-01\",\n                  \"2019-07-01\",\n                  \"2019-08-01\",\n                  \"2019-09-01\",\n                  \"2019-10-01\",\n                  \"2019-11-01\",\n                  \"2019-12-01\"\n                ],\n                \"balances\": [\n                  \"1000\",\n                  \"1077.8292851314\",\n                  \"1056.9707208628106\",\n                  \"1011.4230105318165\",\n                  \"1280.4601643568963\",\n                  \"1246.5236049556274\",\n                  \"1594.2490714050964\",\n                  \"1397.9523718173732\",\n                  \"1035.1826098757933\",\n                  \"1138.2455309109264\",\n                  \"1911.4746773973525\",\n                  \"1002.9841051342213\"\n                ]\n              }\n            },\n            \"props\": {\n              \"history\": {\n                \"length\": 5,\n                \"action\": \"PUSH\",\n                \"location\": {\n                  \"pathname\": \"/\",\n                  \"search\": \"\",\n                  \"hash\": \"\",\n                  \"key\": \"pwbb3b\"\n                }\n              },\n              \"location\": {\n                \"pathname\": \"/\",\n                \"search\": \"\",\n                \"hash\": \"\",\n                \"key\": \"pwbb3b\"\n              },\n              \"match\": {\n                \"path\": \"/\",\n                \"url\": \"/\",\n                \"isExact\": true,\n                \"params\": {}\n              }\n            },\n            \"stateType\": {\n              \"stateful\": true,\n              \"receiving\": true,\n              \"sending\": true\n            }\n          },\n          \"height\": 2,\n          \"depth\": 6,\n          \"x\": 606.1,\n          \"y\": 570\n        },\n        {\n          \"data\": {\n            \"name\": \"Navbar\"\n          },\n          \"height\": 0,\n          \"depth\": 6,\n          \"x\": 826.5,\n          \"y\": 570\n        },\n        {\n          \"data\": {\n            \"name\": \"TitleBar\",\n            \"props\": {\n              \"title\": \"Home\"\n            },\n            \"stateType\": {\n              \"stateful\": false,\n              \"receiving\": true,\n              \"sending\": true\n            }\n          },\n          \"height\": 1,\n          \"depth\": 7,\n          \"x\": 330.6,\n          \"y\": 665\n        },\n        {\n          \"data\": {\n            \"name\": \"Card\",\n            \"props\": {\n              \"data\": {\n                \"dates\": [\n                  \"2019-01-01\",\n                  \"2019-02-01\",\n                  \"2019-03-01\",\n                  \"2019-04-01\",\n                  \"2019-05-01\",\n                  \"2019-06-01\",\n                  \"2019-07-01\",\n                  \"2019-08-01\",\n                  \"2019-09-01\",\n                  \"2019-10-01\",\n                  \"2019-11-01\",\n                  \"2019-12-01\"\n                ],\n                \"balances\": [\n                  \"1000\",\n                  \"1077.8292851314\",\n                  \"1056.9707208628106\",\n                  \"1011.4230105318165\",\n                  \"1280.4601643568963\",\n                  \"1246.5236049556274\",\n                  \"1594.2490714050964\",\n                  \"1397.9523718173732\",\n                  \"1035.1826098757933\",\n                  \"1138.2455309109264\",\n                  \"1911.4746773973525\",\n                  \"1002.9841051342213\"\n                ]\n              }\n            },\n            \"stateType\": {\n              \"stateful\": false,\n              \"receiving\": true,\n              \"sending\": true\n            }\n          },\n          \"height\": 1,\n          \"depth\": 7,\n          \"x\": 881.6,\n          \"y\": 665\n        },\n        {\n          \"data\": {\n            \"name\": \"Title\",\n            \"props\": {\n              \"title\": \"Home\"\n            },\n            \"stateType\": {\n              \"stateful\": false,\n              \"receiving\": true,\n              \"sending\": false\n            }\n          },\n          \"height\": 0,\n          \"depth\": 8,\n          \"x\": 220.4,\n          \"y\": 760\n        },\n        {\n          \"data\": {\n            \"name\": \"AccountIcon\"\n          },\n          \"height\": 0,\n          \"depth\": 8,\n          \"x\": 440.8,\n          \"y\": 760\n        },\n        {\n          \"data\": {\n            \"name\": \"PlotlyComponent\",\n            \"props\": {\n              \"data\": [\n                {\n                  \"x\": [\n                    \"2019-01-01\",\n                    \"2019-02-01\",\n                    \"2019-03-01\",\n                    \"2019-04-01\",\n                    \"2019-05-01\",\n                    \"2019-06-01\",\n                    \"2019-07-01\",\n                    \"2019-08-01\",\n                    \"2019-09-01\",\n                    \"2019-10-01\",\n                    \"2019-11-01\",\n                    \"2019-12-01\"\n                  ],\n                  \"y\": [\n                    \"1000\",\n                    \"1077.8292851314\",\n                    \"1056.9707208628106\",\n                    \"1011.4230105318165\",\n                    \"1280.4601643568963\",\n                    \"1246.5236049556274\",\n                    \"1594.2490714050964\",\n                    \"1397.9523718173732\",\n                    \"1035.1826098757933\",\n                    \"1138.2455309109264\",\n                    \"1911.4746773973525\",\n                    \"1002.9841051342213\"\n                  ],\n                  \"mode\": \"none\",\n                  \"type\": \"scattergl\",\n                  \"fill\": \"tozeroy\",\n                  \"fillcolor\": \"#4BA4F4\"\n                }\n              ],\n              \"layout\": {\n                \"width\": 320,\n                \"height\": 240,\n                \"margin\": {\n                  \"l\": 30,\n                  \"r\": 10,\n                  \"b\": 30,\n                  \"t\": 10\n                },\n                \"yaxis\": {\n                  \"range\": [\n                    500,\n                    2000\n                  ],\n                  \"type\": \"linear\"\n                },\n                \"xaxis\": {\n                  \"type\": \"date\"\n                }\n              },\n              \"config\": {\n                \"displayModeBar\": false\n              },\n              \"debug\": false,\n              \"useResizeHandler\": false,\n              \"style\": {\n                \"position\": \"relative\",\n                \"display\": \"inline-block\"\n              }\n            },\n            \"stateType\": {\n              \"stateful\": false,\n              \"receiving\": true,\n              \"sending\": false\n            }\n          },\n          \"height\": 0,\n          \"depth\": 8,\n          \"x\": 881.6,\n          \"y\": 760\n        }\n      ]\n\n\n//# sourceURL=webpack:///./extension/devtools/panel/search-example.js?");

/***/ })

/******/ });