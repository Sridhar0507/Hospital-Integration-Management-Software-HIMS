import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import axios from 'axios';

const ConsentFormsMaster = () => {
    const dispatchvalue = useDispatch();
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const [DepartmentData, setDepartmentData] = useState([]);
    const [Consent, setConsent] = useState({
        ConsentId: '',
        Department: '',
        ConsentFormsName: '',
    });
    const [ConsentData, setConsentData] = useState([]);
    const [IsConsentGet, setIsConsentGet] = useState(false);

    // Fetch Department data
    useEffect(() => {
        axios.get(`${UrlLink}Masters/Department_Detials_link`)
            .then((res) => {
                setDepartmentData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink]);

    // Fetch Consent data
    useEffect(() => {
        axios.get(`${UrlLink}Masters/ConsentName_Detials_link`)
            .then((res) => {
                setConsentData(res.data);  // Set the fetched data to ConsentData state
            })
            .catch((err) => {
                console.log(err);
            });
    }, [IsConsentGet, UrlLink]);

    const handleeditConsentNamestatus = (params) => {
        const data = {
            ConsentId: params.id,
            Statusedit: true
        };
        axios.post(`${UrlLink}Masters/ConsentName_Detials_link`, data)
            .then((res) => {
                const tdata = {
                    message: res.data.success || res.data.warn,
                    type: res.data.success ? 'success' : 'warn',
                };

                dispatchvalue({ type: 'toast', value: tdata });
                setIsConsentGet(prev => !prev);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleeditConsentName = (params) => {
        setConsent({
            ConsentId: params.id,
            Department: params.DepartmentId,
            ConsentFormsName: params.ConsentFormsName
        });
    };

    const handleConsentSubmit = () => {
        if (Consent.Department && Consent.ConsentFormsName) {
            const data = {
                ...Consent,
                created_by: userRecord?.username || ''
            };
            axios.post(`${UrlLink}Masters/ConsentName_Detials_link`, data)
                .then((res) => {
                    const tdata = {
                        message: res.data.success || res.data.warn,
                        type: res.data.success ? 'success' : 'warn',
                    };

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsConsentGet(prev => !prev);
                    setConsent({
                        ConsentId: '',
                        Department: '',
                        ConsentFormsName: '',
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            const tdata = {
                message: `Please provide both Department Name and Consent name.`,
                type: 'warn'
            };
            dispatchvalue({ type: 'toast', value: tdata });
        }
    };

    const handleConsentChange = (e) => {
        const { name, value } = e.target;
        setConsent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const ConsentColumns = [
        {
            key: "id",
            name: "Consent Id",
            frozen: true
        },
        {
            key: "created_by",
            name: "Created By",
            frozen: true
        },
        {
            key: "Department",
            name: "Department Name",
        },
        {
            key: "ConsentFormsName",
            name: "ConsentForms Name",
        },
        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <Button
                    className="cell_btn"
                    onClick={() => handleeditConsentNamestatus(params.row)}
                >
                    {params.row.Status}
                </Button>
            ),
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <Button
                    className="cell_btn"
                    onClick={() => handleeditConsentName(params.row)}
                >
                    <EditIcon className="check_box_clrr_cancell" />
                </Button>
            ),
        }
    ];

    return (
        <>
            <div className="Main_container_app">
                <h3>Consent Form Masters</h3>
                <div className="common_center_tag">
                    <span>Consent</span>
                </div>
                <div className="RegisFormcon_1">
                    {['Department', 'ConsentFormsName'].map((field, indx) => (
                        <div className="RegisForm_1" key={indx}>
                            <label> {field === 'Department' ? 'Department' : 'ConsentForms Name'} <span>:</span> </label>
                            {
                                field === 'Department' ?
                                    <select
                                        name={field}
                                        required
                                        value={Consent[field]}
                                        onChange={handleConsentChange}
                                    >
                                        <option value=''>Select Department</option>
                                        {DepartmentData.filter(p => p.Status === 'Active')?.map((dept, index) => (
                                            <option key={index} value={dept.id}>
                                                {dept.DepartmentName}
                                            </option>
                                        ))}
                                    </select>
                                    :
                                    <input
                                        type="text"
                                        name={field}
                                        required
                                        value={Consent[field]}
                                        onChange={handleConsentChange}
                                    />
                            }
                        </div>
                    ))}
                </div>

                <div className="Main_container_Btn">
                    <button onClick={handleConsentSubmit}>
                        {Consent.ConsentId ? 'Update' : 'Save'}
                    </button>
                </div>

                {ConsentData.length > 0 &&
                    <ReactGrid columns={ConsentColumns} RowData={ConsentData} />
                }
            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    );
}

export default ConsentFormsMaster;
