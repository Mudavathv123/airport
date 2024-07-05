
import { Routes, Route} from 'react-router-dom';
import AirportService from './components/AirportService';
import HomePage from './components/HomePage';
import './App.css';


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
