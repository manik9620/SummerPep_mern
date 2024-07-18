import ReactDOM from "react-dom/client";

const parent = document.getElementById("root")
const root=ReactDOM.createRoot(parent);

const App=()=>{
return <h2>Hello from React</h2>;
}

root.render(<App/>);