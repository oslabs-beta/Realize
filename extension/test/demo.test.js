// const displayComposite = require('../devtools/panel/panel.js');
// jest will execute all .test.js files on execution of 'npm run test'

function displayComposite(obj) {
  return 1;
  // // create container
  // const dropList = document.createElement('div');
  // dropList.innerHTML = `<details>
  //                         </details>`;
  // // either array or object
  // if (Array.isArray(obj)) {
  //   const summary = document.createElement('summary');
  //   const list = document.createElement('li');
  //   summary.innerHTML = 'Array';
  //   dropList.children[0].appendChild(summary);
  //   obj.forEach((elem) => {
  //     const item = document.createElement('li');
  //     item.append(typeof elem === 'object' ? displayComposite(elem) : elem);
  //     // ${stateObject[property]}
  //     // is parent the parent node or the parent object?
  //   });
  // }
}

it('dom manipulation', () => {
  const text = 'text';
  const pTag = document.createElement('p');
  pTag.innerHTML = text;

  expect(pTag.innerHTML).toBe('text');
});

it('function test', () => {
  // set up environment
  const dataObj = [
    [1, 2],
    [3, 4],
  ];

  const infoPanel = document.createElement('div');

  // execution of what's being tested
  const val = displayComposite(dataObj);

  // check that everything looks good
  expect(val).toBe(1);

  expect(val.children.length).toBe(1);
  expect(val.children[0].children.length).toBe(2);
});
