import React from 'react';
import './index.css'

const airportTableData = [
  {
    rowNo: 1,
    airports: "Indra Gandhi International Airport",
    country: "India",
    code: "DEL",
    terminals: 3
  },
  {
    rowNo: 2,
    airports: "Dubai International Airport",
    country: "UAE",
    code: "DXB",
    terminals: 5
  },
  {
    rowNo: 3,
    airports: "Heathrow Airport",
    country: "England",
    code: "LHR",
    terminals: 6
  },
  {
    rowNo: 4,
    airports: "Istanbul Airport",
    country: "Turkey",
    code: "IST",
    terminals: 3
  },
  {
    rowNo: 5,
    airports: "Rajiv Gandhi International Airport",
    country: "Texas",
    code: "DFW",
    terminals: 14
  }
]

const AirportTable = () => {
  return (
    <div className="airport-table-container">
      <table class="table">
        <thead>
          <tr className="all-airports-data">
            <th scope="col" className="checkbox-head">
              <input type="checkbox" className="input-checkbox" />
            </th>
            <th scope="col">All Airports</th>
            <th scope="col">Country</th>
            <th scope="col">Code</th>
            <th scope="col">Terminals</th>
          </tr>
        </thead>
        <tbody>
          {
            airportTableData.map((eachRowData) => {
              const { rowNo,
                airports,
                country,
                code,
                terminals } = eachRowData;
              return <>
                <tr className="all-airports-data">
                  <th scope="row" key={rowNo} className="checkbox-head">
                    <input type="checkbox" className="input-checkbox" />
                  </th>
                  <td className="airports-data">{airports}</td>
                  <td className="county-data">{country}</td>
                  <td className="code-data">{code}</td>
                  <td className="terminals-data">{terminals}</td>
                </tr>
              </>
            })
          }
        </tbody>
      </table>
      <div className = "btn-conatiner">
      {
        airportTableData.map((eachRowData) => {
          return <div className="icons-container"  key = {eachRowData.rowNo}>
            <button className = "edit-btn">
            <img src="https://res.cloudinary.com/dnml2vs6t/image/upload/v1720160427/MyMiniProjectsImages/qozhg2dxc5vaojd5izuh.svg" alt="edit icon" className="edit-icon" />
            </button>
            <button className="delete-btn">
            <img src="https://res.cloudinary.com/dnml2vs6t/image/upload/v1720160445/MyMiniProjectsImages/kmqilkeigcshz0buse8i.svg" alt="delete icon" className="delete-icon" />
            </button>
          </div>

        })
      }
      </div>
    </div>
  )
};

export default AirportTable;
