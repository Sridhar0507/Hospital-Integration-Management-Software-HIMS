import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { format } from "date-fns";
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";


const Vitals = () => {
    const dispatch = useDispatch();
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);
    console.log(DoctorWorkbenchNavigation, 'DoctorWorkbenchNavigation');

    const userRecord = useSelector((state) => state.userRecord?.UserData);


    const formatLabel = (label) => {

        if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
            return label
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase());
        } else {
            return label;
        }
    };


    const [VitalFormData, setVitalFormData] = useState({

        Temperature: '',
        PulseRate: '',
        SPO2: '',
        HeartRate: '',
        RespiratoryRate: '',
        SBP: '',
        DBP: '',
        Height: '',
        Weight: '',
        BMI: '',
        WC: '',
        HC: '',
        BSL: '',
        Painscore: '',
        SupplementalOxygen: '',
        LevelOfConsiousness: '',
        CapillaryRefillTime: '',
        // ETCO2: "",
        // BreathSounds: "",
        // Date: "",
        // Time: "",
    });

    const [type, setType] = useState("Vital");

    const [gridData, setGridData] = useState([])
    const [IsGetData, setIsGetData] = useState(false)

    const [IsViewMode, setIsViewMode] = useState(false)

    const colorStyles = {
        normal: 'green',
        minlow: 'yellow',
        maxlow: 'yellow',
        minmedium: 'orange',
        maxmedium: 'orange',
        minhigh: 'red',
        maxhigh: 'red',
    };


    const getColorByStatus = (status) => {
        switch (status) {
            case 3:
                return 'red';
            case 2:
                return 'orange';
            case 1:
                return 'yellow';
            case 0:
                return 'green';
            default:
                return ''; // Default color for undefined or other values
        }
    };


    const getColorStyle = (status) => {
        return colorStyles[status] || ''; // Default color if no match
    };

    const renderColorBox = (status) => {
        // Ensure `status` is defined and is a string
        if (typeof status !== 'string' || status.length === 0) {
            return null; // Or render a default/fallback element
        }

        return (
            <div
                style={{
                    width: '40px', // Slightly larger for better visibility
                    height: '40px', // Slightly larger for better visibility
                    backgroundColor: getColorStyle(status),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px', // Increased spacing
                    borderRadius: '8px', // Rounded corners
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                    border: '1px solid rgba(0, 0, 0, 0.2)', // Light border for contrast
                    fontSize: '12px', // Adjust font size for the box
                    fontWeight: 'bold', // Bold text
                    color: '#fff', // Text color for better contrast
                }}
            >
                {status.charAt(0).toUpperCase()} {/* Display first letter of the range */}
            </div>
        );
    };



    useEffect(() => {
        if (VitalFormData.Weight && VitalFormData.Height) {
            const parsedWeight = parseFloat(VitalFormData.Weight);
            const parsedHeight = parseFloat(VitalFormData.Height) / 100; // Convert cm to m
            const calculatedBMI = (
                parsedWeight /
                (parsedHeight * parsedHeight)
            ).toFixed(2);

            setVitalFormData((prev) => ({
                ...prev,
                BMI: calculatedBMI,
            }));
        }
    }, [VitalFormData.Weight, VitalFormData.Height]);

    const VitalsFormColumns = [
        {
            key: 'id',
            name: 'S.No',
            frozen: true
        },
        { key: 'Type', name: 'Type', frozen: true },
        // { key: 'PrimaryDoctorId', name: 'Doctor Id',frozen: true },
        { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },

        {
            key: 'Date',
            name: 'Date',
            frozen: true
        },
        {
            key: 'Time',
            name: 'Time',
            frozen: true
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

    ]
    // Handle setting the form data when viewing
    const handleView = (data) => {
        setVitalFormData({
            Temperature: data.Temperature || '',
            PulseRate: data.PulseRate || '',
            SPO2: data.SPO2 || '',
            HeartRate: data.HeartRate || '',
            RespiratoryRate: data.RespiratoryRate || '',
            SBP: data.SBP || '',
            DBP: data.DBP || '',
            Height: data.Height || '',
            Weight: data.Weight || '',
            BMI: data.BMI || '',
            WC: data.WC || '',
            HC: data.HC || '',
            BSL: data.BSL || '',
            Painscore: data.Painscore || '',
            SupplementalOxygen: data.SupplementalOxygen || '',
            LevelOfConsiousness: data.LevelOfConsiousness || '',
            CapillaryRefillTime: data.CapillaryRefillTime || '',

            // ETCO2: data.EtCO2 || '',
            // BreathSounds: data.BreathSounds || '',
            // Date: data.Date || '',
            // Time: data.Time || '',
            // Createdby: data.Createdby || '',
        });
        setIsViewMode(true);
    };


    // Handle clearing the form and resetting the view mode
    const handleClear = () => {
        setVitalFormData({
            Temperature: '',
            PulseRate: '',
            SPO2: '',
            HeartRate: '',
            RespiratoryRate: '',
            SBP: '',
            DBP: '',
            Height: '',
            Weight: '',
            BMI: '',
            WC: '',
            HC: '',
            BSL: '',
            Painscore: '',
            SupplementalOxygen: '',
            LevelOfConsiousness: '',
            CapillaryRefillTime: '',
            // ETCO2:'',
            // BreathSounds:'',
            // Date: '',
            // Time: '',
            // Createdby: '',
        });
        setIsViewMode(false);
    };


    // useEffect(() => {
    //     axios.get(`${UrlLink}Ip_Workbench/IP_Vitals_Form_Details_Link`,{params:{RegistrationId:DoctorWorkbenchNavigation?.RegistrationId}})
    //         .then((res) => {
    //             const ress = res.data
    //             console.log(ress)
    //             setGridData(ress)

    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //   }, [UrlLink,DoctorWorkbenchNavigation,IsGetData])



    useEffect(() => {

        const RegistrationId = DoctorWorkbenchNavigation?.pk;
        // const departmentType = DoctorWorkbenchNavigation?.RequestType;

        if (RegistrationId) {
            axios.get(`${UrlLink}OP/Vitals_Form_Details_Link`, {
                params: {
                    RegistrationId: RegistrationId,
                    // DepartmentType: departmentType,
                    // Type: 'Doctor'
                }
            })
                .then((res) => {
                    const data = res.data;
                    console.log('API Data:', data); // Check the data structure here

                    // Access the `vital_details` array from the response
                    if (data && Array.isArray(data.vital_details)) {
                        setGridData(data.vital_details);
                    } else {
                        console.error('vital_details is not an array:', data);
                    }
                })
                .catch((err) => {
                    console.error('Error fetching data:', err);
                });
        }
    }, [UrlLink, DoctorWorkbenchNavigation, IsGetData]);



    // useEffect(() => {
    //     axios.get(`${UrlLink}OP/Vitals_Form_Details_Link`,{params:{RegistrationId:DoctorWorkbenchNavigation?.pk}})
    //         .then((res) => {
    //             const ress = res.data
    //             console.log(ress)
    //             setGridData(ress)

    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //   }, [UrlLink,DoctorWorkbenchNavigation,IsGetData])



    const HandleOnChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = value.trim();
        setVitalFormData((prevFormData) => ({
            ...prevFormData,
            [name]: formattedValue,
        }));
    };


    const handleChange = (event) => {
        setType(event.target.value);
    };

    const columns = [
        {
            key: 'temperature_status',
            name: 'Temperature Status',
            renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: getColorByStatus(params.row.temperature_status),
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        padding: '5px'
                    }}
                >
                    {params.row.temperature_status}
                </div>
            )
        },
        {
            key: 'spo2_status',
            name: 'SPO2 Status',
            renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: getColorByStatus(params.row.spo2_status),
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        padding: '5px'
                    }}
                >
                    {params.row.spo2_status}
                </div>
            )
        },
        {
            key: 'heartrate_status',
            name: 'Heart Rate Status',
            renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: getColorByStatus(params.row.heartrate_status),
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        padding: '5px'
                    }}
                >
                    {params.row.heartrate_status}
                </div>
            )
        },
        {
            key: 'RespiratoryStatus',
            name: 'Respiratory Status',
            renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: getColorByStatus(params.row.RespiratoryStatus),
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        padding: '5px'
                    }}
                >
                    {params.row.RespiratoryStatus}
                </div>
            )
        },
        {
            key: 'sbp_status',
            name: 'SBP Status',
            renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: getColorByStatus(params.row.sbp_status),
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        padding: '5px'
                    }}
                >
                    {params.row.sbp_status}
                </div>
            )
        },
        {
            key: 'SupplementalOxygen_status',
            name: 'Supplemental Oxygen Status',
            renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: getColorByStatus(params.row.SupplementalOxygen_status),
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        padding: '5px'
                    }}
                >
                    {params.row.SupplementalOxygen_status}
                </div>
            )
        },
        {
            key: 'LevelOfConsiousness_Status',
            name: 'Level of Consciousness Status',
            renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: getColorByStatus(params.row.LevelOfConsiousness_Status),
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        padding: '5px'
                    }}
                >
                    {params.row.LevelOfConsiousness_Status}
                </div>
            )
        },
        {
            key: 'CapillaryRefillTime_Status',
            name: 'Capillary Refill Time Status',
            renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: getColorByStatus(params.row.CapillaryRefillTime_Status),
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        padding: '5px'
                    }}
                >
                    {params.row.CapillaryRefillTime_Status}
                </div>
            )
        },
    ];

    const calculateTotalScore = (row) => {
        const fields = [
            'LevelOfConsiousness_Status',
            'RespiratoryStatus',
            'SupplementalOxygen_status',
            'heartrate_status',
            'temperature_status',
            'spo2_status',
            'sbp_status',
            'CapillaryRefillTime_Status'
        ];

        return fields.reduce((total, field) => {
            const value = row[field];
            return total + (value !== null ? value : 0); // Ensure we handle null values
        }, 0);
    };

    //   const getScoreCategory = (score) => {
    //     if (score >= 0 && score <= 4) {
    //         return 'Low';
    //     } else if (score >= 5 && score <= 6) {
    //         return 'Medium';
    //     } else if (score >= 7 && score <= 21) {
    //         return 'High';
    //     } else {
    //         return 'Unknown';
    //     }
    // };

    const calculateAge = (dob) => {
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDifference = today.getMonth() - dobDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        return age;
    };

    const dob = DoctorWorkbenchNavigation?.DOB; // Ensure this matches the structure of your state
    const age = dob ? calculateAge(dob) : null;


    const getScoreCategory = (score, age) => {
        if (age >= 16) {
            // Score categories for age 16 and above
            if (score >= 0 && score <= 4) {
                return 'Low';
            } else if (score >= 5 && score <= 6) {
                return 'Medium';
            } else if (score >= 7 && score <= 21) {
                return 'High';
            } else {
                return 'Unknown';
            }
        } else {
            // Score categories for age below 16
            if (score >= 0 && score <= 2) {
                return 'Low';
            } else if (score >= 3 && score <= 5) {
                return 'Medium';
            } else if (score >= 6 && score <= 12) {
                return 'High';
            } else {
                return 'Unknown';
            }
        }
    };

    // Example usage in render or function
    const totalScore = gridData.length > 0 ? calculateTotalScore(gridData[gridData.length - 1]) : 0;
    // const scoreCategory = getScoreCategory(totalScore);
    const scoreCategory = age !== null ? getScoreCategory(totalScore, age) : 'Unknown';
    console.log(totalScore, 'totalScore');



    //   const handleVitalFormSubmit = () => {

    //     const RegistrationId = DoctorWorkbenchNavigation?.RegistrationId;
    //     const DepartmentType = DoctorWorkbenchNavigation?.RequestType;

    //     if (!RegistrationId) {
    //         dispatch({ type: 'toast', value: { message: 'Registration ID is missing', type: 'error' } });
    //         return;
    //     }
    //     const senddata={
    //         // ...VitalFormData,
    //         Temperature: VitalFormData.Temperature || null,
    //         PulseRate: VitalFormData.PulseRate || null,
    //         SPO2: VitalFormData.SPO2 || null,
    //         HeartRate: VitalFormData.HeartRate || null,
    //         RespiratoryRate: VitalFormData.RespiratoryRate || null,
    //         SBP: VitalFormData.SBP || null,
    //         DBP: VitalFormData.DBP || null,
    //         Height: VitalFormData.Height || null,
    //         Weight: VitalFormData.Weight || null,
    //         BMI: VitalFormData.BMI || null,
    //         WC: VitalFormData.WC || null,
    //         HC: VitalFormData.HC || null,
    //         BSL: VitalFormData.BSL || null,
    //         Painscore: VitalFormData.Painscore || null,
    //         SupplementalOxygen: VitalFormData.SupplementalOxygen || '',
    //         LevelOfConsiousness: VitalFormData.LevelOfConsiousness || '',
    //         CapillaryRefillTime: VitalFormData.CapillaryRefillTime || '',
    //         RegistrationId,
    //         DepartmentType,
    //         Createdby:userRecord?.username,
    //         Type:'Doctor',


    //     }

    //     console.log(senddata,'senddata');

    //     axios.post(`${UrlLink}Ip_Workbench/IP_Vitals_Form_Details_Link`, senddata)
    //     .then((res) => {
    //         const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
    //         dispatch({ type: 'toast', value: { message, type } });
    //         setIsGetData(prev => !prev);
    //         handleClear();
    //         })
    //         .catch((err) => console.log(err));

    // }



    const handleVitalFormSubmit = () => {

        console.log(DoctorWorkbenchNavigation?.RegistrationId);

        const senddata = {
            ...VitalFormData,
            RegistrationId: DoctorWorkbenchNavigation?.pk,
            Createdby: userRecord?.username,
            Type: 'Doctor'

        }

        console.log(senddata, 'senddata');

        axios.post(`${UrlLink}OP/Vitals_Form_Details_Link`, senddata)
            .then((res) => {
                const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
                dispatch({ type: 'toast', value: { message, type } });
                setIsGetData(prev => !prev);
                handleClear();
            })
            .catch((err) => console.log(err));

    }


    return (
        <>

            <div className="RegisFormcon_1">
                <br />

                <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
                    <ToggleButtonGroup
                        value={type}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton
                            value="Vital"
                            style={{
                                height: "30px",
                                width: "100px",
                                backgroundColor:
                                    type === "Vital"
                                        ? "var(--selectbackgroundcolor)"
                                        : "inherit",
                            }}
                            className="togglebutton_container"
                        >
                            Vital
                        </ToggleButton>
                        <ToggleButton
                            value="NewsScore"
                            style={{
                                backgroundColor:
                                    type === "NewsScore"
                                        ? "var(--selectbackgroundcolor)"
                                        : "inherit",
                                width: "100px",
                                height: "30px",
                            }}
                            className="togglebutton_container"
                        >
                            NewsScore
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                {type === "Vital" ? (
                    Object.keys(VitalFormData).map((p, index) => (
                        <div className='RegisForm_1' key={p}>
                            <label htmlFor={`${p}_${index}`}>
                                {formatLabel(p)} <span>:</span>
                            </label>
                            {p === 'SupplementalOxygen' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={VitalFormData[p]}
                                    onChange={HandleOnChange}
                                    readOnly={IsViewMode}
                                    disabled={IsViewMode}

                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            ) : p === 'LevelOfConsiousness' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={VitalFormData[p]}
                                    onChange={HandleOnChange}
                                    readOnly={IsViewMode}
                                    disabled={IsViewMode}

                                >
                                    <option value="">Select</option>
                                    <option value="Alert">Alert</option>
                                    <option value="Responsive to Voice">V - Responsive to Voice</option>
                                    <option value="Responsive to Pain">P - Responsive to Pain</option>
                                    <option value="Unresponsive">U - Unresponsive</option>
                                </select>
                            ) : p === 'CapillaryRefillTime' ? (
                                <select
                                    id={`${p}_${index}`}
                                    name={p}
                                    value={VitalFormData[p]}
                                    onChange={HandleOnChange}
                                    readOnly={IsViewMode}
                                    // disabled = {IsViewMode}
                                    disabled={IsViewMode || +DoctorWorkbenchNavigation.Age > 18}

                                >
                                    <option value="">Select</option>
                                    <option value="under 2 seconds">under 2 seconds</option>
                                    <option value="3 to 4 seconds">3-4 seconds</option>
                                    <option value="greaterthan 4 seconds"> {`>4 seconds`}</option>
                                </select>
                            ) : (
                                <input
                                    id={`${p}_${index}`}
                                    autoComplete='off'
                                    type={p === 'Date' ? 'date' : p === 'Time' ? 'time' : 'text'}
                                    name={p}
                                    value={VitalFormData[p]}
                                    readOnly={IsViewMode}
                                    onChange={HandleOnChange}
                                />
                            )}
                        </div>

                    ))

                ) : type === "NewsScore" ? (
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20%', justifyContent: 'center' }}>
                        {renderColorBox('minhigh')}Min High
                        {renderColorBox('minmedium')}Min Medium
                        {renderColorBox('minlow')}Min Low
                        {renderColorBox('normal')}Normal
                        {renderColorBox('maxlow')}Max Low
                        {renderColorBox('maxmedium')}Max Medium
                        {renderColorBox('maxhigh')}Max High
                    </div>

                ) : null}

                <br />
                <br />

                <div className="Main_container_Btn">
                    {IsViewMode && (
                        <button onClick={handleClear}>Clear</button>
                    )}
                    {!IsViewMode && type === 'Vital' && (
                        <button onClick={handleVitalFormSubmit}>Submit</button>
                    )}
                </div>
                <br />
                {type === "Vital" && (
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40%', textAlign: 'center', marginTop: '20px' }}>
                        <h2>EWS Score: {totalScore} ({scoreCategory})</h2>
                    </div>
                )}


                {type === "Vital" && gridData.length > 0 && (
                    <>
                        <ReactGrid columns={VitalsFormColumns} RowData={gridData} />

                    </>
                )}

                {type === "NewsScore" && gridData.length > 0 && (
                    <>
                        <ReactGrid columns={columns} RowData={gridData} />

                    </>
                )}
                <ToastAlert Message={toast.message} Type={toast.type} />
            </div>

        </>
    );


}


export default Vitals;

