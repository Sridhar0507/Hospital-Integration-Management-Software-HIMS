import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
// import jsPDF from "jspdf";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useDispatch, useSelector } from "react-redux";
import rajeshkumar from "../../Assets/rajeshkumar.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

function OtNurseIntra() {
  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const dispatchvalue = useDispatch();

  const [specimen, setSpecimen] = useState("");
  const handleSpecimenChange = (event) => {
    setSpecimen(event.target.value);
  };

  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const handleCheckboxChangeSpecimen = (event) => {
    setSelectedCheckbox(event.target.value);
  };

  const [checkboxValues, setCheckboxValues] = useState({
    correctPatient: false,
    correctSiteAndSide: false,
    agreementOnCorrectProcedure: false,
    correctPatientPosition: false,
    availabilityOfCorrectEquipment: false,
    bloodAvailable: false,
    prophylacticAntibiotic: false,
    essentialImagingDisplay: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const [CheckedformData, setCheckedformData] = useState({
    surgeon: { name: "", sign: "" },
    anaesthesiologist: { name: "", sign: "" },
    scrubNurse: { name: "", sign: "" },
    technician: { name: "", sign: "" },
    circulatingNurse: { name: "", sign: "" },
    others: { name: "", sign: "" },
  });

  const handleInputChange = (e, role) => {
    const { value } = e.target;
    setCheckedformData((prevData) => ({
      ...prevData,
      [role]: { ...prevData[role], name: value },
    }));
  };

  const [CallOutcheckboxValues, setCallOutcheckboxValues] = useState({
    surgeon: false,
    anaesthesiologist: false,
    scrubNurse: false,
    technician: false,
    circulatingNurse: false,
    others: false,
  });

  const handleCheckboxChangeCallOut = (e) => {
    const { name, checked } = e.target;
    setCallOutcheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const [drainsData, setDrainsData] = useState([
    { type: "", size: "", site: "" },
  ]);

  const handleInputChangeTable = (event, index, field) => {
    const newDrainsData = [...drainsData];
    newDrainsData[index][field] = event.target.value;
    setDrainsData(newDrainsData);
  };

  const addRow = () => {
    setDrainsData([...drainsData, { type: "", size: "", site: "" }]);
  };

  const deleteRow = (index) => {
    const newDrainsData = [...drainsData];
    newDrainsData.splice(index, 1);
    setDrainsData(newDrainsData);
  };

  const [preOpValues, setPreOpValues] = useState({
    sponges: "",
    gauze: "",
    peanut: "",
    cottonoid: "",
    vesselLoop: "",
    roller: "",
    instrument: "",
    needle: "",
  });

  const [reliefValues, setReliefValues] = useState({
    sponges: "",
    gauze: "",
    peanut: "",
    cottonoid: "",
    vesselLoop: "",
    roller: "",
    instrument: "",
    needle: "",
  });

  const [closureValues, setClosureValues] = useState({
    sponges: "",
    gauze: "",
    peanut: "",
    cottonoid: "",
    vesselLoop: "",
    roller: "",
    instrument: "",
    needle: "",
  });

  const [finalValues, setFinalValues] = useState({
    sponges: "",
    gauze: "",
    peanut: "",
    cottonoid: "",
    vesselLoop: "",
    roller: "",
    instrument: "",
    needle: "",
  });

  const handlePreOpInputChange = (item, value) => {
    setPreOpValues({ ...preOpValues, [item]: value });
  };

  const handleReliefInputChange = (item, value) => {
    setReliefValues({ ...reliefValues, [item]: value });
  };
  const handleClosureInputChange = (item, value) => {
    setClosureValues({ ...closureValues, [item]: value });
  };

  const handleFinalInputChange = (item, value) => {
    setFinalValues({ ...finalValues, [item]: value });
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);

  const [surgeonInformed, setSurgeonInformed] = useState(null);

  const handleCheckboxClick34 = (option) => {
    setSurgeonInformed(option);
  };

  const handleCheckboxClick = (option) => {
    setSelectedOption(option);
    if (option === "No") {
      setShowAdditionalInputs(true);
    } else {
      setShowAdditionalInputs(false);
    }
  };

  const [whetherEquipment, setWhetherEquipment] = useState(null);

  const handleCheckboxClickEquipment = (option) => {
    setWhetherEquipment(option);
  };

  const [stableUnstable, setStableUnstable] = useState(null);

  const handleCheckboxClickStableUnstable = (option) => {
    setStableUnstable(option);
  };

  const [implantDetails, setImplantDetails] = useState("");

  const handleInputChangeImplantDetails = (event) => {
    setImplantDetails(event.target.value);
  };

  const [checkboxValuesSignOut, setCheckboxValuesSignOut] = useState({
    nurseVerbally: false,
    procedureRecorded: false,
    specimenLballedInclude: false,
    recoveryandManagement: false,
  });

  const handleCheckboxChangeSignOut = (e) => {
    const { name, checked } = e.target;
    setCheckboxValuesSignOut((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
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
            Time Out Before Induction to be Checked
          </h4>

          <div className="OtMangement_con_headerey7">
            <div className="OtMangement_con OtMangement_con_intra_check">
              <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                <div className="edwue662l">
                  <label>
                    <p>
                      {" "}
                      Correct Patient<h6>Verifies with ID Band</h6>
                    </p>{" "}
                    <span>:</span>
                  </label>
                </div>

                <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222">
                  <label>
                    <input
                      type="checkbox"
                      name="correctPatient"
                      checked={checkboxValues.correctPatient}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </div>
              </div>

              <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                <div className="edwue662l">
                  <label>
                    <p>
                      {" "}
                      Correct Site and side
                      <h6>
                        Verifies with Surgical & Anesthesia Consent , Site
                        Marking & Imaging data
                      </h6>
                    </p>{" "}
                    <span>:</span>
                  </label>
                </div>

                <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222">
                  <label>
                    <input
                      type="checkbox"
                      name="correctSiteAndSide"
                      checked={checkboxValues.correctSiteAndSide}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </div>
              </div>

              <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                <div className="edwue662l">
                  <label>
                    <p>
                      {" "}
                      Agreement on Correct Procedure{" "}
                      <h6>Verifies with Consent</h6>
                    </p>{" "}
                    <span>:</span>
                  </label>
                </div>

                <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222">
                  <label>
                    <input
                      type="checkbox"
                      name="agreementOnCorrectProcedure"
                      checked={checkboxValues.agreementOnCorrectProcedure}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </div>
              </div>

              <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                <div className="edwue662l">
                  <label>
                    <p>
                      {" "}
                      Correct Patient Position{" "}
                      <h6>Verifies with Operating Surgeon</h6>
                    </p>{" "}
                    <span>:</span>
                  </label>
                </div>

                <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222">
                  <label>
                    <input
                      type="checkbox"
                      name="correctPatientPosition"
                      checked={checkboxValues.correctPatientPosition}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </div>
              </div>

              <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                <div className="edwue662l">
                  <label>
                    <p>
                      {" "}
                      Availability of Correct implants / equipment{" "}
                      <h6>Any issues ? Verifies with srub Nurse</h6>
                    </p>{" "}
                    <span>:</span>
                  </label>
                </div>

                <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222">
                  <label>
                    <input
                      type="checkbox"
                      name="availabilityOfCorrectEquipment"
                      checked={checkboxValues.availabilityOfCorrectEquipment}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </div>
              </div>

              <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                <div className="edwue662l">
                  <label>
                    <p>
                      {" "}
                      Blood Available{" "}
                      <h6>
                        Verifies and Physically cheeks in OR Blood Bank
                        Refrigerator by scrub Nurse
                      </h6>
                    </p>{" "}
                    <span>:</span>
                  </label>
                </div>

                <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222">
                  <label>
                    <input
                      type="checkbox"
                      name="bloodAvailable"
                      checked={checkboxValues.bloodAvailable}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </div>
              </div>

              <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                <div className="edwue662l">
                  <label>
                    <p>
                      {" "}
                      Prophylactic Antibiotic within 60mins{" "}
                      <h6>Not Applicable Verifies width scrub Nurse</h6>
                    </p>{" "}
                    <span>:</span>
                  </label>
                </div>

                <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222">
                  <label>
                    <input
                      type="checkbox"
                      name="prophylacticAntibiotic"
                      checked={checkboxValues.prophylacticAntibiotic}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </div>
              </div>

              <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                <div className="edwue662l">
                  <label>
                    <p>
                      {" "}
                      Essential Imaging Display{" "}
                      <h6>Verifies with Display Lobby</h6>
                    </p>{" "}
                    <span>:</span>
                  </label>
                </div>

                <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222">
                  <label>
                    <input
                      type="checkbox"
                      name="essentialImagingDisplay"
                      checked={checkboxValues.essentialImagingDisplay}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </div>
              </div>
            </div>

           
              
              <div className="Selected-table-container">
                <table className="selected-medicine-table2">
                  <thead>
                    <tr>
                      <th id="slectbill_ins">Checked By</th>
                      <th id="slectbill_ins">Name</th>
                      <th id="slectbill_ins">Sign</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Surgeon</td>
                      <td className="nurse_sign_capte45 okwixs7xs9">
                        <input
                          type="text"
                          value={CheckedformData.surgeon.name}
                          onChange={(e) => handleInputChange(e, "surgeon")}
                        />
                      </td>
                      <td>
                        <img
                          // src={CheckedformData.surgeon.sign}
                          src={rajeshkumar}
                          alt="SurgeonSign"
                          className="img_ckecd_dctr"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Anaesthesiologist</td>
                      <td className="nurse_sign_capte45 okwixs7xs9">
                        <input
                          type="text"
                          value={CheckedformData.anaesthesiologist.name}
                          onChange={(e) =>
                            handleInputChange(e, "anaesthesiologist")
                          }
                        />
                      </td>
                      <td>
                        <img
                          src={CheckedformData.anaesthesiologist.sign}
                          alt="SurgeonSign"
                          className="img_ckecd_dctr"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Scrub Nurse</td>
                      <td className="nurse_sign_capte45 okwixs7xs9">
                        <input
                          type="text"
                          value={CheckedformData.scrubNurse.name}
                          onChange={(e) => handleInputChange(e, "scrubNurse")}
                        />
                      </td>
                      <td>
                        <img
                          src={CheckedformData.scrubNurse.sign}
                          alt="SurgeonSign"
                          className="img_ckecd_dctr"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Technician</td>
                      <td className="nurse_sign_capte45 okwixs7xs9">
                        <input
                          type="text"
                          value={CheckedformData.technician.name}
                          onChange={(e) => handleInputChange(e, "technician")}
                        />
                      </td>
                      <td>
                        <img
                          src={CheckedformData.technician.sign}
                          alt="SurgeonSign"
                          className="img_ckecd_dctr"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Circulating Nurse</td>
                      <td className="nurse_sign_capte45 okwixs7xs9">
                        <input
                          type="text"
                          value={CheckedformData.circulatingNurse.name}
                          onChange={(e) =>
                            handleInputChange(e, "circulatingNurse")
                          }
                        />
                      </td>
                      <td>
                        <img
                          src={CheckedformData.circulatingNurse.sign}
                          alt="SurgeonSign"
                          className="img_ckecd_dctr"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Others</td>
                      <td className="nurse_sign_capte45 okwixs7xs9">
                        <input
                          type="text"
                          value={CheckedformData.others.name}
                          onChange={(e) => handleInputChange(e, "others")}
                        />
                      </td>
                      <td>
                        <img
                          src={CheckedformData.others.sign}
                          alt="SurgeonSign"
                          className="img_ckecd_dctr"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
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
            Call Out - Before Incision
          </h4>
          <div className="OtMangement_con_headerey7 eredr4f">
            <div className="OtMangement_con">
              <div className="Selected-table-container">
                <table className="selected-medicine-table2">
                  <thead>
                    <tr>
                      <th id="slectbill_ins">Time Out Participants</th>
                      <th id="slectbill_ins">Checked with</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Surgeon</td>
                      <td>
                        <div className="OtMangementForm_1_checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name="surgeon"
                              checked={CallOutcheckboxValues.surgeon}
                              onChange={handleCheckboxChangeCallOut}
                            />
                          </label>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>Anaesthesiologist</td>
                      <td>
                        <div className="OtMangementForm_1_checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name="anaesthesiologist"
                              checked={CallOutcheckboxValues.anaesthesiologist}
                              onChange={handleCheckboxChangeCallOut}
                            />
                          </label>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>Scrub Nurse</td>
                      <td>
                        <div className="OtMangementForm_1_checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name="scrubNurse"
                              checked={CallOutcheckboxValues.scrubNurse}
                              onChange={handleCheckboxChangeCallOut}
                            />
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Technician</td>
                      <td>
                        <div className="OtMangementForm_1_checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name="technician"
                              checked={CallOutcheckboxValues.technician}
                              onChange={handleCheckboxChangeCallOut}
                            />
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Circulating Nurse</td>
                      <td>
                        <div className="OtMangementForm_1_checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name="circulatingNurse"
                              checked={CallOutcheckboxValues.circulatingNurse}
                              onChange={handleCheckboxChangeCallOut}
                            />
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Others</td>
                      <td>
                        <div className="OtMangementForm_1_checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name="others"
                              checked={CallOutcheckboxValues.others}
                              onChange={handleCheckboxChangeCallOut}
                            />
                          </label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="OtMangement_con">
              <div className="Selected-table-container">
                <table className="selected-medicine-table2">
                  <thead>
                    <tr>
                      <th id="slectbill_ins"> By Circulating Nurse</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="nurse_sign_capte45 okwixs7xs9">
                        <label>
                          Name <span>:</span>
                        </label>
                        <input type="text"></input>
                      </td>
                    </tr>
                    <tr>
                      <td className="nurse_sign_capte45 okwixs7xs9">
                        <label>
                          Sign <span>:</span>
                        </label>
                        <img
                          // src={CheckedformData.surgeon.sign}
                          src={rajeshkumar}
                          alt="SurgeonSign"
                          className="img_ckecd_dctr"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="nurse_sign_capte45 okwixs7xs9">
                        <label>
                          Date <span>:</span>
                        </label>
                        <input type="date"></input>
                      </td>
                    </tr>
                    <tr>
                      <td className="nurse_sign_capte45 okwixs7xs9">
                        <label>
                          Time <span>:</span>
                        </label>
                        <input type="time"></input>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <br />

          <div className="Otdoctor_intra_Con">
            <div className="Otdoctor_intra_Con_2_input">
              <label>
                Procedure Start Time <span>:</span>
              </label>
              <input
                type="time"
                // value={ProcedureStartTime}
              />
            </div>
            <div className="Otdoctor_intra_Con_2_input">
              <label>
                {" "}
                Procedure End Time <span>:</span>
              </label>
              <input
                type="time"
                // value={ProcedureEndTime}
              />
            </div>

            <div className="Otdoctor_intra_Con_2_input">
              <label>
                {" "}
                Threatre <span>:</span>
              </label>
              <input
                type="text"
                // value={Threatre}
              />
            </div>

            <div className="Otdoctor_intra_Con">
              <div className="Otdoctor_intra_Con_udy6d">
                <div className="Otdoctor_intra_Con_2_input">
                  <label>
                    Specimen <span>:</span>
                  </label>
                  <input
                    type="text"
                    value={specimen}
                    onChange={handleSpecimenChange}
                  />
                </div>

                <div className="OtMangementForm_1_checkbox_Intraaaaa">
                  <label>
                    <input
                      type="checkbox"
                      value="Pathology"
                      checked={selectedCheckbox === "Pathology"}
                      onChange={handleCheckboxChangeSpecimen}
                    />
                    <span>Pathology</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Permanent"
                      checked={selectedCheckbox === "Permanent"}
                      onChange={handleCheckboxChangeSpecimen}
                    />
                    <span>Permanent</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="FrozenSection"
                      checked={selectedCheckbox === "FrozenSection"}
                      onChange={handleCheckboxChangeSpecimen}
                    />
                    <span>Frozen Section</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="Otdoctor_intra_Con_2_input">
              <label>
                {" "}
                Frozen Time Sent <span>:</span>
              </label>
              <input
                type="time"
                // value={ProcedureEndTime}
              />
            </div>

            <div className="Otdoctor_intra_Con_2_input">
              <label>
                {" "}
                Time of Report<span>:</span>
              </label>
              <input
                type="time"
                // value={ProcedureEndTime}
              />
            </div>
          </div>
          <br />
          <br />
          <div className="Otdoctor_intra_Con">
            <div className="text_adjust_mt_Ot">
              <label style={{ width: "250px" }}>
                Drains / Catheters / Implants / Packing
              </label>
            </div>
            <div className="Selected-table-container">
              <table className="selected-medicine-table2">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Site</th>
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
                          className="input_table_tye_site"
                          value={item.type}
                          onChange={(event) =>
                            handleInputChangeTable(event, index, "type")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="input_table_tye_site"
                          value={item.size}
                          onChange={(event) =>
                            handleInputChangeTable(event, index, "size")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="input_table_tye_site"
                          value={item.site}
                          onChange={(event) =>
                            handleInputChangeTable(event, index, "site")
                          }
                        />
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
          </div>

          <br />
          <div className="Otdoctor_intra_Con">
            <div className="text_adjust_mt_Ot">
              <label style={{ width: "250px" }}>Counts</label>
            </div>
            <div className="Selected-table-container">
              <table className="selected-medicine-table2">
                <thead>
                  <tr>
                    <th>COUNT</th>
                    <th>Sponges</th>
                    <th>Gauze</th>
                    <th>Peanut </th>
                    <th>Cottonoid </th>
                    <th>Vessel Loop </th>
                    <th>Roller</th>
                    <th>Instrument </th>
                    <th>Needle </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pre - op</td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={preOpValues.sponges}
                        onChange={(e) =>
                          handlePreOpInputChange("sponges", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={preOpValues.gauze}
                        onChange={(e) =>
                          handlePreOpInputChange("gauze", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={preOpValues.peanut}
                        onChange={(e) =>
                          handlePreOpInputChange("peanut", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={preOpValues.cottonoid}
                        onChange={(e) =>
                          handlePreOpInputChange("cottonoid", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={preOpValues.vesselLoop}
                        onChange={(e) =>
                          handlePreOpInputChange("vesselLoop", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={preOpValues.roller}
                        onChange={(e) =>
                          handlePreOpInputChange("roller", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={preOpValues.instrument}
                        onChange={(e) =>
                          handlePreOpInputChange("instrument", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={preOpValues.needle}
                        onChange={(e) =>
                          handlePreOpInputChange("needle", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Relief</td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={reliefValues.sponges}
                        onChange={(e) =>
                          handleReliefInputChange("sponges", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={reliefValues.gauze}
                        onChange={(e) =>
                          handleReliefInputChange("gauze", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={reliefValues.peanut}
                        onChange={(e) =>
                          handleReliefInputChange("peanut", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={reliefValues.cottonoid}
                        onChange={(e) =>
                          handleReliefInputChange("cottonoid", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={reliefValues.vesselLoop}
                        onChange={(e) =>
                          handleReliefInputChange("vesselLoop", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={reliefValues.roller}
                        onChange={(e) =>
                          handleReliefInputChange("roller", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={reliefValues.instrument}
                        onChange={(e) =>
                          handleReliefInputChange("instrument", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={reliefValues.needle}
                        onChange={(e) =>
                          handleReliefInputChange("needle", e.target.value)
                        }
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Closure</td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={closureValues.sponges}
                        onChange={(e) =>
                          handleClosureInputChange("sponges", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={closureValues.gauze}
                        onChange={(e) =>
                          handleClosureInputChange("gauze", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={closureValues.peanut}
                        onChange={(e) =>
                          handleClosureInputChange("peanut", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={closureValues.cottonoid}
                        onChange={(e) =>
                          handleClosureInputChange("cottonoid", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={closureValues.vesselLoop}
                        onChange={(e) =>
                          handleClosureInputChange("vesselLoop", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={closureValues.roller}
                        onChange={(e) =>
                          handleClosureInputChange("roller", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={closureValues.instrument}
                        onChange={(e) =>
                          handleClosureInputChange("instrument", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={closureValues.needle}
                        onChange={(e) =>
                          handleClosureInputChange("needle", e.target.value)
                        }
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Final</td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={finalValues.sponges}
                        onChange={(e) =>
                          handleFinalInputChange("sponges", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={finalValues.gauze}
                        onChange={(e) =>
                          handleFinalInputChange("gauze", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={finalValues.peanut}
                        onChange={(e) =>
                          handleFinalInputChange("peanut", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={finalValues.cottonoid}
                        onChange={(e) =>
                          handleFinalInputChange("cottonoid", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={finalValues.vesselLoop}
                        onChange={(e) =>
                          handleFinalInputChange("vesselLoop", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={finalValues.roller}
                        onChange={(e) =>
                          handleFinalInputChange("roller", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={finalValues.instrument}
                        onChange={(e) =>
                          handleFinalInputChange("instrument", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input_table_tye_site vvnm_p4"
                        value={finalValues.needle}
                        onChange={(e) =>
                          handleFinalInputChange("needle", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
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
            Sign Out - Before Patient Leaves Operating Room
          </h4>
          <br />
          <div className="OtMangement_con OtMangement_con_intra_check">
            <div className="OtMangementForm_1 OtMangementForm_1nurceees">
              <div className="edwue662l edwue662l_22">
                <label>
                  <p> Nurse verbally confirms with the team</p> <span>:</span>
                </label>
              </div>

              <div className="OtMangementForm_1_checkbox OtMangementForm_1_checkbox_2222">
                <label>
                  <input
                    type="checkbox"
                    name="nurseVerbally"
                    checked={checkboxValuesSignOut.nurseVerbally}
                    onChange={handleCheckboxChangeSignOut}
                  />
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 OtMangementForm_1nurceees">
              <div className="edwue662l edwue662l_22">
                <label>
                  <p> The Name of the Procedure Recorded</p> <span>:</span>
                </label>
              </div>

              <div className="OtMangementForm_1_checkbox OtMangementForm_1_checkbox_2222">
                <label>
                  <input
                    type="checkbox"
                    name="procedureRecorded"
                    checked={checkboxValuesSignOut.procedureRecorded}
                    onChange={handleCheckboxChangeSignOut}
                  />
                </label>
              </div>
            </div>
            <div className="OtMangementForm_1 OtMangementForm_1nurceees">
              <div className="edwue662l edwue662l_22">
                <label>
                  <p> Instruments, Sponge and Needle Counts are Correct </p>{" "}
                  <span>:</span>
                </label>
              </div>

              <div className="OtMangementForm_1_checkbox OtMangementForm_1_checkbox_2222 EDCEDSEW3">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedOption === "Yes"}
                    onChange={() => handleCheckboxClick("Yes")}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedOption === "No"}
                    onChange={() => handleCheckboxClick("No")}
                  />
                  No
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedOption === "NA"}
                    onChange={() => handleCheckboxClick("NA")}
                  />
                  N.A
                </label>
              </div>
            </div>

            {showAdditionalInputs && (
              <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                <div className="edwue662l edwue662l_22">
                  <label>
                    <p> If NO, whether Surgeon has been Informed: </p>{" "}
                    <span>:</span>
                  </label>
                </div>
                <div className="OtMangementForm_1_checkbox OtMangementForm_1_checkbox_2222">
                  <label>
                    <input
                      type="checkbox"
                      checked={surgeonInformed === "Yes"}
                      onChange={() => handleCheckboxClick34("Yes")}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={surgeonInformed === "No"}
                      onChange={() => handleCheckboxClick34("No")}
                    />
                    No
                  </label>
                </div>
              </div>
            )}

            <div className="OtMangementForm_1 OtMangementForm_1nurceees">
              <div className="edwue662l edwue662l_22">
                <label>
                  <p> How the Specimen is labelled (Including Patient Name) </p>{" "}
                  <span>:</span>
                </label>
              </div>

              <div className="OtMangementForm_1_checkbox OtMangementForm_1_checkbox_2222">
                <label>
                  <input
                    type="checkbox"
                    name="specimenLballedInclude"
                    checked={checkboxValuesSignOut.specimenLballedInclude}
                    onChange={handleCheckboxChangeSignOut}
                  />
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 OtMangementForm_1nurceees">
              <div className="edwue662l edwue662l_22">
                <label>
                  <p>
                    {" "}
                    Whether there are any Equipment Problems to be addressed
                  </p>{" "}
                  <span>:</span>
                </label>
              </div>

              <div className="OtMangementForm_1_checkbox OtMangementForm_1_checkbox_2222 EDCEDSEW3">
                <label>
                  <input
                    type="checkbox"
                    checked={whetherEquipment === "Yes"}
                    onChange={() => handleCheckboxClickEquipment("Yes")}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={whetherEquipment === "N.A"}
                    onChange={() => handleCheckboxClickEquipment("N.A")}
                  />
                  N.A
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 OtMangementForm_1nurceees">
              <div className="edwue662l edwue662l_22">
                <label>
                  <p>
                    {" "}
                    Surgeon, Anaesthesia Professional and Nurse Review the Key
                    concerns for Recovery and Management
                  </p>{" "}
                  <span>:</span>
                </label>
              </div>

              <div className="OtMangementForm_1_checkbox OtMangementForm_1_checkbox_2222">
                <label>
                  <input
                    type="checkbox"
                    name="recoveryandManagement"
                    checked={checkboxValuesSignOut.recoveryandManagement}
                    onChange={handleCheckboxChangeSignOut}
                  />
                </label>
              </div>
            </div>
          </div>

          <br />
          <div className="stable_unstable_dic_u">
            <h4
              style={{
                color: "var(--labelcolor)",
                display: "flex",
                gap:'10px',
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "start",
                padding: "10px",
              }}
            >
              Condition of Patient at end of Surgery <span>:</span>
            </h4>
            <h4
              className="xyu6qrlscx0awd"
              style={{
                color: "var(--labelcolor)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "start",
                padding: "10px",
              }}
            >
              {" "}
              <label>
                <input
                  type="checkbox"
                  checked={stableUnstable === "Stable"}
                  onChange={() => handleCheckboxClickStableUnstable("Stable")}
                />
                Stable
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={stableUnstable === "UnStable"}
                  onChange={() => handleCheckboxClickStableUnstable("UnStable")}
                />
                Unstable
              </label>
            </h4>
          </div>

          <div className="OtMangement_con">
            <div className="Selected-table-container">
              <table className="selected-medicine-table2">
                <thead>
                  <tr>
                    <th id="slectbill_ins">Sign out Participants</th>
                    <th id="slectbill_ins">Name</th>
                    <th id="slectbill_ins">Sign</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Surgeon</td>
                    <td className="nurse_sign_capte45 okwixs7xs9">
                      <input
                        type="text"
                        value={CheckedformData.surgeon.name}
                        onChange={(e) => handleInputChange(e, "surgeon")}
                      />
                    </td>
                    <td>
                      <img
                        // src={CheckedformData.surgeon.sign}
                        src={rajeshkumar}
                        alt="SurgeonSign"
                        className="img_ckecd_dctr"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Anaesthesiologist</td>
                    <td className="nurse_sign_capte45 okwixs7xs9">
                      <input
                        type="text"
                        value={CheckedformData.anaesthesiologist.name}
                        onChange={(e) =>
                          handleInputChange(e, "anaesthesiologist")
                        }
                      />
                    </td>
                    <td>
                      <img
                        src={CheckedformData.anaesthesiologist.sign}
                        alt="SurgeonSign"
                        className="img_ckecd_dctr"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Scrub Nurse</td>
                    <td className="nurse_sign_capte45 okwixs7xs9">
                      <input
                        type="text"
                        value={CheckedformData.scrubNurse.name}
                        onChange={(e) => handleInputChange(e, "scrubNurse")}
                      />
                    </td>
                    <td>
                      <img
                        src={CheckedformData.scrubNurse.sign}
                        alt="SurgeonSign"
                        className="img_ckecd_dctr"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Technician</td>
                    <td className="nurse_sign_capte45 okwixs7xs9">
                      <input
                        type="text"
                        value={CheckedformData.technician.name}
                        onChange={(e) => handleInputChange(e, "technician")}
                      />
                    </td>
                    <td>
                      <img
                        src={CheckedformData.technician.sign}
                        alt="SurgeonSign"
                        className="img_ckecd_dctr"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Circulating Nurse</td>
                    <td className="nurse_sign_capte45 okwixs7xs9">
                      <input
                        type="text"
                        value={CheckedformData.circulatingNurse.name}
                        onChange={(e) =>
                          handleInputChange(e, "circulatingNurse")
                        }
                      />
                    </td>
                    <td>
                      <img
                        src={CheckedformData.circulatingNurse.sign}
                        alt="SurgeonSign"
                        className="img_ckecd_dctr"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Others</td>
                    <td className="nurse_sign_capte45 okwixs7xs9">
                      <input
                        type="text"
                        value={CheckedformData.others.name}
                        onChange={(e) => handleInputChange(e, "others")}
                      />
                    </td>
                    <td>
                      <img
                        src={CheckedformData.others.sign}
                        alt="SurgeonSign"
                        className="img_ckecd_dctr"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <br />

          <div className="jdcneuir8o34di">
            <div className="RegisForm_1 ewferjd">
              <label htmlFor="implantDetails">
                Implant Details<span>:</span>
              </label>
              <textarea
                id="implantDetails"
                name="implantDetails"
                value={implantDetails}
                onChange={handleInputChangeImplantDetails}
                required
              />
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
                  Time Out Before Induction to be Checked
                </h4>

                <div className="OtMangement_con_headerey7">
                  <div className="OtMangement_con OtMangement_con_intra_check">
                    <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                      <div className="edwue662l">
                        <label>
                          <p>
                            {" "}
                            Correct Patient<h6>Verifies with ID Band</h6>
                          </p>{" "}
                          <span>:</span>
                        </label>
                      </div>

                      <div className="OtMangementForm_1_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="correctPatient"
                            checked={checkboxValues.correctPatient}
                            onChange={handleCheckboxChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                      <div className="edwue662l">
                        <label>
                          <p>
                            {" "}
                            Correct Site and side
                            <h6>
                              Verifies with Surgical & Anesthesia Consent , Site
                              Marking & Imaging data
                            </h6>
                          </p>{" "}
                          <span>:</span>
                        </label>
                      </div>

                      <div className="OtMangementForm_1_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="correctSiteAndSide"
                            checked={checkboxValues.correctSiteAndSide}
                            onChange={handleCheckboxChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                      <div className="edwue662l">
                        <label>
                          <p>
                            {" "}
                            Agreement on Correct Procedure{" "}
                            <h6>Verifies with Consent</h6>
                          </p>{" "}
                          <span>:</span>
                        </label>
                      </div>

                      <div className="OtMangementForm_1_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="agreementOnCorrectProcedure"
                            checked={checkboxValues.agreementOnCorrectProcedure}
                            onChange={handleCheckboxChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                      <div className="edwue662l">
                        <label>
                          <p>
                            {" "}
                            Correct Patient Position{" "}
                            <h6>Verifies with Operating Surgeon</h6>
                          </p>{" "}
                          <span>:</span>
                        </label>
                      </div>

                      <div className="OtMangementForm_1_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="correctPatientPosition"
                            checked={checkboxValues.correctPatientPosition}
                            onChange={handleCheckboxChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                      <div className="edwue662l">
                        <label>
                          <p>
                            {" "}
                            Availability of Correct implants / equipment{" "}
                            <h6>Any issues ? Verifies with srub Nurse</h6>
                          </p>{" "}
                          <span>:</span>
                        </label>
                      </div>

                      <div className="OtMangementForm_1_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="availabilityOfCorrectEquipment"
                            checked={
                              checkboxValues.availabilityOfCorrectEquipment
                            }
                            onChange={handleCheckboxChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                      <div className="edwue662l">
                        <label>
                          <p>
                            {" "}
                            Blood Available{" "}
                            <h6>
                              Verifies and Physically cheeks in OR Blood Bank
                              Refrigerator by scrub Nurse
                            </h6>
                          </p>{" "}
                          <span>:</span>
                        </label>
                      </div>

                      <div className="OtMangementForm_1_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="bloodAvailable"
                            checked={checkboxValues.bloodAvailable}
                            onChange={handleCheckboxChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                      <div className="edwue662l">
                        <label>
                          <p>
                            {" "}
                            Prophylactic Antibiotic within 60mins{" "}
                            <h6>Not Applicable Verifies width scrub Nurse</h6>
                          </p>{" "}
                          <span>:</span>
                        </label>
                      </div>

                      <div className="OtMangementForm_1_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="prophylacticAntibiotic"
                            checked={checkboxValues.prophylacticAntibiotic}
                            onChange={handleCheckboxChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                      <div className="edwue662l">
                        <label>
                          <p>
                            {" "}
                            Essential Imaging Display{" "}
                            <h6>Verifies with Display Lobby</h6>
                          </p>{" "}
                          <span>:</span>
                        </label>
                      </div>

                      <div className="OtMangementForm_1_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="essentialImagingDisplay"
                            checked={checkboxValues.essentialImagingDisplay}
                            onChange={handleCheckboxChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="OtMangement_con">
                    <div className="Selected-table-container">
                      <table className="selected-medicine-table2">
                        <thead>
                          <tr>
                            <th id="slectbill_ins">Checked By</th>
                            <th id="slectbill_ins">Name</th>
                            <th id="slectbill_ins">Sign</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Surgeon</td>
                            <td className="nurse_sign_capte45 okwixs7xs9">
                              <input
                                type="text"
                                value={CheckedformData.surgeon.name}
                                onChange={(e) =>
                                  handleInputChange(e, "surgeon")
                                }
                              />
                            </td>
                            <td>
                              <img
                                // src={CheckedformData.surgeon.sign}
                                src={rajeshkumar}
                                alt="SurgeonSign"
                                className="img_ckecd_dctr"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Anaesthesiologist</td>
                            <td className="nurse_sign_capte45 okwixs7xs9">
                              <input
                                type="text"
                                value={CheckedformData.anaesthesiologist.name}
                                onChange={(e) =>
                                  handleInputChange(e, "anaesthesiologist")
                                }
                              />
                            </td>
                            <td>
                              <img
                                src={CheckedformData.anaesthesiologist.sign}
                                alt="SurgeonSign"
                                className="img_ckecd_dctr"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Scrub Nurse</td>
                            <td className="nurse_sign_capte45 okwixs7xs9">
                              <input
                                type="text"
                                value={CheckedformData.scrubNurse.name}
                                onChange={(e) =>
                                  handleInputChange(e, "scrubNurse")
                                }
                              />
                            </td>
                            <td>
                              <img
                                src={CheckedformData.scrubNurse.sign}
                                alt="SurgeonSign"
                                className="img_ckecd_dctr"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Technician</td>
                            <td className="nurse_sign_capte45 okwixs7xs9">
                              <input
                                type="text"
                                value={CheckedformData.technician.name}
                                onChange={(e) =>
                                  handleInputChange(e, "technician")
                                }
                              />
                            </td>
                            <td>
                              <img
                                src={CheckedformData.technician.sign}
                                alt="SurgeonSign"
                                className="img_ckecd_dctr"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Circulating Nurse</td>
                            <td className="nurse_sign_capte45 okwixs7xs9">
                              <input
                                type="text"
                                value={CheckedformData.circulatingNurse.name}
                                onChange={(e) =>
                                  handleInputChange(e, "circulatingNurse")
                                }
                              />
                            </td>
                            <td>
                              <img
                                src={CheckedformData.circulatingNurse.sign}
                                alt="SurgeonSign"
                                className="img_ckecd_dctr"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Others</td>
                            <td className="nurse_sign_capte45 okwixs7xs9">
                              <input
                                type="text"
                                value={CheckedformData.others.name}
                                onChange={(e) => handleInputChange(e, "others")}
                              />
                            </td>
                            <td>
                              <img
                                src={CheckedformData.others.sign}
                                alt="SurgeonSign"
                                className="img_ckecd_dctr"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
                  Call Out - Before Incision
                </h4>
                <div className="OtMangement_con_headerey7 eredr4f">
                  <div className="OtMangement_con">
                    <div className="Selected-table-container">
                      <table className="selected-medicine-table2">
                        <thead>
                          <tr>
                            <th id="slectbill_ins">Time Out Participants</th>
                            <th id="slectbill_ins">Checked with</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Surgeon</td>
                            <td>
                              <div className="OtMangementForm_1_checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="surgeon"
                                    checked={CallOutcheckboxValues.surgeon}
                                    onChange={handleCheckboxChangeCallOut}
                                  />
                                </label>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>Anaesthesiologist</td>
                            <td>
                              <div className="OtMangementForm_1_checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="anaesthesiologist"
                                    checked={
                                      CallOutcheckboxValues.anaesthesiologist
                                    }
                                    onChange={handleCheckboxChangeCallOut}
                                  />
                                </label>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>Scrub Nurse</td>
                            <td>
                              <div className="OtMangementForm_1_checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="scrubNurse"
                                    checked={CallOutcheckboxValues.scrubNurse}
                                    onChange={handleCheckboxChangeCallOut}
                                  />
                                </label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Technician</td>
                            <td>
                              <div className="OtMangementForm_1_checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="technician"
                                    checked={CallOutcheckboxValues.technician}
                                    onChange={handleCheckboxChangeCallOut}
                                  />
                                </label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Circulating Nurse</td>
                            <td>
                              <div className="OtMangementForm_1_checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="circulatingNurse"
                                    checked={
                                      CallOutcheckboxValues.circulatingNurse
                                    }
                                    onChange={handleCheckboxChangeCallOut}
                                  />
                                </label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Others</td>
                            <td>
                              <div className="OtMangementForm_1_checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="others"
                                    checked={CallOutcheckboxValues.others}
                                    onChange={handleCheckboxChangeCallOut}
                                  />
                                </label>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="OtMangement_con">
                    <div className="Selected-table-container">
                      <table className="selected-medicine-table2">
                        <thead>
                          <tr>
                            <th id="slectbill_ins"> By Circulating Nurse</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="nurse_sign_capte45 okwixs7xs9">
                              <label>
                                Name <span>:</span>
                              </label>
                              <input type="text"></input>
                            </td>
                          </tr>
                          <tr>
                            <td className="nurse_sign_capte45 okwixs7xs9">
                              <label>
                                Sign <span>:</span>
                              </label>
                              <img
                                // src={CheckedformData.surgeon.sign}
                                src={rajeshkumar}
                                alt="SurgeonSign"
                                className="img_ckecd_dctr"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="nurse_sign_capte45 okwixs7xs9">
                              <label>
                                Date <span>:</span>
                              </label>
                              <input type="date"></input>
                            </td>
                          </tr>
                          <tr>
                            <td className="nurse_sign_capte45 okwixs7xs9">
                              <label>
                                Time <span>:</span>
                              </label>
                              <input type="time"></input>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <br />

                <div className="Otdoctor_intra_Con">
                  <div className="Otdoctor_intra_Con_2_input">
                    <label>
                      Procedure Start Time <span>:</span>
                    </label>
                    <input
                      type="time"
                      // value={ProcedureStartTime}
                    />
                  </div>
                  <div className="Otdoctor_intra_Con_2_input">
                    <label>
                      {" "}
                      Procedure End Time <span>:</span>
                    </label>
                    <input
                      type="time"
                      // value={ProcedureEndTime}
                    />
                  </div>

                  <div className="Otdoctor_intra_Con_2_input">
                    <label>
                      {" "}
                      Threatre <span>:</span>
                    </label>
                    <input
                      type="text"
                      // value={Threatre}
                    />
                  </div>

                  <div className="Otdoctor_intra_Con">
                    <div className="Otdoctor_intra_Con_udy6d">
                      <div className="Otdoctor_intra_Con_2_input">
                        <label>
                          Specimen <span>:</span>
                        </label>
                        <input
                          type="text"
                          value={specimen}
                          onChange={handleSpecimenChange}
                        />
                      </div>

                      <div className="OtMangementForm_1_checkbox_Intraaaaa">
                        <label>
                          <input
                            type="checkbox"
                            value="Pathology"
                            checked={selectedCheckbox === "Pathology"}
                            onChange={handleCheckboxChangeSpecimen}
                          />
                          <span>Pathology</span>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            value="Permanent"
                            checked={selectedCheckbox === "Permanent"}
                            onChange={handleCheckboxChangeSpecimen}
                          />
                          <span>Permanent</span>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            value="FrozenSection"
                            checked={selectedCheckbox === "FrozenSection"}
                            onChange={handleCheckboxChangeSpecimen}
                          />
                          <span>Frozen Section</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="Otdoctor_intra_Con_2_input">
                    <label>
                      {" "}
                      Frozen Time Sent <span>:</span>
                    </label>
                    <input
                      type="time"
                      // value={ProcedureEndTime}
                    />
                  </div>

                  <div className="Otdoctor_intra_Con_2_input">
                    <label>
                      {" "}
                      Time of Report<span>:</span>
                    </label>
                    <input
                      type="time"
                      // value={ProcedureEndTime}
                    />
                  </div>
                </div>
                <br />
                <br />
                <div className="Otdoctor_intra_Con">
                  <div className="text_adjust_mt_Ot">
                    <label style={{ width: "250px" }}>
                      Drains / Catheters / Implants / Packing
                    </label>
                  </div>
                  <div className="Selected-table-container">
                    <table className="selected-medicine-table2">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Size</th>
                          <th>Site</th>
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
                                className="input_table_tye_site"
                                value={item.type}
                                onChange={(event) =>
                                  handleInputChangeTable(event, index, "type")
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="input_table_tye_site"
                                value={item.size}
                                onChange={(event) =>
                                  handleInputChangeTable(event, index, "size")
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="input_table_tye_site"
                                value={item.site}
                                onChange={(event) =>
                                  handleInputChangeTable(event, index, "site")
                                }
                              />
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
                </div>

                <br />
                <div className="Otdoctor_intra_Con">
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
                    Counts
                  </h4>

                  <div className="Selected-table-container">
                    <table className="selected-medicine-table2">
                      <thead>
                        <tr>
                          <th>COUNT</th>
                          <th>Sponges</th>
                          <th>Gauze</th>
                          <th>Peanut </th>
                          <th>Cottonoid </th>
                          <th>Vessel Loop </th>
                          <th>Roller</th>
                          <th>Instrument </th>
                          <th>Needle </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Pre - op</td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={preOpValues.sponges}
                              onChange={(e) =>
                                handlePreOpInputChange(
                                  "sponges",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={preOpValues.gauze}
                              onChange={(e) =>
                                handlePreOpInputChange("gauze", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={preOpValues.peanut}
                              onChange={(e) =>
                                handlePreOpInputChange("peanut", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={preOpValues.cottonoid}
                              onChange={(e) =>
                                handlePreOpInputChange(
                                  "cottonoid",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={preOpValues.vesselLoop}
                              onChange={(e) =>
                                handlePreOpInputChange(
                                  "vesselLoop",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={preOpValues.roller}
                              onChange={(e) =>
                                handlePreOpInputChange("roller", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={preOpValues.instrument}
                              onChange={(e) =>
                                handlePreOpInputChange(
                                  "instrument",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={preOpValues.needle}
                              onChange={(e) =>
                                handlePreOpInputChange("needle", e.target.value)
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Relief</td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={reliefValues.sponges}
                              onChange={(e) =>
                                handleReliefInputChange(
                                  "sponges",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={reliefValues.gauze}
                              onChange={(e) =>
                                handleReliefInputChange("gauze", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={reliefValues.peanut}
                              onChange={(e) =>
                                handleReliefInputChange(
                                  "peanut",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={reliefValues.cottonoid}
                              onChange={(e) =>
                                handleReliefInputChange(
                                  "cottonoid",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={reliefValues.vesselLoop}
                              onChange={(e) =>
                                handleReliefInputChange(
                                  "vesselLoop",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={reliefValues.roller}
                              onChange={(e) =>
                                handleReliefInputChange(
                                  "roller",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={reliefValues.instrument}
                              onChange={(e) =>
                                handleReliefInputChange(
                                  "instrument",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={reliefValues.needle}
                              onChange={(e) =>
                                handleReliefInputChange(
                                  "needle",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>Closure</td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={closureValues.sponges}
                              onChange={(e) =>
                                handleClosureInputChange(
                                  "sponges",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={closureValues.gauze}
                              onChange={(e) =>
                                handleClosureInputChange(
                                  "gauze",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={closureValues.peanut}
                              onChange={(e) =>
                                handleClosureInputChange(
                                  "peanut",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={closureValues.cottonoid}
                              onChange={(e) =>
                                handleClosureInputChange(
                                  "cottonoid",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={closureValues.vesselLoop}
                              onChange={(e) =>
                                handleClosureInputChange(
                                  "vesselLoop",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={closureValues.roller}
                              onChange={(e) =>
                                handleClosureInputChange(
                                  "roller",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={closureValues.instrument}
                              onChange={(e) =>
                                handleClosureInputChange(
                                  "instrument",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={closureValues.needle}
                              onChange={(e) =>
                                handleClosureInputChange(
                                  "needle",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>Final</td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={finalValues.sponges}
                              onChange={(e) =>
                                handleFinalInputChange(
                                  "sponges",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={finalValues.gauze}
                              onChange={(e) =>
                                handleFinalInputChange("gauze", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={finalValues.peanut}
                              onChange={(e) =>
                                handleFinalInputChange("peanut", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={finalValues.cottonoid}
                              onChange={(e) =>
                                handleFinalInputChange(
                                  "cottonoid",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={finalValues.vesselLoop}
                              onChange={(e) =>
                                handleFinalInputChange(
                                  "vesselLoop",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={finalValues.roller}
                              onChange={(e) =>
                                handleFinalInputChange("roller", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={finalValues.instrument}
                              onChange={(e) =>
                                handleFinalInputChange(
                                  "instrument",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input_table_tye_site vvnm_p4"
                              value={finalValues.needle}
                              onChange={(e) =>
                                handleFinalInputChange("needle", e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                  Sign Out - Before Patient Leaves Operating Room
                </h4>
                <br />
                <br />
                <div className="OtMangement_con OtMangement_con_intra_check">
                  <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                    <div className="edwue662l">
                      <label>
                        <p> Nurse verbally confirms withe the team</p>{" "}
                        <span>:</span>
                      </label>
                    </div>

                    <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222">
                      <label>
                        <input
                          type="checkbox"
                          name="nurseVerbally"
                          checked={checkboxValuesSignOut.nurseVerbally}
                          onChange={handleCheckboxChangeSignOut}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                    <div className="edwue662l">
                      <label>
                        <p> The Name of the Procedure Recorded</p>{" "}
                        <span>:</span>
                      </label>
                    </div>

                    <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222 ">
                      <label>
                        <input
                          type="checkbox"
                          name="procedureRecorded"
                          checked={checkboxValuesSignOut.procedureRecorded}
                          onChange={handleCheckboxChangeSignOut}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                    <div className="edwue662l">
                      <label>
                        <p>
                          {" "}
                          Instruments, Sponge and Needle Counts are Correct{" "}
                        </p>{" "}
                        <span>:</span>
                      </label>
                    </div>

                    <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222 EDCEDSEW3">
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedOption === "Yes"}
                          onChange={() => handleCheckboxClick("Yes")}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedOption === "No"}
                          onChange={() => handleCheckboxClick("No")}
                        />
                        No
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedOption === "NA"}
                          onChange={() => handleCheckboxClick("NA")}
                        />
                        N.A
                      </label>
                    </div>
                  </div>

                  {showAdditionalInputs && (
                    <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                      <div className="edwue662l">
                        <label>
                          <p> If NO, whether Surgeon has been Informed: </p>{" "}
                          <span>:</span>
                        </label>
                      </div>
                      <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222">
                        <label>
                          <input
                            type="checkbox"
                            checked={surgeonInformed === "Yes"}
                            onChange={() => handleCheckboxClick34("Yes")}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={surgeonInformed === "No"}
                            onChange={() => handleCheckboxClick34("No")}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                    <div className="edwue662l">
                      <label>
                        <p>
                          {" "}
                          How the Specimen is labelled (Including Patient Name){" "}
                        </p>{" "}
                        <span>:</span>
                      </label>
                    </div>

                    <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222">
                      <label>
                        <input
                          type="checkbox"
                          name="specimenLballedInclude"
                          checked={checkboxValuesSignOut.specimenLballedInclude}
                          onChange={handleCheckboxChangeSignOut}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                    <div className="edwue662l">
                      <label>
                        <p>
                          {" "}
                          Whether there are any Equipment Problems to be
                          addressed
                        </p>{" "}
                        <span>:</span>
                      </label>
                    </div>

                    <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222 EDCEDSEW3">
                      <label>
                        <input
                          type="checkbox"
                          checked={whetherEquipment === "Yes"}
                          onChange={() => handleCheckboxClickEquipment("Yes")}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={whetherEquipment === "N.A"}
                          onChange={() => handleCheckboxClickEquipment("N.A")}
                        />
                        N.A
                      </label>
                    </div>
                  </div>

                  <div className="OtMangementForm_1 OtMangementForm_1nurceees">
                    <div className="edwue662l">
                      <label>
                        <p>
                          {" "}
                          Surgeon, Anaesthesia Professional and Nurse Review the
                          Key concerns for Recovery and Management
                        </p>{" "}
                        <span>:</span>
                      </label>
                    </div>

                    <div className="OtMangementForm_1_checkbox  OtMangementForm_1_checkbox_2222">
                      <label>
                        <input
                          type="checkbox"
                          name="recoveryandManagement"
                          checked={checkboxValuesSignOut.recoveryandManagement}
                          onChange={handleCheckboxChangeSignOut}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <br />
                <br />
                <br />
                <br />
                <div className="stable_unstable_dic_u">
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
                    Condition of Patient at the end of Surgery :
                  </h4>
                  <h4
                    className="xyu6qrlscx0awd"
                    style={{
                      color: "var(--labelcolor)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "start",
                      padding: "10px",
                    }}
                  >
                    {" "}
                    <label>
                      <input
                        type="checkbox"
                        checked={stableUnstable === "Stable"}
                        onChange={() =>
                          handleCheckboxClickStableUnstable("Stable")
                        }
                      />
                      Stable
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={stableUnstable === "UnStable"}
                        onChange={() =>
                          handleCheckboxClickStableUnstable("UnStable")
                        }
                      />
                      Unstable
                    </label>
                  </h4>
                </div>

                <div className="OtMangement_con">
                  <div className="Selected-table-container">
                    <table className="selected-medicine-table2">
                      <thead>
                        <tr>
                          <th id="slectbill_ins">Sign out Participants</th>
                          <th id="slectbill_ins">Name</th>
                          <th id="slectbill_ins">Sign</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Surgeon</td>
                          <td className="nurse_sign_capte45 okwixs7xs9">
                            <input
                              type="text"
                              value={CheckedformData.surgeon.name}
                              onChange={(e) => handleInputChange(e, "surgeon")}
                            />
                          </td>
                          <td>
                            <img
                              // src={CheckedformData.surgeon.sign}
                              src={rajeshkumar}
                              alt="SurgeonSign"
                              className="img_ckecd_dctr"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Anaesthesiologist</td>
                          <td className="nurse_sign_capte45 okwixs7xs9">
                            <input
                              type="text"
                              value={CheckedformData.anaesthesiologist.name}
                              onChange={(e) =>
                                handleInputChange(e, "anaesthesiologist")
                              }
                            />
                          </td>
                          <td>
                            <img
                              src={CheckedformData.anaesthesiologist.sign}
                              alt="SurgeonSign"
                              className="img_ckecd_dctr"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Scrub Nurse</td>
                          <td className="nurse_sign_capte45 okwixs7xs9">
                            <input
                              type="text"
                              value={CheckedformData.scrubNurse.name}
                              onChange={(e) =>
                                handleInputChange(e, "scrubNurse")
                              }
                            />
                          </td>
                          <td>
                            <img
                              src={CheckedformData.scrubNurse.sign}
                              alt="SurgeonSign"
                              className="img_ckecd_dctr"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Technician</td>
                          <td className="nurse_sign_capte45 okwixs7xs9">
                            <input
                              type="text"
                              value={CheckedformData.technician.name}
                              onChange={(e) =>
                                handleInputChange(e, "technician")
                              }
                            />
                          </td>
                          <td>
                            <img
                              src={CheckedformData.technician.sign}
                              alt="SurgeonSign"
                              className="img_ckecd_dctr"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Circulating Nurse</td>
                          <td className="nurse_sign_capte45 okwixs7xs9">
                            <input
                              type="text"
                              value={CheckedformData.circulatingNurse.name}
                              onChange={(e) =>
                                handleInputChange(e, "circulatingNurse")
                              }
                            />
                          </td>
                          <td>
                            <img
                              src={CheckedformData.circulatingNurse.sign}
                              alt="SurgeonSign"
                              className="img_ckecd_dctr"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Others</td>
                          <td className="nurse_sign_capte45 okwixs7xs9">
                            <input
                              type="text"
                              value={CheckedformData.others.name}
                              onChange={(e) => handleInputChange(e, "others")}
                            />
                          </td>
                          <td>
                            <img
                              src={CheckedformData.others.sign}
                              alt="SurgeonSign"
                              className="img_ckecd_dctr"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <br />

                <div className="jdcneuir8o34di">
                  <div className="RegisForm_1 ewferjd">
                    <label htmlFor="implantDetails">
                      Implant Details<span>:</span>
                    </label>
                    <textarea
                      id="implantDetails"
                      name="implantDetails"
                      value={implantDetails}
                      onChange={handleInputChangeImplantDetails}
                      required
                    />
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

export default OtNurseIntra;
