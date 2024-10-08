import React, { useCallback, useEffect, useState } from "react";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import { useDispatch, useSelector } from "react-redux";
import {
  differenceInYears,
  format,
  subYears,
  differenceInMinutes,
  parse,
} from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import profile from "../../Assets/profileimg.jpeg";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ModelContainer from "../../OtherComponent/ModelContainer/ModelContainer";
import "./DoctorMastertable.css";
import "../../App.css";

const DoctorMaster = () => {
  const dispatchvalue = useDispatch();
  const navigate = useNavigate();
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const UserData = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const DoctorListId = useSelector((state) => state.userRecord?.DoctorListId);
  const [loading, setLoading] = useState(false);
  console.log("UserDaaataaaa", UserData);

  const [DoctorPersonalForm, setDoctorPersonalForm] = useState({
    DoctorID: "",
    Tittle: "Dr",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Gender: "",
    ShortName: "",
    DOB: "",
    Age: "",
    MaritalStatus: "",
    AnniversaryDate: "",
    SpouseName: "",
    Nationality: "",
    Email: "",
    ContactNumber: "",
    AlternateNumber: "",
    EmergencyNo1: "",
    EmergencyNo2: "",
    CurrentAddress: "",
    PermanentAddress: "",
    LanguagesSpoken: "",
    PreferredModeOfCommunication: "",
    EmergencyAvailablity: "No",
  });

  const [DoctorProfessForm, setDoctorProfessForm] = useState({
    Qualification: "",
    VisitType: "",
    Department: "",
    DepartmentId: "",
    Designation: "",
    Category: "",
    Specialization: "",
    MCINumber: "",
    StateRegistrationNumber: "",
    LicenseExpiryDate: "",
    YearsofExperience: "",
    DateOfJoining: "",
  });
  const [DoctorInsuranceForm, setDoctorInsuranceForm] = useState({
    MalpracticeInsuranceProviderName: "",
    PolicyNumber: "",
    CoverageAmount: "",
    InsuranceRenewalDate: "",
    ExpiryDate: "",
    InsuranceDetailsFile: null,
  });

  const [DoctorDocumentsForm, setDoctorDocumentsForm] = useState({
    photo: null,
    Signature: null,
    AgreementFile: null,
    AdhaarCard: null,
    PanCard: null,
  });
  const [DoctorBankForm, setDoctorBankForm] = useState({
    AccountNumber: "",
    BankName: "",
    BranchName: "",
    IFSCCode: "",
    PancardNumber: "",
  });
  const [DoctorContractForm, setDoctorContractForm] = useState({
    PreviousEmployeementHistory: "",
    Comission: "",
    ContractStartDate: "",
    ContractEndDate: "",
    ContractRenewalTerms: "",
    Remarks: "",
  });
  const [DoctorRouteForm, setDoctorRouteForm] = useState({
    Location: "",
    RouteNo: "",
    RouteName: "",
    TahsilName: "",
    VillageName: "",
  });

  const [DoctorScheduleForm, setDoctorScheduleForm] = useState({
    Duration: "",
  });

  const [errors, setErrors] = useState({});
  const [DoctorRegisType, setDoctorRegisType] = useState("InHouse");
  const [DepartmentData, setDepartmentData] = useState([]);
  const [DesignationData, setDesignationData] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const [SpecializationData, setSpecializationData] = useState([]);
  const [RouteData, setRouteData] = useState([]);
  const [DoctorScheduleRows, setDoctorScheduleRows] = useState([]);
  const [Locations, setLocations] = useState([]);
  const [LocationData, setLocationData] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState(false);
  const [selectDepModal, setselectDepModal] = useState({
    SelectDepartment: "",
  });
  const [Departments, setDepartments] = useState([]);
  const [fetchedData, setFetchedData] = useState([]); // Store the fetched data separately
  console.log("Depppppppp", Departments);

  const clearalldata = useCallback(() => {
    if (Object.keys(DoctorListId).length === 0) {
      setDoctorPersonalForm({
        DoctorID: "",
        Tittle: "Dr",
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Gender: "",
        ShortName: "",
        DOB: "",
        Age: "",
        MaritalStatus: "",
        AnniversaryDate: "",
        SpouseName: "",
        Nationality: "",
        Email: "",
        ContactNumber: "",
        AlternateNumber: "",
        EmergencyNo1: "",
        EmergencyNo2: "",
        CurrentAddress: "",
        PermanentAddress: "",
        LanguagesSpoken: "",
        PreferredModeOfCommunication: "",
        EmergencyAvailablity: "No",
      });

      setDoctorProfessForm({
        Qualification: "",
        VisitType: "",
        Department: "",
        Designation: "",
        DepartmentId: "",
        Category: "",
        Specialization: "",
        MCINumber: "",
        StateRegistrationNumber: "",
        LicenseExpiryDate: "",
        YearsofExperience: "",
        DateOfJoining: "",
      });

      setDoctorInsuranceForm({
        MalpracticeInsuranceProviderName: "",
        PolicyNumber: "",
        CoverageAmount: "",
        InsuranceRenewalDate: "",
        ExpiryDate: "",
        InsuranceDetailsFile: null,
      });

      setDoctorDocumentsForm({
        photo: profile,
        Signature: null,
        AgreementFile: null,
        AdhaarCard: null,
        PanCard: null,
      });

      setDoctorBankForm({
        AccountNumber: "",
        BankName: "",
        BranchName: "",
        IFSCCode: "",
        PancardNumber: "",
      });

      setDoctorContractForm({
        PreviousEmployeementHistory: "",
        Comission: "",
        ContractStartDate: "",
        ContractEndDate: "",
        ContractRenewalTerms: "",
        Remarks: "",
      });

      setDoctorRouteForm({
        Location: "",
        RouteNo: "",
        RouteName: "",
        TahsilName: "",
        VillageName: "",
      });
      setDoctorScheduleForm({
        Duration: "",
      });
      setselectDepModal({
        SelectDepartment: "",
      });
      setErrors({});
    }
  }, [DoctorListId]);

  // Clear the state when the page renders and DoctorRegisType changes
  useEffect(() => {
    clearalldata();
  }, [clearalldata, DoctorRegisType]);

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

  console.log("Location dataaaa", LocationData);

  useEffect(() => {
    axios
      .get(`${UrlLink}Masters/Location_Detials_link`)
      .then((res) => {
        const ress = res.data;
        setLocations(ress);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [UrlLink]);
  console.log("Locatinnnnnnn", Locations);

  useEffect(() => {
    if (Object.keys(DoctorListId).length !== 0) {
      axios
        .get(
          `${UrlLink}Masters/Doctor_Detials_link?DoctorID=${DoctorListId?.DoctorId}`
        )
        .then((res) => {
          const ress = res.data;
          console.log("resssssssssssssss", ress);

          // Ensure all parts of the response are defined before using them
          const { Duration = "", ...DoctorPersonalForm } =
            ress.DoctorPersonalForm || {};
          const DoctorProfessionalForm = ress.DoctorProfessionalForm || {};
          const {
            DoctorRegisType = "",
            Department_Id,
            ...restDoctorProfessionalForm
          } = DoctorProfessionalForm;
          const DoctorInsuranceForm = ress.DoctorInsuranceForm || {};
          const DoctorDocumentsForm = ress.DoctorDocumentsForm || {};
          const DoctorBankForm = ress.DoctorBankForm || {};
          const DoctorContractForm = ress.DoctorContractForm || {};
          const DoctorRouteForm = ress.DoctorRouteForm || {};
          const { Schedule, locations } = ress.DoctorScheduleForm || {};

          console.log("Durrrrrrrrr", Duration, Schedule, locations);
          console.log("Birrrrrrrr", DoctorProfessionalForm);
          // Populate departments
          const department =
            (ress.DoctorProfessionalForm?.Department).split(",") || [];
          const departmentId = Department_Id.split(",");
          console.log("Deeeeeeeee", department);
          console.log("Deeeeeeeee", departmentId);
          // Map each department ID to its corresponding department name
          const departmentData = departmentId.map((id, index) => ({
            id: id.trim(), // Trim to remove any leading/trailing whitespace
            SelectedDepartment: department[index]?.trim(), // Trim department name and ensure it's mapped correctly
          }));

          // Log the mapped department data for verification
          console.log("Mapped Department Data:", departmentData);

          // Set the mapped department data to the state
          setDepartments(departmentData);
          // setDepartments(
          //   departments.map((dep) => ({
          //     SelectedDepartment: dep.DepartmentName,
          //   }))
          // );

          setDoctorRegisType(DoctorRegisType);
          setDoctorPersonalForm((prev) => ({ ...prev, ...DoctorPersonalForm }));
          setDoctorProfessForm((prev) => ({
            ...prev,
            DepartmentId: Department_Id,
            ...restDoctorProfessionalForm,
          }));
          setDoctorInsuranceForm((prev) => ({
            ...prev,
            ...DoctorInsuranceForm,
          }));
          setDoctorDocumentsForm((prev) => ({
            ...prev,
            ...DoctorDocumentsForm,
          }));
          setDoctorBankForm((prev) => ({ ...prev, ...DoctorBankForm }));
          setDoctorContractForm((prev) => ({ ...prev, ...DoctorContractForm }));
          setDoctorRouteForm((prev) => ({ ...prev, ...DoctorRouteForm }));

          // Format schedule rows based on location and days

          setDoctorScheduleForm((prevState) => ({
            ...prevState,
            Duration: Duration,
          }));
          setLocationData([...locations]);
          setDoctorScheduleRows([...Schedule].filter((row)=> row.Status === "Active"));
          setFetchedData([...Schedule]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const Days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      // const Locationname = (Locations.id === UserData?.location) ? Locations.locationName : 'null';
      const rows = [UserData?.location].flatMap((locationId, locationIndex) => {
        const locationMatch = Locations.find((loc) => loc.id === locationId);
        return Days.map((day, indx) => ({
          id: indx + locationIndex * 7, // Ensure unique ID for each row
          locationId: locationId,
          locationName: locationMatch
            ? locationMatch.locationName
            : "Unknown Location",
          days: day,
          working: "yes",
          shift: "Single",
          starting_time: "",
          ending_time: "",
          starting_time_f: "",
          ending_time_f: "",
          starting_time_a: "",
          ending_time_a: "",
          working_hours_f: "0h 0m",
          working_hours_a: "0h 0m",
          working_hours_s: "0h 0m",
          total_working_hours: "0h 0m",
          total_working_hours_s: "0h 0m",
        }));
      });
      console.log("Rowwwwwww", rows);

      setDoctorScheduleRows(rows);
    }
  }, [
    UrlLink,
    DoctorListId?.DoctorId,
    DoctorListId,
    UserData?.location,
    Locations,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          departmentResponse,
          designationResponse,
          categoryResponse,
          specializationResponse,
          RoutedataResponse,
        ] = await Promise.all([
          axios.get(`${UrlLink}Masters/Department_Detials_link`),
          axios.get(`${UrlLink}Masters/Designation_Detials_link`),
          axios.get(`${UrlLink}Masters/Category_Detials_link`),
          axios.get(`${UrlLink}Masters/Speciality_Detials_link`),
          axios.get(`${UrlLink}Masters/Route_Master_Detials_link`),
        ]);

        setDepartmentData(departmentResponse.data);
        setDesignationData(designationResponse.data);
        setCategoryData(categoryResponse.data);
        setSpecializationData(specializationResponse.data);
        setRouteData(RoutedataResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [UrlLink]);

  const formatLabel = (label) => {
    if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
      return label
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (str) => str.toUpperCase());
    } else {
      return label;
    }
  };

  const handleinpchangePersonalForm = (e) => {
    const { name, value, pattern } = e.target;
    const formattedValue = [
      "FirstName",
      "MiddleName",
      "LastName",
      "ShortName",
      "SpouseName",
      "LanguagesSpoken",
    ].includes(name)
      ? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
      : value;
    // let formattedValue = ["CurrentAddress", "PermanentAddress"].includes(name)
    //   ? value
    //   : value?.trim();
    if (
      [
        "ContactNumber",
        "AlternateNumber",
        "EmergencyNo1",
        "EmergencyNo2",
      ].includes(name)
    ) {
      if (formattedValue.length <= 10) {
        setDoctorPersonalForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else if (name === "Email") {
      setDoctorPersonalForm((prev) => ({
        ...prev,
        [name]: formattedValue.toLowerCase(),
      }));
    } else if (name === "DOB") {
      let newDate = new Date();

      let oldDate = new Date(value);
      let age = differenceInYears(newDate, oldDate);
      setDoctorPersonalForm((prev) => ({
        ...prev,
        [name]: value,
        Age: age,
      }));
    } else if (
      ["CurrentAddress", "PermanentAddress", "Age", "ShortName"].includes(name)
    ) {
      if (name === "Age") {
        if (!isNaN(formattedValue) && formattedValue.length <= 3) {
          let dob = subYears(new Date(), formattedValue);
          setDoctorPersonalForm((prev) => ({
            ...prev,
            [name]: formattedValue,
            DOB: formattedValue ? format(dob, "yyyy-MM-dd") : "",
          }));
        }
      } else {
        if (formattedValue.length <= 500) {
          setDoctorPersonalForm((prev) => ({
            ...prev,
            [name]: formattedValue,
          }));
        }
      }
    } else if (name === "MaritalStatus") {
      setDoctorPersonalForm((prev) => ({
        ...prev,
        [name]: formattedValue,
        AnniversaryDate: "",
      }));
    } else {
      setDoctorPersonalForm((prev) => ({
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
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleinpchangeProfessionalForm = (e) => {
    const { name, value, pattern } = e.target;
    const formattedValue = ["Qualification"].includes(name)
      ? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
      : value;
    if (name === "Department") {
      setDoctorProfessForm((prev) => ({
        ...prev,
        [name]: Departments.join(","),

        Designation: "",
        Category: "",
        Specialization: "",
      }));
    } else if (name === "Designation") {
      setDoctorProfessForm((prev) => ({
        ...prev,
        [name]: formattedValue?.trim(),
        Category: "",
        Specialization: "",
      }));
    } else if (name === "YearsofExperience") {
      if (!isNaN(formattedValue) && formattedValue.length <= 2) {
        setDoctorProfessForm((prev) => ({
          ...prev,
          [name]: formattedValue?.trim(),
        }));
      }
    } else {
      setDoctorProfessForm((prev) => ({
        ...prev,
        [name]: formattedValue?.trim(),
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
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  const HandleDepartmentSelect = () => {
    console.log("Icon clickedddd");

    setSelectDepartment(true);
  };

  const handleinpchangeDoctorInsuranceForm = (e) => {
    const { name, value, pattern, files } = e.target;
    const formattedValueval = ["MalpracticeInsuranceProviderName"].includes(
      name
    )
      ? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
      : value;
    if (name === "InsuranceDetailsFile") {
      if (files && files.length > 0) {
        let formattedValue = files[0];

        // Optional: Add validation for file type and size
        const allowedTypes = ["application/pdf", "image/jpeg", "image/png"]; // Example allowed types
        const maxSize = 5 * 1024 * 1024; // Example max size of 5MB

        if (
          !allowedTypes.includes(formattedValue.type) ||
          formattedValue.type === ""
        ) {
          // Dispatch a warning toast or handle file type validation
          const tdata = {
            message:
              "Invalid file type. Please upload a PDF, JPEG, or PNG file.",
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
              setDoctorInsuranceForm((prev) => ({
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
    } else {
      // Update form state
      setDoctorInsuranceForm((prev) => ({
        ...prev,
        [name]: formattedValueval,
      }));
    }

    // Validate field
    const validateField = (value, pattern) => {
      if (!value) {
        return "Required";
      }
      if (pattern && !new RegExp(pattern).test(value)) {
        return "Invalid";
      }
      return "Valid";
    };

    const error = validateField(formattedValueval, pattern);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleinpchangeDocumentsForm = (e) => {
    const { name, files } = e.target;

    // Ensure that files exist and are not empty
    if (files && files.length > 0) {
      let formattedValue = files[0];

      // Optional: Add validation for file type and size
      let allowedTypes =
        name === "photo"
          ? ["image/jpeg", "image/png"]
          : ["application/pdf", "image/jpeg", "image/png"]; // Example allowed types

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
            setDoctorDocumentsForm((prev) => ({
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

  const handleinpchangeBankForm = (e) => {
    const { name, value, pattern } = e.target;
    const formattedValue = ["BankName", "BranchName"].includes(name)
      ? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
      : value;
    if (["PancardNumber", "AccountNumber"].includes(name)) {
      let length =
        name === "AccountNumber" ? 18 : name === "IFSCCode" ? 11 : 10;
      if (formattedValue.length <= length) {
        setDoctorBankForm((prev) => ({
          ...prev,
          [name]: formattedValue?.trim(),
        }));
      }
    } else {
      setDoctorBankForm((prev) => ({
        ...prev,
        [name]: formattedValue?.trim(),
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
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  const SelectDataColumn = [
    {
      key: "id",
      name: "Department Id",
    },
    {
      key: "SelectedDepartment",
      name: "Selected Department",
    },
    {
      key: "Action",
      name: "Action",
      renderCell: (params) => {
        return (
          <>
            <Button
              className="cell_btn"
              onClick={() => handleDeleteDepartments(params.row)}
            >
              <DeleteIcon className="check_box_clrr_cancell" />
            </Button>
          </>
        );
      },
    },
  ];

  const handleinpchangeContractForm = (e) => {
    const { name, value, pattern } = e.target;
    const formattedValue = ["PreviousEmployeementHistory"].includes(name)
      ? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
      : value;

    if (name === "Comission") {
      let length = name === "Comission" ? 3 : 10;
      if (formattedValue.length <= length && formattedValue <= 100) {
        setDoctorContractForm((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));
      }
    } else {
      setDoctorContractForm((prev) => ({
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
      }
      return "Valid";
    };

    const error = validateField(value, pattern);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleinpchangeRouteForm = (e) => {
    const { name, value, pattern } = e.target;
    let formattedValue = value?.trim();
    if (name === "Location") {
      setDoctorRouteForm((prev) => ({
        ...prev,
        [name]: formattedValue,
        RouteNo: "",
        RouteName: "",
        TahsilName: "",
        VillageName: "",
      }));
    } else if (name === "RouteNo") {
      if (value) {
        const datass = RouteData.find(
          (p) =>
            p.LocationName === DoctorRouteForm.Location && p.RouteNo === value
        );
        if (datass) {
          setDoctorRouteForm((prev) => ({
            ...prev,
            [name]: formattedValue,
            RouteName: datass.RouteName,
            TahsilName: "",
            VillageName: "",
          }));
        } else {
          const tdata = {
            message: `The Route Id did not matched`,
            type: "warn",
          };

          dispatchvalue({ type: "toast", value: tdata });
          setDoctorRouteForm((prev) => ({
            ...prev,
            [name]: "",
            RouteName: "",
            TahsilName: "",
            VillageName: "",
          }));
        }
      } else {
        setDoctorRouteForm((prev) => ({
          ...prev,
          [name]: value,
          RouteName: "",
          TahsilName: "",
          VillageName: "",
        }));
      }
    } else if (name === "RouteName") {
      if (value) {
        const datass = RouteData.find(
          (p) =>
            p.LocationName === DoctorRouteForm.Location && p.RouteName === value
        );
        if (datass) {
          setDoctorRouteForm((prev) => ({
            ...prev,
            [name]: formattedValue,
            RouteNo: datass.RouteNo,
            TahsilName: "",
            VillageName: "",
          }));
        } else {
          const tdata = {
            message: `The Route Id did not matched`,
            type: "warn",
          };

          dispatchvalue({ type: "toast", value: tdata });
          setDoctorRouteForm((prev) => ({
            ...prev,
            [name]: "",
            RouteNo: "",
            TahsilName: "",
            VillageName: "",
          }));
        }
      } else {
        setDoctorRouteForm((prev) => ({
          ...prev,
          [name]: value,
          RouteNo: "",
          TahsilName: "",
          VillageName: "",
        }));
      }
    } else if (name === "TahsilName") {
      setDoctorRouteForm((prev) => ({
        ...prev,
        [name]: formattedValue,
        VillageName: "",
      }));
    } else {
      setDoctorRouteForm((prev) => ({
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
      }
      return "Valid";
    };

    const error = validateField(value, pattern);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleinpchangeDepartment = (e) => {
    const { name, value } = e.target;
    const formattedValue = value;
    setselectDepModal((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };
  // Save the selected department
  const handleDepartmentSave = () => {
    const selectedDepartment = DepartmentData.find(
      (dep) => dep.id === parseInt(selectDepModal.SelectDepartment)
    );

    if (selectedDepartment) {
      const departmentExists = Departments.some(
        (dep) => dep.id === selectedDepartment.id
      );

      if (departmentExists) {
        // Dispatch a warning toast
        const tdata = {
          message: "The Department is already Selected",
          type: "warn",
        };
        dispatchvalue({ type: "toast", value: tdata });
      } else {
        const updatedDepartments = [
          ...Departments,
          {
            id: selectedDepartment.id,
            SelectedDepartment: selectedDepartment.DepartmentName,
          },
        ];

        setDepartments(updatedDepartments);

        // Update the DoctorProfessForm state with a comma-separated string
        setDoctorProfessForm((prev) => ({
          ...prev,
          Department: updatedDepartments
            .map((dep) => dep.SelectedDepartment)
            .join(", "),
          DepartmentId: updatedDepartments.map((dep) => dep.id).join(", "),
        }));
      }
    }

    setselectDepModal({ SelectDepartment: "" }); // Reset after saving
  };

  // Delete a selected department
  const handleDeleteDepartments = (departmentId) => {
    console.log("Department ID to delete:", departmentId);
    const updatedDepartments = Departments.filter(
      (dep) => dep.id !== departmentId.id
    );
    console.log("Updated Departments after deletion:", updatedDepartments);
    setDepartments(updatedDepartments);

    // Update the DoctorProfessForm state with the remaining departments
    setDoctorProfessForm((prev) => ({
      ...prev,
      Department: updatedDepartments
        .map((dep) => dep.SelectedDepartment)
        .join(", "),
      DepartmentId: updatedDepartments.map((dep) => dep.id).join(", "),
    }));
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

  const handleinpchangeScheduleForm = (e) => {
    const { name, value } = e.target;
    setDoctorScheduleForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //         if (loading) {
  //             // Add event listeners to intercept scroll and click events
  //             window.addEventListener('scroll', handleStopEvent);
  //             window.addEventListener('click', handleStopEvent);

  //             return () => {
  //                 // Cleanup: Remove event listeners when component unmounts or stopEvents changes
  //                 window.removeEventListener('scroll', handleStopEvent);
  //                 window.removeEventListener('click', handleStopEvent);
  //             };
  //         }
  //     }, [loading]);

  const handleStopEvent = (event) => {
    document.body.style.pointerEvents = "auto";
    event.preventDefault();
    event.stopPropagation();
  };

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      document.body.style.pointerEvents = "none";
      element.scrollIntoView({ behavior: "auto", block: "start" });
      window.addEventListener("scroll", handleStopEvent);
      window.addEventListener("click", handleStopEvent);
    }
  };

  const handlesubmit = () => {
    setLoading(true);
    scrollToElement("scrollupppp");

    // Extract and adjust form data
    const { Department, Designation, Category, Specialization, ...rest } =
      DoctorProfessForm;
    const { Location, RouteNo, RouteName, TahsilName, VillageName } =
      DoctorRouteForm;

    // Find the RouteId based on provided data
    const RouteId = RouteData.find(
      (p) =>
        p.RouteNo === RouteNo &&
        p.RouteName === RouteName &&
        p.TahsilName === TahsilName &&
        p.VillageName === VillageName &&
        p.LocationName === Location
    );

    // Create the professional form data with fallback to null
    const updatedDoctorProfessForm = {
      Department: Department || null,
      Designation: Designation || null,
      Category: Category || null,
      Specialization: Specialization || null,
      ...rest,
    };
    // const validateTimeFormat = (time) => {
    //   return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time) ? time : null;
    // };
    // console.log("submitCheck",DoctorScheduleRows);

    // Map and structure the schedule data
    const scheduleData = DoctorScheduleRows.map((row) => ({
      days: row.days || "Unknown",
      locationId: row.locationId || "",
      locationName: row.locationName || "",
      working: row.working || "yes",
      shift: row.shift || "Single",
      starting_time: row.starting_time || "00:00",
      ending_time: row.ending_time || "00:00",
      starting_time_f: row.starting_time_f || "00:00",
      ending_time_f: row.ending_time_f || "00:00",
      starting_time_a: row.starting_time_a || "00:00",
      ending_time_a: row.ending_time_a || "00:00",
      working_hours_f: row.working_hours_f || "0h 0m",
      working_hours_a: row.working_hours_a || "0h 0m",
      working_hours_s: row.working_hours_s || "0h 0m",
      total_working_hours: row.total_working_hours || "0h 0m",
      total_working_hours_s: row.total_working_hours_s || "0h 0m",
    }));

    // Combine all forms into one data object
    const submitdata = {
      ...DoctorPersonalForm,
      ...updatedDoctorProfessForm,
      ...DoctorInsuranceForm,
      ...DoctorDocumentsForm,
      ...DoctorBankForm,
      ...DoctorContractForm,
      Schedule: scheduleData,
      Duration: DoctorScheduleForm.Duration,
      RouteId: RouteId ? RouteId.id : null,
      Created_by: UserData?.username,
      DoctorType: DoctorRegisType,
    };

    // Prepare DoctorContractForm
    const datatosend = new FormData();
    const arrchfile = [
      ...Object.keys(DoctorDocumentsForm),
      "InsuranceDetailsFile",
    ];

    // Log submitdata for debugging
    console.log("submitdata:", submitdata);
    // Object.keys(submitdata).forEach((key) => {
    //   if (arrchfile.includes(key) && submitdata[key]) {
    //     datatosend.append(key, submitdata[key]);
    //   } else if (key === "Schedule") {
    //     datatosend.append(key, JSON.stringify(submitdata[key]));
    //   } else if (submitdata[key] !== null && submitdata[key] !== "") {
    //     datatosend.append(key, submitdata[key]);
    //   }
    // });

    Object.keys(submitdata).forEach((key) => {
      if (arrchfile.includes(key)) {
        if (submitdata[key] !== null) {
          datatosend.append(key, submitdata[key]);
        }
      } else if (key === "Schedule") {
        datatosend.append(key, JSON.stringify(submitdata[key])); // Serialize schedule data
      } else {
        datatosend.append(key, submitdata[key]);
      }
    });

    // Log datatosend for debugging
    for (let pair of datatosend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    // Make the POST request
    axios
      .post(`${UrlLink}Masters/Doctor_Detials_link`, datatosend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        console.log("Response:", res.data);

        const resres = res.data;
        const typp = Object.keys(resres)[0];
        const mess = Object.values(resres)[0];
        const tdata = {
          message: mess,
          type: typp,
        };

        dispatchvalue({ type: "toast", value: tdata });
        clearalldata();
        navigate("/Home/DoctorList");
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error:", err.message);
      });
  };

  const style = {
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    color: "#666",
    padding: "4px",
    borderRadius: "4px",
    fontSize: "13px",
    textAlign: "center",
    width: "100px",
  };

  const handleWorkingChange = (id, working) => {
    const index = DoctorScheduleRows.findIndex((p) => p.id === id);
    const updatedRow = { ...DoctorScheduleRows[index], working };
    const newRow = DoctorScheduleRows.map((row, ind) =>
      ind === index ? updatedRow : row
    );
    console.log("Updated Rows", newRow); // Log the updated rows
    setDoctorScheduleRows(newRow);
  };

  const handleShiftChange = (id, shift) => {
    const index = DoctorScheduleRows.findIndex((p) => p.id === id);
    const updatedRow = { ...DoctorScheduleRows[index], shift };
    const newRow = DoctorScheduleRows.map((row, ind) =>
      ind === index ? updatedRow : row
    );
    setDoctorScheduleRows(newRow);
  };

  const handleTimeChange = (e, rowindx, column) => {
    console.log("TimeCheckkkkk", e.target.value, column);

    const index = DoctorScheduleRows.findIndex((p) => p.id === rowindx);
    const updatedRow = {
      ...DoctorScheduleRows[index],
      [column]: e.target.value,
    };
    const newRow = DoctorScheduleRows.map((row, ind) =>
      ind === index ? updatedRow : row
    );

    const cleanTime_s = updatedRow.starting_time
      .split(":")
      .slice(0, 2)
      .join(":");
    const cleanTime_e = updatedRow.ending_time.split(":").slice(0, 2).join(":");
    const cleanTime_s_f = updatedRow.starting_time_f
      .split(":")
      .slice(0, 2)
      .join(":");
    const cleanTime_e_f = updatedRow.ending_time_f
      .split(":")
      .slice(0, 2)
      .join(":");
    const cleanTime_s_a = updatedRow.starting_time_a
      .split(":")
      .slice(0, 2)
      .join(":");
    const cleanTime_e_a = updatedRow.ending_time_a
      .split(":")
      .slice(0, 2)
      .join(":");

    // Parse the start and end times
    const startTime = parse(cleanTime_s, "HH:mm", new Date());
    const endTime = parse(cleanTime_e, "HH:mm", new Date());
    const startTime_f = parse(cleanTime_s_f, "HH:mm", new Date());
    const endTime_f = parse(cleanTime_e_f, "HH:mm", new Date());
    const startTime_a = parse(cleanTime_s_a, "HH:mm", new Date());
    const endTime_a = parse(cleanTime_e_a, "HH:mm", new Date());

    console.log("TimeCheckkkkk", startTime, "dfbsbs", updatedRow.starting_time);

    // Check if the end time is less than the start time
    if (endTime && differenceInMinutes(endTime, startTime) < 0) {
      const tdata = {
        message: `The End Time should be more than Starting time`,
        type: "warn",
      };

      dispatchvalue({ type: "toast", value: tdata });
    }

    // Calculate the time difference
    let diffInMinutes = 0;
    let diffInMinutes_f = 0;
    let diffInMinutes_a = 0;
    if (
      updatedRow.starting_time &&
      updatedRow.ending_time &&
      updatedRow.shift === "Single"
    ) {
      diffInMinutes = differenceInMinutes(endTime, startTime);
      // Handle cases where the end time is before the start time (overnight shift)
      if (diffInMinutes < 0) {
        diffInMinutes += 1440; // 1440 minutes in a day
      }
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      const workingHours = `${hours}h ${minutes}m`;
      // Update the row with calculated working hours
      updatedRow.working_hours_s = workingHours || "0h 0m";
      updatedRow.total_working_hours_s = workingHours || "0h 0m";
    } else if (updatedRow.shift === "Double") {
      if (updatedRow.starting_time_f && updatedRow.ending_time_f) {
        diffInMinutes_f = differenceInMinutes(endTime_f, startTime_f);
        // Handle cases where the end time is before the start time (overnight shift)
        if (diffInMinutes_f < 0) {
          diffInMinutes_f += 1440; // 1440 minutes in a day
        }

        const hours_f = Math.floor(diffInMinutes_f / 60);
        const minutes_f = diffInMinutes_f % 60;
        const working_hours_f = `${hours_f}h ${minutes_f}m`;

        // Update the row with calculated working hours
        updatedRow.working_hours_f = working_hours_f || "0h 0m";
        updatedRow.total_working_hours = working_hours_f || "0h 0m";
      }
      if (updatedRow.starting_time_a && updatedRow.ending_time_a) {
        diffInMinutes_a = differenceInMinutes(endTime_a, startTime_a);
        if (diffInMinutes_a < 0) {
          diffInMinutes_a += 1440; // 1440 minutes in a day
        }
        const hours_a = Math.floor(diffInMinutes_a / 60);
        const minutes_a = diffInMinutes_a % 60;
        const working_hours_a = `${hours_a}h ${minutes_a}m`;

        const totalMinutes = diffInMinutes_f + diffInMinutes_a;
        console.log("totalMinutes", totalMinutes);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalRemainingMinutes = totalMinutes % 60;
        const totalWorkingHours = `${totalHours}h ${totalRemainingMinutes}m`;

        updatedRow.working_hours_a = working_hours_a || "0h 0m";
        updatedRow.total_working_hours = totalWorkingHours || "0h 0m";
      }
    }

    setDoctorScheduleRows(newRow);
    console.log("Time Change:", newRow);
  };

  const Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // const handlelocationChange = (id, locationName) => {
  //   console.log('Dataaaaa',id);
    
  //   setDoctorScheduleRows((prevRows) => {
  //     const isSelected = prevRows.some((row) => row.locationId === id && row.Status === 'Active');
      
  //     if (isSelected) {
  //       // Remove rows for this location
  //       return prevRows.filter((row) => row.locationId !== id);
  //     } else {
  //       const existingLocationData = fetchedData.filter((row) => row.locationId === id && row.Status === 'Inactive');
  //       console.log("Dataaaaa", existingLocationData);

  //       if (existingLocationData.length > 0) {
  //         return [...prevRows,...existingLocationData];
  //       } else {
  //         console.log("Dataaaaa is in else part");
  //         // Create new rows for the location
  //         const maxId = prevRows.length > 0 ? Math.max(...prevRows.map((row) => row.id)) : 0;
  //         const newRows = Days.map((day, index) => ({
  //           id: maxId + index + 1,
  //           days: day,
  //           locationId: id,
  //           locationName: locationName,
  //           working: "yes",
  //           shift: "Single",
  //           starting_time: "",
  //           ending_time: "",
  //           starting_time_f: "",
  //           ending_time_f: "",
  //           starting_time_a: "",
  //           ending_time_a: "",
  //           working_hours_f: "0h 0m",
  //           working_hours_a: "0h 0m",
  //           working_hours_s: "0h 0m",
  //           total_working_hours: "0h 0m",
  //           total_working_hours_s: "0h 0m",
  //           Status: "Active"
  //         }));
  //         return [...prevRows, ...newRows];
  //       }
  //     }
  //   });
  // };
  

  const handlelocationChange = (id, locationName) => {
    console.log("Dataaaaa", id);

    setDoctorScheduleRows((prevRows) => {
      // Check if the location is already selected
      const isSelected = prevRows.some((row) => row.locationId === id);

      if (isSelected) {
        // If the location is already selected, remove the rows for this location
        return prevRows.filter(
          (row) => row.locationId !== id && row.Status === "Active"
        );
      } else {
        // Check if the location data exists in the fetchedData (not prevRows)
        const existingLocationData = fetchedData.filter(
          (row) => row.locationId === id
        );
        console.log("Dataaaaa", existingLocationData);
        

        if (existingLocationData.length > 0) {
          // If data for this location exists in fetchedData, add it to the current state
          return [...prevRows, ...existingLocationData];
        } else {
          console.log("Dataaaaa is in else part");

          // If no data exists for this location, create new rows
          const maxId =
            prevRows.length > 0
              ? Math.max(...prevRows.map((row) => row.id))
              : 0;

          const newRows = Days.map((day, index) => ({
            id: maxId + index + 1, // Start IDs from the next available number
            days: day,
            locationId: id,
            locationName: locationName,
            working: "yes", // Default value for working
            shift: "Single", // Default value for shift
            starting_time: "",
            ending_time: "",
            starting_time_f: "",
            ending_time_f: "",
            starting_time_a: "",
            ending_time_a: "",
            working_hours_f: "0h 0m",
            working_hours_a: "0h 0m",
            working_hours_s: "0h 0m",
            total_working_hours: "0h 0m",
            total_working_hours_s: "0h 0m",
          }));

          return [...prevRows, ...newRows];
        }
      }
    });
  };

  console.log("DoctorRegisType:", DoctorRegisType);
  console.log("LocationData:", LocationData);
  console.log("DoctorScheduleRows:", DoctorScheduleRows);

  return (
    <>
      <div className="Main_container_app" id="scrollupppp">
        <h3>Doctor Master</h3>
        <div className="RegisterTypecon">
          <div className="RegisterType">
            {["InHouse", "Referral", "Visiting"]
              .filter((f) =>
                Object.keys(DoctorListId).length !== 0
                  ? f === DoctorRegisType
                  : f
              )
              .map((p, ind) => (
                <div className="registertypeval" key={ind}>
                  <input
                    type="radio"
                    id={p}
                    name="appointment_type"
                    checked={DoctorRegisType === p}
                    disabled={Object.keys(DoctorListId).length !== 0}
                    onChange={(e) => setDoctorRegisType(e.target.value)}
                    value={p}
                  />
                  <label htmlFor={p}>{p === "InHouse" ? "In House" : p}</label>
                </div>
              ))}
          </div>
        </div>
        <div className="DivCenter_container">
          <div className="img_1">
            <div className="patient_profile_pic">
              {DoctorDocumentsForm.photo && (
                <img src={DoctorDocumentsForm.photo} alt="Doctor" />
              )}
            </div>
            <input
              type="file"
              name="photo"
              id="Filechoosen_Doctor_profile"
              accept="image/png,image/jpeg"
              onChange={handleinpchangeDocumentsForm}
              style={{ display: "none" }}
            />
            <label htmlFor="Filechoosen_Doctor_profile" className="ImgBtn">
              Choose File
            </label>
          </div>
        </div>
        <br />
        <div className="common_center_tag">
          <span>Personal Information</span>
        </div>
        <div className="RegisFormcon_1">
          {Object.keys(DoctorPersonalForm)
            .filter((p) =>
              DoctorPersonalForm.MaritalStatus === "Married"
                ? p !== "DoctorID"
                : !["AnniversaryDate", "DoctorID"].includes(p)
            )
            .map((field, indx) => (
              <div className="RegisForm_1" key={indx}>
                <label htmlFor={`${field}_${indx}_${field}`}>
                  {formatLabel(field)} <span>:</span>
                </label>
                {[
                  "Nationality",
                  "Gender",
                  "MaritalStatus",
                  "PreferredModeOfCommunication",
                ].includes(field) ? (
                  <select
                    name={field}
                    required
                    id={`${field}_${indx}_${field}`}
                    value={DoctorPersonalForm[field]}
                    onChange={handleinpchangePersonalForm}
                  >
                    <option value="">Select</option>
                    {field === "Nationality" &&
                      ["Indian", "International"].map((p, index) => (
                        <option key={index} value={p}>
                          {p}
                        </option>
                      ))}
                    {field === "Gender" &&
                      ["Male", "Female", "TransGender"].map((p, index) => (
                        <option key={index} value={p}>
                          {p}
                        </option>
                      ))}
                    {field === "MaritalStatus" &&
                      ["Married", "Divorced", "Widow", "Seperated"].map(
                        (p, index) => (
                          <option key={index} value={p}>
                            {p}
                          </option>
                        )
                      )}
                    {field === "PreferredModeOfCommunication" &&
                      ["Email", "Call", "Whatsapp", "Post"].map((p, index) => (
                        <option key={index} value={p}>
                          {p}
                        </option>
                      ))}
                  </select>
                ) : field === "CurrentAddress" ||
                  field === "PermanentAddress" ? (
                  <textarea
                    name={field}
                    id={`${field}_${indx}_${field}`}
                    value={DoctorPersonalForm[field]}
                    onChange={handleinpchangePersonalForm}
                    className={
                      errors[field] === "Invalid"
                        ? "invalid"
                        : errors[field] === "Valid"
                        ? "valid"
                        : ""
                    }
                  />
                ) : field === "EmergencyAvailablity" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "150px",
                    }}
                  >
                    <label style={{ width: "60px", cursor: "pointer" }}>
                      <input
                        id={`${field}_${indx}_${field}_Yes`}
                        type="radio"
                        name={field}
                        value="Yes"
                        style={{ width: "15px" }}
                        checked={DoctorPersonalForm[field] === "Yes"}
                        onChange={(e) =>
                          setDoctorPersonalForm((prevState) => ({
                            ...prevState,
                            [field]: "Yes",
                          }))
                        }
                      />
                      Yes
                    </label>
                    <label style={{ width: "60px", cursor: "pointer" }}>
                      <input
                        id={`${field}_${indx}_${field}_No`}
                        type="radio"
                        name={field}
                        value="No"
                        style={{ width: "15px" }}
                        checked={DoctorPersonalForm[field] === "No"}
                        onChange={(e) =>
                          setDoctorPersonalForm((prevState) => ({
                            ...prevState,
                            [field]: "No",
                          }))
                        }
                      />
                      No
                    </label>
                  </div>
                ) : (
                  <input
                    type={
                      ["DOB", "AnniversaryDate"].includes(field)
                        ? "date"
                        : [
                            "ContactNumber",
                            "AlternateNumber",
                            "EmergencyNo1",
                            "EmergencyNo2",
                          ].includes(field)
                        ? "number"
                        : field === "Email"
                        ? "email"
                        : "text"
                    }
                    name={field}
                    required
                    pattern={
                      field === "Email"
                        ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                        : [
                            "ContactNumber",
                            "AlternateNumber",
                            "EmergencyNo1",
                            "EmergencyNo2",
                          ].includes(field)
                        ? "\\d{10}"
                        : ["CurrentAddress", "PermanentAddress"].includes(field)
                        ? "[A-Za-z0-9]+"
                        : field === "Age"
                        ? "[0-9]\\d{0,3}"
                        : ["AnniversaryDate", "DOB"].includes(field)
                        ? ""
                        : "[A-Za-z]+"
                    }
                    onKeyDown={(e) =>
                      [
                        "ContactNumber",
                        "AlternateNumber",
                        "EmergencyNo1",
                        "EmergencyNo2",
                        "Age",
                      ].includes(field) &&
                      ["e", "E", "+", "-"].includes(e.key) &&
                      e.preventDefault()
                    }
                    id={`${field}_${indx}_${field}`}
                    autoComplete="off"
                    value={DoctorPersonalForm[field]}
                    onChange={handleinpchangePersonalForm}
                    readOnly={field === "Tittle"}
                    className={
                      errors[field] === "Invalid"
                        ? "invalid"
                        : errors[field] === "Valid"
                        ? "valid"
                        : ""
                    }
                  />
                )}
              </div>
            ))}
        </div>
        <div className="common_center_tag">
          <span>Professional Information</span>
        </div>

        <div className="RegisFormcon_1">
          {Object.keys(DoctorProfessForm)
            .filter((p) =>
              DoctorRegisType !== "Visiting"
                ? !["VisitType", "DoctorType", "DepartmentId"].includes(p)
                : p !== "DoctorType"
            )
            .map((field, indx) => (
              <div className="RegisForm_1" key={indx}>
                <label htmlFor={`${field}_${indx}_${field}`}>
                  {formatLabel(field)} <span>:</span>
                </label>
                {[
                  "VisitType",
                  "Designation",
                  "Specialization",
                  "Category",
                ].includes(field) ? (
                  <select
                    name={field}
                    required
                    id={`${field}_${indx}_${field}`}
                    value={DoctorProfessForm[field]}
                    onChange={handleinpchangeProfessionalForm}
                  >
                    <option value="">Select</option>
                    {field === "VisitType" &&
                      ["VisitingPeriodically", "PanelMember"].map(
                        (p, index) => (
                          <option key={index} value={p}>
                            {formatLabel(p)}
                          </option>
                        )
                      )}
                    {field === "Department" &&
                      DepartmentData.filter((p) => p.Status === "Active").map(
                        (p, index) => (
                          <option key={index} value={p.id}>
                            {p.DepartmentName}
                          </option>
                        )
                      )}
                    {field === "Designation" &&
                      DesignationData.filter((p) => p.Status === "Active").map(
                        (p, index) => (
                          <option key={index} value={p.id}>
                            {p.Designation}
                          </option>
                        )
                      )}
                    {field === "Category" &&
                      CategoryData.filter(
                        (p) =>
                          p.Status === "Active" &&
                          p.DesignationId === +DoctorProfessForm["Designation"]
                      ).map((p, index) => (
                        <option key={index} value={p.id}>
                          {p.CategoryName}
                        </option>
                      ))}
                    {field === "Specialization" &&
                      SpecializationData.filter(
                        (p) =>
                          p.Status === "Active" &&
                          p.DesignationId === +DoctorProfessForm["Designation"]
                      ).map((p, index) => (
                        <option key={index} value={p.id}>
                          {p.SpecialityName}
                        </option>
                      ))}
                  </select>
                ) : (
                  <input
                    name={field}
                    required
                    pattern={
                      ["YearsofExperience"].includes(field)
                        ? "[0-9]\\d{0,2}"
                        : "[A-Za-z0-9]+"
                    }
                    onKeyDown={(e) =>
                      ["YearsofExperience"].includes(field) &&
                      ["e", "E", "+", "-"].includes(e.key) &&
                      e.preventDefault()
                    }
                    id={`${field}_${indx}_${field}`}
                    autoComplete="off"
                    value={DoctorProfessForm[field]}
                    onChange={handleinpchangeProfessionalForm}
                    className={
                      errors[field] === "Invalid"
                        ? "invalid"
                        : errors[field] === "Valid"
                        ? "valid"
                        : ""
                    }
                    type={
                      ["LicenseExpiryDate", "DateOfJoining"].includes(field)
                        ? "date"
                        : field === "YearsofExperience"
                        ? "number"
                        : "text"
                    }
                  />
                )}
                <div className="Search_patient_icons">
                  {field === "Department" && (
                    <span>
                      <AddBoxIcon onClick={HandleDepartmentSelect} />
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
        {console.log("DoctorProfessForm", DoctorProfessForm)}
        {DoctorRegisType !== "Referral" && (
          <>
            <div className="common_center_tag">
              <span>Insurance Information</span>
            </div>
            <div className="RegisFormcon_1">
              {Object.keys(DoctorInsuranceForm).map((field, indx) => (
                <div className="RegisForm_1" key={indx}>
                  <label htmlFor={`${field}_${indx}_${field}`}>
                    {formatLabel(field)} <span>:</span>
                  </label>
                  {field === "InsuranceDetailsFile" ? (
                    <>
                      <input
                        type="file"
                        name={field}
                        required
                        accept="image/jpeg,image/png,application/pdf"
                        id={`${field}_${indx}_${field}`}
                        autoComplete="off"
                        onChange={handleinpchangeDoctorInsuranceForm}
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
                          onClick={() =>
                            Selectedfileview(DoctorInsuranceForm[field])
                          }
                        >
                          view
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type={
                          ["ExpiryDate", "InsuranceRenewalDate"].includes(field)
                            ? "date"
                            : field === "CoverageAmount"
                            ? "number"
                            : "text"
                        }
                        name={field}
                        required
                        pattern={
                          ["MalpracticeInsuranceProviderName"].includes(field)
                            ? "[A-Za-z]+"
                            : field === "CoverageAmount"
                            ? "[0-9]"
                            : "[A-Za-z0-9]+"
                        }
                        onKeyDown={(e) =>
                          ["CoverageAmount"].includes(field) &&
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        id={`${field}_${indx}_${field}`}
                        autoComplete="off"
                        onChange={handleinpchangeDoctorInsuranceForm}
                        value={DoctorInsuranceForm[field]}
                        className={
                          errors[field] === "Invalid"
                            ? "invalid"
                            : errors[field] === "Valid"
                            ? "valid"
                            : ""
                        }
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="common_center_tag">
          <span>Document Information</span>
        </div>
        <div className="RegisFormcon_1">
          {Object.keys(DoctorDocumentsForm)
            .filter((p) => p !== "photo")
            .map((field, indx) => (
              <div className="RegisForm_1" key={indx}>
                <label htmlFor={`${field}_${indx}_${field}`}>
                  {formatLabel(field)} <span>:</span>
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
                    onClick={() => Selectedfileview(DoctorDocumentsForm[field])}
                  >
                    view
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="common_center_tag">
          <span>Bank Information</span>
        </div>
        <div className="RegisFormcon_1">
          {Object.keys(DoctorBankForm).map((field, indx) => (
            <div className="RegisForm_1" key={indx}>
              <label htmlFor={`${field}_${indx}_${field}`}>
                {formatLabel(field)} <span>:</span>{" "}
              </label>
              {
                <input
                  type="text"
                  name={field}
                  required
                  pattern={
                    field === "AccountNumber"
                      ? "[0-9]"
                      : field === "PancardNumber"
                      ? "\\d{10}"
                      : "[A-Za-z0-9]+"
                  }
                  id={`${field}_${indx}_${field}`}
                  autoComplete="off"
                  value={DoctorBankForm[field]}
                  onKeyDown={(e) =>
                    ["AccountNumber"].includes(field) &&
                    ["e", "E", "+", "-"].includes(e.key) &&
                    e.preventDefault()
                  }
                  onChange={handleinpchangeBankForm}
                  className={
                    errors[field] === "Invalid"
                      ? "invalid"
                      : errors[field] === "Valid"
                      ? "valid"
                      : ""
                  }
                />
              }
            </div>
          ))}
        </div>

        {DoctorRegisType === "Referral" && (
          <>
            <div className="common_center_tag">
              <span>Route Information</span>
            </div>
            <div className="RegisFormcon_1">
              {Object.keys(DoctorRouteForm).map((field, indx) => (
                <div className="RegisForm_1" key={indx}>
                  <label htmlFor={`${field}_${indx}_${field}`}>
                    {formatLabel(field)} <span>:</span>{" "}
                  </label>
                  <select
                    name={field}
                    required
                    id={`${field}_${indx}_${field}`}
                    value={DoctorRouteForm[field]}
                    onChange={handleinpchangeRouteForm}
                  >
                    <option value="">Select</option>

                    {field === "Location" &&
                      Array.from(
                        new Set(RouteData.flatMap((Catg) => Catg.LocationName))
                      )?.map((Catg, indx) => (
                        <option key={indx} value={Catg}>
                          {Catg}
                        </option>
                      ))}
                    {field === "RouteNo" &&
                      Array.from(
                        new Set(
                          RouteData.filter(
                            (p) => p.LocationName === DoctorRouteForm.Location
                          ).flatMap((Catg) => Catg.RouteNo)
                        )
                      )?.map((Catg, indx) => (
                        <option key={indx} value={Catg}>
                          {Catg}
                        </option>
                      ))}
                    {field === "RouteName" &&
                      Array.from(
                        new Set(
                          RouteData.filter(
                            (p) => p.LocationName === DoctorRouteForm.Location
                          ).flatMap((Catg) => Catg.RouteName)
                        )
                      )?.map((Catg, indx) => (
                        <option key={indx} value={Catg}>
                          {Catg}
                        </option>
                      ))}
                    {field === "TahsilName" &&
                      Array.from(
                        new Set(
                          RouteData.filter(
                            (p) =>
                              p.LocationName === DoctorRouteForm.Location &&
                              p.RouteNo === DoctorRouteForm.RouteNo
                          ).flatMap((Catg) => Catg.TahsilName)
                        )
                      )?.map((Catg, indx) => (
                        <option key={indx} value={Catg}>
                          {Catg}
                        </option>
                      ))}
                    {field === "VillageName" &&
                      Array.from(
                        new Set(
                          RouteData.filter(
                            (p) =>
                              p.LocationName === DoctorRouteForm.Location &&
                              p.RouteNo === DoctorRouteForm.RouteNo &&
                              p.TahsilName === DoctorRouteForm.TahsilName
                          ).flatMap((Catg) => Catg.VillageName)
                        )
                      )?.map((Catg, indx) => (
                        <option key={indx} value={Catg}>
                          {Catg}
                        </option>
                      ))}
                  </select>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="common_center_tag">
          <span>Contract Information</span>
        </div>
        <div className="RegisFormcon_1">
          {Object.keys(DoctorContractForm).map((field, indx) => (
            <div className="RegisForm_1" key={indx}>
              <label htmlFor={`${field}_${indx}_${field}`}>
                {field === "Comission"
                  ? "Comission in % only"
                  : formatLabel(field)}
                <span>:</span>
              </label>
              {["ContractRenewalTerms", "Remarks"].includes(field) ? (
                <textarea
                  name={field}
                  id={`${field}_${indx}_${field}`}
                  value={DoctorContractForm[field]}
                  onChange={handleinpchangeContractForm}
                />
              ) : (
                <input
                  name={field}
                  id={`${field}_${indx}_${field}`}
                  value={DoctorContractForm[field]}
                  pattern={field === "Comission" ? "[0-9]" : "[A-Za-z0-9]+"}
                  type={
                    ["PreviousEmployeementHistory", "Comission"].includes(field)
                      ? "text"
                      : "date"
                  }
                  onChange={handleinpchangeContractForm}
                />
              )}
            </div>
          ))}
        </div>

        {DoctorRegisType !== "Referral" && (
          <>
            <div className="common_center_tag">
              <span>Schedule Information</span>
            </div>
            <div className="displayuseraccess">
              {Locations.map((p, indx) => (
                <div
                  className="displayuseraccess_child"
                  key={`${indx}_${p?.id}`}
                >
                  <input
                    type="checkbox"
                    id={`${indx}_${p?.id}`}
                    checked={DoctorScheduleRows.some(
                      (row) => row.locationId === p?.id
                    )}
                    onChange={() =>
                      handlelocationChange(p?.id, p?.locationName)
                    }
                  />
                  <label htmlFor={`${indx}_${p?.id}`} className="par_acc_lab">
                    {p?.locationName}
                  </label>
                </div>
              ))}
            </div>
            <div className="RegisForm_1">
              <label>
                Duration <span>:</span>
              </label>
              <input
                name="Duration"
                required
                value={DoctorScheduleForm.Duration || ""}
                type="text"
                onChange={handleinpchangeScheduleForm}
              />
              <label>mins</label>
            </div>
            <div className="doctor_schedule_table_wrapper">
              <div className="doctor_schedule_table">
                <table>
                  <thead>
                    <tr>
                      <th>Location</th>
                      <th>Days</th>
                      <th>If Working</th>
                      <th>Shifts</th>
                      <th>Starting Time</th>
                      <th>End Time</th>
                      <th>Working Hours</th>
                      <th>Total Hrs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Locations.map((location) => {
                      // Filter rows for the current location
                      const locationRows = DoctorScheduleRows.filter(
                        (row) => row.locationId === location.id
                      );
                      return locationRows.map((row, index) => (
                        <tr key={`${row.id}_${index}`}>
                          {index === 0 && (
                            <td rowSpan={locationRows.length}>
                              {row.locationName}
                            </td>
                          )}
                          {console.log("row.working", row.working)}
                          <td>{row.days}</td>
                          <td>
                            <label htmlFor={`radio_yes_${row.id}_${index}`}>
                              <input
                                type="radio"
                                id={`radio_yes_${row.id}_${index}`}
                                name={`radio_${row.id}`}
                                value="yes"
                                onChange={() =>
                                  handleWorkingChange(row.id, "yes")
                                }
                                checked={row.working === "yes"}
                              />
                              Yes
                            </label>
                            <label htmlFor={`radio_no_${row.id}_${index}`}>
                              <input
                                type="radio"
                                id={`radio_no_${row.id}_${index}`}
                                name={`radio_${row.id}`}
                                value="no"
                                onChange={() =>
                                  handleWorkingChange(row.id, "no")
                                }
                                checked={row.working === "no"}
                              />
                              No
                            </label>
                          </td>
                          <td>
                            <select
                              className="doctor_schedule_select"
                              name={`shift_${row.id}_${index}`}
                              value={row.shift}
                              onChange={(e) =>
                                handleShiftChange(row.id, e.target.value)
                              }
                              disabled={row.working === "no"}
                            >
                              <option value="Single">Single</option>
                              <option value="Double">Double</option>
                            </select>
                          </td>
                          <td>
                            {row.shift === "Double" ? (
                              <>
                                <label className="Schedule_table_label">
                                  <span> FN:</span>
                                  <input
                                    type="time"
                                    style={style}
                                    name={`starting_time_f_${row.id}_${index}`}
                                    value={
                                      row.working === "no"
                                        ? ""
                                        : row.starting_time_f || "00:00"
                                    }
                                    onChange={(e) =>
                                      handleTimeChange(
                                        e,
                                        row.id,
                                        "starting_time_f"
                                      )
                                    }
                                    disabled={row.working === "no"}
                                  />
                                </label>
                                <label className="Schedule_table_label">
                                  <span> AN:</span>
                                  <input
                                    type="time"
                                    style={style}
                                    name={`starting_time_a_${row.id}_${index}`}
                                    value={
                                      row.working === "no"
                                        ? ""
                                        : row.starting_time_a || "00:00"
                                    }
                                    onChange={(e) =>
                                      handleTimeChange(
                                        e,
                                        row.id,
                                        "starting_time_a"
                                      )
                                    }
                                    disabled={row.working === "no"}
                                  />
                                </label>
                              </>
                            ) : (
                              <input
                                type="time"
                                style={style}
                                name={`starting_time_${row.id}_${index}`}
                                value={
                                  row.working === "no"
                                    ? ""
                                    : row.starting_time || "00:00"
                                }
                                onChange={(e) =>
                                  handleTimeChange(e, row.id, "starting_time")
                                }
                                disabled={row.working === "no"}
                              />
                            )}
                          </td>
                          <td>
                            {row.shift === "Double" ? (
                              <>
                                <label className="Schedule_table_label">
                                  <span> FN:</span>
                                  <input
                                    type="time"
                                    style={style}
                                    name={`ending_time_f_${row.id}_${index}`}
                                    value={
                                      row.working === "no"
                                        ? ""
                                        : row.ending_time_f || "00:00"
                                    }
                                    onChange={(e) =>
                                      handleTimeChange(
                                        e,
                                        row.id,
                                        "ending_time_f"
                                      )
                                    }
                                    disabled={row.working === "no"}
                                  />
                                </label>
                                <label className="Schedule_table_label">
                                  <span> AN:</span>
                                  <input
                                    type="time"
                                    style={style}
                                    name={`ending_time_a_${row.id}_${index}`}
                                    value={
                                      row.working === "no"
                                        ? ""
                                        : row.ending_time_a || "00:00"
                                    }
                                    onChange={(e) =>
                                      handleTimeChange(
                                        e,
                                        row.id,
                                        "ending_time_a"
                                      )
                                    }
                                    disabled={row.working === "no"}
                                  />
                                </label>
                              </>
                            ) : (
                              <input
                                type="time"
                                style={style}
                                name={`ending_time_${row.id}_${index}`}
                                value={
                                  row.working === "no"
                                    ? ""
                                    : row.ending_time || "00:00"
                                }
                                onChange={(e) =>
                                  handleTimeChange(e, row.id, "ending_time")
                                }
                                disabled={row.working === "no"}
                              />
                            )}
                          </td>
                          <td>
                            {row.shift === "Double" ? (
                              <>
                                <label className="Schedule_table_label">
                                  <span> FN:</span>
                                  <input
                                    type="text"
                                    style={style}
                                    name={`working_hours_f_${row.id}_${index}`}
                                    value={
                                      row.working === "no"
                                        ? "0h 0m"
                                        : row.working_hours_f
                                    }
                                    readOnly
                                    disabled={row.working === "no"}
                                  />
                                </label>
                                <label className="Schedule_table_label">
                                  <span> AN:</span>
                                  <input
                                    type="text"
                                    style={style}
                                    name={`working_hours_a_${row.id}_${index}`}
                                    value={
                                      row.working === "no"
                                        ? "0h 0m"
                                        : row.working_hours_a
                                    }
                                    readOnly
                                    disabled={row.working === "no"}
                                  />
                                </label>
                              </>
                            ) : (
                              <input
                                type="text"
                                style={style}
                                readOnly
                                value={
                                  row.working === "no"
                                    ? "0h 0m"
                                    : row.working_hours_s
                                }
                                disabled={row.working === "no"}
                              />
                            )}
                          </td>
                          <td>
                            <input
                              type="text"
                              style={style}
                              readOnly
                              value={
                                row.working === "no"
                                  ? "0h 0m"
                                  : row.shift === "Double"
                                  ? row.total_working_hours
                                  : row.total_working_hours_s
                              }
                              disabled={row.working === "no"}
                            />
                          </td>
                        </tr>
                      ));
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <div className="Main_container_Btn">
          <button onClick={handlesubmit}>
            {DoctorPersonalForm.DoctorID ? "Update" : "Save"}
          </button>
        </div>
      </div>
      {loading && (
        <div className="loader">
          <div className="Loading">
            <div className="spinner-border"></div>
            <div>Loading...</div>
          </div>
        </div>
      )}
      <ToastAlert Message={toast.message} Type={toast.type} />
      {selectDepartment && (
        <div className="loader" onClick={() => setSelectDepartment(false)}>
          <div
            className="loader_register_roomshow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="DivCenter_container">Select Department Details</div>
            <div className="RegisFormcon_1">
              <div className="RegisForm_1">
                <label htmlFor="selectDepModal.SelectDepartment">
                  Select Department <span>:</span>
                </label>
                <select
                  name="SelectDepartment"
                  required
                  id={selectDepModal.SelectDepartment}
                  value={selectDepModal.SelectDepartment}
                  onChange={handleinpchangeDepartment}
                >
                  <option value="">Select</option>
                  {DepartmentData.filter((p) => p.Status === "Active").map(
                    (p, index) => (
                      <option key={index} value={p.id}>
                        {p.DepartmentName}
                      </option>
                    )
                  )}
                </select>
                <div className="Main_container_Btn">
                  <button onClick={handleDepartmentSave}>Save</button>
                </div>
              </div>
            </div>
            <ReactGrid columns={SelectDataColumn} RowData={Departments} />
          </div>
        </div>
      )}
      <ModelContainer />
    </>
  );
};

export default DoctorMaster;
