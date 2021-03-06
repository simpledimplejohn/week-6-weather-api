import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#location-form').submit(function(event) {
    
    const inputtedParameter = $("#weather-parameter option:selected").val();
    event.preventDefault();
    
    console.log(inputtedParameter);
  
    let choice = $('#location').val();
    console.log(choice);
    let url;
    if (inputtedParameter === "lat-lon") {
      let coords = choice.split(", "); 
      let lat = coords[0]; 
      let lon = coords[1];
      console.log("lat-lon", lat, lon)
      url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`;
    } else if (inputtedParameter === "id") {
      url = `http://api.openweathermap.org/data/2.5/weather?${inputtedParameter}=${choice}&appid=${process.env.API_KEY}`;
      
    } else if (inputtedParameter === "q") {
      url =  `http://api.openweathermap.org/data/2.5/weather?${inputtedParameter}=${choice}&appid=${process.env.API_KEY}`;
  
    } else if (inputtedParameter === "zip") {
      url = `http://api.openweathermap.org/data/2.5/weather?${inputtedParameter}=${choice}&appid=${process.env.API_KEY}`;
      
    } else {
      url = `http://api.openweathermap.org/data/2.5/weather?${inputtedParameter}=&appid=${process.env.API_KEY}`;
    }      
    let promise2 = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      //const url = resultSubmit();
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });  
    promise2.then(function(response) {
      const body = JSON.parse(response);
      console.log(body);
      $('.showHumidity').text(`The humidity is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      $('.showPressure').text(`The pressure is ${body.main.pressure} inHg??`);
      $('.showClouds').text(`The cloud coverage is: ${body.weather[0].description}`)
      $('.coordinates').text(`The coordinate location is ${body.coord.lat}, ${body.coord.lon} `)
      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
      $('showHumidity').text("");
      $('.showTemp').text("");
      $('.showPressure').text("");
      $('.showClouds').text("");
      $('.coordinates').text("");
    });
  });
});

/* eslint-disable no-debugger */
//let request = new XMLHttpRequest();

// request.onreadystatechange = function() {
//   if (this.readyState === 4 && this.status === 200) {
//     const response = JSON.parse(this.responseText);
//     getElements(response);
//   }
// };

// request.open("GET", url, true);
// request.send();

// function getElements(response) {
//   $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
//   $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
//   $('.showPressure').text(`The pressure is ${response.main.pressure} inHg??`);
//   $('.showClouds').text(`The cloud coverage is: ${response.weather[0].description}`);
// }

//http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key};
/* eslint-enable no-debugger */