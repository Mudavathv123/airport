
import Header from '../Header';
import Sidebar from '../Sidebar';
import SpecificAirport from '../SpecificAirport';
import './index.css'

const AirportService = () => {
    return (
        <div className = "airport-service-container">
            <Header />
            <div className = "body-container">
                <Sidebar />
                <SpecificAirport />
            </div>
        </div>
    )
}

export default AirportService;