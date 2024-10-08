import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import ToastAlert from "../OtherComponent/ToastContainer/ToastAlert";

const LabCompletedlist = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useSelector((state) => state.userRecord?.toast);
    const pagewidth = useSelector(state => state.userRecord?.pagewidth);
    const [Filterdata, setFilterdata] = useState([]);
    const [SearchQuery, setSearchQuery] = useState('');
    const [PatientRegisterData, setPatientRegisterData] = useState([]);
    const [searchOPParams, setsearchOPParams] = useState({ query: '', status: 'Paid' });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };

      const handleSearchChangeStatus = (e) => {
        const { name, value } = e.target
    
        setsearchOPParams({ ...searchOPParams, [name]: value });
    
      };


      useEffect(() => {
        axios.get(`${UrlLink}OP/Lab_completed_quelist`, { params: searchOPParams })
          .then((res) => {
            console.log("123",res.data);
            const ress = res.data;
          
            if (Array.isArray(ress)) {
              setPatientRegisterData(ress);
              setFilterdata(ress);
            } else {
              setPatientRegisterData([]);
              setFilterdata([]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, [UrlLink, searchOPParams]);


      const handleeditOPPatientRegister = (params) => {
        console.log("params56", params);
        dispatch({ type: 'LabWorkbenchNavigation', value: { params } });
        navigate('/Home/Labvalue');
      };

      useEffect(() => {
        if (SearchQuery !== '') {
          const lowerCaseQuery = SearchQuery.toLowerCase();
    
          const filteredData = PatientRegisterData.filter((row) => {
            const { PatientId, PhoneNumber, PatientName } = row;
            return (
              (PatientId && PatientId.toLowerCase().includes(lowerCaseQuery)) ||
              (PhoneNumber && PhoneNumber.toLowerCase().includes(lowerCaseQuery)) ||
              (PatientName && PatientName.toLowerCase().includes(lowerCaseQuery))
            );
          });
    
          setFilterdata(filteredData);
        } else {
          setFilterdata(PatientRegisterData);
        }
      }, [SearchQuery, PatientRegisterData]);

      const PatientOPRegisterColumns = [
        {
          key: "id",
          name: "S.No",
        },
        {
          key: "PatientId",
          name: "Patient Id",
        },
        {
          key: "PatientName",
          name: "Patient Name",
          width:280,
        },
        {key:"RegisterType",
          name:"Register Type"
        },
        {
          key: "PhoneNumber",
          name: "PhoneNo",
        },
        {
          key: "DoctorShortName",
          name: "Doctor Name",
        },
        {
          key: "Action",
          name: "Action",
          renderCell: (params) => (
            <Button
              className="cell_btn"
              key={params.row.id} 
              onClick={() => handleeditOPPatientRegister(params?.row)}
    
            >
              <ArrowForwardIcon className="check_box_clrr_cancell" />
            </Button>
          ),
        },
       
    
      ];
  return (
    <div className="Main_container_app">
    <h3>Lab Comleted Queue List</h3>
    <div className="search_div_bar">
      <div className="search_div_bar_inp_1">
        <label>Search by<span>:</span></label>
        <input
          type="text"
          value={SearchQuery}
          placeholder='Patient ID or Name or PhoneNo '
          onChange={handleSearchChange}
        />
      </div>
      <div className=" RegisForm_1">
        <label htmlFor="">Status
          <span>:</span>
        </label>
        <select
          id=''
          name='status'
          value={searchOPParams.status}
          onChange={handleSearchChangeStatus}
        >
          <option value=''>Select</option>
          <option value='Paid'>Paid</option>
          <option value='Pending'>Pending</option>

        </select>
      </div>
    </div>
    <ToastAlert Message={toast.message} Type={toast.type} />


    <ReactGrid columns={PatientOPRegisterColumns} RowData={Filterdata} />
  </div>
  )
}

export default LabCompletedlist
