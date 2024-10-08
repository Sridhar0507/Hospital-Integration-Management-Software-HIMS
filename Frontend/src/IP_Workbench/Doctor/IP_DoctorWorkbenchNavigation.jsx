import React, { useState, useEffect, lazy, Suspense } from "react";
import "../../DoctorWorkBench/Navigation.css";
// import "../Navigation.css";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../DoctorWorkBench/TreatmentComponent.css";
const LabTest = lazy(() => import('./LabTest.jsx'));
const RadiologyTest = lazy(() => import('./RadiologyTest.jsx'));

const IP_Vitals = lazy(() => import('./IP_Vitals.jsx'));

const IP_SurgicalHistory = lazy(() => import('./IP_SurgicalHistory.jsx'));
const IP_Assesment = lazy(() => import('./IP_Assesment.jsx'));
const IP_InputOutputChart = lazy(() => import('./IP_InputOutputChart.jsx'));
const IP_ProgressNotes = lazy(() => import('./IP_ProgressNotes.jsx'));
const IP_DocMlc = lazy(() => import('./IP_DocMlc.jsx'));
const IP_Doc_DAMA = lazy(() => import('./IP_Doc_DAMA.jsx'));
const IP_Doc_PreoperativeChecklist = lazy(() => import('./IP_Doc_PreoperativeChecklist.jsx'));
const IP_DoctorPrescribtion = lazy(()=> import('./Ip_DoctorPrescribtion.jsx'))

const IP_DoctorWorkbenchNavigation = () => {
  const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);

  console.log(IP_DoctorWorkbenchNavigation);

  const dispatchvalue = useDispatch();
  const navigate = useNavigate();
  const [ActiveTab, setActiveTab] = useState('IP_Vitals')
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
    console.log(IP_DoctorWorkbenchNavigation);
    if (Object.keys(IP_DoctorWorkbenchNavigation).length === 0) {
      navigate('/Home/IP_WorkbenchQuelist')
    }
    // else if (Object.keys(Casuality_DoctorWorkbenchNavigation).length === 0) {
    //   navigate('/Home/CasualityDocQuelist')
    // }
  }, [IP_DoctorWorkbenchNavigation,])


  // useEffect(() => {
  //   if (Object.keys(IP_DoctorWorkbenchNavigation).length === 0 && Object.keys(Casuality_DoctorWorkbenchNavigation).length === 0) {
  //     navigate('/Home/IP_WorkbenchQuelist');
  //   } else if (Object.keys(Casuality_DoctorWorkbenchNavigation).length === 0) {
  //     navigate('/Home/CasualityDocQuelist');
  //   }
  // }, [IP_DoctorWorkbenchNavigation, Casuality_DoctorWorkbenchNavigation]);


  return (

    <>
      <div className="Main_container_app">
        <div className="new-patient-registration-form">
          <br />
          <div className="dctr_info_up_head">
            <div className="RegisFormcon ">
              <div className="dctr_info_up_head22">

                <img src={IP_DoctorWorkbenchNavigation?.PatientProfile } alt="Default Patient Photo" />

                <label>Profile</label>
              </div>
            </div>

            <div className="RegisFormcon_1">
              <div className="RegisForm_1 ">
                <label htmlFor="PatientID">
                  Patient ID <span>:</span>
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="PatientID">
                  {IP_DoctorWorkbenchNavigation?.PatientId }
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="PatientName">
                  Patient Name <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="PatientName">
                  {IP_DoctorWorkbenchNavigation?.PatientName }

                </span>
              </div>

              <div className="RegisForm_1 ">
                <label htmlFor="Age">
                  Age <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Age">
                  {IP_DoctorWorkbenchNavigation?.Age }
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="Gender">
                  Gender <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Gender">
                  {IP_DoctorWorkbenchNavigation?.Gender }
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="Gender">
                  Blood Group <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Gender">
                  {IP_DoctorWorkbenchNavigation?.BloodGroup }
                </span>
              </div>
            </div>
          </div>

          <br />
          <div className="new-patient-registration-form">
            <div className="new-navigation">
              <h2>

                <button style={{ color: ActiveTab === "IP_Vitals" ? 'white' : '' }} onClick={() => handleTabChange("IP_Vitals")}>
                  Vitals
                </button>
                |
                {/* <button style={{ color: ActiveTab === "IP_MedicalHistory" ? 'white' : '' }} onClick={() => handleTabChange("IP_MedicalHistory")}>
                MedicalHistory
                </button>
                | */}
                <button style={{ color: ActiveTab === "IP_SurgicalHistory" ? 'white' : '' }} onClick={() => handleTabChange("IP_SurgicalHistory")}>
                  Surgical History
                </button>
                |
                <button style={{ color: ActiveTab === "IP_Assesment" ? 'white' : '' }} onClick={() => handleTabChange("IP_Assesment")}>
                  Assesment
                </button>
                |
                <button style={{ color: ActiveTab === "IP_InputOutputChart" ? 'white' : '' }} onClick={() => handleTabChange("IP_InputOutputChart")}>
                  Input Output Chart
                </button>
                |
                <button style={{ color: ActiveTab === "IP_ProgressNotes" ? 'white' : '' }} onClick={() => handleTabChange("IP_ProgressNotes")}>
                  ProgressNotes
                </button>
                |
                <button style={{ color: ActiveTab === "IP_DocMlc" ? 'white' : '' }} onClick={() => handleTabChange("IP_DocMlc")}>
                  MLC
                </button>
                |
                <button style={{ color: ActiveTab === "IP_Doc_DAMA" ? 'white' : '' }} onClick={() => handleTabChange("IP_Doc_DAMA")}>
                  DAMA
                </button>
                |
                <button style={{ color: ActiveTab === "IP_Doc_PreoperativeChecklist" ? 'white' : '' }} onClick={() => handleTabChange("IP_Doc_PreoperativeChecklist")}>
                  PreoperativeChecklist
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

                      <button style={{ color: ActiveTab === "IP_Vitals" ? 'white' : '' }} onClick={() => handleTabChange("IP_Vitals")}>
                        Vitals
                      </button>
                      |
                      {/* <button style={{ color: ActiveTab === "IP_MedicalHistory" ? 'white' : '' }} onClick={() => handleTabChange("IP_MedicalHistory")}>
                      MedicalHistory
                      </button>
                      | */}
                      <button style={{ color: ActiveTab === "IP_SurgicalHistory" ? 'white' : '' }} onClick={() => handleTabChange("IP_SurgicalHistory")}>
                        Surgical History
                      </button>
                      |
                      <button style={{ color: ActiveTab === "IP_Assesment" ? 'white' : '' }} onClick={() => handleTabChange("IP_Assesment")}>
                        Assesment
                      </button>
                      |
                      <button style={{ color: ActiveTab === "IP_InputOutputChart" ? 'white' : '' }} onClick={() => handleTabChange("IP_InputOutputChart")}>
                        Input Output Chart
                      </button>
                      |
                      <button style={{ color: ActiveTab === "IP_ProgressNotes" ? 'white' : '' }} onClick={() => handleTabChange("IP_ProgressNotes")}>
                        ProgressNotes
                      </button>
                      |
                      <button style={{ color: ActiveTab === "IP_DocMlc" ? 'white' : '' }} onClick={() => handleTabChange("IP_DocMlc")}>
                        MLC
                      </button>
                      |
                      <button style={{ color: ActiveTab === "IP_Doc_DAMA" ? 'white' : '' }} onClick={() => handleTabChange("IP_Doc_DAMA")}>
                        DAMA
                      </button>
                      |
                      <button style={{ color: ActiveTab === "IP_Doc_PreoperativeChecklist" ? 'white' : '' }} onClick={() => handleTabChange("IP_Doc_PreoperativeChecklist")}>
                        PreoperativeChecklist
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



                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
        <Suspense fallback={<div>Loading...</div>}>

          {ActiveTab === "IP_Vitals" && <IP_Vitals />}

          {/* {ActiveTab === "IPD_Handover" && <IPD_Handover />}  */}
          {/* {ActiveTab === "IP_MedicalHistory" && <IP_MedicalHistory />}  */}
          {ActiveTab === "IP_SurgicalHistory" && <IP_SurgicalHistory />}
          {ActiveTab === "IP_Assesment" && <IP_Assesment />}
          {ActiveTab === "IP_InputOutputChart" && <IP_InputOutputChart />}
          {ActiveTab === "IP_ProgressNotes" && <IP_ProgressNotes />}
          {ActiveTab === "IP_DocMlc" && <IP_DocMlc />}
          {ActiveTab === "IP_Doc_DAMA" && <IP_Doc_DAMA />}
          {ActiveTab === "IP_Doc_PreoperativeChecklist" && <IP_Doc_PreoperativeChecklist />}
          {ActiveTab === "Lab_Test" && <LabTest />}
          {ActiveTab === "Radiology_Test" && <RadiologyTest />}




        </Suspense>




      </div >



    </>
  );
}

export default IP_DoctorWorkbenchNavigation;

