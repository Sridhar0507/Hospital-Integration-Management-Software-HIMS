import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { useNavigate } from 'react-router-dom';

const UserRegisterList = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    // const UserData = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const dispatchvalue = useDispatch();
    const navigate = useNavigate()
    const [UserRegisterData, setUserRegisterData] = useState([])
    const [GetUserRegisterData, setGetUserRegisterData] = useState(false)

    useEffect(() => {
        axios.get(`${UrlLink}Masters/UserRegister_Detials_link`)
            .then((res) => {
                const ress = res.data
                setUserRegisterData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [UrlLink,GetUserRegisterData])

    const UserRegisterColumns = [
        {
            key: "id",
            name: "User Id",
            frozen: true
        },
        {
            key: "roleName",
            name: "Role Name",
            frozen: true
        },
        {
            key: "EmployeeId",
            name: "Employee/Doctor Id",
            width: 180,
            frozen: true,
            renderCell: (params) => (
                params.row.EmployeeType === 'DOCTOR' ?
                    params.row.DoctorId
                    :
                    params.row.EmployeeId
            )
        },

        {
            key: "UserName",
            name: "User Name",
        },
        {
            key: "Name",
            name: "Name",
        },

        {
            key: "PhoneNo",
            name: "Phone No",
        },
        {
            key: "Email",
            name: "Email",
        },

        {
            key: "Gender",
            name: "Gender",
        },
        {
            key: "Qualification",
            name: "Qualification",
        },
        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (

                <Button
                    className="cell_btn"
                    onClick={() => handleeditUserstatus(params.row)}
                >
                    {params.row.Status}
                </Button>
            )

        },
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditUserRegister(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }

    ]
    const handleeditUserstatus = (params) => {
        const data = {UserId: params.id}
       axios.post(`${UrlLink}Masters/update_status_User_Detials_link`, data)
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

    const handleeditUserRegister = (params) => {
        const { id } = params
        dispatchvalue({ type: 'UserListId', value: { UserId: id } })
        dispatchvalue({ type: 'Usercreatedocdata', value: {} })
        navigate('/Home/UserRegisterMaster')
    }



    return (
        <>
            <div className="Main_container_app">
                <h3>User List</h3>

                <ReactGrid columns={UserRegisterColumns} RowData={UserRegisterData} />

            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    )
}

export default UserRegisterList;