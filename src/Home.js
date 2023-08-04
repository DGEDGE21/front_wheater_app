import React,{ useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import Exchange from "./components/Exchange/Exchange"
import { WEATHER_API_URL, WEATHER_API_KEY,geoApiOptions, GEO_API_URL ,GEO_API_URL_P } from "./api";
import { UserOutlined,UserAddOutlined } from '@ant-design/icons';
import Button from "antd/es/button";
import "./App.css";
import { useHistory } from "react-router-dom"; 




function Home() {
    const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [currency,setCurrency]=useState(null)
  const [exchangeRate,setExchangeRate]=useState(null)
  const history = useHistory();
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const [cidade,codico] = searchData.label.split(" ");
       

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const currencyfech=fetch(
      `${GEO_API_URL_P}/locale/currencies?countryId=${codico}`,
      geoApiOptions
    );
    console.log(codico)

    Promise.all([currentWeatherFetch, forecastFetch,currencyfech])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        const currenryResposne= await response[2].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
       
        setCurrency({moeda: currenryResposne.data[0].code,citycode: codico})
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <div className="topo_todos">
      <Button onClick={()=>{history.push('/create_acount')}}> 
          Registar
          <UserAddOutlined />

      </Button>
        <Button onClick={()=>{history.push('/login')}}>
          Login
<UserOutlined />
        </Button>
      </div>
      <Search onSearchChange={handleOnSearchChange} />
      {currency && <Exchange data={currency}/>}
 
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>

  )
}

export default Home