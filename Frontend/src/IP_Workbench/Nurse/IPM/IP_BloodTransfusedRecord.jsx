import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from '../../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';



const IP_BloodTransfusedRecord = () => {
    const dispatch = useDispatch();
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
    console.log(IP_DoctorWorkbenchNavigation,'IP_DoctorWorkbenchNavigation');

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

   

    const [BloodTransfusedRecord, setBloodTransfusedRecord] = useState({
       
        SourcedFrom: "",
        GetAddress: "",
        BloodGroup: "",
        Type: "",
        CompatabilityCheckDone: "",
        PackNo: "",
        ExpiryDate: "",
        ExpiryStartTime: "",
        ExpiryEndTime: "",
        AnyAdverseReactions: "",
        Remarks: "",


    });


    const [gridData, setGridData] = useState([])
    const [IsGetData, setIsGetData] = useState(false)

    const [IsViewMode, setIsViewMode] = useState(false)
  
    
      
    const BloodTransfusedRecordColumns = [
        {
            key: 'id',
            name: 'S.No',
            frozen: true
        },
        { key: 'PrimaryDoctorName', name: 'Doctor Name',frozen: true },
      
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
        { key: 'SourcedFrom', name: 'SourcedFrom' },
        { key: 'GetAddress', name: 'Address' },
        { key: 'BloodGroup', name: 'BloodGroup' },
        { key: 'Type', name: 'Type' },
        { key: 'CompatabilityCheckDone', name: 'CompatabilityCheckDone' },
        { key: 'PackNo', name: 'PackNo' },
        { key: 'ExpiryDate', name: 'ExpiryDate' },
        { key: 'ExpiryStartTime', name: 'ExpiryStartTime' },
        { key: 'ExpiryEndTime', name: 'ExpiryEndTime' },
        { key: 'AnyAdverseReactions', name: 'AnyAdverseReactions' },
        { key: 'Remarks', name: 'Remarks' },

        
    ]

     // Handle setting the form data when viewing
     const handleView = (data) => {
        setBloodTransfusedRecord({
            SourcedFrom: data.SourcedFrom || '',
            GetAddress: data.GetAddress || '',
            BloodGroup: data.BloodGroup || '',
            Type: data.Type || '',
            CompatabilityCheckDone: data.CompatabilityCheckDone || '',
            PackNo: data.PackNo || '',
            ExpiryDate: data.ExpiryDate || '',
            ExpiryStartTime: data.ExpiryStartTime || '',
            ExpiryEndTime: data.ExpiryEndTime || '',
            AnyAdverseReactions: data.AnyAdverseReactions || '',
            Remarks: data.Remarks || '',
            
            
        });
        setIsViewMode(true);
    };
    
  
  // Handle clearing the form and resetting the view mode
  const handleClear = () => {
    setBloodTransfusedRecord({
        SourcedFrom: '',
        GetAddress: '',
        BloodGroup: '',
        Type: '',
        CompatabilityCheckDone: '',
        PackNo: '',
        ExpiryDate: '',
        ExpiryStartTime: '',
        ExpiryEndTime: '',
        AnyAdverseReactions: '',
        Remarks: '',
       
    });
    setIsViewMode(false);
};

  

    useEffect(() => {

        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        if (RegistrationId) {
            axios.get(`${UrlLink}Ip_Workbench/IP_BloodTransfusedRecord_Details_Link`,{
                params:{
                    RegistrationId: RegistrationId,
                    DepartmentType: departmentType,
                    // Type: 'Nurse'
                }})
                .then((res) => {
                    const ress = res.data
                    console.log(ress)
                    setGridData(ress)
        
                })
                .catch((err) => {
                    console.log(err);
                })
        }
      }, [UrlLink,IP_DoctorWorkbenchNavigation,IsGetData])
    
    


      const HandleOnChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = value.trim();
        setBloodTransfusedRecord((prevFormData) => ({
            ...prevFormData,
            [name]: formattedValue,
        }));
    };


    const handleSubmit = () => {
        
        console.log(IP_DoctorWorkbenchNavigation?.RegistrationId);
        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const DepartmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        const senddata={
            ...BloodTransfusedRecord,
            RegistrationId,
            Createdby: userRecord?.username,
            DepartmentType,
            
        }

        console.log(senddata,'senddata');
        
        axios.post(`${UrlLink}Ip_Workbench/IP_BloodTransfusedRecord_Details_Link`, senddata)
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
                        <span>Blood Transfused Record</span>
                    </div>
                {
                    Object.keys(BloodTransfusedRecord).map((p, index) => (
                        <div className='RegisForm_1' key={p}>
                            {/* Static labels for each field */}
                            {p === 'SourcedFrom' ? (
                                <>
                                    <label htmlFor={`${p}_${index}`}>Sourced From<span>:</span></label>
                                    <select
                                        id={`${p}_${index}`}
                                        name={p}
                                        value={BloodTransfusedRecord[p]}
                                        onChange={HandleOnChange}
                                        readOnly={IsViewMode}
                                        disabled = {IsViewMode}
                                    >
                                        <option value="">Select</option>
                                        <option value="Inhouse">Inhouse</option>
                                        <option value="Outsourced">Outsourced</option>
                                    </select>
                                </>
                            ) : p === 'BloodGroup' ? (
                                <>
                                    <label htmlFor={`${p}_${index}`}>Blood Group<span>:</span></label>
                                    <select
                                        id={`${p}_${index}`}
                                        name={p}
                                        value={BloodTransfusedRecord[p]}
                                        onChange={HandleOnChange}
                                        readOnly={IsViewMode}
                                        disabled = {IsViewMode}
                                    >
                                        <option value="">Select</option>
                                        {/* Blood Group Options */}
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="A1+">A1+</option>
                                        <option value="A1-">A1-</option>
                                        <option value="A1B+">A1B+</option>
                                        <option value="A1B-">A1B-</option>
                                        <option value="A2+">A2+</option>
                                        <option value="A2-">A2-</option>
                                        <option value="A2B+">A2B+</option>
                                        <option value="A2B-">A2B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="Bombay Blood">Bombay Blood</option>
                                        <option value="INRA">INRA</option>
                                    </select>
                                </>
                            ) : p === 'Type' ? (
                                <>
                                    <label htmlFor={`${p}_${index}`}>Blood Type<span>:</span></label>
                                    <select
                                        id={`${p}_${index}`}
                                        name={p}
                                        value={BloodTransfusedRecord[p]}
                                        onChange={HandleOnChange}
                                        readOnly={IsViewMode}
                                        disabled = {IsViewMode}
                                    >
                                        <option value="">Select</option>
                                        <option value="Whole Blood">Whole Blood</option>
                                        <option value="Plasma">Plasma</option>
                                        <option value="Platelets">Platelets</option>
                                        <option value="RBCs">RBCs</option>
                                    </select>
                                </>
                            ) : p === 'CompatabilityCheckDone' ? (
                                <>
                                    <label htmlFor={`${p}_${index}`}>Compatability Check Done<span>:</span></label>
                                    <select
                                        id={`${p}_${index}`}
                                        name={p}
                                        value={BloodTransfusedRecord[p]}
                                        onChange={HandleOnChange}
                                        readOnly={IsViewMode}
                                        disabled = {IsViewMode}
                                    >
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </>
                            ) : BloodTransfusedRecord.SourcedFrom === 'Outsourced' && p === 'GetAddress' ? (
                                <>
                                    <label htmlFor={`${p}_${index}`}>Address<span>:</span></label>
                                    <textarea
                                        id={`${p}_${index}`}
                                        name={p}
                                        value={BloodTransfusedRecord[p]}
                                        onChange={HandleOnChange}
                                        readOnly={IsViewMode}
                                        disabled = {IsViewMode}
                                    />
                                </>
                            ) : p === 'AnyAdverseReactions' ? (
                                <>
                                    <label htmlFor={`${p}_${index}`}>Any Adverse Reactions<span>:</span></label>
                                    <select
                                        id={`${p}_${index}`}
                                        name={p}
                                        value={BloodTransfusedRecord[p]}
                                        onChange={HandleOnChange}
                                        readOnly={IsViewMode}
                                        disabled = {IsViewMode}
                                    >
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </>
                            ) : p === 'Remarks' ? (
                                <>
                                    <label htmlFor={`${p}_${index}`}>Remarks<span>:</span></label>
                                    <textarea
                                        id={`${p}_${index}`}
                                        name={p}
                                        value={BloodTransfusedRecord[p]}
                                        onChange={HandleOnChange}
                                        readOnly={IsViewMode}
                                        placeholder='Enter your remarks here'
                                    />
                                </>
                            ) : p === 'PackNo' ? (
                                <>
                                    <label htmlFor={`${p}_${index}`}>Pack No<span>:</span></label>
                                    <input
                                        id={`${p}_${index}`}
                                        
                                        name={p}
                                        readOnly={IsViewMode}
                                        value={BloodTransfusedRecord[p]}
                                        onChange={HandleOnChange}
                                    />
                                </>
                            ) : p === 'ExpiryDate' ? (
                                <>
                                    <label htmlFor={`${p}_${index}`}>Expiry Date<span>:</span></label>
                                    <input
                                        id={`${p}_${index}`}
                                        type='date'
                                        name={p}
                                        readOnly={IsViewMode}
                                        value={BloodTransfusedRecord[p]}
                                        onChange={HandleOnChange}
                                    />
                                </>
                            ) : p === 'ExpiryStartTime' ? (
                                <>
                                    <label htmlFor={`${p}_${index}`}>Start Time<span>:</span></label>
                                    <input
                                        id={`${p}_${index}`}
                                        type='time'
                                        name={p}
                                        readOnly={IsViewMode}
                                        value={BloodTransfusedRecord[p]}
                                        onChange={HandleOnChange}
                                    />
                                </>
                            ) : p === 'ExpiryEndTime' ? (
                                <>
                                    <label htmlFor={`${p}_${index}`}>End Time<span>:</span></label>
                                    <input
                                        id={`${p}_${index}`}
                                        type='time'
                                        name={p}
                                        readOnly={IsViewMode}
                                        value={BloodTransfusedRecord[p]}
                                        onChange={HandleOnChange}
                                    />
                                </>
                            ) :null}
                        </div>
                    ))
                }

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
                    <ReactGrid columns={BloodTransfusedRecordColumns} RowData={gridData} />
                }
            
            <ToastAlert Message={toast.message} Type={toast.type} />

        </>
    )
}


export default IP_BloodTransfusedRecord;