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
  
  // If the name we look for is not found -1
  return result.length == 0 ? -1 : result
  
}

module.exports = findComp;
