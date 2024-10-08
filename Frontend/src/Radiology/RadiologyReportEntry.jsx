import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ToastAlert from "../OtherComponent/ToastContainer/ToastAlert";
import bgImg2 from "../Assets/bgImg2.jpg";
import ReactGrid from "../OtherComponent/ReactGrid/ReactGrid";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import ModelContainer from "../OtherComponent/ModelContainer/ModelContainer";
import { useNavigate } from "react-router-dom";
const RadiologyReportEntry = () => {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const dispatchvalue = useDispatch();
  const [IsRadiologyGet, setIsRadiologyGet] = useState(false);
  const RadiologyWorkbenchNavigation = useSelector(state => state.Frontoffice?.RadiologyWorkbenchNavigation);
  //   console.log("RadiologyWorkbenchNavigation", RadiologyWorkbenchNavigation);
  const [ReportEntry, setReportEntry] = useState({
    TestCode: "",
    TestName: "",
    ReportDate: "",
    ReportTime: "",
    RadiologistName: "",
    TechnicianName: "",
    Report: "",
    ReportHandoOvered: "",
    RelativeName: "",
    Radiology_RequestID: "",
    Radiology_CompleteId: ""
  });
  const [ChooseFile, setChooseFile] = useState({
    ChooseFileOne: null,
    ChooseFileTwo: null,
    ChooseFileThree: null,
  });

  const [completeArr, SetCompleteArr] = useState([]);

  const [no, setno] = useState([]);
  const [yes, setyes] = useState([]);
  const navigate = useNavigate();
  const [IsViewMode, setIsViewMode] = useState(false);


  const handleReportEntryChange = (e) => {
    const { name, value } = e.target;
    setReportEntry((previous) => ({
      ...previous,
      [name]: value || "",
    }));
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

  // Define the fetchData function
  const fetchData = () => {
    const params = {
      Register_Id: RadiologyWorkbenchNavigation?.params?.RegistrationId,
      RegisterType: RadiologyWorkbenchNavigation?.params?.RegisterType
    };

    axios.get(`${UrlLink}OP/Radiology_Request_Detailslink`, { params })
      .then((res) => {
        const ress = res.data;
        console.log("1234", ress);
        setyes(ress?.IsSubTestYes);
        setno(ress?.IsSubTestNo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (Object.keys(RadiologyWorkbenchNavigation).length === 0) {
      navigate('/Home/RadiologyQuelist');
    }
  }, [RadiologyWorkbenchNavigation, navigate]);
  // Call fetchData inside useEffect
  useEffect(() => {
    const { RegistrationId, RegisterType } = RadiologyWorkbenchNavigation?.params || {};
  
    if (UrlLink && RegistrationId && RegisterType) {
      fetchData();
    }
  }, [
    UrlLink, 
    RadiologyWorkbenchNavigation?.params?.RegistrationId, 
    RadiologyWorkbenchNavigation?.params?.RegisterType, 
    IsRadiologyGet
  ]);
  
  const yesColumns = [

    {
      key: "id",
      name: "S.No",
      frozen: true,

    },
    {
      key: "RadiologyName",
      name: "Radiology Name",
      frozen: true,
    },
    {
      key: "TestName",
      name: "TestName",
      frozen: true,
    },


    {
      key: "SubTestName",
      name: "Sub TestName",
      frozen: true,
    },
    {
      key: "Action",
      name: "Action",
      renderCell: (params) => (
        <Button
        key={params.row.id}  // Assuming `id` is unique for each row
          className="cell_btn"
          onClick={() => handleeditReport(params.row)}
        >
          <EditIcon className="check_box_clrr_cancell" />
        </Button>
      ),
    }

  ];

  const noColumns = [

    {
      key: "id",
      name: "S.No",
      width: "160px",

    },

    {
      key: "RadiologyName",
      name: "Radiology Name",


    },


    {
      key: "TestName",
      name: "Test Name",
    },
    {
      key: "Action",
      name: "Action",
      renderCell: (params) => (
        <Button
        key={params.row.id}  // Assuming `id` is unique for each row
          className="cell_btn"
          onClick={() => handleeditReport(params.row)}
        >
          <EditIcon className="check_box_clrr_cancell" />
        </Button>
      ),
    }

  ];

  const handleeditReport = (row) => {
    setIsViewMode(true);
    console.log("Row data on edit:", row); // Debugging: log the row data

    if (row.IsSubTest === "No") {

      setReportEntry({
        ...row,
        TestCode: row.TestCode, 
        TestName: row.TestName,  
        Radiology_RequestID: row.Radiology_RequestId
      });
    } else if (row.IsSubTest === "Yes") {

      setReportEntry({
        ...row,
        TestCode: row.SubTestCode,  
        TestName: row.SubTestName,  
        Radiology_RequestID: row.Radiology_RequestId
      });
    }
  };

  const handleSubmitReportEntry = () => {
    const reportentrydata = {
      ...ReportEntry,
      ...ChooseFile,
      Registeration_Id: RadiologyWorkbenchNavigation?.params?.RegistrationId,
      RegisterType: RadiologyWorkbenchNavigation?.params?.RegisterType,
      created_by: userRecord?.username || "",
    };

    console.log("reportentrydata", reportentrydata);
    const reportentrydatatosend = new FormData();
    const arrchfile = [...Object.keys(ChooseFile), "ReportEntryFile"];
    Object.keys(reportentrydata).forEach((key) => {
      if (arrchfile.includes(key)) {
        if (reportentrydata[key] !== null) {
          reportentrydatatosend.append(key, reportentrydata[key]);
        }
      } else {
        reportentrydatatosend.append(key, reportentrydata[key]);
      }
    });
    console.log("datatosned", reportentrydatatosend);
    axios
      .post(`${UrlLink}OP/Radiology_Complete_Details_Link`, reportentrydatatosend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsRadiologyGet((prev) => !prev);

        const responsedata = res.data;
        let typp = Object.keys(responsedata)[0];
        let mess = Object.values(responsedata)[0];
        const tdata = {
          message: mess,
          type: typp,
        };
        handleClear();
        dispatchvalue({ type: "toast", value: tdata });
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleClear = () => {
    setReportEntry({
      TestCode: "",
      TestName: "",
      ReportDate: "",
      ReportTime: "",
      RadiologistName: "",
      TechnicianName: "",
      Report: "",
      ReportHandoOvered: "",
      RelativeName: "",
      Radiology_RequestID: "",
      Radiology_CompleteId: ""
    });

    setChooseFile({
      ChooseFileOne: null,
      ChooseFileTwo: null,
      ChooseFileThree: null,
    });
  };
  useEffect(() => {
    const params = {
      Register_Id: RadiologyWorkbenchNavigation?.params?.RegistrationId,
      RegisterType: RadiologyWorkbenchNavigation?.params?.RegisterType

    };
    axios.get(`${UrlLink}OP/Radiology_Complete_Details_Link`, { params })
      .then((res) => {
        const ress = res.data;
        console.log("789", ress);
        SetCompleteArr(ress);

      })
      .catch((err) => {
        console.log(err);
      });

  }, [RadiologyWorkbenchNavigation?.params?.RegistrationId, RadiologyWorkbenchNavigation?.params?.RegisterType, IsRadiologyGet,UrlLink]);


  const RadiologyColumns = [

    {
      key: "id",
      name: "S.No",
      width: "160px",

    },

    {
      key: "ReportDate",
      name: "Report Date",


    },
    {
      key: "RadiologistName",
      name: "Radiologist Name",
    },
    {
      key: "TechnicianName",
      name: "Technician Name",
    },
    {
      key: "RadiologyName",
      name: "Radiology Name",
    },
    {
      key: "TestName",
      name: "TestName",
    },
    {
      key: "SubTestName",
      name: "Sub TestName",
      renderCell: (params) => (
        params.row.SubTestName ? (
          params.row.SubTestName
        ) : (
          'No SubTest'
        )
      ),

    },
    {
      key: "Report_HandOverTo",
      name: "Report HandOver",
    },
    {
      key: "RelativeName",
      name: "RelativeName",
    },
    {
      key: "Action",
      name: "Action",
      renderCell: (params) => (
        <Button
          key={params.row.id} // Assuming `id` is unique for each row
          className="cell_btn"
          onClick={() => handleEditComplete(params.row)}
        >
          <EditIcon className="check_box_clrr_cancell" />
        </Button>
      ),
    }

  ];
  const handleEditComplete = (row) => {
    console.log("CompleteEdit",row);
    setIsViewMode(true);
    if(row.IsSubTest === 'Yes'){
      setReportEntry({
        ...row,
        TestCode:row.SubTestCode ||  "",
        TestName:row.SubTestName || "",
        ReportDate:row.ReportDate || "",
        ReportTime: row.ReportTime || "",
        RadiologistName:row.RadiologistName || "",
        TechnicianName:row.TechnicianName || "",
        Report: row.Report || "",
        ReportHandoOvered:row.Report_HandOverTo ||  "",
        RelativeName:row.RelativeName || "",
        Radiology_RequestID:row.Radiology_RequestId || "",
        Radiology_CompleteId:row.Radiology_CompleteId || ""
      });
  
      setChooseFile({
        ChooseFileOne: row.Report_fileone,
        ChooseFileTwo: row.Report_filetwo,
        ChooseFileThree: row.Report_filethree,
      });
    }
    else if(row.IsSubTest === 'No'){
      setReportEntry({
        ...row,
        TestCode:row.SubTestCode ||  "",
        TestName:row.TestName || "",
        ReportDate:row.ReportDate || "",
        ReportTime: row.ReportTime || "",
        RadiologistName:row.RadiologistName || "",
        TechnicianName:row.TechnicianName || "",
        Report: row.Report || "",
        ReportHandoOvered:row.Report_HandOverTo ||  "",
        RelativeName:row.RelativeName || "",
        Radiology_RequestID:row.Radiology_RequestId || "",
        Radiology_CompleteId:row.Radiology_CompleteId || ""
      });
  
      setChooseFile({
        ChooseFileOne: row.Report_fileone,
        ChooseFileTwo: row.Report_filetwo,
        ChooseFileThree: row.Report_filethree,
      });
    }

  };


  return (
    <>
      <div className="Main_container_app">



        <div className="new-patient-registration-form">
          <br />
          <div className="dctr_info_up_head">
            <div className="RegisFormcon ">
              <div className="dctr_info_up_head22">
                <img src={bgImg2} alt="Patient Profile" />

                <label>Profile</label>
              </div>
            </div>
            <div className="RegisFormcon_1">
              <div className="RegisForm_1 ">
                <label htmlFor="PatientID">
                  Patient ID <span>:</span>
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="PatientID">
                  {RadiologyWorkbenchNavigation?.params?.PatientId}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="PatientName">
                  Patient Name <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="PatientName">
                  {RadiologyWorkbenchNavigation?.params?.PatientName}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="Age">
                  Age <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Age">
                  {RadiologyWorkbenchNavigation?.params?.age}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="Gender">
                  Gender <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Gender">
                  {RadiologyWorkbenchNavigation?.params?.gender}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="PhoneNumber">
                  Phone Number<span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="PhoneNumber">
                  {RadiologyWorkbenchNavigation?.params?.PhoneNumber}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="DoctorShortName">
                  Doctor Name<span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="DoctorShortName">
                  {RadiologyWorkbenchNavigation?.params?.DoctorShortName}
                </span>
              </div>
            </div>
          </div>
          <br />
        </div>

        <div className="RegisFormcon_1">
          <div className="new-navigation">
            <div className="common_center_tag">
              <span>Radiology Report Entry</span>
            </div>
          </div>


          {yes?.length > 0 && (
            <>
              <div className="common_center_tag">
                <span>Selected SubTestName</span>
              </div>

              <ReactGrid columns={yesColumns} RowData={yes} />
            </>
          )}
          {no?.length > 0 && (
            <>
              <div className="common_center_tag">
                <span>Selected TestName</span>
              </div>

              <ReactGrid columns={noColumns} RowData={no} />
            </>
          )}
          <br></br>
          <br></br>
          <div className="RegisForm_1">
            <label htmlFor="TestName">
              Test Name <span>:</span>
            </label>
            <input
              type="text"
              id="TestName"
              name="TestName"
              onChange={handleReportEntryChange}
              value={ReportEntry.TestName || ""}
              readOnly={IsViewMode}
              required
            />
          </div>
          <div className="RegisForm_1">
            <label htmlFor="TestCode">
              Test Code <span>:</span>
            </label>
            <input
              type="text"
              id="TestCode"
              name="TestCode"
              onChange={handleReportEntryChange}
              value={ReportEntry.TestCode || ""}
              readOnly={IsViewMode}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="ReportDate">
              Report Date <span>:</span>
            </label>
            <input
              type="date"
              id="ReportDate"
              name="ReportDate"
              onChange={handleReportEntryChange}
              value={ReportEntry.ReportDate}
              required
            />
          </div>
          <div className="RegisForm_1">
            <label htmlFor="ReportTime">
              Report Time <span>:</span>
            </label>
            <input
              type="time"
              id="ReportTime"
              name="ReportTime"
              onChange={handleReportEntryChange}
              value={ReportEntry.ReportTime}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="ReceiptNo">
              Radiologist Name <span>:</span>
            </label>
            <input
              type="text"
              id="RadiologistName"
              name="RadiologistName"
              onChange={handleReportEntryChange}
              value={ReportEntry.RadiologistName}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="ReportTime">
              Technician Name <span>:</span>
            </label>
            <input
              type="text"
              id="TechnicianName"
              name="TechnicianName"
              onChange={handleReportEntryChange}
              value={ReportEntry.TechnicianName}
              required
            />
          </div>
        </div>
        <br />

        <div className="Otdoctor_intra_Con_2 with_increse_85">
          <label htmlFor="Report">
            Report <span>:</span>
          </label>
          <textarea
            type="text"
            id="Report"
            name="Report"
            onChange={handleReportEntryChange}
            value={ReportEntry.Report}
            required
          />
        </div>

        <br />

        <div className="RegisFormcon_1">
          {Object.keys(ChooseFile).map((field, indx) => (
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
                  onClick={() => Selectedfileview(ChooseFile[field])}
                >
                  view
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="RegisFormcon_1">
          <div className="RegisForm_1">
            <label htmlFor="ReportHandoOvered">
              Report Handovered to Relative by <span>:</span>
            </label>
            <input
              type="text"
              id="ReportHandoOvered"
              name="ReportHandoOvered"
              onChange={handleReportEntryChange}
              value={ReportEntry.ReportHandoOvered}
              required
            />
          </div>
          <div className="RegisForm_1">
            <label htmlFor="RelativeName">
              Relative Name<span>:</span>
            </label>
            <input
              type="text"
              id="RelativeName"
              name="RelativeName"
              onChange={handleReportEntryChange}
              value={ReportEntry.RelativeName}
              required
            />
          </div>
        </div>
        <br />

        <div className="Main_container_Btn">
          <button
            className="RegisterForm_1_btns"
            onClick={handleSubmitReportEntry}
          >
          {ReportEntry.Radiology_CompleteId ? "Update" : "Save"}
          </button>
        </div>
        <br></br>
        {completeArr?.length > 0 && (
          <>
            <div className="common_center_tag">
              <span>Completed TestName</span>
            </div>

            <ReactGrid columns={RadiologyColumns} RowData={completeArr} />
          </>
        )}
        <ModelContainer />
        <ToastAlert Message={toast.message} Type={toast.type} />
      </div>
    </>
  );
};

export default RadiologyReportEntry;
