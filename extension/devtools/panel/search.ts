// It works with Common JS File
const d3 = require('../../libraries/d3.min.js')

let result = document.querySelector('.result');

  // make it all lowercase
 function autoComplete(input) {
  //  Grab all nodes use d3.selectalcll
  // replicate filter using d3 method -> d3 object of filters
    let allNodes = d3.selectAll('circle.node');
    return allNodes.filter(e =>e.data.name.toLowerCase().includes(input.toLowerCase()));
 }

function getValue(val){
    
     // if no value, have an empty page, 
     if(!val){
       result.innerHTML='';
       return
     }
   
     // search goes here 
     let data = autoComplete(val);
    
    
    // append list data
     let res = '';
     data.each(e=>{
        res += '<li>'+e.data.name+'</li>';
     })
  
     result.innerHTML = res;
 }

// export { getValue }
export default getValue;
