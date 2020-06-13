// It works with Common JS File
const d3 = require('../../libraries/d3.min.js')

let result = document.querySelector('.result');

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
       console.log('hi');
    })

 
    result.innerHTML = res;

    // Result
    //console.log('The components:~!!!', result); // Holds the name of the variables in a <li><li>


  } 

  let searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keyup', () => {
    const searchInput: HTMLInputElement = document.getElementById('searchInput') as HTMLInputElement
    const value: string = searchInput.value

    getValue(value)
  })
}


// export { getValue }
export default addSearchListener;
