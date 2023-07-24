import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Projects from "./projects";
import LocalWeather from "./projects/localWeather";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={ <Projects /> }/>
        <Route path="/local_weather" element={ <LocalWeather /> }/>
      </Routes>
    </div>
  );
}

export default App;
