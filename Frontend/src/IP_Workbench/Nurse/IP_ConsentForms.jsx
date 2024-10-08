import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModelContainer from '../../OtherComponent/ModelContainer/ModelContainer';

const IP_ConsentForms = () => {
    const dispatch = useDispatch();
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
    const userRecord = useSelector(state => state.userRecord?.UserData);

    const [ConsentForm, setConsentForm] = useState({
        Date: "",
        Time: "",
        Department: "",
        ConsentFormName: "",
        ChooseDocument: null,
        ChkBox: false,
        SisterName: "",
    });

    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [consentFormNameOptions, setConsentFormNameOptions] = useState({});
    const [gridData, setGridData] = useState([]);
    const [IsGetData, setIsGetData] = useState(false);
    const [IsViewMode, setIsViewMode] = useState(false);
   
    const Selectedfileview = (fileval) => {
        if (fileval) {
            let tdata = {
                Isopen: false,
                content: null,
                type: "image/jpg",
            };
            if (["data:image/jpeg;base64", "data:image/jpg;base64"].includes(fileval?.split(",")[0])) {
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

            dispatch({ type: "modelcon", value: tdata });
        } else {
            const tdata = {
                message: "There is no file to view.",
                type: "warn",
            };
            dispatch({ type: "toast", value: tdata });
        }
    };
    const ConsentFormColumns = [
        { key: 'id', name: 'S.No', frozen: true },
        { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },
        { key: 'Date', name: 'Date', frozen: true },
        { key: 'Time', name: 'Time', frozen: true },
        { key: 'ConsentFormName', name: 'ConsentFormName' },
        { key: 'SisterName', name: 'SisterName' },
        {
            key: "ChooseDocument",
            name: "ChooseDocument",
            renderCell: (params) => (
                <IconButton className="cell_btn" onClick={() => Selectedfileview(params.row.ChooseDocument)}>
                    <VisibilityIcon />
                </IconButton>
            ),
        },
        {
            key: 'view',
            frozen: true,
            name: 'View',
            renderCell: (params) => (
                <IconButton onClick={() => handleView(params.row)}>
                    <VisibilityIcon />
                </IconButton>
            ),
        },
    ];

    const handleView = (data) => {
        const departmentId = data.Department;
        const relatedConsentForms = consentFormNameOptions[departmentId] || [];
        setConsentFormNameOptions({ ...consentFormNameOptions, [departmentId]: relatedConsentForms });

        setConsentForm({
            Date: data.Date || '',
            Time: data.Time || '',
            Department: data.Department || '',
            ConsentFormName: data.ConsentFormName || '',
            ChooseDocument: data.ChooseDocument || null,
            ChkBox: data.ChkBox === 'true' || data.ChkBox === true || false,
            SisterName: data.SisterName || '',
        });

        setIsViewMode(true);
    };

    const handleClear = () => {
        setConsentForm({
            Date: "",
            Time: "",
            Department: "",
            ConsentFormName: "",
            ChooseDocument: null,
            ChkBox: false,
            SisterName: "",
        });
        setIsViewMode(false);
    };

    useEffect(() => {
        axios.get(`${UrlLink}Masters/ConsentName_Detials_link`)
            .then((res) => {
                const consentData = res.data;

                // Generate department options
                const departments = consentData.reduce((acc, consent) => {
                    if (!acc.some(dept => dept.value === consent.DepartmentId)) {
                        acc.push({ label: consent.Department, value: consent.DepartmentId });
                    }
                    return acc;
                }, []);

                setDepartmentOptions(departments);

                // Precompute consent form name options grouped by department
                const consentFormOptionsByDept = departments.reduce((acc, department) => {
                    const filteredConsentForms = consentData
                        .filter(consent => consent.DepartmentId === department.value)
                        .map(consent => ({ label: consent.ConsentFormsName, value: consent.ConsentFormsName }));
                    
                    acc[department.value] = filteredConsentForms;
                    return acc;
                }, {});

                setConsentFormNameOptions(consentFormOptionsByDept);
            })
            .catch((err) => console.log(err));
    }, [UrlLink]);

    useEffect(() => {

        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        if (RegistrationId) {
            axios.get(`${UrlLink}Ip_Workbench/IP_ConsentForm_Details_Link`, {
                params: {

                  RegistrationId: RegistrationId,
                  DepartmentType: departmentType,
                }
            })
            .then((res) => {
                setGridData(res.data);
            })
            .catch((err) => console.log(err));
        }
    }, [UrlLink, IP_DoctorWorkbenchNavigation, IsGetData]);

    const handleConsentFormChange = (e) => {
        const { id, value, type, checked } = e.target;

        if (id === 'Department') {
            // Update consent form name options based on the selected department
            const relatedConsentForms = consentFormNameOptions[value] || [];
            setConsentForm(prev => ({
                ...prev,
                [id]: value,
                ConsentFormName: '' // Clear the previously selected ConsentFormName when department changes
            }));
            setConsentFormNameOptions(prevOptions => ({
                ...prevOptions,
                [value]: relatedConsentForms
            }));
        } else {
            setConsentForm(prev => ({
                ...prev,
                [id]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleinpchangeDocumentsForm = (e) => {
        const { name, files } = e.target;

        // Ensure that files exist and are not empty
        if (files && files.length > 0) {
            const formattedValue = files[0];

            // Optional: Add validation for file type and size
            const allowedTypes = ["application/pdf", "image/jpeg", "image/png"]; // Example allowed types
            const maxSize = 5 * 1024 * 1024; // Example max size of 5MB
            if (!allowedTypes.includes(formattedValue.type) || formattedValue.type === "") {
                // Dispatch a warning toast or handle file type validation
                const tdata = {
                    message: "Invalid file type. Please upload a PDF, JPEG, or PNG file.",
                    type: "warn",
                };
                dispatch({ type: "toast", value: tdata });
            } else if (formattedValue.size > maxSize) {
                // Dispatch a warning toast or handle file size validation
                const tdata = {
                    message: "File size exceeds the limit of 5MB.",
                    type: "warn",
                };
                dispatch({ type: "toast", value: tdata });
            } else {
                const reader = new FileReader();
                reader.onload = () => {
                    setConsentForm(prev => ({
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
            dispatch({ type: "toast", value: tdata });
        }
    };

    const handleSubmit = async () => {

        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const DepartmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        if (!RegistrationId) {
            dispatch({ type: 'toast', value: { message: 'Registration ID is missing', type: 'error' } });
            return;
        }
        const formData = new FormData();
        console.log(FormData,'formData');
        

        formData.append("Date", ConsentForm.Date);
        formData.append("Time", ConsentForm.Time);
        formData.append("Department", ConsentForm.Department);
        formData.append("ConsentFormName", ConsentForm.ConsentFormName);
        formData.append("ChkBox", ConsentForm.ChkBox);
        formData.append("SisterName", ConsentForm.SisterName);

        // Append the file if it exists
        if (ConsentForm.ChooseDocument) {
            formData.append("ChooseDocument", ConsentForm.ChooseDocument);
        }

        console.log(ConsentForm.ChooseDocument,'ChooseDocument');
        
        formData.append('RegistrationId', RegistrationId);
        formData.append('DepartmentType', DepartmentType);
        formData.append('Createdby', userRecord?.username);

        try {
            const response = await axios.post(`${UrlLink}Ip_Workbench/IP_ConsentForm_Details_Link`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const [type, message] = [Object.keys(response.data)[0], Object.values(response.data)[0]];
            dispatch({ type: 'toast', value: { message, type } });
            setIsGetData(prev => !prev);
            handleClear();
        } catch (error) {
            console.error(error);
        }
    };

 

    return (
        <div className="Main_container_app">
            <div className="form-section5">
                <div className="common_center_tag">
                    <h3>Consent Form Details</h3>
                </div>
                <br />
                <div className="RegisFormcon_1">
                    {[
                        { label: "Date", id: "Date", type: "date" },
                        { label: "Time", id: "Time", type: "time" },
                        { label: "Department", id: "Department", type: "select", options: departmentOptions },
                        { label: "ConsentFormName", id: "ConsentFormName", type: "select", options: consentFormNameOptions[ConsentForm.Department] || [] },
                        { label: "ChkBox", id: "ChkBox", type: "checkbox" },
                        { label: "SisterName", id: "SisterName", type: "text" },
                        { label: "ChooseDocument", id: "ChooseDocument", type: "file" },
                    ].map((input) => (
                        <div className="RegisForm_1" key={input.id}>
                            <label htmlFor={input.id}>
                                {input.label} <span>:</span>
                            </label>
                            {input.type === "select" ? (
                                <select
                                    id={input.id}
                                    name={input.id}
                                    onChange={handleConsentFormChange}
                                    value={ConsentForm[input.id] || ''}
                                    required
                                    disabled={IsViewMode}
                                >
                                    <option value="">Select {input.label}</option>
                                    {Array.isArray(input.options) && input.options.length > 0 ? (
                                        input.options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No options available</option>
                                    )}
                                </select>
                            ) : input.id === "ChooseDocument" ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="file"
                                        name={input.id}
                                        accept="image/jpeg, image/png, application/pdf"
                                        required
                                        id={`${input.id}_${input.id}`}
                                        autoComplete="off"
                                        onChange={handleinpchangeDocumentsForm}
                                        style={{ display: 'none' }}
                                    />
                                    <div style={{ width: "150px", display: "flex", justifyContent: "space-around" }}>
                                        <label
                                            htmlFor={`${input.id}_${input.id}`}
                                            className="RegisterForm_1_btns choose_file_update"
                                        >
                                            Choose File
                                        </label>
                                        <button
                                            className="fileviewbtn"
                                            onClick={() => Selectedfileview(ConsentForm.ChooseDocument)}
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <input
                                    type={input.type}
                                    id={input.id}
                                    name={input.id}
                                    onChange={handleConsentFormChange}
                                    value={input.type !== 'file' ? ConsentForm[input.id] || '' : undefined}
                                    required={input.type !== 'checkbox'}
                                    // readOnly={IsViewMode}
                disabled = {IsViewMode}
                                    checked={input.type === 'checkbox' ? ConsentForm[input.id] || false : undefined}
                                    readOnly={IsViewMode && input.type !== 'file'}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="Main_container_Btn">
                {IsViewMode ? (
                    <button onClick={handleClear}>Clear</button>
                ) : (
                    <button onClick={handleSubmit}>Submit</button>
                )}
            </div>

            {gridData.length > 0 && (
                <ReactGrid columns={ConsentFormColumns} RowData={gridData} />
            )}

            <ToastAlert Message={toast.message} Type={toast.type} />
            <ModelContainer />
        </div>
    );
};

export default IP_ConsentForms;
