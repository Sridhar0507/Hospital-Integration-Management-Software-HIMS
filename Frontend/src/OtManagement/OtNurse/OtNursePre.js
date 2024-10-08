import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
// import jsPDF from "jspdf";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useDispatch, useSelector } from "react-redux";
// import "../../RegistrationForm/Registration.css";
import rajeshkumar from "../../Assets/rajeshkumar.png";

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

function OtNursePre() {
  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const dispatchvalue = useDispatch();

  const [preNurseInputs, setPreNurseInputs] = useState({
    clinicalDiagnosis: "",
    plannedSurgery: "",
    dateOfProcedure: "",
    medications: "",
    pulse: "",
    bp: "",
    rr: "",
    temperature: "",

    // Investigations
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

    wardNurseSign: "",
    wardNurseDate: "",
    wardNurseTime: "",
    receivingNurseSign: "",
    receivingNurseDate: "",
    receivingNurseTme: "",
  });

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPreNurseInputs({
      ...preNurseInputs,
      [name]: value,
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
              <label htmlFor="plannedSurgery">
                Planned Surgery<span>:</span>
              </label>
              <input
                type="text"
                id="plannedSurgery"
                name="plannedSurgery"
                value={preNurseInputs.plannedSurgery}
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
            Investigations
          </h4>
          <br />
          <div className="RegisFormcon">
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
            Pre Procedure / Operative Checklist
          </h4>
          <br />
          <div className="RegisFormcon nurse_sign_capte45_head">
            <div className="nurse_sign_capte45_head23">
              <div className="nurse_sign_capte45_head23_jdbdt6">
                <label htmlFor="wardNurse">
                  Done by (Ward Nurse)<span>:</span>
                </label>
              </div>
              <div className="nurse_sign_capte45_skib">
                <div className="nurse_sign_capte45_head23">
                  <div className="nurse_sign_capte45">
                    <h5>
                      Sign <span>-</span>
                    </h5>
                    <img
                      id="WardNurseSign"
                      src={preNurseInputs.wardNurseSign}
                      alt="WardNurseSign"
                    />
                  </div>

                  <div className="nurse_sign_capte45">
                    <h5>
                      Date <span>-</span>
                    </h5>
                    <input
                      type="date"
                      id="wardNurseDate"
                      name="wardNurseDate"
                      value={preNurseInputs.wardNurseDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="nurse_sign_capte45">
                    <h5>
                      Time <span>-</span>
                    </h5>
                    <input
                      type="time"
                      id="wardNurseTime"
                      name="wardNurseTime"
                      value={preNurseInputs.wardNurseTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="nurse_sign_capte45_head23">
              <div className="nurse_sign_capte45_head23_jdbdt6">
                <label htmlFor="receivingNurse">
                  Handled Over to (Receiving Nurse)<span>:</span>
                </label>
              </div>
              <div className="nurse_sign_capte45_skib">
                <div className="nurse_sign_capte45_head23">
                  <div className="nurse_sign_capte45">
                    <h5>
                      Sign<span>-</span>
                    </h5>
                    <img
                      id="ReceivingNurseSign"
                      src={rajeshkumar}
                      // src={preNurseInputs.receivingNurseSign}
                      alt="ReceivingNurseSign"
                    />
                  </div>

                  <div className="nurse_sign_capte45">
                    <h5>
                      Date<span>-</span>
                    </h5>
                    <input
                      type="date"
                      id="receivingNurseDate"
                      name="receivingNurseDate"
                      value={preNurseInputs.receivingNurseDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="nurse_sign_capte45">
                    <h5>
                      Time<span>-</span>
                    </h5>
                    <input
                      type="time"
                      id="receivingNurseTme"
                      name="receivingNurseTme"
                      value={preNurseInputs.receivingNurseTme}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
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
                  Nurse
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
                  Nurse Pre - Operative Checklist
                </h4>
                <br />
                <br />
                <div className="RegisFormcon">
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
                    <label htmlFor="plannedSurgery">
                      Planned Surgery<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="plannedSurgery"
                      name="plannedSurgery"
                      value={preNurseInputs.plannedSurgery}
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
                Pre Procedure / Operative Checklist
              </h4>
              <br />
              <div className="RegisFormcon nurse_sign_capte45_head">
                <div className="nurse_sign_capte45_head23">
                  <div className="nurse_sign_capte45_head23_jdbdt6">
                    <label htmlFor="wardNurse">
                      Done by (Ward Nurse)<span>:</span>
                    </label>
                  </div>
                  <div className="nurse_sign_capte45_skib">
                    <div className="nurse_sign_capte45_head23">
                      <div className="nurse_sign_capte45">
                        <h5>
                          Sign <span>-</span>
                        </h5>
                        <img
                          id="WardNurseSign"
                          src={preNurseInputs.wardNurseSign}
                          alt="WardNurseSign"
                        />
                      </div>

                      <div className="nurse_sign_capte45">
                        <h5>
                          Date <span>-</span>
                        </h5>
                        <input
                          type="date"
                          id="wardNurseDate"
                          name="wardNurseDate"
                          value={preNurseInputs.wardNurseDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="nurse_sign_capte45">
                        <h5>
                          Time <span>-</span>
                        </h5>
                        <input
                          type="time"
                          id="wardNurseTime"
                          name="wardNurseTime"
                          value={preNurseInputs.wardNurseTime}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="nurse_sign_capte45_head23">
                  <div className="nurse_sign_capte45_head23_jdbdt6">
                    <label htmlFor="receivingNurse">
                      Handled Over to (Receiving Nurse)<span>:</span>
                    </label>
                  </div>
                  <div className="nurse_sign_capte45_skib">
                    <div className="nurse_sign_capte45_head23">
                      <div className="nurse_sign_capte45">
                        <h5>
                          Sign<span>-</span>
                        </h5>
                        <img
                          id="ReceivingNurseSign"
                          src={rajeshkumar}
                          // src={preNurseInputs.receivingNurseSign}
                          alt="ReceivingNurseSign"
                        />
                      </div>

                      <div className="nurse_sign_capte45">
                        <h5>
                          Date<span>-</span>
                        </h5>
                        <input
                          type="date"
                          id="receivingNurseDate"
                          name="receivingNurseDate"
                          value={preNurseInputs.receivingNurseDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="nurse_sign_capte45">
                        <h5>
                          Time<span>-</span>
                        </h5>
                        <input
                          type="time"
                          id="receivingNurseTme"
                          name="receivingNurseTme"
                          value={preNurseInputs.receivingNurseTme}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
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

export default OtNursePre;







