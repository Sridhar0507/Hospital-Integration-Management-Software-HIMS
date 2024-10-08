import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { useNavigate } from 'react-router-dom';

const ServiceProcedureMaster = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const UserData = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const ServiceProcedureMasteredit = useSelector(state => state.userRecord?.ServiceProcedureMaster);
    const [ServiceProcedureForm, setServiceProcedureForm] = useState('Service');

    const dispatchvalue = useDispatch()
    const navigate = useNavigate()




    const [ServiceMasterData, setServiceMasterData] = useState({
        Department: "",
        ServiceCode: "",
        ServiceName: "",
        ServiceType: "",
        Amount: "",
        IsGst: "No",
        GSTValue: "Nill",
    });
    const [ProcedureMasterData, setProcedureMasterData] = useState({
        Type: "",
        ProcedureCode: "",
        ProcedureName: "",
        Amount: "",
        IsGst: "No",
        GSTValue: "Nill",
    });
    const cleardatass = useCallback(() => {
        setServiceMasterData({
            Department: "",
            ServiceCode: "",
            ServiceName: "",
            ServiceType: "",
            Amount: "",
            IsGst: "No",
            GSTValue: "Nill",

        });
        setProcedureMasterData({
            Type: "",
            ProcedureCode: "",
            ProcedureName: "",
            Amount: "",
            IsGst: "No",
            GSTValue: "Nill",
        });
    }, []);

    const handleselectChange = (e) => {
        const { value } = e.target
        setServiceProcedureForm(value)
        cleardatass()
    }




    useEffect(() => {
        if (Object.keys(ServiceProcedureMasteredit).length > 0) {
            const { MasterType, ...data } = ServiceProcedureMasteredit
            setServiceProcedureForm(MasterType)
            if (MasterType === 'Service') {
                setServiceMasterData({
                    Department: data.Department,
                    ServiceCode: data.id,
                    ServiceName: data.ServiceName,
                    ServiceType: data.ServiceType,
                    Amount: data.Amount,
                    IsGst: data.IsGst,
                    GSTValue: data.GSTValue,
                });
            } else {
                setProcedureMasterData({
                    Type: data.Type,
                    ProcedureCode: data.id,
                    ProcedureName: data.ProcedureName,
                    Amount: data.Amount,
                    IsGst: data.IsGst,
                    GSTValue: data.GSTValue,
                });
            }
        } else {

        }

    }, [ServiceProcedureMasteredit])
    const formatLabel = (label) => {
        if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
            return label
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase());
        } else {
            return label;
        }
    };
    const handleOnchange = (e) => {
        const { name, value } = e.target
        if (ServiceProcedureForm === 'Service') {

            setServiceMasterData((prev) => ({
                ...prev,
                [name]: value.trim(),
            }))


        } else {
            setProcedureMasterData((prev) => ({
                ...prev,
                [name]: value.trim()

            }))
        }
    }
    console.log('ServiceMasterData', ServiceMasterData);
    // console.log('ProcedureMasterData',ProcedureMasterData);
    const handlesubmit = () => {
        const requiredfields = [...Object.keys(ServiceProcedureForm === 'Service' ? ServiceMasterData : ProcedureMasterData).filter(f => !['ServiceCode', 'ProcedureCode'].includes(f))]
        console.log('requiredfields', requiredfields);
        const emptyFields = requiredfields.filter((field) => ServiceProcedureForm === 'Service' ? !ServiceMasterData[field] : !ProcedureMasterData[field]);
        if (emptyFields.length > 0) {
            console.log('emptyFields', emptyFields);
            const tdata = {
                message: `Please fill empty fields: ${emptyFields.join(", ")}`,
                type: 'warn',
            }

            dispatchvalue({ type: 'toast', value: tdata });

        } else {

            let submitdata = {};
            if (ServiceProcedureForm === 'Service') {
                submitdata = {
                    ...ServiceMasterData,
                    Created_by: UserData?.username,
                    MasterType: ServiceProcedureForm,
                };
            } else {
                submitdata = {
                    ...ProcedureMasterData,
                    Created_by: UserData?.username,
                    MasterType: ServiceProcedureForm,
                };
            }
            axios.post(`${UrlLink}Masters/Service_Procedure_Master_Detials_link`, submitdata)
                .then(res => {
                    dispatchvalue({ type: 'ServiceProcedureMaster', value: {} })
                    console.log(res.data);
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    cleardatass()
                    navigate('/Home/ServiceProcedureMasterList')
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }


    return (
        <>
            <div className="Main_container_app">
                <h3>Service / Procedure Master</h3>
                <br/>
                <div className="RegisterTypecon">
                    <div className="RegisterType">
                        {["Service", "Procedure"].filter((p) => Object.keys(ServiceProcedureMasteredit).length > 0 ? p === ServiceProcedureMasteredit.MasterType : p).map((p, ind) => (
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
                <div className="RegisFormcon_1">
                    {Object.keys(ServiceProcedureForm === 'Service' ? ServiceMasterData : ProcedureMasterData).filter(f => !Object.keys(ServiceProcedureMasteredit).length > 0 ? !['ServiceCode', 'ProcedureCode'].includes(f) : f).map((field, indx) => (
                        <div className="RegisForm_1" key={indx}>
                            <label htmlFor={`${field}_${indx}_${field}`}> {field === 'GSTValue' ? 'GST Value' : formatLabel(field)} <span>:</span> </label>
                            {

                                ["Department", 'Type','ServiceType', 'GSTValue'].filter(f => (ServiceProcedureForm === 'Service' ? ServiceMasterData.IsGst !== 'Yes' : ProcedureMasterData.IsGst !== 'Yes') ? f !== 'GSTValue' : f).includes(field) ?
                                    <select
                                        name={field}
                                        disabled={field !== 'GSTValue' && Object.keys(ServiceProcedureMasteredit).length > 0}
                                        value={ServiceProcedureForm === 'Service' ? ServiceMasterData[field] : ProcedureMasterData[field]}
                                        onChange={handleOnchange}
                                    >
                                        <option value="">Select</option>
                                        {field === 'GSTValue' &&

                                            ['28', '18', '12', '5'].map((val, ind) => (
                                                <option key={ind} value={val}>{val}%</option>
                                            ))
                                        }
                                        {field === 'Department' &&

                                            ["OP", "IP", "Both OP and IP"].map((val, ind) => (
                                                <option key={ind} value={val}>{val}</option>
                                            ))
                                        }
                                        {field === 'ServiceType' &&

                                            ["Quantity", "Hourly"].map((val, ind) => (
                                                <option key={ind} value={val}>{val}</option>
                                            ))
                                        }
                                        {field === 'Type' &&

                                            ["Interventional", "Diagnostic"].map((val, ind) => (
                                                <option key={ind} value={val}>{val}</option>
                                            ))
                                        }

                                    </select>
                                    :
                                    field === 'IsGst' ?
                                        (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '150px' }}>
                                                <label style={{ width: '60px', cursor: 'pointer' }} >
                                                    <input
                                                        id={`${field}_${indx}_${field}_Yes`}
                                                        type="radio"
                                                        name={field}
                                                        value="Yes"
                                                        style={{ width: '15px' }}
                                                        checked={ServiceProcedureForm === 'Service' ? ServiceMasterData[field] === 'Yes' : ProcedureMasterData[field] === 'Yes'}
                                                        onChange={(e) => {
                                                            if (ServiceProcedureForm === 'Service') {

                                                                setServiceMasterData((prev) => ({
                                                                    ...prev,
                                                                    IsGst: 'Yes',
                                                                    GSTValue: ''
                                                                }))


                                                            } else {
                                                                setProcedureMasterData((prev) => ({
                                                                    ...prev,
                                                                    IsGst: 'Yes',
                                                                    GSTValue: ''
                                                                }))
                                                            }
                                                        }}
                                                    />
                                                    Yes
                                                </label>
                                                <label style={{ width: '60px', cursor: 'pointer' }} >
                                                    <input
                                                        id={`${field}_${indx}_${field}_No`}
                                                        type="radio"
                                                        name={field}
                                                        value="No"
                                                        style={{ width: '15px' }}
                                                        checked={ServiceProcedureForm === 'Service' ? ServiceMasterData[field] === 'No' : ProcedureMasterData[field] === 'No'}
                                                        onChange={(e) => {
                                                            if (ServiceProcedureForm === 'Service') {

                                                                setServiceMasterData((prev) => ({
                                                                    ...prev,
                                                                    IsGst: 'No',
                                                                    GSTValue: 'Nill'
                                                                }))


                                                            } else {
                                                                setProcedureMasterData((prev) => ({
                                                                    ...prev,
                                                                    IsGst: 'No',
                                                                    GSTValue: 'Nill'

                                                                }))
                                                            }
                                                        }}
                                                    />
                                                    No
                                                </label>
                                            </div>
                                        ) :
                                        <input

                                            readOnly={field === 'GSTValue' ? (ServiceProcedureForm === 'Service' ? ServiceMasterData['IsGst'] !== 'Yes' : ProcedureMasterData['IsGst'] !== 'Yes') : ['ServiceCode', 'ProcedureCode'].includes(field) && Object.keys(ServiceProcedureMasteredit).length > 0}
                                            type={['Amount'].includes(field) ? 'number' : 'text'}
                                            onKeyDown={(e) => ['Amount'].includes(field) && ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                                            value={ServiceProcedureForm === 'Service' ? ServiceMasterData[field] : ProcedureMasterData[field]}
                                            onChange={handleOnchange}
                                            name={field}
                                            autoComplete="off"
                                        />
                            }
                        </div>

                    ))}
                    <div className="Main_container_Btn">
                        <button onClick={handlesubmit}>
                            {(ServiceProcedureForm === 'Service' ? ServiceMasterData.ServiceCode : ProcedureMasterData.ProcedureCode) ? "Update" : "Save"}
                        </button>
                    </div>
                </div>

            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    )
}

export default ServiceProcedureMaster;