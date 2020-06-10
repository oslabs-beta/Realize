// Recursively go over the tree until we find the name of a component
function findComp(arr, name) {
  const result = [];

  // Iterate over the array(one we get from D3)
  
  arr.forEach((elem) => {
    if (elem.data && elem.data.name === name) {
      const { data, ...clone } = elem;
      result.push(clone);
    } 
  });
  
  // If the name we look for is not found or found
  return result.length == 0 ? -1 : result
  
}


function autoComplete(input) {
  let reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
  return input.filter(function(input) {
    if (input.match(reg)) {
      return input;
    }
  });
}



module.exports = findComp;
