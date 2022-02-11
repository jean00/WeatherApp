"use strict";

import { weatherAPI } from "../src/weatherAPI";

const Geocoding = () => {
  const reverseGeocoding = (lat, lon) =>
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=20f7632ffc2c022654e4093c6947b4f4`;

  const getLocation = (formattedDate) => {
    navigator.geolocation.getCurrentPosition((position) => {
      document.querySelector(".date").textContent = formattedDate;
      document.querySelector(".background").style.display = "flex";
      fetchData(position.coords.latitude, position.coords.longitude);
    }, geoErrorHandler);
  };

  const geoErrorHandler = (error) => {
    switch (error.code) {
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  };

  const fetchData = async (lat, lon) => {
    try {
      const response = await fetch(reverseGeocoding(lat, lon), {
        mode: "cors",
      });
      const geo = await response.json();
      let name = [geo[0].name, geo[0].country];
      const response2 = await fetch(weatherAPI.buildURL(lat, lon), {
        mode: "cors",
      });
      const weather = await response2.json();
      weatherAPI.weatherobj(weather, name);
      weatherAPI.forecastObj(weather);
      document.querySelector(".background").style.display = "none";
    } catch (error) {
      weatherAPI.errorHandler(error);
    }
  };

  return { getLocation };
};

const geo = Geocoding();

export { geo };
