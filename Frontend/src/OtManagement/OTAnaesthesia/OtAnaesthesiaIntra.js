import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
// import jsPDF from "jspdf";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useDispatch, useSelector } from "react-redux";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";


const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

function OtAnaesthesiaIntra() {
  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const dispatchvalue = useDispatch();

  const [preNurseInputs, setPreNurseInputs] = useState({
    name: "",
    anaesthesiaPlan: "",
    procedureSurgery: "",
    anaesthesiaEquipment: "",
    knownAllergy: "",
    difficultAirway: "",
    assistanceAvaiable: "",
    aspirationRisk: "",
    riskofBloodLoss: "",

    hr: "",
    bp: "",
    spotwo: "",
    rr: "",

    airways: "",
    TypeAirways: "",
    sizeAirways: "",
    cuffAirways: "",
    clGrade: "",
    attempts: "",
    intubation: "",
    ventilation: "",
    Vt: "",
    RR: "",
    MV: "",
    PIP: "",
    PEEP: "",
    TDV: "",
    ERatio: "",
    Mode: "",
    circuit: "",
    MAP: "",
    TourniquetApplied: "",
    TourniquetRemoved: "",

    RegionalTechnique: "",
    needle: "",
    space: "",
    drug: "",
    onsetAction: "",
    sensoryLevel: "",
    EA: "",
    testDose: "",

    LocalAnesthesia: "",
    TopicalAnesthesia: "",

    Intraverous: false,
    IntraMuscular: false,
    Intrathecal: false,
    Inhalational: false,

    pressurePoints: "",
    eyesCovered: "",
    throatPack: "",
    throatPackInsRem: "",

    IntraOperativeEvents: "",

    nameFulledBy:"",
    Date:"",
    time:"",

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

  return (
    <>
      {isPrintButtonVisible ? (
        <div className="appointment ">
          <br />
          
          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="name">
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

            <div className="RegisForm_1 ">
              <label>
                Anaesthesia Plan<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head dsewwsdw3qqqs2">
                <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqw">
                  <label htmlFor="GA">
                    <input
                      type="checkbox"
                      id="GA"
                      name="anaesthesiaPlan"
                      value="GA"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.anaesthesiaPlan === "GA"}
                      onChange={handleInputChange}
                    />
                    G. A
                  </label>
                </div>
                <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqw">
                  <label htmlFor="SA">
                    <input
                      type="checkbox"
                      id="SA"
                      name="anaesthesiaPlan"
                      value="SA"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.anaesthesiaPlan === "SA"}
                      onChange={handleInputChange}
                    />
                    S. A
                  </label>
                </div>
                <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqw">
                  <label htmlFor="EA">
                    <input
                      type="checkbox"
                      id="EA"
                      name="anaesthesiaPlan"
                      value="EA"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.anaesthesiaPlan === "EA"}
                      onChange={handleInputChange}
                    />
                    E. A
                  </label>
                </div>
                <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqw">
                  <label htmlFor="NB">
                    <input
                      type="checkbox"
                      id="NB"
                      name="anaesthesiaPlan"
                      value="NB"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.anaesthesiaPlan === "NB"}
                      onChange={handleInputChange}
                    />
                    N. B
                  </label>
                </div>
                <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqw wqxwxsio87">
                  <label htmlFor="MACIVSedation">
                    <input
                      type="checkbox"
                      id="MACIVSedation"
                      name="anaesthesiaPlan"
                      value="MACIVSedation"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.anaesthesiaPlan === "MACIVSedation"
                      }
                      onChange={handleInputChange}
                    />
                    MAC I.V. Sedation
                  </label>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className="RegisFormcon wsdsceew">
            <div className="RegisForm_1 euiwd6745q3">
              <label>
                Procedure / Surgery<span>:</span>
              </label>

              <textarea
                id="procedureSurgery"
                name="procedureSurgery"
                value={preNurseInputs.procedureSurgery}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <br />
          <br />
          
          <div className="RegisFormcon wsdsceew">
            <div className="RegisForm_1 ">
              <label style={{ width: "250px" }}>
                Anaesthesia Machine Equipment Check Completed<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="anaesthesiaEquipment">
                    <input
                      type="checkbox"
                      id="anaesthesiaEquipment"
                      name="anaesthesiaEquipment"
                      checked={preNurseInputs.anaesthesiaEquipment}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1 ">
              <label style={{ width: "250px" }}>
                Pulse Oximeter on Patient and Functioning<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="pulseOximeter">
                    <input
                      type="checkbox"
                      id="pulseOximeter"
                      name="pulseOximeter"
                      checked={preNurseInputs.pulseOximeter}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className="RegisFormcon" style={{justifyContent:'center'}}>
            <div className="RegisForm_1">
              <label >
                Does Patient Have a Known Allergy <span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="knownAllergyYes">
                    <input
                      type="radio"
                      id="knownAllergyYes"
                      name="knownAllergy"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.knownAllergy === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="knownAllergyNo">
                    <input
                      type="radio"
                      id="knownAllergyNo"
                      name="knownAllergy"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.knownAllergy === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label >
                Difficult Airway <span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="difficultAirwayYes">
                    <input
                      type="radio"
                      id="difficultAirwayYes"
                      name="difficultAirway"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.difficultAirway === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="difficultAirwayNo">
                    <input
                      type="radio"
                      id="difficultAirwayNo"
                      name="difficultAirway"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.difficultAirway === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            {preNurseInputs.difficultAirway === "Yes" && (
              <div className="RegisForm_1">
                <label >
                  If Yes, Equipment & Assistance Available <span>:</span>
                </label>
                <div className="radio_Nurse_ot2_head">
                  <div className="radio_Nurse_ot2">
                    <label htmlFor="assistanceAvaiableYes">
                      <input
                        type="radio"
                        id="assistanceAvaiableYes"
                        name="assistanceAvaiable"
                        value="Yes"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.assistanceAvaiable === "Yes"}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2">
                    <label htmlFor="assistanceAvaiableNo">
                      <input
                        type="radio"
                        id="assistanceAvaiableNo"
                        name="assistanceAvaiable"
                        value="No"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.assistanceAvaiable === "No"}
                        onChange={handleInputChange}
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="RegisForm_1">
              <label >
                Aspiration Risk <span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="aspirationRiskYes">
                    <input
                      type="radio"
                      id="aspirationRiskYes"
                      name="aspirationRisk"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.aspirationRisk === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="aspirationRiskNo">
                    <input
                      type="radio"
                      id="aspirationRiskNo"
                      name="aspirationRisk"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.aspirationRisk === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label >
                Risk of Blood Loss <span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="riskofBloodLossYes">
                    <input
                      type="radio"
                      id="riskofBloodLossYes"
                      name="riskofBloodLoss"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.riskofBloodLoss === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="riskofBloodLossNo">
                    <input
                      type="radio"
                      id="riskofBloodLossNo"
                      name="riskofBloodLoss"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.riskofBloodLoss === "No"}
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
            Anaesthesia Assessment Before Induction (not earlier than 15 mins
            before Induction)
          </h4>
          <br />

          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="hr">
                H. R. <span>:</span>
              </label>
              <input
                type="text"
                id="hr"
                name="hr"
                value={preNurseInputs.hr}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="bp">
                B. P. <span>:</span>
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
              <label htmlFor="spotwo">
                SPO2 <span>:</span>
              </label>
              <input
                type="text"
                id="spotwo"
                name="spotwo"
                value={preNurseInputs.spotwo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="rr">
                R. R. <span>:</span>
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
            Types of Anaesthesia
          </h4>

          <h5
            style={{
              color: "var(--labelcolor)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "start",
              padding: "10px",
            }}
          >
            General Anaesthesia
          </h5>
          <br />

          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="name">
                Airways<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2 wedsd367809">
                  <label htmlFor="airwaysMask">
                    <input
                      type="radio"
                      id="airwaysMask"
                      name="airways"
                      value="airwaysMask"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.airways === "airwaysMask"}
                      onChange={handleInputChange}
                    />
                    Mask
                  </label>
                </div>
                <div className="radio_Nurse_ot2 wedsd367809">
                  <label htmlFor="airwaysSGA">
                    <input
                      type="radio"
                      id="airwaysSGA"
                      name="airways"
                      value="airwaysSGA"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.airways === "airwaysSGA"}
                      onChange={handleInputChange}
                    />
                    SGA
                  </label>
                </div>
                <div className="radio_Nurse_ot2 wedsd367809">
                  <label htmlFor="airwaysETT">
                    <input
                      type="radio"
                      id="airwaysETT"
                      name="airways"
                      value="airwaysETT"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.airways === "airwaysETT"}
                      onChange={handleInputChange}
                    />
                    ETT
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="TypeAirways">
                Type<span>:</span>
              </label>
              <input
                type="text"
                id="TypeAirways"
                name="TypeAirways"
                value={preNurseInputs.TypeAirways}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="sizeAirways">
                Size<span>:</span>
              </label>
              <input
                type="text"
                id="sizeAirways"
                name="sizeAirways"
                value={preNurseInputs.sizeAirways}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="RegisForm_1">
              <label htmlFor="cuffAirways">
                Cuff<span>:</span>
              </label>
              <input
                type="text"
                id="cuffAirways"
                name="cuffAirways"
                value={preNurseInputs.cuffAirways}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="clGrade">
                CL Grade<span>:</span>
              </label>
              <input
                type="text"
                id="clGrade"
                name="clGrade"
                value={preNurseInputs.clGrade}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="attempts">
                Attempts<span>:</span>
              </label>
              <input
                type="text"
                id="attempts"
                name="attempts"
                value={preNurseInputs.attempts}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="name">
                Intubation<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="intubationNasal">
                    <input
                      type="radio"
                      id="intubationNasal"
                      name="intubation"
                      value="Nasal"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.intubation === "Nasal"}
                      onChange={handleInputChange}
                    />
                    Nasal
                  </label>
                </div>
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="intubationOral">
                    <input
                      type="radio"
                      id="intubationOral"
                      name="intubation"
                      value="Oral"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.intubation === "Oral"}
                      onChange={handleInputChange}
                    />
                    Oral
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="name">
                Ventilation<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head wqxxxzzxx2ed">
                <div className="radio_Nurse_ot2 wqxxxzzxx2">
                  <label htmlFor="controlled">
                    <input
                      type="checkbox"
                      id="controlled"
                      name="ventilation"
                      value="controlled"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.ventilation === "controlled"}
                      onChange={handleInputChange}
                    />
                    Controlled
                  </label>
                </div>
                <div className="radio_Nurse_ot2 wqxxxzzxx2">
                  <label htmlFor="spontaneous">
                    <input
                      type="checkbox"
                      id="spontaneous"
                      name="ventilation"
                      value="spontaneous"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.ventilation === "spontaneous"}
                      onChange={handleInputChange}
                    />
                    Spontaneous
                  </label>
                </div>
                <div className="radio_Nurse_ot2 wqxxxzzxx2">
                  <label htmlFor="assisted">
                    <input
                      type="checkbox"
                      id="assisted"
                      name="ventilation"
                      value="assisted"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.ventilation === "assisted"}
                      onChange={handleInputChange}
                    />
                    Assisted
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="Vt">
                Vt<span>:</span>
              </label>
              <input
                type="text"
                id="Vt"
                name="Vt"
                value={preNurseInputs.Vt}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="RR">
                RR<span>:</span>
              </label>
              <input
                type="text"
                id="RR"
                name="RR"
                value={preNurseInputs.RR}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="MV">
                MV<span>:</span>
              </label>
              <input
                type="text"
                id="MV"
                name="MV"
                value={preNurseInputs.MV}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="PIP">
                PIP<span>:</span>
              </label>
              <input
                type="text"
                id="PIP"
                name="PIP"
                value={preNurseInputs.PIP}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="PEEP">
                PEEP<span>:</span>
              </label>
              <input
                type="text"
                id="PEEP"
                name="PEEP"
                value={preNurseInputs.PEEP}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="TDV">
                TDV<span>:</span>
              </label>
              <input
                type="text"
                id="TDV"
                name="TDV"
                value={preNurseInputs.TDV}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="ERatio">
                1:E Ratio<span>:</span>
              </label>
              <input
                type="text"
                id="ERatio"
                name="ERatio"
                value={preNurseInputs.ERatio}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="Mode">
                Mode<span>:</span>
              </label>
              <input
                type="text"
                id="Mode"
                name="Mode"
                value={preNurseInputs.Mode}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="name">
                Circuit<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="Circlecircuit">
                    <input
                      type="radio"
                      id="Circlecircuit"
                      name="circuit"
                      value="Circle"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.circuit === "Circle"}
                      onChange={handleInputChange}
                    />
                    Circle
                  </label>
                </div>
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="circuitJR">
                    <input
                      type="radio"
                      id="circuitJR"
                      name="circuit"
                      value="JR"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.circuit === "JR"}
                      onChange={handleInputChange}
                    />
                    JR
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="MAP">
                MAP<span>:</span>
              </label>
              <input
                type="text"
                id="MAP"
                name="MAP"
                value={preNurseInputs.MAP}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="TourniquetApplied">
                Tourniquet Applied at<span>:</span>
              </label>
              <input
                type="text"
                id="TourniquetApplied"
                name="TourniquetApplied"
                value={preNurseInputs.TourniquetApplied}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="TourniquetRemoved">
                Tourniquet Removed at<span>:</span>
              </label>
              <input
                type="text"
                id="TourniquetRemoved"
                name="TourniquetRemoved"
                value={preNurseInputs.TourniquetRemoved}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <br />

          <h5
            style={{
              color: "var(--labelcolor)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "start",
              padding: "10px",
            }}
          >
            Regional Anaesthesia
          </h5>
          <br />

          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="name">
                Technique<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head dsewwsdw32">
                <div className="radio_Nurse_ot2  vvbvcxxzas">
                  <label htmlFor="RegionalSpinal">
                    <input
                      type="checkbox"
                      id="RegionalSpinal"
                      name="RegionalTechnique"
                      value="Spinal"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.RegionalTechnique === "Spinal"}
                      onChange={handleInputChange}
                    />
                    Spinal
                  </label>
                </div>
                <div className="radio_Nurse_ot2  vvbvcxxzas">
                  <label htmlFor="RegionalEpidural">
                    <input
                      type="checkbox"
                      id="RegionalEpidural"
                      name="RegionalTechnique"
                      value="Epidural"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.RegionalTechnique === "Epidural"}
                      onChange={handleInputChange}
                    />
                    Epidural
                  </label>
                </div>
                <div className="radio_Nurse_ot2  vvbvcxxzas">
                  <label htmlFor="RegionalCombinedSpinalEpidural">
                    <input
                      type="checkbox"
                      id="RegionalCombinedSpinalEpidural"
                      name="RegionalTechnique"
                      value="CombinedSpinalEpidural"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.RegionalTechnique ===
                        "CombinedSpinalEpidural"
                      }
                      onChange={handleInputChange}
                    />
                    Combined Spinal Epidural
                  </label>
                </div>
                <div className="radio_Nurse_ot2  vvbvcxxzas">
                  <label htmlFor="RegionallllNeverBlock">
                    <input
                      type="checkbox"
                      id="RegionallllNeverBlock"
                      name="RegionalTechnique"
                      value="RegionalNeverBlock"
                      className="radio_Nurse_ot2_input"
                      checked={
                        preNurseInputs.RegionalTechnique ===
                        "RegionalNeverBlock"
                      }
                      onChange={handleInputChange}
                    />
                    Never Block
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="needle">
                Needle<span>:</span>
              </label>
              <input
                type="text"
                id="needle"
                name="needle"
                value={preNurseInputs.needle}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="space">
                Space<span>:</span>
              </label>
              <input
                type="text"
                id="space"
                name="space"
                value={preNurseInputs.space}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="drug">
                Drug<span>:</span>
              </label>
              <input
                type="text"
                id="drug"
                name="drug"
                value={preNurseInputs.drug}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="onsetAction">
                Onset of Action<span>:</span>
              </label>
              <input
                type="text"
                id="onsetAction"
                name="onsetAction"
                value={preNurseInputs.onsetAction}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="sensoryLevel">
                Sensory Level<span>:</span>
              </label>
              <input
                type="text"
                id="sensoryLevel"
                name="sensoryLevel"
                value={preNurseInputs.sensoryLevel}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="sensoryLevel">
                Sensory Level<span>:</span>
              </label>
              <input
                type="text"
                id="sensoryLevel"
                name="sensoryLevel"
                value={preNurseInputs.sensoryLevel}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="sensoryLevel">
                Motor Level<span>:</span>
              </label>
              <input
                type="text"
                id="sensoryLevel"
                name="sensoryLevel"
                value={preNurseInputs.sensoryLevel}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="name">
                EA<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="EANeedle">
                    <input
                      type="radio"
                      id="EANeedle"
                      name="EA"
                      value="EANeedle"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.EA === "EANeedle"}
                      onChange={handleInputChange}
                    />
                    Needle
                  </label>
                </div>
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="CatheterEA">
                    <input
                      type="radio"
                      id="CatheterEA"
                      name="EA"
                      value="Catheter"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.EA === "Catheter"}
                      onChange={handleInputChange}
                    />
                    Catheter
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="testDose">
                Test Dose<span>:</span>
              </label>
              <input
                type="text"
                id="testDose"
                name="testDose"
                value={preNurseInputs.testDose}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <br />

          <div className="RegisFormcon">
            <div className="RegisForm_1 euiwd6745q3">
              <label htmlFor="LocalAnesthesia">
                Local Anesthesia<span>:</span>
              </label>

              <textarea
                id="LocalAnesthesia"
                name="LocalAnesthesia"
                value={preNurseInputs.LocalAnesthesia}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="RegisForm_1 euiwd6745q3">
              <label htmlFor="TopicalAnesthesia">
                Topical Anesthesia<span>:</span>
              </label>

              <textarea
                id="TopicalAnesthesia"
                name="TopicalAnesthesia"
                value={preNurseInputs.TopicalAnesthesia}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <br />

          <div className="RegisFormcon wsdsceew">
            <div className="RegisForm_1 wsdsceew_33">
              <label htmlFor="Intraverous">
                Intravenous<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="Intraverous">
                    <input
                      type="checkbox"
                      id="Intraverous"
                      name="Intraverous"
                      checked={preNurseInputs.Intraverous}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1 wsdsceew_33">
              <label htmlFor="IntraMuscular">
                Intra Muscular<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="IntraMuscular">
                    <input
                      type="checkbox"
                      id="IntraMuscular"
                      name="IntraMuscular"
                      checked={preNurseInputs.IntraMuscular}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1 wsdsceew_33">
              <label htmlFor="Intrathecal">
                Intrathecal<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="Intrathecal">
                    <input
                      type="checkbox"
                      id="Intrathecal"
                      name="Intrathecal"
                      checked={preNurseInputs.Intrathecal}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1 wsdsceew_33">
              <label htmlFor="Inhalational">
                Inhalational<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="Inhalational">
                    <input
                      type="checkbox"
                      id="Inhalational"
                      name="Inhalational"
                      checked={preNurseInputs.Inhalational}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="RegisFormcon" style={{justifyContent:'center'}}>
            <div className="RegisForm_1">
              <label htmlFor="name">
                Pressure Points - Padded<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="pressurePointsYes">
                    <input
                      type="radio"
                      id="pressurePointsYes"
                      name="pressurePoints"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.pressurePoints === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="pressurePointsNo">
                    <input
                      type="radio"
                      id="pressurePointsNo"
                      name="pressurePoints"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.pressurePoints === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="name">
                Eyes : Covered<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="eyesCoveredYes">
                    <input
                      type="radio"
                      id="eyesCoveredYes"
                      name="eyesCovered"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.eyesCovered === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="eyesCoveredNo">
                    <input
                      type="radio"
                      id="eyesCoveredNo"
                      name="eyesCovered"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.eyesCovered === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="name">
                Throat Pack<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="throatPackYes">
                    <input
                      type="radio"
                      id="throatPackYes"
                      name="throatPack"
                      value="Yes"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.throatPack === "Yes"}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2 ">
                  <label htmlFor="throatPackNo">
                    <input
                      type="radio"
                      id="throatPackNo"
                      name="throatPack"
                      value="No"
                      className="radio_Nurse_ot2_input"
                      checked={preNurseInputs.throatPack === "No"}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            {preNurseInputs.throatPack === "Yes" && (
              <>
                <div className="RegisForm_1">
                  <label htmlFor="name">
                    Pack<span>:</span>
                  </label>
                  <div className="radio_Nurse_ot2 wwssqqqw1z">
                    <label htmlFor="Inserted">
                      <input
                        type="checkbox"
                        id="Inserted"
                        name="throatPackInsRem"
                        value="Inserted"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.throatPackInsRem === "Inserted"}
                        onChange={handleInputChange}
                      />
                      Inserted
                    </label>
                  </div>

                  <div className="radio_Nurse_ot2 wwssqqqw1z">
                    <label htmlFor="Removed">
                      <input
                        type="checkbox"
                        id="Removed"
                        name="throatPackInsRem"
                        value="Removed"
                        className="radio_Nurse_ot2_input"
                        checked={preNurseInputs.throatPackInsRem === "Removed"}
                        onChange={handleInputChange}
                      />
                      Removed
                    </label>
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="RegisForm_1 euiwd6745q3">
              <label htmlFor="IntraOperativeEvents">
                Intra Operative Events<span>:</span>
              </label>

              <textarea
                id="IntraOperativeEvents"
                name=" IntraOperativeEvents"
                value={preNurseInputs.IntraOperativeEvents}
                onChange={handleInputChange}
              ></textarea>
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
                value={preNurseInputs.nameFulledBy}
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
              <div className="RegisFormcon wsdsceew">
                <div className="RegisForm_1">
                  <label htmlFor="name">
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

                <div className="RegisForm_1">
                  <label>
                    Anaesthesia Plan<span>:</span>
                  </label>
                  <div className="radio_Nurse_ot2_head dsewwsdw3qqqs2">
                    <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqw">
                      <label htmlFor="GA">
                        <input
                          type="checkbox"
                          id="GA"
                          name="anaesthesiaPlan"
                          value="GA"
                          className="radio_Nurse_ot2_input"
                          checked={preNurseInputs.anaesthesiaPlan === "GA"}
                          onChange={handleInputChange}
                        />
                        G. A
                      </label>
                    </div>
                    <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqw">
                      <label htmlFor="SA">
                        <input
                          type="checkbox"
                          id="SA"
                          name="anaesthesiaPlan"
                          value="SA"
                          className="radio_Nurse_ot2_input"
                          checked={preNurseInputs.anaesthesiaPlan === "SA"}
                          onChange={handleInputChange}
                        />
                        S. A
                      </label>
                    </div>
                    <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqw">
                      <label htmlFor="EA">
                        <input
                          type="checkbox"
                          id="EA"
                          name="anaesthesiaPlan"
                          value="EA"
                          className="radio_Nurse_ot2_input"
                          checked={preNurseInputs.anaesthesiaPlan === "EA"}
                          onChange={handleInputChange}
                        />
                        E. A
                      </label>
                    </div>
                    <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqw">
                      <label htmlFor="NB">
                        <input
                          type="checkbox"
                          id="NB"
                          name="anaesthesiaPlan"
                          value="NB"
                          className="radio_Nurse_ot2_input"
                          checked={preNurseInputs.anaesthesiaPlan === "NB"}
                          onChange={handleInputChange}
                        />
                        N. B
                      </label>
                    </div>
                    <div className="radio_Nurse_ot2 vvbvcxxzaswwqqqqw wqxwxsio87">
                      <label htmlFor="MACIVSedation">
                        <input
                          type="checkbox"
                          id="MACIVSedation"
                          name="anaesthesiaPlan"
                          value="MACIVSedation"
                          className="radio_Nurse_ot2_input"
                          checked={
                            preNurseInputs.anaesthesiaPlan === "MACIVSedation"
                          }
                          onChange={handleInputChange}
                        />
                        MAC I.V. Sedation
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="RegisFormcon wsdsceew">
                <div className="RegisForm_1 euiwd6745q3">
                  <label>
                    Procedure / Surgery<span>:</span>
                  </label>

                  <textarea
                    id="procedureSurgery"
                    name="procedureSurgery"
                    value={preNurseInputs.procedureSurgery}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <br />
              <br />
              <div className="RegisFormcon wsdsceew">
                <div className="RegisForm_1 ">
                  <label style={{ width: "250px" }}>
                    Anaesthesia Machine Equipment Check Completed<span>:</span>
                  </label>
                  <div className="radio_Nurse_ot2_head">
                    <div className="radio_Nurse_ot2">
                      <label htmlFor="anaesthesiaEquipment">
                        <input
                          type="checkbox"
                          id="anaesthesiaEquipment"
                          name="anaesthesiaEquipment"
                          checked={preNurseInputs.anaesthesiaEquipment}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="RegisForm_1 ">
                  <label style={{ width: "250px" }}>
                    Pulse Oximeter on Patient and Functioning<span>:</span>
                  </label>
                  <div className="radio_Nurse_ot2_head">
                    <div className="radio_Nurse_ot2">
                      <label htmlFor="pulseOximeter">
                        <input
                          type="checkbox"
                          id="pulseOximeter"
                          name="pulseOximeter"
                          checked={preNurseInputs.pulseOximeter}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="Print_ot_all_div_Third">
                <div className="RegisFormcon">
                  <div className="RegisForm_1">
                    <label style={{ width: "250px" }}>
                      Does Patient Have a Known Allergy <span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head">
                      <div className="radio_Nurse_ot2">
                        <label htmlFor="knownAllergyYes">
                          <input
                            type="radio"
                            id="knownAllergyYes"
                            name="knownAllergy"
                            value="Yes"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.knownAllergy === "Yes"}
                            onChange={handleInputChange}
                          />
                          Yes
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2">
                        <label htmlFor="knownAllergyNo">
                          <input
                            type="radio"
                            id="knownAllergyNo"
                            name="knownAllergy"
                            value="No"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.knownAllergy === "No"}
                            onChange={handleInputChange}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="RegisForm_1">
                    <label style={{ width: "250px" }}>
                      Difficult Airway <span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head">
                      <div className="radio_Nurse_ot2">
                        <label htmlFor="difficultAirwayYes">
                          <input
                            type="radio"
                            id="difficultAirwayYes"
                            name="difficultAirway"
                            value="Yes"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.difficultAirway === "Yes"}
                            onChange={handleInputChange}
                          />
                          Yes
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2">
                        <label htmlFor="difficultAirwayNo">
                          <input
                            type="radio"
                            id="difficultAirwayNo"
                            name="difficultAirway"
                            value="No"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.difficultAirway === "No"}
                            onChange={handleInputChange}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  {preNurseInputs.difficultAirway === "Yes" && (
                    <div className="RegisForm_1">
                      <label style={{ width: "250px" }}>
                        If Yes, Equipment & Assistance Available <span>:</span>
                      </label>
                      <div className="radio_Nurse_ot2_head">
                        <div className="radio_Nurse_ot2">
                          <label htmlFor="assistanceAvaiableYes">
                            <input
                              type="radio"
                              id="assistanceAvaiableYes"
                              name="assistanceAvaiable"
                              value="Yes"
                              className="radio_Nurse_ot2_input"
                              checked={
                                preNurseInputs.assistanceAvaiable === "Yes"
                              }
                              onChange={handleInputChange}
                            />
                            Yes
                          </label>
                        </div>
                        <div className="radio_Nurse_ot2">
                          <label htmlFor="assistanceAvaiableNo">
                            <input
                              type="radio"
                              id="assistanceAvaiableNo"
                              name="assistanceAvaiable"
                              value="No"
                              className="radio_Nurse_ot2_input"
                              checked={
                                preNurseInputs.assistanceAvaiable === "No"
                              }
                              onChange={handleInputChange}
                            />
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="RegisForm_1">
                    <label style={{ width: "250px" }}>
                      Aspiration Risk <span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head">
                      <div className="radio_Nurse_ot2">
                        <label htmlFor="aspirationRiskYes">
                          <input
                            type="radio"
                            id="aspirationRiskYes"
                            name="aspirationRisk"
                            value="Yes"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.aspirationRisk === "Yes"}
                            onChange={handleInputChange}
                          />
                          Yes
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2">
                        <label htmlFor="aspirationRiskNo">
                          <input
                            type="radio"
                            id="aspirationRiskNo"
                            name="aspirationRisk"
                            value="No"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.aspirationRisk === "No"}
                            onChange={handleInputChange}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="RegisForm_1">
                    <label style={{ width: "250px" }}>
                      Risk of Blood Loss <span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head">
                      <div className="radio_Nurse_ot2">
                        <label htmlFor="riskofBloodLossYes">
                          <input
                            type="radio"
                            id="riskofBloodLossYes"
                            name="riskofBloodLoss"
                            value="Yes"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.riskofBloodLoss === "Yes"}
                            onChange={handleInputChange}
                          />
                          Yes
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2">
                        <label htmlFor="riskofBloodLossNo">
                          <input
                            type="radio"
                            id="riskofBloodLossNo"
                            name="riskofBloodLoss"
                            value="No"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.riskofBloodLoss === "No"}
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
                  Anaesthesia Assessment Before Induction (not earlier than 15
                  mins before Induction)
                </h4>
                <br />

                <div className="RegisFormcon">
                  <div className="RegisForm_1">
                    <label htmlFor="hr">
                      H. R. <span>:</span>
                    </label>
                    <input
                      type="text"
                      id="hr"
                      name="hr"
                      value={preNurseInputs.hr}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="bp">
                      B. P. <span>:</span>
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
                    <label htmlFor="spotwo">
                      SPO2 <span>:</span>
                    </label>
                    <input
                      type="text"
                      id="spotwo"
                      name="spotwo"
                      value={preNurseInputs.spotwo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="rr">
                      R. R. <span>:</span>
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
                  Types of Anaesthesia
                </h4>

                <h5
                  style={{
                    color: "var(--labelcolor)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "start",
                    padding: "10px",
                  }}
                >
                  General Anaesthesia
                </h5>
                <br />

                <div className="RegisFormcon">
                  <div className="RegisForm_1">
                    <label htmlFor="name">
                      Airways<span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head">
                      <div className="radio_Nurse_ot2 wedsd367809">
                        <label htmlFor="airwaysMask">
                          <input
                            type="radio"
                            id="airwaysMask"
                            name="airways"
                            value="airwaysMask"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.airways === "airwaysMask"}
                            onChange={handleInputChange}
                          />
                          Mask
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 wedsd367809">
                        <label htmlFor="airwaysSGA">
                          <input
                            type="radio"
                            id="airwaysSGA"
                            name="airways"
                            value="airwaysSGA"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.airways === "airwaysSGA"}
                            onChange={handleInputChange}
                          />
                          SGA
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 wedsd367809">
                        <label htmlFor="airwaysETT">
                          <input
                            type="radio"
                            id="airwaysETT"
                            name="airways"
                            value="airwaysETT"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.airways === "airwaysETT"}
                            onChange={handleInputChange}
                          />
                          ETT
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="TypeAirways">
                      Type<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="TypeAirways"
                      name="TypeAirways"
                      value={preNurseInputs.TypeAirways}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="sizeAirways">
                      Size<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="sizeAirways"
                      name="sizeAirways"
                      value={preNurseInputs.sizeAirways}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="RegisForm_1">
                    <label htmlFor="cuffAirways">
                      Cuff<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="cuffAirways"
                      name="cuffAirways"
                      value={preNurseInputs.cuffAirways}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="clGrade">
                      CL Grade<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="clGrade"
                      name="clGrade"
                      value={preNurseInputs.clGrade}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="attempts">
                      Attempts<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="attempts"
                      name="attempts"
                      value={preNurseInputs.attempts}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="name">
                      Intubation<span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head">
                      <div className="radio_Nurse_ot2 ">
                        <label htmlFor="intubationNasal">
                          <input
                            type="radio"
                            id="intubationNasal"
                            name="intubation"
                            value="Nasal"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.intubation === "Nasal"}
                            onChange={handleInputChange}
                          />
                          Nasal
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 ">
                        <label htmlFor="intubationOral">
                          <input
                            type="radio"
                            id="intubationOral"
                            name="intubation"
                            value="Oral"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.intubation === "Oral"}
                            onChange={handleInputChange}
                          />
                          Oral
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="name">
                      Ventilation<span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head wqxxxzzxx2ed">
                      <div className="radio_Nurse_ot2 wqxxxzzxx2">
                        <label htmlFor="controlled">
                          <input
                            type="checkbox"
                            id="controlled"
                            name="ventilation"
                            value="controlled"
                            className="radio_Nurse_ot2_input"
                            checked={
                              preNurseInputs.ventilation === "controlled"
                            }
                            onChange={handleInputChange}
                          />
                          Controlled
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 wqxxxzzxx2">
                        <label htmlFor="spontaneous">
                          <input
                            type="checkbox"
                            id="spontaneous"
                            name="ventilation"
                            value="spontaneous"
                            className="radio_Nurse_ot2_input"
                            checked={
                              preNurseInputs.ventilation === "spontaneous"
                            }
                            onChange={handleInputChange}
                          />
                          Spontaneous
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 wqxxxzzxx2">
                        <label htmlFor="assisted">
                          <input
                            type="checkbox"
                            id="assisted"
                            name="ventilation"
                            value="assisted"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.ventilation === "assisted"}
                            onChange={handleInputChange}
                          />
                          Assisted
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="Vt">
                      Vt<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="Vt"
                      name="Vt"
                      value={preNurseInputs.Vt}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="RR">
                      RR<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="RR"
                      name="RR"
                      value={preNurseInputs.RR}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="MV">
                      MV<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="MV"
                      name="MV"
                      value={preNurseInputs.MV}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="PIP">
                      PIP<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="PIP"
                      name="PIP"
                      value={preNurseInputs.PIP}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="PEEP">
                      PEEP<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="PEEP"
                      name="PEEP"
                      value={preNurseInputs.PEEP}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="TDV">
                      TDV<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="TDV"
                      name="TDV"
                      value={preNurseInputs.TDV}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="ERatio">
                      1:E Ratio<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="ERatio"
                      name="ERatio"
                      value={preNurseInputs.ERatio}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="Mode">
                      Mode<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="Mode"
                      name="Mode"
                      value={preNurseInputs.Mode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="name">
                      Circuit<span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head">
                      <div className="radio_Nurse_ot2 ">
                        <label htmlFor="Circlecircuit">
                          <input
                            type="radio"
                            id="Circlecircuit"
                            name="circuit"
                            value="Circle"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.circuit === "Circle"}
                            onChange={handleInputChange}
                          />
                          Circle
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 ">
                        <label htmlFor="circuitJR">
                          <input
                            type="radio"
                            id="circuitJR"
                            name="circuit"
                            value="JR"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.circuit === "JR"}
                            onChange={handleInputChange}
                          />
                          JR
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="MAP">
                      MAP<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="MAP"
                      name="MAP"
                      value={preNurseInputs.MAP}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="TourniquetApplied">
                      Tourniquet Applied at<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="TourniquetApplied"
                      name="TourniquetApplied"
                      value={preNurseInputs.TourniquetApplied}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="TourniquetRemoved">
                      Tourniquet Removed at<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="TourniquetRemoved"
                      name="TourniquetRemoved"
                      value={preNurseInputs.TourniquetRemoved}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <br />

                <h5
                  style={{
                    color: "var(--labelcolor)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "start",
                    padding: "10px",
                  }}
                >
                  Regional Anaesthesia
                </h5>
                <br />

                <div className="RegisFormcon">
                  <div className="RegisForm_1">
                    <label htmlFor="name">
                      Technique<span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head dsewwsdw32">
                      <div className="radio_Nurse_ot2  vvbvcxxzas">
                        <label htmlFor="RegionalSpinal">
                          <input
                            type="checkbox"
                            id="RegionalSpinal"
                            name="RegionalTechnique"
                            value="Spinal"
                            className="radio_Nurse_ot2_input"
                            checked={
                              preNurseInputs.RegionalTechnique === "Spinal"
                            }
                            onChange={handleInputChange}
                          />
                          Spinal
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2  vvbvcxxzas">
                        <label htmlFor="RegionalEpidural">
                          <input
                            type="checkbox"
                            id="RegionalEpidural"
                            name="RegionalTechnique"
                            value="Epidural"
                            className="radio_Nurse_ot2_input"
                            checked={
                              preNurseInputs.RegionalTechnique === "Epidural"
                            }
                            onChange={handleInputChange}
                          />
                          Epidural
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2  vvbvcxxzas">
                        <label htmlFor="RegionalCombinedSpinalEpidural">
                          <input
                            type="checkbox"
                            id="RegionalCombinedSpinalEpidural"
                            name="RegionalTechnique"
                            value="CombinedSpinalEpidural"
                            className="radio_Nurse_ot2_input"
                            checked={
                              preNurseInputs.RegionalTechnique ===
                              "CombinedSpinalEpidural"
                            }
                            onChange={handleInputChange}
                          />
                          Combined Spinal Epidural
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2  vvbvcxxzas">
                        <label htmlFor="RegionallllNeverBlock">
                          <input
                            type="checkbox"
                            id="RegionallllNeverBlock"
                            name="RegionalTechnique"
                            value="RegionalNeverBlock"
                            className="radio_Nurse_ot2_input"
                            checked={
                              preNurseInputs.RegionalTechnique ===
                              "RegionalNeverBlock"
                            }
                            onChange={handleInputChange}
                          />
                          Never Block
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="needle">
                      Needle<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="needle"
                      name="needle"
                      value={preNurseInputs.needle}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="space">
                      Space<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="space"
                      name="space"
                      value={preNurseInputs.space}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="drug">
                      Drug<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="drug"
                      name="drug"
                      value={preNurseInputs.drug}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="onsetAction">
                      Onset of Action<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="onsetAction"
                      name="onsetAction"
                      value={preNurseInputs.onsetAction}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="sensoryLevel">
                      Sensory Level<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="sensoryLevel"
                      name="sensoryLevel"
                      value={preNurseInputs.sensoryLevel}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="sensoryLevel">
                      Sensory Level<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="sensoryLevel"
                      name="sensoryLevel"
                      value={preNurseInputs.sensoryLevel}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="sensoryLevel">
                      Motor Level<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="sensoryLevel"
                      name="sensoryLevel"
                      value={preNurseInputs.sensoryLevel}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="name">
                      EA<span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head">
                      <div className="radio_Nurse_ot2 ">
                        <label htmlFor="EANeedle">
                          <input
                            type="radio"
                            id="EANeedle"
                            name="EA"
                            value="EANeedle"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.EA === "EANeedle"}
                            onChange={handleInputChange}
                          />
                          Needle
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 ">
                        <label htmlFor="CatheterEA">
                          <input
                            type="radio"
                            id="CatheterEA"
                            name="EA"
                            value="Catheter"
                            className="radio_Nurse_ot2_input"
                            checked={preNurseInputs.EA === "Catheter"}
                            onChange={handleInputChange}
                          />
                          Catheter
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="testDose">
                      Test Dose<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="testDose"
                      name="testDose"
                      value={preNurseInputs.testDose}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <br />
              </div>

              <div className="RegisFormcon">
                <div className="RegisForm_1 euiwd6745q3">
                  <label htmlFor="LocalAnesthesia">
                    Local Anesthesia<span>:</span>
                  </label>

                  <textarea
                    id="LocalAnesthesia"
                    name="LocalAnesthesia"
                    value={preNurseInputs.LocalAnesthesia}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="RegisForm_1 euiwd6745q3">
                  <label htmlFor="TopicalAnesthesia">
                    Topical Anesthesia<span>:</span>
                  </label>

                  <textarea
                    id="TopicalAnesthesia"
                    name="TopicalAnesthesia"
                    value={preNurseInputs.TopicalAnesthesia}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>

              <br />

              <div className="RegisFormcon wsdsceew">
                <div className="RegisForm_1 wsdsceew_33">
                  <label htmlFor="Intraverous">
                    Intravenous<span>:</span>
                  </label>
                  <div className="radio_Nurse_ot2_head">
                    <div className="radio_Nurse_ot2">
                      <label htmlFor="Intraverous">
                        <input
                          type="checkbox"
                          id="Intraverous"
                          name="Intraverous"
                          checked={preNurseInputs.Intraverous}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="RegisForm_1 wsdsceew_33">
                  <label htmlFor="IntraMuscular">
                    Intra Muscular<span>:</span>
                  </label>
                  <div className="radio_Nurse_ot2_head">
                    <div className="radio_Nurse_ot2">
                      <label htmlFor="IntraMuscular">
                        <input
                          type="checkbox"
                          id="IntraMuscular"
                          name="IntraMuscular"
                          checked={preNurseInputs.IntraMuscular}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="RegisForm_1 wsdsceew_33">
                  <label htmlFor="Intrathecal">
                    Intrathecal<span>:</span>
                  </label>
                  <div className="radio_Nurse_ot2_head">
                    <div className="radio_Nurse_ot2">
                      <label htmlFor="Intrathecal">
                        <input
                          type="checkbox"
                          id="Intrathecal"
                          name="Intrathecal"
                          checked={preNurseInputs.Intrathecal}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="RegisForm_1 wsdsceew_33">
                  <label htmlFor="Inhalational">
                    Inhalational<span>:</span>
                  </label>
                  <div className="radio_Nurse_ot2_head">
                    <div className="radio_Nurse_ot2">
                      <label htmlFor="Inhalational">
                        <input
                          type="checkbox"
                          id="Inhalational"
                          name="Inhalational"
                          checked={preNurseInputs.Inhalational}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="RegisFormcon dsdcmlpio">
                <div className="RegisForm_1">
                  <label htmlFor="name">
                    Pressure Points - Padded<span>:</span>
                  </label>
                  <div className="radio_Nurse_ot2_head">
                    <div className="radio_Nurse_ot2 ">
                      <label htmlFor="pressurePointsYes">
                        <input
                          type="radio"
                          id="pressurePointsYes"
                          name="pressurePoints"
                          value="Yes"
                          className="radio_Nurse_ot2_input"
                          checked={preNurseInputs.pressurePoints === "Yes"}
                          onChange={handleInputChange}
                        />
                        Yes
                      </label>
                    </div>
                    <div className="radio_Nurse_ot2 ">
                      <label htmlFor="pressurePointsNo">
                        <input
                          type="radio"
                          id="pressurePointsNo"
                          name="pressurePoints"
                          value="No"
                          className="radio_Nurse_ot2_input"
                          checked={preNurseInputs.pressurePoints === "No"}
                          onChange={handleInputChange}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="RegisForm_1">
                  <label htmlFor="name">
                    Eyes : Covered<span>:</span>
                  </label>
                  <div className="radio_Nurse_ot2_head">
                    <div className="radio_Nurse_ot2 ">
                      <label htmlFor="eyesCoveredYes">
                        <input
                          type="radio"
                          id="eyesCoveredYes"
                          name="eyesCovered"
                          value="Yes"
                          className="radio_Nurse_ot2_input"
                          checked={preNurseInputs.eyesCovered === "Yes"}
                          onChange={handleInputChange}
                        />
                        Yes
                      </label>
                    </div>
                    <div className="radio_Nurse_ot2 ">
                      <label htmlFor="eyesCoveredNo">
                        <input
                          type="radio"
                          id="eyesCoveredNo"
                          name="eyesCovered"
                          value="No"
                          className="radio_Nurse_ot2_input"
                          checked={preNurseInputs.eyesCovered === "No"}
                          onChange={handleInputChange}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="RegisForm_1">
                  <label htmlFor="name">
                    Throat Pack<span>:</span>
                  </label>
                  <div className="radio_Nurse_ot2_head">
                    <div className="radio_Nurse_ot2 ">
                      <label htmlFor="throatPackYes">
                        <input
                          type="radio"
                          id="throatPackYes"
                          name="throatPack"
                          value="Yes"
                          className="radio_Nurse_ot2_input"
                          checked={preNurseInputs.throatPack === "Yes"}
                          onChange={handleInputChange}
                        />
                        Yes
                      </label>
                    </div>
                    <div className="radio_Nurse_ot2 ">
                      <label htmlFor="throatPackNo">
                        <input
                          type="radio"
                          id="throatPackNo"
                          name="throatPack"
                          value="No"
                          className="radio_Nurse_ot2_input"
                          checked={preNurseInputs.throatPack === "No"}
                          onChange={handleInputChange}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
                {preNurseInputs.throatPack === "Yes" && (
                  <>
                    <div className="RegisForm_1">
                      <label htmlFor="name">
                        Pack<span>:</span>
                      </label>
                      <div className="radio_Nurse_ot2 wwssqqqw1z">
                        <label htmlFor="Inserted">
                          <input
                            type="checkbox"
                            id="Inserted"
                            name="throatPackInsRem"
                            value="Inserted"
                            className="radio_Nurse_ot2_input"
                            checked={
                              preNurseInputs.throatPackInsRem === "Inserted"
                            }
                            onChange={handleInputChange}
                          />
                          Inserted
                        </label>
                      </div>

                      <div className="radio_Nurse_ot2 wwssqqqw1z">
                        <label htmlFor="Removed">
                          <input
                            type="checkbox"
                            id="Removed"
                            name="throatPackInsRem"
                            value="Removed"
                            className="radio_Nurse_ot2_input"
                            checked={
                              preNurseInputs.throatPackInsRem === "Removed"
                            }
                            onChange={handleInputChange}
                          />
                          Removed
                        </label>
                      </div>
                    </div>
                  </>
                )}
                <br />
                <div className="RegisForm_1 euiwd6745q3">
                  <label htmlFor="IntraOperativeEvents">
                    Intra Operative Events<span>:</span>
                  </label>

                  <textarea
                    id="IntraOperativeEvents"
                    name=" IntraOperativeEvents"
                    value={preNurseInputs.IntraOperativeEvents}
                    onChange={handleInputChange}
                  ></textarea>
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
                value={preNurseInputs.nameFulledBy}
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
            </div>
          </div>
        </PrintContent>
      )}
    </>
  );
}

export default OtAnaesthesiaIntra;
