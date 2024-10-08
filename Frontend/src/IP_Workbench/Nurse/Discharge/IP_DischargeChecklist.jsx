import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import ToastAlert from "../../../OtherComponent/ToastContainer/ToastAlert";
// import { IconButton } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ReactGrid from "../../../OtherComponent/ReactGrid/ReactGrid";

// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { formatLabel } from "../../../OtherComponent/OtherFunctions";
import ModelContainer from "../../../OtherComponent/ModelContainer/ModelContainer";
import ReactGrid from "../../../OtherComponent/ReactGrid/ReactGrid";

const DischargeChecklist = () => {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const UserData = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const IP_DoctorWorkbenchNavigation = useSelector(
    (state) => state.Frontoffice?.IP_DoctorWorkbenchNavigation
  );

  const dispatch = useDispatch();

  const [Investigation, setInvestigation] = useState({
    EEG: "Yes",
    ECG: "Yes",
    Xray: "Yes",
    CT: "Yes",
    MRI: "Yes",
    USG: "Yes",
    LabReport: "Yes",
    MedicalInstrument: "Yes",
    OPDFile: "Yes",
    OtherReports: "Yes",
    IPDBillCleared: "Yes",
    DisChargeSummary: "Yes",
    GatePass: "Yes",
    ICRemarks: "",
  });
  const [MaterialCheck, setMaterialCheck] = useState({
    MedicineTray: "Yes",
    WaterJug: "Yes",
    Glass: "Yes",
    GoodNight: "Yes",
    Blanket: "Yes",
    UrinePot: "Yes",
    TVRemote: "Yes",
    Others : 'Yes',
    MaterialRemarks: "",
  });

  const [Signature, setSignature] = useState({
    PatientSignature: null,
    RelativeName: "",
    RelativeSignature: null,
    SisterIncharge: "",
  });
  const [DischargeCheckGET, setDischargeCheckGET] = useState([]);

  const clearalldata = () => {
    setInvestigation({
      EEG: "Yes",
      ECG: "Yes",
      Xray: "Yes",
      CT: "Yes",
      MRI: "Yes",
      USG: "Yes",
      LabReport: "Yes",
      MedicalInstrument: "Yes",
      OPDFile: "Yes",
      OtherReports: "Yes",
      IPDBillCleared: "Yes",
      DisChargeSummary: "Yes",
      GatePass: "Yes",
      ICRemarks: "",
    });
    setMaterialCheck({
      MedicineTray: "Yes",
      WaterJug: "Yes",
      Glass: "Yes",
      GoodNight: "Yes",
      Blanket: "Yes",
      UrinePot: "Yes",
      TVRemote: "Yes",
      MaterialRemarks: "",
    });
    setSignature({
      PatientSignature: null,
      RelativeName: "",
      RelativeSignature: null,
      SisterIncharge: "",
    });
  };
  const handleInvestigationChange = (field, value) => {
    setInvestigation((prevState) => {
      // Reset the current field to make sure only the selected value is checked
      const newState = { ...prevState, [field]: value };
      return newState;
    });
  };

  const handleMaterialChange = (field, value) => {
    setMaterialCheck((prevState) => {
      // Reset the current field to make sure only the selected value is checked
      const newState = { ...prevState, [field]: value };
      return newState;
    });
  };

  const handleCheckboxChange = (field, value, type) => {
    if (type === "Investigation") {
      handleInvestigationChange(field, value);
    } else if (type === "MaterialCheck") {
      handleMaterialChange(field, value);
    }
  };
  const handleRemarksChange = (field, value, type) => {
    if (type === "Investigation") {
      handleInvestigationChange(field, value);
    } else if (type === "MaterialCheck") {
      handleMaterialChange(field, value);
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

      dispatch({ type: "modelcon", value: tdata });
    } else {
      const tdata = {
        message: "There is no file to view.",
        type: "warn",
      };
      dispatch({ type: "toast", value: tdata });
    }
  };

  const handleSignatureupload = (e) => {
    const { name, files } = e.target;

    // Ensure that files exist and are not empty
    if (files && files.length > 0) {
      let formattedValue = files[0];

      // Optional: Add validation for file type and size
      let allowedTypes = ["application/pdf", "image/jpeg", "image/png"]; // Example allowed types

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
        dispatch({ type: "toast", value: tdata });
      } else {
        if (formattedValue.size > maxSize) {
          // Dispatch a warning toast or handle file size validation
          const tdata = {
            message: "File size exceeds the limit of 5MB.",
            type: "warn",
          };
          dispatch({ type: "toast", value: tdata });
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            setSignature((prev) => ({
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
      dispatch({ type: "toast", value: tdata });
    }
  };

  const HandleSignatureChange = (e) => {
    const { name, value } = e.target;
    setSignature((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlesubmit = () => {
    const postdata = {
      ...Investigation,
      ...MaterialCheck,
      ...Signature,
      RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
      Createdby: UserData?.username,
    };
    console.log("postdata", postdata);
    axios
      .post(`${UrlLink}Ip_Workbench/IP_Discharge_Checklist_Link`, postdata)
      .then((res) => {
        const [type, message] = [
          Object.keys(res.data)[0],
          Object.values(res.data)[0],
        ];
        dispatch({ type: "toast", value: { message, type } });
        clearalldata();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        `${UrlLink}Ip_Workbench/IP_Discharge_Checklist_Link?RegistrationId=${IP_DoctorWorkbenchNavigation?.RegistrationId}`
      )
      .then((response) => {
        const res = response.data;
        console.log("resss", res);
        setDischargeCheckGET(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [UrlLink,Signature]);

  const DisChargeColumns = [
    {
      key: "id",
      name: "S.No",
    },
    {
      key: "RegistrationId",
      name: "Registration Id",
    },
    {
      key: "RelativeName",
      name: "Relative Name",
    },
    {
      key: "SisterIncharge",
      name: "Sister Incharge",
    },
    {
      key: "CurrDate",
      name: "Current Date",
    },
    {
      key: "CurrTime",
      name: "Current Time",
    },
    {
      key: "Createdby",
      name: "Created by",
    },
  ];

  return (
    <>
      <div className="DivCenter_container">Investigation Paper Checklist</div>
      <table
        style={{
          width: "60%",
          borderCollapse: "collapse",
          borderColor: "aqua",
        }}
      >
        <tbody>
          {Object.keys(Investigation).map((field, ind) => (
            <tr key={ind}>
              <td
                style={{
                  padding: "5px",
                  border: "1px solid black",
                  width: "25%",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <label htmlFor={`${field}_${ind}`}>
                  {field === "ICRemarks"
                    ? "Remarks"
                    : field === "Xray"
                    ? "X-ray"
                    : field === "OPDFile"
                    ? "OPD File"
                    : field === "IPDBillCleared"
                    ? "IPD Bill Cleared"
                    : field === "DisChargeSummary"
                    ? "Discharge Summary"
                    : formatLabel(field)}
                </label>
              </td>
              {field === "ICRemarks" ? (
                <td
                  colSpan="3"
                  style={{
                    border: "1px solid black",
                    width: "70%",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    maxWidth: "70%",
                  }}
                >
                  <textarea
                    id={`textarea_${field}_${ind}`}
                    value={Investigation[field]}
                    onChange={(e) =>
                      handleRemarksChange(
                        field,
                        e.target.value,
                        "Investigation"
                      )
                    }
                    style={{ width: "100%", minHeight: "50px" }}
                  />
                </td>
              ) : (
                <>
                  <td
                    style={{
                      padding: "5px",
                      border: "1px solid black",
                      width: "25%",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <input
                      id={`checkbox_${field}_${ind}_yes`}
                      type="checkbox"
                      checked={Investigation[field] === "Yes"}
                      onChange={() =>
                        handleCheckboxChange(field, "Yes", "Investigation")
                      }
                    />
                    <label
                      htmlFor={`checkbox_${field}_${ind}_yes`}
                      style={{ marginLeft: "10px" }}
                    >
                      Yes
                    </label>
                  </td>
                  <td
                    style={{
                      padding: "5px",
                      border: "1px solid black",
                      width: "25%",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <input
                      id={`checkbox_${field}_${ind}_no`}
                      type="checkbox"
                      checked={Investigation[field] === "No"}
                      onChange={() =>
                        handleCheckboxChange(field, "No", "Investigation")
                      }
                    />
                    <label
                      htmlFor={`checkbox_${field}_${ind}_no`}
                      style={{ marginLeft: "10px" }}
                    >
                      No
                    </label>
                  </td>
                  <td
                    style={{
                      padding: "5px",
                      border: "1px solid black",
                      width: "25%",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <input
                      id={`checkbox_${field}_${ind}_n/a`}
                      type="checkbox"
                      checked={Investigation[field] === "N/A"}
                      onChange={() =>
                        handleCheckboxChange(field, "N/A", "Investigation")
                      }
                    />
                    <label
                      htmlFor={`checkbox_${field}_${ind}_n/a`}
                      style={{ marginLeft: "10px" }}
                    >
                      N/A
                    </label>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <div className="DivCenter_container">Hospital Material Checklist</div>
      <table
        style={{
          width: "60%",
          borderCollapse: "collapse",
          borderColor: "aqua",
        }}
      >
        <tbody>
          {Object.keys(MaterialCheck).map((field, ind) => (
            <tr key={ind}>
              <td
                style={{
                  padding: "5px",
                  border: "1px solid black",
                  width: "25%",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <label htmlFor={`${field}_${ind}`}>
                  {field === "MaterialRemarks"
                    ? "Remarks"
                    : field === "TVRemote"
                    ? "TV Remote"
                    : formatLabel(field)}
                </label>
              </td>
              {field === "MaterialRemarks" ? (
                <td
                  colSpan="3"
                  style={{
                    padding: "5px",
                    border: "1px solid black",
                    width: "75%",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  <textarea
                    id={`textarea_${field}_${ind}`}
                    value={MaterialCheck[field]}
                    onChange={(e) =>
                      handleRemarksChange(
                        field,
                        e.target.value,
                        "MaterialCheck"
                      )
                    }
                    style={{ width: "100%", minHeight: "50px" }}
                  />
                </td>
              ) : (
                <>
                  <td
                    style={{
                      padding: "5px",
                      border: "1px solid black",
                      width: "25%",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <input
                      id={`checkbox_${field}_${ind}_yes`}
                      type="checkbox"
                      checked={MaterialCheck[field] === "Yes"}
                      onChange={() =>
                        handleCheckboxChange(field, "Yes", "MaterialCheck")
                      }
                    />
                    <label
                      htmlFor={`checkbox_${field}_${ind}_yes`}
                      style={{ marginLeft: "10px" }}
                    >
                      Yes
                    </label>
                  </td>
                  <td
                    style={{
                      padding: "5px",
                      border: "1px solid black",
                      width: "25%",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <input
                      id={`checkbox_${field}_${ind}_no`}
                      type="checkbox"
                      checked={MaterialCheck[field] === "No"}
                      onChange={() =>
                        handleCheckboxChange(field, "No", "MaterialCheck")
                      }
                    />
                    <label
                      htmlFor={`checkbox_${field}_${ind}_no`}
                      style={{ marginLeft: "10px" }}
                    >
                      No
                    </label>
                  </td>
                  <td
                    style={{
                      padding: "5px",
                      border: "1px solid black",
                      width: "25%",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <input
                      id={`checkbox_${field}_${ind}_n/a`}
                      type="checkbox"
                      checked={MaterialCheck[field] === "N/A"}
                      onChange={() =>
                        handleCheckboxChange(field, "N/A", "MaterialCheck")
                      }
                    />
                    <label
                      htmlFor={`checkbox_${field}_${ind}_n/a`}
                      style={{ marginLeft: "10px" }}
                    >
                      N/A
                    </label>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="RegisFormcon_1">
        {Object.keys(Signature).map((field, indx) => (
          <div className="RegisForm_1" key={indx}>
            <label htmlFor={`${field}_${indx}_${field}`}>
              {formatLabel(field)} <span>:</span>
            </label>
            {["PatientSignature", "RelativeSignature"].includes(field) ? (
              <>
                <input
                  type="file"
                  name={field}
                  accept="image/jpeg, image/png,application/pdf"
                  required
                  id={`${field}_${indx}_${field}`}
                  autoComplete="off"
                  onChange={handleSignatureupload}
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
                    onClick={() => Selectedfileview(Signature[field])}
                  >
                    view
                  </button>
                </div>
              </>
            ) : field === "RelativeName" ? (
              <>
                <input
                  type="text"
                  id={`${field}_${indx}_${field}`}
                  name={field}
                  value={Signature[field]}
                  onChange={HandleSignatureChange}
                />
              </>
            ) : (
              <select
                name={field}
                value={Signature[field]}
                onChange={HandleSignatureChange}
              >
                <option value="">Select</option>
                {/* {DoctorData.map((doctor, index) => (
                <option key={index} value={doctor.id}>
                {doctor.Name}
                </option>
            ))} */}
              </select>
            )}
          </div>
        ))}
      </div>
      <div className="Main_container_Btn">
        <button onClick={handlesubmit}> Save</button>
      </div>
      <ReactGrid RowData={DischargeCheckGET} columns={DisChargeColumns} />
      <ToastAlert Message={toast.message} Type={toast.type} />
      <ModelContainer />
    </>
  );
};

export default DischargeChecklist;
