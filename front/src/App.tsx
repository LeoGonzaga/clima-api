import React, { useState, useEffect } from 'react';
import './App.css';

// import sunrain from './assets/rain.png'
// import rain from './assets/rainsun.png'
import sun from './assets/sun.png';
import moon from './assets/moon.png';
import search from './assets/seacrh.png'



import { Moment } from 'moment'
let moment = require('moment');


const App: React.FC = () => {
  let [city, setCity] = useState("");
  const [weather, setWeather] = useState()
  const [hourDay, setHourDay] = useState()


  async function searchCity(city: string) {
    console.log(`http://ec2-3-18-105-251.us-east-2.compute.amazonaws.com:3050/?url=https://api.hgbrasil.com/weather?key=204e2e07&city_name=${city}`)
    let response = await fetch(`https://api.hgbrasil.com/weather/?key=204e2e07&format=json-cors&city_name=${city}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let resJSON = await response.json();
    console.log(resJSON);
    setWeather(resJSON.results)
  }

  useEffect(() => {
    let current_time = new moment().format("HH:mm");
    console.log(current_time)
    setHourDay(current_time)
  }, [])



  return (
    <div className="App" style={{ flex: 1 }}>
      <h1 style={{
        margin: 0,
        padding: 15,
        color: "white",
        fontWeight: "bold"
      }}>C L I M Ã O</h1>

      <div style={{ width: "100%", flex: 1, flexDirection: "row" }}>
        <input type='text' placeholder="Itajubá, MG" style={{
          width: "60%",
          padding: 10,
          margin: 4,
          boxSizing: "border-box",
          fontSize: 20,
        }}
          onChange={(e) => setCity(e.target.value)}
        />
        <button style={{
          width: 60,
          height: 45,
        }}

          onClick={() => {
            console.log(city)
            searchCity(city)
          }}
        >

          <img src={search} style={{ height: 20, width: 30 }} />
        </button>
      </div>

      <img src={hourDay < "5:30" ? moon : sun} alt="" style={{ width: 100, height: 100, marginTop: 20, }} />
      <h1 style={{ margin: 0, fontSize: 90, color: "white", paddingBottom: 15 }}>{weather ? weather.temp + "º" : ""}</h1>
      <h2 style={{ margin: 0, fontSize: 20, color: "white", marginTop: -30, paddingBottom: 20 }}>{weather ? weather.description : ""}</h2>
      <h3 style={{ color: "#c3c3c3" }}>{moment().format('LL')}</h3>
      <h1 style={{ color: "#c3c3c3" }}>{weather ? "" : hourDay}</h1>


      <div style={{ overflowX: "auto", display: "flex", flex: 1, flexDirection: "row", justifyContent: "space-around", color: "white" }}>
        {weather ? weather.forecast.map((day: any) => {
          return (<div style={{}}>
            <h6 style={{ fontWeight: "bold", color: "#c3c3c3", margin: 0 }}>{day.date}</h6>
            <h5><span style={{ color: "#fff", margin: 0 }}>{day.weekday}</span></h5>
            <h6 style={{ margin: 0 }}>Max: <span style={{ color: "#fff" }}>{day.max}</span></h6>
            <h6 style={{ margin: 0 }}>Min: <span style={{ color: "#fff" }}>{day.min}</span></h6>
            {/* <h6 style={{ fontSize: 15, margin: 0,fontWeight: "bold"  }}>{day.description}</h6> */}
          </div>)
        }) : null}
      </div>

    </div >
  );
}

export default App;
