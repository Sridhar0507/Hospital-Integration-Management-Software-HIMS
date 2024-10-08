import React, { useState, useEffect, useRef, useCallback } from "react";
import "./DoctorCalendar.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { differenceInMinutes, parse } from "date-fns";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";

const Months = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.userRecord?.toast);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [showModalEditNA, setshowModalEditNA] = useState(false);
  const [showModalEditMultiple, setshowModalEditMultiple] = useState(false);
  const [ShowAppModal, setShowAppModal] = useState(false);
  const [ShowAppMulModal, setShowAppMulModal] = useState(false);
  const [showModalCondition, setshowModalCondition] = useState(false);
  const [showModalConditionMul, setshowModalConditionMul] = useState(false);
  const [GetDoctorData, setGetDoctorData] = useState([]);
  const [calendarDays, setCalendarDays] = useState([]);
  const [DoctorDayData, setDoctorDayData] = useState([]);
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const UserData = useSelector((state) => state.userRecord?.UserData);
  // const [dayAppointments, setDayAppointments] = useState([]);
  // const [counts, setCounts] = useState({});
  const [SelectedLocations, setSelectedLocations] = useState(
    UserData?.location
  );
  const [Locations, setLocations] = useState([]);
  const [DoctorCreatedData, setDoctorCreatedData] = useState([]);
  const [LocationData, setLocationData] = useState([]);
  const [SelectedDate, setSelectedDate] = useState(null);
  const [SelectedDay, setSelectedDay] = useState(null);
  const [SelectedDays, setSelectedDays] = useState([]);
  const DoctorListId = useSelector((state) => state.userRecord?.DoctorListId);
  const clickTimeoutRef = useRef(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [TotalAppointmentCount, setTotalAppointmentCount] = useState([]);
  const [selectedAvailableCells, setSelectedAvailableCells] = useState([]);
  const [DataWithAppointments, setDataWithAppointments] = useState([]);
  const [datesWithAppointments, setdatesWithAppointments] = useState([]);
  const [selectedNotAvailableCells, setSelectedNotAvailableCells] = useState(
    []
  );

  const [selectedCondition, setSelectedCondition] = useState("");

  const [DoctorDayDataEdit, setDoctorDayDataEdit] = useState({
    RadioOption: "Shift",
    Shift: "Single",
    LeaveRemarks: "",
    Starting_time: "",
    Ending_time: "",
    Starting_time_F: "",
    Ending_time_F: "",
    Starting_time_A: "",
    Ending_time_A: "",
    Working_hours_f: "",
    Working_hours_a: "",
    Working_hours_s: "",
    Total_working_hours: "",
    Total_working_hours_s: "",
  });

  const [AppointmentRequestData, setAppointmentRequestData] = useState([]);
  const [AppointmentRequestChange, setAppointmentRequestChange] = useState({
    RequestDate: "",
  });

  // console.log("Locationsssss", Locations);
  // console.log("SelectedLocccccc", SelectedLocations);
  console.log("SeeletedDateeee", SelectedDate);
  // console.log("RequestedDoctorData", RequestedDoctorData);
  console.log("DoctorDayData", DoctorDayData);
  console.log("datesWithAppointments", datesWithAppointments);
  console.log("DoctorDayDataEditttt", DoctorDayDataEdit);
  // console.log("DoctorDayDataDaysss", DoctorDayData?.schedule?.[0]?.days);
  console.log("GetDoctorDataaaaa", GetDoctorData);
  // console.log("CalenderDayssss", calendarDays);
  // console.log("Presssssssssss", isCtrlPressed);
  // console.log("SelectedCellllllll", selectedCells);
  // console.log("SelectedAvaaaiiiiiCellllllll", selectedAvailableCells);
  // console.log("SelectedNNNNAAAAAAACellllllll", selectedNotAvailableCells);
  // console.log("SelectedCondittioonnn", selectedCondition);
  // // const dayName = calendarDays.date.toLocaleString("en-US", { weekday: "long" });
  // console.log("Dayyyyyyyy", SelectedDay);
  console.log("Dayyyyyyyyssssss", SelectedDays);
  // console.log("Dateeeeeeee", SelectedDate);
  console.log("TotalAppointmentCount", TotalAppointmentCount);
  console.log("AppointmentRequestData", AppointmentRequestData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${UrlLink}Masters/doctor_calender_details_view_by_day?DoctorId=${DoctorListId.DoctorId}`
        ); // Replace with your API endpoint
        const schedule = response.data.schedule;

        console.log("scheduleeccc", schedule);

        const createdDate = new Date(response.data.created_at);
        setDoctorCreatedData(createdDate);

        const activeSchedule = schedule.filter(
          (item) => item.Status === "Active"
        );

        // Extract unique locations
        const uniqueLocations = Array.from(
          new Set(activeSchedule.map((item) => item.locationId))
        ).map((id) => {
          return {
            locationId: id,
            locationName: activeSchedule.find((loc) => loc.locationId === id)
              .locationName,
          };
        });
        console.log("scheduleeccclocc", uniqueLocations);

        setLocations(uniqueLocations);

        if (UserData && UserData.location) {
          setSelectedLocations(UserData.location);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchData();
  }, [UrlLink, DoctorListId, UserData]);

  const handlePreviousMonth = () => {
    const currentYear = currentMonth.getFullYear();
    const currentMonthIndex = currentMonth.getMonth();

    if (
      DoctorCreatedData &&
      currentYear === DoctorCreatedData.getFullYear() &&
      currentMonthIndex === DoctorCreatedData.getMonth()
    ) {
      return;
    }

    setCurrentMonth((prevMonth) => {
      const prevMonthDate = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() - 1,
        1
      );

      return prevMonthDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const nextMonthDate = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() + 1,
        1
      );
      return nextMonthDate;
    });
  };
  console.log(
    "Leaveeeeeee",
    GetDoctorData?.schedule?.schedules?.[0]?.leave_remarks
  );

  useEffect(() => {
    const daysInMonth = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const lastDay = new Date(year, month + 1, 0).getDate();
      const startingDay = new Date(year, month, 1).getDay();
      const daysArray = [];

      for (let i = 0; i < startingDay; i++) {
        daysArray.push(null);
      }

      for (let day = 1; day <= lastDay; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        const scheduleEntry = GetDoctorData?.schedule?.find(
          (item) =>
            new Date(item.date).getDate() === day &&
            item.day_of_week === dayOfWeek
        );
        // console.log("Scheeeeeee", scheduleEntry);

        const OPDTiming =
          scheduleEntry?.schedules?.[0]?.shift === "Single"
            ? scheduleEntry?.schedules?.[0]?.total_working_hours_s
            : scheduleEntry?.schedules?.[0]?.total_working_hours;

        let Available = "Not Available"; // Default
        if (scheduleEntry?.schedules?.[0]?.working === "yes") {
          Available = "Available";
        } else if (
          scheduleEntry?.schedules?.[0]?.working === "no" &&
          scheduleEntry?.schedules?.[0]?.leave_remarks
        ) {
          Available = "Leave";
        }
        let Leave = scheduleEntry?.schedules?.[0]?.leave_remarks;
        let Changed = scheduleEntry?.schedules?.[0]?.changed === "yes";

        daysArray.push({
          date,
          OPDTiming,
          Available,
          Leave,
          Changed,
        });
      }
      return daysArray;
    };

    const updateCalenderDays = () => {
      const days = daysInMonth();
      setCalendarDays(days);
    };

    updateCalenderDays();
  }, [currentMonth, SelectedLocations, GetDoctorData]);

  const handleDayClick = (day) => {
    const dayName = day.date.toLocaleString("en-US", { weekday: "long" });
    const dayOfMonth = String(day.date.getDate()).padStart(2, "0");
    const month = String(day.date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = day.date.getFullYear();
    const formattedDate = `${year}-${month}-${dayOfMonth}`; // This should match the JSON format
    console.log("Clicked day:", dayName);
    console.log("Clicked date:", formattedDate);
    if (day.Available === "Available") {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        setSelectedDate(formattedDate);
        setSelectedDay(dayName);
        setShowModal(true);
        fetchDoctorDayData(SelectedLocations, formattedDate);
      }, 300);
    }
  };

  const handleDayDoubleClick = (day) => {
    const dayName = day.date.toLocaleString("en-US", { weekday: "long" });
    const dayOfMonth = String(day.date.getDate()).padStart(2, "0");
    const month = String(day.date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = day.date.getFullYear();
    const formattedDate = `${year}-${month}-${dayOfMonth}`; // This should match the JSON format

    if (day.Changed && day.Available === "Available") {
      clearTimeout(clickTimeoutRef.current);
      setSelectedDay(dayName);
      setSelectedDate(formattedDate);
      setshowModalEditNA(true);
    } else if (day.Available === "Available") {
      setSelectedDay(dayName);
      setSelectedDate(formattedDate);
      setshowModalEdit(true);
    } else if (day.Available === "Not Available") {
      clearTimeout(clickTimeoutRef.current);
      setSelectedDay(dayName);
      setSelectedDate(formattedDate);
      setshowModalEditNA(true);
    }
  };
  const handleLocationChange = (e) => {
    const month = currentMonth.getMonth() + 1; // Months are 0-indexed
    const year = currentMonth.getFullYear();
    setSelectedLocations(e.target.value);
    fetchFilteredData(e.target.value, month, year);
  };

  const handleShiftChange = (e) => {
    const { name, value } = e.target;
    console.log("Shifttttt", value, name);
    setDoctorDayDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const HandleAppointmentReq = (e) => {
    const { name, value } = e.target;
    const formattedVal = value;
    console.log("RequestedChange", formattedVal);

    setAppointmentRequestChange((prev) => ({
      ...prev,
      [name]: formattedVal,
    }));
    if (formattedVal) {
      axios
        .get(`${UrlLink}Frontoffice/calender_modal_display_data_by_day`, {
          params: {
            DoctorId: DoctorListId.DoctorId,
            LocationId: UserData.location,
            Date: formattedVal,
          },
        })
        .then((response) => {
          const res = response.data;
          // setRequestedDoctorData(res);
          console.log("RequestedFetch", res);
          let doctor_schedule = res?.schedule?.[0];
          console.log("RequestedSchedule", doctor_schedule);

          if (SelectedDate === formattedVal) {
            const tdata = {
              message: `You are Selecting the Appointment Changing Date`,
              type: "warn",
            };
            dispatch({ type: "toast", value: tdata });
            return;
          } else if (doctor_schedule?.working !== "yes") {
            const tdata = {
              message: "The Doctor is not Available on the Selected Date",
              type: "warn",
            };
            dispatch({ type: "toast", value: tdata });
            return;
          }
        })
        .catch((err) => {
          console.error("Error fetching filtered data:", err);
        });
    }
  };

  const handleinpchangeLeaveRemarks = (e) => {
    const { name, value } = e.target;
    console.log("Shifttttt", value, name);
    setDoctorDayDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeChange = (e, column) => {
    const value = e.target.value;

    setDoctorDayDataEdit((prev) => {
      const updatedData = { ...prev, [column]: value };

      // Parse the start and end times
      let startTime, endTime;
      if (updatedData.Shift === "Single") {
        startTime = parse(updatedData.Starting_time, "HH:mm", new Date());
        endTime = parse(updatedData.Ending_time, "HH:mm", new Date());
      } else if (updatedData.Shift === "Double") {
        startTime = parse(updatedData.Starting_time_F, "HH:mm", new Date());
        endTime = parse(updatedData.Ending_time_F, "HH:mm", new Date());
      }
      console.log("SSSSSSTimeeeeeeeee", startTime);
      console.log("EEEEEEETimeeeeeeeee", startTime);
      if (
        updatedData.Starting_time &&
        updatedData.Ending_time &&
        differenceInMinutes(endTime, startTime) < 0
      ) {
        const tdata = {
          message: `The End Time should be more than Starting time`,
          type: "warn",
        };

        // dispatch({ type: "toast", value: tdata });
      }

      // Calculate time difference for Single shift
      if (
        updatedData.Shift === "Single" &&
        updatedData.Starting_time &&
        updatedData.Ending_time
      ) {
        let diffInMinutes = differenceInMinutes(endTime, startTime);

        // Handle cases where the end time is before the start time (overnight shift)
        if (diffInMinutes < 0) {
          diffInMinutes += 1440; // 1440 minutes in a day
        }
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        updatedData.Working_hours_s = `${hours}h ${minutes}m`;
        updatedData.Total_working_hours_s = `${hours}h ${minutes}m`;
      }

      // Calculate time difference for Double shift
      if (updatedData.Shift === "Double") {
        let diffInMinutes_f = 0,
          diffInMinutes_a = 0;

        if (updatedData.Starting_time_F && updatedData.Ending_time_F) {
          diffInMinutes_f = differenceInMinutes(endTime, startTime);
          if (diffInMinutes_f < 0) {
            diffInMinutes_f += 1440;
          }
          const hours_f = Math.floor(diffInMinutes_f / 60);
          const minutes_f = diffInMinutes_f % 60;
          updatedData.Working_hours_f = `${hours_f}h ${minutes_f}m`;
        }

        startTime = parse(updatedData.Starting_time_A, "HH:mm", new Date());
        endTime = parse(updatedData.Ending_time_A, "HH:mm", new Date());

        if (updatedData.Starting_time_A && updatedData.Ending_time_A) {
          diffInMinutes_a = differenceInMinutes(endTime, startTime);
          if (diffInMinutes_a < 0) {
            diffInMinutes_a += 1440;
          }
          const hours_a = Math.floor(diffInMinutes_a / 60);
          const minutes_a = diffInMinutes_a % 60;
          updatedData.Working_hours_a = `${hours_a}h ${minutes_a}m`;

          // Calculate total working hours
          const totalMinutes = diffInMinutes_f + diffInMinutes_a;
          const totalHours = Math.floor(totalMinutes / 60);
          const totalRemainingMinutes = totalMinutes % 60;
          updatedData.Total_working_hours = `${totalHours}h ${totalRemainingMinutes}m`;
        }
      }

      return updatedData;
    });
  };

  useEffect(() => {
    if (Object.keys(UserData).length !== 0) {
      // Ensure that LocationData is set as an array
      setLocationData(
        Array.isArray(UserData.location)
          ? UserData.location
          : [UserData.location]
      );
    } else {
      setLocationData([]);
    }
  }, [UserData]);

  const fetchFilteredData = useCallback(
    async (locationId, month, year) => {
      try {
        const response = await axios.get(
          `${UrlLink}Masters/doctor_calender_details_view_by_doctorId_locationId`,
          {
            params: {
              DoctorId: DoctorListId.DoctorId,
              LocationId: locationId,
              month,
              year,
            },
          }
        );
        setGetDoctorData(response.data);
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      }
    },
    [UrlLink, DoctorListId.DoctorId]
  );

  const fetchDoctorDayData = useCallback(
    async (locationId, day) => {
      try {
        const response = await axios.get(
          `${UrlLink}Masters/calender_modal_display_data_by_day`,
          {
            params: {
              DoctorId: DoctorListId.DoctorId,
              LocationId: locationId,
              Date: day,
            },
          }
        );
        setDoctorDayData(response.data);
      } catch (err) {
        console.error("Error fetching filtered data:", err);
      }
    },
    [UrlLink, DoctorListId.DoctorId]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const month = currentMonth.getMonth() + 1; // Months are 0-indexed
        const year = currentMonth.getFullYear();
        console.log("MOntthhhhhhhh----Yearrrrrrrr", month, year);

        await fetchFilteredData(SelectedLocations, month, year); // Fetch calendar data based on month and year
      } catch (err) {
        console.error("Error fetching data:", err);
      }
      if (SelectedLocations && SelectedDate) {
        try {
          await fetchDoctorDayData(SelectedLocations, SelectedDate); // Fetch day-specific data
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [
    SelectedLocations,
    SelectedDate,
    currentMonth,
    fetchFilteredData,
    fetchDoctorDayData,
  ]);

  // useEffect(() => {
  //   const fetchAppointmentData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${UrlLink}/Frontoffice/daily_appointment_counts_per_doctor`,
  //         {
  //           params: {
  //             LocationId: UserData.location,
  //             month: currentMonth.getMonth() + 1, // Months are 0-based
  //             year: currentMonth.getFullYear(),
  //           },
  //         }
  //       );

  //       const data = response.data;
  //       console.log("countdataaaa", data);

  //       // Process the data to store doctor details and appointment counts
  //       const processedDoctors = data.map((doctor) => {
  //         return {
  //           doctor_id: doctor.doctor_id,
  //           doctor_name: doctor.doctor_name,
  //           doctor_specialization: doctor.doctor_specialization,
  //           daily_appointment_counts: doctor.daily_appointment_counts,
  //         };
  //       });
  //       console.log("Prroooocccc", processedDoctors);

  //       setTotalAppointmentCount(processedDoctors);
  //     } catch (error) {
  //       console.error("Error fetching appointment data:", error);
  //     }
  //   };

  //   fetchAppointmentData();
  // }, [UrlLink, currentMonth, UserData.location]);

  useEffect(() => {
    axios
      .get(`${UrlLink}Frontoffice/Appointment_Request_List_Link`)
      .then((res) => {
        const ress = res.data;
        console.log("ressss", ress);
        const app =
          Array.isArray(ress) &&
          ress.filter((apps) => apps.DoctorID === DoctorListId.DoctorId);
        console.log("Gettttttapppp", app);
        setAppointmentRequestData(app);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [UrlLink, DoctorListId.DoctorId, GetDoctorData]);

  const handleSubmit = async () => {
    try {
      // Fetch the updated appointment data before submitting
      const fetchUpdatedDoctorDetails = async () => {
        try {
          const response = await axios.get(
            `${UrlLink}/Frontoffice/daily_appointment_counts_per_doctor`,
            {
              params: {
                LocationId: UserData.location,
                month: currentMonth.getMonth() + 1, // Months are 0-based
                year: currentMonth.getFullYear(),
              },
            }
          );

          const data = response.data;

          // Process the data to store doctor details and appointment counts
          const processedDoctors = data.map((doctor) => {
            return {
              doctor_id: doctor.doctor_id,
              doctor_name: doctor.doctor_name,
              doctor_specialization: doctor.doctor_specialization,
              daily_appointment_counts: doctor.daily_appointment_counts,
            };
          });

          // Find the doctor matching the current DoctorListId and get appointment count for the selected date
          const updatedDoctorappdetails = processedDoctors.filter(
            (doc) => doc.doctor_id === DoctorListId.DoctorId
          );

          const appointmentCount =
            updatedDoctorappdetails?.[0]?.daily_appointment_counts?.[
              SelectedDate
            ] || 0;

          return appointmentCount;
        } catch (error) {
          console.error("Error fetching appointment data:", error);
          return 0;
        }
      };

      // Wait for the latest appointment count
      const appointmentCount = await fetchUpdatedDoctorDetails();

      const updatedDoctorDayDataEdit = {
        ...DoctorDayDataEdit,
        DoctorID: DoctorListId.DoctorId,
        date: SelectedDate,
        day: SelectedDay,
        location: SelectedLocations,
      };

      // Check if appointments exist and handle leave case
      if (
        updatedDoctorDayDataEdit.RadioOption === "Leave" &&
        appointmentCount > 0
      ) {
        console.log("Cannot submit: Appointments exist for the selected date.");
        setshowModalCondition(true);
        setshowModalEdit(false);
      } else {
        // Submit the form since no appointments conflict with leave
        const month = currentMonth.getMonth() + 1;
        const year = currentMonth.getFullYear();

        // Convert empty strings to null
        for (const key in updatedDoctorDayDataEdit) {
          if (updatedDoctorDayDataEdit[key] === "") {
            updatedDoctorDayDataEdit[key] = null;
          }
        }

        // Submit form data
        const response = await axios.post(
          `${UrlLink}Masters/calender_modal_display_edit_by_day`,
          updatedDoctorDayDataEdit
        );
        console.log("Response", response.data);

        const res = response.data;
        const type = Object.keys(res)[0];
        const mess = Object.values(res)[0];
        const tdata = {
          message: mess,
          type: type,
        };
        dispatch({ type: "toast", value: tdata });

        // Fetch updated appointment data after submission to refresh TotalAppointmentCount
        fetchFilteredData(SelectedLocations, month, year);
        handleCloseModal();

        setDoctorDayDataEdit({
          RadioOption: "Shift",
          Shift: "Single",
          LeaveRemarks: "",
          Starting_time: "",
          Ending_time: "",
          Starting_time_F: "",
          Ending_time_F: "",
          Starting_time_A: "",
          Ending_time_A: "",
          Working_hours_f: "",
          Working_hours_a: "",
          Working_hours_s: "",
          Total_working_hours: "",
          Total_working_hours_s: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmitMultiple = async () => {
    try {
      // Fetch updated appointment data before submitting
      const fetchUpdatedDoctorDetails = async () => {
        try {
          const response = await axios.get(
            `${UrlLink}/Frontoffice/daily_appointment_counts_per_doctor`,
            {
              params: {
                LocationId: UserData.location,
                month: currentMonth.getMonth() + 1, // Months are 0-based
                year: currentMonth.getFullYear(),
              },
            }
          );

          const data = response.data;

          // Process data to store doctor details and appointment counts
          const processedDoctors = data.map((doctor) => ({
            doctor_id: doctor.doctor_id,
            doctor_name: doctor.doctor_name,
            doctor_specialization: doctor.doctor_specialization,
            daily_appointment_counts: doctor.daily_appointment_counts,
          }));

          const updatedDoctorAppDetails = processedDoctors.filter(
            (doc) => doc.doctor_id === DoctorListId.DoctorId
          );

          const dailyAppointmentCounts =
            updatedDoctorAppDetails?.[0]?.daily_appointment_counts || {};

          return dailyAppointmentCounts;
        } catch (error) {
          console.error("Error fetching appointment data:", error);
          return {};
        }
      };

      const dailyAppointmentCounts = await fetchUpdatedDoctorDetails();

      // Split dates based on appointments
      const datesWithAppointments = selectedCells.filter(
        (date) =>
          dailyAppointmentCounts[date] && dailyAppointmentCounts[date] > 0
      );
      const datesWithNoAppointments = selectedCells.filter(
        (date) =>
          !dailyAppointmentCounts[date] || dailyAppointmentCounts[date] === 0
      );
      const datesWithZeroAppointments = selectedCells.filter(
        (date) => dailyAppointmentCounts[date] === 0 
      );
      const updatedDoctorDayDataEdit = {
        ...DoctorDayDataEdit,
        DoctorID: DoctorListId.DoctorId,
        date: datesWithNoAppointments, // Only dates with no appointments
        day: SelectedDays,
        location: SelectedLocations,
      };

      console.log("Dates with appointments:", datesWithAppointments);
      console.log("Dates with no appointments:", datesWithNoAppointments);
      setdatesWithAppointments(datesWithAppointments); // Store data for use in the modal

      // Step 1: Handle submission for dates with no appointments
      if (DoctorDayDataEdit.RadioOption === 'Leave' && datesWithNoAppointments.length > 0 && datesWithAppointments.length === 0) {
        const updatedDoctorDayDataEdit = {
          ...DoctorDayDataEdit,
          DoctorID: DoctorListId.DoctorId,
          date: datesWithNoAppointments, // Only dates with no appointments
          day: SelectedDays,
          location: SelectedLocations,
        };
        console.log("DateswithNO Appoint&0Apps")

        // Convert empty strings to null
        for (const key in updatedDoctorDayDataEdit) {
          if (updatedDoctorDayDataEdit[key] === "") {
            updatedDoctorDayDataEdit[key] = null;
          }
        }

        console.log(
          "Submitting dates with no appointments:",
          updatedDoctorDayDataEdit
        );

        const response = await axios.post(
          `${UrlLink}Masters/calender_modal_display_edit_by_mutiple_day`,
          updatedDoctorDayDataEdit
        );

        console.log("Response for no appointment dates:", response.data);

        const res = response.data;
        const type = Object.keys(res)[0];
        const mess = Object.values(res)[0];
        const tdata = {
          message: mess,
          type: type,
        };
        dispatch({ type: "toast", value: tdata });

        // Refresh data or take any other actions needed after successful submission
        const month = currentMonth.getMonth() + 1; // Months are 0-indexed
        const year = currentMonth.getFullYear();
        fetchFilteredData(SelectedLocations, month, year);
        handleCloseModal();
        setSelectedAvailableCells([]);
        setSelectedNotAvailableCells([]);
        setDoctorDayDataEdit({
          RadioOption: "Shift",
          Shift: "Single",
          LeaveRemarks: "",
          Starting_time: "",
          Ending_time: "",
          Starting_time_F: "",
          Ending_time_F: "",
          Starting_time_A: "",
          Ending_time_A: "",
          Working_hours_f: "",
          Working_hours_a: "",
          Working_hours_s: "",
          Total_working_hours: "",
          Total_working_hours_s: "",
        });
      }else if (DoctorDayDataEdit.RadioOption === 'Leave' && datesWithNoAppointments.length === 0 && datesWithAppointments.length === 0){
        console.log("Dateswithelsepart")
        const updatedDoctorDayDataEdit = {
          ...DoctorDayDataEdit,
          DoctorID: DoctorListId.DoctorId,
          date: selectedCells, // Only dates with no appointments
          day: SelectedDays,
          location: SelectedLocations,
        };

        // Convert empty strings to null
        for (const key in updatedDoctorDayDataEdit) {
          if (updatedDoctorDayDataEdit[key] === "") {
            updatedDoctorDayDataEdit[key] = null;
          }
        }

        console.log(
          "Submitting dates with no appointments:",
          updatedDoctorDayDataEdit
        );

        const response = await axios.post(
          `${UrlLink}Masters/calender_modal_display_edit_by_mutiple_day`,
          updatedDoctorDayDataEdit
        );

        console.log("Response for no appointment dates:", response.data);

        const res = response.data;
        const type = Object.keys(res)[0];
        const mess = Object.values(res)[0];
        const tdata = {
          message: mess,
          type: type,
        };
        dispatch({ type: "toast", value: tdata });

        // Refresh data or take any other actions needed after successful submission
        const month = currentMonth.getMonth() + 1; // Months are 0-indexed
        const year = currentMonth.getFullYear();
        fetchFilteredData(SelectedLocations, month, year);
        handleCloseModal();
        setDoctorDayDataEdit({
          RadioOption: "Shift",
          Shift: "Single",
          LeaveRemarks: "",
          Starting_time: "",
          Ending_time: "",
          Starting_time_F: "",
          Ending_time_F: "",
          Starting_time_A: "",
          Ending_time_A: "",
          Working_hours_f: "",
          Working_hours_a: "",
          Working_hours_s: "",
          Total_working_hours: "",
          Total_working_hours_s: "",
        });
      }else if (DoctorDayDataEdit.RadioOption === 'Leave' && datesWithNoAppointments.length > 0){
        console.log("Dateswithelsepart")
        const updatedDoctorDayDataEdit = {
          ...DoctorDayDataEdit,
          DoctorID: DoctorListId.DoctorId,
          date: datesWithNoAppointments, // Only dates with no appointments
          day: SelectedDays,
          location: SelectedLocations,
        };

        // Convert empty strings to null
        for (const key in updatedDoctorDayDataEdit) {
          if (updatedDoctorDayDataEdit[key] === "") {
            updatedDoctorDayDataEdit[key] = null;
          }
        }

        console.log(
          "Submitting dates with no appointments:",
          updatedDoctorDayDataEdit
        );

        const response = await axios.post(
          `${UrlLink}Masters/calender_modal_display_edit_by_mutiple_day`,
          updatedDoctorDayDataEdit
        );

        console.log("Response for no appointment dates:", response.data);

        const res = response.data;
        const type = Object.keys(res)[0];
        // const mess = Object.values(res)[0];
        const tdata = {
          message: `The following selected dates have 0 appointments:${datesWithZeroAppointments}`,
          type: type,
        };
        dispatch({ type: "toast", value: tdata });

        // Refresh data or take any other actions needed after successful submission
        const month = currentMonth.getMonth() + 1; // Months are 0-indexed
        const year = currentMonth.getFullYear();
        fetchFilteredData(SelectedLocations, month, year);
        setDoctorDayDataEdit({
          RadioOption: "Shift",
          Shift: "Single",
          LeaveRemarks: "",
          Starting_time: "",
          Ending_time: "",
          Starting_time_F: "",
          Ending_time_F: "",
          Starting_time_A: "",
          Ending_time_A: "",
          Working_hours_f: "",
          Working_hours_a: "",
          Working_hours_s: "",
          Total_working_hours: "",
          Total_working_hours_s: "",
        });
      }else if (DoctorDayDataEdit.RadioOption === 'Shift'){
        console.log("Dateswithelsepart")
        const updatedDoctorDayDataEdit = {
          ...DoctorDayDataEdit,
          DoctorID: DoctorListId.DoctorId,
          date: selectedCells, // Only dates with no appointments
          day: SelectedDays,
          location: SelectedLocations,
        };

        // Convert empty strings to null
        for (const key in updatedDoctorDayDataEdit) {
          if (updatedDoctorDayDataEdit[key] === "") {
            updatedDoctorDayDataEdit[key] = null;
          }
        }

        console.log(
          "Submitting dates with no appointments:",
          updatedDoctorDayDataEdit
        );

        const response = await axios.post(
          `${UrlLink}Masters/calender_modal_display_edit_by_mutiple_day`,
          updatedDoctorDayDataEdit
        );

        console.log("Response for no appointment dates:", response.data);

        const res = response.data;
        const type = Object.keys(res)[0];
        const mess = Object.values(res)[0];
        const tdata = {
          message: mess,
          type: type,
        };
        dispatch({ type: "toast", value: tdata });

        // Refresh data or take any other actions needed after successful submission
        const month = currentMonth.getMonth() + 1; // Months are 0-indexed
        const year = currentMonth.getFullYear();
        fetchFilteredData(SelectedLocations, month, year);
        handleCloseModal();
        setSelectedAvailableCells([]);
        setSelectedNotAvailableCells([]);
        setDoctorDayDataEdit({
          RadioOption: "Shift",
          Shift: "Single",
          LeaveRemarks: "",
          Starting_time: "",
          Ending_time: "",
          Starting_time_F: "",
          Ending_time_F: "",
          Starting_time_A: "",
          Ending_time_A: "",
          Working_hours_f: "",
          Working_hours_a: "",
          Working_hours_s: "",
          Total_working_hours: "",
          Total_working_hours_s: "",
        });
      }


      // Step 2: Move dates with appointments to modal
      if (datesWithAppointments.length > 0) {
        console.log(
          "Opening modal for dates with appointments:",
          datesWithAppointments
        );

        const updatedDoctorDayDataEdit = {
          ...DoctorDayDataEdit,
          DoctorID: DoctorListId.DoctorId,
          date: datesWithAppointments, // Only dates with appointments
          day: SelectedDays,
          location: SelectedLocations,
        };

        setDataWithAppointments(updatedDoctorDayDataEdit); // Store data for use in the modal
        setshowModalConditionMul(true); // Open the modal for further actions
        setshowModalEdit(false); // Close the edit modal if open
        setshowModalEditMultiple(false); // Close the edit modal if open
      }
    } catch (e) {
      console.log("Error", e.message);
    }
  };

  const handleChangeApp = () => {
    if (datesWithAppointments.length > 0) {
      setShowAppMulModal(true);
      setshowModalConditionMul(false);
    } else {
      setShowAppModal(true);
      setshowModalCondition(false);
    }
  };
  const handleCancelApp = () => {
    if (formattedSelectedAvailableCells.length !== 0) {
      const idsss = AppointmentRequestData.filter((appointment) =>
        formattedSelectedAvailableCells.includes(appointment.RequestDate)
      ).map((f) => f.id);
      console.log("Appppp", idsss);
      let updatedAppRequest = {
        AppointmentID: idsss,
        RequestDate: formattedSelectedAvailableCells,
      };
      console.log("updatedAppRequesttt", updatedAppRequest);
      axios
        .post(
          `${UrlLink}Masters/Appointment_Request_List_Delete_Links`,
          updatedAppRequest
        )
        .then((response) => {
          const resData = response.data;
          const mess = Object.values(resData)[0];
          const typp = Object.keys(resData)[0];
          console.log(
            "Appointment request submitted successfully:",
            response.data
          );
          if (typp === "success") {
            handleLeaveMul();
            console.log("Submittttttttt");
          }
          const tdata = {
            message: mess,
            type: typp,
          };
          setShowAppModal(false);
          handleCloseModal();
          dispatch({ type: "toast", value: tdata });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const idsss = AppointmentRequestData.filter(
        (f) => f.RequestDate === SelectedDate
      ).map((f) => f.id);

      let updatedAppRequest = {
        AppointmentID: idsss,
        RequestDate: [SelectedDate],
      };
      console.log("updatedAppRequesttt", updatedAppRequest);
      axios
        .post(
          `${UrlLink}Masters/Appointment_Request_List_Delete_Links`,
          updatedAppRequest
        )
        .then((response) => {
          const resData = response.data;
          const mess = Object.values(resData)[0];
          const typp = Object.keys(resData)[0];
          console.log(
            "Appointment request submitted successfully:",
            response.data
          );
          if (typp === "success") {
            handleLeave();
            console.log("Submittttttttt");
          }
          const tdata = {
            message: mess,
            type: typp,
          };
          setShowAppModal(false);
          handleCloseModal();
          dispatch({ type: "toast", value: tdata });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLeave = () => {
    const updatedDoctorDayDataEdit = {
      ...DoctorDayDataEdit,
      DoctorID: DoctorListId.DoctorId,
      date: SelectedDate,
      day: SelectedDay,
      location: SelectedLocations,
    };
    const month = currentMonth.getMonth() + 1; // Months are 0-indexed
    const year = currentMonth.getFullYear();
    // Convert empty strings to null
    for (const key in updatedDoctorDayDataEdit) {
      if (updatedDoctorDayDataEdit[key] === "") {
        updatedDoctorDayDataEdit[key] = null;
      }
    }
    console.log(updatedDoctorDayDataEdit);
    axios
      .post(
        `${UrlLink}Masters/calender_modal_display_edit_by_day`,
        updatedDoctorDayDataEdit
      )
      .then((response) => {
        console.log("Response", response.data);

        const res = response.data;
        const type = Object.keys(res)[0];
        const mess = Object.values(res)[0];
        const tdata = {
          message: mess,
          type: type,
        };
        dispatch({ type: "toast", value: tdata });
        fetchFilteredData(SelectedLocations, month, year);
        handleCloseModal();
        setDoctorDayDataEdit({
          RadioOption: "Shift",
          Shift: "Single",
          LeaveRemarks: "",
          Starting_time: "",
          Ending_time: "",
          Starting_time_F: "",
          Ending_time_F: "",
          Starting_time_A: "",
          Ending_time_A: "",
          Working_hours_f: "",
          Working_hours_a: "",
          Working_hours_s: "",
          Total_working_hours: "",
          Total_working_hours_s: "",
        });
      })
      .catch((e) => {
        console.log("Error", e.message);
      });
  };
  const handleLeaveMul = () => {
    const month = currentMonth.getMonth() + 1; // Months are 0-indexed
    const year = currentMonth.getFullYear();

    // Convert empty strings to null
    for (const key in DataWithAppointments) {
      if (DataWithAppointments[key] === "") {
        DataWithAppointments[key] = null;
      }
    }
    console.log(DataWithAppointments);
    axios
      .post(
        `${UrlLink}Masters/calender_modal_display_edit_by_mutiple_day`,
        DataWithAppointments
      )
      .then((response) => {
        console.log("Response", response.data);

        const res = response.data;
        const type = Object.keys(res)[0];
        const mess = Object.values(res)[0];
        const tdata = {
          message: mess,
          type: type,
        };
        dispatch({ type: "toast", value: tdata });
        fetchFilteredData(SelectedLocations, month, year);
        handleCloseModal();
        setSelectedAvailableCells([]);
        setSelectedNotAvailableCells([]);
        setDoctorDayDataEdit({
          RadioOption: "Shift",
          Shift: "Single",
          LeaveRemarks: "",
          Starting_time: "",
          Ending_time: "",
          Starting_time_F: "",
          Ending_time_F: "",
          Starting_time_A: "",
          Ending_time_A: "",
          Working_hours_f: "",
          Working_hours_a: "",
          Working_hours_s: "",
          Total_working_hours: "",
          Total_working_hours_s: "",
        });
      })
      .catch((e) => {
        console.log("Error", e.message);
      });
  };

  const handleSubmitApp = () => {
    // Ensure AppointmentRequestData is an array before mapping over it
    const idsss =
      Array.isArray(AppointmentRequestData) &&
      AppointmentRequestData.filter(
        (app) => app.RequestDate === SelectedDate
      ).map((f) => f.id);

    console.log("Appppp", idsss);

    const { RequestDate } = AppointmentRequestChange;
    const updatedAppRequest = {
      AppointmentID: idsss,
      RequestDate: [RequestDate],
    };
    console.log("updatedAppRequestttSingleee", updatedAppRequest);

    axios
      .post(
        `${UrlLink}Masters/Appointment_Request_List_Links`,
        updatedAppRequest
      )
      .then((response) => {
        const resData = response.data;
        const mess = Object.values(resData)[0];
        const typp = Object.keys(resData)[0];
        console.log(
          "Appointment request submitted successfully:",
          response.data
        );
        console.log("Submittttttttt");
        if (typp === "success") {
          handleLeave();
          console.log("Submittttttttt");
        }
        const tdata = {
          message: mess,
          type: typp,
        };
        setShowAppModal(false);
        setShowAppMulModal(false);
        dispatch({ type: "toast", value: tdata });
        AppointmentRequestChange({
          RequestDate: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmitMulApp = () => {
    // Ensure AppointmentRequestData is an array before mapping over it
    const idsss = AppointmentRequestData.filter((appointment) =>
      formattedSelectedAvailableCells.includes(appointment.RequestDate)
    ).map((f) => f.id);
    console.log("Appppp", idsss);
    const { RequestDate } = AppointmentRequestChange;

    const updatedAppRequest = {
      AppointmentID: idsss,
      RequestDate: [RequestDate],
    };
    console.log("updatedAppRequesttt", updatedAppRequest);

    axios
      .post(
        `${UrlLink}Masters/Appointment_Request_List_Links`,
        updatedAppRequest
      )
      .then((response) => {
        const resData = response.data;
        const mess = Object.values(resData)[0];
        const typp = Object.keys(resData)[0];
        console.log(
          "Appointment request submitted successfully:",
          response.data
        );
        if (typp === "success") {
          handleLeaveMul();
          console.log("Submittttttttt");
        }
        const tdata = {
          message: mess,
          type: typp,
        };
        handleCloseModal();
        dispatch({ type: "toast", value: tdata });
        AppointmentRequestChange({
          RequestDate: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setshowModalEdit(false);
    setshowModalEditNA(false);
    setshowModalEditMultiple(false);
    setShowAppModal(false);
    setshowModalCondition(false);
    setshowModalConditionMul(false);
    setShowAppMulModal(false);
    setDoctorDayDataEdit({
      RadioOption: "Shift",
      Shift: "Single",
      LeaveRemarks: "",
      Starting_time: "",
      Ending_time: "",
      Starting_time_F: "",
      Ending_time_F: "",
      Starting_time_A: "",
      Ending_time_A: "",
      Working_hours_f: "",
      Working_hours_a: "",
      Working_hours_s: "",
      Total_working_hours: "",
      Total_working_hours_s: "",
    });
  };

  const formatDate = (dateString) => {
    // Remove leading slash if present
    dateString = dateString.startsWith("/") ? dateString.slice(1) : dateString;

    // Convert the string to a Date object
    const date = new Date(dateString);

    // Extract year, month, and day from the Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date as "YYYY-MM-DD"
    return `${year}-${month}-${day}`;
  };
  // Sort and format the selected dates
  const sortedFormattedAvailDates = selectedAvailableCells
    .map(formatDate)
    .sort((a, b) => new Date(a) - new Date(b));
  const sortedFormattedNotAvailDates = selectedNotAvailableCells
    .map(formatDate)
    .sort((a, b) => new Date(a) - new Date(b));

  // Determine the display format
  const displayAvailDateRange =
    sortedFormattedAvailDates.length > 1
      ? `${sortedFormattedAvailDates[0]} to ${
          sortedFormattedAvailDates[sortedFormattedAvailDates.length - 1]
        }`
      : sortedFormattedAvailDates[0];
  const displayNotAvailDateRange =
    sortedFormattedNotAvailDates.length > 1
      ? `${sortedFormattedNotAvailDates[0]} to ${
          sortedFormattedNotAvailDates[sortedFormattedNotAvailDates.length - 1]
        }`
      : sortedFormattedNotAvailDates[0];

  // console.log("Formatted Avail Date Range:", displayAvailDateRange); // Outputs "07/08/2024 to 09/08/2024"
  // console.log("Formatted NA Date Range:", displayNotAvailDateRange); // Outputs "07/08/2024 to 09/08/2024"
  const formattedSelectedAvailableCells =
    selectedAvailableCells.map(formatDate);
  const formattedselectedNotAvailableCells =
    selectedNotAvailableCells.map(formatDate);

  console.log(
    "formattedSelectedAvailableCells",
    formattedSelectedAvailableCells
  );
  console.log(
    "formattedselectedNotAvailableCells",
    formattedselectedNotAvailableCells
  );

  // Handle keydown event
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Control") {
      setIsCtrlPressed(true);
    }
  }, []);

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === "Control") {
        setIsCtrlPressed(false);
        if (selectedAvailableCells.length > 0) {
          setshowModalEditMultiple(true);
          setSelectedCells(formattedSelectedAvailableCells);
          console.log("Modal is opening for availableee....");
        }
        if (selectedNotAvailableCells.length > 0) {
          setshowModalEditMultiple(true);
          setSelectedCells(formattedselectedNotAvailableCells);
          console.log("Modal is opening for not availableee....");
        }
      }
    },
    [
      selectedAvailableCells,
      selectedNotAvailableCells,
      formattedSelectedAvailableCells,
      formattedselectedNotAvailableCells,
    ]
  );

  // Add and remove event listeners for keydown and keyup
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Handle cell click
  const handleCellClick = (e, day) => {
    e.preventDefault();

    const cellKey = day.date.toDateString(); // Unique key based on date
    const dayName = day.date.toLocaleString("en-US", { weekday: "long" }); // Get the day name

    setSelectedDays((prevSelectedDays) => {
      // Check if the dayName already exists in selectedDays
      const existingEntry = prevSelectedDays.find(
        (entry) => entry.dayName === dayName
      );

      if (existingEntry) {
        // If the dayName is already selected, update the list of dates for that dayName
        const updatedDates = existingEntry.dates.includes(cellKey)
          ? existingEntry.dates.filter((date) => date !== cellKey) // Deselect cell
          : [...existingEntry.dates, cellKey]; // Select cell

        // Update the state with the new list of dates for the dayName
        return prevSelectedDays.map((entry) =>
          entry.dayName === dayName ? { ...entry, dates: updatedDates } : entry
        );
      } else {
        // If the dayName is not in the selectedDays, add it with the current date
        return [...prevSelectedDays, dayName];
      }
    });

    if (day.Available === "Available") {
      // If selecting "Available" cell, clear "Not Available" selections
      setSelectedNotAvailableCells([]);
      setSelectedCondition("Available");
      setSelectedAvailableCells(
        (prevSelected) =>
          prevSelected.includes(cellKey)
            ? prevSelected.filter((cell) => cell !== cellKey) // Deselect cell
            : [...prevSelected, cellKey] // Select cell
      );
    } else if (day.Available === "Not Available") {
      // If selecting "Not Available" cell, clear "Available" selections
      setSelectedAvailableCells([]);
      setSelectedCondition("Not Available");
      setSelectedNotAvailableCells(
        (prevSelected) =>
          prevSelected.includes(cellKey)
            ? prevSelected.filter((cell) => cell !== cellKey) // Deselect cell
            : [...prevSelected, cellKey] // Select cell
      );
    }
  };

  const renderCalendar = () => {
    let rows = [];
    let cells = [];

    // Get today's date without time (so we can compare it correctly)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to 00:00:00 for accurate comparison

    calendarDays.forEach((day, index) => {
      if (index % 7 === 0) {
        rows.push(cells);
        cells = [];
      }

      if (day) {
        const isSunday = day.date.getDay() === 0;
        const isToday = day.date.getTime() === today.getTime(); // Check if the date is today
        const isBeforeToday = day.date.getTime() < today.getTime(); // Check if the date is before today
        const changedClassName = day.Changed ? "changed_text" : "";
        const isSelectedAvailable = selectedAvailableCells.includes(
          day.date.toDateString()
        );
        const isSelectedNotAvailable = selectedNotAvailableCells.includes(
          day.date.toDateString()
        );

        cells.push(
          <td
            key={index}
            className={`cal_flex ${
              isSelectedAvailable
                ? "selected_available"
                : isSelectedNotAvailable
                ? "selected_not_available"
                : ""
            }
            ${isToday ? "today_date" : ""}
            ${isBeforeToday ? "previous_date" : ""}`}
            onContextMenu={(e) => handleCellClick(e, day)}
          >
            <div
              className="day"
              onClick={() => handleDayClick(day)}
              onDoubleClick={() => {
                if (!isBeforeToday) {
                  handleDayDoubleClick(day);
                }
              }}
            >
              <span
                className={`date ${isSunday ? "calendar_date_sunday" : ""}`}
              >
                {day.date.getDate()}
              </span>
              <div className="calendar_app">
                <div className="appointment_body_1">
                  <div className="appointment_data_1">
                    <span
                      className={`appointment_count_1 ${changedClassName} ${
                        day.Available === "Available"
                          ? "appointment_count_1_available"
                          : day.Available === "Not Available"
                          ? "appointment_count_1_not_avialable"
                          : day.Available === "Leave"
                          ? "appointment_count_1_leave"
                          : ""
                      }`}
                    >
                      {day.Available || "N/A"}
                    </span>
                    {/* {day.Changed ? (
                      <span>
                        <FontAwesomeIcon icon={faHeart} />
                      </span>
                    ) : (
                      ""
                    )} */}
                  </div>
                  {/* <div className="appointment_data_1">
                    {day.Leave === "Leave" && (
                      <>
                        <span className="appointment_count_1_leave">
                          {day.Leave || "N/A"}
                        </span>
                      </>
                    )}
                  </div> */}
                  <div className="appointment_data_1">
                    {day.Available === "Leave" ? (
                      <>
                        <div
                          title="Leave Remarks"
                          className="appointment_data_1_Leave"
                        >
                          <span>Leave Remarks </span>
                          <span> :</span>
                        </div>
                        <span
                          title={day.Leave}
                          className="appointment_count_1_leave_rem"
                        >
                          {day.Leave || "N/A"}
                        </span>
                      </>
                    ) : (
                      <>
                        <div>
                          <span>OPD Timing </span>
                          <span> :</span>
                        </div>
                        <span className="appointment_count_1">
                          {day.OPDTiming || "N/A"}
                        </span>
                      </>
                    )}
                  </div>
                  {/* <div className="appointment_data_1">
                    <div>
                      <span>Remarks </span>
                      <span> :</span>
                    </div>
                    <span className="appointment_count_1">
                      {day.appointments.cancel || 0}
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </td>
        );
      } else {
        cells.push(<td key={index} className="cal_flex empty-cell"></td>);
      }
    });

    rows.push(cells);

    return (
      <>
        <div className="calender_table_overall">
          <div className="calender_table">
            <div className="cal_mon_1">
              <button onClick={handlePreviousMonth}>
                <KeyboardDoubleArrowLeftIcon />
              </button>
              <h3>
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
              <button onClick={handleNextMonth}>
                <KeyboardDoubleArrowRightIcon />
              </button>
              <div className="calender_table_locations">
                <label htmlFor="names">
                  Select Location <span>:</span>
                </label>
                <select
                  className="calender_table_locations_select"
                  name="Doctor Location"
                  onChange={(e) => handleLocationChange(e)}
                  value={SelectedLocations}
                >
                  {Locations.map((p, indx) => (
                    <option value={p.locationId} key={indx}>
                      {p.locationName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="calender_month_sunday">Sun</th>
                  <th className="calender_table_head">Mon</th>
                  <th className="calender_table_head">Tue</th>
                  <th className="calender_table_head">Wed</th>
                  <th className="calender_table_head">Thu</th>
                  <th className="calender_table_head">Fri</th>
                  <th className="calender_table_head">Sat</th>
                </tr>
              </thead>
              <tbody className="calender_table_body">
                {rows
                  .filter((f, i) => f)
                  .map((row, index) => (
                    <tr key={index}>{row}</tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="calendar-container">
        {renderCalendar()}

        {showModal && (
          <div className="modal-container" onClick={handleCloseModal}>
            <div className="App_Cal_modal" onClick={(e) => e.stopPropagation()}>
              {DoctorDayData?.schedule?.length > 0 ? (
                <>
                  <ul>
                    {DoctorDayData.schedule.map((scheduleItem, index) => (
                      <li key={index}>
                        <span>
                          <strong>Day: </strong>
                          {scheduleItem?.days}
                        </span>
                        <br />
                        <span>
                          <strong>Shift:</strong>
                          {scheduleItem?.shift}
                        </span>
                        <br />
                        {scheduleItem?.shift === "Single" ? (
                          <>
                            <span>
                              <strong>OPD Timing: </strong>
                              {scheduleItem?.starting_time} -
                              {scheduleItem?.ending_time}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>
                              <strong>Forenoon Timing: </strong>
                              {scheduleItem?.starting_time_f} -
                              {scheduleItem?.ending_time_f}
                            </span>
                            <br />
                            <span>
                              <strong>Afternoon Timing: </strong>
                              {scheduleItem?.starting_time_a} -
                              {scheduleItem?.ending_time_a}
                            </span>
                            <br />
                          </>
                        )}
                        <br />
                        <span>
                          <strong>Total Working Hours: </strong>
                          {scheduleItem.shift === "Single"
                            ? scheduleItem.total_working_hours_s
                            : scheduleItem.total_working_hours}
                        </span>
                        <br />
                      </li>
                    ))}
                  </ul>
                  <button onClick={handleCloseModal} className="booked_app_btn">
                    <HighlightOffIcon />
                  </button>
                </>
              ) : (
                <div
                  style={{
                    height: "100%",
                    color: "var(--ProjectColor)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  No Data
                </div>
              )}
            </div>
          </div>
        )}
        {showModalEdit && (
          <>
            <div className="modal-container" onClick={handleCloseModal}>
              <div
                className="Doc_Cal_modal"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>
                  Day:
                  {SelectedDay.toLocaleString("en-US", { weekday: "long" }) ||
                    "Invalid Day"}
                </h3>
                <div className="Doc_Cal_modal_radio">
                  <label
                    htmlFor={`${DoctorDayDataEdit.RadioOption}_radio_shift`}
                  >
                    <input
                      type="radio"
                      id={`${DoctorDayDataEdit.RadioOption}_radio_shift`}
                      name={DoctorDayDataEdit.RadioOption}
                      value="Shift"
                      onChange={(e) =>
                        setDoctorDayDataEdit((prev) => ({
                          ...prev,
                          RadioOption: "Shift",
                        }))
                      }
                      checked={DoctorDayDataEdit.RadioOption === "Shift"}
                    />
                    Shift
                  </label>
                  <label
                    htmlFor={`${DoctorDayDataEdit.RadioOption}_radio_leave`}
                  >
                    <input
                      type="radio"
                      id={`${DoctorDayDataEdit.RadioOption}_radio_leave`}
                      name={DoctorDayDataEdit.RadioOption}
                      value="Leave"
                      onChange={(e) =>
                        setDoctorDayDataEdit((prev) => ({
                          ...prev,
                          RadioOption: "Leave",
                        }))
                      }
                      checked={DoctorDayDataEdit.RadioOption === "Leave"}
                    />
                    Leave
                  </label>
                </div>
                {DoctorDayDataEdit.RadioOption === "Shift" && (
                  <>
                    <div className="Doc_Cal_modal_shift">
                      <label>
                        Select Shift<span>:</span>
                      </label>
                      <select
                        name="Shift"
                        value={DoctorDayDataEdit.Shift}
                        onChange={handleShiftChange}
                      >
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                      </select>
                    </div>

                    <div className="Doc_Cal_modal_shift_time">
                      <label>
                        Starting Time<span>:</span>
                      </label>
                      {DoctorDayDataEdit.Shift === "Double" ? (
                        <>
                          <label className="Schedule_table_label">
                            <span>FN:</span>
                            <input
                              type="time"
                              name="Starting_time_F"
                              value={DoctorDayDataEdit.Starting_time_F}
                              onChange={(e) =>
                                handleTimeChange(e, "Starting_time_F")
                              }
                            />
                          </label>
                          <label className="Schedule_table_label">
                            <span>AN:</span>
                            <input
                              type="time"
                              name="Starting_time_A"
                              value={DoctorDayDataEdit.Starting_time_A}
                              onChange={(e) =>
                                handleTimeChange(e, "Starting_time_A")
                              }
                            />
                          </label>
                        </>
                      ) : (
                        <input
                          type="time"
                          name="Starting_time"
                          value={DoctorDayDataEdit.Starting_time}
                          onChange={(e) => handleTimeChange(e, "Starting_time")}
                        />
                      )}
                    </div>

                    <div className="Doc_Cal_modal_shift_time">
                      <label>
                        Ending Time<span>:</span>
                      </label>
                      {DoctorDayDataEdit.Shift === "Double" ? (
                        <>
                          <label className="Schedule_table_label">
                            <span>FN:</span>
                            <input
                              type="time"
                              name="Ending_time_F"
                              value={DoctorDayDataEdit.Ending_time_F}
                              onChange={(e) =>
                                handleTimeChange(e, "Ending_time_F")
                              }
                            />
                          </label>
                          <label className="Schedule_table_label">
                            <span>AN:</span>
                            <input
                              type="time"
                              name="Ending_time_A"
                              value={DoctorDayDataEdit.Ending_time_A}
                              onChange={(e) =>
                                handleTimeChange(e, "Ending_time_A")
                              }
                            />
                          </label>
                        </>
                      ) : (
                        <input
                          type="time"
                          name="Ending_time"
                          value={DoctorDayDataEdit.Ending_time}
                          onChange={(e) => handleTimeChange(e, "Ending_time")}
                        />
                      )}
                    </div>

                    <div className="Doc_Cal_modal_shift_time">
                      <label>
                        Working Hours <span>:</span>
                      </label>
                      {DoctorDayDataEdit.Shift === "Double" ? (
                        <>
                          <label className="Schedule_table_label">
                            <span> FN:</span>
                            <input
                              type="text"
                              name="Working_hours_f"
                              value={
                                DoctorDayDataEdit.Working_hours_f || "0h 0m"
                              }
                              readOnly
                            />
                          </label>
                          <label className="Schedule_table_label">
                            <span> AN:</span>
                            <input
                              type="text"
                              name="Working_hours_a"
                              value={
                                DoctorDayDataEdit.Working_hours_a || "0h 0m"
                              }
                              readOnly
                            />
                          </label>
                        </>
                      ) : (
                        <input
                          type="text"
                          readOnly
                          value={DoctorDayDataEdit.Working_hours_s || "0h 0m"}
                        />
                      )}
                    </div>
                    <div className="Doc_Cal_modal_shift_time">
                      <label>
                        Total Working Hours<span>:</span>
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={
                          DoctorDayDataEdit.Shift === "Double"
                            ? DoctorDayDataEdit.Total_working_hours || "0h 0m"
                            : DoctorDayDataEdit.Total_working_hours_s || "0h 0m"
                        }
                      />
                    </div>
                  </>
                )}
                {DoctorDayDataEdit.RadioOption === "Leave" && (
                  <>
                    <label>
                      Remarks <span>:</span>
                    </label>
                    <textarea
                      name="LeaveRemarks"
                      value={DoctorDayDataEdit.LeaveRemarks}
                      onChange={handleinpchangeLeaveRemarks}
                    />
                  </>
                )}
                <div className="Main_container_Btn button">
                  <button onClick={handleSubmit}>Save</button>
                </div>
              </div>
            </div>
            <button onClick={handleCloseModal} className="booked_app_btn">
              <HighlightOffIcon />
            </button>
          </>
        )}
        {showModalEditNA && (
          <>
            <div className="modal-container" onClick={handleCloseModal}>
              <div
                className="Doc_Cal_modal"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>
                  Day:
                  {SelectedDay.toLocaleString("en-US", { weekday: "long" }) ||
                    "Invalid Day"}
                </h3>
                <div className="Doc_Cal_modal_shift">
                  <label>
                    Select Shift<span>:</span>
                  </label>
                  <select
                    name="Shift"
                    value={DoctorDayDataEdit.Shift}
                    onChange={handleShiftChange}
                  >
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                  </select>
                </div>

                <div className="Doc_Cal_modal_shift_time">
                  <label>
                    Starting Time<span>:</span>
                  </label>
                  {DoctorDayDataEdit.Shift === "Double" ? (
                    <>
                      <label className="Schedule_table_label">
                        <span>FN:</span>
                        <input
                          type="time"
                          name="Starting_time_F"
                          value={DoctorDayDataEdit.Starting_time_F}
                          onChange={(e) =>
                            handleTimeChange(e, "Starting_time_F")
                          }
                        />
                      </label>
                      <label className="Schedule_table_label">
                        <span>AN:</span>
                        <input
                          type="time"
                          name="Starting_time_A"
                          value={DoctorDayDataEdit.Starting_time_A}
                          onChange={(e) =>
                            handleTimeChange(e, "Starting_time_A")
                          }
                        />
                      </label>
                    </>
                  ) : (
                    <input
                      type="time"
                      name="Starting_time"
                      value={DoctorDayDataEdit.Starting_time}
                      onChange={(e) => handleTimeChange(e, "Starting_time")}
                    />
                  )}
                </div>

                <div className="Doc_Cal_modal_shift_time">
                  <label>
                    Ending Time<span>:</span>
                  </label>
                  {DoctorDayDataEdit.Shift === "Double" ? (
                    <>
                      <label className="Schedule_table_label">
                        <span>FN:</span>
                        <input
                          type="time"
                          name="Ending_time_F"
                          value={DoctorDayDataEdit.Ending_time_F}
                          onChange={(e) => handleTimeChange(e, "Ending_time_F")}
                        />
                      </label>
                      <label className="Schedule_table_label">
                        <span>AN:</span>
                        <input
                          type="time"
                          name="Ending_time_A"
                          value={DoctorDayDataEdit.Ending_time_A}
                          onChange={(e) => handleTimeChange(e, "Ending_time_A")}
                        />
                      </label>
                    </>
                  ) : (
                    <input
                      type="time"
                      name="Ending_time"
                      value={DoctorDayDataEdit.Ending_time}
                      onChange={(e) => handleTimeChange(e, "Ending_time")}
                    />
                  )}
                </div>

                <div className="Doc_Cal_modal_shift_time">
                  <label>
                    Working Hours <span>:</span>
                  </label>
                  {DoctorDayDataEdit.Shift === "Double" ? (
                    <>
                      <label className="Schedule_table_label">
                        <span> FN:</span>
                        <input
                          type="text"
                          name="Working_hours_f"
                          value={DoctorDayDataEdit.Working_hours_f || "0h 0m"}
                          readOnly
                        />
                      </label>
                      <label className="Schedule_table_label">
                        <span> AN:</span>
                        <input
                          type="text"
                          name="Working_hours_a"
                          value={DoctorDayDataEdit.Working_hours_a || "0h 0m"}
                          readOnly
                        />
                      </label>
                    </>
                  ) : (
                    <input
                      type="text"
                      readOnly
                      value={DoctorDayDataEdit.Working_hours_s || "0h 0m"}
                    />
                  )}
                </div>
                <div className="Doc_Cal_modal_shift_time">
                  <label>
                    Total Working Hours<span>:</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={
                      DoctorDayDataEdit.Shift === "Double"
                        ? DoctorDayDataEdit.Total_working_hours || "0h 0m"
                        : DoctorDayDataEdit.Total_working_hours_s || "0h 0m"
                    }
                  />
                </div>
                <div className="Main_container_Btn button">
                  <button onClick={handleSubmit}>Save</button>
                </div>
              </div>
            </div>
            <button onClick={handleCloseModal} className="booked_app_btn">
              <HighlightOffIcon />
            </button>
          </>
        )}

        {showModalEditMultiple && (
          <>
            <div className="modal-container" onClick={handleCloseModal}>
              <div
                className="Doc_Cal_modal"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>
                  Dates:
                  <span>
                    {selectedAvailableCells.length > 0
                      ? displayAvailDateRange
                      : selectedNotAvailableCells.length > 0
                      ? displayNotAvailDateRange
                      : ""}
                  </span>
                </h3>
                {selectedCondition === "Available" ? (
                  <>
                    <div className="Doc_Cal_modal_radio">
                      <label
                        htmlFor={`${DoctorDayDataEdit.RadioOption}_radio_shift`}
                      >
                        <input
                          type="radio"
                          id={`${DoctorDayDataEdit.RadioOption}_radio_shift`}
                          name={DoctorDayDataEdit.RadioOption}
                          value="Shift"
                          onChange={(e) =>
                            setDoctorDayDataEdit((prev) => ({
                              ...prev,
                              RadioOption: "Shift",
                            }))
                          }
                          checked={DoctorDayDataEdit.RadioOption === "Shift"}
                        />
                        Shift
                      </label>
                      <label
                        htmlFor={`${DoctorDayDataEdit.RadioOption}_radio_leave`}
                      >
                        <input
                          type="radio"
                          id={`${DoctorDayDataEdit.RadioOption}_radio_leave`}
                          name={DoctorDayDataEdit.RadioOption}
                          value="Leave"
                          onChange={(e) =>
                            setDoctorDayDataEdit((prev) => ({
                              ...prev,
                              RadioOption: "Leave",
                            }))
                          }
                          checked={DoctorDayDataEdit.RadioOption === "Leave"}
                        />
                        Leave
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="Doc_Cal_modal_radio">
                      <label
                        htmlFor={`${DoctorDayDataEdit.RadioOption}_radio_shift`}
                      >
                        <input
                          type="radio"
                          id={`${DoctorDayDataEdit.RadioOption}_radio_shift`}
                          name={DoctorDayDataEdit.RadioOption}
                          value="Shift"
                          onChange={(e) =>
                            setDoctorDayDataEdit((prev) => ({
                              ...prev,
                              RadioOption: "Shift",
                            }))
                          }
                          checked={DoctorDayDataEdit.RadioOption === "Shift"}
                        />
                        Shift
                      </label>
                    </div>
                  </>
                )}
                {DoctorDayDataEdit.RadioOption === "Shift" && (
                  <>
                    <div className="Doc_Cal_modal_shift">
                      <label>
                        Select Shift<span>:</span>
                      </label>
                      <select
                        name="Shift"
                        value={DoctorDayDataEdit.Shift}
                        onChange={handleShiftChange}
                      >
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                      </select>
                    </div>

                    <div className="Doc_Cal_modal_shift_time">
                      <label>
                        Starting Time<span>:</span>
                      </label>
                      {DoctorDayDataEdit.Shift === "Double" ? (
                        <>
                          <label className="Schedule_table_label">
                            <span>FN:</span>
                            <input
                              type="time"
                              name="Starting_time_F"
                              value={DoctorDayDataEdit.Starting_time_F}
                              onChange={(e) =>
                                handleTimeChange(e, "Starting_time_F")
                              }
                            />
                          </label>
                          <label className="Schedule_table_label">
                            <span>AN:</span>
                            <input
                              type="time"
                              name="Starting_time_A"
                              value={DoctorDayDataEdit.Starting_time_A}
                              onChange={(e) =>
                                handleTimeChange(e, "Starting_time_A")
                              }
                            />
                          </label>
                        </>
                      ) : (
                        <input
                          type="time"
                          name="Starting_time"
                          value={DoctorDayDataEdit.Starting_time}
                          onChange={(e) => handleTimeChange(e, "Starting_time")}
                        />
                      )}
                    </div>

                    <div className="Doc_Cal_modal_shift_time">
                      <label>
                        Ending Time<span>:</span>
                      </label>
                      {DoctorDayDataEdit.Shift === "Double" ? (
                        <>
                          <label className="Schedule_table_label">
                            <span>FN:</span>
                            <input
                              type="time"
                              name="Ending_time_F"
                              value={DoctorDayDataEdit.Ending_time_F}
                              onChange={(e) =>
                                handleTimeChange(e, "Ending_time_F")
                              }
                            />
                          </label>
                          <label className="Schedule_table_label">
                            <span>AN:</span>
                            <input
                              type="time"
                              name="Ending_time_A"
                              value={DoctorDayDataEdit.Ending_time_A}
                              onChange={(e) =>
                                handleTimeChange(e, "Ending_time_A")
                              }
                            />
                          </label>
                        </>
                      ) : (
                        <input
                          type="time"
                          name="Ending_time"
                          value={DoctorDayDataEdit.Ending_time}
                          onChange={(e) => handleTimeChange(e, "Ending_time")}
                        />
                      )}
                    </div>

                    <div className="Doc_Cal_modal_shift_time">
                      <label>
                        Working Hours <span>:</span>
                      </label>
                      {DoctorDayDataEdit.Shift === "Double" ? (
                        <>
                          <label className="Schedule_table_label">
                            <span> FN:</span>
                            <input
                              type="text"
                              name="Working_hours_f"
                              value={
                                DoctorDayDataEdit.Working_hours_f || "0h 0m"
                              }
                              readOnly
                            />
                          </label>
                          <label className="Schedule_table_label">
                            <span> AN:</span>
                            <input
                              type="text"
                              name="Working_hours_a"
                              value={
                                DoctorDayDataEdit.Working_hours_a || "0h 0m"
                              }
                              readOnly
                            />
                          </label>
                        </>
                      ) : (
                        <input
                          type="text"
                          readOnly
                          value={DoctorDayDataEdit.Working_hours_s || "0h 0m"}
                        />
                      )}
                    </div>
                    <div className="Doc_Cal_modal_shift_time">
                      <label>
                        Total Working Hours<span>:</span>
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={
                          DoctorDayDataEdit.Shift === "Double"
                            ? DoctorDayDataEdit.Total_working_hours || "0h 0m"
                            : DoctorDayDataEdit.Total_working_hours_s || "0h 0m"
                        }
                      />
                    </div>
                  </>
                )}
                {DoctorDayDataEdit.RadioOption === "Leave" && (
                  <>
                    <label>
                      Remarks <span>:</span>
                    </label>
                    <textarea
                      name="LeaveRemarks"
                      value={DoctorDayDataEdit.LeaveRemarks}
                      onChange={handleinpchangeLeaveRemarks}
                    />
                  </>
                )}
                <div className="Main_container_Btn button">
                  <button onClick={handleSubmitMultiple}>Save</button>
                </div>
              </div>
            </div>
            <button onClick={handleCloseModal} className="booked_app_btn">
              <HighlightOffIcon />
            </button>
          </>
        )}

        {showModalCondition && (
          <>
            <div className="modal-container" onClick={handleCloseModal}>
              <div
                className="Doc_Cal_modal_condition"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  Do you want to Change the Date or Cancel the Appointments on{" "}
                  {SelectedDate}?
                </div>
                <div className="calendar_app">
                  <div className="appointment_body_1">
                    <div className="appointment_data_1">
                      <span>Request Appointments </span>
                      <span> :</span>
                    </div>
                    {Array.isArray(AppointmentRequestData)
                      && AppointmentRequestData.filter(
                          (f) => f.RequestDate === SelectedDate
                        ).map((app, ind) => (
                          <span className="appointment_count_1" key={ind}>
                            {app.Title}.{app.FirstName} {app.MiddleName}
                            <br />
                          </span>
                        ))}
                  </div>
                </div>
                <div className="Main_container_Btn button">
                  <button onClick={handleChangeApp}>Change</button>
                  <button onClick={handleCancelApp}>Cancel</button>
                </div>
              </div>
            </div>
            <button onClick={handleCloseModal} className="booked_app_btn">
              <HighlightOffIcon />
            </button>
          </>
        )}
        {showModalConditionMul && (
          <>
            <div className="modal-container" onClick={handleCloseModal}>
              <div
                className="Doc_Cal_modal_condition"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  Do you want to Change the Date or Cancel the Appointments on
                  {` ${formattedSelectedAvailableCells}`}?
                </div>
                <div className="calendar_app">
                  <div className="appointment_body_1">
                    <div className="appointment_data_1">
                      <span>Request Appointments</span>
                      <span> :</span>
                    </div>
                    {datesWithAppointments.map((date, ind) => (
                      <span className="appointment_count_1" key={ind}>
                        {date}
                        <br />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="Main_container_Btn button">
                  <button onClick={handleChangeApp}>Change</button>
                  <button onClick={handleCancelApp}>Cancel</button>
                </div>
              </div>
            </div>
            <button onClick={handleCloseModal} className="booked_app_btn">
              <HighlightOffIcon />
            </button>
          </>
        )}

        {ShowAppModal && (
          <>
            <div className="modal-container" onClick={handleCloseModal}>
              <div
                className="Doc_Cal_modal"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>
                  Day:
                  {SelectedDay.toLocaleString("en-US", { weekday: "long" }) ||
                    "Invalid Day"}
                </h3>
                <div className="RegisForm_1">
                  <label htmlFor="RequestDate">
                    Request Date <span>: </span>
                  </label>
                  <input
                    name="RequestDate"
                    id="RequestDate"
                    value={AppointmentRequestChange.RequestDate}
                    type="date"
                    onChange={HandleAppointmentReq}
                  />
                </div>

                <div className="Main_container_Btn button">
                  <button onClick={handleSubmitApp}>Save</button>
                </div>
              </div>
            </div>
            <button onClick={handleCloseModal} className="booked_app_btn">
              <HighlightOffIcon />
            </button>
          </>
        )}
        {ShowAppMulModal && (
          <>
            <div className="modal-container" onClick={handleCloseModal}>
              <div
                className="Doc_Cal_modal"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>
                  Day Mul:
                  {`${formattedSelectedAvailableCells}  ` || "Invalid Day"}
                </h3>
                <div className="RegisForm_1">
                  <label htmlFor="RequestDate">
                    Request Date <span>: </span>
                  </label>
                  <input
                    name="RequestDate"
                    id="RequestDate"
                    value={AppointmentRequestChange.RequestDate}
                    type="date"
                    onChange={HandleAppointmentReq}
                  />
                </div>

                <div className="Main_container_Btn button">
                  <button onClick={handleSubmitMulApp}>Save</button>
                </div>
              </div>
            </div>
            <button onClick={handleCloseModal} className="booked_app_btn">
              <HighlightOffIcon />
            </button>
          </>
        )}
      </div>
      <ToastAlert Message={toast.message} Type={toast.type} />
    </>
  );
};

export default Months;
