
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import { FaTrash } from 'react-icons/fa';
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ModelContainer from "../../OtherComponent/ModelContainer/ModelContainer";
import VisibilityIcon from '@mui/icons-material/Visibility';



const RadiologyTest = () => {
    const [IsTestNameGet, setIsTestNameGet] = useState(false);
    const [TestNames, setTestNames] = useState([]);
    const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector((state) => state.userRecord?.toast);
    const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
    console.log("ss",IP_DoctorWorkbenchNavigation);
    const dispatchvalue = useDispatch();
    const [completeArr, SetCompleteArr] = useState([]);
    const [type, setType] = useState("AddTest");
    const handlePageChange = (event, newType) => {
        if (newType !== null && newType !== type) {
            setType(newType);
        }
    };
    useEffect(() => {
        axios
            .get(`${UrlLink}Masters/Radiology_details_link_view`)
            .then((res) => {
                const ress = res.data;
                console.log("testnameasas", ress);
                setTestNames(ress);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [IsTestNameGet, UrlLink]);

    const [CheckedTestName, setCheckedTestName] = useState([]);
    const [SubtestNo, setSubtestNo] = useState([]);
    console.log("CheckedTestName", CheckedTestName);
    console.log("SubtestNo", SubtestNo);


    const handleCheckboxChange = (Subtestid, SubTest_Code, SubTestName, Amount, testid, TestName, TestCode, Radiologyid, RadiologyName,SubTestType) => {
        // Check if the current subtest is already checked by matching both SubTest_Code and testid
        const isChecked = CheckedTestName.some(item => item.SubTest_Code === SubTest_Code && item.testid === testid);

        if (isChecked) {
            // If checked, remove it from the array
            const newCheckedState = CheckedTestName.filter(item => !(item.SubTest_Code === SubTest_Code && item.testid === testid));
            setCheckedTestName(newCheckedState);
        } else {
            // If not checked, add it to the array
            const newCheckedState = [
                ...CheckedTestName,
                {
                    Radiologyid,
                    RadiologyName,
                    testid,
                    TestName,
                    TestCode,
                    Subtestid,
                    SubTest_Code,
                    TestCode,
                    SubTestName,
                    SubTestType,
                    Amount,
                }
            ];
            setCheckedTestName(newCheckedState);
        }
    };


    const handleCheckboxSubtestNo = (Curr_Amount, testid, TestName, Radiologyid, RadiologyName, TestCode,SubTestType) => {

        const isChecked = SubtestNo.some(item => item.TestCode === TestCode);
        if (isChecked) {
            const newCheckedState = SubtestNo.filter(item => item.TestCode !== TestCode);
            setSubtestNo(newCheckedState);
        } else {
            const newCheckedState = [...SubtestNo, { Radiologyid, RadiologyName, testid, TestName, Curr_Amount, TestCode,SubTestType }];
            setSubtestNo(newCheckedState);
        }
    };

    const handleRemoveTestName = (row) => {
        // Remove from SubtestNo (if applicable)
        const newSubtestNoState = SubtestNo.filter(
            item => item.testid !== row.testid || item.Radiologyid !== row.Radiologyid
        );
        setSubtestNo(newSubtestNoState);
    };
    const handleRemoveTestName1 = (params) => {

        const { row } = params; // Extract the row data from params


        // Remove from CheckedTestName
        const newCheckedState = CheckedTestName.filter(
            item =>
                item.Radiologyid !== row.Radiologyid ||
                item.TestCode !== row.TestCode ||
                item.SubTest_Code !== row.SubTest_Code
        );
        setCheckedTestName(newCheckedState);

        // Remove from SubtestNo (if applicable)
        const newSubtestNoState = SubtestNo.filter(
            item =>
                item.Radiologyid !== row.Radiologyid ||
                item.TestCode !== row.TestCode
        );
        setSubtestNo(newSubtestNoState);
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
            frozen: true,
        },
        {
            key: "RadiologyName",
            name: "Radiology Name",
            frozen: true,
        },


        {
            key: "TestName",
            name: "Test Name",
            frozen: true,
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <Button
                    className="cell_btn"
                    onClick={() => handleRemoveTestName(params.row)}
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
            key: "RadiologyName",
            name: "RadiologyName",
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
            key: "SubTestName",
            name: "Sub TestName",
        },
        {
            key: "Amount",
            name: "Amount",
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <Button
                    className="cell_btn"
                    onClick={() => handleRemoveTestName1(params)}
                >
                    <FaTrash className="check_box_clrr_cancell" />
                </Button>
            ),
        },
    ];

    const transformFavouriteData1 = (CheckedTestName) => {
        return CheckedTestName.map((sutestyes, ind) => ({
            Radiologyid: sutestyes.Radiologyid,
            RadiologyName: sutestyes.RadiologyName,
            TestCode: sutestyes.TestCode,
            TestName: sutestyes.TestName,
            testid: sutestyes.testid,
            Subtestid: sutestyes.Subtestid, // Include subtestid
            Amount: sutestyes.Amount,
            SubTestName: sutestyes.SubTestName,
            SubTest_Code: sutestyes.SubTest_Code,
            id: ind + 1,  // Ensure unique key for each row
        }));
    };





    const transformFavouriteData = (SubtestNo) => {
        return SubtestNo.map((sutestno, ind) => ({
            Radiologyid: sutestno.Radiologyid, // Correctly assign Radiologyid
            RadiologyName: sutestno.RadiologyName,
            TestCode: sutestno.TestCode,
            TestName: sutestno.TestName,
            testid: sutestno.testid, // Correctly assign testid
            id: ind + 1,  // Ensure unique key for each row
        }));
    };

    const transformedFavouriteData = transformFavouriteData1(CheckedTestName);
    const transformedFavouriteData1 = transformFavouriteData(SubtestNo);

    const [RadiologyTest, setRadiologyTest] = useState({
        RadiologyTestId: "",
        CheckedTestNameArr: "",
        SubtestNoArr: "",
    });
    const [IsRadilogyGet, setIsRadilogyGet] = useState(false);
    const [no, setno] = useState([]);
    const [yes,setyes] = useState([]);

    const handleSubmitRadiologyTest = () => {
        if (CheckedTestName.length > 0 || SubtestNo.length > 0) {
            const data = {
                RadiologyTestId: RadiologyTest.RadiologyTestId,
                CheckedTestNameArr: CheckedTestName,
                SubtestNoArr: SubtestNo,
                created_by: userRecord?.username || "",
                Register_Id: IP_DoctorWorkbenchNavigation?.RegistrationId || "",
                RegisterType:"IP"
            };
            console.log("data", data);
            axios.post(`${UrlLink}OP/Radiology_Request_Detailslink`, data)
                .then((res) => {
                    const resData = res.data;
                    const type = Object.keys(resData)[0];
                    const message = Object.values(resData)[0];
                    const tdata = {
                        message: message,
                        type: type,
                    };
                    dispatchvalue({ type: "toast", value: tdata });
                    setIsRadilogyGet((prev) => !prev);
                    setRadiologyTest({

                        RadiologyTestId: "",
                        CheckedTestNameArr: [],
                        SubtestNoArr: [],
                    });
                    setCheckedTestName([]);
                    setSubtestNo([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            const tdata = {
                message: "Please Select TestNames .",
                type: "warn",
            }
            dispatchvalue({ type: "toast", value: tdata });
        }
    };

    useEffect(()=>{
        const params = {
            Register_Id: IP_DoctorWorkbenchNavigation.RegistrationId,
            RegisterType:"IP"
        };
        axios.get(`${UrlLink}OP/Radiology_Request_Detailslink`,{params})
        .then((res)=>{
            const ress = res.data;
            console.log("response117655",ress);
            // setRadiologyGetNames(ress);
            setyes(ress?.IsSubTestYes);
            setno(ress?.IsSubTestNo);
        })
        .catch((err)=>{
            console.log(err);
        });
    },[IsRadilogyGet,UrlLink,IP_DoctorWorkbenchNavigation.RegistrationId]);

   const yesColumns = [

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
            key: "TestName",
            name: "TestName",
            frozen: true,
        },


        {
            key: "SubTestName",
            name: "Sub TestName",
            frozen: true,
        }
       
    ];

    const noColumns = [

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
            key: "TestName",
            name: "Test Name",
            frozen: true,
        },
       
    ];


    useEffect(() => {
        if (IP_DoctorWorkbenchNavigation?.pk) { // Ensure pk exists
            const params = {
                Register_Id: IP_DoctorWorkbenchNavigation.pk,
                RegisterType: "IP"
            };

            axios.get(`${UrlLink}OP/Radiology_Complete_Details_Link`, { params })
                .then((res) => {
                    const ress = res.data;
                    console.log("Response Data:", ress);
                    SetCompleteArr(ress); // Update state with the response
                })
                .catch((err) => {
                    console.error("Error fetching data:", err);
                });
        }
    }, [UrlLink, IP_DoctorWorkbenchNavigation?.pk]); // Add pk to the dependency array




    
    const RadiologyColumns = [

        {
            key: "id",
            name: "S.No",
            width: "160px",

        },

        {
            key: "RadiologistName",
            name: "Radiologist Name",
        },
        {
            key: "TechnicianName",
            name: "Technician Name",
        },
        {
            key: "RadiologyName",
            name: "Radiology Name",
        },
        {
            key: "TestName",
            name: "TestName",
        },
        {
            key: "SubTestName",
            name: "Sub TestName",
            renderCell: (params) => (
                params.row.SubTestName ? (
                    params.row.SubTestName
                ) : (
                    'No SubTest'
                )
            ),

        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <Button
                    key={params.row.id} // Assuming `id` is unique for each row
                    className="cell_btn"
                    onClick={() => handleViewComplete(params.row)}
                >
                    <VisibilityIcon className="check_box_clrr_cancell" />
                </Button>
            ),
        }

    ];


    const [Radiology, setRadiology] = useState({
        ReportDate: "",
        ReportTime: "",
        RadiologistName: "",
        TechnicianName: "",
        Report: "",
    });
    const [ChooseFile, setChooseFile] = useState({
        ChooseFileOne: null,
        ChooseFileTwo: null,
        ChooseFileThree: null,
    });
    const [IsViewMode, setIsViewMode] = useState(false);
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
    const formatLabel = (label) => {
        if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
            return label
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase());
        } else {
            return label;
        }
    };
    const handleClear = () => {
        setRadiology({
            ReportDate: "",
            ReportTime: "",
            RadiologistName: "",
            TechnicianName: "",
            Report: "",
        });

        setChooseFile({
            ChooseFileOne: null,
            ChooseFileTwo: null,
            ChooseFileThree: null,
        });
    };
    const handleViewComplete = (row) => {
        setIsViewMode(true);
        setRadiology({
            ...row,
            ReportDate: row.ReportDate || "",
            ReportTime: row.ReportTime || "",
            RadiologistName: row.RadiologistName || "",
            TechnicianName: row.TechnicianName || "",
            Report: row.Report || "",
        });
        setChooseFile({
            ChooseFileOne: row.Report_fileone,
            ChooseFileTwo: row.Report_filetwo,
            ChooseFileThree: row.Report_filethree,
        });

    };
    const showAllFilesInModel = () => {
        const fileValues = Object.values(ChooseFile).filter(file => file); // Filter out null values
    
        if (fileValues.length > 0) {
            const tdata = {
                Isopen: true,
                content: fileValues, // Pass all files as an array
                type: "multiple", // Add a type to signify multiple files
            };
            dispatchvalue({ type: "modelcon", value: tdata }); // Dispatch to open modal
        } else {
            const tdata = {
                message: "There are no files to view.",
                type: "warn",
            };
            dispatchvalue({ type: "toast", value: tdata });
        }
    };


    return (
      <>
                  <div className="for">
                  <div className="RegisFormcon">
                  <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
                        <ToggleButtonGroup
                            value={type}
                            exclusive
                            onChange={handlePageChange}
                            aria-label="Platform"
                        >
                            <ToggleButton
                                value="AddTest"
                                style={{
                                    height: "30px",
                                    width: "180px",
                                    backgroundColor:
                                        type === "AddTest"
                                            ? "var(--selectbackgroundcolor)"
                                            : "inherit",
                                }}
                                className="togglebutton_container"
                            >
                                Add Test
                            </ToggleButton>
                            <ToggleButton
                                value="ViewTest"
                                style={{
                                    backgroundColor:
                                        type === "ViewTest"
                                            ? "var(--selectbackgroundcolor)"
                                            : "inherit",
                                    width: "180px",
                                    height: "30px",
                                }}
                                className="togglebutton_container"
                            >
                                View Test
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
      
                    {type === "AddTest" && (
                        <>
                                <div className="new-patient-registration-form">
            <div className='displayuseraccess'>
                {TestNames.map((item) => (
                    <div key={item.id} className='displayuseraccess_child'>
                        <label htmlFor={item.id} style={{ fontSize: '20px', fontWeight: 'bold' }} className='par_acc_lab'>
                            {item.RadiologyName}
                        </label>
                        {item.TestNames.filter(test => test.Types === "No").map((test) => (
                            <div key={test.id} style={{ marginLeft: '20px', marginTop: '5px' }}>
                                <input
                                    type="checkbox"
                                    id={test.id}
                                    onChange={() => handleCheckboxSubtestNo(test.Curr_Amount, test.id, test.TestName, item.id, item.RadiologyName, test.TestCode,test.Types )}
                                    checked={SubtestNo.some(checkedItem => checkedItem.TestCode === test.TestCode)}

                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor={test.id} className='chi_acc_lab'>
                                    {test.TestName}
                                </label>
                            </div>
                        ))}
                        {item.TestNames.filter(test => test.Types === "Yes").map((test) => (
                            <div key={test.id} className='displayuseraccess_child'>
                                <label htmlFor={test.id} style={{ fontSize: '16px', fontWeight: 'bold' }} className="par_acc_lab">
                                    {test.TestName}
                                </label>
                                {test.Sub_test_data && test.Sub_test_data.map((subTest) => (
                                    <div key={subTest.id} style={{ marginLeft: '20px', marginTop: '5px' }}>
                                        <input
                                            type="checkbox"
                                            id={subTest.SubTest_Code}
                                            onChange={() => handleCheckboxChange(subTest.id, subTest.SubTest_Code, subTest.SubTestName, subTest.Amount, test.id, test.TestName, test.TestCode, item.id, item.RadiologyName,test.Types)}
                                            checked={CheckedTestName.some(checkedItem => checkedItem.SubTest_Code === subTest.SubTest_Code)}
                                            style={{ marginRight: '10px' }}
                                        />
                                        <label htmlFor={subTest.SubTest_Code} style={{ fontSize: '16px', color: '#555' }}>
                                            {subTest.SubTestName}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {transformedFavouriteData1.length > 0 && (
                <>
                    <div className="common_center_tag">
                        <span>Selected TestName</span>
                    </div>
                    <ReactGrid columns={IndivitualColumns} RowData={transformedFavouriteData1} />
                </>
            )}
            {transformedFavouriteData.length > 0 && (
                <>
                    <div className="common_center_tag">
                        <span>Selected SubTest Name</span>
                    </div>
                    <ReactGrid columns={FavouritesColumns} RowData={transformedFavouriteData} />
                </>
            )}
            <div className="Main_container_Btn">
                <button onClick={handleSubmitRadiologyTest}>

                    save
                </button>
            </div>

            {yes?.length > 0 && (
                <>
                
                    <ReactGrid columns={yesColumns} RowData={yes} />
                </>
            )}
                {no?.length > 0 && (
                <>
                  
                    <ReactGrid columns={noColumns} RowData={no} />
                </>
            )}
           
        </div>
                        </>
                    )}
                  {type === "ViewTest" && (

<>
    {completeArr?.length > 0 && (
        <>

            <ReactGrid columns={RadiologyColumns} RowData={completeArr} />
        </>
    )}


    {completeArr.length === 0 && (
        <div className="DivCenter_container">
            No Test was complete during the previous visit.
        </div>
    )}
    <br></br>
    <div className="RegisFormcon_1">
        <div className="RegisForm_1">
            <label htmlFor="ReportDate">
                Report Date <span>:</span>
            </label>
            <input
                type="date"
                id="ReportDate"
                name="ReportDate"
                value={Radiology.ReportDate}
                readOnly={IsViewMode}
            />
        </div>
        <div className="RegisForm_1">
            <label htmlFor="ReportTime">
                Report Time <span>:</span>
            </label>
            <input
                type="time"
                id="ReportTime"
                name="ReportTime"
                value={Radiology.ReportTime}
                readOnly={IsViewMode}
            />
        </div>
        <div className="RegisForm_1">
            <label htmlFor="ReceiptNo">
                Radiologist Name <span>:</span>
            </label>
            <input
                type="text"
                id="RadiologistName"
                name="RadiologistName"
                value={Radiology.RadiologistName}
                readOnly={IsViewMode}
                required
            />
        </div>
        <div className="RegisForm_1">
            <label htmlFor="ReportTime">
                Technician Name <span>:</span>
            </label>
            <input
                type="text"
                id="TechnicianName"
                name="TechnicianName"
                value={Radiology.TechnicianName}
                readOnly={IsViewMode}
            />
        </div>
    </div>
    <div className="RegisFormcon_1">
        {Object.keys(ChooseFile).map((field, indx) => (
            <div className="RegisForm_1" key={indx}>
                <label htmlFor={`${field}_${indx}_${field}`}>
                    {" "}
                    {formatLabel(field)} <span>:</span>{" "}
                </label>

                <div
                    style={{
                        width: "150px",
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <button
                        className="fileviewbtn"
                        onClick={() => Selectedfileview(ChooseFile[field])}
                    >
                        view
                    </button>
                </div>
            </div>
        ))}
    </div>

 
    <div className="RegisFormcon_1">
                                   <div className="RegisForm_1">
                                    <label htmlFor="ReportTime">
                                        View All <span>:</span>
                                    </label>
                                    <button
                                    className="fileviewbtn"
                                    onClick={showAllFilesInModel}
                                >
                                    ViewAll
                                </button>
                                </div>
                            </div> 
    <div className="Otdoctor_intra_Con_2 with_increse_85">
        <label htmlFor="Report">
            Report <span>:</span>
        </label>
        <textarea
            type="text"
            id="Report"
            name="Report"
            value={Radiology.Report}
            readOnly={IsViewMode}
            required
        />
    </div>


    {IsViewMode && (
        <div className="Main_container_Btn">
            <button onClick={handleClear}>
                Clear
            </button>
        </div>
    )}


</>
)}        
 <ModelContainer />
 <ToastAlert Message={toast.message} Type={toast.type} />
        </div>
        </div>
        </>

    );

};

export default RadiologyTest;

