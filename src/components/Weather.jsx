import React, { useEffect, useRef, useState } from 'react'
import search from'../assets/search.png'
import clear from'../assets/clear.png'
import cloud from'../assets/cloud.png'
import humidity from'../assets/humidity.png'
import rain from'../assets/rain.png'
import snow from'../assets/snow.png'
import wind from'../assets/wind.png'
import drizzle from "../assets/drizzle.png"
import "./Weather.css"

const Weather = () => {
  
  const inputRef=useRef()
  const[weatherData,setWeatherData]=useState(false);

  const allIcon={
    "01d":clear,
    "01n":clear,
    "02d":cloud,
    "02n":cloud,
    "03d":cloud,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow,
  }

  const search1 = async (city)=>{
    if(city===""){
      alert("Enter City Name")
      return;
    }
    try {
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response =await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon=allIcon[data.weather[0].icon] || clear;
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon: icon
      })
    } catch (error) {
      
    }
  }
useEffect(()=>{
  search1("london")
},[])

  return (
    
    <div><div className='weather'>
    <div className="search-bar">
      <input ref={inputRef} type='text' placeholder='search'></input>
      <img className='search-bar' src={search} alt="" onClick={()=>search1(inputRef.current.value)} />
    </div>
      <img className='clear' src={weatherData.icon}/>
      <p className='city'>{weatherData.location}</p>
      <p className='temperature'>{weatherData.temperature}°c</p>
    
      <div className="weather-data">
      <div className="col">
      <img src={humidity}/>
      <div>
          <p>{weatherData.humidity}%</p>
          <span>Humidity</span>
      </div>
      <div className='col'>
          <img src={wind}/>
          <div>
          <p>{weatherData.windSpeed} Km/h</p>
          <span>Wind Speed</span>
          </div>
          
         
      </div>
      </div>
      
    </div>
    
  </div>
  <div class="cloud cloud1"></div>
  <div class="cloud cloud2"></div>
  <div class="cloud cloud3"></div>
  </div>
  )
}

export default Weather
