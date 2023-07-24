import React from "react";
import { useEffect, useState } from "react";
import Loading from "../../Loading";

type Scale = "F" | "C";
type WeatherData = {
  coord: { lon: number, lat: number}
  weather: [{ id: number, main: string, description: string, icon: string}]
  base: string 
  main: {temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, humidity: number }
  visibility: number
  wind: {speed: number, deg: number, gust: number}, 
  clouds: { all: number}
  dt: number
  sys: { type: number, id: number, country: string, sunrise: number, sunset: number }
  timezone: number 
  id: number
  name: string 
  cod: number
}

const LocalWeather: React.FC = (): JSX.Element => {
  const BASE_URL =  "https://weather-proxy.freecodecamp.rocks/api/current?";
  const [ weatherData, setWeatherData ] = useState<WeatherData | null>(null);
  const [ temp, setTemp ] = useState<GLfloat>(0.0)
  const [ scale, setScale ] = useState<Scale>("F");
  const [ loading, setLoading ] = useState<Boolean>(true);
  
  useEffect(() => {
    getWeatherForLocation();
  }, []);

  const getWeatherForLocation = () => {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      fetch(`${BASE_URL}lat=${latitude}&lon=${longitude}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setWeatherData(data);
          setTemp(data.main.temp);
          setLoading(false);
        })
        .catch((error) => {
          console.warn(`Error ${error.code}: ${error.message}`);
        })
    },
    (error: GeolocationPositionError) => {
      return `Error ${error.code}: ${error.message}`;
    },
    {
      enableHighAccuracy: true
    });
  }

  const convertTemp = (unit: string) => {
    if (unit === "C") {
      setTemp(((temp - 32) * 5/9));
      setScale("C")
    } else {
      setTemp(((temp * 9/5) + 32));
      setScale("F")
    }
  }

  return (
    <div className="weather__app">
      { loading
        ? (
          <Loading/>
        )
        : (
          <div className="weather__app__details">
            <header>
              <h1>Current Weather for
                <span className="weather__app__details--emphasis"> {weatherData?.name}, {weatherData?.sys.country}</span>
                <img className="weather__app__icon" src={weatherData?.weather[0].icon} alt="weather_icon"/>
              </h1>
              <button className={["weather__app__button", scale === "F" && "weather__app__button--active"].join(" ")} onClick={() => convertTemp("F")}>Fahrenheit</button>
              <button className={["weather__app__button", scale === "C" && "weather__app__button--active"].join(" ")} onClick={() => convertTemp("C")}>Celsius</button>
            </header>
            <main>
                <ul className="weather__app__list">
                  <li>The temperature is {temp}{scale}</li>
                  <li>Current Condition(s): {weatherData?.weather[0].description}</li>
                  <li>Wind gust: {weatherData?.wind.gust}</li>
                </ul>
            </main>
          </div>
        )
      }
    </div>
  );
}

export default LocalWeather