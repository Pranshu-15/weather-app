import React, { useState, useEffect } from 'react';
import axios from 'axios';
import thunderstormImage from '../../Media/thunderstorm.jpg';
import drizzleImage from '../../Media/drizzle.jpg';
import rainImage from '../../Media/raindrop.jpg';
import snowImage from '../../Media/snow.png';
import atmosphereImage from '../../Media/atmosphere.jpg';
import sunnyImage from '../../Media/sunnyDay.jpg';
import cloudyImage from '../../Media/cloudySky.jpg';
import ErrorMessage from '../ErrorMessage';
import './style.css'
import {
    WiDaySunny,
    WiCloudy,
    WiRain,
    WiSnow,
    WiThunderstorm,
    WiDayFog,
    WiDayShowers,
} from 'react-icons/wi';

const Weather = () => {
    const [citySearch, setCitySearch] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tempUnit, setTempUnit] = useState('celsius');
    const [isUnitLoading, setIsUnitLoading] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const fetchWeatherData = async (city, unit) => {
        setIsLoading(true);
        setError(null);

        try {
            const apiKey = '075f84d627cb82ae75db4e771238ed30';
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
            );
            // Check if the response includes "country" property
            if (response.data.sys && response.data.sys.country) {

                setWeatherData({
                    ...response.data,
                    country: response.data.sys.country,
                });

            } else {
                setError('Country information not available');
            }

            // Check if the response indicates an invalid city
            if (response.data.cod === '404') {
                setError('City not found');
                setWeatherData(null);
                setBackgroundImage(null);
            } else {
                const weatherId = response.data.weather[0].id;
                const condition = getWeatherCondition(weatherId);
                setWeatherData(response.data);
                setBackgroundImage(condition.image);
            }
        } catch (error) {
            setError('An error occurred while fetching weather data');
            setBackgroundImage(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCitySearch = (event) => {
        setCitySearch(event.target.value);
    };

    const toggleTempUnit = () => {
        setIsUnitLoading(true);
        setTempUnit(tempUnit === 'celsius' ? 'fahrenheit' : 'celsius');
        if (citySearch && weatherData) {
            const unit = tempUnit === 'celsius' ? 'metric' : 'imperial';
            fetchWeatherData(citySearch, unit).finally(() => setIsUnitLoading(false));
        } else {
            setIsUnitLoading(false);
        }
    };

    useEffect(() => {
        if (citySearch) {
            const unit = tempUnit === 'celsius' ? 'metric' : 'imperial';
            fetchWeatherData(citySearch, unit);
        }
    }, [citySearch, tempUnit]);

    const getWeatherCondition = (weatherId) => {
        if (weatherId >= 200 && weatherId <= 232) {
            return { text: 'Thunderstorm', image: thunderstormImage };
        } else if (weatherId >= 300 && weatherId <= 321) {
            return { text: 'Drizzle', image: drizzleImage };
        } else if (weatherId >= 500 && weatherId <= 531) {
            return { text: 'Rain', image: rainImage };
        } else if (weatherId >= 600 && weatherId <= 622) {
            return { text: 'Snow', image: snowImage };
        } else if (weatherId >= 701 && weatherId <= 781) {
            return { text: 'Atmosphere', image: atmosphereImage };
        } else if (weatherId === 800) {
            return { text: 'Sunny', image: sunnyImage };
        } else if (weatherId >= 801 && weatherId <= 804) {
            return { text: 'Clouds', image: cloudyImage };
        } else {
            return { text: 'Unknown', image: null };
        }
    };
    const getWeatherIcon = (weatherId) => {
        if (weatherId >= 200 && weatherId <= 232) {
            return <WiThunderstorm size={100} />;
        } else if (weatherId >= 300 && weatherId <= 321) {
            return <WiDayShowers size={100} />;
        } else if (weatherId >= 500 && weatherId <= 531) {
            return <WiRain size={100} />;
        } else if (weatherId >= 600 && weatherId <= 622) {
            return <WiSnow size={100} />;
        } else if (weatherId >= 701 && weatherId <= 781) {
            return <WiDayFog size={100} />;
        } else if (weatherId === 800) {
            return <WiDaySunny size={100} />;
        } else if (weatherId >= 801 && weatherId <= 804) {
            return <WiCloudy size={100} />;
        } else {
            return null;
        }
    };
    const handleClearSearch = () => {
        setCitySearch('');
        setWeatherData(null);
        setBackgroundImage(null);
    };
    return (
        <>
                <h1 className='main-header'>Weather App</h1>
            <div className='head'>
                <input
                    type="text"
                    placeholder="Search city..."
                    value={citySearch}
                    onChange={handleCitySearch}
                />
                <button onClick={handleClearSearch}>
  <svg
    height="24"
    width="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path
      d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
      fill="currentColor"
    ></path>
  </svg>
  <span>Reset</span>
</button>

            </div>
            {weatherData && (
                <>
                    <div className='main-box'>
                        <div className='left-box' style={{
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        </div>
                        <h1 className='city-name glass'>
                            {weatherData.name}{' '}
                            {weatherData.sys && weatherData.sys.country
                                ? `, ${weatherData.sys.country}`
                                : ''}
                        </h1>
                        <div className='mid-content'>
                            <div className='weather-icon glass'>
                                {getWeatherIcon(weatherData.weather[0].id)}
                            </div>

                            <div className='weather-details glass'>

                                <p className='weather-current '>
                                    Current Weather: {getWeatherCondition(weatherData.weather[0].id).text}{' '}
                                </p>

                                <p className='wind-speed '>Wind Speed: {weatherData.wind.speed} m/s</p>
                                <p className='humidity '>Humidity: {weatherData.main.humidity}%</p>
                            </div>
                        </div>
                        <div className='temp-detail glass'>
                            <p className='temperature'>
                                Temperature: {weatherData.main.temp}
                                {tempUnit === 'celsius' ? '°C' : '°F'}
                            </p>
                            <button className='toggle-button comic-button' onClick={toggleTempUnit}>
                                {isUnitLoading
                                    ? 'Loading...'
                                    : tempUnit === 'celsius'
                                        ? 'Switch to Fahrenheit'
                                        : 'Switch to Celsius'}
                            </button>
                        </div>




                    </div>
                </>
            )}
            <ErrorMessage error={error} />



        </>
    );
};

export default Weather;