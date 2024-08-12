import "./style.css";

const weatherHandler = () => {
  const cities = {};
  const submit = document.querySelector("form button");

  const weatherAPI = async function (cityName) {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=2SHGSGJZRDNUUEF2N4EERPAE9`,
        { mode: "cors" }
      );
      const weatherData = await response.json();
      const localConditions = weatherData.currentConditions;
      cities[cityName] = {
        conditions: localConditions.conditions,
        temp: localConditions.temp,
        feelslike: localConditions.feelslike,
        humidity: localConditions.humidity,
        precip: localConditions.precip,
        precipprob: localConditions.precipprob,
      };
      renderConditions(cityName)
      console.log(cities[cityName])
    } catch (error) {
      alert(error);
    }
  };

  const renderConditions = (cityName) => {
    const conditions = document.querySelector(".conditions span");
    const temp = document.querySelector(".temp span");
    const feelslike = document.querySelector(".feelslike span");
    const humidity = document.querySelector(".humidity span");
    const precipitation = document.querySelector(".precipitation span");
    const precipprob = document.querySelector(".precipprob span");

    if (cities[cityName]) {
      conditions.innerText = cities[cityName].conditions;
      temp.innerText = cities[cityName].temp;
      feelslike.innerText = cities[cityName].feelslike;
      humidity.innerText = cities[cityName].humidity;
      precipitation.innerText = cities[cityName].precip;
      precipprob.innerText = cities[cityName].precipprob;
    }
  };

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    const city = document.getElementById("city").value;
    weatherAPI(city);
  });
};

weatherHandler();
