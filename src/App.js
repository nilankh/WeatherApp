import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  // Statte
  state = {
    coords: {
      lattitude: 45,
      longitude: 60,
    },
  };

  // Get device location
  componentDidMount() {
    if (navigator.geolocation) {
      // console.log("SUpported");
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.longitude);
        let newCoords = {
          lattitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({ coords: newCoords });

        // Calling API
        axios.get(
          `http://api.weatherstack.com/current?access_key=b78694a07f8c247fa13237b76aa51e4e&query=${this.state.coords.latitude},${this.state.coords.longitude}`
        );
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
