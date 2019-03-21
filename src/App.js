import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";

import Routes from "./views/Routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
