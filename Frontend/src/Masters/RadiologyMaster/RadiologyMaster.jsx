import React, { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";



const RadiologyMaster = () => {

  const dispatchvalue = useDispatch();
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const UserData = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector(state => state.userRecord?.toast);
  const Usersessionid = useSelector((state) => state.userRecord?.Usersessionid);
  const [isEditing, setIsEditing] = useState(true);
  const [isEditing1, setIsEditing1] = useState(false);
  const [selectedrow, setSelectedRow] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const contentRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ----------------------RadiologyName--------
  const [RadiologyName, setRadiologyName] = useState({
    RadiologyId: "",
    RadiologyName: "",
    Location: "",
  });
  // console.log(RadiologyName)
  const [LocationData, setLocationData] = useState([]);
  const [IsRadiologyGet, setIsRadiologyGet] = useState(false);
  const [RadiologyNames, setRadiologyNames] = useState([]);
  const [BookingFees, setBookingFees] = useState([]);
  useEffect(() => {
    axios.get(`${UrlLink}Masters/Location_Detials_link`, {
      headers: {
        'Apikey': UserData.api_key,
        'Apipassword': UserData.api_password,
        'Sessionid': Usersessionid.session_id
      }
    })
      .then((res) => {
        const ress = res.data
        setLocationData(ress)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [UrlLink])

  const handleRadiologyChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Location') {
      // Update Location and reset RadiologyName when location changes
      setRadiologyName((prev) => ({
        ...prev,
        [name]: value,
        RadiologyName: '', // Reset RadiologyName on location change
      }));
    } else if (name === "RadiologyName") {
      // Update the relevant field, applying toUpperCase and trim
      setRadiologyName((prev) => ({
        ...prev,
        [name]: value?.toUpperCase()?.trim(),
      }));
    }
  };


  const handleeditRadiologyStatus = (params) => {

    const data = {
      RadiologyId: params.id,
      Statusedit: true,

    }
    axios.post(`${UrlLink}Masters/Radiology_Names_link`, data, {
      headers: {
        'Apikey': UserData.api_key,
        'Apipassword': UserData.api_password,
        'Sessionid': Usersessionid.session_id
      }
    })
      .then((res) => {
        const resres = res.data
        let typp = Object.keys(resres)[0]
        let mess = Object.values(resres)[0]
        const tdata = {
          message: mess,
          type: typp,
        }
        dispatchvalue({ type: 'toast', value: tdata });
        setIsRadiologyGet(prev => !prev)
      })
      .catch((err) => {
        console.log(err);
      })
  };
  const RadiologyColumns = [
    {
      key: "id",
      name: "Radiology Id",
      frozen: true,
    },
    {
      key: "created_by",
      name: "Created By",
      frozen: true,
    },
    {
      key: "RadiologyName",
      name: "Radiology Name",
    },
    {
      key: "Location_Name",
      name: "Location Name",
    },
    {
      key: "Status",
      name: "Status",
      renderCell: (params) => (
        <Button
          className="cell_btn"
          onClick={() => handleeditRadiologyStatus(params.row)}
        >
          {params.row.Status}
        </Button>
      ),
    },
    {
      key: "EditAction",
      name: "Edit",
      renderCell: (params) => (
        <Button
          className="cell_btn"
          onClick={() => handleeditRadiology(params.row)}
        >
          <EditIcon className="check_box_clrr_cancell" />
        </Button>
      ),
    },
  ];


  const handleRadiologySubmit = () => {

    if (RadiologyName.RadiologyName) {
      const data = {
        ...RadiologyName,
        RadiologyName: RadiologyName.RadiologyName || "",
        Location: RadiologyName.Location || "",
        // AmountArray: drainsData2 || [],
        created_by: userRecord?.username || "",
      };
      console.log(" twodata", data)
      axios
        .post(`${UrlLink}Masters/Radiology_Names_link`, data, {
          headers: {
            'Apikey': UserData.api_key,
            'Apipassword': UserData.api_password,
            'Sessionid': Usersessionid.session_id
          }
        })
        .then((res) => {
          const [typp, mess] = Object.entries(res.data)[0];
          dispatchvalue({ type: "toast", value: { message: mess, type: typp } });
          setIsRadiologyGet((prev) => !prev);
          setRadiologyName({
            RadiologyId: "",
            RadiologyName: "",
            Location: "",
          });
          // setDrainsData2([{ id: 1, From: "0", To: "", Amount: "" }]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatchvalue({ type: "toast", value: { message: "Please provide the Radiology Name.", type: "warn" } });
    }
  };
  const handleeditRadiology = (params) => {
    console.log("23456", params);
    const { id, ...rest } = params;
    setRadiologyName({
      RadiologyId: id,
      Location: rest?.Location_Id,
      ...rest,
    });

  };

  useEffect(() => {
    axios
      .get(`${UrlLink}Masters/Radiology_Names_link`, {
        headers: {
          'Apikey': UserData.api_key,
          'Apipassword': UserData.api_password,
          'Sessionid': Usersessionid.session_id
        }
      })
      .then((response) => {
        setRadiologyNames(response.data);
        console.log("response235999", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [IsRadiologyGet, UrlLink]);

  // ----------testname--------
  const [TestName, setTestName] = useState({
    TestNameId: "",
    RadiologyId: "",
    RadiologyName: "",
    TestName: "",
    Types: "No",
    Amount: "",
    SubTestName: "",
    TestCode: "",
    Prev_Amount: "",
    Location: "",
    BookingFees: "",
    Prev_BookingFees: "",
    Status: "Active",
  });

  const [TestNames, setTestNames] = useState([]);
  const [IsTestNameGet, setIsTestNameGet] = useState(false);
  const [issubtestedited, setissubtestedited] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null);
 
  const [joy, setjoy] = useState(false);

  const handleeditTestNameLast = (params) => {
    console.log("Params", params);
    setIsEditing(false); // Set editing state to false
  
    const { id, Curr_Amount, TestCode, Prev_Amount, Status, Prev_BookingFees, Curr_BookingFees, ...rest } = params; // Destructure params
  
    // Check if Sub_test_data is empty or not present
    if (!params.Sub_test_data || params.Sub_test_data.length === 0) {
      setTestName((prev) => ({
        ...prev,
        TestNameId: id,
        Prev_Amount: Prev_Amount || 0.0,
        Prev_BookingFees: Prev_BookingFees || 0.0,
        Amount: Curr_Amount || 0.0, // Set Curr_Amount correctly here
        TestCode: TestCode,
        BookingFees: Curr_BookingFees || 0.0, // Set Curr_BookingFees correctly here
        Location: rest.locationid,
        ...rest,
      }));
    } else {
      setjoy(true); // Set joy state to true to show the grid
      setIsEditing1(true);
      setTestName((prev) => ({
        ...prev,
        TestNameId: id,
        TestCode: TestCode,
        Status: Status,
        Location: rest.locationid,
        ...rest,
      }));
  
      // Mapping through sub_test_data
      setSelectedTestName(
        params.Sub_test_data.map((subTest) => ({
          SubTestId: subTest.SubTest_Code,
          SubTestName: subTest.SubTestName,
          BookingFees: subTest.BookingFees,
          Prev_BookingFees: subTest.Prev_BookingFees || 0.0,
          Prev_Amount: subTest.Prev_Amount || 0.0, // Assign Prev_Amount from subTest data directly
          Amount: subTest.Amount || 0.0, // Set Curr_Amount for sub-tests correctly here
          Status: subTest.Status,
          id: subTest.id,
          ...rest,
        }))
      );
    }
  };



  const handleTestNameChange = (e) => {
    const { name, value } = e.target;
    if (name === "Location") {
      setTestName((prev) => ({
        ...prev,
        [name]: value,
        RadiologyName: '',
        TestName: "",
        Types: "No",
        SubTestName: "",
        Amount: "",
        BookingFees: "",
        Prev_BookingFees:""
        // Reset RadiologyName on location change
      }));
    }
    else if (name === "RadiologyName") {
      // Clear other fields when RadiologyName changes
      setTestName((prevState) => ({
        ...prevState,
        RadiologyName: value?.toUpperCase()?.trim(),
        TestName: "",
        Types: "No",
        SubTestName: "",
        BookingFees: "",
        Amount: "",
        Prev_BookingFees:""
      }));
      setSelectedTestName([]);
    } else if (name === "TestName") {
      // Clear SubTestName and reset Types when TestName changes
      setTestName((prevState) => ({
        ...prevState,
        TestName: value?.toUpperCase()?.trim(),
        Types: "No",
        SubTestName: "",
        Prev_BookingFees:""

      }));
      setSelectedTestName([]);
    } else if (name === "Types") {
      // Just update the SubTestName value
      setTestName((prevState) => ({
        ...prevState,
        SubTestName: value?.toUpperCase()?.trim(),
      }));
      setSelectedTestName([]);
    } else {
      // Update other fields
      setTestName((prevState) => ({
        ...prevState,
        [name]: value?.toUpperCase()?.trim(),
      }));
    }
  };

  const handleYesChange = () => {
    setTestName((prevState) => ({
      ...prevState,
      Types: "Yes",
      SubTestName: "",
      Amount: "",
      BookingFees: "",
      Prev_BookingFees:""
    }));
  };

  const handleNoChange = () => {
    setTestName((prevState) => ({
      ...prevState,
      Types: "No",
      SubTestName: "",
      Amount: "",
      BookingFees: "",
      Prev_BookingFees:""
    }));
  };

 

  const handleTestNameSubmit = () => {
    // Check if all required fields for TestName are filled
    if (
      TestName.RadiologyName !== "" &&
      TestName.TestName !== "" &&
      TestName.Types !== ""
    ) {
      const RadId = RadiologyNames.find(
        (p) => p.RadiologyName === TestName.RadiologyName
      );
  
      const data = {
        TestNameId: TestName.TestNameId,
        RadiologyName: RadId.id,
        TestName: TestName.TestName,
        Types: TestName.Types,
        Amount: TestName.Amount,
        SubTestName: JSON.stringify(SelectedTestName || []), 
        created_by: userRecord?.username || "",
        location: userRecord?.location || "",
        TestCode: TestName.TestCode,
        Prev_BookingFees: TestName.Prev_BookingFees,
        Prev_Amount: TestName.Prev_Amount,
        BookingFees: TestName.BookingFees,
        Status: "Active",
      };
  
      // Logging data for debugging
      console.log("senddata", data);
  
      // Create a new FormData object
      const formData = new FormData();
  
      // Append the data fields to FormData
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
  
      // Append the file from ChooseFile if it exists
      if (ChooseFile.ChooseFileOne) {
        console.log('ChooseFile', ChooseFile.ChooseFileOne);
        formData.append('ChooseFile', ChooseFile.ChooseFileOne);
      }
  
      axios
        .post(`${UrlLink}Masters/Radiology_details_link`, formData, {
          headers: {
            'Apikey': UserData.api_key,
            'Apipassword': UserData.api_password,
            'Sessionid': Usersessionid.session_id,
            'Content-Type': 'multipart/form-data', // Add this line
          },
        })
        .then((res) => {
          const resData = res.data;
          const type = Object.keys(resData)[0];
          const message = Object.values(resData)[0];
          const tdata = {
            message: message,
            type: type,
          };
          dispatchvalue({ type: "toast", value: tdata });
          setIsTestNameGet((prev) => !prev);
          setTestName({
            TestNameId: "",
            RadiologyId: "",
            RadiologyName: "",
            TestName: "",
            Types: "No",
            Amount: "",
            SubTestName: "",
            TestCode: "",
            Prev_Amount: "",
            BookingFees: "",
            Location: "",
            Prev_BookingFees: "",
            Status: "Active",
          });
          setIsEditing(true);
          setIsEditing1(false);
          setChooseFile({ ChooseFileOne: null });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const tdata = {
        message: "Please provide Radiology Name, Test Name.",
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  };
  
  const [SelectedTestName, setSelectedTestName] = useState([]);
  console.log("SelectedTestName",SelectedTestName);
  const handlePlusTestname = () => {
    if (
      TestName.RadiologyName !== "" &&
      TestName.SubTestName !== "" &&
      TestName.TestName !== "" &&
      TestName.Amount !== "" &&
      TestName.BookingFees !== "" &&
      TestName.Types === "Yes"
    ) {
      console.log("SelectedTestName", SelectedTestName);
      // Check if SubTestName already exists in selectedTestNames
  
      if (issubtestedited) {
        const updated = [...SelectedTestName];
        const indx = SelectedTestName.findIndex((p) => p.id === issubtestedited.id);
  
        if (indx !== -1) {
          const dattt = {
            id: issubtestedited.id,
            SubTestId: issubtestedited.SubTestId,
            SubTestName: TestName.SubTestName,
            Amount: TestName.Amount,
            BookingFees: TestName.BookingFees,
            Prev_BookingFees: issubtestedited.Prev_BookingFees || 0.00,
            Prev_Amount: issubtestedited.Prev_Amount || 0.00,
            Status: "Active",
            ChooseFile: ChooseFile.ChooseFileOne || '', // Keep the ChooseFile
          };
  
          updated[indx] = dattt;
  
          setSelectedTestName(updated);
          setTestName((prevState) => ({
            ...prevState,
            SubTestName: "",
            Amount: "",
            Prev_Amount: "",
            BookingFees: "",
            Prev_BookingFees: "",
            Status: "",
          }));
  
          // Clear ChooseFile after submission
          setChooseFile({ ChooseFileOne: null });
  
          setissubtestedited(null);
        }
      } else {
        const isDuplicate = SelectedTestName.some(
          (test) => test.SubTestName === TestName.SubTestName
        );
  
        if (isDuplicate) {
          const tdata = {
            message: `This SubTestName already exists..`,
            type: "warn",
          };
          dispatchvalue({ type: "toast", value: tdata });
          setTestName((prevState) => ({
            ...prevState,
            SubTestName: "",
            Amount: "",
            Prev_Amount: "",
            BookingFees: "",
            Types: "Yes",
            Prev_BookingFees: "",
            Status: "",
          }));
          setIsEditing(!isEditing);
          setIsEditing1(!isEditing1);
          setissubtestedited(null);
        } else {
          setSelectedTestName((prevTestNames) => [
            ...prevTestNames,
            {
              id: prevTestNames.length + 1,
              SubTestId: "",
              SubTestName: TestName.SubTestName,
              Amount: TestName.Amount,
              BookingFees: TestName.BookingFees,
              Prev_BookingFees: TestName.Prev_BookingFees,
              Prev_Amount: TestName.Prev_Amount || 0.00,
              Status: "Active",
              ChooseFile: ChooseFile.ChooseFileOne || '', // Keep the ChooseFile
            },
          ]);
  
          setTestName((prevState) => ({
            ...prevState,
            SubTestName: "",
            Amount: "",
            BookingFees: "",
            Prev_Amount: "",
            Status: "",
          }));
  
          // Clear ChooseFile after submission
          setChooseFile({ ChooseFileOne: null });
  
          setissubtestedited(null);
        }
      }
    } else {
      const tdata = {
        message: `Please Fill All Fields.`,
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  };
  
  const handleEditSubTestName = (row) => {
    setissubtestedited(row)
    setTestName((prev) => ({
      ...prev,
      SubTestName: row.SubTestName,
      Amount: row.Amount,
      BookingFees: row.BookingFees,
      Prev_Amount: row.Prev_Amount,
      Prev_BookingFees:row.Prev_BookingFees,
    }))
  };

  const formatLabel = (label) => {
    if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
        return label
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/^./, (str) => str.toUpperCase());
    } else {
        return label;
    }
};

  useEffect(() => {
    axios
      .get(`${UrlLink}Masters/Radiology_details_link`, {
        headers: {
          'Apikey': UserData.api_key,
          'Apipassword': UserData.api_password,
          'Sessionid': Usersessionid.session_id
        }
      })
      .then((res) => {
        const ress = res.data;
        console.log("testname", ress);
        setTestNames(ress);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [IsTestNameGet, UrlLink]);


  const TestNameColumns = [
    {
      key: "id",
      name: "S.No",
      frozen: true,
    },
    {
      key: "RadiologyName",
      name: "Radiology Name",
      frozen: true,
    },
    {
      key: "TestCode",
      name: "Test Code",
    },
    {
      key: "TestName",
      name: "Test Name",
    },
    {
      key: "BookingFees",
      name: "Booking Fees",
      children: [
        {
          key: "Prev_BookingFees",
          name: "Prev Booking Fees",
          renderCell: (params) =>
            params.row.Types === "Yes" ? <>-</> : <>{params.row.Prev_BookingFees}</>,
        },
        {
          key: "Curr_BookingFees",
          name: "Curr Booking Fees",
          renderCell: (params) =>
            params.row.Types === "Yes" ? <>-</> : <>{params.row.Curr_BookingFees}</>,
        },
      ],
    },
    {
      key: "Amount",
      name: "Amount",
      children: [
        {
          key: "Prev_Amount",
          name: "Prev Amount",
          renderCell: (params) =>
            params.row.Types === "Yes" ? <>-</> : <>{params.row.Prev_Amount}</>,
        },
        {
          key: "Curr_Amount",
          name: "Curr Amount",
          renderCell: (params) =>
            params.row.Types === "Yes" ? <>-</> : <>{params.row.Curr_Amount}</>,
        },
      ],
    },
    {
      key: "SubTests",
      name: "Sub Test Name",
      renderCell: (params) =>
        params.row.Types === "Yes" ? <>Available</> : <>Not Available</>,
    },
    {
      key: "created_by",
      name: "Created By",
      frozen: true,
    },
    {
      key: "Action",
      name: "Action",
      renderCell: (params) => (
        <>
          <Button
            className="cell_btn"
            onClick={() => handleeditTestNameLast(params.row)}
          >
            <EditIcon className="check_box_clrr_cancell" />
          </Button>
        </>
      ),
    },
  ];
  

  const handleeditSubTeststatus = (params) => {
    console.log("dsrty", params)
    if (params.SubTestId) {
      setSelectedTestName(prevTestNames =>
        prevTestNames.map(test =>
          test.SubTestId === params.SubTestId
            ? { ...test, Status: test.Status === 'Active' ? 'Inactive' : 'Active' }
            : test
        )
      );
    }

  };
  const baseColumns = [
    { key: "id", name: "S.No", width: 80 },
    { key: "SubTestName", name: "SubTestName" },
    {
      key: "Status",
      name: "Status",
      renderCell: (params) => (
        <>
          <Button
            className="cell_btn"
            onClick={() => handleeditSubTeststatus(params.row)}
          >
            {params.row.Status}
          </Button>
        </>
      ),
    },
    {
      key: "Action",
      name: "Action",
      width: 100,
      renderCell: (params) => (
        <Button
          className="cell_btn"
          onClick={() => handleEditSubTestName(params.row)}
        >
          <EditIcon className="check_box_clrr_cancell" />
        </Button>
      ),
    },
  ];
  
 
const amountColumn = joy
? {
    key: "AmountDetails",
    name: "Amount",
    children: [
      {
        key: "Prev_Amount",
        name: "Prev Amount",
      },
      {
        key: "Amount",
        name: "Current Amount", // Ensure correct name for current amount
      },
    ],
  }
: { key: "Amount", name: "Amount" };

const Booking = joy
? {
    key: "BookingDetails",
    name: "Booking Fees",
    children: [
      {
        key: "Prev_BookingFees",
        name: "Prev Booking Fees",
      },
      {
        key: "BookingFees",
        name: "Current Booking Fees", // Ensure correct name for current booking fees
      },
    ],
  }
: { key: "BookingFees", name: "Booking Fees" };

  const tableColumns = [
    ...baseColumns.slice(0, 2),
    amountColumn,
    Booking,
    ...baseColumns.slice(2),
  ];
  const [ChooseFile, setChooseFile] = useState({
    ChooseFileOne: null,
});
console.log("ChooseFile",ChooseFile);






 

const handleinpchangeDocumentsForm = (e) => {
  const { name, files } = e.target;

  if (files && files.length > 0) {
      let formattedValue = files[0];

      // Update the allowed types to include Word documents
      const allowedTypes = [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "application/msword", // For .doc files
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // For .docx files
      ];
      const maxSize = 5 * 1024 * 1024; // Max size of 5MB

      if (!allowedTypes.includes(formattedValue.type) || formattedValue.type === "") {
          const tdata = {
              message: "Invalid file type. Please upload a PDF, JPEG, PNG, DOC, or DOCX file.",
              type: "warn",
          };
          dispatchvalue({ type: "toast", value: tdata });
      } else if (formattedValue.size > maxSize) {
          const tdata = {
              message: "File size exceeds the limit of 5MB.",
              type: "warn",
          };
          dispatchvalue({ type: "toast", value: tdata });
      } else {
          const reader = new FileReader();
          reader.onload = () => {
              setChooseFile((prev) => ({
                  ...prev,
                  [name]: reader.result,
              }));
          };
          reader.readAsDataURL(formattedValue);
      }
  } else {
      const tdata = {
          message: "No file selected. Please choose a file to upload.",
          type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
  }
};

// const Selectedfileview = (fileval) => {
//   if (fileval) {
//     console.log("fileval",fileval);
//       let tdata = {
//           Isopen: false,
//           content: null,
//           type: "image/jpg",
//       };
//       const fileType = fileval.split(",")[0];
      
//       if (["data:image/jpeg;base64", "data:image/jpg;base64"].includes(fileType)) {
//           tdata = {
//               Isopen: true,
//               content: fileval,
//               type: "image/jpeg",
//           };
//       } else if (fileType === "data:image/png;base64") {
//           tdata = {
//               Isopen: true,
//               content: fileval,
//               type: "image/png",
//           };
//       } else if (fileType === "data:application/pdf;base64") {
//           tdata = {
//               Isopen: true,
//               content: fileval,
//               type: "application/pdf",
//           };
//       } else if (fileType === "data:application/msword;base64" || fileType === "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64") {
//           // Handle Word document view or download
//           tdata = {
//               Isopen: true,
//               content: fileval,
//               type: "application/msword",
//           };
//       }

//       dispatchvalue({ type: "modelcon", value: tdata });
//   } else {
//       const tdata = {
//           message: "There is no file to view.",
//           type: "warn",
//       };
//       dispatchvalue({ type: "toast", value: tdata });
//   }
// };


  
console.log('ChooseFile', ChooseFile);

 
  return (
    <>
      <div className="Main_container_app">
        <div className="common_center_tag">
          <span>Radiology</span>
        </div>
        <div className="RegisFormcon_1">
          <div className="RegisForm_1">
            <label> Location <span>:</span> </label>

            <select
              name='Location'
              required
              disabled={Boolean(RadiologyName.RadiologyId)}
              value={RadiologyName.Location}
              onChange={handleRadiologyChange}
            >
              <option value=''>Select</option>
              {
                LocationData.map((p) => (
                  <option key={p.id} value={p.id}>{p.locationName}</option>
                ))
              }
            </select>
          </div>
          <div className="RegisForm_1">
            <label>
              Radiology Name <span>:</span>
            </label>
            <input
              type="text"
              name="RadiologyName"
              required
              value={RadiologyName.RadiologyName}
              autoComplete="off"
              onChange={handleRadiologyChange}
            />
          </div>
   

        </div>
        <div className="Main_container_Btn">
          <button onClick={handleRadiologySubmit}>
            {RadiologyName.RadiologyId ? "Update" : "Save"}
          </button>
        </div>
        {RadiologyNames.length > 0 && (
          <ReactGrid columns={RadiologyColumns} RowData={RadiologyNames} />
        )}









        {/*------------------TestNames--------------------- */}
        <div className="common_center_tag">
          <span>Test Name</span>
        </div>
        <div className="RegisFormcon_1">
          <div className="RegisForm_1">
            <label> Location <span>:</span> </label>

            <select
              name='Location'
              required
              disabled={TestName.TestNameId}
              value={TestName.Location}
              onChange={handleTestNameChange}
            >
              <option value=''>Select</option>
              {
                LocationData.map((p) => (
                  <option key={p.id} value={p.id}>{p.locationName}</option>
                ))
              }
            </select>
          </div>
          <div className="RegisForm_1">
            <label>
              Radiology Name <span>:</span>
            </label>
            <select
              name="RadiologyName"
              required
              value={TestName.RadiologyName}
              onChange={handleTestNameChange}
              disabled={!isEditing}
            >
              <option value="">Select</option>
              {RadiologyNames?.map((dept, indx) => (
                <option key={indx} value={dept.RadiologyName}>
                  {dept.RadiologyName}
                </option>
              ))}
            </select>
          </div>
          <div className="RegisForm_1">
            <label>
              Test Name <span>:</span>
            </label>
            <input
              type="text"
              name="TestName"
              required
              value={TestName.TestName}
              autoComplete="off"
              onChange={handleTestNameChange}
            />
          </div>

          <div className="RegisForm_1">
            <label>
              IsSubDepartment <span>:</span>
            </label>
            <input
              type="checkbox"
              name="Types"
              style={{ width: "35px" }}
              checked={TestName.Types === "Yes"}
              onChange={handleYesChange}
              disabled={!isEditing}
            />
            <label> Yes </label>
            <input
              type="checkbox"
              name="Types"
              autoComplete="off"
              style={{ width: "35px" }}
              checked={TestName.Types === "No"}
              onChange={handleNoChange}
              disabled={!isEditing}
            />
            <label> No </label>
          </div>
     

          
{TestName.Types === "No" && (
   <div className="RegisFormcon_1">
  <div className="RegisForm_1">
   
      <label>
       Test Amount <span>:</span>
      </label>
      <input
        type="number"
        name="Amount"
        autoComplete="off"
        onKeyDown={(e) =>
          ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
        }
        required
        value={TestName.Amount}
        onChange={handleTestNameChange}
      />


    <div className="RegisForm_1">
      <label>
        BookingFees <span>:</span>
      </label>
      <input
        type="number"
        name="BookingFees"
        autoComplete="off"
        onKeyDown={(e) =>
          ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
        }
        required
        value={TestName.BookingFees}
        onChange={handleTestNameChange}
      />
    </div>

 

    <div className="RegisForm_1">
      {Object.keys(ChooseFile).map((field, indx) => (
        <div className="RegisForm_1" key={indx}>
          <label htmlFor={`${field}_${indx}_${field}`}>
            {formatLabel(field)} <span>:</span>
          </label>
          <input
            type="file"
            name={field}
            accept="image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
            {/* <button
              className="fileviewbtn"
              onClick={() => Selectedfileview(ChooseFile[field])}
            >
              View
            </button> */}
          </div>
        </div>
      ))}
    </div>
  </div>
  </div>
)}


        </div>
        <div className="RegisFormcon_1">
          {TestName.Types === "Yes" && (
            <>
              <div className="RegisForm_1">
                <label htmlFor="SubTestName">
                  SubTestName <span>:</span>
                </label>
                <input
                  type="text"
                  id="SubTestName"
                  name="SubTestName"
                  autoComplete="off"
                  onChange={handleTestNameChange}
                  value={TestName.SubTestName}

                  required
                />
              </div>
              <div className="RegisForm_1">
                <label>
                 Test Amount <span>:</span>
                </label>
                <input
                  type="number"
                  name="Amount"
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  required
                  value={TestName.Amount}
                  autoComplete="off"
                  onChange={handleTestNameChange}

                />
              </div>
              <div className="RegisForm_1">
                <label>
                  BookingFees <span>:</span>
                </label>
                <input
                  type="number"
                  name="BookingFees"
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  required
                  value={TestName.BookingFees}
                  autoComplete="off"
                  onChange={handleTestNameChange}

                />
              </div>
              <div className="RegisForm_1">
      {Object.keys(ChooseFile).map((field, indx) => (
        <div className="RegisForm_1" key={indx}>
          <label htmlFor={`${field}_${indx}_${field}`}>
            {formatLabel(field)} <span>:</span>
          </label>
          <input
            type="file"
            name={field}
            accept="image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
            {/* <button
              className="fileviewbtn"
              onClick={() => Selectedfileview(ChooseFile[field])}
            >
              View
            </button> */}
          </div>
        </div>
      ))}
    </div>
              <button className="Addnamebtn2222" onClick={handlePlusTestname}>
                +
              </button>
            </>
          )}
        </div>
        {SelectedTestName.length > 0 && TestName.Types !== "No" && (
          <ReactGrid columns={tableColumns} RowData={SelectedTestName} />
        )}

        <div className="Main_container_Btn">
          <button onClick={handleTestNameSubmit}>
            {TestName.TestNameId ? "Update" : "Save"}
          </button>
        </div>
        {TestNames.length > 0 && (
          <ReactGrid columns={TestNameColumns} RowData={TestNames} />
        )}

      </div>
    


      <ToastAlert Message={toast.message} Type={toast.type} />
    </>
  );
};

export default RadiologyMaster;













