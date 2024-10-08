import React, { useState, useEffect } from "react";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import axios from "axios";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useDispatch, useSelector } from "react-redux";
import OTAnaesthesiaChart from "./OTAnaesthesiaChart";
import OTAnaesthesiaVital from "./OTAnaesthesiaVital";
import OTAnaesthesiaVentilator from "./OTAnaesthesiaVentilator";
import OTAnaesthesiaDrug from "./OTAnaesthesiaDrug";
import OTAnaesthesiaABG from "./OTAnaesthesiaABG";
import OTAnaesthesiaBlood from "./OTAnaesthesiaBlood";


function OTAanaesthesiaCapture() {
  
  // const isSidebarOpen = useSelector((state) => state.userRecord?.isSidebarOpen);

  const dispatchvalue = useDispatch();

  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const Data = useSelector((state) => state.userRecord?.Data);
  console.log(Data);

  const [activeTab, setActiveTab] = useState("anesthesiaChart");
  const [isToggled, setIsToggled] = useState(false);
  const [workbenchformData, setFormData] = useState({
    SerialNo: "",
    PatientID: "",
    AppointmentID: "",
    visitNo: "",
    firstName: "",
    lastName: "",
    AppointmentDate: "",
    Complaint: "",
    PatientPhoto: "",
    DoctorName: "",
    Age: "",
    Gender: "",
    Location: "",
  });

  console.log(workbenchformData);
  dispatchvalue({
    type: "workbenchformData",
    value: workbenchformData,
  });

  const toggle = () => setIsToggled(!isToggled);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    closeToggle();
  };

  const closeToggle = () => {
    setIsToggled(false);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/appointmentmanagement/get_appointments_Navigation?patientid=${Data.serialid}&location=${userRecord.location}`
        );
        console.log(response.data);

        const matchingAppointment = response.data[0];
        console.log(matchingAppointment);

        setFormData({
          SerialNo: matchingAppointment.appointment_patientregisterID,
          PatientID: matchingAppointment.PatientID,
          AppointmentID: matchingAppointment.AppointmentID,
          visitNo: matchingAppointment.VisitID,
          firstName: matchingAppointment.FirstName,
          lastName: matchingAppointment.LastName,
          DoctorName: matchingAppointment.DoctorName,
          Status: matchingAppointment.Status,
          AppointmentDate: matchingAppointment.AppointmentDate,
          Complaint: matchingAppointment.Complaint,
          PatientPhoto: `data:image/jpeg;base64,${matchingAppointment.PatientPhoto}`,
          Age: matchingAppointment.Age,
          Gender: matchingAppointment.Gender,
          Location: matchingAppointment.Location,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    //   // Call the fetchData function when the component mounts
    fetchData(userRecord?.location);
  }, [Data, userRecord?.location]);

  return (
    <>


      <div className="new-patient-registration-form " >
        <br />
        <div className="dctr_info_up_head">
          <div className="RegisFormcon ">
            <div className="dctr_info_up_head22">
              {workbenchformData.PatientPhoto ? (
                <img src={workbenchformData.PatientPhoto} alt="Patient Photo" />
              ) : ( 
                <img 
                src={bgImg2}
                 alt="Default Patient Photo" />
              )}
              <label>Profile</label>
            </div>
          </div>

          <div className="RegisFormcon">
            <div className="RegisForm_1 ">
              <label htmlFor="FirstName">
                Patient Name <span>:</span>{" "}
              </label>

              <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                {workbenchformData.firstName + " " + workbenchformData.lastName}{" "}
              </span>
            </div>
            <div className="RegisForm_1 ">
              <label htmlFor="FirstName">
                Patient ID <span>:</span>
              </label>

              <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                {workbenchformData.PatientID}{" "}
              </span>
            </div>
      
            <div className="RegisForm_1 ">
              <label htmlFor="FirstName">
                Age <span>:</span>{" "}
              </label>

              <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                {workbenchformData.Age}{" "}
              </span>
            </div>
            <div className="RegisForm_1 ">
              <label htmlFor="FirstName">
                Gender <span>:</span>{" "}
              </label>

              <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                {workbenchformData.Gender}{" "}
              </span>
            </div>
            <div className="RegisForm_1 ">
              <label htmlFor="FirstName">
                Primary Doctor <span>:</span>{" "}
              </label>

              <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                {workbenchformData.DoctorName}{" "}
              </span>
            </div>
            <div className="RegisForm_1 ">
              <label htmlFor="FirstName">
                Location <span>:</span>{" "}
              </label>

              <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                {workbenchformData.Location}{" "}
              </span>
            </div>
          </div>
        </div>

        <br />
        <div className="new-patient-registration-form1">
          <div className="new-navigation">
            <h2>
            <button onClick={() => handleTabChange("anesthesiaChart")}>
              Anesthesia Chart
              </button>
              |
              <button onClick={() => handleTabChange("vitalForm")}>
                Vital Form
              </button>
              |
              <button onClick={() => handleTabChange("ventilatorsettings")}>
              Ventilator settings
              </button>
              |
              <button onClick={() => handleTabChange("drugAdmin")}>
              Drug Admin
              </button>
              |
              <button onClick={() => handleTabChange("ABG")}>
              ABG
              </button>
              |
              <button onClick={() => handleTabChange("bloodTransfusion")}>
              Blood Transfusion
              </button>
             
            </h2>
          </div>

          <div className="new-kit ">
            <button className="new-tog" onClick={toggle}>
              {isToggled ? <ToggleOffIcon /> : <ToggleOnIcon />}
            </button>

            <div>
              {isToggled && (
                <div className="new-navigation-toggle">
                    <h2>
            <button onClick={() => handleTabChange("anesthesiaChart")}>
              Anesthesia Chart
              </button>
              |
              <button onClick={() => handleTabChange("vitalForm")}>
                Vital Form
              </button>
              |
              <button onClick={() => handleTabChange("ventilatorsettings")}>
              Ventilator settings
              </button>
              |
              <button onClick={() => handleTabChange("drugAdmin")}>
              Drug Admin
              </button>
              |
              <button onClick={() => handleTabChange("ABG")}>
              ABG
              </button>
              |
              <button onClick={() => handleTabChange("bloodTransfusion")}>
              Blood Transfusion
              </button>
             
            </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>a

      {activeTab === "anesthesiaChart" && <OTAnaesthesiaChart />}
      {activeTab === "vitalForm" && <OTAnaesthesiaVital />}
      {activeTab === "ventilatorsettings" && <OTAnaesthesiaVentilator />}
      {activeTab === "drugAdmin" && <OTAnaesthesiaDrug />}
      {activeTab === "ABG" && <OTAnaesthesiaABG />}
      {activeTab === "bloodTransfusion" && <OTAnaesthesiaBlood />}

    </>
  );
}

export default OTAanaesthesiaCapture;





