import React, { useState, useEffect } from "react";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

import bgImg2 from "../../Assets/bgImg2.jpg";
import OtNursePre from "./OtNursePre";
import OtNurseIntra from "./OtNurseIntra";
import OtNursePost from "./OtNursePost";


function OtNurseeNavigation() {
    const [activeTab, setActiveTab] = useState("OtNursePost");
    const [isToggled, setIsToggled] = useState(false);
  
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
        <br />
        <div className="new-patient-registration-form">
          <div className="dctr_info_up_head">
            <div className="RegisFormcon ">
              <div className="dctr_info_up_head22">
                {/* {workbenchformData.PatientPhoto ? (
                  <img src={workbenchformData.PatientPhoto} alt="Patient Photo" /> */}
                {/* ) : ( */}
                <img src={bgImg2} alt="Default Patient Photo" />
                {/* )} */}
                <label>Profile</label>
              </div>
            </div>
  
            <div className="RegisFormcon">
              <div className="RegisForm_1 ">
                <label htmlFor="FirstName">
                  Patient Name <span>:</span>{" "}
                </label>
  
                <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                  {/* {workbenchformData.firstName + " " + workbenchformData.lastName}{" "} */}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="FirstName">
                  Patient ID <span>:</span>
                </label>
  
                <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                  {/* {workbenchformData.PatientID}{" "} */}
                </span>
              </div>
              {/* <div className="RegisForm_1 ">
                <label htmlFor="FirstName">
                  Date of birth <span>:</span>{" "}
                </label>
  
                <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                  {workbenchformData.firstName + " " + workbenchformData.lastName}{" "}
                </span>
              </div> */}
              <div className="RegisForm_1 ">
                <label htmlFor="FirstName">
                  Age <span>:</span>{" "}
                </label>
  
                <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                  {/* {workbenchformData.Age}{" "} */}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="FirstName">
                  Gender <span>:</span>{" "}
                </label>
  
                <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                  {/* {workbenchformData.Gender}{" "} */}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="FirstName">
                  Primary Doctor <span>:</span>{" "}
                </label>
  
                <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                  {/* {workbenchformData.DoctorName}{" "} */}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="FirstName">
                  Location <span>:</span>{" "}
                </label>
  
                <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                  {/* {workbenchformData.Location}{" "} */}
                </span>
              </div>
            </div>
          </div>
          <br />
  
          <div className="new-patient-registration-form1">
            <div className="new-navigation">
              <h2>
                <button onClick={() => handleTabChange("OtNursePre")}>
                  Pre-Operative Checklist
                </button>
                |
                <button onClick={() => handleTabChange("OtNurseIntra")}>
                  Intra-Operative Checklist
                </button>
                |
                <button onClick={() => handleTabChange("OtNursePost")}>
                  Post-Operative Checklist
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
                      <button onClick={() => handleTabChange("OtNursePre")}>
                        Pre-Operative Checklist
                      </button>
                      |
                      <button onClick={() => handleTabChange("OtNurseIntra")}>
                        Intra-Operative Checklist
                      </button>
                      |
                      <button onClick={() => handleTabChange("OtNursePost")}>
                        Post-Operative Checklist
                      </button>
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
  
        {activeTab === "OtNursePre" && <OtNursePre />}
        {activeTab === "OtNurseIntra" && <OtNurseIntra />}
        {activeTab === "OtNursePost" && <OtNursePost />}
      </>
    );
  }
export default OtNurseeNavigation





