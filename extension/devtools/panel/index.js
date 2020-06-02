// document.addEventListener("DOMContentLoaded", ready)

// mock data
let mockData = [
  {
    componentName: "apple",
    state: {
      toDoInput: true,
      numApples: 3,
      somethingRandomHere: "this is a random string",
      hahaha: [2, 3, 'yes']
    },
    props: {
      randomProp: 'example'
    },
    children: ["miniApples", "roundApples", "flatApples"]
  },
  {
    componentName: "radishes",
    state: {
      toDoInput: true,
      numApples: 3,
      somethingRandomHere: "this is a random string",
      hahaha: [2, 3, 'yes']
    },
    props: {
      randomProp: 'example'
    },
    children: ["miniApples", "roundApples", "flatApples"]
  },

]


// mockData.forEach((el) => {
//   function extractState(info){
//     // check if it's an array vs if it's an object, and if recursive calls need to be made?
//     // for children just need to do it 1 layer deep 


//     let keys = Object.keys(info)
//     let value = Object.values(info)

//     keys.map
  
//     for (let i = 0; i < keys.length; i++){
//       // let text = document.createTextNode(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${keys[i]}</b> : ${value[i]} <br />`)
//       // let span = document.createElement('span')
//       // span.innerHTML= `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${keys[i]}</b> : ${value[i]} <br />`
//       // console.log('current key and value', keys, value)
//       // console.log('what is state', state)
//       // document.body.panelDisplay.state.childNodes[i] 
//       let p = document.createElement('p')
//       p.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${keys[i]}</b> : ${value[i]} <br />`
      
//     }
    
//     details.addEventListener("toggle", event => {
//       if (details.open) {
//         /* the element was toggled open */
//         // summary
        
//       } else {
//         /* the element was toggled closed */
//         summary.removeChild(p)
//       }
//     });
    

    
//   }

  

//   let details = document.createElement('details')
//   let summary = document.createElement('summary')

//   let panelDisplay = document.createElement('div')
//   panelDisplay.classList.add('panelDisplay')

//   let componentName = document.createElement('div')
//   componentName.classList.add('componentName')

//   let state = document.createElement('div')
//   state.classList.add('state')

//   let props = document.createElement('div')
//   props.classList.add('props')

//   let children = document.createElement('div')
//   children.classList.add('children')

//   let p = document.createElement('p')

  
//   document.body.append(panelDisplay)
//   componentName.innerHTML = `<b>Component Name</b> ${el.componentName}`;
//   panelDisplay.appendChild(componentName)

//   panelDisplay.appendChild(details)

//   summary.innerHTML = `<b>State</b>`
//   details.appendChild(summary)
//   summary.appendChild(`${extractState(el.state)}`)

//   // panelDisplay.appendChild(state)
//   // state.innerHTML += ` ${extractState(el.state)}`
//   // state.appendChild(span)
//   panelDisplay.appendChild(state)
  
  
//   props.innerHTML = `<b>Props</b> ${JSON.stringify(el.props)}`
//   panelDisplay.appendChild(props)
//   children.innerHTML = `<b>Children</b> ${JSON.stringify(el.children)}`
//   panelDisplay.appendChild(children)

//   document.body.append(p)




  
// })

function extractState(stateObj, list) {
  Object.keys(stateObj).forEach((key) => {
    console.log('list:', list);
    const item = document.createElement('li');
    item.innerHTML = `key: ${key} value: ${stateObj[key]}`;
    list.appendChild(item);
  });
}


let epcot = document.createElement('div');
epcot.innerHTML = `<details>
  <summary>Epcot Center</summary>
  <ul id="list" >
  </ul>
</details>`

document.body.append(epcot);

const list = document.getElementById('list');
extractState(mockData[0], list);
























