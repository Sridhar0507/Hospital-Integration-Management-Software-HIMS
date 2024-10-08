import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import {
  differenceInYears,
  format,
  startOfYear,
  subYears,
  isBefore,
} from "date-fns";
import axios from "axios";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoBedOutline } from "react-icons/io5";
import profile from "../../Assets/profileimg.jpeg";
import "../../App.css";
import { handleKeyDownText } from "../../OtherComponent/OtherFunctions";
import { handleKeyDownPhoneNo } from "../../OtherComponent/OtherFunctions";
// handleKeyDownTextRegistration
import { handleKeyDownTextRegistration } from "../../OtherComponent/OtherFunctions";
import RoomDetialsSelect from "./RoomDetialsSelect";
import Button from "@mui/material/Button";
import { FaTrash } from "react-icons/fa";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";

const Newregistration = () => {
  const dispatchvalue = useDispatch();
  const navigate = useNavigate();

  const relationships = [
    "Spouse",
    "Father",
    "Mother",
    "Brother",
    "Sister",
    "Father-in-law",
    "Mother-in-law",
    "Grandfather",
    "Grandmother",
    "Son",
    "Daughter",
    "Grandson",
    "Granddaughter",
    "Son-in-law",
    "Daughter-in-law",
    "Uncle",
    "Aunt",
    "Nephew",
    "Niece",
    "Cousin",
    "Step-father",
    "Step-mother",
    "Step-son",
    "Step-daughter",
  ];

  const [AppointmentRegisType, setAppointmentRegisType] = useState("OP");
  const Registeredit = useSelector((state) => state.Frontoffice?.Registeredit);
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const UserData = useSelector((state) => state.userRecord?.UserData);
  console.log("UserData", UserData);

  const toast = useSelector((state) => state.userRecord?.toast);
  const RegisterRoomShow = useSelector(
    (state) => state.Frontoffice?.RegisterRoomShow
  );
  const SelectRoomRegister = useSelector(
    (state) => state.Frontoffice?.SelectRoomRegister
  );
  const [loading, setLoading] = useState(false);
  const [SpecializationData, setSpecializationData] = useState([]);
  const [DoctorData, setDoctorData] = useState([]);
  const [ReferralDoctorData, setReferralDoctorData] = useState([]);
  const [EmployeeData, setEmployeeData] = useState([]);
  const [DoctorIdData, setDoctorIdData] = useState([]);
  const [FlaggData, setFlaggData] = useState([]);
  const [ReligionData, setReligionData] = useState([]);
  const [AllDoctorData, setAllDoctorData] = useState([]);
  const [InsuranceData, setInsuranceData] = useState([]);
  const [ClientData, setClientData] = useState([]);
  const [DonationData, setDonationData] = useState([]);

  // Function to format date as MM/DD/YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [FilterbyPatientId, setFilterbyPatientId] = useState([]);
  const [FilteredFormdata, setFilteredFormdata] = useState(null);
  const [FilteredFormdataAddress, setFilteredFormdataAddress] = useState(null);
  const [FilteredFormdataRoute, setFilteredFormdataRoute] = useState(null);
  const [FilteredFormdataIpDetials, setFilteredFormdataIpDetials] =
    useState(null);
  const [FilteredFormdataIpRoomDetials, setFilteredFormdataIpRoomDetials] =
    useState(null);
  const [RoomdeditalsShow, setRoomdeditalsShow] = useState({
    Building: "",
    Block: "",
    Floor: "",
    WardType: "",
    RoomType: "",
    RoomNo: "",
    BedNo: "",
    RoomId: "",
  });
  const [patientPhoto, setpatientPhoto] = useState(profile);
  const [errors, setErrors] = useState({});
  const [RegisterData, setRegisterData] = useState({
    IsConsciousness: "Yes",

    PatientId: "",
    PhoneNo: "",
    Title: "",
    FirstName: "",
    MiddleName: "",
    SurName: "",
    Gender: "",
    AliasName: "",
    DOB: "",
    Age: "",
    Email: "",
    BloodGroup: "",
    Occupation: "",
    Religion: "",
    Nationality: "",
    UniqueIdType: "",
    UniqueIdNo: "",
    CaseSheetNo: "",

    VisitPurpose: "",

    Specialization: "",
    DoctorName: "",
    Complaint: "",
    PatientType: "General",
    PatientCategory: "General",
    InsuranceName: "",
    InsuranceType: "",
    ClientName: "",
    ClientType: "Self",
    ClientEmployeeId: "",
    ClientEmployeeDesignation: "",
    ClientEmployeeRelation: "",
    EmployeeId: "",
    EmployeeRelation: "",
    DoctorId: "",
    DoctorRelation: "",
    DonationType: "",
    IsMLC: "No",
    Flagging: 1,
    IsReferral: "No",

    ReferralSource: "",
    ReferredBy: "",
    RouteNo: "",
    RouteName: "",
    TehsilName: "",
    VillageName: "",

    AdmissionPurpose: "",
    DrInchargeAtTimeOfAdmission: "",
    NextToKinName: "",
    Relation: "",
    RelativePhoneNo: "",
    PersonLiableForBillPayment: "",
    FamilyHead: "Yes",
    FamilyHeadName: "",
    IpKitGiven: "No",

    DoorNo: "",
    Street: "",
    Area: "",
    City: "",
    State: "",
    Country: "",
    Pincode: "",

    Building: null,
    Block: null,
    Floor: null,
    WardType: null,
    RoomType: null,
    RoomNo: null,
    BedNo: null,
    RoomId: null,
  });

  const clearRegisterdata = () => {
    setRegisterData((prev) => ({
      ...prev,
      IsConsciousness: "Yes",
      PatientId: "",
      PhoneNo: "",
      Title: "",
      FirstName: "",
      MiddleName: "",
      SurName: "",
      Gender: "",
      AliasName: "",
      DOB: "",
      Age: "",
      Email: "",
      BloodGroup: "",
      Occupation: "",
      Religion: "",
      Nationality: "",
      UniqueIdType: "",
      UniqueIdNo: "",
      CaseSheetNo: "",

      VisitPurpose: "",

      Specialization: "",
      DoctorName: "",
      Complaint: "",
      PatientType: "General",
      PatientCategory: "General",
      InsuranceName: "",
      InsuranceType: "",
      ClientName: "",
      ClientType: "Self",
      ClientEmployeeId: "",
      ClientEmployeeDesignation: "",
      ClientEmployeeRelation: "",
      EmployeeId: "",
      EmployeeRelation: "",
      DoctorId: "",
      DoctorRelation: "",
      DonationType: "",
      IsMLC: "No",
      Flagging: 1,
      IsReferral: "No",

      ReferralSource: "",
      ReferredBy: "",
      RouteNo: "",
      RouteName: "",
      TehsilName: "",
      VillageName: "",

      DrInchargeAtTimeOfAdmission: "",
      NextToKinName: "",
      Relation: "",
      RelativePhoneNo: "",
      PersonLiableForBillPayment: "",
      FamilyHead: "Yes",
      FamilyHeadName: "",
      IpKitGiven: "No",

      DoorNo: "",
      Street: "",
      Area: "",
      City: "",
      State: "",
      Country: "",
      Pincode: "",

      Building: null,
      Block: null,
      Floor: null,
      WardType: null,
      RoomType: null,
      RoomNo: null,
      BedNo: null,
      RoomId: null,
    }));
    setRoomdeditalsShow({
      Building: "",
      Block: "",
      Floor: "",
      WardType: "",
      RoomType: "",
      RoomNo: "",
      BedNo: "",
      RoomId: "",
    });
    setErrors({});
  };

  console.log("RegisterData", RegisterData);

  const formatLabel = (label) => {
    if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
      return label
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (str) => str.toUpperCase());
    } else {
      return label;
    }
  };

  const [FavouritesNames, setFavouritesNames] = useState({
    TestName: "",
    id: "",
  });
  console.log("FavouritesNames", FavouritesNames);
  const [activetestnames, setActivetestnames] = useState([]);

  const handleFavouritesOnchange = (e) => {
    const { name, value } = e.target;

    // Find the selected item based on the Test_Name value
    const selectedItem = activetestnames.find(
      (item) => item.Test_Name === value
    );

    setFavouritesNames({
      ...FavouritesNames,
      [name]: value, // Keep the selected name in the input field
      id: selectedItem ? selectedItem.id : "", // Store the corresponding ID
    });
  };

  const [FavouriteNamess, setFavouriteNamess] = useState([]);
  console.log("FavouriteNamess", FavouriteNamess);
  const handleAddFavourite = () => {
    // Find the selected test from activetestnames based on the TestName in FavouritesNames
    const selectedTest = activetestnames.find(
      (test) => test.Test_Name === FavouritesNames.TestName
    );

    if (selectedTest) {
      // Check if the test is already in FavouriteNamess by comparing the TestCode (id)
      const isDuplicate = FavouriteNamess.some(
        (favourite) => favourite.TestCode === selectedTest.id
      );

      if (isDuplicate) {
        // Show warning if the test is already added
        const tdata = {
          message: "Test already added",
          type: "warn",
        };
        dispatchvalue({ type: "toast", value: tdata });
      } else {
        // Calculate the new index based on the current length of FavouriteNamess array
        const newIndex = FavouriteNamess.length + 1;

        // Create a new favourite test object with id, TestName, and index
        const newFavourite = {
          id: newIndex, // The new index
          TestCode: selectedTest.id,
          TestName: selectedTest.Test_Name,
        };

        // Add the new favourite test to the FavouriteNamess state
        setFavouriteNamess((prev) => [...prev, newFavourite]);

        // Clear the TestName field in FavouritesNames
        setFavouritesNames((prevState) => ({
          ...prevState,
          TestName: "",
        }));

        // Show success message
        const tdata = {
          message: "Test added successfully",
          type: "success",
        };
        dispatchvalue({ type: "toast", value: tdata });
      }
    } else {
      // If the test is not found, show a warning message
      const tdata = {
        message: "Invalid test name",
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  };

  useEffect(() => {
    axios
      .get(`${UrlLink}Masters/Test_Names_link_LabTest`)
      .then((response) => {
        console.log("testname", response.data);
        setActivetestnames(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [UrlLink]);

  const handleRemoveFavourite = (row) => {
    console.log("params", row);

    // Remove the selected test based on TestCode
    const updatedFavourites = FavouriteNamess.filter(
      (favourite) => favourite.TestCode !== row.TestCode
    );

    // Re-index the remaining favorites
    const reindexedFavourites = updatedFavourites.map((favourite, index) => ({
      ...favourite,
      id: index + 1, // New index starts from 1
    }));

    // Update the state with the re-indexed array
    setFavouriteNamess(reindexedFavourites);

    // Show success message
    const tdata = {
      message: "Test removed successfully",
      type: "success",
    };
    dispatchvalue({ type: "toast", value: tdata });
  };

  const ExteranlColumns = [
    {
      key: "id",
      name: "S.No",
      frozen: true,
    },
    {
      key: "TestName",
      name: "TestName",
    },
    {
      key: "Action",
      name: "Action",
      renderCell: (params) => (
        <Button
          className="cell_btn"
          onClick={() => handleRemoveFavourite(params.row)}
        >
          <FaTrash className="check_box_clrr_cancell" />
        </Button>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          specializationResponse,
          referralDoctorResponse,
          EmployeeResponse,
          DoctorResponse,
          FlaggData,
          ReligionData,
          AllDoctorData,
          Insurancedata,
          ClientData,
          DonationData,
        ] = await Promise.all([
          axios.get(`${UrlLink}Masters/Speciality_Detials_link`),
          axios.get(`${UrlLink}Masters/get_referral_doctor_Name_Detials`),
          axios.get(`${UrlLink}Frontoffice/get_Employee_by_PatientCategory`),
          axios.get(`${UrlLink}Frontoffice/get_DoctorId_by_PatientCategory`),
          axios.get(`${UrlLink}Masters/Flagg_color_Detials_link`),
          axios.get(`${UrlLink}Masters/Relegion_Master_link`),
          axios.get(`${UrlLink}Masters/get_All_doctor_Name_Detials`),
          axios.get(`${UrlLink}Masters/get_insurance_data_registration`),
          axios.get(`${UrlLink}Masters/get_client_data_registration`),
          axios.get(`${UrlLink}Masters/get_donation_data_registration`),
        ]);

        setSpecializationData(
          Array.isArray(specializationResponse.data)
            ? specializationResponse.data
            : []
        );
        setReferralDoctorData(
          Array.isArray(referralDoctorResponse.data)
            ? referralDoctorResponse.data
            : []
        );
        setEmployeeData(
          Array.isArray(EmployeeResponse.data) ? EmployeeResponse.data : []
        );
        setDoctorIdData(
          Array.isArray(DoctorResponse.data) ? DoctorResponse.data : []
        );
        setFlaggData(Array.isArray(FlaggData.data) ? FlaggData.data : []);
        setReligionData(
          Array.isArray(ReligionData.data) ? ReligionData.data : []
        );
        setAllDoctorData(
          Array.isArray(AllDoctorData.data) ? AllDoctorData.data : []
        );
        setInsuranceData(
          Array.isArray(Insurancedata.data) ? Insurancedata.data : []
        );
        setClientData(Array.isArray(ClientData.data) ? ClientData.data : []);
        setDonationData(
          Array.isArray(DonationData.data) ? DonationData.data : []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [UrlLink]);

  useEffect(() => {
    const fetchdat = async () => {
      const postdata = {
        LocationId: UserData?.location,
        Date: formatDate(new Date()),
        Speciality: RegisterData.Specialization,
      };
      console.log("Doctrrrrr", postdata);

      try {
        const response = await axios.get(
          `${UrlLink}Frontoffice/get_available_doctor_by_speciality`,
          { params: postdata }
        );

        setDoctorData(response.data);
        console.log("Doctrrrrr", response.data);
      } catch (error) {
        setDoctorData([]);
        console.error("Error fetching referral doctors:", error);
      }
    };
    if (RegisterData.Specialization) {
      fetchdat();
    }
  }, [UrlLink, UserData.location, RegisterData.Specialization]);

  useEffect(() => {
    if (Object.keys(Registeredit).length === 0) {
      const postdata = {
        PatientId: RegisterData.PatientId,
        PhoneNo: RegisterData.PhoneNo,
        FirstName: RegisterData.FirstName,
        DoctorId: RegisterData.DoctorName,
      };
      console.log("PosttttDDDD", postdata);

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
              console.log("Vissssss", res.data);

              setRegisterData((prev) => ({
                ...prev,
                VisitPurpose: visit,
              }));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [
    UrlLink,
    Registeredit,
    RegisterData.PatientId,
    RegisterData.PhoneNo,
    RegisterData.FirstName,
    RegisterData.DoctorName,
  ]);

  const HandlesearchPatient = (value) => {
    const exist = FilterbyPatientId.find((f) => f.PatientId === value);
    if (!!!exist) {
      const tdata = {
        message: "Please enter a valid Patient Id",
        type: "warn",
      };

      dispatchvalue({ type: "toast", value: tdata });
    } else {
      axios
        .get(
          `${UrlLink}Frontoffice/get_Patient_Details_by_patientId?PatientId=${value}`
        )
        .then((res) => {
          const { PatientProfile, ...resss } = res.data;
          console.log(resss);
          setpatientPhoto(PatientProfile);
          setRegisterData((prev) => ({
            ...prev,
            ...resss,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const handleResize = debounce(() => {
      if (gridRef.current) {
        const { clientWidth } = gridRef.current;
        const updatedclientWidth = clientWidth - 20;

        const items = document.querySelectorAll(".RegisForm_1");
        let totalWidth = 0;
        let currentRowItemsCount = 0;

        items.forEach((item) => {
          const itemStyles = getComputedStyle(item);
          const itemWidth =
            item.offsetWidth +
            parseFloat(itemStyles.marginLeft) +
            parseFloat(itemStyles.marginRight);

          if (totalWidth + itemWidth <= updatedclientWidth) {
            totalWidth += itemWidth;
            currentRowItemsCount++;
          }
        });
        const remainingGap = updatedclientWidth - totalWidth;
        const gapBetweenItems = Math.floor(remainingGap / currentRowItemsCount);
        const container = document.getElementById("RegisFormcon_11");

        if (updatedclientWidth > 800) {
          container.style.justifyContent = "flex-start";
          container.style.columnGap = `${
            gapBetweenItems === 0 ? 5 : gapBetweenItems
          }px`;
        } else {
          container.style.justifyContent = "center";
          container.style.columnGap = `10px`;
        }
      }
    }, 100); // Adjust the debounce delay as needed

    const currentGridRef = gridRef.current;
    const resizeObserver = new ResizeObserver(handleResize);
    if (currentGridRef) {
      resizeObserver.observe(currentGridRef);
    }
    return () => {
      if (currentGridRef) {
        resizeObserver.unobserve(currentGridRef);
      }
      resizeObserver.disconnect();
    };
  }, []);

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

  const onImageChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      let formattedValue = files[0];

      // Optional: Add validation for file type and size
      const allowedTypes = ["image/jpeg", "image/png"]; // Example allowed types
      const maxSize = 5 * 1024 * 1024; // Example max size of 5MB

      if (!allowedTypes.includes(formattedValue.type)) {
        // Dispatch a warning toast or handle file type validation
        const tdata = {
          message: "Invalid file type. Please upload a JPEG or PNG file.",
          type: "warn",
        };
        dispatchvalue({ type: "toast", value: tdata });
        setpatientPhoto(null);
      } else if (formattedValue.size > maxSize) {
        // Dispatch a warning toast or handle file size validation
        const tdata = {
          message: "File size exceeds the limit of 5MB.",
          type: "warn",
        };
        dispatchvalue({ type: "toast", value: tdata });
        setpatientPhoto(null);
      } else {
        // Optional: If you want to convert the file to a data URL and dispatch it
        const reader = new FileReader();
        reader.onload = () => {
          setpatientPhoto(reader.result);
        };
        reader.readAsDataURL(formattedValue);
      }
    } else {
      // Handle case where no file is selected
      const tdata = {
        message: "No file selected. Please choose a file to upload.",
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
      setpatientPhoto(null);
    }
  };

  const HandleOnchange = async (e) => {
    const { name, value, pattern } = e.target;

    const formattedValue = [
      "FirstName",
      "MiddleName",
      "SurName",
      "AliasName",
      "Occupation",
      "NextToKinName",
      "FamilyHeadName",
      "Street",
      "Area",
      "City",
      "State",
      "Country",
    ].includes(name)
      ? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
      : value;

    // Check length for specific fields
    if (
      [
        "InsuranceName",
        "ClientName",
        "FirstName",
        "MiddleName",
        "AliasName",
        "SurName",
        "Occupation",
        "NextToKinName",
        "FamilyHeadName",
        "Street",
        "Area",
        "City",
        "State",
        "Country",
        "UniqueIdNo",
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

    if (name === "PatientId") {
      setRegisterData((prev) => ({
        ...prev,
        IsConsciousness: "Yes",
        [name]: value,
        PhoneNo: "",
        Title: "",
        FirstName: "",
        MiddleName: "",
        SurName: "",
        Gender: "",
        AliasName: "",
        DOB: "",
        Age: "",
        Email: "",
        BloodGroup: "",
        Occupation: "",
        Religion: "",
        Nationality: "",
        UniqueIdType: "",
        UniqueIdNo: "",
        CaseSheetNo: "",

        VisitPurpose: "",

        Specialization: "",
        DoctorName: "",
        Complaint: "",
        PatientType: "General",
        PatientCategory: "General",
        InsuranceName: "",
        InsuranceType: "",
        ClientName: "",
        ClientType: "Self",
        ClientEmployeeId: "",
        ClientEmployeeDesignation: "",
        ClientEmployeeRelation: "",
        EmployeeId: "",
        EmployeeRelation: "",
        DoctorId: "",
        DoctorRelation: "",
        DonationType: "",
        IsMLC: "No",
        Flagging: 1,
        IsReferral: "No",

        ReferralSource: "",
        ReferredBy: "",
        RouteNo: "",
        RouteName: "",
        TehsilName: "",
        VillageName: "",

        DrInchargeAtTimeOfAdmission: "",
        NextToKinName: "",
        Relation: "",
        RelativePhoneNo: "",
        PersonLiableForBillPayment: "",
        FamilyHead: "Yes",
        FamilyHeadName: "",
        IpKitGiven: "No",

        DoorNo: "",
        Street: "",
        Area: "",
        City: "",
        State: "",
        Country: "",
        Pincode: "",

        Building: null,
        Block: null,
        Floor: null,
        WardType: null,
        RoomType: null,
        RoomNo: null,
        BedNo: null,
        RoomId: null,
      }));
    } else if (name === "PhoneNo" || name === "RelativePhoneNo") {
      if (formattedValue.includes("|")) {
        const convert = formattedValue.split(" | ");
        console.log(convert);

        if (convert.length <= 10) {
          setRegisterData((prev) => ({
            ...prev,
            [name]: convert[2].trim(),
            PatientId: convert[0].trim(),
            FirstName: convert[1].trim(),
          }));
        }
      } else {
        if (formattedValue.length <= 10) {
          setRegisterData((prev) => ({
            ...prev,
            [name]: formattedValue,
          }));
        }
      }
    } else if (name === "FirstName") {
      if (formattedValue.includes("|")) {
        const convert = formattedValue.split(" | ");

        setRegisterData((prev) => ({
          ...prev,
          [name]: convert[1].trim(),
          PatientId: convert[0].trim(),
          PhoneNo: convert[2].trim(),
        }));
      } else {
        setRegisterData((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));
      }
    } else if (name === "Title") {
      setRegisterData((prev) => ({
        ...prev,
        [name]: formattedValue,
        Gender: ["Miss", "Ms", "Mrs"].includes(value)
          ? "Female"
          : ["Mr", "Master", "Baby"].includes(value)
          ? "Male"
          : "TransGender",
      }));
    } else if (name === "DOB") {
      const currentdate = new Date();
      // Calculate the minimum allowed date (100 years before current date)
      const minAllowedDate = subYears(currentdate, 100);
      const selectedDate = new Date(value);

      if (
        isBefore(minAllowedDate, selectedDate) &&
        isBefore(selectedDate, currentdate)
      ) {
        const age = differenceInYears(currentdate, selectedDate);

        setRegisterData((prevFormData) => ({
          ...prevFormData,
          [name]: formattedValue,
          Age: age,
        }));
      } else {
        setRegisterData((prevFormData) => ({
          ...prevFormData,
          [name]: formattedValue,
          Age: "",
        }));
      }
    } else if (name === "Age") {
      if (formattedValue) {
        if (!isNaN(formattedValue) && formattedValue.length <= 3) {
          // Get the current date
          const currentDate = new Date();

          // Calculate the year to subtract
          const targetYear = subYears(currentDate, formattedValue);

          // Create a date for January 1st of the target year
          const dob = startOfYear(targetYear);

          // Format the DOB
          const formattedDOB = format(dob, "yyyy-MM-dd");
          setRegisterData((prev) => ({
            ...prev,
            [name]: formattedValue,
            DOB: format(formattedDOB, "yyyy-MM-dd"),
          }));
        }
      } else {
        setRegisterData((prev) => ({
          ...prev,
          [name]: formattedValue,
          DOB: "",
        }));
      }
    } else if (name === "ReferredBy") {
      try {
        const response = await axios.get(
          `${UrlLink}Masters/get_route_details?DoctorId=${value}`
        );
        const route = response.data;

        if (route) {
          setRegisterData((prevState) => ({
            ...prevState,
            [name]: formattedValue,
            RouteNo: route.RouteNo,
            RouteName: route.RouteName,
            TehsilName: route.TehsilName,
            VillageName: route.VillageName,
          }));
        } else {
          setRegisterData((prevState) => ({
            ...prevState,
            [name]: formattedValue,
            RouteNo: "",
            RouteName: "",
            TehsilName: "",
            VillageName: "",
          }));
        }
      } catch (error) {
        console.error("Error fetching route details:", error);
        setRegisterData((prevState) => ({
          ...prevState,
          [name]: formattedValue,
          RouteNo: "",
          RouteName: "",
          TehsilName: "",
          VillageName: "",
        }));
      }
    } else if (name === "Specialization") {
      setRegisterData((prev) => ({
        ...prev,
        [name]: formattedValue,
        DoctorName: "",
      }));
    } else if (name === "DoctorName") {
      setRegisterData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));

      // Filter for the selected doctor based on the doctor_id
      const doctor_list = DoctorData.find(
        (doc) => doc.doctor_id === formattedValue
      );

      // Check if the doctor was found
      if (doctor_list) {
        const doctor_schedule = doctor_list.schedule?.[0]; // Access the first schedule in the doctor's schedule list
        console.log("RequestedSchedule", doctor_schedule);

        if (doctor_schedule?.working === "yes") {
          const currentTime = new Date();

          // Single Shift
          if (doctor_schedule?.shift === "Single") {
            const startTime = doctor_schedule.starting_time;
            const endTime = doctor_schedule.ending_time;

            // Convert schedule times to Date objects
            const startTimeDate = new Date(`1970-01-01T${startTime}Z`);
            const endTimeDate = new Date(`1970-01-01T${endTime}Z`);

            // Check if the current time is within the available time
            if (currentTime >= startTimeDate && currentTime <= endTimeDate) {
              const tdata = {
                message: `The Doctor is currently Available`,
                type: "success",
              };
              dispatchvalue({ type: "toast", value: tdata });
            } else {
              const tdata = {
                message: `The Doctor is not Available at this time, Available from ${startTime} to ${endTime}`,
                type: "warn",
              };
              dispatchvalue({ type: "toast", value: tdata });
            }
          }

          // Double Shift
          else if (doctor_schedule?.shift === "Double") {
            const startTime_f = doctor_schedule.starting_time_f;
            const endTime_f = doctor_schedule.ending_time_f;
            const startTime_a = doctor_schedule.starting_time_a;
            const endTime_a = doctor_schedule.ending_time_a;

            // Convert schedule times to Date objects
            const startTimeDate_f = new Date(`1970-01-01T${startTime_f}Z`);
            const endTimeDate_f = new Date(`1970-01-01T${endTime_f}Z`);
            const startTimeDate_a = new Date(`1970-01-01T${startTime_a}Z`);
            const endTimeDate_a = new Date(`1970-01-01T${endTime_a}Z`);

            // Check if the current time falls within either shift (forenoon or afternoon)
            if (
              (currentTime >= startTimeDate_f &&
                currentTime <= endTimeDate_f) ||
              (currentTime >= startTimeDate_a && currentTime <= endTimeDate_a)
            ) {
              const tdata = {
                message: `The Doctor is currently Available`,
                type: "success",
              };
              dispatchvalue({ type: "toast", value: tdata });
            } else {
              const tdata = {
                message: `The Doctor is not Available at this time, Available in FN: ${startTime_f} to ${endTime_f} or AN: ${startTime_a} to ${endTime_a}`,
                type: "warn",
              };
              dispatchvalue({ type: "toast", value: tdata });
            }
          }
        }
      } else {
        const tdata = {
          message: "Doctor not found",
          type: "error",
        };
        dispatchvalue({ type: "toast", value: tdata });
      }
    } else if (name === "UniqueIdNo") {
      setRegisterData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));

      axios
        .get(
          `${UrlLink}Frontoffice/get_unique_id_no_validation?UniqueIdNo=${formattedValue}`
        )
        .then((reponse) => {
          let data = reponse.data;
          console.log("ressss", data);
          if (data && data.error) {
            // Show a toast if the unique ID already exists
            const tdata = {
              message: data.error,
              type: "warn", // Assuming you want to show a warning toast
            };
            dispatchvalue({ type: "toast", value: tdata });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setRegisterData((prev) => ({
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
  const handlesubmit = () => {
    setLoading(true);
    scrollToElement("RegisFormcon_11");

    // List of required fields

    let requiredFields = [...FilteredFormdata, ...FilteredFormdataAddress];

    if (AppointmentRegisType === "IP" || AppointmentRegisType === "Casuality") {
      requiredFields = [
        ...FilteredFormdata,
        ...FilteredFormdataAddress,
        ...FilteredFormdataIpRoomDetials,
      ];
    }

    let missingFields = [];

    // Identify missing fields (excluding 'PatientId')
    requiredFields
      .filter((field) => field !== "PatientId" && field !== "Age")
      .forEach((field) => {
        if (!RegisterData[field]) {
          missingFields.push(formatLabel(field)); // Assuming formatLabel is a function to format field names for display
        }
      });

    let filtereddata = [];

    // Apply additional filtering for Casuality type when patient is unconscious
    if (
      RegisterData.IsConsciousness === "No" &&
      AppointmentRegisType === "Casuality"
    ) {
      filtereddata = missingFields.filter((field) =>
        [
          "Building",
          "Block",
          "Floor",
          "Ward Type",
          "Room Type",
          "Room No",
          "Bed No",
          "Room Id",
        ].includes(field)
      );
    } else {
      filtereddata = [...missingFields];
    }

    if (AppointmentRegisType === "Laboratory" && FavouriteNamess.length === 0) {
      setLoading(false);
      const tdata = {
        message: "Please add at least one Test.",
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
      return; // Exit the function early if the array is empty
    }

    // If any required fields are missing, show a warning
    if (filtereddata.length > 0) {
      setLoading(false);
      const tdata = {
        message: `Please fill out the required fields: ${filtereddata.join(
          ", "
        )}`,
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    } else {
      const exist = Object.keys(errors).filter((p) => errors[p] === "Invalid");
      if (exist.length > 0) {
        setLoading(false);
        const tdata = {
          message: `please fill the field required pattern  :  ${exist.join(
            ","
          )}`,
          type: "warn",
        };
        dispatchvalue({ type: "toast", value: tdata });
      } else {
        const submitdata = {
          ...RegisterData,
          PatientPhoto: patientPhoto,
          Created_by: UserData?.username,
          RegisterType: AppointmentRegisType,
          RegisterId: Registeredit?.conversion
            ? null
            : Registeredit?.RegistrationId,
          optoip_id: Registeredit?.conversion
            ? Registeredit?.RegistrationId
            : null,
          Location: UserData?.location,
          apptoreg: Registeredit?.appconversion ? Registeredit?.id : "",
          TestNames: FavouriteNamess || [],
        };
        console.log("datatosend", submitdata);

        axios
          .post(`${UrlLink}Frontoffice/Patient_Registration, submitdata`)
          .then((res) => {
            setLoading(false);
            console.log(res.data);
            const resres = res.data;
            let typp = Object.keys(resres)[0];
            let mess = Object.values(resres)[0];
            const tdata = {
              message: mess,
              type: typp,
            };
            dispatchvalue({ type: "toast", value: tdata });
            // clearRegisterdata();
            setFavouriteNamess([]);
            dispatchvalue({ type: "Registeredit", value: {} });
            if (typp === "success") {
              navigate("/Home/RegistrationList");
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    let fdata = Object.keys(RegisterData).filter(
      (p) =>
        ![
          "IsConsciousness",
          "AliasName",
          "DoorNo",
          "Street",
          "Area",
          "City",
          "State",
          "Country",
          "Pincode",
          "PatientProfile",
          "InsuranceName",
          "InsuranceType",
          "ClientName",
          "ClientType",
          "VisitPurpose",
          "Specialization",
          "DoctorName",
          "EmployeeId",
          "EmployeeDesignation",
          "ClientEmployeeId",
          "ClientEmployeeDesignation",
          "ClientEmployeeRelation",
          "EmployeeRelation",
          "DoctorId",
          "DoctorRelation",
          "DonationType",
          "ReferralSource",
          "ReferredBy",
          "RouteNo",
          "RouteName",
          "TehsilName",
          "VillageName",
          "AdmissionPurpose",
          "DrInchargeAtTimeOfAdmission",
          "NextToKinName",
          "InsuranceType",
          "Relation",
          "RelativePhoneNo",
          "PersonLiableForBillPayment",
          "FamilyHead",
          "FamilyHeadName",
          "IpKitGiven",
          "Building",
          "Block",
          "Floor",
          "WardType",
          "RoomType",
          "RoomNo",
          "BedNo",
          "RoomId",
        ].includes(p)
    );

    if (RegisterData.Title === "Mrs" && RegisterData.Gender === "Female") {
      const categoryIndex = fdata.indexOf("Gender");
      fdata.splice(categoryIndex + 1, 0, "AliasName");
    }
    if (RegisterData.PatientCategory === "Insurance") {
      const categoryIndex = fdata.indexOf("PatientCategory");
      fdata.splice(categoryIndex + 1, 0, "InsuranceName", "InsuranceType");
    }
    if (RegisterData.PatientCategory === "Client") {
      const categoryIndex = fdata.indexOf("PatientCategory");
      fdata.splice(categoryIndex + 1, 0, "ClientName", "ClientType");
    }
    if (
      RegisterData.ClientType === "Self" &&
      RegisterData.PatientCategory === "Client"
    ) {
      const categoryIndex = fdata.indexOf("ClientType");
      fdata.splice(
        categoryIndex + 1,
        0,
        "ClientEmployeeId",
        "ClientEmployeeDesignation"
      );
    }
    if (
      RegisterData.ClientType === "Relative" &&
      RegisterData.PatientCategory === "Client"
    ) {
      const categoryIndex = fdata.indexOf("ClientType");
      fdata.splice(
        categoryIndex + 1,
        0,
        "ClientEmployeeId",
        "ClientEmployeeDesignation",
        "ClientEmployeeRelation"
      );
    }
    if (RegisterData.PatientCategory === "Employee") {
      const categoryIndex = fdata.indexOf("PatientCategory");
      fdata.splice(categoryIndex + 1, 0, "EmployeeId");
    }
    if (RegisterData.PatientCategory === "EmployeeRelation") {
      const categoryIndex = fdata.indexOf("PatientCategory");
      fdata.splice(categoryIndex + 1, 0, "EmployeeId", "EmployeeRelation");
    }
    if (RegisterData.PatientCategory === "Doctor") {
      const categoryIndex = fdata.indexOf("PatientCategory");
      fdata.splice(categoryIndex + 1, 0, "DoctorId");
    }
    if (RegisterData.PatientCategory === "DoctorRelation") {
      const categoryIndex = fdata.indexOf("PatientCategory");
      fdata.splice(categoryIndex + 1, 0, "DoctorId", "DoctorRelation");
    }
    if (RegisterData.PatientCategory === "Donation") {
      const categoryIndex = fdata.indexOf("PatientCategory");
      fdata.splice(categoryIndex + 1, 0, "DonationType");
    }
    if (AppointmentRegisType === "OP") {
      const categoryIndex = fdata.indexOf("CaseSheetNo");
      fdata.splice(categoryIndex + 1, 0, "VisitPurpose");
      fdata.splice(categoryIndex + 2, 0, "Specialization", "DoctorName");
    }

    if (AppointmentRegisType !== "OP") {
      const categoryIndex = fdata.indexOf("CaseSheetNo");
      fdata.splice(categoryIndex + 1, 0, "Specialization", "DoctorName");
    }
    if (AppointmentRegisType === "Casuality") {
      fdata.unshift("IsConsciousness");
    }

    setFilteredFormdata(fdata);

    let Addressdata = Object.keys(RegisterData).filter((p) =>
      [
        "DoorNo",
        "Street",
        "Area",
        "City",
        "State",
        "Country",
        "Pincode",
      ].includes(p)
    );
    setFilteredFormdataAddress(Addressdata);

    let routedata = Object.keys(RegisterData).filter((p) =>
      [
        "ReferralSource",
        "ReferredBy",
        "RouteNo",
        "RouteName",
        "TehsilName",
        "VillageName",
      ].includes(p)
    );
    setFilteredFormdataRoute(routedata);

    let roomdata = Object.keys(RegisterData).filter((p) =>
      [
        "Building",
        "Block",
        "Floor",
        "WardType",
        "RoomType",
        "RoomNo",
        "BedNo",
      ].includes(p)
    );
    setFilteredFormdataIpRoomDetials(roomdata);

    let Ipdetialdata = Object.keys(RegisterData).filter((p) =>
      [
        "AdmissionPurpose",
        "DrInchargeAtTimeOfAdmission",
        "NextToKinName",
        "Relation",
        "RelativePhoneNo",
        "PersonLiableForBillPayment",
        "FamilyHead",
        "IpKitGiven",
      ].includes(p)
    );
    if (RegisterData.FamilyHead === "No") {
      const categoryIndex = Ipdetialdata.indexOf("FamilyHead");
      Ipdetialdata.splice(categoryIndex + 1, 0, "FamilyHeadName");
    }
    setFilteredFormdataIpDetials(Ipdetialdata);
  }, [
    RegisterData,
    RegisterData.FamilyHead,
    RegisterData.Title,
    RegisterData.Gender,
    RegisterData.Specialization,
    SpecializationData,
    AppointmentRegisType,
  ]);

  // useEffect(() => {
  //   if (UserData && UserData.location && selectedDoctor && TodayDate) {
  //     axios
  //       .get(`${UrlLink}Frontoffice/calender_modal_display_data_by_day`, {
  //         params: {
  //           DoctorId: selectedDoctor,
  //           LocationId: UserData.location,
  //           Date: TodayDate,
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
  // }, [UrlLink, UserData, UserData.location, selectedDoctor,TodayDate]);

  useEffect(() => {
    if (Registeredit && Object.keys(Registeredit).length !== 0) {
      setAppointmentRegisType(Registeredit?.Type);
      if (Registeredit?.conversion) {
        axios
          .get(
            `${UrlLink}Frontoffice/get_Patient_Details_by_patientId?PatientId=${Registeredit?.PatientId}`
          )
          .then((res) => {
            const { PatientProfile, ...resss } = res.data;
            console.log(resss);
            setpatientPhoto(PatientProfile);
            setRegisterData((prev) => ({
              ...prev,
              ...resss,
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (Registeredit?.appconversion) {
        axios
          .get(
            `${UrlLink}Frontoffice/get_Patient_Details_by_patientId?FirstName=${Registeredit?.FirstName}&PhoneNumber=${Registeredit?.PhoneNumber}`
          )
          .then((res) => {
            if (res.data?.warn) {
              setRegisterData((prev) => ({
                ...prev,
                DoctorName: Registeredit?.DoctorID,
                Specialization: Registeredit?.SpecializationId,
                Title: Registeredit?.Title,
                FirstName: Registeredit?.FirstName,
                MiddleName: Registeredit?.MiddleName,
                SurName: Registeredit?.LastName,
                PhoneNo: Registeredit?.PhoneNumber,
                Email: Registeredit?.Email,
                VisitPurpose: Registeredit?.VisitPurpose,
              }));
            } else {
              const { PatientProfile, ...resss } = res.data;

              console.log(resss);
              setpatientPhoto(PatientProfile);

              setRegisterData((prev) => ({
                ...prev,
                ...resss,
                DoctorName: Registeredit?.DoctorID,
                Specialization: Registeredit?.SpecializationId,
                VisitPurpose: Registeredit?.VisitPurpose,
              }));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get(`${UrlLink}Frontoffice/get_Registration_edit_details`, {
            params: {
              RegistrationId: Registeredit?.RegistrationId || "",
              RegistrationType: Registeredit?.Type || "",
            },
          })
          .then((response) => {
            const resdata = response.data;
            const {
              BuildingName,
              BlockName,
              FloorName,
              WardTypeName,
              RoomTypeName,
              PatientProfile,
              ...res
            } = resdata;
            setRoomdeditalsShow({
              Building: BuildingName,
              Block: BlockName,
              Floor: FloorName,
              WardType: WardTypeName,
              RoomType: RoomTypeName,
              RoomNo: res.RoomNo,
              BedNo: res.BedNo,
              RoomId: res.RoomId,
            });
            setpatientPhoto(PatientProfile);
            setRegisterData((prev) => ({
              ...prev,
              IsConsciousness: res?.IsConsciousness || "Yes",
              PatientId: res.PatientId || "",
              PhoneNo: res.PhoneNo || "",
              Title: res.Title || "",
              FirstName: res.FirstName || "",
              MiddleName: res.MiddleName || "",
              SurName: res.SurName || "",
              Gender: res.Gender || "",
              AliasName: res.AliasName || "",
              DOB: res.DOB || "",
              Age: res.Age || "",
              Email: res.Email || "",
              BloodGroup: res.BloodGroup || "",
              Occupation: res.Occupation || "",
              Religion: res.Religion || "",
              Nationality: res.Nationality || "",
              UniqueIdType: res.UniqueIdType || "",
              UniqueIdNo: res.UniqueIdNo || "",
              CaseSheetNo: res.CaseSheetNo || "",

              VisitPurpose: res.VisitPurpose || "",

              Specialization: res.Specialization || "",
              DoctorName: res.DoctorName || "",
              Complaint: res.Complaint || "",
              PatientType: res.PatientType || "General",
              PatientCategory: res.PatientCategory || "General",
              InsuranceName: res.InsuranceName || "",
              InsuranceType: res.InsuranceType || "",
              ClientName: res.ClientName || "",
              ClientType: res.ClientType || "",
              ClientEmployeeId: res.ClientEmployeeId || "",
              ClientEmployeeDesignation: res.ClientEmployeeDesignation || "",
              ClientEmployeeRelation: res.ClientEmployeeRelation || "",
              EmployeeId: res.EmployeeId || "",
              EmployeeRelation: res.EmployeeRelation || "",
              DoctorId: res.DoctorId || "",
              DoctorRelation: res.DoctorRelation || "",
              DonationType: res.DonationType || "",
              IsMLC: res.IsMLC || "",
              Flagging: res.Flagging || 1,
              IsReferral: res.IsReferal || "",

              ReferralSource: res.ReferralSource || "",
              ReferredBy: res.ReferredBy || "",
              RouteNo: res.RouteNo || "",
              RouteName: res.RouteName || "",
              TehsilName: res.TehsilName || "",
              VillageName: res.VillageName || "",

              DrInchargeAtTimeOfAdmission:
                res.DrInchargeAtTimeOfAdmission || "",
              NextToKinName: res.NextToKinName || "",
              Relation: res.Relation || "",
              RelativePhoneNo: res.RelativePhoneNo || "",
              PersonLiableForBillPayment: res.PersonLiableForBillPayment || "",
              FamilyHead: res.FamilyHead || "",
              FamilyHeadName: res.FamilyHeadName || "",
              IpKitGiven: res.IpKitGiven || "",

              DoorNo: res.DoorNo || "",
              Street: res.Street || "",
              Area: res.Area || "",
              City: res.City || "",
              State: res.State || "",
              Country: res.Country || "",
              Pincode: res.Pincode || "",

              Building: res.Building || "",
              Block: res.Block || "",
              Floor: res.Floor || "",
              WardType: res.WardType || "",
              RoomType: res.RoomType || "",
              RoomNo: res.RoomNo || "",
              BedNo: res.BedNo || "",
              RoomId: res.RoomId || "",
            }));
          })
          .catch((e) => {
            console.error("Error fetching patient appointment details:", e);
          });
      }
    } else {
      clearRegisterdata();
    }
  }, [Registeredit, UrlLink]);
  useEffect(() => {
    if (Object.keys(SelectRoomRegister).length !== 0) {
      setRegisterData((prev) => ({
        ...prev,
        Building: SelectRoomRegister.BuildingId,
        Block: SelectRoomRegister.BlockId,
        Floor: SelectRoomRegister.FloorId,
        WardType: SelectRoomRegister.WardId,
        RoomType: SelectRoomRegister.RoomId,
        RoomNo: SelectRoomRegister.RoomNo,
        BedNo: SelectRoomRegister.BedNo,
        RoomId: SelectRoomRegister.id,
      }));
      setRoomdeditalsShow({
        Building: SelectRoomRegister.BuildingName,
        Block: SelectRoomRegister.BlockName,
        Floor: SelectRoomRegister.FloorName,
        WardType: SelectRoomRegister.WardName,
        RoomType: SelectRoomRegister.RoomName,
        RoomNo: SelectRoomRegister.RoomNo,
        BedNo: SelectRoomRegister.BedNo,
        RoomId: SelectRoomRegister.RoomId,
      });
    } else {
    }
  }, [SelectRoomRegister]);

  return (
    <>
      <div className="Main_container_app">
        <h3>Registration</h3>
        <div className="RegisterTypecon">
          <div className="RegisterType">
            {["OP", "IP", "Casuality", "Diagnosis", "Laboratory"]
              .filter((f) =>
                Object.keys(Registeredit).length !== 0
                  ? f === Registeredit?.Type
                  : f
              )
              .map((p, ind) => (
                <div className="registertypeval" key={ind}>
                  <input
                    type="radio"
                    id={p}
                    name="appointment_type"
                    checked={AppointmentRegisType === p}
                    onChange={(e) => {
                      setAppointmentRegisType(e.target.value);
                      clearRegisterdata();
                    }}
                    value={p}
                  />
                  <label htmlFor={p}>
                    {p === "OP"
                      ? "Out Patient (OP)"
                      : p === "IP"
                      ? "In Patient (IP)"
                      : p}
                  </label>
                </div>
              ))}
          </div>
        </div>
        <br />
        <div className="DivCenter_container">
          <div className="img_1">
            <div className="patient_profile_pic">
              {patientPhoto && <img src={patientPhoto} alt="Patient" />}
            </div>
            <input
              type="file"
              name="file"
              id="Filechoosen_Patient_profile"
              accept="image/png,image/jpeg"
              onChange={onImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="Filechoosen_Patient_profile" className="ImgBtn">
              Choose File
            </label>
          </div>
        </div>
        <br />
        <div className="RegisFormcon" id="RegisFormcon_11" ref={gridRef}>
          {FilteredFormdata &&
            FilteredFormdata.map((field, index) => (
              <div className="RegisForm_1" key={index}>
                <label htmlFor={`${field}_${index}`}>
                  {field === "ANCNumber"
                    ? "ANC Number"
                    : field === "MCTSNo"
                    ? "MCTS No"
                    : formatLabel(field)}
                  <span>:</span>
                </label>
                {[
                  "Title",
                  "Gender",
                  "BloodGroup",
                  "Religion",
                  "Nationality",
                  "UniqueIdType",
                  "Specialization",
                  "DoctorName",
                  "PatientType",
                  "PatientCategory",
                  "ColorFlag",
                  "ReferralSource",
                  "Flagging",
                  "InsuranceName",
                  "DonationType",
                  "InsuranceType",
                  "ClientName",
                  "ClientEmployeeRelation",
                  "EmployeeRelation",
                  "EmployeeId",
                  "EmployeeRelation",
                  "DoctorId",
                  "DoctorRelation",
                ].includes(field) ? (
                  <select
                    id={`${field}_${index}`}
                    name={field}
                    value={RegisterData[field]}
                    onChange={HandleOnchange}
                  >
                    <option value="">Select</option>
                    {field === "Title" &&
                      ["Miss", "Ms", "Mrs", "Mr", "Master", "Baby", "Mx"].map(
                        (row, indx) => (
                          <option key={indx} value={row}>
                            {row}
                          </option>
                        )
                      )}
                    {field === "Gender" &&
                      ["Male", "Female", "TransGender"].map((row, indx) => (
                        <option key={indx} value={row}>
                          {row}
                        </option>
                      ))}
                    {field === "BloodGroup" &&
                      [
                        "A+",
                        "A-",
                        "B+",
                        "B-",
                        "AB+",
                        "AB-",
                        "O+",
                        "O-",
                        "A1+",
                        "A1-",
                        "A1B+",
                        "A1B-",
                        "A2B",
                        "A2B-",
                        "A2+",
                        "A2-",
                        "INRA",
                        "Bombay Blood group",
                      ].map((row, indx) => (
                        <option key={indx} value={row}>
                          {row}
                        </option>
                      ))}
                    {field === "Religion" &&
                      ReligionData?.map((row, indx) => (
                        <option key={indx} value={row.id}>
                          {row.religion}
                        </option>
                      ))}
                    {field === "Nationality" &&
                      ["Indian", "International"].map((row, indx) => (
                        <option key={indx} value={row}>
                          {row}
                        </option>
                      ))}
                    {field === "UniqueIdType" && (
                      <>
                        {RegisterData.Nationality === "Indian" &&
                          ["Aadhar", "VoterId", "SmartCard"].map(
                            (row, indx) => (
                              <option key={indx} value={row}>
                                {row}
                              </option>
                            )
                          )}
                        {RegisterData.Nationality === "International" &&
                          ["DrivingLicence", "Passport"].map((row, indx) => (
                            <option key={indx} value={row}>
                              {row}
                            </option>
                          ))}
                      </>
                    )}
                    {field === "VisitPurpose" &&
                      ["NewConsultation", "FollowUp"].map((row, indx) => (
                        <option key={indx} value={row}>
                          {row}
                        </option>
                      ))}
                    {field === "Specialization" &&
                      SpecializationData?.filter(
                        (p) => p.Status === "Active"
                      )?.map((Catg, indx) => (
                        <option key={indx} value={Catg.id}>
                          {Catg.SpecialityName}
                        </option>
                      ))}
                    {field === "DoctorName" &&
                      DoctorData?.filter(
                        (p) => p.schedule?.[0]?.working === "yes"
                      ).map((row, indx) => (
                        <option key={indx} value={row.doctor_id}>
                          {row.doctor_name}
                        </option>
                      ))}
                    {field === "PatientType" &&
                      ["General", "VIP", "Govt"].map((row, indx) => (
                        <option key={indx} value={row}>
                          {row}
                        </option>
                      ))}
                    {field === "PatientCategory" &&
                      [
                        "General",
                        "Insurance",
                        "Client",
                        "Donation",
                        "Employee",
                        "EmployeeRelation",
                        "Doctor",
                        "DoctorRelation",
                      ].map((row, indx) => (
                        <option key={indx} value={row}>
                          {row}
                        </option>
                      ))}

                    {field === "ReferralSource" &&
                      ["Call", "Letter", "Oral"].map((row, indx) => (
                        <option key={indx} value={row}>
                          {formatLabel(row)}
                        </option>
                      ))}
                    {field === "Flagging" &&
                      FlaggData?.filter((p) => p.Status === "Active").map(
                        (row, indx) => (
                          <option
                            key={indx}
                            value={row.id}
                            style={{ backgroundColor: row.FlaggColor }}
                          >
                            {" "}
                            {row.FlaggName}
                          </option>
                        )
                      )}
                    {field === "InsuranceType" &&
                      ["Cashless", "Reimbursable"].map((row, indx) => (
                        <option key={indx} value={row}>
                          {row}
                        </option>
                      ))}

                    {[
                      "ClientEmployeeRelation",
                      "EmployeeRelation",
                      "DoctorRelation",
                    ].includes(field) &&
                      relationships?.map((row, indx) => (
                        <option key={indx} value={row}>
                          {row}
                        </option>
                      ))}

                    {["EmployeeId", "EmployeeRelation"].includes(field) &&
                      EmployeeData?.map((row, indx) => (
                        <option key={indx} value={row.id}>
                          {row.Name}
                        </option>
                      ))}

                    {["DoctorId", "DoctorRelation"].includes(field) &&
                      DoctorIdData?.filter(
                        (p) => p.id !== RegisterData.DoctorName
                      ).map((row, indx) => (
                        <option key={indx} value={row.id}>
                          {row.ShortName}
                        </option>
                      ))}
                    {field === "ClientName" &&
                      ClientData?.map((row, indx) => (
                        <option key={indx} value={row.id}>
                          {row.Name}
                        </option>
                      ))}
                    {field === "InsuranceName" &&
                      InsuranceData?.map((row, indx) => (
                        <option key={indx} value={row.id}>
                          {row?.Type === "MAIN"
                            ? `${row?.Name} - ${row?.Type}`
                            : `${row?.Name} - ${row?.Type} - ${row?.TPA_Name}`}
                        </option>
                      ))}
                    {field === "DonationType" &&
                      DonationData?.map((row, indx) => (
                        <option
                          key={indx}
                          value={row.id}
                        >{`${row?.Type} - ${row?.Name}`}</option>
                      ))}
                  </select>
                ) : ["PhoneNo", "FirstName", "PatientId"].includes(field) ? (
                  <div className="Search_patient_icons">
                    <input
                      id={`${field}_${index}`}
                      type={"text"}
                      onKeyDown={
                        field === "FirstName"
                          ? handleKeyDownText
                          : handleKeyDownPhoneNo
                      }
                      list={`${field}_iddd`}
                      autoComplete="off"
                      name={field}
                      pattern={field === "PhoneNo" ? "\\d{10}" : "[A-Za-z]+"}
                      className={
                        errors[field] === "Invalid"
                          ? "invalid"
                          : errors[field] === "Valid"
                          ? "valid"
                          : ""
                      }
                      readOnly={
                        field === "PatientId" &&
                        Object.keys(Registeredit).length !== 0
                      }
                      required={field !== "PatientId"}
                      value={RegisterData[field]}
                      onChange={HandleOnchange}
                    />
                    <datalist id={`${field}_iddd`}>
                      {field === "PatientId" &&
                        FilterbyPatientId.map((row, indx) => (
                          <option key={indx} value={row.PatientId}>
                            {`${row.PhoneNo} | ${row.FirstName}`}
                          </option>
                        ))}
                      {field === "PhoneNo" &&
                        FilterbyPatientId.map((row, indx) => (
                          <option
                            key={indx}
                            value={`${row.PatientId} | ${row.FirstName} | ${row.PhoneNo}`}
                          />
                        ))}
                      {field === "FirstName" &&
                        FilterbyPatientId.map((row, indx) => (
                          <option
                            key={indx}
                            value={`${row.PatientId} | ${row.FirstName} | ${row.PhoneNo}`}
                          />
                        ))}
                    </datalist>
                    {Object.keys(Registeredit).length === 0 &&
                      field === "PatientId" && (
                        <span
                          onClick={(e) =>
                            HandlesearchPatient(RegisterData[field])
                          }
                        >
                          <PersonSearchIcon />
                        </span>
                      )}
                    {Object.keys(Registeredit).length !== 0 &&
                      field === "PatientId" &&
                      AppointmentRegisType === "Casuality" && (
                        <span
                          onClick={(e) =>
                            HandlesearchPatient(RegisterData[field])
                          }
                        >
                          <PersonSearchIcon />
                        </span>
                      )}
                  </div>
                ) : [
                    "ClientType",
                    "IsMLC",
                    "IsReferral",
                    "IsConsciousness",
                  ].includes(field) ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "150px",
                    }}
                  >
                    <label style={{ width: "auto" }} htmlFor={`${field}_yes`}>
                      <input
                        required
                        id={`${field}_yes`}
                        type="radio"
                        name={field}
                        value={field === "ClientType" ? "Self" : "Yes"}
                        style={{ width: "15px" }}
                        checked={
                          field === "ClientType"
                            ? RegisterData[field] === "Self"
                            : RegisterData[field] === "Yes"
                        }
                        onChange={(e) =>
                          setRegisterData((prevState) => ({
                            ...prevState,
                            [field]: field === "ClientType" ? "Self" : "Yes",
                          }))
                        }
                      />
                      {field === "ClientType" ? "Self" : "Yes"}
                    </label>
                    <label style={{ width: "auto" }} htmlFor={`${field}_No`}>
                      <input
                        required
                        id={`${field}_No`}
                        type="radio"
                        name={field}
                        value={field === "ClientType" ? "Relative" : "No"}
                        style={{ width: "15px" }}
                        checked={
                          field === "ClientType"
                            ? RegisterData[field] === "Relative"
                            : RegisterData[field] === "No"
                        }
                        onChange={(e) =>
                          setRegisterData((prevState) => ({
                            ...prevState,
                            [field]: field === "ClientType" ? "Relative" : "No",
                          }))
                        }
                      />
                      {field === "ClientType" ? "Relative" : "No"}
                    </label>
                  </div>
                ) : field === "Complaint" ? (
                  <textarea
                    id={`${field}_${index}`}
                    autoComplete="off"
                    name={field}
                    required
                    value={RegisterData[field]}
                    onChange={HandleOnchange}
                  />
                ) : (
                  <input
                    id={`${field}_${index}`}
                    autoComplete="off"
                    type={field === "DOB" ? "date" : "text"}
                    name={field}
                    pattern={
                      field === "Email"
                        ? "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[cC][oO][mM]$"
                        : field === "PhoneNo"
                        ? "\\d{10}"
                        : ["CaseSheetNo", "UniqueIdNo"].includes(field)
                        ? "[A-Za-z0-9]+"
                        : field === "Age"
                        ? "\\d{1,3}"
                        : field === "DOB"
                        ? ""
                        : "[A-Za-z]+"
                    }
                    className={
                      errors[field] === "Invalid"
                        ? "invalid"
                        : errors[field] === "Valid"
                        ? "valid"
                        : ""
                    }
                    required
                    readOnly={field === "VisitPurpose"}
                    value={RegisterData[field]}
                    onKeyDown={
                      [
                        "MiddleName",
                        "SurName",
                        "AliasName",
                        "Occupation",
                        "NextToKinName",
                        "FamilyHeadName",
                        "Street",
                        "Area",
                        "City",
                        "State",
                        "Complaint",
                        "Country",
                      ].includes(field)
                        ? handleKeyDownTextRegistration
                        : field === "PhoneNo"
                        ? handleKeyDownPhoneNo
                        : null
                    }
                    onChange={HandleOnchange}
                  />
                )}
              </div>
            ))}
          <br />
          {RegisterData.IsReferral === "Yes" && (
            <>
              <div className="DivCenter_container">Referral Information</div>

              {FilteredFormdataRoute &&
                FilteredFormdataRoute.map((field, index) => (
                  <div className="RegisForm_1" key={index}>
                    <label htmlFor={`${field}_${index}`}>
                      {formatLabel(field)}
                      <span>:</span>
                    </label>
                    {["ReferralSource", "ReferredBy"].includes(field) ? (
                      <select
                        id={`${field}_${index}`}
                        name={field}
                        value={RegisterData[field]}
                        onChange={HandleOnchange}
                      >
                        <option value="">Select</option>

                        {field === "ReferralSource" &&
                          ["Call", "Letter", "Oral"].map((row, indx) => (
                            <option key={indx} value={row}>
                              {row}
                            </option>
                          ))}
                        {field === "ReferredBy" &&
                          ReferralDoctorData.map((row, indx) => (
                            <option key={indx} value={row.id}>
                              {row.ShortName}
                            </option>
                            // <option value="">Select</option>
                          ))}
                        {/* <option value="">Others</option> */}
                      </select>
                    ) : (
                      <input
                        autoComplete="off"
                        type="text"
                        name={field}
                        readOnly
                        value={RegisterData[field]}
                        onChange={HandleOnchange}
                      />
                    )}
                  </div>
                ))}
            </>
          )}
          <br />
          <div className="DivCenter_container">Patient Address</div>

          {FilteredFormdataAddress &&
            FilteredFormdataAddress.map((field, index) => (
              <div className="RegisForm_1" key={index}>
                <label htmlFor={`${field}_${index}`}>
                  {formatLabel(field)}
                  <span>:</span>
                </label>
                <input
                  id={`${field}_${index}`}
                  autoComplete="off"
                  type={field === "Pincode" ? "number" : "text"}
                  name={field}
                  pattern={
                    field === "Pincode"
                      ? "\\d{6,7}"
                      : ["DoorNo"].includes(field)
                      ? "[A-Za-z0-9]+"
                      : "[A-Za-z]+"
                  }
                  className={
                    errors[field] === "Invalid"
                      ? "invalid"
                      : errors[field] === "Valid"
                      ? "valid"
                      : ""
                  }
                  value={RegisterData[field]}
                  onChange={HandleOnchange}
                />
              </div>
            ))}
          <br />

          {AppointmentRegisType === "IP" && (
            <>
              <div className="DivCenter_container">Admission Details</div>
              {FilteredFormdataIpDetials &&
                FilteredFormdataIpDetials.map((field, index) => (
                  <div className="RegisForm_1" key={index}>
                    <label htmlFor={field}>
                      {formatLabel(field)}
                      <span>:</span>
                    </label>
                    {field === "FamilyHead" || field === "IpKitGiven" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "150px",
                        }}
                      >
                        <label style={{ width: "60px" }}>
                          <input
                            id="MLCYes"
                            type="radio"
                            name={field}
                            value="Yes"
                            style={{ width: "15px" }}
                            checked={RegisterData[field] === "Yes"}
                            onChange={(e) =>
                              setRegisterData((prevState) => ({
                                ...prevState,
                                [field]: "Yes",
                              }))
                            }
                          />
                          Yes
                        </label>
                        <label style={{ width: "60px" }}>
                          <input
                            id="MLCNo"
                            type="radio"
                            name={field}
                            value="No"
                            style={{ width: "15px" }}
                            checked={RegisterData[field] === "No"}
                            onChange={(e) =>
                              setRegisterData((prevState) => ({
                                ...prevState,
                                [field]: "No",
                              }))
                            }
                          />
                          No
                        </label>
                      </div>
                    ) : [
                        "Relation",
                        "DrInchargeAtTimeOfAdmission",
                        "AdmissionPurpose",
                      ].includes(field) ? (
                      <select
                        id={`${field}_${index}`}
                        name={field}
                        value={RegisterData[field]}
                        onChange={HandleOnchange}
                      >
                        <option value="">Select</option>

                        {field === "Relation" &&
                          relationships.map((row, indx) => (
                            <option key={indx} value={row}>
                              {row}
                            </option>
                          ))}

                        {field === "DrInchargeAtTimeOfAdmission" &&
                          AllDoctorData.map((row, indx) => (
                            <option key={indx} value={row.id}>
                              {row.ShortName}
                            </option>
                          ))}
                        {field === "AdmissionPurpose" &&
                          ["Medical-Management", "Surgery", "Day-Care"].map(
                            (row, indx) => (
                              <option key={indx} value={row}>
                                {row}
                              </option>
                            )
                          )}
                      </select>
                    ) : (
                      <input
                        autoComplete="off"
                        type={field === "RelativePhoneNo" ? "number" : "text"}
                        name={field}
                        pattern={
                          field === "RelativePhoneNo" ? "\\d{10}" : "[A-Za-z]+"
                        }
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        className={
                          errors[field] === "Invalid"
                            ? "invalid"
                            : errors[field] === "Valid"
                            ? "valid"
                            : ""
                        }
                        value={RegisterData[field]}
                        onChange={HandleOnchange}
                      />
                    )}
                  </div>
                ))}
              <br />
            </>
          )}
          {["IP", "Casuality"].includes(AppointmentRegisType) && (
            <>
              <div className="DivCenter_container">Room Details </div>
              <div className="DivCenter_container">
                <IoBedOutline
                  className="HotelIcon_registration"
                  onClick={() => {
                    if (
                      Object.keys(Registeredit).length !== 0 &&
                      !Registeredit?.conversion
                    ) {
                      const tdata = {
                        message:
                          "Unable to select the room because it is already selected and cannot be updated.",
                        type: "warn",
                      };

                      dispatchvalue({ type: "toast", value: tdata });
                    } else {
                      dispatchvalue({
                        type: "RegisterRoomShow",
                        value: { type: AppointmentRegisType, val: true },
                      });
                    }
                  }}
                />
              </div>
              {FilteredFormdataIpRoomDetials.map((field, index) => (
                <div className="RegisForm_1" key={index}>
                  <label htmlFor={field}>
                    {formatLabel(field)}
                    <span>:</span>
                  </label>

                  <input
                    type="text"
                    disabled
                    id={`${field}_${index}`}
                    name={field}
                    value={RoomdeditalsShow[field]}
                    onChange={HandleOnchange}
                  />
                </div>
              ))}
            </>
          )}
          <br />
          {AppointmentRegisType === "Laboratory" && (
            <div className="DivCenter_container">Add TestNames</div>
          )}

          {AppointmentRegisType === "Laboratory" && (
            <>
              {/* Conditionally show the Test Name field based on the selected testType */}
              <div className="RegisForm_1">
                <label>
                  TestName<span>:</span>
                </label>
                <input
                  type="text"
                  list="packagenameOptions"
                  id="TestName"
                  name="TestName"
                  value={FavouritesNames.TestName}
                  autoComplete="off"
                  onChange={handleFavouritesOnchange}
                />
                <datalist id="packagenameOptions">
                  {activetestnames.map((pack, index) => (
                    <option key={`${index}_index`} value={pack.Test_Name} />
                  ))}
                </datalist>
              </div>
              <button className="Addnamebtn2222" onClick={handleAddFavourite}>
                +
              </button>
            </>
          )}

          {/* FavouriteNamess */}
          {AppointmentRegisType === "Laboratory" && (
            <>
              {FavouriteNamess.length > 0 && (
                <ReactGrid
                  columns={ExteranlColumns}
                  RowData={FavouriteNamess}
                />
              )}
            </>
          )}
          <div className="Main_container_Btn">
            <button onClick={handlesubmit}>
              {Object.keys(Registeredit).length !== 0 &&
              (Registeredit?.conversion
                ? !Registeredit?.conversion
                : Registeredit?.appconversion
                ? !Registeredit?.appconversion
                : true)
                ? "Update"
                : "Save"}
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

        {RegisterRoomShow.val && <RoomDetialsSelect />}
        <br />
      </div>
    </>
  );
};

export default Newregistration;
