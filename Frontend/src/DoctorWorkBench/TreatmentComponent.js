import React, { useState, useEffect } from "react";
import "./TreatmentComponent.css";
import Axios from "axios";
// import Canva from "./Canva";
import { ToastContainer, toast } from "react-toastify";
import { useSelector,useDispatch } from "react-redux";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import ConfirmationModal from "../LoginPage/Confirmationmodal";
import { useNavigate } from "react-router-dom";
import { jsPDF } from 'jspdf';

// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from "react-redux";
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';


function Treatment() {

  const dispatchvalue = useDispatch();
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const toast = useSelector(state => state.userRecord?.toast);
  const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);
  const userRecord = useSelector((state) => state.userRecord?.UserData);

  // const getformData = useSelector(
  //   (state) => state.userRecord?.workbenchformData
  // );
  // const userRecord = useSelector((state) => state.userRecord?.UserData);
  const urllink = useSelector((state) => state.userRecord?.UrlLink);

  const isnewSidebarOpen = useSelector(
    (state) => state.userRecord?.isSidebarOpen
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const create = userRecord?.username;
  const Location = userRecord?.location;
  const [type, setType] = useState("Output");
  const navigate = useNavigate();
  const handlePageChange = (event, newType) => {
    if (newType !== null && newType !== type) {
      setType(newType);
    }
  };

  const [Description, setDescription] = useState(""); 

  const [currentIndex, setCurrentIndex] = useState(0); 
  const [multipleImages, setMultipleImages] = useState([]); 

  const [showcamera, setshowcamera] = useState(false);

  const [ChiefCompline, setChiefCompline] = useState("");

  const [GetimageinPdf,setGetimageinPdf]=useState(null)

  const [PDFcreated, setPDFcreated] = useState(null);

  // console.log("PDFcreated",PDFcreated);
 
  // const dispatchvalue = useDispatch();
  const [historyValue, setHistoryValue] = useState("");
  const [examinationValue, setExaminationValue] = useState("");
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [diagnosisValue, setDiagnosisValue] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [previousvisit, setPreviousvisit] = useState({
    ccomplaint: '',
    hvalue: '',
    examvalue: '',
    diagvalue: '',
    orgimgcanva: '',
    mrgimgcanva: '',
  });


  const handleNext = () => {
    if (currentIndex < multipleImages.length - 2) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  const handleclear =()=>{
    setMultipleImages([])
    setCurrentIndex(0)
  }

  // console.log("previousvisit000000", previousvisit);




  useEffect(() => {
    if (Object.keys(DoctorWorkbenchNavigation).length !== 0) {
      setChiefCompline(DoctorWorkbenchNavigation.Complaint)
    }
  }, [DoctorWorkbenchNavigation])

 
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setAppointmentDate(currentDate);

    const patientid = DoctorWorkbenchNavigation.PatientID;
    const visitNo = DoctorWorkbenchNavigation.visitNo;

    Axios.get(
      `${urllink}doctorsworkbench/get_treatment?patientid=${patientid}&visitid=${visitNo}`
    )
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const matchedData = response.data.find(
            (item) => item.PatientID === DoctorWorkbenchNavigation.PatientID
          );


          console.log("matchedDataGET",matchedData);


          if (matchedData) {
            // setICD_Code(matchedData.ICD_10_Code);
            // setICD_Name(matchedData.ICD_Diagnosis);
            setDescription(matchedData.Description);
            setHistoryValue(matchedData.History);
            setExaminationValue(matchedData.Examination);
            setDiagnosisValue(matchedData.Diagnosis);
            setChiefCompline(matchedData.ChiefComplaint)
            setGetimageinPdf(matchedData.Original_Image)

          }

        }

      })
      .catch((error) => {
        console.error(error);
      });
  }, [appointmentDate, DoctorWorkbenchNavigation]);


  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setAppointmentDate(currentDate);

    const patientid = DoctorWorkbenchNavigation.PatientID;
    const visitNo = DoctorWorkbenchNavigation.visitNo;

    Axios.get(
      `${urllink}doctorsworkbench/get_Previous_treatment?patientid=${patientid}&visitid=${visitNo}`
    )
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const getddata = response.data.find(
            (item) => item.PatientID === DoctorWorkbenchNavigation.PatientID
          );



          if (getddata) {
            setPreviousvisit((prev) => ({
              ...prev,
              ccomplaint: getddata.ChiefComplaint,
              hvalue: getddata.History,
              examvalue: getddata.Examination,
              diagvalue: getddata.Diagnosis,
              orgimgcanva: getddata.Original_Image
            }));
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [appointmentDate, DoctorWorkbenchNavigation]);


  useEffect(() => {
    dispatchvalue({ type: 'Complaint', value: ChiefCompline })
  }, [ChiefCompline])

  // Convert a data URI to a Blob

  const handleShowcamera = () => {
    setshowcamera(true);
  };
  const handlehidecamera = () => {
    setshowcamera(false);
  };
  // console.log("multipleImages22222",multipleImages);

  const handleFileChange = (event) => {

    const files = event.target.files;
    if (files.length > 0) {
      const imagesArray = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          imagesArray.push({ id: multipleImages.length + i + 1, image: reader.result });
          if (imagesArray.length === files.length) {
            setMultipleImages((prevImages) => [...prevImages, ...imagesArray]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  

  const handleSave = () => {

     handlesavePDF()
     setShowConfirmationModal(true);
  };


  const handlesavePDF = () => {
    if (multipleImages.length > 0) {
        const doc = new jsPDF();
        const promises = multipleImages.map((imageData, index) => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => {
                    const pageWidth = doc.internal.pageSize.getWidth();
                    const pageHeight = doc.internal.pageSize.getHeight();
                    const aspectRatio = image.width / image.height;
                    let width, height;

                    if (aspectRatio > 1) {
                        // Landscape
                        width = pageWidth - 10; // some margin
                        height = (pageWidth - 10) / aspectRatio;
                    } else {
                        // Portrait
                        width = (pageHeight / 2 - 10) * aspectRatio; // half page height - margin
                        height = pageHeight / 2 - 10;
                    }

                    const positionY = index % 2 === 0 ? 10 : pageHeight / 2 + 5; // Top or bottom half
                    if (index % 2 === 0 && index !== 0) {
                        doc.addPage();
                    }
                    doc.addImage(image, 'JPEG', 5, positionY, width, height); // Add image to the PDF with some margin
                    resolve();
                };
                image.onerror = (error) => {
                    console.error(`Error loading image at index ${index}:`, error);
                    reject(error);
                };
                image.src = imageData.image;
            });
        });

        Promise.all(promises)
            .then(() => {
                const compressedPdf = compressPdf(doc);
                const pdfDataUri = compressedPdf.output('datauristring');
                const pdfSizeBytes = Math.round((pdfDataUri.length - 'data:application/pdf;base64,'.length) * 0.75);
                const pdfSizeMB = (pdfSizeBytes / (1024 * 1024)).toFixed(2);
                
                // console.log("compress12333", compressedPdf);
                // console.log("pdfSize in MB", pdfSizeMB);

                if (pdfSizeMB > 35) { 
                    alert('Image size is too large. Please compress and upload.');
                    setShowConfirmationModal(false);
                } else {
                    if (ChiefCompline !== '' && historyValue !== '' && diagnosisValue !== '' && examinationValue !== '') {
                        setPDFcreated(compressedPdf);
                        setShowConfirmationModal(true);
                    } else {
                        warnmsg('All fields are mandatory');
                    }
                }
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
            });
    } else {
        setPDFcreated(null)
    }
};




const compressPdf = (pdf) => {
    pdf.output('datauristring', { compressed: true }); 
    return pdf; 
};


  const handleConfirm =  () => {


    const MY_datatosend = {
      ChiefCompline: ChiefCompline,
      history: historyValue,
      Description: Description,
      examination: examinationValue,
      diagnosis: diagnosisValue,
      PatientID: DoctorWorkbenchNavigation.PatientID,
      appointmentDate: appointmentDate,
      AppointmentID: DoctorWorkbenchNavigation.SerialNo,
      visitNo: DoctorWorkbenchNavigation.visitNo,
      createdBy: create,
      location: Location,
      PDFcreated:PDFcreated,
    };

    console.log("++++++",MY_datatosend.PDFcreated);

    const BackformData = new FormData();
    for (const key in MY_datatosend) {
        if (MY_datatosend.hasOwnProperty(key)) {
            if (key === "PDFcreated" && MY_datatosend[key]) {
                const pdfBlob = MY_datatosend[key].output('blob');
                BackformData.append("PDFcreated", pdfBlob, "treatment.pdf");
            } else {
                BackformData.append(key, MY_datatosend[key]);
            }
        }
    }

    const url = `${urllink}doctorsworkbench/insert_workbench_treatment`;

    Axios.post(url, BackformData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        successMsg(response.data.message);
        setShowConfirmationModal(false);
        setSelectedImageData(null)
        
      })
      .catch((error) => {
        console.error(error);
        // errmsg("Error Occured");
        setShowConfirmationModal(false);
      });
  };





  const handleCancel = () => {

    const MY_datatosend = {
      ChiefCompline: ChiefCompline,
      history: historyValue,
      Description: Description,
      examination: examinationValue,
      diagnosis: diagnosisValue,
      PatientID: DoctorWorkbenchNavigation.PatientID,
      appointmentDate: appointmentDate,
      AppointmentID: DoctorWorkbenchNavigation.SerialNo,
      visitNo: DoctorWorkbenchNavigation.visitNo,
      createdBy: create,
      location: Location,
      cancelStatus: 'Completed' ,      
      PDFcreated:PDFcreated,     
    };



    const BackformData = new FormData();
    for (const key in MY_datatosend) {
        if (MY_datatosend.hasOwnProperty(key)) {
            if (key === "PDFcreated" && MY_datatosend[key]) {
                const pdfBlob = MY_datatosend[key].output('blob');
                BackformData.append("PDFcreated", pdfBlob, "treatment.pdf");
            } else {
                BackformData.append(key, MY_datatosend[key]);
            }
        }
    }

    const url = `${urllink}doctorsworkbench/insert_workbench_treatment`;

    Axios.post(url, BackformData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        successMsg(response.data.message);
        setSelectedImageData(null)
        // Navigate to patient queue list after successful save
        navigate("/Home/Treament-QueueList");
      })
      .catch((error) => {
        console.error(error);
        // errmsg("Error Occured");
      });
  };  



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
  const warnmsg = (warnmessage) => {
    toast.warn(`${warnmessage}`, {
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
      <div className="for">
        <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={handlePageChange}
            aria-label="Platform"
          >
            {DoctorWorkbenchNavigation.visitNo > 1 && (
              <ToggleButton
                value="Intake"
                style={{
                  height: "30px",
                  width: "180px",
                  backgroundColor:
                    type === "Intake"
                      ? "var(--selectbackgroundcolor)"
                      : "inherit",
                }}
                className="togglebutton_container"
              >
                Previous Visit
              </ToggleButton>
            )}
            <ToggleButton
              value="Output"
              style={{
                backgroundColor:
                  type === "Output"
                    ? "var(--selectbackgroundcolor)"
                    : "inherit",
                width: "180px",
                height: "30px",
              }}
              className="togglebutton_container"
            >
              Current Visit
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {type === "Intake" && (
          <>
            
            <div className="treatment_total_container">
              <div className="treatment_container">
                <div className="treatcon_1">
                  <div className="treatcon_body">
                   
                    <div className="treatcon_body_1 with-icd-his">
                      <label htmlFor="history">
                        Chief Complaints <span>:</span>
                      </label>
                      <textarea
                        id="Complaint"
                        name="Complaint"
                        cols="25"
                        rows="3"
                        value={previousvisit.ccomplaint}
                        disabled
                      ></textarea>
                    </div>

                    <div className="treatcon_body_1 with-icd-his">
                      <label htmlFor="history">
                        History <span>:</span>
                      </label>
                      <textarea
                        id="history"
                        name="history"
                        cols="25"
                        rows="3"
                        value={previousvisit.hvalue}
                        disabled
                      ></textarea>
                    </div>

                    <div className="treatcon_body_1 with-icd-his">
                      <label htmlFor="examination">
                        Examination <span>:</span>
                      </label>
                      <textarea
                        id="examination"
                        name="examination"
                        cols="25"
                        rows="3"
                        value={previousvisit.examvalue}
                        disabled
                      ></textarea>
                    </div>
                    
                    <div className="treatcon_body_1 with-icd-his">
                      <label htmlFor="diagnosis">
                        Diagnosis <span>:</span>
                      </label>
                      <textarea
                        id="diagnosis"
                        name="diagnosis"
                        cols="25"
                        rows="3"
                        value={previousvisit.diagvalue}
                        disabled
                      ></textarea>
                    </div>
                    
                  </div>
                </div>


                {previousvisit.orgimgcanva !== "" && (
                   <iframe
                   title="PDF Viewer"
                   src={previousvisit.orgimgcanva}
                   style={{
                    width: "50%",
                    height: "450px",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                  }}
                  allow="fullscreen"
                 />
                )}

              </div>
            </div>
            {/* <br /> */}
          </>
        )}
        {type === "Output" && (
          <>
            <div className="treatment_total_container">
              <div className="treatment_container">
                <div className="treatcon_1">
                  <div className="treatcon_body">
                    <div className="treatcon_body_1 with-icd-his">
                      <label htmlFor="history">
                        Chief Complaints <span>:</span>
                      </label>
                      <textarea
                        id="Complaint"
                        name="Complaint"
                        cols="25"
                        rows="3"
                        value={ChiefCompline}
                        onChange={(e) => setChiefCompline(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="treatcon_body_1 with-icd-his">
                      <label htmlFor="history">
                        History <span>:</span>
                      </label>
                      <textarea
                        id="history"
                        name="history"
                        cols="25"
                        rows="3"
                        value={historyValue}
                        onChange={(e) => setHistoryValue(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="treatcon_body_1 with-icd-his">
                      <label htmlFor="examination">
                        Examination <span>:</span>
                      </label>
                      <textarea
                        id="examination"
                        name="examination"
                        cols="25"
                        rows="3"
                        value={examinationValue}
                        onChange={(e) => setExaminationValue(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="treatcon_body_1 with-icd-his">
                      <label htmlFor="diagnosis">
                        Diagnosis <span>:</span>
                      </label>
                      <textarea
                        id="diagnosis"
                        name="diagnosis"
                        cols="25"
                        rows="3"
                        value={diagnosisValue}
                        onChange={(e) => setDiagnosisValue(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="treatment_buttons">
              <button className="RegisterForm_1_btns" onClick={handleSave}>
                save

              </button>


              <button className="RegisterForm_1_btns" onClick={handleShowcamera}>
                capture
              </button>
              
              <div className="RegisterForm_2">
              <input
                type="file"
                id="CapturedFile"
                name="CapturedFile"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label
                htmlFor="CapturedFile"
                className="RegisterForm_1_btns"
              >
                Choose File
                </label>
              </div>

                </div>
                </div>


                {/* {orignalImagecanva !== `data:image/jpeg;base64,null` && orignalImagecanva && (
                  <div className="treatcon_2">
                    <div className="treatcon_image">
                      <div className="treatcon_image_1">
                        <img
                          src={orignalImagecanva}
                          alt="OriginalImage"
                          onError={(e) => console.error("Error loading image:", e)}
                        />
                      </div>
                      <div className="treatcon_label">
                        <label htmlFor="name">Original Image</label>
                      </div>
                    </div>
                  </div>
                )} */}

                

                  <div className="multiple-images-container" style={{display:'flex'}}>
                   {multipleImages.length !==0 && (multipleImages.slice(currentIndex, currentIndex + 2).map((imageData) => (
                      <div key={imageData.id} className="treatcon_2">
                        <div className="treatcon_image" >
                          <div className="treatcon_image_1">
                            <img
                              src={imageData.image}
                              alt={`Captured Image ${imageData.id}`}
                              onError={(e) => console.error("Error loading image:", e)}
                            />
                          </div>
                          <div className="treatcon_label">
                            <label htmlFor="name">{`Captured Image ${imageData.id}`}</label>
                          </div>
                        </div>
                      </div>
                    )))}
                   
                </div>

                {(GetimageinPdf && multipleImages.length ===0 &&
                    <iframe
                      title="PDF Viewer"
                      src={GetimageinPdf}
                      style={{
                        width: "50%",
                        height: "450px",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                      }}
                      allow="fullscreen"
                      
                  />)}

              <div className="grid_foot">
                {multipleImages.length !==0 && currentIndex > 0 && (
                  <button onClick={handlePrevious} className="nav-btn">
                    Previous
                  </button>
                )}
                {multipleImages.length !==0 && currentIndex < multipleImages.length - 2 && (
                  <button onClick={handleNext} className="nav-btn">
                    Next
                  </button>
                )}

                {console.log("currentIndex",currentIndex)}

                {multipleImages.length !==0 && (currentIndex === 0 ||  currentIndex === multipleImages.length - 2) && (
                  <button onClick={handleclear} className="nav-btn">
                    Clear
                  </button>
                )}
                </div>

                
                
              </div>

              </div>
            <br />
           
            <ToastContainer />
            {showcamera && (
              <div
                className={isnewSidebarOpen ? "sideopen_showcamera" : "showcamera"}
                onClick={handlehidecamera}
              >
                <div
                  className={
                    isnewSidebarOpen ? "sideopen_showcamera_1" : "showcamera_1"
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* <Canva
                    setshowcamera={setshowcamera}
                    selectedImageData={selectedImageData}
                    setMultipleImages={setMultipleImages}
                    multipleImages={multipleImages}
                  /> */}
                </div>

              </div>
            )}
          </>
        )}
        {/* {showConfirmationModal && (
          <ConfirmationModal
            message="Do you want to continue?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )} */}

      </div>
    </>
  );
}

export default Treatment;

