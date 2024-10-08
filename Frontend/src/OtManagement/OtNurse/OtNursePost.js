import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
// import jsPDF from "jspdf";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useDispatch, useSelector } from "react-redux";
import "../../OtManagement/OtManagement.css";
// import rajeshkumar from "../../assets/rajeshkumar.png";

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

function OtNursePost() {
  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const dispatchvalue = useDispatch();

  const [inputValuesForZero, setInputValuesForZero] = useState({
    temp: "",
    hr: "",
    rr: "",
    bp: "",
    spo2: "",
    uternineTone: "",
    PVBleeding: "",
    pain1: "",
    sedation1: "",
    intakeType1: "",
    intakeAmount1: "",
    outputType1: "",
    outputAmount1: "",
  });

  // Function to handle input changes
  const handleInputChangeForZero = (e, key) => {
    const { value } = e.target;
    setInputValuesForZero({
      ...inputValuesForZero,
      [key]: value,
    });
  };

  const [inputValuesOneFive, setInputValuesOneFive] = useState({
    temp: "",
    hr: "",
    rr: "",
    bp: "",
    spo2: "",
    uternineTone: "",
    PVBleeding: "",
    pain1: "",
    sedation1: "",
    intakeType1: "",
    intakeAmount1: "",
    outputType1: "",
    outputAmount1: "",
  });

  // Function to handle input changes
  const handleInputChangeOneFive = (e, key) => {
    const { value } = e.target;
    setInputValuesOneFive({
      ...inputValuesOneFive,
      [key]: value,
    });
  };

  const [inputValuesThreeZero, setInputValuesThreeZero] = useState({
    temp: "",
    hr: "",
    rr: "",
    bp: "",
    spo2: "",
    uternineTone: "",
    PVBleeding: "",
    pain1: "",
    sedation1: "",
    intakeType1: "",
    intakeAmount1: "",
    outputType1: "",
    outputAmount1: "",
  });

  // Function to handle input changes
  const handleInputChangeThreeZero = (e, key) => {
    const { value } = e.target;
    setInputValuesThreeZero({
      ...inputValuesThreeZero,
      [key]: value,
    });
  };

  const [inputValuesFourFive, setInputValuesFourFive] = useState({
    temp: "",
    hr: "",
    rr: "",
    bp: "",
    spo2: "",
    uternineTone: "",
    PVBleeding: "",
    pain1: "",
    sedation1: "",
    intakeType1: "",
    intakeAmount1: "",
    outputType1: "",
    outputAmount1: "",
  });

  // Function to handle input changes
  const handleInputChangeFourFive = (e, key) => {
    const { value } = e.target;
    setInputValuesFourFive({
      ...inputValuesFourFive,
      [key]: value,
    });
  };

  const [inputValuesSixZero, setInputValuesSixZero] = useState({
    temp: "",
    hr: "",
    rr: "",
    bp: "",
    spo2: "",
    uternineTone: "",
    PVBleeding: "",
    pain1: "",
    sedation1: "",
    intakeType1: "",
    intakeAmount1: "",
    outputType1: "",
    outputAmount1: "",
  });

  // Function to handle input changes
  const handleInputChangeSixZero = (e, key) => {
    const { value } = e.target;
    setInputValuesSixZero({
      ...inputValuesSixZero,
      [key]: value,
    });
  };

  const [inputValuesNineZero, setInputValuesNineZero] = useState({
    temp: "",
    hr: "",
    rr: "",
    bp: "",
    spo2: "",
    uternineTone: "",
    PVBleeding: "",
    pain1: "",
    sedation1: "",
    intakeType1: "",
    intakeAmount1: "",
    outputType1: "",
    outputAmount1: "",
  });

  // Function to handle input changes
  const handleInputChangeNineZero = (e, key) => {
    const { value } = e.target;
    setInputValuesNineZero({
      ...inputValuesNineZero,
      [key]: value,
    });
  };

  const [inputValuesOneTwoZero, setInputValuesOneTwoZero] = useState({
    temp: "",
    hr: "",
    rr: "",
    bp: "",
    spo2: "",
    uternineTone: "",
    PVBleeding: "",
    pain1: "",
    sedation1: "",
    intakeType1: "",
    intakeAmount1: "",
    outputType1: "",
    outputAmount1: "",
  });

  // Function to handle input changes
  const handleInputChangeOneTwoZero = (e, key) => {
    const { value } = e.target;
    setInputValuesOneTwoZero({
      ...inputValuesOneTwoZero,
      [key]: value,
    });
  };

  const [inputValuesOneEightZero, setInputValuesOneEightZero] = useState({
    temp: "",
    hr: "",
    rr: "",
    bp: "",
    spo2: "",
    uternineTone: "",
    PVBleeding: "",
    pain1: "",
    sedation1: "",
    intakeType1: "",
    intakeAmount1: "",
    outputType1: "",
    outputAmount1: "",
  });

  // Function to handle input changes
  const handleInputChangeOneEightZero = (e, key) => {
    const { value } = e.target;
    setInputValuesOneEightZero({
      ...inputValuesOneEightZero,
      [key]: value,
    });
  };

  const [inputValuesTwoFourZero, setInputValuesTwoFourZero] = useState({
    temp: "",
    hr: "",
    rr: "",
    bp: "",
    spo2: "",
    uternineTone: "",
    PVBleeding: "",
    pain1: "",
    sedation1: "",
    intakeType1: "",
    intakeAmount1: "",
    outputType1: "",
    outputAmount1: "",
  });

  // Function to handle input changes
  const handleInputChangeTwoFourZero = (e, key) => {
    const { value } = e.target;
    setInputValuesTwoFourZero({
      ...inputValuesTwoFourZero,
      [key]: value,
    });
  };

  const [inputValuesThreeZeroZero, setInputValuesThreeZeroZero] = useState({
    temp: "",
    hr: "",
    rr: "",
    bp: "",
    spo2: "",
    uternineTone: "",
    PVBleeding: "",
    pain1: "",
    sedation1: "",
    intakeType1: "",
    intakeAmount1: "",
    outputType1: "",
    outputAmount1: "",
  });

  // Function to handle input changes
  const handleInputChangeThreeZeroZero = (e, key) => {
    const { value } = e.target;
    setInputValuesThreeZeroZero({
      ...inputValuesThreeZeroZero,
      [key]: value,
    });
  };

  const [selection3, setSelection3] = useState("");
  const handleSelectionChange3 = (e) => {
    setSelection3(e.target.value);
  };

  const [selection4, setSelection4] = useState("");
  const handleSelectionChange4 = (e) => {
    setSelection4(e.target.value);
  };

  const [postNurseInputs, setPostNurseInputs] = useState({
    otherNotes: "",
    nurseName: "",
    wardNurseSign: "",
    wardNurseDate: "",
    wardNurseTime: "",
  });

  const handleInputChangeNurseSign = (event) => {
    const { name, value } = event.target;
    setPostNurseInputs({
      ...postNurseInputs,
      [name]: value,
    });
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
            Recovery Room Record
          </h4>

          <div className="Selected-table-container">
            <table className="selected-medicine-table2">
              <thead>
                <tr>
                  <th>Time(in mts)</th>
                  <th>Temp</th>
                  <th>HR</th>
                  <th>RR</th>
                  <th>BP</th>
                  <th>SPO2</th>
                  <th>Uterine Tone</th>
                  <th>P.V. Bleeding</th>
                  <th colspan="2">
                    Score
                    <hr
                      style={{
                        padding: "3px 0px",
                        marginBottom: "5px",
                        border: "none",
                        borderBottom: "1px solid #ffff",
                      }}
                    />
                    <div className="dewui76ec">
                      <span style={{ width: "55px" }}>Pain</span>|
                      <span>Sedation</span>
                    </div>
                  </th>

                  <th colspan="2">
                    Intake
                    <hr
                      style={{
                        padding: "3px 0px",
                        marginBottom: "5px",
                        border: "none",
                        borderBottom: "1px solid #ffff",
                      }}
                    />
                    <div className="dewui76ec">
                      <span style={{ width: "50px" }}>Type</span>|
                      <span>Amount</span>
                    </div>
                  </th>
                  <th colspan="2">
                    Output
                    <hr
                      style={{
                        padding: "3px 0px",
                        marginBottom: "5px",
                        border: "none",
                        borderBottom: "1px solid #ffff",
                      }}
                    />
                    <div className="dewui76ec">
                      <span style={{ width: "50px" }}>Type</span> |{" "}
                      <span>Amount</span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>0</td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesForZero.temp}
                      onChange={(e) => handleInputChangeForZero(e, "temp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesForZero.hr}
                      onChange={(e) => handleInputChangeForZero(e, "hr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesForZero.rr}
                      onChange={(e) => handleInputChangeForZero(e, "rr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesForZero.bp}
                      onChange={(e) => handleInputChangeForZero(e, "bp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesForZero.spo2}
                      onChange={(e) => handleInputChangeForZero(e, "spo2")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesForZero.uternineTone}
                      onChange={(e) =>
                        handleInputChangeForZero(e, "uternineTone")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesForZero.PVBleeding}
                      onChange={(e) =>
                        handleInputChangeForZero(e, "PVBleeding")
                      }
                    />
                  </td>
                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesForZero.pain1}
                          onChange={(e) => handleInputChangeForZero(e, "pain1")}
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesForZero.sedation1}
                          onChange={(e) =>
                            handleInputChangeForZero(e, "sedation1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesForZero.intakeType1}
                          onChange={(e) =>
                            handleInputChangeForZero(e, "intakeType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesForZero.intakeAmount1}
                          onChange={(e) =>
                            handleInputChangeForZero(e, "intakeAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesForZero.outputType1}
                          onChange={(e) =>
                            handleInputChangeForZero(e, "outputType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesForZero.outputAmount1}
                          onChange={(e) =>
                            handleInputChangeForZero(e, "outputAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>15</td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneFive.temp}
                      onChange={(e) => handleInputChangeOneFive(e, "temp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneFive.hr}
                      onChange={(e) => handleInputChangeOneFive(e, "hr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneFive.rr}
                      onChange={(e) => handleInputChangeOneFive(e, "rr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneFive.bp}
                      onChange={(e) => handleInputChangeOneFive(e, "bp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneFive.spo2}
                      onChange={(e) => handleInputChangeOneFive(e, "spo2")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesOneFive.uternineTone}
                      onChange={(e) =>
                        handleInputChangeOneFive(e, "uternineTone")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesOneFive.PVBleeding}
                      onChange={(e) =>
                        handleInputChangeOneFive(e, "PVBleeding")
                      }
                    />
                  </td>
                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneFive.pain1}
                          onChange={(e) => handleInputChangeOneFive(e, "pain1")}
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneFive.sedation1}
                          onChange={(e) =>
                            handleInputChangeOneFive(e, "sedation1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneFive.intakeType1}
                          onChange={(e) =>
                            handleInputChangeOneFive(e, "intakeType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneFive.intakeAmount1}
                          onChange={(e) =>
                            handleInputChangeOneFive(e, "intakeAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneFive.outputType1}
                          onChange={(e) =>
                            handleInputChangeOneFive(e, "outputType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneFive.outputAmount1}
                          onChange={(e) =>
                            handleInputChangeOneFive(e, "outputAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>30</td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesThreeZero.temp}
                      onChange={(e) => handleInputChangeThreeZero(e, "temp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesThreeZero.hr}
                      onChange={(e) => handleInputChangeThreeZero(e, "hr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesThreeZero.rr}
                      onChange={(e) => handleInputChangeThreeZero(e, "rr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesThreeZero.bp}
                      onChange={(e) => handleInputChangeThreeZero(e, "bp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesThreeZero.spo2}
                      onChange={(e) => handleInputChangeThreeZero(e, "spo2")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesThreeZero.uternineTone}
                      onChange={(e) =>
                        handleInputChangeThreeZero(e, "uternineTone")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesThreeZero.PVBleeding}
                      onChange={(e) =>
                        handleInputChangeThreeZero(e, "PVBleeding")
                      }
                    />
                  </td>
                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesThreeZero.pain1}
                          onChange={(e) =>
                            handleInputChangeThreeZero(e, "pain1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesThreeZero.sedation1}
                          onChange={(e) =>
                            handleInputChangeThreeZero(e, "sedation1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesThreeZero.intakeType1}
                          onChange={(e) =>
                            handleInputChangeThreeZero(e, "intakeType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesThreeZero.intakeAmount1}
                          onChange={(e) =>
                            handleInputChangeThreeZero(e, "intakeAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesThreeZero.outputType1}
                          onChange={(e) =>
                            handleInputChangeThreeZero(e, "outputType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesThreeZero.outputAmount1}
                          onChange={(e) =>
                            handleInputChangeThreeZero(e, "outputAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>45</td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesFourFive.temp}
                      onChange={(e) => handleInputChangeFourFive(e, "temp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesFourFive.hr}
                      onChange={(e) => handleInputChangeFourFive(e, "hr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesFourFive.rr}
                      onChange={(e) => handleInputChangeFourFive(e, "rr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesFourFive.bp}
                      onChange={(e) => handleInputChangeFourFive(e, "bp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesFourFive.spo2}
                      onChange={(e) => handleInputChangeFourFive(e, "spo2")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesFourFive.uternineTone}
                      onChange={(e) =>
                        handleInputChangeFourFive(e, "uternineTone")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesFourFive.PVBleeding}
                      onChange={(e) =>
                        handleInputChangeFourFive(e, "PVBleeding")
                      }
                    />
                  </td>
                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesFourFive.pain1}
                          onChange={(e) =>
                            handleInputChangeFourFive(e, "pain1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesFourFive.sedation1}
                          onChange={(e) =>
                            handleInputChangeFourFive(e, "sedation1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesFourFive.intakeType1}
                          onChange={(e) =>
                            handleInputChangeFourFive(e, "intakeType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesFourFive.intakeAmount1}
                          onChange={(e) =>
                            handleInputChangeFourFive(e, "intakeAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesFourFive.outputType1}
                          onChange={(e) =>
                            handleInputChangeFourFive(e, "outputType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesFourFive.outputAmount1}
                          onChange={(e) =>
                            handleInputChangeFourFive(e, "outputAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>60</td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesSixZero.temp}
                      onChange={(e) => handleInputChangeSixZero(e, "temp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesSixZero.hr}
                      onChange={(e) => handleInputChangeSixZero(e, "hr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesSixZero.rr}
                      onChange={(e) => handleInputChangeSixZero(e, "rr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesSixZero.bp}
                      onChange={(e) => handleInputChangeSixZero(e, "bp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesSixZero.spo2}
                      onChange={(e) => handleInputChangeSixZero(e, "spo2")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesSixZero.uternineTone}
                      onChange={(e) =>
                        handleInputChangeSixZero(e, "uternineTone")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesSixZero.PVBleeding}
                      onChange={(e) =>
                        handleInputChangeSixZero(e, "PVBleeding")
                      }
                    />
                  </td>
                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesSixZero.pain1}
                          onChange={(e) => handleInputChangeSixZero(e, "pain1")}
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesSixZero.sedation1}
                          onChange={(e) =>
                            handleInputChangeSixZero(e, "sedation1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesSixZero.intakeType1}
                          onChange={(e) =>
                            handleInputChangeSixZero(e, "intakeType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesSixZero.intakeAmount1}
                          onChange={(e) =>
                            handleInputChangeSixZero(e, "intakeAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesSixZero.outputType1}
                          onChange={(e) =>
                            handleInputChangeSixZero(e, "outputType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesSixZero.outputAmount1}
                          onChange={(e) =>
                            handleInputChangeSixZero(e, "outputAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>90</td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesNineZero.temp}
                      onChange={(e) => handleInputChangeNineZero(e, "temp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesNineZero.hr}
                      onChange={(e) => handleInputChangeNineZero(e, "hr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesNineZero.rr}
                      onChange={(e) => handleInputChangeNineZero(e, "rr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesNineZero.bp}
                      onChange={(e) => handleInputChangeNineZero(e, "bp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesNineZero.spo2}
                      onChange={(e) => handleInputChangeNineZero(e, "spo2")}
                    />
                  </td>

                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesNineZero.uternineTone}
                      onChange={(e) =>
                        handleInputChangeNineZero(e, "uternineTone")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesNineZero.PVBleeding}
                      onChange={(e) =>
                        handleInputChangeNineZero(e, "PVBleeding")
                      }
                    />
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesNineZero.pain1}
                          onChange={(e) =>
                            handleInputChangeNineZero(e, "pain1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesNineZero.sedation1}
                          onChange={(e) =>
                            handleInputChangeNineZero(e, "sedation1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesNineZero.intakeType1}
                          onChange={(e) =>
                            handleInputChangeNineZero(e, "intakeType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesNineZero.intakeAmount1}
                          onChange={(e) =>
                            handleInputChangeNineZero(e, "intakeAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesNineZero.outputType1}
                          onChange={(e) =>
                            handleInputChangeNineZero(e, "outputType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesNineZero.outputAmount1}
                          onChange={(e) =>
                            handleInputChangeNineZero(e, "outputAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>120</td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneTwoZero.temp}
                      onChange={(e) => handleInputChangeOneTwoZero(e, "temp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneTwoZero.hr}
                      onChange={(e) => handleInputChangeOneTwoZero(e, "hr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneTwoZero.rr}
                      onChange={(e) => handleInputChangeOneTwoZero(e, "rr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneTwoZero.bp}
                      onChange={(e) => handleInputChangeOneTwoZero(e, "bp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneTwoZero.spo2}
                      onChange={(e) => handleInputChangeOneTwoZero(e, "spo2")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesOneTwoZero.uternineTone}
                      onChange={(e) =>
                        handleInputChangeOneTwoZero(e, "uternineTone")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesOneTwoZero.PVBleeding}
                      onChange={(e) =>
                        handleInputChangeOneTwoZero(e, "PVBleeding")
                      }
                    />
                  </td>
                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneTwoZero.pain1}
                          onChange={(e) =>
                            handleInputChangeOneTwoZero(e, "pain1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneTwoZero.sedation1}
                          onChange={(e) =>
                            handleInputChangeOneTwoZero(e, "sedation1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneTwoZero.intakeType1}
                          onChange={(e) =>
                            handleInputChangeOneTwoZero(e, "intakeType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneTwoZero.intakeAmount1}
                          onChange={(e) =>
                            handleInputChangeOneTwoZero(e, "intakeAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneTwoZero.outputType1}
                          onChange={(e) =>
                            handleInputChangeOneTwoZero(e, "outputType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneTwoZero.outputAmount1}
                          onChange={(e) =>
                            handleInputChangeOneTwoZero(e, "outputAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>180</td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneEightZero.temp}
                      onChange={(e) => handleInputChangeOneEightZero(e, "temp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneEightZero.hr}
                      onChange={(e) => handleInputChangeOneEightZero(e, "hr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneEightZero.rr}
                      onChange={(e) => handleInputChangeOneEightZero(e, "rr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneEightZero.bp}
                      onChange={(e) => handleInputChangeOneEightZero(e, "bp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneEightZero.spo2}
                      onChange={(e) => handleInputChangeOneEightZero(e, "spo2")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesOneEightZero.uternineTone}
                      onChange={(e) =>
                        handleInputChangeOneEightZero(e, "uternineTone")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesOneEightZero.PVBleeding}
                      onChange={(e) =>
                        handleInputChangeOneEightZero(e, "PVBleeding")
                      }
                    />
                  </td>
                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneEightZero.pain1}
                          onChange={(e) =>
                            handleInputChangeOneEightZero(e, "pain1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneEightZero.sedation1}
                          onChange={(e) =>
                            handleInputChangeOneEightZero(e, "sedation1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneEightZero.intakeType1}
                          onChange={(e) =>
                            handleInputChangeOneEightZero(e, "intakeType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneEightZero.intakeAmount1}
                          onChange={(e) =>
                            handleInputChangeOneEightZero(e, "intakeAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneEightZero.outputType1}
                          onChange={(e) =>
                            handleInputChangeOneEightZero(e, "outputType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesOneEightZero.outputAmount1}
                          onChange={(e) =>
                            handleInputChangeOneEightZero(e, "outputAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>240</td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesTwoFourZero.temp}
                      onChange={(e) => handleInputChangeTwoFourZero(e, "temp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesTwoFourZero.hr}
                      onChange={(e) => handleInputChangeTwoFourZero(e, "hr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesTwoFourZero.rr}
                      onChange={(e) => handleInputChangeTwoFourZero(e, "rr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesTwoFourZero.bp}
                      onChange={(e) => handleInputChangeTwoFourZero(e, "bp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesTwoFourZero.spo2}
                      onChange={(e) => handleInputChangeTwoFourZero(e, "spo2")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesTwoFourZero.uternineTone}
                      onChange={(e) =>
                        handleInputChangeTwoFourZero(e, "uternineTone")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesTwoFourZero.PVBleeding}
                      onChange={(e) =>
                        handleInputChangeTwoFourZero(e, "PVBleeding")
                      }
                    />
                  </td>
                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesTwoFourZero.pain1}
                          onChange={(e) =>
                            handleInputChangeTwoFourZero(e, "pain1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesTwoFourZero.sedation1}
                          onChange={(e) =>
                            handleInputChangeTwoFourZero(e, "sedation1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesTwoFourZero.intakeType1}
                          onChange={(e) =>
                            handleInputChangeTwoFourZero(e, "intakeType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesTwoFourZero.intakeAmount1}
                          onChange={(e) =>
                            handleInputChangeTwoFourZero(e, "intakeAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesTwoFourZero.outputType1}
                          onChange={(e) =>
                            handleInputChangeTwoFourZero(e, "outputType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesTwoFourZero.outputAmount1}
                          onChange={(e) =>
                            handleInputChangeTwoFourZero(e, "outputAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>300</td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesThreeZeroZero.temp}
                      onChange={(e) =>
                        handleInputChangeThreeZeroZero(e, "temp")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesThreeZeroZero.hr}
                      onChange={(e) => handleInputChangeThreeZeroZero(e, "hr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesThreeZeroZero.rr}
                      onChange={(e) => handleInputChangeThreeZeroZero(e, "rr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesThreeZeroZero.bp}
                      onChange={(e) => handleInputChangeThreeZeroZero(e, "bp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesThreeZeroZero.spo2}
                      onChange={(e) =>
                        handleInputChangeThreeZeroZero(e, "spo2")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesThreeZeroZero.uternineTone}
                      onChange={(e) =>
                        handleInputChangeThreeZeroZero(e, "uternineTone")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesThreeZeroZero.PVBleeding}
                      onChange={(e) =>
                        handleInputChangeThreeZeroZero(e, "PVBleeding")
                      }
                    />
                  </td>
                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesThreeZeroZero.pain1}
                          onChange={(e) =>
                            handleInputChangeThreeZeroZero(e, "pain1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesThreeZeroZero.sedation1}
                          onChange={(e) =>
                            handleInputChangeThreeZeroZero(e, "sedation1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesThreeZeroZero.intakeType1}
                          onChange={(e) =>
                            handleInputChangeThreeZeroZero(e, "intakeType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesThreeZeroZero.intakeAmount1}
                          onChange={(e) =>
                            handleInputChangeThreeZeroZero(e, "intakeAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesThreeZeroZero.outputType1}
                          onChange={(e) =>
                            handleInputChangeThreeZeroZero(e, "outputType1")
                          }
                        />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="dewui76ec">
                      <span>
                        <input
                          className="input_table_tye_site wedscr54_secd"
                          type="text"
                          value={inputValuesThreeZeroZero.outputAmount1}
                          onChange={(e) =>
                            handleInputChangeThreeZeroZero(e, "outputAmount1")
                          }
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />

          <div className="OtMangement_con_santhu">
            <div className="ewdfhyewuf65">
              <div className="OtMangementForm_1">
                <label>
                  Wound Soakage <span>:</span>
                </label>

                <div className="OtMangementForm_1_checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value="Yes"
                      checked={selection3 === "Yes"}
                      onChange={handleSelectionChange3}
                    />
                    <span>Yes</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="No"
                      checked={selection3 === "No"}
                      onChange={handleSelectionChange3}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="OtMangementForm_1">
                <label>
                  Dressing Change <span>:</span>
                </label>

                <div className="OtMangementForm_1_checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value="Yes"
                      checked={selection4 === "Yes"}
                      onChange={handleSelectionChange4}
                    />
                    <span>Yes</span>
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      value="No"
                      checked={selection4 === "No"}
                      onChange={handleSelectionChange4}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="gtrtrdyut554">
              <div className="OtMangement_con34r">
                <div className="OtMangementForm_1 erwdf3">
                  <label>
                    <h3> Total </h3>
                    <span>:</span>
                  </label>

                  <input
                    type="text"
                    className="input_table_tye_site dfr6kmnbv dfr6kmnbv"
                    name=""
                  />
                </div>
              </div>

              <div className="OtMangement_con34r">
                <div className="OtMangementForm_1 erwdf3">
                  <label>
                    Urine <span>:</span>
                  </label>

                  <input
                    type="text"
                    className="input_table_tye_site dfr6kmnbv"
                    name=""
                  />
                </div>
                <div className="OtMangementForm_1 erwdf3">
                  <label>
                    NGA <span>:</span>
                  </label>

                  <input
                    type="text"
                    className="input_table_tye_site dfr6kmnbv"
                    name=""
                  />
                </div>
                <div className="OtMangementForm_1 erwdf3">
                  <label>
                    Drain <span>:</span>
                  </label>

                  <input
                    type="text"
                    className="input_table_tye_site dfr6kmnbv"
                    name=""
                  />
                </div>
              </div>
            </div>
          </div>

          <br />
          <div className="jdcneuir8o34di">
            <div className="RegisForm_1 swsxwdef7ujn edercxx">
              <label>
                Other Notes<span>:</span>
              </label>
              <textarea
                id="otherNotes"
                name="otherNotes"
                value={postNurseInputs.otherNotes}
                onChange={handleInputChangeNurseSign}
              ></textarea>
            </div>
          </div>
          <br />

          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label>
                Nurse's Name <span>:</span>
              </label>
              <input
                id="nurseName"
                type="text"
                name="nurseName"
                value={postNurseInputs.nurseName}
                onChange={handleInputChangeNurseSign}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Sign <span>:</span>
              </label>
              <img
                id="WardNurseSign"
                src={postNurseInputs.wardNurseSign}
                alt="WardNurseSign"
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Date <span>:</span>
              </label>
              <input
                type="date"
                id="wardNurseDate"
                name="wardNurseDate"
                value={postNurseInputs.wardNurseDate}
                onChange={handleInputChangeNurseSign}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Time <span>:</span>
              </label>
              <input
                type="time"
                id="wardNurseTime"
                name="wardNurseTime"
                value={postNurseInputs.wardNurseTime}
                onChange={handleInputChangeNurseSign}
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
                  Recovery Room Record
                </h4>

                <div className="Selected-table-container">
                  <table className="selected-medicine-table2">
                    <thead>
                      <tr>
                        <th>Time(in mts)</th>
                        <th>Temp</th>
                        <th>HR</th>
                        <th>RR</th>
                        <th>BP</th>
                        <th>SPO2</th>
                        <th>Uterine Tone</th>
                        <th>P.V. Bleeding</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>0</td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesForZero.temp}
                            onChange={(e) =>
                              handleInputChangeForZero(e, "temp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesForZero.hr}
                            onChange={(e) => handleInputChangeForZero(e, "hr")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesForZero.rr}
                            onChange={(e) => handleInputChangeForZero(e, "rr")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesForZero.bp}
                            onChange={(e) => handleInputChangeForZero(e, "bp")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesForZero.spo2}
                            onChange={(e) =>
                              handleInputChangeForZero(e, "spo2")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesForZero.uternineTone}
                            onChange={(e) =>
                              handleInputChangeForZero(e, "uternineTone")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesForZero.PVBleeding}
                            onChange={(e) =>
                              handleInputChangeForZero(e, "PVBleeding")
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>15</td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesOneFive.temp}
                            onChange={(e) =>
                              handleInputChangeOneFive(e, "temp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesOneFive.hr}
                            onChange={(e) => handleInputChangeOneFive(e, "hr")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesOneFive.rr}
                            onChange={(e) => handleInputChangeOneFive(e, "rr")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesOneFive.bp}
                            onChange={(e) => handleInputChangeOneFive(e, "bp")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesOneFive.spo2}
                            onChange={(e) =>
                              handleInputChangeOneFive(e, "spo2")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesOneFive.uternineTone}
                            onChange={(e) =>
                              handleInputChangeOneFive(e, "uternineTone")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesOneFive.PVBleeding}
                            onChange={(e) =>
                              handleInputChangeOneFive(e, "PVBleeding")
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>30</td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesThreeZero.temp}
                            onChange={(e) =>
                              handleInputChangeThreeZero(e, "temp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesThreeZero.hr}
                            onChange={(e) =>
                              handleInputChangeThreeZero(e, "hr")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesThreeZero.rr}
                            onChange={(e) =>
                              handleInputChangeThreeZero(e, "rr")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesThreeZero.bp}
                            onChange={(e) =>
                              handleInputChangeThreeZero(e, "bp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesThreeZero.spo2}
                            onChange={(e) =>
                              handleInputChangeThreeZero(e, "spo2")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesThreeZero.uternineTone}
                            onChange={(e) =>
                              handleInputChangeThreeZero(e, "uternineTone")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesThreeZero.PVBleeding}
                            onChange={(e) =>
                              handleInputChangeThreeZero(e, "PVBleeding")
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>45</td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesFourFive.temp}
                            onChange={(e) =>
                              handleInputChangeFourFive(e, "temp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesFourFive.hr}
                            onChange={(e) => handleInputChangeFourFive(e, "hr")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesFourFive.rr}
                            onChange={(e) => handleInputChangeFourFive(e, "rr")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesFourFive.bp}
                            onChange={(e) => handleInputChangeFourFive(e, "bp")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesFourFive.spo2}
                            onChange={(e) =>
                              handleInputChangeFourFive(e, "spo2")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesFourFive.uternineTone}
                            onChange={(e) =>
                              handleInputChangeFourFive(e, "uternineTone")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesFourFive.PVBleeding}
                            onChange={(e) =>
                              handleInputChangeFourFive(e, "PVBleeding")
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>60</td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesSixZero.temp}
                            onChange={(e) =>
                              handleInputChangeSixZero(e, "temp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesSixZero.hr}
                            onChange={(e) => handleInputChangeSixZero(e, "hr")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesSixZero.rr}
                            onChange={(e) => handleInputChangeSixZero(e, "rr")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesSixZero.bp}
                            onChange={(e) => handleInputChangeSixZero(e, "bp")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesSixZero.spo2}
                            onChange={(e) =>
                              handleInputChangeSixZero(e, "spo2")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesSixZero.uternineTone}
                            onChange={(e) =>
                              handleInputChangeSixZero(e, "uternineTone")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesSixZero.PVBleeding}
                            onChange={(e) =>
                              handleInputChangeSixZero(e, "PVBleeding")
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>90</td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesNineZero.temp}
                            onChange={(e) =>
                              handleInputChangeNineZero(e, "temp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesNineZero.hr}
                            onChange={(e) => handleInputChangeNineZero(e, "hr")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesNineZero.rr}
                            onChange={(e) => handleInputChangeNineZero(e, "rr")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesNineZero.bp}
                            onChange={(e) => handleInputChangeNineZero(e, "bp")}
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesNineZero.spo2}
                            onChange={(e) =>
                              handleInputChangeNineZero(e, "spo2")
                            }
                          />
                        </td>

                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesNineZero.uternineTone}
                            onChange={(e) =>
                              handleInputChangeNineZero(e, "uternineTone")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesNineZero.PVBleeding}
                            onChange={(e) =>
                              handleInputChangeNineZero(e, "PVBleeding")
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>120</td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesOneTwoZero.temp}
                            onChange={(e) =>
                              handleInputChangeOneTwoZero(e, "temp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesOneTwoZero.hr}
                            onChange={(e) =>
                              handleInputChangeOneTwoZero(e, "hr")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesOneTwoZero.rr}
                            onChange={(e) =>
                              handleInputChangeOneTwoZero(e, "rr")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesOneTwoZero.bp}
                            onChange={(e) =>
                              handleInputChangeOneTwoZero(e, "bp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesOneTwoZero.spo2}
                            onChange={(e) =>
                              handleInputChangeOneTwoZero(e, "spo2")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesOneTwoZero.uternineTone}
                            onChange={(e) =>
                              handleInputChangeOneTwoZero(e, "uternineTone")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesOneTwoZero.PVBleeding}
                            onChange={(e) =>
                              handleInputChangeOneTwoZero(e, "PVBleeding")
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                  <td>180</td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneEightZero.temp}
                      onChange={(e) => handleInputChangeOneEightZero(e, "temp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneEightZero.hr}
                      onChange={(e) => handleInputChangeOneEightZero(e, "hr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneEightZero.rr}
                      onChange={(e) => handleInputChangeOneEightZero(e, "rr")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneEightZero.bp}
                      onChange={(e) => handleInputChangeOneEightZero(e, "bp")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54"
                      type="number"
                      value={inputValuesOneEightZero.spo2}
                      onChange={(e) => handleInputChangeOneEightZero(e, "spo2")}
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesOneEightZero.uternineTone}
                      onChange={(e) =>
                        handleInputChangeOneEightZero(e, "uternineTone")
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="input_table_tye_site wedscr54_secd"
                      type="text"
                      value={inputValuesOneEightZero.PVBleeding}
                      onChange={(e) =>
                        handleInputChangeOneEightZero(e, "PVBleeding")
                      }
                    />
                  </td>
    
    
                </tr>
                      <tr>
                        <td>240</td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesTwoFourZero.temp}
                            onChange={(e) =>
                              handleInputChangeTwoFourZero(e, "temp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesTwoFourZero.hr}
                            onChange={(e) =>
                              handleInputChangeTwoFourZero(e, "hr")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesTwoFourZero.rr}
                            onChange={(e) =>
                              handleInputChangeTwoFourZero(e, "rr")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesTwoFourZero.bp}
                            onChange={(e) =>
                              handleInputChangeTwoFourZero(e, "bp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesTwoFourZero.spo2}
                            onChange={(e) =>
                              handleInputChangeTwoFourZero(e, "spo2")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesTwoFourZero.uternineTone}
                            onChange={(e) =>
                              handleInputChangeTwoFourZero(e, "uternineTone")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesTwoFourZero.PVBleeding}
                            onChange={(e) =>
                              handleInputChangeTwoFourZero(e, "PVBleeding")
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>300</td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesThreeZeroZero.temp}
                            onChange={(e) =>
                              handleInputChangeThreeZeroZero(e, "temp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesThreeZeroZero.hr}
                            onChange={(e) =>
                              handleInputChangeThreeZeroZero(e, "hr")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesThreeZeroZero.rr}
                            onChange={(e) =>
                              handleInputChangeThreeZeroZero(e, "rr")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesThreeZeroZero.bp}
                            onChange={(e) =>
                              handleInputChangeThreeZeroZero(e, "bp")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54"
                            type="number"
                            value={inputValuesThreeZeroZero.spo2}
                            onChange={(e) =>
                              handleInputChangeThreeZeroZero(e, "spo2")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesThreeZeroZero.uternineTone}
                            onChange={(e) =>
                              handleInputChangeThreeZeroZero(e, "uternineTone")
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input_table_tye_site wedscr54_secd"
                            type="text"
                            value={inputValuesThreeZeroZero.PVBleeding}
                            onChange={(e) =>
                              handleInputChangeThreeZeroZero(e, "PVBleeding")
                            }
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
                        <th colspan="2">
                          Score
                          <hr
                            style={{
                              padding: "3px 0px",
                              marginBottom: "5px",
                              border: "none",
                              borderBottom: "1px solid #ffff",
                            }}
                          />
                          <div className="dewui76ec">
                            <span style={{ width: "55px" }}>Pain</span>|
                            <span>Sedation</span>
                          </div>
                        </th>

                        <th colspan="2">
                          Intake
                          <hr
                            style={{
                              padding: "3px 0px",
                              marginBottom: "5px",
                              border: "none",
                              borderBottom: "1px solid #ffff",
                            }}
                          />
                          <div className="dewui76ec">
                            <span style={{ width: "50px" }}>Type</span>|
                            <span>Amount</span>
                          </div>
                        </th>
                        <th colspan="2">
                          Output
                          <hr
                            style={{
                              padding: "3px 0px",
                              marginBottom: "5px",
                              border: "none",
                              borderBottom: "1px solid #ffff",
                            }}
                          />
                          <div className="dewui76ec">
                            <span style={{ width: "50px" }}>Type</span> |{" "}
                            <span>Amount</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesForZero.pain1}
                                onChange={(e) =>
                                  handleInputChangeForZero(e, "pain1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesForZero.sedation1}
                                onChange={(e) =>
                                  handleInputChangeForZero(e, "sedation1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesForZero.intakeType1}
                                onChange={(e) =>
                                  handleInputChangeForZero(e, "intakeType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesForZero.intakeAmount1}
                                onChange={(e) =>
                                  handleInputChangeForZero(e, "intakeAmount1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesForZero.outputType1}
                                onChange={(e) =>
                                  handleInputChangeForZero(e, "outputType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesForZero.outputAmount1}
                                onChange={(e) =>
                                  handleInputChangeForZero(e, "outputAmount1")
                                }
                              />
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneFive.pain1}
                                onChange={(e) =>
                                  handleInputChangeOneFive(e, "pain1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneFive.sedation1}
                                onChange={(e) =>
                                  handleInputChangeOneFive(e, "sedation1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneFive.intakeType1}
                                onChange={(e) =>
                                  handleInputChangeOneFive(e, "intakeType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneFive.intakeAmount1}
                                onChange={(e) =>
                                  handleInputChangeOneFive(e, "intakeAmount1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneFive.outputType1}
                                onChange={(e) =>
                                  handleInputChangeOneFive(e, "outputType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneFive.outputAmount1}
                                onChange={(e) =>
                                  handleInputChangeOneFive(e, "outputAmount1")
                                }
                              />
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesThreeZero.pain1}
                                onChange={(e) =>
                                  handleInputChangeThreeZero(e, "pain1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesThreeZero.sedation1}
                                onChange={(e) =>
                                  handleInputChangeThreeZero(e, "sedation1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesThreeZero.intakeType1}
                                onChange={(e) =>
                                  handleInputChangeThreeZero(e, "intakeType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesThreeZero.intakeAmount1}
                                onChange={(e) =>
                                  handleInputChangeThreeZero(e, "intakeAmount1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesThreeZero.outputType1}
                                onChange={(e) =>
                                  handleInputChangeThreeZero(e, "outputType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesThreeZero.outputAmount1}
                                onChange={(e) =>
                                  handleInputChangeThreeZero(e, "outputAmount1")
                                }
                              />
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesFourFive.pain1}
                                onChange={(e) =>
                                  handleInputChangeFourFive(e, "pain1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesFourFive.sedation1}
                                onChange={(e) =>
                                  handleInputChangeFourFive(e, "sedation1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesFourFive.intakeType1}
                                onChange={(e) =>
                                  handleInputChangeFourFive(e, "intakeType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesFourFive.intakeAmount1}
                                onChange={(e) =>
                                  handleInputChangeFourFive(e, "intakeAmount1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesFourFive.outputType1}
                                onChange={(e) =>
                                  handleInputChangeFourFive(e, "outputType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesFourFive.outputAmount1}
                                onChange={(e) =>
                                  handleInputChangeFourFive(e, "outputAmount1")
                                }
                              />
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesSixZero.pain1}
                                onChange={(e) =>
                                  handleInputChangeSixZero(e, "pain1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesSixZero.sedation1}
                                onChange={(e) =>
                                  handleInputChangeSixZero(e, "sedation1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesSixZero.intakeType1}
                                onChange={(e) =>
                                  handleInputChangeSixZero(e, "intakeType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesSixZero.intakeAmount1}
                                onChange={(e) =>
                                  handleInputChangeSixZero(e, "intakeAmount1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesSixZero.outputType1}
                                onChange={(e) =>
                                  handleInputChangeSixZero(e, "outputType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesSixZero.outputAmount1}
                                onChange={(e) =>
                                  handleInputChangeSixZero(e, "outputAmount1")
                                }
                              />
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesNineZero.pain1}
                                onChange={(e) =>
                                  handleInputChangeNineZero(e, "pain1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesNineZero.sedation1}
                                onChange={(e) =>
                                  handleInputChangeNineZero(e, "sedation1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesNineZero.intakeType1}
                                onChange={(e) =>
                                  handleInputChangeNineZero(e, "intakeType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesNineZero.intakeAmount1}
                                onChange={(e) =>
                                  handleInputChangeNineZero(e, "intakeAmount1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesNineZero.outputType1}
                                onChange={(e) =>
                                  handleInputChangeNineZero(e, "outputType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesNineZero.outputAmount1}
                                onChange={(e) =>
                                  handleInputChangeNineZero(e, "outputAmount1")
                                }
                              />
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneTwoZero.pain1}
                                onChange={(e) =>
                                  handleInputChangeOneTwoZero(e, "pain1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneTwoZero.sedation1}
                                onChange={(e) =>
                                  handleInputChangeOneTwoZero(e, "sedation1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneTwoZero.intakeType1}
                                onChange={(e) =>
                                  handleInputChangeOneTwoZero(e, "intakeType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneTwoZero.intakeAmount1}
                                onChange={(e) =>
                                  handleInputChangeOneTwoZero(
                                    e,
                                    "intakeAmount1"
                                  )
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneTwoZero.outputType1}
                                onChange={(e) =>
                                  handleInputChangeOneTwoZero(e, "outputType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneTwoZero.outputAmount1}
                                onChange={(e) =>
                                  handleInputChangeOneTwoZero(
                                    e,
                                    "outputAmount1"
                                  )
                                }
                              />
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                       
                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneEightZero.pain1}
                                onChange={(e) =>
                                  handleInputChangeOneEightZero(e, "pain1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneEightZero.sedation1}
                                onChange={(e) =>
                                  handleInputChangeOneEightZero(e, "sedation1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneEightZero.intakeType1}
                                onChange={(e) =>
                                  handleInputChangeOneEightZero(
                                    e,
                                    "intakeType1"
                                  )
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneEightZero.intakeAmount1}
                                onChange={(e) =>
                                  handleInputChangeOneEightZero(
                                    e,
                                    "intakeAmount1"
                                  )
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneEightZero.outputType1}
                                onChange={(e) =>
                                  handleInputChangeOneEightZero(
                                    e,
                                    "outputType1"
                                  )
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesOneEightZero.outputAmount1}
                                onChange={(e) =>
                                  handleInputChangeOneEightZero(
                                    e,
                                    "outputAmount1"
                                  )
                                }
                              />
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesTwoFourZero.pain1}
                                onChange={(e) =>
                                  handleInputChangeTwoFourZero(e, "pain1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesTwoFourZero.sedation1}
                                onChange={(e) =>
                                  handleInputChangeTwoFourZero(e, "sedation1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesTwoFourZero.intakeType1}
                                onChange={(e) =>
                                  handleInputChangeTwoFourZero(e, "intakeType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesTwoFourZero.intakeAmount1}
                                onChange={(e) =>
                                  handleInputChangeTwoFourZero(
                                    e,
                                    "intakeAmount1"
                                  )
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesTwoFourZero.outputType1}
                                onChange={(e) =>
                                  handleInputChangeTwoFourZero(e, "outputType1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesTwoFourZero.outputAmount1}
                                onChange={(e) =>
                                  handleInputChangeTwoFourZero(
                                    e,
                                    "outputAmount1"
                                  )
                                }
                              />
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="dewui76ec">  
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesThreeZeroZero.pain1}
                                onChange={(e) =>
                                  handleInputChangeThreeZeroZero(e, "pain1")
                                }
                              />
                            </span>
                          </div>
                        </td>
    
                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesThreeZeroZero.sedation1}
                                onChange={(e) =>
                                  handleInputChangeThreeZeroZero(e, "sedation1")
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesThreeZeroZero.intakeType1}
                                onChange={(e) =>
                                  handleInputChangeThreeZeroZero(
                                    e,
                                    "intakeType1"
                                  )
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesThreeZeroZero.intakeAmount1}
                                onChange={(e) =>
                                  handleInputChangeThreeZeroZero(
                                    e,
                                    "intakeAmount1"
                                  )
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesThreeZeroZero.outputType1}
                                onChange={(e) =>
                                  handleInputChangeThreeZeroZero(
                                    e,
                                    "outputType1"
                                  )
                                }
                              />
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="dewui76ec">
                            <span>
                              <input
                                className="input_table_tye_site wedscr54_secd"
                                type="text"
                                value={inputValuesThreeZeroZero.outputAmount1}
                                onChange={(e) =>
                                  handleInputChangeThreeZeroZero(
                                    e,
                                    "outputAmount1"
                                  )
                                }
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <br />

                <div className="OtMangement_con_santhu">
                  <div className="ewdfhyewuf65">
                    <div className="OtMangementForm_1">
                      <label>
                        Wound Soakage <span>:</span>
                      </label>

                      <div className="OtMangementForm_1_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value="Yes"
                            checked={selection3 === "Yes"}
                            onChange={handleSelectionChange3}
                          />
                          <span>Yes</span>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            value="No"
                            checked={selection3 === "No"}
                            onChange={handleSelectionChange3}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    <div className="OtMangementForm_1">
                      <label>
                        Dressing Change <span>:</span>
                      </label>

                      <div className="OtMangementForm_1_checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value="Yes"
                            checked={selection4 === "Yes"}
                            onChange={handleSelectionChange4}
                          />
                          <span>Yes</span>
                        </label>

                        <label>
                          <input
                            type="checkbox"
                            value="No"
                            checked={selection4 === "No"}
                            onChange={handleSelectionChange4}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="gtrtrdyut554">
                    <div className="OtMangement_con34r">
                      <div className="OtMangementForm_1 erwdf3">
                        <label>
                          <h3> Total </h3>
                          <span>:</span>
                        </label>

                        <input
                          type="text"
                          className="input_table_tye_site dfr6kmnbv dfr6kmnbv"
                          name=""
                        />
                      </div>
                    </div>

                    <div className="OtMangement_con34r">
                      <div className="OtMangementForm_1 erwdf3">
                        <label>
                          Urine <span>:</span>
                        </label>

                        <input
                          type="text"
                          className="input_table_tye_site dfr6kmnbv"
                          name=""
                        />
                      </div>
                      <div className="OtMangementForm_1 erwdf3">
                        <label>
                          NGA <span>:</span>
                        </label>

                        <input
                          type="text"
                          className="input_table_tye_site dfr6kmnbv"
                          name=""
                        />
                      </div>
                      <div className="OtMangementForm_1 erwdf3">
                        <label>
                          Drain <span>:</span>
                        </label>

                        <input
                          type="text"
                          className="input_table_tye_site dfr6kmnbv"
                          name=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="jdcneuir8o34di">
              <div className="RegisForm_1 swsxwdef7ujn edercxx">
                <label>
                  Other Notes<span>:</span>
                </label>
                <textarea
                  id="otherNotes"
                  name="otherNotes"
                  value={postNurseInputs.otherNotes}
                  onChange={handleInputChangeNurseSign}
                ></textarea>
              </div>
            </div>
            <br />
            <br />
            <div className="RegisFormcon eferytr">
              <div
                className="
              "
              >
                <div className="RegisForm_1 de5y67y">
                  <label>
                    Nurse's Name <span>:</span>
                  </label>
                  <input
                    id="nurseName"
                    type="text"
                    name="nurseName"
                    value={postNurseInputs.nurseName}
                    onChange={handleInputChangeNurseSign}
                    required
                  />
                </div>

                <div className="RegisForm_1 ">
                  <label>
                    Sign <span>:</span>
                  </label>
                  <img
                    id="WardNurseSign"
                    src={postNurseInputs.wardNurseSign}
                    alt="WardNurseSign"
                  />
                </div>
              </div>
              <br />
              <br />

              <div
                className="
              "
              >
                <div className="RegisForm_1 de5y67y">
                  <label>
                    Date <span>:</span>
                  </label>
                  <input
                    type="date"
                    id="wardNurseDate"
                    name="wardNurseDate"
                    value={postNurseInputs.wardNurseDate}
                    onChange={handleInputChangeNurseSign}
                    required
                  />
                </div>

                <div className="RegisForm_1">
                  <label>
                    Time <span>:</span>
                  </label>
                  <input
                    type="time"
                    id="wardNurseTime"
                    name="wardNurseTime"
                    value={postNurseInputs.wardNurseTime}
                    onChange={handleInputChangeNurseSign}
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
}

export default OtNursePost;
