import React, { useState, useEffect,useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { differenceInYears} from 'date-fns';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import axios from 'axios';

const AppointmentRequestList = () => {
    const dispatchvalue = useDispatch();
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    // const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);

    const formatLabel = (label) => {

        if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
            return label
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase());
        } else {
            return label;
        }
    };


    const [AppointmentRequestList, setAppointmentRequestList] = useState({
        AppointmentID: '',
        Title: '',
        FirstName: '',
        MiddleName: '',
        LastName: '',
        PhoneNumber: '',
        Email: '',
        RequestDate: '',
        AppointmentType: '',
        RequestTime: '',
        VisitPurpose: '',
        Specialization: '',
        DoctorName: '',
        Status: 'ACTIVE',
    })


    const [AppointmentID, setAppointmentID] = useState(null);
    const [AppointmentRequestData, setAppointmentRequestData] = useState([])
    const [DoctorNameData, setDoctorNameData] = useState([]);
    const [SpecializationData, setSpecializationData] = useState([]);
    const [AppointmentRequestGet, setAppointmentRequestGet] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRows, setfilteredRows] = useState([]); // State to hold the data



    const HandleOnchange = (e) => {
        const { name, value } = e.target
        const formattedValue = value.trim()
        if (name === 'DOB') {
            let newDate = new Date();

            let oldDate = new Date(value);
            let age = differenceInYears(newDate, oldDate);
            setAppointmentRequestList((prevFormData) => ({
                ...prevFormData,
                [name]: formattedValue,
                Age: age,
            }));
        }


        else {
            setAppointmentRequestList((prev) => ({
                ...prev,
                [name]: formattedValue
            }))
        }

    }



    const AppointmentRequestColumns = [
        {
            key: "id",
            name: "Appointment ID",
            frozen: true
        },
        {
            key: "FirstName",
            name: "First Name",
            frozen: true
        },
        {
            key: "MiddleName",
            name: "Middle Name",
        },
        {
            key: "LastName",
            name: "Last Name",
        },
        {
            key: "PhoneNumber",
            name: "Phone Number",
            frozen: true
        },
        {
            key: "Email",
            name: "Email",
        },
        {
            key: "RequestDate",
            name: "Request Date",
        },
        {
            key: "RequestTime",
            name: "Request Time",
        },
        {
            key: "AppointmentType",
            name: "Appointment Type",
        },
        {
            key: "VisitPurpose",
            name: "Appointment Purpose",
        },
        {
            key: "SpecializationName",
            name: "Specialization",
        },
        {
            key: "DoctorName",
            name: "Doctor Name",
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditAppointmentRequest(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }


    ]

  



    const handleeditAppointmentRequest = (params) => {
        const { id, DoctorID, SpecializationId, ...rest } = params;

        setAppointmentRequestList((prev) => ({
            ...prev,
            AppointmentID: id,
            DoctorName: DoctorID,
            Specialization: SpecializationId,  // Ensure this is populated with the Specialization ID or Name correctly
            Title: rest.Title,
            FirstName: rest.FirstName,
            MiddleName: rest.MiddleName,
            LastName: rest.LastName,
            PhoneNumber: rest.PhoneNumber,
            Email: rest.Email,
            RequestDate: rest.RequestDate,
            AppointmentType: rest.AppointmentType,
            RequestTime: rest.RequestTime,
            VisitPurpose: rest.VisitPurpose,
            Status: rest.Status,
        }));
    };
    const handleAppointmentRequestSubmit = () => {
        const exist = Object.keys(AppointmentRequestList).filter(p => p !== 'AppointmentID', '').filter(p => !AppointmentRequestList[p])
        if (exist.length === 0) {
            axios.post(`${UrlLink}Frontoffice/Appointment_Request_List_Link`, AppointmentRequestList)
                .then(response => {
                    const resData = response.data;
                    const mess = Object.values(resData)[0];
                    const typp = Object.keys(resData)[0];
                    console.log('Appointment request submitted successfully:', response.data);
                    const tdata = {
                        message: mess,
                        type: typp,
                    };

                    dispatchvalue({ type: 'toast', value: tdata });
                    setAppointmentRequestGet(prev => !prev)
                    setAppointmentRequestList({
                        AppointmentID: '',
                        Title: '',
                        FirstName: '',
                        MiddleName: '',
                        LastName: '',
                        PhoneNumber: '',
                        Email: '',
                        RequestDate: '',
                        AppointmentType: '',
                        RequestTime: '',
                        VisitPurpose: '',
                        Specialization: '',
                        DoctorName: '',
                        Status: 'ACTIVE',
                    });
                    fetchAppointmentIDCount();
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            const tdata = {
                message: `Please provide ${exist.join(',')}.`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }
    }

    useEffect(() => {
        axios.get(`${UrlLink}Frontoffice/Appointment_Request_List_Link`)
            .then((res) => {
                const ress = res.data
                setAppointmentRequestData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [AppointmentRequestGet, UrlLink])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [specializationResponse] = await Promise.all([
                    axios.get(`${UrlLink}Masters/Speciality_Detials_link`),

                ]);
                setSpecializationData(specializationResponse.data);
                console.log(specializationResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [UrlLink]);


    useEffect(() => {
        if (AppointmentRequestList?.Specialization && UrlLink) {
            axios.get(`${UrlLink}Masters/get_Doctor_by_Speciality_Detials?Speciality=${AppointmentRequestList.Specialization}`)
                .then((reponse) => {
                    let data = reponse.data
                    setDoctorNameData(data);
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [UrlLink, AppointmentRequestList.Specialization])

    const fetchAppointmentIDCount = useCallback(() => {
        axios.get(`${UrlLink}Frontoffice/appointment_request_count_today`)
            .then(response => {
                const count = response.data.count;
                setAppointmentID(count);
            })
            .catch(error => {
                console.error("Error fetching appointment ID count:", error);
            });
    }, [UrlLink]);
    useEffect(() => {
        fetchAppointmentIDCount();
    }, [fetchAppointmentIDCount, AppointmentID]);


    useEffect(() => {
        const filteredData =
            AppointmentRequestData &&
            AppointmentRequestData.filter((row) => {
                const lowerCaseFirstName = row.FirstName.toLowerCase();
                const lowerCasePhoneNo = row.PhoneNumber.toString().toLowerCase();
                const lowerCaseQuery = searchQuery.toLowerCase();

                // Check if searchQuery matches either FirstName or PhoneNumber
                const matchesFirstName =
                    lowerCaseFirstName && lowerCaseFirstName.includes(lowerCaseQuery);
                const matchesPhoneNo =
                    lowerCasePhoneNo && lowerCasePhoneNo.includes(lowerCaseQuery);

                // Return true if either FirstName or PhoneNumber matches searchQuery
                return matchesFirstName || matchesPhoneNo;
            });

        setfilteredRows(filteredData);
    }, [searchQuery, AppointmentRequestData]);




    return (
        <>
            <div className="Main_container_app">
                <h3>Request No {AppointmentID}</h3>
                <div className="RegisFormcon" id="RegisFormcon_11">
                    {
                        Object.keys(AppointmentRequestList).filter((fields) => fields !== 'AppointmentID' && fields !== "DoctorID" && fields !== "Status").map((field, index) => (
                            <div className="RegisForm_1" key={index}>
                                <label htmlFor={`${field}_${index}`}>
                                    {formatLabel(field)}
                                    <span>:</span>
                                </label>
                                {
                                    ['Title', 'AppointmentType', 'VisitPurpose', 'Specialization', 'DoctorName'].includes(field) ?
                                        (
                                            <select
                                                id={`${field}_${index}`}
                                                name={field}
                                                value={AppointmentRequestList[field]}
                                                onChange={HandleOnchange}
                                            >
                                                <option value="">Select</option>
                                                {field === 'Title' &&
                                                    ['Ms', 'Mr', 'Mrs', 'Others'].map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }
                                                {field === 'AppointmentType' &&
                                                    ['Call', 'Walk In'].map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }
                                                {field === 'VisitPurpose' &&
                                                    ['NewConsultation', 'FollowUp'].map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }
                                                {field === 'Specialization' &&
                                                    SpecializationData.filter(p => p.Status === 'Active').map((p, indx) => (
                                                        <option key={indx} value={p.id}>{p.SpecialityName}</option>
                                                    ))
                                                }
                                                {field === 'DoctorName' &&
                                                    Array.isArray(DoctorNameData) &&
                                                    DoctorNameData
                                                        .map((p, indx) => (
                                                            <option key={indx} value={p.id}>{p.ShortName}</option>
                                                        ))
                                                }

                                            </select>
                                        ) :

                                        (
                                            <input
                                                id={`${field}_${index}`}
                                                autoComplete='off'
                                                type={field === 'RequestDate' ? 'date' : field === 'RequestTime' ? 'time' : 'text'}
                                                name={field}
                                                value={AppointmentRequestList[field]}
                                                onChange={HandleOnchange}
                                            />
                                        )

                                }

                            </div>
                        ))
                    }
                </div>
                <div className="Main_container_Btn">
                    <button onClick={handleAppointmentRequestSubmit}>
                        {AppointmentRequestList.AppointmentID ? "Update" : "Add"}
                    </button>
                </div>
                <h3>Appointment Request List</h3>
                <div className="con_1">
                    <div className="inp_1">
                        <label htmlFor="input">
                            Search by<span>:</span>
                        </label>
                        <input
                            type="text"
                            id="SearchQuery"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Enter First Name or Phone Number"
                        />
                    </div>


                </div>

                {filteredRows.length >= 0 &&
                    <ReactGrid columns={AppointmentRequestColumns} RowData={filteredRows}/>
                }
            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    )
}

export default AppointmentRequestList;