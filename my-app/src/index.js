import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherDisplay from './weatherDisplay';
import './storage.js';

var apiCallOpenWeatherKey = "8093a0fd1fbc1c30215fdca1950f2900";
var cityInput = '';
var searchCity = "San%20Francisco,CA,US";
var workingLS = false;

class WeatherApp extends React.Component {   
    constructor(props) {
        super(props);
        this.state = {
          weatherData: [],
          loadingError: null,
          fahrenheit: true,
          isLoaded: false,
          searchBox: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCityInput = this.handleCityInput.bind(this);
        this.openSearchBox = this.openSearchBox.bind(this);
        this.closeSearchBox = this.closeSearchBox.bind(this);
    }
    
    async componentDidMount() {
        try {
            searchCity = JSON.parse(localStorage.searchCity);
            workingLS = true;
        }
        catch {
            searchCity = "San%20Francisco,CA,US";
        }
        this.getAPIData();

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/algoliasearch@4/dist/algoliasearch.umd.js";
        document.body.appendChild(script);
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        searchCity = cityInput;
        this.getAPIData();
    }

    handleCityInput = (event) => {
        cityInput = event.target.value;
    }

    openSearchBox = () => {
        this.setState({
            searchBox: true,
        });
    }

    closeSearchBox = () => {
        this.setState({
            searchBox: false,
            loadingError: null,
        });
    }

    async getAPIData() {
        let result = [];
        let isError = false;
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiCallOpenWeatherKey}&units=imperial`, { mode: 'cors' });
            result = await response.json();
        } catch (error) {
            isError = true;
            this.setState({
            loadingError: error,
            isLoaded: true,
            })
        } finally {
            if (result.cod == 200) {
                if (workingLS == true) {
                    localStorage.searchCity = JSON.stringify(searchCity);
                }
                this.setState({
                    weatherData: result,
                    isLoaded: true,
                    searchBox: false,
                    loadingError: null,
                });
            }
            else {
                this.setState({
                    loadingError: result.message,
                    isLoaded: true,
                });
            }
        };
    }

    render() {
        return (
            ((this.state.isLoaded === true) ? 
                <WeatherDisplay
                    weatherData={this.state.weatherData}
                    loadingError={this.state.loadingError}
                    fahrenheit={this.state.fahrenheit}
                    handleSubmit={this.handleSubmit}
                    handleCityInput={this.handleCityInput}
                    searchBox={this.state.searchBox}
                    openSearchBox={this.openSearchBox}
                    closeSearchBox={this.closeSearchBox}
                /> : null)
        )
    }
}

//-- Initialize
ReactDOM.render( <WeatherApp />, document.getElementById('root') );


/*-- App agenda outline

Implementing a weather app using React (first React project)

1) create outline in react/CSS
    area in the middle to display:
        city name (done)
        weather type (done)
        tempurature (done)
        feels like temp (done)
        min temp / max temp (done)
        humidity (done)
        wind (done)

    area to input city user wants info on (done)
        auto get info from geolocation (paused)
        error handling (done)
        autocomplete city search (paused -google had paywall)
    ability to change from C* / F*


2) create call for geolocation from browser (paused)

3) create call for weather from OpenWeather (done)
    https://openweathermap.org/current
    key: 8093a0fd1fbc1c30215fdca1950f2900
    
4) localStorage for location (done)

5) add-ons: 
    fun add on implement giphy background image based off weather
    animation for city search

Next Steps:
    Ability to change the temp unit (F/C)
    Time interval update
    ability to get geolocation from browser
    animate the city search bar to open up / close down
    add a better background possibly giphy
    add 5 day weather forecast
*/