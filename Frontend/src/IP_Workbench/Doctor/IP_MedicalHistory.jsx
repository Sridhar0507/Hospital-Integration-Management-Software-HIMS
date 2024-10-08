import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./medicalHistory.css";

const IP_MedicalHistory = () => {


    const dispatch = useDispatch();
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
    console.log(IP_DoctorWorkbenchNavigation,'IP_DoctorWorkbenchNavigation');

    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const [openModal, setOpenModal] = useState(true)

    const [medicalHistory, setMedicalHistory] = useState({
      // MedicalHistory
      Anemia: false,
      Arthritis: false,
      Asthma: false,
      Cancer: false,
      ChronicObstructivePulmonaryDisease: false,
      ClottingDisorder: false,
      SkinDisease: false,
      CongestiveHeartFailure: false,
      CrohnsDisease: false,
      Depression: false,
      Diabetes: false,
      Emphysema: false,
      EndocrineProblems: false,
      GERD: false,
      Glaucoma: false,
      Hepatitis: false,
      HIVAIDS: false,
      Hypertension: false,
      KidneyDisease: false,
      MyocardialInfarction: false,
      PepticUlcerDisease: false,
      Seizures: false,
      Stroke: false,
      UlcerativeColitis: false,
    });


    const [socialHistory, setSocialHistory] = useState({
      alcoholUseNever: false,
      alcoholUseOccasionally: false,
      alcoholUseDaily: false,
  
      tobaccoUseNever: false,
      tobaccoUseOccasionally: false,
      tobaccoUseDaily: false,
  
      drugsUseNever: false,
      drugsUseOccasionally: false,
      drugsUseDaily: false,
    });

    const [familyHistory, setFamilyHistory] = useState({
      CancerPolyps: false,
      Anemia1: false,
      Diabetes1: false,
      BloodClots1: false,
      HeartDisease1: false,
      Stroke1: false,
      HighBloodPressure1: false,
      AnesthesiaReaction1: false,
      BleedingProblems1: false,
      Hepatitis1: false,
      Other1: false,
  
     
    });

    const [familyHistoryInfo, setFamilyHistoryInfo] = useState({

      FamilyName: " ",
      Age1: "",
      RelationShip1: "",
  
    });

   

    const handleCheckboxChange = (condition) => {
      setMedicalHistory({
        ...medicalHistory,
        [condition]: !medicalHistory[condition],
      });
    };


    const handleCheckboxChange2 = (name) => {
      setSocialHistory((prevState) => {
        let updatedState = { ...prevState };
  
        // Deselect all other checkboxes in the same category
        switch (name) {
          case "alcoholUseNever":
          case "alcoholUseOccasionally":
          case "alcoholUseDaily":
            updatedState = {
              ...prevState,
              alcoholUseNever: false,
              alcoholUseOccasionally: false,
              alcoholUseDaily: false,
              [name]: !prevState[name],
            };
            break;
          case "tobaccoUseNever":
          case "tobaccoUseOccasionally":
          case "tobaccoUseDaily":
            updatedState = {
              ...prevState,
              tobaccoUseNever: false,
              tobaccoUseOccasionally: false,
              tobaccoUseDaily: false,
              [name]: !prevState[name],
            };
            break;
          case "drugsUseNever":
          case "drugsUseOccasionally":
          case "drugsUseDaily":
            updatedState = {
              ...prevState,
              drugsUseNever: false,
              drugsUseOccasionally: false,
              drugsUseDaily: false,
              [name]: !prevState[name],
            };
            break;
          default:
            break;
        }
  
        return updatedState;
      });
    };


    const handleCheckboxChange3 = (condition) => {
      setFamilyHistory({
        ...familyHistory,
        [condition]: !familyHistory[condition],
      });
    };


    const handleInputWomenChange= (e) => {
      const { name, value } = e.target;
      setFamilyHistoryInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }


    const getSelectedMedicalHistory = (medicalHistory) => {
      const selectedHistory = [];
      Object.keys(medicalHistory).forEach(key => {
          if (medicalHistory[key]) {
              selectedHistory.push(key);
          }
      });
      return selectedHistory;
    };
    const selectedMedicalHistory = getSelectedMedicalHistory(medicalHistory);
    console.log(selectedMedicalHistory,'selectedMedicalHistory');


    const getSelectedSocialHistory = (socialHistory) => {
      const getSelectedSocialHistory = [];
      Object.keys(socialHistory).forEach(key => {
          if (socialHistory[key]) {
            getSelectedSocialHistory.push(key);
          }
      });
      return getSelectedSocialHistory;
    };
    const selectedSocialHistory = getSelectedSocialHistory(socialHistory);
    console.log(selectedSocialHistory,'selectedSocialHistory');

    const getSelectedFamilyHistory = (familyHistory) => {
      const getSelectedFamilyHistory = [];
      Object.keys(familyHistory).forEach(key => {
          if (socialHistory[key]) {
            getSelectedFamilyHistory.push(key);
          }
      });
      return getSelectedFamilyHistory;
    };
    const selectedFamilyHistory = getSelectedFamilyHistory(socialHistory);
    console.log(selectedFamilyHistory,'selectedFamilyHistory');




    return (
      <>
        <div className="RegisFormcon_1">

          <div className="form-section5">
            {Object.keys(medicalHistory).map((labelname, indx) => (
              <React.Fragment key={labelname}>
                {indx % 8 === 0 && (
                  <div className="div_ckkck_box">
                    {Object.keys(medicalHistory).slice(indx, indx + 8).map((key) => (
                      <label key={key} className="checkbox-label">
                        <input
                          type="checkbox"
                          id={key}
                          className="checkbox-input"
                          checked={medicalHistory[key]}
                          onChange={() => handleCheckboxChange(key)}
                        />
                        {key}
                      </label>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="form-section5">
            <div className=" ">
              <div className="div_ckkck_box alcho_tac_drg11">
                <div className="ffdff44">
                  <div>
                    <label className="checkbox-label alcho_tac_drg">
                      {" "}
                      Alcohol use -{" "}
                    </label>
                  </div>
                  <div className="flx_cjk_labl3">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox-input ddsfe"
                        checked={socialHistory.alcoholUseNever}
                        onChange={() => {
                          handleCheckboxChange2("alcoholUseNever");
                        }}
                      />
                      Never
                    </label>
                  </div>
                  <div className="flx_cjk_labl3">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox-input ddsfe"
                        checked={socialHistory.alcoholUseOccasionally}
                        onChange={() => {
                          handleCheckboxChange2("alcoholUseOccasionally");
                        }}
                      />
                      Occasionally
                    </label>
                  </div>

                  <div className="flx_cjk_labl3">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox-input ddsfe"
                        checked={socialHistory.alcoholUseDaily}
                        onChange={() => {
                          handleCheckboxChange2("alcoholUseDaily");
                        }}
                      />
                      Daily
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="div_ckkck_box alcho_tac_drg11">
                    <div className="ffdff44">
                      <div>
                        <label className="checkbox-label alcho_tac_drg">
                          {" "}
                          Tobacco use -{" "}
                        </label>
                      </div>
                      <div className="flx_cjk_labl3">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            className="checkbox-input ddsfe"
                            checked={socialHistory.tobaccoUseNever}
                            onChange={() => {
                              handleCheckboxChange2("tobaccoUseNever");
                            }}
                          />
                          Never
                        </label>
                      </div>

                      <div className="flx_cjk_labl3">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            className="checkbox-input ddsfe"
                            checked={socialHistory.tobaccoUseOccasionally}
                            onChange={() => {
                              handleCheckboxChange2("tobaccoUseOccasionally");
                            }}
                          />
                          Occasionally
                        </label>
                      </div>

                      <div className="flx_cjk_labl3">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            className="checkbox-input ddsfe"
                            checked={socialHistory.tobaccoUseDaily}
                            onChange={() => {
                              handleCheckboxChange2("tobaccoUseDaily");
                            }}
                          />
                          Daily
                        </label>
                      </div>
                    </div>
              </div>

              <div className="div_ckkck_box alcho_tac_drg11">
                  <div className="ffdff44">
                    <div>
                      <label className="checkbox-label alcho_tac_drg">
                        {" "}
                        Drugs use -{" "}
                      </label>
                    </div>
                    <div className="flx_cjk_labl3">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="checkbox-input ddsfe"
                          checked={socialHistory.drugsUseNever}
                          onChange={() => {
                            handleCheckboxChange2("drugsUseNever");
                          }}
                        />
                        Never
                      </label>
                    </div>

                    <div className="flx_cjk_labl3">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="checkbox-input ddsfe"
                          checked={socialHistory.drugsUseOccasionally}
                          onChange={() => {
                            handleCheckboxChange2("drugsUseOccasionally");
                          }}
                        />
                        Occasionally
                      </label>
                    </div>

                    <div className="flx_cjk_labl3">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="checkbox-input ddsfe"
                          checked={socialHistory.drugsUseDaily}
                          onChange={() => {
                            handleCheckboxChange2("drugsUseDaily");
                          }}
                        />
                        Daily
                      </label>
                    </div>
                  </div>
              </div>

            </div>  
 

          </div>

          <div className="form-section5">
             
              
            <div className="div_ckkkbox_head">
              <div className="div_ckkck_box">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={familyHistory.CancerPolyps}
                    onChange={() => handleCheckboxChange3("CancerPolyps")}
                  />
                  Cancer/Polyps
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={familyHistory.Anemia1}
                    onChange={() => handleCheckboxChange3("Anemia1")}
                  />
                  Anemia
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={familyHistory.Diabetes1}
                    onChange={() => handleCheckboxChange3("Diabetes1")}
                  />
                  Diabetes
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={familyHistory.BloodClots1}
                    onChange={() => handleCheckboxChange3("BloodClots1")}
                  />
                  Blood Clots
                </label>
              </div>

              <div className="div_ckkck_box">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={familyHistory.HeartDisease1}
                    onChange={() => handleCheckboxChange3("HeartDisease1")}
                  />
                  Heart Disease
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={familyHistory.Stroke1}
                    onChange={() => handleCheckboxChange3("Stroke1")}
                  />
                  Stroke
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={familyHistory.HighBloodPressure1}
                    onChange={() =>
                      handleCheckboxChange3("HighBloodPressure1")
                    }
                  />
                  High Blood Pressure
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={familyHistory.AnesthesiaReaction1}
                    onChange={() =>
                      handleCheckboxChange3("AnesthesiaReaction1")
                    }
                  />
                  Anesthesia Reaction
                </label>
              </div>

              <div className="div_ckkck_box">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={familyHistory.BleedingProblems1}
                    onChange={() =>
                      handleCheckboxChange3("BleedingProblems1")
                    }
                  />
                  Bleeding Problems
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={familyHistory.Hepatitis1}
                    onChange={() => handleCheckboxChange3("Hepatitis1")}
                  />
                  Hepatitis
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={familyHistory.Other1}
                    onChange={() => handleCheckboxChange3("Other1")}
                  />
                  Others
                </label>
              </div>
            </div>
              
  
              
          </div>

          <div className="form-section5">
            <div className="form-section56">
              
              
              <label className="form-field56">
                {" "}
                Relationship :
                <input
                  type="text"
                  name="RelationShip1"
                  value={familyHistoryInfo.RelationShip1}
                  onChange = {handleInputWomenChange}
                />
              </label>
            </div>

          </div>



        </div>
      </>

    )
}

export default IP_MedicalHistory