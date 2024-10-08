import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { useNavigate } from 'react-router-dom';
import LoupeIcon from "@mui/icons-material/Loupe";

const RegistrationList = () => {

    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    // const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const pagewidth = useSelector(state => state.userRecord?.pagewidth);
    const dispatchvalue = useDispatch();
    const navigate = useNavigate()
    const [PatientRegisterData, setPatientRegisterData] = useState([])
    const [PatientIPRegisterData, setPatientIPRegisterData] = useState([])
    const [PatientCasualityRegisterData, setPatientCasualityRegisterData] = useState([])
    const [PatientDiagnosisRegisterData, setPatientDiagnosisRegisterData] = useState([])
    const [PatientLaboratoryRegisterData, setPatientLaboratoryRegisterData] = useState([])
    const [searchOPParams, setsearchOPParams] = useState({ query: '', status: '' });
    const [searchIPParams, setsearchIPParams] = useState({ query: '', status: '' });
    const [searchCasualityParams, setsearchCasualityParams] = useState({ query: '', status: '' });
    const [searchDiagnosisParams, setsearchDiagnosisParams] = useState({ query: '', status: '' });
    const [searchLaboratoryParams, setsearchLaboratoryParams] = useState({ query: '', status: '' });

    useEffect(() => {
        axios.get(`${UrlLink}Frontoffice/get_patient_appointment_details`,{params:searchOPParams})
            .then((res) => {
                const ress = res.data;
                if (Array.isArray(ress)) {
                    setPatientRegisterData(ress);
                } else {
                    setPatientRegisterData([]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink, searchOPParams]);

    useEffect(() => {
        axios.get(`${UrlLink}Frontoffice/get_patient_ip_registration_details`,{params:searchIPParams})
            .then((res) => {
                console.log("API Response:", res.data);  
                const ress = res.data;
                if (Array.isArray(ress)) {
                    setPatientIPRegisterData(ress);
                    console.log(ress);
                } else {
                    setPatientIPRegisterData([]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink, searchIPParams]);


    useEffect(() => {
        axios.get(`${UrlLink}Frontoffice/get_patient_casuality_details`,{params:searchCasualityParams})
            .then((res) => {
                console.log("Casualityyyy", res.data);  
                const ress = res.data;
                if (Array.isArray(ress)) {
                    setPatientCasualityRegisterData(ress);
                    console.log(ress);
                } else {
                    setPatientCasualityRegisterData([]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink, searchCasualityParams]);

    useEffect(() => {
        axios.get(`${UrlLink}Frontoffice/get_patient_diagnosis_details`,{params:searchDiagnosisParams})
            .then((res) => {
                console.log("API Response:", res.data);  
                const ress = res.data;
                if (Array.isArray(ress)) {
                    setPatientDiagnosisRegisterData(ress);
                    console.log(ress);
                } else {
                    setPatientDiagnosisRegisterData([]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink, searchDiagnosisParams]);

    useEffect(() => {
        axios.get(`${UrlLink}Frontoffice/get_patient_laboratory_details`,{params:searchLaboratoryParams})
            .then((res) => {
                console.log("API Response:", res.data);  
                const ress = res.data;
                if (Array.isArray(ress)) {
                    setPatientLaboratoryRegisterData(ress);
                    console.log(ress);
                } else {
                    setPatientLaboratoryRegisterData([]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink, searchLaboratoryParams]);



    const PatientOPRegisterColumns = [
        {
            key: "id",
            name: "ID",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientId",
            name: "Patient Id",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientName",
            name: "Patient Name",
            width:150,
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PhoneNo",
            name: "PhoneNo",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "AppointmentId",
            name: "Appointment Id",

        },
        {
            key: "VisitId",
            name: "Visit Id",

        },
        {
            key: "Complaint",
            name: "Complaint",
        },
        {
            key: "isMLC",
            name: "isMLC",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "Flagging",
            name: "Flagging",
        },
        {   
            key: "isRefferal",
            name: "isRefferal",
        },
        {
            key: "Status",
            name: "Status",
        },
        {
            key: "Specilization",
            name: "Specilization",
        },
        {
            key: "DoctorName",
            name: "Doctor Name",
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditOPPatientRegister(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        },
    ]


    const PatientIPRegisterColumns = [
        {
            key: "id",
            name: "ID",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientId",
            name: "Patient Id",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientName",
            name: "Patient Name",
            width:150,
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PhoneNo",
            name: "PhoneNo",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "AppointmentId",
            name: "Appointment Id",

        },
        {
            key: "Complaint",
            name: "Complaint",
        },
        {
            key: "isMLC",
            name: "isMLC",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "Flagging",
            name: "Flagging",
        },
        {
            key: "isRefferal",
            name: "isRefferal",
        },
        {
            key: "Status",
            name: "Status",
        },
        {
            key: "Specilization",
            name: "Specilization",
        },
        {
            key: "DoctorName",
            name: "Doctor Name",
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditIPPatientRegister(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        },
    ]

    const PatientCasualityRegisterColumns = [
        {
            key: "id",
            name: "ID",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientId",
            name: "Patient Id",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientName",
            name: "Patient Name",
            width:150,
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PhoneNo",
            name: "PhoneNo",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "VisitId",
            name: "Visit Id",

        },
        {
            key: "Complaint",
            name: "Complaint",
        },
        {
            key: "isMLC",
            name: "isMLC",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "Flagging",
            name: "Flagging",
        },
        {
            key: "isRefferal",
            name: "isRefferal",
        },
        {
            key: "Status",
            name: "Status",
        },
        {
            key: "Specilization",
            name: "Specilization",
        },
        {
            key: "DoctorName",
            name: "Doctor Name",
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditCasualityPatientRegister(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        },
    ]

    const PatientDiagnosisRegisterColumns = [
        {
            key: "id",
            name: "ID",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientId",
            name: "Patient Id",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientName",
            name: "Patient Name",
            width:150,
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PhoneNo",
            name: "PhoneNo",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "VisitId",
            name: "Visit Id",
        },
        {
            key: "Complaint",
            name: "Complaint",
        },
        {
            key: "isMLC",
            name: "isMLC",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "Flagging",
            name: "Flagging",
        },
        {
            key: "isRefferal",
            name: "isRefferal",
        },
        {
            key: "Status",
            name: "Status",
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditDiagnosisPatientRegister(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        },
    ]


    const PatientLaboratoryRegisterColumns = [
        {
            key: "id",
            name: "ID",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientId",
            name: "Patient Id",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientName",
            name: "Patient Name",
            width:150,
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PhoneNo",
            name: "PhoneNo",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "Complaint",
            name: "Complaint",
        },
        {
            key: "isMLC",
            name: "isMLC",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "Flagging",
            name: "Flagging",
        },
        {
            key: "isRefferal",
            name: "isRefferal",
        },
        {
            key: "Status",
            name: "Status",
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditLaboratoryPatientRegister(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        },
    ]



    const handlenewPatientRegister = () => {

        dispatchvalue({ type: 'Registeredit', value: {} })
        navigate('/Home/Registration')
    }


    const handleeditOPPatientRegister = (params) => {
        // Destructure the id and PatientId from the params object
        const { PatientId , VisitId ,...rest} = params;
    
        // Log the entire params object for debugging purposes
        console.log('paraaaammmmmsss', params);
    
        // Dispatch an action to update the Redux store with the selected PatientId
        dispatchvalue({ type: 'Registeredit', value: { PatientId: PatientId , VisitId : VisitId , Type:'OP',...rest}});
    
        // Navigate to the registration page for editing the patient's details
        navigate('/Home/Registration');
    }
    const handleeditIPPatientRegister = (params) => {
        // Destructure the id and PatientId from the params object
        const { PatientId ,...rest} = params;
    
        // Log the entire params object for debugging purposes
        console.log('Ipppppppppp', params);
    
        // Dispatch an action to update the Redux store with the selected PatientId
        dispatchvalue({ type: 'Registeredit', value: { PatientId: PatientId, Type:'IP' ,...rest}});
    
        // Navigate to the registration page for editing the patient's details
        navigate('/Home/Registration');
    }

    const handleeditCasualityPatientRegister = (params) => {
        const { PatientId ,...rest} = params;
    
        console.log('Casualityyyyyyy', params);
    
        dispatchvalue({ type: 'Registeredit', value: { PatientId: PatientId , Type:'Casuality',...rest}});
    
        navigate('/Home/Registration');

    }

    const handleeditDiagnosisPatientRegister = (params) => {
        const { PatientId ,...rest} = params;
    
        console.log('Diagnosissssssss', params);
    
        dispatchvalue({ type: 'Registeredit', value: { PatientId: PatientId ,Type:'Diagnosis',...rest}});
    
        navigate('/Home/Registration');

    }


    const handleeditLaboratoryPatientRegister = (params) => {
        // Destructure the id and PatientId from the params object
        const { PatientId,...rest } = params;
    
        console.log('laboratoryyyyyyyy', params);
    
        dispatchvalue({ type: 'Registeredit', value: { PatientId: PatientId  ,Type:'Laboratory',...rest}});
    
        navigate('/Home/Registration');
    }

    const handleSearchChange = (table, e) => {
        if (table === 'OP') {
            setsearchOPParams({ ...searchOPParams, query: e.target.value });
        } else if (table === 'IP') {
            setsearchIPParams({ ...searchIPParams, query: e.target.value });
        } else if (table === 'Casuality') {
            setsearchCasualityParams({ ...searchCasualityParams, query: e.target.value });
        } else if (table === 'Diagnosis') {
            setsearchDiagnosisParams({ ...searchDiagnosisParams, query: e.target.value });
        } else if (table === 'Laboratory') {
            setsearchLaboratoryParams({ ...searchLaboratoryParams, query: e.target.value });
        }
    };
    
    const handleStatusChange = (table, e) => {
        console.log("Status selected:", e.target.value);
        if (table === 'OP') {
            setsearchOPParams({ ...searchOPParams, status: e.target.value });
        } else if (table === 'IP') {
            setsearchIPParams({ ...searchIPParams, status: e.target.value });
        } else if (table === 'Casuality') {
            setsearchCasualityParams({ ...searchCasualityParams, status: e.target.value });
        } else if (table === 'Diagnosis') {
            setsearchDiagnosisParams({ ...searchDiagnosisParams, status: e.target.value });
        } else if (table === 'Laboratory') {
            setsearchLaboratoryParams({ ...searchLaboratoryParams, status: e.target.value });
        }
    };
    return (
        <>
            <div className="Main_container_app">
                <h3>Patient Register List</h3>
                <div className='DivCenter_container'>OP Patient Details </div>
                <div className="search_div_bar">
                    <div className=" search_div_bar_inp_1">
                        <label htmlFor="">Search by
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            value={searchOPParams.query}
                            placeholder='Patient ID or Name or PhoneNo '
                            onChange={(e)=>handleSearchChange('OP',e)} />
                    </div>
                    <div className=" RegisForm_1">
                        <label htmlFor="">Status
                            <span>:</span>
                        </label>
                        <select
                            id=''
                            name='status'
                            value={searchOPParams.status}
                            onChange={(e)=>handleStatusChange('OP',e)}
                        >
                            <option value=''>Select</option>
                            <option value='Pending'>Pending</option>
                            <option value='Completed'>Completed</option>
                        </select>
                    </div>
                    <button
                        className="search_div_bar_btn_1"
                        onClick={handlenewPatientRegister}
                        title="New Patient Register"
                    >
                        <LoupeIcon />
                    </button>

                </div>
                <ReactGrid columns={PatientOPRegisterColumns} RowData={PatientRegisterData} />

                <div className='DivCenter_container'>IP Patient Details </div>
                <div className="search_div_bar">
                    <div className=" search_div_bar_inp_1">
                        <label htmlFor="">Search by
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            value={searchIPParams.query}
                            placeholder='Patient ID or Name or PhoneNo '
                            onChange={(e)=>handleSearchChange('IP',e)} />
                    </div>
                    <div className=" RegisForm_1">
                        <label htmlFor="">Status
                            <span>:</span>
                        </label>
                        <select
                            id=''
                            name='status'
                            value={searchIPParams.status}
                            onChange={(e)=>handleStatusChange('IP',e)}
                        >
                            <option value=''>Select</option>
                            <option value='Pending'>Pending</option>
                            <option value='Completed'>Completed</option>
                        </select>
                    </div>
                    <button
                        className="search_div_bar_btn_1"
                        onClick={handlenewPatientRegister}
                        title="New Patient Register"
                    >
                        <LoupeIcon />
                    </button>

                </div>
                <ReactGrid columns={PatientIPRegisterColumns} RowData={PatientIPRegisterData} />


                <div className='DivCenter_container'>Casuality Patient Details </div>
                <div className="search_div_bar">
                    <div className=" search_div_bar_inp_1">
                        <label htmlFor="">Search by
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            value={searchCasualityParams.query}
                            placeholder='Patient ID or Name or PhoneNo '
                            onChange={(e)=>handleSearchChange('Casuality',e)} />
                    </div>
                    <div className=" RegisForm_1">
                        <label htmlFor="">Status
                            <span>:</span>
                        </label>
                        <select
                            id=''
                            name='status'
                            value={searchCasualityParams.status}
                            onChange={(e)=>handleStatusChange('Casuality',e)}
                        >
                            <option value=''>Select</option>
                            <option value='Pending'>Pending</option>
                            <option value='Completed'>Completed</option>
                        </select>
                    </div>
                    <button
                        className="search_div_bar_btn_1"
                        onClick={handlenewPatientRegister}
                        title="New Patient Register"
                    >
                        <LoupeIcon />
                    </button>

                </div>
                <ReactGrid columns={PatientCasualityRegisterColumns} RowData={PatientCasualityRegisterData} />


                <div className='DivCenter_container'>Diagnosis Patient Details </div>
                <div className="search_div_bar">
                    <div className=" search_div_bar_inp_1">
                        <label htmlFor="">Search by
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            value={searchDiagnosisParams.query}
                            placeholder='Patient ID or Name or PhoneNo '
                            onChange={(e)=>handleSearchChange('Diagnosis',e)} />
                    </div>
                    <div className=" RegisForm_1">
                        <label htmlFor="">Status
                            <span>:</span>
                        </label>
                        <select
                            id=''
                            name='status'
                            value={searchDiagnosisParams.status}
                            onChange={(e)=>handleStatusChange('Diagnosis',e)}
                        >
                            <option value=''>Select</option>
                            <option value='Pending'>Pending</option>
                            <option value='Completed'>Completed</option>
                        </select>
                    </div>
                    <button
                        className="search_div_bar_btn_1"
                        onClick={handlenewPatientRegister}
                        title="New Patient Register"
                    >
                        <LoupeIcon />
                    </button>

                </div>
                <ReactGrid columns={PatientDiagnosisRegisterColumns} RowData={PatientDiagnosisRegisterData} />


                <div className='DivCenter_container'>Laboratory Patient Details </div>
                <div className="search_div_bar">
                    <div className=" search_div_bar_inp_1">
                        <label htmlFor="">Search by
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            value={searchLaboratoryParams.query}
                            placeholder='Patient ID or Name or PhoneNo '
                            onChange={(e)=>handleSearchChange('Laboratory',e)} />
                    </div>
                    <div className=" RegisForm_1">
                        <label htmlFor="">Status
                            <span>:</span>
                        </label>
                        <select
                            id=''
                            name='status'
                            value={searchLaboratoryParams.status}
                            onChange={(e)=>handleStatusChange('Laboratory',e)}
                        >
                            <option value=''>Select</option>
                            <option value='Pending'>Pending</option>
                            <option value='Completed'>Completed</option>
                        </select>
                    </div>
                    <button
                        className="search_div_bar_btn_1"
                        onClick={handlenewPatientRegister}
                        title="New Patient Register"
                    >
                        <LoupeIcon />
                    </button>

                </div>
                <ReactGrid columns={PatientLaboratoryRegisterColumns} RowData={PatientLaboratoryRegisterData} />

            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    )
}
export default RegistrationList;