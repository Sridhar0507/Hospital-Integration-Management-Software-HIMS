import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';

const ServiceProcedureRequest = () => {
    const [ServiceProcedureForm, setServiceProcedureForm] = useState('Service');
    const [ServiceProcedureData, setServiceProcedureData] = useState([]);
    const [ServiceProcedureDataGet, setServiceProcedureDataGet] = useState([]);
    const [ServiceProcedure, setServiceProcedure] = useState({
        id: '',
        Units: ''
    });
    const [getdata, setgetdata] = useState(false)
    const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const UserData = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const dispatchvalue = useDispatch()
    useEffect(() => {
        axios.get(`${UrlLink}/Masters/get_service_procedure_for_ip?MasterType=${ServiceProcedureForm}`)
            .then((res) => {
                setServiceProcedureData(Array.isArray(res.data) ? res.data : [])
            })
            .catch((err) => {
                console.log(err);

            })
    }, [ServiceProcedureForm, UrlLink])

    useEffect(() => {
        axios.get(`${UrlLink}/Frontoffice/service_procedure_request?MasterType=${ServiceProcedureForm}&RegistrationId=${IP_DoctorWorkbenchNavigation?.RegistrationId}`)
            .then((res) => {
                setServiceProcedureDataGet(Array.isArray(res.data) ? res.data : [])
            })
            .catch((err) => {
                console.log(err);
            })
    }, [ServiceProcedureForm, IP_DoctorWorkbenchNavigation?.RegistrationId, UrlLink, getdata])


    const handlesubmit = () => {
        if (ServiceProcedure?.id && ServiceProcedure.Units) {
            const submitdata = {
                RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
                ...ServiceProcedure,
                MasterType: ServiceProcedureForm,
                createdby: UserData?.username
            }

            axios.post(`${UrlLink}Frontoffice/service_procedure_request`, submitdata)
                .then(res => {
                    console.log(res.data);
                    const resres = res.data;
                    let typp = Object.keys(resres)[0];
                    let mess = Object.values(resres)[0];
                    const tdata = {
                        message: mess,
                        type: typp,
                    };
                    setgetdata(prev => !prev)
                    dispatchvalue({ type: 'toast', value: tdata });

                    setServiceProcedure({
                        id: '',
                        Units: ''
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            const tdata = {
                message: 'Please fill all the fields',
                type: 'warn',
            };
            dispatchvalue({ type: 'toast', value: tdata });

        }

    }

    const Servicecolumns1 = [
        {
            key: "DateTime",
            name: "Date Time",
            frozen: true
        },
        {
            key: "Status",
            name: "Status",
            frozen: true
        },
    ]
    const Servicecolumns = [
        {
            key: "DateTime",
            name: "Date Time",
            frozen: true
        },
        {
            key: "Status",
            name: "Status",
            frozen: true
        },
        {
            key: "ServiceName",
            name: `${ServiceProcedureForm} Name`,
        },
        ServiceProcedureForm === 'Procedure' ? {
            key: "ServiceType",
            name: `${ServiceProcedureForm} Type`,
        } : undefined,
        {
            key: "Units",
            name: "Units",
        }
    ].filter(Boolean); // Filters out undefined values

    return (
        <>
            <div className='new-patient-registration-form'>
                <div className='DivCenter_container'>Service / Procedure Request</div>
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
                                    onChange={(e) => {
                                        setServiceProcedureForm(e.target.value)
                                        setServiceProcedure({
                                            id: '',
                                            Units: ''
                                        })
                                    }
                                    }
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
                <div className="RegisFormcon_1" >
                    {
                        Object.keys(ServiceProcedure).filter(p => p !== 'Name').map((field, indx) => (
                            <div className="RegisForm_1" key={indx}>
                                <label htmlFor={`${field}_${indx}`}>
                                    {field === 'id' ? ServiceProcedureForm : field}
                                    <span>:</span>
                                </label>
                                {
                                    field === 'id' ?
                                        <select

                                            value={ServiceProcedure[field]}
                                            onChange={(e) => setServiceProcedure(prev => ({
                                                ...prev, [field]: e.target.value
                                            }))}
                                        >
                                            <option value="">Select</option>
                                            {
                                                ServiceProcedureData.map((row, indx) => (
                                                    <option value={row.id} key={indx}>{ServiceProcedureForm === 'Procedure' ? `${row.name} | ${row.Type}` : row.name}</option>
                                                ))
                                            }
                                        </select>
                                        :
                                        <input
                                            type='number'
                                            value={ServiceProcedure[field]}
                                            onChange={(e) => setServiceProcedure(prev => ({
                                                ...prev, [field]: e.target.value
                                            }))}
                                            onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                                        />
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="Main_container_Btn">
                    <button onClick={handlesubmit}>
                        Add
                    </button>
                </div>
                <br />
                <ReactGrid columns={Servicecolumns} RowData={ServiceProcedureDataGet} />

            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />

        </>
    )
}

export default ServiceProcedureRequest;