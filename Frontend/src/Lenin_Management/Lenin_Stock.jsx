import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
// import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';

const Lenin_Stock = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);

    const userRecord = useSelector((state) => state.userRecord?.UserData);
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

    const [Lenin,setLenin] = useState({
        StockId: '',
        LeninCategory: '',
        LeninType: '',
        // LeninSize: '',
        Quantity:'',
    })

    const [LeninData, setLeninData] = useState([])
    const [IsLeninGet, setIsLeninGet] = useState(false)
    const [LeninCategoryData, setLeninCategoryData] = useState([]);
    const [LeninTypeData, setLeninTypeData] = useState([]);
    const [LeninSizeData, setLeninSizeata] = useState([]);




    const LeninColumns = [
        {
            key: "StockId",
            name: "Stock Id",
            frozen: true

        },
        {
            key: "created_by",
            name: "Created By ",
            frozen: true
        },
        
        {
            key: "LeninCategory",
            name: "Lenin Category",
        },
        {
            key: "LeninType",
            name: "Lenin Type",
        },
        {
            key: "LeninSize",
            name: "Lenin Size",
        },
        {
            key: "Quantity",
            name: "Quantity",
        },


        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditLeninstatus(params.row)}
                    >
                        {params.row.Status}
                    </Button>
                </>
            ),
        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditLenin(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ]
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [leninCategoryResponse,leninTypeResponse,leninSizeResponse] = await Promise.all([
                    axios.get(`${UrlLink}LeninManagement/Lenin_Catg_Master_Detials_link`),
                    axios.get(`${UrlLink}LeninManagement/LeninMaster_Detials_link`),
                    axios.get(`${UrlLink}LeninManagement/LeninMaster_Detials_link`),
                ]);

                // setDepartmentData(departmentResponse.data);
                setLeninCategoryData(leninCategoryResponse.data);
                setLeninTypeData(leninTypeResponse.data);
                setLeninSizeata(leninSizeResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [UrlLink]);

    const handleeditLeninstatus = (params) => {
        const data = {
            StockId: params.StockId,
            Statusedit: true
        }
        axios.post(`${UrlLink}LeninManagement/Lenin_Stock_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsLeninGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
    }



    const handleeditLenin = (params) => {
        const { StockId, ...rest } = params
        setLenin((prev) => ({
            ...prev,
            StockId: StockId,
            ...rest
        }))
    }

    
    const handleLeninSubmit = () => {

        if (Lenin.LeninCategory,Lenin.LeninType) {
            const data = {
                ...Lenin,
                created_by: userRecord?.username || ''
            }
            console.log(data,'data');
            axios.post(`${UrlLink}LeninManagement/Lenin_Stock_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsLeninGet(prev => !prev)
                    setLenin({
                        StockId: '',
                        LeninCategory: '',
                        LeninType: '',
                        // LeninSize: '',
                        Quantity:'',

                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const tdata = {
                message: `Please provide all field.`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }
    }

    useEffect(() => {
        axios.get(`${UrlLink}LeninManagement/Lenin_Stock_Detials_link`)
            .then((res) => {
                const ress = res.data
                setLeninData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsLeninGet, UrlLink])

    const handleLeninChange = (e) => {
        const { name, value } = e.target;
        setLenin((prev) => ({
            ...prev,
            [name]: value?.toUpperCase()?.trim()
        }));
    };




  return (
    <>
        <div className="Main_container_app">
            <h3>Lenin Stock</h3>

            {/*------------------Lenin--------------------- */}
            {/* <div className="common_center_tag">
                <span>Lenin Details</span>
            </div> */}
            <div className="RegisFormcon_1">
                {Object.keys(Lenin).filter(p =>p !== 'StockId').map((field, indx) => (
                    <div className="RegisForm_1" key={indx}>
                        <label htmlFor={`${field}_${indx}_${field}`}> {formatLabel(field)} <span>:</span> </label>
                        {
                            ['LeninCategory','LeninType'].includes(field)?
                               <select
                                    name={field}
                                    required
                                    id={`${field}_${indx}_${field}`}
                                    value={Lenin[field]}
                                    onChange={handleLeninChange}
                               >
                                    <option value=''>Select</option>

                                    {field === 'LeninCategory' &&
                                        LeninCategoryData.filter(p => p.Status === 'Active').map((p, index) => (
                                            <option key={index} value={p.catgId}>{p.LeninCategory}</option>
                                        ))
                                    }
                                    {field === 'LeninType' &&
                                        LeninTypeData.filter(p => p.Status === 'Active').map((p, index) => (
                                            <option key={index} value={p.LeninCode}>{p.LeninType} / {p.LeninSize} </option>
                                        ))
                                    }
                                    {/* {field === 'LeninSize' &&
                                        LeninSizeData.filter(p => p.Status === 'Active').map((p, index) => (
                                            <option key={index} value={p.LeninCode}>{p.LeninSize} </option>
                                        ))
                                    } */}
                               </select>
                               :
                               <input
                                type="text"
                                name={field}
                                autoComplete='off'
                                required// Assuming StockId is not required for new entries
                                value={Lenin[field]}
                                onChange={handleLeninChange}
                               />
                        }
                       
                    </div>
                ))}
            </div>
            <div className="Main_container_Btn">
                <button onClick={handleLeninSubmit}>
                    {Lenin.StockId ? "Update" : "Add"}
                </button>
            </div>

            
            <ReactGrid columns={LeninColumns} RowData={LeninData} />

        </div>    
        <ToastAlert Message={toast.message} Type={toast.type} />


    </>
  )
}

export default Lenin_Stock;