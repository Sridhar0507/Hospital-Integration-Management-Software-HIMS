import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from '../../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';



const IP_BloodLines = () => {
    const dispatch = useDispatch();
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
    console.log(IP_DoctorWorkbenchNavigation, 'IP_DoctorWorkbenchNavigation');

    const userRecord = useSelector((state) => state.userRecord?.UserData);


    const formatLabel = (label) => {

        if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
            return label
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase());
        } else {
            return label;
        }
    };



    const [BloodLines, setBloodLines] = useState({

        BlType: "",
        IVsite: "",
        IAsite: "",
        Condition: "",
        Status: "",
        CentralLineInfection: "",
        Remarks: "",

    });


    const [gridData, setGridData] = useState([])
    const [IsGetData, setIsGetData] = useState(false)

    const [IsViewMode, setIsViewMode] = useState(false)



    const BloodLinesColumns = [
        {
            key: 'id',
            name: 'S.No',
            frozen: true
        },
        { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },

        {
            key: 'CurrDate',
            name: 'Date',
            frozen: true
        },
        {
            key: 'CurrTime',
            name: 'Time',
            frozen: true
        },



        {
            key: 'view',
            frozen: true,
            name: 'View',
            renderCell: (params) => (
                <IconButton onClick={() => handleView(params.row)}>
                    <VisibilityIcon />
                </IconButton>
            ),
        },
        { key: 'BlType', name: 'Type' },
        { key: 'IVsite', name: 'IVsite' },
        { key: 'IAsite', name: 'IAsite' },
        { key: 'Condition', name: 'Condition' },
        { key: 'Status', name: 'Status' },
        { key: 'CentralLineInfection', name: 'CentralLineInfection' },
        { key: 'Remarks', name: 'Remarks' },


    ]

    // Handle setting the form data when viewing
    const handleView = (data) => {
        setBloodLines({
            BlType: data.BlType || '',
            IVsite: data.IVsite || '',
            IAsite: data.IAsite || '',
            Condition: data.Condition || '',
            Status: data.Status || '',
            CentralLineInfection: data.CentralLineInfection || '',
            Remarks: data.Remarks || '',

        });
        setIsViewMode(true);
    };


    // Handle clearing the form and resetting the view mode
    const handleClear = () => {
        setBloodLines({
            BlType: '',
            IVsite: '',
            IAsite: '',
            Condition: '',
            Status: '',
            CentralLineInfection: '',
            Remarks: '',

        });
        setIsViewMode(false);
    };



    useEffect(() => {

        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        if (RegistrationId) {
            axios.get(`${UrlLink}Ip_Workbench/IP_BloodLines_Details_Link`, { 
                params: {
                    RegistrationId: RegistrationId,
                    DepartmentType: departmentType
                }
             })
                .then((res) => {
                    const ress = res.data
                    console.log(ress)
                    setGridData(ress)

                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [UrlLink, IP_DoctorWorkbenchNavigation, IsGetData])




    const HandleOnChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = value.trim();
        setBloodLines((prevFormData) => ({
            ...prevFormData,
            [name]: formattedValue,
        }));
    };


    const handleSubmit = () => {

        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const DepartmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        if (!RegistrationId) {
            dispatch({ type: 'toast', value: { message: 'Registration ID is missing', type: 'error' } });
            return;
        }

        console.log(IP_DoctorWorkbenchNavigation?.RegistrationId);

        const senddata = {
            ...BloodLines,
            RegistrationId,
            Createdby: userRecord?.username,
            DepartmentType,
        }

        console.log(senddata, 'senddata');

        axios.post(`${UrlLink}Ip_Workbench/IP_BloodLines_Details_Link`, senddata)
            .then((res) => {
                const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
                dispatch({ type: 'toast', value: { message, type } });
                setIsGetData(prev => !prev);
                handleClear();
            })
            .catch((err) => console.log(err));

    }


    return (
        <>

            <div className="RegisFormcon_1">
            <br/>
                <div className="common_center_tag">
                    <span>Blood Lines</span>
                </div>

                {/* Status Field */}
                

                <div className='RegisForm_1'>
                    <label htmlFor="Status_0">Status<span>:</span></label>
                    <select
                        id="Status_0"
                        name="Status"
                        value={BloodLines.Status}
                        onChange={HandleOnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                    >
                        <option value="">Select</option>
                        <option value="Inserted">Inserted</option>
                        <option value="StatusCheck">StatusCheck</option>
                        <option value="Removed">Removed</option>
                    </select>
                </div>  
               
                {/* BlType Field */}
                <div className='RegisForm_1'>
                    <label htmlFor="BlType_0">Type<span>:</span></label>
                    <select
                        id="BlType_0"
                        name="BlType"
                        value={BloodLines.BlType}
                        onChange={HandleOnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                    >
                        <option value="">Select</option>
                        <option value="IV">IV</option>
                        <option value="IA">IA</option>
                    </select>
                </div>

                {/* IVsite Field (only shown if BlType is 'IV') */}
                {BloodLines.BlType === 'IV' && (
                    <div className='RegisForm_1'>
                        <label htmlFor="IVsite_0">IV Site<span>:</span></label>
                        <select
                            id="IVsite_0"
                            name="IVsite"
                            value={BloodLines.IVsite}
                            onChange={HandleOnChange}
                            readOnly={IsViewMode}
                            disabled = {IsViewMode}
                        >
                            <option value="">Select</option>
                            <option value="External Jugular">External Jugular</option>
                            <option value="Subclavian vein">Subclavian vein</option>
                            <option value="Femoral vein">Femoral vein</option>
                            <option value="Dorsal Venous Network of Hand">Dorsal Venous Network of Hand</option>
                            <option value="Radial vein">Radial vein</option>
                            <option value="Median Cubital vein">Median Cubital vein</option>
                            <option value="Cephalic vein">Cephalic vein</option>
                            <option value="Dorsal Venous Network of Leg">Dorsal Venous Network of Leg</option>
                            <option value="Saphaneous vein">Saphaneous vein</option>
                            <option value="Superficial Temporal vein">Superficial Temporal vein</option>
                        </select>
                    </div>
                )}

                {/* IASite Field (only shown if BlType is 'IA') */}
                {BloodLines.BlType === 'IA' && (
                    <div className='RegisForm_1'>
                        <label htmlFor="IAsite_0">IA Site<span>:</span></label>
                        <select
                            id="IAsite_0"
                            name="IAsite"
                            value={BloodLines.IAsite}
                            onChange={HandleOnChange}
                            readOnly={IsViewMode}
                            disabled = {IsViewMode}
                        >
                            <option value="">Select</option>
                            <option value="Radial">Radial</option>
                            <option value="Ulnar">Ulnar</option>
                            <option value="Brachial">Brachial</option>
                            <option value="Axillary">Axillary</option>
                            <option value="Posterior tibial">Posterior tibial</option>
                            <option value="Femoral">Femoral</option>
                            <option value="Dorsalis Pedis">Dorsalis Pedis</option>
                        </select>
                    </div>
                )}

                {/* Condition Field */}
                <div className='RegisForm_1'>
                    <label htmlFor="Condition_0">Condition<span>:</span></label>
                    <select
                        id="Condition_0"
                        name="Condition"
                        value={BloodLines.Condition}
                        onChange={HandleOnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                    >
                        <option value="">Select</option>
                        <option value="Clean">Clean</option>
                        <option value="Redness">Redness</option>
                        <option value="Swelling">Swelling</option>
                        <option value="Draining">Draining</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                </div>

                


               

                {BloodLines.Status !== 'Inserted' && (
                    <div className='RegisForm_1'>
                        <label htmlFor="CentralLineInfection_Yes">CentralLine Infection<span>:</span></label>

                        <div className="text_adjust_mt_Ot_rado_0">

                            <input
                                type='radio'
                                id="CentralLineInfection_Yes"
                                name="CentralLineInfection"
                                value='Yes'
                                checked={BloodLines.CentralLineInfection === 'Yes'}
                                onChange={HandleOnChange}
                                readOnly={IsViewMode}
                                disabled = {IsViewMode}
                            />
                            <label htmlFor="CentralLineInfection_Yes">Yes</label>

                            <input
                                type='radio'
                                id="CentralLineInfection_No"
                                name="CentralLineInfection"
                                value='No'
                                checked={BloodLines.CentralLineInfection === 'No'}
                                onChange={HandleOnChange}
                                readOnly={IsViewMode}
                                disabled = {IsViewMode}
                            />
                            <label htmlFor="CentralLineInfection_No">No</label>
                        </div>
                    </div>
                )}    
                
    

                {/* Remarks Field */}
                <div className='RegisForm_1'>
                    <label htmlFor="Remarks_0">Remarks<span>:</span></label>
                    <textarea
                        id="Remarks_0"
                        name="Remarks"
                        value={BloodLines.Remarks}
                        onChange={HandleOnChange}
                        readOnly={IsViewMode}
                        placeholder='Enter your remarks here'
                    />
                </div>
            </div>



            <div className="Main_container_Btn">

                {IsViewMode && (
                    <button onClick={handleClear}>Clear</button>
                )}
                {!IsViewMode && (
                    <button onClick={handleSubmit}>Submit</button>
                )}
            </div>

            {gridData.length >= 0 &&
                <ReactGrid columns={BloodLinesColumns} RowData={gridData} />
            }

            <ToastAlert Message={toast.message} Type={toast.type} />

        </>
    )
}


export default IP_BloodLines;