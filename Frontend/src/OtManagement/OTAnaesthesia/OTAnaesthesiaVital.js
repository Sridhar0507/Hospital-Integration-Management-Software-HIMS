import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

function OTAnaesthesiaVital() {


  const [inputValues, setInputValues] = useState({
    HR: "",
    RR: "",
    PR: "",
    SpO2: "",
    SBP: "",
    DBP: "",
    Temperature: ""
  });

  const [selectedVital, setSelectedVital] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const resetInputFields = () => {
    setInputValues({
      HR: "",
      RR: "",
      PR: "",
      SpO2: "",
      SBP: "",
      DBP: "",
      Temperature: ""
    });
  };

  const handleAdd = () => {
    const newVital = {
      time: new Date().toLocaleTimeString(),
      ...inputValues
    };

    setSelectedVital([...selectedVital, newVital]);

    Axios.post(
      "http:///////// Link", 
      newVital
    )
      .then((response) => {
        console.log(response.data);
        successMsg("Saved Successfully");
        resetInputFields();
      })
      .catch((error) => {
        errmsg("Error saving data:", error);
      });


  };

  const successMsg = (msg) => {
    toast.success(`${msg}`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: { marginTop: "50px" }
    });
  };

  const errmsg = (errorMessage) => {
    toast.error(`${errorMessage}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: { marginTop: "50px" }
    });
  };


  return (
 
    <div className="new-patient-registration-form">
    <div className="RegisFormcon">
      <div className="RegisForm_1">
        <label htmlFor="HR">
          HR <span>:</span>
        </label>
        <input
          type="text"
          id="HR"
          name="HR"
          value={inputValues.HR}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="RegisForm_1">
        <label htmlFor="RR">
          RR <span>:</span>
        </label>
        <input
          type="text"
          id="RR"
          name="RR"
          value={inputValues.RR}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="RegisForm_1">
        <label htmlFor="PR">
          PR<span>:</span>
        </label>
        <input
          type="text"
          id="PR"
          name="PR"
          value={inputValues.PR}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="RegisForm_1">
        <label htmlFor="SpO2">
          SpO2 <span>:</span>
        </label>
        <input
          type="text"
          id="SpO2"
          name="SpO2"
          value={inputValues.SpO2}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="RegisForm_1">
        <label htmlFor="SBP">
          SBP<span>:</span>
        </label>
        <input
          type="text"
          id="SBP"
          name="SBP"
          value={inputValues.SBP}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="RegisForm_1">
        <label htmlFor="DBP">
          DBP <span>:</span>
        </label>
        <input
          type="text"
          id="DBP"
          name="DBP"
          value={inputValues.DBP}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="RegisForm_1">
        <label htmlFor="Temperature">
          Temperature <span>:</span>
        </label>
        <input
          type="text"
          id="Temperature"
          name="Temperature"
          value={inputValues.Temperature}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>

    <div className="Register_btn_con">
        <button className="RegisterForm_1_btns" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="for">
        <div className="h_head">
          <h4>Selected Info</h4>
        </div>
        <div className="Selected-table-container">
          <table className="selected-medicine-table2">
            <thead>
              <tr>
                <th id="vital_Twidth">Time</th>
                <th id="vital_Twidth">HR</th>
                <th id="vital_Twidth">RR</th>
                <th id="vital_Twidth">PR</th>
                <th id="vital_Twidth">SpO2</th>
                <th id="vital_Twidth">SBP</th>
                <th id="vital_Twidth">DBP</th>
                <th id="vital_Twidth">Temperature</th>
              </tr>
            </thead>
            <tbody>
              {selectedVital.map((medicine, index) => (
                <tr key={index}>
     <td>{medicine.time}</td>
                  <td>{medicine.HR}</td>
                  <td>{medicine.RR}</td>
                  <td>{medicine.PR}</td>
                  <td>{medicine.SpO2}</td>
                  <td>{medicine.SBP}</td>
                  <td>{medicine.DBP}</td>
                  <td>{medicine.Temperature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default OTAnaesthesiaVital;


