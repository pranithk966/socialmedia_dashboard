// the beginning for the whole web 
// use this index.js file to render App function from App.js in the section whose id is "root" from index.html

// npm install react-scripts react react-dom
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";

// import App from App.js to render
import App from "./App";

// use .render() function from ReactDOM to render (渲染) in the section whose id is "root"
ReactDOM.render(<App />, document.getElementById("root"));