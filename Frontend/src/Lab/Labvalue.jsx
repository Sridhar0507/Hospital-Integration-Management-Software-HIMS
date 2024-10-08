import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../DoctorWorkBench/Navigation.css";
import ReactGrid from "../OtherComponent/ReactGrid/ReactGrid";
import ToastAlert from "../OtherComponent/ToastContainer/ToastAlert";
import { useNavigate } from "react-router-dom";
import bgImg2 from "../Assets/bgImg2.jpg";
import ModelContainer from "../OtherComponent/ModelContainer/ModelContainer";

const Labvalue = () => {
    const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector((state) => state.userRecord?.toast);
    const LabWorkbenchNavigation = useSelector(state => state.Frontoffice?.LabWorkbenchNavigation);
    const dispatchvalue = useDispatch();
    const [IsTestGet, setIsTestGet] = useState([]);
    const [checkedTests, setCheckedTests] = useState([]);
    const navigate = useNavigate();

    const [favcheckedTests, setfavcheckedTests] = useState([]);

    const [Values, setValues] = useState({});
    

    const [Description, setDescription] = useState({});

    useEffect(() => {
        if (Object.keys(LabWorkbenchNavigation).length === 0) {
            navigate('/Home/LabCompleted');
        }
    }, [LabWorkbenchNavigation, navigate]); // Include `navigate` in the dependency array


    useEffect(() => {
        const params = {
            Register_Id: LabWorkbenchNavigation?.params?.RegistrationId,
            Patient_Id: LabWorkbenchNavigation?.params?.PatientId,
            Status: LabWorkbenchNavigation?.params?.Status,
            RegisterType: LabWorkbenchNavigation?.params?.RegisterType
        };

        axios.get(`${UrlLink}OP/Lab_Complete_TestDetails`, { params })
            .then((res) => {
                const ress = res.data;
                // console.log("resslon",ress);

                const IndividualRequestsarr = ress?.IndividualRequests;
                const FavouriteRequestsarr = ress?.FavouritesRequests;

                setIsTestGet(ress);
                setCheckedTests(IndividualRequestsarr);
                setfavcheckedTests(FavouriteRequestsarr);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink, LabWorkbenchNavigation?.params?.RegistrationId, LabWorkbenchNavigation?.params?.PatientId, LabWorkbenchNavigation?.params?.Status,LabWorkbenchNavigation?.params?.RegisterType]);



    const [LabEntry, setLabEntry] = useState({
        ReportDate: "",
        ReportTime: "",
        TechnicianName: "",
        ReportHandoOvered: "",
        RelativeName: "",
    });
    const [ChooseFile, setChooseFile] = useState({
        ChooseFileOne: null,
    });





    const handleLabEntryChange = (e) => {
        const { name, value } = e.target;
        setLabEntry((previous) => ({
            ...previous,
            [name]: value,
        }));
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
    const handleinpchangeDocumentsForm = (e) => {
        console.log(e);
        const { name, value, files } = e.target;

        // Trim the value for non-file inputs
        let formattedValueval = value?.trim();

        if (name === 'ChooseFileOne') {
            // Ensure that files exist and are not empty
            if (files && files.length > 0) {
                let formattedValue = files[0];

                // Optional: Add validation for file type and size
                const allowedTypes = ["application/pdf", "image/jpeg", "image/png"]; // Example allowed types
                const maxSize = 5 * 1024 * 1024; // Example max size of 5MB
                console.log(formattedValue);
                console.log(formattedValue.type);

                if (!allowedTypes.includes(formattedValue.type) || formattedValue.type === "") {
                    // Dispatch a warning toast or handle file type validation
                    const tdata = {
                        message: "Invalid file type. Please upload a PDF, JPEG, or PNG file.",
                        type: "warn",
                    };
                    dispatchvalue({ type: "toast", value: tdata });
                } else if (formattedValue.size > maxSize) {
                    // Dispatch a warning toast or handle file size validation
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
                // Handle case where no file is selected
                const tdata = {
                    message: "No file selected. Please choose a file to upload.",
                    type: "warn",
                };
                dispatchvalue({ type: "toast", value: tdata });
            }
        } else {
            // Update form state for non-file inputs
            setChooseFile((prev) => ({
                ...prev,
                [name]: formattedValueval,
            }));
        }



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


    const handleValueChange = (e, testCode) => {
        console.log("ee", testCode);
        const newValue = e.target.value;

        // Update local state Values
        setValues(prevValues => ({
            ...prevValues,
            [testCode]: newValue
        }));



        // Update checkedTests array
        setCheckedTests(prevCheckedTests =>
            prevCheckedTests.map(test =>
                test.TestCode === testCode
                    ? { ...test, Values: newValue } // Update the specific testCode
                    : test
            )
        );
    };


    const handleDescriptionChange = (e, testCode) => {
        console.log("des", testCode);
        const newValue = e.target.value;

        // Update local state Values
        setDescription(prevValues => ({
            ...prevValues,
            [testCode]: newValue
        }));



        // Update checkedTests array
        setCheckedTests(prevCheckedTests =>
            prevCheckedTests.map(test =>
                test.TestCode === testCode
                    ? { ...test, Description: newValue } // Update the specific testCode
                    : test
            )
        );
    };


    const IndivitualTestNameColumns = [
        { key: "TestName", name: "Test Name" },
        { key: "CategoryType", name: "CategoryType" },
        {
            key: "Value",
            name: "Value",
            width:300,
            renderCell: (params) => (
                <div className="RegisForm_1">
                    <input
                        type="text"
                        value={Values[params.row.TestCode] || ''}
                        onChange={(e) => handleValueChange(e, params.row.TestCode)}
                    />
                </div>
            ),
        },
        {
            key: "Description",
            name: "Description",
            width:300,
            renderCell: (params) => (
                <div className="RegisForm_1">
                    <textarea
                        className="textarea"
                        value={Description[params.row.TestCode] || ''}
                        onChange={(e) => handleDescriptionChange(e, params.row.TestCode)}
                    />
                </div>
            ),
        },
    ];


    const handleValueChange1 = (e, testCode) => {
        console.log("ee1", testCode);
        const newValue = e.target.value;

        // Update local state Values
        setValues(prevValues => ({
            ...prevValues,
            [testCode]: newValue
        }));



        // Update checkedTests array
        setfavcheckedTests(prevCheckedTests =>
            prevCheckedTests.map(test =>
                test.TestCode === testCode
                    ? { ...test, Values: newValue } // Update the specific testCode
                    : test
            )
        );
    };


    const handleDescriptionChange1 = (e, testCode) => {
        console.log("des1", testCode);
        const newValue = e.target.value;

        // Update local state Values
        setDescription(prevValues => ({
            ...prevValues,
            [testCode]: newValue
        }));



        // Update checkedTests array
        setfavcheckedTests(prevCheckedTests =>
            prevCheckedTests.map(test =>
                test.TestCode === testCode
                    ? { ...test, Description: newValue } // Update the specific testCode
                    : test
            )
        );
    };








    const FavouritesTestNameColumns = [
        { key: "FavouriteName", name: "FavouriteName" },
        { key: "CategoryType", name: "CategoryType" },
        { key: "TestName", name: "Test Name" },
        {
            key: "Value",
            name: "Value",
            width:300,
            renderCell: (params) => (
                params.row.TestCode ? (
                    <div className="RegisForm_1">
                        <input
                            type="text"
                            value={Values[params.row.TestCode] || ''}
                            onChange={(e) => handleValueChange1(e, params.row.TestCode)}
                        />
                    </div>
                ) : null
            ),
        },
        {
            key: "Description",
            name: "Description",
            width:300,
            renderCell: (params) => (
                params.row.TestCode ? (
                    <div className="RegisForm_1">
                        <textarea
                            className="textarea"
                            value={Description[params.row.TestCode] || ''}
                            onChange={(e) => handleDescriptionChange1(e, params.row.TestCode)}
                        />
                    </div>
                ) : null
            ),
        },
    ];






    const handleSubmitLabEntry = () => {
     
       
        // Create a new FormData object
        const labentrydatatosend = new FormData();
    
        // Append fields from LabEntry to FormData
        Object.keys(LabEntry).forEach((key) => {
            labentrydatatosend.append(key, LabEntry[key]);
        });
    
        // Append serialized arrays to FormData
        labentrydatatosend.append('checkarr', JSON.stringify(checkedTests || []));
        labentrydatatosend.append('FavArr', JSON.stringify(favcheckedTests || []));
        labentrydatatosend.append('RegistrationId', LabWorkbenchNavigation?.params?.RegistrationId);
        labentrydatatosend.append('RegisterType', LabWorkbenchNavigation?.params?.RegisterType);
        labentrydatatosend.append('created_by', userRecord?.username || "");
    
        // Append the file from ChooseFile to FormData if it exists
        if (ChooseFile.ChooseFileOne) {
            labentrydatatosend.append('ChooseFile', ChooseFile.ChooseFileOne);
        }
    
        // Logging FormData object for debugging
        for (let pair of labentrydatatosend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
        }
     
        // Send the form data using axios
        axios
            .post(`${UrlLink}OP/Lab_PaidDetails_link`, labentrydatatosend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                // console.log(res.data);
                const responsedata = res.data;
                let typp = Object.keys(responsedata)[0];
                let mess = Object.values(responsedata)[0];
                const tdata = {
                    message: mess,
                    type: typp,
                };
    
                dispatchvalue({ type: "toast", value: tdata });
                            // Reset fields after successful submission
            setLabEntry({
                ReportDate: "",
                ReportTime: "",
                TechnicianName: "",
                ReportHandoOvered: "",
                RelativeName: "",
            });

            setCheckedTests([]);
            setfavcheckedTests([]);
            setChooseFile({
                ChooseFileOne: null,
            });
            setValues({});
            setDescription({});

               
            })
            .catch((err) => {
                console.log(err);
                
            });
    };
    
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



                <div className="RegisFormcon_1">
                    <div className="new-navigation">
                        <div className="common_center_tag">
                            <span>Lab Report Entry</span>
                        </div>
                    </div>
                    <br />



                    <div className="RegisForm_1">
                        <label htmlFor="ReportDate">
                            Report Date <span>:</span>
                        </label>
                        <input
                            type="date"
                            id="ReportDate"
                            name="ReportDate"
                            onChange={handleLabEntryChange}
                            value={LabEntry.ReportDate}
                            required
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
                            onChange={handleLabEntryChange}
                            value={LabEntry.ReportTime}
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
                            onChange={handleLabEntryChange}
                            value={LabEntry.TechnicianName}
                            required
                        />
                    </div>
                    <br />
                    <div className="RegisForm_1">
                        {Object.keys(ChooseFile).map((field, indx) => (
                            <div className="RegisForm_1" key={indx}>
                                <label htmlFor={`${field}_${indx}_${field}`}>
                                    {" "}
                                    {formatLabel(field)} <span>:</span>{" "}
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
                                        onClick={() => Selectedfileview(ChooseFile[field])}
                                    >
                                        view
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="RegisForm_1">
                        <label htmlFor="ReportHandoOvered">
                            Report Handovered by <span>:</span>
                        </label>
                        <input
                            type="text"
                            id="ReportHandoOvered"
                            name="ReportHandoOvered"
                            onChange={handleLabEntryChange}
                            value={LabEntry.ReportHandoOvered}
                            required
                        />
                    </div>
                    <div className="RegisForm_1">
                        <label htmlFor="RelativeName">
                            Report Handovered to<span>:</span>
                        </label>
                        <input
                            type="text"
                            id="RelativeName"
                            name="RelativeName"
                            onChange={handleLabEntryChange}
                            value={LabEntry.RelativeName}
                            required
                        />
                    </div>


                </div>
                <br />


                {checkedTests?.length > 0 && (
                    <div className="common_center_tag">
                        <span>Individual Test Names</span>
                    </div>
                )}


                <ReactGrid
                    columns={IndivitualTestNameColumns}
                    RowData={checkedTests.map((row, index) => ({
                        ...row,
                        key: `${row.TestCode || 'test'}-${row.Id || index}-${index}`, // Concatenate to ensure uniqueness
                    }))}
                />
                <br />

                {favcheckedTests?.length > 0 && (
                    <div className="common_center_tag">
                        <span>Favourites TestNames</span>
                    </div>
                )}

                <ReactGrid
                    columns={FavouritesTestNameColumns}
                    RowData={favcheckedTests.map((row, index) => ({
                        ...row,
                        key: `${row.FavouriteCode || 'fav'}-${row.Id || index}-${index}`, // Concatenate to ensure uniqueness
                    }))}
                />


                <div className="Main_container_Btn">
                    <button
                        onClick={handleSubmitLabEntry}

                    >
                        Save
                    </button>
                </div>
           <ModelContainer />
                <ToastAlert Message={toast.message} Type={toast.type} />
            </div>
        </>

    )
}

export default Labvalue
