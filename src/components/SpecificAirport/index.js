import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Terminals from '../Terminals'
import './index.css'

const terminalsList = [
    {
        terminalNo: 1,
        terminalDescription: 'Optional metadata should be two lines.'
    },
    {
        terminalNo: 2,
        terminalDescription: 'Optional metadata should be two lines.'
    }
]

const SpecificAirport = () => {

    const onSubmitForm = event => {
        event.preventDefault();
    }

    return <div className="specific-airport-container">
        <h1 clasName="specific-airport-contsiner-header">Indira Gandhi International Airport</h1>
        <ul className="specific-airport-tabs">
            <li className="tab">Terminals</li>
            <li className="tab">Transport</li>
            <li className="tab">Contact details</li>
        </ul>
        <hr className = "service-line"/>
        <ul className="terminals-container">
            {
                terminalsList.map((eachTerminal) => <Terminals terminal={eachTerminal} />)
            }

            <button className="add-terminal-btn">+Add Terminal</button>
        </ul>
        <div className="service-conatiner">
            <h1 className="service-head">Service</h1>
            <p className="service-description">Lost & found</p>
        </div>
        <form className="form-container" onSubmit={onSubmitForm}>
            <div className="input-container">
                <label htmlFor="service-name" className="label">Service Name</label>
                <input type="text" id="service-name" className="input" value="Lost & found" />
            </div>
            <div className="input-container">
                <label htmlFor="category" className="label">Category</label>
                <select id="category" className="input">
                    <option value="option 1">Option 1</option>
                    <option value="option 2">Option 2</option>
                    <option value="option 3">Option 3</option>
                    <option value="option 4">Option 4</option>
                </select>
            </div>
            <div className="input-container">
                <label htmlFor="sub-category" className="label">Sub Category</label>
                <select id="sub-category" className="input">
                    <option value="option 1">Option 1</option>
                    <option value="option 2">Option 2</option>
                    <option value="option 3">Option 3</option>
                    <option value="option 4">Option 4</option>
                </select>
            </div>
            <div className="upload-img-container">
                <Popup
                   modal 
                    trigger={
                        <button className="upload-btn">
                            <img src="https://res.cloudinary.com/dnml2vs6t/image/upload/v1720168209/MyMiniProjectsImages/bnbp7nwpcfgbblxrmrsb.svg" alt="shar icon" className="shar-icon" />
                            upload image
                        </button>
                    }
                    position="center center"
                    className = "popup"
                >
                    {
                        close => (
                    <div className="upload-image-container">
                        <div className = "popup-head-container">
                            <h1 className="popup-head">Terminal title</h1>
                            <hr className="line" />
                            <p className="popup-description">Description</p>
                        </div>
                        <div className="popup-btn-container">
                            <button className="upload-btn">
                                <img src="https://res.cloudinary.com/dnml2vs6t/image/upload/v1720168209/MyMiniProjectsImages/bnbp7nwpcfgbblxrmrsb.svg" alt="shar icon" className="shar-icon" />
                                upload image
                            </button>
                            <div className="cancel-or-continue-btn-container">
                                <button className="cancel-btn" onClick={() => close()}>Cancel</button>
                                <button className="continue-btn">Continue</button>
                            </div>
                        </div>
                    </div>
                       )
                    }
                </Popup>
            </div>
            <div className="checkbox-container">
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                </label>
                <label htmlFor="show-imag" className="label">Show image</label>
            </div>


            <div className="input-container type-decription">
                <label htmlFor="description" className="label">Description</label>
                <input type="text" id="description" className="descriptin-input" value="type here" />
            </div>
        </form>
            <p className="text">Lounge</p>
            <hr className = "service-line"/>
            <p className="text">Money Exchange</p>
            <hr className = "service-line"/>
    </div>
}
export default SpecificAirport