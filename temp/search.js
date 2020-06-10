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

  return result;
}

module.exports = findComp;
