import React, { useState, useEffect } from "react";

import Axios from "axios";
import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";

import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
// import "./IcuAssesment.css";
import "./ICU_Assesment.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const ICU_Assesment = () => {


    const formData = useSelector((state) => state.userRecord?.workbenchformData);
    // const userRecord = useSelector((state) => state.userRecord?.UserData);
    // const IpNurseQueSelectedRow = useSelector(
    //   (state) => state.InPatients?.IpNurseQueSelectedRow
    // );




    const IpNurseQueSelectedRow = {
      Booking_Id: '101A',  // Replace with actual data or initialize as needed
      PatientId: '1',
      PatientName: 'diya'
  };

  const userRecord = {
      username: 'admin',
      location: 'chennai'
  };

    const create = userRecord?.username;
    const Location = userRecord?.location;
  
    const [appointmentDate, setAppointmentDate] = useState("");
    
    const [AssessmentFormData, setAssessmentFormData] = useState({
      PresentingComplaints: "",
      DetailsPresentingComplaints: "",
      HistoryOf: "",
      PatientStatusAtAdmission: "",
      Allergies: "",
      Pupil: "",
      Cvs: "",
      Rs: "",
      Pa: "",
      Cns: "",
    });
  
  console.log(AssessmentFormData,'AssessmentFormData')
    const [selectedAssessment, setSelectedAssessment] = useState([]);
  
    const cleardata = () => {
      setAssessmentFormData({
        PresentingComplaints: "",
        DetailsPresentingComplaints: "",
        HistoryOf: "",
        PatientStatusAtAdmission: "",
        ProvisionalDiagnosis: "",
        PsycologicalAssessment: [],
        CurrentMedications: "",
        PastMedical: "",
        Physical: "",
        Suggestion: "",
      });
      
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAssessmentFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const [checkboxValues, setCheckboxValues] = useState({
      smoking: false,
      ethanol: false,
      drugAdvise: false,
      bowelBladder: false,
      vegNonVeg: false,
    });
  
  
  
    //Medical History Form.....................
  
    const [openModal, setOpenModal] = useState(true)
  
  
    const [medicalHistory, setMedicalHistory] = useState({
      // MedicalHistory
      Anemia: false,
      Arthritis: false,
      Asthma: false,
      Cancer: false,
      ChronicObstructivePulmonaryDisease: false,
      ClottingDisorder: false,
      SkinDisease: false,
      CongestiveHeartFailure: false,
      CrohnsDisease: false,
      Depression: false,
      Diabetes: false,
      Emphysema: false,
      EndocrineProblems: false,
      GERD: false,
      Glaucoma: false,
      Hepatitis: false,
      HivAids: false,
      Hypertension: false,
      KidneyDisease: false,
      MyocardialInfarction: false,
      PepticUlcerDisease: false,
      Seizures: false,
      Stroke: false,
      UlcerativeColitis: false,
    });
   
  
  
    const [others, setOthers] = useState(false);
    const [othersCheckbox, setOthersCheckbox] = useState('');
  
    console.log(others,'others')
    console.log(othersCheckbox,'othersCheckbox')

    const [others1, setOthers1] = useState(false);
    const [othersCheckbox1, setOthersCheckbox1] = useState('');
  
    console.log(others1,'others1')
    console.log(othersCheckbox1,'othersCheckbox1')
  
    const [socialHistory, setSocialHistory] = useState({
      alcoholUseNever: false,
      alcoholUseOccasionally: false,
      alcoholUseDaily: false,
  
      tobaccoUseNever: false,
      tobaccoUseOccasionally: false,
      tobaccoUseDaily: false,
  
      SmokingUseNever: false,
      SmokingUseOccasionally: false,
      SmokingUseDaily: false,
    });
  
  
  
    const [familyHistory, setFamilyHistory] = useState({
      CancerPolyps: false,
      Anemia1: false,
      Diabetes1: false,
      BloodClots1: false,
      HeartDisease1: false,
      Stroke1: false,
      HighBloodPressure1: false,
      AnesthesiaReaction1: false,
      BleedingProblems1: false,
      Hepatitis1: false,
      Tb: false,
      SkinDisease: false,
      
    });
  
  
  
    const [familyHistoryInfo, setFamilyHistoryInfo] = useState({
  
      RelationShip1: "",
  
    });

    console.log(familyHistoryInfo,'familyHistoryInfo')
  
  

    const [getdatastate, setgetdatastate] = useState(false);

    useEffect(() => {
      if (IpNurseQueSelectedRow?.Booking_Id) {
        axios
          .get(`http://127.0.0.1:8000/IP/Assessment_Details_Link?Booking_Id=${IpNurseQueSelectedRow.Booking_Id}`)
          .then((response) => {
            const data = response.data[0];
            console.log("Fetched medical history data:", data);
    
            setAssessmentFormData({
              PresentingComplaints: data.PresentingComplaints,
              DetailsPresentingComplaints: data.DetailsPresentingComplaints,
              HistoryOf: data.HistoryOf,
              PatientStatusAtAdmission: data.PatientStatusAtAdmission,
              
              Allergies: data.Allergies,
              Cvs: data.Cvs,
              Pupil: data.Pupil,
              Rs: data.Rs,
              Pa: data.Pa,
              Cns: data.Cns,
              
            });
    
            setMenText({
              Dateoflastcolonoscopy: data.Dateoflastcolonoscopy,
            });
    
            setGynecHistory({
              Lmp: data.Lmp,
              NoOfPregnancies: data.NoOfPregnancies,
              NoOfDeliveries: data.NoOfDeliveries,
              Vaginal: data.Vaginal,
              Csection: data.Csection,
              MisCarriage: data.MisCarriage,
              VipAbortions: data.VipAbortions,
            });
    
            setVitalFormData({
              Temperature: data.Temperature,
              PulseRate: data.PulseRate,
              SPO2: data.SPO2,
              HeartRate: data.HeartRate,
              RR: data.RR,
              BP: data.BP,
              Height: data.Height,
              Weight: data.Weight,
              BMI: data.BMI,
              WC: data.WC,
              HC: data.HC,
              BSL: data.BSL,
            });
    
            setMsp({
              UlRt: data.UlRt,
              UlLt: data.UlLt,
              LlRt: data.LlRt,
              LlLt: data.LlLt,
            });
    
            setPlantars({
              
              Rt: data.Rt,
              Lt: data.Lt,
            });
    
           

            setTextarea3 ({
              ProvisionalDiagnosis: data.ProvisionalDiagnosis,
              FinalDiagnosis: data.FinalDiagnosis,
              TreatmentGiven: data.TreatmentGiven,
            })
    
            setIsSameAsProvisional(data.isSameAsProvisional);
    
            const parsedMedicalHistory = data.MedicalHistoryCheckbox.split(",").reduce((acc, cur) => {
              acc[cur] = true;
              return acc;
            }, {});
            setMedicalHistory(parsedMedicalHistory);
    
            const parsedSocialHistory = data.SocialHistoryCheckbox.split(",").reduce((acc, cur) => {
              acc[cur] = true;
              return acc;
            }, {});
            setSocialHistory(parsedSocialHistory);
    
            const parsedFamilyHistory = data.FamilyHistoryCheckbox.split(",").reduce((acc, cur) => {
              acc[cur] = true;
              return acc;
            }, {});
            setFamilyHistory(parsedFamilyHistory);
    

            const parsedLocalExamination = data.LocalExamination.split(",").reduce((acc, cur) => {
              acc[cur] = true;
              return acc;
            }, {});
            setLocalExamination(parsedLocalExamination)

            setFamilyHistoryInfo({
              RelationShip1: data.RelationShip1,
            });
    
            if (data.SurgicalHistoryOthers === '') {
              const parsedSurgicalHistory = data.SurgicalHistoryCheckbox.split(",").reduce((acc, cur) => {
                acc[cur] = true;
                return acc;
              }, {});
              setSurgicalHistory1(parsedSurgicalHistory);
            } else {
              setOther(true);
              setOtherCheckbox(data.SurgicalHistoryOthers);
            }
    
            const parsedWomenMen = data.womenMenCheckbox.split(",").reduce((acc, cur) => {
              acc[cur] = true;
              return acc;
            }, {});
            setWomenMen(parsedWomenMen);
    
            const parsedMen = data.menCheckbox.split(",").reduce((acc, cur) => {
              acc[cur] = true;
              return acc;
            }, {});
            setMen(parsedMen);
    
            setPatientInfo2({
              Listnamesdates: data.ListnamesAnddates,
            });
    
            if (data.MedicalHistoryOthers) {
              setOthersCheckbox(data.MedicalHistoryOthers);
            }
    
            if (data.FamilyHistoryOthers) {
              setOthersCheckbox1(data.FamilyHistoryOthers);
            }
    
            if (data.LocalOthersCheckbox) {
              setLocalOthersCheckbox(data.LocalOthersCheckbox);
            }

    
            console.log(data, 'Fetched dataaaaaaaaaa');
          })
          .catch((error) => {
            console.error('Error fetching medical history data:', error);
          })
          .finally(() => {
            setgetdatastate(false);
          });
      }
    }, [getdatastate]);



    
    const handleInputWomenChange= (e) => {
      const { name, value } = e.target;
      setFamilyHistoryInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  
  const getSelectedMedicalHistory = (medicalHistory) => {
    const selectedHistory = [];
    Object.keys(medicalHistory).forEach(key => {
        if (medicalHistory[key]) {
            selectedHistory.push(key);
        }
    });
    return selectedHistory;
  };
  const selectedMedicalHistory = getSelectedMedicalHistory(medicalHistory);
  console.log(selectedMedicalHistory,'selectedMedicalHistory');
  
  const getSelectedSocialHistory = (socialHistory) => {
    const getSelectedSocialHistory = [];
    Object.keys(socialHistory).forEach(key => {
        if (socialHistory[key]) {
          getSelectedSocialHistory.push(key);
        }
    });
    return getSelectedSocialHistory;
  };
  const selectedSocialHistory = getSelectedSocialHistory(socialHistory);
  console.log(selectedSocialHistory,'selectedSocialHistory');
  
  
  
  
  const getSelectedFamilyHistory = (familyHistory) => {
    const getSelectedFamilyHistory = [];
    Object.keys(familyHistory).forEach(key => {
        if (familyHistory[key]) {
          getSelectedFamilyHistory.push(key);
        }
    });
    return getSelectedFamilyHistory;
  };
  const selectedFamilyHistory = getSelectedFamilyHistory(familyHistory);
  console.log(selectedFamilyHistory,'selectedFamilyHistory');
    
    
  
  
  const handlemedicalCheckboxChange = (key) => {
    setMedicalHistory((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
    setOthers(false); // Uncheck "Others" checkbox if any medical history checkbox is checked
  };
  
  const handlemedicalOthersChange = (event) => {
    const isChecked = event.target.checked;
    setOthers(isChecked);
    if (isChecked) {
      // Set all medicalHistory values to false
      const updatedMedicalHistory = Object.fromEntries(
        Object.entries(medicalHistory).map(([key]) => [key, false])
      );
      setMedicalHistory(updatedMedicalHistory);
    }
    setOthersCheckbox(''); // Clear the "Others" textarea when checkbox is unchecked
  };
  
  
  const handleCheckboxChange2 = (name) => {
    setSocialHistory((prevState) => {
      let updatedState = { ...prevState };
  
      // Deselect all other checkboxes in the same category
      switch (name) {
        case "alcoholUseNever":
        case "alcoholUseOccasionally":
        case "alcoholUseDaily":
          updatedState = {
            ...prevState,
            alcoholUseNever: false,
            alcoholUseOccasionally: false,
            alcoholUseDaily: false,
            [name]: !prevState[name],
          };
          break;
        case "tobaccoUseNever":
        case "tobaccoUseOccasionally":
        case "tobaccoUseDaily":
          updatedState = {
            ...prevState,
            tobaccoUseNever: false,
            tobaccoUseOccasionally: false,
            tobaccoUseDaily: false,
            [name]: !prevState[name],
          };
          break;
        case "SmokingUseNever":
        case "SmokingUseOccasionally":
        case "SmokingUseDaily":
          updatedState = {
            ...prevState,
            SmokingUseNever: false,
            SmokingUseOccasionally: false,
            SmokingUseDaily: false,
            [name]: !prevState[name],
          };
          break;
        default:
          break;
      }
  
      return updatedState;
    });
  };
  
  
  const handleCheckboxChange3 = (key) => {
    setFamilyHistory((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
    setOthers1(false); // Uncheck "Others" checkbox if any family history checkbox is checked
  };
  
  const handleOthersChange1 = (event) => {
    const isChecked = event.target.checked;
    setOthers1(isChecked);
    if (isChecked) {
      // Set all familyHistory values to false
      const updatedFamilyHistory = Object.fromEntries(
        Object.entries(familyHistory).map(([key]) => [key, false])
      );
      setFamilyHistory(updatedFamilyHistory);
    }
    setOthersCheckbox1(''); // Clear the "Others" textarea when checkbox is unchecked
  };
  
  //.........................................................................medical history..............................
  
  
  
  //.................................surgical history.....................................
  
  
  const [SurgicalHistory1, setSurgicalHistory1] = useState({
    // Surgical History
    AdrenalGlandSurgery: false,
    Appendectomy: false,
    BariatricSurgery: false,
    BladderSurgery: false,
    BreastSurgery: false,
    CesareanSection: false,
    Cholecystectomy: false,
    ColonSurgery: false,
    CoronaryArteryBypassGraft: false,
    EsophagusSurgery: false,
    GastricBypassSurgery: false,
    HemorrhoidSurgery: false,
    HerniaRepair: false,
    Hysterectomy: false,
    KidneySurgery: false,
    NeckSurgery: false,
    ProstateSurgery: false,
    SmallIntestineSurgery: false,
    SpineSurgery: false,
    StomachSurgery: false,
    ThyroidSurgery: false,
    // NoneOfTheAbove:false,
  });

  console.log(SurgicalHistory1,'SurgicalHistory')
  
  const [other, setOther] = useState(false);
  const [otherCheckbox, setOtherCheckbox] = useState('');

  console.log(other,'other')
  console.log(otherCheckbox,'otherCheckbox')
  
  
  const [patientInfo2, setPatientInfo2] = useState({
    Listnamesdates: "",
    
  });

  console.log(patientInfo2,'patientInfo2')

  
  const [womenMen, setWomenMen] = useState({
    Monthlyselfexam: false,
    Yearlyphysicianexam: false,
    Lastmammogram: false,
  
    YearlyGYNexam: false,
    YearlyPAPexam: false,
    Lastmammogram2: false,
  
    Highsunexposure: false,
    Yearlyskinexam: false,
  });
  console.log(womenMen,'womenMen')
  
  const [men, setMen] = useState({
    Yearlyrectalexam: false,
    YearlyPSAbloodtest: false,
    Yearlyrectalexam2: false,
    Yearlystooltestforblood: false,
    
  });
  console.log(men,'men')
  
  
  const [mentext,setMenText] = useState({
    Dateoflastcolonoscopy: "",
  });
  
  console.log(mentext,'mentext')

  const [printMode, setPrintMode] = useState(false);
  
  
  const handleSurgicalCheckboxChange = (key) => {
    setSurgicalHistory1((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
    setOther(false); // Uncheck "Others" checkbox if any surgical history checkbox is checked
  };
  
  const handleOtherChange2 = (event) => {
    const isChecked = event.target.checked;
    setOther(isChecked);
    if (isChecked) {
      // Set all familyHistory values to false
      const updatedSurgical = Object.fromEntries(
        Object.entries(SurgicalHistory1).map(([key]) => [key, false])
      );
      setSurgicalHistory1(updatedSurgical);
    }
    setOtherCheckbox(''); // Clear the "Others" textarea when checkbox is unchecked
  };
  
  const handleInputChange12 = (e) => {
    const { name, value } = e.target;
    setPatientInfo2((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  
  const handleCheckboxChangeWomenMen = (name) => {
    setWomenMen((prevWomenMen) => ({
      ...prevWomenMen,
      [name]: !prevWomenMen[name],
    }));
  };
  
  
  
  const handleCheckboxChangeMen = (name) => {
    setMen((prevMen) => ({
      ...prevMen,
      [name]: !prevMen[name],
    }));
  };
  
  
  const handleInputChangeMen = (event) => {
    const { name, value } = event.target;
    setMenText((prevMen) => ({
      ...prevMen,
      [name]: value,
    }));
  };
  
  
  //.......................................Surgical History end....................................................
  
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  //.................................Gynec history.............................................................
  
  
  const [GynecHistory,setGynecHistory] = useState({
  
    Lmp: "",
    NoOfPregnancies: "",
    NoOfDeliveries: "",
    Vaginal: "",
    Csection: "",
    MisCarriage: "",
    VipAbortions: ""
  })
  
  console.log(GynecHistory,'GynecHistory')
  
  const handleGynecChange = (e) => {
    const { name, value } = e.target;
    setGynecHistory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  
  
  
  //.................................Gynec history end .............................................................
  
  
  //................................. Vital .............................................................
  
  const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          columnHeader: {
            backgroundColor: "var(--ProjectColor)",
            textAlign: "Center",
          },
          root: {
            "& .MuiDataGrid-root .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeaderTitleContainer":
              {
                textAlign: "center",
                display: "flex !important",
                justifyContent: "center !important",
              },
            "& .MuiDataGrid-window": {
              overflow: "hidden !important",
            },
          },
          cell: {
            borderTop: "0px !important",
            borderBottom: "1px solid  var(--ProjectColor) !important",
            display: "flex",
            justifyContent: "center",
          },
        },
      },
    },
  });
  
  
  const [VitalFormData, setVitalFormData] = useState({
    Temperature: "",
    PulseRate: "",
    SPO2: "",
    HeartRate: "",
    RR: "",
    BP: "",
    Height: "",
    Weight: "",
    BMI: "",
    WC: "",
    HC: "",
    PainScore: "",
    BSL: "",
    
  });

  console.log(VitalFormData,'VitalFormData')
  
  const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
  
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);
  
    
      setVitalFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    
  };
  
  useEffect(() => {
    if (VitalFormData.Weight && VitalFormData.Height) {
      const parsedWeight = parseFloat(VitalFormData.Weight);
      const parsedHeight = parseFloat(VitalFormData.Height) / 100; // Convert cm to m
      const calculatedBMI = (
        parsedWeight /
        (parsedHeight * parsedHeight)
      ).toFixed(2);
  
      setVitalFormData((prev) => ({
        ...prev,
        BMI: calculatedBMI,
      }));
    }
  }, [VitalFormData.Weight, VitalFormData.Height]);
  
  const formatLabel = (label) => {
    // Check if the label contains both uppercase and lowercase letters, and doesn't contain numbers
    if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
      return label
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between lowercase and uppercase letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
    } else {
      return label;
    }
  };
  
   // Define the columns dynamically
   const dynamicColumns = [
    {
      field: 'id',
      headerName: 'S_No',
      width: 40,
    },
    ...Object.keys(VitalFormData).map((labelname, index) => {
      const formattedLabel = formatLabel(labelname);
      const labelWidth = getTextWidth(formattedLabel);
  
      return {
        field: labelname,
        headerName: formattedLabel,
        width: labelWidth + 60,
      };
    })
    
  ];
  
  
  
  function getTextWidth(text) {
    // Create a dummy element to measure text width
    const dummyElement = document.createElement("span");
    dummyElement.textContent = text;
    dummyElement.style.visibility = "hidden";
    dummyElement.style.whiteSpace = "nowrap";
    document.body.appendChild(dummyElement);
  
    // Get the width of the text
    const width = dummyElement.offsetWidth;
  
    // Remove the dummy element
    document.body.removeChild(dummyElement);
  
    return width;
  }
  
  
  //................................. Vital end .............................................................
  
  
  
  
  //................................. MSP .............................................................
  
  const[Msp,setMsp] = useState({
    UlRt:"",
    UlLt:"",
    LlRt:"",
    LlLt:"",
  })
  
  const[Plantars,setPlantars] = useState({
    Rt:"",
    Lt:"",
  })
  
  
  console.log(Msp,'Msp')
  console.log(Plantars,'Plantars')



  const handleMspChange = (section, field, value) => {
    if (section === 'Msp') {
      setMsp({ ...Msp, [field]: value });
    } else if (section === 'Plantars') {
      setPlantars({ ...Plantars, [field]: value });
    }
  };
  
  //................................. MSP end .............................................................
  
  
  //................................. L/E local Examination  .............................................................
  
  
  const [LocalExamination,setLocalExamination] = useState({
    Oedma:false,
    Cyanosis:false,
    Clubbing:false,
    SurgicalScars:false,
    Jaundice:false,
    Pallor:false,
    Lymphadenopathy:false,
    Thyromegaly:false,
  })
  
  const [LocalOthers,setLocalOthers] = useState(false);
  const [LocalOthersCheckbox, setLocalOthersCheckbox] = useState('');
  

  console.log(LocalExamination,'LocalExamination')
  console.log(LocalOthers,'LocalOthers')
  console.log(LocalOthersCheckbox,'LocalOthersCheckbox')

  
  const handleCheckboxChange1 = (key) => {
    if (key === 'LocalOthers') {
      const isChecked = !LocalOthers;
      setLocalOthers(isChecked);
      if (isChecked) {
        // Set all LocalExamination values to false
        const updatedLocal = Object.fromEntries(
          Object.entries(LocalExamination).map(([key]) => [key, false])
        );
        setLocalExamination(updatedLocal);
      }
    } else {
      setLocalExamination((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
      if (LocalOthers) {
        setLocalOthers(false);
        setLocalOthersCheckbox('');
      }
    }
  };
  
 
  
  
  //*................................ Provisional & Final Diagnosis & treatment given .................................*/}
  
  
  const [Textarea3, setTextarea3] = useState({
    ProvisionalDiagnosis: '',
    FinalDiagnosis: '',
    TreatmentGiven: '',
  });
  
  const [isSameAsProvisional, setIsSameAsProvisional] = useState(false);
  
  console.log(Textarea3,'Textarea3')
  console.log(isSameAsProvisional,'isSameAsProvisional')


  const handleNotesChange1 = (event) => {
    const { name, value } = event.target;
    if (value.length <= 1000) {
      setTextarea3((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  const handleCheckboxChange4 = () => {
    setIsSameAsProvisional(!isSameAsProvisional);
    if (!isSameAsProvisional) {
      setTextarea3((prevState) => ({
        ...prevState,
        FinalDiagnosis: Textarea3.ProvisionalDiagnosis,
      }));
    } else {
      setTextarea3((prevState) => ({
        ...prevState,
        FinalDiagnosis: "",
      }));
    }
  };
  
  
  //*................................ Provisional & Final Diagnosis  & treatment given  end .................................*/}
  
  
//   const handleAdd = () => {
//     const newAssessmentData = {
//         ...AssessmentFormData,
//         ...mentext,
//         ...GynecHistory,
//         ...VitalFormData,
//         ...Msp,
//         ...Plantars,
//         ...LocalExamination,
//         ...LocalOthers,
//         ...LocalOthersCheckbox,
//         ...Textarea3,
        
//     };

//     const data = new FormData();

//     for (const key in newAssessmentData) {
//         data.append(key, newAssessmentData[key]);
//     }

//     const { PatientId = '1', PatientName = 'diya', Booking_Id = '101A' } = IpNurseQueSelectedRow || {};
//     const { username: CreatedBy = 'admin', location: Location = 'chennai' } = userRecord || {};
//     data.append('PatientId', PatientId);
//     data.append('PatientName', PatientName);
//     data.append('Booking_Id', Booking_Id);
//     data.append('CreatedBy', CreatedBy);
//     data.append('Location', Location);
//     data.append('isSameAsProvisional', isSameAsProvisional);

//     data.append('MedicalHistoryCheckbox', Object.keys(medicalHistory).filter(p => medicalHistory[p]).join(','));
//     data.append('SocialHistoryCheckbox', Object.keys(socialHistory).filter(p => socialHistory[p]).join(','));
//     data.append('FamilyHistoryCheckbox', Object.keys(familyHistory).filter(p => familyHistory[p]).join(','));
//     data.append('RelationShip1', familyHistoryInfo.RelationShip1);
//     data.append('SurgicalHistoryCheckbox', Object.keys(SurgicalHistory1).filter(p => SurgicalHistory1[p]).join(','));
//     data.append('ListnamesAnddates', patientInfo2.Listnamesdates);
//     data.append('womenMenCheckbox', Object.keys(womenMen).filter(p => womenMen[p]).join(','));
//     data.append('menCheckbox', Object.keys(men).filter(p => men[p]).join(','));
//     data.append('Dateoflastcolonoscopy', mentext.Dateoflastcolonoscopy);
//     data.append('LocalExamination', Object.keys(LocalExamination).filter(p => LocalExamination[p]).join(','));

//     if (others) {
//         data.append('MedicalHistoryOthers', othersCheckbox);
//     }

//     if (others1) {
//         data.append('FamilyHistoryOthers', othersCheckbox1);
//     }

//     if (other) {
//         data.append('SurgicalHistoryOthers', otherCheckbox);
//     }

//     if (LocalOthers) {
//         data.append('LocalOthersCheckbox', LocalOthersCheckbox);
//     }

//     Axios.post("http://127.0.0.1:8000/IP/Assessment_Details_Link", data)
//         .then((response) => {
//             console.log(response.data);
//             successMsg("Saved Successfully");
//             setgetdatastate(true);
//             // fetchData();
//         })
//         .catch((error) => {
//             console.error("Error saving data: ", error);
//             errmsg("Error saving data.");
//         });
// };


const handleAdd = () => {
  const newAssessmentData = {
      ...AssessmentFormData,
      ...mentext,
      ...GynecHistory,
      ...VitalFormData,
      ...Msp,
      ...Plantars,
      ...LocalExamination,
      ...LocalOthers,
      ...LocalOthersCheckbox,
      ...Textarea3,
  };

  const data = new FormData();

  for (const key in newAssessmentData) {
      data.append(key, newAssessmentData[key]);
  }

  const { PatientId, PatientName, Booking_Id } = IpNurseQueSelectedRow || {};
  const { username: CreatedBy, location: Location } = userRecord || {};
  data.append('PatientId', PatientId);
  data.append('PatientName', PatientName);
  data.append('Booking_Id', Booking_Id);
  data.append('CreatedBy', CreatedBy);
  data.append('Location', Location);
  data.append('isSameAsProvisional', isSameAsProvisional);

  data.append('MedicalHistoryCheckbox', Object.keys(medicalHistory).filter(p => medicalHistory[p]).join(','));
  data.append('SocialHistoryCheckbox', Object.keys(socialHistory).filter(p => socialHistory[p]).join(','));
  data.append('FamilyHistoryCheckbox', Object.keys(familyHistory).filter(p => familyHistory[p]).join(','));
  data.append('RelationShip1', familyHistoryInfo.RelationShip1);
  data.append('SurgicalHistoryCheckbox', Object.keys(SurgicalHistory1).filter(p => SurgicalHistory1[p]).join(','));
  data.append('ListnamesAnddates', patientInfo2.Listnamesdates);
  data.append('womenMenCheckbox', Object.keys(womenMen).filter(p => womenMen[p]).join(','));
  data.append('menCheckbox', Object.keys(men).filter(p => men[p]).join(','));
  data.append('Dateoflastcolonoscopy', mentext.Dateoflastcolonoscopy);
  data.append('LocalExamination', Object.keys(LocalExamination).filter(p => LocalExamination[p]).join(','));

  if (others) {
      data.append('MedicalHistoryOthers', othersCheckbox);
  }

  if (others1) {
      data.append('FamilyHistoryOthers', othersCheckbox1);
  }

  if (other) {
      data.append('SurgicalHistoryOthers', otherCheckbox);
  }

  if (LocalOthers) {
      data.append('LocalOthersCheckbox', LocalOthersCheckbox);
  }

  Axios.post("http://127.0.0.1:8000/IP/Assessment_Details_Link", data)
      .then((response) => {
          console.log(response.data);
          successMsg("Saved Successfully");
          setgetdatastate(true); // Trigger data fetch after successful save
      })
      .catch((error) => {
          console.error("Error saving data: ", error);
          errmsg("Error saving data.");
      });
};

    const successMsg = (msg) => {
      toast.success(msg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: { marginTop: "50px" },
      });
    };
  
    const errmsg = (errorMessage) => {
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: { marginTop: "50px" },
      });
    };
  
    
  
    return (
      
    <>

    <div className="Main_container_app">

    <div className="new-patient-registration-form">
     
     
     <div className="RegisFormcon ffff">
       <div className="RegisForm_2">
         <label htmlFor="PresentingComplaints">(Presenting Complaints)C/O <span>:</span></label>
         <textarea
         id="PresentingComplaints"
         name="PresentingComplaints"
         onChange={handleChange}
         value={AssessmentFormData.PresentingComplaints}
         required
         className="textarea-wide"
       />
       </div>
       
 
       <div className="RegisForm_2">
         <label htmlFor="DetailsPresentingComplaints">Details of Presenting Complaints <span>:</span></label>
         <textarea
         id="DetailsPresentingComplaints"
         name="DetailsPresentingComplaints"
         onChange={handleChange}
         value={AssessmentFormData.DetailsPresentingComplaints}
         required
         className="textarea-wide"
       />
       </div>
 
       <div className="RegisForm_2">
         <label htmlFor="LMP">H/O(history of)<span>:</span></label>
         <textarea
         id="HistoryOf"
         name="HistoryOf"
         onChange={handleChange}
         value={AssessmentFormData.HistoryOf}
         required
         className="textarea-wide"
       />
       </div>
 
       <div className="RegisForm_2">
         <label htmlFor="PatientStatusAtAdmission">Patient Status At Admission<span>:</span></label>
         <textarea
         id="PatientStatusAtAdmission"
         name="PatientStatusAtAdmission"
         onChange={handleChange}
         value={AssessmentFormData.PatientStatusAtAdmission}
         required
         className="textarea-wide"
         />
       </div>
 
     
 
     </div>
 
 {/*................................ Medical History .................................*/}
 
 
 
 
       <div className="Medical_History_container" id="reactprintcontent" >
             
           <div className="form-section5">
               <div className=" dkwjd">
                 <h3>Medical History </h3>
               </div>
               
                 <br/>
                 <br/>
         
             
           {openModal ? <div className="div_ckkkbox_head">
             
             {Object.keys(medicalHistory).map((labelname, indx) => (
           <React.Fragment key={labelname}>
             {indx % 8 === 0 && (
               <div className="div_ckkck_box">
                 {Object.keys(medicalHistory).slice(indx, indx + 8).map((key) => (
                   <label key={key} className="checkbox-label">
                     <input
                       type="checkbox"
                       id={key}
                       className="checkbox-input"
                       checked={medicalHistory[key]}
                       onChange={() => handlemedicalCheckboxChange(key)}
                     />
                     {formatLabel(key)}
                     
                   </label>
                   
                 ))}
               
               </div>
             )}
           </React.Fragment>
             ))}
       
           
               
               </div>:
             <div>
               {selectedMedicalHistory.map((data,index)=>(
                 <ul key={index}>
                   <li>{data}</li>
                 </ul>
               )
 
               )}
             </div>
           }<br/>
                 
                 {openModal ? (
                   <div className="checkbox-label">
                     <label key="others" className="checkbox-label1">
                       <input
                         type="checkbox"
                         id="others"
                         className="checkbox-input"
                         checked={others}
                         onChange={handlemedicalOthersChange}
                         // onChange={(e) => setOthers(e.target.checked)}
                       />
                       <span style={{ marginRight: '8px' }}>Others</span>
                     </label>
                     
                       <textarea
                         id="others-textarea"
                         value={othersCheckbox}
                         onChange={(e) => setOthersCheckbox(e.target.value)}
                         // onChange={handleOthersChange}
                         placeholder="Please specify..."
                         style={{ marginLeft: '8px' }}
                         className="textarea-wide1"
                       />
                     
                   </div>
                 ) : null}
 
             </div>
           
             
 
 
           
             <div className="form-section5">
               <div className=" dkwjd">
                 <h3>Social History </h3>
               
               </div>
               
               <br></br>
               <br/>
               
               
             
             {openModal?  <div className="div_ckkkbox_head sccx3">              
                 <div className="div_ckkck_box alcho_tac_drg11">
                   <div className="ffdff44">
                     <div>
                       <label className="checkbox-label  alcho_tac_drg">
                         {" "}
                         Alcohol use -{" "}
                       </label>
                     </div>
                     <div className="flx_cjk_labl3">
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input ddsfe"
                           checked={socialHistory.alcoholUseNever}
                           onChange={() => {
                             handleCheckboxChange2("alcoholUseNever");
                           }}
                         />
                         Never
                       </label>
                     </div>
 
                     <div className="flx_cjk_labl3">
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input ddsfe"
                           checked={socialHistory.alcoholUseOccasionally}
                           onChange={() => {
                             handleCheckboxChange2("alcoholUseOccasionally");
                           }}
                         />
                         Occasionally
                       </label>
                     </div>
 
                     <div className="flx_cjk_labl3">
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input ddsfe"
                           checked={socialHistory.alcoholUseDaily}
                           onChange={() => {
                             handleCheckboxChange2("alcoholUseDaily");
                           }}
                         />
                         Daily
                       </label>
                     </div>
                   </div>
 
                   <div className="div_ckkck_box alcho_tac_drg11">
                     <div className="ffdff44">
                       <div>
                         <label className="checkbox-label alcho_tac_drg">
                           {" "}
                           Tobacco use -{" "}
                         </label>
                       </div>
                       <div className="flx_cjk_labl3">
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input ddsfe"
                             checked={socialHistory.tobaccoUseNever}
                             onChange={() => {
                               handleCheckboxChange2("tobaccoUseNever");
                             }}
                           />
                           Never
                         </label>
                       </div>
 
                       <div className="flx_cjk_labl3">
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input ddsfe"
                             checked={socialHistory.tobaccoUseOccasionally}
                             onChange={() => {
                               handleCheckboxChange2("tobaccoUseOccasionally");
                             }}
                           />
                           Occasionally
                         </label>
                       </div>
 
                       <div className="flx_cjk_labl3">
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input ddsfe"
                             checked={socialHistory.tobaccoUseDaily}
                             onChange={() => {
                               handleCheckboxChange2("tobaccoUseDaily");
                             }}
                           />
                           Daily
                         </label>
                       </div>
                     </div>
                   </div>
 
                   <div className="div_ckkck_box alcho_tac_drg11">
                     <div className="ffdff44">
                       <div>
                         <label className="checkbox-label alcho_tac_drg">
                           {" "}
                           Smoking use -{" "}
                         </label>
                       </div>
                       <div className="flx_cjk_labl3">
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input ddsfe"
                             checked={socialHistory.SmokingUseNever}
                             onChange={() => {
                               handleCheckboxChange2("SmokingUseNever");
                             }}
                           />
                           Never
                         </label>
                       </div>
 
                       <div className="flx_cjk_labl3">
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input ddsfe"
                             checked={socialHistory.SmokingUseOccasionally}
                             onChange={() => {
                               handleCheckboxChange2("SmokingUseOccasionally");
                             }}
                           />
                           Occasionally
                         </label>
                       </div>
 
                       <div className="flx_cjk_labl3">
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input ddsfe"
                             checked={socialHistory.SmokingUseDaily}
                             onChange={() => {
                               handleCheckboxChange2("SmokingUseDaily");
                             }}
                           />
                           Daily
                         </label>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>:  
                   <div>
               {selectedSocialHistory.map((data,index)=>(
                 <ul key={index}>
                   <li>{data}</li>
                 </ul>
               )
 
               )}
                 </div>}
     
               <div className="form-section5">
                 <div className=" dkwjd">
                   <h3>Family History </h3>
                 
                 </div>
               
                 <br></br>
                 <br/>
                 {openModal? <div className="div_ckkkbox_head">
                   <div className="div_ckkck_box">
                     <label className="checkbox-label">
                       <input
                         type="checkbox"
                         className="checkbox-input"
                         checked={familyHistory.CancerPolyps}
                         onChange={() => handleCheckboxChange3("CancerPolyps")}
                       />
                       Cancer/Polyps
                     </label>
 
                     <label className="checkbox-label">
                       <input
                         type="checkbox"
                         className="checkbox-input"
                         checked={familyHistory.Anemia1}
                         onChange={() => handleCheckboxChange3("Anemia1")}
                       />
                       Anemia
                     </label>
 
                     <label className="checkbox-label">
                       <input
                         type="checkbox"
                         className="checkbox-input"
                         checked={familyHistory.Diabetes1}
                         onChange={() => handleCheckboxChange3("Diabetes1")}
                       />
                       Diabetes
                     </label>
 
                     <label className="checkbox-label">
                       <input
                         type="checkbox"
                         className="checkbox-input"
                         checked={familyHistory.BloodClots1}
                         onChange={() => handleCheckboxChange3("BloodClots1")}
                       />
                       Blood Clots
                     </label>
                   </div>
 
                   <div className="div_ckkck_box">
                     <label className="checkbox-label">
                       <input
                         type="checkbox"
                         className="checkbox-input"
                         checked={familyHistory.HeartDisease1}
                         onChange={() => handleCheckboxChange3("HeartDisease1")}
                       />
                       Heart Disease
                     </label>
 
                     <label className="checkbox-label">
                       <input
                         type="checkbox"
                         className="checkbox-input"
                         checked={familyHistory.Stroke1}
                         onChange={() => handleCheckboxChange3("Stroke1")}
                       />
                       Stroke
                     </label>
                     <label className="checkbox-label">
                       <input
                         type="checkbox"
                         className="checkbox-input"
                         checked={familyHistory.HighBloodPressure1}
                         onChange={() =>
                           handleCheckboxChange3("HighBloodPressure1")
                         }
                       />
                       High Blood Pressure
                     </label>
                     <label className="checkbox-label">
                       <input
                         type="checkbox"
                         className="checkbox-input"
                         checked={familyHistory.AnesthesiaReaction1}
                         onChange={() =>
                           handleCheckboxChange3("AnesthesiaReaction1")
                         }
                       />
                       Anesthesia Reaction
                     </label>
                   </div>
 
                   <div className="div_ckkck_box">
                     <label className="checkbox-label">
                       <input
                         type="checkbox"
                         className="checkbox-input"
                         checked={familyHistory.BleedingProblems1}
                         onChange={() =>
                           handleCheckboxChange3("BleedingProblems1")
                         }
                       />
                       Bleeding Problems
                     </label>
 
                     <label className="checkbox-label">
                       <input
                         type="checkbox"
                         className="checkbox-input"
                         checked={familyHistory.Hepatitis1}
                         onChange={() => handleCheckboxChange3("Hepatitis1")}
                       />
                       Hepatitis
                     </label>
 
                     <label className="checkbox-label">
                       <input
                         type="checkbox"
                         className="checkbox-input"
                         checked={familyHistory.Tb}
                         onChange={() => handleCheckboxChange3("Tb")}
                       />
                       TB
                     </label>
 
                     <label className="checkbox-label">
                       <input
                         type="checkbox"
                         className="checkbox-input"
                         checked={familyHistory.SkinDisease}
                         onChange={() => handleCheckboxChange3("SkinDisease")}
                       />
                       Skin Disease
                     </label>
 
                   
                   </div>
                   
                 </div>:        <div>
               {selectedFamilyHistory.map((data,index)=>(
                 <ul key={index}>
                   <li>{data}</li>
                 </ul>
               )
 
               )}
               
                 </div>}<br/>
                 {openModal ? (
                     <div className="checkbox-label ">
                     <label key="others1"  className="checkbox-label1 " >
                             <input
                                 type="checkbox"
                                 id="others1"
                                 className="checkbox-input"
                                 checked={others1}
                                 onChange={handleOthersChange1}
                                 //  onChange={(e) => setOthers1(e.target.checked)}
                             />
                             <span style={{ marginRight: '8px' }}>Others</span>
                             
                     </label>
                     
                             <textarea
                                 id="others-textarea1"
                                 value={othersCheckbox1}
                                 onChange={(e) => setOthersCheckbox1(e.target.value)}
                                 //  onChange={handleOthersChange1}
                                 placeholder="Please specify..."
                                 style={{ marginLeft: '8px' }}
                                 className="textarea-wide1"
                             />
                             
 
                     </div>
                 ):null}
                 
                 <br/>
 
                 <div className="form-section56">
                   
                   <label className="form-field56">
                     {" "}
                     Relationship :
                     <input
                       type="text"
                       name="RelationShip1"
                       value={familyHistoryInfo.RelationShip1}
                       onChange = {handleInputWomenChange}
                     />
                   </label>
                 </div>
                 <br></br>
               
               </div>
             </div>
             {/* <div className="Register_btn_con">
           
                 <button className="RegisterForm_1_btns print-button3" onClick={handlePrintSave }>Print</button>
             </div> */}
       </div>
 
 {/*................................ Medical History end .................................*/}
 
 
 {/*................................ Surgical History .................................*/}
 
     <div className="Medical_History_container" id="reactprintcontent">
         
 
        
       
         <div className="form-section5">
           <div className=" dkwjd">
             <h3>Surgical History </h3>
           </div>
           <div className="form-section5">
             <div className=" dkwjd">
               
             </div>
           </div>
           <br></br>
           {openModal ? (
             <div className="div_ckkkbox_head">
               {Object.keys(SurgicalHistory1).map((labelname, indx) => (
                 <React.Fragment key={labelname}>
                   {indx % 7 === 0 && (
                     <div className="div_ckkck_box">
                       {Object.keys(SurgicalHistory1)
                         .slice(indx, indx + 7)
                         .map((key) => (
                           <label key={key} className="checkbox-label">
                             <input
                               type="checkbox"
                               id={key}
                               className="checkbox-input"
                               checked={SurgicalHistory1[key]}
                               onChange={() => handleSurgicalCheckboxChange(key)}
                               
                             />
                             {formatLabel(key)}
                           </label>
                         ))}
                     </div>
                   )}
                 </React.Fragment>
                 
               ))}
              
             </div>
           ) : (
             <div>
               {SurgicalHistory1.length > 0 ? (
                 <div>
                   <h5>Personal Surgical History</h5>
                   <br />
                   <ul>
                     {SurgicalHistory1.map((data, index) => (
                       <li key={index}>{data}</li>
                     ))}
                   </ul>
                 </div>
               ) : (
                 <div>No surgical history </div>
               )}
             </div>
           )}
         </div><br/>
         {openModal ? (
           <div className="checkbox-label ">
                     <label key="other"  className="checkbox-label1 " >
                             <input
                                 type="checkbox"
                                 id="other"
                                 className="checkbox-input"
                                 checked={other}
                                 onChange={handleOtherChange2}
                                 // onChange={(e) => setOther(e.target.checked)}
                             />
                             <span style={{ marginRight: '8px' }}>Others</span>
                             
                     </label>
                     
                             <textarea
                                 id="others-textarea"
                                 value={otherCheckbox}
                                 onChange={(e) => setOtherCheckbox(e.target.value)}
                                 // onChange={handleOthersChange}
                                 placeholder="Please specify..."
                                 style={{ marginLeft: '8px' }}
                                 className="textarea-wide1"
                             />
                             
 
               </div>
         ):null}
               
 
         <br></br>
 
         <div className="txtare_div_surgical_head">
           <div className="txtare_div_surgical">
             <label> Names and Date of Surgeries :</label>
             <textarea
               name="Listnamesdates"
               value={patientInfo2.Listnamesdates}
               onChange={handleInputChange12}
             ></textarea>
           </div>
 
          
         </div>
         <br></br>
         <div>
   <div className="form-section5">
     <div className="dkwjd">
       <h3>Cancer Health Habits</h3>
     </div>
     <br />
 
     <div className="health-habits-container">
       <div className="women-section">
         {printMode ? (
           <div className="print-page">
             <div className="Medical_History_container" id="reactprintcontent">
               <div className="women_head_men">
                 <div className="div_ckkkbox_head women_chk_box">
                   <h5 className="aaa">Women</h5>
                   <br />
                   <div className="w99jdid_head">
                     <div className="div_ckkck_box w99jdid">
                       <div className="weedcvt65_head">
                         <label>Breast :</label>
                       </div>
                       <div className="weedcvt65">
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input"
                             checked={womenMen["Monthlyselfexam"]}
                             onChange={() =>
                               handleCheckboxChangeWomenMen("Monthlyselfexam")
                             }
                           />
                           Monthly self-exam
                         </label>
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input"
                             checked={womenMen["Yearlyphysicianexam"]}
                             onChange={() =>
                               handleCheckboxChangeWomenMen("Yearlyphysicianexam")
                             }
                           />
                           Yearly physician-exam
                         </label>
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input"
                             checked={womenMen["Lastmammogram"]}
                             onChange={() =>
                               handleCheckboxChangeWomenMen("Lastmammogram")
                             }
                           />
                           Last mammogram
                         </label>
                       </div>
                     </div>
                     <div className="div_ckkck_box w99jdid">
                       <div className="weedcvt65_head">
                         <label>GYN :</label>
                       </div>
                       <div className="weedcvt65">
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input"
                             checked={womenMen["YearlyGYNexam"]}
                             onChange={() =>
                               handleCheckboxChangeWomenMen("YearlyGYNexam")
                             }
                           />
                           Yearly GYN exam
                         </label>
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input"
                             checked={womenMen["YearlyPAPexam"]}
                             onChange={() =>
                               handleCheckboxChangeWomenMen("YearlyPAPexam")
                             }
                           />
                           Yearly PAP exam
                         </label>
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input"
                             checked={womenMen["Lastmammogram2"]}
                             onChange={() =>
                               handleCheckboxChangeWomenMen("Lastmammogram2")
                             }
                           />
                           Last mammogram
                         </label>
                       </div>
                     </div>
                     <div className="div_ckkck_box w99jdid">
                       <div className="weedcvt65_head">
                         <label>Skin :</label>
                       </div>
                       <div className="weedcvt65">
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input"
                             checked={womenMen["Highsunexposure"]}
                             onChange={() =>
                               handleCheckboxChangeWomenMen("Highsunexposure")
                             }
                           />
                           High sun exposure
                         </label>
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input"
                             checked={womenMen["Yearlyskinexam"]}
                             onChange={() =>
                               handleCheckboxChangeWomenMen("Yearlyskinexam")
                             }
                           />
                           Yearly skin exam
                         </label>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         ) : (
           <div className="text_fr_surgcl_0">
             <div className="women_head_men">
               <div className="div_ckkkbox_head women_chk_box">
                 <h5 className="aaa">Women</h5>
                 <br />
                 <div className="w99jdid_head">
                   <div className="div_ckkck_box w99jdid">
                     <div className="weedcvt65_head">
                       <label>Breast :</label>
                     </div>
                     <div className="weedcvt65">
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input"
                           checked={womenMen["Monthlyselfexam"]}
                           onChange={() =>
                             handleCheckboxChangeWomenMen("Monthlyselfexam")
                           }
                         />
                         Monthly self-exam
                       </label>
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input"
                           checked={womenMen["Yearlyphysicianexam"]}
                           onChange={() =>
                             handleCheckboxChangeWomenMen("Yearlyphysicianexam")
                           }
                         />
                         Yearly physician-exam
                       </label>
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input"
                           checked={womenMen["Lastmammogram"]}
                           onChange={() =>
                             handleCheckboxChangeWomenMen("Lastmammogram")
                           }
                         />
                         Last mammogram
                       </label>
                     </div>
                   </div>
                   <div className="div_ckkck_box w99jdid">
                     <div className="weedcvt65_head">
                       <label>GYN :</label>
                     </div>
                     <div className="weedcvt65">
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input"
                           checked={womenMen["YearlyGYNexam"]}
                           onChange={() =>
                             handleCheckboxChangeWomenMen("YearlyGYNexam")
                           }
                         />
                         Yearly GYN exam
                       </label>
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input"
                           checked={womenMen["YearlyPAPexam"]}
                           onChange={() =>
                             handleCheckboxChangeWomenMen("YearlyPAPexam")
                           }
                         />
                         Yearly PAP exam
                       </label>
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input"
                           checked={womenMen["Lastmammogram2"]}
                           onChange={() =>
                             handleCheckboxChangeWomenMen("Lastmammogram2")
                           }
                         />
                         Last mammogram
                       </label>
                     </div>
                   </div>
                   <div className="div_ckkck_box w99jdid">
                     <div className="weedcvt65_head">
                       <label>Skin :</label>
                     </div>
                     <div className="weedcvt65">
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input"
                           checked={womenMen["Highsunexposure"]}
                           onChange={() =>
                             handleCheckboxChangeWomenMen("Highsunexposure")
                           }
                         />
                         High sun exposure
                       </label>
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input"
                           checked={womenMen["Yearlyskinexam"]}
                           onChange={() =>
                             handleCheckboxChangeWomenMen("Yearlyskinexam")
                           }
                         />
                         Yearly skin exam
                       </label>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )}
       </div>
 
       <div className="men-section">
         {printMode ? (
           <div className="print-page">
             <div className="Medical_History_container" id="reactprintcontent">
               <div className="women_head_men">
                 <div className="div_ckkkbox_head women_chk_box">
                   <h5 className="aaa">Men</h5>
                   <br />
                   <div className="w99jdid_head">
                     <div className="div_ckkck_box w99jdid">
                       <div className="weedcvt65_head">
                         <label>Prostate :</label>
                       </div>
                       <div className="weedcvt65">
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input"
                             name="Yearlyrectalexam"
                             checked={men["Yearlyrectalexam"]}
                             onChange={(e) => handleCheckboxChangeMen("Yearlyrectalexam", e)}
                           />
                           Yearly rectal exam
                         </label>
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input"
                             name="YearlyPSAbloodtest"
                             checked={men["YearlyPSAbloodtest"]}
                             onChange={(e) => handleCheckboxChangeMen("YearlyPSAbloodtest", e)}
                           />
                           Yearly PSA blood test
                         </label>
                       </div>
                     </div>
                     <div className="div_ckkck_box w99jdid">
                       <div className="weedcvt65_head">
                         <label>Colon :</label>
                       </div>
                       <div className="weedcvt65">
                         <label className="checkbox-label">
                           <input
                             type="checkbox"
                             className="checkbox-input"
                             name="Yearlyrectalexam2"
                             checked={men["Yearlyrectalexam2"]}
                             onChange={(e) => handleCheckboxChangeMen("Yearlyrectalexam2", e)}
                           />
                           Yearly rectal exam
                         </label>
                         <label className="checkbox-label">
                             <input
                               type="checkbox"
                               className="checkbox-input"
                               name="Yearlystooltestforblood"
                               checked={men.Yearlystooltestforblood}
                               onChange={(e) =>
                                 handleCheckboxChangeMen(
                                   "Yearlystooltestforblood", e
                                 )
                               }
                             />
                             Yearly stool test for blood
                           </label>
                         <label className="checkbox-label">
                           Date of last colonoscopy :
                           <input
                             type="text"
                             className="checkbox-input iojiu7"
                             name="Dateoflastcolonoscopy"
                             readOnly={!men.Yearlystooltestforblood}
                             value={men.Dateoflastcolonoscopy}
                             onChange={(e) => handleCheckboxChangeMen("Dateoflastcolonoscopy", e)}
                           />
                         </label>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         ) : (
           <div className="text_fr_surgcl_0">
               {/* //...............jeeva */}
             <div className="women_head_men">
               <div className="div_ckkkbox_head women_chk_box">
                 <h5 className="aaa">Men</h5>
                 <br />
                 <div className="w99jdid_head">
                   <div className="div_ckkck_box w99jdid">
                     <div className="weedcvt65_head">
                       <label>Prostate :</label>
                     </div>
                     <div className="weedcvt65">
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input"
                           name="Yearlyrectalexam"
                           checked={men["Yearlyrectalexam"]}
                           onChange={(e) => handleCheckboxChangeMen("Yearlyrectalexam", e)}
                         />
                         Yearly rectal exam
                       </label>
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input"
                           name="YearlyPSAbloodtest"
                           checked={men["YearlyPSAbloodtest"]}
                           onChange={(e) => handleCheckboxChangeMen("YearlyPSAbloodtest", e)}
                         />
                         Yearly PSA blood test
                       </label>
                     </div>
                   </div>
                   <div className="div_ckkck_box w99jdid">
                     <div className="weedcvt65_head">
                       <label>Colon :</label>
                     </div>
                     <div className="weedcvt65">
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input"
                           name="Yearlyrectalexam2"
                           checked={men["Yearlyrectalexam2"]}
                           onChange={(e) => handleCheckboxChangeMen("Yearlyrectalexam2", e)}
                         />
                         Yearly rectal exam
                       </label>
                       <label className="checkbox-label">
                         <input
                           type="checkbox"
                           className="checkbox-input"
                           name="Yearlystooltestforblood"
                           checked={men.Yearlystooltestforblood}
                           onChange={(e) => handleCheckboxChangeMen("Yearlystooltestforblood", e)}
                         />
                         Yearly stool test for blood
                       </label>
                       <label className="checkbox-label">
                         Date of last colonoscopy :
                         <input
                           type="text"
                           className="checkbox-input iojiu7"
                           name="Dateoflastcolonoscopy"
                           // readOnly={men.Dateoflastcolonoscopy}
                           value={mentext.Dateoflastcolonoscopy}
                           onChange={handleInputChangeMen}
                         />
                       </label>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )}
       </div>
     </div>
   </div>
 </div>
 
 {/*................................ Surgical History .................................*/}
 
 
 
 
 {/*................................ Gynec History .................................*/}
 
   <div className="new-patient-registration-form">
     <div className="form-section5">
       <div className=" dkwjd">
           <h3>Gynec History</h3>
       </div><br/>
 
       
       <div className="RegisFormcon">
           
           <div className="RegisForm_1">
             <label htmlFor="LMP">LMP <span>:</span></label>
             <input
               type="date"
               id="LMP"
               name="Lmp"
               onChange={handleGynecChange}
               value={GynecHistory.Lmp}
               required
             />
           </div>
     
           <div className="RegisForm_1">
             <label htmlFor="Noofpregnancies">No.of Pregnancies <span>:</span></label>
             <input
               type="number"
               id="Noofpregnancies"
               name="NoOfPregnancies"
               onChange={handleGynecChange}
               value={GynecHistory.NoOfPregnancies}
               required
             />
           </div>
     
           
     
           <div className="RegisForm_1">
             <label htmlFor="Noofdeliveries">No.of Deliveries <span>:</span></label>
             <input
               type="number"
               id="Noofdeliveries"
               name="NoOfDeliveries"
               onChange={handleGynecChange}
               value={GynecHistory.NoOfDeliveries}
               required
             />
           </div>
     
           <div className="RegisForm_1">
             <label htmlFor="vaginal">Vaginal <span>:</span></label>
             <input
               type="text"
               id="vaginal"
               name="Vaginal"
               onChange={handleGynecChange}
               value={GynecHistory.Vaginal}
               required
             />
           </div>
     
         
           <div className="RegisForm_1">
             <label htmlFor="csection">C-Section <span>:</span></label>
             <input
               type="text"
               id="csection"
               name="Csection"
               onChange={handleGynecChange}
               value={GynecHistory.Csection}
               required
             />
           </div>
     
     
           <div className="RegisForm_1">
             <label htmlFor="Miscarriage">Miscarriage <span>:</span></label>
             <input
               type="number"
               id="Miscarriage"
               name="MisCarriage"
               onChange={handleGynecChange}
               value={GynecHistory.MisCarriage}
               required
             />
           </div>
     
           <div className="RegisForm_1">
             <label htmlFor="Vipabortions">VIPs(Abortion)<span>:</span></label>
             <input
               type="number"
               id="Vipabortions"
               name="VipAbortions"
               onChange={handleGynecChange}
               value={GynecHistory.VipAbortions}
               required
             />
           </div>
     
           
           
     
       </div>
     </div>
   </div>
 
 {/*................................ Gynec History end  .................................*/}
 
 
     
 
         
     </div>
 
     <div className="RegisFormcon ffff">
       <div className="RegisForm_2">
         <label htmlFor="allergies">Allergies<span>:</span></label>
         <textarea
         id="allergies"
         name="Allergies"
         onChange={handleChange}
         value={AssessmentFormData.Allergies}
         required
         className="textarea-wide"
       />
       </div>
      
     </div>
    
 
     <div className="Medical_History_container" id="reactprintcontent" >
       <div className="form-section5">
           <div className=" dkwjd">
             <h3>O/E(on examination) </h3>
           </div> <br/>
 
           <div className="new-patient-registration-form">
         <div className="RegisFormcon">
           {Object.keys(VitalFormData).map((labelname, index) => (
             <div className="RegisForm_1" key={index}>
               <label>
                 {formatLabel(labelname)}  <span>:</span>
               </label>
               { (
                 <input
                   type={labelname === "CapturedDate" ? "date" : labelname === "Time" ? "time":  "number"}
                   name={labelname}
                   onKeyDown={blockInvalidChar}
                   // placeholder={`Enter the ${formatLabel(labelname)}`}
                   value={VitalFormData[labelname]}
                   readOnly={labelname === "CapturedDate"}
                   onChange={handleInputChange}
                 />
               ) }
             </div>
           ))}
         </div>
         
     </div>
 
       <div className="Medical_History_container" id="reactprintcontent" >
         <div className="form-section5">
             <div className=" dkwjd">
               <h3>S/E (systemicexamination) </h3>
             </div>
             <br/>
             <div>
               <h4>CVS :</h4>
             </div><br/>
 
               <div className="RegisForm_2">
                 <textarea
                       id="CVS"
                       name="Cvs"
                       onChange={handleChange}
                       value={AssessmentFormData.Cvs}
                       required
                       className="textarea-wide"
                 />
 
               </div><br/>
 
               
               <div>
                 <h5>Pupil :</h5>
               </div><br/>
 
               <div className="RegisForm_2">
               
                 <textarea
                       id="pupil"
                       name="Pupil"
                       onChange={handleChange}
                       value={AssessmentFormData.Pupil}
                       required
                       className="textarea-wide"
                 />
 
               </div><br/>
 
              <div>
                <div className="Medical_History_container" id="mspContainer">
                  <div>
                    <h5>MSP :</h5>
                  </div>
                  <table border="1">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Rt</th>
                        <th>Lt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>UL</td>
                        <td>
                          <input
                            type="number"
                            id="Ul_RT"
                            name="UlRt"
                            value={Msp.UlRt}
                            onChange={(e) => handleMspChange('Msp', 'UlRt', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            id="Ul_LT"
                            name="UlLt"
                            value={Msp.UlLt}
                            onChange={(e) => handleMspChange('Msp', 'UlLt', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>LL</td>
                        <td>
                          <input
                            type="number"
                            id="Ll_Rt"
                            name="LlRt"
                            value={Msp.LlRt}
                            onChange={(e) => handleMspChange('Msp', 'LlRt', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            id="Ll_Lt"
                            name="LlLt"
                            value={Msp.LlLt}
                            onChange={(e) => handleMspChange('Msp', 'LlLt', e.target.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="Medical_History_container" id="plantarsContainer">
                  <div>
                    <h5>Plantars:</h5>
                  </div>
                  <table border="1">
                    <thead>
                      <tr>
                        <th>Rt</th>
                        <th>Lt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="number"
                            name="Rt"
                            value={Plantars.Rt}
                            onChange={(e) => handleMspChange('Plantars', 'Rt', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="Lt"
                            value={Plantars.Lt}
                            onChange={(e) => handleMspChange('Plantars', 'Lt', e.target.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

             <br/>
             <div>
               <h4>RS :</h4>
             </div><br/>
 
               <div className="RegisForm_2">
                 <textarea
                       id="RS"
                       name="Rs"
                       onChange={handleChange}
                       value={AssessmentFormData.Rs}
                       required
                       className="textarea-wide"
                 />
 
               </div><br/>
 
               
             <div>
               <h4>P/A :</h4>
             </div><br/>
 
               <div className="RegisForm_2">
                 <textarea
                       id="PA"
                       name="Pa"
                       onChange={handleChange}
                       value={AssessmentFormData.Pa}
                       required
                       className="textarea-wide"
                 />
 
               </div><br/>
 
               
             <div>
               <h4>CNS :</h4>
             </div><br/>
 
               <div className="RegisForm_2">
                 <textarea
                       id="CNS"
                       name="Cns"
                       onChange={handleChange}
                       value={AssessmentFormData.Cns}
                       required
                       className="textarea-wide"
                 />
 
               </div><br/>
 
 
              
 
 
         </div>
       </div>
 
 
       </div>
     </div>
 
 
     
           
 {/*................................ Surgical History end .................................*/}
          
 
 {/*................................ L/E Local Examination .................................*/}
 
 
 
 <div className="Medical_History_container" id="reactprintcontent">
       <div className="form-section5">
         <div className="dkwjd">
           <h3>L/E (local examination)</h3>
         </div>
         <div className="form-section5">
           <div className="dkwjd"></div>
         </div>
         <br />
         {openModal ? (
           <div className="div_ckkkbox_head">
             {Object.keys(LocalExamination).map((labelname, indx) => (
               <React.Fragment key={labelname}>
                 {indx % 2 === 0 && (
                   <div className="div_ckkck_box">
                     {Object.keys(LocalExamination)
                       .slice(indx, indx + 2)
                       .map((key) => (
                         <label key={key} className="checkbox-label">
                           <input
                             type="checkbox"
                             id={key}
                             className="checkbox-input"
                             checked={LocalExamination[key]}
                             onChange={() => handleCheckboxChange1(key)}
                           />
                           {formatLabel(key)}
                         </label>
                       ))}
                   </div>
                 )}
               </React.Fragment>
             ))}
           </div>
         ) : (
           <div>
             {Object.values(LocalExamination).some((value) => value) ? (
               <div>
                 <h5>L/E Local Examination</h5>
                 <br />
                 <ul>
                   {Object.keys(LocalExamination)
                     .filter((key) => LocalExamination[key])
                     .map((key, index) => (
                       <li key={index}>{formatLabel(key)}</li>
                     ))}
                 </ul>
               </div>
             ) : (
               <div>No L/E</div>
             )}
           </div>
         )}
       </div><br/>
       {openModal ? (
         <div className="checkbox-label">
           <label key="LocalOthers" className="checkbox-label1">
             <input
               type="checkbox"
               id="LocalOthers"
               className="checkbox-input"
               checked={LocalOthers}
               onChange={() => handleCheckboxChange1('LocalOthers')}
             />
             <span style={{ marginRight: '8px' }}>Others</span>
           </label>
           
             <textarea
               id="others-textarea"
               value={LocalOthersCheckbox}
               onChange={(e) => setLocalOthersCheckbox(e.target.value)}
               placeholder="Please specify..."
               style={{ marginLeft: '8px' }}
               className="textarea-wide1"
             />
           
         </div>
       ) : null}
     </div>
 
 
 
 
 
 {/*................................ L/E Local Examination end .................................*/}
 
 
 {/*................................ Progress notes .................................*/}
 
 
 {/* <div >
           <div className=" dkwjd">
             <h3>Progress Notes </h3>
           </div>
       <div className="RegisForm_1">
         <label htmlFor="FirstName">
           Primary Doctor <span>:</span>
         </label>
         <span className="dctr_wrbvh_pice" htmlFor="FirstName">
           {`${IpNurseQueSelectedRow?.PrimaryDoctor}`}
         </span>
       </div>
       <div className="form-section5">
         <div className="form-field5">
           <label htmlFor="notes">
             Progress Notes <span>:</span>
           </label>
           <textarea
             id="notes"
             name="notes"
             value={notes}
             onChange={handleNotesChange}
             maxLength={1000}
             readOnly={!showTextarea || !isSaveButton}
           />
         </div>
       </div>
       <div className="form-section5">
         <div className="form-field5">
           <label htmlFor="treatmentNotes">
             Treatment Notes <span>:</span>
           </label>
           <textarea
             id="treatmentNotes"
             name="treatmentNotes"
             value={treatmentNotes}
             onChange={handleTreatmentNotesChange}
             maxLength={1000}
             readOnly={!showTextarea || !isSaveButton}
           />
         </div>
       </div>
       <div className="Main_container_Btn">
         {isSaveButton ? (
           <button
             className="RegisterForm_1_btns print-button3"
             onClick={handlePrintSave}
           >
             Save
           </button>
         ) : (
           <button
             className="RegisterForm_1_btns print-button3"
             onClick={handleNewButtonClick}
           >
             New
           </button>
         )}
       </div>
       <div className="IP_grid">
         <ThemeProvider theme={theme}>
           <div className="IP_grid_1">
             <DataGrid
               rows={filteredRows.slice(page * pageSize, (page + 1) * pageSize)} // Display only the current page's data
               columns={dynamicColumns1} // Use dynamic columns here
               pageSize={pageSize}
               onPageChange={(params) => handlePageChange(params)}
               hideFooterPagination
               hideFooterSelectedRowCount
               className="Ip_data_grid"
             />
             {filteredRows.length > 10 && (
               <div className="grid_foot">
                 <button
                   onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
                   disabled={page === 0}
                 >
                   Previous
                 </button>
                 Page {page + 1} of {totalPages}
                 <button
                   onClick={() =>
                     setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
                   }
                   disabled={page === totalPages - 1}
                 >
                   Next
                 </button>
               </div>
             )}
           </div>
         </ThemeProvider>
         {filteredRows.length === 0 && (
           <div className="IP_norecords">
             <span>No Records Found</span>
           </div>
         )}
       </div>
       <ToastContainer />
 </div>
  */}
 
 {/*................................ Progress notes end .................................*/}
 
 
 {/*................................ Provisional & Final Diagnosis & treatment given .................................*/}
 <br/>
 
 <div>
       <div className="form-section5">
         <div className="form-field5">
           <label htmlFor="ProvisionalDiagnosis">
             Provisional Diagnosis <span>:</span>
           </label>
           <textarea
             id="ProvisionalDiagnosis"
             name="ProvisionalDiagnosis"
             value={Textarea3.ProvisionalDiagnosis}
             onChange={handleNotesChange1}
             maxLength={1000}
           />
         </div>
       </div>
 
       <div className="form-section5">
         <div className="form-field5">
           <input
             type="checkbox"
             id="sameAsProvisional"
             checked={isSameAsProvisional}
             onChange={handleCheckboxChange4}
           />
           <label htmlFor="sameAsProvisional">
             Same as Provisional Diagnosis
           </label>
         </div>
         
         <div className="form-field5">
           <label htmlFor="FinalDiagnosis">
             Final Diagnosis <span>:</span>
           </label>
           <textarea
             id="FinalDiagnosis"
             name="FinalDiagnosis"
             value={Textarea3.FinalDiagnosis}
             onChange={handleNotesChange1}
             maxLength={1000}
             readOnly={isSameAsProvisional}
           />
         </div>
       </div>
 
       <div className="form-section5">
         <div className="form-field5">
           <label htmlFor="TreatmentGiven">
             Treatment Given <span>:</span>
           </label>
           <textarea
             id="TreatmentGiven"
             name="TreatmentGiven"
             value={Textarea3.TreatmentGiven}
             onChange={handleNotesChange1}
             maxLength={1000}
           />
         </div>
       </div>
     </div>
 
 {/*................................ Provisional & Final Diagnosis  & treatment given  end .................................*/}
 
     <div className="Main_container_Btn">
       <button className="RegisterForm_1_btns" onClick={handleAdd}>Add</button>
     </div>
 
    
   </div>

    </div>
  
  
   
  </>
  
  
    );
  
}

export default ICU_Assesment;