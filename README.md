# Weather App

This is a React application that allows users to search for the current weather condition of a city. The application uses the OpenWeatherMap API to fetch weather data and displays it along with an appropriate background image based on the weather condition.

## Prerequisites

Before running the application, make sure you have the following installed on your machine:

- Node.js (version 12 or later)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/weather-app.git
```

2. Navigate to the project directory:

```
cd weather-app
```

3. Install the required dependencies:

```
npm install
```

## Configuration

1. Obtain an API key from OpenWeatherMap by creating an account on their website: [OpenWeatherMap](https://openweathermap.org/)

2. In the project directory, create a new file named `.env` and add the following line, replacing `YOUR_API_KEY` with the actual API key you obtained:

```
REACT_APP_OPENWEATHERMAP_API_KEY=YOUR_API_KEY
```

## Running the Application

To run the application locally, execute the following command:

```
npm start
```

This will start the development server and open the application in your default web browser. If it doesn't open automatically, you can access it by navigating to `http://localhost:3000` in your web browser.

## Building for Production

To create a production build of the application, run the following command:

```
npm run build
```

This will create an optimized build of the application in the `build` folder. You can then deploy the contents of the `build` folder to a web server or hosting service of your choice.

## Usage

1. Once the application is running, you will see an input field where you can enter the name of a city.

2. After entering the city name, press Enter or click outside the input field. The application will fetch the weather data for the specified city and display the following information:
   - City name and country
   - Current weather condition (e.g., Sunny, Cloudy, Rain)
   - Temperature (in Celsius or Fahrenheit)
   - Wind speed
   - Humidity
   - An appropriate background image based on the weather condition

3. You can toggle between Celsius and Fahrenheit units by clicking the "Switch to Fahrenheit/Celsius" button.

4. To search for a different city, simply enter the new city name in the input field and repeat the process.

5. If an error occurs during the API request or if the entered city is not found, an error message will be displayed.

## Dependencies

The application uses the following dependencies:

- React
- Axios (for making HTTP requests to the OpenWeatherMap API)
- react-icons (for displaying weather icons)
