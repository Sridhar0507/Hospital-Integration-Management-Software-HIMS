import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
// import bgImg2 from '../assets/bgImg2.jpg';
import bgImg2 from '../../assets/bgImg2.jpg';
import './IpPreoperativeIns.css'
import './OtManagement.css'
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
// import DatePicker from "react-datepicker";

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

const OtManagementForm = () => {
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const IpNurseQueSelectedRow = useSelector((state) => state.InPatients?.IpNurseQueSelectedRow);
  console.log(IpNurseQueSelectedRow,'IpNurseQueSelectedRowsssssssss')

  const dispatchvalue = useDispatch();


  const initialSelectedOption = {
    Date: "",
    Time: "",
    NbmStatus: "",
    NbmStatusRemarks: "",
    PulseBp: "",
    PulseBpRemarks: "",
    PreoperativeInj: "",
    PreoperativeInjRemarks: "",
    CheckVeinflowIv: "",
    CheckVeinflowIvRemarks: "",
    InvestigationReport: "",
    InvestigationReportCheckbox: "",
    InvestigationReportRemarks: "",
    PatientConsent: "",
    PatientConsentRemarks: "",
    JewellryConsentActualStatus: "",
    JewellryConsentActualStatusRemarks: "",
    DentureRemoval: "",
    DentureRemovalRemarks: "",
    NailPaint: "",
    NailPaintRemarks: "",
    SugarLevel: "",
    SugarLevelRemarks: "",
    PatientAllergy: "",
    PatientAllergyRemarks: "",
    PatientShave: "",
    PatientShaveRemarks: "",
    PatientCatheter: "",
    PatientCatheterRemarks: "",
    BpTablet: "",
    BpTabletRemarks: "",
    SurgicalSide: "",
    SurgicalSideRemarks: "",
    XrayCt: "",
    XrayCtRemarks: "",
    TabMisoprost: "",
    TabMisoprostRemarks: "",
    Hrct: "",
    HrctRemarks: "",
    DutySisterName: "",
    OtTechName: "",
  };

  const [checkbox, setCheckbox] = useState({
    Xray: false,
    Ct: false,
    Mri: false,
    Usg: false,
    Lab: false,
    Hrct: false,
    Other: false,
  });

  const [getdatastate, setgetdatastate] = useState(false);

  console.log(checkbox, 'checkoxxxxxxxx')

  const handleCheckboxGroupChange = (name) => {
    setCheckbox((prevData) => ({
      ...prevData,
      [name]: !prevData[name],
    }));
  };

  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);
  const componentRef = useRef();

  const handleCheckboxChange = (name, value) => {
    setSelectedOption((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextareaChange = (name, value) => {
    setSelectedOption((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  useEffect(() => {
    if (IpNurseQueSelectedRow?.Booking_Id) {
      axios
        .get(
          `http://127.0.0.1:8000/IcuManagement/get_PreoperativeChecklist?Booking_Id=${IpNurseQueSelectedRow?.Booking_Id}`
        )
        .then((response) => {
          const data = response.data[0]
          console.log("Fetched surgical history data:", data);
  
          // Ensure that each field has a defined value
          const updatedFormData = {
            Date: data.Date || "", // Ensure each field has a defined value
            Time: data.Time || "",
            NbmStatus: data.NbmStatus || "",
            NbmStatusRemarks: data.NbmStatusRemarks || "",
            PulseBp: data.PulseBp || "",
            PulseBpRemarks: data.PulseBpRemarks || "",
            PreoperativeInj: data.PreoperativeInj || "",
            PreoperativeInjRemarks: data.PreoperativeInjRemarks || "",
            CheckVeinflowIv: data.CheckVeinflowIv || "",
            CheckVeinflowIvRemarks: data.CheckVeinflowIvRemarks || "",
            InvestigationReport: data.InvestigationReport || "",
            InvestigationReportCheckbox: data.InvestigationReportCheckbox || "",
            InvestigationReportRemarks: data.InvestigationReportRemarks || "",
            PatientConsent: data.PatientConsent || "",
            PatientConsentRemarks: data.PatientConsentRemarks || "",
            JewellryConsentActualStatus: data.JewellryConsentActualStatus || "",
            JewellryConsentActualStatusRemarks: data.JewellryConsentActualStatusRemarks || "",
            DentureRemoval: data.DentureRemoval || "",
            DentureRemovalRemarks: data.DentureRemovalRemarks || "",
            NailPaint: data.NailPaint || "",
            NailPaintRemarks: data.NailPaintRemarks || "",
            SugarLevel: data.SugarLevel || "",
            SugarLevelRemarks: data.SugarLevelRemarks || "",
            PatientAllergy: data.PatientAllergy || "",
            PatientAllergyRemarks: data.PatientAllergyRemarks || "",
            PatientShave: data.PatientShave || "",
            PatientShaveRemarks: data.PatientShaveRemarks || "",
            PatientCatheter: data.PatientCatheter || "",
            PatientCatheterRemarks: data.PatientCatheterRemarks || "",
            BpTablet: data.BpTablet || "",
            BpTabletRemarks: data.BpTabletRemarks || "",
            SurgicalSide: data.SurgicalSide || "",
            SurgicalSideRemarks: data.SurgicalSideRemarks || "",
            XrayCt: data.XrayCt || "",
            XrayCtRemarks: data.XrayCtRemarks || "",
            TabMisoprost: data.TabMisoprost || "",
            TabMisoprostRemarks: data.TabMisoprostRemarks || "",
            Hrct: data.Hrct || "",
            HrctRemarks: data.HrctRemarks || "",
            DutySisterName: data.DutySisterName || "",
            OtTechName: data.OtTechName || "",
          };
  
          // Update the form data fields based on the fetched data
          setSelectedOption(updatedFormData);

          const parsedCheckboxData = data.InvestigationReportCheckbox.split(",").reduce((acc, cur) => {
            acc[cur] = true;
            return acc;
          }, {});
          setCheckbox(parsedCheckboxData);

          // const parsedCheckboxData = JSON.parse(data.InvestigationReportCheckbox || "{}");
          // setCheckbox(parsedCheckboxData);

          console.log(updatedFormData,'updatedFormDataaaaaaaaaaaaa')
          // setCheckbox(JSON.parse(data.InvestigationReportCheckbox || "{}"));
        })
        .catch((error) => {
          console.error("Error fetching surgical history:", error);
        });
    }
  }, [IpNurseQueSelectedRow, IpNurseQueSelectedRow?.Booking_Id, getdatastate]);
  



  const renderSection = (label, name) => (
    <div className="OtMangementForm_1 djkwked675 dedwe OtMangementForm_1">
      <label className="jewj33j">{label}</label>
      <div className="OtMangementForm_1_checkbox">
        <label htmlFor={`${name}Yes`}>
          <input
            type="checkbox"
            id={`${name}Yes`}
            name={name}
            value='Yes'
            checked={selectedOption[name] === 'Yes'}
            onChange={() => handleCheckboxChange(name, selectedOption[name] === 'Yes' ? '' : 'Yes')}
          />
        </label>
        <div className="EWFERYU7KUILP7">
          <label>Remarks<span>:</span></label>
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


  const renderCheckboxGroup = (...checkboxes) => (
    <div className="OtMangementForm_1 djkwked675 dedwe">
      <div className="OtMangementForm_1_checkbox">
        {checkboxes.map(([label, key]) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={checkbox[key]}
              onChange={() => handleCheckboxGroupChange(key)}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
  

  // const renderCheckboxGroup = () => (
  //   <div className="OtMangementForm_1 djkwked675 dedwe">
  //     <label className="jewj33j"></label>
  //     <div className="OtMangementForm_1_checkbox">
  //       {Object.keys(checkbox).map((key) => (
  //         <label key={key}>
  //           <input
  //             type="checkbox"
  //             checked={checkbox[key]}
  //             onChange={() => handleCheckboxGroupChange(key)}
  //           />
  //           {key}
  //         </label>
  //       ))}
  //     </div>
  //   </div>
  // );



  const renderCheckboxSection = (label) => (
    <div className="OtMangementForm_1 djkwked675 dedwe">
      <label className="jewj33j">{label}</label>
      <div className="OtMangementForm_1_checkbox">
        {Object.keys(checkbox).map((key) => (
          <label key={key} htmlFor={key}>
            <input
              type="checkbox"
              id={key}
              name={key}
              checked={checkbox[key]}
              onChange={() => handleCheckboxGroupChange(key)}
            />
            {key}
          </label>
        ))}
      </div>
    </div>
  );

  const handlePrint2 = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: async () => {
      // Additional action after printing, if needed
    },
  });

  const Submitalldata = () => {
    setIsPrintButtonVisible(false);
    setTimeout(() => {
     
      handleSubmit();
      
      setIsPrintButtonVisible(true); // Resetting print button visibility
    }, 500); // Adjust delay as needed
  };



  const [clinicName, setClinicName] = useState("");
  const [clinicLogo, setClinicLogo] = useState(null);
  const [location, setlocation] = useState("");

  const handleSubmit = () => {
    
    const postData = {
      ...selectedOption,
      // ...checkbox,
      // InvestigationReportCheckbox: JSON.stringify(checkbox),
      InvestigationReportCheckbox:Object.keys(checkbox).filter(p => checkbox[p]).join(','),
      Patient_Name: IpNurseQueSelectedRow.PatientName,
      Booking_Id: IpNurseQueSelectedRow.Booking_Id,
      Location: userRecord?.location,
      CapturedBy: userRecord?.username,
      Date: format(new Date(),'yyyy-MM-dd'), // Include date
      Time: format(new Date(),'HH:mm:ss'), // Include time
    };
    axios.post(`http://127.0.0.1:8000/IcuManagement/insert_OT_PreOperative_Checklist`, postData)
      .then((response) => {
        console.log(response);
        setSelectedOption(initialSelectedOption); // Reset to initial state()
        setgetdatastate();
      })
      .catch((error) => {
        console.log(error);
      });
  };



  useEffect(() => {
    const location = userRecord?.location;

    axios
      .get("your_api_endpoint")
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          const data = response.data;
          setClinicName(data.Clinic_Name);
          setClinicLogo(`data:image/png;base64,${data.Clinic_Logo}`);
          setlocation(data.location);
        } else {
          // Handle error if needed
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [userRecord]);
  //

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
  
  // const [dateTime, setDateTime] = useState({
  //   date: new Date().toLocaleDateString(),
  //   time: new Date().toLocaleTimeString()
  // });

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setDateTime({
  //       date: new Date().toLocaleDateString(),
  //       time: new Date().toLocaleTimeString()
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <>
      {isPrintButtonVisible ? (
        <div className="Supplier_Master_Container">
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
            OT - PreOperative checklist
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

          {renderSection("1. NBM Status", "NbmStatus")}
          {renderSection("2. Pulse/BP", "PulseBp")}
          {renderSection("3. Preoperative inj. given or not as per Surgeon order", "PreoperativeInj")}

          {renderSection("4.Check vein flow, Check IV Order", "CheckVeinflowIv")}
          {renderSection("5. Check Investigation Report HRCT -(Normal/Abnormal)", "InvestigationReport")}
          {renderCheckboxGroup(["Xray","Xray" ], ["CT","Ct"],["MRi","Mri"],["USG","Usg"],["LAB","Lab"],["HRCT","Hrct"],["Other","Other"])} {/* Include the checkbox group here */}
          
          {renderSection("6. Patient Consent with Patient & Relative Sign", "PatientConsent")}
          {renderSection("7. Check Jewellery Consent & Actual Status", "JewellryConsentActualStatus")}

          {renderSection("8. Check Patient Denture Removal", "DentureRemoval")}
          {renderSection("9. Check Nail Paint", "NailPaint")}
          {renderSection("10. If DM Patient status of Sugar Level & Insulin Status(last Sugar Level)", "SugarLevel")}
          {renderSection("11. Patient Allergy or not", "PatientAllergy")}
          {renderSection("12. Patient Shave PP Operative Part Prepare & Enema Status", "PatientShave")}
          {renderSection("13. Check Patient Catheter", "PatientCatheter"
          )}
          {renderSection("14. BP Tablet Given Or Not", "BpTablet")}
          {renderSection("15. Check Surgical Side Of Patient Check Preparation Of That Part", "SurgicalSide")}
          {renderSection("16. Display X-ray, CT on X-ray view Box ", "XrayCt")}
          {renderSection("17. Tab Misoprost (200mg) 6 Tab(gynac Patient)", "TabMisoprost")}
          {renderSection("18. If HRCT Abnormal ( then Call To Mr.AG Phadke Sir)", "Hrct")}

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
          <div className="OtMangementForm_1 djkwked675 dedwe">
            <label className="jewj33j">Confirmed by(OT Tech Name) - </label>
            <input
              type="text"
              style={{ border: "none", borderBottom: "2px solid var(--ProjectColor)", outline: "none" }}
              value={selectedOption.OtTechName}
              onChange={(e) =>
                setSelectedOption((prevData) => ({
                  ...prevData,
                  OtTechName: e.target.value,
                }))
              }
            />
          </div>

          {isPrintButtonVisible && (
            <div className="Register_btn_con">
              <button className="RegisterForm_1_btns" onClick={Submitalldata}>
                Save
              </button>
              <button className="RegisterForm_1_btns" onClick={SubmitallPrintdata}>
                Print
              </button>
            </div>
          )}{" "}
          
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
                      <img src={clinicLogo} alt="" />
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
                  OT - PreOperative checklist
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
                <div className="OtMangementForm_1">
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

                {renderSection("1. NBM Status", "NbmStatus")}
                {renderSection("2. Pulse/BP", "PulseBp")}
                {renderSection("3. Preoperative inj. given or not as per Surgeon order", "PreoperativeInj")}

                {renderSection("4.Check vein flow, Check IV Order", "CheckVeinflowIv")}
                {renderSection("5. Check Investigation Report HRCT -(Normal/Abnormal)", "InvestigationReport")}
                {renderCheckboxGroup(["Xray","Xray" ], ["CT","Ct"],["MRi","Mri"],["USG","Usg"],["LAB","Lab"],["HRCT","Hrct"],["Other","Other"])} {/* Include the checkbox group here */}
                
                {renderSection("6. Patient Consent with Patient & Relative Sign", "PatientConsent")}
                {renderSection("7. Check Jewellery Consent & Actual Status", "JewellryConsentActualStatus")}

                {renderSection("8. Check Patient Denture Removal", "DentureRemoval")}
                {renderSection("9. Check Nail Paint", "NailPaint")}
                {renderSection("10. If DM Patient status of Sugar Level & Insulin Status(last Sugar Level)", "SugarLevel")}
                {renderSection("11. Patient Allergy or not", "PatientAllergy")}
                {renderSection("12. Patient Shave PP Operative Part Prepare & Enema Status", "PatientShave")}
                {renderSection("13. Check Patient Catheter", "PatientCatheter"
                )}
                {renderSection("14. BP Tablet Given Or Not", "BpTablet")}
                {renderSection("15. Check Surgical Side Of Patient Check Preparation Of That Part", "SurgicalSide")}
                {renderSection("16. Display X-ray, CT on X-ray view Box ", "XrayCt")}
                {renderSection("17. Tab Misoprost (200mg) 6 Tab(gynac Patient)", "TabMisoprost")}
                {renderSection("18. If HRCT Abnormal ( then Call To Mr.AG Phadke Sir)", "Hrct")}


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
                <div className="OtMangementForm_1 djkwked675 dedwe">
                  <label className="jewj33j">Confirmed by(OT Tech Name) - </label>
                  <input
                    type="text"
                    style={{ border: "none", borderBottom: "2px solid var(--ProjectColor)", outline: "none" }}
                    value={selectedOption.OtTechName}
                    onChange={(e) =>
                      setSelectedOption((prevData) => ({
                        ...prevData,
                        OtTechName: e.target.value,
                      }))
                    }
                  />
                </div>

                {isPrintButtonVisible && (
                  <div className="Register_btn_con">
                    <button className="RegisterForm_1_btns" onClick={Submitalldata}>
                      Save
                    </button>
                    <button className="RegisterForm_1_btns" onClick={SubmitallPrintdata}>
                      Print
                    </button>
                  </div>
                )}{" "}
              </div>
            </div>
          </PrintContent>
        </>
      )}
    </>
  );
};

export default OtManagementForm;
