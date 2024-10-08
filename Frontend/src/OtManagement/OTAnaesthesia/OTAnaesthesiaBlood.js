import React, { useState } from "react";

function OTAnaesthesiaBlood() {

  const [bloodGroupInput, setBloodGroupInput] = useState({

    bloodGroup: "",
    bloodType: "",
    numberOfBags: "",
    adverse: "",
    time: "",

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBloodGroupInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted data:", bloodGroupInput);

    setBloodGroupInput({
      bloodGroup: "",
      bloodType: "",
      numberOfBags: "",
      adverse: "",
      time: "",
    });
  };

  return (
    <div className="new-patient-registration-form">
      <form onSubmit={handleSubmit}>
        <div className="RegisFormcon">
          <div className="RegisForm_1">
            <label htmlFor="bloodGroup">
              Patient Blood Group <span>:</span>
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={bloodGroupInput.bloodGroup}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="RegisForm_1">
            <label htmlFor="bloodType">
              Blood Type <span>:</span>
            </label>
            <select
              id="bloodType"
              name="bloodType"
              value={bloodGroupInput.bloodType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Whole Blood">Whole Blood</option>
              <option value="Plasma">Plasma</option>
              <option value="Platelets">Platelets</option>
              <option value="RBCs">RBCs</option>
            </select>
          </div>
          <div className="RegisForm_1">
            <label htmlFor="numberOfBags">
              Number of Bags <span>:</span>
            </label>
            <input
              type="number"
              id="numberOfBags"
              name="numberOfBags"
              value={bloodGroupInput.numberOfBags}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="RegisForm_1">
            <label>
              Any Adverse Reactions<span>:</span>
            </label>
            <div className="radio_Nurse_ot2_head">
              <div className="radio_Nurse_ot2">
                <label htmlFor="adverseYes">
                  <input
                    type="radio"
                    id="adverseYes"
                    name="adverse"
                    value="Yes"
                    className="radio_Nurse_ot2_input"
                    checked={bloodGroupInput.adverse === "Yes"}
                    onChange={handleInputChange}
                  />
                  Yes
                </label>
              </div>
              <div className="radio_Nurse_ot2">
                <label htmlFor="adverseNo">
                  <input
                    type="radio"
                    id="adverseNo"
                    name="adverse"
                    value="No"
                    className="radio_Nurse_ot2_input"
                    checked={bloodGroupInput.adverse === "No"}
                    onChange={handleInputChange}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="RegisForm_1">
            <label htmlFor="time">
              Time <span>:</span>
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={bloodGroupInput.time}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="Register_btn_con">
          <button className="RegisterForm_1_btns" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTAnaesthesiaBlood;
