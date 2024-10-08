import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useDispatch, useSelector } from "react-redux";
import SignatureCanvas from "react-signature-canvas";

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

function OtAnaesthesiaPost() {
  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const dispatchvalue = useDispatch();

  const [postAnasthesiaInputs, setPostAnasthesiaInputs] = useState({
    levelofConsciousness: "",
    reflexes: "",
    headLift: "",
    PR: "",
    BP: "",
    RR: "",
    spo2: "",
    patientTransferred: "",
    adverseEvents: "",
    nameFulledBy: "",
    Date: "",
    time: "",
  });

  const [pdfBlob, setPdfBlob] = useState(null);

  const [signatureData, setSignatureData] = useState(null);

  const signatureRef = useRef(null);

  const signatureDataRef = useRef(null);

  const clearSignature = () => {
    signatureRef.current.clear();
    setSignatureData(null); // Clear signature data
  };

  const saveSignature = () => {
    const dataUrl = signatureRef.current.getTrimmedCanvas().toDataURL();
    setSignatureData(dataUrl); // Save signature data
    console.log("Signature saved");
  };

  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);
  // Rest of your state and logic...

  const componentRef = useRef();

  const generatePdf = () => {
    const pdf = new jsPDF();
    // pdf.text(`${clinicName} (${location})`, 10, 10);
    // pdf.addImage(clinicLogo, "PNG", 10, 20, 50, 50);

    // Add form content
    const content = componentRef.current;
    if (content) {
      pdf.fromHTML(content, 15, 80);
    }

    // Add signature if available
    if (signatureData) {
      const imgData = signatureData;
      pdf.addImage(imgData, "PNG", 15, 250, 180, 90);
    }

    // Save the PDF
    const pdfBlob = pdf.output("blob");
    setPdfBlob(pdfBlob);

    // Display the PDF
    const fileURL = URL.createObjectURL(pdfBlob);
    window.open(fileURL, "_blank");
  };

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

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // For checkboxes, update the state based on whether the checkbox is checked or not
    const newValue = type === "checkbox" ? (checked ? value : "") : value;

    setPostAnasthesiaInputs({
      ...postAnasthesiaInputs,
      [name]: newValue,
    });
  };
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
        <div className="appointment ">
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
            Recovery (Immediate Post - op / Procedure)
          </h4>
          <br />
          <div className="RegisFormcon">
            <div className="RegisForm_1 euiwd6745q3">
              <label htmlFor="levelofConsciousness">
                Level of Consciousness<span>:</span>
              </label>

              <textarea
                id="levelofConsciousness"
                name="levelofConsciousness"
                value={postAnasthesiaInputs.levelofConsciousness}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <br />

          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="reflexes">
                Reflexes <span>:</span>
              </label>
              <input
                type="text"
                id="reflexes"
                name="reflexes"
                value={postAnasthesiaInputs.reflexes}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="headLift">
                Head Lift <span>:</span>
              </label>
              <input
                type="text"
                id="headLift"
                name="headLift"
                value={postAnasthesiaInputs.headLift}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="PR">
                P.R. <span>:</span>
              </label>
              <input
                type="text"
                id="PR"
                name="PR"
                value={postAnasthesiaInputs.PR}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="BP">
                B.P. <span>:</span>
              </label>
              <input
                type="text"
                id="BP"
                name="BP"
                value={postAnasthesiaInputs.BP}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="RR">
                R.R. <span>:</span>
              </label>
              <input
                type="text"
                id="RR"
                name="RR"
                value={postAnasthesiaInputs.RR}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="spo2">
                SPO2 <span>:</span>
              </label>
              <input
                type="text"
                id="spo2"
                name="spo2"
                value={postAnasthesiaInputs.spo2}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="name">
                Patient Transferred to<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="patientTransferredYes">
                    <input
                      type="radio"
                      id="patientTransferredYes"
                      name="patientTransferred"
                      value="Recovery"
                      className="radio_Nurse_ot2_input"
                      checked={
                        postAnasthesiaInputs.patientTransferred === "Recovery"
                      }
                      onChange={handleInputChange}
                    />
                    Recovery
                  </label>
                </div>
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="patientTransferredNo">
                    <input
                      type="radio"
                      id="patientTransferredNo"
                      name="patientTransferred"
                      value="ICU"
                      className="radio_Nurse_ot2_input"
                      checked={
                        postAnasthesiaInputs.patientTransferred === "ICU"
                      }
                      onChange={handleInputChange}
                    />
                    ICU
                  </label>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="RegisFormcon wsdsceewww2">
            <div className="RegisForm_1 ">
              <label>
                Adverse Events<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head dsewwsdw3qqqs234">
                <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqwsssssxxxcc xcvcxc">
                  <label htmlFor="Hypoxemia">
                    <input
                      type="checkbox"
                      id="Hypoxemia"
                      name="adverseEvents"
                      value="Hypoxemia"
                      className="radio_Nurse_ot2_input"
                      checked={
                        postAnasthesiaInputs.adverseEvents === "Hypoxemia"
                      }
                      onChange={handleInputChange}
                    />
                    Hypoxemia
                  </label>
                </div>
                <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqwsssssxxxcc xcvcxc">
                  <label htmlFor="Arrhythmia">
                    <input
                      type="checkbox"
                      id="Arrhythmia"
                      name="adverseEvents"
                      value="Arrhythmia"
                      className="radio_Nurse_ot2_input"
                      checked={
                        postAnasthesiaInputs.adverseEvents === "Arrhythmia"
                      }
                      onChange={handleInputChange}
                    />
                    Arrhythmia
                  </label>
                </div>
                <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqwsssssxxxcc xcvcxc">
                  <label htmlFor="UnanticipatedAirway">
                    <input
                      type="checkbox"
                      id="UnanticipatedAirway"
                      name="adverseEvents"
                      value="UnanticipatedAirway"
                      className="radio_Nurse_ot2_input"
                      checked={
                        postAnasthesiaInputs.adverseEvents ===
                        "UnanticipatedAirway"
                      }
                      onChange={handleInputChange}
                    />
                    Unanticipated difficult Airway
                  </label>
                </div>
                <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqwsssssxxxcc xcvcxc">
                  <label htmlFor="dentalInjury">
                    <input
                      type="checkbox"
                      id="dentalInjury"
                      name="adverseEvents"
                      value="dentalInjury"
                      className="radio_Nurse_ot2_input"
                      checked={
                        postAnasthesiaInputs.adverseEvents === "dentalInjury"
                      }
                      onChange={handleInputChange}
                    />
                    Dental Injury
                  </label>
                </div>
                <div className="radio_Nurse_ot2 xcvcxc">
                  <label htmlFor="Nil">
                    <input
                      type="checkbox"
                      id="Nil"
                      name="adverseEvents"
                      value="Nil"
                      className="radio_Nurse_ot2_input"
                      checked={postAnasthesiaInputs.adverseEvents === "Nil"}
                      onChange={handleInputChange}
                    />
                    Nil
                  </label>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="ewdfhyewuf65444">
            <div className="OtMangementForm_1 ">
              <label>
                Name<span>:</span>
              </label>
              <input
                type="text"
                id="nameFulledBy"
                name="nameFulledBy"
                value={postAnasthesiaInputs.nameFulledBy}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="OtMangementForm_1 ">
              <label>
                Date<span>:</span>
              </label>
              <input
                type="text"
                id="Date"
                name="Date"
                value={postAnasthesiaInputs.Date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="OtMangementForm_1 ">
              <label>
                Time<span>:</span>
              </label>
              <input
                type="text"
                id="time"
                name="time"
                value={postAnasthesiaInputs.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <br />
          <div className=" sigCanvas2_head11">
            <div className="RegisForm_1_consent_consent sigCanvas2_head">
              <div>
                <SignatureCanvas
                  ref={signatureRef}
                  penColor="black"
                  canvasProps={{
                    width: 200,
                    height: 100,
                    className: "sigCanvas2",
                  }}
                />
              </div>
              <h5> Signature</h5>

              <div className="Register_btn_con">
                <button
                  className="RegisterForm_1_btns"
                  onClick={clearSignature}
                >
                  Clear
                </button>
                <button className="RegisterForm_1_btns" onClick={saveSignature}>
                  Save
                </button>
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
                  Anaesthesia
                </h4>
              </div>

              <div className="dctr_info_up_head Print_ot_all_div_second">
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

            <div className="appointment ">
              <br />
              <div className="Print_ot_all_div_Third">
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
                  Recovery (Immediate Post - op / Procedure)
                </h4>
                <br />
                <div className="RegisFormcon">
                  <div className="RegisForm_1 euiwd6745q3">
                    <label htmlFor="levelofConsciousness">
                      Level of Consciousness<span>:</span>
                    </label>

                    <textarea
                      id="levelofConsciousness"
                      name="levelofConsciousness"
                      value={postAnasthesiaInputs.levelofConsciousness}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <br />
                <div className="RegisFormcon">
                  <div className="RegisForm_1">
                    <label htmlFor="reflexes">
                      Reflexes <span>:</span>
                    </label>
                    <input
                      type="text"
                      id="reflexes"
                      name="reflexes"
                      value={postAnasthesiaInputs.reflexes}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="headLift">
                      Head Lift <span>:</span>
                    </label>
                    <input
                      type="text"
                      id="headLift"
                      name="headLift"
                      value={postAnasthesiaInputs.headLift}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="PR">
                      P.R. <span>:</span>
                    </label>
                    <input
                      type="text"
                      id="PR"
                      name="PR"
                      value={postAnasthesiaInputs.PR}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="BP">
                      B.P. <span>:</span>
                    </label>
                    <input
                      type="text"
                      id="BP"
                      name="BP"
                      value={postAnasthesiaInputs.BP}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="RR">
                      R.R. <span>:</span>
                    </label>
                    <input
                      type="text"
                      id="RR"
                      name="RR"
                      value={postAnasthesiaInputs.RR}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="spo2">
                      SPO2 <span>:</span>
                    </label>
                    <input
                      type="text"
                      id="spo2"
                      name="spo2"
                      value={postAnasthesiaInputs.spo2}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="name">
                      Patient Transferred to<span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head">
                      <div className="radio_Nurse_ot2 ">
                        <label htmlFor="patientTransferredYes">
                          <input
                            type="radio"
                            id="patientTransferredYes"
                            name="patientTransferred"
                            value="Recovery"
                            className="radio_Nurse_ot2_input"
                            checked={
                              postAnasthesiaInputs.patientTransferred ===
                              "Recovery"
                            }
                            onChange={handleInputChange}
                          />
                          Recovery
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 ">
                        <label htmlFor="patientTransferredNo">
                          <input
                            type="radio"
                            id="patientTransferredNo"
                            name="patientTransferred"
                            value="ICU"
                            className="radio_Nurse_ot2_input"
                            checked={
                              postAnasthesiaInputs.patientTransferred === "ICU"
                            }
                            onChange={handleInputChange}
                          />
                          ICU
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <div className="RegisFormcon wsdsceewww2">
                  <div className="RegisForm_1 ">
                    <label>
                      Adverse Events<span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head dsewwsdw3qqqs234">
                      <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqwsssssxxxcc xcvcxc">
                        <label htmlFor="Hypoxemia">
                          <input
                            type="checkbox"
                            id="Hypoxemia"
                            name="adverseEvents"
                            value="Hypoxemia"
                            className="radio_Nurse_ot2_input"
                            checked={
                              postAnasthesiaInputs.adverseEvents === "Hypoxemia"
                            }
                            onChange={handleInputChange}
                          />
                          Hypoxemia
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqwsssssxxxcc xcvcxc">
                        <label htmlFor="Arrhythmia">
                          <input
                            type="checkbox"
                            id="Arrhythmia"
                            name="adverseEvents"
                            value="Arrhythmia"
                            className="radio_Nurse_ot2_input"
                            checked={
                              postAnasthesiaInputs.adverseEvents ===
                              "Arrhythmia"
                            }
                            onChange={handleInputChange}
                          />
                          Arrhythmia
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqwsssssxxxcc xcvcxc">
                        <label htmlFor="UnanticipatedAirway">
                          <input
                            type="checkbox"
                            id="UnanticipatedAirway"
                            name="adverseEvents"
                            value="UnanticipatedAirway"
                            className="radio_Nurse_ot2_input"
                            checked={
                              postAnasthesiaInputs.adverseEvents ===
                              "UnanticipatedAirway"
                            }
                            onChange={handleInputChange}
                          />
                          Unanticipated difficult Airway
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqwsssssxxxcc xcvcxc">
                        <label htmlFor="dentalInjury">
                          <input
                            type="checkbox"
                            id="dentalInjury"
                            name="adverseEvents"
                            value="dentalInjury"
                            className="radio_Nurse_ot2_input"
                            checked={
                              postAnasthesiaInputs.adverseEvents ===
                              "dentalInjury"
                            }
                            onChange={handleInputChange}
                          />
                          Dental Injury
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 xcvcxc">
                        <label htmlFor="Nil">
                          <input
                            type="checkbox"
                            id="Nil"
                            name="adverseEvents"
                            value="Nil"
                            className="radio_Nurse_ot2_input"
                            checked={
                              postAnasthesiaInputs.adverseEvents === "Nil"
                            }
                            onChange={handleInputChange}
                          />
                          Nil
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <br />

                <div className="ewdfhyewuf65444">
                  <div className="OtMangementForm_1 ">
                    <label>
                      Name<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="nameFulledBy"
                      name="nameFulledBy"
                      value={postAnasthesiaInputs.nameFulledBy}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="OtMangementForm_1 ">
                    <label>
                      Date<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="Date"
                      name="Date"
                      value={postAnasthesiaInputs.Date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="OtMangementForm_1 ">
                    <label>
                      Time<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="time"
                      name="time"
                      value={postAnasthesiaInputs.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <br />
                <div className=" sigCanvas2_head11">
                  <div className="RegisForm_1_consent_consent sigCanvas2_head">
                    <div>
                      <SignatureCanvas
                        ref={signatureRef}
                        penColor="black"
                        canvasProps={{
                          width: 200,
                          height: 100,
                          className: "sigCanvas2",
                        }}
                      />
                    </div>
                    <h5> Signature</h5>

                    <div className="Register_btn_con">
                      <button
                        className="RegisterForm_1_btns"
                        onClick={clearSignature}
                      >
                        Clear
                      </button>
                      <button
                        className="RegisterForm_1_btns"
                        onClick={saveSignature}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>

                <br />
              </div>
            </div>
          </div>
        </PrintContent>
      )}
    </>
  );
}

export default OtAnaesthesiaPost;
