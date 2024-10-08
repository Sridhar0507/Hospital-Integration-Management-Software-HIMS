import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import ToastAlert from "../../../OtherComponent/ToastContainer/ToastAlert";
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactGrid from '../../../OtherComponent/ReactGrid/ReactGrid';

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";


const IP_ReferAndInchargeDoctor = () => {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);

  const dispatch = useDispatch();

  const [type, setType] = useState("Incharge");

  const [Incharge, setIncharge] = useState({
    Speciality: "",
    DoctorName: "",
    Reason: "",
  });



  const [IsGetData, setIsGetData] = useState(false);
//   const [IsViewMode, setIsViewMode] = useState(false);
  const [InchargeDetailsData, setInchargeDetailsData] = useState([]);
  const [ReferDetailsData, setReferDetailsData] = useState([]);
  
  const [DoctorData, setDoctorData] = useState([]);
  const [SpecializationData, setSpecializationData] = useState([]);


  
  useEffect(() => {
    if (Incharge.Speciality) {
        
    
    axios.get(`${UrlLink}Masters/get_Doctor_by_Speciality_Detials?Speciality=${Incharge.Speciality}`)
        .then((res) => {
            const ress = res.data
            console.log(ress)
            setDoctorData(ress)

        })
        .catch((err) => {
            console.log(err);
        })
    }
}, [UrlLink,Incharge.Speciality])

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


  const InchargeAndReferColumns = [
    { key: 'id', name: 'S.No', frozen: true },
    { key: 'VisitId', name: 'Visit ID', frozen: true },
    { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },
    { key: 'Type', name: 'Type' },
    { key: 'Speciality', name: 'Speciality' },
    { key: 'DoctorName', name: 'DoctorName' },
    { key: 'Reason', name: 'Reason' },
    { key: 'CurrDate', name: 'Date', frozen: true },
    { key: 'CurrTime', name: 'Time', frozen: true },
    
  ];

//   const ReferColumns = [
//     { key: 'id', name: 'S.No', frozen: true },
//     { key: 'VisitId', name: 'Visit ID', frozen: true },
//     { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },
//     { key: 'Speciality', name: 'Speciality' },
//     { key: 'DoctorName', name: 'DoctorName' },
//     { key: 'Reason', name: 'Reason' },
//     { key: 'Date', name: 'Date', frozen: true },
//     { key: 'Time', name: 'Time', frozen: true },
    
//   ];

  useEffect(() => {
    axios
      .get(`${UrlLink}Ip_Workbench/IP_InchargeAndRefer_Details_Link`, {
        params: { RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,Type:type },
      })
      .then((res) => {
        console.log('Incharge_details:', res.data);

        // Set the data for each grid separately
        setInchargeDetailsData(res.data || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [IsGetData,type, UrlLink, IP_DoctorWorkbenchNavigation?.RegistrationId]);


  const handleClear = () => {
    setIncharge({
      Speciality: "",
      DoctorName: "",
      Reason: "",
    });


  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
  
      setIncharge((prev) => ({
        ...prev,
        [name]: value,
      }));
    
  };
  

 
  const handleChange = (event) => {
    setType(event.target.value);
    setIncharge({
        Speciality: "",
        DoctorName: "",
        Reason: "",
    })
  };

  const handleSubmit = () => {
    let dataToSubmit = {};

    // Determine which data to submit based on the type
    if (type === 'Incharge') {
      dataToSubmit = Incharge;
    }else if (type === 'Refer'){
      dataToSubmit = Incharge;

    }

    const sendData = {
      ...dataToSubmit, // Spread the correct data object based on type
      Inserttype: type,
      RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
      Createdby: userRecord?.username,
    };

    console.log(sendData, 'sendData');

    axios
      .post(`${UrlLink}Ip_Workbench/IP_InchargeAndRefer_Details_Link`, sendData)  // Ensure this is the correct endpoint
      .then((res) => {
        const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
        dispatch({ type: 'toast', value: { message, type } });

      
        setInchargeDetailsData(prevData => [...prevData, dataToSubmit]);
       

        setIsGetData(prev => !prev);
        handleClear();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="RegisFormcon_1">
        <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton
              value="Incharge"
              style={{
                height: "30px",
                width: "200px",
                backgroundColor: type === "Incharge" ? "var(--selectbackgroundcolor)" : "inherit",
              }}
              className="togglebutton_container"
            >
              Incharge Doctor
            </ToggleButton>
            <ToggleButton
              value="Refer"
              style={{
                backgroundColor: type === "Refer" ? "var(--selectbackgroundcolor)" : "inherit",
                width: "200px",
                height: "30px",
              }}
              className="togglebutton_container"
            >
              Refer a Doctor
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* Form Content */}
        
          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label>
                Speciality <span>:</span>
              </label>
              <select
                name="Speciality"
                value={Incharge.Speciality}
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
                value={Incharge.DoctorName}
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
                Reason <span>:</span>
              </label>
              <textarea
                name="Reason"
                value={Incharge.Reason}
                onChange={handleInputChange}
              />
            </div>
          </div>
        

        {/* Submit Button */}
        <div className="Main_container_Btn">
          {/* {IsViewMode && <button onClick={handleClear}>Clear</button>} */}
          {<button onClick={handleSubmit}>Submit</button>}
        </div>

        {/* Grid Data */}
        {type === "Incharge" &&  InchargeDetailsData.length > 0 && (
          <ReactGrid columns={InchargeAndReferColumns} RowData={InchargeDetailsData} />
        )}

        { type === "Refer"  && InchargeDetailsData.length > 0 && (
          <ReactGrid columns={InchargeAndReferColumns} RowData={InchargeDetailsData} />
        )}
       
        {/* Toast Alert */}
        <ToastAlert Message={toast.message} Type={toast.type} />
      </div>
    </>
  );
};

export default IP_ReferAndInchargeDoctor;
