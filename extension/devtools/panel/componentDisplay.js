/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-env browser */

// parent: reference to infopanel dom node
// obj: component being sent by the tree (node)
class ComponentDisplay {
  constructor(parent) {
    this.parent = parent;
  }

  update(component) {
    // clear
    this.parent.innerHTML = '';
    const compArr = [];

    // conditionals to load compArr based on component properties
    if (component.state) {
      // if functional state
      if (
        component.hooks &&
        component.hooks.some((hook) => hook === 'useState')
      ) {
        compArr.push(this.displayState(component.state, true));
      } else {
        compArr.push(this.displayState(component.state, false));
      }
    }
    if (component.props) compArr.push(this.displayProps(component.props));
    if (component.children)
<<<<<<< HEAD
      compObj.children = this.displayChildren(component.children);
    if (component.props) compObj.props = this.displayProps(component.props);
    // adding a check for hooks
    // if (component.)
=======
      compArr.push(this.displayChildren(component.children));
>>>>>>> 0a95ff25c768a271682bea1c2dc544e4e8fb76d4

    // append node/nodes from compArr
    this.parent.append(...compArr);
  }

  displayChildren(arr) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const list = document.createElement('ul');
    summary.textContent = 'Children';

    arr.forEach((child) => {
      const item = document.createElement('li');
      item.textContent = child.name;
      list.append(item);
    });

    details.append(summary, list);

    return details;
  }

  displayState(input, usedHooks) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const list = document.createElement('ul');
    summary.textContent = 'State';

    if (usedHooks) {
      input.forEach((stateValue) => {
        const li = document.createElement('li');
        li.append(this.displayData(stateValue));
        list.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.append(this.displayData(input));
      list.appendChild(li);
    }

    details.append(summary, list);
    return details;
  }

  displayProps(input) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const list = document.createElement('ul');
    summary.textContent = 'Props';

    Object.keys(input).forEach((prop) => {
      const li = document.createElement('li');
      li.append(`${prop}: `, this.displayData(input[prop]));
      list.appendChild(li);
    });

    details.append(summary, list);
    return details;
  }

  // recursive function for composite data types
  displayData(input) {
    // base case
    if (typeof input !== 'object') return input;

    const details = document.createElement('details');
    const summary = document.createElement('summary');
    let list;

    if (Array.isArray(input)) {
      // if array
      summary.textContent = 'Array';
      // if empty
      if (input.length === 0) {
        list = document.createElement('ul');
        const li = document.createElement('li');
        li.textContent = 'empty array';
        list.appendChild(li);
      } else {
        list = document.createElement('ol');
        list.start = '0';
        input.forEach((elem) => {
          const li = document.createElement('li');
          li.append(this.displayData(elem));
          list.appendChild(li);
        });
      }
    } else {
      // if object
      summary.textContent = 'Object';
      list = document.createElement('ul');
      Object.keys(input).forEach((key) => {
        const li = document.createElement('li');
        li.append(`${key}: `, this.displayData(input[key]));
        list.appendChild(li);
      });
    }

    details.append(summary, list);
    return details;
  }


  displayHooks(){
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const list = document.createElement('list');

  
  }
}

<<<<<<< HEAD

export default ComponentDisplay;
=======
module.exports = ComponentDisplay;
>>>>>>> 0a95ff25c768a271682bea1c2dc544e4e8fb76d4
