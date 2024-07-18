// console.log("Hello");

// const parent = document.getElementById('root');

// const ul = document.createElement("ul");

// ul.style.listStyleType = "none";
// ul.style.display = "block";
// ul.style.width = "400px";
// ul.style.padding = "24px";
// ul.style.margin = "48px auto";
// ul.style.backgroundColor = "yellow";

// const l1 = document.createElement("li");
// l1.textContent = "Item 1";

// const l2 = document.createElement("li");
// l2.textContent = "Item 2";

// ul.appendChild(l1);
// ul.appendChild(l2);

// parent.appendChild(ul);

// const parent = document.getElementById('root');
// //React

// const listItem1=React.createElement("li",{},"Item1");
// const listItem2=React.createElement("li",{},"Item1");
// const list=React.createElement("ul",{},[listItem1,listItem2]);

// const root=ReactDOM.createRoot(parent);
// root.render(list);

// const parent = document.getElementById("root");

// const l1 = <li>item 1</li>;

// const list = <ul>{l1}</ul>;

// const root = ReactDOM.createRoot(parent);
// root.render(list);

const parent = document.getElementById("root");
const root = ReactDOM.createRoot(parent);
//Jsx element must have a parent

const textHello = <h3>Hello</h3>;

const TextFrom = () => {
  return <h3>From</h3>;
};
const textReact = () => <h3>React</h3>;
const container = (
  <div>
    {textHello}
    <TextFrom />
    {textReact()}
  </div>
);

root.render(container);
