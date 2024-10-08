import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';

const BedtransferRecieve = () => {

    const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
    const [CurrentPreviousRoom, setCurrentPreviousRoom] = useState(null)
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const UserData = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const [getdata, setgetdata] = useState(false)
    const [Showmodel, setShowmodel] = useState({
        status: false,
        type: '',
        RoomId: "",
    })
    const [datasforapprove, setdatasforapprove] = useState({
        PatientFileRecieved: false,
        MedicineTransfered: false,
        AnyMedicalRecordError: false,
        ConfirmationFromRelatives: false,
        RelativeName: "",
        Reason: ""
    })
    const dispatchvalue = useDispatch();


    useEffect(() => {
        setCurrentPreviousRoom(null)
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
            key: "Action",
            name: "Action",
            frozen: true,
            width: 200,
            renderCell: (params) => (
                params.row.Status === 'Requested' ?
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Button
                            className="cell_btn"
                            onClick={() => handleapprovetransfer(params.row)}
                            title='Approve the transfer request'
                        >
                            <CheckCircleIcon className="check_box_clrr_cancell" />
                        </Button>
                        <Button
                            className="cell_btn"
                            onClick={() => handlecanceltransfer(params.row)}
                            title='Cancel the transfer request'
                        >
                            <CancelIcon className="check_box_clrr_cancell" />
                        </Button>
                    </div>
                    : 'No Action'
            ),
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
    const handleapprovetransfer = (params) => {
        setShowmodel({
            status: true,
            type: 'Approve',
            RoomId: params?.RoomId,
        })
        
    }
    const handlecanceltransfer = (params) => {
        setShowmodel({
            status: true,
            type: 'Cancel',
            RoomId: params?.RoomId,
        })
       
    }



    const handlesubmit = () => {
        const exist = Object.keys(datasforapprove).filter(p => Showmodel.status === 'Cancel' ?
            p === 'Reason' :
            datasforapprove.AnyMedicalRecordError ?
                p !== 'AnyMedicalRecordError' : !['AnyMedicalRecordError', 'Reason'].includes(p)
        ).filter(f => !datasforapprove[f])
        if (exist.length !== 0) {
            dispatchvalue({
                type: 'toast',
                value: { message: `Please fill the required fields : ${exist.join(' , ')}`, type: 'warn' },
            });
        } else {
            const approve = window.confirm('Are You sure, need to approve the request')
            if (approve) {
                const data = {
                    RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
                    Type: Showmodel.type,
                    RoomId: Showmodel?.RoomId,
                    ...datasforapprove,
                    createdby: UserData?.username
                }

                console.log('dataaaa',data);
                

                axios.post(`${UrlLink}Frontoffice/bed_transfer_approve_cancel_details`, data)
                    .then((res) => {
                        const resres = res.data;
                        let typp = Object.keys(resres)[0];
                        let mess = Object.values(resres)[0];
                        const tdata = {
                            message: mess,
                            type: typp,
                        };
                        setgetdata(prev => !prev)
                        dispatchvalue({ type: 'toast', value: tdata });
                        setShowmodel({
                            status: false,
                            type: '',
                            RoomId: "",
                        })
                        setdatasforapprove({
                            PatientFileRecieved: false,
                            MedicineTransfered: false,
                            AnyMedicalRecordError: false,
                            ConformationFromRelatives: false,
                            RelativeName: "",
                            Reason: ""
                        })
                    })
                    .catch((err) => {
                        console.log(err);

                    })
            }
        }

    }
    const formatLabel = (label) => {

        if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
            return label
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase());
        } else {
            return label;
        }
    };



    return (
        <>
            <div className='new-patient-registration-form'>
                <br />
            <div className='DivCenter_container'>Bed Request Approve / Cancel</div>

                <br />
                <div className='DivCenter_container'> current Room </div>
                {
                    CurrentPreviousRoom?.ip_register_data &&
                    <ReactGrid columns={RegisterColumn} RowData={CurrentPreviousRoom?.ip_register_data ??[]} />
                }
                <br />


                <div className='DivCenter_container'> Requested Room </div>
                <br />
                <ReactGrid columns={RegisterColumn1} RowData={CurrentPreviousRoom?.Roomsdata ??[]} />


            </div>

            {
                Showmodel?.status && (
                    <div className="modal-container" onClick={() => setShowmodel(prev => ({
                        ...prev,
                        status: false
                    }))}>
                        <div className="App_Cal_modal" onClick={(e) => e.stopPropagation()}>
                            <div className="common_center_tag">
                                <span>{Showmodel.type} Request</span>
                            </div>
                            <br />
                            <div className="RegisFormcon_1">
                                {
                                    Object.keys(datasforapprove).filter(p => Showmodel.type === 'Cancel' ? p === 'Reason' : datasforapprove.AnyMedicalRecordError ? p : p !== 'Reason').map((field, indx) => (
                                        <div className="RegisForm_1" key={indx}>
                                            <label htmlFor={`${field}_${indx}`}>{formatLabel(field)}<span>:</span> </label>
                                            {
                                                field === 'Reason' ?
                                                    <textarea
                                                        id={`${field}_${indx}`}
                                                        autoComplete='off'
                                                        name={field}
                                                        required
                                                        value={datasforapprove[field]}
                                                        onChange={(e) => setdatasforapprove(prevState => ({
                                                            ...prevState,
                                                            [field]: e.target.value
                                                        }))}
                                                    />
                                                    : field === 'RelativeName' ?
                                                        <input
                                                            id={`${field}_${indx}`}
                                                            autoComplete='off'
                                                            type={'text'}
                                                            name={field}
                                                            value={datasforapprove[field]}
                                                            onChange={(e) => setdatasforapprove(prevState => ({
                                                                ...prevState,
                                                                [field]: e.target.value
                                                            }))}
                                                        />
                                                        :
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '150px' }}>
                                                            <input
                                                                id={`${field}_check_yes`}
                                                                type="checkbox"
                                                                name={field}
                                                                style={{ width: '15px' }}
                                                                checked={datasforapprove[field]}
                                                                onChange={(e) => setdatasforapprove(prevState => ({
                                                                    ...prevState,
                                                                    [field]: !prevState[field]
                                                                }))}
                                                            />
                                                        </div>
                                              
                                            }

                                        </div>
                                    ))
                                }
                                <div className="Main_container_Btn">
                                    <button onClick={handlesubmit}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <ToastAlert Message={toast.message} Type={toast.type} />

        </>
    )
}

export default BedtransferRecieve;