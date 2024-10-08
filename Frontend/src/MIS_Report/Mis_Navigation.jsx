// import React, { useState } from 'react'
// import CasePaper from './Reports'
// import Reports from './Reports'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';
import AncCardRegister from './AncCardRegister';
import MctsRegister from './MctsRegister';
import Opd_Nagarparishad_Register from './Opd_Nagarparishad_Register';


const Mis_Navigation = () => {

  const [AppointmentRegisType,setAppointmentRegisType]=useState('')
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);


  // ----------Case Paper--------------


  const [CasePaperGet, setCasePaperGet] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const CasePaperColumns = [
    {
        key: "id",
        name: "S.No",
        frozen: true
    },
    {
        key: "PatientId",
        name: "Patient Id",
        frozen: true
    },
   
    {
        key: "PatientName",
        name: "Patient Name",
        frozen: true
    },
    
    {
        key: "Age",
        name: "Age",
    },
    {
        key: "CasesheetNo",
        name: "Casesheet No",
    },

   
    
]



useEffect(() => {
  if (searchQuery.trim() === '') {
    // Fetch the default 10 rows
    axios.get(`${UrlLink}MisReports/MisCasePaper_Detials_link`, {
      params: {
        limit: 10 // Assuming the backend supports a limit parameter to fetch a limited number of rows
      }
    })
    .then((res) => {
      setCasePaperGet(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    // Fetch filtered data based on searchQuery
    axios.get(`${UrlLink}MisReports/MisCasePaper_Detials_link`, {
      params: {
        search: searchQuery
      }
    })
    .then((res) => {
      setCasePaperGet(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}, [searchQuery, UrlLink]);



const handleChange = (e) => {
  setSearchQuery(e.target.value);
};


  // ----------Case Paper--------------


  return (
    <>
    <div className="Main_container_app">
      <h3>OPD Reports</h3>
      <div className="RegisterTypecon">
        <div className="RegisterType">
          {["Referral", "CasePaper", "MCTS Register", "ANC Card", "Opd Nagarparishad Register"].map((p, ind) => (
            <div className="registertypeval" key={ind}>
              <input
                type="radio"
                id={p}
                name="appointment_type"
                checked={AppointmentRegisType === p}
                onChange={(e) => setAppointmentRegisType(e.target.value)}
                value={p}
              />
              <label htmlFor={p}>
                {p}
              </label>
            </div>
          ))}
        </div>
      </div>
      <br />
      {/* {AppointmentRegisType === 'CasePaper' && <Reports/>} */}
      {AppointmentRegisType === 'CasePaper' && 
        <div className="RegisFormcon_1">
          <div className="RegisForm_1">
            <label> Search Here <span>:</span> </label>
            <input
              type="text"
              placeholder='Enter PatientId, PatientName, or CasesheetNo'
              value={searchQuery}
              onChange={handleChange}
            />
          </div>
          {CasePaperGet.length>0 &&
          <ReactGrid columns={CasePaperColumns} RowData={CasePaperGet} />
        }
      </div>
      
      }

      {AppointmentRegisType === 'ANC Card' && <AncCardRegister/>}
      {AppointmentRegisType === 'MCTS Register' && <MctsRegister/>}
      {AppointmentRegisType === 'Opd Nagarparishad Register' && <Opd_Nagarparishad_Register/>}


     
      <br />
      <br />
      <br />
    </div>
  </>
  )
}

export default Mis_Navigation