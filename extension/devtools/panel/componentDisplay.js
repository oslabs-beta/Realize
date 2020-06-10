/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-env browser */

// parent: everything in the infopanel div
class ComponentDisplay {
  constructor(obj, parent) {
    this.component = {
      name: obj.name,
    };
    this.parent = parent;
    // this.update(obj);
  }

  update(component) {
    // clear
    this.parent.innerHTML = '';
    const compObj = {};

    // conditionals
    // if (component.state) this.state = displayState(component.state);
    if (component.children)
      compObj.children = this.displayChildren(component.children);

    // append node/nodes
    this.parent.append();
  }

  displayChildren(arr) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const list = document.createElement('ul');
    summary.textContent = 'Children';

    arr.forEach((child) => {
      const item = document.createElement('li');
      item.textContent = child;
      list.append(item);
    });

    details.append(summary, list);

    return details;
  }

  displayState(input) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const p = document.createElement('p');
    summary.textContent = 'State';

    p.append(this.displayData(input));
    details.append(summary, p);
  }

  //   displayProps(input) {}

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
      list = document.createElement('ol');
      list.start = '0';
      input.forEach((elem) => {
        const li = document.createElement('li');
        li.append(this.displayData(elem));
        list.appendChild(li);
      });
    } else {
      // if object
      summary.textContent = 'Object';
      list = document.createElement('ul');
      Object.keys(input).forEach((key) => {
        const li = document.createElement('li');
        li.append(`${key}`, this.displayData(input[key]));
        list.appendChild(li);
      });
    }

    details.append(summary, list);
    return details;
  }
}

module.exports = ComponentDisplay;
