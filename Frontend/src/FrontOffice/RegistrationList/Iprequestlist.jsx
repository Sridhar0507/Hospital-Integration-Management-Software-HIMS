import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

const Iprequestlist = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const [searchOPParams, setsearchOPParams] = useState({ query: '', status: 'Pending' });
    const dispatchvalue = useDispatch();
    const navigate = useNavigate()
    const [PatientRegisterData, setPatientRegisterData] = useState([])
    useEffect(() => {
        
        axios.get(`${UrlLink}Frontoffice/insert_op_ip_convertion`, { params: searchOPParams })
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

    const handleeditOPPatientRegister = (params) => {
        console.log('params', params)
        dispatchvalue({ type: 'Registeredit', value: { Type: 'IP', conversion: true, ...params } });
        navigate('/Home/Registration')

    }


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
            key: "Patient_Name",
            name: "Patient Name",
        },


        {
            key: "Age",
            name: "Age",
        },
        {
            key: "Status",
            name: "Status",
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                params.row.Status === 'Pending' ?
                    <>
                        <Button
                            className="cell_btn"
                            onClick={() => handleeditOPPatientRegister(params.row)}
                        >
                            <ArrowForwardIcon className="check_box_clrr_cancell" />
                        </Button>
                    </>
                    : 'No Action'
            ),
        },
    ]


    return (
        <>
            <div className="Main_container_app">
                <h3>Ip Request Que List</h3>
                {/* <div className='DivCenter_container'>OP Patient Details </div> */}
                <div className="search_div_bar">

                    <div className=" RegisForm_1">
                        <label htmlFor="">Status
                            <span>:</span>
                        </label>
                        <select
                            id=''
                            name='status'
                            value={searchOPParams.status}
                            onChange={(e) => setsearchOPParams((prev) => ({
                                ...prev,
                                status: e.target.value
                            }))}
                        >
                            {/* <option value=''>Select</option> */}
                            <option value='Pending'>Pending</option>
                            <option value='Completed'>Completed</option>
                        </select>
                    </div>


                </div>
                <ReactGrid columns={PatientOPRegisterColumns} RowData={PatientRegisterData} />
            </div>
        </>
    )
}

export default Iprequestlist