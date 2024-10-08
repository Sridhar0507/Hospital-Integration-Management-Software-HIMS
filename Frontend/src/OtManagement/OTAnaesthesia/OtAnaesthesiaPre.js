import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useDispatch, useSelector } from "react-redux";
import SignatureCanvas from "react-signature-canvas";
// import html2pdf from "html2pdf.js";  
// import "../../RegistrationForm/Registration.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

function OtAnaesthesiaPre() {
  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const AnaesthesiaGender = useSelector((state) => state.AnaesthesiaGender);

  const dispatchvalue = useDispatch();

  const [preNurseInputs, setPreNurseInputs] = useState({
    conserns: "",
    clinicalDiagnosis: "",
    plannedSurgery: "",
    dateOfProcedure: "",

    LMP: "",
    Pregnant: "",
    WeeksPregnant: "",
    hypertension: "",
    diabetes: "",
    asthma: "",
    allery: "",
    HyperHypothyroid: "",
    epilepsy: "",
    IHD: "",

    previousProcedureAnaesthesia: "",

    medications: "",
    antiplatelets: "",
    otherRelevantHistory: "",

    icterus: "",
    pallor: "",
    cyanosis: "",
    clubbing: "",
    odema: "",
    airwayDetition: "",
    thyroid: "",
    spine: "",
    moutrhopening: "",
    mallampattiGrade: "",
    OSAScore: "",
    functionalLimitation: "",
    NYHAGrade: "",
    mentoHyoidDistance: "",
    neckMovements: "",
    neckCircumference: "",

    pulse: "",
    bp: "",
    rr: "",
    temperature: "",
    weight: "",
    CVS: "",
    RS: "",
    GIT: "",
    CNS: "",
    breathHoldingTime: "",
    effortTolerance: "",
    otherRelevantFindings: "",

    // Investigations
    Hb: "",
    tc: "",
    dc: "",
    plateletCount: "",
    bloodSugar: "",
    serumCreatinine: "",
    bun: "",
    serumElectrolytes: "",
    hbsAgHiv: "",
    letSbilirubin: "",
    totalProtein: "",
    alb: "",
    sgpt: "",
    sgot: "",
    bloodGroupingTyping: "",
    pt: "",
    inr: "",
    ptt: "",
    ecg: "",
    xRayChest: "",
    echo: "",
    otherSpecificInvestigations: "",

    //
    typeofAnaesthesiaPlanned: "",
    preOpOpinion: "",
    analgesiaPlanned: "",
    ASACategory: "",
    anticipatednPost: "",

    nilByMouth: "",
    bloodReserved: "",
    premedication: "",
    preOtherInstructionsSpecific: "",
    name: "",
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
    onAfterPrint: () => {
      generatePdf();
    },
  });

  const Submitalldata = () => {
    setIsPrintButtonVisible(false);
    saveSignature();
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

    setPreNurseInputs({
      ...preNurseInputs,
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

  // const handleSaveAsPdf = () => {
  //   html2pdf().from(componentRef.current).save();
  // };

  const [drainsData, setDrainsData] = useState([
    { type: "", size: "", site: "", problems: "" },
  ]);

  const addRow = () => {
    setDrainsData([
      ...drainsData,
      { type: "", size: "", site: "", problems: "" },
    ]);
  };

  const deleteRow = (index) => {
    const updatedDrainsData = [...drainsData];
    updatedDrainsData.splice(index, 1);
    setDrainsData(updatedDrainsData);
  };

  const handleChangeObstetric = (e, index, key) => {
    const updatedDrainsData = [...drainsData];
    updatedDrainsData[index][key] = e.target.value;
    setDrainsData(updatedDrainsData);
  };

  return (
    <>
      {isPrintButtonVisible ? (
        <div className="appointment ">
          <br />

          <div className="RegisFormcon" style={{ justifyContent: "center" }}>
            <div className="RegisForm_1 euiwd6745q3">
              <label>
                Concerns<span>:</span>
              </label>

              <textarea
                id="conserns"
                name="conserns"
                value={preNurseInputs.conserns}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <br />
          <br />
          <div className="RegisFormcon" style={{ justifyContent: "center" }}>
            <div className="RegisForm_1">
              <label htmlFor="clinicalDiagnosis">
                Clinical Diagnosis<span>:</span>
              </label>
              <input
                type="text"
                id="clinicalDiagnosis"
                name="clinicalDiagnosis"
                value={preNurseInputs.clinicalDiagnosis}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="dateOfProcedure">
                Date of Procedure<span>:</span>
              </label>
              <input
                type="text"
                id="dateOfProcedure"
                name="dateOfProcedure"
                value={preNurseInputs.dateOfProcedure}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <br />
          <br />
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
            HISTORY
          </h4>
          <br />

          <div className="RegisFormcon">
            {/* {AnaesthesiaGender === "Female" && ( */}
            <>
              <div className="RegisForm_1">
                <label htmlFor="LMP">
                  LMP<span>:</span>
                </label>
                <input
                  type="text"
                  id="LMP"
                  name="LMP"
                  value={preNurseInputs.LMP}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="RegisForm_1">
                <label>
                  Pregnant<span>:</span>
                </label>
                <div className="radio_Nurse_ot2_head">
                  <div className="radio_Nurse_ot2">
                    <label htmlFor="PregnantYes">
                      <input
                        type="radio"
                        id="PregnantYes"
                        name="Pregnant"
                        value="Yes"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.Pregnant === "Yes"}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2">
                    <label htmlFor="PregnantNo">
                      <input
                        type="radio"
                        id="PregnantNo"
                        name="Pregnant"
                        value="No"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.Pregnant === "No"}
                        onChange={handleInputChange}
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>

              {preNurseInputs.Pregnant === "Yes" && (
                <div className="RegisForm_1">
                  <label htmlFor="WeeksPregnant">
                    Number of Weeks Pregnant <span>:</span>
                  </label>
                  <input
                    type="number"
                    id="WeeksPregnant"
                    name="WeeksPregnant"
                    value={preNurseInputs.WeeksPregnant}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
            </>
            {/*       )}      */}

            <div className="RegisForm_1">
              <label>
                Hypertension<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="hypertensionYes">
                    <input
                      type="radio"
                      id="hypertensionYes"
                      name="hypertension"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.hypertension === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="hypertensionNo">
                    <input
                      type="radio"
                      id="hypertensionNo"
                      name="hypertension"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.hypertension === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Diabetes<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="diabetesYes">
                    <input
                      type="radio"
                      id="diabetesYes"
                      name="diabetes"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.diabetes === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="diabetesNo">
                    <input
                      type="radio"
                      id="diabetesNo"
                      name="diabetes"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.diabetes === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Asthma<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="asthmaYes">
                    <input
                      type="radio"
                      id="asthmaYes"
                      name="asthma"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.asthma === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="asthmaNo">
                    <input
                      type="radio"
                      id="asthmaNo"
                      name="asthma"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.asthma === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Allery<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="alleryYes">
                    <input
                      type="radio"
                      id="alleryYes"
                      name="allery"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.allery === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="alleryNo">
                    <input
                      type="radio"
                      id="alleryNo"
                      name="allery"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.allery === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Hyper/Hypothyroid<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="HyperHypothyroidYes">
                    <input
                      type="radio"
                      id="HyperHypothyroidYes"
                      name="HyperHypothyroid"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.HyperHypothyroid === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="HyperHypothyroidNo">
                    <input
                      type="radio"
                      id="HyperHypothyroidNo"
                      name="HyperHypothyroid"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.HyperHypothyroid === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Epilepsy<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="epilepsyYes">
                    <input
                      type="radio"
                      id="epilepsyYes"
                      name="epilepsy"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.epilepsy === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="epilepsyNo">
                    <input
                      type="radio"
                      id="epilepsyNo"
                      name="epilepsy"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.epilepsy === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                I.H.D<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="IHDYes">
                    <input
                      type="radio"
                      id="IHDYes"
                      name="IHD"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.IHD === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="IHDNo">
                    <input
                      type="radio"
                      id="IHDNo"
                      name="IHD"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.IHD === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Smoking / Alcohol<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="epilepsyYes">
                    <input
                      type="radio"
                      id="epilepsyYes"
                      name="epilepsy"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.epilepsy === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="epilepsyNo">
                    <input
                      type="radio"
                      id="epilepsyNo"
                      name="epilepsy"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.epilepsy === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <br />

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
            Obstetric History :
          </h4>

          <br />
          <div className="RegisFormcon" style={{ justifyContent: "center" }}>
            <div className="RegisForm_1">
              <label htmlFor="EDDdates">
                E.D.D.(by dates)<span>:</span>
              </label>
              <input type="text" id="EDDdates" name="EDDdates" required />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="EDDusg">
                E.D.D.(by USG)<span>:</span>
              </label>
              <input type="text" id="EDDusg" name="EDDusg" required />
            </div>
          </div>

          <div className="Selected-table-container">
            <table className="selected-medicine-table2">
              <thead>
                <tr>
                  <th>Type of Delivery / Abortion - if any</th>
                  <th>Sex & Age of Child</th>
                  <th>Place of Delivery / Abortion</th>
                  <th>Anomalies / Problems, if any</th>
                  <th>
                    <button className="cell_btn12" onClick={addRow}>
                      <AddIcon />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {drainsData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="wedscr54_secd_8643r sdef11"
                        value={item.type}
                        onChange={(e) =>
                          handleChangeObstetric(e, index, "type")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="wedscr54_secd_8643r sdef11"
                        value={item.size}
                        onChange={(e) =>
                          handleChangeObstetric(e, index, "size")
                        }
                      />
                    </td>
                    <td>
                      <textarea
                        type="text"
                        className="edjuwydrt56 ee33223"
                        value={item.site}
                        onChange={(e) =>
                          handleChangeObstetric(e, index, "site")
                        }
                      ></textarea>
                    </td>
                    <td>
                      <textarea
                        type="text"
                        className="edjuwydrt56 ee33223"
                        value={item.problems}
                        onChange={(e) =>
                          handleChangeObstetric(e, index, "problems")
                        }
                      ></textarea>
                    </td>
                    <td>
                      <button
                        className="cell_btn12"
                        onClick={() => deleteRow(index)}
                      >
                        <RemoveIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <br />

          <div
            className="OtMangementForm_1 djkwked675"
            style={{ justifyContent: "center" }}
          >
            <label>
              High Risk Factors<span>:</span>{" "}
            </label>

            <div
              className="OtMangementForm_1_checkbox nmmlkiu76d"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              <label htmlFor="CaesareanSection">
                <input
                  type="checkbox"
                  id="CaesareanSection"
                  name="highRiskFactor"
                  value="CaesareanSection"
                  checked={preNurseInputs.highRiskFactor === "CaesareanSection"}
                  onChange={handleInputChange}
                />
                <span>Caesarean Section</span>
              </label>

              <label htmlFor="BadObstetricHistory">
                <input
                  type="checkbox"
                  id="BadObstetricHistory"
                  name="highRiskFactor"
                  value="BadObstetricHistory"
                  checked={
                    preNurseInputs.highRiskFactor === "BadObstetricHistory"
                  }
                  onChange={handleInputChange}
                />
                <span>Bad Obstetric History</span>
              </label>

              <label htmlFor="Infertility">
                <input
                  type="checkbox"
                  id="Infertility"
                  name="highRiskFactor"
                  value="Infertility"
                  checked={preNurseInputs.highRiskFactor === "Infertility"}
                  onChange={handleInputChange}
                />
                <span>Infertility</span>
              </label>

              <label htmlFor="DownsSyndrome">
                <input
                  type="checkbox"
                  id="DownsSyndrome"
                  name="highRiskFactor"
                  value="DownsSyndrome"
                  checked={preNurseInputs.highRiskFactor === "DownsSyndrome"}
                  onChange={handleInputChange}
                />
                <span>Downs Syndrome</span>
              </label>

              <label htmlFor="CongenitalAnomalies">
                <input
                  type="checkbox"
                  id="CongenitalAnomalies"
                  name="highRiskFactor"
                  value="CongenitalAnomalies"
                  checked={
                    preNurseInputs.highRiskFactor === "CongenitalAnomalies"
                  }
                  onChange={handleInputChange}
                />
                <span>Congenital anomalies</span>
              </label>

              <label htmlFor="ForcepvaccumDelivery">
                <input
                  type="checkbox"
                  id="ForcepvaccumDelivery"
                  name="highRiskFactor"
                  value="ForcepvaccumDelivery"
                  checked={
                    preNurseInputs.highRiskFactor === "ForcepvaccumDelivery"
                  }
                  onChange={handleInputChange}
                />
                <span>Forcep/Vaccum delivery</span>
              </label>

              <label htmlFor="BloodTrans">
                <input
                  type="checkbox"
                  id="BloodTrans"
                  name="highRiskFactor"
                  value="BloodTrans"
                  checked={preNurseInputs.highRiskFactor === "BloodTrans"}
                  onChange={handleInputChange}
                />
                <span>Blood Trans</span>
              </label>

              <label htmlFor="Tobacco">
                <input
                  type="checkbox"
                  id="Tobacco"
                  name="highRiskFactor"
                  value="Tobacco"
                  checked={preNurseInputs.highRiskFactor === "Tobacco"}
                  onChange={handleInputChange}
                />
                <span>Tobacco</span>
              </label>

              <label htmlFor="Alcohol">
                <input
                  type="checkbox"
                  id="Alcohol"
                  name="highRiskFactor"
                  value="Alcohol"
                  checked={preNurseInputs.highRiskFactor === "Alcohol"}
                  onChange={handleInputChange}
                />
                <span>Alcohol</span>
              </label>

              <label htmlFor="RadiationExposure">
                <input
                  type="checkbox"
                  id="RadiationExposure"
                  name="highRiskFactor"
                  value="RadiationExposure"
                  checked={
                    preNurseInputs.highRiskFactor === "RadiationExposure"
                  }
                  onChange={handleInputChange}
                />
                <span>Radiation Exposure</span>
              </label>

              <label htmlFor="RhNegative">
                <input
                  type="checkbox"
                  id="RhNegative"
                  name="highRiskFactor"
                  value="RhNegative"
                  checked={preNurseInputs.highRiskFactor === "RhNegative"}
                  onChange={handleInputChange}
                />
                <span>Rh. Negative</span>
              </label>

              <label htmlFor="AnyOther">
                <input
                  type="checkbox"
                  id="AnyOther"
                  name="highRiskFactor"
                  value="AnyOther"
                  checked={preNurseInputs.highRiskFactor === "AnyOther"}
                  onChange={handleInputChange}
                />
                <span>Any other</span>
              </label>
            </div>
          </div>
          <br />

          <div className="RegisFormcon">
            <div className="RegisForm_1 euiwd6745q3 wqsxwqqq">
              <label>
                Previous Procedure Surgery & Type of Anaesthesia<span>:</span>
              </label>

              <textarea
                id="previousProcedureAnaesthesia"
                name="previousProcedureAnaesthesia"
                value={preNurseInputs.previousProcedureAnaesthesia}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <br />

          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="medications">
                Medications<span>:</span>
              </label>
              <input
                type="text"
                id="medications"
                name="medications"
                value={preNurseInputs.medications}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="medications">
                Antiplatelets / Anticoagulants<span>:</span>
              </label>
              <input
                type="text"
                id="antiplatelets"
                name="antiplatelets"
                value={preNurseInputs.antiplatelets}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Other Relevant History<span>:</span>
              </label>

              <textarea
                id="otherRelevantHistory"
                name="otherRelevantHistory"
                value={preNurseInputs.otherRelevantHistory}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <br />
          <br />
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
            PHYSICAL EXAMINATION
          </h4>
          <br />
          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label>
                Icterus<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="icterusYes">
                    <input
                      type="radio"
                      id="icterusYes"
                      name="icterus"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.icterus === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="icterusNo">
                    <input
                      type="radio"
                      id="icterusNo"
                      name="icterus"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.icterus === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Pallor<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="pallorYes">
                    <input
                      type="radio"
                      id="pallorYes"
                      name="pallor"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.pallor === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="pallorNo">
                    <input
                      type="radio"
                      id="pallorNo"
                      name="pallor"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.pallor === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Cyanosis<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="cyanosisYes">
                    <input
                      type="radio"
                      id="cyanosisYes"
                      name="cyanosis"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.cyanosis === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="cyanosisNo">
                    <input
                      type="radio"
                      id="cyanosisNo"
                      name="cyanosis"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.cyanosis === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Clubbing<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="clubbingYes">
                    <input
                      type="radio"
                      id="clubbingYes"
                      name="clubbing"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.clubbing === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="clubbingNo">
                    <input
                      type="radio"
                      id="clubbingNo"
                      name="clubbing"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.clubbing === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Odema<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="odemaYes">
                    <input
                      type="radio"
                      id="odemaYes"
                      name="odema"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.odema === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="odemaNo">
                    <input
                      type="radio"
                      id="odemaNo"
                      name="odema"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.odema === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="pulse">
                Airway-Dentition<span>:</span>
              </label>
              <input
                type="text"
                id="airwayDetition"
                name="airwayDetition"
                value={preNurseInputs.airwayDetition}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="pulse">
                Thyroid<span>:</span>
              </label>
              <input
                type="text"
                id="thyroid"
                name="thyroid"
                value={preNurseInputs.thyroid}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="pulse">
                Spine<span>:</span>
              </label>
              <input
                type="text"
                id="spine"
                name="spine"
                value={preNurseInputs.spine}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Mouth Opening<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head ">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="moutrhopeningless">
                    <input
                      type="radio"
                      id="moutrhopeningless"
                      name="moutrhopening"
                      value="moutrhopeningless"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.moutrhopening === "moutrhopeningless"
                      }
                      onChange={handleInputChange}
                    />
                    &gt; 2 Finger breadths
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="moutrhopeninggreater">
                    <input
                      type="radio"
                      id="moutrhopeninggreater"
                      name="moutrhopening"
                      value="moutrhopeninggreater"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.moutrhopening === "moutrhopeninggreater"
                      }
                      onChange={handleInputChange}
                    />
                    &lt; 2 Finger breadths
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Mallampatti Grade<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head wfre6567ty">
                <div className="radio_Nurse_ot2 errvmmklpee4">
                  <label htmlFor="mallampattiGradeI">
                    <input
                      type="radio"
                      id="mallampattiGradeI"
                      name="mallampattiGrade"
                      value="I"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.mallampattiGrade === "I"}
                      onChange={handleInputChange}
                    />
                    I
                  </label>
                </div>
                <div className="radio_Nurse_ot2 errvmmklpee4">
                  <label htmlFor="mallampattiGradeII">
                    <input
                      type="radio"
                      id="mallampattiGradeII"
                      name="mallampattiGrade"
                      value="II"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.mallampattiGrade === "II"}
                      onChange={handleInputChange}
                    />
                    II{" "}
                  </label>
                </div>
                <div className="radio_Nurse_ot2 errvmmklpee4">
                  <label htmlFor="mallampattiGradeIII">
                    <input
                      type="radio"
                      id="mallampattiGradeIII"
                      name="mallampattiGrade"
                      value="III"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.mallampattiGrade === "III"}
                      onChange={handleInputChange}
                    />
                    III{" "}
                  </label>
                </div>
                <div className="radio_Nurse_ot2 errvmmklpee4">
                  <label htmlFor="mallampattiGradeIV">
                    <input
                      type="radio"
                      id="mallampattiGradeIV"
                      name="mallampattiGrade"
                      value="IV"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.mallampattiGrade === "IV"}
                      onChange={handleInputChange}
                    />
                    IV{" "}
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="OSAScore">
                OSA Score<span>:</span>
              </label>
              <input
                type="text"
                id="OSAScore"
                name="OSAScore"
                value={preNurseInputs.OSAScore}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Functional Limitation<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="functionalLimitationYes">
                    <input
                      type="radio"
                      id="functionalLimitationYes"
                      name="functionalLimitation"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.functionalLimitation === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="functionalLimitationNo">
                    <input
                      type="radio"
                      id="functionalLimitationNo"
                      name="functionalLimitation"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.functionalLimitation === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            {preNurseInputs.functionalLimitation === "Yes" && (
              <div className="RegisForm_1">
                <label htmlFor="nyhaGrade">
                  NYHA Grade<span>:</span>
                </label>
                <div className="radio_Nurse_ot2_head wfre6567ty">
                  <div className="radio_Nurse_ot2 errvmmklpee4">
                    <label htmlFor="GradeIradio">
                      <input
                        type="radio"
                        id="GradeIradio"
                        name="NYHAGrade"
                        value="GradeI"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.NYHAGrade === "GradeI"}
                        onChange={handleInputChange}
                      />
                      I
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2 errvmmklpee4">
                    <label htmlFor="GradeIIradio">
                      <input
                        type="radio"
                        id="GradeIIradio"
                        name="NYHAGrade"
                        value="GradeII"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.NYHAGrade === "GradeII"}
                        onChange={handleInputChange}
                      />
                      II
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2 errvmmklpee4">
                    <label htmlFor="GradeIIIradio">
                      <input
                        type="radio"
                        id="GradeIIIradio"
                        name="NYHAGrade"
                        value="GradeIII"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.NYHAGrade === "GradeIII"}
                        onChange={handleInputChange}
                      />
                      III
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2 errvmmklpee4">
                    <label htmlFor="GradeIVradio">
                      <input
                        type="radio"
                        id="GradeIVradio"
                        name="NYHAGrade"
                        value="GradeIV"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.NYHAGrade === "GradeIV"}
                        onChange={handleInputChange}
                      />
                      IV
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="RegisForm_1">
              <label>
                Mento-Hyoid Distance<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="mentoHyoidDistanceGreater">
                    <input
                      type="radio"
                      id="mentoHyoidDistanceGreater"
                      name="mentoHyoidDistance"
                      value="greaterThan4cm"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.mentoHyoidDistance === "greaterThan4cm"
                      }
                      onChange={handleInputChange}
                    />
                    &gt; 4cm
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="mentoHyoidDistanceLesser">
                    <input
                      type="radio"
                      id="mentoHyoidDistanceLesser"
                      name="mentoHyoidDistance"
                      value="lessThan4cm"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.mentoHyoidDistance === "lessThan4cm"
                      }
                      onChange={handleInputChange}
                    />
                    &lt; 4cm
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Neck Movements<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="neckMovementsNormal">
                    <input
                      type="radio"
                      id="neckMovementsNormal"
                      name="neckMovements"
                      value="neckMovementsNormal"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.neckMovements === "neckMovementsNormal"
                      }
                      onChange={handleInputChange}
                    />
                    Normal
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="neckMovementsRestricted">
                    <input
                      type="radio"
                      id="neckMovementsRestricted"
                      name="neckMovements"
                      value="neckMovementsRestricted"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.neckMovements ===
                        "neckMovementsRestricted"
                      }
                      onChange={handleInputChange}
                    />
                    Restricted
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="neckCircumference">
                Neck Circumference<span>:</span>
              </label>
              <input
                type="text"
                id="neckCircumference"
                name="neckCircumference"
                value={preNurseInputs.neckCircumference}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="pulse">
                Pulse<span>:</span>
              </label>
              <input
                type="text"
                id="pulse"
                name="pulse"
                value={preNurseInputs.pulse}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="bp">
                BP<span>:</span>
              </label>
              <input
                type="text"
                id="bp"
                name="bp"
                value={preNurseInputs.bp}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="RegisForm_1">
              <label htmlFor="rr">
                RR<span>:</span>
              </label>
              <input
                type="text"
                id="rr"
                name="rr"
                value={preNurseInputs.rr}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Temperature<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="afebrile">
                    <input
                      type="radio"
                      id="afebrile"
                      name="temperature"
                      value="Afebrile"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.temperature === "Afebrile"}
                      onChange={handleInputChange}
                    />
                    Afebrile
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="febrile">
                    <input
                      type="radio"
                      id="febrile"
                      name="temperature"
                      value="Febrile"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.temperature === "Febrile"}
                      onChange={handleInputChange}
                    />
                    Febrile
                  </label>
                </div>
              </div>
            </div>
            <div className="RegisForm_1">
              <label htmlFor="weight">
                Weight (Kg)<span>:</span>
              </label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={preNurseInputs.weight}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="RegisForm_1">
              <label>
                CVS<span>:</span>
              </label>

              <textarea
                id="CVS"
                name="CVS"
                value={preNurseInputs.CVS}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="RegisForm_1">
              <label>
                RS<span>:</span>
              </label>

              <textarea
                id="RS"
                name="RS"
                value={preNurseInputs.RS}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="RegisForm_1">
              <label>
                GIT<span>:</span>
              </label>

              <textarea
                id="GIT"
                name="GIT"
                value={preNurseInputs.GIT}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="RegisForm_1">
              <label>
                CNS<span>:</span>
              </label>

              <textarea
                id="CNS"
                name="CNS"
                value={preNurseInputs.CNS}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="breathHoldingTime">
                Breath Holding Time<span>:</span>
              </label>
              <input
                type="time"
                id="breathHoldingTime"
                name="breathHoldingTime"
                value={preNurseInputs.breathHoldingTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="breathHoldingTime">
                Effort Tolerance<span>:</span>
              </label>
              <input
                type="text"
                id="effortTolerance"
                name="effortTolerance"
                value={preNurseInputs.effortTolerance}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="breathHoldingTime">
                Other Relevant Findings<span>:</span>
              </label>
              <input
                type="text"
                id="otherRelevantFindings"
                name="otherRelevantFindings"
                value={preNurseInputs.otherRelevantFindings}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <br />
          <br />
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
            Investigations
          </h4>
          <br />
          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="Hb">
                Hb %<span>:</span>
              </label>
              <input
                type="text"
                id="Hb"
                name="Hb"
                value={preNurseInputs.Hb}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="RegisForm_1">
              <label htmlFor="tc">
                TC %<span>:</span>
              </label>
              <input
                type="text"
                id="tc"
                name="tc"
                value={preNurseInputs.tc}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="dc">
                DC<span>:</span>
              </label>
              <input
                type="text"
                id="dc"
                name="dc"
                value={preNurseInputs.dc}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="plateletCount">
                Platelet Count<span>:</span>
              </label>
              <input
                type="text"
                id="plateletCount"
                name="plateletCount"
                value={preNurseInputs.plateletCount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="bloodSugar">
                Blood Sugar (mg%)<span>:</span>
              </label>
              <input
                type="text"
                id="bloodSugar"
                name="bloodSugar"
                value={preNurseInputs.bloodSugar}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="serumCreatinine">
                Serum Creatinine<span>:</span>
              </label>
              <input
                type="text"
                id="serumCreatinine"
                name="serumCreatinine"
                value={preNurseInputs.serumCreatinine}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="bun">
                BUN<span>:</span>
              </label>
              <input
                type="text"
                id="bun"
                name="bun"
                value={preNurseInputs.bun}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="serumElectrolytes">
                Serum Electrolytes<span>:</span>
              </label>
              <input
                type="text"
                id="serumElectrolytes"
                name="serumElectrolytes"
                value={preNurseInputs.serumElectrolytes}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="hbsAgHiv">
                HBsAg / HIV<span>:</span>
              </label>
              <input
                type="text"
                id="hbsAgHiv"
                name="hbsAgHiv"
                value={preNurseInputs.hbsAgHiv}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="letSbilirubin">
                LET S.bilirubin<span>:</span>
              </label>
              <input
                type="text"
                id="letSbilirubin"
                name="letSbilirubin"
                value={preNurseInputs.letSbilirubin}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="totalProtein">
                Total Protein<span>:</span>
              </label>
              <input
                type="text"
                id="totalProtein"
                name="totalProtein"
                value={preNurseInputs.totalProtein}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="alb">
                Alb<span>:</span>
              </label>
              <input
                type="text"
                id="alb"
                name="alb"
                value={preNurseInputs.alb}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="sgpt">
                SGPT<span>:</span>
              </label>
              <input
                type="text"
                id="sgpt"
                name="sgpt"
                value={preNurseInputs.sgpt}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="sgot">
                SGOT<span>:</span>
              </label>
              <input
                type="text"
                id="sgot"
                name="sgot"
                value={preNurseInputs.sgot}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="bloodGroupingTyping">
                Blood Grouping & Typing<span>:</span>
              </label>
              <input
                type="text"
                id="bloodGroupingTyping"
                name="bloodGroupingTyping"
                value={preNurseInputs.bloodGroupingTyping}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="pt">
                PT<span>:</span>
              </label>
              <input
                type="text"
                id="pt"
                name="pt"
                value={preNurseInputs.pt}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="inr">
                INR<span>:</span>
              </label>
              <input
                type="text"
                id="inr"
                name="inr"
                value={preNurseInputs.inr}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="ptt">
                PTT<span>:</span>
              </label>
              <input
                type="text"
                id="ptt"
                name="ptt"
                value={preNurseInputs.ptt}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <br />

          <div className="jdcneuir8o34di">
            <div className="RegisForm_1 swsxwdef7ujn">
              <label htmlFor="ecg">
                ECG<span>:</span>
              </label>
              <textarea
                id="ecg"
                name="ecg"
                value={preNurseInputs.ecg}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1 swsxwdef7ujn">
              <label htmlFor="xRayChest">
                X-Ray Chest<span>:</span>
              </label>
              <textarea
                id="xRayChest"
                name="xRayChest"
                value={preNurseInputs.xRayChest}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <br />
          <div className="jdcneuir8o34di">
            <div className="RegisForm_1 swsxwdef7ujn">
              <label htmlFor="echo">
                ECHO<span>:</span>
              </label>
              <textarea
                id="echo"
                name="echo"
                value={preNurseInputs.echo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1 swsxwdef7ujn">
              <label
                htmlFor="otherSpecificInvestigations"
                style={{ width: "200px" }}
              >
                Other Specific Investigations<span>:</span>
              </label>
              <textarea
                id="otherSpecificInvestigations"
                name="otherSpecificInvestigations"
                value={preNurseInputs.otherSpecificInvestigations}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <br />
          <br />

          <div className="ewdfhyewuf65">
            <div className="OtMangementForm_1 djkwked675">
              <label htmlFor="typeofAnaesthesiaPlanned">
                Type of Anaesthesia Planned<span>:</span>
              </label>
              <input
                type="text"
                id="typeofAnaesthesiaPlanned"
                name="typeofAnaesthesiaPlanned"
                value={preNurseInputs.typeofAnaesthesiaPlanned}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label>
                Pre-Op Opinion<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox eiuwd7we67657887">
                <label htmlFor="fitCheckbox">
                  <input
                    type="checkbox"
                    id="fitCheckbox"
                    name="preOpOpinion"
                    value="Fit"
                    checked={preNurseInputs.preOpOpinion === "Fit"}
                    onChange={handleInputChange}
                  />
                  <span>Fit</span>
                </label>
                <label htmlFor="unfitCheckbox">
                  <input
                    type="checkbox"
                    id="unfitCheckbox"
                    name="preOpOpinion"
                    value="Unfit"
                    checked={preNurseInputs.preOpOpinion === "Unfit"}
                    onChange={handleInputChange}
                  />
                  <span>Unfit</span>
                </label>
                <label htmlFor="reviewCheckbox">
                  <input
                    type="checkbox"
                    id="reviewCheckbox"
                    name="preOpOpinion"
                    value="Review"
                    checked={preNurseInputs.preOpOpinion === "Review"}
                    onChange={handleInputChange}
                  />
                  <span>Review</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label>
                Post Operative Analgesia Planned <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox eiuwd7we67657887">
                <label htmlFor="OralCheckbox">
                  <input
                    type="checkbox"
                    id="OralCheckbox"
                    name="analgesiaPlanned"
                    value="Oral"
                    checked={preNurseInputs.analgesiaPlanned === "Oral"}
                    onChange={handleInputChange}
                  />
                  <span>Oral</span>
                </label>
                <label htmlFor="IMCheckbox">
                  <input
                    type="checkbox"
                    id="IMCheckbox"
                    name="analgesiaPlanned"
                    value="IM"
                    checked={preNurseInputs.analgesiaPlanned === "IM"}
                    onChange={handleInputChange}
                  />
                  <span>IM</span>
                </label>
                <label htmlFor="EpiduralCheckbox">
                  <input
                    type="checkbox"
                    id="EpiduralCheckbox"
                    name="analgesiaPlanned"
                    value="Epidural"
                    checked={preNurseInputs.analgesiaPlanned === "Epidural"}
                    onChange={handleInputChange}
                  />
                  <span>Epidural</span>
                </label>
                <label htmlFor="BlockCheckbox">
                  <input
                    type="checkbox"
                    id="BlockCheckbox"
                    name="analgesiaPlanned"
                    value="Block"
                    checked={preNurseInputs.analgesiaPlanned === "Block"}
                    onChange={handleInputChange}
                  />
                  <span>Block</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label>
                ASA CATEGORY<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox eiuwd7we67657887">
                <label htmlFor="ICategoryCheckbox">
                  <input
                    type="checkbox"
                    id="ICategoryCheckbox"
                    name="ASACategory"
                    value="I"
                    checked={preNurseInputs.ASACategory === "I"}
                    onChange={handleInputChange}
                  />
                  <span>I</span>
                </label>
                <label htmlFor="IICategoryCheckbox">
                  <input
                    type="checkbox"
                    id="IICategoryCheckbox"
                    name="ASACategory"
                    value="II"
                    checked={preNurseInputs.ASACategory === "II"}
                    onChange={handleInputChange}
                  />
                  <span>II</span>
                </label>
                <label htmlFor="IIICategoryCheckbox">
                  <input
                    type="checkbox"
                    id="IIICategoryCheckbox"
                    name="ASACategory"
                    value="III"
                    checked={preNurseInputs.ASACategory === "III"}
                    onChange={handleInputChange}
                  />
                  <span>III</span>
                </label>
                <label htmlFor="IVCategoryCheckbox">
                  <input
                    type="checkbox"
                    id="IVCategoryCheckbox"
                    name="ASACategory"
                    value="IV"
                    checked={preNurseInputs.ASACategory === "IV"}
                    onChange={handleInputChange}
                  />
                  <span>IV</span>
                </label>
                <label htmlFor="VCategoryCheckbox">
                  <input
                    type="checkbox"
                    id="VCategoryCheckbox"
                    name="ASACategory"
                    value="V"
                    checked={preNurseInputs.ASACategory === "V"}
                    onChange={handleInputChange}
                  />
                  <span>V</span>
                </label>
                <label htmlFor="VICategoryCheckbox">
                  <input
                    type="checkbox"
                    id="VICategoryCheckbox"
                    name="ASACategory"
                    value="VI"
                    checked={preNurseInputs.ASACategory === "VI"}
                    onChange={handleInputChange}
                  />
                  <span>VI</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label>
                Anticipated Post Anaesthesia Care<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                <label htmlFor="electiveVentilationCheckbox">
                  <input
                    type="checkbox"
                    id="electiveVentilationCheckbox"
                    name="anticipatednPost"
                    value="electiveVentilation"
                    checked={
                      preNurseInputs.anticipatednPost === "electiveVentilation"
                    }
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Elective Ventilation</span>
                </label>

                <label htmlFor="ICUCareCheckbox">
                  <input
                    type="checkbox"
                    id="ICUCareCheckbox"
                    name="anticipatednPost"
                    value="ICUCare"
                    checked={preNurseInputs.anticipatednPost === "ICUCare"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>ICU Care</span>
                </label>

                <label htmlFor="TransfertoWardCheckbox">
                  <input
                    type="checkbox"
                    id="TransfertoWardCheckbox"
                    name="anticipatednPost"
                    value="TransfertoWard"
                    checked={
                      preNurseInputs.anticipatednPost === "TransfertoWard"
                    }
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Transfer to Ward</span>
                </label>
              </div>
            </div>
          </div>

          <br />

          <br />

          <div className="ewdfhyewuf65">
            <div className="OtMangementForm_1 ">
              <label>
                Nil By Mouth<span>:</span>
              </label>
              <input
                type="text"
                id="nilByMouth"
                name="nilByMouth"
                value={preNurseInputs.nilByMouth}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="OtMangementForm_1 ">
              <label>
                Units of Blood Reserved<span>:</span>
              </label>
              <input
                type="text"
                id="bloodReserved"
                name="bloodReserved"
                value={preNurseInputs.bloodReserved}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1 euiwd6745q3">
              <label>
                Premedication<span>:</span>
              </label>

              <textarea
                id="premedication"
                name="premedication"
                value={preNurseInputs.premedication}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="RegisForm_1 euiwd6745q3">
              <label>
                Other Specific Instructions<span>:</span>
              </label>

              <textarea
                id="preOtherInstructionsSpecific"
                name="preOtherInstructionsSpecific"
                value={preNurseInputs.preOtherInstructionsSpecific}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="OtMangementForm_1 ">
              <label>
                Name<span>:</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={preNurseInputs.name}
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
                value={preNurseInputs.Date}
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
                value={preNurseInputs.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <br />
          <div className="sigCanvas2_head11">
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
        <>
          <PrintContent
            ref={componentRef}
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
            }}
            signatureData={signatureData}

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
                    Pre - Anesthesia Assessment{" "}
                  </h4>
                  <br />
          <div className="RegisFormcon" style={{ justifyContent: "center" }}>
            <div className="RegisForm_1 euiwd6745q3">
              <label>
                Concerns<span>:</span>
              </label>

              <textarea
                id="conserns"
                name="conserns"
                value={preNurseInputs.conserns}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <br />
          <br />
          <div className="RegisFormcon" style={{ justifyContent: "center" }}>
            <div className="RegisForm_1">
              <label htmlFor="clinicalDiagnosis">
                Clinical Diagnosis<span>:</span>
              </label>
              <input
                type="text"
                id="clinicalDiagnosis"
                name="clinicalDiagnosis"
                value={preNurseInputs.clinicalDiagnosis}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="dateOfProcedure">
                Date of Procedure<span>:</span>
              </label>
              <input
                type="text"
                id="dateOfProcedure"
                name="dateOfProcedure"
                value={preNurseInputs.dateOfProcedure}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <br />
          <br />
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
            HISTORY
          </h4>
          <br />

          <div className="RegisFormcon">
            {/* {AnaesthesiaGender === "Female" && ( */}
            <>
              <div className="RegisForm_1">
                <label htmlFor="LMP">
                  LMP<span>:</span>
                </label>
                <input
                  type="text"
                  id="LMP"
                  name="LMP"
                  value={preNurseInputs.LMP}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="RegisForm_1">
                <label>
                  Pregnant<span>:</span>
                </label>
                <div className="radio_Nurse_ot2_head">
                  <div className="radio_Nurse_ot2">
                    <label htmlFor="PregnantYes">
                      <input
                        type="radio"
                        id="PregnantYes"
                        name="Pregnant"
                        value="Yes"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.Pregnant === "Yes"}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2">
                    <label htmlFor="PregnantNo">
                      <input
                        type="radio"
                        id="PregnantNo"
                        name="Pregnant"
                        value="No"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.Pregnant === "No"}
                        onChange={handleInputChange}
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>

              {preNurseInputs.Pregnant === "Yes" && (
                <div className="RegisForm_1">
                  <label htmlFor="WeeksPregnant">
                    Number of Weeks Pregnant <span>:</span>
                  </label>
                  <input
                    type="number"
                    id="WeeksPregnant"
                    name="WeeksPregnant"
                    value={preNurseInputs.WeeksPregnant}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
            </>
            {/*       )}      */}

            <div className="RegisForm_1">
              <label>
                Hypertension<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="hypertensionYes">
                    <input
                      type="radio"
                      id="hypertensionYes"
                      name="hypertension"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.hypertension === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="hypertensionNo">
                    <input
                      type="radio"
                      id="hypertensionNo"
                      name="hypertension"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.hypertension === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Diabetes<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="diabetesYes">
                    <input
                      type="radio"
                      id="diabetesYes"
                      name="diabetes"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.diabetes === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="diabetesNo">
                    <input
                      type="radio"
                      id="diabetesNo"
                      name="diabetes"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.diabetes === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Asthma<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="asthmaYes">
                    <input
                      type="radio"
                      id="asthmaYes"
                      name="asthma"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.asthma === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="asthmaNo">
                    <input
                      type="radio"
                      id="asthmaNo"
                      name="asthma"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.asthma === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Allery<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="alleryYes">
                    <input
                      type="radio"
                      id="alleryYes"
                      name="allery"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.allery === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="alleryNo">
                    <input
                      type="radio"
                      id="alleryNo"
                      name="allery"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.allery === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Hyper/Hypothyroid<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="HyperHypothyroidYes">
                    <input
                      type="radio"
                      id="HyperHypothyroidYes"
                      name="HyperHypothyroid"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.HyperHypothyroid === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="HyperHypothyroidNo">
                    <input
                      type="radio"
                      id="HyperHypothyroidNo"
                      name="HyperHypothyroid"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.HyperHypothyroid === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Epilepsy<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="epilepsyYes">
                    <input
                      type="radio"
                      id="epilepsyYes"
                      name="epilepsy"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.epilepsy === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="epilepsyNo">
                    <input
                      type="radio"
                      id="epilepsyNo"
                      name="epilepsy"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.epilepsy === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                I.H.D<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="IHDYes">
                    <input
                      type="radio"
                      id="IHDYes"
                      name="IHD"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.IHD === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="IHDNo">
                    <input
                      type="radio"
                      id="IHDNo"
                      name="IHD"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.IHD === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Smoking / Alcohol<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="epilepsyYes">
                    <input
                      type="radio"
                      id="epilepsyYes"
                      name="epilepsy"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.epilepsy === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="epilepsyNo">
                    <input
                      type="radio"
                      id="epilepsyNo"
                      name="epilepsy"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.epilepsy === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <br />

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
            Obstetric History :
          </h4>

          <br />
          <div className="RegisFormcon" style={{ justifyContent: "center" }}>
            <div className="RegisForm_1">
              <label htmlFor="EDDdates">
                E.D.D.(by dates)<span>:</span>
              </label>
              <input type="text" id="EDDdates" name="EDDdates" required />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="EDDusg">
                E.D.D.(by USG)<span>:</span>
              </label>
              <input type="text" id="EDDusg" name="EDDusg" required />
            </div>
          </div>

          <div className="Selected-table-container">
            <table className="selected-medicine-table2">
              <thead>
                <tr>
                  <th>Type of Delivery / Abortion - if any</th>
                  <th>Sex & Age of Child</th>
                  <th>Place of Delivery / Abortion</th>
                  <th>Anomalies / Problems, if any</th>
                  <th>
                    <button className="cell_btn12" onClick={addRow}>
                      <AddIcon />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {drainsData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="wedscr54_secd_8643r sdef11"
                        value={item.type}
                        onChange={(e) =>
                          handleChangeObstetric(e, index, "type")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="wedscr54_secd_8643r sdef11"
                        value={item.size}
                        onChange={(e) =>
                          handleChangeObstetric(e, index, "size")
                        }
                      />
                    </td>
                    <td>
                      <textarea
                        type="text"
                        className="edjuwydrt56 ee33223"
                        value={item.site}
                        onChange={(e) =>
                          handleChangeObstetric(e, index, "site")
                        }
                      ></textarea>
                    </td>
                    <td>
                      <textarea
                        type="text"
                        className="edjuwydrt56 ee33223"
                        value={item.problems}
                        onChange={(e) =>
                          handleChangeObstetric(e, index, "problems")
                        }
                      ></textarea>
                    </td>
                    <td>
                      <button
                        className="cell_btn12"
                        onClick={() => deleteRow(index)}
                      >
                        <RemoveIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <br />

          <div
            className="OtMangementForm_1 djkwked675"
            style={{ justifyContent: "center" }}
          >
            <label>
              High Risk Factors<span>:</span>{" "}
            </label>

            <div
              className="OtMangementForm_1_checkbox nmmlkiu76d"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              <label htmlFor="CaesareanSection">
                <input
                  type="checkbox"
                  id="CaesareanSection"
                  name="highRiskFactor"
                  value="CaesareanSection"
                  checked={preNurseInputs.highRiskFactor === "CaesareanSection"}
                  onChange={handleInputChange}
                />
                <span>Caesarean Section</span>
              </label>

              <label htmlFor="BadObstetricHistory">
                <input
                  type="checkbox"
                  id="BadObstetricHistory"
                  name="highRiskFactor"
                  value="BadObstetricHistory"
                  checked={
                    preNurseInputs.highRiskFactor === "BadObstetricHistory"
                  }
                  onChange={handleInputChange}
                />
                <span>Bad Obstetric History</span>
              </label>

              <label htmlFor="Infertility">
                <input
                  type="checkbox"
                  id="Infertility"
                  name="highRiskFactor"
                  value="Infertility"
                  checked={preNurseInputs.highRiskFactor === "Infertility"}
                  onChange={handleInputChange}
                />
                <span>Infertility</span>
              </label>

              <label htmlFor="DownsSyndrome">
                <input
                  type="checkbox"
                  id="DownsSyndrome"
                  name="highRiskFactor"
                  value="DownsSyndrome"
                  checked={preNurseInputs.highRiskFactor === "DownsSyndrome"}
                  onChange={handleInputChange}
                />
                <span>Downs Syndrome</span>
              </label>

              <label htmlFor="CongenitalAnomalies">
                <input
                  type="checkbox"
                  id="CongenitalAnomalies"
                  name="highRiskFactor"
                  value="CongenitalAnomalies"
                  checked={
                    preNurseInputs.highRiskFactor === "CongenitalAnomalies"
                  }
                  onChange={handleInputChange}
                />
                <span>Congenital anomalies</span>
              </label>

              <label htmlFor="ForcepvaccumDelivery">
                <input
                  type="checkbox"
                  id="ForcepvaccumDelivery"
                  name="highRiskFactor"
                  value="ForcepvaccumDelivery"
                  checked={
                    preNurseInputs.highRiskFactor === "ForcepvaccumDelivery"
                  }
                  onChange={handleInputChange}
                />
                <span>Forcep/Vaccum delivery</span>
              </label>

              <label htmlFor="BloodTrans">
                <input
                  type="checkbox"
                  id="BloodTrans"
                  name="highRiskFactor"
                  value="BloodTrans"
                  checked={preNurseInputs.highRiskFactor === "BloodTrans"}
                  onChange={handleInputChange}
                />
                <span>Blood Trans</span>
              </label>

              <label htmlFor="Tobacco">
                <input
                  type="checkbox"
                  id="Tobacco"
                  name="highRiskFactor"
                  value="Tobacco"
                  checked={preNurseInputs.highRiskFactor === "Tobacco"}
                  onChange={handleInputChange}
                />
                <span>Tobacco</span>
              </label>

              <label htmlFor="Alcohol">
                <input
                  type="checkbox"
                  id="Alcohol"
                  name="highRiskFactor"
                  value="Alcohol"
                  checked={preNurseInputs.highRiskFactor === "Alcohol"}
                  onChange={handleInputChange}
                />
                <span>Alcohol</span>
              </label>

              <label htmlFor="RadiationExposure">
                <input
                  type="checkbox"
                  id="RadiationExposure"
                  name="highRiskFactor"
                  value="RadiationExposure"
                  checked={
                    preNurseInputs.highRiskFactor === "RadiationExposure"
                  }
                  onChange={handleInputChange}
                />
                <span>Radiation Exposure</span>
              </label>

              <label htmlFor="RhNegative">
                <input
                  type="checkbox"
                  id="RhNegative"
                  name="highRiskFactor"
                  value="RhNegative"
                  checked={preNurseInputs.highRiskFactor === "RhNegative"}
                  onChange={handleInputChange}
                />
                <span>Rh. Negative</span>
              </label>

              <label htmlFor="AnyOther">
                <input
                  type="checkbox"
                  id="AnyOther"
                  name="highRiskFactor"
                  value="AnyOther"
                  checked={preNurseInputs.highRiskFactor === "AnyOther"}
                  onChange={handleInputChange}
                />
                <span>Any other</span>
              </label>
            </div>
          </div>
          <br />

          <div className="RegisFormcon">
            <div className="RegisForm_1 euiwd6745q3 wqsxwqqq">
              <label>
                Previous Procedure Surgery & Type of Anaesthesia<span>:</span>
              </label>

              <textarea
                id="previousProcedureAnaesthesia"
                name="previousProcedureAnaesthesia"
                value={preNurseInputs.previousProcedureAnaesthesia}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <br />

          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="medications">
                Medications<span>:</span>
              </label>
              <input
                type="text"
                id="medications"
                name="medications"
                value={preNurseInputs.medications}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="medications">
                Antiplatelets / Anticoagulants<span>:</span>
              </label>
              <input
                type="text"
                id="antiplatelets"
                name="antiplatelets"
                value={preNurseInputs.antiplatelets}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Other Relevant History<span>:</span>
              </label>

              <textarea
                id="otherRelevantHistory"
                name="otherRelevantHistory"
                value={preNurseInputs.otherRelevantHistory}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <br />
          <br />
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
            PHYSICAL EXAMINATION
          </h4>
          <br />
          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label>
                Icterus<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="icterusYes">
                    <input
                      type="radio"
                      id="icterusYes"
                      name="icterus"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.icterus === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="icterusNo">
                    <input
                      type="radio"
                      id="icterusNo"
                      name="icterus"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.icterus === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Pallor<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="pallorYes">
                    <input
                      type="radio"
                      id="pallorYes"
                      name="pallor"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.pallor === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="pallorNo">
                    <input
                      type="radio"
                      id="pallorNo"
                      name="pallor"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.pallor === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Cyanosis<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="cyanosisYes">
                    <input
                      type="radio"
                      id="cyanosisYes"
                      name="cyanosis"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.cyanosis === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="cyanosisNo">
                    <input
                      type="radio"
                      id="cyanosisNo"
                      name="cyanosis"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.cyanosis === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Clubbing<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="clubbingYes">
                    <input
                      type="radio"
                      id="clubbingYes"
                      name="clubbing"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.clubbing === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="clubbingNo">
                    <input
                      type="radio"
                      id="clubbingNo"
                      name="clubbing"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.clubbing === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Odema<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="odemaYes">
                    <input
                      type="radio"
                      id="odemaYes"
                      name="odema"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.odema === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="odemaNo">
                    <input
                      type="radio"
                      id="odemaNo"
                      name="odema"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.odema === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="pulse">
                Airway-Dentition<span>:</span>
              </label>
              <input
                type="text"
                id="airwayDetition"
                name="airwayDetition"
                value={preNurseInputs.airwayDetition}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="pulse">
                Thyroid<span>:</span>
              </label>
              <input
                type="text"
                id="thyroid"
                name="thyroid"
                value={preNurseInputs.thyroid}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="pulse">
                Spine<span>:</span>
              </label>
              <input
                type="text"
                id="spine"
                name="spine"
                value={preNurseInputs.spine}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Mouth Opening<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head ">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="moutrhopeningless">
                    <input
                      type="radio"
                      id="moutrhopeningless"
                      name="moutrhopening"
                      value="moutrhopeningless"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.moutrhopening === "moutrhopeningless"
                      }
                      onChange={handleInputChange}
                    />
                    &gt; 2 Finger breadths
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="moutrhopeninggreater">
                    <input
                      type="radio"
                      id="moutrhopeninggreater"
                      name="moutrhopening"
                      value="moutrhopeninggreater"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.moutrhopening === "moutrhopeninggreater"
                      }
                      onChange={handleInputChange}
                    />
                    &lt; 2 Finger breadths
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Mallampatti Grade<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head wfre6567ty">
                <div className="radio_Nurse_ot2 errvmmklpee4">
                  <label htmlFor="mallampattiGradeI">
                    <input
                      type="radio"
                      id="mallampattiGradeI"
                      name="mallampattiGrade"
                      value="I"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.mallampattiGrade === "I"}
                      onChange={handleInputChange}
                    />
                    I
                  </label>
                </div>
                <div className="radio_Nurse_ot2 errvmmklpee4">
                  <label htmlFor="mallampattiGradeII">
                    <input
                      type="radio"
                      id="mallampattiGradeII"
                      name="mallampattiGrade"
                      value="II"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.mallampattiGrade === "II"}
                      onChange={handleInputChange}
                    />
                    II{" "}
                  </label>
                </div>
                <div className="radio_Nurse_ot2 errvmmklpee4">
                  <label htmlFor="mallampattiGradeIII">
                    <input
                      type="radio"
                      id="mallampattiGradeIII"
                      name="mallampattiGrade"
                      value="III"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.mallampattiGrade === "III"}
                      onChange={handleInputChange}
                    />
                    III{" "}
                  </label>
                </div>
                <div className="radio_Nurse_ot2 errvmmklpee4">
                  <label htmlFor="mallampattiGradeIV">
                    <input
                      type="radio"
                      id="mallampattiGradeIV"
                      name="mallampattiGrade"
                      value="IV"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.mallampattiGrade === "IV"}
                      onChange={handleInputChange}
                    />
                    IV{" "}
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="OSAScore">
                OSA Score<span>:</span>
              </label>
              <input
                type="text"
                id="OSAScore"
                name="OSAScore"
                value={preNurseInputs.OSAScore}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Functional Limitation<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="functionalLimitationYes">
                    <input
                      type="radio"
                      id="functionalLimitationYes"
                      name="functionalLimitation"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.functionalLimitation === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="functionalLimitationNo">
                    <input
                      type="radio"
                      id="functionalLimitationNo"
                      name="functionalLimitation"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.functionalLimitation === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            {preNurseInputs.functionalLimitation === "Yes" && (
              <div className="RegisForm_1">
                <label htmlFor="nyhaGrade">
                  NYHA Grade<span>:</span>
                </label>
                <div className="radio_Nurse_ot2_head wfre6567ty">
                  <div className="radio_Nurse_ot2 errvmmklpee4">
                    <label htmlFor="GradeIradio">
                      <input
                        type="radio"
                        id="GradeIradio"
                        name="NYHAGrade"
                        value="GradeI"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.NYHAGrade === "GradeI"}
                        onChange={handleInputChange}
                      />
                      I
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2 errvmmklpee4">
                    <label htmlFor="GradeIIradio">
                      <input
                        type="radio"
                        id="GradeIIradio"
                        name="NYHAGrade"
                        value="GradeII"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.NYHAGrade === "GradeII"}
                        onChange={handleInputChange}
                      />
                      II
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2 errvmmklpee4">
                    <label htmlFor="GradeIIIradio">
                      <input
                        type="radio"
                        id="GradeIIIradio"
                        name="NYHAGrade"
                        value="GradeIII"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.NYHAGrade === "GradeIII"}
                        onChange={handleInputChange}
                      />
                      III
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2 errvmmklpee4">
                    <label htmlFor="GradeIVradio">
                      <input
                        type="radio"
                        id="GradeIVradio"
                        name="NYHAGrade"
                        value="GradeIV"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.NYHAGrade === "GradeIV"}
                        onChange={handleInputChange}
                      />
                      IV
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="RegisForm_1">
              <label>
                Mento-Hyoid Distance<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="mentoHyoidDistanceGreater">
                    <input
                      type="radio"
                      id="mentoHyoidDistanceGreater"
                      name="mentoHyoidDistance"
                      value="greaterThan4cm"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.mentoHyoidDistance === "greaterThan4cm"
                      }
                      onChange={handleInputChange}
                    />
                    &gt; 4cm
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="mentoHyoidDistanceLesser">
                    <input
                      type="radio"
                      id="mentoHyoidDistanceLesser"
                      name="mentoHyoidDistance"
                      value="lessThan4cm"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.mentoHyoidDistance === "lessThan4cm"
                      }
                      onChange={handleInputChange}
                    />
                    &lt; 4cm
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                Neck Movements<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="neckMovementsNormal">
                    <input
                      type="radio"
                      id="neckMovementsNormal"
                      name="neckMovements"
                      value="neckMovementsNormal"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.neckMovements === "neckMovementsNormal"
                      }
                      onChange={handleInputChange}
                    />
                    Normal
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="neckMovementsRestricted">
                    <input
                      type="radio"
                      id="neckMovementsRestricted"
                      name="neckMovements"
                      value="neckMovementsRestricted"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.neckMovements ===
                        "neckMovementsRestricted"
                      }
                      onChange={handleInputChange}
                    />
                    Restricted
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="neckCircumference">
                Neck Circumference<span>:</span>
              </label>
              <input
                type="text"
                id="neckCircumference"
                name="neckCircumference"
                value={preNurseInputs.neckCircumference}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="pulse">
                Pulse<span>:</span>
              </label>
              <input
                type="text"
                id="pulse"
                name="pulse"
                value={preNurseInputs.pulse}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="bp">
                BP<span>:</span>
              </label>
              <input
                type="text"
                id="bp"
                name="bp"
                value={preNurseInputs.bp}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="RegisForm_1">
              <label htmlFor="rr">
                RR<span>:</span>
              </label>
              <input
                type="text"
                id="rr"
                name="rr"
                value={preNurseInputs.rr}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Temperature<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="afebrile">
                    <input
                      type="radio"
                      id="afebrile"
                      name="temperature"
                      value="Afebrile"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.temperature === "Afebrile"}
                      onChange={handleInputChange}
                    />
                    Afebrile
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="febrile">
                    <input
                      type="radio"
                      id="febrile"
                      name="temperature"
                      value="Febrile"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.temperature === "Febrile"}
                      onChange={handleInputChange}
                    />
                    Febrile
                  </label>
                </div>
              </div>
            </div>
            <div className="RegisForm_1">
              <label htmlFor="weight">
                Weight (Kg)<span>:</span>
              </label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={preNurseInputs.weight}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="RegisForm_1">
              <label>
                CVS<span>:</span>
              </label>

              <textarea
                id="CVS"
                name="CVS"
                value={preNurseInputs.CVS}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="RegisForm_1">
              <label>
                RS<span>:</span>
              </label>

              <textarea
                id="RS"
                name="RS"
                value={preNurseInputs.RS}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="RegisForm_1">
              <label>
                GIT<span>:</span>
              </label>

              <textarea
                id="GIT"
                name="GIT"
                value={preNurseInputs.GIT}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="RegisForm_1">
              <label>
                CNS<span>:</span>
              </label>

              <textarea
                id="CNS"
                name="CNS"
                value={preNurseInputs.CNS}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="breathHoldingTime">
                Breath Holding Time<span>:</span>
              </label>
              <input
                type="time"
                id="breathHoldingTime"
                name="breathHoldingTime"
                value={preNurseInputs.breathHoldingTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="breathHoldingTime">
                Effort Tolerance<span>:</span>
              </label>
              <input
                type="text"
                id="effortTolerance"
                name="effortTolerance"
                value={preNurseInputs.effortTolerance}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="breathHoldingTime">
                Other Relevant Findings<span>:</span>
              </label>
              <input
                type="text"
                id="otherRelevantFindings"
                name="otherRelevantFindings"
                value={preNurseInputs.otherRelevantFindings}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <br />
          <br />
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
            Investigations
          </h4>
          <br />
          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="Hb">
                Hb %<span>:</span>
              </label>
              <input
                type="text"
                id="Hb"
                name="Hb"
                value={preNurseInputs.Hb}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="RegisForm_1">
              <label htmlFor="tc">
                TC %<span>:</span>
              </label>
              <input
                type="text"
                id="tc"
                name="tc"
                value={preNurseInputs.tc}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="dc">
                DC<span>:</span>
              </label>
              <input
                type="text"
                id="dc"
                name="dc"
                value={preNurseInputs.dc}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="plateletCount">
                Platelet Count<span>:</span>
              </label>
              <input
                type="text"
                id="plateletCount"
                name="plateletCount"
                value={preNurseInputs.plateletCount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="bloodSugar">
                Blood Sugar (mg%)<span>:</span>
              </label>
              <input
                type="text"
                id="bloodSugar"
                name="bloodSugar"
                value={preNurseInputs.bloodSugar}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="serumCreatinine">
                Serum Creatinine<span>:</span>
              </label>
              <input
                type="text"
                id="serumCreatinine"
                name="serumCreatinine"
                value={preNurseInputs.serumCreatinine}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="bun">
                BUN<span>:</span>
              </label>
              <input
                type="text"
                id="bun"
                name="bun"
                value={preNurseInputs.bun}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="serumElectrolytes">
                Serum Electrolytes<span>:</span>
              </label>
              <input
                type="text"
                id="serumElectrolytes"
                name="serumElectrolytes"
                value={preNurseInputs.serumElectrolytes}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="hbsAgHiv">
                HBsAg / HIV<span>:</span>
              </label>
              <input
                type="text"
                id="hbsAgHiv"
                name="hbsAgHiv"
                value={preNurseInputs.hbsAgHiv}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="letSbilirubin">
                LET S.bilirubin<span>:</span>
              </label>
              <input
                type="text"
                id="letSbilirubin"
                name="letSbilirubin"
                value={preNurseInputs.letSbilirubin}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="totalProtein">
                Total Protein<span>:</span>
              </label>
              <input
                type="text"
                id="totalProtein"
                name="totalProtein"
                value={preNurseInputs.totalProtein}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="alb">
                Alb<span>:</span>
              </label>
              <input
                type="text"
                id="alb"
                name="alb"
                value={preNurseInputs.alb}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="sgpt">
                SGPT<span>:</span>
              </label>
              <input
                type="text"
                id="sgpt"
                name="sgpt"
                value={preNurseInputs.sgpt}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="sgot">
                SGOT<span>:</span>
              </label>
              <input
                type="text"
                id="sgot"
                name="sgot"
                value={preNurseInputs.sgot}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="bloodGroupingTyping">
                Blood Grouping & Typing<span>:</span>
              </label>
              <input
                type="text"
                id="bloodGroupingTyping"
                name="bloodGroupingTyping"
                value={preNurseInputs.bloodGroupingTyping}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="pt">
                PT<span>:</span>
              </label>
              <input
                type="text"
                id="pt"
                name="pt"
                value={preNurseInputs.pt}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="inr">
                INR<span>:</span>
              </label>
              <input
                type="text"
                id="inr"
                name="inr"
                value={preNurseInputs.inr}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="ptt">
                PTT<span>:</span>
              </label>
              <input
                type="text"
                id="ptt"
                name="ptt"
                value={preNurseInputs.ptt}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
</div>
<br />
          <br />

          <div className="jdcneuir8o34di">
            <div className="RegisForm_1 swsxwdef7ujn">
              <label htmlFor="ecg">
                ECG<span>:</span>
              </label>
              <textarea
                id="ecg"
                name="ecg"
                value={preNurseInputs.ecg}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1 swsxwdef7ujn">
              <label htmlFor="xRayChest">
                X-Ray Chest<span>:</span>
              </label>
              <textarea
                id="xRayChest"
                name="xRayChest"
                value={preNurseInputs.xRayChest}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <br />
          <div className="jdcneuir8o34di">
            <div className="RegisForm_1 swsxwdef7ujn">
              <label htmlFor="echo">
                ECHO<span>:</span>
              </label>
              <textarea
                id="echo"
                name="echo"
                value={preNurseInputs.echo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1 swsxwdef7ujn">
              <label
                htmlFor="otherSpecificInvestigations"
                style={{ width: "200px" }}
              >
                Other Specific Investigations<span>:</span>
              </label>
              <textarea
                id="otherSpecificInvestigations"
                name="otherSpecificInvestigations"
                value={preNurseInputs.otherSpecificInvestigations}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <br />
          <br />

          <div className="ewdfhyewuf65">
            <div className="OtMangementForm_1 djkwked675">
              <label htmlFor="typeofAnaesthesiaPlanned">
                Type of Anaesthesia Planned<span>:</span>
              </label>
              <input
                type="text"
                id="typeofAnaesthesiaPlanned"
                name="typeofAnaesthesiaPlanned"
                value={preNurseInputs.typeofAnaesthesiaPlanned}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label>
                Pre-Op Opinion<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox eiuwd7we67657887">
                <label htmlFor="fitCheckbox">
                  <input
                    type="checkbox"
                    id="fitCheckbox"
                    name="preOpOpinion"
                    value="Fit"
                    checked={preNurseInputs.preOpOpinion === "Fit"}
                    onChange={handleInputChange}
                  />
                  <span>Fit</span>
                </label>
                <label htmlFor="unfitCheckbox">
                  <input
                    type="checkbox"
                    id="unfitCheckbox"
                    name="preOpOpinion"
                    value="Unfit"
                    checked={preNurseInputs.preOpOpinion === "Unfit"}
                    onChange={handleInputChange}
                  />
                  <span>Unfit</span>
                </label>
                <label htmlFor="reviewCheckbox">
                  <input
                    type="checkbox"
                    id="reviewCheckbox"
                    name="preOpOpinion"
                    value="Review"
                    checked={preNurseInputs.preOpOpinion === "Review"}
                    onChange={handleInputChange}
                  />
                  <span>Review</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label>
                Post Operative Analgesia Planned <span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox eiuwd7we67657887">
                <label htmlFor="OralCheckbox">
                  <input
                    type="checkbox"
                    id="OralCheckbox"
                    name="analgesiaPlanned"
                    value="Oral"
                    checked={preNurseInputs.analgesiaPlanned === "Oral"}
                    onChange={handleInputChange}
                  />
                  <span>Oral</span>
                </label>
                <label htmlFor="IMCheckbox">
                  <input
                    type="checkbox"
                    id="IMCheckbox"
                    name="analgesiaPlanned"
                    value="IM"
                    checked={preNurseInputs.analgesiaPlanned === "IM"}
                    onChange={handleInputChange}
                  />
                  <span>IM</span>
                </label>
                <label htmlFor="EpiduralCheckbox">
                  <input
                    type="checkbox"
                    id="EpiduralCheckbox"
                    name="analgesiaPlanned"
                    value="Epidural"
                    checked={preNurseInputs.analgesiaPlanned === "Epidural"}
                    onChange={handleInputChange}
                  />
                  <span>Epidural</span>
                </label>
                <label htmlFor="BlockCheckbox">
                  <input
                    type="checkbox"
                    id="BlockCheckbox"
                    name="analgesiaPlanned"
                    value="Block"
                    checked={preNurseInputs.analgesiaPlanned === "Block"}
                    onChange={handleInputChange}
                  />
                  <span>Block</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label>
                ASA CATEGORY<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox eiuwd7we67657887">
                <label htmlFor="ICategoryCheckbox">
                  <input
                    type="checkbox"
                    id="ICategoryCheckbox"
                    name="ASACategory"
                    value="I"
                    checked={preNurseInputs.ASACategory === "I"}
                    onChange={handleInputChange}
                  />
                  <span>I</span>
                </label>
                <label htmlFor="IICategoryCheckbox">
                  <input
                    type="checkbox"
                    id="IICategoryCheckbox"
                    name="ASACategory"
                    value="II"
                    checked={preNurseInputs.ASACategory === "II"}
                    onChange={handleInputChange}
                  />
                  <span>II</span>
                </label>
                <label htmlFor="IIICategoryCheckbox">
                  <input
                    type="checkbox"
                    id="IIICategoryCheckbox"
                    name="ASACategory"
                    value="III"
                    checked={preNurseInputs.ASACategory === "III"}
                    onChange={handleInputChange}
                  />
                  <span>III</span>
                </label>
                <label htmlFor="IVCategoryCheckbox">
                  <input
                    type="checkbox"
                    id="IVCategoryCheckbox"
                    name="ASACategory"
                    value="IV"
                    checked={preNurseInputs.ASACategory === "IV"}
                    onChange={handleInputChange}
                  />
                  <span>IV</span>
                </label>
                <label htmlFor="VCategoryCheckbox">
                  <input
                    type="checkbox"
                    id="VCategoryCheckbox"
                    name="ASACategory"
                    value="V"
                    checked={preNurseInputs.ASACategory === "V"}
                    onChange={handleInputChange}
                  />
                  <span>V</span>
                </label>
                <label htmlFor="VICategoryCheckbox">
                  <input
                    type="checkbox"
                    id="VICategoryCheckbox"
                    name="ASACategory"
                    value="VI"
                    checked={preNurseInputs.ASACategory === "VI"}
                    onChange={handleInputChange}
                  />
                  <span>VI</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label>
                Anticipated Post Anaesthesia Care<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                <label htmlFor="electiveVentilationCheckbox">
                  <input
                    type="checkbox"
                    id="electiveVentilationCheckbox"
                    name="anticipatednPost"
                    value="electiveVentilation"
                    checked={
                      preNurseInputs.anticipatednPost === "electiveVentilation"
                    }
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Elective Ventilation</span>
                </label>

                <label htmlFor="ICUCareCheckbox">
                  <input
                    type="checkbox"
                    id="ICUCareCheckbox"
                    name="anticipatednPost"
                    value="ICUCare"
                    checked={preNurseInputs.anticipatednPost === "ICUCare"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>ICU Care</span>
                </label>

                <label htmlFor="TransfertoWardCheckbox">
                  <input
                    type="checkbox"
                    id="TransfertoWardCheckbox"
                    name="anticipatednPost"
                    value="TransfertoWard"
                    checked={
                      preNurseInputs.anticipatednPost === "TransfertoWard"
                    }
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Transfer to Ward</span>
                </label>
              </div>
            </div>
          </div>

          <br />

          <br />

          <div className="ewdfhyewuf65">
            <div className="OtMangementForm_1 ">
              <label>
                Nil By Mouth<span>:</span>
              </label>
              <input
                type="text"
                id="nilByMouth"
                name="nilByMouth"
                value={preNurseInputs.nilByMouth}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="OtMangementForm_1 ">
              <label>
                Units of Blood Reserved<span>:</span>
              </label>
              <input
                type="text"
                id="bloodReserved"
                name="bloodReserved"
                value={preNurseInputs.bloodReserved}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1 euiwd6745q3">
              <label>
                Premedication<span>:</span>
              </label>

              <textarea
                id="premedication"
                name="premedication"
                value={preNurseInputs.premedication}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="RegisForm_1 euiwd6745q3">
              <label>
                Other Specific Instructions<span>:</span>
              </label>

              <textarea
                id="preOtherInstructionsSpecific"
                name="preOtherInstructionsSpecific"
                value={preNurseInputs.preOtherInstructionsSpecific}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="OtMangementForm_1 ">
              <label>
                Name<span>:</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={preNurseInputs.name}
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
                value={preNurseInputs.Date}
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
                value={preNurseInputs.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <br />
          <div className="sigCanvas2_head11">
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
       
          <br />
        </div>
            </div>
          </PrintContent>

          {/* Display PDF if generated */}
        </>
      )}

      {/* {pdfBlob && (
        <div className="pdf-preview">
          <h2>PDF Preview</h2>
          <embed src={URL.createObjectURL(pdfBlob)} type="application/pdf" />
        </div>
      )} */}
    </>
  );
}

export default OtAnaesthesiaPre;




