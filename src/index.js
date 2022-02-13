"use strict";

import { weatherAPI } from "../src/weatherAPI";
import { geo } from "../src/geolocalization";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

const Init = () => {
  window.addEventListener("keydown", keyInput);

  //call geo functions when the page is loaded
  window.onload = () => {
    geo.getLocation();
  };

  //keyboard support
  function keyInput(e) {
    if (e.key === "Enter") {
      callAPI();
    }
  }

  const listener = () => {
    document.querySelector(".searchbutton").addEventListener("click", () => {
      callAPI();
    });
  };

  const callAPI = () => {
    document.querySelector(".background").style.display = "flex";
    weatherAPI.fetchData();
  };
  return { listener };
};

const index = Init();
index.listener();
