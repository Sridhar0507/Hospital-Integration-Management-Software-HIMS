import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import axios from 'axios';


const RoomMaster = () => {
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

    // Building name 
    const [BuildingName, setBuildingName] = useState({
        BuildingId: '',
        BuildingName: '',
        Location: '',
    })
    const [BuildingData, setBuildingData] = useState([])
    const [IsBuildingGet, setIsBuildingGet] = useState(false)
    const BuildingColumns = [
        {
            key: "id",
            name: "Building Id",
            frozen: true
        },
        {
            key: "Location_Name",
            name: "Location",
            frozen: true
        },
        {
            key: "BuildingName",
            name: "Building Name",
        },

        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => HandleEditBuildingStatus(params.row)}
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
                        onClick={() => HandleEditBuilding(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ]

    const HandleEditBuildingStatus = (params) => {
        const data = {
            BuildingId: params.id,
            Statusedit: true
        }
        const confirmation = window.confirm('Are you sure you want to update the status? All the children Block, Floor, Ward, RoomType, room and bed statuses will be changed.');
        if (confirmation) {
        axios.post(`${UrlLink}Masters/Building_Master_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsBuildingGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
    const HandleEditBuilding = (params) => {
        const { id, Location_Id, BuildingName } = params
        setBuildingName({
            BuildingId: id,
            BuildingName: BuildingName,
            Location: Location_Id,
        })
    }

    const HandleSaveBuilding = () => {
        if (BuildingName.BuildingName && BuildingName.Location) {


            const data = {
                ...BuildingName,
                created_by: userRecord?.username || ''
            }
            axios.post(`${UrlLink}Masters/Building_Master_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsBuildingGet(prev => !prev)
                    setBuildingName({
                        BuildingId: '',
                        BuildingName: '',
                        Location: '',

                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const tdata = {
                message: `Please provide both Ward Name and Location.`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }
    }

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Building_Master_Detials_link`)
            .then((res) => {
                const ress = res.data
                setBuildingData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsBuildingGet, UrlLink])


    //Block Name
    const [BlockName, setBlockName] = useState({
        BlockId: '',
        BuildingName: '',
        BlockName: '',
        Location: '',
    })
    const [BlockData, setBlockData] = useState([])
    const [Buildingby_loc, setBuildingby_loc] = useState([])
    useEffect(() => {
        if (BlockName.Location) {
            axios.get(`${UrlLink}Masters/get_building_Data_by_location?Location=${BlockName.Location}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setBuildingby_loc(res.data)
                    } else {
                        setBuildingby_loc([])
                    }
                })
                .catch(err => {
                    setBuildingby_loc([])
                    console.log(err);
                })
        }

    }, [BlockName.Location, UrlLink])

    const handlechangeBlock = (e) => {
        const { name, value } = e.target
        if (name === 'Location') {
            setBlockName((prev) => ({
                ...prev,
                [name]: value,
                BuildingName: '',
                BlockName: '',
            }))
        } else if (name === 'BuildingName') {
            setBlockName((prev) => ({
                ...prev,
                [name]: value,
                BlockName: '',
            }))
        } else {
            setBlockName((prev) => ({
                ...prev,
                [name]: value.toUpperCase()
            }))
        }
    }
    const BlockColumns = [
        {
            key: "id",
            name: "Block Id",
            frozen: true
        },
        {
            key: "Location_Name",
            name: "Location",
            frozen: true
        },
        {
            key: "BuildingName",
            name: "Building Name",
        },
        {
            key: "BlockName",
            name: "Block Name",
        },

        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => HandleEditBlockStatus(params.row)}
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
                        onClick={() => HandleEditBlock(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ]

    const HandleEditBlockStatus = (params) => {
        const data = {
            BlockId: params.id,
            Statusedit: true
        }
        const confirmation = window.confirm('Are you sure you want to update the status? All the children Floor, Ward, RoomType, room and bed statuses will be changed.');
        if (confirmation) {
        axios.post(`${UrlLink}Masters/Block_Master_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                console.log(resres);
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsBuildingGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
    const HandleEditBlock = (params) => {
        const { id, Location_Id, BuildingId, BlockName } = params
        setBlockName({
            BlockId: id,
            BlockName: BlockName,
            BuildingName: BuildingId,
            Location: Location_Id,
        })
    }

    const HandleSaveBlock = () => {
        if (BlockName.Location && BlockName.BuildingName && BlockName.BlockName) {


            const data = {
                ...BlockName,
                created_by: userRecord?.username || ''
            }
            axios.post(`${UrlLink}Masters/Block_Master_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsBuildingGet(prev => !prev)
                    setBlockName(
                        {
                            BlockId: '',
                            BlockName: '',
                            BuildingName: '',
                            Location: '',

                        })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const tdata = {
                message: `Please provide both Building Name, Block Name and Location.`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }
    }

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Block_Master_Detials_link`)
            .then((res) => {
                const ress = res.data
                setBlockData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsBuildingGet, UrlLink])



    //Floor Name
    const [FloorName, setFloorName] = useState({
        FloorId: '',
        BuildingName: '',
        BlockName: '',
        FloorName: '',
        Location: '',
    })
    const [FloorData, setFloorData] = useState([])
    const [BLockby_Building_loc, setBLockby_Building_loc] = useState([])
    const [BLockby_Building, setBLockby_Building] = useState([])
    useEffect(() => {
        if (FloorName.Location) {
            axios.get(`${UrlLink}Masters/get_building_Data_by_location?Location=${FloorName.Location}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setBLockby_Building_loc(res.data)
                    } else {
                        setBLockby_Building_loc([])
                    }
                })
                .catch(err => {
                    setBLockby_Building_loc([])
                    console.log(err);
                })
        }

    }, [FloorName.Location, UrlLink])

    useEffect(() => {
        if (FloorName.BuildingName) {
            const data = {
                Building: FloorName.BuildingName,
            }
            axios.get(`${UrlLink}Masters/get_block_Data_by_Building`, { params: data })
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setBLockby_Building(res.data)
                    } else {
                        setBLockby_Building([])
                    }
                })
                .catch(err => {
                    setBLockby_Building([])
                    console.log(err);
                })
        }

    }, [FloorName.BuildingName, UrlLink])

    const handlechangeFloor = (e) => {
        const { name, value } = e.target
        if (name === 'Location') {
            setFloorName((prev) => ({
                ...prev,
                [name]: value,
                BuildingName: '',
                BlockName: '',
                FloorName: '',
            }))
        } else if (name === 'BuildingName') {
            setFloorName((prev) => ({
                ...prev,
                [name]: value,
                BlockName: '',
                FloorName: '',
            }))
        } else if (name === 'BlockName') {
            setFloorName((prev) => ({
                ...prev,
                [name]: value,
                FloorName: '',
            }))
        } else {
            setFloorName((prev) => ({
                ...prev,
                [name]: value.toUpperCase()
            }))
        }

    }
    const FloorColumns = [
        {
            key: "id",
            name: "Floor Id",
            frozen: true
        },
        {
            key: "Location_Name",
            name: "Location",
            frozen: true
        },
        {
            key: "BuildingName",
            name: "Building Name",
        },
        {
            key: "BlockName",
            name: "Block Name",
        },
        {
            key: "FloorName",
            name: "Floor Name",
        },

        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => HandleEditFloorStatus(params.row)}
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
                        onClick={() => HandleEditFloor(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ]

    const HandleEditFloorStatus = (params) => {
        const data = {
            FloorId: params.id,
            Statusedit: true
        }
        const confirmation = window.confirm('Are you sure you want to update the status? All the children Ward and RoomType and room and bed statuses will be changed.');
        if (confirmation) {
        axios.post(`${UrlLink}Masters/Floor_Master_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                console.log(resres);
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsBuildingGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    const HandleEditFloor = (params) => {
        const { id, Location_Id, BlockId, BuildingId, FloorName } = params
        setFloorName({
            FloorId: id,
            BlockName: BlockId,
            BuildingName: BuildingId,
            FloorName: FloorName,
            Location: Location_Id,
        })
    }

    const HandleSaveFloor = () => {
        const exist = Object.keys(FloorName).filter(p => p !== 'FloorId').filter((field) => !FloorName[field])
        if (exist.length === 0) {


            const data = {
                ...FloorName,
                created_by: userRecord?.username || ''
            }
            axios.post(`${UrlLink}Masters/Floor_Master_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsBuildingGet(prev => !prev)
                    setFloorName({
                        FloorId: '',
                        BuildingName: '',
                        BlockName: '',
                        FloorName: '',
                        Location: '',

                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const tdata = {
                message: `Please provide ${exist.join(' and ')}`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }
    }

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Floor_Master_Detials_link`)
            .then((res) => {
                const ress = res.data
                setFloorData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsBuildingGet, UrlLink])




    // ward name ------------

    const [WardName, setWardName] = useState({

        Location: '',
        BuildingName: '',
        BlockName: '',
        FloorName: '',
        WardName: '',
        WardId: '',
    })
    const [WardData, setWardData] = useState([])
    const [ward_Building_by__loc, setward_Building_by__loc] = useState([])
    const [ward_block_by_Building, setward_block_by_Building] = useState([])
    const [ward_Floor_by_Block, setward_Floor_by_Block] = useState([])
    useEffect(() => {
        if (WardName.Location) {
            axios.get(`${UrlLink}Masters/get_building_Data_by_location?Location=${WardName.Location}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setward_Building_by__loc(res.data)
                    } else {
                        setward_Building_by__loc([])
                    }
                })
                .catch(err => {
                    setward_Building_by__loc([])
                    console.log(err);
                })
        }

    }, [WardName.Location, UrlLink])

    useEffect(() => {
        if (WardName.BuildingName) {
            const data = {
                Building: WardName.BuildingName,
            }
            axios.get(`${UrlLink}Masters/get_block_Data_by_Building`, { params: data })
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setward_block_by_Building(res.data)
                    } else {
                        setward_block_by_Building([])
                    }
                })
                .catch(err => {
                    setward_block_by_Building([])
                    console.log(err);
                })
        }

    }, [WardName.BuildingName, UrlLink])

    useEffect(() => {
        if (WardName.BlockName) {
            const data = {
                Block: WardName.BlockName,
            }
            axios.get(`${UrlLink}Masters/get_Floor_Data_by_Building_block_loc`, { params: data })
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setward_Floor_by_Block(res.data)
                    } else {
                        setward_Floor_by_Block([])
                    }

                })
                .catch(err => {
                    setward_Floor_by_Block([])
                    console.log(err);
                })
        }

    }, [WardName.BlockName, UrlLink])


    const handlechangeWard = (e) => {
        const { name, value } = e.target
        if (name === 'Location') {
            setWardName((prev) => ({
                ...prev,
                [name]: value,
                BuildingName: '',
                BlockName: '',
                FloorName: '',
                WardName: '',
            }))
        } else if (name === 'BuildingName') {
            setWardName((prev) => ({
                ...prev,
                [name]: value,
                BlockName: '',
                FloorName: '',
                WardName: '',
            }))
        } else if (name === 'BlockName') {
            setWardName((prev) => ({
                ...prev,
                [name]: value,
                FloorName: '',
                WardName: '',
            }))
        } else if (name === 'FloorName') {
            setWardName((prev) => ({
                ...prev,
                [name]: value,
                WardName: '',
            }))
        } else {
            setWardName((prev) => ({
                ...prev,
                [name]: value.toUpperCase()
            }))
        }

    }

    const WardColumns = [
        {
            key: "id",
            name: "Ward Id",
            frozen: true
        },
        {
            key: "Location_Name",
            name: "Location",
            frozen: true
        },
        {
            key: "BuildingName",
            name: "Building Name",
        },
        {
            key: "BlockName",
            name: "Block Name",
        },
        {
            key: "FloorName",
            name: "Floor Name",
        },
        {
            key: "WardName",
            name: "Ward Name",
        },

        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => HandleEditWardStatus(params.row)}
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
                        onClick={() => HandleEditWard(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ]

    const HandleEditWardStatus = (params) => {
        const data = {
            WardId: params.id,
            Statusedit: true
        }
        const confirmation = window.confirm('Are you sure you want to update the status? All the children RoomType and room and bed statuses will be changed.');
        if (confirmation) {
        axios.post(`${UrlLink}Masters/Ward_Master_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsBuildingGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
    const HandleEditWard = (params) => {
        const { id, BuildingId, BlockId, FloorId, Location_Id, WardName } = params
        setWardName({
            Location: Location_Id,
            BuildingName: BuildingId,
            BlockName: BlockId,
            FloorName: FloorId,
            WardName: WardName,
            WardId: id,
        })
    }

    const HandleSaveWard = () => {
        const exist = Object.keys(WardName).filter(p => p !== 'WardId').filter((field) => !WardName[field])
        if (exist.length === 0) {


            const data = {
                ...WardName,
                created_by: userRecord?.username || ''
            }
            axios.post(`${UrlLink}Masters/Ward_Master_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsBuildingGet(prev => !prev)
                    setWardName({
                        Location: '',
                        BuildingName: '',
                        BlockName: '',
                        FloorName: '',
                        WardName: '',
                        WardId: '',

                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const tdata = {
                message: `Please provide ${exist.join(' and ')}`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }
    }

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Ward_Master_Detials_link`)
            .then((res) => {
                const ress = res.data
                setWardData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsBuildingGet, UrlLink])





    // room name ------------

    const [RoomName, setRoomName] = useState({

        Location: '',
        BuildingName: '',
        BlockName: '',
        FloorName: '',
        WardName: '',
        RoomName: '',
        RoomCharge: '',
        GST: 'Nill',
        RoomId: '',
    })
    const [RoomData, setRoomData] = useState([])
    const [Room_Building_by__loc, setRoom_Building_by__loc] = useState([])
    const [Room_block_by_Building, setRoom_block_by_Building] = useState([])
    const [Room_Floor_by_Block, setRoom_Floor_by_Block] = useState([])
    const [Room_ward_by_FLoor, setRoom_ward_by_FLoor] = useState([])
    useEffect(() => {
        if (RoomName.Location) {
            axios.get(`${UrlLink}Masters/get_building_Data_by_location?Location=${RoomName.Location}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setRoom_Building_by__loc(res.data)
                    } else {
                        setRoom_Building_by__loc([])
                    }

                })
                .catch(err => {
                    setRoom_Building_by__loc([])
                    console.log(err);
                })
        }

    }, [RoomName.Location, UrlLink])

    useEffect(() => {
        if (RoomName.BuildingName) {
            const data = {
                Building: RoomName.BuildingName,
            }
            axios.get(`${UrlLink}Masters/get_block_Data_by_Building`, { params: data })
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setRoom_block_by_Building(res.data)
                    } else {
                        setRoom_block_by_Building([])
                    }
                })
                .catch(err => {
                    setRoom_block_by_Building([])
                    console.log(err);
                })
        }

    }, [RoomName.BuildingName, UrlLink])

    useEffect(() => {
        if (RoomName.BlockName) {
            const data = {
                Block: RoomName.BlockName,
            }
            axios.get(`${UrlLink}Masters/get_Floor_Data_by_Building_block_loc`, { params: data })
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setRoom_Floor_by_Block(res.data)
                    } else {
                        setRoom_Floor_by_Block([])
                    }

                })
                .catch(err => {
                    setRoom_Floor_by_Block([])
                    console.log(err);
                })
        }

    }, [RoomName.BlockName, UrlLink])

    useEffect(() => {
        if (RoomName.FloorName) {
            const data = {
                Floor: RoomName.FloorName,
            }
            axios.get(`${UrlLink}Masters/get_Ward_Data_by_Building_block_Floor_loc`, { params: data })
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setRoom_ward_by_FLoor(res.data)
                    } else {
                        setRoom_ward_by_FLoor([])
                    }

                })
                .catch(err => {
                    setRoom_ward_by_FLoor([])
                    console.log(err);
                })
        }

    }, [RoomName.FloorName, UrlLink])


    const handlechangeRoom = (e) => {
        const { name, value } = e.target
        if (name === 'Location') {
            setRoomName((prev) => ({
                ...prev,
                [name]: value,
                BuildingName: '',
                BlockName: '',
                FloorName: '',
                WardName: '',
                RoomName: '',
                RoomCharge: '',
                GST: 'Nill',
            }))
        } else if (name === 'BuildingName') {
            setRoomName((prev) => ({
                ...prev,
                [name]: value,
                BlockName: '',
                FloorName: '',
                WardName: '',
                RoomName: '',
                RoomCharge: '',
                GST: 'Nill',
            }))
        } else if (name === 'BlockName') {
            setRoomName((prev) => ({
                ...prev,
                [name]: value,
                FloorName: '',
                WardName: '',
                RoomName: '',
                RoomCharge: '',
                GST: 'Nill',
            }))
        } else if (name === 'FloorName') {
            setRoomName((prev) => ({
                ...prev,
                [name]: value,
                WardName: '',
                RoomName: '',
                RoomCharge: '',
                GST: 'Nill',
            }))
        } else if (name === 'WardName') {
            setRoomName((prev) => ({
                ...prev,
                [name]: value,
                RoomName: '',
                RoomCharge: '',
                GST: 'Nill',
            }))
        } else if (name === 'RoomCharge') {
            if (+value < 5000) {
                setRoomName((prev) => ({
                    ...prev,
                    [name]: value.toUpperCase(),
                    GST: 'Nill'
                }))

            } else {
                setRoomName((prev) => ({
                    ...prev,
                    [name]: value.toUpperCase(),
                    GST: ''
                }))

            }
        } else {
            setRoomName((prev) => ({
                ...prev,
                [name]: value.toUpperCase()
            }))
        }

    }

    const RoomColumns = [
        {
            key: "id",
            name: "Ward Id",
            frozen: true
        },
        {
            key: "Location_Name",
            name: "Location",
            frozen: true
        },
        {
            key: "BuildingName",
            name: "Building Name",
        },
        {
            key: "BlockName",
            name: "Block Name",
        },
        {
            key: "FloorName",
            name: "Floor Name",
        },
        {
            key: "WardName",
            name: "Ward Name",
        },
        {
            key: "RoomName",
            name: "Room Name",
        },
        {
            key: "RoomCharge",
            name: "Room Charge",
            children: [
                {
                    key: "Prev_Charge",
                    name: "Previous Charge",
                    width: 120
                },
                {
                    key: "Current_Charge",
                    name: "Current Charge",
                    width: 120
                },
            ]
        },
        {
            key: "GST_val",
            name: "GST",
        },
        {
            key: "TotalRoomCharge",
            name: "Total Room Charge",
            children: [
                {
                    key: "Total_Prev_Charge",
                    name: "Previous Charge",
                    width: 120
                },
                {
                    key: "Total_Current_Charge",
                    name: "Current Charge",
                    width: 120
                },
            ]
        },
        {
            key: "Status",
            name: "Status",
            frozen: true,
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => HandleEditRoomStatus(params.row)}
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
                        onClick={() => HandleEditRoom(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ]

    const HandleEditRoomStatus = (params) => {
        const data = {
            RoomId: params.id,
            Statusedit: true
        }
        const confirmation = window.confirm('Are you sure you want to update the status? All the children room and bed statuses will be changed.');
        if (confirmation) {
        axios.post(`${UrlLink}Masters/Room_Master_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsBuildingGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
    const HandleEditRoom = (params) => {
        const { id, BuildingId, BlockId, FloorId, Location_Id, WardId, RoomName, Current_Charge, GST_val } = params
        setRoomName({
            Location: Location_Id,
            BuildingName: BuildingId,
            BlockName: BlockId,
            FloorName: FloorId,
            WardName: WardId,
            RoomName: RoomName,
            RoomCharge: Current_Charge,
            GST: GST_val,
            RoomId: id,
        })
    }

    const HandleSaveRoom = () => {
        const exist = Object.keys(RoomName).filter(p => p !== 'RoomId').filter((field) => !RoomName[field])
        if (exist.length === 0) {


            const data = {
                ...RoomName,
                created_by: userRecord?.username || ''
            }
            axios.post(`${UrlLink}Masters/Room_Master_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsBuildingGet(prev => !prev)
                    setRoomName({
                        Location: '',
                        BuildingName: '',
                        BlockName: '',
                        FloorName: '',
                        WardName: '',
                        RoomName: '',
                        RoomCharge: '',
                        GST: 'Nill',
                        RoomId: '',

                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const tdata = {
                message: `Please provide ${exist.join(' and ')}`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }
    }

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Room_Master_Detials_link`)
            .then((res) => {
                const ress = res.data
                setRoomData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsBuildingGet, UrlLink])




    // room master  ------------

    const [RoomMasterName, setRoomMasterName] = useState({

        Location: '',
        BuildingName: '',
        BlockName: '',
        FloorName: '',
        WardName: '',
        RoomName: '',
        BedCharge: '',
        GST: '',
        TotalCharge: '',
        RoomNo: '',
        BedNo: '',
        RoomMasterId: '',
    })
    const [RoomMasterData, setRoomMasterData] = useState([])
    const [RoomMaster_Building_by__loc, setRoomMaster_Building_by__loc] = useState([])
    const [RoomMaster_block_by_Building, setRoomMaster_block_by_Building] = useState([])
    const [RoomMaster_Floor_by_Block, setRoomMaster_Floor_by_Block] = useState([])
    const [RoomMaster_ward_by_FLoor, setRoomMaster_ward_by_FLoor] = useState([])
    const [RoomMaster_Room_by_Ward, setRoomMaster_Room_by_Ward] = useState([])


    useEffect(() => {
        if (RoomMasterName.Location) {
            axios.get(`${UrlLink}Masters/get_building_Data_by_location?Location=${RoomMasterName.Location}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setRoomMaster_Building_by__loc(res.data)
                    } else {
                        setRoomMaster_Building_by__loc([])
                    }
                })
                .catch(err => {
                    setRoomMaster_Building_by__loc([])
                    console.log(err);
                })
        }

    }, [RoomMasterName.Location, UrlLink])

    useEffect(() => {
        if (RoomMasterName.BuildingName) {
            const data = {
                Building: RoomMasterName.BuildingName,
            }
            axios.get(`${UrlLink}Masters/get_block_Data_by_Building`, { params: data })
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setRoomMaster_block_by_Building(res.data)
                    } else {
                        setRoomMaster_block_by_Building([])
                    }
                })
                .catch(err => {
                    setRoomMaster_block_by_Building([])
                    console.log(err);
                })
        }

    }, [RoomMasterName.BuildingName, UrlLink])

    useEffect(() => {
        if (RoomMasterName.BlockName) {
            const data = {
                Block: RoomMasterName.BlockName,
            }
            axios.get(`${UrlLink}Masters/get_Floor_Data_by_Building_block_loc`, { params: data })
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setRoomMaster_Floor_by_Block(res.data)
                    } else {
                        setRoomMaster_Floor_by_Block([])
                    }

                })
                .catch(err => {
                    setRoomMaster_Floor_by_Block([])
                    console.log(err);
                })
        }

    }, [RoomMasterName.BlockName, UrlLink])

    useEffect(() => {
        if (RoomMasterName.FloorName) {
            const data = {

                Floor: RoomMasterName.FloorName,
            }
            axios.get(`${UrlLink}Masters/get_Ward_Data_by_Building_block_Floor_loc`, { params: data })
                .then(res => {

                    if (Array.isArray(res.data)) {
                        setRoomMaster_ward_by_FLoor(res.data)
                    } else {
                        setRoomMaster_ward_by_FLoor([])
                    }
                })
                .catch(err => {
                    setRoomMaster_ward_by_FLoor([])
                    console.log(err);
                })
        }

    }, [RoomMasterName.FloorName, UrlLink])

    useEffect(() => {
        if (RoomMasterName.WardName) {
            const data = {
                Ward: RoomMasterName.WardName,
            }
            axios.get(`${UrlLink}Masters/get_RoomType_Data_by_Building_block_Floor_ward_loc`, { params: data })
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setRoomMaster_Room_by_Ward(res.data)
                    } else {
                        setRoomMaster_Room_by_Ward([])
                    }

                })
                .catch(err => {
                    setRoomMaster_Room_by_Ward([])
                    console.log(err);
                })
        }

    }, [RoomMasterName.WardName, UrlLink])


    const handlechangeRoomMaster = (e) => {
        const { name, value } = e.target
        if (name === 'Location') {
            setRoomMasterName((prev) => ({
                ...prev,
                [name]: value,
                BuildingName: '',
                BlockName: '',
                FloorName: '',
                WardName: '',
                RoomName: '',
                BedCharge: '',
                GST: '',
                TotalCharge: '',
                RoomNo: '',
                BedNo: '',
            }))
        } else if (name === 'BuildingName') {
            setRoomMasterName((prev) => ({
                ...prev,
                [name]: value,
                BlockName: '',
                FloorName: '',
                WardName: '',
                RoomName: '',
                BedCharge: '',
                GST: '',
                TotalCharge: '',
                RoomNo: '',
                BedNo: '',
            }))
        } else if (name === 'BlockName') {
            setRoomMasterName((prev) => ({
                ...prev,
                [name]: value,
                FloorName: '',
                WardName: '',
                RoomName: '',
                BedCharge: '',
                GST: '',
                TotalCharge: '',
                RoomNo: '',
                BedNo: '',
            }))
        } else if (name === 'FloorName') {
            setRoomMasterName((prev) => ({
                ...prev,
                [name]: value,
                WardName: '',
                RoomName: '',
                BedCharge: '',
                GST: '',
                TotalCharge: '',
                RoomNo: '',
                BedNo: '',
            }))
        } else if (name === 'WardName') {
            setRoomMasterName((prev) => ({
                ...prev,
                [name]: value,
                RoomName: '',
                BedCharge: '',
                GST: '',
                TotalCharge: '',
                RoomNo: '',
                BedNo: '',
            }))
        } else if (name === 'RoomName') {
            if (value) {
                const datass = RoomMaster_Room_by_Ward.find(p => p.id === +value)
                console.log(datass, 'value', value);
                setRoomMasterName((prev) => ({
                    ...prev,
                    [name]: value,
                    BedCharge: datass?.BedCharge,
                    GST: datass?.GST,
                    TotalCharge: datass?.TotalCharge,
                    RoomNo: '',
                    BedNo: '',
                }))
            } else {
                setRoomMasterName((prev) => ({
                    ...prev,
                    [name]: value,
                    BedCharge: '',
                    GST: '',
                    TotalCharge: '',
                    RoomNo: '',
                    BedNo: '',
                }))
            }

        } else {
            setRoomMasterName((prev) => ({
                ...prev,
                [name]: value.toUpperCase()
            }))
        }



    }

    const RoomMasterColumns = [
        {
            key: "id",
            name: "Room Master Id",
            frozen: true
        },
        {
            key: "LocationName",
            name: "Location",
            frozen: true
        },
        {
            key: "BuildingName",
            name: "Building Name",
        },
        {
            key: "BlockName",
            name: "Block Name",
        },
        {
            key: "FloorName",
            name: "Floor Name",
        },
        {
            key: "WardName",
            name: "Ward Name",
        },
        {
            key: "RoomName",
            name: "Room Name",
        },
        {
            key: "RoomNo",
            name: "Room No",
        },
        {
            key: "BedNo",
            name: "Bed No",
        },
        {
            key: "BedCharge",
            name: "Bed Charge",
        },
        {
            key: "GST",
            name: "GST",
        },
        {
            key: "TotalCharge",
            name: "Total Charge",
        },

        {
            key: "Status",
            name: "Status",
            frozen: true,
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditRoomMasterstatus(params.row)}
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
                        onClick={() => handleeditRoomMaster(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ]
    const handleeditRoomMasterstatus = (params) => {
        const data = {
            RoomMasterId: params.id,
            Statusedit: true
        }
        const conformation = window.confirm('Are you sure ,want to update the status')
        if (conformation) {
            axios.post(`${UrlLink}Masters/Room_Master_Master_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsBuildingGet(prev => !prev)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    const handleeditRoomMaster = (params) => {
        const { id, ...rest } = params
        console.log(rest);
        setRoomMasterName((prev) => ({
            ...prev,
            RoomMasterId: id,
            BuildingName: rest.BuildingId,
            BlockName: rest.BlockId,
            FloorName: rest.FloorId,
            WardName: rest.WardId,
            RoomName: rest.RoomId,
            Location: rest.LocationId,
            BedCharge: rest.BedCharge,
            GST: rest.GST,
            TotalCharge: rest.TotalCharge,
            RoomNo: rest.RoomNo,
            BedNo: rest.BedNo,

        }))
    }
    const HandleSaveRoomMaster = () => {
        const exist = Object.keys(RoomMasterName).filter(p => p !== 'RoomMasterId').filter((field) => !RoomMasterName[field])
        if (exist.length === 0) {


            const data = {
                ...RoomMasterName,
                created_by: userRecord?.username || ''
            }
            axios.post(`${UrlLink}Masters/Room_Master_Master_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    console.log(resres, '----');
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsBuildingGet(prev => !prev)
                    setRoomMasterName({
                        Location: '',
                        BuildingName: '',
                        BlockName: '',
                        FloorName: '',
                        WardName: '',
                        RoomName: '',
                        BedCharge: '',
                        GST: '',
                        TotalCharge: '',
                        RoomNo: '',
                        BedNo: '',
                        RoomMasterId: '',

                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const tdata = {
                message: `Please provide ${exist.join(' and ')}`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }
    }

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Room_Master_Master_Detials_link`)
            .then((res) => {
                const ress = res.data
                setRoomMasterData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsBuildingGet, UrlLink])


    return (
        <>
            <div className="Main_container_app">
                <h3>Room Master</h3>
                {/* ------------Building------------ */}
                <div className="common_center_tag">
                    <span>Building Name</span>
                </div>
                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label> Location <span>:</span> </label>

                        <select
                            name='Location'
                            required
                            disabled={BuildingName.BuildingId}
                            value={BuildingName.Location}
                            onChange={(e) => setBuildingName((prev) => ({ ...prev, Location: e.target.value, BuildingName: '' }))}
                        >
                            <option value=''>Select</option>
                            {
                                LocationData.map((p, index) => (
                                    <option key={index} value={p.id}>{p.locationName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="RegisForm_1">
                        <label> Building Name <span>:</span> </label>
                        <input
                            type="text"
                            name='BuildingName'
                            autoComplete='off'
                            required
                            value={BuildingName.BuildingName}
                            onChange={(e) => setBuildingName((prev) => ({ ...prev, BuildingName: e.target.value.toUpperCase() }))}
                        />
                    </div>

                </div>
                <div className="Main_container_Btn">
                    <button onClick={HandleSaveBuilding}>
                        {BuildingName.BuildingId ? "Update" : "Add"}
                    </button>
                </div>

                <ReactGrid columns={BuildingColumns} RowData={BuildingData} />
                <br />
                {/*-----------------------------Block Name-----------------------------------------------------------------------*/}

                <div className="common_center_tag">
                    <span>Block Name</span>
                </div>
                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label> Location <span>:</span> </label>

                        <select
                            name='Location'
                            required
                            disabled={BlockName.BlockId}
                            value={BlockName.Location}
                            onChange={handlechangeBlock}
                        >
                            <option value=''>Select</option>
                            {
                                LocationData.map((p, index) => (
                                    <option key={index} value={p.id}>{p.locationName}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="RegisForm_1">
                        <label> Building Name <span>:</span> </label>

                        <select
                            name='BuildingName'
                            required
                            disabled={BlockName.BlockId}
                            value={BlockName.BuildingName}
                            onChange={handlechangeBlock}
                        >
                            <option value=''>Select</option>
                            {
                                Buildingby_loc.map((p, index) => (
                                    <option key={index} value={p.id}>{p.BuildingName}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="RegisForm_1">
                        <label> Block Name <span>:</span> </label>
                        <input
                            type="text"
                            name='BlockName'
                            autoComplete='off'
                            required
                            value={BlockName.BlockName}
                            onChange={handlechangeBlock}
                        />
                    </div>

                </div>
                <div className="Main_container_Btn">
                    <button onClick={HandleSaveBlock}>
                        {BlockName.BlockId ? "Update" : "Add"}
                    </button>
                </div>

                <ReactGrid columns={BlockColumns} RowData={BlockData} />

                <br />
                {/*-----------------------------Floor Name-----------------------------------------------------------------------*/}

                <div className="common_center_tag">
                    <span>Floor Name</span>
                </div>
                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label> Location <span>:</span> </label>

                        <select
                            name='Location'
                            required
                            disabled={FloorName.FloorId}
                            value={FloorName.Location}
                            onChange={handlechangeFloor}
                        >
                            <option value=''>Select</option>
                            {
                                LocationData.map((p, index) => (
                                    <option key={index} value={p.id}>{p.locationName}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="RegisForm_1">
                        <label> Building Name <span>:</span> </label>

                        <select
                            name='BuildingName'
                            required
                            disabled={FloorName.FloorId}
                            value={FloorName.BuildingName}
                            onChange={handlechangeFloor}
                        >
                            <option value=''>Select</option>
                            {
                                BLockby_Building_loc.map((p, index) => (
                                    <option key={index} value={p.id}>{p.BuildingName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="RegisForm_1">
                        <label> Block Name <span>:</span> </label>

                        <select
                            name='BlockName'
                            required
                            disabled={FloorName.FloorId}
                            value={FloorName.BlockName}
                            onChange={handlechangeFloor}
                        >
                            <option value=''>Select</option>
                            {
                                BLockby_Building.map((p, index) => (
                                    <option key={index} value={p.id}>{p.BlockName}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="RegisForm_1">
                        <label> Floor Name <span>:</span> </label>
                        <input
                            type="text"
                            name='FloorName'
                            autoComplete='off'
                            required
                            value={FloorName.FloorName}
                            onChange={handlechangeFloor}
                        />
                    </div>

                </div>
                <div className="Main_container_Btn">
                    <button onClick={HandleSaveFloor}>
                        {FloorName.FloorId ? "Update" : "Add"}
                    </button>
                </div>

                <ReactGrid columns={FloorColumns} RowData={FloorData} />
                <br />
                {/*-----------------------------Ward Name-----------------------------------------------------------------------*/}

                <div className="common_center_tag">
                    <span>Ward Name</span>
                </div>
                <div className="RegisFormcon_1">
                    {Object.keys(WardName).filter(p => p !== 'WardId').map((field, indx) => (
                        <div className="RegisForm_1" key={indx}>
                            <label> {formatLabel(field)} <span>:</span> </label>
                            {
                                field === 'WardName' ?
                                    <input
                                        type="text"
                                        name={field}
                                        autoComplete='off'
                                        required
                                        value={WardName[field]}
                                        onChange={handlechangeWard}
                                    />
                                    :
                                    <select
                                        name={field}
                                        required
                                        disabled={WardName.WardId}
                                        value={WardName[field]}
                                        onChange={handlechangeWard}
                                    >
                                        <option value=''>Select</option>
                                        {field === 'BuildingName' &&
                                            ward_Building_by__loc.map((p, index) => (
                                                <option key={index} value={p.id}>{p.BuildingName}</option>
                                            ))
                                        }
                                        {field === 'BlockName' &&
                                            ward_block_by_Building.map((p, index) => (
                                                <option key={index} value={p.id}>{p.BlockName}</option>
                                            ))
                                        }
                                        {field === 'FloorName' &&
                                            ward_Floor_by_Block.map((p, index) => (
                                                <option key={index} value={p.id}>{p.FloorName}</option>
                                            ))
                                        }
                                        {field === 'Location' &&
                                            LocationData.map((p, index) => (
                                                <option key={index} value={p.id}>{p.locationName}</option>
                                            ))
                                        }
                                    </select>
                            }
                        </div>
                    ))}
                </div>
                <div className="Main_container_Btn">
                    <button onClick={HandleSaveWard}>
                        {WardName.WardId ? "Update" : "Add"}
                    </button>
                </div>

                <ReactGrid columns={WardColumns} RowData={WardData} />

                <br />
                {/*-----------------------------Room Name-----------------------------------------------------------------------*/}

                <div className="common_center_tag">
                    <span>Room Name</span>
                </div>
                <div className="RegisFormcon_1">
                    {Object.keys(RoomName).filter(p => p !== 'RoomId').map((field, indx) => (
                        <div className="RegisForm_1" key={indx}>
                            <label> {formatLabel(field)} <span>:</span> </label>
                            {
                                (field === 'GST' && (parseInt(RoomName.RoomCharge, 0) < 5000 || RoomName.RoomCharge === '')) || field === 'RoomName' || field === 'RoomCharge' ?
                                    <input
                                        type={field === 'RoomCharge' ? 'number' : 'text'}
                                        name={field}
                                        onKeyDown={(e) => (field === 'RoomCharge') && (['+', '-', 'e', 'E'].includes(e.key) && e.preventDefault())}
                                        autoComplete='off'
                                        required
                                        readOnly={field === 'GST' && (RoomName.RoomCharge ? parseInt(RoomName.RoomCharge, 0) < 5000 : true)}
                                        value={RoomName[field]}
                                        onChange={handlechangeRoom}
                                    />
                                    :
                                    <select
                                        name={field}
                                        required
                                        disabled={RoomName.RoomId}
                                        value={RoomName[field]}
                                        onChange={handlechangeRoom}
                                    >
                                        <option value=''>Select</option>
                                        {field === 'BuildingName' &&
                                            Room_Building_by__loc.map((p, index) => (
                                                <option key={index} value={p.id}>{p.BuildingName}</option>
                                            ))
                                        }
                                        {field === 'BlockName' &&
                                            Room_block_by_Building.map((p, index) => (
                                                <option key={index} value={p.id}>{p.BlockName}</option>
                                            ))
                                        }
                                        {field === 'FloorName' &&
                                            Room_Floor_by_Block.map((p, index) => (
                                                <option key={index} value={p.id}>{p.FloorName}</option>
                                            ))
                                        }
                                        {field === 'WardName' &&
                                            Room_ward_by_FLoor.map((p, index) => (
                                                <option key={index} value={p.id}>{p.WardName}</option>
                                            ))
                                        }
                                        {field === 'Location' &&
                                            LocationData.map((p, index) => (
                                                <option key={index} value={p.id}>{p.locationName}</option>
                                            ))
                                        }
                                        {field === 'GST' &&
                                            <>
                                                <option value='28'>28 %</option>
                                                <option value='18'>18 %</option>
                                                <option value='12'>12 %</option>
                                                <option value='5'>5 %</option>
                                            </>
                                        }
                                    </select>
                            }
                        </div>
                    ))}
                </div>
                <div className="Main_container_Btn">
                    <button onClick={HandleSaveRoom}>
                        {RoomName.RoomId ? "Update" : "Add"}
                    </button>
                </div>

                <ReactGrid columns={RoomColumns} RowData={RoomData} />
                <br />
                {/* -----------room master -------*/}
                <div className="common_center_tag">
                    <span>Room Master</span>
                </div>
                <div className="RegisFormcon_1">
                    {
                        Object.keys(RoomMasterName).filter(p => !['RoomMasterId'].includes(p)).map((field, indx) => (
                            <div className="RegisForm_1" key={indx}>
                                <label> {formatLabel(field)} <span>:</span> </label>
                                {
                                    ['RoomNo', 'BedNo', 'BedCharge', 'GST', 'TotalCharge'].includes(field) ?
                                        <input
                                            type={'text'}
                                            name={field}
                                            autoComplete='off'
                                            required
                                            readOnly={['BedCharge', 'GST', 'TotalCharge'].includes(field)}
                                            value={RoomMasterName[field]}
                                            onChange={handlechangeRoomMaster}
                                        />
                                        :
                                        <select
                                            name={field}
                                            required
                                            disabled={RoomMasterName.RoomMasterId}
                                            value={RoomMasterName[field]}
                                            onChange={handlechangeRoomMaster}
                                        >
                                            <option value=''>Select</option>
                                            {field === 'BuildingName' &&
                                                RoomMaster_Building_by__loc.map((p, index) => (
                                                    <option key={index} value={p.id}>{p.BuildingName}</option>
                                                ))
                                            }
                                            {field === 'BlockName' &&
                                                RoomMaster_block_by_Building.map((p, index) => (
                                                    <option key={index} value={p.id}>{p.BlockName}</option>
                                                ))
                                            }
                                            {field === 'FloorName' &&
                                                RoomMaster_Floor_by_Block.map((p, index) => (
                                                    <option key={index} value={p.id}>{p.FloorName}</option>
                                                ))
                                            }
                                            {field === 'WardName' &&
                                                RoomMaster_ward_by_FLoor.map((p, index) => (
                                                    <option key={index} value={p.id}>{p.WardName}</option>
                                                ))
                                            }
                                            {field === 'RoomName' &&
                                                RoomMaster_Room_by_Ward.map((p, index) => (
                                                    <option key={index} value={p.id}>{p.RoomName}</option>
                                                ))
                                            }
                                            {field === 'Location' &&
                                                LocationData.map((p, index) => (
                                                    <option key={index} value={p.id}>{p.locationName}</option>
                                                ))
                                            }

                                        </select>
                                }
                            </div>
                        ))
                    }

                </div>
                <div className="Main_container_Btn">
                    <button onClick={HandleSaveRoomMaster}>
                        {RoomMasterName.RoomMasterId ? "Update" : "Add"}
                    </button>
                </div>

                <ReactGrid columns={RoomMasterColumns} RowData={RoomMasterData} />

                <br />
            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    )
}

export default RoomMaster;