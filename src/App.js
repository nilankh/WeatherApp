import React, { Component } from "react";
import "./App.css";

class App extends Component {
  // Statte
  state = {
    coords: {
      lattitude:45,
      longitude:60
    }
  }

  // Get device location
  componentDidMount() {
    if (navigator.geolocation) {
      // console.log("SUpported");
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.longitude);
        let newCoords = {
          lattitude:position.coords.latitude,
          longitude:position.coords.longitude
        }
      });
    } else {
      console.log("not supported");
    }
  }

  render() {
    return <div className="App"></div>;
  }
}

export default App;
