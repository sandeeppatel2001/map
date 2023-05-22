"use strict";
let map;
let mapEvent;
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(latitude, longitude);
      console.log(
        `https://www.google.com/maps/@26.8469461,${longitude},${latitude}`
      );
      const cords = [latitude, longitude];
      map = L.map("map").setView(cords, 10);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(cords)
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();
      map.on("click", function (mapE) {
        mapEvent = mapE;
        // console.log(mapEvent);
        // const { lat, lng } = mapEvent.latlng;
        // const cord = [lat, lng];
        form.classList.remove("hidden");
        inputDistance.focus();
        // L.marker(cord)
        //   .addTo(map)
        //   .bindPopup("you are currently here")
        //   .openPopup();
        //   L.marker(cord)
        //     .addTo(map)
        //     .bindPopup(
        //       L.popup({
        //         maxWidth: 250,
        //         minWdth: 100,
        //         autoClose: false,
        //         CloseOnClick: true,
        //         className: "running-popup",
        //       })
        //     )
        //     .setPopupContent("workout")
        //     .openPopup();
        // });
      });
    },
    function () {
      alert("can not find location");
    }
  );
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const { lat, lng } = mapEvent.latlng;
  const cord = [lat, lng];
  L.marker(cord).addTo(map).bindPopup("you are currently here").openPopup();
  L.marker(cord)
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWdth: 100,
        autoClose: false,
        CloseOnClick: true,
        className: "running-popup",
      })
    )
    .setPopupContent("workout")
    .openPopup();
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      " ";
});
inputType.addEventListener("change", function () {
  inputElevation.closest(".form_row").ClassList.toggle("form__row--hidden");
  // inputCadence.closest(".form_row").ClassList.toggle("form__row--hidden");
});
