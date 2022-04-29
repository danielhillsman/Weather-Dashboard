// Created Vars from a document.querySelector
const userInput = $('#userInput')[0];
const submitBtn = $('#submitBtn')[0];
const searchHistoryDiv = $('#searchHistory')[0];
// Search bar vars
let cityResults = $('#cityResults')[0];
let currentCity = '';
let searchHistory = [];
let cityName = $('#cityName')[0];
// Main display for today's date
let mainDate = $('#mainDate')[0];
let mainIcon = $('#mainIcon')[0];
let mainTemp = $('#mainTemp')[0];
let mainHumid = $('#mainHumid')[0];
let mainWind = $('#mainWind')[0];
let mainUv = $('#mainUv')[0];
// Day 1 vars
let day1Temp = $('#day1Temp')[0];
let day1Date = $('#day1Date')[0];
let day1Icon = $('#day1Icon')[0];
let day1Wind = $('#day1Wind')[0];
let day1Humid = $('#day1Humid')[0];
// Day 1 vars
let day2Temp = $('#day2Temp')[0];
let day2Date = $('#day2Date')[0];
let day2Icon = $('#day2Icon')[0];
let day2Wind = $('#day2Wind')[0];
let day2Humid = $('#day2Humid')[0];
// Day 1 vars
let day3Temp = $('#day3Temp')[0];
let day3Date = $('#day3Date')[0];
let day3Icon = $('#day3Icon')[0];
let day3Wind = $('#day3Wind')[0];
let day3Humid = $('#day3Humid')[0];
// Day 1 vars
let day4Temp = $('#day4Temp')[0];
let day4Date = $('#day4Date')[0];
let day4Icon = $('#day4Icon')[0];
let day4Wind = $('#day4Wind')[0];
let day4Humid = $('#day4Humid')[0];
// Day 1 vars
let day5Temp = $('#day5Temp')[0];
let day5Date = $('#day5Date')[0];
let day5Icon = $('#day5Icon')[0];
let day5Wind = $('#day5Wind')[0];
let day5Humid = $('#day5Humid')[0];
// API Key
const apiKey = "9e2e3f847b172f233503288a97eb4446";
// Search Bar function
let searchBar = (e) => {
  e.preventDefault();
  currentCity = userInput.value;
  if (currentCity === '' || currentCity === null) {
    console.log('Must use city a name!')
    return false;
  }
  weatherFunction(currentCity);
}
// Saves Search to local storage 
let saveCity = (nextCity) => {
  let cities = JSON.parse(localStorage.getItem("results"));
  if (cities === null) {
    searchHistory = [];
  } else {
    searchHistory = cities;
  }
  searchHistory.push(nextCity);
  localStorage.setItem('results', JSON.stringify(searchHistory))
  cityFunction()
}
// Grabs search history from local storage and displays it
let cityFunction = () => {

  let cities = JSON.parse(localStorage.getItem('results'));
  if (!cities) cities = [];
  $(cityResults).text("");
  for (var i = 0; i < cities.length; i++) {

    var but1 = document.createElement("button");
    $(but1).text(cities[i]);
    but1.setAttribute("data-index", i);
    cityResults.appendChild(but1);

  }
}
  // returns function when page is rereshed
  cityFunction()

//----Weather Function----//
let weatherFunction = (searchCity) => {
  // Calling API Key
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&APPID=${apiKey}&units=imperial`;
  // Fetch Function to grab the data from the API and display it in HTML
  fetch(apiUrl).then(res => res.json())
    .then((data) => {
      let latCoord = data.coord.lat
      let lonCoord = data.coord.lon
      let displayName = data.name
      saveCity(currentCity)

      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latCoord}&lon=${lonCoord}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`)
      
        .then(response => response.json())
        .then((oneCallData) => {
          // displaying the info on the page 
          $(cityName).text(displayName);
          mainIcon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
          $(mainDate).text(`Date: ${moment().format("MM/DD/YYYY")}`);
          $(mainTemp).text(`Temp: ${oneCallData.current.temp} F`);
          $(mainHumid).text(`Humidity: ${oneCallData.current.humidity} %`);
          $(mainWind).text(`Wind Speed: ${oneCallData.current.wind_speed} mph`);
          $(mainUv).text(`UVI Index: ${oneCallData.current.uvi}`);
          mainUv.removeAttribute("class");
          // UV color function
          if (oneCallData.current.uvi >= 0 && oneCallData.current.uvi < 3) {
            mainUv.classList.add('uvBlue');
          } else if (oneCallData.current.uvi >= 4 && oneCallData.current.uvi < 8) {
            mainUv.classList.add('uvYellow');
          } else if (oneCallData.current.uvi >= 8) {
            mainUv.classList.add('uvRed');
          }
          // 1st Next Day
          $(day1Date).text(moment().add(1, 'day').format("MM/DD/YYYY"));
          day1Icon.src = "http://openweathermap.org/img/w/" + oneCallData.daily[0].weather[0].icon + ".png";
          $(day1Temp).text(`Temp: ${oneCallData.daily[0].temp.day} F`);
          $(day1Wind).text(`Wind Speed: ${oneCallData.daily[0].wind_speed} mph`);
          $(day1Humid).text(`Humidity: ${oneCallData.daily[0].humidity} %`);
          // 2nd Next Day
          $(day2Date).text(moment().add(2, 'day').format("MM/DD/YYYY"));
          day2Icon.src = "http://openweathermap.org/img/w/" + oneCallData.daily[1].weather[0].icon + ".png";
          $(day2Temp).text(`Temp: ${oneCallData.daily[1].temp.day} F`);
          $(day2Wind).text(`Wind Speed: ${oneCallData.daily[1].wind_speed} mph`);
          $(day2Humid).text(`Humidity: ${oneCallData.daily[1].humidity} %`);
          // 3rd Next Day
          $(day3Date).text(moment().add(3, 'day').format("MM/DD/YYYY"));
          day3Icon.src = "http://openweathermap.org/img/w/" + oneCallData.daily[2].weather[0].icon + ".png";
          $(day3Temp).text(`Temp: ${oneCallData.daily[2].temp.day} F`);
          $(day3Wind).text(`Wind Speed: ${oneCallData.daily[2].wind_speed} mph`);
          $(day3Humid).text(`Humidity: ${oneCallData.daily[2].humidity} %`);
          // 4th Next Day
          $(day4Date).text(moment().add(4, 'day').format("MM/DD/YYYY"));
            day4Icon.src = "http://openweathermap.org/img/w/" + oneCallData.daily[3].weather[0].icon + ".png";
          $(day4Temp).text(`Temp: ${oneCallData.daily[3].temp.day} F`);
          $(day4Wind).text(`Wind Speed: ${oneCallData.daily[3].wind_speed} mph`);
          $(day4Humid).text(`Humidity: ${oneCallData.daily[3].humidity} %`);
          // 5th Next Day
          $(day5Date).text(moment().add(5, 'day').format("MM/DD/YYYY"));
          day5Icon.src = "http://openweathermap.org/img/w/" + oneCallData.daily[4].weather[0].icon + ".png";
          $(day5Temp).text(`Temp: ${oneCallData.daily[4].temp.day} F`);
          $(day5Wind).text(`Wind Speed: ${oneCallData.daily[4].wind_speed} mph`);
          $(day5Humid).text(`Humidity: ${oneCallData.daily[4].humidity} %`);
        })
    })
    .catch((error) => {
      console.error(error)
    })
}
// Submit button for search
submitBtn.addEventListener('click', searchBar);