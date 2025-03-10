import { Navigation } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Context/userContext";
import "./Styles/SubDashboard.scss";

export default function SubDashboard() {
  const {
    location,
    unit,
    setUnit,
    lat,
    lon,
    windStatus,
    windDegree,
    visibility,
    humidity,
    airPressure,
    timeConverter,
  } = useContext(UserContext);

  const [forecasts, setForecasts] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // 7 day forecast:
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=69644e28c6a9c6d7c04f95ff1035a799&units=${unit}`
    )
      .then((response) => response.json())
      .then((result) => {
        setForecasts(result.daily.slice(1, 6));
      });
  }, [location, unit, lat, lon]);

  useEffect(() => {
    // Current weather:
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d40959fafb5e97903b6f484063f5b01b`
    )
      .then((response) => response.json())
      .then((result) => {
        setWeather(result);
      });
  }, [lat, lon]);

  function formatVisibility(x) {
    const withCommas = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const commaIndex = withCommas.indexOf(",");
    const newVisibility = withCommas.slice(0, commaIndex + 2);
    console.log(formatVisibility);
    return newVisibility;
  }

  function degToCompass(num) {
    const val = Math.floor(num / 22.5 + 0.5);
    const arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  }

  return (
    <section className="SubDashboard">
      <div className="unit-bar">
        <div
          className={unit === "metric" ? "metric selected" : "metric"}
          onClick={() => setUnit("metric")}
        >
          °C
        </div>
        <div
          className={unit === "imperial" ? "imperial selected" : "imperial"}
          onClick={() => setUnit("imperial")}
        >
          °F
        </div>
      </div>

      <div className="forecast-wrapper">
        {weather &&
          forecasts.map((d, i) => {
            return (
              <div className={`forecast-${i}`} key={`forecast-${i}`}>
                <p>{i === 0 ? `Tomorrow` : timeConverter(d.dt)}</p>
                <img
                  src={`./assets/${d.weather[0].icon}.png`}
                  alt={d.weather[0].main}
                />

                <div className="temp-wrapper">
                  <p className="max-temp">
                    {Math.round(d.temp.max)}
                    {unit === "metric" ? `°C` : `°F`}
                  </p>
                  <p className="min-temp">
                    {Math.round(d.temp.min)}
                    {unit === "metric" ? `°C` : `°F`}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
{/* esta es el panel */}
      <div className="highlights-wrapper">
        <h5>Todays Highlights</h5>

        <div className="wind-status-wrapper">
          <p className="title">Wind Status</p>
          <h4>
            {windStatus} <span>{unit === "metric" ? `m/s` : `mph`}</span>
          </h4>
          <div className="wind-degree-wrapper">
            <span>
              <Navigation
                className="wind-degree-icon"
                style={{ transform: `rotate(${windDegree}deg)` }}
              />
            </span>
            <p>{degToCompass(windDegree)}</p>
          </div>
        </div>

        <div className="humidity-wrapper">
          <p className="title">Humidity</p>
          <h4>
            {humidity} <span>%</span>
          </h4>
          <div className="percentage-bar-wrapper">
            <div className="top">
              <p>0</p>
              <p>50</p>
              <p>100</p>
            </div>
            <div className="bar-container">
              <div
                className="bar-filler"
                style={{ width: `${humidity}%` }}
              ></div>
            </div>
            <div className="bottom">%</div>
          </div>
        </div>

        <div className="visibility-wrapper">
          <p className="title">Visibility</p>
          <h4>
            {visibility} <span>meter</span>
          </h4>
        </div>

        <div className="air-pressure-wrapper">
          <p className="title">Air Pressure</p>
          <h4>
            {airPressure} <span>mb</span>
          </h4>
        </div>

        <footer>
          created by{" "}
          <a
            href=""
            target="_blank"
            rel="noreferrer"
          >
Joel Percca          </a>{" "}
          - devChallenges.io
        </footer>
      </div>
    </section>
  );
}
