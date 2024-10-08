import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';


const AncCardRegister = () => {
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const [AncCardRegisterGet, setAncCardRegisterGet] = useState([]);
  const [AncSearchQuery, setAncSearchQuery] = useState('');

  const [dateOption, setDateOption] = useState('current');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  const AncCardColumns = [
    {
        key: "id",
        name: "S.No",
        frozen: true
    },
    {
        key: "Date",
        name: "Date",
        frozen: true
    },
    {
        key: "PatientId",
        name: "Patient Id",
        frozen: true
    },
    {
        key: "Registration_Id",
        name: "Reg.No",
        frozen: true
    },
    {
        key: "Age",
        name: "Age",
    },
   
    {
        key: "PatientName",
        name: "Patient Name",
        
    },
    
    
    {
        key: "Address",
        name: "Address",
    },
    {
        key: "ObstHistory",
        name: "OBST History",
    },
    {
        key: "MenstrualEDD",
        name: "DueDate",
    },
    {
        key: "DeliveryResult",
        name: "Delivery Result",
    },
    {
        key: "BloodGroup",
        name: "Blood Group",
    },

   
    
]



// useEffect(() => {
//     if (AncSearchQuery.trim() === '') {
//       // Fetch the default 10 rows
//       axios.get(`${UrlLink}MisReports/MisAncCard_Detials_link`, {
//         params: {
//           limit: 10 // Assuming the backend supports a limit parameter to fetch a limited number of rows
//         }
//       })
//       .then((res) => {
//         setAncCardRegisterGet(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     } else {
//       // Fetch filtered data based on AncSearchQuery
//       axios.get(`${UrlLink}MisReports/MisAncCard_Detials_link`, {
//         params: {
//           search: AncSearchQuery
//         }
//       })
//       .then((res) => {
//         setAncCardRegisterGet(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     }
//   }, [AncSearchQuery, UrlLink]);
  
useEffect(() => {
    const params = {};

    if (AncSearchQuery.trim() !== '') {
      params.search = AncSearchQuery;
    }

    if (dateOption === 'custom') {
      if (fromDate && toDate) {
        params.fromDate = fromDate;
        params.toDate = toDate;
      } else {
        setAncCardRegisterGet([]); // Clear the data if both dates are not provided
        return;
      }
    } else if (dateOption === 'current') {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      params.fromDate = today;
      params.toDate = today;
    }

    axios.get(`${UrlLink}MisReports/MisAncCard_Detials_link`, { params })
      .then((res) => {
        setAncCardRegisterGet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [AncSearchQuery, dateOption, fromDate, toDate, UrlLink]);



  
  const handleChange = (e) => {
    setAncSearchQuery(e.target.value);
  };

  const handleDateOptionChange = (e) => {
    setDateOption(e.target.value);
    // Clear the dates if switching back to "Current Date"
    if (e.target.value === 'current') {
      setFromDate('');
      setToDate('');
    }
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };


  return (
    <>
      <div className="Main_container_app">
        <div className="RegisFormcon_1">
          <div className="RegisForm_1">
            <label> Search Here <span>:</span> </label>
            <input
              type="text"
              placeholder='Enter PatientId, PatientName, or CasesheetNo'
              value={AncSearchQuery}
              onChange={handleChange}
            />
          </div>
          <div className="RegisForm_1">
            <label> Date <span>:</span> </label>
            <select 
                value={dateOption} 
                onChange={handleDateOptionChange}
            >
                <option value="current">Current Date</option>
                <option value="custom">Custom Date</option>
            </select>
            {dateOption === 'custom' && (
                <div className="RegisForm_1">
                <label> From  <span>:</span> </label>

                <input
                    type="date"
                    placeholder="From Date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                />
                <label> To  <span>:</span> </label>

                <input
                    type="date"
                    placeholder="To Date"
                    value={toDate}
                    onChange={handleToDateChange}
                />
                </div>
            )}
          </div>
        </div>
        {AncCardRegisterGet.length>0 &&
            <ReactGrid columns={AncCardColumns} RowData={AncCardRegisterGet} />
          }

       
      </div>
    </>
  )
}

export default AncCardRegister;