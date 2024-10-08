import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';


const IP_BillingEntryQuelist = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const [searchOPParams, setsearchOPParams] = useState({
         query: '',
         status: 'Admitted' });
    const dispatchvalue = useDispatch();
    const navigate = useNavigate()
    const [PatientRegisterData, setPatientRegisterData] = useState([])
    const pagewidth = useSelector(state => state.userRecord?.pagewidth);


    useEffect(() => {
        axios.get(`${UrlLink}Frontoffice/get_ip_registration_before_handover_details`, { params: searchOPParams })
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

    const handleeditIPPatientRegister = (params) => {
        console.log('params',params)
        const { RegistrationId } = params;
      
            axios.get(`${UrlLink}OP/get_workbenchquelist_doctor`, { params: { RegistrationId: RegistrationId, Type: 'IP' } })
            .then((res) => {
                console.log('asaaaasssss',res);

                dispatchvalue({ type: 'IP_DoctorWorkbenchNavigation', value: res.data,...params});
                navigate('/Home/IP_BillingEntry');
            })
            .catch((err) => {
                console.log(err);
            })


    }


    const handleSearchChange = (e) => {
        const { name, value } = e.target

        setsearchOPParams({ ...searchOPParams, [name]: value });

    };

    const PatientOPRegisterColumns = [
        {
            key: "id",
            name: "S.No",
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
            width: 150,
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PhoneNo",
            name: "PhoneNo",
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
                params.row.Status === 'Admitted' ?
                    <>
                        <Button
                            className="cell_btn"
                            onClick={() => handleeditIPPatientRegister(params.row)}
                        >
                            <ArrowForwardIcon className="check_box_clrr_cancell" />
                        </Button>
                    </>
                    :
                    '-'
            ),
        },
    ]

    return (
        <>
            <div className="Main_container_app">
                <h3>IP Bill Entry Que List</h3>
                {/* <div className='DivCenter_container'>OP Patient Details </div> */}
                <div className="search_div_bar">
                    <div className=" search_div_bar_inp_1">
                        <label htmlFor="">Search by
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            name='query'
                            value={searchOPParams.query}
                            placeholder='Search here ... '
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="search_div_bar_inp_1">
                        <label htmlFor="">Status
                            <span>:</span>
                        </label>
                        <select
                            id=''
                            name='status'
                            value={searchOPParams.status}
                            onChange={handleSearchChange}
                        >
                            {/* <option value=''>Select</option> */}
                            {/* <option value='Pending'>Pending</option> */}
                            <option value='Admitted'>Admitted</option>
                            <option value='Cancelled'>Cancelled</option>
                        </select>
                    </div>


                </div>
                <ReactGrid columns={PatientOPRegisterColumns} RowData={PatientRegisterData} />
            </div>
        </>
    )
}

export default IP_BillingEntryQuelist;

