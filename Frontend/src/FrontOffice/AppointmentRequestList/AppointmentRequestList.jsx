import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { differenceInYears } from "date-fns";
import { useNavigate } from "react-router-dom";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import UpdateIcon from "@mui/icons-material/Update";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import { handleKeyDownPhoneNo } from "../../OtherComponent/OtherFunctions";
import { handleKeyDownTextRegistration } from "../../OtherComponent/OtherFunctions";
import axios from "axios";
import Months from "./Months";

const AppointmentRequestList = () => {
  const dispatchvalue = useDispatch();
  const navigate = useNavigate();
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const UserData = useSelector((state) => state.userRecord?.UserData);
  // const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const [SelectedLocations, setSelectedLocations] = useState(
    UserData?.location
  );
  const prevSelectedTimeRef = useRef();

  const formatLabel = (label) => {
    if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
      return label
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (str) => str.toUpperCase());
    } else {
      return label;
    }
  };
  // Function to format date as MM/DD/YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [AppointmentRequestList, setAppointmentRequestList] = useState({
    AppointmentID: "",
    Title: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    Specialization: "",
    DoctorName: "",
    RequestDate: "",
    RequestTime: "",
    AppointmentType: "",
    VisitPurpose: "",
  });
  const [ReScheduleEdit, setReScheduleEdit] = useState({
    RadioOption: "Date",
    RequestDate: "",
    ChangingReason: "",
    Specialization: "",
    DoctorName: "",
  });
  const [ReScheduleId, setReScheduleId] = useState("");
  const [RescheduleDocId, setRescheduleDocId] = useState("");

  const [AppointmentID, setAppointmentID] = useState(null);
  const [AppointmentRequestData, setAppointmentRequestData] = useState([]);
  const [DoctorNameData, setDoctorNameData] = useState([]);
  const [SpecializationData, setSpecializationData] = useState([]);
  const [AppointmentRequestGet, setAppointmentRequestGet] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setsearchStatus] = useState("PENDING");
  const [CancelReason, setCancelReason] = useState("");
  const [CancelAppID, setCancelAppID] = useState("");
  const [filteredRows, setfilteredRows] = useState([]); // State to hold the data
  const [FilterbyPatientId, setFilterbyPatientId] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedTime, setSelectedTime] = useState("");
  const [TodayDate, setTodayDate] = useState(formatDate(new Date()));
  const [selectedDate, setselectedDate] = useState(TodayDate); // Set initial state to today's date
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [DoctorDayData, setDoctorDayData] = useState([]);

  const [openModal2, setOpenModal2] = useState(false);
  const [OpenModalCancel, setOpenModalCancel] = useState(false);
  const [ShowModalReschedule, setShowModalReschedule] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const UserRecord = useSelector((state) => state.userRecord?.UserData);

  const isSidebarOpen = useSelector((state) => state.userRecord?.SidebarToggle);

  console.log("Aptieeeeee", FilterbyPatientId);
  console.log("appppoooinnntttt", AppointmentRequestList);
  console.log("AppointmentRequestData", AppointmentRequestData);
  console.log("selectedTimeeeeee", selectedTime);
  console.log("selectedDateeee", selectedDate);
  console.log("SelectedLocationsssss", SelectedLocations);
  console.log("Userdataaaa", UserData?.location);
  console.log("DoctorDayData", DoctorDayData);
  console.log("selectedDoctor", selectedDoctor);
  console.log("TodayDateee", TodayDate);
  console.log("USerrrrrr", UserRecord);
  console.log("ReScheduleEdit", ReScheduleEdit);
  console.log("RescheduleDocId", RescheduleDocId);

  const HandleOnchange = (e) => {
    const { name, value, pattern } = e.target;
    const formattedValue = ["FirstName", "MiddleName", "LastName"].includes(
      name
    )
      ? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
      : value;

        // Check length for specific fields
        if (
          [
            "FirstName",
            "MiddleName",
            "AliasName",
          ].includes(name) &&
          value.length > 30
        ) {
          const tdata = {
            message: `${name} should not exceed 30 characters.`,
            type: "warn", // Ensure 'warn' is a valid type for your toast system
          };
          dispatchvalue({ type: "toast", value: tdata });
          return; // Exit early to prevent state update
        }

    if (name === "DOB") {
      let newDate = new Date();

      let oldDate = new Date(value);
      let age = differenceInYears(newDate, oldDate);
      setAppointmentRequestList((prevFormData) => ({
        ...prevFormData,
        [name]: formattedValue,
        Age: age,
      }));
    } else if (name === "PhoneNumber") {
      if (formattedValue.includes("|")) {
        const convert = formattedValue.split(" | ");

        if (convert.length <= 10) {
          setAppointmentRequestList((prev) => ({
            ...prev,
            [name]: convert[1].trim(),
            // PatientId: convert[0].trim(),
            FirstName: convert[0].trim(),
          }));
        }
      } else {
        if (formattedValue.length <= 10) {
          setAppointmentRequestList((prev) => ({
            ...prev,
            [name]: formattedValue,
          }));
        }
      }
    } else if (name === "FirstName") {
      if (formattedValue.includes("|")) {
        const convert = formattedValue.split(" | ");

        setAppointmentRequestList((prev) => ({
          ...prev,
          [name]: convert[0].trim(),
          // PatientId: convert[0].trim(),
          PhoneNumber: convert[1].trim(),
        }));
      } else {
        setAppointmentRequestList((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));
      }
    } else if (name === "RequestTime") {
      setAppointmentRequestList((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
      setSelectedTime(formattedValue);
    } else if (name === "RequestDate") {
      setAppointmentRequestList((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
      setselectedDate(formattedValue);
    } else if (name === "DoctorName") {
      setAppointmentRequestList((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
      setSelectedDoctor(formattedValue);
    } else {
      setAppointmentRequestList((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    }
    const validateField = (value, pattern) => {
      if (!value) {
        return "Required";
      }
      if (pattern && !new RegExp(pattern).test(value)) {
        return "Invalid";
      } else {
        return "Valid";
      }
    };

    const error = validateField(value, pattern);
    console.log(error, "error");

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };



  useEffect(() => {
    const today = formatDate(new Date());
    console.log("TodayDatee", today);

    if (!AppointmentRequestList.RequestDate) {
      setAppointmentRequestList((prev) => ({
        ...prev,
        RequestDate: today,
      }));
      // setselectedDate(today); // Set selectedDate to today's date
      console.log("RequestDate was empty, setting to today:", today);
    }

    setTodayDate(today);
  }, [AppointmentRequestList.RequestDate]);

  useEffect(() => {
    const postdata = {
      PhoneNo: AppointmentRequestList.PhoneNumber,
      FirstName: AppointmentRequestList.FirstName,
      DoctorId: AppointmentRequestList.DoctorID,
    };
    axios
      .get(`${UrlLink}Frontoffice/Filter_Patient_by_Multiple_Criteria`, {
        params: postdata,
      })
      .then((res) => {
        const data = res.data;
        setFilterbyPatientId(data);
        axios
          .get(`${UrlLink}Frontoffice/get_patient_visit_details`, {
            params: postdata,
          })
          .then((res) => {
            const visit = res.data?.VisitPurpose;
            setAppointmentRequestList((prev) => ({
              ...prev,
              VisitPurpose: visit,
            }));
            if (UserData && UserData.location) {
              setSelectedLocations(UserData.location);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    UrlLink,
    AppointmentRequestList.PhoneNumber,
    AppointmentRequestList.FirstName,
    AppointmentRequestList.DoctorID,
  ]);

  useEffect(() => {
    if (UserData && UserData.location && selectedDoctor && selectedDate) {
      axios
        .get(`${UrlLink}Frontoffice/calender_modal_display_data_by_day`, {
          params: {
            DoctorId: selectedDoctor,
            LocationId: UserData.location,
            Date: selectedDate,
          },
        })
        .then((response) => {
          const res = response.data;
          setDoctorDayData(res);
        })
        .catch((err) => {
          console.error("Error fetching filtered data:", err);
        });
    }
  }, [UrlLink, UserData.location, selectedDate, selectedDoctor]);
  
  
  // useEffect(() => {
  //   if (UserData && UserData.location && selectedDoctor && selectedDate) {
  //     axios
  //       .get(`${UrlLink}Frontoffice/calender_modal_display_data_by_day`, {
  //         params: {
  //           DoctorId: selectedDoctor,
  //           LocationId: UserData.location,
  //           Date: RequestDate,
  //         },
  //       })
  //       .then((response) => {
  //         const res = response.data;
  //         setDoctorDayData(res);
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching filtered data:", err);
  //       });
  //   }
  // }, [UrlLink, UserData.location, RequestDate, selectedDoctor]);

  useEffect(() => {
    let doctor_schedule = DoctorDayData?.schedule?.[0];
    console.log("RequestDateeeandTimww", doctor_schedule);

    const prevSelectedTime = prevSelectedTimeRef.current;
    console.log("RequestDateeeandTimww", prevSelectedTime);

    // Update the previous selected time reference
    prevSelectedTimeRef.current = selectedTime;

    // If selectedTime hasn't changed, do nothing
    if (prevSelectedTime === selectedTime) {
      console.log("time is not changes");
    }
    if (
      doctor_schedule?.working === "yes" &&
      doctor_schedule?.shift === "Single" &&
      selectedTime
    ) {
      const startTime = doctor_schedule.starting_time;
      const endTime = doctor_schedule.ending_time;

      console.log("RequestDateee", startTime, endTime);

      // Convert times to Date objects
      const startTimeDate = new Date(`1970-01-01T${startTime}Z`);
      const endTimeDate = new Date(`1970-01-01T${endTime}Z`);
      const selectedTimeDate = new Date(`1970-01-01T${selectedTime}Z`); // Assuming selectedTime is in "HH:mm:ss" format

      // Check if selectedTime is within the range
      if (
        selectedTimeDate >= startTimeDate &&
        selectedTimeDate <= endTimeDate
      ) {
        const tdata = {
          message: `The Doctor is Available in the Selected Requested Time`,
          type: "success",
        };
        dispatchvalue({ type: "toast", value: tdata });
      } else {
        const tdata = {
          message: `The Doctor is not Available in the Selected Requested Time, Available in ${startTime} to ${endTime}`,
          type: "warn",
        };
        dispatchvalue({ type: "toast", value: tdata });
      }
    } else if (
      doctor_schedule?.working === "yes" &&
      doctor_schedule?.shift === "Double" &&
      selectedTime
    ) {
      const startTime_f = doctor_schedule.starting_time_f;
      const endTime_f = doctor_schedule.ending_time_f;
      const startTime_a = doctor_schedule.starting_time_a;
      const endTime_a = doctor_schedule.ending_time_a;

      // Convert times to Date objects
      const startTimeDate_f = new Date(`1970-01-01T${startTime_f}Z`);
      const endTimeDate_f = new Date(`1970-01-01T${endTime_f}Z`);
      const startTimeDate_a = new Date(`1970-01-01T${startTime_a}Z`);
      const endTimeDate_a = new Date(`1970-01-01T${endTime_a}Z`);
      const selectedTimeDate = new Date(`1970-01-01T${selectedTime}Z`); // Assuming selectedTime is in "HH:mm:ss" format
      if (
        (selectedTimeDate >= startTimeDate_f &&
          selectedTimeDate <= endTimeDate_f) ||
        (selectedTimeDate >= startTimeDate_a &&
          selectedTimeDate <= endTimeDate_a)
      ) {
        const tdata = {
          message: `The Doctor is Available in the Selected Requested Time`,
          type: "success",
        };
        dispatchvalue({ type: "toast", value: tdata });
      } else {
        const tdata = {
          message: `The Doctor is not Available in the Selected Requested Time, Available in FN : ${startTime_f} to ${endTime_f} or AN  ${startTime_a} to ${endTime_a}`,
          type: "warn",
        };
        dispatchvalue({ type: "toast", value: tdata });
      }
    } else if (doctor_schedule?.working === "no") {
      const tdata = {
        message: `The Doctor is not Available in the Selected Date`,
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  }, [DoctorDayData, selectedTime, dispatchvalue]);

  // Utility function to apply conditional row styling
  const getRowStyle = (row) =>
    row.ReScheduled === "Yes" ? { color: "aqua" } : {};

  // Define the columns without the UserRegister column
  const baseAppointmentRequestColumns = [
    {
      key: "id",
      name: "Appointment ID",
      frozen: true,
      renderCell: (params) => (
        <span style={getRowStyle(params.row)}>{params.row.id}</span>
      ),
    },
    {
      key: "FirstName",
      name: "First Name",
      frozen: true,
      renderCell: (params) => (
        <span style={getRowStyle(params.row)}>{params.row.FirstName}</span>
      ),
    },
    {
      key: "MiddleName",
      name: "Middle Name",
      renderCell: (params) => (
        <span style={getRowStyle(params.row)}>{params.row.MiddleName}</span>
      ),
    },
    {
      key: "LastName",
      name: "Last Name",
      renderCell: (params) => (
        <span style={getRowStyle(params.row)}>{params.row.LastName}</span>
      ),
    },
    {
      key: "PhoneNumber",
      name: "Phone Number",
      frozen: true,
      renderCell: (params) => (
        <span style={getRowStyle(params.row)}>{params.row.PhoneNumber}</span>
      ),
    },
    {
      key: "Email",
      name: "Email",
      renderCell: (params) => (
        <span style={getRowStyle(params.row)}>{params.row.Email}</span>
      ),
    },
    {
      key: "RequestDate",
      name: "Request Date",
      renderCell: (params) => (
        <span style={getRowStyle(params.row)}>{params.row.RequestDate}</span>
      ),
    },
    {
      key: "RequestTime",
      name: "Request Time",
      renderCell: (params) => (
        <span style={getRowStyle(params.row)}>{params.row.RequestTime}</span>
      ),
    },
    {
      key: "AppointmentType",
      name: "Appointment Type",
      renderCell: (params) => (
        <span style={getRowStyle(params.row)}>
          {params.row.AppointmentType}
        </span>
      ),
    },
    {
      key: "VisitPurpose",
      name: "Appointment Purpose",
      renderCell: (params) => (
        <span style={getRowStyle(params.row)}>{params.row.VisitPurpose}</span>
      ),
    },
    {
      key: "SpecializationName",
      name: "Specialization",
      renderCell: (params) => (
        <span style={getRowStyle(params.row)}>
          {params.row.SpecializationName}
        </span>
      ),
    },
    {
      key: "DoctorName",
      name: "Doctor Name",
      renderCell: (params) => (
        <span style={getRowStyle(params.row)}>{params.row.DoctorName}</span>
      ),
    },
  ];

  // Add the UserRegister column conditionally if searchStatus is PENDING
  const AppointmentRequestColumns =
    searchStatus === "PENDING"
      ? [
          ...baseAppointmentRequestColumns,
          {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
              <Button
                className="cell_btn"
                onClick={() => handleeditAppointmentRequest(params.row)}
              >
                <EditIcon className="check_box_clrr_cancell" />
              </Button>
            ),
          },
          {
            key: "Reshedule",
            name: "Re-Schedule",
            renderCell: (params) => (
              <Button
                className="cell_btn"
                onClick={() => handleAppointmentReschedule(params.row)}
              >
                <UpdateIcon className="check_box_clrr_cancell" />
              </Button>
            ),
          },
          {
            key: "Cancel",
            name: "Cancel",
            renderCell: (params) => (
              <Button
                className="cell_btn"
                onClick={() => handleCancelAppointmentRequest(params.row)}
              >
                <CancelIcon className="check_box_clrr_cancell" />
              </Button>
            ),
          },
          {
            key: "UserRegister",
            name: "User Register",
            renderCell: (params) => (
              <Button
                className="cell_btn"
                onClick={() => handleAppRegister(params.row)}
              >
                <ArrowForwardIcon className="check_box_clrr_cancell" />
              </Button>
            ),
          },
        ]
      : searchStatus === "CANCELLED"
      ? [
          ...baseAppointmentRequestColumns,
          {
            key: "cancelReason",
            name: "Cancel Reason",
            renderCell: (params) => (
              <span style={getRowStyle(params.row)}>
                {params.row.cancelReason}
              </span>
            ),
          },
        ]
      : baseAppointmentRequestColumns;

  const handleeditAppointmentRequest = (params) => {
    const { id, DoctorID, SpecializationId, ...rest } = params;

    setAppointmentRequestList((prev) => ({
      ...prev,
      AppointmentID: id,
      DoctorName: DoctorID,
      Specialization: SpecializationId, // Ensure this is populated with the Specialization ID or Name correctly
      Title: rest.Title,
      FirstName: rest.FirstName,
      MiddleName: rest.MiddleName,
      LastName: rest.LastName,
      PhoneNumber: rest.PhoneNumber,
      Email: rest.Email,
      RequestDate: rest.RequestDate,
      AppointmentType: rest.AppointmentType,
      RequestTime: rest.RequestTime,
      VisitPurpose: rest.VisitPurpose,
    }));
    setSelectedDoctor(DoctorID);
  };
  const handleCancelAppointmentRequest = (params) => {
    console.log("cancelAppp", params);
    setCancelAppID(params.id);
    setOpenModalCancel(true);
  };

  const handleAppointmentReschedule = (params) => {
    setShowModalReschedule(true);
    setReScheduleId(params.id);
    setRescheduleDocId(params.DoctorID)
  };

  const handleAppRegister = (params) => {
    dispatchvalue({
      type: "Registeredit",
      value: { appconversion: true, Type: "OP", ...params },
    });
    navigate("/Home/Registration");
  };

  const handleStatusCheck = (e) => {
    const { name, value } = e.target;
    const formattedVal = value;
    console.log("Response", name, formattedVal);
    setsearchStatus(value);
  };

  const handleCancelReason = () => {
    const updatedApp = {
      AppointmentID: CancelAppID,
      CancelReason: CancelReason,
      CreatedBy : UserData?.username
    };
    axios
      .post(`${UrlLink}Frontoffice/Appointment_Request_Cancel`, updatedApp)
      .then((response) => {
        const resData = response.data;
        const mess = Object.values(resData)[0];
        const typp = Object.keys(resData)[0];
        console.log("submit data:", response.data);
        console.log("submit data:", resData);
        const tdata = {
          message: mess,
          type: typp,
        };

        dispatchvalue({ type: "toast", value: tdata });
        setCancelReason("");
        setCancelAppID("");
        handleCloseModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const handleDateChange = (e) => {
  //   const { name, value } = e.target;
  //   setReScheduleEdit((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  //   // setRequestDate(value)


  //   // if (ReScheduleEdit.RequestDate) {
  //   //   let doctor_schedule = DoctorDayData?.schedule?.[0];
  //   //   console.log("RequestResc", doctor_schedule);
      
  //   // }
  // };

  const handleDocChange = (e) => {
    const { name, value } = e.target;
    if(ReScheduleEdit.RadioOption === 'Date' && name === 'RequestDate'){
      setReScheduleEdit((prev) => ({
        ...prev,
        [name]: value,
      }));
      const FilteredAppData = AppointmentRequestData.filter((row)=> row.id === ReScheduleId)
      console.log('FilteredApp',FilteredAppData);
      axios
      .get(`${UrlLink}Frontoffice/calender_modal_display_data_by_day`, {
        params: {
          DoctorId: FilteredAppData?.[0]?.DoctorID,
          LocationId: UserData.location,
          Date: value,
        },
      })
      .then((response) => {
        const res = response.data;
        setDoctorDayData(res);
        console.log('DocccccData',res);
        
      })
      .catch((err) => {
        console.error("Error fetching filtered data:", err);
      });      
    }
    if (ReScheduleEdit.RadioOption === 'Doctor'){
      const FilteredAppData = AppointmentRequestData.filter((row)=> row.id === ReScheduleId)
      console.log('FilteredApp',FilteredAppData);
      setReScheduleEdit((prev) => ({
        ...prev,
        [name]: value,
      }));
      axios
      .get(`${UrlLink}Frontoffice/calender_modal_display_data_by_day`, {
        params: {
          DoctorId: value,
          LocationId: UserData.location,
          Date: FilteredAppData?.[0]?.RequestDate,
        },
      })
      .then((response) => {
        const res = response.data;
        console.log('DocccccData',res);

        if (res?.schedule?.[0]?.working === 'no'){
          const tdata = {
            message: `The Doctor is not Available in the Requested Date`,
            type: "warn",
          };
          dispatchvalue({ type: "toast", value: tdata });
        }
        
      })
      .catch((err) => {
        console.error("Error fetching filtered data:", err);
      });  
    }
  };


  const handleReschedule = () => {
    const updatedReschedule = {
      ...ReScheduleEdit,
      AppointmentId: ReScheduleId,
      CreatedBy: UserData?.username,
    };
    axios
      .post(
        `${UrlLink}Frontoffice/Appointment_Reschedule_List`,
        updatedReschedule
      )
      .then((response) => {
        const ress = response.data;
        const mess = Object.values(ress)[0];
        const typp = Object.keys(ress)[0];
        console.log("submit data", ress);
        console.log("submit data", updatedReschedule);

        const tdata = {
          message: mess,
          type: typp,
        };
        dispatchvalue({ type: "toast", value: tdata });
        setReScheduleEdit({
          RadioOption: "Date",
          RequestDate: "",
          CancelReason: "",
          Specialization: "",
          DoctorName: "",
        });
        handleCloseModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAppointmentRequestSubmit = () => {
    const exist = Object.keys(AppointmentRequestList)
      .filter((p) => p !== "AppointmentID", "")
      .filter((p) => !AppointmentRequestList[p]);
    const updatedAppointmentRequest = {
      ...AppointmentRequestList,
      Location: UserRecord?.location,
      CreatedBy: UserRecord?.username,
    };
    console.log("submit datauppp:", updatedAppointmentRequest);

    if (exist.length === 0) {
      axios
        .post(
          `${UrlLink}Frontoffice/Appointment_Request_List_Link`,
          updatedAppointmentRequest
        )
        .then((response) => {
          const resData = response.data;
          const mess = Object.values(resData)[0];
          const typp = Object.keys(resData)[0];
          console.log("submit data:", response.data);
          console.log("submit data:", resData);
          const tdata = {
            message: mess,
            type: typp,
          };

          dispatchvalue({ type: "toast", value: tdata });
          setAppointmentRequestGet((prev) => !prev);
          setAppointmentRequestList({
            AppointmentID: "",
            Title: "",
            FirstName: "",
            MiddleName: "",
            LastName: "",
            PhoneNumber: "",
            Email: "",
            Specialization: "",
            DoctorName: "",
            RequestDate: "",
            RequestTime: "",
            AppointmentType: "",
            VisitPurpose: "",
          });
          setselectedDate("");
          setSelectedTime("");
          setErrors({});
          fetchAppointmentIDCount();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const tdata = {
        message: `Please provide ${exist.join(",")}.`,
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  };
  useEffect(() => {
    if (searchStatus) {
      axios
        .get(
          `${UrlLink}Frontoffice/get_all_appointments?Status=${searchStatus}`
        )
        .then((response) => {
          const ress = response.data;
          console.log("Response data:", ress);
          setAppointmentRequestData(ress);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [
    searchStatus,
    UrlLink,
    AppointmentRequestGet,
    CancelReason,
    ReScheduleEdit,
  ]);

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

  useEffect(() => {
    if (AppointmentRequestList?.Specialization && UrlLink) {
      axios
        .get(
          `${UrlLink}Masters/get_Doctor_by_Speciality_Detials?Speciality=${AppointmentRequestList.Specialization}`
        )
        .then((reponse) => {
          let data = reponse.data;
          setDoctorNameData(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [UrlLink, AppointmentRequestList.Specialization]);
  useEffect(() => {
    if (ReScheduleEdit?.Specialization && UrlLink) {
      axios
        .get(
          `${UrlLink}Masters/get_Doctor_by_Speciality_Detials?Speciality=${ReScheduleEdit.Specialization}`
        )
        .then((reponse) => {
          let data = reponse.data;
          setDoctorNameData(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [UrlLink, ReScheduleEdit.Specialization]);

  const fetchAppointmentIDCount = useCallback(() => {
    axios
      .get(`${UrlLink}Frontoffice/appointment_request_count_today`)
      .then((response) => {
        const count = response.data.count;
        setAppointmentID(count);
      })
      .catch((error) => {
        console.error("Error fetching appointment ID count:", error);
      });
  }, [UrlLink, AppointmentID]);
  useEffect(() => {
    fetchAppointmentIDCount();
  }, [fetchAppointmentIDCount, AppointmentID]);

  useEffect(() => {
    const filteredData =
      AppointmentRequestData &&
      AppointmentRequestData.filter((row) => {
        const lowerCaseFirstName = row.FirstName.toLowerCase();
        const lowerCasePhoneNo = row.PhoneNumber.toString().toLowerCase();
        const lowerCaseQuery = searchQuery.toLowerCase();

        // Check if searchQuery matches either FirstName or PhoneNumber
        const matchesFirstName =
          lowerCaseFirstName && lowerCaseFirstName.includes(lowerCaseQuery);
        const matchesPhoneNo =
          lowerCasePhoneNo && lowerCasePhoneNo.includes(lowerCaseQuery);

        // Return true if either FirstName or PhoneNumber matches searchQuery
        return matchesFirstName || matchesPhoneNo;
      });

    setfilteredRows(filteredData);
  }, [searchQuery, AppointmentRequestData, searchStatus]);

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
    setOpenModal2(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setOpenModalCancel(false);
    setShowModalReschedule(false);
    setReScheduleEdit({
      RadioOption: "Date",
      RequestDate: "",
      ChangingReason: "",
      Specialization: "",
      DoctorName: "",
    });
  };

  return (
    <>
      <div className="Main_container_app">
        <h3 style={{ display: "flex", justifyContent: "space-between" }}>
          Request No {AppointmentID}
          <Button className="cell_btn" onClick={() => openModal("calendar")}>
            <CalendarMonthIcon />
          </Button>
        </h3>
        <div className="RegisFormcon" id="RegisFormcon_11">
          {Object.keys(AppointmentRequestList)
            .filter(
              (fields) => fields !== "AppointmentID" && fields !== "DoctorID"
            )
            .map((field, index) => (
              <div className="RegisForm_1" key={index}>
                <label htmlFor={`${field}_${index}`}>
                  {formatLabel(field)}
                  <span>:</span>
                </label>
                {[
                  "Title",
                  "AppointmentType",
                  "Specialization",
                  "DoctorName",
                ].includes(field) ? (
                  <select
                    id={`${field}_${index}`}
                    name={field}
                    value={AppointmentRequestList[field]}
                    onChange={HandleOnchange}
                  >
                    <option value="">Select</option>
                    {field === "Title" &&
                      ["Ms", "Mr", "Mrs", "Others"].map((row, indx) => (
                        <option key={indx} value={row}>
                          {row}
                        </option>
                      ))}
                    {field === "AppointmentType" &&
                      ["Call", "Walk In"].map((row, indx) => (
                        <option key={indx} value={row}>
                          {row}
                        </option>
                      ))}
                    {field === "VisitPurpose" &&
                      ["NewConsultation", "FollowUp"].map((row, indx) => (
                        <option key={indx} value={row}>
                          {row}
                        </option>
                      ))}
                    {field === "Specialization" &&
                      SpecializationData.filter(
                        (p) => p.Status === "Active"
                      ).map((p, indx) => (
                        <option key={indx} value={p.id}>
                          {p.SpecialityName}
                        </option>
                      ))}
                    {field === "DoctorName" &&
                      Array.isArray(DoctorNameData) &&
                      DoctorNameData.map((p, indx) => (
                        <option key={indx} value={p.id}>
                          {p.ShortName}
                        </option>
                      ))}
                  </select>
                ) : [
                    "FirstName",
                    "MiddleName",
                    "LastName",
                    "PhoneNumber",
                    "VisitPurpose",
                    "Email",
                  ].includes(field) ? (
                  <div className="Search_patient_icons">
                    <input
                      id={`${field}_${index}`}
                      type={"text"}
                      list={`${field}_iddd`}
                      autoComplete="off"
                      name={field}
                      pattern={
                        field === "Email"
                          ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                          : field === "PhoneNumber"
                          ? "\\d{10}"
                          : "[A-Za-z]+"
                      }
                      className={
                        errors[field] === "Invalid"
                          ? "invalid"
                          : errors[field] === "Valid"
                          ? "valid"
                          : ""
                      }
                      onKeyDown={(e) =>
                        field === "PhoneNumber" &&
                        ![
                          "0",
                          "1",
                          "2",
                          "3",
                          "4",
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ].includes(e.key) &&
                        e.preventDefault()
                      }
                      value={AppointmentRequestList[field]}
                      onChange={HandleOnchange}
                    />
                    <datalist id={`${field}_iddd`}>
                      {field === "PhoneNumber" &&
                        FilterbyPatientId.map((row, indx) => (
                          <option
                            key={indx}
                            value={`${row.FirstName} | ${row.PhoneNo}`}
                          />
                        ))}
                      {field === "FirstName" &&
                        FilterbyPatientId.map((row, indx) => (
                          <option
                            key={indx}
                            value={` ${row.FirstName} | ${row.PhoneNo}`}
                          />
                        ))}
                    </datalist>
                  </div>
                ) : (
                  <input
                    id={`${field}_${index}`}
                    autoComplete="off"
                    type={field === "RequestDate" ? "date" : "time"}
                    name={field}
                    value={AppointmentRequestList[field]}
                    onKeyDown={
                      [
                        "FirstName",
                        "MiddleName",
                        "LastName",
                      ].includes(field)
                        ? handleKeyDownTextRegistration
                        : field === "PhoneNumber"
                        ? handleKeyDownPhoneNo
                        : null
                    }
                    onChange={HandleOnchange}
                  />
                )}
              </div>
            ))}
        </div>
        <div className="Main_container_Btn">
          <button onClick={handleAppointmentRequestSubmit}>
            {AppointmentRequestList.AppointmentID ? "Update" : "Add"}
          </button>
        </div>
        <h3>Appointment Request List</h3>
        <div className="search_bar">
          <div className="con_1">
            <div className="inp_1">
              <label htmlFor="input">
                Search by<span>:</span>
              </label>
              <input
                type="text"
                id="SearchQuery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter First Name or Phone Number"
              />
            </div>
          </div>
          <div className="con_1">
            <div className="inp_1">
              <label htmlFor="input">
                Status<span>:</span>
              </label>
              <select
                name="searchStatus"
                id="SelectStatus"
                value={searchStatus}
                onChange={handleStatusCheck}
              >
                <option value="PENDING">Pending</option>
                <option value="REGISTERED">Registered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {filteredRows.length >= 0 && (
          <ReactGrid
            columns={AppointmentRequestColumns}
            RowData={filteredRows}
          />
        )}
      </div>
      {openModal2 && (
        <div
          className={
            isSidebarOpen ? "sideopen_showcamera_profile" : "showcamera_profile"
          }
          onClick={() => {
            setOpenModal2(false);
          }}
        >
          <div
            className="newwProfiles newwPopupforreason"
            onClick={(e) => e.stopPropagation()}
          >
            <Months />
          </div>
        </div>
      )}
      {OpenModalCancel && (
        <div className="modal-container" onClick={handleCloseModal}>
          <div
            className="App_Cancel_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3> Appointment Cancel Reason</h3>
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
      {ShowModalReschedule && (
        <>
          <div className="modal-container" onClick={handleCloseModal}>
            <div className="Doc_Cal_modal" onClick={(e) => e.stopPropagation()}>
              <h3>Appointment Re-Shedule</h3>
              <div className="Doc_Cal_modal_radio">
                <label htmlFor={`${ReScheduleEdit.RadioOption}_radio_Date`}>
                  <input
                    type="radio"
                    id={`${ReScheduleEdit.RadioOption}_radio_Date`}
                    name={ReScheduleEdit.RadioOption}
                    value="Date"
                    onChange={(e) =>
                      setReScheduleEdit((prev) => ({
                        ...prev,
                        RadioOption: "Date",
                        // Clear fields related to Doctor option
                        Specialization: "",
                        DoctorName: "",
                        ChangingReason: "",
                      }))
                    }
                    checked={ReScheduleEdit.RadioOption === "Date"}
                  />
                  Date
                </label>
                <label htmlFor={`${ReScheduleEdit.RadioOption}_radio_Doctor`}>
                  <input
                    type="radio"
                    id={`${ReScheduleEdit.RadioOption}_radio_Doctor`}
                    name={ReScheduleEdit.RadioOption}
                    value="Doctor"
                    onChange={(e) =>
                      setReScheduleEdit((prev) => ({
                        ...prev,
                        RadioOption: "Doctor",
                        // Clear fields related to Date option
                        RequestDate: "",
                        ChangingReason: "",
                      }))
                    }
                    checked={ReScheduleEdit.RadioOption === "Doctor"}
                  />
                  Doctor
                </label>
              </div>
              {ReScheduleEdit.RadioOption === "Date" && (
                <>
                  <div className="RegisForm_1">
                    <label htmlFor="RequestDate">
                      Request Date<span>:</span>
                    </label>
                    <input
                      name="RequestDate"
                      id="RequestDate"
                      value={ReScheduleEdit.RequestDate}
                      type="date"
                      onChange={handleDocChange}
                    />
                  </div>
                  <div className="RegisForm_1">
                    <label htmlFor="RequestDate">
                      Changing Reason<span>:</span>
                    </label>
                    <textarea
                      name="CancelReason"
                      id={ReScheduleEdit.ChangingReason}
                      label="Cancellation Reason"
                      value={ReScheduleEdit.ChangingReason}
                      onChange={(e) =>
                        setReScheduleEdit((prev) => ({
                          ...prev,
                          ChangingReason: e.target.value,
                        }))
                      }
                    />
                  </div>
                </>
              )}
              {ReScheduleEdit.RadioOption === "Doctor" && (
                <>
                  <div className="RegisForm_1">
                    <label htmlFor="RequestDate">
                      Specialization<span>:</span>
                    </label>
                    <select
                      name="Specialization"
                      id="Specialization"
                      value={ReScheduleEdit.Specialization}
                      onChange={handleDocChange}
                    >
                      <option value="">Select</option>
                      {SpecializationData.filter(
                        (p) => p.Status === "Active"
                      ).map((p, indx) => (
                        <option key={indx} value={p.id}>
                          {p.SpecialityName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="RegisForm_1">
                    <label htmlFor="RequestDate">
                      Doctor Name<span>:</span>
                    </label>
                    <select
                      name="DoctorName"
                      id="DoctorName"
                      value={ReScheduleEdit.DoctorName}
                      onChange={handleDocChange}
                    >
                      <option value="">Select</option>
                      {Array.isArray(DoctorNameData) &&
                        DoctorNameData.filter((p) => p.id !== RescheduleDocId).map((p, indx) => (
                          <option key={indx} value={p.id}>
                            {p.ShortName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="RegisForm_1">
                    <label htmlFor="RequestDate">
                      Changing Reason<span>:</span>
                    </label>
                    <textarea
                      name="CancelReason"
                      id={ReScheduleEdit.ChangingReason}
                      label="Cancellation Reason"
                      value={ReScheduleEdit.ChangingReason}
                      onChange={(e) =>
                        setReScheduleEdit((prev) => ({
                          ...prev,
                          ChangingReason: e.target.value,
                        }))
                      }
                    />
                  </div>
                </>
              )}
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
      <ToastAlert Message={toast.message} Type={toast.type} />
    </>
  );
};

export default AppointmentRequestList;
