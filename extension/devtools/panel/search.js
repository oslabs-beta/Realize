// Recursively go over the tree until we find the name of a component
// function findComp(arr, name) {
//   const result = [];

//   // Iterate over the array(one we get from D3)
//   arr.forEach((elem) => {
//     if (elem.data && elem.data.name === name) {
//       const { data, ...clone } = elem;
//       result.push(clone);
//     } else {
//       return -1;
//     }
//   });

//   return result;
// }


let result = document.querySelector('.result');
// let arr = ['HTML', 'CSS', 'PHP', 'Javascript', 'Dart', 'Python', 'Swift', 'Java', 'C++','Go','SASS','C#','LISP','Perl', 'Ruby']

  // make it all lowercase
 function autoComplete(arr, input) {
  //  Grab all nodes use d3.selectall
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
     let data = autoComplete(arr,val);
    
    
    // append list data
     let res = '';
     data.each(e=>{
        res += '<li>'+e.data.name+'</li>';
     })
  
     result.innerHTML = res;
 }

export { getValue }
// module.exports = getValue;
