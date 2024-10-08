
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import "../../OP/TreatmentComponent.css";
import { FaTrash } from 'react-icons/fa';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModelContainer from "../../OtherComponent/ModelContainer/ModelContainer"
const LabMaster = () => {
    const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector((state) => state.userRecord?.toast);
    const dispatchvalue = useDispatch();
    const [joy, setJoy] = useState(false);
    const [TestName, setTestName] = useState({
        TestCode: "",
        TestName: "",
        Amount: "",
        Prev_Amount: "",
        Status: "Active",
        Types: "No",
        LabName: "",
        LabAmount: 0,
        LabPrev_Amount: 0,
        Location: ""
    });
    const handleYesChange = () => {
        setTestName((prevState) => ({
            ...prevState,
            Types: "Yes",
        }));
    };
    const handleNoChange = () => {
        setTestName((prevState) => ({
            ...prevState,
            Types: "No",
            LabName: "",
            LabAmount: ""
        }));
    };
    const [External, setExternal] = useState({
        ExternalId: "",
        LabName: "",
        PhoneNo: "",
        Address: "",
        Pincode: "",
        RegisterNo: "",
        Email: "",
        location: "",
        Status: "Active",
    });
    const [ExternalGet, setExternalGet] = useState(false);
    const [ExternalDetails, setExternalDetails] = useState([]);


    const handleExternalLabOnchange = (e) => {
        const { name, value } = e.target;
        const formattedValue = value.trim(); // Trim unnecessary whitespace

        if (name === "PhoneNo") {
            // Check if the value contains the '|' delimiter
            if (formattedValue.includes('|')) {
                const parts = formattedValue.split(' | ');

                // Ensure the 3rd element (convert[2]) is used only if the length is correct
                if (parts[2] && parts[2].length <= 10) {
                    setExternal((prev) => ({
                        ...prev,
                        [name]: parts[2], // Set the 3rd part of the split if it exists
                    }));
                }
            } else {
                // Otherwise, ensure phone number length is valid
                if (formattedValue.length <= 10) {
                    setExternal((prev) => ({
                        ...prev,
                        [name]: formattedValue, // Set the trimmed value directly
                    }));
                }
            }
        } else {
            // For other fields, set the value directly
            setExternal((prev) => ({
                ...prev,
                [name]: value, // Set value for other input fields
            }));
        }
    };

    const handleExteranlSubmit = () => {
        if (External.LabName && External.PhoneNo && External.RegisterNo && External.Email && External.Address) {
            const data = {
                ...External,
                created_by: userRecord?.username || "",
                locations: userRecord?.location || "",
            };
            axios.post(`${UrlLink}Masters/External_LabDetails_Link`, data)
                .then((res) => {
                    const reste = res.data;
                    const typp = Object.keys(reste)[0];
                    const mess = Object.values(reste)[0];
                    const tdata = {
                        message: mess,
                        type: typp,
                    };
                    dispatchvalue({ type: "toast", value: tdata });
                    setExternalGet((prev) => !prev);
                    setExternal({
                        ExternalId: "",
                        LabName: "",
                        PhoneNo: "",
                        Address: "",
                        Pincode: "",
                        RegisterNo: "",
                        Email: "",
                        location: "",
                        Status: "Active"
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            const tdata = {
                message: "Please Fill External Details"
            };
            dispatchvalue({ type: "toast", value: tdata })
        }
    };

    useEffect(() => {
        axios.get(`${UrlLink}Masters/External_LabDetails_Link`)
            .then((response) => {
                setExternalDetails(response.data);

            })
            .catch((err) => {
                console.log(err);
            })

    }, [UrlLink, ExternalGet]);

    const ExteranlColumns = [
        {
            key: "id",
            name: "S.No",
            frozen: true,
        },
        {
            key: "created_by",
            name: "Created By",
            frozen: true,
        },
        {
            key: "LabName",
            name: "LabName"
        },
        {
            key: "Email",
            name: "Email"
        },
        {
            key: "PhoneNo",
            name: "PhoneNo"
        },
        {
            key: "Address",
            name: "Address"
        },
        {
            key: "Lablocation",
            name: "Location"

        },
        {
            key: "RegisterNo",
            name: "Register No"

        },
        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <Button
                    className="cell_btn"
                    onClick={() => handleeditExternalStatus(params.row)}
                >
                    {params.row.Status}
                </Button>
            ),
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <Button className="cell_btn" onClick={() => handleeditExternal(params.row)}>
                    <EditIcon className="check_box_clrr_cancell" />
                </Button>
            ),
        },

    ];


    const handleeditExternalStatus = (params) => {
        console.log(params);
        const data = { ...params, ExternalId: params.id, LabName: params.LabName, Address: params.Address, Pincode: params.Pincode, Email: params.Email, location: params.Lablocation, PhoneNo: params.PhoneNo, RegisterNo: params.RegisterNo, locations: params.location, Status: params.Status === 'Active' ? 'InActive' : 'Active' }
        axios.post(`${UrlLink}Masters/External_LabDetails_Link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }
                dispatchvalue({ type: 'toast', value: tdata });
                setExternalGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const handleeditExternal = (params) => {
 // Debugging line
        const { id, LabName, Lablocation, Email, Address, PhoneNo, RegisterNo, Pincode, Status, location, ...rest } = params;

        setExternal({
            ExternalId: id,
            LabName: LabName,
            PhoneNo: PhoneNo,
            Address: Address,
            Pincode: Pincode,
            RegisterNo: RegisterNo,
            Email: Email,
            location: Lablocation,
            Status: Status,
            ...rest,
        });
    }






    // ---------------------testname------------
    const [IsLabTestNameGet, setIsLabTestNameGet] = useState(false);
    const [LabTestNames, setLabTestNames] = useState([]);

    const [ExternalLabName, setExternalLabName] = useState([]);

    const [isEditing1, setIsEditing1] = useState(false);

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Active_LabDetails_Link`)
            .then((response) => {
                console.log("123",response.data);
                setExternalLabName(response.data);

            })
            .catch((err) => {
                console.log(err);
            })

    }, [UrlLink]);


    const handleLabTestNameOnchange = (e) => {
        const { name, value } = e.target;
        if (name === "TestName") {
            setTestName((prevState) => ({
                ...prevState,
                TestName: value?.toUpperCase()?.trim(),
                Types: "No",
                LabName: "",
                LabAmount: 0
            }));
            setSelectedTestName([]);
        } else if (name === "Types") {
            setTestName((prevState) => ({
                ...prevState,
                LabName: value?.toUpperCase()?.trim(),

            }));
            setSelectedTestName([]);
        }
        else {
            setTestName((prev) => ({
                ...prev,
                [name]: value.toUpperCase().replace(/ +(?= )/g, ''), // Remove extra spaces but keep single spaces
            }));
        }

    };


    const baseColumns = [
        { key: "id", name: "S.No", width: 80 },
        { key: "LabName", name: "LabName" },
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



    const handleeditSubTeststatus = (params) => {
        if (params.OutSourceId) {
            setSelectedTestName(prevTestNames =>
                prevTestNames.map(test =>
                    test.OutSourceId === params.OutSourceId
                        ? { ...test, Status: test.Status === 'Active' ? 'Inactive' : 'Active' }
                        : test
                )
            );
        }

    };


    const handleEditSubTestName = (row) => {
        setissubtestedited(row)
        setTestName((prev) => ({
            ...prev,
            LabName: row.LabName,
            LabAmount: row.LabAmount,
            LabPrev_Amount: row.LabPrev_Amount || 0.00,
        }))
    };


    const handleeditTeststatus = (params) => {
        const data = { ...params, TestCode: params.TestCode, TestName: params.Test_Name, Prev_Amount: params.Prev_Amount, Amount: params.Amount, Status: params.Status === 'Active' ? 'InActive' : 'Active' }
        axios.post(`${UrlLink}Masters/Lab_Test_Name_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }
                dispatchvalue({ type: 'toast', value: tdata });
                setIsLabTestNameGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
    };
    const handleeditLabTestName = (params) => {
         setIsEditing(false); 
        const { id, Prev_Amount, Amount, TestCode, Status, Types,LabPrev_Amount,LabName,LabAmount,...rest } = params;

        if (!params.Sub_test_data || params.Sub_test_data.length === 0) {
            setTestName((prev) => ({
                ...prev,
                TestCode: TestCode,
                TestName: params.Test_Name,
                Prev_Amount: Prev_Amount || 0.00,
                Amount: Amount, // Ensure Amount is set from params
                Types: Types,
                Location: rest.location,// Set LabAmount only for OutSource
                ...rest,
            }));

        }
        else {
            setJoy(true);
            setIsEditing1(true);
            const TestCodeNewSub = params.TestCode;
            const StatusOld = params.Status;
            setTestName((prev) => ({
                ...prev,
                TestCode: TestCodeNewSub,
                Status: StatusOld,
                TestName: params.Test_Name,
                Prev_Amount: Prev_Amount || 0.00,
                Amount: Amount, // Ensure Amount is set from params
                Types: Types,
                LabName:"",
                LabAmount:"",
                LabPrev_Amount:LabPrev_Amount || 0.00,
                Location: rest.location,// Set LabAmount only for OutSource
                ...rest,
            }));
            setSelectedTestName(params.Sub_test_data.map((subTest, index) => ({
                OutSourceId: subTest.OutSourceId,
                LabName: subTest.LabName,
                LabPrev_Amount: subTest.LabPrev_Amount || 0.00, // Assign Prev_Amount from subTest data directly
                LabAmount: subTest.LabAmount,
                Status: subTest.Status,
                id: subTest.id,
                ...rest,
              })));
        }


    };

    const amountColumn = joy
    ? {
      key: "Amount",
      name: "Amount",
      children: [
        {
          key: "LabPrev_Amount",
          name: "Prev Amount",

        },
        {
          key: "LabAmount",
          name: "Curr Amount",

        },
      ],
    }
    : { key: "LabAmount", name: "Amount" }; 

    const tableColumns = [
        ...baseColumns.slice(0, 2),
        amountColumn,
        ...baseColumns.slice(2),
      ];
    




    const handleLabTestNameSubmit = () => {
        if (TestName.TestName) {
            const data = {
                ...TestName,
                LabDetails: SelectedTestName || [],
                created_by: userRecord?.username || "",
                location: userRecord?.location || "",
            };
            axios.post(`${UrlLink}Masters/Lab_Test_Name_link`, data)
                .then((res) => {
                    const reste = res.data;
                    const typp = Object.keys(reste)[0];
                    const mess = Object.values(reste)[0];
                    const tdata = {
                        message: mess,
                        type: typp,
                    };

                    dispatchvalue({ type: "toast", value: tdata });
                    setIsLabTestNameGet((prev) => !prev);
                    setTestName({
                        TestCode: "",
                        TestName: "",
                        Prev_Amount: "",
                        Amount: "",
                        Types: "No",
                        LabName: "",
                        LabAmount: "",
                        Status: "Active"
                    });
                    setIsEditing1(false);
                    setSelectedTestName([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            const tdata = {
                message: "Please provide the TestName.",
                type: "warn",
            };
            dispatchvalue({ type: "toast", value: tdata });
        }
    };

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Lab_Test_Name_link`)
            .then((response) => {
                setLabTestNames(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsLabTestNameGet, UrlLink]);

    // --------------------favorites-----------------

    const [activetestnames, setActivetestnames] = useState([]);
   

    const [FavouritesNames, setFavouritesNames] = useState({
        FavouritesCode: "",
        FavouritesName: "",
        TestName: "",
        SumOfAmount: "",
        Amount: "",
        Status: "Active"
    });


    useEffect(() => {
        const fetchTestNames = async () => {
            try {
                const response = await axios.get(`${UrlLink}Masters/Test_Names_link?Testgo=${FavouritesNames.TestName}`);
                setActivetestnames(response.data);
                console.log("Response Data123:", response.data);
            } catch (err) {
                console.error("Error fetching test names:", err);
            }
        };

        fetchTestNames();
    }, [UrlLink, FavouritesNames.TestName]);



    const [FavouriteNamess, setFavouriteNamess] = useState([]);
    const [IsFavouritesGet, setIsFavouritesGet] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const handleFavouritesOnchange = (e) => {
        const { name, value } = e.target;
        setFavouritesNames((prevState) => ({
            ...prevState,
            [name]: value.toUpperCase().replace(/ +(?= )/g, ''),
        }));
    };

    const handleAddFavourite = () => {
        const selectedTest = activetestnames.find(test => test.Test_Name === FavouritesNames.TestName);
        console.log("selectedTest", selectedTest)
        setisclick(true);

        if (selectedTest) {
            // Check if the test is already in FavouriteNamess
            const isDuplicate = FavouriteNamess.some(favourite => favourite.TestCode === selectedTest.id);

            if (isDuplicate) {
                const tdata = {
                    message: `Test already added`,
                    type: "warn",
                };
                dispatchvalue({ type: "toast", value: tdata });
            } else {
                const newFavourite = {
                    TestCode: selectedTest.id,
                    TestName: selectedTest.Test_Name,
                    Amount: selectedTest.Amount,
                };

                setFavouriteNamess(prev => [...prev, newFavourite]);

                // Update SumOfAmount and Amount in FavouritesNames
                setFavouritesNames(prevState => ({
                    ...prevState,
                    TestName: "",
                    SumOfAmount: (parseFloat(prevState.SumOfAmount || 0) + parseFloat(newFavourite.Amount)).toFixed(2),
                    Amount: (parseFloat(prevState.Amount || 0) + parseFloat(newFavourite.Amount)).toFixed(2),
                }));

                const tdata = {
                    message: `Test added successfully`,
                    type: "success",
                };
                dispatchvalue({ type: "toast", value: tdata });
            }
        } else {
            const tdata = {
                message: `Invalid test name`,
                type: "warn",
            };
            dispatchvalue({ type: "toast", value: tdata });
        }

    };

    const handleRemoveFavourite = (row) => {
        console.log("params", row);

        // Filter out the item with matching TestCode
        const updatedFavouriteNamess = FavouriteNamess.filter(test => test.TestCode !== row.TestCode);

        // Calculate removedAmount and update SumOfAmount
        const removedItem = FavouriteNamess.find(test => test.TestCode === row.TestCode);
        const removedAmount = removedItem?.Amount || 0;
        const newSumOfAmount = parseFloat(FavouritesNames.SumOfAmount) - parseFloat(removedAmount);

        // Update state with filtered array and new SumOfAmount
        setFavouriteNamess(updatedFavouriteNamess);
        setFavouritesNames(prevState => ({
            ...prevState,

            SumOfAmount: newSumOfAmount.toFixed(2),
            Amount: newSumOfAmount.toFixed(2),
        }));

        // Dispatch success toast message
        const tdata = {
            message: `Test removed successfully`,
            type: "success",
        };
        dispatchvalue({ type: "toast", value: tdata });
    };

    const [selectedrow, setselectedrow] = useState(false);
    const LabTestNameColumns = [
        {
            key: "id",
            name: "Test Code",
            frozen: true,
        },
        {
            key: "created_by",
            name: "Created By",
            frozen: true,
        },
        {
            key: "Test_Name",
            name: "Test Name",
        },
        {
            key: "Types",
            name: "IsOutSource"
        },
        {
            key: "Amount",
            name: "Amount",
            children: [
                {
                    key: "Prev_Amount",
                    name: "Prev Amount",
                },
                {
                    key: "Amount",
                    name: "Curr Amount",
                },
            ],
        },
        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <Button
                    className="cell_btn"
                    onClick={() => handleeditTeststatus(params.row)}
                >
                    {params.row.Status}
                </Button>
            ),
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <Button className="cell_btn" onClick={() => handleeditLabTestName(params.row)}>
                    <EditIcon className="check_box_clrr_cancell" />
                </Button>
            ),
        },
        {
            key: "View",
            name: "View",
            renderCell: (params) => (
                params.row.Types === "Yes" ? (
                    <Button className="cell_btn"

                        onClick={() => handleView(params?.row)}>
                        <VisibilityIcon className="check_box_clrr_cancell" />
                    </Button>
                ) : (
                    "No View"
                )
            ),
        },
    ];
    const viewExternal = [
        {
            key: "id",
            name: "S.No",
            frozen: true,
        },
        {
            key: "LabName",
            name: "LabName",
            width:"450px",
        },
        {
            key: "LabAmount",
            name: "LabAmount",
            width:"250px",
        }
    ];


    const [selectedRows, setSelectedRows] = useState([]); // Initialize an empty array

    const handleView = (row) => {
        console.log("HandleView", row);

        if (LabTestNames.length > 0 && row?.Sub_test_data.length > 0) {
            // Replace the previous rows with the current row
            setSelectedRows(row?.Sub_test_data); // Set the state with the new row

            setselectedrow(true); // Assuming this manages other behavior
        }
        else {
            const tdata = {
                message: 'There is no data to view.',
                type: 'warn',
            };
            dispatchvalue({ type: 'toast', value: tdata });
        }
    };
    const [SelectedTestName, setSelectedTestName] = useState([]);
    console.log("SelectedTestName", SelectedTestName);
    const [issubtestedited, setissubtestedited] = useState(null)
  

    const handlePlusTestname = () => {
        if (TestName.LabName !== "" && TestName.LabAmount !== "") {
            if (TestName.Types === "Yes") { // For outsourced tests
                if (TestName.LabName !== "" && TestName.LabAmount !== "") {
                    // Check for editing mode (issubtestedited)
                    if (issubtestedited) {
                        const updated = [...SelectedTestName];
                        const indx = SelectedTestName.findIndex((p) => p.id === issubtestedited.id);
    
                        if (indx !== -1) {
                            const dattt = {
                                id: issubtestedited.id,
                                OutSourceId:issubtestedited.OutSourceId,
                                LabName: TestName.LabName,
                                LabAmount: TestName.LabAmount,
                                TestName: TestName.TestName,
                                LabPrev_Amount: SelectedTestName[indx].LabAmount || 0.00, 
                                Amount: TestName.Amount,
                                Status: "Active",
                            };
                            updated[indx] = dattt;
                            setSelectedTestName(updated);
                            resetForm();
                        }
                    } else {
                        // Add new outsourced test
                        const isDuplicate = SelectedTestName.some(
                            (test) => test.LabName === TestName.LabName
                        );
                        if (isDuplicate) {
                            const tdata = { message: `This LabName already exists..`, type: "warn" };
                            dispatchvalue({ type: "toast", value: tdata });
                        } else {
                            setSelectedTestName((prevTestNames) => [
                                ...prevTestNames,
                                {
                                    id: prevTestNames.length + 1,
                                    LabName: TestName.LabName,
                                    LabAmount: TestName.LabAmount,
                                    // Set the previous amount to 0.00 when adding a new test
                                    LabPrev_Amount: 0.00,  
                                    TestName: TestName.TestName,
                                    Amount: TestName.Amount,
                                    Status: "Active",
                                },
                            ]);
                            resetForm();
                        }
                    }
                } else {
                    const tdata = { message: `Please Fill All Fields for Outsourced Tests.`, type: "warn" };
                    dispatchvalue({ type: "toast", value: tdata });
                }
            } else { // For non-outsourced tests
                if (issubtestedited) {
                    const updated = [...SelectedTestName];
                    const indx = SelectedTestName.findIndex((p) => p.id === issubtestedited.id);
                    if (indx !== -1) {
                        const dattt = {
                            id: issubtestedited.id,
                            TestName: TestName.TestName,
                            Amount: TestName.Amount,
                            Status: "Active",
                        };
                        updated[indx] = dattt;
                        setSelectedTestName(updated);
                        resetForm();
                    }
                } else {
                    const isDuplicate = SelectedTestName.some(
                        (test) => test.TestName === TestName.TestName
                    );
                    if (isDuplicate) {
                        const tdata = { message: `This TestName already exists..`, type: "warn" };
                        dispatchvalue({ type: "toast", value: tdata });
                    } else {
                        setSelectedTestName((prevTestNames) => [
                            ...prevTestNames,
                            {
                                id: prevTestNames.length + 1,
                                TestName: TestName.TestName,
                                LabPrev_Amount: 0.00, // Use default value when adding new
                                Amount: TestName.Amount,
                                Status: "Active",
                            },
                        ]);
                        resetForm();
                    }
                }
            }
        } else {
            const tdata = { message: `Please Fill All Required Fields.`, type: "warn" };
            dispatchvalue({ type: "toast", value: tdata });
        }
    }
    const resetForm = () => {
        setTestName((prev) => ({
            ...prev,
            LabName: "",
            LabAmount: "",
            Types: "Yes", // Reset 'IsOutSource' to default 'Yes'
        }));
        setissubtestedited(null);
    };
    




    // ------------favourites---
    const FavouritesColumns = [
        {
            key: "TestCode",
            name: "Test Code",
            frozen: true,
        },
        {
            key: "TestName",
            name: "Test Name",
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
    console.log("sdf", FavouriteNamess)

    const handleFavouritesSubmit = () => {
        if (FavouritesNames.FavouritesName) {
            const data = {
                ...FavouritesNames,
                FavouriteNamess: FavouriteNamess,
                created_by: userRecord?.username || "",

            };
            console.log("data", data)
            axios.post(`${UrlLink}Masters/Favourite_TestNames_Details`, data)
                .then((res) => {
                    const reste = res.data;
                    const typp = Object.keys(reste)[0];
                    const mess = Object.values(reste)[0];
                    const tdata = {
                        message: mess,
                        type: typp,
                    };
                    dispatchvalue({ type: "toast", value: tdata });
                    setIsFavouritesGet((prev) => !prev);
                    setFavouritesNames({
                        FavouritesCode: "",
                        FavouritesName: "",
                        TestName: "",
                        SumOfAmount: "",
                        Amount: "",
                        Status: "Active"
                    });
                    setFavouriteNamess([]);

                    setJoy(false);
                    // setIsEditing(!isEditing);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            const tdata = {
                message: "Please provide the FavouritesName .",
                type: "warn",
            };
            dispatchvalue({ type: "toast", value: tdata });
        }
    };
    const [special, setSpecial] = useState([]);
    useEffect(() => {
        axios.get(`${UrlLink}Masters/Favourite_TestNames_Details`)
            .then((response) => {
                console.log("testspecify", response.data);
                setSpecial(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsFavouritesGet, UrlLink]);



    const SpecialColumnns = [
        {
            key: "id",
            name: "S.No",
            frozen: true,
            width: 80,
        },
        {
            key: "FavouriteName",
            name: "Favourite Name",
        },

        {
            key: "Amount",
            name: "Amount",
            children: [
                {
                    key: "SumOfAmount",
                    name: "Sum Of Amount",
                },
                {
                    key: "Current_Amount",
                    name: "Curr Amount",
                },
                {
                    key: "Previous_Amount",
                    name: "Prev Amount",
                },
            ],
        },
        {
            key: "TestName",
            name: "View TestNames",

            renderCell: (params) => (
                <Button
                    className="cell_btn"
                    onClick={() => handleviewFavouriteTestnames(params.row)}
                >
                    <VisibilityIcon className="check_box_clrr_cancell" />
                </Button>
            ),
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <Button
                    className="cell_btn"
                    onClick={() => handleEditFavourites(params.row)}
                >
                    <EditIcon className="check_box_clrr_cancell" />
                </Button>
            ),
        },
        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditFavouritesstatus(params.row)}
                    >
                        {params.row.Status}
                    </Button>
                </>
            ),
        },
    ];

    const handleEditFavourites = (params) => {
        console.log("params", params);
        setIsEditing(false);
        setisclick(true);
        setJoy(false);

        const { id, FavouriteName, Current_Amount, SumOfAmount, Status, TestName, ...rest } = params;
        const TestCodeNew = params.id;

        const TestRow = params.TestName;

        setFavouriteNamess(TestRow);
        setFavouritesNames((prev) => ({
            ...prev,
            FavouritesCode: TestCodeNew,
            FavouritesName: FavouriteName,
            SumOfAmount: SumOfAmount,
            Amount: Current_Amount,
            TestName: "",
            ...rest,
        }));
    };


    const handleeditFavouritesstatus = (params) => {
        const data = {
            ...params,
            FavouritesCode: params.id,
            FavouritesName: params.FavouriteName,
            SumOfAmount: params.SumOfAmount,
            Amount: params.Current_Amount,
            FavouriteNamess: params.TestName,
            Status: params.Status === 'Active' ? 'Inactive' : 'Active'
        };
        axios.post(`${UrlLink}Masters/Favourite_TestNames_Details`, data)
            .then((res) => {
                // const resres = res.data;
                // let typp = Object.keys(resres)[0]
                // let mess = Object.values(resres)[0]
                const tdata = {
                    message: "Status Updated Successfully",
                    type: "success",
                };
                dispatchvalue({ type: 'toast', value: tdata });
                setIsFavouritesGet(prev => !prev);
            })
            .catch((err) => {
                console.log(err);
            });
    };




    const [selectedrow1, setSelectedRow1] = useState(false)
    const [selectedRows1, setSelectedRows1] = useState([]);
    const handleviewFavouriteTestnames = (params) => {
        console.log("paramsview", params);
        setIsEditing(true);
        setJoy(true);
        setisclick(false);
        if ((params.TestName).length > 0) {
            setSelectedRows1(params.TestName);
            setSelectedRow1(true);
        }
        else {
            const tdata = {
                message: 'There is no data to view.',
                type: 'warn',
            };
            dispatchvalue({ type: 'toast', value: tdata });
        }

    }


    const FavouritesColumnsView = [
        {
            key: "TestCode",
            name: "Test Code",
            frozen: true,
        },
        {
            key: "TestName",
            name: "Test Name",
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
    const [isclic, setisclick] = useState(true);


    const FavouritesViewVisibility = [
        {
            key: "TestCode",
            name: "Test Code",
            width:"250px",
        },
        {
            key: "TestName",
            name: "Test Name",
            width:"350px",
        },

    ];




    return (
        <>
            <div className="Main_container_app">

                <div className="common_center_tag">
                    <span>External Lab Details</span>
                </div>
                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label>
                            Lab Name<span>:</span>
                        </label>
                        <input
                            type="text"
                            name="LabName"
                            required
                            value={External.LabName}
                            autoComplete="off"
                            onChange={handleExternalLabOnchange}
                        />
                    </div>

                    <div className="RegisForm_1">
                        <label>Phone No
                            <span>:</span>
                        </label>
                        <input
                            type="number"
                            name="PhoneNo"
                            required
                            onKeyDown={(e) =>
                                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                            }
                            value={External.PhoneNo}
                            autoComplete="off"
                            onChange={handleExternalLabOnchange}
                        />
                    </div>
                    <div className="RegisForm_1">
                        <label>Address
                            <span>:</span>
                        </label>
                        <textarea
                            name="Address"
                            required
                            value={External.Address}
                            autoComplete="off"
                            onChange={handleExternalLabOnchange}
                        />
                    </div>
                    <div className="RegisForm_1">
                        <label>Pincode
                            <span>:</span>
                        </label>
                        <input
                            type="number"
                            name="Pincode"
                            required
                            onKeyDown={(e) =>
                                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                            }
                            value={External.Pincode}
                            autoComplete="off"
                            onChange={handleExternalLabOnchange}
                        />
                    </div>
                    <div className="RegisForm_1">
                        <label>Register No
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            name="RegisterNo"
                            required
                            value={External.RegisterNo}
                            autoComplete="off"
                            onChange={handleExternalLabOnchange}
                        />
                    </div>
                    <div className="RegisForm_1">
                        <label>Email
                            <span>:</span>
                        </label>
                        <input
                            type="email"
                            name="Email"
                            required
                            value={External.Email}
                            autoComplete="off"
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[cC][oO][mM]$"
                            onChange={handleExternalLabOnchange}
                        />
                    </div>
                    <div className="RegisForm_1">
                        <label>Location
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            required
                            value={External.location}
                            autoComplete="off"
                            onChange={handleExternalLabOnchange}
                        />
                    </div>
                </div>
                <div className="Main_container_Btn">
                    <button onClick={handleExteranlSubmit}>
                        {External.ExternalId ? "Update" : "Save"}
                    </button>
                </div>
                {ExternalDetails.length > 0 && (
                    <ReactGrid columns={ExteranlColumns} RowData={ExternalDetails} />
                )}


                {/* ------------------------testname-------------------- */}
                <div className="common_center_tag">
                    <span>TestName</span>
                </div>
                <div className="RegisFormcon_1">
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
                            onChange={handleLabTestNameOnchange}
                        />
                    </div>
                    <div className="RegisForm_1">
                        <label>
                            Amount <span>:</span>
                        </label>
                        <input
                            type="number"
                            name="Amount"
                            required
                            onKeyDown={(e) =>
                                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                            }
                            value={TestName.Amount}
                            autoComplete="off"
                            onChange={handleLabTestNameOnchange}
                        />
                    </div>
                    <div className="RegisForm_1">
                        <label>
                            IsOutSource<span>:</span>
                        </label>
                        <input
                            type="checkbox"
                            name="Types"
                            style={{ width: "35px" }}
                            checked={TestName.Types === "Yes"}
                            onChange={handleYesChange}
                            disabled={isEditing1}
                        />
                        <label> Yes </label>
                        <input
                            type="checkbox"
                            name="Types"
                            autoComplete="off"
                            style={{ width: "35px" }}
                            checked={TestName.Types === "No"}
                            onChange={handleNoChange}
                            disabled={isEditing1}
                        />
                        <label> No </label>
                    </div>

                    <div className="RegisFormcon_1">
                        {TestName.Types === "Yes" && (
                            <>
                                <div className="RegisForm_1">
                                    <label>
                                        LabName <span>:</span>
                                    </label>
                                    <input
                                        type="text"
                                        list="packagenameOptions"
                                        id="LabName"
                                        name="LabName"
                                        value={TestName.LabName}
                                        autoComplete="off"
                                        onChange={handleLabTestNameOnchange}
                                    />
                                    <datalist id="packagenameOptions">
                                        {ExternalLabName.map((pack, index) => (
                                            <option key={index} value={pack.LabName} />
                                        ))}
                                    </datalist>
                                </div>
                                <div className="RegisForm_1">
                                    <label>
                                        LabAmount <span>:</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="LabAmount"
                                        required
                                        onKeyDown={(e) =>
                                            ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                                        }
                                        value={TestName.LabAmount}
                                        autoComplete="off"
                                        onChange={handleLabTestNameOnchange}
                                    />
                                </div>
                                <button className="Addnamebtn2222" onClick={handlePlusTestname}>
                                    +
                                </button>
                            </>

                        )}
                    </div>
                </div>
                {SelectedTestName.length > 0 && TestName.Types !== "No" && (
                    <ReactGrid columns={tableColumns} RowData={SelectedTestName} />
                )}
                <div className="Main_container_Btn">
                    <button onClick={handleLabTestNameSubmit}>
                        {TestName.TestCode ? "Update" : "Save"}
                    </button>
                </div>
                {LabTestNames.length > 0 && (
                    <ReactGrid columns={LabTestNameColumns} RowData={LabTestNames} />
                )}


                {selectedrow && (
                    <div className="loader" onClick={() => setselectedrow(false)}>
                        <div className="loader_register_roomshow" onClick={(e) => e.stopPropagation()}>

                            {selectedRows.length > 0 && (
                                <div>
                                    <div className="common_center_tag">
                                        <span>External Lab Details</span>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="Main_container_app">
                                        <ReactGrid columns={viewExternal} RowData={selectedRows} />
                                    </div>


                                </div>
                            )}
                        </div>
                    </div>
                )}


                {/* ---------------favourites */}
               

                <div className="common_center_tag">
                    <span>Add Favourites</span>
                </div>

                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label>
                            Favourites Name <span>:</span>
                        </label>
                        <input
                            type="text"
                            name="FavouritesName"
                            required
                            value={FavouritesNames.FavouritesName}
                            autoComplete="off"
                            onChange={handleFavouritesOnchange}
                        />
                    </div>

                    <div className="RegisForm_1">
                        <label>
                            Sum Of the Amount <span>:</span>
                        </label>
                        <input
                            type="text"
                            name="SumOfAmount"
                            required
                            readOnly
                            value={FavouritesNames.SumOfAmount}
                            autoComplete="off"
                            onChange={handleFavouritesOnchange}
                        />
                    </div>
                    <div className="RegisForm_1">
                        <label>
                            Amount <span>:</span>
                        </label>
                        <input
                            type="number"
                            name="Amount"
                            required
                            onKeyDown={(e) =>
                                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                            }
                            value={FavouritesNames.Amount}
                            autoComplete="off"
                            onChange={handleFavouritesOnchange}
                        />
                    </div>

                    {!isEditing && (
                        <>

                            <div className="RegisForm_1">
                                <label>
                                    Test Name <span>:</span>
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

                </div>


                {!joy && FavouriteNamess.length > 0 && (
                    <ReactGrid columns={FavouritesColumns} RowData={FavouriteNamess} />
                )}
                {joy && isclic && (
                    <ReactGrid columns={FavouritesColumnsView} RowData={FavouriteNamess} />
                )}
              
                {!joy && (
                    <div className="Main_container_Btn">
                        <button onClick={handleFavouritesSubmit}>
                            {FavouritesNames.FavouritesCode ? "Update" : "Save"}
                        </button>
                    </div>)} 
                {special.length > 0 && (
                    <ReactGrid columns={SpecialColumnns} RowData={special} />
                )}


                {selectedrow1 && (
                    <div className="loader" onClick={() => setSelectedRow1(false)}>
                        <div className="loader_register_roomshow" onClick={(e) => e.stopPropagation()}>

                            {selectedRows1.length > 0 && (
                                <div>
                                    <div className="common_center_tag">
                                        <span>TestNames</span>
                                    </div>
                                    <br />
                                    <div className="Main_container_app">
                                        <ReactGrid columns={FavouritesViewVisibility} RowData={selectedRows1} />
                                    </div>


                                </div>
                            )}
                        </div>
                    </div>
                )}
                <ModelContainer />

                <ToastAlert Message={toast.message} Type={toast.type} />
            </div>
        </>
    );
};

export default LabMaster;

