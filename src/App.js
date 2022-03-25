import './App.css';
import Form from './form.component';
import Weather from './weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import { render } from '@testing-library/react';
import React from 'react';

// https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}

//https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}

// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4a6c4be0e6535a7c05e06f5a1371545b

class App extends React.Component{
  constructor(){
    super();
    this.state ={
      city: undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius : undefined,
      temp_max:undefined,
      temp_min : undefined,
      description : "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    };
  }

  calCelsius(temp){
    let cell = Math.floor(temp -273.15);
     return cell;
  };

  get_WeatherIcon(icons,rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <=232:
        this.setState({weatherIcon:this.weatherIcon.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId <=321:
        this.setState({weatherIcon:this.weatherIcon.Drizzle});
        break;
      case rangeId >= 500 && rangeId <=531:
        this.setState({weatherIcon:this.weatherIcon.Rain});
        break;
      case rangeId >= 600 && rangeId <=622:
        this.setState({weatherIcon:this.weatherIcon.Snow});
        break;
      case rangeId >= 701 && rangeId <=781:
        this.setState({weatherIcon:this.weatherIcon.Atmosphere});
        break;
      case rangeId === 800:
        this.setState({weatherIcon:this.weatherIcon.Clear});
        break;
      case rangeId >= 801 && rangeId <=804:
        this.setState({weatherIcon:this.weatherIcon.Clouds});
        break;
      default:
        this.setState({weatherIcon:this.weatherIcon.Clouds}); 
    }
  }

  getWeather = async(e) =>{

    e.preventDefault();

    const city = e.target.elements.city.value;
    
    const country = e.target.elements.country.value;
    

    if(city && country){
      
    const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q={city},{country}&APPID=4a6c4be0e6535a7c05e06f5a1371545b'
    );

    const response = await api_call.json();

    console.log(response);

    this.setState({
      city:'$(response.name),$(response.sys.country)',
      celsius:this.calCelsius(response.main.temp),
      temp_max:this.calCelsius(response.main.temp_max),
      temp_min:this.calCelsius(response.main.temp_min),
      description:response.weather[0].description,
      error:false
    });

    this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);

    }else{
      this.setState({error:true});
    }

  };
  state = {};
  render(){
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather 
        city={this.state.city} 
        country = {this.state.country} 
        temp_celsius = {this.state.celsius} 
        temp_max={this.state.temp_max} 
        temp_min ={this.state.temp_min} 
        description = {this.state.description} 
        weatherIcon ={this.state.weatherIcon} />
      </div>
      
    );
  }
  
}

export default App;
