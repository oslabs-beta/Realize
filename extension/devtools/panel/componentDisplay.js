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

    // add name of component
    compArr.push(this.displayName(component.name));

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
    // add the hook
    if (component.hooks) compArr.push(this.displayHooks(component.hooks));
    if (component.props) compArr.push(this.displayProps(component.props));
    if (component.children)
      compArr.push(this.displayChildren(component.children));

    // append node/nodes from compArr
    this.parent.append(...compArr);
  }

  displayName(name) {
    const div = document.createElement('div');
    div.classList.add('component-display-name');
    div.textContent = name;
    return div;
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
    summary.id = 'state';

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
    if (input === null) return null;

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
      const keys = Object.keys(input);
      list = document.createElement('ul');
      if (keys.length > 0) {
        keys.forEach((key) => {
          const li = document.createElement('li');
          li.append(`${key}: `, this.displayData(input[key]));
          list.appendChild(li);
        });
      } else {
        const li = document.createElement('li');
        li.append('empty object');
        list.appendChild(li);
      }
    }

    details.append(summary, list);
    return details;
  }

  displayHooks(input) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const list = document.createElement('ul');
    summary.textContent = 'Hooks';
    input.forEach((hook) => {
      const li = document.createElement('li');
      li.innerHTML = hook;
      list.appendChild(li);
    });

    details.append(summary, list);
    return details;
  }
}

module.exports = ComponentDisplay;
