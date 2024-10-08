import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from 'axios';
import UpdateIcon from "@mui/icons-material/Update";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import AppointmentCaender from "../AppointmentRequestList/AppointmentCalender.css";


const Opdqueue = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const [searchOPParams, setsearchOPParams] = useState({ query: '', status: 'Pending' });
    const [searchDoctorParams, setsearchDoctorParams] = useState({Doctor:'' });
    console.log("123",searchDoctorParams);
    const dispatchvalue = useDispatch();
    const [OpenModalCancel, setOpenModalCancel] = useState(false);
    const [OpenModalCancel1, setOpenModalCancel1] = useState(false);
    const [OpenModalCancel11, setOpenModalCancel11] = useState(false);
    const [PatientRegisterData, setPatientRegisterData] = useState([]);
    const [CancelReason, setCancelReason] = useState("");
    const [CancelReason1, setCancelReason1] = useState("");
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    console.log(CancelReason);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [selectedrow, setSelectedRow] = useState(false);
    const [DoctorNameData, setDoctorNameData] = useState([]);
    const [SpecializationData, setSpecializationData] = useState([]);
    const [RegistrationCancelId, setRegistrationCancelId] = useState("");
    const [ResheduleReson,setResheduleReson] = useState(false);
    const pagewidth = useSelector(state => state.userRecord?.pagewidth);
    const toast = useSelector((state) => state.userRecord?.toast);
  const [previousDoctorId, setPreviousDoctorId] = useState("");
console.log("ss",previousDoctorId);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${UrlLink}Frontoffice/get_patient_appointment_details`, {
                params: searchOPParams
            });
            
            const result = response.data;
            console.log("Fetched Data:", result);
            
            if (Array.isArray(result)) {
                setPatientRegisterData(result);
            } else {
                setPatientRegisterData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [UrlLink, searchOPParams]);

    const [ReScheduleEdit, setReScheduleEdit] = useState({
        ChangingReason: "",
        Specialization: "",
        DoctorName: "",
      });
      const [ShowModalReschedule, setShowModalReschedule] = useState(false);
      const [ReScheduleId, setReScheduleId] = useState("");
   
    const handleSearchChange = (e) => {
        const { name, value } = e.target

        setsearchOPParams({ ...searchOPParams, [name]: value });


    };
   
    const handleModalVisibleReshedule = (params)=>{
        let resheduleCancel = params.ChangingReason;
        
        if(resheduleCancel){
            setResheduleReson(resheduleCancel);
            setOpenModalCancel11(true);
          
        }
        else {
            const tdata = {
                message: 'There is no data to view.',
                type: 'warn'
            };
            dispatchvalue({ type: 'toast', value: tdata });
        }
    }
    
    const PatientOPRegisterColumns = [
        {
            key: "id",
            name: "S.No",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientId",
            name: "Patient Id",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PatientName",
            name: "Patient Name",
            width: 150,
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "PhoneNo",
            name: "PhoneNo",
        },
        {
            key: "Complaint",
            name: "Complaint",
        },
        {
            key: "isMLC",
            name: "isMLC",
            frozen: pagewidth > 500 ? true : false
        },
        {
            key: "isRefferal",
            name: "isRefferal",
        },
        {
            key: "Status",
            name: "Status",
        },
        {
            key: "Specilization",
            name: "Specilization",
        },
        {
            key: "DoctorName",
            name: "Doctor Name",
        },
        
        ...(searchOPParams.status === "Pending"
            ? [{
                key: "Action",
                name: "Action",
                renderCell: (params) => (
                    <>
                        <Button
                            className="cell_btn"
                            onClick={() => handleCancelAppointmentRequest(params.row)}
                        >
                            <CancelIcon className="check_box_clrr_cancell" />
                        </Button>
                    </>
                ),
            }]
            : []
        ),
    
        ...(searchOPParams.status === "Cancelled"
            ? [{
                key: "viewAction",
                name: "View",
                renderCell: (params) => (
                    <>
                        <Button
                            className="cell_btn"
                            onClick={() => handleModalVisible(params.row)}
                        >
                            <VisibilityIcon className="check_box_clrr_cancell" />
                        </Button>
                    </>
                ),
            }]
            : []
        ),
    
        ...(searchOPParams.status === "Pending"
            ? [{
                key: "Reshedule",
                name: "Re-Schedule",
                renderCell: (params) => (
                    <>
                        {params.row.Status === "Pending" && !params.row.ChangingReason ? (
                            <Button
                                className="cell_btn"
                                onClick={() => handleAppointmentReschedule(params.row)}
                            >
                                <UpdateIcon className="check_box_clrr_cancell" />
                            </Button>
                        ) : params.row.Status === "Pending" && params.row.ChangingReason ? (
                            <Button
                                className="cell_btn"
                                onClick={() => handleModalVisibleReshedule(params.row)}
                            >
                                <VisibilityIcon className="check_box_clrr_cancell" />
                            </Button>
                        ) : (
                            <span>No Action</span>
                        )}
                    </>
                ),
            }]
            : []
        ),
    ];
    

    const handleModalVisible = (params) => {
        let reasonCancel = params.Reason;
        if (reasonCancel) {
            setCancelReason1(reasonCancel);
            setOpenModalCancel1(true);
        } else {
            const tdata = {
                message: 'There is no data to view.',
                type: 'warn'
            };
            dispatchvalue({ type: 'toast', value: tdata });
        }
    };
    
    const handleCancelAppointmentRequest = (params)=>{
        console.log("RegisterCancel",params);
        setRegistrationCancelId(params.RegistrationId);
        setOpenModalCancel(true);
    }


    const handleCancelReason = ()=>{
        const UpdateRegister = {
            RegistrationId :RegistrationCancelId,
            CancelReason:CancelReason,
            created_by: userRecord?.username || "",
        };
        axios
        .post(`${UrlLink}Frontoffice/Register_Request_Cancel`, UpdateRegister)
        .then((response)=> {
            const resData = response.data;
            const mess = Object.values(resData)[0];
            const typp = Object.keys(resData)[0];
            const tdata = {
                message: mess,
                type: typp,
              };
              dispatchvalue({ type: "toast", value: tdata });
              setCancelReason("");
              setRegistrationCancelId("");
              handleCloseModal();
        })
        .catch((err) => {
         console.log(err);
        });

    };
    const handleCloseModal = () => {
        setModalIsOpen(false);
        setOpenModalCancel(false);
        setOpenModalCancel1(false);
        setShowModalReschedule(false);
        setOpenModalCancel11(false);
      };
   
      const handleSpecChange = (e) => {
        const { name, value } = e.target;
        setReScheduleEdit((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleDocChange = (e) => {
        const { name, value } = e.target;
        setReScheduleEdit((prev) => ({
          ...prev,
          [name]: value,
        }));
      };


      
      useEffect(() => {
        if (ReScheduleEdit?.Specialization && UrlLink) {
          axios
            .get(
              `${UrlLink}Masters/get_Doctor_by_Speciality_Detials?Speciality=${ReScheduleEdit.Specialization}`
            )
            .then((reponse) => {
              let data = reponse.data;

              setDoctorNameData(data);
              console.log("specialization",data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, [UrlLink, ReScheduleEdit.Specialization]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const [specializationResponse] = await Promise.all([
              axios.get(`${UrlLink}Masters/Speciality_Detials_link`),
            ]);
            setSpecializationData(specializationResponse.data);
            console.log(specializationResponse.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, [UrlLink]);
      const handleAppointmentReschedule = (params) => {
        console.log("paramsupdate",params);
        const PreviousDoctor = params.DoctorId;
        setPreviousDoctorId(PreviousDoctor);
        setShowModalReschedule(true);
        setReScheduleId(params.RegistrationId);
      };

const handleReschedule = ()=>{
    const updatedReschedule = {
        ...ReScheduleEdit,
        PreviousDoctor:previousDoctorId,
        RegistrationId:ReScheduleId,
        created_by: userRecord?.username || "",
    };
    console.log("updatedReschedule",updatedReschedule);
    axios
    .post(
      `${UrlLink}Frontoffice/Registration_Reshedule_Details`,
      updatedReschedule
    )
    .then((response)=>{
        const ress = response.data;
        const mess = Object.values(ress)[0];
        const typp = Object.keys(ress)[0];
        console.log("submit data", ress);
        const tdata = {
            message: mess,
            type: typp,
          };
          dispatchvalue({ type: "toast", value: tdata });
          setReScheduleEdit({
            CancelReason: "",
            Specialization: "",
            DoctorName: "",
          });
          handleCloseModal();
          fetchData();
    })
    .catch((e) => {
        console.log(e);
      });

}
  return (
    <>
   <div className="Main_container_app">
                <h3>OPD Queue List</h3>
                {/* <div className='DivCenter_container'>OP Patient Details </div> */}
                <div className="search_div_bar">
                    <div className="search_div_bar_inp_1">
                        <label htmlFor="">Search by
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            name='query'
                            value={searchOPParams.query}
                            placeholder='Search here... '
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="search_div_bar_inp_1">
                        <label htmlFor="">Status
                            <span>:</span>
                        </label>
                        <select
                            id=''
                            name='status'
                            value={searchOPParams.status}
                            onChange={handleSearchChange}
                        >
                            <option value='Pending'>Pending</option>
                            <option value='Completed'>Completed</option>
                            <option value='Cancelled'>Cancelled</option>
                        </select>
                    </div>


                </div>
     

                <ToastAlert Message={toast.message} Type={toast.type} />
                <ReactGrid columns={PatientOPRegisterColumns} RowData={PatientRegisterData} />
            </div>
            {OpenModalCancel && (
        <div className="modal-container" onClick={handleCloseModal}>
          <div
            className="App_Cancel_modal"
            onClick={(e) => e.stopPropagation()}
          >
           
            <div className="common_center_tag">
                <span>Register Cancel Reason</span>
            </div>
            <textarea
              name="CancelReason"
              id={CancelReason}
              label="Cancellation Reason"
              value={CancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <div className="Main_container_Btn button">
              <button onClick={handleCancelReason}>Save</button>
            </div>
          </div>
        </div>
      )}
              {OpenModalCancel1 && (
        <div className="modal-container" onClick={handleCloseModal}>
          <div
            className="App_Cancel_modal"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="common_center_tag">
                <span>Cancel Reason</span>
            </div>
            <br></br>
           <p>{CancelReason1}</p>
           
          </div>
        </div>
      )}

      
{ShowModalReschedule && (
  <>
    <div className="modal-container" onClick={handleCloseModal}>
      <div className="Doc_Cal_modal" onClick={(e) => e.stopPropagation()}>
        
        <div className="common_center_tag">
                <span>Registration Re-Schedule</span>
            </div>
        <br></br>
        <div className='RegisFormcon_1'>
          <div className="RegisForm_1">
            <label htmlFor="Specialization">
              Specialization<span>:</span>
            </label>
            <select
              name="Specialization"
              id="Specialization"
              value={ReScheduleEdit.Specialization || ""}
              onChange={handleSpecChange}
            >
              <option value="">Select</option>
              {SpecializationData.filter((p) => p.Status === "Active").map((p) => (
                <option key={p.id} value={p.id}>
                  {p.SpecialityName}
                </option>
              ))}
            </select>
          </div>

          <div className="RegisForm_1">
            <label htmlFor="DoctorName">
              Doctor Name<span>:</span>
            </label>
            <select
              name="DoctorName"
              id="DoctorName"
              value={ReScheduleEdit.DoctorName || ""}
              onChange={handleDocChange}
            >
              <option value="">Select</option>
              {Array.isArray(DoctorNameData) &&
                DoctorNameData.filter((p)=>p.id!==previousDoctorId).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.ShortName}
                  </option>
                ))}
            </select>
          </div>

          <div className="RegisForm_1">
            <label htmlFor="ChangingReason">
              Changing Reason<span>:</span>
            </label>
            <textarea
              name="ChangingReason"
              id="ChangingReason"
              value={ReScheduleEdit.ChangingReason || ""}
              onChange={(e) =>
                setReScheduleEdit((prev) => ({
                  ...prev,
                  ChangingReason: e.target.value,
                }))
              }
            />
          </div>
        </div>
<br></br>
        <div className="Main_container_Btn button">
          <button onClick={handleReschedule}>Save</button>
        </div>
      </div>
    </div>

    <button onClick={handleCloseModal} className="booked_app_btn">
      <HighlightOffIcon />
    </button>
  </>
)}

{OpenModalCancel11 && (
        <div className="modal-container" onClick={handleCloseModal}>
          <div
            className="App_Cancel_modal"
            onClick={(e) => e.stopPropagation()}
          >
           
            <div className="common_center_tag">
                <span>Reshedule Reson</span>
            </div>
            <br></br>
           <p>{ResheduleReson}</p>
           
          </div>
        </div>
      )}



    </>
  )
}

export default Opdqueue
