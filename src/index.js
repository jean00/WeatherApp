"use strict";

import { weatherAPI } from "../src/weatherAPI";
import { format } from "date-fns";
import { geo } from "../src/geolocalization";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

const Init = () => {
  const today = new Date();
  const formattedDate = format(today, "PPPP");
  window.addEventListener("keydown", keyInput);

  //call geo functions when the page is loaded
  window.onload = () => {
    geo.getLocation(formattedDate);
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
    document.querySelector(".date").textContent = formattedDate;
    weatherAPI.fetchData();
  };
  return { listener };
};

const index = Init();
index.listener();
