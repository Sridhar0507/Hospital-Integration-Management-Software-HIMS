import React, { useState, useRef, useEffect } from "react";

// import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import ToastAlert from "../../src/OtherComponent/ToastContainer/ToastAlert";
import { differenceInYears } from "date-fns";
import { useReactToPrint } from "react-to-print";
// import './Employeeconcern.css'
// import Select from 'react-select';
import ModelContainer from "../../src/OtherComponent/ModelContainer/ModelContainer";
import male from "../Assets/profileimg.jpeg";
import female from "../Assets/profileimg.jpeg";
import { useDispatch } from "react-redux";

const medicalConditionsOptions = [
  { value: "Fits", label: "Fits" },
  { value: "Epilepsy", label: "Epilepsy" },
  { value: "Asthma", label: "Asthma" },
  { value: "DM", label: "DM" },
  { value: "HT", label: "HT" },
  { value: "IHD", label: "IHD" },
];

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

const EmployeeRegister = () => {
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const isSidebarOpen = useSelector((state) => state.userRecord?.isSidebarOpen);
  const urllink = useSelector((state) => state.userRecord?.UrlLink);
  const foremployeeedit = useSelector(
    (state) => state.userRecord?.foremployeeedit
  );
  const [SelectedFile, setSelectedFile] = useState(null);
  const [SpecialitiesData, setSpecialitiesData] = useState([]);
  const webcamRef1 = useRef(null);
  const Navigate = useNavigate();
  const dispatchvalue = useDispatch();
  const [expanded, setExpanded] = useState("panel1");
  const [showFile, setShowFile] = useState({ file1: false });
  const [isImageCaptured1, setIsImageCaptured1] = useState(false);
  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);
  const componentRef = useRef();
  const [ClinicDetails, setClinicDetails] = useState({});
  const [clinicLogo, setClinicLogo] = useState(null);
  const [editmode, seteditmode] = useState(false);
  const [rollname, setrollname] = useState([]);
  const [location, setlocation] = useState([]);
  const [department, setdepartment] = useState([]);
  const [errors, setErrors] = useState({});
  const [facingMode, setFacingMode] = useState("user");
  const devices = ["iPhone", "iPad", "Android", "Mobile", "Tablet", "desktop"];
  const [IsmobileorNot, setIsmobileorNot] = useState(null);
  const [selection4, setselection4] = useState("No");
  const [selection3, setSelection3] = useState("No");

  useEffect(() => {
    axios
      .get(`${urllink}usercontrol/getClinic?location=${userRecord?.location}`)
      // console.log(response.data)
      .then((response) => {
        const record = response.data[0];
        if (record) {
          setClinicDetails(record);
        } else {
          console.error("No clinic details found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get(`${urllink}usercontrol/getAccountsetting`)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          const firstClinic = response.data;
          setClinicLogo(`data:image/*;base64,${firstClinic.clinicLogo}`);
        } else {
          console.error("No record found");
        }
      })
      .catch((error) => console.error("Error fetching data"));
  }, [urllink]); // Empty dependency array ensures this effect runs only once

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [employeepersonal, setemployeepersonal] = useState({
    Title: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    DOB: "",
    Age: "",
    Gender: "",
    Email: "",
    Qualification: "",
    MartialStatus: "",
    AadharNumber: "",
    PhoneNumber: "",
    AlternatePhone: "",
    CommunicationAddress: "",
    PermanentAddress: "",
    Nationality: "",
    Reference1Name: "",
    Reference2Name: "",
    BloodGroup: "",

    MarriagePlan: "",
    Reference1No: "",
    Reference2No: "",
    FatherHusbandName: "",
    FamilybackgroundDetails: "",
    NomineeNamewithrelation: "",
    Father_or_HusbandWife_Work: "",
    Pre_Disease_orOperation: "",
    MedicalCondition: [],
    PreviousWorkExperience: "",
    Reasonforleft: "",
    FormerworkstationDetails: "",
    NativePlace: "",
    MenstrualProblem: "No",
    MenstrualProblemRemarks: "No",
    PsychiatricMedicines: "No",
    PsychiatricMedicinesRemarks: "No",
  });

  const [employeeroll, setemployeeroll] = useState({
    Department: "",
    Post: "",
    Specialist: "",
    SrNumber: "",
    MciNumber: "",
    Locations: "",
    DateOfJoining: "",
    ProbationPeriod: "",
    ProbationPeriodRemarks: "",
    InductionTrainingGivenby: "",
    InductionTrainingCheckby: "",
    FornursingStaffMedicalCheckup: "",
    SickLeave: "",
    CasualLeave: "",
    TotalLeave: "",
    Status: "",
    Manager: "",
  });

  const [employeefinance, setemployeefinance] = useState({
    SalaryType: "",
    PayScale: "",
    PerHour: "",
    Commission: "",
    FixedAmount: "",
    CommissionAmount: "",
    Remarks: "",
    TravelAllowance: "",
    HRAllowance: "",
    MedicalAllowance: "",
    esiamount: "",
    SecurityDeposit: "",
  });

  const [employeebank, setemployeebank] = useState({
    AccountName: "",
    AccountNumber: "",
    BankName: "",
    Branch: "",
    IfscCode: "",
    PanNumber: "",
  });

  const [formData, setFormData] = useState({
    EPFnumber: "",
    UANnumber: "",
    EPFActivationDate: "",
  });

const [choosefile,setChooseFile] = useState({
    PanCard: null,
    AdhaarCard: null,
    QualificationDocuments: null,
    Relivingletter: null,
    Bankpassbook: null,
    EmployeeConsentForm: null,
})

  console.log(employeepersonal);

  const handlePersonalChange12 = (e) => {
    const { name, value, files, pattern } = e.target;

    if (name === "DOB") {
      const newDate = new Date();
      const oldDate = new Date(value);
      const age = differenceInYears(newDate, oldDate);

      setemployeepersonal((prevData) => ({
        ...prevData,
        [name]: value,
        age: age,
      }));
    } else if (name === "photo") {
      // If user selects an employee photo, update the state directly
      setemployeepersonal((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else if (name === "gender" && value) {
      let defaultPhotoFile = null;

      const defaultPhotoPath = value === "male" ? male : female;

      // Fetch the default photo file
      fetch(defaultPhotoPath)
        .then((response) => response.blob()) // Convert response to blob
        .then((blob) => {
          // Create a File object from the blob
          defaultPhotoFile = new File([blob], `${value}_captured_image.jpg`, {
            type: "image/jpeg",
          });

          // Update formData with the File object
          setemployeepersonal((prevData) => ({
            ...prevData,
            [name]: value,
            photo: defaultPhotoFile,
          }));
        })
        .catch((error) => {
          console.error("Error fetching default photo:", error);
        });
    } else {
      if (
        name === "alternatePhone" ||
        name === "phone" ||
        name === "reference1No" ||
        name === "reference2No"
      ) {
        const newval = value.length;
        if (newval <= 10) {
          setemployeepersonal((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        } else {
          alert("Phone No must contain 10 digits");
        }
      } else if (
        (name === "CapturedFile123" ||
          name === "CapturedFile1" ||
          name === "CapturedFile2" ||
          name === "CapturedFile3" ||
          name === "CapturedFile4" ||
          name === "CapturedFile5" ||
          name === "PanCard" ||
          name === "AdhaarCard" ||
          name === "QualificationDocuments" ||
          name === "Relivingletter" ||
          name === "Bankpassbook" ||
          name === "EmployeeConsentForm") &&
        files.length > 0
      ) {
        // Access the file object itself
        const fileObject = files[0];

        setemployeepersonal((prevData) => ({
          ...prevData,
          [name]: fileObject,
        }));
      } else if (name === "aadharnumber") {
        const newval = value.length;
        if (newval <= 12) {
          setemployeepersonal((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
        if (newval === 12 && !/^\d{12}$/.test(value)) {
          alert("Aadhaar number must be exactly 12 digits.");
        }
      } else {
        setemployeepersonal((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }

    const validateField = (value, pattern) => {
      if (!value) {
        return "Required";
      }
      if (pattern && !new RegExp(pattern).test(value)) {
        return "Invalid";
      } else {
        return "Valid";
      }
    };

    const error = validateField(value, pattern);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleRollChange12 = (e) => {
    const { name, value, files, pattern } = e.target;
    setemployeeroll((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const validateField = (value, pattern) => {
      if (!value) {
        return "Required";
      }
      if (pattern && !new RegExp(pattern).test(value)) {
        return "Invalid";
      } else {
        return "Valid";
      }
    };

    const error = validateField(value, pattern);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleFinanaceChange12 = (e) => {
    const { name, value, files, pattern } = e.target;
    setemployeefinance((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const validateField = (value, pattern) => {
      if (!value) {
        return "Required";
      }
      if (pattern && !new RegExp(pattern).test(value)) {
        return "Invalid";
      } else {
        return "Valid";
      }
    };

    const error = validateField(value, pattern);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleBankChange12 = (e) => {
    const { name, value,pattern } = e.target;
    setemployeebank((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const validateField = (value, pattern) => {
      if (!value) {
        return "Required";
      }
      if (pattern && !new RegExp(pattern).test(value)) {
        return "Invalid";
      } else {
        return "Valid";
      }
    };

    const error = validateField(value, pattern);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange12 = (e) => {
 const {name,value} = e.target;


  };

  const handleSelectionChange3 = (e) => {
    setSelection3(e.target.value);
    if (e.target.value == "No") {
      setemployeepersonal((prevFormData) => ({
        ...prevFormData,
        MenstrualProblem: "No",
      }));
    } else if (e.target.value == "Yes") {
      setemployeepersonal((prevFormData) => ({
        ...prevFormData,
        MenstrualProblem: "",
      }));
    }
  };

  const handleSelectionChange4 = (e) => {
    setselection4(e.target.value);
    if (e.target.value == "No") {
      setemployeepersonal((prevFormData) => ({
        ...prevFormData,
        PsychiatricMedicines: "No",
      }));
    } else if (e.target.value == "Yes") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        PsychiatricMedicines: "",
      }));
    }
  };

  const handleChangemedicalcondition = (selectedOptions) => {
    console.log(selectedOptions);
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    setemployeepersonal((prevData) => ({
      ...prevData,
      MedicalCondition: selectedValues.join(","),
    }));
  };

  useEffect(() => {
    // Use an axios request within useEffect to avoid infinite rendering
    axios
      .get(`${urllink}patientmanagement/detect_device`)
      .then((response) => {
        setIsmobileorNot(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  useEffect(() => {
    axios
      .get(
        `${urllink}HRmanagement/getRole_bydept?department=${formData.department}`
      )
      .then((response) => {
        setrollname(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${urllink}usercontrol/getlocationdata`)
      .then((response) => {
        setlocation(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${urllink}usercontrol/getDepartment`)
      .then((response) => {
        setdepartment(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userRecord?.location, formData.department, formData.ctc]);

  useEffect(() => {
    fetchSurgerydeptData();
  }, []);

  const fetchSurgerydeptData = () => {
    axios
      .get(`${urllink}usercontrol/getsurgerydept`)
      .then((response) => {
        const data = response.data;
        setSpecialitiesData(data.filter((p) => p.Status === "Active"));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const base64toFile = (base64String, fileName, mimeType) => {
    if (!base64String) {
      console.error("base64String is undefined or null.");
      return null;
    }

    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const paddedBase64String = base64String + padding;

    try {
      const byteString = atob(paddedBase64String);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: mimeType });
      return new File([blob], fileName, { type: mimeType });
    } catch (error) {
      console.error("Error decoding base64 string:", error);
      return null;
    }
  };

  useEffect(() => {
    if (foremployeeedit && foremployeeedit.length > 0) {
      seteditmode(true);
      const updatedFormData = { ...(foremployeeedit[0] || "") };

      updatedFormData.photo = base64toFile(
        foremployeeedit[0].photo,
        "captured_image.jpg",
        "image/jpeg"
      );
      updatedFormData.CapturedFile123 = base64toFile(
        foremployeeedit[0]?.CapturedFile123 || "",
        "sign.pdf",
        "application/pdf"
      );
      updatedFormData.CapturedFile1 = base64toFile(
        foremployeeedit[0]?.CapturedFile1 || "",
        "file1.pdf",
        "application/pdf"
      );
      updatedFormData.CapturedFile2 = base64toFile(
        foremployeeedit[0]?.CapturedFile2 || "",
        "file2.pdf",
        "application/pdf"
      );
      updatedFormData.CapturedFile3 = base64toFile(
        foremployeeedit[0]?.CapturedFile3 || "",
        "file3.pdf",
        "application/pdf"
      );
      updatedFormData.CapturedFile4 = base64toFile(
        foremployeeedit[0]?.CapturedFile4 || "",
        "file4.pdf",
        "application/pdf"
      );
      updatedFormData.CapturedFile5 = base64toFile(
        foremployeeedit[0]?.CapturedFile5 || "",
        "file5.pdf",
        "application/pdf"
      );
      updatedFormData.PanCard = base64toFile(
        foremployeeedit[0]?.PanCard || "",
        "PanCard.pdf",
        "application/pdf"
      );
      updatedFormData.AdhaarCard = base64toFile(
        foremployeeedit[0]?.AdhaarCard || "",
        "AdhaarCard.pdf",
        "application/pdf"
      );

      updatedFormData.QualificationDocuments = base64toFile(
        foremployeeedit[0]?.QualificationDocuments || "",
        "QualificationDocuments.pdf",
        "application/pdf"
      );

      updatedFormData.Relivingletter = base64toFile(
        foremployeeedit[0]?.Relivingletter || "",
        "Relivingletter.pdf",
        "application/pdf"
      );

      updatedFormData.Bankpassbook = base64toFile(
        foremployeeedit[0]?.Bankpassbook || "",
        "Bankpassbook.pdf",
        "application/pdf"
      );

      updatedFormData.EmployeeConsentForm = base64toFile(
        foremployeeedit[0]?.EmployeeConsentForm || "",
        "EmployeeConsentForm.pdf",
        "application/pdf"
      );

      updatedFormData.createdby = userRecord?.username;
      updatedFormData.branchlocation = userRecord?.location;

      if (foremployeeedit.MenstrualProblem === "No") {
        setSelection3("No");
      } else {
        setselection4("Yes");
      }

      if (foremployeeedit.PsychiatricMedicines === "No") {
        setSelection3("No");
      } else {
        setselection4("Yes");
      }

      setFormData(updatedFormData);
    } else {
      axios
        .get(
          `${urllink}HRmanagement/get_employee_Id?location=${userRecord?.location}`
        )
        .then((response) => {
          setFormData((prevData) => ({
            ...prevData,
            employeeId: response.data.nextemployeeid,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [foremployeeedit]);


  const handleinpchangeDocumentsForm = (e) => {
    const { name, files } = e.target;

    // Ensure that files exist and are not empty
    if (files && files.length > 0) {
      let formattedValue = files[0];

      // Optional: Add validation for file type and size
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"]; // Example allowed types
      const maxSize = 5 * 1024 * 1024; // Example max size of 5MB
      console.log(formattedValue);
      console.log(formattedValue.type);
      if (
        !allowedTypes.includes(formattedValue.type) ||
        formattedValue.type === ""
      ) {
        // Dispatch a warning toast or handle file type validation
        const tdata = {
          message: "Invalid file type. Please upload a PDF, JPEG, or PNG file.",
          type: "warn",
        };
        dispatchvalue({ type: "toast", value: tdata });
      } else {
        if (formattedValue.size > maxSize) {
          // Dispatch a warning toast or handle file size validation
          const tdata = {
            message: "File size exceeds the limit of 5MB.",
            type: "warn",
          };
          dispatchvalue({ type: "toast", value: tdata });
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            setChooseFile((prev) => ({
              ...prev,
              [name]: reader.result,
            }));
          };
          reader.readAsDataURL(formattedValue);
        }
      }
    } else {
      // Handle case where no file is selected
      const tdata = {
        message: "No file selected. Please choose a file to upload.",
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  };

  const buttonText =
    foremployeeedit && foremployeeedit.length > 0 ? "Update" : "Register";

  const handleRegister = () => {
    // Create a FormData object
    const formData1 = new FormData();

    // Append data to FormData object
    Object.keys(formData).forEach((key) => {
      formData1.append(key, formData[key]);
    });

    // Make the axios request
    axios
      .post(`${urllink}HRmanagement/insert_Employee_Register`, formData1)
      .then((response) => {
        const resData = response.data;
        const type = Object.keys(resData)[0];
        const message = Object.values(resData)[0];
        const tdata = {
          message: message,
          type: type,
        };
        dispatchvalue({ type: "toast", value: tdata });
        setTimeout(() => {
          Navigate("/Home/Employee-List");
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [salaryType, setSalaryType] = useState("fixed");

  const handleSalaryTypeChange = (e) => {
    setSalaryType(e.target.value);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleChangeSickLeave = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      sickLeave: value,
      totalLeave: calculateTotalLeave(value, prevData.casualLeave),
    }));
  };

  const handleChangeCasualLeave = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      casualLeave: value,
      totalLeave: calculateTotalLeave(prevData.sickLeave, value),
    }));
  };

  const calculateTotalLeave = (sickLeave, casualLeave) => {
    const sickLeaveValue = parseInt(sickLeave) || 0;
    const casualLeaveValue = parseInt(casualLeave) || 0;
    return sickLeaveValue + casualLeaveValue;
  };
  const Selectedfileview = (fileval) => {
    console.log("fileval", fileval);
    if (fileval) {
      let tdata = {
        Isopen: false,
        content: null,
        type: "image/jpg",
      };
      if (
        ["data:image/jpeg;base64", "data:image/jpg;base64"].includes(
          fileval?.split(",")[0]
        )
      ) {
        tdata = {
          Isopen: true,
          content: fileval,
          type: "image/jpeg",
        };
      } else if (fileval?.split(",")[0] === "data:image/png;base64") {
        tdata = {
          Isopen: true,
          content: fileval,
          type: "image/png",
        };
      } else if (fileval?.split(",")[0] === "data:application/pdf;base64") {
        tdata = {
          Isopen: true,
          content: fileval,
          type: "application/pdf",
        };
      }

      dispatchvalue({ type: "modelcon", value: tdata });
    } else {
      const tdata = {
        message: "There is no file to view.",
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(null);
    const { name } = event.target;
    setSelectedFile(event.target.files[0]);

    // Additional handling based on the name attribute
    if (name === "Personal") {
      // Handle Service file
    } else if (name === "Roll") {
    } else if (name === "Finance") {
    } else if (name === "Bank") {
    } else if (name === "EPF") {
    } else if (name === "Documents") {
    }
  };

  const handleCsvupload = (type) => {
    const formData = new FormData();
    formData.append("file", SelectedFile);

    if (SelectedFile) {
      if (type === "Personal") {
        axios
          .post(
            `${urllink}HRmanagement/post_personaldetails_csvfile`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((response) => {
            alert("File Processed Successfully");
            setSelectedFile(null);
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (type === "Roll") {
        axios
          .post(
            `${urllink}HRmanagement/post_rollmanagement_csvfile`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((response) => {
            alert("File Processed Successfully");

            setSelectedFile(null);
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (type === "Finance") {
        axios
          .post(
            `${urllink}HRmanagement/post_financedetails_csvfile`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((response) => {
            alert("File Processed Successfully");

            setSelectedFile(null);
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (type === "Bank") {
        axios
          .post(`${urllink}HRmanagement/post_bankdetails_csvfile`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            alert("File Processed Successfully");

            setSelectedFile(null);
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (type === "EPF") {
        axios
          .post(`${urllink}HRmanagement/post_epfdetails_csvfile`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            alert("File Processed Successfully");

            setSelectedFile(null);
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (type === "Documents") {
        axios
          .post(
            `${urllink}HRmanagement/post_documentsdetails_csvfile`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((response) => {
            alert("File Processed Successfully");

            setSelectedFile(null);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const handlePrint2 = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: async () => {
      // Additional action after printing, if needed
    },
  });

  const handleprint = () => {
    setIsPrintButtonVisible(false);
    setTimeout(() => {
      handlePrint2();
      setIsPrintButtonVisible(true); // Resetting print button visibility
    }, 500); // Adjust delay as needed
  };

  const formatLabel = (label) => {
    if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
      return label
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (str) => str.toUpperCase());
    } else {
      return label;
    }
  };

  return (
    <div className="Main_container_app">
      <h3>New Employee Register</h3>
      {isPrintButtonVisible ? (
        <>
          <div className="common_center_tag">
            <span>Personal Details</span>
          </div>
          <div className="RegisFormcon_1">
            {Object.keys(employeepersonal).map((field, indx) => (
              <div key={indx} className="RegisForm_1">
                <label htmlFor={`${field}_${indx}_${field}`}>
                  {formatLabel(field)} <span>:</span>
                </label>

                {[
                  "Title",
                  "Nationality",
                  "Gender",
                  "MartialStatus",
                  "PreferredModeOfCommunication",
                  "BloodGroup",
                ].includes(field) ? (
                  <select
                    name={field}
                    required
                    id={`${field}_${indx}_${field}`}
                    value={employeepersonal[field]}
                    onChange={handlePersonalChange12}
                  >
                    <option value="">Select</option>
                    {field === "Title" &&
                      ["Dr", "Mr", "Ms", "Mrs"].map((p, index) => (
                        <option key={index} value={p}>
                          {p}
                        </option>
                      ))}
                    {field === "Nationality" &&
                      ["Indian", "International"].map((p, index) => (
                        <option key={index} value={p}>
                          {p}
                        </option>
                      ))}
                    {field === "Gender" &&
                      ["Male", "Female", "TransGender"].map((p, index) => (
                        <option key={index} value={p}>
                          {p}
                        </option>
                      ))}
                    {field === "MartialStatus" &&
                      ["Married", "Divorced", "Widow", "Seperated"].map(
                        (p, index) => (
                          <option key={index} value={p}>
                            {p}
                          </option>
                        )
                      )}
                    {field === "PreferredModeOfCommunication" &&
                      ["Email", "Call", "Whatsapp", "Post"].map((p, index) => (
                        <option key={index} value={p}>
                          {p}
                        </option>
                      ))}
                    {field === "BloodGroup" &&
                      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (p, index) => (
                          <option key={index} value={p}>
                            {p}
                          </option>
                        )
                      )}
                  </select>
                ) : field === "CommunicationAddress" ||
                  field === "PermanentAddress" ||
                  field === "formerworkstationdetails" ||
                  field === "MarriagePlan" ||
                  field === "Previousworkexperience" ||
                  field === "Reasonforleft" ||
                  field === "Pre_disease_or_operation" ||
                  field === "MenstrualProblemRemarks" ||
                  field === "PsychiatricMedicinesRemarks" ? (
                  <textarea
                    name={field}
                    id={`${field}_${indx}_${field}`}
                    value={employeepersonal[field]}
                    onChange={handlePersonalChange12}
                    className={
                      errors[field] === "Invalid"
                        ? "invalid"
                        : errors[field] === "Valid"
                        ? "valid"
                        : ""
                    }
                    disabled={
                      (field === "MenstrualProblemRemarks" &&
                        employeepersonal.MenstrualProblem === "No") ||
                      (field === "PsychiatricMedicinesRemarks" &&
                        employeepersonal.MenstrualProblem === "No")
                    }
                  />
                ) : field === "MedicalCondition" ? (
                  <>
                    {/* <Select
                      isMulti
                      className="weerftgvadsajok"
                      onChange={handleChangemedicalcondition}
                      options={medicalConditionsOptions}
                      name="MedicalCondition"
                    /> */}
                  </>
                ) : field === "MenstrualProblem" ||
                  field === "PsychiatricMedicines" ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "150px",
                      }}
                    >
                      <label style={{ width: "60px", cursor: "pointer" }}>
                        <input
                          id={`${field}_${indx}_${field}_Yes`}
                          type="radio"
                          name={field}
                          value="Yes"
                          style={{ width: "15px" }}
                          checked={employeepersonal[field] === "Yes"}
                          onChange={(e) => {
                            setemployeepersonal((prevState) => ({
                              ...prevState,
                              [field]: "Yes",
                            }));
                            // Clear remarks field when selecting Yes
                            if (field === "MenstrualProblem") {
                              setemployeepersonal((prevState) => ({
                                ...prevState,
                                MenstrualProblemRemarks: "",
                              }));
                            } else if (field === "PsychiatricMedicines") {
                              setemployeepersonal((prevState) => ({
                                ...prevState,
                                PsychiatricMedicinesRemarks: "",
                              }));
                            }
                          }}
                        />
                        Yes
                      </label>
                      <label style={{ width: "60px", cursor: "pointer" }}>
                        <input
                          id={`${field}_${indx}_${field}_No`}
                          type="radio"
                          name={field}
                          value="No"
                          style={{ width: "15px" }}
                          checked={employeepersonal[field] === "No"}
                          onChange={(e) => {
                            setemployeepersonal((prevState) => ({
                              ...prevState,
                              [field]: "No",
                            }));
                            // Set remarks field to No when selecting No
                            if (field === "MenstrualProblem") {
                              setemployeepersonal((prevState) => ({
                                ...prevState,
                                MenstrualProblemRemarks: "No",
                              }));
                            } else if (field === "PsychiatricMedicines") {
                              setemployeepersonal((prevState) => ({
                                ...prevState,
                                PsychiatricMedicinesRemarks: "No",
                              }));
                            }
                          }}
                        />
                        No
                      </label>
                    </div>
                  </>
                ) : (
                  <input
                    type={
                      ["DOB"].includes(field)
                        ? "date"
                        : [
                            "PhoneNumber",
                            "AlternatePhone",
                            "Reference1No",
                            "Reference2No",
                          ].includes(field)
                        ? "number"
                        : field === "Email"
                        ? "email"
                        : "text"
                    }
                    name={field}
                    required
                    pattern={
                      field === "Email"
                        ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                        : [
                            "PhoneNumber",
                            "AlternatePhone",
                            "Reference1No",
                            "Reference2No",
                          ].includes(field)
                        ? "\\d{10}"
                        : ["CommunicationAddress", "PermanentAddress"].includes(
                            field
                          )
                        ? "[A-Za-z0-9]+"
                        : field === "Age"
                        ? "[0-9]\\d{0,3}"
                        : ["DOB"].includes(field)
                        ? ""
                        : "[A-Za-z]+"
                    }
                    onKeyDown={(e) =>
                      [
                        "PhoneNumber",
                        "AlternatePhone",
                        "Reference1No",
                        "Reference2No",
                        "Age",
                      ].includes(field) &&
                      ["e", "E", "+", "-"].includes(e.key) &&
                      e.preventDefault()
                    }
                    id={`${field}_${indx}_${field}`}
                    autoComplete="off"
                    value={employeepersonal[field]}
                    onChange={handlePersonalChange12}
                    readOnly={field === "Title"}
                    className={
                      errors[field] === "Invalid"
                        ? "invalid"
                        : errors[field] === "Valid"
                        ? "valid"
                        : ""
                    }
                  />
                )}
              </div>
            ))}
          </div>

          <div className="common_center_tag">
            <span>Roll Management</span>
          </div>

          <div className="RegisFormcon_1">
            {Object.keys(employeeroll).map((field, index) => (
              <div key={index} className="RegisForm_1">
                <label htmlFor={`${field}_${index}_${field}`}>
                  {formatLabel(field)} <span>:</span>
                </label>
                {["Department", "Post", "locations", "Status"].includes(
                  field
                ) ? (
                  <select
                    name={field}
                    required
                    id={`${field}_${index}_${field}`}
                    value={employeeroll[field]}
                    onChange={handleRollChange12}
                  >
                    <option value="">Select</option>
                    {field === "Department" &&
                      department.map((p, index) => (
                        <option key={p.Dept_id} value={p.Department_name}>
                          {p.Department_name}
                        </option>
                      ))}
                    {field === "Post" &&
                      rollname.map((r, idx) => (
                        <option key={r.role_id} value={r.role_name}>
                          {r.role_name}
                        </option>
                      ))}
                    {field === "Locations" &&
                      location.map((l, idx) => (
                        <option key={l.location_id} value={l.location_name}>
                          {l.location_name}
                        </option>
                      ))}
                    {field === "Status" &&
                      ["Active", "Inactive"].map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                ) : field === "ProbationPeriodRemarks" ? (
                  <textarea
                    name={field}
                    id={`${field}_${index}_${field}`}
                    value={employeeroll[field]}
                    onChange={handleRollChange12}
                    className={
                      errors[field] === "Invalid"
                        ? "invalid"
                        : errors[field] === "Valid"
                        ? "valid"
                        : ""
                    }
                  />
                ) : (
                  <input
                    type={field === "DateOfJoining" ? "date" : "text"}
                    name={field}
                    id={`${field}_${index}_${field}`}
                    value={employeeroll[field]}
                    onChange={handleRollChange12}
                    className={
                      errors[field] === "Invalid"
                        ? "invalid"
                        : errors[field] === "Valid"
                        ? "valid"
                        : ""
                    }
                  />
                )}
              </div>
            ))}
          </div>

          <div className="common_center_tag">
            <span>Finance Details</span>
          </div>

          <div className="RegisFormcon_1">
            {Object.keys(employeefinance).map((field, index) => (
              <div key={index} className="RegisForm_1">
                <label htmlFor={`${field}_${index}_${field}`}>
                  {formatLabel(field)} <span>:</span>
                </label>
                {["SalaryType", "PayScale"].includes(field) ? (
                  <select
                    name={field}
                    required
                    id={`${field}_${index}_${field}`}
                    value={employeefinance[field]}
                    onChange={handleFinanaceChange12}
                  >
                    <option value="">Select</option>
                    {field === "SalaryType" && (
                      <>
                        <option value="Fixed">Fixed</option>
                        <option value="Hourly">Hourly</option>
                        <option value="Commission">commission</option>
                      </>
                    )}
                    {field === "PayScale" && (
                      <>
                        <option value="EntryLevel">Entry Level</option>
                        <option value="MidLevel">Mid Level</option>
                        <option value="SeniorLevel">Senior Level</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type="number"
                    name={field}
                    id={`${field}_${index}_${field}`}
                    value={employeefinance[field]}
                    onChange={handleFinanaceChange12}
                    className={
                      errors[field] === "Invalid"
                        ? "invalid"
                        : errors[field] === "Valid"
                        ? "valid"
                        : ""
                    }
                  />
                )}
              </div>
            ))}
          </div>

          <div className="common_center_tag">
            <span>Bank Details</span>
          </div>
          <br />

          <div className="RegisFormcon_1">

          {Object.keys(employeebank).map((field, index) => (
  <div key={index} className="RegisForm_1">
    <label htmlFor={`${field}_${index}_${field}`}>
      {formatLabel(field)} <span>:</span>
    </label>

    <input
      type={field === "AccountNumber" ? "number" : "text"}
      name={field}
      id={`${field}_${index}_${field}`}
      value={employeebank[field]}
      onKeyDown={
        field === "AccountNumber" 
          ? (e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
          : null
      }
      onChange={handleBankChange12}
    />
  </div>
))}


       
          </div>

          <br />
          <div className="common_center_tag">
            <span>EPF Details</span>
          </div>
          <br />
          <div className="RegisFormcon_1">

          {Object.keys(formData).map((field, index) => (
  <div key={index} className="RegisForm_1">
    <label htmlFor={`${field}_${index}_${field}`}>
      {formatLabel(field)} <span>:</span>
    </label>

    <input
      type={field === "EPFActivationDate" ? "date" : "text"}
      name={field}
      id={`${field}_${index}_${field}`}
      value={formData[field]}
      onChange={handleChange12}
    />
  </div>
))}
            

         
          </div>

          <br />
          <div className="common_center_tag">
            <span>Documents Details</span>
          </div>
          <br />
         
          <div className="RegisFormcon_1">
          {Object.keys(choosefile).map((field, indx) => (
            <div className="RegisForm_1" key={indx}>
              <label htmlFor={`${field}_${indx}_${field}`}>
                {" "}
                {formatLabel(field)} <span>:</span>{" "}
              </label>
              <input
                type="file"
                name={field}
                accept="image/jpeg, image/png,application/pdf"
                required
                id={`${field}_${indx}_${field}`}
                autoComplete="off"
                onChange={handleinpchangeDocumentsForm}
                style={{ display: "none" }}
              />
              <div
                style={{
                  width: "150px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <label
                  htmlFor={`${field}_${indx}_${field}`}
                  className="RegisterForm_1_btns choose_file_update"
                >
                  Choose File
                </label>
                <button
                  className="fileviewbtn"
                  onClick={() => Selectedfileview(choosefile[field])}
                >
                  view
                </button>
              </div>
            </div>
          ))}
        </div>

          <br />
          <div></div>
          <br />
          <div className="Register_btn_con">
            <button className="RegisterForm_1_btns" onClick={handleRegister}>
              {buttonText}
            </button>
            <ToastContainer />
            <button className="RegisterForm_1_btns" onClick={handleprint}>
              Print
            </button>
          </div>
        </>
      ) : (
        <PrintContent
          ref={componentRef}
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="" id="reactprintcontent">
            <div className="paymt-fr-mnth-slp">
              <div className="logo-pay-slp">
                <img src={clinicLogo} alt="Medical logo" />
              </div>
              <div className="new_billing_address_1 ">
                <span cstyle={{ fontWeight: "bold" }}>
                  {ClinicDetails.concern_name}
                </span>
                {/* <div>
                 <span className="dkjfiuw6">{ClinicDetails.door_no},</span>
                </div> */}
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    {ClinicDetails.door_no +
                      "," +
                      ClinicDetails.street +
                      "," +
                      ClinicDetails.area +
                      "," +
                      ClinicDetails.city +
                      "," +
                      ClinicDetails.state +
                      "-" +
                      ClinicDetails.pincode}
                  </span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    {ClinicDetails.phone_no + " , "}
                  </span>
                  {/*  <span style={{fontWeight: 'bold'}}>{ClinicDetails.ClinicLandLineNo + ' , '}</span> */}
                  <span style={{ fontWeight: "bold" }}>
                    {ClinicDetails.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="concernxyz1234">
              <table className="Employeeconcern10926">
                <tbody className="ldldooii">
                  <tr>
                    <th>
                      <label>Name</label>
                    </th>
                    <th className="colon">:</th>
                    <td>
                      {formData?.name +
                        " " +
                        formData?.middlename +
                        " " +
                        formData?.fatherName}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label>Father/Husband Name</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.Father_HusbandName}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Permanent Address</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.permanentAddress}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Current Address</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.communicationAddress}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Contact No</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.phone}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Contact C/O Num With Name</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{`${formData?.reference1No} / ${formData.reference1}`}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Native Place</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.NativePlace}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Date of birth</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.dob}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Education</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.qualification}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Maritial Status</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.maritalStatus}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Family Background Details</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.Familybackgrounddetails}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Father/Husband/Wife Work</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.Father_or_Husband_or_Wife_Work}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Nominee With Relation</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.NomineeNamewithrelation}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Pre Existing disease/Any operation</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.predisease_or_operation}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Medical Condition</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.MedicalCondition}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Menstrual problem / Psychiatric medicines</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{`${formData?.MenstrualProblem}  / ${formData?.PsychiatricMedicines}`}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Joining Date</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.dateOfJoining}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Post / Department</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{`${formData?.designation} / ${formData?.department}`}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Salary</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.ctc} LPA</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Probation Period</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.ProbationPeriod}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Induction training Given By</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.inductiontrainingivenby}</td>
                  </tr>
                  <tr>
                    <th>
                      <label>Induction training Check By</label>
                    </th>
                    <th className="colon">:</th>
                    <td>{formData?.inductiontrainingcheckby}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                paddingBottom: "15px",
              }}
            >
              Consent From Employee
            </h4>

            <div className="concern_text_and_labels">
              <p>
                The above furnished details are true to my Knowledge. And I
                _________________________ have read and understand the joining
                protocols
              </p>
            </div>

            <br />
            <div className="concernsign1234">
              <table className="Emplodjcyec7">
                <tbody>
                  <tr className="ddcddsxdd">
                    <th>
                      Date<span>:</span>
                    </th>
                    <th>
                      Sign<span>:</span>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      Place<span>:</span>
                    </th>
                    <th>
                      Approved By<span>:</span>
                    </th>
                  </tr>
                </tbody>
              </table>
              <ModelContainer />
              <ToastAlert Message={toast.message} Type={toast.type} />
            </div>
          </div>
        </PrintContent>
      )}
    </div>
  );
};

export default EmployeeRegister;
