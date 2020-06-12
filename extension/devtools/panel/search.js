"use strict";
exports.__esModule = true;
// It works with Common JS File
var d3 = require('../../libraries/d3.min.js');
var result = document.querySelector('.result');
// make it all lowercase
function autoComplete(input) {
    //  Grab all nodes use d3.selectalcll
    // replicate filter using d3 method -> d3 object of filters
    var allNodes = d3.selectAll('circle.node');
    return allNodes.filter(function (e) { return e.data.name.toLowerCase().includes(input.toLowerCase()); });
}
function getValue(val) {
    // if no value, have an empty page, 
    if (!val) {
        result.innerHTML = '';
        return;
    }
    // search goes here 
    var data = autoComplete(val);
    // append list data
    var res = '';
    data.each(function (e) {
        res += '<li>' + e.data.name + '</li>';
    });
    result.innerHTML = res;
}
// export { getValue }
exports["default"] = getValue;
