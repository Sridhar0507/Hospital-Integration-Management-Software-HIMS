import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './NewRoomAvail.css'
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import { MdBlock } from "react-icons/md";

function CustomTooltip({ content, children }) {
  return (
    <Tooltip title={content} placement="top" arrow>
      {children}
    </Tooltip>
  );
}
const NewRoomAvail = () => {
  const dispatchvalue = useDispatch();
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector(state => state.userRecord?.toast);
  const [RoomdataColumnsData, setRoomdataColumnsData] = useState([]);
  const [RoomDatas, setRoomDatas] = useState([]);
  const [RoomdataColumns, setRoomdataColumns] = useState([]);
  const [filtertypes, setfiltertypes] = useState({
    wardtype: '',
    status: 'Total'
  })
  const handleheaderclicked = useCallback((params) => {
    setfiltertypes((prev) => ({
      ...prev,
      status: params,
      wardtype: ''
    }))
  }, [])
  const handlecellclicked = useCallback((params, field) => {
    console.log(params, field);

    setfiltertypes((prev) => ({
      ...prev,
      status: field,
      wardtype: params.roomname
    }))
  }, [])



  useEffect(() => {
    if (userRecord && userRecord?.location) {
      axios
        .get(
          `${UrlLink}Masters/get_room_count_data_total?Location=${userRecord?.location}`
        )
        .then((response) => {
          const { totalcount, totaldata } = response.data;

          const RoomdataColumns = [
            {
              key: "roomname",
              name: "Room Type",
              width: 180,
              renderCell: (params) => (
                <div className={`datatableheadercchecked ${filtertypes.wardtype === params.row.roomname ? 'selectedheader' : ''}`} >
                  {params.row.roomname}
                </div>
              )

            },
            ...Object.keys(totalcount).map((field) => (
              {

                key: field,
                renderHeaderCell: (params) => (
                  <div onDoubleClick={() => handleheaderclicked(field)} className={`  ${filtertypes.status === field ? 'selectedheader' : ''}`} >
                    {`${field} : ${totalcount[field]}`}
                  </div>
                ),
                renderCell: (params) => (
                  <div onDoubleClick={() => handlecellclicked(params.row, field)} className={`datatableheadercchecked`} >
                    {params.row[field]}
                  </div>
                )
              }
            )),

          ]
          setRoomdataColumns(RoomdataColumns)
          setRoomdataColumnsData(totaldata);
        })
        .catch((error) => {
          console.log(error);
        });

    }
  }, [userRecord, userRecord?.location, filtertypes, handleheaderclicked, handlecellclicked]);



  useEffect(() => {
    const data = {
      location: userRecord?.location,
      ...filtertypes
    }
    if (data.location && data.status) {
      axios.get(
        `${UrlLink}Masters/get_Room_Master_Data`, { params: data }
      )
        .then((response) => {
          const data = response.data;
          setRoomDatas(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }, [filtertypes, userRecord?.location])


  const roomCards = RoomDatas.map((room, index) => {
    // Check if 'attender' is an array and join it if it is, otherwise display an empty string
    const attendersText = Array.isArray(room?.attenders)
      ? room?.attenders.join(", ")
      : room?.attenders;

    const tooltipContent = (
      <div>
        Patient : {room?.PatientName}
        <br />
        Age : {room?.Age}
        <br />
        Attenders : {attendersText}
        <br />
        Contact : {room?.attenderPhoneNo}
        <br />
        Admitted Date : {room?.Admitdate}
        <br />
        {`Admission Purpose  : ${room?.AdmissionPurpose || ''}`}
      </div>
    );

    return (
      <CustomTooltip
        content={["Occupied", "Booked", "Requested"].includes(room.BookingStatus) ? tooltipContent : ""}
        key={index}
      >
        <Card sx={{ maxWidth: 350 }}>
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
                          : room.BookingStatus === "Maintenance"
                            ? "orange"
                            : room.BookingStatus === "Booked" ?
                              "blue" :
                              room.BookingStatus === "Requested" ?
                                'grey' : "green",
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
                      {room.BookingStatus === "Maintenance" && (
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
                      {room.BookingStatus === "Requested" && (
                        <Button size="small" style={{ color: "grey" }}>
                          Requested
                        </Button>
                      )}
                    </>
                  )
              }


            </CardActions>
          </div>
        </Card>
      </CustomTooltip>
    );
  });



  return (
    <>
      <div className="Main_container_app">
        <h3>Room Management</h3>
        {/* <div className="Room_manage_con">
                    <div className="Room_manage_type">
                        {["Filter by", "Casuality", "Diagnosis", "Laboratory"].map((p, ind) => (
                            <div className="Room_manage_type_val" key={ind}>

                                <label htmlFor={p}>
                                    {p} <span>:</span>
                                </label>
                                {
                                    p === 'Filter by' &&
                                    <select>
                                        <option value="">Select</option>
                                    </select>
                                }
                                <input type="text" />
                            </div>
                        ))}
                    </div>
                </div> */}
        <br />
        <div className="doctor_schedule_table_wrapper">
        
          <ReactGrid columns={RoomdataColumns} RowData={RoomdataColumnsData} />
          <div
            className="Rooms_avail_card"
          >
            {roomCards}
          </div>
        </div>

      </div>
    </>
  )
}

export default NewRoomAvail