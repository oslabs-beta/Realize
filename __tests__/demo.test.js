/* eslint-disable no-use-before-define */
/* eslint-env jest */
/* eslint-env browser */
const ComponentDisplay = require('../extension/devtools/panel/componentDisplay');
// const displayComposite = require('../devtools/panel/panel');

describe('ComponentDisplay class testing', () => {
  let CD;
  const testName = 'test';

  beforeEach(() => {
    const parent = document.createElement('div');
    CD = new ComponentDisplay({ name: testName }, parent);
  });

  it('class instantiates', () => {
    expect(CD.component.name).toBe(testName);
  });

  it('displays children', () => {
    const testArr = [1, 2, 3];

    const result = CD.displayChildren(testArr);

    const target = document.createElement('details');
    target.innerHTML = formatHTML`<summary>Children</summary>
                                  <ul>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                  </ul>`;

    expect(result.isEqualNode(target)).toBe(true);
  });

  it('displays arrays', () => {
    // set up environment
    const testObj = [
      [1, 2],
      [3, 4],
    ];

    // receive result from targetted function
    const result = CD.displayData(testObj);

    // create target node
    const target = document.createElement('details');
    target.innerHTML = formatHTML`<summary>Array</summary>
                                  <ol start="0">
                                    <li>
                                      <details>
                                        <summary>Array</summary>
                                        <ol start="0">
                                          <li>1</li>
                                          <li>2</li>
                                        </ol>
                                      </details>
                                    </li>
                                    <li>
                                      <details>
                                      <summary>Array</summary>
                                        <ol start="0">
                                          <li>3</li>
                                          <li>4</li>
                                        </ol>
                                      </details>
                                    </li>
                                  </ol>`;

    // compare nodes
    expect(result.innerHTML === target.innerHTML).toBe(true);
    expect(result.isEqualNode(target)).toBe(true);
  });
});

xit('panel display', () => {
  // create environment
  const infoPanel = document.createElement('div');
  infoPanel.id = 'info-panel';
});

it('isEqualNode test', () => {
  const test1 = document.createElement('div');
  const div = document.createElement('div');
  const div2 = document.createElement('div');
  div.append(div2);
  test1.append(div);

  const test2 = document.createElement('div');
  test2.innerHTML = formatHTML`<div>
                                <div>
                                </div>
                              </div>`;

  expect(test1.isEqualNode(test2)).toBe(true);
});

function formatHTML(strings) {
  return strings[0]
    .split('\n')
    .map((s) => s.trim())
    .join('');
}
