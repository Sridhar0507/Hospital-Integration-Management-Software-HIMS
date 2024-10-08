import React, { useState, useEffect } from "react";
import "../../DoctorWorkBench/Navigation.css";
import axios from "axios";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgImg2 from "../../Assets/bgImg2.jpg";
import "../../DoctorWorkBench/TreatmentComponent.css";

const IP_BillingEntry = () => {
  const [ServiceProcedureForm, setServiceProcedureForm] =
    useState("Service");
  const [ServiceProcedureData, setServiceProcedureData] = useState([]);
  const [ServiceProcedureDataGet, setServiceProcedureDataGet] = useState([]);
  const [Consultation, setConsultation] = useState({
    PhysicianType: "",
    Physician: "",
    Service: "",
    Procedure: "",
    DrugName: "",
    LabTest: "",
    RadiologyTest: "",
    Units: "",
  });

  const [PhysicianData, setPhysicianData] = useState([]);

  const [getdata, setgetdata] = useState(false);
  const IP_DoctorWorkbenchNavigation = useSelector(
    (state) => state.Frontoffice?.IP_DoctorWorkbenchNavigation
  );
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const UserData = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const dispatchvalue = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('IIIIIIIpppppppp',IP_DoctorWorkbenchNavigation);
    if (Object.keys(IP_DoctorWorkbenchNavigation).length === 0) {
      navigate("/Home/IP_NurseQuelist");
    }
  }, [IP_DoctorWorkbenchNavigation]);

  useEffect(() => {
    axios
      .get(
        `${UrlLink}Masters/get_service_procedure_for_ip?MasterType=${ServiceProcedureForm}`
      )
      .then((res) => {
        setServiceProcedureData(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ServiceProcedureForm, UrlLink]);

  useEffect(() => {
    axios
      .get(
        `${UrlLink}Ip_Workbench/IP_Billing_Entry_link?RegistrationId=${IP_DoctorWorkbenchNavigation?.RegistrationId}`
      )
      .then((res) => {
        setServiceProcedureDataGet(Array.isArray(res.data) ? res.data : []);
        console.log("11111111", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [IP_DoctorWorkbenchNavigation?.RegistrationId, UrlLink, getdata]);

  // useEffect(() => {
  //   axios
  //     .get(`${UrlLink}`)
  //     .then((response) => {
  //       const res = response.data;
  //       setPhysicianData(res);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

  const handlePhysicianTypeChange = (e) => {
    setConsultation((prev) => ({
      ...prev,
      PhysicianType: e.target.value,
    }));

    axios
      .get(`${UrlLink}Ip_Workbench/IP_InchargeAndRefer_Details_Link`, {
        params: {
          Type: e.target.value,
          RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
        },
      })
      .then((response) => {
        const res = response.data;
        console.log("resssss", res);
        setPhysicianData(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePhysicianChange = (e) => {
    setConsultation((prev) => ({
      ...prev,
      Physician: e.target.value,
    }));
  };
  const handleServiceChange = (e) => {
    setConsultation((prev) => ({
      ...prev,
      Service: e.target.value,
    }));
  };
  const handleProcedureChange = (e) => {
    setConsultation((prev) => ({
      ...prev,
      Procedure: e.target.value,
    }));
  };

  const handleDrugNameChange = (e) => {
    setConsultation((prev) => ({
      ...prev,
      DrugName: e.target.value,
    }));
  };

  const handleLabTestChange = (e) => {
    setConsultation((prev) => ({
      ...prev,
      LabTest: e.target.value,
    }));
  };
  const handleRadiologyTestChange = (e) => {
    setConsultation((prev) => ({
      ...prev,
      RadiologyTest: e.target.value,
    }));
  };

  const handleCommonFieldChange = (field) => (e) => {
    setConsultation((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handlesubmit = () => {
    // Define required fields for each ServiceProcedureForm type
    const requiredFields = {
      Consultation: ["PhysicianType", "Physician", "Units"],
      Pharmacy: ["DrugName", "Units"],
      Lab: ["LabTest", "Units"],
      Radiology: ["RadiologyTest", "Units"],
      Service: ["Service", "Units"],
      Procedure: ["Procedure", "Units"],
    };
  
    // Check if all required fields for the selected service procedure type are filled
    const isFormValid = requiredFields[ServiceProcedureForm].every(
      (field) => Consultation[field]
    );
  
    if (isFormValid) {
      // Construct data to be submitted based on ServiceProcedureForm and Consultation object
      const submitdata = {
        RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
        ServiceType: ServiceProcedureForm, // Current selected procedure form
        ...Consultation, // Spread Consultation data (PhysicianType, Service, Procedure, etc.)
        createdby: UserData?.username,
        BillingDataList_ID : IP_DoctorWorkbenchNavigation?.id,
      };
  
      console.log("Submit data:", submitdata);
  
      // Make an API request to submit the form
      axios
        .post(`${UrlLink}Ip_Workbench/IP_Billing_Entry_link`, submitdata)
        .then((res) => {
          console.log("Submission response:", res.data);
          const resres = res.data;
          let typp = Object.keys(resres)[0]; // Get response type (success, error)
          let mess = Object.values(resres)[0]; // Get response message
          const tdata = {
            message: mess,
            type: typp,
          };
  
          // Refresh the data after adding a service procedure
          setgetdata((prev) => !prev);
          dispatchvalue({ type: "toast", value: tdata });
  
          // Reset the form fields for the next entry
          setConsultation({
            PhysicianType: "",
            Physician: "",
            DrugName: "",
            LabTest: "",
            RadiologyTest: "",
            Service: "",
            Procedure: "",
            Units: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Display a warning toast if the form is incomplete
      const tdata = {
        message: "Please fill all the required fields",
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  };
  

  const Servicecolumns1 = [
    {
      key: "DateTime",
      name: "Date Time",
      frozen: true,
    },
    {
      key: "Status",
      name: "Status",
      frozen: true,
    },
  ];
  const basecolumns = [
    {
      key: "created_at",
      name: "Date Time",
      frozen: true,
    },
    {
      key: "ServiceStatus",
      name: "Status",
      frozen: true,
    },
    {
      key: "ServiceName",
      name: `Service Name`,
    },
    {
      key: "Units",
      name: "Units",
    },
  ]

  const Servicecolumns =
    ServiceProcedureForm === "Consultation"
      ? [
          {
            key: "PhysicianType",
            name: `Physician Type`,
          },
          {
            key: "Physician",
            name: `Physician Name`,
          },
          ...basecolumns,
        ]
      : basecolumns;
  return (
    <>
      <div className="Main_container_app">
        <div className="new-patient-registration-form">
          <br />
          <div className="dctr_info_up_head">
            <div className="RegisFormcon ">
              <div className="dctr_info_up_head22">
                <img src={bgImg2} alt="Default Patient" />

                <label>Profile</label>
              </div>
            </div>

            <div className="RegisFormcon_1">
              <div className="RegisForm_1 ">
                <label htmlFor="PatientID">
                  Patient ID <span>:</span>
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="PatientID">
                  {IP_DoctorWorkbenchNavigation?.PatientId}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="PatientName">
                  Patient Name <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="PatientName">
                  {IP_DoctorWorkbenchNavigation?.PatientName}
                </span>
              </div>

              <div className="RegisForm_1 ">
                <label htmlFor="Age">
                  Age <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Age">
                  {IP_DoctorWorkbenchNavigation?.Age}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="Gender">
                  Gender <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Gender">
                  {IP_DoctorWorkbenchNavigation?.Gender}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="Gender">
                  Blood Group <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Gender">
                  {IP_DoctorWorkbenchNavigation?.BloodGroup}
                </span>
              </div>
            </div>
          </div>
        </div>
        <h3>Bill Entry</h3>
        <div className="new-patient-registration-form">
          {/* <div className="DivCenter_container">Billing Items</div> */}
          <br />
          <div className="RegisterTypecon">
            <div className="RegisterType">
              {[
                "Service",
                "Procedure",
                "Consultation",
                "Pharmacy",
                "Radiology",
                "Lab",
              ].map((p, ind) => (
                <div className="registertypeval" key={ind + "key"}>
                  <input
                    type="radio"
                    id={p}
                    name="appointment_type"
                    checked={ServiceProcedureForm === p}
                    onChange={(e) => {
                      setServiceProcedureForm(e.target.value);
                      setConsultation({
                        PhysicianType: "",
                        Physician: "",
                        Service: "",
                        Procedure: "",
                        DrugName: "",
                        LabTest: "",
                        RadiologyTest: "",
                        Units: "",
                      });
                    }}
                    value={p}
                  />
                  <label htmlFor={p}>{p}</label>
                </div>
              ))}
            </div>
          </div>
          <br />

          <div className="RegisFormcon_1">
            {/* Define the fields for each type of ServiceProcedure */}
            {[
              {
                formType: "Consultation",
                fields: ["PhysicianType", "Physician", "Units"],
              },
              {
                formType: "Pharmacy",
                fields: ["DrugName", "Units"],
              },
              {
                formType: "Lab",
                fields: ["LabTest", "Units"],
              },
              {
                formType: "Radiology",
                fields: ["RadiologyTest", "Units"],
              },
              {
                formType: "Service",
                fields: ["Service", "Units"],
              },
              {
                formType: "Procedure",
                fields: ["Procedure", "Units"],
              },
            ]
              .filter(({ formType }) => formType === ServiceProcedureForm)
              .flatMap(({ fields }) =>
                fields.map((field, indx) => (
                  <div className="RegisForm_1" key={indx}>
                    <label htmlFor={`${field}_${indx}`}>
                      {field}:<span>:</span>
                    </label>

                    {/* Render specific fields */}
                    {field === "PhysicianType" && (
                      <select
                        value={Consultation.PhysicianType}
                        onChange={handlePhysicianTypeChange}
                      >
                        <option value="">Select</option>
                        <option value="Incharge">Incharge Doctor</option>
                        <option value="Refer">Visit Doctor</option>
                      </select>
                    )}

                    {field === "Physician" &&
                      ServiceProcedureForm === "Consultation" && (
                        <select
                          value={Consultation.Physician}
                          onChange={handlePhysicianChange}
                        >
                          <option value="">Select</option>
                          {PhysicianData.map((row, idx) => (
                            <option key={idx} value={row.ReferDoctorId}>
                              {row.ReferDoctorName}
                            </option>
                          ))}
                        </select>
                      )}
                    {field === "Service" &&
                      ServiceProcedureForm === "Service" && (
                        <select
                          value={Consultation.Service}
                          onChange={handleServiceChange}
                        >
                          <option value="">Select</option>
                          {ServiceProcedureData.map((row, indx) => (
                            <option value={row.id} key={indx}>
                              {row.name}
                            </option>
                          ))}
                        </select>
                      )}
                    {field === "Procedure" &&
                      ServiceProcedureForm === "Procedure" && (
                        <select
                          value={Consultation.Procedure}
                          onChange={handleProcedureChange}
                        >
                          <option value="">Select</option>
                          {ServiceProcedureData.map((row, indx) => (
                            <option value={row.id} key={indx}>
                              {row.name} | {row.Type}
                            </option>
                          ))}
                        </select>
                      )}

                    {field === "DrugName" &&
                      ServiceProcedureForm === "Pharmacy" && (
                        <input
                          type="text"
                          value={Consultation.DrugName}
                          onChange={handleDrugNameChange}
                        />
                      )}
                    {field === "RadiologyTest" &&
                      ServiceProcedureForm === "Radiology" && (
                        <input
                          type="text"
                          value={Consultation.RadiologyTest}
                          onChange={handleRadiologyTestChange}
                        />
                      )}

                    {field === "LabTest" && ServiceProcedureForm === "Lab" && (
                      <input
                        type="text"
                        value={Consultation.LabTest}
                        onChange={handleLabTestChange}
                      />
                    )}

                    {/* Render common fields */}
                    {["Units", "Charge", "GST", "Total"].includes(field) && (
                      <input
                        type="number"
                        value={Consultation[field]}
                        onChange={handleCommonFieldChange(field)}
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                      />
                    )}
                  </div>
                ))
              )}
          </div>

          <div className="Main_container_Btn">
            <button onClick={handlesubmit}>Add</button>
          </div>
          <br />
          <ReactGrid
            columns={Servicecolumns}
            RowData={ServiceProcedureDataGet}
          />
        </div>

        <ToastAlert Message={toast.message} Type={toast.type} />
      </div>
    </>
  );
};

export default IP_BillingEntry;
