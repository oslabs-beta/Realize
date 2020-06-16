// It works with Common JS File
const d3 = require('../../libraries/d3.min.js')
// import autoComplete from 'accessible-autocomplete'
const $ = require('jquery');
console.log('jquery: ', $);
// const $ui = require('jquery-ui');
let result = document.querySelector('.result');
 

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
       console.log('Jquery...: ', $);
    })

 
    result.innerHTML = res;

  }
  

  let searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keyup', () => {
    const HTMLInputElement = document.getElementById('searchInput') 
    const value= searchInput.value

    getValue(value)
  })

  // $(function() {
  //   var components = valuesArray;
  //   $( "#tags" ).autocomplete({
  //     source: components
  //   });
  // });
}



export default addSearchListener;
