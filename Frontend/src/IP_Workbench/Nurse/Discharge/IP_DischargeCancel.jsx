import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import ToastAlert from "../../../OtherComponent/ToastContainer/ToastAlert";
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactGrid from '../../../OtherComponent/ReactGrid/ReactGrid';

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";


const DischargeCancel = () => {
    const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector((state) => state.userRecord?.toast);
    const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
    const pagewidth = useSelector(state => state.userRecord?.pagewidth);
  
    const dispatch = useDispatch();

    const [Discharge,setDischarge] = useState({
        Speciality: "",
        DoctorName: "",
        SisterIncharge: "",
        Reason: "",
        Remarks: "",
    })

    const [IsGetData, setIsGetData] = useState(false);
    const [DischargeData, setDischargeData] = useState([]);

    const [PatientDischargeData, setPatientDischargeData] = useState([])
    console.log(PatientDischargeData,'PatientDischargeData');

    const [DoctorData, setDoctorData] = useState([]);
    const [SpecializationData, setSpecializationData] = useState([]);
  

    useEffect(() => {
        if (Discharge.Speciality) {
        axios.get(`${UrlLink}Masters/get_Doctor_by_Speciality_Detials?Speciality=${Discharge.Speciality}`)
            .then((res) => {
                const ress = res.data
                console.log(ress)
                setDoctorData(ress)
    
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [UrlLink,Discharge.Speciality])
    
      useEffect(() => {
        axios.get(`${UrlLink}Masters/Doctors_Speciality_Detials_link`)
            .then((res) => {
                const ress = res.data
                console.log(ress)
                setSpecializationData(ress)
    
            })
            .catch((err) => {
                console.log(err);
            })
    }, [UrlLink])

 
    const PatientDischargeColumn = [
        {
            key: "id",
            name: "S.No",
            // frozen: pagewidth > 500 ? true : false
        },
        {
            key: "CurrDate",
            name: "Date",
        },
        {
            key: "CurrTime",
            name: "Time",
        },
        {
            key: "RegistrationId",
            name: "Registration Id",
            // frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientId",
            name: "Patient Id",
            // frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientName",
            name: "Patient Name",
            width: 150,
            // frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PhoneNo",
            name: "PhoneNo",
        },
       
    ]

    const handleClear = () => {
        setDischarge({
          Speciality: "",
          DoctorName: "",
          SisterIncharge: "",
          Reason: "",
          Remarks: "",
        });
    
    
    };

    
    useEffect(() => {
        axios.get(`${UrlLink}Ip_Workbench/IP_DischargeCancel_Details_Link`,{params:{RegistrationId:IP_DoctorWorkbenchNavigation?.RegistrationId}})
            .then((res) => {
                const ress = res.data;
                console.log(ress,'resssss');
                setPatientDischargeData(ress);
               
            })
            .catch((err) => {
                console.log(err);
            });
      }, [UrlLink,IP_DoctorWorkbenchNavigation,IsGetData]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
      
        setDischarge((prev) => ({
            ...prev,
            [name]: value,
        }));
        
    };

    const handleSubmit = () => {
        const sendData = {
            ...Discharge, 
            RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
            Createdby: userRecord?.username,
        };
      
        console.log(sendData, 'sendData');

        axios
      .post(`${UrlLink}Ip_Workbench/IP_DischargeCancel_Details_Link`, sendData)  
      .then((res) => {
        const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
        dispatch({ type: 'toast', value: { message, type } });       

        setIsGetData(prev => !prev);
        handleClear();
      })
      .catch((err) => console.log(err));
      
    };
      

  return (
    <>
        <div className="RegisFormcon_1">
            <div className="RegisFormcon">
                <div className="RegisForm_1">
                <label>
                    Speciality <span>:</span>
                </label>
                <select
                    name="Speciality"
                    value={Discharge.Speciality}
                    onChange={handleInputChange}
                >
                    <option value="">Select</option>
                    {SpecializationData.map((spl, index) => (
                        <option key={index} value={spl.id}>
                        {spl.SpecialityName}
                        </option>
                    ))}
                </select>
                </div>
                <div className="RegisForm_1">
                <label>
                    Doctor Name <span>:</span>
                </label>
                <select
                    name="DoctorName"
                    value={Discharge.DoctorName}
                    onChange={handleInputChange}
                >
                    <option value="">Select</option>
                    {DoctorData.map((doctor, index) => (
                        <option key={index} value={doctor.id}>
                        {doctor.Name}
                        </option>
                    ))}
                </select>
                </div>
                <div className="RegisForm_1">
                <label>
                    Sister Incharge <span>:</span>
                </label>
                <select
                    name="SisterIncharge"
                    value={Discharge.SisterIncharge}
                    onChange={handleInputChange}
                >
                    <option value="">Select</option>
                    {/* {DoctorData.map((doctor, index) => (
                        <option key={index} value={doctor.id}>
                        {doctor.Name}
                        </option>
                    ))} */}
                </select>
                </div>
                <div className="RegisForm_1">
                <label>
                    Reason <span>:</span>
                </label>
                <textarea
                    name="Reason"
                    value={Discharge.Reason}
                    onChange={handleInputChange}
                />
                </div>
                <div className="RegisForm_1">
                <label>
                Remarks <span>:</span>
                </label>
                <textarea
                    name="Remarks"
                    value={Discharge.Remarks}
                    onChange={handleInputChange}
                />
                </div>
            </div>

            <div className="Main_container_Btn">
            {<button onClick={handleSubmit}>Submit</button>}
            </div>
            
            {PatientDischargeData.length >= 0 &&
            <ReactGrid columns={PatientDischargeColumn} RowData={PatientDischargeData} />
            }

            {/* <ReactGrid columns={PatientDischargeColumn} RowData={PatientDischargeData} /> */}

            <ToastAlert Message={toast.message} Type={toast.type} />

            
        </div>
    
    </>
  )
}

export default DischargeCancel;