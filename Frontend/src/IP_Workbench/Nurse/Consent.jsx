import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

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

    const ConsentFormColumns = [
        { key: 'id', name: 'S.No', frozen: true },
        { key: 'VisitId', name: 'VisitId', frozen: true },
        { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },
        { key: 'Date', name: 'Date', frozen: true },
        { key: 'Time', name: 'Time', frozen: true },
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
        console.log(data, 'data');

        // Set form data and department-specific options
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
        if (IP_DoctorWorkbenchNavigation?.RegistrationId) {
            axios.get(`${UrlLink}Ip_Workbench/IP_ConsentForm_Details_Link`, {
                params: { RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId }
            })
            .then((res) => {
                setGridData(res.data);
            })
            .catch((err) => console.log(err));
        }
    }, [UrlLink, IP_DoctorWorkbenchNavigation, IsGetData]);


    
    const handleConsentFormChange = (e) => {
        const { id, value, type, checked, files } = e.target;

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
                [id]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
            }));
        }
    };

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // Get base64 part only
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    const handleSubmit = async () => {
        const formData = new FormData();

        if (ConsentForm.ChooseDocument) {
            try {
                const fileBase64 = await toBase64(ConsentForm.ChooseDocument);
                formData.append('ChooseDocument', fileBase64);
            } catch (error) {
                console.error('Error encoding file to base64:', error);
                return;
            }
        } else {
            formData.append('ChooseDocument', '');
        }

        Object.entries(ConsentForm).forEach(([key, value]) => {
            if (key !== 'ChooseDocument') {
                formData.append(key, value);
            }
        });

        formData.append('RegistrationId', IP_DoctorWorkbenchNavigation?.RegistrationId);
        formData.append('Createdby', userRecord?.username);

        console.log([...formData.entries()], 'formData');

        axios.post(`${UrlLink}Ip_Workbench/IP_ConsentForm_Details_Link`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
            dispatch({ type: 'toast', value: { message, type } });
            setIsGetData(prev => !prev);
            handleClear();
        })
        .catch((err) => console.log(err));
    };

    return (
        <div className='new-patient-registration-form'>
            <br />
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
                        { label: "ChooseDocument", id: "ChooseDocument", type: "file" },
                        { label: "ChkBox", id: "ChkBox", type: "checkbox" },
                        { label: "SisterName", id: "SisterName", type: "text" },
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
                            ) : (
                                <input
                                    type={input.type}
                                    id={input.id}
                                    name={input.id}
                                    onChange={handleConsentFormChange}
                                    value={input.type !== 'file' ? ConsentForm[input.id] || '' : undefined}
                                    required={input.type !== 'checkbox'}
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
        </div>
    );
};

export default IP_ConsentForms;
