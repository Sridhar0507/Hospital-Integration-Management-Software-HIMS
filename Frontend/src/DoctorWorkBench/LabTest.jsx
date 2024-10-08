
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactGrid from "../OtherComponent/ReactGrid/ReactGrid";
import ToastAlert from "../OtherComponent/ToastContainer/ToastAlert";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { FaTrash } from 'react-icons/fa';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ModelContainer from "../OtherComponent/ModelContainer/ModelContainer";


const LabTest = () => {
    const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector((state) => state.userRecord?.toast);
    const dispatchvalue = useDispatch();
    const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);
    const [type, setType] = useState("Addtest");
    const [viewreportind, setviewreportind] = useState([]);
    const [viewreportfav, setviewreportfav] = useState([]);
    const [LabEntry, setLabEntry] = useState({
        reporttime: "",
        reportdate: ""
    });
    const [file, setfile] = useState(null);
    console.log("viewreportind", viewreportind);
    console.log(UrlLink)
    const handlePageChange = (event, newType) => {
        if (newType !== null && newType !== type) {
            setType(newType);
        }
    };

    useEffect(() => {
        // Define the params object to include RegistrationId
        const params = {
            Register_Id: DoctorWorkbenchNavigation?.pk,
            RegisterType: "OP"
        };

        axios.get(`${UrlLink}OP/lab_report_details_view`, { params })
            .then((res) => {
                console.log("Response Lab Report:", res.data);
                console.log("Individual Tests:", res.data.individual_tests);

                // Update state with individual and favorite tests if they exist
                setviewreportind(res.data.individual_tests || []);
                setviewreportfav(res.data.favourite_tests || []);
                const rawReportDate = res.data.lab_report_entry.report_date;
                const dateObject = new Date(rawReportDate);
                const formattedDateYYYYMMDD = dateObject.toISOString().split('T')[0]; // "YYYY-MM-DD"
                // const formattedDateDDMMYYYY = dateObject.toLocaleDateString('en-GB'); // "DD-MM-YYYY"

                // Extract and format report_time
                const rawReportTime = res.data.lab_report_entry.report_time;
                const formattedTime = rawReportTime.substring(0, 5); // "HH:mm"
                const File = res.data.lab_report_entry.reportfile;
                setfile(File);

                setviewreportind(res.data.individual_tests || []);
                setviewreportfav(res.data.favourite_tests || []);
                setLabEntry({
                    reporttime: formattedTime,
                    reportdate: formattedDateYYYYMMDD // Use this for "DD-MM-YYYY"
                });

                console.log("Formatted Date (YYYY-MM-DD):", formattedDateYYYYMMDD);
                // console.log("Formatted Date (DD-MM-YYYY):", formattedDateDDMMYYYY);
                console.log("Formatted Time:", formattedTime);
            })
            .catch((err) => {
                console.error("Error fetching lab report details:", err);
            });
    }, [UrlLink, DoctorWorkbenchNavigation?.pk]);




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


    const viewreportIndColumns = [

        {
            key: "id",
            name: "S.No",
            frozen: true,

        },
        {
            key: "test_name",
            name: "Test Name",
            frozen: true,
        },
        {
            key: "category_type",
            name: "Category Type",
        },

        {
            key: "value",
            name: "Value"

        },
        {
            key: "description",
            name: "Description"
        },
        {
            key: "status",
            name: "Status"
        }


    ];
    const viewreportFavColumns = [

        {
            key: "id",
            name: "S.No",
            frozen: true,

        },
        {
            key: "favourite_name",
            name: "Favourite Name"

        },
        {
            key: "test_name",
            name: "Test Name",
        },
        {
            key: "category_type",
            name: "Category Type",
        },

        {
            key: "value",
            name: "Value"

        },
        {
            key: "description",
            name: "Description"
        },
        {
            key: "status",
            name: "Status"
        }


    ];




    //   ------------------------addtest
    const [LabQueue, setLabQueue] = useState({
        LabQueueId: "",
        IndivitualArr: "",
        FavouritesArr: "",

    });
    const [testType, setTestType] = useState("Individual");
    const [activetestnames, setActivetestnames] = useState([]);
    const [FavTest, setFavTest] = useState([]);
    const [indivitualChecked, setIndivitualChecked] = useState([]);
    const [FavouriteChecked, setFavouriteChecked] = useState([]);



    useEffect(() => {
        axios.get(`${UrlLink}Masters/Test_Names_link_LabTest`)
            .then((response) => {
                setActivetestnames(response.data);

            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink]);

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Favourites_Names_link`)
            .then((response) => {
                setFavTest(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink]);

    const handleIndividualCheckboxChange = (id, Test_Name) => {
        // console.log("testType", id, Test_Name, testType);
        // Check if the individual test is already in any favorite test's TestDetails
        const isDuplicateInFavorites = FavouriteChecked.some(favorite =>
            favorite.TestDetails.some(testDetail => testDetail.TestCode === id)
        );

        if (isDuplicateInFavorites) {
            const tdata = {
                message: "Already Selected The Testname in Favourites .",
                type: "warn",
            }
            dispatchvalue({ type: "toast", value: tdata });
            return;
        }
        // console.log('indivitualChecked aishfniensi387 :', indivitualChecked)
        const isChecked = indivitualChecked.some(item => item.id === id);
        // console.log(isChecked)
        if (isChecked) {
            const newCheckedState = indivitualChecked.filter(item => item.id !== id);
            setIndivitualChecked(newCheckedState);
        } else {
            const newCheckedState = [...indivitualChecked, { id, Test_Name, testType }];
            setIndivitualChecked(newCheckedState);
        }
    };

    const handleFavoriteCheckboxChange = (key, FavouriteName, Current_Amount, TestDetails) => {
        // console.log("Change detected:", key, FavouriteName, Current_Amount, TestDetails, testType);

        // Extract TestCodes from TestDetails
        const testCodesFromDetails = TestDetails.map(testDetail => testDetail.TestCode);
        // console.log("TestCodes from TestDetails:", testCodesFromDetails);

        // Check if any TestCode in TestDetails is already selected in indivitualChecked
        const hasDuplicate = testCodesFromDetails.some(TestCode =>
            indivitualChecked.some(individual => individual.id === TestCode)
        );

        if (hasDuplicate) {
            const tdata = {
                message: "Already Some Testname  Selected Indivitual .",
                type: "warn",
            }
            dispatchvalue({ type: "toast", value: tdata });
            return; // Prevent adding duplicate
        }

        const isChecked = FavouriteChecked.some(item => item.key === key);
        if (isChecked) {
            const newCheckedState = FavouriteChecked.filter(item => item.key !== key);
            setFavouriteChecked(newCheckedState);
        } else {
            // Ensure testType is included in the object
            const newCheckedState = [
                ...FavouriteChecked,
                {
                    key,
                    FavouriteName,
                    Current_Amount,
                    TestDetails,
                    testType  // Add testType here
                }
            ];
            setFavouriteChecked(newCheckedState);
        }
    };


    const transformFavouriteData = (FavouriteChecked) => {
        return FavouriteChecked.flatMap((favourite, favIndex) =>
            favourite.TestDetails.map((testDetail, testIndex) => ({
                FavouriteName: favourite.FavouriteName,
                TestCode: testDetail.TestCode,
                TestName: testDetail.TestName,
                id: `${favIndex + 1}-${testIndex + 1}`,  // Unique key based on indexes
            }))
        );
    };


    const transformFavouriteData1 = (indivitualChecked) => {
        return indivitualChecked.map((indivitual, ind) => ({
            TestCode: indivitual.id,
            TestName: indivitual.Test_Name,
            id: ind + 1,  // Ensure unique key for each row
        }));
    };

    const handleRemoveIndivitualRow = (row) => {
        // console.log("row123", row);

        // Filter out the row that needs to be removed
        const newCheckedState = indivitualChecked.filter(item => item.id !== row.TestCode);

        // Update the state with the new array
        setIndivitualChecked(newCheckedState);
    };


    const IndivitualColumns = [

        {
            key: "id",
            name: "S.No",
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
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <Button
                    className="cell_btn"
                    onClick={() => handleRemoveIndivitualRow(params.row)}
                >
                    <FaTrash className="check_box_clrr_cancell" />
                </Button>
            ),
        },
    ];

    const FavouritesColumns = [
        {
            key: "id",
            name: "S.No ",
            frozen: true,
        },
        {
            key: "FavouriteName",
            name: "Favourite Name",

        },
        {
            key: "TestCode",
            name: "Test Code",
        },
        {
            key: "TestName",
            name: "Test Name",
        },
    ];
    const transformedFavouriteData = transformFavouriteData(FavouriteChecked);
    const transformedFavouriteData1 = transformFavouriteData1(indivitualChecked);

    const [IsLabQueueGet, setIsLabQueueGet] = useState(false);
    const [LabQueueDatas, setLabQueueDatas] = useState([]);




    const handleSubmitSelectedTest = () => {
        if (indivitualChecked.length > 0 || FavouriteChecked.length > 0) {
            const data = {
                LabQueueId: LabQueue.LabQueueId,
                IndivitualArr: indivitualChecked || [],
                FavouritesArr: FavouriteChecked || [],
                created_by: userRecord?.username || "",
                Register_Id: DoctorWorkbenchNavigation?.RegistrationId || "",
                RegisterType: "OP"
            };
            // console.log();

            console.log("datssa", data);
            axios.post(`${UrlLink}OP/Lab_Request_Detailslink`, data)
                .then((res) => {
                    const resData = res.data;
                    const type = Object.keys(resData)[0];
                    const message = Object.values(resData)[0];
                    const tdata = {
                        message: message,
                        type: type,
                    };
                    dispatchvalue({ type: "toast", value: tdata });
                    setIsLabQueueGet((prev) => !prev);
                    setLabQueue({
                        LabQueueId: "",
                        IndivitualArr: "",
                        FavouritesArr: "",
                    });
                    setIndivitualChecked([]);
                    setFavouriteChecked([]);

                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            const tdata = {
                message: "Please Select TestNames Or Favourites Names.",
                type: "warn",
            }
            dispatchvalue({ type: "toast", value: tdata });
        }
    };


    useEffect(() => {
        // Define the params object to include RegistrationId
        const params = {
            Register_Id: DoctorWorkbenchNavigation.pk,
            RegisterType: "OP"
        };

        axios.get(`${UrlLink}OP/Lab_Request_Detailslink`, { params })
            .then((res) => {
                const ress = res.data;
                console.log("response1234______", ress);
                // Sorting the data
                const sortedData = ress.sort((a, b) => {
                    if (a.TestType === "Individual" && b.TestType !== "Individual") {
                        return -1; // a comes before b
                    } else if (a.TestType !== "Individual" && b.TestType === "Individual") {
                        return 1; // b comes before a
                    }
                    return 0; // no change
                });
                setLabQueueDatas(sortedData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [IsLabQueueGet, UrlLink, DoctorWorkbenchNavigation?.pk]);



    const LabColumn = [
        {
            key: "id",
            name: "S.No ",
            frozen: true,
        },
        {
            key: "TestType",
            name: "Test Type",

            renderCell: (params) => (

                <>
                    {/* {console.log(params)} */}
                    {
                        params?.row?.TestType === "Individual" ? (
                            <>
                                {params?.row?.TestType}
                            </>
                        ) : (
                            <>
                                {`${params?.row?.FavouriteName} - 
                             
                             (${params?.row?.TestType})`}
                            </>
                        )
                    }
                </>

            ),
        },
        {
            key: "TestName",
            name: "Test Name",

            renderCell: (params) => (

                <>
                    {/* {console.log(params)} */}
                    {
                        params?.row?.TestType === "Individual" ? (
                            <>
                                {params?.row?.TestName}
                            </>
                        ) : (
                            <>
                                {params.row.TestName}

                            </>
                        )
                    }
                </>

            ),
        },
    ];


    return (
        <>
            <div className="for" style={{ width: '100%' }}>
                <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
                    <ToggleButtonGroup
                        value={type}
                        exclusive
                        onChange={handlePageChange}
                        aria-label="Platform"
                    >
                        <ToggleButton
                            value="Addtest"
                            style={{
                                height: "30px",
                                width: "180px",
                                backgroundColor:
                                    type === "Addtest"
                                        ? "var(--selectbackgroundcolor)"
                                        : "inherit",
                            }}
                            className="togglebutton_container"
                        >
                            Add Test
                        </ToggleButton>
                        <ToggleButton
                            value="ViewReport"
                            style={{
                                backgroundColor:
                                    type === "ViewReport"
                                        ? "var(--selectbackgroundcolor)"
                                        : "inherit",
                                width: "180px",
                                height: "30px",
                            }}
                            className="togglebutton_container"
                        >
                            View Report
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <br></br>
                <br></br>
                {type === "Addtest" && (
                    <>


                        <div className="RegisFormcon_1">
                            <div className="RegisForm_1">
                                <label style={{ fontSize: '20px' }}>
                                    Test Type <span>:</span>
                                </label>
                                <select
                                    name="testType"
                                    value={testType}
                                    autoComplete="off"
                                    onChange={(e) => setTestType(e.target.value)}
                                >
                                    <option value="Individual">Individual</option>
                                    <option value="Favourites">Favourites</option>
                                </select>
                            </div>
                        </div>
                        <br></br>

                        {testType === "Individual" ? (
                            <div className='displayuseraccess'>
                                {activetestnames.map((item, indx) => (
                                    <div key={indx} className='displayuseraccess_child' style={{ marginLeft: "80px" }}>

                                        <input
                                            type="checkbox"
                                            id={item.id}
                                            checked={indivitualChecked.some(checkedItem => checkedItem.id === item.id)}
                                            onChange={() => handleIndividualCheckboxChange(item.id, item.Test_Name)}

                                        />
                                        <label htmlFor={item.id} className='par_acc_lab'>{item.Test_Name}</label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='displayuseraccess'>
                                {FavTest.map((item) => (

                                    <div key={item.id} className='displayuseraccess_child'>

                                        <input
                                            type="checkbox"
                                            id={item.id}
                                            checked={FavouriteChecked.some(checkedItem => checkedItem.key === item.id)}
                                            onChange={() => handleFavoriteCheckboxChange(
                                                item.id,
                                                item.FavouriteName,
                                                item.Current_Amount,
                                                item.TestName,

                                            )}

                                        />
                                        <label htmlFor={item.id} className='par_acc_lab'>{item.FavouriteName}</label>
                                        {item.TestName.map((child, ind1) => (
                                            <div key={ind1} style={{ marginLeft: "20px", marginTop: '5px' }}>
                                                <label htmlFor={child.TestCode} className='chi_acc_lab'>{child.TestName}</label><br />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}

                        {transformedFavouriteData1.length > 0 && (
                            <>
                                <div className="common_center_tag">
                                    <span>Selected Individual TestName</span>
                                </div>
                                <ReactGrid columns={IndivitualColumns} RowData={transformedFavouriteData1} />
                            </>
                        )}

                        <br></br>
                        {transformedFavouriteData.length > 0 && (
                            <>
                                <div className="common_center_tag">
                                    <span>Selected Favourites Name</span>
                                </div>
                                <ReactGrid columns={FavouritesColumns} RowData={transformedFavouriteData} />
                            </>
                        )}




                        <div className="Main_container_Btn">
                            <button onClick={handleSubmitSelectedTest}>
                                save
                            </button>
                        </div>



                        {LabQueueDatas.length > 0 && (
                            <>
                                <div className="Main_container_app">
                                    <ReactGrid columns={LabColumn} RowData={LabQueueDatas} />

                                </div>
                            </>
                        )}
                    </>
                )}
                <br></br>

                {type === "ViewReport" && (
                    <>
                        <div className="RegisFormcon_1">
                            <div className="RegisForm_1">
                                <label htmlFor="ReportDate">
                                    Report Date <span>:</span>
                                </label>
                                <input
                                    type="date"
                                    id="reportdate"
                                    name="reportdate"
                                    value={LabEntry.reportdate}
                                    readOnly
                                />
                            </div>
                            <div className="RegisForm_1">
                                <label htmlFor="ReportTime">
                                    Report Time <span>:</span>
                                </label>
                                <input
                                    type="time"
                                    id="reporttime"
                                    name="reporttime"
                                    value={LabEntry.reporttime}
                                    readOnly
                                />
                            </div>
                            <div className="RegisForm_1">
                                <button
                                    className="fileviewbtn"
                                    onClick={() => Selectedfileview(file)}
                                >
                                    View
                                </button>
                            </div>
                        </div>
                        <br />


                        {viewreportind.length > 0 ? (
                            <>
                                <div className="common_center_tag">
                                    <span>Individual Test</span>
                                </div>
                                <br />
                                <div className="Main_container_app">
                                    <ReactGrid columns={viewreportIndColumns} RowData={viewreportind} />
                                </div>
                            </>
                        ) : null}
                        <br />

                        {viewreportfav.length > 0 ? (
                            <>

                                <div className="common_center_tag">
                                    <span>Favourites Test</span>
                                </div>
                                <br />
                                <div className="Main_container_app">
                                    <ReactGrid columns={viewreportFavColumns} RowData={viewreportfav} />
                                </div>

                            </>
                        ) : null}

                        {/* Show "No data available" if both arrays are empty */}
                        {viewreportind.length === 0 && viewreportfav.length === 0 && (
                            <div className="DivCenter_container">
                                No Test was complete during the previous visit.
                            </div>
                        )}
                    </>
                )}




            </div>



            <ModelContainer />

            <ToastAlert Message={toast.message} Type={toast.type} />


        </>
    );
};

export default LabTest;
