import {useState, useEffect} from 'react'
import { useTrackVisit } from "./hooks/useTrackVisit.js";
import "./App.css";
import Layout from "./components/Layout/Layout"; 


function App() {   
  useTrackVisit();
  return (      
      <Layout/>   
  )  
}

export default App;
