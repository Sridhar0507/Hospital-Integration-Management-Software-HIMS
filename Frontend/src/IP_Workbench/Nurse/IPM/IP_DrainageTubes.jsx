import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from '../../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';



const IP_DrainageTubes = () => {
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

   

    const [DrainageTubes, setDrainageTubes] = useState({
        Status: "",
        Site: "",
        LocationLR: "",
        Quality: "",
        DrainageTubeSize: "",
        Remarks: "",

    });


    const [gridData, setGridData] = useState([])
    const [IsGetData, setIsGetData] = useState(false)

    const [IsViewMode, setIsViewMode] = useState(false)
  
    
      
    const DrainageTubesColumns = [
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
        { key: 'Status', name: 'Status' },
        { key: 'Site', name: 'Site' },
        { key: 'LocationLR', name: 'Location' },
        { key: 'Quality', name: 'Quality' },
        { key: 'DrainageTubeSize', name: 'DrainageTubeSize' },
        { key: 'Remarks', name: 'Remarks' },

        
    ]

     // Handle setting the form data when viewing
     const handleView = (data) => {
        setDrainageTubes({
            Status: data.Status || '',
            Site: data.Site || '',
            LocationLR: data.LocationLR || '',
            Quality: data.Quality || '',
            DrainageTubeSize: data.DrainageTubeSize || '',
            Remarks: data.Remarks || '',

            
        });
        setIsViewMode(true);
    };
    
  
  // Handle clearing the form and resetting the view mode
  const handleClear = () => {
    setDrainageTubes({
        Status: '',
        Site: '',
        LocationLR: '',
        Quality: '',
        DrainageTubeSize: '',
        Remarks: '',
       
    });
    setIsViewMode(false);
};

  

    useEffect(() => {

        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        if (RegistrationId) {
            axios.get(`${UrlLink}Ip_Workbench/IP_DrainageTubes_Details_Link`,{
                params:{
                    RegistrationId: RegistrationId,
                    DepartmentType: departmentType,
                    // Type: 'Nurse'
                }})
                .then((res) => {
                    const ress = res.data
                    console.log(ress.data)
                    setGridData(ress)
        
                })
                .catch((err) => {
                    console.log(err);
                })
        }
      }, [UrlLink,IP_DoctorWorkbenchNavigation,IsGetData])
    
    


    //   const HandleOnChange = (e) => {
    //     const { name, value } = e.target;
    //     const formattedValue = value.trim();
    //     setDrainageTubes((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: formattedValue,
    //     }));
    // };



    const HandleOnChange = (e) => {
        const { name, value } = e.target;

        setDrainageTubes((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    };

    // Handling Measurement change
    const handleMeasurementChange = (e) => {
        const {  value } = e.target;
        setDrainageTubes((prevFormData) => ({
            ...prevFormData,
            Measurement: prevFormData.Measurement.replace(/^\d+/g, '') + value, // Ensure unit is replaced without affecting the value
        }));
    };

    // Handling unit change
    const handleUnitChange = (e) => {
        const { value } = e.target;
        setDrainageTubes((prevFormData) => {
            const numericValue = prevFormData.Measurement.replace(/\D+/g, ''); // Extract numeric value
            return {
                ...prevFormData,
                Measurement: numericValue + value, // Concatenate value and unit
            };
        });
    };



    const handleSubmit = () => {
        
        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const DepartmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        const senddata={
            ...DrainageTubes,
            RegistrationId,
            Createdby: userRecord?.username,
            DepartmentType,
            // Type:'Nurse'
            
        }

        console.log(senddata,'senddata');
        
        axios.post(`${UrlLink}Ip_Workbench/IP_DrainageTubes_Details_Link`, senddata)
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
                        <span>Drainage Tubes</span>
                    </div>

                    
                    {
                        Object.keys(DrainageTubes).map((p, index) =>
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
                                    value={DrainageTubes[p]}
                                    onChange={HandleOnChange}
                                    disabled = {IsViewMode}
                                    readOnly={IsViewMode}
                                    >
                                    <option value="">Select</option>
                                    <option value="Chest">Chest</option>
                                    <option value="Abdominal">Abdominal</option>
                                    <option value="Orthopedic">Orthopedic</option>
                                    <option value="Others">Others</option>
                                </select>
                            ) :p === 'Status' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={DrainageTubes[p]}
                                    onChange={HandleOnChange}
                                    disabled = {IsViewMode}
                                    readOnly={IsViewMode}
                                    >
                                    <option value="">Select</option>
                                    <option value="Inserted">Inserted</option>
                                    <option value="StatusCheck">StatusCheck</option>
                                    <option value="Removed">Removed</option>
                                </select>
                            ) : p === 'LocationLR' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={DrainageTubes[p]}
                                    onChange={HandleOnChange}
                                    disabled = {IsViewMode}
                                    readOnly={IsViewMode}
                                    >
                                    <option value="">Select</option>
                                    <option value="Left">Left</option>
                                    <option value="Right">Right</option>
                                </select>
                            ) : p === 'Measurement' ? (
                                <>
                                    <input
                                    id={`${p}_${index}`}
                                    name="MeasurementValue"
                                    style={{ width: "50px" }}
                                    value={DrainageTubes.Measurement.replace(/[^\d]/g, '')} // Extract numeric part
                                    onChange={(e) => handleMeasurementChange(e)}
                                    />
                                    <select
                                        id={`${p}_${index}_unit`}
                                        name="MeasurementUnit"
                                        value={DrainageTubes.Measurement.replace(/\d+/g, '')} // Extract unit part
                                        onChange={(e) => handleUnitChange(e)}
                                    >
                                        <option value="">Select</option>
                                        <option value="ml">ml</option>
                                        <option value="gms">gms</option>
                                    </select>
                                </>
                            ) : p === 'Quality' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={DrainageTubes[p]}
                                    onChange={HandleOnChange}
                                    disabled = {IsViewMode}
                                    readOnly={IsViewMode}
                                    >
                                    <option value="">Select</option>
                                    <option value="PatientExtubated">Fresh blood</option>
                                    <option value="Dead">Dark blood</option>
                                    <option value="Dead">Pus</option>
                                    <option value="Dead">Blood clots</option>
                                    <option value="Dead">Stopped</option>
                                </select>
                            ) : p === 'CentralLineInfection' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={DrainageTubes[p]}
                                    onChange={HandleOnChange}
                                    >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    
                                </select>
                            ) : p === 'Remarks' ? (
                                <textarea
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={DrainageTubes[p]}
                                    // disabled = {IsViewMode}
                                    readOnly={IsViewMode}
                                    onChange={HandleOnChange}
                                    placeholder='Enter your remarks here'
                                />
                            ): p !== 'Measurement' ?(
                                <input
                                id={`${p}_${index}`}
                                autoComplete='off'
                                type={(p === 'DrainRemovalDate' || p === 'Date') ? 'date' : p === 'DrainRemovalTime' ? 'time' : 'text'}
                                name={p}
                                value={DrainageTubes[p]}
                                disabled = {IsViewMode}
                                // readOnly={IsViewMode}
                                onChange={HandleOnChange}
                                />
                            ) : null }
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
                    <ReactGrid columns={DrainageTubesColumns} RowData={gridData} />
                }
            
            <ToastAlert Message={toast.message} Type={toast.type} />

        </>
    )
}


export default IP_DrainageTubes;