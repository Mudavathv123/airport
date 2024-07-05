
import { Routes, Route, Router } from 'react-router-dom';
import './App.css';
import AirportService from './components/AirportService';
import HomePage from './components/HomePage';
import SpecificAirport from './components/SpecificAirport';

function App() {
   return (
      <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/airport-services" element={<AirportService />} />
            </Routes>
      </>
   )
}

export default App;
