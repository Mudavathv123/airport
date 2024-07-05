import AirportTable from '../AirportTable';
import Header from '../Header';
import Sidebar from '../Sidebar';
import './index.css'

const HomePage = () => {
    return (
        <div className = "Homepage-container">
            <Header />
            <div className = "body-container">
                <Sidebar />
                <AirportTable />
            </div>
        </div>
    )
}

export default HomePage;