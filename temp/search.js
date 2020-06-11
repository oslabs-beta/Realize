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
let arr = ['HTML', 'CSS', 'PHP', 'Javascript', 'Dart', 'Python', 'Swift', 'Java', 'C++','Go','SASS','C#','LISP','Perl', 'Ruby']

  // make it all lowercase
 function autoComplete(arr, input) {
    return arr.filter(e =>e.toLowerCase().includes(input.toLowerCase()));
 }

function getValue(val){
    
     // if no value, have an empty page, 
     if(!val){
       result.innerHTML='';
       return
     }
     console.log('Hi, are we in?');
     // search goes here 
     let data = autoComplete(arr,val);
    
    
    // append list data
     let res = '';
     data.forEach(e=>{
        res += '<li>'+e+'</li>';
     })
  
     result.innerHTML = res;
 }

module.exports = findComp;
