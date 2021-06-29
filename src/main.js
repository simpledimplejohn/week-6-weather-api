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

    function result() {
      if (inputtedParameter === "lat-lon") {
        return `http://api.openweathermap.org/data/2.5/weather?${inputtedParameter}=${choice}&appid=${process.env.API_KEY}`;
      } else if (inputtedParameter === "id") {
        return `http://api.openweathermap.org/data/2.5/weather?${inputtedParameter}=${choice}&appid=${process.env.API_KEY}`;
        
      } else if (inputtedParameter === "q") {
        return`http://api.openweathermap.org/data/2.5/weather?${inputtedParameter}=${choice}&appid=${process.env.API_KEY}`;
    
      } else if (inputtedParameter === "zip") {
        return `http://api.openweathermap.org/data/2.5/weather?${inputtedParameter}=${choice}&appid=${process.env.API_KEY}`;
        
      } else {
        return "Try again!";
      }
  
    }
    console.log(result());
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = result();
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
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      $('.showPressure').text(`The pressure is ${body.main.pressure} inHg²`);
      $('.showClouds').text(`The cloud coverage is: ${body.weather[0].description}`)
      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
      $('showHumidity').text("");
      $('.showTemp').text("");
      $('.showPressure').text("");
      $('.showClouds').text("");
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
//   $('.showPressure').text(`The pressure is ${response.main.pressure} inHg²`);
//   $('.showClouds').text(`The cloud coverage is: ${response.weather[0].description}`);
// }
/* eslint-enable no-debugger */