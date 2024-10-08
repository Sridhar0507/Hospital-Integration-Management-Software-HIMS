import React, { useState, useEffect } from "react";
import "./DoctorDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import ForwardIcon from "@mui/icons-material/Forward";
import ToastAlert from "../OtherComponent/ToastContainer/ToastAlert";
import axios from "axios";
import ContextMenu from "./ContextMenu";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const toast = useSelector((state) => state.userRecord?.toast);
  const [contextMenu, setContextMenu] = useState(null);
  const dispatchvalue = useDispatch();
  const navigate = useNavigate();
  const [IsPatientStatusGet, setIsPatientStatusGet] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const [OpDoctors, setOpDoctors] = useState({
    inhouse_doctors: [],
    visiting_doctors: [],
  });
  console.log("qwe", OpDoctors);
  const [OpPatients, setOpPatients] = useState({});
  console.log("OpPatients", OpPatients);
  const [allDoctors, setAllDoctors] = useState([]);

  // Fetch doctor details
  useEffect(() => {
    axios
      .get(`${UrlLink}Masters/OpDoctor_Details_link`)
      .then((response) => {
        setOpDoctors({
          inhouse_doctors: response.data.inhouse_doctors || [],
          visiting_doctors: response.data.visiting_doctors || [],
        });
        const allDoctors = [
          ...(response.data.inhouse_doctors || []),
          ...(response.data.visiting_doctors || []),
        ];
        setAllDoctors(allDoctors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [UrlLink, IsPatientStatusGet]);

  // Fetch patient details
  useEffect(() => {
    if (allDoctors.length > 0) {
      const doctorIds = allDoctors.map((doctor) => doctor.Doctor_ID);
      axios
        .get(`${UrlLink}Masters/OpPatients_Details_link`, {
          params: {
            doctorIds: doctorIds.join(","),
          },
        })
        .then((response) => {
          setOpPatients(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [UrlLink, allDoctors, IsPatientStatusGet]);

  const handleStatusChange = (PatientId, VisitId, newStatus) => {
    console.log("handlechangePatient", PatientId, VisitId, newStatus);

    const newPatientId = PatientId;
    const newStatusChange = newStatus;
    const newVisitId = VisitId;

    if (newPatientId && newStatusChange && newVisitId) {
      setOpPatients((prevPatients) => ({
        ...prevPatients,
        patients_details: prevPatients.patients_details.map((patient) =>
          patient.PatientId === PatientId
            ? { ...patient, Status: newStatus }
            : patient
        ),
      }));

      axios
        .post(`${UrlLink}Masters/StatusUpdate_Details_Patient`, {
          newPatientId,
          newVisitId,
          newStatusChange,
        })
        .then((res) => {
          const resres = res.data;
          const typp = Object.keys(resres)[0];
          const mess = Object.values(resres)[0];
          const tdata = {
            message: mess,
            type: typp,
          };
          dispatchvalue({ type: "toast", value: tdata });
          setIsPatientStatusGet((prev) => !prev);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRightClick = (event, patient) => {
    event.preventDefault();
    setSelectedPatient(patient);
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };
  const handleSelectStatus = (newStatus) => {
    if (selectedPatient) {
      handleStatusChange(
        selectedPatient.PatientId,
        selectedPatient.VisitId,
        newStatus
      );
      setContextMenu(null);
    }
  };

  const handlePatientDetailsClick = (doctorId, status) => {
    console.log("Patient details clicked", doctorId, status);

    const url = status
      ? `${UrlLink}Masters/Status_Patient_Details_link`
      : `${UrlLink}Masters/Separated_Patient_Details_link`;

    axios
      .get(url, {
        params: { DoctorId: doctorId, ...(status && { Status: status }) },
      })
      .then((response) => {
        const patientDetails = response.data.patients_details;
        console.log("Patient Details:", patientDetails);

        setOpPatients((prev) => {
          const updatedPatients = prev.patients_details.filter(
            (patient) => patient.PrimaryDoctor !== doctorId
          );

          const newPatientsDetails = [...updatedPatients, ...patientDetails];

          return {
            ...prev,
            patients_details: newPatientsDetails,
          };
        });
      })
      .catch((err) => {
        console.log("Error fetching patient details:", err);
      });
  };

  const handlePatientDetailsVisitClick = (doctorId, VisitPurpose) => {
    console.log("visit details clicked", doctorId, VisitPurpose);

    const url = VisitPurpose
      ? `${UrlLink}Masters/VisitPurpose_Patient_Details_link`
      : `${UrlLink}Masters/Separated_Patient_Details_link`;

    axios
      .get(url, {
        params: { DoctorId: doctorId, ...(VisitPurpose && { VisitPurpose: VisitPurpose }) },
      })
      .then((response) => {
        const patientDetails = response.data.patients_details;
        console.log("Patient Details:", patientDetails);

        setOpPatients((prev) => {
          const updatedPatients = prev.patients_details.filter(
            (patient) => patient.PrimaryDoctor !== doctorId
          );

          const newPatientsDetails = [...updatedPatients, ...patientDetails];

          return {
            ...prev,
            patients_details: newPatientsDetails,
          };
        });
      })
      .catch((err) => {
        console.log("Error fetching patient details:", err);
      });
  };

  const allDoctorsPatients = [
    ...OpDoctors.inhouse_doctors,
    ...OpDoctors.visiting_doctors,
  ];
  console.log("allDoctorsPatients", allDoctorsPatients);

  const handlePatientRegister = async (doctorId, patientId, visitId) => {
    console.log("Doctor ID:", doctorId);
    console.log("Patient ID:", patientId);
    console.log("Visit ID:", visitId);

    try {
      // Fetch patient data from the backend
      const response = await axios.get(
        `${UrlLink}Frontoffice/get_Patient_Details_by_patientId`,
        {
          params: {
            PatientId: patientId,
            VisitId: visitId,
            DoctorID: doctorId,
          },
        }
      );

      if (response.data) {
        if (response.data.patients) {
          const patientData = Array.isArray(response.data.patients)
            ? response.data.patients[0]
            : response.data.patients;

          // Dispatch the fetched patient data to the Redux store
          dispatchvalue({
            type: "UsercreatePatientdata",
            value: { ...patientData },
          });

          // Navigate to the PatientNavigation component
          navigate("/Home/PatientNavigation");
        } else {
          console.log("No patient data found");
        }
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  return (
    <div className="Main_container_app" id="scrollupppp">
      <div className="h_head">
        <h4>Doctor Dashboard</h4>
      </div>
      <div className="doctor_table_das">
        <div className="table_container_docdas">
          <table>
            <thead>
              <tr>
                {allDoctors.map((doctor) => {
                  const isVisiting = doctor.DoctorType === "Visiting";
                  const patientCount =
                    (OpPatients &&
                      OpPatients.doctor_patient_totals &&
                      OpPatients.doctor_patient_totals[doctor.Doctor_ID]) ||
                    0;
                  const registeredCount = doctor.registered_patient_count || 0;
                  const consultedCount = doctor.consulted_patient_count || 0;
                  const newconsultationCount =
                    doctor.new_consultation_count || 0;
                  const followupCount = doctor.followup_count || 0;

                  return (
                    <th
                      key={doctor.Doctor_ID}
                      style={{
                        color: isVisiting ? "red" : "black",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handlePatientDetailsClick(doctor.Doctor_ID)
                      }
                    >
                      {/* {doctor.Full_Name} {patientCount} */}
                      <div>
                        <div>
                          <strong>{doctor.Full_Name}</strong>{" "}
                          {/* Doctor's full name */}
                        </div>
                        <div>
                          Patient Count: {patientCount}{" "}
                          {/* Total patient count */}
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePatientDetailsVisitClick(
                              doctor.Doctor_ID,
                              "NewConsultation"
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          New Consultation Count: {newconsultationCount}{" "}
                          {/* New consultation count */}
                        </div>
                        <div     onClick={(e) => {
                            e.stopPropagation();
                            handlePatientDetailsVisitClick(
                              doctor.Doctor_ID,
                              "FollowUp"
                            );
                          }}
                          style={{ cursor: "pointer" }}>
                          Follow-Up Count: {followupCount}{" "}
                          {/* Follow-up count */}
                        </div>
                      </div>

                      <div>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePatientDetailsClick(
                              doctor.Doctor_ID,
                              "Registered"
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Registered: {registeredCount}
                        </span>
                      </div>
                      <div>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePatientDetailsClick(
                              doctor.Doctor_ID,
                              "Completed"
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Completed: {consultedCount}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {allDoctorsPatients.map((doctor) => {
                  const patientsForDoctor = OpPatients.patients_details?.filter(
                    (patient) => patient.PrimaryDoctor === doctor.Doctor_ID
                  );

                  return (
                    <td key={doctor.Doctor_ID}>
                      {patientsForDoctor?.length > 0 ? (
                        <ul>
                          {patientsForDoctor?.map((patient) => (
                            <li
                              key={patient.PatientId}
                              onContextMenu={(e) =>
                                handleRightClick(e, patient)
                              }
                            >
                              <div
                                className={`iuyr444r ${patient.Status.toLowerCase()}`}
                              >
                                <h5>{patient.PatientName}</h5>
                                <div className="dsewx">
                                  <div className="kjs26">
                                    <p>{patient.VisitPurpose}</p>
                                  </div>
                                  <div className="frwr_icom8">
                                    <ForwardIcon
                                      onClick={() =>
                                        handlePatientRegister(
                                          doctor.Doctor_ID,
                                          patient.PatientId,
                                          patient.VisitId
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No patients</p>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={handleCloseContextMenu}
            onSelectStatus={handleSelectStatus}
            onMouseLeave={handleCloseContextMenu}
          />
        )}
        <ToastAlert Message={toast.message} Type={toast.type} />
      </div>
    </div>
  );
}

export default DoctorDashboard;
