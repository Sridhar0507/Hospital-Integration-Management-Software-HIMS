import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import bgImg2 from "../assets/bgImg2.jpg";
import bgImg2 from "../Assets/bgImg2.jpg";
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';
import '../OtManagement/OtManagement.css';
import '../DoctorWorkBench/Navigation.css';
import '../DoctorWorkBench/Prescription.css';


const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="print-content">
      {props.children}
    </div>
  );
});


function IFCard() {

  //34 fields
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const dispatch = useDispatch();
  // const UsercreatePatientdata = useSelector(state => state.userRecord?.UsercreatePatientdata);
  const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);

  const dispatchvalue = useDispatch();

  const [cardFormData, setcardsFormData] = useState({
    husbandName: "",
    husbandage: "",
    bloodGroupHusband: "",
    durationRelation: "",
    phoneNumber: "",
    address: "",

    menstrualHistory: "",
    noOfDays: "",
    dysmenorrhea: "",
    MCB: "",

    attemptingPregnancy: "",

    sexualHistory: "",
    durationIC: "",
    visitAboard: "",

    medicalHistory: "",
    obstlHistory: "",
    surgicalHistory: "",

    AddDate: "",
    AddImpression: "",
    USGDate: "",
    USGImpression: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcardsFormData({
      ...cardFormData,
      [name]: value,
    });
  };


  const [LMPs, setLMPs] = useState([""]);

  const handleLMPChange = (index, value) => {
    const newLMPs = [...LMPs];
    newLMPs[index] = value;
    setLMPs(newLMPs);
  };

  const addLMPInput = () => {
    setLMPs([...LMPs, ""]);
  };

  const deleteLMPInput = (index) => {
    const newLMPs = LMPs.filter((_, i) => i !== index);
    setLMPs(newLMPs);
  };


  const labels = [
    "Hb",
    "TLC",
    "BSL",
    "S.Prolactin",
    "FSH",
    "E2",
    "HIV",
    "Urine",
    "AMH",
    "TSH",
    "LH",
    "T3",
    "T4",
    "S.HCG",
  ];


  // Initialize state as an object with keys from labels and empty string values
  const [labelsData, setLabelsData] = useState(
    labels.reduce((acc, label) => ({ ...acc, [label]: '' }), {})
  );

  const handleLabelChange = (label, event) => {
    const value = event.target.value;

    setLabelsData(prevState => ({
      ...prevState,
      [label]: value
    }));
  };




  const initialRowData = {
    date: "",
    count: "",
    mot: "",
    norm: "",
  };

  const [rows, setRows] = useState([initialRowData]);

  const addRow4 = () => {
    setRows([...rows, initialRowData]);
  };

  const deleteRow4 = (index) => {
    setRows(rows.filter((_, rowIndex) => rowIndex !== index));
  };

  const handleChangeDateAded = (index, key, value) => {
    const updatedRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [key]: value } : row
    );
    setRows(updatedRows);
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const [drainsData3, setDrainsData3] = useState([
    {
      DateforDelivery: "",
      DayDelivery: "",
      RODelivery: "",
      LODelivery: "",
      ETDelivery: "",
      StimDelivery: "",
    },
  ]);

  const addRow3 = () => {
    setDrainsData3([
      ...drainsData3,
      {
        DateforDelivery: "",
        DayDelivery: "",
        RODelivery: "",
        LODelivery: "",
        ETDelivery: "",
        StimDelivery: "",
      },
    ]);
  };

  const deleteRow3 = (index) => {
    const updatedDrainsData3 = [...drainsData3];
    updatedDrainsData3.splice(index, 1);

    setDrainsData3(updatedDrainsData3);
  };

  const handleChangeObstetric3 = (e, index, key) => {
    const updatedDrainsData3 = [...drainsData3];
    updatedDrainsData3[index][key] = e.target.value;
    setDrainsData3(updatedDrainsData3);
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

  const handleCheckboxChangePrint = (index) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(index)) {
        return prevSelectedRows.filter((i) => i !== index);
      } else {
        return [...prevSelectedRows, index];
      }
    });
  };

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




  const IFCardColumns = [
    { key: 'id', name: 'S.No', frozen: true },
    { key: 'VisitId', name: 'VisitId', frozen: true },
    { key: 'PrimaryDoctorId', name: 'Doctor Id', frozen: true },
    { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },
    { key: 'created_by', name: 'Created By', frozen: true },
    { key: 'Date', name: 'Date', frozen: true },
    { key: 'Time', name: 'Time', frozen: true },
    { key: 'husbandName', name: 'Husband Name' },
    { key: 'husbandage', name: 'Husband age' },
    { key: 'bloodGroupHusband', name: 'BloodGroupHusband' },
    { key: 'durationRelation', name: 'Duration Relation' },
    { key: 'phoneNumber', name: 'PhoneNumber' },
    { key: 'address', name: 'Address' },
    { key: 'attemptingPregnancy', name: 'AttemptingPregnancy' },
    { key: 'menstrualHistory', name: 'MenstrualHistory' },
    { key: 'noOfDays', name: 'NoOfDays' },
    { key: 'dysmenorrhea', name: 'Dysmenorrhea' },
    { key: 'Mcb', name: 'Mcb' },
    { key: 'LMPs', name: 'LMPs' },
    { key: 'sexualHistory', name: 'sexualHistory' },
    { key: 'durationIC', name: 'durationIC' },
    { key: 'visitAboard', name: 'visitAboard' },
    { key: 'medicalHistory', name: 'MedicalHistory' },
    { key: 'obstlHistory', name: 'obstlHistory' },
    { key: 'surgicalHistory', name: 'surgicalHistory' },
    { key: 'AddDate', name: 'AddDate' },
    { key: 'AddImpression', name: 'AddImpression' },
    { key: 'USGDate', name: 'USGDate' },
    { key: 'USGImpression', name: 'USGImpression' },
    { key: 'Hb', name: 'Hb' },
    { key: 'Tlc', name: 'Tlc' },
    { key: 'Bsl', name: 'Bsl' },
    { key: 'Prolactin', name: 'Prolactin' },
    { key: 'Fsh', name: 'Fsh' },
    { key: 'e2', name: 'e2' },
    { key: 'Hiv', name: 'Hiv' },
    { key: 'Urine', name: 'Urine' },
    { key: 'Amh', name: 'Amh' },
    { key: 'Tsh', name: 'Tsh' },
    { key: 'Lh', name: 'Lh' },
    { key: 't3', name: 't3' },
    { key: 't4', name: 't4' },
    { key: 'Hcg', name: 'Hcg' },
    // { key: 'date', name: 'date' },
    // { key: 'count', name: 'count' },
    // { key: 'mot', name: 'mot' },
    // { key: 'norm', name: 'norm' },
    // { key: 'rows', name: 'rows' },
    // { key: 'DateforDelivery', name: 'DateforDelivery' },
    // { key: 'DayDelivery', name: 'DayDelivery' },
    // { key: 'RODelivery', name: 'RODelivery' },
    // { key: 'LODelivery', name: 'LODelivery' },
    // { key: 'ETDelivery', name: 'ETDelivery' },
    // { key: 'StimDelivery', name: 'StimDelivery' },
    { key: 'selectedRows', name: 'selectedRows' },

    {
      key: 'view',
      name: 'View',
      frozen: true,
      renderCell: (params) => (
        <IconButton onClick={() => handleView(params.row)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];


  const [GetData, setGetData] = useState([]);
  const [IsGetData, setIsGetData] = useState(false);
  const [IsViewMode, setIsViewMode] = useState(false)

  useEffect(() => {
    axios.get(`${UrlLink}Workbench/Workbench_IFCard_Details`, { params: { RegistrationId: DoctorWorkbenchNavigation?.pk } })
      .then((res) => {
        const ress = res.data
        setGetData(ress)
        console.log(res.data, 'res.data');
      })
      .catch((err) => {
        console.log(err);
      })
  }, [IsGetData, UrlLink, DoctorWorkbenchNavigation])

  const handleView = (data) => {
    console.log(data, '8888888');

    const parseArray = (str, defaultValue) => {
      try {
        return JSON.parse(str.replace(/'/g, '"')); // replace single quotes with double quotes to parse correctly
      } catch (e) {
        return defaultValue;
      }
    };


    setcardsFormData({
      husbandName: data.husbandName || '',
      husbandage: data.husbandage || '',
      bloodGroupHusband: data.bloodGroupHusband || '',
      durationRelation: data.durationRelation || '',
      phoneNumber: data.phoneNumber || '',
      address: data.address || '',
      menstrualHistory: data.menstrualHistory || '',
      noOfDays: data.noOfDays || '',
      dysmenorrhea: data.dysmenorrhea || '',
      MCB: data.Mcb || '',
      attemptingPregnancy: data.attemptingPregnancy || '',
      sexualHistory: data.sexualHistory || '',
      durationIC: data.durationIC || '',
      visitAboard: data.visitAboard || '',
      medicalHistory: data.medicalHistory || '',
      obstlHistory: data.obstlHistory || '',
      surgicalHistory: data.surgicalHistory || '',
      AddDate: data.AddDate || '',
      AddImpression: data.AddImpression || '',
      USGDate: data.USGDate || '',
      USGImpression: data.USGImpression || '',
    });

    setLabelsData({
      Hb: data.Hb || '',
      TLC: data.Tlc || '',
      BSL: data.Bsl || '',
      SProlactin: data.Prolactin || '',
      FSH: data.Fsh || '',
      E2: data.e2 || '',
      HIV: data.Hiv || '',
      Urine: data.Urine || '',
      AMH: data.Amh || '',
      TSH: data.Tsh || '',
      LH: data.Lh || '',
      T3: data.t3 || '',
      T4: data.t4 || '',
      SHCG: data.Hcg || ''
    });




    setLMPs(data.LMPs || [""]);

    setDrainsData3(data.drainsData3 || [
      { DateforDelivery: "", DayDelivery: "", RODelivery: "", LODelivery: "", ETDelivery: "", StimDelivery: "" }
    ]);

    setRows(data.rows || [initialRowData]);
    setSelectedRows(data.selectedRows || []);


    //---------------------------

    // setDrainsData3(Array.isArray(data.drainsData3) ? data.drainsData3 : [
    //   { DateforDelivery: "", DayDelivery: "", RODelivery: "", LODelivery: "", ETDelivery: "", StimDelivery: "" }
    // ]);

    // setRows(Array.isArray(data.rows) ? data.rows : [initialRowData]);

    // setDrainsData3(data.drainsData3 || [
    //   { DateforDelivery: "", DayDelivery: "", RODelivery: "", LODelivery: "", ETDelivery: "", StimDelivery: "" }
    // ]);
    // setRows(data.rows || [initialRowData]);
    // setSelectedRows(data.selectedRows || []);

    // setRows(parseArray(data.rows,['initialRowData']));
    // setRows({
    //   date: parseArray(data.date,['']) || '',
    //   count: parseArray(data.count,['']) || '',
    //   mot: parseArray(data.mot,['']) || '',
    //   norm: parseArray(data.norm,[''])|| '',

    // });


    setIsViewMode(true);
  };


  const handleClear = () => {
    setcardsFormData({
      husbandName: "",
      husbandage: "",
      bloodGroupHusband: "",
      durationRelation: "",
      phoneNumber: "",
      address: "",
      menstrualHistory: "",
      noOfDays: "",
      dysmenorrhea: "",
      MCB: "",
      attemptingPregnancy: "",
      sexualHistory: "",
      durationIC: "",
      visitAboard: "",
      medicalHistory: "",
      obstlHistory: "",
      surgicalHistory: "",
      AddDate: "",
      AddImpression: "",
      USGDate: "",
      USGImpression: "",
    });
    setLMPs([""]);
    setRows([initialRowData]);
    setSelectedRows([]);
    setDrainsData3([
      {
        DateforDelivery: "",
        DayDelivery: "",
        RODelivery: "",
        LODelivery: "",
        ETDelivery: "",
        StimDelivery: "",
      },
    ]);
    setLabelsData(labels.reduce((acc, label) => ({ ...acc, [label]: '' }), {}));
    setIsViewMode(false);

  };


  const handleSubmit = () => {

    const dataToSave = {
      ...cardFormData,
      LMPs,
      rows,
      selectedRows,
      drainsData3,
      labelsData,
      RegistrationId: DoctorWorkbenchNavigation?.pk,
      // PatientId: UsercreatePatientdata?.PatientId?.id,
      // PatientName: `${UsercreatePatientdata?.PatientId?.FirstName || ''} ${UsercreatePatientdata?.PatientId?.MiddleName || ''} ${UsercreatePatientdata?.PatientId?.SurName || ''}`,
      created_by: userRecord?.username || '',
    };
    console.log(dataToSave, 'IFard_instance');

    axios.post(`${UrlLink}Workbench/Workbench_IFCard_Details`, dataToSave)
      .then((res) => {
        const resData = res.data;
        const type = Object.keys(resData)[0];
        const message = Object.values(resData)[0];
        const toastData = {
          message: message,
          type: type,
        };

        dispatch({ type: 'toast', value: toastData });
        setIsGetData(prev => !prev)
        handleClear();
      })
      .catch((err) => {
        console.log(err);
      });

  };


  return (

    <>
      {isPrintButtonVisible ? (
               <div className='new-patient-registration-form'>
          <br />
          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="husbandName">
                Husband's Name<span>:</span>
              </label>
              <input
                type="text"
                id="husbandName"
                name="husbandName"
                pattern="[A-Za-z ]+"
                title="Only letters and spaces are allowed"
                value={cardFormData.husbandName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="age">
                Husband's Age<span>:</span>
              </label>
              <input
                type="number"
                id="husbandage"
                name="husbandage"
                value={cardFormData.husbandage}
                onChange={handleChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="bloodGroupHusband">
                Husband's Blood Group<span>:</span>
              </label>
              <select
                id="bloodGroupHusband"
                name="bloodGroupHusband"
                value={cardFormData.bloodGroupHusband}
                onChange={handleChange}
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
              <label htmlFor="durationRelation">
                Duration of Relationship<span>:</span>
              </label>
              <input
                type="text"
                id="durationRelation"
                name="durationRelation"
                value={cardFormData.durationRelation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="RegisForm_1">
              <label htmlFor="phoneNumber">
                Phone Number<span>:</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                value={cardFormData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="address">
                Address<span>:</span>
              </label>
              <textarea
                id="address"
                name="address"
                style={{ height: '35px', width: '160px' }}
                value={cardFormData.address}
                onChange={handleChange}
                required
              />
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
            Fertility History
          </h4>

          <div className="case_sheet_5con">
            <div className="case_sheet_5con_20">
              <label htmlFor="attemptingPregnancy">
                Duration of attempting Pregnancy <span>:</span>
              </label>
              <textarea
                id="attemptingPregnancy"
                name="attemptingPregnancy"
                value={cardFormData.attemptingPregnancy}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <br />
          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="menstrualHistory">
                Menstrual History<span>:</span>
              </label>
              <textarea
                id="menstrualHistory"
                name="menstrualHistory"
                value={cardFormData.menstrualHistory}
                onChange={handleChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="noOfDays">
                No.of.Days<span>:</span>
              </label>
              <input
                type="text"
                id="noOfDays"
                name="noOfDays"
                value={cardFormData.noOfDays}
                onChange={handleChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label>
                Dysmenorrhea<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="mild">
                    <input
                      type="radio"
                      id="mild"
                      name="dysmenorrhea"
                      value="mild"
                      className="radio_Nurse_ot2_input"
                      checked={cardFormData.dysmenorrhea === "mild"}
                      onChange={handleChange}
                    />
                    Mild
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="severe">
                    <input
                      type="radio"
                      id="severe"
                      name="dysmenorrhea"
                      value="severe"
                      className="radio_Nurse_ot2_input"
                      checked={cardFormData.dysmenorrhea === "severe"}
                      onChange={handleChange}
                    />
                    Severe
                  </label>
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label>
                MCB<span>:</span>
              </label>
              <div className="radio_Nurse_ot2_head">
                <div className="radio_Nurse_ot2">
                  <label htmlFor="MCBYes">
                    <input
                      type="radio"
                      id="MCBYes"
                      name="MCB"
                      value="MCBYes"
                      className="radio_Nurse_ot2_input"
                      checked={cardFormData.MCB === "MCBYes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                </div>
                <div className="radio_Nurse_ot2">
                  <label htmlFor="MCBNo">
                    <input
                      type="radio"
                      id="MCBNo"
                      name="MCB"
                      value="MCBNo"
                      className="radio_Nurse_ot2_input"
                      checked={cardFormData.MCB === "MCBNo"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="RegisFormcon" style={{ justifyContent: "center" }}>
            {Array.isArray(LMPs) && LMPs.map((LMP, index) => ( // Ensure LMPs is an array
              <div key={index} className="RegisForm_1">
                <label htmlFor={`LMP${index}`}>
                  LMP {index + 1}
                  <span>:</span>
                </label>
                <input
                  type="date"
                  id={`LMP${index}`}
                  name={`LMP${index}`}
                  value={LMP}
                  onChange={(e) => handleLMPChange(index, e.target.value)}
                  required
                />
                <RemoveCircleIcon
                  onClick={() => deleteLMPInput(index)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
            <div className="RegisForm_1">
              <AddCircleIcon onClick={addLMPInput} style={{ cursor: "pointer" }} />
            </div>
          </div>
          <br />
          <br />
          <div className="RegisFormcon">
            <div className="RegisForm_1">
              <label htmlFor="sexualHistory">
                Contraceptive / Sexual History<span>:</span>
              </label>
              <textarea
                id="sexualHistory"
                name="sexualHistory"
                value={cardFormData.sexualHistory}
                onChange={handleChange}
                required
              />
            </div>
            <div className="RegisForm_1">
              <label htmlFor="durationIC">
                Duration of IC<span>:</span>
              </label>
              <input
                type="text"
                id="durationIC"
                name="durationIC"
                value={cardFormData.durationIC}
                onChange={handleChange}
                required
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="visitAboard">
                Husband Visits of Abroad<span>:</span>
              </label>
              <input
                type="text"
                id="visitAboard"
                name="visitAboard"
                value={cardFormData.visitAboard}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <br />

          <div className="case_sheet_5con">
            <div className="case_sheet_5con_20">
              <label htmlFor="medicalHistory">
                Medical History <span>:</span>
              </label>
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                value={cardFormData.medicalHistory}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="case_sheet_5con_20">
              <label htmlFor="obstlHistory">
                Obst History <span>:</span>
              </label>
              <textarea
                id="obstlHistory"
                name="obstlHistory"
                value={cardFormData.obstlHistory}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="case_sheet_5con_20">
              <label htmlFor="surgicalHistory">
                Surgical History <span>:</span>
              </label>
              <textarea
                id="surgicalHistory"
                name="surgicalHistory"
                value={cardFormData.surgicalHistory}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <br />

          <div className="RegisFormcon" style={{ justifyContent: "center" }}>
            <div className="u78i7">
              <h4
                style={{
                  color: "var(--labelcolor)",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  textAlign: "start",
                  padding: "10px",
                  width: "120px",
                }}
              >
                HSG <span>-</span>
              </h4>
              <div className="RegisForm_1_Opthal ecdeeed">
                <div className="ejdc7x sdiidc">
                  <div className="fvgg">
                    <label htmlFor="AddDate">
                      Date <span>:</span>
                    </label>
                  </div>
                  <input
                    type="date"
                    id="AddDate"
                    name="AddDate"
                    value={cardFormData.AddDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ejdc7x">
                  <label htmlFor="AddImpression">
                    Impression <span>:</span>
                  </label>
                  <textarea
                    type="text"
                    id="AddImpression"
                    name="AddImpression"
                    style={{ height: '60px', width: '160px' }}
                    value={cardFormData.AddImpression}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="u78i7">
              <h4
                style={{
                  color: "var(--labelcolor)",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  textAlign: "start",
                  padding: "10px",
                  width: "120px",
                }}
              >
                USG <span>-</span>
              </h4>
              <div className="RegisForm_1_Opthal ecdeeed">
                <div className="ejdc7x sdiidc">
                  <div className="fvgg">
                    <label htmlFor="USGDate">
                      Date <span>:</span>
                    </label>
                  </div>
                  <input
                    type="date"
                    id="USGDate"
                    name="USGDate"
                    value={cardFormData.USGDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ejdc7x">
                  <label htmlFor="USGImpression">
                    Impression <span>:</span>
                  </label>
                  <textarea
                    type="text"
                    id="USGImpression"
                    name="USGImpression"
                    style={{ height: '60px', width: '160px' }}
                    value={cardFormData.USGImpression}
                    onChange={handleChange}
                    required
                  />
                </div>
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
            Investigation
          </h4>
          <br />
          <div className="RegisFormcon">
            <div className="RegisForm_1_Opthal ecdeeedrdfdf">
              {Object.keys(labelsData).map((label, index) => (
                <div key={index} className="ejdc7x">
                  <div>
                    <label htmlFor={label}>
                      {label} <span>:</span>
                    </label>
                  </div>
                  <div className="mlpocvfd">
                    <div className="idoop9">
                      <input
                        type="text"
                        id={label}
                        name={label}
                        value={labelsData[label]}
                        onChange={(event) => handleLabelChange(label, event)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
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
            Semen Analysis
          </h4>

          <div className="Selected-table-container">
            <table className="selected-medicine-table2 fverfercer45">
              <thead>
                <tr>
                  <th>Date</th>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {rows.map((row, index) => (
                        <div
                          key={index}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="date"
                            className="ewdnlpi944"
                            value={row.date}
                            onChange={(e) =>
                              handleChangeDateAded(index, "date", e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>

                <tr>
                  <th>Count</th>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {rows.map((row, index) => (
                        <div
                          key={index}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="text"
                            className="ewdnlpi944"
                            value={row.count}
                            onChange={(e) =>
                              handleChangeDateAded(index, "count", e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>

                <tr>
                  <th>Mot</th>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {rows.map((row, index) => (
                        <div
                          key={index}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="text"
                            className="ewdnlpi944"
                            value={row.mot}
                            onChange={(e) =>
                              handleChangeDateAded(index, "mot", e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Norm</th>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {rows.map((row, index) => (
                        <div
                          key={index}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="text"
                            className="ewdnlpi944"
                            value={row.norm}
                            onChange={(e) =>
                              handleChangeDateAded(index, "norm", e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              margin: "10px",
            }}
          >
            <button className="cell_btn12" onClick={addRow4}>
              <AddIcon />
            </button>
            {rows.length > 1 && (
              <button
                className="cell_btn12"
                onClick={() => deleteRow4(rows.length - 1)}
              >
                <RemoveIcon />
              </button>
            )}
          </div>

          <div className="Selected-table-container">
            <table className="selected-medicine-table2">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>RO</th>
                  <th>LO</th>
                  <th>ET</th>
                  <th>Stim(+Dose)</th>

                  <th>
                    <button className="cell_btn12" onClick={addRow3}>
                      <AddIcon />
                    </button>
                  </th>
                  <th>Select to Print</th>
                </tr>
              </thead>
              <tbody>
                {drainsData3.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="date"
                        className="wedscr54_secd_8643r uujhghbg"
                        value={item.DateforDelivery}
                        onChange={(e) =>
                          handleChangeObstetric3(e, index, "DateforDelivery")
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        className="wedscr54_secd_8643r uujhghbg"
                        value={item.DayDelivery}
                        onChange={(e) =>
                          handleChangeObstetric3(e, index, "DayDelivery")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="wedscr54_secd_8643r uujhghbg"
                        value={item.RODelivery}
                        onChange={(e) =>
                          handleChangeObstetric3(e, index, "RODelivery")
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="wedscr54_secd_8643r uujhghbg"
                        value={item.LODelivery}
                        onChange={(e) =>
                          handleChangeObstetric3(e, index, "LODelivery")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="wedscr54_secd_8643r uujhghbg"
                        value={item.ETDelivery}
                        onChange={(e) =>
                          handleChangeObstetric3(e, index, "ETDelivery")
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="wedscr54_secd_8643r uujhghbg"
                        value={item.StimDelivery}
                        onChange={(e) =>
                          handleChangeObstetric3(e, index, "StimDelivery")
                        }
                      ></input>
                    </td>

                    <td>
                      <button
                        className="cell_btn12"
                        onClick={() => deleteRow3(index)}
                      >
                        <RemoveIcon />
                      </button>
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        className="cell_btn123"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleCheckboxChangePrint(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isPrintButtonVisible && (
            <div className="Main_container_Btn">
              <button className="RegisterForm_1_btns" onClick={Submitalldata}>
                Print
              </button>
            </div>
          )}
        </div>


      ) : (




        <PrintContent ref={componentRef} className="landscape-print">
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
                  <div className="RegisForm_1">
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

              <div className="Selected-table-container">
                <table className="selected-medicine-table2">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Day</th>
                      <th>RO</th>
                      <th>LO</th>
                      <th>ET</th>
                      <th>Stim(+Dose)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drainsData3
                      .filter((_, index) => selectedRows.includes(index))
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{item.DateforDelivery}</td>
                          <td>{item.DayDelivery}</td>
                          <td>{item.RODelivery}</td>
                          <td>{item.LODelivery}</td>
                          <td>{item.ETDelivery}</td>
                          <td>{item.StimDelivery}</td>

                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </PrintContent>
      )}



      <div className="Main_container_Btn">
        {IsViewMode && (
          <button onClick={handleClear}>Clear</button>
        )}
        {!IsViewMode && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
      {GetData.length > 0 &&
        <ReactGrid columns={IFCardColumns} RowData={GetData} />
      }


      <ToastAlert Message={toast.message} Type={toast.type} />


    </>
  );
}

export default IFCard;

