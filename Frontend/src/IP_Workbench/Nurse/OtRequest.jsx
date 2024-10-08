import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import Button from "@mui/material/Button";
const OtRequest = () => {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  console.log("userRecord", userRecord);
  const toast = useSelector((state) => state.userRecord?.toast);
  const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
  console.log("IP_DoctorWorkbenchNavigation", IP_DoctorWorkbenchNavigation);
  const dispatchvalue = useDispatch();

  const [OtRequest, setOtRequest] = useState({
    OtRequetsId: "",
    PrimaryDoctor: "",
    SurgeryName: "",
    SurgeryDate: "",
    SurgeryTime: "",
    Remarks: "",
    SurgerySpeciality: "",
    Priority: "",
    Speciality: "",
    AdditionalDoctor: "No",
    SurgeonSpeciality: "",
    SurgeonName: "",
  });
  console.log("Ot", OtRequest);

  const [SpecialityData, setSpecialityData] = useState([]);
  const [ResponseData,setResponseData] = useState([]);
  const [SurgeryData, setSurgeryData] = useState([]);
  const [SurgeryDoctorData, setSurgeryDoctorData] = useState([]);
  const [OtRequestGet, setOtRequestGet] = useState(false);

  useEffect(() => {
    axios.get(`${UrlLink}Masters/Speciality_Detials_link`)
      .then((res) => {
        const ress = res.data
        console.log("specialization", ress);
        setSpecialityData(ress)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [UrlLink])


  useEffect(() => {
    const params = {
      DoctorId: IP_DoctorWorkbenchNavigation?.DoctorName,
      Specialization: IP_DoctorWorkbenchNavigation?.Specialization
    };

    if (params.DoctorId && params.Specialization) {
      axios.get(`${UrlLink}OP/OtRequest_Details`, { params })
        .then((res) => {
          const ress = res.data;
          console.log("Response:", ress);

          if (ress.DoctorName && ress.SpecialityName) {
            setOtRequest(prevState => ({
              ...prevState,
              PrimaryDoctor: ress.DoctorName,
              Speciality: ress.SpecialityName
            }));
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }

  }, [UrlLink, IP_DoctorWorkbenchNavigation?.DoctorName, IP_DoctorWorkbenchNavigation?.Specialization]);



  useEffect(() => {
    if (OtRequest.SurgerySpeciality) {
      axios.get(`${UrlLink}Masters/Surgeryname_Speciality_link`, {
        params: { Speciality: OtRequest.SurgerySpeciality }
      })
        .then((response) => {
          console.log("Response Dataspeciality", response.data);

          // Check if the data is an array before setting it to the state
          if (Array.isArray(response.data)) {
            setSurgeryData(response.data);
          } else {
            setSurgeryData([]);  // Handle cases where data isn't an array
          }
        })
        .catch((err) => {
          console.log(err);
          setSurgeryData([]); // Set it to an empty array in case of an error
        });
    }
  }, [UrlLink, OtRequest.SurgerySpeciality]);

  useEffect(() => {
    if (OtRequest.AdditionalDoctor === "Yes" && OtRequest.SurgerySpeciality) {
      axios.get(`${UrlLink}Masters/Surgeryname_Speciality_Doctor_link`, {
        params: { Speciality: OtRequest.SurgerySpeciality }
      })
        .then((response) => {
          console.log("Response Dataspecialitydoctor", response.data);

          // Check if the data is an array before setting it to the state
          if (Array.isArray(response.data)) {
            setSurgeryDoctorData(response.data);
          } else {
            setSurgeryDoctorData([]);  // Handle cases where data isn't an array
          }
        })
        .catch((err) => {
          console.log(err);
          setSurgeryDoctorData([]); // Set it to an empty array in case of an error
        });
    }
  }, [UrlLink, OtRequest.SurgerySpeciality]);



  const handleOtRequestChange = (e) => {
    const { name, value } = e.target;

    if (name === 'AdditionalDoctor') {
      if (value === 'No') {
        setOtRequest((previous) => ({
          ...previous,
          SurgeonName: '',
        }));
      }
      setOtRequest((previous) => ({
        ...previous,
        AdditionalDoctor: value,
      }));

    }


    setOtRequest((previous) => ({
      ...previous,
      [name]: value,
    }));

  };
  const handleOtRequestSubmit = () => {
    // Check if SurgeryName is provided and AdditionalDoctor/SurgeryName conditions are met
    if (OtRequest.SurgeryName !== "") {
  
      const data = {
        ...OtRequest,
        RegisterType: "IP",
        created_by: userRecord?.username || "",
        RegistrationId: IP_DoctorWorkbenchNavigation?.pk
      };
      
      console.log("sendOtRequestdata", data);
  
      axios.post(`${UrlLink}OP/OtRequest_Names_link`, data)
        .then((res) => {
          const reste = res.data;
          const typp = Object.keys(reste)[0];
          const mess = Object.values(reste)[0];
          const tdata = {
            message: mess,
            type: typp,
          };
  
          dispatchvalue({ type: "toast", value: tdata });
          setOtRequestGet((prev) => !prev);
          
          // Reset the form after submission
          setOtRequest({
            PrimaryDoctor: "",
            SurgeryName: "",
            SurgeryDate: "",
            SurgeryTime: "",
            Remarks: "",
            SurgerySpeciality: "",
            Priority: "",
            AdditionalDoctor: "No",  // Default back to "No"
            SurgeonName: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
  
    } else {
      // Warn the user if required fields are missing
      const tdata = {
        message: "Please provide the required fields.",
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  };
  

  useEffect(() => {
    // Ensure RegistrationId is available before making the request
    if (IP_DoctorWorkbenchNavigation?.pk) {
      const params = {
        RegistrationId: IP_DoctorWorkbenchNavigation?.pk, // Ensure RegistrationId is valid
        RegisterType: "IP" // Set the RegisterType explicitly
      };

      // Make the API call to fetch OT request details
      axios.get(`${UrlLink}OP/OtRequest_Names_link`, { params })
        .then((res) => {
          const responseData = res.data;
          console.log("Response dataget234:", responseData);
setResponseData(responseData);

        })
        .catch((err) => {
          console.error("Error fetching OT request data:", err);
        });
    }
  }, [UrlLink, OtRequestGet, IP_DoctorWorkbenchNavigation?.pk]);


  const OtrequestColumns = [
    {
        key: "id",
        name: "S.No ",
        frozen: true,
    },
    {
        key: "SurgeryName",
        name: "Surgery Name",
    },
    {
        key: "SurgeryDate",
        name: "Surgery Date",
    },
    {
        key: "SurgeryTime",
        name: "Surgery Time",
    },
    {
        key: "Priority",
        name: "Priority",
    },
    {
        key: "AdditionalDoctor",
        name: "AdditionalDoctor",
        renderCell: (params) => (
          
          <div>{params.row.AdditionalDoctor || 'Nill'}</div>
      )
    },
    {
      key: "Reason",
      name: "Reason",
      renderCell: (params) => (
          
        <div>{console.log(params)}{params.row.Reason || 'Nill'}</div>
    )
  }
   
];
  return (
    <>
      <div className="Main_container_app">
        <div className="RegisFormcon_1">

          <div className="common_center_tag">
            <span>OT Request</span>
          </div>
          <br></br>
          <br></br>



          <div className="RegisForm_1">
            <label htmlFor="ReportTime">
              Primary Doctor <span>:</span>
            </label>
            <input
              type="text"
              id="PrimaryDoctor"
              name="PrimaryDoctor"
              onChange={handleOtRequestChange}
              value={OtRequest.PrimaryDoctor}
              required
            />
          </div>
          <div className="RegisForm_1">
            <label> Surgery Speciality<span>:</span> </label>

            <select
              name='SurgerySpeciality'
              value={OtRequest.SurgerySpeciality}
              onChange={handleOtRequestChange}
            >
              <option value=''>Select</option>
              {
                SpecialityData.map((p) => (
                  <option key={p.id} value={p.id}>{p.SpecialityName}</option>
                ))
              }
            </select>
          </div>
          <div className="RegisForm_1">
            <label>
              Additional Doctor<span>:</span>
            </label>
            <div className="text_adjust_mt_Ot_rado_0">
              <div className="radio_Nurse_ot2">
                <label htmlFor="Yes">
                  <input
                    type="radio"
                    id="Yes"
                    name="AdditionalDoctor"
                    value="Yes"
                    // className="radio_Nurse_ot2_input"
                    checked={OtRequest.AdditionalDoctor === "Yes"}
                    onChange={handleOtRequestChange}
                  />
                  Yes
                </label>
              </div>
              <div className="radio_Nurse_ot2">
                <label htmlFor="No">
                  <input
                    type="radio"
                    id="No"
                    name="AdditionalDoctor"
                    value="No"
                    // className="radio_Nurse_ot2_input"
                    checked={OtRequest.AdditionalDoctor === "No"}
                    onChange={handleOtRequestChange}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {
            (OtRequest.AdditionalDoctor === 'Yes') && (
              <>

                <div className="RegisForm_1">
                  <label htmlFor="SurgeonName"> Surgeon Name<span>:</span> </label>

                  <select
                    name='SurgeonName'
                    value={OtRequest.SurgeonName}
                    onChange={handleOtRequestChange}
                  >
                    <option value=''>Select</option>
                    {
                      SurgeryDoctorData && SurgeryDoctorData.length > 0 ? (
                        SurgeryDoctorData.map((p) => (
                          <option key={p.id} value={p.Doctor_ID}>{p.Doctor_Name}</option>
                        ))
                      ) : (
                        <option value=''>No surgeon available</option>
                      )
                    }
                  </select>
                </div>
              </>

            )
          }


          <div className="RegisForm_1">
            <label> Surgery Name<span>:</span> </label>

            <select
              name='SurgeryName'
              value={OtRequest.SurgeryName}
              onChange={handleOtRequestChange}
            >
              <option value=''>Select</option>
              {
                SurgeryData && SurgeryData.length > 0 ? (
                  SurgeryData.map((p) => (
                    <option key={p.id} value={p.Surgery_Id}>{p.Surgery_Name}</option>
                  ))
                ) : (
                  <option value=''>No surgeries available</option>
                )
              }
            </select>
          </div>




          <div className="RegisForm_1">
            <label htmlFor="ReportDate">
              Surgery Date <span>:</span>
            </label>
            <input
              type="date"
              id="SurgeryDate"
              name="SurgeryDate"
              onChange={handleOtRequestChange}
              value={OtRequest.SurgeryDate}
              required
            />
          </div>
          <div className="RegisForm_1">
            <label htmlFor="ReportTime">
              Surgery Time <span>:</span>
            </label>
            <input
              type="time"
              id="SurgeryTime"
              name="SurgeryTime"
              onChange={handleOtRequestChange}
              value={OtRequest.SurgeryTime}
              required
            />
          </div>
          <div className="RegisForm_1">
            <label>
              Priority <span>:</span>
            </label>
            <select
              name="Priority"
              required
              value={OtRequest.Priority}
              onChange={handleOtRequestChange}
            >
              <option value="" disabled>Select</option>
              <option value="Urgent">Urgent</option>
              <option value="Regular">Regular</option>

            </select>
          </div>

          <div className="RegisForm_1">
            <label htmlFor="ReportTime">
              Remarks <span>:</span>
            </label>
            <textarea
              className="treatcon_body_1 textarea"
              id="Remarks"
              name="Remarks"
              onChange={handleOtRequestChange}
              value={OtRequest.Remarks}
              required
            />
          </div>
        </div>

        <div className="Main_container_Btn">
          <button onClick={handleOtRequestSubmit}>
            {OtRequest.RequestId ? "Update" : "Save"}
          </button>
        </div>
        <br></br>
        {ResponseData.length > 0 && (
                <>
                   
                    <ReactGrid columns={OtrequestColumns} RowData={ResponseData} />
                </>
            )}
        <ToastAlert Message={toast.message} Type={toast.type} />

      </div>

    </>
  )
}

export default OtRequest
