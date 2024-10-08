import React, { useState, useRef, useEffect } from "react";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});
const Otterigium = () => {
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);
  const dispatchvalue = useDispatch();
  const [terrigium, setTerrigium] = useState({
    Eye: "",
    NameoftheSurgery: "",
    OperationNotes: "",
  });
  console.log("terrigium", terrigium);
  const handleInputChangetextarea = (event) => {
    const { name, value } = event.target;
    setTerrigium({
      ...terrigium,
      [name]: value,
    });
  };
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    const newValue = type === "checkbox" ? (checked ? value : "") : value;

    setTerrigium({
      ...terrigium,
      [name]: newValue,
    });
  };
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
    }, 500);
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
  const [clinicName, setClinicName] = useState("");
  const [clinicLogo, setClinicLogo] = useState(null);
  const [location, setlocation] = useState("");
  console.log(workbenchformData);
  dispatchvalue({
    type: "workbenchformData",
    value: workbenchformData,
  });
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
  return (
    <>
      {isPrintButtonVisible ? (
        <div className="appointment ">
          <div className="ewdfhyewuf65">
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
              Terigium
            </h4>

            <div className="OtMangementForm_1 djkwked675">
              <label>
                Eye<span>:</span>
              </label>
              <div className="OtMangementForm_1_checkbox">
                <label htmlFor="LeftCheckbox">
                  <input
                    type="checkbox"
                    id="LeftCheckbox"
                    name="Eye"
                    value="Left"
                    checked={terrigium.Eye === "Left"}
                    onChange={handleInputChange}
                  />
                  <span>Left</span>
                </label>
                <label htmlFor="rightCheckbox">
                  <input
                    type="checkbox"
                    id="rightCheckbox"
                    name="Eye"
                    value="Right"
                    checked={terrigium.Eye === "Right"}
                    onChange={handleInputChange}
                  />
                  <span>Right</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label htmlFor="NameoftheSurgery">
                Name of Surgery<span>:</span>
              </label>
              <textarea
                style={{ height: "40px" }}
                id="NameoftheSurgery"
                name="NameoftheSurgery"
                value={terrigium.NameoftheSurgery}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="Otdoctor_intra_Con_2 with_increse_85">
              <label htmlFor="OperationNotes">
                Operation Notes<span>:</span>
              </label>
              <textarea
                //  style={{width:"305px",height:"70px"}}

                id="OperationNotes"
                name="OperationNotes"
                value={terrigium.OperationNotes}
                onChange={handleInputChangetextarea}
                required
              />
            </div>
            <br />
            {isPrintButtonVisible && (
              <div className="Register_btn_con">
                <button className="RegisterForm_1_btns" onClick={Submitalldata}>
                  Print
                </button>
              </div>
            )}
          </div>
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

            <div className="appointment ">
              <div className="ewdfhyewuf65">
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
                  Terigium
                </h4>

                <div className="OtMangementForm_1 djkwked675">
                  <label>
                    Eye<span>:</span>
                  </label>
                  <div className="OtMangementForm_1_checkbox">
                    <label htmlFor="LeftCheckbox">
                      <input
                        type="checkbox"
                        id="LeftCheckbox"
                        name="Eye"
                        value="Left"
                        checked={terrigium.Eye === "Left"}
                        onChange={handleInputChange}
                      />
                      <span>Left</span>
                    </label>
                    <label htmlFor="rightCheckbox">
                      <input
                        type="checkbox"
                        id="rightCheckbox"
                        name="Eye"
                        value="Right"
                        checked={terrigium.Eye === "Right"}
                        onChange={handleInputChange}
                      />
                      <span>Right</span>
                    </label>
                  </div>
                </div>

                <div className="OtMangementForm_1 djkwked675">
                  <label htmlFor="NameoftheSurgery">
                    Name of Surgery<span>:</span>
                  </label>
                  <textarea
                    style={{ width: "305px", height: "40px" }}
                    id="NameoftheSurgery"
                    name="NameoftheSurgery"
                    value={terrigium.NameoftheSurgery}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="Otdoctor_intra_Con_2 with_increse_85">
                  <label htmlFor="OperationNotes">
                    Operation Notes<span>:</span>
                  </label>
                  <textarea
                    //  style={{width:"305px",height:"70px"}}

                    id="OperationNotes"
                    name="OperationNotes"
                    value={terrigium.OperationNotes}
                    onChange={handleInputChangetextarea}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </PrintContent>
      )}
    </>
  );
};

export default Otterigium;
