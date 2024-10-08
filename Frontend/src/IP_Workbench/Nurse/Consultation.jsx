import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";

const Consultation = () => {
  const [ServiceProcedureForm, setServiceProcedureForm] = useState("Service");
  const [ServiceProcedureData, setServiceProcedureData] = useState([]);
  const [ServiceProcedureDataGet, setServiceProcedureDataGet] = useState([]);
  const [Consultation, setConsultation] = useState({
    PhysicianType: "",
    Physician: "",
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
  useEffect(() => {
    axios
      .get(
        `${UrlLink}/Masters/get_service_procedure_for_ip?MasterType=${ServiceProcedureForm}`
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
        `${UrlLink}Ip_Workbench/IP_Consultation_Entry?RegistrationId=${IP_DoctorWorkbenchNavigation?.RegistrationId}`
      )
      .then((res) => {
        const ress = res.data
        setServiceProcedureDataGet(Array.isArray(ress) ? ress : []);
        console.log("11111111", ress);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    ServiceProcedureForm,
    IP_DoctorWorkbenchNavigation?.RegistrationId,
    UrlLink,
    getdata,
  ]);

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

  const handlesubmit = () => {
    if (Consultation?.PhysicianType && Consultation?.Physician && Consultation.Units) {
      const submitdata = {
        RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
        ...Consultation,
        createdby: UserData?.username,
      };

      console.log('submitdata',submitdata);
      
      axios
        .post(`${UrlLink}Ip_Workbench/IP_Consultation_Entry`, submitdata)
        .then((res) => {
          console.log(res.data);
          const resres = res.data;
          let typp = Object.keys(resres)[0];
          let mess = Object.values(resres)[0];
          const tdata = {
            message: mess,
            type: typp,
          };
          setgetdata((prev) => !prev);
          dispatchvalue({ type: "toast", value: tdata });

          setConsultation({
            PhysicianType: "",
            Physician: "",
            Units: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const tdata = {
        message: "Please fill all the fields",
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
  const Servicecolumns = [
    {
      key: "PhysicianType",
      name: `Physician Type`,
    },
    {
      key: "Physician",
      name: `Physician Name`,
    },
    {
      key: "ServiceName",
      name: `Service Name`,
    },
    {
      key: "created_at",
      name: "Date Time",
      frozen: true,
    },
    {
      key: "Units",
      name: "Units",
    },
  ]
  return (
    <>
      <div className="new-patient-registration-form">
        <div className="DivCenter_container">Consultation</div>
        <br />
        <div className="RegisFormcon_1">
          {Object.keys(Consultation)
            .filter((p) => p !== "Name")
            .map((field, indx) => (
              <div className="RegisForm_1" key={indx}>
                <label htmlFor={`${field}_${indx}`}>
                  {field}
                  <span>:</span>
                </label>
                {field === "Physician" ? (
                  <select
                    value={Consultation[field]}
                    onChange={handlePhysicianChange}
                  >
                    <option value="">Select</option>
                    {PhysicianData.map((row, idx) => (
                      <option key={idx} value={row.ReferDoctorId}>
                        {row.ReferDoctorName}
                      </option>
                    ))}
                  </select>
                ) : field === "PhysicianType" ? (
                  <select
                    value={Consultation[field]}
                    onChange={handlePhysicianTypeChange}
                  >
                    <option value="">Select</option>
                    <option value="Incharge">Incharge Doctor</option>
                    <option value="Refer">Visit Doctor</option>
                  </select>
                ) : (
                  <input
                    type="number"
                    value={Consultation[field]}
                    onChange={(e) =>
                      setConsultation((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                  />
                )}
              </div>
            ))}
        </div>
        <div className="Main_container_Btn">
          <button onClick={handlesubmit}>Add</button>
        </div>
        <br />
        <ReactGrid columns={Servicecolumns} RowData={ServiceProcedureDataGet} />
      </div>
      <ToastAlert Message={toast.message} Type={toast.type} />
    </>
  );
};

export default Consultation;
