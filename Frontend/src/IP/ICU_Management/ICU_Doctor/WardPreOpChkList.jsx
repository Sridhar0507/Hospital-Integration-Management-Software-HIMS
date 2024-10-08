import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const WardPreOpChkList = () => {
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const dispatch = useDispatch();
  
    const dispatchvalue = useDispatch();
  


    const [PreOpChk, setPreOpChk] = useState({
        Date: "",
        Time: "",
        OperativeArea: "",
        OperativeAreaRemarks: "",
        Operativeinspected: "",
        OperativeinspectedRemarks: "",
        JewelleryRemoved: "",
        JewelleryRemovedRemarks: "",
        JewelleryTied: "",
        JewelleryTiesRemarks: "",
        NasogastricTube: "",
        NasogastricTubeRemarks: "",
        Falsetooth: "",
        FalsetoothRemarks: "",
        ColouredNail: "",
        ColouredNailRemarks: "",
        HairPrepared: "",
        HairPreparedRemarks: "",
        VoidedAmount: "",
        VoidedAmountRemarks: "",
        VoidedTime: "",
        VoidedTimeRemarks: "",
        VaginalDouche: "",
        VaginalDoucheRemarks: "",
        Allergies: "",
        AllergiesRemarks: "",
        BathTaken: "",
        BathTakenRemarks: "",
        BloodRequirement: "",
        BloodRequirementRemarks: "",
        ConsentForm: "",
        ConsentFormRemarks: "",
        MorningTPR: "",
        MorningTPRRemarks: "",
        MorningSample: "",
        MorningSampleRemarks: "",
        XRayFilms: "",
        XRayFilmsRemarks: "",
        PreanaestheticMedication: "",
        PreanaestheticMedicationRemarks: "",
        SideRails: "",
        SideRailsRemarks: "",
        PulseRate: "",
        PulseRateRemarks: "",
        RespRate: "",
        RespRateRemarks: "",
        IdentificationWristlet: "",
        IdentificationWristletRemarks: "",
        SpecialDrug: "",
        DutySisterName: "",
    
    
      });
      console.log(PreOpChk);
    
      
      const IpNurseQueSelectedRow = {
        Booking_Id: '1001A',  // Replace with actual data or initialize as needed
        PatientId: '1',
        PatientName: 'diya'
    };
    


    const handleCheckboxChange = (name, option) => {
        setPreOpChk((prevData) => ({
          ...prevData,
          [name]: option,
        }));
      };
    
      const handleTextareaChange = (name, value) => {
        setPreOpChk((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


      const renderSection = (label, name) => (
        <div className="OtMangementForm_1 djkwked675 dedwe">
          <label className="jewj33j">
            {label}
            <span>:</span>
          </label>
          <div className="OtMangementForm_1_checkbox">
            <label htmlFor={`${name}Yes`}>
              <input
                type="checkbox"
                id={`${name}Yes`}
                name={name}
                value="Yes"
                checked={PreOpChk[name] === "Yes"}
                onChange={() => handleCheckboxChange(name, "Yes")}
              />
              Yes
            </label>
            <label htmlFor={`${name}No`}>
              <input
                type="checkbox"
                id={`${name}No`}
                name={name}
                value="No"
                checked={PreOpChk[name] === "No"}
                onChange={() => handleCheckboxChange(name, "No")}
              />
              No
            </label>
    
            <div className="EWFERYU7KUILP7">
              <label>
                Remarks<span>:</span>
              </label>
              <textarea
                value={PreOpChk[`${name}Remarks`]}
                onChange={(e) =>
                  handleTextareaChange(`${name}Remarks`, e.target.value)
                }
              ></textarea>
            </div>
          </div>
        </div>
      );
      
      const [PreOpChGet,setPreOpChGet] = useState(false);



      const handleSubmit = () => {
        const requiredFields = [
          "Date", "Time", "OperativeArea", "OperativeAreaRemarks", "Operativeinspected",
          "OperativeinspectedRemarks", "JewelleryRemoved", "JewelleryRemovedRemarks", "JewelleryTied", "JewelleryTiesRemarks",
          "NasogastricTube", "NasogastricTubeRemarks", "Falsetooth", "FalsetoothRemarks", 
          "ColouredNail","ColouredNailRemarks","HairPrepared","HairPreparedRemarks",
          "VoidedAmount","VoidedAmountRemarks","VoidedTime","VoidedTimeRemarks","VaginalDouche",
          "VaginalDoucheRemarks","Allergies","AllergiesRemarks","BathTaken","BathTakenRemarks",
          "BloodRequirement","BloodRequirementRemarks","ConsentForm","ConsentFormRemarks","MorningTPR",
          "MorningTPRRemarks","MorningSample","MorningSampleRemarks","XRayFilms","XRayFilmsRemarks",
          "PreanaestheticMedication","PreanaestheticMedicationRemarks","SideRails","SideRailsRemarks",
          "PulseRate","PulseRateRemarks","RespRate","RespRateRemarks","IdentificationWristlet",
          "IdentificationWristletRemarks","SpecialDrug","DutySisterName",
         
        ];
    
        const missingFields = requiredFields.filter(field => !PreOpChk[field]);
        if (missingFields.length > 0) {
          alert(`Please fill empty fields: ${missingFields.join(", ")}`);
        } else {
          const Allsenddata = {
            ...PreOpChk,
            PatientId : IpNurseQueSelectedRow?.PatientId,
            Booking_Id : IpNurseQueSelectedRow?.Booking_Id,
            PatientName : IpNurseQueSelectedRow?.PatientName,
            Location: userRecord?.location || 'chennai',
            CreatedBy: userRecord?.username || 'admin',
            
          };
    
          axios.post(`${UrlLink}IP/Ward_PreOpChecklist_Details_Link`, Allsenddata)
            .then((res) => {
              const resData = res.data;
    
              const type = Object.keys(resData)[0];
              const message = Object.values(resData)[0];
              const toastData = {
                message: message,
                type: type,
              };
    
              dispatch({ type: 'toast', value: toastData });
              PreOpChGet(true);
             
             
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
    
    


  return (
    <>
       <div className="Main_container_app">
        <div className="form-section5">
            <div className="common_center_tag">
                <h3>Ward Preoperative CheckList</h3>
            </div>
            <br />
            <div className="RegisFormcon_1">
                <div className="OtMangementForm_1 djkwked675 dedwe">
                    <label className="jewj33j">Date:</label>
                    <input
                    type="date"
                    value={PreOpChk.Date}
                    onChange={(e) =>
                        setPreOpChk((prevData) => ({
                        ...prevData,
                        Date: e.target.value,
                        }))
                    }
                    />

                </div>

                <div className="OtMangementForm_1 djkwked675 dedwe">
                <label className="jewj33j">Time:</label>
                <input
                  type="time"
                  value={PreOpChk.Time}
                  onChange={(e) =>
                    setPreOpChk((prevData) => ({
                      ...prevData,
                      Time: e.target.value,
                    }))
                  }
                />
              </div>
              <br/>
              {renderSection("1. Operative area prepared", "OperativeArea")}
              {renderSection("2. Operative area inspected", "Operativeinspected")}
              <div className="OtMangementForm_1 dedwe33">
                <div className="uedoiopp099">
                  <div className="yhdy67666">
                    <div>
                      <label>3. Jewellery -</label>
                    </div>
                    <div className="mjd6sw edec">
                      <div className="juyuyy80">
                        <div className="kju">
                          <label>
                            <p>a.</p>
                            <label> Removed & handed over</label>
                            <span>:</span>
                          </label>
                        </div>

                        <div className="nnnmmcbb4">
                          <div className="OtMangementForm_1_checkbox jhwdhjw">
                            <label htmlFor="JewelleryRemovedYes">
                              <input
                                type="checkbox"
                                id="JewelleryRemovedYes"
                                name="JewelleryRemoved"
                                value="Yes"
                                checked={PreOpChk.JewelleryRemoved === "Yes"}
                                onChange={() =>
                                  handleCheckboxChange("JewelleryRemoved", "Yes")
                                }
                              />
                              Yes
                            </label>
                            <label htmlFor="JewelleryRemovedNo">
                              <input
                                type="checkbox"
                                id="JewelleryRemovedNo"
                                name="JewelleryRemoved"
                                value="No"
                                checked={PreOpChk.JewelleryRemoved === "No"}
                                onChange={() =>
                                  handleCheckboxChange("JewelleryRemoved", "No")
                                }
                              />
                              No
                            </label>
                            <div className="EWFERYU7KUILP7">
                              <label>
                                Remarks<span>:</span>
                              </label>
                              <textarea
                                value={PreOpChk.JewelleryRemovedRemarks}
                                onChange={(e) =>
                                  handleTextareaChange(
                                    "JewelleryRemovedRemarks",
                                    e.target.value
                                  )
                                }
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="juyuyy80">
                        <div className="kju">
                          <label>
                            <p>b.</p>
                            <label> Tied on</label>
                            <span>:</span>
                          </label>
                        </div>

                        <div className="nnnmmcbb4">
                          <div className="OtMangementForm_1_checkbox jhwdhjw">
                            <label htmlFor="JewelleryTiedYes">
                              <input
                                type="checkbox"
                                id="JewelleryTiedYes"
                                name="JewelleryTied"
                                value="Yes"
                                checked={PreOpChk.JewelleryTied === "Yes"}
                                onChange={() =>
                                  handleCheckboxChange("JewelleryTied", "Yes")
                                }
                              />
                              Yes
                            </label>
                            <label htmlFor="JewelleryTiedNo">
                              <input
                                type="checkbox"
                                id="JewelleryTiedNo"
                                name="JewelleryTied"
                                value="No"
                                checked={PreOpChk.JewelleryTied === "No"}
                                onChange={() =>
                                  handleCheckboxChange("JewelleryTied", "No")
                                }
                              />
                              No
                            </label>
                            <div className="EWFERYU7KUILP7">
                              <label>
                                Remarks<span>:</span>
                              </label>
                              <textarea
                                value={PreOpChk.JewelleryTiesRemarks}
                                onChange={(e) =>
                                  handleTextareaChange(
                                    "JewelleryTiesRemarks",
                                    e.target.value
                                  )
                                }
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="kjwiu36220"></div>
                </div>
              </div>


            </div>


        </div>

       </div>
    </>
    
  )
}

export default WardPreOpChkList;