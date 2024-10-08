import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
// import jsPDF from "jspdf";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useDispatch, useSelector } from "react-redux";
// import "../../RegistrationForm/Registration.css";

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

function OtDoctorPost() {

  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const dispatchvalue = useDispatch();


  const [formDataTextArea, setFormDataTextArea] = useState({
    patientToICU: "",
  });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormDataTextArea({
      ...formDataTextArea,
      [name]: value,
    });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
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

  return (
    <>
      {isPrintButtonVisible ? (
        <div className="appointment">
          <br />
          <div className="Otdoctor_intra_Con">
            <div className="Otdoctor_intra_Con_2_input">
              <label>
                Date & Time <span>:</span>
              </label>
              <input
                className="date_stle_OT"
                type="date"
                value={date}
                onChange={handleDateChange}
              />

              <input
                className="date_stle_OT"
                type="time"
                value={time}
                onChange={handleTimeChange}
              />
            </div>
<br />
            <div className="Otdoctor_intra_Con_2 with_increse_85">
              <label>
                Patient Condition at transfer to ICU <span>:</span>
              </label>
              <textarea
                name="patientToICU"
                value={formDataTextArea.patientToICU}
                onChange={handleInputChange}
              ></textarea>
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
                  Doctor 
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

            <div className="appointment">
              <br />
              <div className="Print_ot_all_div_pre ">
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
                  Doctor Post - Operative Checklist
                </h4>
                <br />
                <br />
              <div className="Otdoctor_intra_Con">
                <div className="Otdoctor_intra_Con_2_input">
                  <label>
                    Date & Time <span>:</span>
                  </label>
                  <input
                    className="date_stle_OT"
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                  />

                  <input
                    className="date_stle_OT"
                    type="time"
                    value={time}
                    onChange={handleTimeChange}
                  />
                </div>
                <br />
                <div className="Otdoctor_intra_Con_2 with_increse_85">
                  <label>
                    Patient Condition at transfer to ICU <span>:</span>
                  </label>
                  <textarea
                    name="patientToICU"
                    value={formDataTextArea.patientToICU}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              </div>
            </div>
          </div>
        </PrintContent>
      )}
    </>
  );
}

export default OtDoctorPost;
