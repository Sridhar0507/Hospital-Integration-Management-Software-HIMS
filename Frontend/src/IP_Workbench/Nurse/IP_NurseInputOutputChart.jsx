import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const IP_NurseInputOutputChart = () => {

  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  // const UsercreatePatientdata = useSelector(state => state.userRecord?.UsercreatePatientdata);
  const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);

  console.log(IP_DoctorWorkbenchNavigation,'IP_DoctorWorkbenchNavigation');
  
  const dispatch = useDispatch();

  const [type, setType] = useState("Intake");
  const [IntakeData, setIntakeData] = useState({
    IntakeType: "",
    IntakeMode: "",
    Site: "",
    Measurement1: "",
    MeasurementType1: "ml",
    Duration: "",
    DurationType: "hours",
    Remarks1: "",
  });

  const [OutputData, setOutputData] = useState({
    OutputType: "",
    Measurement2: "",
    MeasurementType2:'ml',
    Remarks2: "",
  });
  const [Balance, setBalanceData] = useState({
    totalInputDay: "",
    totalOutputDay: "",
    balance: "",
    balanceType: "",
  })


  const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();



  const [IsGetData, setIsGetData] = useState(false)
  const [IsViewMode, setIsViewMode] = useState(false)
  const [intakeDetailsData, setIntakeDetailsData] = useState([]);
  const [outputDetailsData, setOutputDetailsData] = useState([]);
  const [balanceDetailsData, setBalanceDetailsData] = useState([]);

  const [totalMeasurement1, setTotalMeasurement1] = useState(0);
  const [totalMeasurement2, setTotalMeasurement2] = useState(0);

 
  const IntakeColumns = [
    { key: 'id', name: 'S.No' ,frozen: true},
    // { key: 'VisitId', name: 'Visit ID',frozen: true },
    // { key: 'PrimaryDoctorId', name: 'Doctor Id', frozen: true },
    { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },
    { key: 'IntakeType', name: 'Intake Type' },
    { key: 'IntakeMode', name: 'Intake Mode' },
    // { key: 'Site', name: 'Site' },
    { key: 'Measurement1', name: 'Measurement' },
    { key: 'MeasurementType1', name: 'Measurement Type' },
    { key: 'Duration', name: 'Duration' },
    { key: 'Remarks', name: 'Remarks' },
    { key: 'Date', name: 'Date',frozen: true},
    { key: 'Time', name: 'Time',frozen: true },
    // {
    //   key: 'view',
    //   name: 'View',
    //   frozen: true,
    //   renderCell: (params) => (
    //     <IconButton onClick={() => handleView(params.row)}>
    //       <VisibilityIcon />
    //     </IconButton>
    //   ),
    // },
    // { key: 'TotalMeasurement1', name: 'Total Measurement',frozen: true }
  ];

  const OutputColumns = [
    { key: 'id', name: 'S.No',frozen: true },
    // { key: 'VisitId', name: 'Visit ID',frozen: true },
    // { key: 'PrimaryDoctorId', name: 'Doctor Id', frozen: true },
    { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },
    { key: 'OutputType', name: 'Output Type' },
    { key: 'Measurement2', name: 'Measurement' },
    { key: 'MeasurementType2', name: 'Measurement Type' },
    { key: 'Remarks2', name: 'Remarks' },
    { key: 'Date', name: 'Date',frozen: true,},
    { key: 'Time', name: 'Time' ,frozen: true,},
    // {
    //   key: 'view',
    //   name: 'View',
    //   frozen: true,
    //   renderCell: (params) => (
    //     <IconButton onClick={() => handleView(params.row)}>
    //       <VisibilityIcon />
    //     </IconButton>
    //   ),
    // },
    // { key: 'TotalMeasurement2', name: 'Total Measurement',frozen: true }

  ];


  const BalanceColumns = [
    { key: 'id', name: 'S.No' ,frozen: true},
    // { key: 'VisitId', name: 'Visit ID',frozen: true },
    // { key: 'PrimaryDoctorId', name: 'Doctor Id', frozen: true },
    { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },
    { key: 'totalInputDay', name: 'Total Input (Day)' },
    { key: 'totalOutputDay', name: 'Total Output (Day)' },
    { key: 'balance', name: 'Balance' },
    { key: 'balanceType', name: 'Balance Type' },
    { key: 'Date', name: 'Date' ,frozen: true},
    { key: 'Time', name: 'Time' ,frozen: true},
    // {
    //   key: 'view',
    //   name: 'View',
    //   frozen: true,
    //   renderCell: (params) => (
    //     <IconButton onClick={() => handleView(params.row)}>
    //       <VisibilityIcon />
    //     </IconButton>
    //   ),
    // },
  ];



  // useEffect(() => {
  //   axios
  //     .get(`${UrlLink}Ip_Workbench/IP_InputOutputBalance_Details_Link`, {
  //       params: { RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId },
  //     })
  //     .then((res) => {
  //       const { intake_details, output_details, balance_details } = res.data;

  //       console.log('Intake Details:', intake_details);
  //       console.log('Output Details:', output_details);
  //       console.log('Balance Details:', balance_details);

  //       // Set the data for each grid separately
  //       setIntakeDetailsData(intake_details || []);
  //       setOutputDetailsData(output_details || []);
  //       setBalanceDetailsData(balance_details || []);
  //       calculateTotalMeasurement1(intake_details || []);
  //       calculateTotalMeasurement2(output_details || []);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, [IsGetData, UrlLink, IP_DoctorWorkbenchNavigation?.RegistrationId]);




  useEffect(() => {
    const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
    const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;
    
    if (RegistrationId ) {
      axios
        .get(`${UrlLink}Ip_Workbench/IP_InputOutputBalance_Details_Link`, {
          params: {
            RegistrationId: RegistrationId,
            DepartmentType: departmentType
            },
        })
      .then((res) => {
          const { intake_details, output_details} = res.data;

          console.log('Intake Details:', intake_details);
          console.log('Output Details:', output_details);

          // Set the data for each grid separately
          setIntakeDetailsData(intake_details || []);
          setOutputDetailsData(output_details || []);
          calculateTotalMeasurement1(intake_details || []);
          calculateTotalMeasurement2(output_details || []);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, [IsGetData, UrlLink, IP_DoctorWorkbenchNavigation]);


  useEffect(() => {
    const departmentType = IP_DoctorWorkbenchNavigation?.DepartmentType;
    const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;

    if (RegistrationId) {
      axios
        .get(`${UrlLink}Ip_Workbench/IP_Balance_Details_Link`, {
          params: { 
              RegistrationId: RegistrationId,
              DepartmentType: departmentType
          },
        })
        .then((res) => {
          console.log('Response Data:', res.data); // Print entire response data
          setBalanceDetailsData(res.data || []);  // Ensure res.data contains the correct data structure
        })
        .catch((err) => {
          console.error('Error fetching balance details:', err);
        });
    }    
  }, [IsGetData, UrlLink, IP_DoctorWorkbenchNavigation]);
  

  
  // const calculateTotalMeasurement1 = (data) => {
  //   const total = data.reduce((sum, item) => sum + (parseFloat(item.Measurement1) || 0), 0);
  //   setTotalMeasurement1(total);
  //   setBalanceData(prev => ({
  //     ...prev,
  //     totalInputDay: total
  //   }));
  // };


  // const calculateTotalMeasurement2 = (data) => {
  //   const total = data.reduce((sum, item) => sum + (parseFloat(item.Measurement2) || 0), 0);
  //   setTotalMeasurement2(total);
  //   setBalanceData(prev => ({
  //     ...prev,
  //     totalOutputDay: total
  //   }));
  // };




  // const getTodayDate = () => {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = String(today.getMonth() + 1).padStart(2, '0');
  //   const day = String(today.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${day}-${month}-${year.toString().slice(-2)}`;
  };


  const calculateTotalMeasurement1 = (data) => {
    const todayDate = getTodayDate();
    const total = data
      .filter(item => item.Date === todayDate)
      .reduce((sum, item) => sum + (parseFloat(item.Measurement1) || 0), 0);
    setTotalMeasurement1(total);
    setBalanceData(prev => {
      const updatedBalance = total - prev.totalOutputDay;
      return {
        ...prev,
        totalInputDay: total,
        balance: updatedBalance,
        balanceType: updatedBalance < 0 ? "Negative" : "Positive"
      };
    });
  };

  const calculateTotalMeasurement2 = (data) => {
    const todayDate = getTodayDate();
    const total = data
      .filter(item => item.Date === todayDate)
      .reduce((sum, item) => sum + (parseFloat(item.Measurement2) || 0), 0);
    setTotalMeasurement2(total);
    setBalanceData(prev => {
      const updatedBalance = prev.totalInputDay - total;
      return {
        ...prev,
        totalOutputDay: total,
        balance: updatedBalance,
        balanceType: updatedBalance < 0 ? "Negative" : "Positive"
      };
    });
  };

  // const calculateTotalMeasurement1 = (data) => {
  //   const total = data.reduce((sum, item) => sum + (parseFloat(item.Measurement1) || 0), 0);
  //   setTotalMeasurement1(total);
  //   setBalanceData(prev => {
  //     const updatedBalance = total - prev.totalOutputDay;
  //     return {
  //       ...prev,
  //       totalInputDay: total,
  //       balance: updatedBalance,
  //       balanceType: updatedBalance < 0 ? "Negative" : "Positive"
  //     };
  //   });
  // };

  // const calculateTotalMeasurement2 = (data) => {
  //   const total = data.reduce((sum, item) => sum + (parseFloat(item.Measurement2) || 0), 0);
  //   setTotalMeasurement2(total);
  //   setBalanceData(prev => {
  //     const updatedBalance = prev.totalInputDay - total;
  //     return {
  //       ...prev,
  //       totalOutputDay: total,
  //       balance: updatedBalance,
  //       balanceType: updatedBalance < 0 ? "Negative" : "Positive"
  //     };
  //   });
  // };







  const handleView = (data) => {
    setIntakeData({
      ReasonForAdmission: data.ReasonForAdmission || '',
      PatientConditionOnAdmission: data.PatientConditionOnAdmission || '',
      DoctorIncharge: data.DoctorIncharge || '',
      NurseIncharge: data.NurseIncharge || '',
      ReceptionInchargeName: data.ReceptionInchargeName || '',
      PatientFile: data.PatientFile || '',
      AadharCardNo: data.AadharCardNo || '',
      IntakeType: data.IntakeType || "",
      IntakeMode: data.IntakeMode || "",
      Site: data.Site || "",
      Measurement1: data.Measurement1 || "",
      MeasurementType1: data.MeasurementType1 || "ml",
      Duration: data.Duration || "",
      DurationType: data.DurationType || "hours",
      Remarks1: data.Remarks || "",
    });
  
    setOutputData({
      OutputType: data.OutputType || "",
      Measurement2: data.Measurement2 || "",
      MeasurementType2: data.MeasurementType2 || 'ml',
      Remarks2: data.Remarks2 || "",
    });
  
    setBalanceData({
      totalInputDay: data.totalInputDay || "",
      totalOutputDay: data.totalOutputDay || "",
      balance: data.balance || "",
      balanceType: data.balanceType || "",
    });
  
    setIsViewMode(true);
  };
  
  const handleClear = () => {
    setIntakeData({
      ReasonForAdmission: "",
      PatientConditionOnAdmission: "",
      DoctorIncharge: "",
      NurseIncharge: "",
      ReceptionInchargeName: "",
      PatientFile: "",
      AadharCardNo: "",
      IntakeType: "",
      IntakeMode: "",
      Site: "",
      Measurement1: "",
      MeasurementType1: "ml",
      Duration: "",
      DurationType: "hours",
      Remarks1: "",
    });
  
    setOutputData({
      OutputType: "",
      Measurement2: "",
      MeasurementType2: 'ml',
      Remarks2: "",
    });
  
    setBalanceData({
      totalInputDay: "",
      totalOutputDay: "",
      balance: "",
      balanceType: "",
    });
  
    setIsViewMode(false);
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (type === "Intake") {
      setIntakeData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (type === "Output") {
      setOutputData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setBalanceData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };



  const handleChange = (event) => {
    setType(event.target.value);
  };



  const handleSubmit = () => {
    const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
    const DepartmentType = IP_DoctorWorkbenchNavigation?.RequestType;

    if (!RegistrationId) {
      dispatch({ type: 'toast', value: { message: 'Registration ID is missing', type: 'error' } });
      return;
    }

    let dataToSubmit = {};
  
    // Determine which data to submit based on the type
    if (type === 'Intake') {
      dataToSubmit = IntakeData;
    } else if (type === 'Output') {
      dataToSubmit = OutputData;
    } 
  
    const sendData = {
      ...dataToSubmit,  // Spread the correct data object based on type
      Inserttype: type,
      RegistrationId,
      DepartmentType,
      Createdby: userRecord?.username,
    };
  
    console.log(sendData, 'sendData ');
  
    axios
      .post(`${UrlLink}Ip_Workbench/IP_InputOutputBalance_Details_Link`, sendData)
      .then((res) => {
        const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
        dispatch({ type: 'toast', value: { message, type } });

        if (type === 'Intake') {
          setIntakeDetailsData(prevData => {
            const updatedData = [...prevData, dataToSubmit];
            calculateTotalMeasurement1(updatedData);
            return updatedData;
          });
        } else if (type === 'Output') {
          setOutputDetailsData(prevData => {
            const updatedData = [...prevData, dataToSubmit];
            calculateTotalMeasurement2(updatedData);
            return updatedData;
          });
        } 

        setIsGetData(prev => !prev);
        handleClear();
      })
      .catch((err) => console.log(err));
  };


  // const handleBalanceSubmit = () => {
  
  //   if (type !== 'Balance') return;
  
  //   const sendData = {
  //     ...Balance,
  //     Inserttype: 'Balance',
  //     RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
  //     Createdby: userRecord?.username,
  //   };
  
  //   console.log(sendData, 'sendData ');
  
  //   axios
  //     .post(`${UrlLink}Ip_Workbench/IP_Balance_Details_Link`, sendData)
  //     .then((res) => {
  //       const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
  //       dispatch({ type: 'toast', value: { message, type } });
       
       
  //       if (type === 'Balance') {
  //         setBalanceData(prev => ({
  //           ...prev,
  //           totalInputDay: sendData.totalInputDay,
  //           totalOutputDay: sendData.totalOutputDay,
  //           balance: sendData.balance,
  //           balanceType: sendData.balanceType,
  //         }));
  //       }
  //       handleClear();


  //       setIsGetData(prev => !prev);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleSubmitClick = () => {
  //   if (type === 'Balance') {
  //     handleBalanceSubmit();
  //   } else {
  //     handleSubmit();
  //   }
  // };
  
  // const handleSubmitClick = () => {
  //   if (type === 'Balance') {
  //     handleBalanceSubmit();
  //   } else {
  //     handleSubmit();
  //   }
  // };

  // const handleSubmit = () => {
  //   let dataToSubmit = {};
  
  //   // Determine which data to submit based on the type
  //   if (type === 'Intake') {
  //     dataToSubmit = IntakeData;
  //   } else if (type === 'Output') {
  //     dataToSubmit = OutputData;
  //   } else if (type === 'Balance') {
  //     dataToSubmit = Balance;
  //   }
  
  //   const sendData = {
  //     ...dataToSubmit,  // Spread the correct data object based on type
  //     Inserttype: type,
  //     RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
  //     Createdby: userRecord?.username,
  //   };
  
  //   console.log(sendData, 'sendData ');
  
  //   axios
  //     .post(`${UrlLink}Ip_Workbench/IP_InputOutputBalance_Details_Link`, sendData)
  //     .then((res) => {
  //       const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
  //       dispatch({ type: 'toast', value: { message, type } });

  //       if (type === 'Intake') {
  //         setIntakeDetailsData(prevData => {
  //           const updatedData = [...prevData, dataToSubmit];
  //           calculateTotalMeasurement1(updatedData);
  //           return updatedData;
  //         });
  //       } else if (type === 'Output') {
  //         setOutputDetailsData(prevData => {
  //           const updatedData = [...prevData, dataToSubmit];
  //           calculateTotalMeasurement2(updatedData);
  //           return updatedData;
  //         });
  //       } else if (type === 'Balance') {
  //         setBalanceData(prev => ({
  //           ...prev,
  //           totalInputDay: dataToSubmit.totalInputDay,
  //           totalOutputDay: dataToSubmit.totalOutputDay,
  //           balance: dataToSubmit.balance,
  //           balanceType: dataToSubmit.balanceType,
  //         }));
  //       }

  //       setIsGetData(prev => !prev);
  //       handleClear();
  //     })
  //     .catch((err) => console.log(err));
  // };
  


  return (
  <>
    <div className="RegisFormcon_1">
      <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton
            value="Intake"
            style={{
              height: "30px",
              width: "100px",
              backgroundColor:
                type === "Intake"
                  ? "var(--selectbackgroundcolor)"
                  : "inherit",
            }}
            className="togglebutton_container"
          >
            Intake
          </ToggleButton>
          <ToggleButton
            value="Output"
            style={{
              backgroundColor:
                type === "Output"
                  ? "var(--selectbackgroundcolor)"
                  : "inherit",
              width: "100px",
              height: "30px",
            }}
            className="togglebutton_container"
          >
            Output
          </ToggleButton>
          <ToggleButton
            value="Balance"
            style={{
              backgroundColor:
                type === "Balance"
                  ? "var(--selectbackgroundcolor)"
                  : "inherit",
              width: "100px",
              height: "30px",
            }}
            className="togglebutton_container"
          >
            Balance
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* Form Content */}
      {type === "Intake" ? (
        <div className="RegisFormcon">
          <div className="RegisForm_1">
            <label>
              Intake Type <span>:</span>
            </label>
            <select
              name="IntakeType"
              value={IntakeData.IntakeType}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            >
              <option value="">Select</option>
              <option value="Solid">Solid</option>
              <option value="SemiSolid">Semi Solid</option>
              <option value="Fulid">Fluid</option>
            </select>
          </div>
          <div className="RegisForm_1">
            <label>
              Intake Mode <span>:</span>
            </label>
            <select
              name="IntakeMode"
              value={IntakeData.IntakeMode}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            >
              <option value="">Select</option>
              <option value="Oral">Oral</option>
              <option value="IV">IV</option>
              <option value="RylesTube">RylesTube</option>
            </select>
          </div>
          {IntakeData.IntakeMode === "IV" && (
              <div className="RegisForm_1">
                <label>
                  Site <span>:</span>
                </label>
                <select
                  name="Site"
                  value={IntakeData.Site}
                  onChange={handleInputChange}
                  readOnly={IsViewMode}

                >
                  <option value="">Select</option>
                  <option value="External Jugular">External Jugular</option>
                  <option value="Subclavian">Subclavian</option>
                  <option value="Femoral vein">Femoral vein</option>
                  <option value="Dorsal Venous Network of Hand">
                    Dorsal Venous Network of Hand
                  </option>
                  <option value="Radial vein">Radial vein</option>
                  <option value="Median Cubital vein">Median Cubital vein</option>
                  <option value="Cephalic vein">Cephalic vein</option>
                  <option value="Dorsal Venous Network of Leg">
                    Dorsal Venous Network of Leg
                  </option>
                  <option value="Saphaneous vein">Saphaneous vein</option>
                  <option value="Superficial Temporal vein">
                    Superficial Temporal vein
                  </option>
                </select>
              </div>
            )}
          <div className="RegisForm_1">
            <label>
              Duration <span>:</span>
            </label>
            <input
              name="Duration"
              type="number"
              onKeyDown={blockInvalidChar}
              style={{ width: "50px" }}
              value={IntakeData.Duration}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            />
            <select
              name="DurationType"
              style={{ width: "110px" }}
              value={IntakeData.DurationType}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            >
              <option value="hours">hours</option>
              <option value="minutes">minutes</option>
            </select>
          </div>
          <div className="RegisForm_1">
            <label>
              Measurement <span>:</span>
            </label>
            <input
              name="Measurement1"
              type="number"
              onKeyDown={blockInvalidChar}
              style={{ width: "50px" }}
              value={IntakeData.Measurement1}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            />
            <select
              name="MeasurementType1"
              style={{ width: "110px" }}
              value={IntakeData.MeasurementType1}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            >
              <option value="grams">grams</option>
              <option value="ml">ml</option>
            </select>
          </div>
          <div className="RegisForm_1">
            <label>
              Remarks <span>:</span>
            </label>
            <textarea
              name="Remarks1"
              value={IntakeData.Remarks1}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            />
          </div>
        </div>
      ) : type === "Output" ? (
        <div className="RegisFormcon">
          <div className="RegisForm_1">
            <label>
              Output Type <span>:</span>
            </label>
            <select
              name="OutputType"
              value={OutputData.OutputType}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            >
              <option value="">Select</option>
              <option value="Vomit">Vomit</option>
              <option value="Urine">Urine</option>
              <option value="Stules">Stools</option>
              <option value="Vomit">Surgical Site Drainage</option>
              <option value="Urine">Gastric</option>
              <option value="Stules">Lab sample</option>
              <option value="Stules">Insensible loss</option>
              <option value="Stules">Sweating</option>
              <option value="Stules">Oozing</option>
              <option value="Stules">Bleeding</option>
            </select>
          </div>
          <div className="RegisForm_1">
            <label>
              Measurement <span>:</span>
            </label>
            <input
              name="Measurement2"
              type="number"
              onKeyDown={blockInvalidChar}
              style={{ width: "50px" }}
              value={OutputData.Measurement2}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            />
            <select
              name="MeasurementType2"
              style={{ width: "110px" }}
              value={OutputData.MeasurementType2}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            >
              <option value="grams">grams</option>
              <option value="ml">ml</option>
            </select>
          </div>
          <div className="RegisForm_1">
            <label>
              Remarks <span>:</span>
            </label>
            <textarea
              name="Remarks2"
              value={OutputData.Remarks2}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            />
          </div>
        </div>
      ) : (
        <div className="RegisFormcon">
          <div className="RegisForm_1">
            <label>
              Total Input of the day (ml/gms) <span>:</span>
            </label>
            <input
              name="totalInputDay"
              type="number"
              onKeyDown={blockInvalidChar}
              style={{ width: "140px" }}
              value={Balance.totalInputDay}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            />
          </div>
          <div className="RegisForm_1">
            <label>
              Total Output of the day (ml/gms) <span>:</span>
            </label>
            <input
              name="totalOutputDay"
              type="number"
              onKeyDown={blockInvalidChar}
              style={{ width: "140px" }}
              value={Balance.totalOutputDay}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            />
          </div>
          <div className="RegisForm_1">
            <label>
              Balance <span>:</span>
            </label>
            <input
              name="balance"
              type="number"
              onKeyDown={blockInvalidChar}
              style={{ width: "140px" }}
              value={Balance.balance}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            />
          </div>
          <div className="RegisForm_1">
            <label>
              Balance Type <span>:</span>
            </label>
            <select
              name="balanceType"
              value={Balance.balanceType}
              onChange={handleInputChange}
              readOnly={IsViewMode}

            >
              <option value="">Select</option>
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </select>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="Main_container_Btn">

        {IsViewMode && (
          <button onClick={handleClear}>Clear</button>
        )}
        {!IsViewMode && type !== 'Balance' && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>

      {/* Grid Data */}


      {type === "Intake" && intakeDetailsData.length > 0 && (
        <>
          <ReactGrid columns={IntakeColumns} RowData={intakeDetailsData} />
          <div style={{ padding: '10px', fontWeight: 'bold' }}>
            Total Measurement: {totalMeasurement1} ml 
          </div>
        </>
      )}
      {type === "Output" && outputDetailsData.length > 0 && (
        <>
          <ReactGrid columns={OutputColumns} RowData={outputDetailsData} />
          <div style={{ padding: '10px', fontWeight: 'bold' }}>
            Total Measurement: {totalMeasurement2} ml 
          </div>
        </>
      )}


      {/* {type === "Intake" && intakeDetailsData.length > 0 && (
        <ReactGrid
          columns={IntakeColumns}
          RowData={intakeDetailsData}
          footerData={{ TotalMeasurement1: `${totalMeasurement1} ml` }}
        />
      )}

      {type === "Output" && outputDetailsData.length > 0 && (
        <ReactGrid
          columns={OutputColumns}
          RowData={outputDetailsData}
          footerData={{ TotalMeasurement2: `${totalMeasurement2} ml` }}
        />
      )} */}


      


      {/* {type === "Output" && outputDetailsData.length > 0 && (
        <ReactGrid columns={OutputColumns} RowData={outputDetailsData} />
      )} */}
      {type === "Balance" && balanceDetailsData.length > 0 && (
        <ReactGrid columns={BalanceColumns} RowData={balanceDetailsData} />
      )}

      {/* Toast Alert */}
      <ToastAlert Message={toast.message} Type={toast.type} />
    </div>
  </>

  )
}

export default IP_NurseInputOutputChart;