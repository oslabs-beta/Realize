"use strict";
exports.__esModule = true;
// It works with Common JS File
var d3 = require('../../libraries/d3.js');
var result = document.querySelector('.result');
// make it all lowercase
function addSearchListener(valuesArray) {
    function autoComplete(input) {
        //  Grab all nodes use d3.selectalcll
        // replicate filter using d3 method -> d3 object of filters
        return valuesArray.filter(function (e) { return e.toLowerCase().includes(input.toLowerCase()); });
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
        data.forEach(function (e) {
            res += '<li>' + e + '</li>';
            console.log('hi');
        });
        result.innerHTML = res;
        // Result
        //console.log('The components:~!!!', result); // Holds the name of the variables in a <li><li>
    }
    var searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', function () {
        var searchInput = document.getElementById('searchInput');
        var value = searchInput.value;
        getValue(value);
    });
}
// export { getValue }
exports["default"] = addSearchListener;
