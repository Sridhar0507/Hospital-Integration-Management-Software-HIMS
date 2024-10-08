import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';

const Lenin_DeptWise_MinMax = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const userRecord = useSelector(state => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const dispatchvalue = useDispatch();

    const formatLabel = (label) => {
        if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
            return label
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase());
        } else {
            return label;
        }
    };

    const [LeninMinMax, setLeninMinMax] = useState({
        Id: '',
        Location: '',
        Department: '',
        LeninCategory: '',
        LeninType: '',
        Min: '',
        Max: '',
    });

    const [LeninMinMaxData, setLeninMinMaxData] = useState([]);
    const [IsLeninMinMaxGet, setIsLeninMinMaxGet] = useState(false);
    const [DepartmentData, setDepartmentData] = useState([]);
    const [LocationData, setLocationData] = useState([]);
    const [LeninCategoryData, setLeninCategoryData] = useState([]);
    const [LeninTypeData, setLeninTypeData] = useState([]);


    const LeninMinMaxColumns = [
        { key: "id", name: "Id", frozen: true },
        { key: "created_by", name: "Created By", frozen: true },
        { key: "LocationName", name: "Location" },
        { key: "DepartmentName", name: "Department" },
        { key: "LeninCategory", name: "Lenin Category" },
        { key: "LeninType", name: "Lenin Type" },
        { key: "LeninSize", name: "Lenin Size" },
        {
            key: "Min", name: "Minimum",
            children: [
                { key: "PrevMin", name: "Previous Minimum", width: 150 },
                { key: "Min", name: "Current Minimum", width: 150,
                    renderCell: (params) => (
                        <div
                            onDoubleClick={(e) => handleDoubleClick(e, params.row, 'CurrMin')}
                            onKeyDown={(e) => handleKeyDown(e, params.row)}
                            tabIndex={0} // Make the div focusable to catch keydown events
                        >
                            {params.row.Min}
                        </div>
                    ),
                 },
            ]
        },
        {
            key: "Max", name: "Maximum",
            children: [
                { key: "PrevMax", name: "Previous Maximum", width: 150 },
                { key: "Max", name: "Current Maximum",width: 150,
                    renderCell: (params) => (
                        <div
                            onDoubleClick={(e) => handleDoubleClick(e, params.row, 'CurrMax')}
                            onKeyDown={(e) => handleKeyDown(e, params.row)}
                            tabIndex={0} // Make the div focusable to catch keydown events
                        >
                            {params.row.Max}
                        </div>
                    ),
                 },
            ]
        },
        {
            key: "Status", name: "Status",
            renderCell: (params) => (
                <Button
                    className="cell_btn"
                    onClick={() => handleeditLeninMinMaxstatus(params.row)}
                >
                    {params.row.Status}
                </Button>
            ),
        },
        {
            key: "Action", name: "Action",
            renderCell: (params) => (
                <Button
                    className="cell_btn"
                    onClick={() => handleeditLeninMinMax(params.row)}
                >
                    <EditIcon className="check_box_clrr_cancell" />
                </Button>
            ),
        }
    ];

    const fetchLeninMinMaxData = async () => {
        try {
            const response = await axios.get(`${UrlLink}LeninManagement/Lenin_MinMax_Master_Detials_link`);
            if (response.status === 200) {
                setLeninMinMaxData(response.data);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleSaveChanges = async (row) => {
        try {
            const updatedRow = {
                ...row,
                PrevMin:  row.Min,
                PrevMax:  row.Max,
                Min: row.Min,
                Max: row.Max,
            };

            const response = await axios.post(`${UrlLink}LeninManagement/Lenin_MinMax_Master_Detials_link`, updatedRow);

            if (response.status === 200) {
                const responseData = response.data;
                const [type, message] = [Object.keys(responseData)[0], Object.values(responseData)[0]];

                dispatchvalue({
                    type: 'toast',
                    value: {
                        message: message,
                        type: type,
                    },
                });

                setLeninMinMaxData(prevData =>
                    prevData.map(item => item.id === row.id ? { ...item, ...updatedRow } : item)
                );

                setIsLeninMinMaxGet(prev => !prev);
            } else {
                dispatchvalue({
                    type: 'toast',
                    value: {
                        message: 'Unexpected response status',
                        type: 'error',
                    },
                });
            }
        } catch (error) {
            console.error('Save error:', error);

            dispatchvalue({
                type: 'toast',
                value: {
                    message: 'Failed to save changes. Please try again.',
                    type: 'error',
                },
            });
        }
    };

    const handleDoubleClick = useCallback((e, row, field) => {
        const newValue = prompt(`Enter new value for ${field}:`, row[field]);
        if (newValue !== null) {
            const updatedRow = {
                ...row,
                [`Prev${field}`]: row[field],
                [field]: newValue,
            };
            handleSaveChanges(updatedRow);
        }
    }, [handleSaveChanges]);

    const handleKeyDown = useCallback((e, row) => {
        if (e.key === 'Enter') {
            handleSaveChanges(row);
        } else if (['e', 'E', '+', '-'].includes(e.key)) {
            e.preventDefault();
        }
    }, [handleSaveChanges]);

    useEffect(() => {
        fetchLeninMinMaxData();
    }, [IsLeninMinMaxGet, UrlLink]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [departmentResponse, locationResponse,leninCategoryResponse, leninTypeResponse] = await Promise.all([
                    axios.get(`${UrlLink}Masters/Department_Detials_link`),
                    axios.get(`${UrlLink}Masters/Location_Detials_link`),
                    axios.get(`${UrlLink}LeninManagement/Lenin_Catg_Master_Detials_link`),
                    axios.get(`${UrlLink}LeninManagement/LeninMaster_Detials_link`),
                ]);

                setDepartmentData(departmentResponse.data);
                setLocationData(locationResponse.data);
                setLeninCategoryData(leninCategoryResponse.data);
                setLeninTypeData(leninTypeResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [UrlLink]);


    
    // const handleeditLeninMinMaxstatus = (params) => {
    //     const data = {
    //         Id: params.id,
    //         Statusedit: true
    //     }
    //     axios.post(`${UrlLink}LeninManagement/Lenin_MinMax_Master_Detials_link`, data)
    //         .then((res) => {
    //             const resres = res.data
    //             let typp = Object.keys(resres)[0]
    //             let mess = Object.values(resres)[0]
    //             const tdata = {
    //                 message: mess,
    //                 type: typp,
    //             }

    //             dispatchvalue({ type: 'toast', value: tdata });
    //             setIsLeninMinMaxGet(prev => !prev)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }


    const handleeditLeninMinMaxstatus = async (params) => {
        const data = {
            Id: params.id,
            Statusedit: true
        };

        try {
            const res = await axios.post(`${UrlLink}LeninManagement/Lenin_MinMax_Master_Detials_link`, data);
            const resData = res.data;
            const [type, message] = [Object.keys(resData)[0], Object.values(resData)[0]];

            dispatchvalue({
                type: 'toast',
                value: {
                    message: message,
                    type: type,
                },
            });

            setIsLeninMinMaxGet(prev => !prev);
        } catch (error) {
            console.error('Edit status error:', error);
        }
    };

    const handleeditLeninMinMax = (params) => {
        const { id, ...rest } = params;
        setLeninMinMax((prev) => ({
            ...prev,
            Id: id,
            Location: rest.LocationId,
            Department: rest.DepartmentId,
            LeninCategory: rest.catgId,
            LeninType: rest.LeninTypeId,
            Min: rest.Min,
            Max: rest.Max,
          

        }));
    };

    const handleLeninMinMaxSubmit = async () => {
        const { Location, Department, LeninCategory,LeninType, Min, Max } = LeninMinMax;

        if (Location && Department && LeninCategory && LeninType && Min && Max) {
            if (Location && Department && LeninCategory && LeninType && Min && Max>Min) {
                const data = {
                    ...LeninMinMax,
                    created_by: userRecord?.username || ''
                };
                console.log(data,'data');
                try {
                    const res = await axios.post(`${UrlLink}LeninManagement/Lenin_MinMax_Master_Detials_link`, data);
                    const resData = res.data;
                    const [type, message] = [Object.keys(resData)[0], Object.values(resData)[0]];
    
                    dispatchvalue({
                        type: 'toast',
                        value: {
                            message: message,
                            type: type,
                        },
                    });
    
                    setIsLeninMinMaxGet(prev => !prev);
                    setLeninMinMax({
                        Id: '',
                        Location: '',
                        Department: '',
                        LeninCategory: '',
                        LeninType: '',
                        Min: '',
                        Max: '',
                    });
                } catch (error) {
                    console.error('Submit error:', error);
                }
            } else {
                dispatchvalue({
                    type: 'toast',
                    value: {
                        message: 'Please provide max value greater than Min value.',
                        type: 'warn'
                    },
                });
            }
           
        } else {
            dispatchvalue({
                type: 'toast',
                value: {
                    message: 'Please provide all fields.',
                    type: 'warn'
                },
            });
        }
    };

    const handleLeninMinMaxChange = (e) => {
        const { name, value } = e.target;
        setLeninMinMax((prev) => ({
            ...prev,
            [name]: value?.toUpperCase()?.trim()
        }));
    };


    return (
        <>
            <div className="Main_container_app">
                <h3>Lenin Dept Wise Min Max</h3>
                <div className="RegisFormcon_1">
                    {Object.keys(LeninMinMax).filter(p => p !== 'Id').map((field, indx) => (
                        <div className="RegisForm_1" key={indx}>
                            <label htmlFor={`${field}_${indx}_${field}`}> {formatLabel(field)} <span>:</span> </label>
                            {
                                ['Location', 'Department', 'LeninType','LeninCategory'].includes(field) ?
                                    <select
                                        name={field}
                                        required
                                        id={`${field}_${indx}_${field}`}
                                        value={LeninMinMax[field]}
                                        onChange={handleLeninMinMaxChange}
                                    >
                                        <option value=''>Select</option>
                                        {field === 'Department' &&
                                            DepartmentData.filter(p => p.Status === 'Active').map((p, index) => (
                                                <option key={index} value={p.id}>{p.DepartmentName}</option>
                                            ))
                                        }
                                        {field === 'Location' &&
                                            LocationData.filter(p => p.Status === 'Active').map((p, index) => (
                                                <option key={index} value={p.id}>{p.locationName}</option>
                                            ))
                                        }
                                        {field === 'LeninCategory' &&
                                            LeninCategoryData.filter(p => p.Status === 'Active').map((p, index) => (
                                                <option key={index} value={p.catgId}>{p.LeninCategory} </option>
                                            ))
                                        }
                                        {field === 'LeninType' &&
                                            LeninTypeData.filter(p => p.Status === 'Active').map((p, index) => (
                                                <option key={index} value={p.LeninCode}>{p.LeninType} / {p.LeninSize}</option>
                                            ))
                                        }
                                    </select>
                                    :
                                    <input
                                        type="text"
                                        name={field}
                                        autoComplete='off'
                                        required
                                        value={LeninMinMax[field]}
                                        onChange={handleLeninMinMaxChange}
                                    />
                            }

                        </div>
                    ))}
                </div>
                <div className="Main_container_Btn">
                    <button onClick={handleLeninMinMaxSubmit}>
                        {LeninMinMax.Id ? "Update" : "Add"}
                    </button>
                </div>
                <ReactGrid columns={LeninMinMaxColumns} RowData={LeninMinMaxData} />
            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    );
};

export default Lenin_DeptWise_MinMax;
