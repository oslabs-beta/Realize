// It works with Common JS File
var d3 = require('../../libraries/d3.js');
var result = document.querySelector('.result');
// make it all lowercase
function addSearchListener(valuesArray) {

  function autoComplete(input) {
    //  Grab all nodes use d3.selectalcll
    // replicate filter using d3 method -> d3 object of filters
    return valuesArray.filter(e =>e.toLowerCase().includes(input.toLowerCase()));
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
    data.forEach(e=>{
       res += '<li>'+e+'</li>';
    })

 
    result.innerHTML = res;
  }
  
  let searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keyup', () => {
    const HTMLInputElement = document.getElementById('searchInput') 
    const value= searchInput.value

    getValue(value)
  })
  
  
}


export default addSearchListener;
