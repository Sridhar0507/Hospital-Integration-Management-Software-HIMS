import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';


const IP_NurseQueslist = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const [searchOPParams, setsearchOPParams] = useState({
         query: '',
         status: 'Admitted',
         type: 'IP' 
         });
    const dispatchvalue = useDispatch();
    const navigate = useNavigate()
    const [PatientRegisterData, setPatientRegisterData] = useState([])
    const pagewidth = useSelector(state => state.userRecord?.pagewidth);


    // useEffect(() => {
    //     axios.get(`${UrlLink}Frontoffice/get_ip_registration_before_handover_details`, { params: searchOPParams })
    //         .then((res) => {
    //             const ress = res.data;
    //             if (Array.isArray(ress)) {
    //                 setPatientRegisterData(ress);
    //             } else {
    //                 setPatientRegisterData([]);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [UrlLink, searchOPParams]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;

                // Fetch IP data or Casuality data based on the 'type' in searchOPParams
                if (searchOPParams.type === 'IP') {
                    response = await axios.get(`${UrlLink}Frontoffice/get_ip_registration_before_handover_details`, { params: searchOPParams });
                } else if (searchOPParams.type === 'Casuality') {
                    response = await axios.get(`${UrlLink}Frontoffice/get_patient_casuality_details`, { params: searchOPParams });
                }

                const data = response.data;

                // Check if the response is an array
                if (Array.isArray(data)) {
                    setPatientRegisterData(data);
                } else {
                    setPatientRegisterData([]);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [UrlLink, searchOPParams]); 




    const handleTypeChange = (e) => {
        const newType = e.target.value;
        // Determine the new status based on the selected type
        const newStatus = newType === 'Casuality' ? 'Pending' : 'Admitted';

        // Update both type and status in state
        setsearchOPParams({ ...searchOPParams, type: newType, status: newStatus });
    };

    // const handleeditIPPatientRegister = (params) => {
    //     console.log('params',params)
    //     const { RegistrationId } = params;
      
    //         axios.get(`${UrlLink}OP/get_workbenchquelist_doctor`, { params: { RegistrationId: RegistrationId, Type: 'IP' } })
    //         .then((res) => {
    //             console.log(res);

    //             dispatchvalue({ type: 'IP_DoctorWorkbenchNavigation', value: {...res.data,...params}});
    //             navigate('/Home/IP_NurseWorkbenchNavigation');
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })

    // }


    const handleeditIPPatientRegister = (params, type) => {
        console.log('params', params);
        const { RegistrationId } = params;

        const requestType = type || searchOPParams.type; // Use selected type or fallback to default

        axios.get(`${UrlLink}OP/get_workbenchquelist_doctor`, { params: { RegistrationId, Type: requestType } })
            .then((res) => {
                console.log(res);
                dispatchvalue({ type: 'IP_DoctorWorkbenchNavigation', value: { ...res.data, ...params,RequestType:requestType } });
                navigate('/Home/IP_NurseWorkbenchNavigation');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    


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
                (params.row.Status === 'Admitted' || params.row.Status === 'Pending') ? (
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditIPPatientRegister(params.row, searchOPParams.type)} // Use selected type
                    >
                        <ArrowForwardIcon className="check_box_clrr_cancell" />
                    </Button>
                ) : (
                    '-'
                )
            ),
        }
        
        
    ]

    return (
        <>
            <div className="Main_container_app">
                <h3>Nurse Que List</h3>
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
                            <option value='Pending'>Pending</option>
                            <option value='Completed'>Completed</option>
                        </select>
                    </div>

                    {/* Dropdown for IP/Casuality Type Selection */}
                    <div className="search_div_bar_inp_1">
                        <label>Type<span>:</span></label>
                        <select value={searchOPParams.type} onChange={handleTypeChange}>
                            <option value="IP">IP</option>
                            <option value="Casuality">Casuality</option>
                        </select>
                    </div>


                </div>

                <ReactGrid columns={PatientOPRegisterColumns} RowData={PatientRegisterData} />
            </div>
        </>
    )
}

export default IP_NurseQueslist;

