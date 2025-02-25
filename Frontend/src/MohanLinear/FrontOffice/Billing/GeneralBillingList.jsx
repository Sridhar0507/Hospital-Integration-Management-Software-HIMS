import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { useNavigate } from 'react-router-dom';
import LoupeIcon from "@mui/icons-material/Loupe";

const GeneralBillingList = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const pagewidth = useSelector(state => state.userRecord?.pagewidth);
    const dispatchvalue = useDispatch();
    const navigate = useNavigate()
    const [PatientRegisterData, setPatientRegisterData] = useState([])
    const [Filterdata,setFilterdata]=useState([])

    const [SearchQuery, setSearchQuery] = useState('')

    const [Statussearch, setStatussearch] = useState('Pending');


    useEffect(() => {
        axios.get(`${UrlLink}Frontoffice/Get_OP_Billing_Details`)
            .then((res) => {
                const ress = res.data;
                console.log('vvvvv',ress);
                
                if (Array.isArray(ress)) {
                    setPatientRegisterData(ress);
                } else {
                    setPatientRegisterData([]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink]);

    useEffect(()=>{

        if(Statussearch !=='' && Array.isArray(PatientRegisterData) && PatientRegisterData.length !==0){

            const Filter= PatientRegisterData.filter((ele)=>ele.Status === Statussearch)

            setFilterdata(Filter)

        }else{
            setFilterdata(PatientRegisterData)
        }

    },[Statussearch,PatientRegisterData])

    useEffect(() => {
        if (PatientRegisterData.length !== 0 && SearchQuery !=='') {
            const lowerCaseQuery = SearchQuery.toLowerCase();
    
            const filteredData = PatientRegisterData.filter((row) => {
                const { PatientId, PhoneNo, Patient_Name } = row;
              
                const lowerCasePatientID = PatientId ? PatientId.toLowerCase() : "";
                const lowerCasePhoneNumber = PhoneNo ? PhoneNo.toLowerCase() : "";
                const lowerCasePatientName = Patient_Name ? Patient_Name.toLowerCase() : "";
                return (
                    lowerCasePatientID.includes(lowerCaseQuery) ||
                    lowerCasePhoneNumber.includes(lowerCaseQuery) ||
                    lowerCasePatientName.includes(lowerCaseQuery)
                );
            });
    
            setFilterdata(filteredData);
        }
    }, [SearchQuery, PatientRegisterData]);
    

    
    const handlenewDocRegister = () => {
        dispatchvalue({type:'OPBillingData',value:{}})
        navigate('/Home/GeneralBilling')

    }

    const HandleMovedatatobill =(params)=>{

        // console.log(params,'***');
        dispatchvalue({type:'OPBillingData',value:params})
        navigate('/Home/GeneralBilling')

    } 

    const handleSearchChange = (e) => {
     setSearchQuery(e.target.value)
    }

    const handleStatusChange = (e) => {
     setStatussearch(e.target.value );
    } 



    const PatientOPRegisterColumns = [
        {
            key: "id",
            name: "ID",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "Date",
            name: "Date",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientId",
            name: "Patient Id",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "Patient_Name",
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
            key: "Doctor_ShortName",
            name: "Doctor Name",

        },
        {
            key:'PatientCategory',
            name:'Patient Category',
        },
        {
            key:'VisitPurpose',
            name:'VisitPurpose',
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => {
                return params.row.Status === 'Pending' ? (
                    <Button
                        className="cell_btn"
                        onClick={() => HandleMovedatatobill(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                ) : 'No Action'
            },
        },
    ]




    return (
        <>
            <div className="Main_container_app">
                <h3>Billing Queue List</h3>
                <div className="search_div_bar">
                    <div className=" search_div_bar_inp_1">
                        <label htmlFor="">Search Here
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            value={SearchQuery}
                            placeholder='Patient ID or Name or PhoneNo '
                            onChange={(e)=>handleSearchChange(e)} />
                    </div>
                    <div className=" RegisForm_1">
                        <label htmlFor="">Status
                            <span>:</span>
                        </label>
                        <select
                            id=''
                            name='status'
                            value={Statussearch}
                            onChange={(e)=>handleStatusChange(e)}
                        >
                            <option value=''>Select</option>
                            <option value='Pending'>Pending</option>
                            <option value='Completed'>Completed</option>
                        </select>
                    </div>
                    <button
                        className="search_div_bar_btn_1"
                        onClick={handlenewDocRegister}
                        title="New Doctor Register"
                    >
                        <LoupeIcon />
                    </button>

                </div>
                <ReactGrid columns={PatientOPRegisterColumns} RowData={Filterdata} />

            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    )
}

export default GeneralBillingList;