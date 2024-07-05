import './index.css'

const Terminals = (props) => {
    const {terminal} = props
    const { terminalNo , terminalDescription} = terminal

    return <li className = "terninals-container">
        <img src = "https://res.cloudinary.com/dnml2vs6t/image/upload/v1720164378/MyMiniProjectsImages/s3wjiof7eycrnnj60gvu.png" alt = "terminal logo" className = "terminal-img"/>
        <div className = "terminal-description">
            <div className = "terminal-description-header-container">
                <h3 className = "terminal-head">Terminal {terminalNo}</h3>
                <img src = "https://res.cloudinary.com/dnml2vs6t/image/upload/v1720164326/MyMiniProjectsImages/qvs0kni0qpkmz14fhwxw.svg" alt = "more icon" className = "more-icon-img"/>
            </div>
            <p className = "description">{terminalDescription}</p>
        </div>
    </li>
}

export default Terminals