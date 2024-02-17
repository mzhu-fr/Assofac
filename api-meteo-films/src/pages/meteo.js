import { useState } from 'react'

import axios from 'axios'

import { WiHumidity } from 'react-icons/wi'
import { MdOutlineWindPower } from 'react-icons/md'
import { TbCloudSearch } from 'react-icons/tb'

import '../styles/meteo.css'

export const Meteo = () => {

    const apiKey = process.env.REACT_APP_METEO_API_KEY;

    const [data, setData] = useState({})
    const [cityLoc, setCityLoc] = useState("Paris")
    const [isValid, setIsValid] = useState(false)
    const [messageErreur, setMessageErreur] = useState();
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const month = ["", "Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityLoc}&units=metric&appid=${apiKey}`

    const handleChange = (e) => {
        setCityLoc(e.target.value);
    }

    const handleClick = async () => {
        try {
            const res = await axios.get(url);
            setData(res.data)
            setIsValid(true)
            setMessageErreur("");
        }
        catch (err) {
            setMessageErreur("The city doesn't exist")
        }
    }

    const handleKey = (event) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    }
    return (
        <div className="meteo-app">
            <div className="search-meteo">
                <input placeholder="Write your city" name="city" onChange={handleChange} onKeyPress={handleKey} />
                <button onClick={handleClick}><TbCloudSearch /></button>
            </div>
            {isValid ?
                (
                    <div className="meteo-display">
                        <div>
                            <p className="display-today">Currently</p>
                        </div>
                        <div className="display-weather">
                            <div className="display-current-weather border-box">
                                {data.city ? <p className="cityname">{data.city.name}, {data.city.country}</p> : ""}
                                {data.list ? <p className="temperature">{Math.floor(data.list[0].main.temp)}°C</p> : ""}
                            </div>
                            <div className="display-info-weather border-box">
                                {data.list ? (<p className="weather maintext"><img src={`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`} alt="" /><br />{data.list[0].weather[0].description.toUpperCase()}</p>) : ""}
                                {data.list ? <p className="humidity maintext">{data.list[0].main.humidity}<WiHumidity /></p> : ""}
                                {data.list ? <p className="wind maintext"><MdOutlineWindPower />{Math.round((data.list[0].wind.speed * 10) * 100) / 100}km/h</p> : ""}
                            </div>
                        </div>
                    </div>)
                : <p>{messageErreur}</p>}
            {isValid && data.list[0] ? data.list.map((dayForecast) => (
                <div className="weather-inline" key={dayForecast.dt}>
                    <div className="date">
                        <p className="jour">{week[(Math.floor(dayForecast.dt / 86400) + 4) % 7]} {(new Date(dayForecast.dt * 1000)).getDate()} {month[(new Date(dayForecast.dt * 1000)).getMonth()]}</p>
                        <p>{(new Date(dayForecast.dt * 1000)).getHours() + ':' + (new Date(dayForecast.dt * 1000)).getMinutes() + (new Date(dayForecast.dt * 1000)).getMinutes()}</p>
                    </div>
                    <div className="weather-content">

                        <div className="weather-img">
                            <img src={`http://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png`} alt="" />
                            <p className="weather">{dayForecast.weather[0].description.toUpperCase()}</p>
                        </div>
                        <div className="rest">
                            <p className="temp">{Math.floor(dayForecast.main.temp)}°C</p>
                            <p className="humidity">{dayForecast.main.humidity}<WiHumidity /></p>
                            <p className="wind"><MdOutlineWindPower />{Math.round((dayForecast.wind.speed * 10) * 100) / 100}km/h</p>
                        </div>
                    </div>
                </div>
            )

            ) : ""}
        </div >
    )
}