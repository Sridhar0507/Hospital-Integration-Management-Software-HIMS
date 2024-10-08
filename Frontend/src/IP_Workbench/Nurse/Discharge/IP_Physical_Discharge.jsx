import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import ToastAlert from "../../../OtherComponent/ToastContainer/ToastAlert";
import { formatLabel } from "../../../OtherComponent/OtherFunctions";
import ModelContainer from "../../../OtherComponent/ModelContainer/ModelContainer";
import ReactGrid from "../../../OtherComponent/ReactGrid/ReactGrid";

const PhysicalDischarge = () => {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const UserData = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const IP_DoctorWorkbenchNavigation = useSelector(
    (state) => state.Frontoffice?.IP_DoctorWorkbenchNavigation
  );

  const dispatch = useDispatch();

  const [Physical, setPhysical] = useState({
    DrugReturned: "Yes",
    Dischargechecklistdone: "Yes",
    NursingClearanceDone: "Yes",
    DiagnosticBillClearanceDone: "Yes",
    IPDBillClearanceDone: "Yes",
    SisterIncharge : "",
    Remarks: "",
  });

  const [DischargeCheckGET, setDischargeCheckGET] = useState([]);

  const clearalldata = () => {
    setPhysical({
      DrugReturned: "Yes",
      Dischargechecklistdone: "Yes",
      NursingClearanceDone: "Yes",
      DiagnosticBillClearanceDone: "Yes",
      IPDBillClearanceDone: "Yes",
      SisterIncharge : "",
      Remarks: "",
    });
  };
  const handlePhysicalChange = (field, value) => {
    setPhysical((prevState) => {
      // Reset the current field to make sure only the selected value is checked
      const newState = { ...prevState, [field]: value };
      return newState;
    });
  };

  const handlesubmit = () => {
    const postdata = {
      ...Physical,
      RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
      Createdby: UserData?.username,
    };
    console.log("postdata", postdata);
    axios
      .post(`${UrlLink}Ip_Workbench/IP_Physical_Discharge_Link`, postdata)
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
        `${UrlLink}Ip_Workbench/IP_Physical_Discharge_Link?RegistrationId=${IP_DoctorWorkbenchNavigation?.RegistrationId}`
      )
      .then((response) => {
        const res = response.data;
        console.log("resss", res);
        setDischargeCheckGET(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [UrlLink,IP_DoctorWorkbenchNavigation?.RegistrationId]);

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
      <div className="DivCenter_container">IPD Physical Discharge</div>
      <table
        style={{
          width: "70%",
          borderCollapse: "collapse",
          borderColor: "aqua",
        }}
      >
        <tbody>
          {Object.keys(Physical).map((field, ind) => (
            <tr key={ind}>
              <td
                style={{
                  padding: "5px",
                  border: "1px solid black",
                  width: "40%",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <label htmlFor={`${field}_${ind}`}>
                  {field === "IDBandOff"
                    ? "ID Band Off"
                    : field === "IVCannulaOff"
                    ? "IV Cannula Off"
                    : field === "FoleysCathete"
                    ? "Foleys Catheter/ Other invasive tubes removed"
                    : field === "MedInstruction"
                    ? "Explained About Post Discharge Medicine Instruction"
                    : field === "WoundDressing"
                    ? "Explained About Post Discharge Wound Dressing"
                    : field === "DischargeSummary"
                    ? "Discharge Summary & Investigation Reports Handedover to Patient"
                    : field === "AttenderVisitiorPass"
                    ? "Attender & Visitior Pass Returned"
                    : field === "Exitpassgiven"
                    ? "Exit Pass Given"
                    : formatLabel(field)}
                </label>
              </td>
              {field === "Remarks" ? (
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
                    value={Physical[field]}
                    onChange={(e) =>
                      handlePhysicalChange(field, e.target.value, "Physical")
                    }
                    style={{ width: "100%", minHeight: "50px" }}
                  />
                </td>
              ) : field === "SisterIncharge" ? (
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
                  <select
                    style={{
                      width: "50%",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                    name={field}
                    value={Physical[field]}
                    onChange={handlePhysicalChange}
                  >
                    <option value="">Select</option>
                    {/* {DoctorData.map((doctor, index) => (
                <option key={index} value={doctor.id}>
                {doctor.Name}
                </option>
            ))} */}
                  </select>
                </td>
              ) : (
                <>
                  <td
                    style={{
                      padding: "5px",
                      border: "1px solid black",
                      width: "20%",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <input
                      id={`checkbox_${field}_${ind}_yes`}
                      type="checkbox"
                      checked={Physical[field] === "Yes"}
                      onChange={() =>
                        handlePhysicalChange(field, "Yes", "Physical")
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
                      width: "20%",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <input
                      id={`checkbox_${field}_${ind}_no`}
                      type="checkbox"
                      checked={Physical[field] === "No"}
                      onChange={() =>
                        handlePhysicalChange(field, "No", "Physical")
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
                      width: "20%",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <input
                      id={`checkbox_${field}_${ind}_n/a`}
                      type="checkbox"
                      checked={Physical[field] === "N/A"}
                      onChange={() =>
                        handlePhysicalChange(field, "N/A", "Physical")
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
      <div className="Main_container_Btn">
        <button onClick={handlesubmit}> Save</button>
      </div>
      <br />
      <ReactGrid RowData={DischargeCheckGET} columns={DisChargeColumns} />
      <ToastAlert Message={toast.message} Type={toast.type} />
      <ModelContainer />
    </>
  );
};

export default PhysicalDischarge;
