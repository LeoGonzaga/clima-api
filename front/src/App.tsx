import React, { useState, useEffect } from 'react';
import './App.css';
// import sunrain from './assets/rain.png'
// import rain from './assets/rainsun.png'
import sun from './assets/sun.png';





const App: React.FC = () => {
  let [city, setCity] = useState("");
  const [weather, setWeather] = useState()


  async function searchCity(city: string) {
    console.log(`http://ec2-3-18-105-251.us-east-2.compute.amazonaws.com:3050/?url=https://api.hgbrasil.com/weather?key=204e2e07&city_name=${city}`)
    let response = await fetch(`http://ec2-3-18-105-251.us-east-2.compute.amazonaws.com:3050/?url=https://api.hgbrasil.com/weather?key=204e2e07&city_name=${city}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let resJSON = await response.json();
    console.log(resJSON);
    setWeather(resJSON.results)
  }




  return (
    <div className="App" style={{ padding: 0, height: 700 }}>
      <h1 style={{
        margin: 0,
        padding: 15,
        color: "white",
        fontWeight: "bold"
      }}>C L I M Ã O</h1>

      <div style={{ width: "90%", marginLeft: 100 }}>
        <input type='text' placeholder="Itajubá, MG" style={{
          width: "70%",
          padding: 20,
          margin: 8,
          boxSizing: "border-box",
          fontSize: 20,
        }}
          onChange={(e) => setCity(e.target.value)}
        />
        <button style={{
          border: 2,
          borderColor: "black",
          backgroundColor: "white",
          color: "black",
          padding: 24,
          fontSize: 16,
          width: 120,
          cursor: "pointer"
        }}

          onClick={() => {
            console.log(city)
            searchCity(city)
          }}
        >Buscar</button>
      </div>
      <h1 style={{ margin: 0, fontSize: 90, color: "white", paddingBottom: 15 }}>{weather ? weather.temp : "0"}º</h1>

      <img src={sun} alt="" style={{ width: 200, height: 200, marginTop: -20, }} />

      <div style={{ overflowX: "auto", display: "flex", flex: 1, flexDirection: "row", justifyContent: "space-around", color: "white" }}>
        {weather ? weather.forecast.map((day:any) => {
          return (<div>
            <h3 style={{fontWeight:"bold"}}>{day.weekday}</h3>
            <h3>{day.date}</h3>
            <h6 style={{ fontSize: 20, margin: 0 }}>Max: {day.max}</h6>
            <h6 style={{ fontSize: 20, margin: 0 }}>Min: {day.min}</h6>
          <h6 style={{ fontSize: 15, margin: 0 }}>{day.description}</h6>
          </div>)
        }) : null}
        {/* <div>
          <h3>Segunda</h3>
          <h6>icon</h6>
          <h6 style={{ fontSize: 20, margin: 0 }}>23º</h6>
        </div>

        <div>
          <h3>Terça</h3>
          <h6>icon</h6>
          <h6 style={{ fontSize: 20, margin: 0 }}>23º</h6>
        </div>

        <div>
          <h3>Quarta</h3>
          <h6>icon</h6>
          <h6 style={{ fontSize: 20, margin: 0 }}>23º</h6>
        </div>

        <div>
          <h3>Quinta</h3>
          <h6>icon</h6>
          <h6 style={{ fontSize: 20, margin: 0 }}>23º</h6>
        </div>

        <div>
          <h3>Sexta</h3>
          <h6>icon</h6>
          <h6 style={{ fontSize: 20, margin: 0 }}>23º</h6>
        </div>
        <div>
          <h3>Sábado</h3>
          <h6>icon</h6>
          <h6 style={{ fontSize: 20, margin: 0 }}>23º</h6>
        </div>

        <div>
          <h3>Domingo</h3>
          <h6>icon</h6>
          <h6 style={{ fontSize: 20, margin: 0 }}>23º</h6>
        </div> */}





      </div>

    </div>
  );
}

export default App;
