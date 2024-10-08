import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import bgImg2 from "../../../Assets/bgImg2.jpg";
import { useDispatch, useSelector } from "react-redux";
import './IpPreoperativeIns.css';

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

const PreOperativeChecklistForm2 = () => {
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const dispatch = useDispatch();

  const dispatchvalue = useDispatch();

  
  const [selectedOption, setSelectedOption] = useState({
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

  
  console.log(selectedOption);
  

  
  const IpNurseQueSelectedRow = {
    Booking_Id: '1001A',  // Replace with actual data or initialize as needed
    PatientId: '1',
    PatientName: 'diya'
};




  const handleCheckboxChange = (name, option) => {
    setSelectedOption((prevData) => ({
      ...prevData,
      [name]: option,
    }));
  };

  const handleTextareaChange = (name, value) => {
    setSelectedOption((prevData) => ({
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
            checked={selectedOption[name] === "Yes"}
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
            checked={selectedOption[name] === "No"}
            onChange={() => handleCheckboxChange(name, "No")}
          />
          No
        </label>

        <div className="EWFERYU7KUILP7">
          <label>
            Remarks<span>:</span>
          </label>
          <textarea
            value={selectedOption[`${name}Remarks`]}
            onChange={(e) =>
              handleTextareaChange(`${name}Remarks`, e.target.value)
            }
          ></textarea>
        </div>
      </div>
    </div>
  );

  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);
  // Rest of your state and logic...

  const componentRef = useRef();

  const handlePrint2 = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: async () => {
      // Additional action after printing, if needed
    },
  });

  const Submitalldata = () => {
    setIsPrintButtonVisible(false);
    setTimeout(() => {
      handlePrint2();
      setIsPrintButtonVisible(true); // Resetting print button visibility
    }, 500); // Adjust delay as needed
  };


 






  const [clinicName, setClinicName] = useState("");
  const [clinicLogo, setClinicLogo] = useState(null);
  const [location, setlocation] = useState("");




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


  const [PreOpGet,setPreOpGet] = useState(false);


  useEffect(() => {
    if (IpNurseQueSelectedRow?.Booking_Id) {
        axios.get(`${UrlLink}IP/Ward_PreOpChecklist_Details_Link?Booking_Id=${IpNurseQueSelectedRow.Booking_Id}`)
            .then((response) => {
                const data = response.data[0];  // Assuming it returns an array with a single object
                console.log("Fetched Mlc data:", data);

                setSelectedOption({
                    Date: data?.Date || '',
                    Time: data?.Time || '',
                    OperativeArea: data?.OperativeArea || '',
                    OperativeAreaRemarks: data?.OperativeAreaRemarks || '',
                    Operativeinspected: data?.Operativeinspected || '',
                    OperativeinspectedRemarks: data?.OperativeinspectedRemarks || '',
                    JewelleryRemoved: data?.JewelleryRemoved || '',
                    JewelleryRemovedRemarks: data?.JewelleryRemovedRemarks || '',
                    JewelleryTied: data?.JewelleryTied || '',
                    JewelleryTiesRemarks: data?.JewelleryTiesRemarks || '',
                    NasogastricTube: data?.NasogastricTube || '',
                    NasogastricTubeRemarks: data?.NasogastricTubeRemarks || '',
                    Falsetooth: data?.Falsetooth || '',
                    FalsetoothRemarks: data?.FalsetoothRemarks || '',
                    ColouredNail: data?.ColouredNail || '',
                    ColouredNailRemarks: data?.ColouredNailRemarks || '',
                    HairPrepared: data?.HairPrepared || '',
                    HairPreparedRemarks: data?.HairPreparedRemarks || '',
                    VoidedAmount: data?.VoidedAmount || '',
                    VoidedAmountRemarks: data?.VoidedAmountRemarks || '',
                    VoidedTime: data?.VoidedTime || '',
                    VoidedTimeRemarks: data?.VoidedTimeRemarks || '',
                    VaginalDouche: data?.VaginalDouche || '',
                    VaginalDoucheRemarks: data?.VaginalDoucheRemarks || '',
                    Allergies: data?.Allergies || '',
                    AllergiesRemarks: data?.AllergiesRemarks || '',
                    BathTaken: data?.BathTaken || '',
                    BathTakenRemarks: data?.BathTakenRemarks || '',
                    BloodRequirement: data?.BloodRequirement || '',
                    BloodRequirementRemarks: data?.BloodRequirementRemarks || '',
                    ConsentForm: data?.ConsentForm || '',
                    ConsentFormRemarks: data?.ConsentFormRemarks || '',
                    MorningTPR: data?.MorningTPR || '',
                    MorningTPRRemarks: data?.MorningTPRRemarks || '',
                    MorningSample: data?.MorningSample || '',
                    MorningSampleRemarks: data?.MorningSampleRemarks || '',
                    XRayFilms: data?.XRayFilms || '',
                    XRayFilmsRemarks: data?.XRayFilmsRemarks || '',
                    PreanaestheticMedication: data?.PreanaestheticMedication || '',
                    PreanaestheticMedicationRemarks: data?.PreanaestheticMedicationRemarks || '',
                    SideRails: data?.SideRails || '',
                    SideRailsRemarks: data?.SideRailsRemarks || '',
                    PulseRate: data?.PulseRate || '',
                    PulseRateRemarks: data?.PulseRateRemarks || '',
                    RespRate: data?.RespRate || '',
                    RespRateRemarks: data?.RespRateRemarks || '',
                    IdentificationWristlet: data?.IdentificationWristlet || '',
                    IdentificationWristletRemarks: data?.IdentificationWristletRemarks || '',
                    SpecialDrug: data?.SpecialDrug || '',
                    DutySisterName: data?.DutySisterName || '',
                    
                });

                console.log("Fetched data:", data);
            })
            .catch((error) => {
                console.log('Error fetching data:', error);
            })
            .finally(() => {
                setPreOpGet(false);
            });
    }
}, [IpNurseQueSelectedRow?.Booking_Id, PreOpGet]);  // Dependency array with IpNurseQueSelectedRow.Booking_Id




      
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

    const missingFields = requiredFields.filter(field => !selectedOption[field]);
    if (missingFields.length > 0) {
      alert(`Please fill empty fields: ${missingFields.join(", ")}`);
    } else {
      const Allsenddata = {
        ...selectedOption,
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
          PreOpGet(true);
         
         
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };



  return (
    <>
        {isPrintButtonVisible ? (
          <div className="Main_container_app">

            <div className="Supplier_Master_Container">
              <div className="common_center_tag">
              <h4
                style={{
                  color: "var(--labelcolor)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "start",
                  padding: "10px",
                }}
              >
                Ward Preoperative CheckList
              </h4>
              </div>

              <div className="OtMangementForm_1 djkwked675 dedwe">
                <label className="jewj33j">Date:</label>
                <input
                  type="date"
                  value={selectedOption.Date}
                  onChange={(e) =>
                    setSelectedOption((prevData) => ({
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
                  value={selectedOption.Time}
                  onChange={(e) =>
                    setSelectedOption((prevData) => ({
                      ...prevData,
                      Time: e.target.value,
                    }))
                  }
                />
              </div>
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
                                checked={selectedOption.JewelleryRemoved === "Yes"}
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
                                checked={selectedOption.JewelleryRemoved === "No"}
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
                                value={selectedOption.JewelleryRemovedRemarks}
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
                                checked={selectedOption.JewelleryTied === "Yes"}
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
                                checked={selectedOption.JewelleryTied === "No"}
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
                                value={selectedOption.JewelleryTiesRemarks}
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
              {renderSection("4. False tooth removed", "Falsetooth")}
              {renderSection(
                "5. Coloured nail polish removed(from atleast 2 fingers)",
                "ColouredNail"
              )}
              {renderSection(
                "6. Hair prepared covered Hairpins removed",
                "HairPrepared"
              )}
              {renderSection("7. Nasogastric tube passed", "NasogastricTube")}
              <div className="OtMangementForm_1 dedwe33">
                <div className="uedoiopp099">
                  <div className="yhdy67666 jejduw7">
                    <div>
                      <label>
                        <p>8.</p> Voided or catheterized <span>-</span>
                      </label>
                    </div>
                    <div className="mjd6sw">
                      <div className="juyuyy80">
                        <div className="kju ejkk">
                          <label>
                            <p>a.</p>
                            <label> Amount</label>
                            <span>:</span>
                          </label>
                        </div>

                        <div className="nnnmmcbb4">
                          <div className="OtMangementForm_1_checkbox jhwdhjw">
                            <label htmlFor="VoidedAmountYes">
                              <input
                                type="checkbox"
                                id="VoidedAmountYes"
                                name="VoidedAmount"
                                value="Yes"
                                checked={selectedOption.VoidedAmount === "Yes"}
                                onChange={() =>
                                  handleCheckboxChange("VoidedAmount", "Yes")
                                }
                              />
                              Yes
                            </label>
                            <label htmlFor="VoidedAmountNo">
                              <input
                                type="checkbox"
                                id="VoidedAmountNo"
                                name="VoidedAmount"
                                value="No"
                                checked={selectedOption.VoidedAmount === "No"}
                                onChange={() =>
                                  handleCheckboxChange("VoidedAmount", "No")
                                }
                              />
                              No
                            </label>
                            <div className="EWFERYU7KUILP7">
                              <label>
                                Remarks<span>:</span>
                              </label>
                              <textarea
                                value={selectedOption.VoidedAmountRemarks}
                                onChange={(e) =>
                                  handleTextareaChange(
                                    "VoidedAmountRemarks",
                                    e.target.value
                                  )
                                }
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="juyuyy80">
                        <div className="kju ejkk">
                          <label>
                            <p>b.</p>
                            <label> Time</label>
                            <span>:</span>
                          </label>
                        </div>

                        <div className="nnnmmcbb4">
                          <div className="OtMangementForm_1_checkbox jhwdhjw">
                            <label htmlFor="VoidedTimeYes">
                              <input
                                type="checkbox"
                                id="VoidedTimeYes"
                                name="VoidedTime"
                                value="Yes"
                                checked={selectedOption.VoidedTime === "Yes"}
                                onChange={() =>
                                  handleCheckboxChange("VoidedTime", "Yes")
                                }
                              />
                              Yes
                            </label>
                            <label htmlFor="VoidedTimeNo">
                              <input
                                type="checkbox"
                                id="VoidedTimeNo"
                                name="VoidedTime"
                                value="No"
                                checked={selectedOption.VoidedTime === "No"}
                                onChange={() =>
                                  handleCheckboxChange("VoidedTime", "No")
                                }
                              />
                              No
                            </label>
                            <div className="EWFERYU7KUILP7">
                              <label>
                                Remarks<span>:</span>
                              </label>
                              <textarea
                                value={selectedOption.VoidedTimeRemarks}
                                onChange={(e) =>
                                  handleTextareaChange(
                                    "VoidedTimeRemarks",
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
              {renderSection(
                "9. Vaginal douche / Bowel wash / Enema",
                "VaginalDouche"
              )}
              {renderSection(
                "10. Allergies",
                "Allergies"
              )}
              {renderSection("11. Bath taken/Given", "BathTaken")}
              {renderSection("12. BloodRequirement", "BloodRequirement")}
              {renderSection("13. Consent form signed & attached", "ConsentForm")}
              {renderSection("14. Morning T.P.R. charted", "MorningTPR")}
              {renderSection(
                "15. Morning Urine / Blood sample sent Report on chart",
                "MorningSample"
              )}
              {renderSection("16. X-ray films / CT Scan / MRI Films", "XRayFilms")}
              {renderSection(
                "17. Preanaesthetic medication Time",
                "PreanaestheticMedication"
              )}
              {renderSection(
                "18. Side rails applied after giving premedication",
                "SideRails"
              )}
              <div className="OtMangementForm_1 dedwe33">
                <div className="uedoiopp099">
                  <div className="yhdy67666 jejduw7">
                    <div>
                      <label>
                        <p>19.</p> Pulse & Resp. rate 30 kts. after premed{" "}
                        <span>-</span>
                      </label>
                    </div>
                    <div className="mjd6sw">
                      <div className="juyuyy80">
                        <div className="kju ejkk">
                          <label>
                            <p>a.</p>
                            <label> Pulse</label>
                            <span>:</span>
                          </label>
                        </div>

                        <div className="nnnmmcbb4">
                          <div className="OtMangementForm_1_checkbox jhwdhjw">
                            <label htmlFor="PulseRateYes">
                              <input
                                type="checkbox"
                                id="PulseRateYes"
                                name="PulseRate"
                                value="Yes"
                                checked={selectedOption.PulseRate === "Yes"}
                                onChange={() =>
                                  handleCheckboxChange("PulseRate", "Yes")
                                }
                              />
                              Yes
                            </label>
                            <label htmlFor="PulseRateNo">
                              <input
                                type="checkbox"
                                id="PulseRateNo"
                                name="VoidedAmount"
                                value="No"
                                checked={selectedOption.PulseRate === "No"}
                                onChange={() =>
                                  handleCheckboxChange("PulseRate", "No")
                                }
                              />
                              No
                            </label>
                            <div className="EWFERYU7KUILP7">
                              <label>
                                Remarks<span>:</span>
                              </label>
                              <textarea
                                value={selectedOption.PulseRateRemarks}
                                onChange={(e) =>
                                  handleTextareaChange(
                                    "PulseRateRemarks",
                                    e.target.value
                                  )
                                }
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="juyuyy80">
                        <div className="kju ejkk">
                          <label>
                            <p>b.</p>
                            <label> Resp.</label>
                            <span>:</span>
                          </label>
                        </div>

                        <div className="nnnmmcbb4">
                          <div className="OtMangementForm_1_checkbox jhwdhjw">
                            <label htmlFor="RespRateYes">
                              <input
                                type="checkbox"
                                id="RespRateYes"
                                name="RespRate"
                                value="Yes"
                                checked={selectedOption.RespRate === "Yes"}
                                onChange={() =>
                                  handleCheckboxChange("RespRate", "Yes")
                                }
                              />
                              Yes
                            </label>
                            <label htmlFor="RespRateNo">
                              <input
                                type="checkbox"
                                id="RespRateNo"
                                name="RespRate"
                                value="No"
                                checked={selectedOption.RespRate === "No"}
                                onChange={() =>
                                  handleCheckboxChange("RespRate", "No")
                                }
                              />
                              No
                            </label>
                            <div className="EWFERYU7KUILP7">
                              <label>
                                Remarks<span>:</span>
                              </label>
                              <textarea
                                value={selectedOption.RespRateRemarks}
                                onChange={(e) =>
                                  handleTextareaChange(
                                    "RespRateRemarks",
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
              {renderSection(
                "20. Identification wristlet applied",
                "IdentificationWristlet"
              )}
              <div className="OtMangementForm_1 djkwked675 dedwe ueuhuedj">
                <label className="jewj33j hjwqhyss">
                  <p>21.</p> Special drugs / supplies beging sent with patient
                  (specify)
                  <span>:</span>
                </label>
                <div className="OtMangementForm_1_checkbox">
                  <textarea
                    className="hfdtrft5"
                    value={selectedOption.SpecialDrug}
                    onChange={(e) =>
                      handleTextareaChange("SpecialDrug", e.target.value)
                    }
                  ></textarea>
                </div>
              </div>

              <div className="OtMangementForm_1 djkwked675 dedwe">
              <label className="jewj33j">Checked by(Duty Sister Name) - </label>
              <input
                type="text"
                style={{ border: "none", borderBottom: "2px solid var(--ProjectColor)", outline: "none" }}
                value={selectedOption.DutySisterName}
                onChange={(e) =>
                  setSelectedOption((prevData) => ({
                    ...prevData,
                    DutySisterName: e.target.value,
                  }))
                }
              />
            </div>
              {isPrintButtonVisible && (
                <div className="Main_container_Btn">
                  <button className="RegisterForm_1_btns" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              )}{" "}
            </div>
          </div>  
        ) : (
          <>
            <PrintContent
              ref={componentRef}
              style={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
              }}

              //   willReadFrequently={true}
            >
              <div className="Print_ot_all_div" id="reactprintcontent">
                <div className="new-patient-registration-form ">
                  <div>
                    <div className="paymt-fr-mnth-slp">
                      <div className="logo-pay-slp">
                        {/* <img src={clinicLogo} alt="" /> */}
                      </div>
                      <div>
                        <h2>
                          {clinicName} ({location})
                        </h2>
                      </div>
                    </div>

                    <h4
                      style={{
                        color: "var(--labelcolor)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "start",
                        padding: "10px",
                      }}
                    >
                      Nurse
                    </h4>
                  </div>

                  <div className="dctr_info_up_head Print_ot_all_div_second2">
                    <div className="RegisFormcon ">
                      <div className="dctr_info_up_head22">
                        {workbenchformData.PatientPhoto ? (
                          <img
                            src={workbenchformData.PatientPhoto}
                            alt="Patient Photo"
                          />
                        ) : (
                          <img src={bgImg2} alt="Default Patient Photo" />
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
                          {workbenchformData.firstName +
                            " " +
                            workbenchformData.lastName}{" "}
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
                </div>

                <div className="Supplier_Master_Container">
                  <div className="Print_ot_all_div_rfve">
                    <h4
                      style={{
                        color: "var(--labelcolor)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "start",
                        padding: "10px",
                      }}
                    >
                      Ward Preoperative CheckList
                    </h4>

                    <div className="OtMangementForm_1 djkwked675 dedwe">
                      <label className="jewj33j">Date:</label>
                      <input
                        type="date"
                        value={selectedOption.Date}
                        onChange={(e) =>
                          setSelectedOption((prevData) => ({
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
                        value={selectedOption.Time}
                        onChange={(e) =>
                          setSelectedOption((prevData) => ({
                            ...prevData,
                            Time: e.target.value,
                          }))
                        }
                      />
                    </div>
                    {renderSection("1. Operative area prepared", "OperativeArea")}
                    {renderSection(
                      "2. Operative area inspected",
                      "Operativeinspected"
                    )}

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
                                      checked={
                                        selectedOption.JewelleryRemoved === "Yes"
                                      }
                                      onChange={() =>
                                        handleCheckboxChange(
                                          "JewelleryRemoved",
                                          "Yes"
                                        )
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
                                      checked={
                                        selectedOption.JewelleryRemoved === "No"
                                      }
                                      onChange={() =>
                                        handleCheckboxChange(
                                          "JewelleryRemoved",
                                          "No"
                                        )
                                      }
                                    />
                                    No
                                  </label>
                                  <div className="EWFERYU7KUILP7">
                                    <label>
                                      Remarks<span>:</span>
                                    </label>
                                    <textarea
                                      value={
                                        selectedOption.JewelleryRemovedRemarks
                                      }
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
                                      checked={
                                        selectedOption.JewelleryTied === "Yes"
                                      }
                                      onChange={() =>
                                        handleCheckboxChange(
                                          "JewelleryTied",
                                          "Yes"
                                        )
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
                                      checked={
                                        selectedOption.JewelleryTied === "No"
                                      }
                                      onChange={() =>
                                        handleCheckboxChange(
                                          "JewelleryTied",
                                          "No"
                                        )
                                      }
                                    />
                                    No
                                  </label>
                                  <div className="EWFERYU7KUILP7">
                                    <label>
                                      Remarks<span>:</span>
                                    </label>
                                    <textarea
                                      value={selectedOption.JewelleryTiesRemarks}
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

                    {renderSection("4. False tooth removed", "Falsetooth")}
                    {renderSection(
                      "5. Coloured nail polish removed(from atleast 2 fingers)",
                      "ColouredNail"
                    )}
                    {renderSection(
                      "6. Hair prepared covered Hairpins removed",
                      "HairPrepared"
                    )}

                    {renderSection(
                      "7. Nasogastric tube passed",
                      "NasogastricTube"
                    )}

                    <div className="OtMangementForm_1 dedwe33">
                      <div className="uedoiopp099">
                        <div className="yhdy67666 jejduw7">
                          <div>
                            <label>
                              <p>8.</p> Voided or catheterized <span>-</span>
                            </label>
                          </div>
                          <div className="mjd6sw">
                            <div className="juyuyy80">
                              <div className="kju ejkk">
                                <label>
                                  <p>a.</p>
                                  <label> Amount</label>
                                  <span>:</span>
                                </label>
                              </div>

                              <div className="nnnmmcbb4">
                                <div className="OtMangementForm_1_checkbox jhwdhjw">
                                  <label htmlFor="VoidedAmountYes">
                                    <input
                                      type="checkbox"
                                      id="VoidedAmountYes"
                                      name="VoidedAmount"
                                      value="Yes"
                                      checked={
                                        selectedOption.VoidedAmount === "Yes"
                                      }
                                      onChange={() =>
                                        handleCheckboxChange(
                                          "VoidedAmount",
                                          "Yes"
                                        )
                                      }
                                    />
                                    Yes
                                  </label>
                                  <label htmlFor="VoidedAmountNo">
                                    <input
                                      type="checkbox"
                                      id="VoidedAmountNo"
                                      name="VoidedAmount"
                                      value="No"
                                      checked={
                                        selectedOption.VoidedAmount === "No"
                                      }
                                      onChange={() =>
                                        handleCheckboxChange("VoidedAmount", "No")
                                      }
                                    />
                                    No
                                  </label>
                                  <div className="EWFERYU7KUILP7">
                                    <label>
                                      Remarks<span>:</span>
                                    </label>
                                    <textarea
                                      value={selectedOption.VoidedAmountRemarks}
                                      onChange={(e) =>
                                        handleTextareaChange(
                                          "VoidedAmountRemarks",
                                          e.target.value
                                        )
                                      }
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="juyuyy80">
                              <div className="kju ejkk">
                                <label>
                                  <p>b.</p>
                                  <label> Time</label>
                                  <span>:</span>
                                </label>
                              </div>

                              <div className="nnnmmcbb4">
                                <div className="OtMangementForm_1_checkbox jhwdhjw">
                                  <label htmlFor="VoidedTimeYes">
                                    <input
                                      type="checkbox"
                                      id="VoidedTimeYes"
                                      name="VoidedTime"
                                      value="Yes"
                                      checked={
                                        selectedOption.VoidedTime === "Yes"
                                      }
                                      onChange={() =>
                                        handleCheckboxChange("VoidedTime", "Yes")
                                      }
                                    />
                                    Yes
                                  </label>
                                  <label htmlFor="VoidedTimeNo">
                                    <input
                                      type="checkbox"
                                      id="VoidedTimeNo"
                                      name="VoidedTime"
                                      value="No"
                                      checked={selectedOption.VoidedTime === "No"}
                                      onChange={() =>
                                        handleCheckboxChange("VoidedTime", "No")
                                      }
                                    />
                                    No
                                  </label>
                                  <div className="EWFERYU7KUILP7">
                                    <label>
                                      Remarks<span>:</span>
                                    </label>
                                    <textarea
                                      value={selectedOption.VoidedTimeRemarks}
                                      onChange={(e) =>
                                        handleTextareaChange(
                                          "VoidedTimeRemarks",
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

                    {renderSection(
                      "9. Vaginal douche / Bowel wash / Enema",
                      "VaginalDouche"
                    )}
                    {renderSection("10. Bath taken/Given", "BathTaken")}
                    {renderSection(
                      "11. Consent form signed & attached",
                      "ConsentForm"
                    )}
                    {renderSection("12. Morning T.P.R. charted", "MorningTPR")}
                    {renderSection(
                      "13. Morning Urine / Blood sample sent Report on chart",
                      "MorningSample"
                    )}
                    {renderSection(
                      "14. X-ray films / CT Scan / MRI Films",
                      "XRayFilms"
                    )}
                    {renderSection(
                      "15. Preanaesthetic medication Time",
                      "PreanaestheticMedication"
                    )}
                    {renderSection(
                      "16. Side rails applied after giving premedication",
                      "SideRails"
                    )}

                    <div className="OtMangementForm_1 dedwe33">
                      <div className="uedoiopp099">
                        <div className="yhdy67666 jejduw7">
                          <div>
                            <label>
                              <p>17.</p> Pulse & Resp. rate 30 kts. after premed{" "}
                              <span>-</span>
                            </label>
                          </div>
                          <div className="mjd6sw">
                            <div className="juyuyy80">
                              <div className="kju ejkk">
                                <label>
                                  <p>a.</p>
                                  <label> Pulse</label>
                                  <span>:</span>
                                </label>
                              </div>

                              <div className="nnnmmcbb4">
                                <div className="OtMangementForm_1_checkbox jhwdhjw">
                                  <label htmlFor="PulseRateYes">
                                    <input
                                      type="checkbox"
                                      id="PulseRateYes"
                                      name="PulseRate"
                                      value="Yes"
                                      checked={selectedOption.PulseRate === "Yes"}
                                      onChange={() =>
                                        handleCheckboxChange("PulseRate", "Yes")
                                      }
                                    />
                                    Yes
                                  </label>
                                  <label htmlFor="PulseRateNo">
                                    <input
                                      type="checkbox"
                                      id="PulseRateNo"
                                      name="VoidedAmount"
                                      value="No"
                                      checked={selectedOption.PulseRate === "No"}
                                      onChange={() =>
                                        handleCheckboxChange("PulseRate", "No")
                                      }
                                    />
                                    No
                                  </label>
                                  <div className="EWFERYU7KUILP7">
                                    <label>
                                      Remarks<span>:</span>
                                    </label>
                                    <textarea
                                      value={selectedOption.PulseRateRemarks}
                                      onChange={(e) =>
                                        handleTextareaChange(
                                          "PulseRateRemarks",
                                          e.target.value
                                        )
                                      }
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="juyuyy80">
                              <div className="kju ejkk">
                                <label>
                                  <p>b.</p>
                                  <label> Resp.</label>
                                  <span>:</span>
                                </label>
                              </div>

                              <div className="nnnmmcbb4">
                                <div className="OtMangementForm_1_checkbox jhwdhjw">
                                  <label htmlFor="RespRateYes">
                                    <input
                                      type="checkbox"
                                      id="RespRateYes"
                                      name="RespRate"
                                      value="Yes"
                                      checked={selectedOption.RespRate === "Yes"}
                                      onChange={() =>
                                        handleCheckboxChange("RespRate", "Yes")
                                      }
                                    />
                                    Yes
                                  </label>
                                  <label htmlFor="RespRateNo">
                                    <input
                                      type="checkbox"
                                      id="RespRateNo"
                                      name="RespRate"
                                      value="No"
                                      checked={selectedOption.RespRate === "No"}
                                      onChange={() =>
                                        handleCheckboxChange("RespRate", "No")
                                      }
                                    />
                                    No
                                  </label>
                                  <div className="EWFERYU7KUILP7">
                                    <label>
                                      Remarks<span>:</span>
                                    </label>
                                    <textarea
                                      value={selectedOption.RespRateRemarks}
                                      onChange={(e) =>
                                        handleTextareaChange(
                                          "RespRateRemarks",
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

                    {renderSection(
                      "18. Identification wristlet applied",
                      "IdentificationWristlet"
                    )}

                    <div className="OtMangementForm_1 djkwked675 dedwe ueuhuedj">
                      <label className="jewj33j hjwqhyss">
                        <p>19.</p> Special drugs / supplies beging sent with
                        patient (specify)
                        <span>:</span>
                      </label>
                      <div className="OtMangementForm_1_checkbox">
                        <textarea
                          className="hfdtrft5"
                          value={selectedOption.SpecialDrug}
                          onChange={(e) =>
                            handleTextareaChange("SpecialDrug", e.target.value)
                          }
                        ></textarea>
                      </div>
                    </div>
                    <div className="OtMangementForm_1 djkwked675 dedwe">
                      <label className="jewj33j">Checked by(Duty Sister Name) - </label>
                      <input
                        type="text"
                        style={{ border: "none", borderBottom: "2px solid var(--ProjectColor)", outline: "none" }}
                        value={selectedOption.DutySisterName}
                        onChange={(e) =>
                          setSelectedOption((prevData) => ({
                            ...prevData,
                            DutySisterName: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </PrintContent>
          </>
        )}
      

    </>
  );
};

export default PreOperativeChecklistForm2;
