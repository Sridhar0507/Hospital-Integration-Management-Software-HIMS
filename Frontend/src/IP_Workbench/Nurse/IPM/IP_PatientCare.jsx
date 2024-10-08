import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from '../../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';



const IP_PatientCare = () => {
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

   

    const [PatientCare, setPatientCare] = useState({
       
        PatientCareParameter: "",
        Time:"",
        Remarks: "",

    });


    const [gridData, setGridData] = useState([])
    const [IsGetData, setIsGetData] = useState(false)

    const [IsViewMode, setIsViewMode] = useState(false)
  
    
      
    const PatientCareColumns = [
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
        { key: 'PatientCareParameter', name: 'PatientCareParameter'},
        { key: 'Time', name: 'Time'},
        { key: 'Remarks', name: 'Remarks'},
        
        
    ]

     // Handle setting the form data when viewing
     const handleView = (data) => {
        setPatientCare({
            
            PatientCareParameter: data.PatientCareParameter || '',
            Time: data.Time || '',
            Remarks: data.Remarks || '',
           
            
        });
        setIsViewMode(true);
    };
    
  
  // Handle clearing the form and resetting the view mode
  const handleClear = () => {
    setPatientCare({
        
        PatientCareParameter: '',
        Time: '',
        Remarks: '',
        
       
    });
    setIsViewMode(false);
};

  

    useEffect(() => {
        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        axios.get(`${UrlLink}Ip_Workbench/IP_PatientCare_Details_Link`,{
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
      }, [UrlLink,IP_DoctorWorkbenchNavigation,IsGetData])
    
    


      const HandleOnChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = value.trim();
        setPatientCare((prevFormData) => ({
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
            ...PatientCare,
            RegistrationId,
            Createdby: userRecord?.username,
            DepartmentType,
            
        }

        console.log(senddata,'senddata');
        
        axios.post(`${UrlLink}Ip_Workbench/IP_PatientCare_Details_Link`, senddata)
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
                        <span>Patient Care</span>
                    </div>
                    
                    {
                        Object.keys(PatientCare).map((p, index) =>
                        (
                            <div className='RegisForm_1' key={p}>
                                <label htmlFor={`${p}_${index}`}>
                                    { (
                                        formatLabel(p)
                                      )} 
                                    
                                    <span>:</span>
                                </label>
                                {p === 'PatientCareParameter' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={PatientCare[p]}
                                    onChange={HandleOnChange}
                                    >
                                    <option value="">Select</option>
                                    <option value="SpongeBath">SpongeBath</option>
                                    <option value="OralCare">OralCare</option>
                                    <option value="EyeCare">EyeCare</option>
                                    <option value="BackCare">BackCare</option>
                                    <option value="ChestPhysioSuction">ChestPhysioSuction</option>
                                    <option value="Humidifier">Humidifier</option>
                                    <option value="Others">Others</option>
                                    
                                </select>
                            ) : p === 'Remarks' ? (
                                <textarea
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={PatientCare[p]}
                                    onChange={HandleOnChange}
                                    placeholder='Enter your remarks here'
                                />
                            ):(
                                <input
                                id={`${p}_${index}`}
                                autoComplete='off'
                                type={( p === 'Time') ? 'time' : 'text'}
                                name={p}
                                value={PatientCare[p]}
                                onChange={HandleOnChange}
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
                    <ReactGrid columns={PatientCareColumns} RowData={gridData} />
                }
            
            <ToastAlert Message={toast.message} Type={toast.type} />

        </>
    )
}


export default IP_PatientCare;


