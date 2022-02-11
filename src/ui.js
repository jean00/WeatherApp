"use strict";

import { fromUnixTime, format } from "date-fns";

const WebUI = () => {
  //current weather display elements
  const displayCurrentWeather = (obj) => {
    let id = obj.id;
    const city_name = document.querySelector(".name");
    const icon = document.querySelector(".iconimg");
    const temperature = document.querySelector(".temperature");
    const description = document.querySelector(".description");
    const humidity = document.querySelector(".humidity");
    const windspeed = document.querySelector(".windspeed");
    const visibility = document.querySelector(".visibility");
    const divinfos = document.querySelector(".listInfos");

    city_name.textContent = `${obj.city}, ${obj.country}`;
    icon.src = imagesrc(id);
    temperature.textContent = `${obj.temperature}°C`;
    description.textContent = obj.description;
    divinfos.setAttribute(
      "style",
      "  border-left: 1px solid black; height: 40px;"
    );
    humidity.textContent = `humidity: ${obj.humidity}%`;
    windspeed.textContent = `windspeed: ${obj.windspeed}m/s`;
    visibility.textContent = `visibility: ${obj.visibility}km`;
  };

  //forecast weather display elements

  const displayForecastWeather = (array) => {
    const section = document.querySelector(".forecasttext");
    const divinfos = document.querySelectorAll(".listInfos");
    let icon,
      day,
      desc,
      avgtemp,
      sunrise,
      sunset,
      maxtemp,
      mintemp,
      humidity,
      windspeed;

    section.textContent = "7-day forecast:";

    for (let i = 0; i < array.length; i++) {
      day = document.querySelector(`.day${i}`);
      day.textContent = format(fromUnixTime(array[i].dt), "PP");
      icon = document.querySelector(`.icon${i}`);
      icon.src = imagesrc(array[i].weather[0].icon);
      avgtemp = document.querySelector(`.avgtemp${i}`);
      avgtemp.textContent = `${parseInt(array[i].temp.day - 273.15)}°C`;
      desc = document.querySelector(`.description${i}`);
      desc.textContent = array[i].weather[0].description;
      sunrise = document.querySelector(`.sunrise${i}`);
      sunrise.textContent = `sunrise: ${format(
        fromUnixTime(array[i].sunrise),
        "p"
      )}`;
      sunset = document.querySelector(`.sunset${i}`);
      sunset.textContent = `sunset: ${format(
        fromUnixTime(array[i].sunset),
        "p"
      )}`;
      mintemp = document.querySelector(`.mintemp${i}`);
      mintemp.textContent = `min. temp.: ${parseInt(
        array[i].temp.min - 273.15
      )}°C`;
      maxtemp = document.querySelector(`.maxtemp${i}`);
      maxtemp.textContent = `max. temp.: ${parseInt(
        array[i].temp.max - 273.15
      )}°C`;
      humidity = document.querySelector(`.humidity${i}`);
      humidity.textContent = `humidity: ${array[i].humidity}%`;
      windspeed = document.querySelector(`.windspeed${i}`);
      windspeed.textContent = `windspeed: ${array[i].wind_speed}m/s`;
      divinfos[i + 1].setAttribute(
        "style",
        "  border-left: 1px solid black; height: max-content;"
      );
    }
  };

  const imagesrc = (id) => `https://openweathermap.org/img/wn/${id}@2x.png`; //search the img

  return { displayCurrentWeather, displayForecastWeather };
};

const ui = WebUI();
export { ui };
