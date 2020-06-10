/* eslint-env browser */
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

    this.parent.append();
    // if (component.state) this.state =
  }

  displayChildren(arr) {
    if (this.parent === 1) console.log('ay');

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
    }
    //   else {
    //     // if object
    //     Object.keys(input).forEach((elem) => {
    //       const li = document.createElement('li');
    //       li.append(displayComposite(elem));
    //       ul.appendChild(li);
    //     });
    //   }

    details.append(summary, list);
    return details;
  }
}

module.exports = ComponentDisplay;
