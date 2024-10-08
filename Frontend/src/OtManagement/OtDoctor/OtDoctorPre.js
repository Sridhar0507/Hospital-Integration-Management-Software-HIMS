import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
// import jsPDF from "jspdf";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useDispatch, useSelector } from "react-redux";
import "../../OtManagement/OtManagement.css";
import rajeshkumar from "../../Assets/rajeshkumar.png";

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

function OtDoctorPre() {

  const formData = useSelector((state) => state.userRecord?.workbenchformData);
  console.log(formData);
     
  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const dispatchvalue = useDispatch();

  const [selection, setSelection] = useState("");
  const [selection2, setSelection2] = useState("");
  const [selection3, setSelection3] = useState("");
  const [selection4, setSelection4] = useState("");
  const [selection5, setSelection5] = useState("");
  const [selection6, setSelection6] = useState("");
  const [selection7, setSelection7] = useState("");
  const [selection8, setSelection8] = useState("");
  const [selection9, setSelection9] = useState("");
  const [selection10, setSelection10] = useState("");
  const [selection11, setSelection11] = useState("");

  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSelectionChange = (e) => {
    setSelection(e.target.value);
  };

  const handleSelectionChange2 = (e) => {
    setSelection2(e.target.value);
  };
  const handleSelectionChange3 = (e) => {
    setSelection3(e.target.value);
  };

  const handleSelectionChange4 = (e) => {
    setSelection4(e.target.value);
  };

  const handleSelectionChange5 = (e) => {
    setSelection5(e.target.value);
  };

  const handleSelectionChange6 = (e) => {
    setSelection6(e.target.value);
  };

  const handleSelectionChange7 = (e) => {
    setSelection7(e.target.value);
  };

  const handleSelectionChange8 = (e) => {
    setSelection8(e.target.value);
  };

  const handleSelectionChange9 = (e) => {
    setSelection9(e.target.value);
  };

  const handleSelectionChange10 = (e) => {
    setSelection10(e.target.value);
  };

  const handleSelectionChange11 = (e) => {
    setSelection11(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

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

  return (
    <>
      {isPrintButtonVisible ? (
        <div className="appointment">
          {/* <div className="h_head">
        <h4>OT Doctor</h4>
      </div> */}

          <br />
          <div className="OtMangement_con">
            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Patient UHID number & band Number identified & Matched{" "}
                <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection === "Yes"}
                    onChange={handleSelectionChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection === "No"}
                    onChange={handleSelectionChange}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection === "N.A."}
                    onChange={handleSelectionChange}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Allergies : Food/Drugs/Others <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection2 === "Yes"}
                    onChange={handleSelectionChange2}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection2 === "No"}
                    onChange={handleSelectionChange2}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection2 === "N.A."}
                    onChange={handleSelectionChange2}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Dentures / Partial Plate removed <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection3 === "Yes"}
                    onChange={handleSelectionChange3}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection3 === "No"}
                    onChange={handleSelectionChange3}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection3 === "N.A."}
                    onChange={handleSelectionChange3}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Vital Signs Recorded <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection4 === "Yes"}
                    onChange={handleSelectionChange4}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection4 === "No"}
                    onChange={handleSelectionChange4}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection4 === "N.A."}
                    onChange={handleSelectionChange4}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Pre-op medication given <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection5 === "Yes"}
                    onChange={handleSelectionChange5}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection5 === "No"}
                    onChange={handleSelectionChange5}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection5 === "N.A."}
                    onChange={handleSelectionChange5}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Nil by mounth <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection6 === "Yes"}
                    onChange={handleSelectionChange6}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection6 === "No"}
                    onChange={handleSelectionChange6}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection6 === "N.A."}
                    onChange={handleSelectionChange6}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Consent for Procedure /Surgery <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection7 === "Yes"}
                    onChange={handleSelectionChange7}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection7 === "No"}
                    onChange={handleSelectionChange7}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection7 === "N.A."}
                    onChange={handleSelectionChange7}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                High risk Consent <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection8 === "Yes"}
                    onChange={handleSelectionChange8}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection8 === "No"}
                    onChange={handleSelectionChange8}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection8 === "N.A."}
                    onChange={handleSelectionChange8}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Blood Requirement : Product arranged / Reserved Number of Units{" "}
                <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection9 === "Yes"}
                    onChange={handleSelectionChange9}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection9 === "No"}
                    onChange={handleSelectionChange9}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection9 === "N.A."}
                    onChange={handleSelectionChange9}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Pre Anaesthetic Assessment done <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection10 === "Yes"}
                    onChange={handleSelectionChange10}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection10 === "No"}
                    onChange={handleSelectionChange10}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection10 === "N.A."}
                    onChange={handleSelectionChange10}
                  />
                  N.A.
                </label>
              </div>
            </div>
            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Operation Type <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Minor"
                    checked={selection11 === "Minor"}
                    onChange={handleSelectionChange11}
                  />
                  <span>Minor</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Major"
                    checked={selection11 === "Major"}
                    onChange={handleSelectionChange11}
                  />
                  <span>Major</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Supramajor"
                    checked={selection11 === "Supramajor"}
                    onChange={handleSelectionChange11}
                  />
                  <span> Supramajor</span>
                </label>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="cenetrOt_singn_date_tym">
            <div className="OtMangementForm_1 cenetrOt_singn_date_tym_2">
              <label>
                Marking of site <span>:</span>
              </label>

              <div className="nurse_sign_capte45 clm_chse_dte_tym_0">
                <img
                  id="SurgeonSign"
                  src={rajeshkumar}
                  // src={preNurseInputs.SurgeonSign}
                  alt="SurgeonSign"
                />

                <input
                  className="date_stle_OT"
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                />

                <input
                  className="date_stle_OT"
                  type="time"
                  value={time}
                  onChange={handleTimeChange}
                />
              </div>
            </div>

            <div className="OtMangementForm_1 cenetrOt_singn_date_tym_2">
              <label>
                Confirm by Surgeon <span>:</span>
              </label>

              <div className="nurse_sign_capte45 clm_chse_dte_tym_0">
                <img
                  id="SurgeonSign"
                  src={rajeshkumar}
                  // src={preNurseInputs.SurgeonSign}
                  alt="SurgeonSign"
                />

                <input
                  className="date_stle_OT"
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                />

                <input
                  className="date_stle_OT"
                  type="time"
                  value={time}
                  onChange={handleTimeChange}
                />
              </div>
            </div>
          </div>
          <br />
          {isPrintButtonVisible && (
            <div className="Register_btn_con">
              <button className="RegisterForm_1_btns" onClick={Submitalldata}>
                Print
              </button>
            </div>
          )}
          <br />
        </div>

      ) : (


        <PrintContent
          ref={componentRef}
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
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
                  Doctor
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

            <div className="appointment">
              <br />

              <div className="Print_ot_all_div_pre ">


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
                  Doctor Pre - Operative Checklist
                </h4>
                <br />
                <br />


                <div className="OtMangement_con DCER43">
                <div className="OtMangementForm_1 label_extra_width">
              <label>
                Patient UHID number & band Number identified & Matched{" "}
                <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection === "Yes"}
                    onChange={handleSelectionChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection === "No"}
                    onChange={handleSelectionChange}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection === "N.A."}
                    onChange={handleSelectionChange}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Allergies : Food/Drugs/Others <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection2 === "Yes"}
                    onChange={handleSelectionChange2}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection2 === "No"}
                    onChange={handleSelectionChange2}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection2 === "N.A."}
                    onChange={handleSelectionChange2}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Dentures / Partial Plate removed <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection3 === "Yes"}
                    onChange={handleSelectionChange3}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection3 === "No"}
                    onChange={handleSelectionChange3}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection3 === "N.A."}
                    onChange={handleSelectionChange3}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Vital Signs Recorded <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection4 === "Yes"}
                    onChange={handleSelectionChange4}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection4 === "No"}
                    onChange={handleSelectionChange4}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection4 === "N.A."}
                    onChange={handleSelectionChange4}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Pre-op medication given <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection5 === "Yes"}
                    onChange={handleSelectionChange5}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection5 === "No"}
                    onChange={handleSelectionChange5}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection5 === "N.A."}
                    onChange={handleSelectionChange5}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Nil by mounth <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection6 === "Yes"}
                    onChange={handleSelectionChange6}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection6 === "No"}
                    onChange={handleSelectionChange6}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection6 === "N.A."}
                    onChange={handleSelectionChange6}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Consent for Procedure /Surgery <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection7 === "Yes"}
                    onChange={handleSelectionChange7}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection7 === "No"}
                    onChange={handleSelectionChange7}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection7 === "N.A."}
                    onChange={handleSelectionChange7}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                High risk Consent <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection8 === "Yes"}
                    onChange={handleSelectionChange8}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection8 === "No"}
                    onChange={handleSelectionChange8}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection8 === "N.A."}
                    onChange={handleSelectionChange8}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Blood Requirement : Product arranged / Reserved Number of Units{" "}
                <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection9 === "Yes"}
                    onChange={handleSelectionChange9}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection9 === "No"}
                    onChange={handleSelectionChange9}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection9 === "N.A."}
                    onChange={handleSelectionChange9}
                  />
                  N.A.
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Pre Anaesthetic Assessment done <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Yes"
                    checked={selection10 === "Yes"}
                    onChange={handleSelectionChange10}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="No"
                    checked={selection10 === "No"}
                    onChange={handleSelectionChange10}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="N.A."
                    checked={selection10 === "N.A."}
                    onChange={handleSelectionChange10}
                  />
                  N.A.
                </label>
              </div>
            </div>
            <div className="OtMangementForm_1 label_extra_width">
              <label>
                Operation Type <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="Minor"
                    checked={selection11 === "Minor"}
                    onChange={handleSelectionChange11}
                  />
                  <span>Minor</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Major"
                    checked={selection11 === "Major"}
                    onChange={handleSelectionChange11}
                  />
                  <span>Major</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Supramajor"
                    checked={selection11 === "Supramajor"}
                    onChange={handleSelectionChange11}
                  />
                  <span> Supramajor</span>
                </label>
              </div>
            </div>


                </div>
              </div>
              <br />
              <br />
              <br />

              <div className="cenetrOt_singn_date_tym">
                <div className="OtMangementForm_1 cenetrOt_singn_date_tym_2">
                  <label>
                    Marking of site <span>:</span>
                  </label>

                  <div className="nurse_sign_capte45 clm_chse_dte_tym_0">
                    <img
                      id="SurgeonSign"
                      src={rajeshkumar}
                      // src={preNurseInputs.SurgeonSign}
                      alt="SurgeonSign"
                    />

                    <input
                      className="date_stle_OT"
                      type="date"
                      value={date}
                      onChange={handleDateChange}
                    />

                    <input
                      className="date_stle_OT"
                      type="time"
                      value={time}
                      onChange={handleTimeChange}
                    />
                  </div>
                </div>
                <br />

                <div className="OtMangementForm_1 cenetrOt_singn_date_tym_2">
                  <label>
                    Confirm by Surgeon <span>:</span>
                  </label>

                  <div className="nurse_sign_capte45 clm_chse_dte_tym_0">
                    <img
                      id="SurgeonSign"
                      src={rajeshkumar}
                      // src={preNurseInputs.SurgeonSign}
                      alt="SurgeonSign"
                    />

                    <input
                      className="date_stle_OT"
                      type="date"
                      value={date}
                      onChange={handleDateChange}
                    />

                    <input
                      className="date_stle_OT"
                      type="time"
                      value={time}
                      onChange={handleTimeChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PrintContent>
      )}
    </>
  );
}

export default OtDoctorPre;




