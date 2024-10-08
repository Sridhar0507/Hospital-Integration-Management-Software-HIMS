import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MdBlock } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const RoomDetialsSelect = () => {


    const [RoomDataforRegister, setRoomDataforRegister] = useState([])
    const UserData = useSelector((state) => state.userRecord?.UserData);
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const RegisterRoomShow = useSelector(state => state.Frontoffice?.RegisterRoomShow);
    const dispatchvalue = useDispatch();
    const [searchdata, setsearchdata] = useState({
        Building: "",
        Block: "",
        Floor: "",
        Ward: "",
        Room: "",
    })
    const [uniquedata, setuniquedata] = useState({})
    useEffect(() => {
        dispatchvalue({ type: 'SelectRoomRegister', value: {} })
    }, [dispatchvalue])

    
    useEffect(() => {
        if (RegisterRoomShow.val && RegisterRoomShow.type) {
            const data = {
                location: UserData?.location,
                RegisterType: RegisterRoomShow.type
            }
            axios.get(`${UrlLink}Masters/get_filter_Data_for_registration`, { params: data })
                .then((res) => {
                    const data = res.data

                    setuniquedata(data)
                    Object.keys(data).filter(p=>!['Ward','Room'].includes(p)).forEach(element => {
                        if (data[element].length===1) {
                            setsearchdata((prev)=>({
                                ...prev,
                                [element]:data[element][0].id
                            }))
                        }
                    });

                })
                .catch((err) => {
                    setuniquedata({})
                    console.log(err);

                })
        }

    }, [UserData, UrlLink, RegisterRoomShow.type])

    useEffect(() => {
        if (RegisterRoomShow.val && RegisterRoomShow.type) {
            const data = {
                location: UserData?.location,
                RegisterType: RegisterRoomShow.type,
                ...searchdata
            }
            axios.get(`${UrlLink}Masters/get_Room_Master_Data_for_registration`, { params: data })
                .then((res) => {
                    const data = res.data
                    if (Array.isArray(data)) {
                        setRoomDataforRegister(data)
                    } else {
                        setRoomDataforRegister([])
                    }
                })
                .catch((err) => {
                    setRoomDataforRegister([])
                    console.log(err);

                })
        }

    }, [UserData, UrlLink, RegisterRoomShow.type,searchdata])

    const selectroom = (room) => {
        console.log(room);

        dispatchvalue({ type: 'SelectRoomRegister', value: { ...room } })
        dispatchvalue({ type: 'RegisterRoomShow', value: { type: '', val: false } })
    }


    return (
        <div className="loader" onClick={() => dispatchvalue({ type: 'RegisterRoomShow', value: { type: '', val: false } })}>
            <div className="loader_register_roomshow" onClick={(e) => e.stopPropagation()}>

                <div className='DivCenter_container'>Select Room Details </div>
                <div className="RegisFormcon_1">
                    {
                        Object.keys(searchdata).map((field, index) => (
                            <div className="RegisForm_1" key={index}>
                                <label htmlFor={`${field}_${index}`}>
                                    {`${field} Name`}
                                    <span>:</span>
                                </label>
                                <select
                                    id={`${field}_${index}`}
                                    name={field}
                                    value={searchdata[field]}
                                    disabled={Object.keys(uniquedata).length !== 0 && uniquedata[field].length===1}
                                    onChange={(e) => setsearchdata((prev) => ({
                                        ...prev,
                                        [field]: e.target.value
                                    }))}
                                >
                                    <option value=''>Select</option>

                                    {Object.keys(uniquedata).length !== 0 && uniquedata[field].map((p, indx) => (
                                        <option key={indx} value={p.id}>{p.Name}</option>

                                    ))}
                                </select>
                            </div>
                        ))
                    }
                </div>
                <br />
                <div className="Rooms_avail_card" >
                    {
                        RoomDataforRegister.map((room, index) => (

                            <Card sx={{ maxWidth: 350 }} onClick={() => selectroom(room)} key={index}>
                                <div className="tooltip-trigger">
                                    <CardContent className="Rooms_avail_card_container">
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            gutterBottom
                                            component="div"
                                            className="Rooms_avail_card_container_container"
                                        >
                                            <div className="Rooms_avail_card_one">
                                                <div className="Rooms_avail_card_neww">
                                                    <label htmlFor="">
                                                        Building <span>:</span>
                                                    </label>
                                                    <div>{room?.BuildingName}</div>
                                                </div>
                                                <div className="Rooms_avail_card_neww">
                                                    <label htmlFor="">
                                                        Block Name<span>:</span>
                                                    </label>
                                                    <div>{room?.BlockName}</div>
                                                </div>
                                            </div>
                                            <div className="Rooms_avail_card_one">
                                                <div className="Rooms_avail_card_neww">
                                                    <label htmlFor="">
                                                        Floor Name <span>:</span>
                                                    </label>
                                                    <div>{room?.FloorName}</div>
                                                </div>
                                                <div className="Rooms_avail_card_neww">
                                                    <label htmlFor="">
                                                        Ward Type <span>:</span>
                                                    </label>
                                                    <div>{room?.WardName}</div>
                                                </div>
                                            </div>
                                            <div className="Rooms_avail_card_one">
                                                <div className="Rooms_avail_card_neww">
                                                    <label htmlFor="">
                                                        Room Type <span>:</span>
                                                    </label>
                                                    <div>{room?.RoomName}</div>
                                                </div>
                                                <div className="Rooms_avail_card_neww">
                                                    <label htmlFor="">
                                                        Room No <span>:</span>
                                                    </label>
                                                    <div>{room?.RoomNo}</div>
                                                </div>
                                            </div>
                                            <div className="Rooms_avail_card_one">
                                                <div className="Rooms_avail_card_neww">
                                                    <label htmlFor="">
                                                        Bed No <span>:</span>
                                                    </label>
                                                    <div>{room?.BedNo}</div>
                                                </div>
                                                <div className="Rooms_avail_card_neww">
                                                    <label htmlFor="">
                                                        Charge <span>:</span>
                                                    </label>
                                                    <div>{room?.TotalCharge}</div>
                                                </div>
                                            </div>
                                        </Typography>
                                        <Typography variant="h5" className="Rooms_avail_card_icon">
                                            {room.Status !== 'Inactive' ?
                                                <FontAwesomeIcon
                                                    icon={faBed}
                                                    style={{
                                                        color:
                                                            room.BookingStatus === "Occupied"
                                                                ? "red"
                                                                : room.BookingStatus === "Maintance"
                                                                    ? "orange"
                                                                    : room.BookingStatus === "Booked" ?
                                                                        "blue" : "green",
                                                    }}
                                                    className={`Rooms_avail_carditems_availableIcon`}
                                                />
                                                :
                                                <MdBlock
                                                    style={{
                                                        color: "red"
                                                    }}
                                                    className={`Rooms_avail_carditems_availableIcon`}
                                                />
                                            }
                                        </Typography>
                                    </CardContent>
                                    <CardActions className="Rooms_avail_card_btns">
                                        {
                                            room.Status === 'Inactive' ?
                                                (
                                                    <Button size="small" style={{ color: "red" }}>
                                                        InActive
                                                    </Button>
                                                ) :
                                                (
                                                    <>


                                                        {room.BookingStatus === "Occupied" && (
                                                            <Button size="small" style={{ color: "red" }}>
                                                                Occupied
                                                            </Button>
                                                        )}
                                                        {room.BookingStatus === "Maintance" && (
                                                            <Button size="small" style={{ color: "orange" }}>
                                                                Under Maintenance
                                                            </Button>
                                                        )}
                                                        {room.BookingStatus === "Available" && (
                                                            <Button size="small" style={{ color: "green" }}>
                                                                Available
                                                            </Button>
                                                        )}
                                                        {room.BookingStatus === "Booked" && (
                                                            <Button size="small" style={{ color: "blue" }}>
                                                                Booked
                                                            </Button>
                                                        )}
                                                    </>
                                                )
                                        }


                                    </CardActions>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default RoomDetialsSelect