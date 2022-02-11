"use strict";

import { ui } from "../src/ui";
import { methods } from "../src/functions";

const Weather = () => {
  let obj = {};
  let forecastArray = [];

  const getCoords = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=20f7632ffc2c022654e4093c6947b4f4`; //get longitudine and latitudine

  const buildURL = (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts,hourly&appid=03c2508b494fb368b84eb1ad97f619ff`; //get the exact cityname

  const getCity = () => document.querySelector(".searchbar").value;

  const fetchData = async () => {
    event.preventDefault();
    let city = getCity();
    try {
      const response = await fetch(getCoords(city.toLowerCase()), {
        mode: "cors",
      });
      const weather = await response.json();
      let name = [weather.name, weather.sys.country];
      const response2 = await fetch(
        buildURL(weather.coord.lat, weather.coord.lon),
        {
          mode: "cors",
        }
      );
      const forecast = await response2.json();
      document.querySelector(".background").style.display = "none";
      weatherobj(forecast, name);
      forecastObj(forecast);
    } catch (error) {
      errorHandler(error);
    }
  };

  const errorHandler = (error) => {
    document.querySelector(".background").style.display = "none";
    if (error instanceof TypeError) {
      alert("We couldn't find this city. Please try again");
    } else {
      alert("generic error. Please try again");
    }
  };

  const weatherobj = (weather, name) => {
    obj = {
      city: name[0],
      country: name[1],
      description: weather.current.weather[0].description,
      temperature: parseInt(weather.current.temp - 273.15),
      humidity: weather.current.humidity,
      windspeed: weather.current.wind_speed,
      visibility: weather.current.visibility / 1000,
      id: weather.current.weather[0].icon,
    };
    ui.displayCurrentWeather(obj);
    conventer(obj);
  };

  const forecastObj = (forecast) => {
    for (let i = 0; i < forecast.daily.length - 1; i++) {
      forecastArray[i] = forecast.daily[i + 1]; //excluding the [0] because it contains the current weather data that we don't need.
    }
    ui.displayForecastWeather(forecastArray);
  };

  const conventer = (obj) => {
    methods.isChecked(obj, forecastArray);
    document.querySelector(".toggle").addEventListener("click", () => {
      methods.isChecked(obj, forecastArray);
    });
  };

  return { fetchData, weatherobj, forecastObj, buildURL, errorHandler };
};

const weatherAPI = Weather();
export { weatherAPI };
