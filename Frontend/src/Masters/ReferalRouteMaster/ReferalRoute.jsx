import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import axios from 'axios';

const ReferalRoute = () => {
    const dispatchvalue = useDispatch();
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const [LocationData, setLocationData] = useState([]);

    const formatLabel = (label) => {
        if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
            return label
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase());
        } else {
            return label;
        }
    };

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Location_Detials_link`)
            .then((res) => {
                const ress = res.data
                setLocationData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [UrlLink])
    // -------------route master-------------
    const [RouteMasterForm, setRouteMasterForm] = useState({
        Location: '',
        RouteId: '',
        RouteNo: '',
        RouteName: '',
        TahsilName: '',
        VillageName: '',
    
    })
    const [RouteMasterData, setRouteMasterData] = useState([])
    const [RouteMasterGet, setRouteMasterGet] = useState(false)
    const RouteMasterColumn = [
        {
            key: "id",
            name: "Route Id",
            frozen: true
        },
        ...[...Object.keys(RouteMasterForm),'Status','LocationName'].filter(field =>  !['RouteId','Location'].includes(field)).map(field => ({
            key: field,
            name: formatLabel(field),
            frozen: ['LocationName','Status'].includes(field),
            renderCell: (params) => (
                field === 'Status' ? (
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditRoutemasterstatus(params.row)}
                    >
                        {params.row[field]}
                    </Button>
                ) : (
                    <> {params.row[field]}</>
                )
            ),
        })),
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <Button
                    className="cell_btn"
                    onClick={() => handleeditRoutemaster(params.row)}
                >
                    <EditIcon className="check_box_clrr_cancell" />
                </Button>
            ),
        }
    ];

    const handleeditRoutemasterstatus = (params) => {
        const data = {RouteId: params.id,
             Statusedit: true }
        axios.post(`${UrlLink}Masters/Route_Master_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setRouteMasterGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleeditRoutemaster = (params) => {
        const { id, CreatedBy, ...rest } = params
        setRouteMasterForm((prev) => ({
            ...prev,
            RouteId: id,
            Location: rest.LocationId,
            RouteNo: rest.RouteNo,
            RouteName: rest.RouteName,
            TahsilName: rest.TahsilName,
            VillageName: rest.VillageName,
            
        }))
    }
    const handleRoutemasterSubmit = () => {
        const exist = Object.keys(RouteMasterForm).filter(p => p !== 'RouteId').filter(p => !RouteMasterForm[p])
        if (exist.length === 0) {
          
            const data = {
                ...RouteMasterForm,
                created_by: userRecord?.username || ''
            }
            axios.post(`${UrlLink}Masters/Route_Master_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setRouteMasterGet(prev => !prev)
                    setRouteMasterForm({
                        Location: '',
                        RouteId: '',
                        RouteNo: '',
                        RouteName: '',
                        TahsilName: '',
                        VillageName: '',
                    
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const tdata = {
                message: `Please provide ${exist.join(',')}.`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }
    }
    useEffect(() => {
        axios.get(`${UrlLink}Masters/Route_Master_Detials_link`)
            .then((res) => {
                const ress = res.data
                console.log(ress);
                setRouteMasterData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [RouteMasterGet, UrlLink])


    return (
        <>
            <div className="Main_container_app">
                <h3>Referal Route Master</h3>
                {/* route master */}
                <div className="common_center_tag">
                    <span>Route Master</span>
                </div>
                <div className="RegisFormcon_1">
                    {
                        Object.keys(RouteMasterForm).filter(P => !['RouteId', 'Status'].includes(P)).map((field, indx) => (
                            <div className="RegisForm_1" key={indx}>
                                <label> {formatLabel(field)} <span>:</span> </label>
                                {
                                    field === 'Location' ?
                                        <select
                                            name='Location'
                                            required
                                            value={RouteMasterForm[field]}
                                            onChange={(e) => setRouteMasterForm((prev) => ({ ...prev, [field]: e.target.value }))}
                                        >
                                            <option value=''>Select</option>
                                            {
                                                LocationData.map((p, index) => (
                                                    <option key={index} value={p.id}>{p.locationName}</option>
                                                ))
                                            }
                                        </select>
                                        :
                                        <input
                                            autoComplete='off'
                                            type="text"
                                            name={field}
                                            required
                                            value={RouteMasterForm[field]}
                                            onChange={(e) => setRouteMasterForm((prev) => ({ ...prev, [field]: e.target.value.toUpperCase() }))}
                                        />
                                }
                            </div>
                        ))
                    }


                </div>
                <div className="Main_container_Btn">
                    <button onClick={handleRoutemasterSubmit}>
                        {RouteMasterForm.RouteId ? "Update" : "Add"}
                    </button>
                </div>
                {RouteMasterData.length > 0 &&
                    <ReactGrid columns={RouteMasterColumn} RowData={RouteMasterData} />
                }
            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    )
}

export default ReferalRoute;