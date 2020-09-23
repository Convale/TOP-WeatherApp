import React from "react";
import "./index.css";

export default function WeatherDisplay(props) {
  const weatherIconImport = require("./images/weather_icons/icon_" +
    props.weatherData.weather[0].icon +
    ".png");

  return (
    <div className="weatherContainer">
      {props.searchBox === false ? (
        <div className="cityName" onClick={(e) => props.openSearchBox(e)}>
          {props.weatherData.name}
        </div>
      ) : (
        <div className="cityName">
          <div>
            <form onSubmit={(e) => props.handleSubmit(e)}>
              <input
                type="text"
                className="citySearchBox"
                onChangeCapture={(e) => props.handleCityInput(e)}
              />
              <button
                className="citySearchCancel"
                type="button"
                onClick={(e) => props.closeSearchBox(e)}
              >
                X
              </button>
            </form>
          </div>
          {props.loadingError != null ? (
            <div className="apiErrorCode">Error: {props.loadingError}</div>
          ) : null}
        </div>
      )}
      <div className="weatherIcon">
        <img src={weatherIconImport} alt="weather type icon" />
        <div className="weatherDescription">
          {props.weatherData.weather[0].main}
        </div>
      </div>
      <div className="tempuratureInfo">
        <div className="tempuratureDisplay">
          {Math.round(props.weatherData.main.temp)} °
          {props.fahrenheit === true ? "F" : "C"}
        </div>
        <div>
          Real Feel: {Math.round(props.weatherData.main.feels_like)} °
          {props.fahrenheit === true ? "F" : "C"}
        </div>
      </div>
      <div className="timeInfo">
        <div className="timeDisplay">{getTime()}</div>
        <div>{getDate()}</div>
      </div>
      <div className="otherInfo">
        <div>
          Low: {Math.round(props.weatherData.main.temp_min)} °
          {props.fahrenheit === true ? "F" : "C"}
        </div>
        <div>
          High: {Math.round(props.weatherData.main.temp_max)} °
          {props.fahrenheit === true ? "F" : "C"}
        </div>
        <div>Humidity: {Math.round(props.weatherData.main.humidity)}°</div>
        <div>Wind: {Math.round(props.weatherData.wind.speed)} mph</div>
      </div>
    </div>
  );
}

function getTime() {
  const convertDate = new Date();
  return convertDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getDate() {
  const convertDate = new Date();
  return (
    convertDate.getMonth() +
    1 +
    "/" +
    convertDate.getDate() +
    "/" +
    convertDate.getFullYear()
  );
}
