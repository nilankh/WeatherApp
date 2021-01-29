import React, { Component } from "react";
import Axios from "axios";
import "./App.css";

class App extends Component {
  // Statte
  state = {
    coords: {
      latitude: 45,
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
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({ coords: newCoords });

        // Calling API
        Axios.get(
          `http://api.weatherstack.com/current?access_key=b78694a07f8c247fa13237b76aa51e4e&query=${this.state.coords.latitude},${this.state.coords.longitude}`
        ).then((res) => {
          let userWeather = {
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons,
          };
          this.setState({ weather: userWeather });
        });
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
