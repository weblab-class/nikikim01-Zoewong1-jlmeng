import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import reportWebVitals from './reportWebVitals.js';

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.render(<App />, document.getElementById("root"));

// allows for live updating
module.hot.accept();

reportWebVitals();

const Vue = require('vue');
const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users/1';

const app = new Vue({
  data: () => ({ user: '' }),
  template: `
    <div>
      Hello, {{user}}
    </div>
  `,
  mounted: function() {
    axios.get(url).
      then(res => res.data.name).
      then(user => { this.user = user; }).
      catch(err => console.log(err));
  }
});