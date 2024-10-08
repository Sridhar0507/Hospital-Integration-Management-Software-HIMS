import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import '../DoctorWorkBench/Prescription.css';
import '../OtMangement/OtManagement.css';
// import 
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import bgImg2 from "../Assets/bgImg2.jpg";
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="print-content">
      {props.children}
    </div>
  );

  
});

function AncCard() {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const toast = useSelector((state) => state.userRecord?.toast);
  const dispatch = useDispatch();
  // const UsercreatePatientdata = useSelector(state => state.userRecord?.UsercreatePatientdata);

  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);

  // const dispatchvalue = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);

  const [cardFormData, setcardsFormData] = useState({
    husbandName: "",
    husSurName: "",
    husFirstName: "",
    husMiddleName: "",
    age: "",
    religion: "",
    occupation: "",
    phoneNumber: "",
    address: "",
    menstrualLMP: "",
    menstrualEDD: "",
    correctedbyUSG: "",

    surgicalHistory: "",
    allergies: "",

    bloodGroupHusband: "",

    BSLText: "",
    HIVText: "",
    UreaText: "",
    BTCTText: "",
    OGCTText: "",
    VDRLText: "",
    AuAgText: "",
    CreatrineText: "",
    WBCText: "",
    anyotherinvesText: "",

    CVSText: "",
    RSText: "",
    BreastText: "",

    TT1Text: "",
    TT2Text: "",
    TT3Text: "",
    BetnesolText: "",
    FolicAcidText: "",
    CalciumText: "",
    FTNDLSCSText: "",
    FTNDTLText: "",
    PostDeliveryText: "",

    ObstHistory:"",
    DeliveryResult:"",

    AncCardNo:"",
    MctsNo:"",
    DeliveryDate:"",
  });

console.log(cardFormData,'cardFormData');

  const [HighRiskFactors, setHighRiskFactors] = useState({
    CaesareanSection: false,
    BadObstetricHistory: false,
    Infertility: false,
    DownsSyndrome: false,
    CongenitalAnomalies: false,
    ForcepVaccumDelivery: false,
    BloodTrans: false,
    Tobacco: false,
    Alcohol: false,
    RadiationExposure: false,
    RoNegative: false,
    AnyOther: false,
  })


  console.log(HighRiskFactors,'HighRiskFactors');

  const [FamilyHistory, setFamilyHistory] = useState({
   
    Diabetes: false,
    Hypertension: false,
    HeartDisease: false,
    Twins: false,
    CongenitalAnomaliesFamily: false,
    Asthma: false,
    Tuberculosis: false,
    AnyOtherFamilyHistory: false,

  })
  console.log(FamilyHistory,'FamilyHistory');



  const [checkboxState, setCheckboxState] = useState({
    
    BSL: false,
    HIV: false,
    Urea: false,
    BTCT: false,
    OGCT: false,
    VDRL: false,
    AuAg: false,
    Creatrine: false,
    WBC: false,
    anyotherinves: false,
    
  });

  console.log(checkboxState,'checkboxState');


  const [RadioBtn, setRadioBtn] = useState({
    TT1: "No",
    TT2: "No",
    TT3: "No",
    Betnesol: "No",
    FolicAcid: "No",
    Calcium: "No",
    FTNDLSCS: "No",
    FTNDTL: "No",
    PostDelivery: "No",
  });

  console.log(RadioBtn,'RadioBtn');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcardsFormData({
      ...cardFormData,
      [name]: value,
    });
  };

  const handleRadioBtnChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setRadioBtn((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      // Clear the associated text input value if "No" is selected
      if (value === "No") {
        setcardsFormData((prevState) => ({
          ...prevState,
          [`${name}Text`]: "",
        }));
      }
    }
  };
  const handleHighRiskFactorsChange = (e) => {
    const { id } = e.target;
    const checked = e.target.checked;

    setHighRiskFactors((prevState) => {
      // Update the state of the clicked checkbox
      const updatedState = {
        ...prevState,
        [id]: checked,
      };

      // If "AnyOther" is checked, set all other checkboxes to false
      if (id === 'AnyOther' && checked) {
        Object.keys(updatedState).forEach((key) => {
          if (key !== 'AnyOther') {
            updatedState[key] = false;
          }
        });
      } else if (id !== 'AnyOther' && checked) {
        // If any other checkbox is checked, set "AnyOther" to false
        updatedState['AnyOther'] = false;
      }

      return updatedState;
    });
  };

  const handleFamilyHistoryChange = (e) => {
    const { id } = e.target;
    const checked = e.target.checked;

    setFamilyHistory((prevState) => {
      // Update the state of the clicked checkbox
      const updatedState = {
        ...prevState,
        [id]: checked,
      };

      // If "AnyOtherFamilyHistory" is checked, set all other checkboxes to false
      if (id === 'AnyOtherFamilyHistory' && checked) {
        Object.keys(updatedState).forEach((key) => {
          if (key !== 'AnyOtherFamilyHistory') {
            updatedState[key] = false;
          }
        });
      } else if (id !== 'AnyOtherFamilyHistory' && checked) {
        // If any other checkbox is checked, set "AnyOtherFamilyHistory" to false
        updatedState['AnyOtherFamilyHistory'] = false;
      }

      return updatedState;
    });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;

    setCheckboxState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));

    // Clear the associated text input value if the checkbox is unchecked
    if (!checked) {
      setcardsFormData((prevState) => ({
        ...prevState,
        [`${id}Text`]: "",
      }));
    }
  };
  const handleTextInputChange = (e) => {
    const { id, value } = e.target;
    setcardsFormData({
      ...cardFormData,
      [id]: value,
    });
  };

  const [drainsData, setDrainsData] = useState([
    { SNO: "", ageSex: "", type: "", immunized: "", problems: "" },
  ]);

  console.log(drainsData,'drainData1');

  const addRow = () => {
    const newSNO = drainsData.length + 1;
    setDrainsData([
      ...drainsData,
      { SNO: newSNO, ageSex: "", type: "", immunized: "", problems: "" },
    ]);
  };

  const deleteRow = (index) => {
    const updatedDrainsData = [...drainsData];
    updatedDrainsData.splice(index, 1);

    updatedDrainsData.forEach((item, idx) => {
      item.SNO = idx + 1;
    });
    setDrainsData(updatedDrainsData);
  };

  const handleChangeObstetric = (e, index, key) => {
    const updatedDrainsData = [...drainsData];
    updatedDrainsData[index][key] = e.target.value;
    setDrainsData(updatedDrainsData);
  };

  const [drainsData2, setDrainsData2] = useState([
    { dateInv: "", Hb: "", Urine: "" },
  ]);

  console.log(drainsData2,'drainsData2');

  const addRow2 = () => {
    setDrainsData2([...drainsData2, { dateInv: "", Hb: "", Urine: "" }]);
  };

  const deleteRow2 = (index) => {
    const updatedDrainsData2 = [...drainsData2];
    updatedDrainsData2.splice(index, 1);

    setDrainsData2(updatedDrainsData2);
  };

  const handleChangeObstetric2 = (e, index, key) => {
    const updatedDrainsData2 = [...drainsData2];
    updatedDrainsData2[index][key] = e.target.value;
    setDrainsData2(updatedDrainsData2);
  };

  const [drainsData3, setDrainsData3] = useState([
    {
      dateforDelivery: "",
      weightDelivery: "",
      BPDelivery: "",
      ComplaintsDelivery: "",
      AmenorrheaDelivery: "",
      PallorDelivery: "",
      PresentationDelivery: "",
      PVAnyOtherDelivery: "",
      AdviceDelivery: "",
    },
  ]);
  console.log(drainsData3,'drainsData3');


  const addRow3 = () => {
    setDrainsData3([
      ...drainsData3,
      {
        dateforDelivery: "",
        weightDelivery: "",
        BPDelivery: "",
        ComplaintsDelivery: "",
        AmenorrheaDelivery: "",
        PallorDelivery: "",
        PresentationDelivery: "",
        PVAnyOtherDelivery: "",
        AdviceDelivery: "",
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

  const initialRowData = {
    date: "",
    amenorrhea: "",
    presentation: "",
    bpdGs: "",
    hc: "",
    ac: "",
    flCrl: "",
    gestationalAge: "",
    liquor: "",
    placenta: "",
    anomalies: "",
    foetalWeight: "",
    cervicalLength: "",
    remark: "",
  };

  const [rows, setRows] = useState([
    initialRowData,
   
  ]);
  console.log(rows,'rows');

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

  // useEffect(() => {
  //   const location = userRecord?.location;

  //   axios
  //     .get("your_api_endpoint")
  //     .then((response) => {
  //       console.log(response.data);
  //       if (response.data) {
  //         const data = response.data;
  //         setClinicName(data.Clinic_Name);
  //         setClinicLogo(`data:image/png;base64,${data.Clinic_Logo}`);
  //         setlocation(data.location);
  //       } else {
  //         // Handle error if needed
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching data: ", error));
  // }, [userRecord]);
  // //

  // const [workbenchformData, setFormData] = useState({
  //   SerialNo: "",
  //   PatientID: "",
  //   AppointmentID: "",
  //   visitNo: "",
  //   firstName: "",
  //   lastName: "",
  //   AppointmentDate: "",
  //   Complaint: "",
  //   PatientPhoto: "",
  //   DoctorName: "",
  //   Age: "",
  //   Gender: "",
  //   Location: "",
  // });

  // console.log(workbenchformData);
  // dispatch({
  //   type: "workbenchformData",
  //   value: workbenchformData,
  // });


  
  const ANC_CARD_Columns = [
    { key: 'id', name: 'S.No', frozen: true },
    { key: 'created_by', name: 'Created By', frozen: true },
    { key: 'Date', name: 'Date', frozen: true },
    { key: 'Time', name: 'Time', frozen: true },
    // { key: 'husbandName', name: 'Husband Name' },
    // { key: 'husSurName', name: 'hus SurName' },
    // { key: 'husFirstName', name: 'hus FirstName' },
    // { key: 'husMiddleName', name: 'hus MiddleName' },
    // { key: 'age', name: 'age' },
    // { key: 'religion', name: 'religion' },
    // { key: 'occupation', name: 'occupation' },
    // { key: 'phoneNumber', name: 'phoneNumber' },
    // { key: 'address', name: 'address' },
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
    axios.get(`${UrlLink}Workbench/Workbench_ANC_Card_Details`,{params:{RegistrationId:DoctorWorkbenchNavigation?.pk}})
        .then((res) => {
            const ress = res.data
            setGetData(ress)
            console.log(res.data,'res.data');
            console.log(drainsData, 'Drains Data');
            console.log(drainsData2, 'Drains Data 2');
        })
        .catch((err) => {
            console.log(err);
        })
}, [IsGetData,UrlLink ])


const handleView = (data) => {
  console.log(data, 'dataaaaaaaa');

  

  setcardsFormData({
    husbandName: data.husbandName || '',
    menstrualLMP: data.menstrualLMP || '',
    menstrualEDD: data.menstrualEDD || '',
    correctedbyUSG: data.correctedbyUSG || '',
    
    surgicalHistory: data.surgicalHistory || '',
    allergies: data.allergies || '',
    bloodGroupHusband: data.bloodGroupHusband || '',

    BSLText: data.BslText || '',
    HIVText: data.HivText || '',
    UreaText: data.UreaText || '',
    BTCTText: data.BtctText || '',
    OGCTText: data.OgctText || '',
    VDRLText: data.VdrlText || '',
    AuAgText: data.AuAgText || '',
    CreatrineText: data.CreatrineText || '',
    WBCText: data.WbcText || '',
    anyotherinvesText: data.anyotherinvesText || '',

    
    CVSText: data.CvsText || '',
    RSText: data.RsText || '',
    BreastText: data.BreastText || '',

    TT1Text: data.Tt1Text || '',
    TT2Text: data.Tt2Text || '',
    TT3Text: data.Tt3Text || '',
    BetnesolText: data.BetnesolText || '',
    FolicAcidText: data.FolicAcidText || '',
    CalciumText: data.CalciumText || '',
    FTNDLSCSText: data.FtndLscsText || '',
    FTNDTLText: data.FtndTlText || '',
    PostDeliveryText: data.PostDeliveryText || '',
   
    ObstHistory: data.ObstHistory || '',
    DeliveryResult: data.DeliveryResult || '',

    AncCardNo: data.AncCardNo || '',
    MctsNo: data.MctsNo || '',
    DeliveryDate: data.DeliveryDate || '',
    
  });

  const HighRiskFactorsMap = data.HighRiskFactors?.split(",").reduce(
    (acc, key) => {
      acc[key] = true;
      return acc;
    },
    {}
  );

  setHighRiskFactors({
    CaesareanSection:HighRiskFactorsMap?.CaesareanSection ,
    BadObstetricHistory:HighRiskFactorsMap?.BadObstetricHistory || false,
    Infertility:HighRiskFactorsMap?.Infertility || false,
    DownsSyndrome:HighRiskFactorsMap?.DownsSyndrome || false,
    CongenitalAnomalies:HighRiskFactorsMap?.CongenitalAnomalies || false,
    ForcepVaccumDelivery:HighRiskFactorsMap?.ForcepVaccumDelivery || false,
    BloodTrans:HighRiskFactorsMap?.BloodTrans || false,
    Tobacco:HighRiskFactorsMap?.Tobacco || false,
    Alcohol:HighRiskFactorsMap?.Alcohol || false,
    RadiationExposure:HighRiskFactorsMap?.RadiationExposure || false,
    RoNegative:HighRiskFactorsMap?.RoNegative || false,
    AnyOther:HighRiskFactorsMap?.AnyOther || false,
  })
  
  const FamilyHistoryMap = data.FamilyHistory?.split(",").reduce(
    (acc, key) => {
      acc[key] = true;
      return acc;
    },
    {}
  );
  setFamilyHistory({
    Diabetes:FamilyHistoryMap?.Diabetes || false,
    Hypertension:FamilyHistoryMap?.Hypertension || false,
    HeartDisease:FamilyHistoryMap?.HeartDisease || false,
    Twins:FamilyHistoryMap?.Twins || false,
    CongenitalAnomaliesFamily:FamilyHistoryMap?.CongenitalAnomaliesFamily || false,
    Asthma:FamilyHistoryMap?.Asthma || false,
    Tuberculosis:FamilyHistoryMap?.Tuberculosis || false,
    AnyOtherFamilyHistory:FamilyHistoryMap?.AnyOtherFamilyHistory || false,

  })

  const ancTable1Array = data.AncTable1Data.map(item => ({
    ageSex: item.AgeSex,
    type: item.Type,
    immunized: item.Immunized,
    problems: item.Problems,
  }));
  setDrainsData(ancTable1Array); 

 

  const ancTable2Array = data.AncTable2Data.map(item => ({
    dateInv:item.Date1,
    Hb:item.Hb,
    Urine:item.Urine,
  }))
  setDrainsData2(ancTable2Array)
 

  const ancTable3Array = data.AncTable3Data.map(item => ({
    dateforDelivery:item.DateforDelivery,
    weightDelivery:item.WeightDelivery,
    BPDelivery:item.BPDelivery,
    ComplaintsDelivery:item.ComplaintsDelivery,
    AmenorrheaDelivery:item.AmenorrheaDelivery,
    PallorDelivery:item.PallorDelivery,
    PresentationDelivery:item.PresentationDelivery,
    PVAnyOtherDelivery:item.PVAnyOtherDelivery,
    AdviceDelivery:item.AdviceDelivery,
  }))
  setDrainsData3(ancTable3Array)



  // setDrainsData(data?.AncTable1Data || [{
  //   ageSex: drainsData?.AncTable1Data.AgeSex,
  //   type: drainsData?.AncTable1Data.type,
  //   immunized: drainsData?.AncTable1Data.Immunized,
  //   problems: drainsData?.AncTable1Data.Problems,
  // }]);
  // setDrainsData2(data?.AncTable2Data || []);
  // setDrainsData3(data?.AncTable3Data || []);

  // console.log(data.AncTable1Data,'1111111111'); // check if the data is correctly passed

  
  setRadioBtn(data.RadioBtn || {
    TT1: data.Tt1 ,
    TT2:  data.Tt2 ,
    TT3:  data.Tt3 ,
    Betnesol:  data.Betnesol ,
    FolicAcid:  data.FolicAcid ,
    Calcium:  data.Calcium ,
    FTNDLSCS:  data.FtndLscs ,
    FTNDTL:  data.FtndTl ,
    PostDelivery:  data.PostDelivery ,
  })
  // setRadioBtn(data.RadioBtn || {})
  setCheckboxState({
    BSL:data.Bsl,
    HIV:data.Hiv,
    Urea:data.Urea,
    BTCT:data.Btct,
    OGCT:data.Ogct,
    VDRL:data.Vdrl,
    AuAg:data.AuAg,
    Creatrine:data.Creatrine,
    WBC:data.Wbc,
    anyotherinves:data.anyotherinves,
  })


  const ancTable4Array = data.AncTable4Data.map(item => ({
    date:item.Date2,
    amenorrhea:item.Amenorrhea,
    presentation:item.Presentation,
    bpdGs:item.BpdGs,
    hc:item.HC,
    ac:item.AC,
    flCrl:item.FlCrl,
    gestationalAge:item.GestationalAge,
    liquor:item.Liquor,
    placenta:item.Placenta,
    anomalies:item.Anomalies,
    foetalWeight:item.FoetalWeight,
    cervicalLength:item.CervicalLength,
    remark:item.Remark,
  }))
  setRows(ancTable4Array)

  // setRows(data?.AncTable4Data || []);

  setSelectedRows(data.selectedRows || []);

  

  setIsViewMode(true);
};

const handleClear = () => {
  setcardsFormData({
    husbandName: "",
    // husSurName: "",
    // husFirstName: "",
    // husMiddleName: "",
    // age: "",
    // religion: "",
    // occupation: "",
    // phoneNumber: "",
    // address: "",
    menstrualLMP: "",
    menstrualEDD: "",
    correctedbyUSG: "",
    surgicalHistory: "",
    allergies: "",
    bloodGroupHusband: "",
    BSLText: "",
    HIVText: "",
    UreaText: "",
    BTCTText: "",
    OGCTText: "",
    VDRLText: "",
    AuAgText: "",
    CreatrineText: "",
    WBCText: "",
    anyotherinvesText: "",
    CVSText: "",
    RSText: "",
    BreastText: "",
    TT1Text: "",
    TT2Text: "",
    TT3Text: "",
    BetnesolText: "",
    FolicAcidText: "",
    CalciumText: "",
    FTNDLSCSText: "",
    FTNDTLText: "",
    PostDeliveryText: "",
    ObstHistory: "",
    DeliveryResult: "",

    AncCardNo: "",
    MctsNo: "",
    DeliveryDate: "",
  });

  setHighRiskFactors({});
  
  setFamilyHistory({});
  
  setDrainsData([
    { SNO: "", ageSex: "", type: "", immunized: "", problems: "" }
  ]);

  setDrainsData2([
    { dateInv: "", Hb: "", Urine: "" }
  ]);

  setDrainsData3([
    {
      dateforDelivery: "",
      weightDelivery: "",
      BPDelivery: "",
      ComplaintsDelivery: "",
      AmenorrheaDelivery: "",
      PallorDelivery: "",
      PresentationDelivery: "",
      PVAnyOtherDelivery: "",
      AdviceDelivery: "",
    }
  ]);

  setRadioBtn({});
  setCheckboxState({});
  setRows([initialRowData]);
  setSelectedRows([]);
 
  setIsViewMode(false);
};


  const handleSubmit = () => {
    const dataToSave = {
      ...cardFormData,
      drainsData, //[{}]
      // HighRiskFactors,//{}
      HighRiskFactorsCheckbox: Object.keys(HighRiskFactors)
        .filter((key) => HighRiskFactors[key])
        .join(","),

      // FamilyHistory,//{}
      FamilyHistoryCheckbox: Object.keys(FamilyHistory)
        .filter((key) => FamilyHistory[key])
        .join(","),
      drainsData2,//[{}]
      ...RadioBtn,//{}
      ...checkboxState,//{}
      drainsData3,//[{}]
      rows,//[{}]
      selectedRows,
      RegistrationId:DoctorWorkbenchNavigation?.pk,

      // PatientId: UsercreatePatientdata?.PatientId?.id,
      // PatientName: `${UsercreatePatientdata?.PatientId?.FirstName || ''} ${UsercreatePatientdata?.PatientId?.MiddleName || ''} ${UsercreatePatientdata?.PatientId?.SurName || ''}`,
      created_by: userRecord?.username || '',
      // clinicName,
      // clinicLogo,
      // location,
    };
    console.log(dataToSave,'ANCard_instance');

  
    axios.post(`${UrlLink}Workbench/Workbench_ANC_Card_Details`,dataToSave)
    .then((res)=>{
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
      .catch((err)=>{
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
                    <label htmlFor="AncCardNo">
                    ANC Card No<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="AncCardNo"
                      name="AncCardNo"
                      value={cardFormData.AncCardNo}
                      onChange={handleChange}
                      required
                      readOnly={IsViewMode}

                    />
                  </div>
                  <div className="RegisForm_1">
                    <label htmlFor="MctsNo">
                    MCTS No<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="MctsNo"
                      name="MctsNo"
                      value={cardFormData.MctsNo}
                      onChange={handleChange}
                      required
                      readOnly={IsViewMode}

                    />
                  </div>

                </div>
                <br/>
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
                      readOnly={IsViewMode}
                      required
                    />
                  </div>
                  {/* <div className="RegisForm_1">
                    <label htmlFor="husSurName">
                      Surname<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="husSurName"
                      name="husSurName"
                      pattern="[A-Za-z ]+"
                      title="Only letters and spaces are allowed"
                      value={cardFormData.husSurName}
                      onChange={handleChange}
                      required
                    />
                  </div> */}
                  {/* <div className="RegisForm_1">
                    <label htmlFor="husFirstName">
                      First Name<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="husFirstName"
                      name="husFirstName"
                      pattern="[A-Za-z ]+"
                      title="Only letters and spaces are allowed"
                      value={cardFormData.husFirstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="RegisForm_1">
                    <label htmlFor="husMiddleName">
                      Middle Name<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="husMiddleName"
                      name="husMiddleName"
                      value={cardFormData.husMiddleName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="RegisForm_1">
                    <label htmlFor="age">
                      Age<span>:</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={cardFormData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="RegisForm_1">
                    <label htmlFor="religion">
                      Religion<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="religion"
                      name="religion"
                      pattern="[A-Za-z ]+"
                      title="Only letters and spaces are allowed"
                      value={cardFormData.religion}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="RegisForm_1">
                    <label htmlFor="occupation">
                      Occupation<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      pattern="[A-Za-z ]+"
                      title="Only letters and spaces are allowed"
                      value={cardFormData.occupation}
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
                    <label htmlFor="phoneNumber">
                      Address<span>:</span>
                    </label>
                    <textarea
                      type="tel"
                      id="address"
                      name="address"
                      value={cardFormData.address}
                      onChange={handleChange}
                      required
                    />
                  </div> */}

                  <div className="RegisForm_1">
                    <label htmlFor="menstrualLMP">
                      Menstrual History L.M.P<span>:</span>
                    </label>
                    <input
                      type="date"
                      id="menstrualLMP"
                      name="menstrualLMP"
                      value={cardFormData.menstrualLMP}
                      onChange={handleChange}
                      required
                      readOnly={IsViewMode}

                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="menstrualEDD">
                      Menstrual History E.D.D<span>:</span>
                    </label>
                    <input
                      type="date"
                      id="menstrualEDD"
                      name="menstrualEDD"
                      value={cardFormData.menstrualEDD}
                      onChange={handleChange}
                      required
                      readOnly={IsViewMode}

                    />
                  </div>

                  <div className="RegisForm_1">
                    <label htmlFor="correctedbyUSG">
                      E.D.D Corrected by USG<span>:</span>
                    </label>
                    <input
                      type="date"
                      id="correctedbyUSG"
                      name="correctedbyUSG"
                      value={cardFormData.correctedbyUSG}
                      onChange={handleChange}
                      required
                      readOnly={IsViewMode}

                    />
                  </div>
                </div>


                <br />

                <div className="RegisFormcon">
                <div className="RegisForm_1">
                    <label htmlFor="ObstHistory">
                      OBST HISTORY<span>:</span>
                    </label>
                    <input
                      type="text"
                      id="ObstHistory"
                      name="ObstHistory"
                      value={cardFormData.ObstHistory}
                      onChange={handleChange}
                      required
                      readOnly={IsViewMode}

                    />
                  </div>
                  </div>

                  <div className="Selected-table-container">
                  <table className="selected-medicine-table2">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Sex & Age of Child</th>
                        <th>Type of Delivery / Abortion if any</th>
                        <th>Immunized Yes / No</th>
                        <th>Anomalies / Problems, if any</th>
                        <th>
                          <button className="cell_btn12" onClick={addRow} disabled = {IsViewMode}>
                            <AddIcon />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {drainsData.map((item, index) => (
                        <tr key={index}>
                          <td>{index+1}.</td>
                          <td>
                            <input
                              type="text"
                              className="wedscr54_secd_8643r sdef11"
                              value={item.ageSex}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric(e, index, "ageSex")
                              }
                            />
                          </td>
                          <td>
                            <textarea
                              className="edjuwydrt56 ee33223"
                              value={item.type}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric(e, index, "type")
                              }
                            />
                          </td>
                          <td>
                            <select
                              value={item.immunized}
                              readOnly={IsViewMode}
                              disabled = {IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric(e, index, "immunized")
                              }
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>

                          <td>
                            <textarea
                              type="text"
                              className="edjuwydrt56 ee33223"
                              value={item.problems}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric(e, index, "problems")
                              }
                            ></textarea>
                          </td>
                          <td>
                            <button
                              className="cell_btn12"
                              onClick={() => deleteRow(index)}
                              disabled = {IsViewMode}
                            >
                              <RemoveIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <br />
                <div className="OtMangement_con">
                  <div className="OtMangementForm_1 ececeee">
                    <label>
                      HIGH RISK FACTORS<span>:</span>
                    </label>
                    <div className="OtMangementForm_1_checkbox weewdexewdd">
                      <label htmlFor="CaesareanSection">
                        <input
                          id="CaesareanSection"
                          value="CaesareanSection"
                          type="checkbox"
                          readOnly={IsViewMode}
                          disabled = {IsViewMode}
                          checked={HighRiskFactors.CaesareanSection}
                          onChange={handleHighRiskFactorsChange}
                        />
                        <span>Caesarean Section</span>
                      </label>
                      <label htmlFor="BadObstetricHistory">
                        <input
                          id="BadObstetricHistory"
                          value="BadObstetricHistory"
                          type="checkbox"
                          readOnly={IsViewMode}
                          disabled = {IsViewMode}
                          checked={HighRiskFactors.BadObstetricHistory}
                          onChange={handleHighRiskFactorsChange}
                        />
                        <span>Bad Obstetric History</span>
                      </label>
                      <label htmlFor="Infertility">
                        <input
                          id="Infertility"
                          value="Infertility"
                          type="checkbox"
                          readOnly={IsViewMode}
                          disabled = {IsViewMode}
                          checked={HighRiskFactors.Infertility}
                          onChange={handleHighRiskFactorsChange}
                        />
                        <span>Infertility</span>
                      </label>
                      <label htmlFor="DownsSyndrome">
                        <input
                          id="DownsSyndrome"
                          value="DownsSyndrome"
                          type="checkbox"
                          readOnly={IsViewMode}
                          disabled = {IsViewMode}
                          checked={HighRiskFactors.DownsSyndrome}
                          onChange={handleHighRiskFactorsChange}
                        />
                        <span>Downs Syndrome</span>
                      </label>
                      <label htmlFor="CongenitalAnomalies">
                        <input
                          id="CongenitalAnomalies"
                          value="CongenitalAnomalies"
                          type="checkbox"
                          readOnly={IsViewMode}
                          disabled = {IsViewMode}
                          checked={HighRiskFactors.CongenitalAnomalies}
                          onChange={handleHighRiskFactorsChange}
                        />
                        <span>Congenital Anomalies</span>
                      </label>

                      <label htmlFor="ForcepVaccumDelivery">
                        <input
                          id="ForcepVaccumDelivery"
                          value="ForcepVaccumDelivery"
                          type="checkbox"
                          checked={HighRiskFactors.ForcepVaccumDelivery}
                          onChange={handleHighRiskFactorsChange}
                          readOnly={IsViewMode}
                          disabled = {IsViewMode}

                        />
                        <span>Forcep / Vaccum Delivery</span>
                      </label>

                      {/* <div
                  className="OtMangementForm_1_checkbox weewdexewdd"
                  style={{ flexDirection: "column" }}
                > */}
                      <label htmlFor="BloodTrans">
                        <input
                          id="BloodTrans"
                          value="BloodTrans"
                          type="checkbox"
                          checked={HighRiskFactors.BloodTrans}
                          onChange={handleHighRiskFactorsChange}
                          readOnly={IsViewMode}
                          disabled = {IsViewMode}
                        />
                        <span>Blood Trans</span>
                      </label>
                      <label htmlFor="Tobacco">
                        <input
                          id="Tobacco"
                          value="Tobacco"
                          type="checkbox"
                          checked={HighRiskFactors.Tobacco}
                          onChange={handleHighRiskFactorsChange}
                          readOnly={IsViewMode}
                          disabled = {IsViewMode}
                        />
                        <span>Tobacco</span>
                      </label>
                      <label htmlFor="Alcohol">
                        <input
                          id="Alcohol"
                          value="Alcohol"
                          type="checkbox"
                          checked={HighRiskFactors.Alcohol}
                          onChange={handleHighRiskFactorsChange}
                          readOnly={IsViewMode}
                          disabled = {IsViewMode}

                        />
                        <span>Alcohol</span>
                      </label>
                      <label htmlFor="RadiationExposure">
                        <input
                          id="RadiationExposure"
                          value="RadiationExposure"
                          type="checkbox"
                          readOnly={IsViewMode}
                          checked={HighRiskFactors.RadiationExposure}
                          onChange={handleHighRiskFactorsChange}
                          disabled = {IsViewMode}
                        />
                        <span>Radiation Exposure</span>
                      </label>
                      <label htmlFor="RoNegative">
                        <input
                          id="RoNegative"
                          value="RoNegative"
                          type="checkbox"
                          checked={HighRiskFactors.RoNegative}
                          onChange={handleHighRiskFactorsChange}
                          readOnly={IsViewMode}
                          disabled = {IsViewMode}

                        />
                        <span>Ro Negative</span>
                      </label>
                      <label htmlFor="AnyOther">
                        <input
                          id="AnyOther"
                          value="AnyOther"
                          type="checkbox"
                          checked={HighRiskFactors.AnyOther}
                          onChange={handleHighRiskFactorsChange}
                          readOnly={IsViewMode}
                          disabled = {IsViewMode}

                        />
                        <span>Any Other</span>
                      </label>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <div className="case_sheet_5con">
                  <div className="case_sheet_5con_20">
                    <label>
                      Surgical History <span>:</span>
                    </label>
                    <textarea
                      id="surgicalHistory"
                      name="surgicalHistory"
                      value={cardFormData.surgicalHistory}
                      onChange={handleChange}
                      readOnly={IsViewMode}
                    ></textarea>
                  </div>
                </div>
                <br />
                <br />

                <div className="OtMangement_con">
                  <div className="OtMangementForm_1 ececeee">
                    <label>
                      Family History<span>:</span>
                    </label>
                    <div className="OtMangementForm_1_checkbox weewdexewdd">
                      <label htmlFor="Diabetes">
                        <input
                          id="Diabetes"
                          value="Diabetes"
                          type="checkbox"
                          checked={FamilyHistory.Diabetes}
                          readOnly={IsViewMode}
                          onChange={handleFamilyHistoryChange}
                          disabled = {IsViewMode}
                        />
                        <span>Diabetes</span>
                      </label>
                      <label htmlFor="Hypertension">
                        <input
                          id="Hypertension"
                          value="Hypertension"
                          type="checkbox"
                          readOnly={IsViewMode}
                          checked={FamilyHistory.Hypertension}
                          onChange={handleFamilyHistoryChange}
                          disabled = {IsViewMode}
                        />
                        <span>Hypertension</span>
                      </label>
                      <label htmlFor="HeartDisease">
                        <input
                          id="HeartDisease"
                          value="HeartDisease"
                          type="checkbox"
                          readOnly={IsViewMode}
                          checked={FamilyHistory.HeartDisease}
                          onChange={handleFamilyHistoryChange}
                          disabled = {IsViewMode}
                        />
                        <span>Heart Disease</span>
                      </label>
                      <label htmlFor="Twins">
                        <input
                          id="Twins"
                          value="Twins"
                          type="checkbox"
                          readOnly={IsViewMode}
                          checked={FamilyHistory.Twins}
                          onChange={handleFamilyHistoryChange}
                          disabled = {IsViewMode}
                        />
                        <span>Twins</span>
                      </label>

                      <label htmlFor="CongenitalAnomaliesFamily">
                        <input
                          id="CongenitalAnomaliesFamily"
                          value="CongenitalAnomaliesFamily"
                          type="checkbox"
                          readOnly={IsViewMode}
                          checked={FamilyHistory.CongenitalAnomaliesFamily}
                          onChange={handleFamilyHistoryChange}
                          disabled = {IsViewMode}
                        />
                        <span>Congenital Anomalies</span>
                      </label>
                      <label htmlFor="Asthma">
                        <input
                          id="Asthma"
                          value="Asthma"
                          type="checkbox"
                          readOnly={IsViewMode}
                          checked={FamilyHistory.Asthma}
                          disabled = {IsViewMode}
                          onChange={handleFamilyHistoryChange}
                        />
                        <span>Asthma</span>
                      </label>
                      <label htmlFor="Tuberculosis">
                        <input
                          id="Tuberculosis"
                          value="Tuberculosis"
                          type="checkbox"
                          readOnly={IsViewMode}
                          checked={FamilyHistory.Tuberculosis}
                          disabled = {IsViewMode}
                          onChange={handleFamilyHistoryChange}
                        />
                        <span>Tuberculosis</span>
                      </label>
                      <label htmlFor="AnyOtherFamilyHistory">
                        <input
                          id="AnyOtherFamilyHistory"
                          value="AnyOtherFamilyHistory"
                          type="checkbox"
                          readOnly={IsViewMode}
                          checked={FamilyHistory.AnyOtherFamilyHistory}
                          onChange={handleFamilyHistoryChange}
                          disabled = {IsViewMode}
                        />
                        <span>Any other</span>
                      </label>
                    </div>
                  </div>
                </div>
                <br />
                <br />

                <div className="case_sheet_5con">
                  <div className="case_sheet_5con_20">
                    <label>
                      Allergies <span>:</span>
                    </label>
                    <textarea
                      id="allergies"
                      name="allergies"
                      value={cardFormData.allergies}
                      onChange={handleChange}
                      readOnly={IsViewMode}
                    ></textarea>
                  </div>
                </div>
                <br />
                <br />

                <div className="RegisFormcon" style={{ justifyContent: "center" }}>
                  <div className="RegisForm_1">
                    <label htmlFor="bloodGroupHusband">
                      Blood Group (Husband)<span>:</span>
                    </label>
                    <select
                      id="bloodGroupHusband"
                      name="bloodGroupHusband"
                      value={cardFormData.bloodGroupHusband}
                      onChange={handleChange}
                      readOnly={IsViewMode}
                      disabled = {IsViewMode}
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
                  INVESTIGATION
                </h4>

                <div className="Selected-table-container">
                  <table className="selected-medicine-table2">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Hb</th>
                        <th>Urine</th>
                        <th>
                          <button className="cell_btn12" onClick={addRow2} disabled = {IsViewMode}>
                            <AddIcon />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {drainsData2.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="date"
                              className="wedscr54_secd_8643r sdef11"
                              value={item.dateInv}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric2(e, index, "dateInv")
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              className="wedscr54_secd_8643r sdef11"
                              value={item.Hb}
                              readOnly={IsViewMode}
                              onChange={(e) => handleChangeObstetric2(e, index, "Hb")}
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              className="wedscr54_secd_8643r sdef11"
                              value={item.Urine}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric2(e, index, "Urine")
                              }
                            />
                          </td>

                          <td>
                            <button
                              className="cell_btn12"
                              disabled = {IsViewMode}
                              onClick={() => deleteRow2(index)}
                            >
                              <RemoveIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <br />
                <br />

                <div className="llpo05qaqwe">
                  <div className="nmllkio84">
                    <label htmlFor="BSL">
                      <input
                        id="BSL"
                        value="BSL"
                        type="checkbox"
                        disabled = {IsViewMode}
                        checked={checkboxState.BSL}
                        onChange={handleCheckboxChange}
                        readOnly={IsViewMode}
                      />
                      <span>BSL</span>
                    </label>
                    {checkboxState.BSL && (
                      <input
                        type="text"
                        id="BSLText"
                        value={cardFormData.BSLText}
                        onChange={handleTextInputChange}
                        readOnly={IsViewMode}

                      />
                    )}
                  </div>

                  <div className="nmllkio84">
                    <label htmlFor="HIV">
                      <input
                        id="HIV"
                        value="HIV"
                        type="checkbox"
                        checked={checkboxState.HIV}
                        onChange={handleCheckboxChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                      />
                      <span>HIV</span>
                    </label>
                    {checkboxState.HIV && (
                      <input
                        type="text"
                        id="HIVText"
                        value={cardFormData.HIVText}
                        readOnly={IsViewMode}
                        onChange={handleTextInputChange}
                      />
                    )}
                  </div>

                  <div className="nmllkio84">
                    <label htmlFor="Urea">
                      <input
                        id="Urea"
                        value="Urea"
                        type="checkbox"
                        checked={checkboxState.Urea}
                        readOnly={IsViewMode}
                        onChange={handleCheckboxChange}
                        disabled = {IsViewMode}
                      />
                      <span>Urea</span>
                    </label>
                    {checkboxState.Urea && (
                      <input
                        type="text"
                        id="UreaText"
                        value={cardFormData.UreaText}
                        readOnly={IsViewMode}
                        onChange={handleTextInputChange}
                      />
                    )}
                  </div>

                  <div className="nmllkio84">
                    <label htmlFor="BTCT">
                      <input
                        id="BTCT"
                        value="BTCT"
                        type="checkbox"
                        checked={checkboxState.BTCT}
                        readOnly={IsViewMode}
                        onChange={handleCheckboxChange}
                        disabled = {IsViewMode}
                      />
                      <span>BT/CT</span>
                    </label>
                    {checkboxState.BTCT && (
                      <input
                        type="text"
                        id="BTCTText"
                        value={cardFormData.BTCTText}
                        onChange={handleTextInputChange}
                        readOnly={IsViewMode}
                      />
                    )}
                  </div>

                  <div className="nmllkio84">
                    <label htmlFor="OGCT">
                      <input
                        id="OGCT"
                        value="OGCT"
                        type="checkbox"
                        checked={checkboxState.OGCT}
                        onChange={handleCheckboxChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                      />
                      <span>OGCT</span>
                    </label>
                    {checkboxState.OGCT && (
                      <input
                        type="text"
                        id="OGCTText"
                        value={cardFormData.OGCTText}
                        onChange={handleTextInputChange}
                        readOnly={IsViewMode}

                      />
                    )}
                  </div>

                  <div className="nmllkio84">
                    <label htmlFor="VDRL">
                      <input
                        id="VDRL"
                        value="VDRL"
                        type="checkbox"
                        checked={checkboxState.VDRL}
                        onChange={handleCheckboxChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                      />
                      <span>VDRL</span>
                    </label>
                    {checkboxState.VDRL && (
                      <input
                        type="text"
                        id="VDRLText"
                        value={cardFormData.VDRLText}
                        onChange={handleTextInputChange}
                        readOnly={IsViewMode}
                      />
                    )}
                  </div>
                  <div className="nmllkio84">
                    <label htmlFor="AuAg">
                      <input
                        id="AuAg"
                        value="AuAg"
                        type="checkbox"
                        checked={checkboxState.AuAg}
                        onChange={handleCheckboxChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                        
                      />
                      <span>Au.Ag</span>
                    </label>
                    {checkboxState.AuAg && (
                      <input
                        type="text"
                        id="AuAgText"
                        value={cardFormData.AuAgText}
                        onChange={handleTextInputChange}
                        readOnly={IsViewMode}
                      />
                    )}
                  </div>

                  <div className="nmllkio84">
                    <label htmlFor="Creatrine">
                      <input
                        id="Creatrine"
                        value="Creatrine"
                        type="checkbox"
                        checked={checkboxState.Creatrine}
                        onChange={handleCheckboxChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                        
                      />
                      <span>Creatrine</span>
                    </label>
                    {checkboxState.Creatrine && (
                      <input
                        type="text"
                        id="CreatrineText"
                        value={cardFormData.CreatrineText}
                        onChange={handleTextInputChange}
                        readOnly={IsViewMode}

                      />
                    )}
                  </div>

                  <div className="nmllkio84">
                    <label htmlFor="WBC">
                      <input
                        id="WBC"
                        value="WBC"
                        type="checkbox"
                        checked={checkboxState.WBC}
                        readOnly={IsViewMode}
                        onChange={handleCheckboxChange}
                        disabled = {IsViewMode}
                      />
                      <span>WBC</span>
                    </label>

                    {checkboxState.WBC && (
                      <input
                        type="text"
                        id="WBCText"
                        value={cardFormData.WBCText}
                        readOnly={IsViewMode}
                        onChange={handleTextInputChange}
                      />
                    )}
                  </div>

                  <div className="nmllkio84">
                    <label htmlFor="anyotherinves">
                      <input
                        id="anyotherinves"
                        value="anyotherinves"
                        type="checkbox"
                        checked={checkboxState.anyotherinves}
                        onChange={handleCheckboxChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                      />
                      <span>Any Other</span>
                    </label>
                    {checkboxState.anyotherinves && (
                      <input
                        type="text"
                        id="anyotherinvesText"
                        value={cardFormData.anyotherinvesText}
                        onChange={handleTextInputChange}
                        readOnly={IsViewMode}
                        
                      />
                    )}
                  </div>
                </div>
                <br />
                <br />

                <div className="case_sheet_5con_20_pp_head">
                  <div className="case_sheet_5con_20_pp">
                    <label>
                      RS <span>:</span>
                    </label>
                    <textarea
                      style={{ width: "100%", height: "40px" }}
                      id="RSText"
                      value={cardFormData.RSText}
                      onChange={handleTextInputChange}
                      readOnly={IsViewMode}

                    ></textarea>
                  </div>

                  <div className="case_sheet_5con_20_pp">
                    <label>
                      CVS <span>:</span>
                    </label>

                    <textarea
                      style={{ width: "100%", height: "40px" }}
                      id="CVSText"
                      value={cardFormData.CVSText}
                      onChange={handleTextInputChange}
                      readOnly={IsViewMode}

                    ></textarea>
                  </div>

                  <div className="case_sheet_5con_20_pp">
                    <label>
                      Breast <span>:</span>
                    </label>
                    <textarea
                      style={{ width: "100%", height: "40px" }}
                      id="BreastText"
                      value={cardFormData.BreastText}
                      onChange={handleTextInputChange}
                     readOnly={IsViewMode}
                    ></textarea>
                  </div>
                </div>
                <br />
                <br />

                <div className="llpo05qaqwe">
                  <div className="nmllkio84 ">
                    <label className="hjklmxz2">
                      Inj TT1 <span>:</span>
                    </label>
                    <label htmlFor="TT1Yes" className="hjklmxz2_llo">
                      <input
                        id="TT1Yes"
                        name="TT1"
                        value="Yes"
                        type="radio"
                        checked={RadioBtn.TT1 === "Yes"}
                        onChange={handleRadioBtnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}

                      />
                      <span>Yes</span>
                    </label>
                    <label htmlFor="TT1No" className="hjklmxz2_llo">
                      <input
                        id="TT1No"
                        name="TT1"
                        value="No"
                        type="radio"
                        checked={RadioBtn.TT1 === "No"}
                        onChange={handleRadioBtnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}

                      />
                      <span>No</span>
                    </label>

                    {RadioBtn.TT1 === "Yes" && (
                      <input
                        type="text"
                        id="TT1Text"
                        value={cardFormData.TT1Text}
                        onChange={handleTextInputChange}
                        readOnly={IsViewMode}
                      />
                    )}
                  </div>

                  <div className="nmllkio84">
                    <label className="hjklmxz2">
                      Inj TT2 <span>:</span>
                    </label>
                    <label htmlFor="TT2Yes" className="hjklmxz2_llo">
                      <input
                        id="TT2Yes"
                        name="TT2"
                        value="Yes"
                        type="radio"
                        checked={RadioBtn.TT2 === "Yes"}
                        onChange={handleRadioBtnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}

                      />
                      <span>Yes</span>
                    </label>
                    <label htmlFor="TT2No" className="hjklmxz2_llo">
                      <input
                        id="TT2No"
                        name="TT2"
                        value="No"
                        type="radio"
                        readOnly={IsViewMode}
                        checked={RadioBtn.TT2 === "No"}
                        onChange={handleRadioBtnChange}
                        disabled = {IsViewMode}
                      />
                      <span>No</span>
                    </label>

                    {RadioBtn.TT2 === "Yes" && (
                      <input
                        type="text"
                        id="TT2Text"
                        value={cardFormData.TT2Text}
                        readOnly={IsViewMode}
                        onChange={handleTextInputChange}
                      />
                    )}
                  </div>

                  <div className="nmllkio84">
                    <label className="hjklmxz2">
                      Inj TT3 <span>:</span>
                    </label>
                    <label htmlFor="TT3Yes" className="hjklmxz2_llo">
                      <input
                        id="TT3Yes"
                        name="TT3"
                        value="Yes"
                        type="radio"
                        checked={RadioBtn.TT3 === "Yes"}
                        onChange={handleRadioBtnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                      />
                      <span>Yes</span>
                    </label>
                    <label htmlFor="TT3No" className="hjklmxz2_llo">
                      <input
                        id="TT3No"
                        name="TT3"
                        value="No"
                        type="radio"
                        checked={RadioBtn.TT3 === "No"}
                        onChange={handleRadioBtnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                      />
                      <span>No</span>
                    </label>

                    {RadioBtn.TT3 === "Yes" && (
                      <input
                        type="text"
                        id="TT3Text"
                        value={cardFormData.TT3Text}
                        readOnly={IsViewMode}
                        onChange={handleTextInputChange}
                      />
                    )}
                  </div>

                  <div className="nmllkio84">
                    <label className="hjklmxz2">
                      Inj Betnesol <span>:</span>
                    </label>
                    <label htmlFor="BetnesolYes" className="hjklmxz2_llo">
                      <input
                        id="BetnesolYes"
                        name="Betnesol"
                        value="Yes"
                        type="radio"
                        readOnly={IsViewMode}
                        checked={RadioBtn.Betnesol === "Yes"}
                        onChange={handleRadioBtnChange}
                        disabled = {IsViewMode}
                      />
                      <span>Yes</span>
                    </label>
                    <label htmlFor="BetnesolNo" className="hjklmxz2_llo">
                      <input
                        id="BetnesolNo"
                        name="Betnesol"
                        value="No"
                        type="radio"
                        readOnly={IsViewMode}
                        checked={RadioBtn.Betnesol === "No"}
                        onChange={handleRadioBtnChange}
                        disabled = {IsViewMode}
                      />
                      <span>No</span>
                    </label>

                    {RadioBtn.Betnesol === "Yes" && (
                      <input
                        type="text"
                        id="BetnesolText"
                        readOnly={IsViewMode}
                        value={cardFormData.BetnesolText}
                        onChange={handleTextInputChange}
                      />
                    )}
                  </div>

                  <div className="nmllkio84">
                    <label className="hjklmxz2">
                      Folic Acid <span>:</span>
                    </label>
                    <label htmlFor="FolicAcidYes" className="hjklmxz2_llo">
                      <input
                        id="FolicAcidYes"
                        name="FolicAcid"
                        value="Yes"
                        type="radio"
                        readOnly={IsViewMode}
                        checked={RadioBtn.FolicAcid === "Yes"}
                        onChange={handleRadioBtnChange}
                        disabled = {IsViewMode}
                      />
                      <span>Yes</span>
                    </label>
                    <label htmlFor="FolicAcidNo" className="hjklmxz2_llo">
                      <input
                        id="FolicAcidNo"
                        name="FolicAcid"
                        value="No"
                        type="radio"
                        readOnly={IsViewMode}
                        checked={RadioBtn.FolicAcid === "No"}
                        onChange={handleRadioBtnChange}
                        disabled = {IsViewMode}
                      />
                      <span>No</span>
                    </label>

                    {RadioBtn.FolicAcid === "Yes" && (
                      <input
                        type="text"
                        id="FolicAcidText"
                        value={cardFormData.FolicAcidText}
                        onChange={handleTextInputChange}
                        readOnly={IsViewMode}
                      />
                    )}
                  </div>
                  <div className="nmllkio84">
                    <label className="hjklmxz2">
                      Calcium <span>:</span>
                    </label>
                    <label htmlFor="CalciumYes" className="hjklmxz2_llo">
                      <input
                        id="CalciumYes"
                        name="Calcium"
                        value="Yes"
                        type="radio"
                        checked={RadioBtn.Calcium === "Yes"}
                        onChange={handleRadioBtnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}

                      />
                      <span>Yes</span>
                    </label>
                    <label htmlFor="CalciumNo" className="hjklmxz2_llo">
                      <input
                        id="CalciumNo"
                        name="Calcium"
                        value="No"
                        type="radio"
                        checked={RadioBtn.Calcium === "No"}
                        onChange={handleRadioBtnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                      />
                      <span>No</span>
                    </label>

                    {RadioBtn.Calcium === "Yes" && (
                      <input
                        type="text"
                        id="CalciumText"
                        value={cardFormData.CalciumText}
                        onChange={handleTextInputChange}
                        readOnly={IsViewMode}
                      />
                    )}
                  </div>
                </div>
                <br />
                <br />


                <div className="llpo05qaqwe">
                  <div className="nmllkio84 ">
                    <label className="hjklmxz2">
                      FTND / LSCS<span>:</span>
                    </label>
                    <label htmlFor="FTNDLSCSYes" className="hjklmxz2_llo">
                      <input
                        id="FTNDLSCSYes"
                        name="FTNDLSCS"
                        value="Yes"
                        type="radio"
                        checked={RadioBtn.FTNDLSCS === "Yes"}
                        onChange={handleRadioBtnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                      />
                      <span>Yes</span>
                    </label>
                    <label htmlFor="FTNDLSCSNo" className="hjklmxz2_llo">
                      <input
                        id="FTNDLSCSNo"
                        name="FTNDLSCS"
                        value="No"
                        type="radio"
                        checked={RadioBtn.FTNDLSCS === "No"}
                        onChange={handleRadioBtnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}
                      />
                      <span>No</span>
                    </label>

                    {RadioBtn.FTNDLSCS === "Yes" && (
                      <div className="case_sheet_5con_20_pp">
                        <textarea
                          style={{ width: "100%", height: "40px" }}
                          type="text"
                          id="FTNDLSCSText"
                          value={cardFormData.FTNDLSCSText}
                          onChange={handleTextInputChange}
                          readOnly={IsViewMode}
                        />
                      </div>
                    )}
                  </div>

                  <div className="nmllkio84 ">
                    <label className="hjklmxz2">
                      FTND / TL<span>:</span>
                    </label>
                    <label htmlFor="FTNDTLYes" className="hjklmxz2_llo">
                      <input
                        id="FTNDTLYes"
                        name="FTNDTL"
                        value="Yes"
                        type="radio"
                        readOnly={IsViewMode}
                        checked={RadioBtn.FTNDTL === "Yes"}
                        onChange={handleRadioBtnChange}
                        disabled = {IsViewMode}
                      />
                      <span>Yes</span>
                    </label>
                    <label htmlFor="FTNDTLNo" className="hjklmxz2_llo">
                      <input
                        id="FTNDTLNo"
                        name="FTNDTL"
                        value="No"
                        type="radio"
                        checked={RadioBtn.FTNDTL === "No"}
                        onChange={handleRadioBtnChange}
                        readOnly={IsViewMode}
                        disabled = {IsViewMode}

                      />
                      <span>No</span>
                    </label>

                    {RadioBtn.FTNDTL === "Yes" && (
                      <div className="case_sheet_5con_20_pp">
                        <textarea
                          style={{ width: "100%", height: "40px" }}
                          type="text"
                          id="FTNDTLText"
                          value={cardFormData.FTNDTLText}
                          onChange={handleTextInputChange}
                          readOnly={IsViewMode}

                        />
                      </div>
                    )}
                  </div>

                  <div className="nmllkio84 ">
                    <label className="hjklmxz2">
                      Post Delivery<span>:</span>
                    </label>
                    <label htmlFor="PostDeliveryYes" className="hjklmxz2_llo">
                      <input
                        id="PostDeliveryYes"
                        name="PostDelivery"
                        value="Yes"
                        type="radio"
                        readOnly={IsViewMode}
                        checked={RadioBtn.PostDelivery === "Yes"}
                        onChange={handleRadioBtnChange}
                        disabled = {IsViewMode}
                      />
                      <span>Yes</span>
                    </label>
                    <label htmlFor="PostDeliveryNo" className="hjklmxz2_llo">
                      <input
                        id="PostDeliveryNo"
                        name="PostDelivery"
                        value="No"
                        type="radio"
                        readOnly={IsViewMode}
                        checked={RadioBtn.PostDelivery === "No"}
                        onChange={handleRadioBtnChange}
                        disabled = {IsViewMode}
                      />
                      <span>No</span>
                    </label>

                    {RadioBtn.PostDelivery === "Yes" && (
                      <div className="case_sheet_5con_20_pp">
                        <textarea
                          style={{ width: "100%", height: "40px" }}
                          type="text"
                          id="PostDeliveryText"
                          value={cardFormData.PostDeliveryText}
                          onChange={handleTextInputChange}
                          readOnly={IsViewMode}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <br />

                <div className="Selected-table-container">
                  <table className="selected-medicine-table2">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Weight</th>
                        <th>B.P</th>
                        <th>Complaints</th>
                        <th>Amenorrhea</th>
                        <th>Pallor / Edema</th>
                        <th>Presentation, Position, F.H.S</th>
                        <th>
                          P / V<hr style={{ border: "1px solid #000" }}></hr>Any Other
                        </th>
                        <th>Advice, Follow up date & Compliance</th>
                        <th>
                          <button className="cell_btn12" onClick={addRow3} disabled = {IsViewMode}>
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
                              value={item.dateforDelivery}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric3(e, index, "dateforDelivery")
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              className="wedscr54_secd_8643r uujhghbg"
                              value={item.weightDelivery}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric3(e, index, "weightDelivery")
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="wedscr54_secd_8643r uujhghbg"
                              value={item.BPDelivery}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric3(e, index, "BPDelivery")
                              }
                            />
                          </td>
                          <td>
                            <textarea
                              className="edjuwydrt56w ee33223"
                              value={item.ComplaintsDelivery}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric3(e, index, "ComplaintsDelivery")
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="wedscr54_secd_8643r uujhghbg"
                              value={item.AmenorrheaDelivery}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric3(e, index, "AmenorrheaDelivery")
                              }
                            />
                          </td>

                          <td>
                            <textarea
                              type="text"
                              className="edjuwydrt56w ee33223"
                              value={item.PallorDelivery}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric3(e, index, "PallorDelivery")
                              }
                            ></textarea>
                          </td>

                          <td>
                            <textarea
                              type="text"
                              className="edjuwydrt56w ee33223"
                              value={item.PresentationDelivery}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric3(
                                  e,
                                  index,
                                  "PresentationDelivery"
                                )
                              }
                            ></textarea>
                          </td>

                          <td>
                            <textarea
                              type="text"
                              className="edjuwydrt56w ee33223"
                              value={item.PVAnyOtherDelivery}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric3(e, index, "PVAnyOtherDelivery")
                              }
                            ></textarea>
                          </td>

                          <td>
                            <textarea
                              type="text"
                              className="edjuwydrt56w ee33223"
                              value={item.AdviceDelivery}
                              readOnly={IsViewMode}
                              onChange={(e) =>
                                handleChangeObstetric3(e, index, "AdviceDelivery")
                              }
                            ></textarea>
                          </td>

                          <td>
                            <button
                              className="cell_btn12"
                              disabled = {IsViewMode}
                              onClick={() => deleteRow3(index)}
                            >
                              <RemoveIcon />
                            </button>
                          </td>

                          <td>
                            <input
                              type="checkbox"
                              className="cell_btn123"
                              readOnly={IsViewMode}
                              disabled = {IsViewMode}
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
                  <div className="Register_btn_con">
                    <button className="RegisterForm_1_btns" onClick={Submitalldata}>
                      Print
                    </button>
                  </div>
                )}

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
                                  readOnly={IsViewMode}
                                  onChange={(e) =>
                                    handleChangeDateAded(
                                      index,
                                      "date",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                      {/* Repeat for other rows */}
                      <tr>
                        <th>Amenorrhea</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                value={row.amenorrhea}
                                readOnly={IsViewMode}
                                onChange={(e) =>
                                  handleChangeDateAded(
                                    index,
                                    "amenorrhea",
                                    e.target.value
                                    
                                  )
                                }
                              />
                            ))}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th>Presentation</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                value={row.presentation}
                                readOnly={IsViewMode}
                                onChange={(e) =>
                                  handleChangeDateAded(
                                    index,
                                    "presentation",
                                    e.target.value
                                  )
                                }
                              />
                            ))}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th>B.P.D / G.S</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                readOnly={IsViewMode}
                                value={row.bpdGs}
                                onChange={(e) =>
                                  handleChangeDateAded(index, "bpdGs", e.target.value)
                                }
                              />
                            ))}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th>H.C</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                value={row.hc}
                                readOnly={IsViewMode}
                                onChange={(e) =>
                                  handleChangeDateAded(index, "hc", e.target.value)
                                }
                              />
                            ))}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th>A.C</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                value={row.ac}
                                readOnly={IsViewMode}
                                onChange={(e) =>
                                  handleChangeDateAded(index, "ac", e.target.value)
                                }
                              />
                            ))}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th>F.L / C.R.L</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                value={row.flCrl}
                                readOnly={IsViewMode}
                                onChange={(e) =>
                                  handleChangeDateAded(index, "flCrl", e.target.value)
                                }
                              />
                            ))}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th>Gestational Age by USG</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                value={row.gestationalAge}
                                readOnly={IsViewMode}
                                onChange={(e) =>
                                  handleChangeDateAded(
                                    index,
                                    "gestationalAge",
                                    e.target.value
                                  )
                                }
                              />
                            ))}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th>Liquor</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                value={row.liquor}
                                readOnly={IsViewMode}
                                onChange={(e) =>
                                  handleChangeDateAded(
                                    index,
                                    "liquor",
                                    e.target.value
                                  )
                                }
                              />
                            ))}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th>Placenta</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                value={row.placenta}
                                readOnly={IsViewMode}
                                onChange={(e) =>
                                  handleChangeDateAded(
                                    index,
                                    "placenta",
                                    e.target.value
                                  )
                                }
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>Anomalies</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                value={row.anomalies}
                                readOnly={IsViewMode}
                                onChange={(e) =>
                                  handleChangeDateAded(
                                    index,
                                    "anomalies",
                                    e.target.value
                                  )
                                }
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>Foetal Weight</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                value={row.foetalWeight}
                                readOnly={IsViewMode}
                                onChange={(e) =>
                                  handleChangeDateAded(
                                    index,
                                    "foetalWeight",
                                    e.target.value
                                  )
                                }
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>Cervical Length</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                value={row.cervicalLength}
                                readOnly={IsViewMode}
                                onChange={(e) =>
                                  handleChangeDateAded(
                                    index,
                                    "cervicalLength",
                                    e.target.value
                                  )
                                }
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>Any Other / Remark</th>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {rows.map((row, index) => (
                              <input
                                key={index}
                                type="text"
                                className="ewdnlpi944"
                                value={row.remark}
                                readOnly={IsViewMode}
                                onChange={(e) =>
                                  handleChangeDateAded(
                                    index,
                                    "remark",
                                    e.target.value
                                  )
                                }
                              />
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
                  <button className="cell_btn12" onClick={addRow4} disabled = {IsViewMode}>
                    <AddIcon />
                  </button>
                  {rows.length > 1 && (
                    <button
                      className="cell_btn12"
                      disabled = {IsViewMode}
                      onClick={() => deleteRow4(rows.length - 1)}
                    >
                      <RemoveIcon />
                    </button>
                  )}
                </div>
                <div className="case_sheet_5con">
                  <div className="case_sheet_5con_20">
                    <label>
                      Delivery Result <span>:</span>
                    </label>
                    <textarea
                      id="DeliveryResult"
                      name="DeliveryResult"
                      value={cardFormData.DeliveryResult}
                      onChange={handleChange}
                      readOnly={IsViewMode}
                    ></textarea>
                  </div>
                  <div className="RegisForm_1">
                    <label htmlFor="DeliveryDate">
                    Delivery Date<span>:</span>
                    </label>
                    <input
                      type="date"
                      id="DeliveryDate"
                      name="DeliveryDate"
                      value={cardFormData.DeliveryDate}
                      onChange={handleChange}
                      readOnly={IsViewMode}
                      required
                    />
                  </div>

                </div>
            </div>

            
          ) :  null}
         

         <div className="Main_container_Btn">
            {IsViewMode && (
              <button onClick={handleClear}>Clear</button>
            )}
            {!IsViewMode && (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </div>
          {GetData.length > 0 &&
            <ReactGrid columns={ANC_CARD_Columns} RowData={GetData} />
          }
         <ToastAlert Message={toast.message} Type={toast.type} />

      
    </>
  );
}

export default AncCard;
 