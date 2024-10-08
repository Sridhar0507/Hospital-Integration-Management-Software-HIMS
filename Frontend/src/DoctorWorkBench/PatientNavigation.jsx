import React, { useState, useEffect, lazy, Suspense } from "react";
import "./Navigation.css";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgImg2 from "../Assets/bgImg2.jpg";
// import Neurology from "./Neurology";
import IFCard from "./IFCard";
import Gynecology from "./Gynecology";
import OP_Sheet from "./OP_Sheet";
const AncCard = lazy(() => import('./ANCCard.jsx'));
// const Neurology = lazy(() => import('./Neurology.jsx'));

const IFCard = lazy(() => import('./ANCCard.jsx'));

const Gynecology = lazy(() => import('./ANCCard.jsx'));

const OP_Sheet = lazy(() => import('./ANCCard.jsx'));


import Opthalmology from "./Opthalmology";
import Neurology from "./Neurology.jsx";
// import AncCard from "./AncCard";

const PatientNavigation = () => {
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const dispatchvalue = useDispatch();
  const navigate = useNavigate();
  
  const UsercreatePatientdata = useSelector(state => state.userRecord?.UsercreatePatientdata);

  console.log(UsercreatePatientdata, '13');
  
  const [activeTab, setActiveTab] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const [workbenchformData, setFormData] = useState({
    appointment_patientrequestID: '',
    PatientID: '',
    AppointmentID: "",
    visitNo: "",
    fullName:"",
    Status: '',
    AppointmentDate: "",
    PatientPhoto: "",
    Age: '',
    Gender: '',
  });

  useEffect(() => {
    console.log(UsercreatePatientdata,'UsercreatePatientdataaaaa');
    
      
      setFormData(prevFormData => ({
        ...prevFormData,
        PatientID: UsercreatePatientdata?.id || '',
        fullName: `${UsercreatePatientdata?.FirstName || ''} ${UsercreatePatientdata?.MiddleName  || ''} ${UsercreatePatientdata?.SurName || ''}`,
        Age: UsercreatePatientdata?.Age || '',
        Gender: UsercreatePatientdata?.Gender || '',

      }));


  }, [UsercreatePatientdata]);

  useEffect(() => {
    dispatchvalue({
      type: "workbenchformData",
      value: workbenchformData,
    });
  }, [workbenchformData, dispatchvalue]);


  const toggle = () => setIsToggled(!isToggled);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    closeToggle();
  };

  const closeToggle = () => {
    setIsToggled(false);
  };


  return (
    
    <>
    <div className="Main_container_app">
    <div className="new-patient-registration-form">
        <br />
        <div className="dctr_info_up_head">
          <div className="RegisFormcon ">
            <div className="dctr_info_up_head22">
              {workbenchformData?.PatientPhoto ? (
                <img src={workbenchformData.PatientPhoto} alt="Patient Photo" />
              ) : (
                <img src={bgImg2} alt="Default Patient Photo" />
              )}
              <label>Profile</label>
            </div>
          </div>

          <div className="RegisFormcon_1">
            <div className="RegisForm_1 ">
              <label htmlFor="PatientID">
                Patient ID <span>:</span>
              </label>
              <span className="dctr_wrbvh_pice" htmlFor="PatientID">
                {workbenchformData.PatientID}{" "}
              </span>
            </div>
            <div className="RegisForm_1 ">
              <label htmlFor="PatientName">
                Patient Name <span>:</span>{" "}
              </label>
              <span className="dctr_wrbvh_pice" htmlFor="PatientName">
                {workbenchformData?.fullName}{" "}
                
              </span>
            </div>
            
            <div className="RegisForm_1 ">
              <label htmlFor="Age">
                Age <span>:</span>{" "}
              </label>
              <span className="dctr_wrbvh_pice" htmlFor="Age">
                {workbenchformData?.Age}{" "}
              </span>
            </div>
            <div className="RegisForm_1 ">
              <label htmlFor="Gender">
                Gender <span>:</span>{" "}
              </label>
              <span className="dctr_wrbvh_pice" htmlFor="Gender">
                {workbenchformData?.Gender}{" "}
              </span>
            </div>
          </div>
        </div>

        <br />
        <div className="new-patient-registration-form">
          <div className="new-navigation">
            <h2>
              <button onClick={() => handleTabChange("Neurology")}>
              Neurology Form
              </button>
              |
              <button onClick={() => handleTabChange("IFCard")}>
                IFCard
              </button>
              |
              <button onClick={() => handleTabChange("Gynecology")}>
                Gynecology
              </button>
              |
              <button onClick={() => handleTabChange("AncCard")}>
                ANCCard
              </button>
              |
              <button onClick={() => handleTabChange("OP_Sheet")}>
              OP_Sheet
              </button>
              |
              <button onClick={() => handleTabChange("Opthalmology")}>
              Opthalmology
              </button>
              |
              <div className="Lab_dropdown">
                <button className="Lab_button">Lab</button>
                <div className="Lab_dropdown_content">
                  <button onClick={() => handleTabChange("Lab")}>
                    Lab Test
                  </button>
                  <button onClick={() => handleTabChange("LabReport")}>
                    Lab Test Preview
                  </button>
                </div>
              </div>
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
                    <button onClick={() => handleTabChange("Neurology")}>
                    Neurology Form
                    </button>
                    |
                    <button onClick={() => handleTabChange("IFCard")}>
                      IFCard
                    </button>
                    |
                    <button onClick={() => handleTabChange("Gynecology")}>
                      Gynecology
                    </button>
                    |
                    <button onClick={() => handleTabChange("AncCard")}>
                      ANCCard
                    </button>
                    |
                    <button onClick={() => handleTabChange("OP_Sheet")}>
                    OP_Sheet
                    </button>
                    |
                    <button onClick={() => handleTabChange("Opthalmology")}>
                    Opthalmology
                    </button>
                    |
                    <div className="Lab_dropdown">
                      <button className="Lab_button">Lab</button>
                      <div className="Lab_dropdown_content">
                        <button onClick={() => handleTabChange("Lab")}>
                          Lab Test
                        </button>
                        <button onClick={() => handleTabChange("LabReport")}>
                          Lab Test Preview
                        </button>
                      </div>
                    </div>
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <Suspense fallback={<div>Loading...</div>}>
      {activeTab === "Neurology" && <Neurology />}
      {activeTab === "IFCard" && <IFCard />}
      {activeTab === "Gynecology" && <Gynecology />}
      {activeTab === "AncCard" && <AncCard />}
      {activeTab === "OP_Sheet" && <OP_Sheet />}
      {activeTab === "Opthalmology" && <Opthalmology />}
      </Suspense>

    </div>

     
   
    </>
  );
}

export default PatientNavigation;










