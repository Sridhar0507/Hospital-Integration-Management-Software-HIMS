import React, { useState, useEffect, lazy, Suspense } from "react";
import "./Navigation.css";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgImg2 from "../Assets/bgImg2.jpg";
import './TreatmentComponent.css'

const Vitals = lazy(() => import('./vitals.jsx'));
const Neurology = lazy(() => import('./Neurology.jsx'));
const IFCard = lazy(() => import('./IFCard.jsx'));
const Gynecology = lazy(() => import('./Gynecology.jsx'));
const OP_Sheet = lazy(() => import('./OP_Sheet.jsx'));
const PastHistory = lazy(() => import('./PastHistory.js'));
const Prescription = lazy(() => import('./Prescription.js'));
const NewProcedure = lazy(() => import('./NewProcedure.js'));
const GeneralEvaluation = lazy(() => import('./GeneralEvaluation.jsx'));
const LabTest = lazy(() => import('./LabTest.jsx'));
const RadiologyTest = lazy(() => import('./RadiologyTest.jsx'));
const ReferaDoctor = lazy(() => import('./ReferaDoctor.jsx'));
const OpIpconnect = lazy(() => import('./OpIpconnect.jsx'))
const AncCard = lazy(() => import('./ANCCard.jsx'));

const DoctorWorkbenchNavigation = () => {
  const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);
  const dispatchvalue = useDispatch();
  const navigate = useNavigate();
  const [ActiveTab, setActiveTab] = useState('Vitals')
  const [isToggled, setIsToggled] = useState(false)

  const toggle = () => setIsToggled(!isToggled);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    closeToggle();
  };

  const closeToggle = () => {
    setIsToggled(false);
  };

  useEffect(() => {
    console.log(DoctorWorkbenchNavigation);
    if (Object.keys(DoctorWorkbenchNavigation).length === 0) {
      navigate('/Home/WorkbenchQuelist')
    }
  }, [DoctorWorkbenchNavigation])

  return (

    <>
      <div className="Main_container_app">
        <div className="new-patient-registration-form">
          <br />
          <div className="dctr_info_up_head">
            <div className="RegisFormcon ">
              <div className="dctr_info_up_head22">

                <img src={bgImg2} alt="Default Patient Photo" />

                <label>Profile</label>
              </div>
            </div>

            <div className="RegisFormcon_1">
              <div className="RegisForm_1 ">
                <label htmlFor="PatientID">
                  Patient ID <span>:</span>
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="PatientID">
                  {DoctorWorkbenchNavigation?.PatientId}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="PatientName">
                  Patient Name <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="PatientName">
                  {DoctorWorkbenchNavigation?.PatientName}

                </span>
              </div>

              <div className="RegisForm_1 ">
                <label htmlFor="Age">
                  Age <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Age">
                  {DoctorWorkbenchNavigation?.Age}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="Gender">
                  Gender <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Gender">
                  {DoctorWorkbenchNavigation?.Gender}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="Gender">
                  Blood Group <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Gender">
                  {DoctorWorkbenchNavigation?.BloodGroup}
                </span>
              </div>
            </div>
          </div>

          <br />
          <div className="new-patient-registration-form">
            <div className="new-navigation">
              <h2>
                <button style={{ color: ActiveTab === "Vitals" ? 'white' : '' }} onClick={() => handleTabChange("Vitals")}>
                  Vitals
                </button>
                |
                <button style={{ color: ActiveTab === "GeneralEvaluation" ? 'white' : '' }} onClick={() => handleTabChange("GeneralEvaluation")}>
                  GeneralEvaluation
                </button>
                |
                <button style={{ color: ActiveTab === "PastHistory" ? 'white' : '' }} onClick={() => handleTabChange("PastHistory")}>
                  Past History
                </button>
                |

                <button style={{ color: ActiveTab === "Prescription" ? 'white' : '' }} onClick={() => handleTabChange("Prescription")}>
                  Prescription
                </button>
                |

                <button style={{ color: ActiveTab === "Neurology" ? 'white' : '' }} onClick={() => handleTabChange("Neurology")}>
                  Neurology Form
                </button>
                |
                <button style={{ color: ActiveTab === "IFCard" ? 'white' : '' }} onClick={() => handleTabChange("IFCard")}>
                  IFCard
                </button>
                |
                <button style={{ color: ActiveTab === "Gynecology" ? 'white' : '' }} onClick={() => handleTabChange("Gynecology")}>
                  Gynecology
                </button>
                |
                <button style={{ color: ActiveTab === "AncCard" ? 'white' : '' }} onClick={() => handleTabChange("AncCard")}>
                  ANCCard
                </button>
                |
                <button style={{ color: ActiveTab === "OP_Sheet" ? 'white' : '' }} onClick={() => handleTabChange("OP_Sheet")}>
                  Neuro Surgery
                </button>
                |
                <button style={{ color: ActiveTab === "Refer_Doctor" ? 'white' : '' }} onClick={() => handleTabChange("Refer_Doctor")}>
                  Refer Doctor
                </button>
                |

                <div className="Lab_dropdown">
                  <button style={{ color: ActiveTab === "Lab_Test" || ActiveTab === "Radiology_Test" ? 'white' : '' }} className="Lab_button">Diagnostics</button>
                  <div className="Lab_dropdown_content">
                    <button style={{ color: ActiveTab === "Lab_Test" ? 'white' : '' }} onClick={() => handleTabChange("Lab_Test")}>
                      Lab
                    </button>
                    <button style={{ color: ActiveTab === "Radiology_Test" ? 'white' : '' }} onClick={() => handleTabChange("Radiology_Test")}>
                      Radiology
                    </button>
                  </div>
                </div>
                |
                <button style={{ color: ActiveTab === "OP_IP_Connect" ? 'white' : '' }} onClick={() => handleTabChange("OP_IP_Connect")}>
                  OP-IP
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
                      <button style={{ color: ActiveTab === "Vitals" ? 'white' : '' }} onClick={() => handleTabChange("Vitals")}>
                        Vitals
                      </button>
                      |
                      <button style={{ color: ActiveTab === "GeneralEvaluation" ? 'white' : '' }} onClick={() => handleTabChange("GeneralEvaluation")}>
                        GeneralEvaluation
                      </button>
                      |
                      <button style={{ color: ActiveTab === "PastHistory" ? 'white' : '' }} onClick={() => handleTabChange("PastHistory")}>
                        Past History
                      </button>
                      |

                      <button style={{ color: ActiveTab === "Prescription" ? 'white' : '' }} onClick={() => handleTabChange("Prescription")}>
                        Prescription
                      </button>
                      |

                      <button style={{ color: ActiveTab === "Neurology" ? 'white' : '' }} onClick={() => handleTabChange("Neurology")}>
                        Neurology Form
                      </button>
                      |
                      <button style={{ color: ActiveTab === "IFCard" ? 'white' : '' }} onClick={() => handleTabChange("IFCard")}>
                        IFCard
                      </button>
                      |
                      <button style={{ color: ActiveTab === "Gynecology" ? 'white' : '' }} onClick={() => handleTabChange("Gynecology")}>
                        Gynecology
                      </button>
                      |
                      <button style={{ color: ActiveTab === "AncCard" ? 'white' : '' }} onClick={() => handleTabChange("AncCard")}>
                        ANCCard
                      </button>
                      |
                      <button style={{ color: ActiveTab === "OP_Sheet" ? 'white' : '' }} onClick={() => handleTabChange("OP_Sheet")}>
                        Neuro Surgery
                      </button>
                      |
                      <button style={{ color: ActiveTab === "Refer_Doctor" ? 'white' : '' }} onClick={() => handleTabChange("Refer_Doctor")}>
                        Refer Doctor
                      </button>
                      |

                      <div className="Lab_dropdown">
                        <button style={{ color: ActiveTab === "Lab_Test" || ActiveTab === "Radiology_Test" ? 'white' : '' }} className="Lab_button">Diagnostics</button>
                        <div className="Lab_dropdown_content">
                          <button style={{ color: ActiveTab === "Lab_Test" ? 'white' : '' }} onClick={() => handleTabChange("Lab_Test")}>
                            Lab
                          </button>
                          <button style={{ color: ActiveTab === "Radiology_Test" ? 'white' : '' }} onClick={() => handleTabChange("Radiology_Test")}>
                            Radiology
                          </button>
                        </div>
                      </div>
                      |
                      <button style={{ color: ActiveTab === "OP_IP_Connect" ? 'white' : '' }} onClick={() => handleTabChange("OP_IP_Connect")}>
                        OP-IP
                      </button>
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
        <Suspense fallback={<div>Loading...</div>}>

          {ActiveTab === "Vitals" && <Vitals />}
          {ActiveTab === "PastHistory" && <PastHistory />}
          {/* {ActiveTab === "Treatment" && <Treatment />} */}
          {ActiveTab === "Prescription" && <Prescription />}
          {ActiveTab === "NewProcedure" && <NewProcedure />}




          {ActiveTab === "Neurology" && <Neurology />}
          {ActiveTab === "IFCard" && <IFCard />}
          {ActiveTab === "Gynecology" && <Gynecology />}
          {ActiveTab === "AncCard" && <AncCard />}
          {ActiveTab === "OP_Sheet" && <OP_Sheet />}

          {ActiveTab === "GeneralEvaluation" && <GeneralEvaluation />}
          {ActiveTab === "OP_IP_Connect" && <OpIpconnect />}
          {/* {ActiveTab === "Opthalmology" && <Opthalmology />} */}
          {ActiveTab === "Lab_Test" && <LabTest />}
          {ActiveTab === "Radiology_Test" && <RadiologyTest />}
          {ActiveTab === "Refer_Doctor" && <ReferaDoctor />}


        </Suspense>




      </div >



    </>
  );
}

export default DoctorWorkbenchNavigation;

