import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

const RadiologyQueList = () => {
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [PatientRegisterData, setPatientRegisterData] = useState([]);
  const [Filterdata, setFilterdata] = useState([]);
  const [SearchQuery, setSearchQuery] = useState('');
  const [searchOPParams, setsearchOPParams] = useState({ query: '', status: 'Request' });
  const handleSearchChangeStatus = (e) => {
    const { name, value } = e.target

    setsearchOPParams({ ...searchOPParams, [name]: value });

  };
  useEffect(() => {
    axios.get(`${UrlLink}OP/Radiology_Queuelist_link`,{ params: searchOPParams })
      .then((res) => {
        const ress = res.data;
        console.log("567",ress);
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
  }, [UrlLink,searchOPParams]);

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
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleeditOPPatientRegister = (params) => {
    console.log("params56",params);
    dispatch({ type: 'RadiologyWorkbenchNavigation', value: { params } });
    navigate('/Home/RadiologyReportEntry');
  };

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
    {
      key: "RegisterType",
      name: "Register Type ",
      width: 150,
    },
    {
      key: "PhoneNumber",
      name: "PhoneNo",
      width: 120,
    },
    {
      key: "DoctorShortName",
      name: "Doctor Name",
      width: 120,
    },
    {
      key: "Action",
      name: "Action",
      width: 110,
      renderCell: (params) => (
        <Button
          className="cell_btn"
          onClick={() => handleeditOPPatientRegister(params?.row)}
        >
          <ArrowForwardIcon className="check_box_clrr_cancell" />
        </Button>
      ),
    },
  ];
  return (
    <div className="Main_container_app">
    <h3>Radiology QueueList</h3>
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
            <option value='Request'>Request</option>
            <option value='Completed'>Completed</option>
          </select>
        </div>
    </div>
    <ReactGrid columns={PatientOPRegisterColumns} RowData={Filterdata} />
  </div>
  )
}

export default RadiologyQueList
