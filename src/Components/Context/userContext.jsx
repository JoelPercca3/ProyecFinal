import React,{ useEffect, useState } from "react";
import PropTypes from 'prop-types';

const localStorageLocation = localStorage.getItem('myLocation');
const promptLocation = localStorageLocation? localStorageLocation: prompt("Where are you located?");
const deafultLocation = promptLocation.charAt(0).toUpperCase() + promptLocation.slice(1).toLowerCase();
const localStorageArray = localStorage.getItem('locations');
const ArrayStorage = localStorageArray? JSON.parse(localStorageArray) : [deafultLocation];

export const UserContext = React.createContext(null)


function UserContextProvider({children}){
const [location, setLocation] = useState(deafultLocation);
const [locationArray, setLocationArray] = useState(ArrayStorage);
const [unit, setUnit] = useState('metric');
const [lat, setLat] = useState('');
const [lon, setLon] = useState('');
const [temp, setTemp] = useState(0);
const [description, setDescription] = useState('');
const [iconId, setIconId] = useState('');
const [timeStamp, setTimeStamp] = useState('');
const [today, setToday] = useState('');
const [windStatus, setWindStatus] = useState('');
const [windDegree, setWindDegree] = useState('');
const [visibility, setVisibility] = useState('');
const [humidity, setHumidity] = useState('');
const [airPressure, setAirPressure] = useState('');
const [isSearch, setIsSearch] = useState(false);

useEffect(() => {
    if(locationArray === []){
        setLocationArray([...locationArray, location]);
        localStorage.setItem('location', JSON.stringify(locationArray))
    }
}, [location, locationArray])
function timeConverter(utcTime){
    const time = new Date(utcTime * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const month = months[time.getMonth()];
    const date = time.getDate();
    const day = days[time.getDay()];
    return day + ", " + date + " " + month

}
useEffect(() => {
localStorage.setItem('myLocation', deafultLocation.charAt(0).toUpperCase() + deafultLocation.slice(1).toLowerCase());
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=69644e28c6a9c6d7c04f95ff1035a799&units=${unit}`)
.then(response => response.json())
.then(result => {
    setTemp(Math.round(result.main.temp));
    setIconId(result.weather[0].icon);
    setLat((result.coord.lat).toString())
    setLat((result.coord.lat).toString());
    setLon((result.coord.lon).toString());
    setDescription(result.weather[0].main); 
    setTimeStamp(result.dt);
    setWindStatus((result.wind.speed).toFixed(1));
    setWindDegree(result.wind.deg);
    setVisibility((result.visibility).toFixed(1));
    setHumidity(result.main.humidity);
    setAirPressure(result.main.pressure);
})
.catch(err => console.log(err))
setToday(timeConverter(timeStamp))
},[timeStamp, location, unit])

const userContextValue = {
    location, setLocation,
        locationArray, setLocationArray,
        unit, setUnit,
        lat, lon,
        temp, setTemp,
        description, setDescription,
        iconId, setIconId,
        timeStamp, setTimeStamp,
        today, setToday,
        windStatus, setWindStatus,
        windDegree, setWindDegree,
        visibility, setVisibility,
        humidity, setHumidity,
        airPressure, setAirPressure,
        isSearch, setIsSearch,
        timeConverter
}
return (
    <UserContext.Provider value={userContextValue}>
        {children}
    </UserContext.Provider>
)

}
export default UserContextProvider;

UserContextProvider.propTypes = {
    children: PropTypes.string.isRequired,

  };