import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';

const Reports = () => {
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);

  const [CasePaperGet, setCasePaperGet] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  console.log(searchQuery,'searchQuery');
  

  const DesignationColumns = [
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



// useEffect(() => {
//   if (searchQuery.trim() === '') {
//     // Clear the CasePaperGet state to remove the grid
//     setCasePaperGet([]);
//     return;
//   }

//   axios.get(`${UrlLink}MisReports/MisCasePaper_Detials_link`, {
//     params: {
//       search: searchQuery,
//     }
//   })
//     .then((res) => {
//       setCasePaperGet(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, [searchQuery, UrlLink]);


  const handleChange = (e) => {
    setSearchQuery(e.target.value);
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
              value={searchQuery}
              onChange={handleChange}
            />
          </div>
        </div>
        {CasePaperGet.length>0 &&
            <ReactGrid columns={DesignationColumns} RowData={CasePaperGet} />
          }

       
      </div>
    </>
  );
}

export default Reports;
