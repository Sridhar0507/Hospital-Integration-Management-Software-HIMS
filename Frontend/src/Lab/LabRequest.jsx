
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../DoctorWorkBench/Navigation.css";
import ReactGrid from "../OtherComponent/ReactGrid/ReactGrid";
import ToastAlert from "../OtherComponent/ToastContainer/ToastAlert";
import { useNavigate } from "react-router-dom";
import bgImg2 from "../Assets/bgImg2.jpg";

const LabRequest = () => {
    const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector((state) => state.userRecord?.toast);
    const LabWorkbenchNavigation = useSelector(state => state.Frontoffice?.LabWorkbenchNavigation);
    console.log("LabWorkbenchNavigation",LabWorkbenchNavigation)
    const dispatchvalue = useDispatch();
    const [IsTestGet, setIsTestGet] = useState([]);
    const [checkedTests, setCheckedTests] = useState([]);
    console.log("checkedTests",checkedTests);
    const [reason, setReason] = useState({});
    const [amounts, setAmounts] = useState({});
    console.log("amounts",amounts);
    console.log("reason",reason);
    const [labname, setlabname] = useState({});
    const [labamounts, setlabAmounts] = useState({});
    console.log("labamounts", labamounts);
    console.log("labname", labname)
    const [showTextarea, setShowTextarea] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(LabWorkbenchNavigation).length === 0) {
            navigate('/Home/LabQuelist')
        }
    }, [LabWorkbenchNavigation, navigate])

   
    


    useEffect(() => {
        const params = {
            Register_Id: LabWorkbenchNavigation?.params?.RegistrationId,
            Patient_Id: LabWorkbenchNavigation?.params?.PatientId,
            RegisterType: LabWorkbenchNavigation?.params?.RegisterType,
            Status: LabWorkbenchNavigation?.params?.Status,
        };
    
        axios.get(`${UrlLink}OP/Lab_Request_TestDetails`, { params })
            .then((res) => {
                console.log("Requestdata", res.data);
                const ress = res.data;
    
                const IndividualRequestsarr = ress?.AllTestDetails;
    
                // Check if the AllTestDetails array is empty
                if (!IndividualRequestsarr || IndividualRequestsarr.length === 0) {
                    // Navigate to LabQuelist if the array is empty
                    navigate('/Home/LabQuelist');
                    const tdata = {
                        message: 'There is No Action Request.',
                        type: 'warn',
                    }
                    dispatchvalue({ type: 'toast', value: tdata });
                    return;  // Early exit if navigation is triggered
                }
    
                // Initialize checkedTests with all tests checked
                const initialCheckedTests = IndividualRequestsarr.map(test => ({ testCode: test.TestCode, amount: '' }));
                setCheckedTests(initialCheckedTests);
    
                setIsTestGet(ress);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink, LabWorkbenchNavigation?.params?.RegistrationId, LabWorkbenchNavigation?.params?.RegisterType, LabWorkbenchNavigation?.params?.PatientId, LabWorkbenchNavigation?.params.Status, navigate]);
    

    const handleInputChange = (e, LabNames) => {
        const { name, id, value, checked } = e.target;
        const testCode = id.split('-')[1]; // Extract testCode from the element ID
    
        // Handle TestName checkbox change
        if (name === 'TestName') {
            setCheckedTests(prevCheckedTests => {
                let updatedCheckedTests = [...prevCheckedTests];
                const testIndex = updatedCheckedTests.findIndex(test => test.testCode === testCode);
    
                if (checked) {
                    // Add test if checked
                    if (testIndex === -1) {
                        updatedCheckedTests.push({ testCode, amount: amounts[testCode] || '' });
                        // Remove from uncheckedTests if it exists
                        setUncheckedTests(prevUncheckedTests =>
                            prevUncheckedTests.filter(test => test.testCode !== testCode)
                        );
                    }
                } else {
                    // Remove test if unchecked
                    if (testIndex > -1) {
                        updatedCheckedTests.splice(testIndex, 1); // Remove the test
                        setAmounts(prevAmounts => ({
                            ...prevAmounts,
                            [testCode]: "" // Reset the amount for the unselected test
                        }));
                    }
                    // Show reason textarea for unchecked tests
                    setShowTextarea(true);
                    // Add the unchecked test to the list with a default empty reason
                    setUncheckedTests(prevUncheckedTests => [
                        ...prevUncheckedTests,
                        { testCode, reason: '' }
                    ]);
                }
    
                return updatedCheckedTests;
            });
        }
    
        // Handle LabName selection
        if (name === "labname") {
            const selectedLab = LabNames.find(lab => lab.outsourceid === parseInt(value, 10)); // Find selected lab by ID
    
            console.log("Selected Lab:", selectedLab, "Selected Value:", value); // Debugging log
    
            // Update the selected lab name for the testCode
            setlabname(prev => ({
                ...prev,
                [testCode]: value
            }));
    
            if (selectedLab) {
                // Update lab amount if lab is selected
                setlabAmounts(prev => ({
                    ...prev,
                    [testCode]: selectedLab.labAmount || '0.00' // Set lab amount for the selected lab
                }));
    
                // Update checked tests with lab name and labAmount
                setCheckedTests(prevCheckedTests =>
                    prevCheckedTests.map(test =>
                        test.testCode === testCode
                            ? { ...test, labname: selectedLab.outsourceid, labAmount: selectedLab.labAmount } // Update lab details in checkedTests
                            : test
                    )
                );
            } else {
                // Reset lab amount if no lab is selected
                setlabAmounts(prev => ({
                    ...prev,
                    [testCode]: '0.00' // Default amount when no lab selected
                }));
            }
        }
    
        // Handle EnterAmount change
        if (name === 'EnterAmount') {
            setAmounts(prevAmounts => ({
                ...prevAmounts,
                [testCode]: value // Update entered amount
            }));
    
            // Update the checked test's amount
            setCheckedTests(prevCheckedTests => {
                return prevCheckedTests.map(test =>
                    test.testCode === testCode ? { ...test, amount: value } : test
                );
            });
        }
    };
    




    const IndivitualTestNameColumns = [
        {
            key: "Id",
            name: "S.NO",
            frozen: true,
        },
        {
            key: "TestName",
            name: "Test Name",
            width: 280,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center', padding: '5px', gap: '30px' }}>
                    <input
                        type="checkbox"
                        name='TestName'
                        id={`TestName-${params.row.TestCode}`}  // Unique ID based on TestCode
                        checked={checkedTests.some(test => test.testCode === params.row.TestCode)}
                        style={{ cursor: 'pointer' }}
                        onChange={handleInputChange}
                    />
                    <span>{params.row.TestName}</span>
                </div>
            ),
        },
        {
            key: "Amount",
            name: "Amount",
            width: 200,
        },
        {
            key: "OutSourceType",  // Changed key to make it unique
            name: "IsOutSource",
            width: 200,
        },
        {
            key: "OutSourceLabName",
            name: "OutSource LabName",
            width: 280,
            renderCell: (params) => {
                const isOutSource = params?.row?.Types === "Yes";
                const LabNames = params?.row?.LabInfo; // Assume LabInfo is an array of objects
                const selectedLabId = labname[params.row.TestCode] || ''; // Get the current selected lab ID (outsourceid)

                console.log("Selected Lab ID:", selectedLabId); // Logs the selected lab ID for debugging

                return (
                    <div>
                        {isOutSource && LabNames && LabNames.length > 0 ? (
                            <select
                                name="labname"
                                id={`labname-${params.row.TestCode}`}
                                value={selectedLabId} // Use the selected lab ID for the value
                                onChange={(e) => handleInputChange(e, LabNames)} // Pass LabNames to handleInputChange
                                disabled={!checkedTests.some(test => test.testCode === params.row.TestCode)}
                            >
                                <option value="">Select</option>
                                {LabNames.map((dept, indx) => (
                                    <option key={indx} value={dept.outsourceid}> {/* Set the value to outsourceid */}
                                        {dept.labname}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <span>InHouse</span>
                        )}
                    </div>
                );
            },
        },

        {
            key: "OutSourceLabAmount",  // Changed key to make it unique
            name: "OutSource LabAmount",
            width: 280,
            renderCell: (params) => {
                const isOutSource = params?.row?.Types === "Yes";

                return (
                    <div>
                        {isOutSource ? (
                            <span>
                                {/* Display lab amount if test is checked and lab amount exists, otherwise '0.00' */}
                                {checkedTests.some(test => test.testCode === params.row.TestCode)
                                    ? labamounts[params.row.TestCode] || '0.00'
                                    : '0.00'}
                            </span>// Display the lab amount or 0.00 if not selected
                        ) : (
                            <span>0.00</span> // Default for InHouse
                        )}
                    </div>
                );
            },
        },
        {
            key: "EnterAmount",
            name: "Enter Amount",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="RegisForm_1" style={{ padding: '5px' }}>
                        <input
                            type="number"
                            name='EnterAmount'
                            id={`EnterAmount-${params.row.TestCode}`}  // Unique ID based on TestCode
                            value={amounts[params.row.TestCode] || ''}
                            onKeyDown={(e) =>
                                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                            }
                            checked={checkedTests.some(test => test.testCode === params.row.TestCode)}
                            onChange={handleInputChange}
                            style={{ width: '100px' }}
                            disabled={!checkedTests.some(test => test.testCode === params.row.TestCode)}
                        />
                    </div>
                );
            },
        },
    ];


    const [uncheckedTests, setUncheckedTests] = useState([]);
    console.log("uncheckedTests", uncheckedTests)
    const handleSubmitRequest = () => {
        const data = {
            RegistrationId: LabWorkbenchNavigation?.params?.RegistrationId,
            RegisterType: LabWorkbenchNavigation?.params?.RegisterType,
            created_by: userRecord?.username || "",
            IndividualArr: checkedTests || [],
            uncheckedTestsArr: uncheckedTests || [],
        };

        console.log("12345", data);

        // Function to check if an amount is valid (greater than 0)
        const isValidAmount = (test) => test.amount > 0;

        // Check for invalid amounts in checkedTests and favcheckedTests
        const invalidCheckedTests = checkedTests.filter(test => !isValidAmount(test));

        if (IsTestGet?.AllTestDetails.length === checkedTests.length) {
            setUncheckedTests([]);
        }
        if (invalidCheckedTests.length > 0) {
            dispatchvalue({
                type: "toast",
                value: { message: "Please enter a valid amount for all checked tests .", type: "warn" }
            });
        } else {
            console.log("postdata", data);
            axios.post(`${UrlLink}OP/Lab_SelectedTest_Detailslink`, data)
                .then((res) => {
                    const { data } = res;
                    const type = Object.keys(data)[0];
                    const message = Object.values(data)[0];
                    dispatchvalue({ type: "toast", value: { message, type } });
                    setCheckedTests([]);
                    setUncheckedTests([]);
                    setShowTextarea(false);
                    setlabname({});
                    setlabAmounts({});


                })
                .catch((err) => {
                    console.error("Error during request:", err);
                    dispatchvalue({
                        type: "toast",
                        value: { message: "Error during request.", type: "warn" }
                    });
                });
        }
    };

    const handleReasonChange = (e, testCode) => {
        const newReason = e.target.value;


        // Update the reason in the state object
        setReason(prevReason => ({
            ...prevReason,
            [testCode]: newReason
        }));

        // Update the uncheckedTests array with the new reason
        setUncheckedTests(prevUncheckedTests =>
            prevUncheckedTests.map(test =>
                test.testCode === testCode ? { ...test, reason: newReason } : test
            )
        );




    };

    const getReason = () => {
        const test = uncheckedTests[0];
        if (test) {
            return reason[test.testCode] || '';
        }
        return '';
    };

    const handleChange = (e) => {
        const test = uncheckedTests[0];
        if (test) {
            if (test.testCode) {
                handleReasonChange(e, test.testCode);
            }
        }
    };
    useEffect(() => {
        // Update showTextarea based on the length of uncheckedTests
        setShowTextarea(uncheckedTests.length > 0);
    }, [uncheckedTests]);

    useEffect(() => {
        // Determine if all tests are unchecked to set showTextarea
        const allTests = [...checkedTests];
        const allUnchecked = allTests.every(test => test.amount === '');
        setShowTextarea(allUnchecked);
    }, [checkedTests]);



    return (
        <>
            <div className="Main_container_app">

                <div className="new-patient-registration-form">
                    <br />
                    <div className="dctr_info_up_head">
                        <div className="RegisFormcon ">
                            <div className="dctr_info_up_head22">

                                <img src={bgImg2} alt="Patient Profile" />

                                <label>Profile</label>
                            </div>
                        </div>
                        <div className="RegisFormcon_1">
                            <div className="RegisForm_1 ">
                                <label htmlFor="PatientID">
                                    Patient ID <span>:</span>
                                </label>
                                <span className="dctr_wrbvh_pice" htmlFor="PatientID">
                                    {LabWorkbenchNavigation?.params?.PatientId}
                                </span>
                            </div>
                            <div className="RegisForm_1 ">
                                <label htmlFor="PatientName">
                                    Patient Name <span>:</span>{" "}
                                </label>
                                <span className="dctr_wrbvh_pice" htmlFor="PatientName">
                                    {LabWorkbenchNavigation?.params?.PatientName}
                                </span>
                            </div>
                            <div className="RegisForm_1 ">
                                <label htmlFor="Age">
                                    Age <span>:</span>{" "}
                                </label>
                                <span className="dctr_wrbvh_pice" htmlFor="Age">
                                    {IsTestGet?.PatientAge}
                                </span>
                            </div>
                            <div className="RegisForm_1 ">
                                <label htmlFor="Gender">
                                    Gender <span>:</span>{" "}
                                </label>
                                <span className="dctr_wrbvh_pice" htmlFor="Gender">
                                    {IsTestGet?.PatientGender}
                                </span>
                            </div>
                            <div className="RegisForm_1 ">
                                <label htmlFor="PhoneNumber">
                                    Phone Number<span>:</span>{" "}
                                </label>
                                <span className="dctr_wrbvh_pice" htmlFor="PhoneNumber">
                                    {LabWorkbenchNavigation?.params?.PhoneNumber}
                                </span>
                            </div>
                            <div className="RegisForm_1 ">
                                <label htmlFor="DoctorShortName">
                                    Doctor Name<span>:</span>{" "}
                                </label>
                                <span className="dctr_wrbvh_pice" htmlFor="DoctorShortName">
                                    {LabWorkbenchNavigation?.params?.DoctorShortName}
                                </span>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
                <div className="new-navigation">
                    <div className="common_center_tag">
                        <span>Lab Request</span>
                    </div>
                </div>
                <br />




                {IsTestGet.AllTestDetails && IsTestGet.AllTestDetails.length > 0 && (
                    <ReactGrid columns={IndivitualTestNameColumns} RowData={IsTestGet.AllTestDetails} />
                )}







                {uncheckedTests.length > 0 && (
                    <div className="treatcon_body_1">
                        <label htmlFor="reason">Reason for not Selecting Test</label>
                        <span>:</span>
                        <textarea
                            className="treatcon_body_1 textarea"
                            id="reason"
                            name="reason"
                            value={getReason()} // Display the reason for the first unchecked test css add treatmentcomponent line 85
                            onChange={handleChange}
                        />
                    </div>
                )}





                <div className="Main_container_Btn">
                    <button
                        onClick={handleSubmitRequest}

                    >
                        Save
                    </button>
                </div>





                <ToastAlert Message={toast.message} Type={toast.type} />



            </div>

        </>
    )
}

export default LabRequest



