import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { format } from "date-fns";
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';



const Vitals = () => {
    const dispatch = useDispatch();
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);
    console.log(DoctorWorkbenchNavigation,'DoctorWorkbenchNavigation');

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

   
    const [VitalFormData, setVitalFormData] = useState({
       
        Temperature: "",
        PulseRate: "",
        SPO2: "",
        HeartRate: "",
        RespiratoryRate: "",
        SBP: "",
        DBP: "",
        Height: "",
        Weight: "",
        BMI: "",
        WC: "",
        HC: "",
        BSL:'',
        Painscore:"",
        ETCO2: "",
        BreathSounds: "",
        // Date: "",
        // Time: "",
    });


    const [gridData, setGridData] = useState([])
    const [IsGetData, setIsGetData] = useState(false)

    const [IsViewMode, setIsViewMode] = useState(false)
  
    useEffect(() => {
        if (VitalFormData.Weight && VitalFormData.Height) {
          const parsedWeight = parseFloat(VitalFormData.Weight);
          const parsedHeight = parseFloat(VitalFormData.Height) / 100; // Convert cm to m
          const calculatedBMI = (
            parsedWeight /
            (parsedHeight * parsedHeight)
          ).toFixed(2);
      
          setVitalFormData((prev) => ({
            ...prev,
            BMI: calculatedBMI,
          }));
        }
      }, [VitalFormData.Weight, VitalFormData.Height]);
      
    const VitalsFormColumns = [
        {
            key: 'id',
            name: 'S.No',
            frozen: true
        },
        { key: 'PrimaryDoctorId', name: 'Doctor Id',frozen: true },
        { key: 'PrimaryDoctorName', name: 'Doctor Name',frozen: true },
      
        {
            key: 'Date',
            name: 'Date',
            frozen: true
        },
        {
            key: 'Time',
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
        
    ]
// Handle setting the form data when viewing
const handleView = (data) => {
    setVitalFormData({
        Temperature: data.Temperature || '',
        PulseRate: data.PulseRate || '',
        SPO2: data.SPO2 || '',
        HeartRate: data.HeartRate || '',
        RespiratoryRate: data.RespiratoryRate || '',
        SBP: data.SBP || '',
        DBP: data.DBP || '',
        Height: data.Height || '',
        Weight: data.Weight || '',
        BMI: data.BMI || '',
        WC: data.WC || '',
        HC: data.HC || '',
        BSL: data.BSL || '',
        Painscore: data.Painscore || '',
        ETCO2: data.EtCO2 || '',
        BreathSounds: data.BreathSounds || '',
        // Date: data.Date || '',
        // Time: data.Time || '',
        // Createdby: data.Createdby || '',
    });
    setIsViewMode(true);
};


// Handle clearing the form and resetting the view mode
const handleClear = () => {
setVitalFormData({
    Temperature: '',
    PulseRate: '',
    SPO2: '',
    HeartRate: '',
    RespiratoryRate: '',
    SBP: '',
    DBP: '',
    Height: '',
    Weight: '',
    BMI: '',
    WC: '',
    HC: '',
    BSL: '',
    Painscore:'',
    ETCO2:'',
    BreathSounds:'',
    // Date: '',
    // Time: '',
    // Createdby: '',
});
setIsViewMode(false);
};
  

    useEffect(() => {
        axios.get(`${UrlLink}OP/Vitals_Form_Details_Link`,{params:{RegistrationId:DoctorWorkbenchNavigation?.pk}})
            .then((res) => {
                const ress = res.data
                console.log(ress)
                setGridData(ress)
    
            })
            .catch((err) => {
                console.log(err);
            })
      }, [UrlLink,DoctorWorkbenchNavigation,IsGetData])
    
    


      const HandleOnChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = value.trim();
        setVitalFormData((prevFormData) => ({
            ...prevFormData,
            [name]: formattedValue,
        }));
    };


    const handleVitalFormSubmit = () => {
        
        console.log(DoctorWorkbenchNavigation?.pk);
        
        const senddata={
            ...VitalFormData,
            RegistrationId:DoctorWorkbenchNavigation?.pk,
            Createdby:userRecord?.username,
            Type:'Doctor'
            
        }

        console.log(senddata,'senddata');
        
        axios.post(`${UrlLink}OP/Vitals_Form_Details_Link`, senddata)
        .then((res) => {
            const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
            dispatch({ type: 'toast', value: { message, type } });
            setIsGetData(prev => !prev);
            handleClear();
            })
            .catch((err) => console.log(err));
        
    }


    return (
        <div className='new-patient-registration-form'>
            <br />
                <div className="RegisFormcon_1" >

                    
                    {
                        Object.keys(VitalFormData).map((p, index) =>
                        (
                            <div className='RegisForm_1' key={p}>
                                <label htmlFor={`${p}_${index}`}>
                                    {formatLabel(p)} <span>:</span>
                                </label>
                                {
                                    (
                                        <input
                                            id={`${p}_${index}`}
                                            autoComplete='off'
                                            type={p === 'Date' ? 'date' : p === 'Time' ? 'time' : 'text'}
                                            name={p}
                                            value={VitalFormData[p]}
                                            onChange={HandleOnChange}
                                        />
                                    )
                                }
                            </div>

                        ))
                    }
                </div>
                <br />

                <div className="Main_container_Btn">
            
                    {IsViewMode && (
                        <button onClick={handleClear}>Clear</button>
                    )}
                    {!IsViewMode && (
                        <button onClick={handleVitalFormSubmit}>Submit</button>
                    )}
                </div>
                <br />



                {gridData.length >= 0 &&
                    <ReactGrid columns={VitalsFormColumns} RowData={gridData} />
                }
            
            <ToastAlert Message={toast.message} Type={toast.type} />

        </div>
    )
}


export default Vitals