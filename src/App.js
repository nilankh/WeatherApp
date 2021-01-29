import React, { Component } from "react";
import UserLocation from "./components/UserLocation.js";
import Navbar from "./components/Navbar.js";
import Axios from "axios";
import "./App.css";
import "./index.css";


class App extends Component {
  // Statte
  state = {
    coords: {
      latitude: 45,
      longitude: 60,
    },
    weather: {},
    regionInput: "",
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
    }
  }
  // Update the value of the input field with state
  changeRegion = (value) => {
    this.setState({ regionInput: value });
  };

  //update the weather depending upon the value user entered
  changeLocation = (e) => {
    e.preventDefault();

    Axios.get(
      `http://api.weatherstack.com/current?access_key=ee2c00a09ba65e4467143d28625d3fa2&query=${this.state.regionInput}`
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
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Navbar
            changeRegion={this.changeRegion}
            changeLocation={this.changeLocation}
          />
          <UserLocation weather={this.state.weather} />
        </div>
      </div>
    );
  }
}
export default App;
