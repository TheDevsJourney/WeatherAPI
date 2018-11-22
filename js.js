// Global Variables
var daysContainer = document.querySelector(".daysContainer");

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', "http://api.openweathermap.org/data/2.5/forecast?zip=62258,us&APPID=f944364aa52d97a834d54c3841d38464&cnt=40&units=imperial", true);

request.onload = function () {
  createElements();
}

// Send request
request.send();


function createElements(){
  // Begin accessing JSON data here
  var data = JSON.parse(request.responseText);
  
  // Assign the first day in the list to newDates variable; convert it to a new javascript Date, and then get the day 0-6;
  var newDates = data.list[0].dt_txt;
  newDates = new Date();
  var days = newDates.getDay();

  for(var i = 0; i < data.list.length; i++){
    // hold all dt_txt, then filter out everything that is not indexOf(time)
    var dates = data.list[i].dt_txt;
    if(dates.indexOf("18:00:00") > -1){  
      // Creating div elements that house weather information
      var daysDiv = document.createElement('div');
      daysDiv.classList.add("day");
      daysContainer.appendChild(daysDiv);
      
      // Converting temp to one dec place.
      roundTemp(data, i, daysDiv);

      // Grabbing the icons for each day and adding to url
      var icon = data.list[i].weather[0].icon;
      var iconString = "http://openweathermap.org/img/w/"+icon+".png";

      // Creating a div to house the icon
      var iconDiv = document.createElement('div');
      iconDiv.classList.add('weatherIcon');
      iconDiv.setAttribute(
        "style", "background-image: url("+iconString+")"
      )
      daysDiv.appendChild(iconDiv);

      // Init dayOfWeek Variable
      var dayOfWeek = document.createElement('h6');

      // Switch statement to check for the current day of week
      switch (days){
        case 0: 
          dayOfWeek.innerText = "Sun";
          break;
        case 1:
          dayOfWeek.innerText = "Mon";
          break;
        case 2:
          dayOfWeek.innerText = "Tue";
          break;
        case 3:
          dayOfWeek.innerText = "Wed";       
          break;
        case 4:
          dayOfWeek.innerText = "Thu";
          break;
        case 5:
          dayOfWeek.innerText = "Fri";
          break;
        case 6:
          dayOfWeek.innerText = "Sat";
          days -= 7; 
          break;
      }
      daysDiv.innerHTML += '<div class="displayDay">' +dayOfWeek.innerText+ '</div>';
      days++;
    }    
  }
}

function roundTemp(data, i, daysDiv){
  var number = data.list[i].main.temp;
  var rounded = Number(Math.round(number * 10) / 10);
  var fixed = rounded.toFixed(1);
  parseFloat( number.toFixed(2));
  daysDiv.innerHTML = '<h4>' +fixed+ '</h4>' + '<p>°F</p>';
}