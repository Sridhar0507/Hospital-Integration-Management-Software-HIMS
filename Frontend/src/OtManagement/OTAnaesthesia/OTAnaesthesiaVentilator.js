import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Axios from "axios";

function OTAnaesthesiaVentilator() {
  const [inputVentilator, setInputVentilator] = useState({
    PRESS_Support: "",
    Peak_PRESS: "",
    PEEP: "",
    Mean_PRESS: "",
    MV: "",
    ITV: "",
    Temperature1: "",
    F2O2: ""
  });

  const [selectedVentilator, setSelectedVentilator] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputVentilator({
      ...inputVentilator,
      [name]: value
    });
  };

  const resetInputFields = () => {
    setInputVentilator({
      PRESS_Support: "",
      Peak_PRESS: "",
      PEEP: "",
      Mean_PRESS: "",
      MV: "",
      ITV: "",
      Temperature1: "",
      F2O2: ""
    });
  };

  const handleAdd = () => {
    const newVentilator = {
      time: new Date().toLocaleTimeString(),
      ...inputVentilator
    };

    setSelectedVentilator([...selectedVentilator, newVentilator]);
    resetInputFields();

    // Uncomment this section when you want to make a POST request
    /*
    Axios.post(
      "http://your-api-endpoint",
      newVentilator
    )
      .then((response) => {
        console.log(response.data);
        successMsg("Saved Successfully");
      })
      .catch((error) => {
        errmsg("Error saving data:", error);
      });
    */
  };

  // const successMsg = (msg) => {
  //   toast.success(`${msg}`, {
  //     position: "top-center",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //     style: { marginTop: "50px" }
  //   });
  // };

  // const errmsg = (errorMessage) => {
  //   toast.error(`${errorMessage}`, {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //     style: { marginTop: "50px" }
  //   });
  // };

  return (
    <div className="new-patient-registration-form">
        <div className="RegisFormcon">
            <div className="RegisForm_1">
                <label htmlFor="PRESS_Support">PRESS Support (cmH2O)<span>:</span></label>
                <input
                    type="number"
                    id="PRESS_Support"
                    name="PRESS_Support"
                    value={inputVentilator.PRESS_Support}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="RegisForm_1">
                <label htmlFor="Peak_PRESS">Peak PRESS (cmH2O)<span>:</span></label>
                <input
                    type="number"
                    id="Peak_PRESS"
                    name="Peak_PRESS"
                    value={inputVentilator.Peak_PRESS}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="RegisForm_1">
                <label htmlFor="PEEP">PEEP (cmH2O)<span>:</span></label>
                <input
                    type="number"
                    id="PEEP"
                    name="PEEP"
                    value={inputVentilator.PEEP}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="RegisForm_1">
                <label htmlFor="Mean_PRESS">Mean PRESS (cmH2O)<span>:</span></label>
                <input
                    type="number"
                    id="Mean_PRESS"
                    name="Mean_PRESS"
                    value={inputVentilator.Mean_PRESS}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="RegisForm_1">
                <label htmlFor="MV">MV (L/min)<span>:</span></label>
                <input
                    type="number"
                    id="MV"
                    name="MV"
                    value={inputVentilator.MV}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="RegisForm_1">
                <label htmlFor="ITV">ITV (ml)<span>:</span></label>
                <input
                    type="number"
                    id="ITV"
                    name="ITV"
                    value={inputVentilator.ITV}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="RegisForm_1">
                <label htmlFor="Temperature1">Temperature (°C)<span>:</span></label>
                <input
                    type="number"
                    id="Temperature1"
                    name="Temperature1"
                    value={inputVentilator.Temperature1}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="RegisForm_1">
                <label htmlFor="F2O2">F2O2<span>:</span></label>
                <input
                    type="number"
                    id="F2O2"
                    name="F2O2"
                    value={inputVentilator.F2O2}
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
                            <th id="vital_Twidth">PRESS Support</th>
                            <th id="vital_Twidth">Peak PRESS</th>
                            <th id="vital_Twidth">PEEP</th>
                            <th id="vital_Twidth">Mean PRESS</th>
                            <th id="vital_Twidth">MV</th>
                            <th id="vital_Twidth">ITV</th>
                            <th id="vital_Twidth">Temperature</th>
                            <th id="vital_Twidth">F2O2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedVentilator.map((ventilator, index) => (
                            <tr key={index}>
                                <td>{ventilator.time}</td>
                                <td>{ventilator.PRESS_Support}</td>
                                <td>{ventilator.Peak_PRESS}</td>
                                <td>{ventilator.PEEP}</td>
                                <td>{ventilator.Mean_PRESS}</td>
                                <td>{ventilator.MV}</td>
                                <td>{ventilator.ITV}</td>
                                <td>{ventilator.Temperature1}</td>
                                <td>{ventilator.F2O2}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    </div>
);

}

export default OTAnaesthesiaVentilator;


