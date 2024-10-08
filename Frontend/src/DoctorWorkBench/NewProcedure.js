import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Webcam from "react-webcam";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import Preview from "./Preview";
import EditNoteIcon from "@mui/icons-material/EditNote";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";


const NewProcedure = () => {
  const workbenchformData = useSelector(
    (state) => state.userRecord?.workbenchformData
  );
  // console.log("workbenchformData",workbenchformData);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const urllink = useSelector((state) => state.userRecord?.UrlLink);
  const [formValues, setFormValues] = useState({
    Index: null,
    DoctorName: "",
    ProcedureName: "",
    Sessions: "",
    IsComplementry:"",
    Complementry: "",
    ComplementrySessions: "",
    appointmentDate: "",
    PatientID: "",
    VisitID: "",
    createdBy: "",
    Status: "Pending",
    branchlocation: "",
    KitName: "",
    ServiceType: "Procedure",
  });


  console.log("formValues",formValues);


  const [ProcedureName, setProcedureName] = useState([]);
  const [ProcedureData, setProcedureData] = useState([]);
  const [openModal2, setOpenModal2] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const isSidebarOpen = useSelector((state) => state.userRecord?.isSidebarOpen);
  const [getprocedure, setgetprocedure] = useState(false);
  const navigate = useNavigate();


  const [getStockid_Name,setgetStockid_Name]=useState([])


  // ------------------------------------------

  const [SelectedProcedure, setSelectedProcedure] = useState([]);


  const [FormTreatprocedure, setFormTreatprocedure] = useState({
    PatientID: "",
    VisitID: "",
    AppointmentDate: "",
    TherapistName: "",
    TreatmentProcedure: "",
    NextAppointment: "",
    Sessions: "",
    CompletedSessions: "",
    currentsession: "",
    AdditionalComments: "",
    GraftCount: "",
    Complementry: "",
  });


  const [Ratecard, setRatecard] = useState({
    RatecardType: "",
    InsuranceName: "",
    ClientName: "",
  });

  const [StatusSelectedProcedure, setStatusSelectedProcedure] = useState([]);
  const [showCamera1, setShowCamera1] = useState(false);
  const [isCameraImageCaptured1, setIsCameraImageCaptured1] = useState(false);
  const [capturedImage1, setCapturedImage1] = useState(null);

  const [showCamera2, setShowCamera2] = useState(false);
  const [isCameraImageCaptured2, setIsCameraImageCaptured2] = useState(false);
  const [capturedImage2, setCapturedImage2] = useState(null);
  const webcamRef = useRef(null);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);

  const [facingMode, setFacingMode] = useState("user");
  const devices = ["iPhone", "iPad", "Android", "Mobile", "Tablet", "desktop"];
  const [IsmobileorNot, setIsmobileorNot] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openImageView, setopenImageView] = useState(false);
  const [modalContent2, setModalContent2] = useState('');

  const yourStyles={
    position: 'absolute',
    inset: '100px',
    border: '1px solid rgb(204, 204, 204)',
    background: 'rgb(97 90 90 / 75%)',
    overflow: 'auto',
    borderRadius: '4px',
    outline: 'none',
    padding: '0px'
  }


  const successMsg = (msg) => {
    toast.success(`${msg}`, {
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
  const userwarn = (warningMessage) => {
    toast.warn(`${warningMessage}`, {
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


  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent2('');
  };

  const openModal = (content) => {
    setModalContent(content);
    setOpenModal2(true);
  };

  useEffect(() => {
    axios
      .get(
        `${urllink}doctorsworkbench/get_procedurename_fromratecard?location=${userRecord?.location}`
      )
      .then((response) => {
        setProcedureName(response.data);

        console.log("lololkkkk",response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setFormValues((prev) => ({
      ...prev,
      DoctorName: workbenchformData?.DoctorName,
      PatientID: workbenchformData?.PatientID,
      createdBy: userRecord?.username,
      VisitID: workbenchformData?.visitNo,
      PatientID: workbenchformData?.PatientID,
      branchlocation: userRecord?.location,
    }));
  }, [userRecord?.location]);


  const getitemName =()=>{
        const location = userRecord?.location;
        const ItemType ="KIT"
        axios
          .get(`${urllink}doctorsworkbench/get_Medical_ProductMaster_data_forKit?location=${location}&ItemType=${ItemType}`)
          .then((response) => {
            setgetStockid_Name(response.data);
          })
          .catch((error) => {
            console.error(error);
        });
  }

  useEffect(()=>{
    getitemName()
  },[userRecord?.location])


  const handleonchange = (e) => {
    const { name, value } = e.target;

    if (name === "ProcedureName") {
      const getSdata=ProcedureName.find((ele)=>ele.ProcedureName === value)

      const AnsCond = getSdata?.isComplimentary ==="True"? "Yes":"No"
      

      if (value.split("-")[0].includes("HT")) {
        setFormValues((prev) => ({
          ...prev,
          [name]: value,
          Sessions:"",
          IsComplementry:AnsCond,
          Complementry: AnsCond ==="Yes"? getSdata?.ComplimentaryName : "",
          ComplementrySessions:AnsCond ==="Yes"? getSdata?.SessenCounts : "",
        }));
      } else {
        setFormValues((prev) => ({
          ...prev,
          [name]: value,
          Sessions: 0,
          IsComplementry:AnsCond,
          Complementry: AnsCond ==="Yes"? getSdata?.ComplimentaryName : "",
          ComplementrySessions:AnsCond ==="Yes"? getSdata?.SessenCounts : "",
        }));
      }
    } 
    
    else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const Addprocedure = () => {
    let requiredFields = ["ProcedureName","IsComplementry"];
    
    if (formValues.IsComplementry === "Yes") {
      requiredFields.push("Complementry", "ComplementrySessions")
    }else if (formValues.ProcedureName.split("-")[0]?.includes("GFC")) {
      requiredFields.push("Sessions", "KitName")
    }else if (!formValues.ProcedureName.split("-")[0]?.includes("HT")) {
      requiredFields.push("Sessions")
    }
    

    const existingItem = requiredFields.filter((field) => !formValues[field]);

    if (existingItem.length === 0) {
      const alreadyexist = ProcedureData.find(
        (p) => p.ProcedureName === formValues.ProcedureName
      );
      const lengthval = ProcedureData.length + 1;
      if (!alreadyexist) {
        setProcedureData((prev) => [
          ...prev,
          { ...formValues, Index: lengthval },
        ]);
      } else {
        alert("Procedure Already Exist");
      }
      setFormValues((prev) => ({
        ...prev,
        Index: null,
        ProcedureName: "",
        Sessions: "",
        Complementry: "",
        IsComplementry:"",
        Complementry:"",
        ComplementrySessions:"",
        appointmentDate: "",
        Status: "Pending",
        KitName: "",
      }));
    } else {
      alert(`please fill the required fields : ${existingItem.join(",")}`);
    }
  };
  const Updateprocedure = () => {
    let requiredFields = ["ProcedureName","IsComplementry"];
    
    if (formValues.IsComplementry === "Yes") {
      requiredFields.push("Complementry", "ComplementrySessions")
    }else if (formValues.ProcedureName.split("-")[0]?.includes("GFC")) {
      requiredFields.push("Sessions", "KitName")
    }else if (!formValues.ProcedureName.split("-")[0]?.includes("HT")) {
      requiredFields.push("Sessions")
    }

    const existingItem = requiredFields.filter((field) => !formValues[field]);

    if (existingItem.length === 0) {
      const updateddate = [...ProcedureData];
      const indx = updateddate.findIndex((p) => p.Index === formValues.Index);

      updateddate[indx] = { ...formValues };
      setProcedureData(updateddate);
      setFormValues((prev) => ({
        ...prev,
        Index: null,
        ProcedureName: "",
        Sessions: "",
        Complementry: "",
        IsComplementry:"",
        Complementry:"",
        ComplementrySessions:"",
        appointmentDate: "",
        Status: "Pending",
        KitName: "",
      }));
    } else {
      alert(`please fill the required fields : ${existingItem.join(",")}`);
    }
  };
  const handleEdit = (client) => {
    setFormValues({ ...client });
  };




  const handleSave = () => {
    
    const procedure = ProcedureData.flatMap((p) => {
      const additionalRows = [];

      if (p.IsComplementry ==="Yes" ) {
        // Create a new row for complementary procedure
        // alert("hi");
        additionalRows.push({
          ProcedureName: p.Complementry,
          Therapist_Name: p.DoctorName,
          Sessions: +p.ComplementrySessions,
          appointmentDate: workbenchformData.AppointmentDate,
          PatientID: workbenchformData.PatientID,
          createdBy: userRecord?.username,
          DoctorName: workbenchformData.DoctorName,
          Status: p.Status,
          VisitID: workbenchformData.visitNo,
          branchlocation: userRecord?.location,
          Complementry:p.IsComplementry,
          KitName: p.KitName,
        });
      }

      // Original row for the current procedure
      return [
        {
          ProcedureName: p.ProcedureName,
          Therapist_Name: p.DoctorName,
          Sessions: +p.Sessions,
          appointmentDate: workbenchformData.AppointmentDate,
          PatientID: workbenchformData.PatientID,
          createdBy: userRecord?.username,
          DoctorName: workbenchformData.DoctorName,
          Status: p.Status,
          VisitID: workbenchformData.visitNo,
          branchlocation: userRecord?.location,
          Complementry:"No",
          KitName: p.KitName,
        },
        ...additionalRows,
      ];
    });

    console.log(procedure, "----");

    axios
      .post(`${urllink}doctorsworkbench/insert_procedure`, procedure)
      .then((response) => {
        console.log(response.data);
        if (response.data?.message) {
          successMsg(response.data?.message);
        } else if (response.data?.warn) {
          userwarn(response.data?.warn);
        }

        setProcedureData([]);
        setgetprocedure((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };



  // ---------------------------------------------------------------------

  useEffect(() => {
    axios
      .get(
        `${urllink}doctorsworkbench/get_current_session?Patientid=${workbenchformData?.PatientID}`
      )
      .then((res) => {
        const data = res.data;
        console.log(data, "----");
        setSelectedProcedure(data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getprocedure, workbenchformData?.PatientID]);

  const handleEdit1 = (client) => {
    setFormTreatprocedure((prev) => ({
      ...prev,
      PatientID: client.PatientID,
      VisitID: workbenchformData.visitNo,
      AppointmentDate: client.AppointmentDate,
      TherapistName: client.TherapistName,
      TreatmentProcedure: client.Treatment_Procedure,
      Sessions: client.Number_of_Sessions,
      CompletedSessions: client.Number_of_Sessions_completed,
      currentsession: client.current_session,
      CreatedBy: userRecord?.username,
      location: userRecord?.location,
      Complementry: client?.Complementry,
    }));
  };

  const handleonchange1 = (e) => {
    const { name, value } = e.target;

    setFormTreatprocedure((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputFileChange1 = (event) => {
    const file = event.target.files[0];
    setSelectedFile1(file);
  };

  const handleInputFileChange2 = (event) => {
    const file = event.target.files[0];
    setSelectedFile2(file);
  };


  const handleOpenCamera = () => {
    setShowCamera1(true);
  };

  const handleCloseCamera = () => {
    setShowCamera1(false);
  };
  const handleHideCamera = () => {
    setShowCamera1(false);
  };
  const handleRecaptureCameraImage = () => {
    setCapturedImage1(null);
    setIsCameraImageCaptured1(false);
  };
  const handlecaptureImage1 = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    setCapturedImage1(imageSrc);
    setIsCameraImageCaptured1(true);
  };

  const handleOpenCamera2 = () => {
    setShowCamera2(true);
  };

  const handleCloseCamera2 = () => {
    setShowCamera2(false);
  };
  const handleHideCamera2 = () => {
    setShowCamera2(false);
  };
  const handleRecaptureCameraImage2 = () => {
    setCapturedImage2(null);
    setIsCameraImageCaptured2(false);
  };
  const handlecaptureImage2 = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    setCapturedImage2(imageSrc);
    setIsCameraImageCaptured2(true);
  };


  const videoConstraints = {
    facingMode: facingMode,
  };

  const switchCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  useEffect(() => {
    axios
      .get(
        `${urllink}doctorsworkbench/get_procedurestatus?Patientid=${workbenchformData?.PatientID}`
      )
      .then((res) => {
        const data = res.data;
        console.log(data, "----uuuu");
        setStatusSelectedProcedure(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [workbenchformData?.PatientID]);

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

  const handleSave1 = () => {
    const dataToSend = {
      ...FormTreatprocedure,
      ServiceType: "Procedure",
      beforecapturedImage: capturedImage1 ? dataURItoBlob(capturedImage1): selectedFile1,
      aftercapturedImage: capturedImage2 ? dataURItoBlob(capturedImage2) : selectedFile2,
      CreatedBy: userRecord?.username,
      location: userRecord?.location,
      // VisitID: workbenchformData.VisitID,
    };

    console.log(dataToSend);
    const BackformData = new FormData();

    for (const key in dataToSend) {
      if (dataToSend.hasOwnProperty(key)) {
        BackformData.append(key, dataToSend[key]);
      }
    }
    let arr = ["NextAppointment"];
    if (FormTreatprocedure.TreatmentProcedure.split("-")[0].includes("HT")) {
      arr = ["NextAppointment", "GraftCount"];
    }
    const exist = arr.filter((p) => !FormTreatprocedure[p]);
    if (exist.length > 0) {
      userwarn(`please fill allthe fields : ${exist.join(",")}`);
    } else {
      axios
        .post(
          `${urllink}doctorsworkbench/insert_therapist_procedure`,
          BackformData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res, "-=-=-=-=-=-=-");
          if (dataToSend?.Complementry === "No") {
            let billingdata = {
              PatientID: workbenchformData?.PatientID,
              PatientName: `${workbenchformData?.firstName} ${workbenchformData?.lastName}`,
              VisitID: workbenchformData?.visitNo,
              ServiceType: "Procedure",
              DoctorName: workbenchformData?.DoctorName,
              ProcedureName: FormTreatprocedure?.TreatmentProcedure,
              appointmentDate: workbenchformData?.AppointmentDate,
              Sessions: FormTreatprocedure?.currentsession,
              Unit: parseInt(FormTreatprocedure?.GraftCount) || 0,
              Amount: 0,
              Discount: 0,
              Gstcharge: 0,
              TotalAmount: 0,
              Status: "Pending",
              location: userRecord?.location,
              CreatedBy: userRecord?.username,
            };

            let urlval = "get_RateCard_Service_Charge";
            let ratecardType = Ratecard.RatecardType;

            if (Ratecard.RatecardType === "Insurance") {
              urlval = "get_RateCard_Insurance_Charge";
              ratecardType = Ratecard.InsuranceName;
            }
            if (Ratecard.RatecardType === "Client") {
              urlval = "get_RateCard_client_Charge";
              ratecardType = Ratecard.ClientName;
            }

            const fetchAndPostBillingData = async () => {
              try {
                const response = await axios.get(
                  `${urllink}usercontrol/${urlval}?servicetype=Procedure&servicename=${FormTreatprocedure.TreatmentProcedure}&ratecardtype=${ratecardType}&location=${userRecord?.location}`
                );

                const data = response.data.data[0];
                console.log(response.data);

                if (data?.Charge) {
                  billingdata["Amount"] = parseFloat(data.Charge) || 0;
                  billingdata["Gstcharge"] = parseFloat(data.GstCharge) || 0;
                  billingdata["TotalAmount"] =
                    parseFloat(data.Charge) * parseFloat(billingdata.Unit) || 0;
                }

                const ProcedureData = [{ ...billingdata }];
                const postResponse = await axios.post(
                  `${urllink}GeneralBilling/insertGeneral_Billing_Data`,
                  ProcedureData
                );

                console.log(postResponse, "=====");
              } catch (error) {
                console.error(
                  "Error in fetching and posting billing data:",
                  error
                );
              }
            };

            fetchAndPostBillingData();
          }

          setgetprocedure((prev) => !prev);
          setFormTreatprocedure({
            PatientID: "",
            VisitID: "",
            AppointmentDate: "",
            TherapistName: "",
            TreatmentProcedure: "",
            NextAppointment: "",
            Sessions: "",
            CompletedSessions: "",
            currentsession: "",
            AdditionalComments: "",
          });
          setCapturedImage1(null);
          setCapturedImage2(null);
        })
        .catch((err) => {
          console.log(err);
        });


      const shouldProceed = window.confirm("Do you Complete Procedure?");
      const statuss = shouldProceed ? "Yes" : "No";

      if (statuss === "Yes") {
        // User clicked "OK"
        navigate("/Home/Treament-QueueList");
      }
    }
  };





  return(
     <>
     <div className="Add_items_Purchase_Master">
      <span>Add Procedures</span>
    </div>
    <div className="new-patient-registration-form">
    <div className="RegisFormcon" style={{ justifyContent: "center" }}>
      
      <div className="RegisForm_1">
        <label htmlFor="ProcedureName">
          Treatment Procedure<span>:</span>
        </label>
        <select
          id="ProcedureName"
          name="ProcedureName"
          value={formValues.ProcedureName}
          onChange={handleonchange}
        >
          <option value="">Select </option>
          {Array.isArray(ProcedureName) ? (
            ProcedureName.map((procedure, index) => (
              <option key={index} value={procedure.ProcedureName}>
                {procedure.ProcedureName}
              </option>
            ))
          ) : (
            <option disabled>No procedure available</option>
          )}
        </select>
      </div>
      
      {!formValues.ProcedureName.split("-")[0]?.includes("HT") &&
        <div className="RegisForm_1">
        <label htmlFor="Sessions">
          Numberof Sessions<span>:</span>
        </label>
        <input
          type="number"
          id="Sessions"
          name="Sessions"
          value={formValues.Sessions}
          onChange={handleonchange}
        />
      </div>}

      {formValues.IsComplementry === "Yes" && (
        <>
        <div className="RegisForm_1">
          <label htmlFor="ConsultancyDiscount">
            Complementary<span>:</span>
          </label>
          <input
            type="text"
            id="ConsultancyDiscount"
            name="Complementry"
            value={formValues.Complementry}
            onChange={handleonchange}
          />
        </div>
        <div className="RegisForm_1">
        <label htmlFor="ConsultancyDiscount">
          Complementary Sessions<span>:</span>
        </label>
        <input
          type="text"
          name="ComplementrySessions"
          value={formValues.ComplementrySessions}
          onChange={handleonchange}
        />
      </div>
      </>
      )}

      {formValues.ProcedureName.split("-")[0]?.includes("GFC") && (
        <div className="RegisForm_1">
          <label htmlFor="ConsultancyDiscount">
            GFC Kit Name<span>:</span>
          </label>
          <input
            list="Kitbrowsers"
            type="text"
            id="KitName"
            name="KitName"
            value={formValues.KitName}
            onChange={handleonchange}
          />
           <datalist id="Kitbrowsers">
          {getStockid_Name.map((item, index) => (
            <option
              key={index}
              value={item.ItemName}
            >
              {item.ItemName}
            </option>
          ))}
        </datalist>
        </div>
      )}
      
      <button
        className="RegisterForm_1_btns"
        onClick={
          formValues.Index !== null ? Updateprocedure : Addprocedure
        }
      >
        {formValues.Index !== null ? "Update" : "Add"}
      </button>
      

    </div>
    <br/>
    
    {ProcedureData.length > 0 && (
      <div className="Selected-table-container">
        <table className="selected-medicine-table2">
          <thead>
            <tr>
              <th>S No</th>
              <th>Service Type</th>
              <th>Therapist Name</th>
              <th>Procedure Name</th>
              <th>Sessions</th>
              <th>Is Complementry</th>
              <th>Complementry</th>
              <th>Complementry <br/>Sessions</th>
              <th>Kit Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ProcedureData.map((client, index) => (
              <tr key={index}>
                <td>{client.Index}</td>
                <td>{client.ServiceType}</td>
                <td>{client.DoctorName}</td>
                <td>{client.ProcedureName}</td>
                <td>{client.Sessions || "-"}</td>
                <td>{client.IsComplementry}</td>
                <td>{client.Complementry || "-"}</td>
                <td>{client.ComplementrySessions || "-"}</td>
                <td>{client.KitName || "-"}</td>
                <td>
                  <button
                    className="delnamebtn"
                    onClick={() => handleEdit(client)}
                  >
                    <EditNoteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    
    <br/>
    
    {ProcedureData.length > 0 && (
      <div className="Register_btn_con">
        <button className="RegisterForm_1_btns" onClick={handleSave}>
          Save
        </button>
        <button
          onClick={() => openModal("calendar")}
          className="RegisterForm_1_btns"
        >
          preview
        </button>
      </div>
    )}
    
    {openModal2 && (
      <div
        className={
          isSidebarOpen
            ? "sideopen_showcamera_profile"
            : "showcamera_profile"
        }
        onClick={() => {
          setOpenModal2(false);
        }}
      >
        <div
          className="newwProfiles newwPopupforreason"
          onClick={(e) => e.stopPropagation()}
        >
          <Preview modalContent={modalContent} />
          <div className="Register_btn_con">
            <button
              className="RegisterForm_1_btns"
              onClick={() => {
                setOpenModal2(false);
              }}
            >
              <HighlightOffIcon />
            </button>
          </div>
        </div>
      </div>
    )}
    </div>

{/* -------------------------------------------------Current Therapy List------------------------------------------------------------------------------------ */}
    
    
    {SelectedProcedure.length > 0 && <div className="Add_items_Purchase_Master">
      <span>Current Therapy List</span>
    </div>}

    {SelectedProcedure.length > 0 && (
            <div className="Selected-table-container">
              <table className="selected-medicine-table2">
                <thead>
                  <tr>
                    <th>S No</th>
                    <th>Visit Id</th>
                    <th>Therapist Name</th>
                    <th>Procedure Name</th>
                    <th>Sessions</th>
                    <th>Sessions Completed</th>
                    <th>Current Session</th>
                    <th>Complementry</th>
                    <th>Kit Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {SelectedProcedure.map((client, index) => (
                    <tr key={index}>
                      <td>{client.ProcedureID}</td>
                      <td>{client.VisitID}</td>
                      <td>{client.TherapistName}</td>
                      <td>{client.Treatment_Procedure}</td>
                      <td>{client.Number_of_Sessions}</td>
                      <td>{client.Number_of_Sessions_completed}</td>
                      <td>{client.current_session}</td>
                      <td>{client.Complementry || "-"}</td>
                      <td>{client.KitName || "-"}</td>
                      <td>{client.Status}</td>
                      <td>
                        <button
                          className="delnamebtn"
                          onClick={() => handleEdit1(client)}
                        >
                          <EditNoteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <br/>
          <div className="RegisFormcon" style={{ justifyContent: "center" }}>
            <div className="RegisForm_1">
              <label htmlFor="TreatmentProcedure">
                Procedure Name<span>:</span>
              </label>
              <input
                type="TreatmentProcedure"
                id="TreatmentProcedure"
                name="TreatmentProcedure"
                readOnly
                value={FormTreatprocedure.TreatmentProcedure}
                onChange={handleonchange1}
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="Sessions">
                Sessions<span>:</span>
              </label>
              <input
                type="number"
                id="Sessions"
                name="Sessions"
                readOnly
                value={FormTreatprocedure.Sessions}
                onChange={handleonchange1}
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="CompletedSessions">
                Completed Sessions<span>:</span>
              </label>
              <input
                type="number"
                id="CompletedSessions"
                name="CompletedSessions"
                readOnly
                value={FormTreatprocedure.CompletedSessions}
                onChange={handleonchange1}
              />
            </div>

            <div className="RegisForm_1">
              <label htmlFor="currentsession">
                Current Sessions<span>:</span>
              </label>
              <input
                type="number"
                id="currentsession"
                name="currentsession"
                readOnly
                value={FormTreatprocedure.currentsession}
                onChange={handleonchange1}
              />
            </div>

            {FormTreatprocedure.TreatmentProcedure.split("-")[0].includes(
              "HT"
            ) && (
                <div className="RegisForm_1">
                  <label htmlFor="GraftCount">
                    Graft Count<span>:</span>
                  </label>
                  <input
                    type="number"
                    id="GraftCount"
                    name="GraftCount"
                    value={FormTreatprocedure.GraftCount}
                    onChange={handleonchange1}
                  />
                </div>
              )}
            <div className="RegisForm_1">
              <label htmlFor="patientPhoto">
                Before Treatment<span>:</span>
              </label>
              <div className="file-input-444">
                <div className="RegisterForm_2">
                  <input
                    type="file"
                    id="CapturedFile"
                    name="CapturedFile"
                    accept="image/*"  // Ensure this is correct if you want images and not pdf
                    onChange={handleInputFileChange1}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="CapturedFile"
                    className="RegisterForm_1_btns choose_file_update"
                  >
                    Choose File
                  </label>
                  <button
                    onClick={handleOpenCamera}
                    className="RegisterForm_1_btns choose_file_update"
                  >
                    Take Pic
                  </button>

                  {showCamera1 && (
                    <div
                      className={
                        isSidebarOpen ? "sideopen_showcamera" : "showcamera"
                      }
                      onClick={handleHideCamera}
                    >
                      <div
                        className={
                          isSidebarOpen
                            ? "sideopen_showcamera_1"
                            : "showcamera_1"
                        }
                        onClick={(e) => e.stopPropagation()}
                      >
                        {isCameraImageCaptured1 ? ( // Display the captured camera image
                          <img
                            src={capturedImage1}
                            alt="captured"
                            className="captured-image11"
                          />
                        ) : (
                          <div className="camera-container">
                            <div className="web_head">
                              <h3>Image</h3>
                            </div>
                            <br></br>
                            <div className="RotateButton_canva">
                              <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                mirrored={facingMode === "user"}
                                className="web_cam"
                                videoConstraints={videoConstraints}
                              />
                              <div className="web_cam__1">
                                <button onClick={switchCamera}>
                                  <CameraswitchIcon />
                                </button>
                              </div>

                            </div>
                          </div>
                        )}
                        <div className="web_btn">
                          {isCameraImageCaptured1 ? ( // Render the Recapture button if a camera image is captured
                            <button
                              onClick={handleRecaptureCameraImage}
                              className="btncon_add"
                            >
                              Recapture
                            </button>
                          ) : (
                            <button
                              onClick={handlecaptureImage1}
                              className="btncon_add"
                            >
                              Capture
                            </button>
                          )}
                          <button
                            onClick={handleCloseCamera}
                            className="btncon_add"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="RegisForm_1">
              <label htmlFor="patientPhoto">
                After Treatment<span>:</span>
              </label>
              <div className="file-input-444">
                <div className="RegisterForm_2">
                  <input
                    type="file"
                    id="CapturedFile"
                    name="CapturedFile"
                    accept="image/*"  // Ensure this is correct if you want images and not pdf
                    onChange={handleInputFileChange2}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="CapturedFile"
                    className="RegisterForm_1_btns choose_file_update"
                  >
                    Choose File
                  </label>
                  <button
                    onClick={handleOpenCamera2}
                    className="RegisterForm_1_btns choose_file_update"
                  >
                    Take Pic
                  </button>
                  {showCamera2 && (
                    <div
                      className={
                        isSidebarOpen ? "sideopen_showcamera" : "showcamera"
                      }
                      onClick={handleHideCamera2}
                    >
                      <div
                        className={
                          isSidebarOpen
                            ? "sideopen_showcamera_1"
                            : "showcamera_1"
                        }
                        onClick={(e) => e.stopPropagation()}
                      >
                        {isCameraImageCaptured2 ? ( // Display the captured camera image
                          <img
                            src={capturedImage2}
                            alt="captured"
                            className="captured-image11"
                          />
                        ) : (
                          <div className="camera-container">
                            <div className="web_head">
                              <h3>Image</h3>
                            </div>
                            <br></br>
                            <div className="RotateButton_canva">
                              <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                mirrored={facingMode === "user"}
                                className="web_cam"
                                videoConstraints={videoConstraints}
                              />
                              <div className="web_cam__1">
                                <button onClick={switchCamera}>
                                  <CameraswitchIcon />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="web_btn">
                          {isCameraImageCaptured2 ? (
                            <button
                              onClick={handleRecaptureCameraImage2}
                              className="btncon_add"
                            >
                              Recapture
                            </button>
                          ) : (
                            <button
                              onClick={handlecaptureImage2}
                              className="RegisterForm_1_btns"
                            >
                              Capture
                            </button>
                          )}
                          <button
                            onClick={handleCloseCamera2}
                            className="RegisterForm_1_btns"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="RegisForm_1">
              <label htmlFor="AdditionalComments">
                Additional Comments<span>:</span>
              </label>
              <textarea
                id="AdditionalComments"
                name="AdditionalComments"
                value={FormTreatprocedure.AdditionalComments}
                onChange={handleonchange1}
              />
            </div>
            <div className="RegisForm_1">
              <label htmlFor="NextAppointment">
                Next Appointment<span>:</span>
              </label>
              <input
                type="date"
                id="NextAppointment"
                name="NextAppointment"
                value={FormTreatprocedure.NextAppointment}
                onChange={handleonchange1}
                required
              />
            </div>
          </div>
          <br />
          <div className="Register_btn_con">
            <button className="RegisterForm_1_btns" onClick={handleSave1}>
              Save
            </button>
          </div>
          <ToastContainer />
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}style={{ content: { ...yourStyles } }}>
          <div className="pdf_img_show">
            {modalContent.toLowerCase().startsWith("data:application/pdf;base64,") ? (
              <iframe
                title="PDF Viewer"
                src={modalContent2}
                style={{
                  width: "100%",
                  height: "435px",
                  border: "1px solid rgba(0, 0, 0, 0.5)", // Black border with reduced opacity
                }}
              />
            ) : (
              <img
                src={modalContent2}
                alt="Concern Form"
                style={{
                  width: "80%",
                  height: "75%",
                  marginTop: "20px",
                }}
              />
            )}
            <div className="jhuhhjh">
              <Button
                style={{ color: "white" }}
                className="clse_pdf_img"
                onClick={closeModal}
              >
                <HighlightOffIcon
                  style={{
                    fontSize: "40px",
                    backgroundColor: "#54d854bf",
                    borderRadius: "40px",
                  }}
                />
              </Button>
            </div>
          </div>
        </Modal>
    </>
)
}

export default NewProcedure;

