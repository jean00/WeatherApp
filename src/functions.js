"use strict";

const Methods = () => {
  const isChecked = (obj, forecastArray) => {
    let temperature = obj.temperature;
    let wind_speed = obj.windspeed;
    if (document.querySelector(".toggle").checked === true) {
      convertToCustomary(temperature, wind_speed);
      convertToCustomaryArray(forecastArray);
    } else {
      convertToMetric(temperature, wind_speed);
      convertToMetricArray(forecastArray);
    }
  };

  const convertToMetric = (temperature, wind_speed) => {
    if (
      document.querySelector(".temperature").textContent !== "" &&
      document.querySelector(".windspeed") !== ""
    ) {
      document.querySelector(".temperature").textContent = `${temperature}°C`;
      document.querySelector(
        ".windspeed"
      ).textContent = `windspeed: ${wind_speed}m/s`;
    }
  };

  const convertToCustomary = (temperature, wind_speed) => {
    let conversion = temperature * 1.8 + 32,
      convmeter = wind_speed * 2.237;
    if (document.querySelector(".temperature").textContent !== "") {
      document.querySelector(".temperature").textContent = `${parseInt(
        conversion
      )}°F`;
      document.querySelector(
        ".windspeed"
      ).textContent = `windspeed: ${convmeter.toFixed(2)}mph`;
    }
  };

  const convertToMetricArray = (forecastArray) => {
    let conv;
    for (let i = 0; i < forecastArray.length; i++) {
      conv = parseInt(forecastArray[i].temp.day - 273.15);
      if (
        document.querySelector(`.avgtemp${i}`) !== "" &&
        document.querySelector(`.mintemp${i}`) !== "" &&
        document.querySelector(`.maxtemp${i}`) !== ""
      ) {
        document.querySelector(`.avgtemp${i}`).textContent = `${parseInt(
          conv
        )}°C`;
        document.querySelector(
          `.mintemp${i}`
        ).textContent = `min. temp.: ${parseInt(conv)}°C`;
        document.querySelector(
          `.maxtemp${i}`
        ).textContent = `max. temp.: ${parseInt(conv)}°C`;
      }
      if (document.querySelector(`.winspeed${i}`) !== "") {
        document.querySelector(
          `.windspeed${i}`
        ).textContent = `windspeed: ${forecastArray[i].wind_speed}m/s`;
      }
    }
  };

  const convertToCustomaryArray = (forecastArray) => {
    let conv, convmeter;
    for (let i = 0; i < forecastArray.length; i++) {
      conv = parseInt(forecastArray[i].temp.day - 273.15) * 1.8 + 32;
      if (
        document.querySelector(`.avgtemp${i}`) !== "" &&
        document.querySelector(`.mintemp${i}`) !== "" &&
        document.querySelector(`.maxtemp${i}`) !== ""
      ) {
        document.querySelector(`.avgtemp${i}`).textContent = `${parseInt(
          conv
        )}°F`;
        document.querySelector(
          `.mintemp${i}`
        ).textContent = `min. temp.: ${parseInt(conv)}°F`;
        document.querySelector(
          `.maxtemp${i}`
        ).textContent = `max. temp.: ${parseInt(conv)}°F`;
      }
      convmeter = forecastArray[i].wind_speed * 2.237;
      if (document.querySelector(`.winspeed${i}`) !== "") {
        document.querySelector(
          `.windspeed${i}`
        ).textContent = `windspeed: ${convmeter.toFixed(2)}mph`;
      }
    }
  };

  return { isChecked };
};

const methods = Methods();

export { methods };
