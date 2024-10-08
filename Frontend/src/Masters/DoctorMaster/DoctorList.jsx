import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { useNavigate } from 'react-router-dom';
import LoupeIcon from "@mui/icons-material/Loupe";
import Visibility from '@mui/icons-material/Visibility';

const DoctorList = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    // const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const pagewidth = useSelector(state => state.userRecord?.pagewidth);
    const dispatchvalue = useDispatch();
    const navigate = useNavigate()
    const [UserRegisterData, setUserRegisterData] = useState([])
    const [GetUserRegisterData, setGetUserRegisterData] = useState(false)
    const [UserRegisterFIlteredData, setUserRegisterFIlteredData] = useState([])
    const [SearchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        axios.get(`${UrlLink}Masters/get_Doctor_Detials_link`)
            .then((res) => {
                const ress = res.data
                if (Array.isArray(ress)) {
                    setUserRegisterData(ress)
                } else {
                    setUserRegisterData([])
                }

            })
            .catch((err) => {
                console.log(err);
            })
        dispatchvalue({ type: 'DoctorListId', value: {} })
    }, [UrlLink, GetUserRegisterData, dispatchvalue])

    console.log("UserRegisterData", UserRegisterData);

    useEffect(() => {

        const lowercasesearch = SearchQuery.toLowerCase()
        const filteralldata = UserRegisterData.filter((row) => {
            const LowerName = row.Name.toLowerCase()
            const Mobile = row.ContactNumber.toString()
            const Docdtype = row.DoctorType.toLowerCase()

            return (
                LowerName.includes(lowercasesearch) ||
                Mobile.includes(lowercasesearch) ||
                Docdtype.includes(lowercasesearch)

            )

        })

        setUserRegisterFIlteredData(filteralldata)

    }, [SearchQuery, UserRegisterData])


    const UserRegisterColumns = [
        {
            key: "id",
            name: "Doctor Id",
            filter: true,
            type: 'input-text',
            frozen:  true,
            width:300
        },
        {
            key: "ShortName",
            name: "Doctor Name",
            filter: true,
            frozen: true
        },
        {
            key: "ContactNumber",
            name: "Contact Number",
            frozen:true
        },
        {
            key: "DoctorType",
            name: "Doctor Type",
            frozen: true
        },
        {
            key: "Status",
            name: "Status",
            frozen: true,
            renderCell: (params) => (

                <Button
                    className="cell_btn"
                    onClick={() => handleeditDoctorstatus(params.row)}
                >
                    {params.row.Status}
                </Button>
            )

        },
        {
            key: "Email",
            name: "Email",

        },


        {
            key: "Qualification",
            name: "Qualification",
        },
        {
            key: "Department",
            name: "Department",
        },
        {
            key: "Designation",
            name: "Designation",
        },
        {
            key: "Specialization",
            name: "Specialization",
        },
        {
            key: "Category",
            name: "Category",
        },
        {
            key: "createdBy",
            name: "created By",
        },


        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditDocRegister(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        },
        {
            key: "DoctorCalenderView",
            name: "Doctor Calender View",
            width : 150,
            renderCell: (params) => (
                <>{
                    params.row.DoctorType === 'Referral' ?
                        (
                            <>
                                No Calender View
                            </>
                        )
                        :
                        (
                            <Button
                                className="cell_btn"
                                onClick={() => HandleCalenderView(params.row)}
                            >
                                <Visibility className="check_box_clrr_cancell" />
                            </Button>
                        )

                }

                </>
            ),
        },
        {
            key: "RatecardAction",
            name: "Rate Card View",
            renderCell: (params) => (
                <>{
                    params.row.DoctorType === 'Referral' ?
                        (
                            <>
                                No Ratecard
                            </>
                        )
                        :
                        (
                            <Button
                                className="cell_btn"
                                onClick={() => HandleRateCardView(params.row)}
                            >
                                <Visibility className="check_box_clrr_cancell" />
                            </Button>
                        )

                }

                </>
            ),
        },
        {
            key: "UserAction",
            name: "User Action",
            renderCell: (params) => (
                <>{
                    params.row.DoctorType === 'Referral' ?
                        (
                            <>
                                No Access
                            </>
                        )
                        :
                        params.row.usercreated ? (
                            <>user created</>
                        )
                            :
                            (
                                <Button
                                    className="cell_btn"
                                    onClick={() => handleDocUserRegister(params.row)}
                                >
                                    <ArrowForwardIcon className="check_box_clrr_cancell" />
                                </Button>
                            )

                }

                </>
            ),
        }

    ]


    const handleeditDoctorstatus = (params) => {
        const data = { DoctorId: params.id }
        axios.post(`${UrlLink}Masters/update_status_Doctor_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setGetUserRegisterData(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })

    }
    const handleeditDocRegister = (params) => {
        const { id } = params
        dispatchvalue({ type: 'DoctorListId', value: { DoctorId: id } })
        navigate('/Home/Doctor_Master')
    }
    const handlenewDocRegister = () => {

        dispatchvalue({ type: 'DoctorListId', value: {} })
        navigate('/Home/Doctor_Master')
    }
    const HandleRateCardView = (params) => {

        const { id } = params
        dispatchvalue({ type: 'DoctorListId', value: { DoctorId: id } })
        navigate('/Home/DoctorRatecardList')
    }

    const HandleCalenderView = (params) => {

        const { id } = params

        console.log('Calenderrrrrr', params)
        dispatchvalue({ type: 'DoctorListId', value: { DoctorId: id } })
        navigate('/Home/Doctor_Calender')
    }




    const handleDocUserRegister = (params) => {

        dispatchvalue({ type: 'Usercreatedocdata', value: { DoctorId: params.id, Type: 'DOCTOR' } })
        dispatchvalue({ type: 'UserListId', value: {} })
        navigate('/Home/UserRegisterMaster')
    }





    return (
        <>
            <div className="Main_container_app">
                <h3>Doctor List</h3>
                <div className="search_div_bar">
                    <div className=" search_div_bar_inp_1">
                        <label htmlFor="">Search Here
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            value={SearchQuery}
                            placeholder='By DoctorName or Number or DoctorType'
                            onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <button
                        className="search_div_bar_btn_1"
                        onClick={handlenewDocRegister}
                        title="New Doctor Register"
                    >
                        <LoupeIcon />
                    </button>

                </div>
                <ReactGrid columns={UserRegisterColumns} RowData={UserRegisterFIlteredData} />

            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    )
}

export default DoctorList;