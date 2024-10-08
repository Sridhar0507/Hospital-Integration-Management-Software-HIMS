import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoupeIcon from "@mui/icons-material/Loupe";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import ModelContainer from '../../OtherComponent/ModelContainer/ModelContainer';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';

const ServiceProcedureMasterList = () => {
    const dispatchvalue = useDispatch();
    const navigate = useNavigate()
    const [ServiceProcedureForm, setServiceProcedureForm] = useState('Service');
    const [ServiceProcedureColumns, setServiceProcedureColumns] = useState([]);
    const [ServiceProcedureData, setServiceProcedureData] = useState([]);
    const [getChanges, setgetChanges] = useState(false);
    const [loading, setLoading] = useState(false);
    const pagewidth = useSelector(state => state.userRecord?.pagewidth);
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const [SearchQuery, setSearchQuery] = useState({
        Type: '',
        SearchBy: ''
    })

    const handlesearch = (e) => {
        const { name, value } = e.target
        setSearchQuery((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleselectChange = (e) => {
        const { value } = e.target
        setLoading(true)
        setTimeout(() => {
            setServiceProcedureForm(value)
            setSearchQuery({
                Type: '',
                SearchBy: ''
            })
            setLoading(false)
        }, 200);


    }

    const handlenewmaster = () => {

        dispatchvalue({ type: 'ServiceProcedureMaster', value: {} })
        navigate('/Home/ServiceProcedureMaster')
    }



    const handleeditstatus = useCallback((params) => {
        const data = {
            MasterType: ServiceProcedureForm,
            id: params.id,
        }
        axios.post(`${UrlLink}Masters/update_status_Service_Procedure_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setgetChanges(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })

    }, [ServiceProcedureForm, UrlLink, dispatchvalue])



    const handleRequestEdit = useCallback((data) => {
        dispatchvalue({ type: 'ServiceProcedureMaster', value: { MasterType: ServiceProcedureForm, ...data } })
        navigate('/Home/ServiceProcedureMaster')
    }, [ServiceProcedureForm, dispatchvalue])


    const handleRatecardview = useCallback((params) => {
        const data = {
            MasterType: ServiceProcedureForm,
            id: params.id
        }
        dispatchvalue({ type: 'ServiceProcedureRatecardView', value: data })
        navigate('/Home/ServiceProcedureRatecard')
    }, [ServiceProcedureForm, dispatchvalue, navigate])

    useEffect(() => {
        const commonColumns = [
            { key: 'IsGst', name: 'IsGst' },
            { key: 'GSTValue', name: 'GSTValue' },
            {
                key: "Status",
                name: "Status",
                frozen: pagewidth > 1000 ? true : false,
                renderCell: (params) => (

                    <Button
                        className="cell_btn"
                        onClick={() => handleeditstatus(params.row)}
                    >
                        {params.row.Status}
                    </Button>
                )

            },
            {
                key: 'RatecardView',
                name: 'Ratecard View',
                renderCell: (params) => (
                    <Button className='cell_btn' onClick={() => handleRatecardview(params.row)}>
                        <VisibilityIcon />
                    </Button>
                ),
            },
            {
                key: 'Action',
                name: 'Action',
                renderCell: (params) => (
                    <Button className='cell_btn' onClick={() => handleRequestEdit(params.row)}>
                        <EditIcon />
                    </Button>
                ),
            },
        ];

        const ServiceColumns = [
            {
                key: 'id',
                name: 'Service Id',
                frozen: pagewidth > 500 ? true : false
            },
            {
                key: 'ServiceName',
                name: 'Service Name',
                frozen: pagewidth > 700 ? true : false
            },
            { key: 'ServiceType', name: 'Service Name' },
            { key: 'Department', name: 'Department' },
            ...commonColumns,
        ];

        const ProcedureColumns = [
            {
                key: 'id',
                name: ' Procedure Id',
                frozen: pagewidth > 500 ? true : false
            },
            {
                key: 'ProcedureName',
                name: ' Procedure Name',
                frozen: pagewidth > 700 ? true : false
            },
            { key: 'Type', name: 'Procedure Type' },
            ...commonColumns,
        ];

        setServiceProcedureColumns(ServiceProcedureForm === 'Service' ? ServiceColumns : ProcedureColumns);
    }, [ServiceProcedureForm, pagewidth, handleRequestEdit, handleeditstatus, handleRatecardview]);


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data = {
                    MasterType: ServiceProcedureForm,
                    ...SearchQuery
                }
                const [filteredRows] = await Promise.all([
                    axios.get(`${UrlLink}Masters/Service_Procedure_Master_Detials_link`, { params: data })
                ])
                setServiceProcedureData(filteredRows.data)
                // setMastertypedata(Mastertypedata.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }


        fetchdata()
    }, [UrlLink, getChanges, ServiceProcedureForm, SearchQuery]);


    return (
        <>
            <div className="Main_container_app">
                <h3>Service / Procedure Master</h3>
                <br />
                <div className="RegisterTypecon">
                    <div className="RegisterType">
                        {["Service", "Procedure"].map((p, ind) => (
                            <div className="registertypeval" key={ind + 'key'}>
                                <input
                                    type="radio"
                                    id={p}
                                    name="appointment_type"
                                    checked={ServiceProcedureForm === p}
                                    onChange={handleselectChange}
                                    value={p}
                                />
                                <label htmlFor={p}>
                                    {p}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <div className="search_div_bar">
                    {ServiceProcedureForm !== 'Client' &&
                        <div className=" search_div_bar_inp_1">
                            <label htmlFor="">{ServiceProcedureForm} Type
                                <span>:</span>
                            </label>
                            <select
                                name='Type'
                                value={SearchQuery.Type}
                                onChange={handlesearch}
                            >
                                <option value="">Select</option>
                                {
                                    ServiceProcedureForm === 'Service' &&
                                    ["OP", "IP", "Both"].map((val, ind) => (
                                        <option key={ind} value={val}>{val === 'Both' ? "both IP and OP" : val}</option>
                                    ))
                                }
                                {
                                    ServiceProcedureForm === 'Procedure' &&
                                    ["Interventional", "Diagnostic"].map((val, ind) => (
                                        <option key={ind} value={val}>{val}</option>
                                    ))
                                }
                            </select>
                        </div>}
                    <div className=" search_div_bar_inp_1">
                        <label htmlFor="">Search Here
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            name='SearchBy'
                            value={SearchQuery.SearchBy}
                            placeholder={`By ${ServiceProcedureForm} ...`}
                            onChange={handlesearch}
                        />
                    </div>
                    <button
                        className="search_div_bar_btn_1"
                        onClick={handlenewmaster}
                        title="New Master"
                    >
                        <LoupeIcon />
                    </button>

                </div>
                <br />
                <ReactGrid columns={ServiceProcedureColumns} RowData={ServiceProcedureData} />
            </div>
            {loading &&
                <div className="loader">
                    <div className="Loading">
                        <div className="spinner-border"></div>
                        <div>Loading...</div>
                    </div>
                </div>
            }
            <ToastAlert Message={toast.message} Type={toast.type} />
            <ModelContainer />
        </>
    )
}

export default ServiceProcedureMasterList;