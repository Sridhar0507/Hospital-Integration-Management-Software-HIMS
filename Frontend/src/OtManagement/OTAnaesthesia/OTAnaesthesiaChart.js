import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";


const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});


function OTAnaesthesiaChart() {

  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const dispatchvalue = useDispatch();

  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);

  const componentRef = useRef();
 
  const handlePrint2 = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: async () => {
   
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



  const [inputValuesChart, setInputValuesChart] = useState({
    bloodLinesIV: "",
    bloodLinesIA: "",
    timeOfInduction: "",
    timeOfIncision: "",
    CompletionofSurgery: "",
    SettingSurgery: "",
    timeOfExtubation: "",
  });

  const [showTimeOfExtubation, setShowTimeOfExtubation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "SettingSurgery") {
      setInputValuesChart((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setShowTimeOfExtubation(value === "Extubated");
    } else {
      setInputValuesChart((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const [tables, setTables] = useState([[]]);

  const anesthesiaData = [
    {
      time: "",
      gas: "Oxygen",
      gasDose: "",
      etco2: "",
      cvp: "",
      urineOutput: "",
      totalBloodLoss: "",
      otherLosses: "",
      inputOutputBalance: "",
    },
    {
      time: "",
      gas: "Nitrous Oxide",
      gasDose: "",
      etco2: "",
      cvp: "",
      urineOutput: "",
      totalBloodLoss: "",
      otherLosses: "",
      inputOutputBalance: "",
    },
    {
      time: "",
      gas: "Halothane",
      gasDose: "",
      etco2: "",
      cvp: "",
      urineOutput: "",
      totalBloodLoss: "",
      otherLosses: "",
      inputOutputBalance: "",
    },
    {
      time: "",
      gas: "Isoflurane",
      gasDose: "",
      etco2: "",
      cvp: "",
      urineOutput: "",
      totalBloodLoss: "",
      otherLosses: "",
      inputOutputBalance: "",
    },
    {
      time: "",
      gas: "Sevoflurane",
      gasDose: "",
      etco2: "",
      cvp: "",
      urineOutput: "",
      totalBloodLoss: "",
      otherLosses: "",
      inputOutputBalance: "",
    },
    {
      time: "",
      gas: "Desflurane",
      gasDose: "",
      etco2: "",
      cvp: "",
      urineOutput: "",
      totalBloodLoss: "",
      otherLosses: "",
      inputOutputBalance: "",
    },
  ];

  const handleInputChangeTable = (tableIndex, rowIndex, key, value) => {
    const newTables = tables.map((table, index) => {
      if (index !== tableIndex) return table;
      return table.map((data, dataIndex) => {
        if (dataIndex !== rowIndex) return data;
        return { ...data, [key]: value };
      });
    });
    setTables(newTables);
  };

  useEffect(() => {
    setTables([anesthesiaData.map((data) => ({ ...data }))]);
  }, []);

  const addTable = () => {
    setTables([...tables, anesthesiaData.map((data) => ({ ...data }))]);
  };

  const deleteTable = () => {
    if (tables.length > 1) {
      const updatedTables = tables.slice(0, -1);

      setTables(updatedTables);
    }
  };

  return (

    <>
          {isPrintButtonVisible ? (
    <div className="new-patient-registration-form">
      <div className="RegisFormcon">
        <div className="RegisForm_1">
          <label htmlFor="bloodLinesIV">
            Blood Lines Inserted IV <span>:</span>
          </label>
          <input
            type="text"
            id="bloodLinesIV"
            name="bloodLinesIV"
            list="bloodLinesIVOptions"
            value={inputValuesChart.bloodLinesIV}
            onChange={handleInputChange}
            required
          />
          <datalist id="bloodLinesIVOptions">
            <option value="External Jugular" />
            <option value="Subclavian vein" />
            <option value="Femoral vein" />
            <option value="Dorsal Venous Network of Hand" />
            <option value="Radial vein" />
            <option value="Median Cubital vein" />
            <option value="Cephalic vein" />
            <option value="Dorsal Venous Network of Leg" />
            <option value="Saphenous vein" />
            <option value="Superficial Temporal vein" />
          </datalist>
        </div>
        <div className="RegisForm_1">
          <label htmlFor="bloodLinesIA">
            Blood Lines Inserted IA <span>:</span>
          </label>
          <input
            type="text"
            id="bloodLinesIA"
            name="bloodLinesIA"
            list="bloodLinesIAOptions"
            value={inputValuesChart.bloodLinesIA}
            onChange={handleInputChange}
            required
          />
          <datalist id="bloodLinesIAOptions">
            <option value="Radial" />
            <option value="Ulnar" />
            <option value="Brachial" />
            <option value="Xillary" />
            <option value="Posterior tibial" />
            <option value="Femoral" />
            <option value="Dorsalis pedis" />
          </datalist>
        </div>

        <div className="RegisForm_1">
          <label htmlFor="timeOfInduction">
            Time of Induction <span>:</span>
          </label>
          <input
            type="time"
            id="timeOfInduction"
            name="timeOfInduction"
            value={inputValuesChart.timeOfInduction}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="RegisForm_1">
          <label htmlFor="timeOfIncision">
            Time of Incision <span>:</span>
          </label>
          <input
            type="time"
            id="timeOfIncision"
            name="timeOfIncision"
            value={inputValuesChart.timeOfIncision}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <br />

      <div className="Selected-table-container">
        {tables.map((table, tableIndex) => (
          <div key={tableIndex}>
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
              Table {tableIndex + 1}
            </h4>
            <table className="selected-medicine-table2">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Gas</th>
                  <th>Gas Dose (ml/min)</th>
                  <th>ETCO2 (mmHg)</th>
                  <th>CVP (mmHg)</th>
                  <th>Urine Output (ml)</th>
                  <th>Total Blood Loss</th>
                  <th>Other Losses</th>
                  <th>Input-Output Balance</th>
                </tr>
              </thead>
              <tbody>
                {table.map((data, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
                      <input
                        type="time"
                        className="chart_table_anathes"
                        value={data.time}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "time",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="chart_table_anathes"
                        value={data.gas}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "gas",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.gasDose}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "gasDose",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.etco2}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "etco2",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.cvp}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "cvp",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.urineOutput}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "urineOutput",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.totalBloodLoss}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "totalBloodLoss",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.otherLosses}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "otherLosses",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.inputOutputBalance}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "inputOutputBalance",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {tableIndex === tables.length - 1 && (
              <div className="Register_btn_con">
                <button className="RegisterForm_1_btns" onClick={addTable}>
                  <AddCircleOutlineIcon />
                </button>
                <button className="RegisterForm_1_btns" onClick={deleteTable}>
                  <DeleteOutlineIcon />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <br />

      <div className="RegisFormcon" style={{ justifyContent: "center" }}>
        <div className="RegisForm_1 ref3e34dew343">
          <label htmlFor="CompletionofSurgery">
            Time of Completion of Surgery <span>:</span>
          </label>
          <input
            type="text"
            id="CompletionofSurgery"
            name="CompletionofSurgery"
            value={inputValuesChart.CompletionofSurgery}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <br />
      <br />
      <div className="RegisFormcon" style={{ justifyContent: "center" }}>
        <div className="OtMangementForm_1 djkwked675">
          <label>
            Ventilator Setting at Surgery Completion <span>:</span>
          </label>

          <div className="OtMangementForm_1_checkbox djkwked67eee5">
            <label htmlFor="Spontaneous" className="">
              <input
                type="checkbox"
                id="Spontaneous"
                name="SettingSurgery"
                value="Spontaneous"
                checked={inputValuesChart.SettingSurgery === "Spontaneous"}
                onChange={handleInputChange}
              />
              <span>Spontaneous</span>
            </label>
            <label htmlFor="Assisted">
              <input
                type="checkbox"
                id="Assisted"
                name="SettingSurgery"
                value="Assisted"
                checked={inputValuesChart.SettingSurgery === "Assisted"}
                onChange={handleInputChange}
              />
              <span>Assisted</span>
            </label>
            <label htmlFor="Controlled">
              <input
                type="checkbox"
                id="Controlled"
                name="SettingSurgery"
                value="Controlled"
                checked={inputValuesChart.SettingSurgery === "Controlled"}
                onChange={handleInputChange}
              />
              <span>Controlled</span>
            </label>
            <label htmlFor="Extubated">
              <input
                type="checkbox"
                id="Extubated"
                name="SettingSurgery"
                value="Extubated"
                checked={inputValuesChart.SettingSurgery === "Extubated"}
                onChange={handleInputChange}
              />
              <span>Extubated</span>
            </label>
          </div>
        </div>
      </div>
      <br />

      {showTimeOfExtubation && (
        <div className="RegisFormcon" style={{ justifyContent: "center" }}>
          <div className="RegisForm_1 ref3e34dew343">
            <label htmlFor="Extubation">
              Time of Extubation <span>:</span>
            </label>
            <input
              type="text"
              id="Extubation"
              name="timeOfExtubation"
              value={inputValuesChart.timeOfExtubation}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      )}
      <br />
      <br />

{isPrintButtonVisible && (
  <div className="Register_btn_con">
    <button className="RegisterForm_1_btns" onClick={Submitalldata}>
      Print
    </button>
  </div>
)}
<br /></div>

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
                      <img 
                      src={bgImg2} 
                      alt="Default Patient Photo" />
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

            <div className="new-patient-registration-form">
              <br />
            <div className="Print_ot_all_div_Third">
      <div className="RegisFormcon">
        <div className="RegisForm_1">
          <label htmlFor="bloodLinesIV">
            Blood Lines Inserted IV <span>:</span>
          </label>
          <input
            type="text"
            id="bloodLinesIV"
            name="bloodLinesIV"
            list="bloodLinesIVOptions"
            value={inputValuesChart.bloodLinesIV}
            onChange={handleInputChange}
            required
          />
          <datalist id="bloodLinesIVOptions">
            <option value="External Jugular" />
            <option value="Subclavian vein" />
            <option value="Femoral vein" />
            <option value="Dorsal Venous Network of Hand" />
            <option value="Radial vein" />
            <option value="Median Cubital vein" />
            <option value="Cephalic vein" />
            <option value="Dorsal Venous Network of Leg" />
            <option value="Saphenous vein" />
            <option value="Superficial Temporal vein" />
          </datalist>
        </div>
        <div className="RegisForm_1">
          <label htmlFor="bloodLinesIA">
            Blood Lines Inserted IA <span>:</span>
          </label>
          <input
            type="text"
            id="bloodLinesIA"
            name="bloodLinesIA"
            list="bloodLinesIAOptions"
            value={inputValuesChart.bloodLinesIA}
            onChange={handleInputChange}
            required
          />
          <datalist id="bloodLinesIAOptions">
            <option value="Radial" />
            <option value="Ulnar" />
            <option value="Brachial" />
            <option value="Xillary" />
            <option value="Posterior tibial" />
            <option value="Femoral" />
            <option value="Dorsalis pedis" />
          </datalist>
        </div>

        <div className="RegisForm_1">
          <label htmlFor="timeOfInduction">
            Time of Induction <span>:</span>
          </label>
          <input
            type="time"
            id="timeOfInduction"
            name="timeOfInduction"
            value={inputValuesChart.timeOfInduction}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="RegisForm_1">
          <label htmlFor="timeOfIncision">
            Time of Incision <span>:</span>
          </label>
          <input
            type="time"
            id="timeOfIncision"
            name="timeOfIncision"
            value={inputValuesChart.timeOfIncision}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      </div>

      <br />

      <div className="Selected-table-container">
        {tables.map((table, tableIndex) => (
          <div key={tableIndex}>
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
              Table {tableIndex + 1}
            </h4>
            <table className="selected-medicine-table2">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Gas</th>
                  <th>Gas Dose (ml/min)</th>
                  <th>ETCO2 (mmHg)</th>
                  <th>CVP (mmHg)</th>
                 
                </tr>
              </thead>
              <tbody>
                {table.map((data, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
                      <input
                        type="time"
                        className="chart_table_anathes"
                        value={data.time}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "time",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="chart_table_anathes"
                        value={data.gas}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "gas",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.gasDose}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "gasDose",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.etco2}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "etco2",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.cvp}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "cvp",
                            e.target.value
                          )
                        }
                      />
                    </td>
                 
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="selected-medicine-table2">
              <thead>
                <tr>
                <th>Urine Output (ml)</th>
                  <th>Total Blood Loss</th>
                  <th>Other Losses</th>
                  <th>Input-Output Balance</th>
                  </tr>
                  </thead>
                  <tbody>
                  {table.map((data, rowIndex) => (
                  <tr key={rowIndex}>

<td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.urineOutput}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "urineOutput",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.totalBloodLoss}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "totalBloodLoss",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.otherLosses}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "otherLosses",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="chart_table_anathes"
                        value={data.inputOutputBalance}
                        onChange={(e) =>
                          handleInputChangeTable(
                            tableIndex,
                            rowIndex,
                            "inputOutputBalance",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    </tr>
                  ))}

                    </tbody>
                  </table>
            {tableIndex === tables.length - 1 && (
              <div className="Register_btn_con">
                <button className="RegisterForm_1_btns" onClick={addTable}>
                  <AddCircleOutlineIcon />
                </button>
                <button className="RegisterForm_1_btns" onClick={deleteTable}>
                  <DeleteOutlineIcon />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <br />

      <div className="RegisFormcon" style={{ justifyContent: "center" }}>
        <div className="RegisForm_1 ref3e34dew343">
          <label htmlFor="CompletionofSurgery">
            Time of Completion of Surgery <span>:</span>
          </label>
          <input
            type="text"
            id="CompletionofSurgery"
            name="CompletionofSurgery"
            value={inputValuesChart.CompletionofSurgery}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <br />
      <br />
      <div className="RegisFormcon" style={{ justifyContent: "center" }}>
        <div className="OtMangementForm_1 djkwked675">
          <label>
            Ventilator Setting at Surgery Completion <span>:</span>
          </label>

          <div className="OtMangementForm_1_checkbox djkwked67eee5">
            <label htmlFor="Spontaneous" className="">
              <input
                type="checkbox"
                id="Spontaneous"
                name="SettingSurgery"
                value="Spontaneous"
                checked={inputValuesChart.SettingSurgery === "Spontaneous"}
                onChange={handleInputChange}
              />
              <span>Spontaneous</span>
            </label>
            <label htmlFor="Assisted">
              <input
                type="checkbox"
                id="Assisted"
                name="SettingSurgery"
                value="Assisted"
                checked={inputValuesChart.SettingSurgery === "Assisted"}
                onChange={handleInputChange}
              />
              <span>Assisted</span>
            </label>
            <label htmlFor="Controlled">
              <input
                type="checkbox"
                id="Controlled"
                name="SettingSurgery"
                value="Controlled"
                checked={inputValuesChart.SettingSurgery === "Controlled"}
                onChange={handleInputChange}
              />
              <span>Controlled</span>
            </label>
            <label htmlFor="Extubated">
              <input
                type="checkbox"
                id="Extubated"
                name="SettingSurgery"
                value="Extubated"
                checked={inputValuesChart.SettingSurgery === "Extubated"}
                onChange={handleInputChange}
              />
              <span>Extubated</span>
            </label>
          </div>
        </div>
      </div>
      <br />

      {showTimeOfExtubation && (
        <div className="RegisFormcon" style={{ justifyContent: "center" }}>
          <div className="RegisForm_1 ref3e34dew343">
            <label htmlFor="Extubation">
              Time of Extubation <span>:</span>
            </label>
            <input
              type="text"
              id="Extubation"
              name="timeOfExtubation"
              value={inputValuesChart.timeOfExtubation}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      )}
      <br />
      </div>
            </div>
          
        </PrintContent>

)}
    </>
  );

}

export default OTAnaesthesiaChart;
