import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import RoomDetialsSelect from '../../FrontOffice/Registration/RoomDetialsSelect';
import { IoBedOutline } from "react-icons/io5";
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';

const BedTransferRequest = () => {
    const [CurrentPreviousRoom, setCurrentPreviousRoom] = useState(null)
    const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
    const toast = useSelector(state => state.userRecord?.toast);
    const UserData = useSelector((state) => state.userRecord?.UserData);
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const RegisterRoomShow = useSelector(state => state.Frontoffice?.RegisterRoomShow);
    const SelectRoomRegister = useSelector(state => state.Frontoffice?.SelectRoomRegister);
    const [getdata, setgetdata] = useState(false)

    const [RoomdeditalsShow, setRoomdeditalsShow] = useState({
        BuildingId: null,
        BuildingName: "",
        BlockId: null,
        BlockName: "",
        FloorId: null,
        FloorName: "",
        WardId: null,
        WardName: "",
        RoomId: null,
        RoomName: "",
        RoomNo: "",
        BedNo: "",
        id: "",
    })
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


    useEffect(() => {
        if (Object.keys(SelectRoomRegister).length !== 0) {

            setRoomdeditalsShow({
                BuildingId: SelectRoomRegister.BuildingId,
                BuildingName: SelectRoomRegister.BuildingName,
                BlockId: SelectRoomRegister.BlockId,
                BlockName: SelectRoomRegister.BlockName,
                FloorId: SelectRoomRegister.FloorId,
                FloorName: SelectRoomRegister.FloorName,
                WardId: SelectRoomRegister.WardId,
                WardName: SelectRoomRegister.WardName,
                RoomId: SelectRoomRegister.RoomId,
                RoomName: SelectRoomRegister.RoomName,
                RoomNo: SelectRoomRegister.RoomNo,
                BedNo: SelectRoomRegister.BedNo,
                id: SelectRoomRegister.id,
            })

        }

    }, [SelectRoomRegister])

    useEffect(() => {

        axios.get(`${UrlLink}Frontoffice/get_ip_roomdetials_for_bedtransfer_details?RegistrationId=${IP_DoctorWorkbenchNavigation?.RegistrationId}`,)
            .then((res) => {
                const ress = res.data;
                setCurrentPreviousRoom(ress);

            })
            .catch((err) => {
                setCurrentPreviousRoom(null);
                console.log(err);
            });
    }, [UrlLink, IP_DoctorWorkbenchNavigation, getdata]);

    const RegisterColumn = [
        {
            key: "DateTime",
            name: "DateTime",
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
            key: "RoomId",
            name: "Room Id",
        },


    ]
    const RegisterColumn1 = [
        {
            key: "DateTime",
            name: "DateTime",
            frozen: true
        },
        {
            key: "Status",
            name: "Status",
            frozen: true
        },

        {
            key: "Admitted_Date",
            name: "In Time",
        },
        {
            key: "Discharge_Date",
            name: "Out Time",
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
            key: "RoomId",
            name: "Room Id",
        },


    ]
    const handlesubmit = () => {
        if (RoomdeditalsShow?.id) {
            const reason = window.prompt('Write an Reason For Bed Transfer')
            if (reason) {


                const submitdata = {
                    RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
                    RoomId: RoomdeditalsShow?.id,
                    createdby: UserData?.username,
                    Reason: reason
                }

                axios.post(`${UrlLink}Frontoffice/post_ip_bed_transfer_details`, submitdata)
                    .then(res => {
                        console.log(res.data);
                        const resres = res.data;
                        let typp = Object.keys(resres)[0];
                        let mess = Object.values(resres)[0];
                        const tdata = {
                            message: mess,
                            type: typp,
                        };
                        setgetdata(prev => !prev)
                        dispatchvalue({ type: 'toast', value: tdata });
                        setRoomdeditalsShow({
                            BuildingId: null,
                            BuildingName: "",
                            BlockId: null,
                            BlockName: "",
                            FloorId: null,
                            FloorName: "",
                            WardId: null,
                            WardName: "",
                            RoomId: null,
                            RoomName: "",
                            RoomNo: "",
                            BedNo: "",
                            RoomId: "",
                        })
                        dispatchvalue({ type: 'SelectRoomRegister', value: {} })

                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        } else {
            const tdata = {
                message: 'Please select a Room To change',
                type: 'warn',
            };
            dispatchvalue({ type: 'toast', value: tdata });

        }

    }

    return (
        <>
            <div className='new-patient-registration-form'>
                <br />
                <div className='DivCenter_container'>Bed Transfer Request</div>

                <br />
                {
                    CurrentPreviousRoom?.Roomsdata && CurrentPreviousRoom?.Roomsdata.length !== 0 &&
                    (
                        <>

                            <div className='DivCenter_container'> Previous Room </div>
                            <br />
                            <ReactGrid columns={RegisterColumn1} RowData={CurrentPreviousRoom?.Roomsdata} />

                        </>
                    )
                }
                <div className='DivCenter_container'> current Room </div>
                <br />
                {
                    CurrentPreviousRoom?.ip_register_data &&
                    <ReactGrid columns={RegisterColumn} RowData={CurrentPreviousRoom?.ip_register_data} />
                }
                <div className='DivCenter_container'>Change Room  </div>
                <div className='DivCenter_container' >
                    <IoBedOutline className='HotelIcon_registration' onClick={() => { dispatchvalue({ type: 'RegisterRoomShow', value: { type: 'IP', val: true } }) }} />
                </div>
                <div className="RegisFormcon_1" >
                    {
                        ['BuildingName', 'BlockName', 'FloorName', 'WardName', 'RoomName', 'RoomNo', 'BedNo'].map((field, indx) => (
                            <div className="RegisForm_1" key={indx}>
                                <label htmlFor={`${field}_${indx}`}>
                                    {formatLabel(field)}
                                    <span>:</span>
                                </label>
                                <input
                                    type='text'
                                    value={RoomdeditalsShow[field]}
                                    disabled
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="Main_container_Btn">
                    <button onClick={handlesubmit}>
                        Request to Transfer
                    </button>
                </div>
            </div>
            {
                RegisterRoomShow.val &&
                <RoomDetialsSelect />
            }
            <ToastAlert Message={toast.message} Type={toast.type} />

        </>
    )
}

export default BedTransferRequest;