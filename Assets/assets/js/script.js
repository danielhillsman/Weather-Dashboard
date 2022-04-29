const userInput = $('#userInput')[0];
const submitBtn = $('#submitBtn')[0];
const searchHistoryDiv = $('#searchHistory')[0];
let cityResults = $('#cityResults')[0];
let currentCity = '';
let searchHistory = [];
let cityName = $('#cityName')[0];
let mainDate = $('#mainDate')[0];
let mainIcon = $('#mainIcon')[0];
let mainTemp = $('#mainTemp')[0];
let mainHumid = $('#mainHumid')[0];
let mainWind = $('#mainWind')[0];
let mainUv = $('#mainUv')[0];
let day1Temp = $('#day1Temp')[0];
let day1Date = $('#day1Date')[0];
let day1Icon = $('#day1Icon')[0];
let day1Wind = $('#day1Wind')[0];
let day1Humid = $('#day1Humid')[0];
let day2Temp = $('#day2Temp')[0];
let day2Date = $('#day2Date')[0];
let day2Icon = $('#day2Icon')[0];
let day2Wind = $('#day2Wind')[0];
let day2Humid = $('#day2Humid')[0];
let day3Temp = $('#day3Temp')[0];
let day3Date = $('#day3Date')[0];
let day3Icon = $('#day3Icon')[0];
let day3Wind = $('#day3Wind')[0];
let day3Humid = $('#day3Humid')[0];
let day4Temp = $('#day4Temp')[0];
let day4Date = $('#day4Date')[0];
let day4Icon = $('#day4Icon')[0];
let day4Wind = $('#day4Wind')[0];
let day4Humid = $('#day4Humid')[0];
let day5Temp = $('#day5Temp')[0];
let day5Date = $('#day5Date')[0];
let day5Icon = $('#day5Icon')[0];
let day5Wind = $('#day5Wind')[0];
let day5Humid = $('#day5Humid')[0];



// -----Search Bar Function-----//

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
// Search Bar
let searchBar = (e) => {
  e.preventDefault();
  currentCity = userInput.value;
  if (currentCity === '' || currentCity === null) {
    console.log('Must use city a name!')
    return false;
  }
  weatherFunction(currentCity);
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
} // returns History when page is rereshed
cityFunction()
//-----End Of Search Bar Function-----//

// API Key
const apiKey = "9e2e3f847b172f233503288a97eb4446";
//----Weather Function----//
let weatherFunction = (searchCity) => {
  // Calling API Key
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&APPID=${apiKey}&units=imperial`;
  // Fetch Function to grab the data from the API and display it in HTML
  fetch(apiUrl).then(res => res.json())
    .then((data) => {
      let latCoord = data.coord.lat
      let lonCoord = data.coord.lon
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
      })
      
    })
    .catch((error) => {
      console.error(error)
    })
}

submitBtn.addEventListener('click', searchBar);