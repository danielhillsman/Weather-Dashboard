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





submitBtn.addEventListener('click', searchBar);