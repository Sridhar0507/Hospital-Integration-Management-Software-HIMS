import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from '../../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';



const IP_BedsoreManagement = () => {
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

   

    const [BedsoreManagement, setBedsoreManagement] = useState({
        
        Site: "",
        LocationLR: "", 
        Area: "",
        Dressing: "",
        Condition: "",
        Remarks: "",

    });


    const [gridData, setGridData] = useState([])
    const [IsGetData, setIsGetData] = useState(false)

    const [IsViewMode, setIsViewMode] = useState(false)
  
    
      
    const BedsoreManagementColumns = [
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

        { key: 'Site', name: 'Site'},
        { key: 'LocationLR', name: 'Location'},
        { key: 'Area', name: 'Area'},
        { key: 'Dressing', name: 'Dressing'},
        { key: 'Condition', name: 'Condition'},
        { key: 'Remarks', name: 'Remarks'},

        
    ]

     // Handle setting the form data when viewing
     const handleView = (data) => {
        setBedsoreManagement({
            Site: data.Site || '',
            LocationLR: data.LocationLR || '',
            Area: data.Area || '',
            Dressing: data.Dressing || '',
            Condition: data.Condition || '',
            Remarks: data.Remarks || '',
            
            
        });
        setIsViewMode(true);
    };
    
  
  // Handle clearing the form and resetting the view mode
  const handleClear = () => {
    setBedsoreManagement({
        Site: '',
        LocationLR: '',
        Area: '',
        Dressing: '',
        Condition: '',
        Remarks: '',
        
       
    });
    setIsViewMode(false);
};

  

    useEffect(() => {

        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        if (RegistrationId) {
            axios.get(`${UrlLink}Ip_Workbench/IP_BedsoreManagement_Details_Link`,{
                params:{
                    RegistrationId: RegistrationId,
                    DepartmentType: departmentType
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
        setBedsoreManagement((prevFormData) => ({
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

        const senddata={
            ...BedsoreManagement,
            RegistrationId,
            Createdby: userRecord?.username,
            DepartmentType,
            
        }

        console.log(senddata,'senddata');
        
        axios.post(`${UrlLink}Ip_Workbench/IP_BedsoreManagement_Details_Link`, senddata)
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
                <div className="RegisFormcon_1" >
                <br/>
                    <div className="common_center_tag">
                        <span>Bedsore Management</span>
                    </div>
                    
                    {
                        Object.keys(BedsoreManagement).map((p, index) =>
                        (
                            <div className='RegisForm_1' key={p}>
                                <label htmlFor={`${p}_${index}`}>
                                    {p === "LocationLR" ? (
                                        "Location"
                                    ) : (
                                        formatLabel(p)
                                      )} 
                                    
                                    <span>:</span>
                                </label>
                                {p === 'Site' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={BedsoreManagement[p]}
                                    onChange={HandleOnChange}
                                    disabled = {IsViewMode}
                                    readOnly={IsViewMode}
                                    >
                                    <option value="">Select</option>
                                    <option value="Sacrum">Sacrum</option>
                                    <option value="Scapular">Scapular</option>
                                    <option value="Occiput">Occiput</option>
                                    <option value="Tail Bone/Lower back">Tail Bone/Lower back</option>
                                    <option value="Elbow">Elbow</option>
                                    <option value="Heel">Heel</option>
                                    
                                </select>
                            ) : p === 'LocationLR' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={BedsoreManagement[p]}
                                    onChange={HandleOnChange}
                                    disabled = {IsViewMode}
                                    readOnly={IsViewMode}
                                    >
                                    <option value="">Select</option>
                                    <option value="Left">Left</option>
                                    <option value="Right">Right</option>
                                </select>
                            ) : p === 'Area' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={BedsoreManagement[p]}
                                    onChange={HandleOnChange}
                                    disabled = {IsViewMode}
                                    readOnly={IsViewMode}
                                    >
                                    <option value="">Select</option>
                                    <option value="Redness">Redness</option>
                                    <option value="Black discoloration">Black discoloration</option>
                                    <option value="Blisters">Blisters</option>
                                    <option value="Skin Peeling">Skin Peeling</option>
                                    <option value="Deep wound">Deep wound</option>
                                </select>
                            ) : p === 'Dressing' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={BedsoreManagement[p]}
                                    onChange={HandleOnChange}
                                    disabled = {IsViewMode}
                                    readOnly={IsViewMode}
                                    >
                                    <option value="">Select</option>
                                    <option value="Infra Red">Infra Red</option>
                                    <option value="Dueodem">Dueodem</option>
                                    <option value="Eptoin Dressing">Eptoin Dressing</option>
                                    <option value="Betadine Dressing">Betadine Dressing</option>
                                    <option value="Eusol sitz bath">Eusol sitz bath</option>
                                    <option value="Sofra Tulle">Sofra Tulle</option>

                                </select>
                            ) : p === 'Condition' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={BedsoreManagement[p]}
                                    onChange={HandleOnChange}
                                    disabled = {IsViewMode}
                                    readOnly={IsViewMode}
                                    >
                                    <option value="">Select</option>
                                    <option value="Healing">Healing</option>
                                    <option value="Status quo">Status quo</option>
                                    <option value="Sloughing">Sloughing</option>
                                    
                                </select>
                            ) : p === 'Remarks' ? (
                                <textarea
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={BedsoreManagement[p]}
                                    onChange={HandleOnChange}
                                    // disabled = {IsViewMode}
                                    readOnly={IsViewMode}
                                    placeholder='Enter your remarks here'
                                />
                            ):(
                                <input
                                id={`${p}_${index}`}
                                autoComplete='off'
                                type={(p === 'InsertionDate' || p === 'RemovalDate') ? 'date' : p === 'RemovalTime' ? 'time' : 'text'}
                                name={p}
                                value={BedsoreManagement[p]}
                                onChange={HandleOnChange}
                                // disabled = {IsViewMode}
                                readOnly={IsViewMode}
                                />
                            )}
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
                    <ReactGrid columns={BedsoreManagementColumns} RowData={gridData} />
                }
            
            <ToastAlert Message={toast.message} Type={toast.type} />

        </>
    )
}


export default IP_BedsoreManagement;