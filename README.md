![Logo](./assets/LogoAnimSmall.gif)
# Realize For React

As React applications scale, it becomes more difficult to track state and to have a holistic overview of the component hierarchy. Realize is a tool to help developers visualize the structure and state flow of their React applications, especially when they are growing in scale and complexity. It currently supports React v.16.8.

## 👩‍💻 How to use it 
1. Install the extension from the [Chrome](https://chrome.google.com/webstore/detail/realize-for-react/llondniabnmnappjekpflmgcikaiilmh) or [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/realizeforreact/) stores
2. Navigate to your React website
3. Open the dev tools window and select the Realize Panel
4. Trigger a state change to see the component tree populate

  
**Prerequisites**
- Realize requires React Dev Tools to be installed before use.
- Realize is best used on non-deployed applications. This uglification of deployed websites makes the component structure pretty unreadable.
  
## 🔥 Key Features  
**Zoom & Pan** - Hold down shift to enable dragging and zooming on the tree (to recenter just click the center button)  
**Component Focus** - Click on a node to view state, props and children in the right and panel  
**State Flow** - Click the 'state' toggle to show state flow on the tree. Stateful components have blue nodes and state flow is show by blue links  
**Search and Highlight** - Enter a component name in the search bar to see all matching nodes pulsate  

## 💻 Installing locally 
1. Clone the repo onto your computer `git clone https://github.com/oslabs-beta/Realize`
2. Run `npm i` from inside the root directory
3. Run `npm build`
4. Load the extension from the `build/extension` folder into your browser of choice:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Firefox, navigate to `about:debugging#/runtime/this-firefox` and click Load Temporary Addon  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Chrome, navigate to `chrome://extensions/` toggle developer mode on and click Load Unpacked  
5. Follow steps 2 onwards from the 'How to use it' section


## Authors
Fan Shao - [Github](https://github.com/fansfansfansfans) | [LinkedIn](https://www.linkedin.com/in/fan-shao-85312ab4/)  
Harry Clifford - [Github](https://github.com/HpwClifford/) | [LinkedIn](https://www.linkedin.com/in/harry-clifford-3788951a9/)  
Henry Black - [Github](https://github.com/blackhaj) | [LinkedIn](https://www.linkedin.com/in/henryblack1/)  
Horatiu Mitrea - [Github](https://github.com/hmitrea) | [LinkedIn](https://www.linkedin.com/in/horatiu-mitrea-515704137/)  

## Contact
You can contact us personally through our LinkedIn accounts (links above) or as a team via [realizeforeact@gmail.com](mailto:realizeforeact@gmail.com)

## Contributing
We would love for you to test out our extensions and submit any issues you encounter. Feel free to fork to your own repo and submit PRs. Some features we would like to add:
1. Performance data on render times
2. Expanding/collapsing nodes
3. Autocomplete on search


### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
