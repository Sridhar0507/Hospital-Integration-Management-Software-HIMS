import React, { useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { FaPlus, FaTrash } from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from "react-router-dom";




const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        columnHeader: {
          backgroundColor: "var(--ProjectColor)",
          textAlign: "Center",
        },
        root: {
          "& .MuiDataGrid-root .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeaderTitleContainer": {
            textAlign: "center",
            display: "flex !important",
            justifyContent: "center !important",
          },
          "& .MuiDataGrid-window": {
            overflow: "hidden !important",
          },
        },
        cell: {
          borderTop: "0px !important",
          borderBottom: "1px solid var(--ProjectColor) !important",
          display: "flex",
          justifyContent: "center",
        },
      },
    },
  },
});

const OtRequest = () => {

  const navigate = useNavigate();
  const [otData,setOtData] = useState([]);
  const IpNurseQueSelectedRow = useSelector(
    (state) => state.InPatients?.IpNurseQueSelectedRow
  );
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  console.log("natha", IpNurseQueSelectedRow);
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date

  const [otRequest,setOtRequested] = useState({
    Booking_Id:IpNurseQueSelectedRow?.Booking_Id,
    SurgeryName:'',
    SurgeonName:'',
    PrimaryDocter:IpNurseQueSelectedRow?.PrimaryDoctor,
    Date:currentDate,
    Time:'',
    Status:"pending"
  });
  console.log(otRequest,"dd");

  const [editingIndex, setEditingIndex] = useState(null);
  const [page, setPage] = useState(0);
 
  const pageSize = 10;
  const showdown = otData.length;
  const totalPages = Math.ceil(otData.length / 10);

  const [table1, settable1] = useState([]);
  const [table2, settable2] = useState([]);  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOtRequested(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handlePlusClick = () => {
    if (!otRequest.SurgeryName) {
      alert("Please select a surgery name.");
      return;
    }
    // Add the selected surgery name to the list
    settable1(prev => [...prev, otRequest.SurgeryName]);
    // Clear the input field after adding
    setOtRequested(prevOtRequest => ({ ...prevOtRequest, SurgeryName: '' }));
  };
  const handlePlusClick1 = () => {
    if (!otRequest.SurgeonName) {
      alert("Please select a surgeon name .");
      return;
    }
    // Add the selected surgery name to the list
    settable2(prev => [...prev, otRequest.SurgeonName]);
    // Clear the input field after adding
    setOtRequested(prevOtRequest => ({ ...prevOtRequest, SurgeonName: '' }));
  };
  const handleDelete1 = (index) => {
    // Remove the entry at the specified index from the list
    const updatedTable2 = [...table2];
    updatedTable2.splice(index, 1);
    settable2(updatedTable2);
  };

  const handleDelete = (index) => {
    // Remove the entry at the specified index from the list
    const updatedTable1 = [...table1];
    updatedTable1.splice(index, 1);
    settable1(updatedTable1);
  };

  const handleSaveAdd =()=>{

    console.log('1232',otRequest)

    console.log(table1)
    console.log(table2)

    const parms = {
      ...otRequest,
      patientName:IpNurseQueSelectedRow?.PatientName,
      table1:table1,
      table2:table2
    }
   
    axios.post('http://127.0.0.1:8000/ipregistration/insert_Ot_Request',parms)
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log('otinsert :',error);
    })
  };
  React.useEffect(()=>{
    fetchOtRequestData();
  },[]);

const fetchOtRequestData = () => {
  axios.get('http://127.0.0.1:8000/ipregistration/get_Ot_Request')
  .then((response) =>{
    const data = response.data;
    console.log("orrequestdata",data)

    setOtData([
      ...data.map((row,index)=>({
        id:index+1,
        ...row,
      }))
    ])
  })
  .catch((error)=> {
    console.log('error fetching otrequest data:',error);
  })
};
  
  
  
  const handlePageChange = (params) => {
    setPage(params.page);
  };
 
  const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

  // const handleEdit = () => {
  //   // Edit functionality
  //   if (editingIndex === null) return;
  //   const updatedSumma = [...summa];
  //   updatedSumma[editingIndex] = leninformdata;
  //   setSumma(updatedSumma);
  //   setLeninformdata({ RequestType: 'OnRequest', Type: '', Reason: '' });
  //   setEditingIndex(null);
  // };



  const coloumnss=[
    
        {  field:'id' , headerName: 'Ot Request Id',width:  100,},
        {  field:'Booking_Id' , headerName: 'Booking Id',width:  100,},
        {  field:'Patient_Name' , headerName: 'Patient_Name',width:  100,},
        {  field:'Surgery_Name' , headerName: 'Surgery Name',width:  130,},
        {  field:'Surgeon_Name' , headerName: 'Surgeon Name',width:  130,},
        {  field:'Requested_Date' , headerName: 'Requested Date',width:  140,},
        {  field:'Requested_Time' , headerName: 'Requested Time',width:  140,},
        {  field:'Physician_Name' , headerName: 'Physician Name',width:  140,},
        {  field:'Approved_Date' , headerName: 'Approved Date',width:  150,},
        {  field:'Approve_Time' , headerName: 'Approve Time',width:  150,},
        {  field:'Status' , headerName: 'Status',width:  100,},
       
       
        
   
  ]
  return (
    <>
      <div className="Supplier_Master_Container">
        <div className="Total_input_container">
          <div className="inp_container_all_intakeoutput" >
            <label>
              Booking Id <span>:</span>
            </label>
            <input
              type="text"
              name='Booking_Id'
              value={IpNurseQueSelectedRow.Booking_Id}
              onChange={(e) => setOtRequested({ ...otRequest, Booking_Id: e.target.value })}
            />
          </div>
          <div className="inp_container_all_intakeoutput" >
            <label>
              Surgery Name <span>:</span>
            </label>
            <select
              name='SurgeryName'
              value={otRequest.SurgeryName}
              onChange={handleInputChange}
            //   onChange={(e) => setOtRequested({ ...otRequest, SurgeryName: e.target.value })}
            >
              <option value="">Select</option>
              <option value="knee">knee</option>
              <option value="Lungs">Lungs</option>
              <option value="Hand">Hand</option>
            </select>
            <FaPlus className="icon" onClick={() => handlePlusClick()} /> {/* Plus icon */}
          </div>
          <div className="inp_container_all_intakeoutput" >
            <label>
              Surgeon Name <span>:</span>
            </label>
            <select
              name='SurgeonName'
              value={otRequest.SurgeonName}
              onChange={handleInputChange}
            //   onChange={(e) => setOtRequested({ ...otRequest, SurgeonName: e.target.value })}
            >
              <option value="">Select</option>
              <option value="Madhu">Madhu</option>
              <option value="Jothi">Jothi</option>
              <option value="Bala">Bala</option>
            </select>
            <FaPlus className="icon" onClick={() => handlePlusClick1()} />
          </div>
       
        </div>
        <div className="Total_input_container">
        <div className="inp_container_all_intakeoutput" >
            <label>Physician Name:</label>
            <input type="text"
            name='PrimaryDocter'
            value={IpNurseQueSelectedRow.PrimaryDoctor}
            onChange={(e) => setOtRequested({ ...otRequest, PrimaryDocter: e.target.value })}
              />
          </div>
          <div className="inp_container_all_intakeoutput" >
            <label>Date:</label>
            <input type="date" 
            name='Date'
            min={currentDate}
           onChange={(e) => setOtRequested({ ...otRequest, Date: e.target.value })}
            value={otRequest.Date}
               />
          </div>
          <div className="inp_container_all_intakeoutput" >
            <label>Time:</label>
            <input type="time" 
            name="Time"
            onChange={(e) => setOtRequested({ ...otRequest, Time: e.target.value })}  />
          </div>
        </div>
        <div style={{display:'flex'}}>
        {table1.length > 0 && (
        <div className="Selected-table-container RateCard_table">
          <br />
          <br />
          <table className="selected-medicine-table2 tablewidth">
            <thead>
              <tr>
                <th id="vital_Twidth">S No</th>
                <th id="vital_Twidth">Surgery Name</th>
                <th id="vital_Twidth">Actions</th> {/* Add Actions column */}
              </tr>
            </thead>
            <tbody>
              {table1.map((surgery, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{surgery}</td>
                  <td>
                    <FaTrash onClick={() => handleDelete(index)} /> {/* Delete icon */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

{table2.length > 0 && (
        <div className="Selected-table-container RateCard_table">
          <br />
          <br />
          <table className="selected-medicine-table2 tablewidth">
            <thead>
              <tr>
                <th id="vital_Twidth">S No</th>
                <th id="vital_Twidth">Surgeon Name</th>
                <th id="vital_Twidth">Actions</th> 
              </tr>
            </thead>
            <tbody>
              {table2.map((surgery, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{surgery}</td>
                  <td>
                    <FaTrash onClick={() => handleDelete1(index)} /> {/* Delete icon */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
      <button className='btn-add' onClick={handleSaveAdd}>
              Add
            </button>
        {/* <div style={{ display: 'grid', placeItems: 'center', width: '100%' }}>
          {editingIndex === null ? (
            <button className='btn-add' onClick={handleSaveAdd}>
              Add
            </button>
          ) : (
            <button className='btn-add' onClick={handleEdit}>
              Edit
            </button>
          )}
        </div> */}

        <div className="IP_grid">
          <ThemeProvider theme={theme}>
            <div className="IP_grid_1">
              <DataGrid
                rows={otData.slice(page * pageSize, (page + 1) * pageSize)}
                pageSize={10}
                columns={coloumnss} // You need to define your dynamic columns here
                onPageChange={handlePageChange}
                hideFooterPagination
                hideFooterSelectedRowCount
                className="Ip_data_grid"
              
              />
              {showdown > 0 && otData.length > 10 && (
                <div className="IP_grid_foot">
                  <button
                    onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
                    disabled={page === 0}
                  >
                    Previous
                  </button>
                  Page {page + 1} of {totalPages}
                  <button
                    onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))}
                    disabled={page === totalPages - 1}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </ThemeProvider>
          {showdown !== 0 && otData.length !== 0 ? (
            ""
          ) : (
            <div className="IP_norecords">
              <span>No Records Found</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OtRequest;





