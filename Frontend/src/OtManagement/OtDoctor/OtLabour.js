import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
// import jsPDF from "jspdf";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useDispatch, useSelector } from "react-redux";

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

function OtLabour() {
  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const dispatchvalue = useDispatch();

  const [checkboxState, setCheckboxState] = useState({
    Spontaneous: false,
    InducedbyStripping: false,
    ARM: false,
    Oxytonic: false,
    Combined: false,
  });

  const [checkboxState2, setCheckboxState2] = useState({
    ExpelledSpontaneously: false,
    ByhandIntroduction: false,
    ControlledCordTraction: false,
  });

  const [radioState, setRadioState] = useState({
    Episiotomy: "",
    Uterus: "",
  });

  const [formDataLabour, setFormDataLabour] = useState({
    firstStageDuration: "",
    secondStageDuration: "",
    thirdStageDuration: "",
    dateAndDay: "",
    deliveryTime: "",
    babySex: "",
    babyWeight: "",
    apgarScore: "",
    deliveryType: "",
    complications: "",
    babyBloodGroup: "",
    ConditionofMembranes: "",
    ConditionofPlacenta: "",
    ConductedBy: "",
    AssistedBy: "",
    Anaesthesiologist: "",
    LabourAnalgesia: "",
    PPH: {
      Nil: false,
      Mild: false,
      Moderate: false,
      Severe: false,
    },
    Amount: "",
    Laceration: "",
    Episiotomy: "",

    EpisiotomySutureMaterial: "",
    ProphylacticOxytocic: "",

    Pulse: "",
    BP: "",
    BleedingPV: "",

    Wt: "",
    HC: "",
    Length: "",
    AnomaliesAny: "",
    Remarks: "",

    Paediatricians: "",
  });

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCheckboxState({
      ...Object.fromEntries(
        Object.entries(checkboxState).map(([key]) => [key, false])
      ),
      [id]: checked,
    });
  };

  const handleCheckboxChange2 = (e) => {
    const { id, checked } = e.target;
    setCheckboxState2({
      ...Object.fromEntries(
        Object.entries(checkboxState2).map(([key]) => [key, false])
      ),
      [id]: checked,
    });
  };

  const handleChange = (e) => {
    const { name, id, value, type } = e.target;

    if (type === "checkbox") {
      if (name === "PPH") {
        setFormDataLabour((prevFormData) => ({
          ...prevFormData,
          PPH: {
            ...Object.fromEntries(
              Object.entries(prevFormData.PPH).map(([key]) => [key, false])
            ),
            [id]: true,
          },
        }));
      } else {
        setFormDataLabour((prevFormData) => ({
          ...prevFormData,
          [id]: !prevFormData[id],
        }));
      }
    } else if (type === "radio") {
      setRadioState((prevRadioState) => ({
        ...prevRadioState,
        [name]: value,
      }));
    } else {
      setFormDataLabour((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    }
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
            Labour & Delivery Record
          </h4>
          <br />
          <div className="OtMangement_con">
            <div className="OtMangementForm_1">
              <label>
                Type of Labour<span>:</span>
              </label>
              <div
                className="OtMangementForm_1_checkbox weewdexewdd"
             
              >
                <label htmlFor="Spontaneous">
                  <input
                    id="Spontaneous"
                    value="Spontaneous"
                    type="checkbox"
                    checked={checkboxState.Spontaneous}
                    onChange={handleCheckboxChange}
                  />
                  Spontaneous
                </label>
                <label htmlFor="InducedbyStripping">
                  <input
                    id="InducedbyStripping"
                    value="InducedbyStripping"
                    type="checkbox"
                    checked={checkboxState.InducedbyStripping}
                    onChange={handleCheckboxChange}
                  />
               Induced by Stripping
                </label>
                <label htmlFor="ARM">
                  <input
                    id="ARM"
                    value="ARM"
                    type="checkbox"
                    checked={checkboxState.ARM}
                    onChange={handleCheckboxChange}
                  />
                 ARM
                </label>
                <label htmlFor="Oxytonic">
                  <input
                    id="Oxytonic"
                    value="Oxytonic"
                    type="checkbox"
                    checked={checkboxState.Oxytonic}
                    onChange={handleCheckboxChange}
                  />
                 Oxytonic
                </label>
                <label htmlFor="Combined">
                  <input
                    id="Combined"
                    value="Combined"
                    type="checkbox"
                    checked={checkboxState.Combined}
                    onChange={handleCheckboxChange}
                  />
                  Combined
                </label>
              </div>
            </div>
          </div>
          <br />
          <div className="RegisFormcon" style={{ justifyContent: "center" }}>
            <h4 style={{ width: "180px", display: "flex", gap: "5px" }}>
              Duration of Labours<span>:</span>
            </h4>
            
            <div className="RegisForm_1">
              <label>
                1st Stage<span>:</span>
              </label>
              <input
                type="number"
                id="firstStageDuration"
                name="firstStageDuration"
                className="de32111"
                value={formDataLabour.firstStageDuration}
                onChange={handleChange}
              />
              hrs
            </div>
            <div className="RegisForm_1">
              <label>
                2nd Stage<span>:</span>
              </label>
              <input
                type="number"
                id="secondStageDuration"
                name="secondStageDuration"
                className="de32111"
                value={formDataLabour.secondStageDuration}
                onChange={handleChange}
              />
              hrs
            </div>
            <div className="RegisForm_1">
              <label>
                3rd Stage<span>:</span>
              </label>
              <input
                type="number"
                id="thirdStageDuration"
                name="thirdStageDuration"
                className="de32111"
                value={formDataLabour.thirdStageDuration}
                onChange={handleChange}
              />
              hrs
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
            Details of Delivery
          </h4>
          <div className="Selected-table-container">
            <table className="selected-medicine-table2">
              <thead>
                <tr>
                  <th>Date & Day</th>
                  <th>Time</th>
                  <th>Sex</th>
                  <th>Wt.</th>
                  <th>APGAR Score</th>
                  <th>Type</th>
                  <th>Complications</th>
                  <th>Baby's Blood Group</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="number"
                      className="wedscr54_secd_8643r"
                      id="dateAndDay"
                      value={formDataLabour.dateAndDay}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="wedscr54_secd_8643r"
                      id="deliveryTime"
                      value={formDataLabour.deliveryTime}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="wedscr54_secd_8643r"
                      id="babySex"
                      value={formDataLabour.babySex}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="wedscr54_secd_8643r"
                      id="babyWeight"
                      value={formDataLabour.babyWeight}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="wedscr54_secd_8643r"
                      id="apgarScore"
                      value={formDataLabour.apgarScore}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="wedscr54_secd_8643r"
                      id="deliveryType"
                      value={formDataLabour.deliveryType}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="wedscr54_secd_8643r"
                      id="complications"
                      value={formDataLabour.complications}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="wedscr54_secd_8643r"
                      id="babyBloodGroup"
                      value={formDataLabour.babyBloodGroup}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <div className="OtMangement_con">
            <div className="OtMangementForm_1">
              <label>
                Placenta & Membranes<span>:</span>
              </label>
              <div
                className="OtMangementForm_1_checkbox weewdexewdd"
            
              >
                <label htmlFor="ExpelledSpontaneously">
                  <input
                    id="ExpelledSpontaneously"
                    type="checkbox"
                    checked={checkboxState2.ExpelledSpontaneously}
                    onChange={handleCheckboxChange2}
                  />
                  Expelled Spontaneously
                </label>
                <label htmlFor="ByhandIntroduction">
                  <input
                    id="ByhandIntroduction"
                    type="checkbox"
                    checked={checkboxState2.ByhandIntroduction}
                    onChange={handleCheckboxChange2}
                  />
                 By hand Introduction
                </label>
                <label htmlFor="ControlledCordTraction">
                  <input
                    id="ControlledCordTraction"
                    type="checkbox"
                    checked={checkboxState2.ControlledCordTraction}
                    onChange={handleCheckboxChange2}
                  />
                 Controlled Cord Traction
                </label>
              </div>
            </div>
          </div>
          <br />
          <div className="Otdoctor_intra_Con">
            <div className="text_adjust_mt_Ot">
              <label htmlFor="ConditionofMembranes">
                Condition of Membranes <span>:</span>
              </label>
              <textarea
                name="ConditionofMembranes"
                value={formDataLabour.ConditionofMembranes}
                onChange={handleChange}
                id="ConditionofMembranes"
              ></textarea>
            </div>
            <div className="text_adjust_mt_Ot">
              <label htmlFor="ConditionofPlacenta">
                Condition of Placenta <span>:</span>
              </label>
              <textarea
                id="ConditionofPlacenta"
                name="ConditionofPlacenta"
                value={formDataLabour.ConditionofPlacenta}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <br />
          <div
            style={{
              // display: "flex",
              // flexWrap: "wrap",
              // justifyContent: "center",
              // rowGap: "10px",
            }}
          >
            <div
              className="RegisFormcon"
              style={{ justifyContent: "center", flexDirection: "column" }}
            >
              <div className="RegisForm_1">
                <label htmlFor="ConductedBy">
                  Conducted by<span>:</span>
                </label>
                <input
                  type="text"
                  id="ConductedBy"
                  name="ConductedBy"
                  value={formDataLabour.ConductedBy}
                  onChange={handleChange}
                />
              </div>
              <div className="RegisForm_1">
                <label htmlFor="AssistedBy">
                  Assisted by<span>:</span>
                </label>
                <input
                  type="text"
                  id="AssistedBy"
                  name="AssistedBy"
                  value={formDataLabour.AssistedBy}
                  onChange={handleChange}
                />
              </div>
              <div className="RegisForm_1">
                <label htmlFor="Anaesthesiologist">
                  Anaesthesiologist<span>:</span>
                </label>
                <input
                  type="text"
                  id="Anaesthesiologist"
                  name="Anaesthesiologist"
                  value={formDataLabour.Anaesthesiologist}
                  onChange={handleChange}
                />
              </div>
              <div className="RegisForm_1">
                <label htmlFor="LabourAnalgesia">
                  Labour Analgesia<span>:</span>
                </label>
                <input
                  type="text"
                  id="LabourAnalgesia"
                  name="LabourAnalgesia"
                  value={formDataLabour.LabourAnalgesia}
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />

            <div
              className="RegisFormcon"
              style={{ justifyContent: "center", flexDirection: "column" }}
            >
              <div className="RegisForm_1">
                <label htmlFor="name">
                  PPH<span>:</span>
                </label>
                <div className="radio_Nurse_ot2_head dsewwsdw32 dededxs">
                  <div className="radio_Nurse_ot2 vvbvcxxzas">
                    <label htmlFor="Nil">
                      <input
                        type="checkbox"
                        id="Nil"
                        name="PPH"
                        value="Nil"
                        className="radio_Nurse_ot2_input"
                        checked={formDataLabour.PPH.Nil}
                        onChange={handleChange}
                      />
                      Nil
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2 vvbvcxxzas">
                    <label htmlFor="Mild">
                      <input
                        type="checkbox"
                        id="Mild"
                        name="PPH"
                        value="Mild"
                        className="radio_Nurse_ot2_input"
                        checked={formDataLabour.PPH.Mild}
                        onChange={handleChange}
                      />
                      Mild
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2 vvbvcxxzas">
                    <label htmlFor="Moderate">
                      <input
                        type="checkbox"
                        id="Moderate"
                        name="PPH"
                        value="Moderate"
                        className="radio_Nurse_ot2_input"
                        checked={formDataLabour.PPH.Moderate}
                        onChange={handleChange}
                      />
                      Moderate
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2 vvbvcxxzas">
                    <label htmlFor="Severe">
                      <input
                        type="checkbox"
                        id="Severe"
                        name="PPH"
                        value="Severe"
                        className="radio_Nurse_ot2_input"
                        checked={formDataLabour.PPH.Severe}
                        onChange={handleChange}
                      />
                      Severe
                    </label>
                  </div>
                </div>
              </div>
              <br />
            </div>
            <div
              className="RegisFormcon"
              style={{ justifyContent: "center", flexDirection: "column" }}
            >
              <div className="RegisForm_1">
                <label htmlFor="Amount">
                  Amount<span>:</span>
                </label>
                <input
                  type="text"
                  id="Amount"
                  name="Amount"
                  value={formDataLabour.Amount}
                  onChange={handleChange}
                />
              </div>
              <div className="RegisForm_1">
                <label htmlFor="Laceration">
                  Laceration<span>:</span>
                </label>
                <input
                  type="text"
                  id="Laceration"
                  name="Laceration"
                  value={formDataLabour.Laceration}
                  onChange={handleChange}
                />
              </div>

              <div className="RegisForm_1">
                <label>
                  Episiotomy<span>:</span>
                </label>
                <div className="radio_Nurse_ot2_head">
                  <div className="radio_Nurse_ot2">
                    <label htmlFor="Givenw">
                      <input
                        type="radio"
                        id="Givenw"
                        name="Episiotomy"
                        value="Given"
                        className="radio_Nurse_ot2_input"
                        checked={radioState.Episiotomy === "Given"}
                        onChange={handleChange}
                      />
                      Given
                    </label>
                  </div>
                  <div className="radio_Nurse_ot2">
                    <label htmlFor="NotGivenw">
                      <input
                        type="radio"
                        id="NotGivenw"
                        name="Episiotomy"
                        value="NotGiven"
                        className="radio_Nurse_ot2_input"
                        checked={radioState.Episiotomy === "NotGiven"}
                        onChange={handleChange}
                      />
                      Not Given
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className="RegisFormcon" style={{ justifyContent: "center" }}>
            <div className="RegisForm_1 euiwd6745q3">
              <label htmlFor="EpisiotomySutureMaterial">
                Episiotomy Suture Material<span>:</span>
              </label>

              <textarea
                id="EpisiotomySutureMaterial"
                name="EpisiotomySutureMaterial"
                value={formDataLabour.EpisiotomySutureMaterial}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="RegisForm_1 euiwd6745q3">
              <label htmlFor="ProphylacticOxytocic">
                Prophylactic Oxytocic<span>:</span>
              </label>

              <textarea
                id="ProphylacticOxytocic"
                name="ProphylacticOxytocic"
                value={formDataLabour.ProphylacticOxytocic}
                onChange={handleChange}
              ></textarea>
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
            Material Condition just before Transfer to Ward :
          </h4>
          <br />

          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="Pulse">
                Pulse<span>:</span>
              </label>
              <input
                type="text"
                id="Pulse"
                name="Pulse"
                value={formDataLabour.Pulse}
                onChange={handleChange}
              />
            </div>
            <div className="RegisForm_1">
              <label htmlFor="BP">
                BP<span>:</span>
              </label>
              <input
                type="text"
                id="BP"
                name="BP"
                value={formDataLabour.BP}
                onChange={handleChange}
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Uterus<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="Contracted">
                    <input
                      type="radio"
                      id="Contracted"
                      name="Uterus"
                      value="Contracted"
                      className="radio_Nurse_ot2_input"
                      checked={radioState.Uterus === "Contracted"}
                      onChange={handleChange}
                    />
                    Contracted
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="Flaccid">
                    <input
                      type="radio"
                      id="Flaccid"
                      name="Uterus"
                      value="Flaccid"
                      className="radio_Nurse_ot2_input"
                      checked={radioState.Uterus === "Flaccid"}
                      onChange={handleChange}
                    />
                    Flaccid
                  </label>
                </div>
              </div>
            </div>
            <div className="RegisForm_1">
              <label htmlFor="BleedingPV">
                Bleeding PV<span>:</span>
              </label>
              <input
                type="text"
                id="BleedingPV"
                name="BleedingPV"
                value={formDataLabour.BleedingPV}
                onChange={handleChange}
              />
            </div>
          </div>
          <br />
          <br />
          <div className="Otdoctor_intra_Con">
            <div className="text_adjust_mt_Ot">
              <label htmlFor="PostDeliveryOrders">
                POST DELIVERY ORDERS <span>:</span>
              </label>
              <textarea
                id="PostDeliveryOrders"
                name="PostDeliveryOrders"
                value={formDataLabour.PostDeliveryOrders}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <br />

          <div className="Selected-table-container">
            <table className="selected-medicine-table2">
              <thead>
                <tr>
                  <th>Wt.</th>
                  <th>H.C.</th>
                  <th>Length</th>
                  <th>Anomalies if any</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <td>
                  <input
                    type="text"
                    className="wedscr54_secd_8643r"
                    id="Wt"
                    value={formDataLabour.Wt}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="wedscr54_secd_8643r"
                    id="HC"
                    value={formDataLabour.HC}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="wedscr54_secd_8643r"
                    id="Length"
                    value={formDataLabour.Length}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <textarea
                    id="AnomaliesAny"
                    name="AnomaliesAny"
                    value={formDataLabour.AnomaliesAny}
                    onChange={handleChange}
                    className="edjuwydrt56 ee33223"
                  ></textarea>
                </td>
                <td>
                  <textarea
                    id="Remarks"
                    name="Remarks"
                    value={formDataLabour.Remarks}
                    onChange={handleChange}
                    className="edjuwydrt56 ee33223"
                  ></textarea>
                </td>
              </tbody>
            </table>
          </div>

          <br />
          <div className="Otdoctor_intra_Con">
            <div className="text_adjust_mt_Ot">
              <label htmlFor="Paediatricians">
                PAEDIATRICIAN'S RECORD <span>:</span>
              </label>
              <textarea
                id="Paediatricians"
                name="Paediatricians"
                value={formDataLabour.Paediatricians}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <br />

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
                Labour & Delivery Record
              </h4>
              <br />
              <div className="OtMangement_con">
                <div className="OtMangementForm_1">
                  <label>
                    Type of Labour<span>:</span>
                  </label>
                  <div
                    className="OtMangementForm_1_checkbox weewdexewdd"
                 
                  >
                    <label htmlFor="Spontaneous">
                      <input
                        id="Spontaneous"
                        value="Spontaneous"
                        type="checkbox"
                        checked={checkboxState.Spontaneous}
                        onChange={handleCheckboxChange}
                      />
                      <span>Spontaneous</span>
                    </label>
                    <label htmlFor="InducedbyStripping">
                      <input
                        id="InducedbyStripping"
                        value="InducedbyStripping"
                        type="checkbox"
                        checked={checkboxState.InducedbyStripping}
                        onChange={handleCheckboxChange}
                      />
                      <span>Induced by Stripping</span>
                    </label>
                    <label htmlFor="ARM">
                      <input
                        id="ARM"
                        value="ARM"
                        type="checkbox"
                        checked={checkboxState.ARM}
                        onChange={handleCheckboxChange}
                      />
                      <span>ARM</span>
                    </label>
                    <label htmlFor="Oxytonic">
                      <input
                        id="Oxytonic"
                        value="Oxytonic"
                        type="checkbox"
                        checked={checkboxState.Oxytonic}
                        onChange={handleCheckboxChange}
                      />
                      <span>Oxytonic</span>
                    </label>
                    <label htmlFor="Combined">
                      <input
                        id="Combined"
                        value="Combined"
                        type="checkbox"
                        checked={checkboxState.Combined}
                        onChange={handleCheckboxChange}
                      />
                      <span>Combined</span>
                    </label>
                  </div>
                </div>
              </div>
              <br />
              <div
                className="RegisFormcon"
                style={{ justifyContent: "center" }}
              >
                <h4 style={{ width: "180px", display: "flex", gap: "5px" }}>
                  Duration of Labours<span>:</span>
                </h4>
                <div className="RegisForm_1">
                  <label>
                    1st Stage<span>:</span>
                  </label>
                  <input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    type="number"
                    id="firstStageDuration"
                    name="firstStageDuration"
                    className="de32111"
                    value={formDataLabour.firstStageDuration}
                    onChange={handleChange}
                  />
                  hrs
                </div>
                <div className="RegisForm_1">
                  <label>
                    2nd Stage<span>:</span>
                  </label>
                  <input
                    type="number"
                    id="secondStageDuration"
                    name="secondStageDuration"
                    className="de32111"
                    value={formDataLabour.secondStageDuration}
                    onChange={handleChange}
                  />
                  hrs
                </div>
                <div className="RegisForm_1">
                  <label>
                    3rd Stage<span>:</span>
                  </label>
                  <input
                    type="number"
                    id="thirdStageDuration"
                    name="thirdStageDuration"
                    className="de32111"
                    value={formDataLabour.thirdStageDuration}
                    onChange={handleChange}
                  />
                  hrs
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
                Details of Delivery
              </h4>


              <div className="Selected-table-container">
                <table className="selected-medicine-table2">
                  <thead>
                    <tr>
                      <th>Date & Day</th>
                      <th>Time</th>
                      <th>Sex</th>
                      <th>Wt.</th>
                      <th>APGAR Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="number"
                          className="wedscr54_secd_8643r"
                          id="dateAndDay"
                          value={formDataLabour.dateAndDay}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          className="wedscr54_secd_8643r"
                          id="deliveryTime"
                          value={formDataLabour.deliveryTime}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="wedscr54_secd_8643r"
                          id="babySex"
                          value={formDataLabour.babySex}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="wedscr54_secd_8643r"
                          id="babyWeight"
                          value={formDataLabour.babyWeight}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="wedscr54_secd_8643r"
                          id="apgarScore"
                          value={formDataLabour.apgarScore}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="Selected-table-container">
                <table className="selected-medicine-table2">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Complications</th>
                      <th>Baby's Blood Group</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          className="wedscr54_secd_8643r"
                          id="deliveryType"
                          value={formDataLabour.deliveryType}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="wedscr54_secd_8643r"
                          id="complications"
                          value={formDataLabour.complications}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="wedscr54_secd_8643r"
                          id="babyBloodGroup"
                          value={formDataLabour.babyBloodGroup}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <div className="OtMangement_con">
                <div className="OtMangementForm_1">
                  <label>
                    Placenta & Membranes<span>:</span>
                  </label>
                  <div
                    className="OtMangementForm_1_checkbox weewdexewdd"
                
                  >
                    <label htmlFor="ExpelledSpontaneously">
                      <input
                        id="ExpelledSpontaneously"
                        type="checkbox"
                        checked={checkboxState2.ExpelledSpontaneously}
                        onChange={handleCheckboxChange2}
                      />
                      <span>Expelled Spontaneously</span>
                    </label>
                    <label htmlFor="ByhandIntroduction">
                      <input
                        id="ByhandIntroduction"
                        type="checkbox"
                        checked={checkboxState2.ByhandIntroduction}
                        onChange={handleCheckboxChange2}
                      />
                      <span>By hand Introduction</span>
                    </label>
                    <label htmlFor="ControlledCordTraction">
                      <input
                        id="ControlledCordTraction"
                        type="checkbox"
                        checked={checkboxState2.ControlledCordTraction}
                        onChange={handleCheckboxChange2}
                      />
                      <span>Controlled Cord Traction</span>
                    </label>
                  </div>
                </div>
              </div>
              <br />
              <div className="Otdoctor_intra_Con">
                <div className="text_adjust_mt_Ot">
                  <label htmlFor="ConditionofMembranes">
                    Condition of Membranes <span>:</span>
                  </label>
                  <textarea
                    name="ConditionofMembranes"
                    value={formDataLabour.ConditionofMembranes}
                    onChange={handleChange}
                    id="ConditionofMembranes"
                  ></textarea>
                </div>
                <div className="text_adjust_mt_Ot">
                  <label htmlFor="ConditionofPlacenta">
                    Condition of Placenta <span>:</span>
                  </label>
                  <textarea
                    id="ConditionofPlacenta"
                    name="ConditionofPlacenta"
                    value={formDataLabour.ConditionofPlacenta}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <br />
              <br />
              <div
                // style={{
                //   display: "flex",
                //   flexWrap: "wrap",
                //   justifyContent: "center",
                //   rowGap: "10px",
                // }}
              >
              <div
              className="RegisFormcon"
              style={{ justifyContent: "center", flexDirection: "column" }}
            >
              <div className="RegisForm_1">
                <label htmlFor="ConductedBy">
                  Conducted by<span>:</span>
                </label>
                <input
                  type="text"
                  id="ConductedBy"
                  name="ConductedBy"
                  value={formDataLabour.ConductedBy}
                  onChange={handleChange}
                />
              </div>
              <div className="RegisForm_1">
                <label htmlFor="AssistedBy">
                  Assisted by<span>:</span>
                </label>
                <input
                  type="text"
                  id="AssistedBy"
                  name="AssistedBy"
                  value={formDataLabour.AssistedBy}
                  onChange={handleChange}
                />
              </div>
              <div className="RegisForm_1">
                <label htmlFor="Anaesthesiologist">
                  Anaesthesiologist<span>:</span>
                </label>
                <input
                  type="text"
                  id="Anaesthesiologist"
                  name="Anaesthesiologist"
                  value={formDataLabour.Anaesthesiologist}
                  onChange={handleChange}
                />
              </div>
              <div className="RegisForm_1">
                <label htmlFor="LabourAnalgesia">
                  Labour Analgesia<span>:</span>
                </label>
                <input
                  type="text"
                  id="LabourAnalgesia"
                  name="LabourAnalgesia"
                  value={formDataLabour.LabourAnalgesia}
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />

                <div
                  className="RegisFormcon"
                  style={{ justifyContent: "center", flexDirection: "column" }}
                >
                  <div className="RegisForm_1">
                    <label htmlFor="name">
                      PPH<span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head dsewwsdw32 dededxs">
                      <div className="radio_Nurse_ot2 vvbvcxxzas">
                        <label htmlFor="Nil">
                          <input
                            type="checkbox"
                            id="Nil"
                            name="PPH"
                            value="Nil"
                            className="radio_Nurse_ot2_input"
                            checked={formDataLabour.PPH.Nil}
                            onChange={handleChange}
                          />
                          Nil
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 vvbvcxxzas">
                        <label htmlFor="Mild">
                          <input
                            type="checkbox"
                            id="Mild"
                            name="PPH"
                            value="Mild"
                            className="radio_Nurse_ot2_input"
                            checked={formDataLabour.PPH.Mild}
                            onChange={handleChange}
                          />
                          Mild
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 vvbvcxxzas">
                        <label htmlFor="Moderate">
                          <input
                            type="checkbox"
                            id="Moderate"
                            name="PPH"
                            value="Moderate"
                            className="radio_Nurse_ot2_input"
                            checked={formDataLabour.PPH.Moderate}
                            onChange={handleChange}
                          />
                          Moderate
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2 vvbvcxxzas">
                        <label htmlFor="Severe">
                          <input
                            type="checkbox"
                            id="Severe"
                            name="PPH"
                            value="Severe"
                            className="radio_Nurse_ot2_input"
                            checked={formDataLabour.PPH.Severe}
                            onChange={handleChange}
                          />
                          Severe
                        </label>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
                <div
                  className="RegisFormcon"
                  style={{ justifyContent: "center", flexDirection: "column" }}
                >
                  <div className="RegisForm_1">
                    <label htmlFor="Amount">
                      Amount<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="Amount"
                      name="Amount"
                      value={formDataLabour.Amount}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="RegisForm_1">
                    <label htmlFor="Laceration">
                      Laceration<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="Laceration"
                      name="Laceration"
                      value={formDataLabour.Laceration}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="RegisForm_1">
                    <label>
                      Episiotomy<span>:</span>
                    </label>
                    <div className="radio_Nurse_ot2_head">
                      <div className="radio_Nurse_ot2">
                        <label htmlFor="Givenw">
                          <input
                            type="radio"
                            id="Givenw"
                            name="Episiotomy"
                            value="Given"
                            className="radio_Nurse_ot2_input"
                            checked={radioState.Episiotomy === "Given"}
                            onChange={handleChange}
                          />
                          Given
                        </label>
                      </div>
                      <div className="radio_Nurse_ot2">
                        <label htmlFor="NotGivenw">
                          <input
                            type="radio"
                            id="NotGivenw"
                            name="Episiotomy"
                            value="NotGiven"
                            className="radio_Nurse_ot2_input"
                            checked={radioState.Episiotomy === "NotGiven"}
                            onChange={handleChange}
                          />
                          Not Given
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div
                className="RegisFormcon"
                style={{ justifyContent: "center" }}
              >
                <div className="RegisForm_1 euiwd6745q3">
                  <label htmlFor="EpisiotomySutureMaterial">
                    Episiotomy Suture Material<span>:</span>
                  </label>

                  <textarea
                    id="EpisiotomySutureMaterial"
                    name="EpisiotomySutureMaterial"
                    value={formDataLabour.EpisiotomySutureMaterial}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="RegisForm_1 euiwd6745q3">
                  <label htmlFor="ProphylacticOxytocic">
                    Prophylactic Oxytocic<span>:</span>
                  </label>

                  <textarea
                    id="ProphylacticOxytocic"
                    name="ProphylacticOxytocic"
                    value={formDataLabour.ProphylacticOxytocic}
                    onChange={handleChange}
                  ></textarea>
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
                Material Condition just before Transfer to Ward :
              </h4>
              <br />

              <div
                className="RegisFormcon"
                style={{ justifyContent: "center" }}
              >
                <div className="RegisForm_1">
                  <label htmlFor="Pulse">
                    Pulse<span>:</span>
                  </label>
                  <input
                    type="text"
                    id="Pulse"
                    name="Pulse"
                    value={formDataLabour.Pulse}
                    onChange={handleChange}
                  />
                </div>
                <div className="RegisForm_1">
                  <label htmlFor="BP">
                    BP<span>:</span>
                  </label>
                  <input
                    type="text"
                    id="BP"
                    name="BP"
                    value={formDataLabour.BP}
                    onChange={handleChange}
                  />
                </div>

                <div className="RegisForm_1">
                  <label>
                    Uterus<span>:</span>
                  </label>
                  <div className="radio_Nurse_ot2_head">
                    <div className="radio_Nurse_ot2">
                      <label htmlFor="Contracted">
                        <input
                          type="radio"
                          id="Contracted"
                          name="Uterus"
                          value="Contracted"
                          className="radio_Nurse_ot2_input"
                          checked={radioState.Uterus === "Contracted"}
                          onChange={handleChange}
                        />
                        Contracted
                      </label>
                    </div>
                    <div className="radio_Nurse_ot2">
                      <label htmlFor="Flaccid">
                        <input
                          type="radio"
                          id="Flaccid"
                          name="Uterus"
                          value="Flaccid"
                          className="radio_Nurse_ot2_input"
                          checked={radioState.Uterus === "Flaccid"}
                          onChange={handleChange}
                        />
                        Flaccid
                      </label>
                    </div>
                  </div>
                </div>
                <div className="RegisForm_1">
                  <label htmlFor="BleedingPV">
                    Bleeding PV<span>:</span>
                  </label>
                  <input
                    type="text"
                    id="BleedingPV"
                    name="BleedingPV"
                    value={formDataLabour.BleedingPV}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <br />
              <br />
              <div className="Otdoctor_intra_Con">
                <div className="text_adjust_mt_Ot">
                  <label htmlFor="PostDeliveryOrders">
                    POST DELIVERY ORDERS <span>:</span>
                  </label>
                  <textarea
                    id="PostDeliveryOrders"
                    name="PostDeliveryOrders"
                    value={formDataLabour.PostDeliveryOrders}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <br />

              <div className="Selected-table-container">
                <table className="selected-medicine-table2">
                  <thead>
                    <tr>
                      <th>Wt.</th>
                      <th>H.C.</th>
                      <th>Length</th>
                      <th>Anomalies if any</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td>
                      <input
                        type="text"
                        className="wedscr54_secd_8643r"
                        id="Wt"
                        value={formDataLabour.Wt}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="wedscr54_secd_8643r"
                        id="HC"
                        value={formDataLabour.HC}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="wedscr54_secd_8643r"
                        id="Length"
                        value={formDataLabour.Length}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <textarea
                        id="AnomaliesAny"
                        name="AnomaliesAny"
                        value={formDataLabour.AnomaliesAny}
                        onChange={handleChange}
                        className="edjuwydrt56 ee33223"
                      ></textarea>
                    </td>
                    <td>
                      <textarea
                        id="Remarks"
                        name="Remarks"
                        value={formDataLabour.Remarks}
                        onChange={handleChange}
                        className="edjuwydrt56 ee33223"
                      ></textarea>
                    </td>
                  </tbody>
                </table>
              </div>

              <br />
              <div className="Otdoctor_intra_Con">
                <div className="text_adjust_mt_Ot">
                  <label htmlFor="Paediatricians">
                    PAEDIATRICIAN'S RECORD <span>:</span>
                  </label>
                  <textarea
                    id="Paediatricians"
                    name="Paediatricians"
                    value={formDataLabour.Paediatricians}
                    onChange={handleChange}
                  ></textarea>
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

export default OtLabour;
