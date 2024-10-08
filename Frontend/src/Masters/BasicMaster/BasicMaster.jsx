import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';

const BasicMaster = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);

    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const dispatchvalue = useDispatch();


    const [FlaggName, setFlaggName] = useState({
        FlaggId: '',
        FlaggName: '',
        FlaggColor: '#000000',


    });
    const handleFlaggInputChange = (e) => {
        const { name, value } = e.target;
        setFlaggName((prevState) => ({
            ...prevState,
            [name]: value?.toUpperCase()?.trim(),
        }));
    }
    const [FlaggData, setFlaggData] = useState([])
    const [IsFlaggData, setIsFlaggData] = useState(false)
    const FlaggColumns = [
        {
            key: "id",
            name: "Flagg Id",
            frozen: true
        },

        {
            key: "FlaggName",
            name: "Flagg Name",
        },
        {
            key: "FlaggColor",
            name: "Flagg Color",
            renderCell: (params) => (
                <span style={{ height: '20px', width: '20px', backgroundColor: params.row.FlaggColor }}></span>
            ),
        },
        {
            key: "Status",
            name: "Status",
            frozen: true,
            renderCell: (params) => (
                
                
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditFlaggstatus(params.row)}
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
                        onClick={() => handleeditFlagg(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }


    ]

    const handleeditFlaggstatus = (params) => {
        const data = {
            FlaggId: params.id,
            Statusedit: true
        }
        axios.post(`${UrlLink}Masters/Flagg_color_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsFlaggData(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const handleeditFlagg = (params) => {
        const { id, ...rest } = params
        setFlaggName((prev) => ({
            ...prev,
            FlaggId: id,
            FlaggName: rest.FlaggName,
            FlaggColor: rest.FlaggColor,
        }))
    }


    const handleFlaggsubmit = () => {
        if (FlaggName.FlaggName && FlaggName.FlaggColor) {
            const data = {
                ...FlaggName,
                created_by: userRecord?.username || ''

                // created_by: LocationName.locationId ? LocationName.created_by : userRecord?.username || '',
            }
            axios.post(`${UrlLink}Masters/Flagg_color_Detials_link`, data)
                .then((res) => {
                    const resData = res.data;
                    const mess = Object.values(resData)[0];
                    const typp = Object.keys(resData)[0];
                    const tdata = {
                        message: mess,
                        type: typp,
                    }



                    dispatchvalue({ type: 'toast', value: tdata })
                    setIsFlaggData(prev => !prev)
                    setFlaggName({
                        FlaggId: '',
                        FlaggName: '',
                        FlaggColor: '#000000',
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const tdata = {
                message: `Please provide both Flagg Name and Flagg Color.`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }



    };


    useEffect(() => {
        axios.get(`${UrlLink}Masters/Flagg_color_Detials_link`)
            .then((res) => {
                const ress = res.data
                setFlaggData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsFlaggData, UrlLink])



    // ---------------location master

    const [LocationName, setLocationName] = useState({
        locationId: '',
        locationName: '',
        bedCount: '',


    });


    const [Locations, setLocations] = useState([])
    const [IsLocationget, setIsLocationget] = useState(false)

    const LocationsColumns = [
        {
            key: "id",
            name: "Location Id",
            frozen: true
        },
        {
            key: "created_by",
            name: "Created By ",
            frozen: true
        },
        {
            key: "locationName",
            name: "Location Name",
        },
        {
            key: "bedCount",
            name: "Bed Count",
        },
        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditLocationstatus(params.row)}
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
                        onClick={() => handleeditLocation(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }


    ]

    const handleeditLocationstatus = (params) => {
        const data = {
            locationId: params.id,
            Statusedit: true
        }
        axios.post(`${UrlLink}Masters/Location_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsLocationget(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const handleeditLocation = (params) => {
        const { id, ...rest } = params
        setLocationName((prev) => ({
            ...prev,
            locationId: id,
            ...rest
        }))
    }

    const handleLocationsubmit = () => {
        if (LocationName.locationName && LocationName.bedCount) {
            const data = {
                ...LocationName,
                created_by: userRecord?.username || ''

                // created_by: LocationName.locationId ? LocationName.created_by : userRecord?.username || '',
            }
            axios.post(`${UrlLink}Masters/Location_Detials_link`, data)
                .then((res) => {
                    const resData = res.data;
                    const mess = Object.values(resData)[0];
                    const typp = Object.keys(resData)[0];
                    const tdata = {
                        message: mess,
                        type: typp,
                    }



                    dispatchvalue({ type: 'toast', value: tdata })
                    setIsLocationget(prev => !prev)
                    setLocationName({
                        locationId: '',
                        locationName: '',
                        bedCount: '',


                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const tdata = {
                message: `Please provide both Location Name and Bed Count.`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }



    };


    useEffect(() => {
        axios.get(`${UrlLink}Masters/Location_Detials_link`)
            .then((res) => {
                const ress = res.data
                setLocations(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsLocationget, UrlLink])



    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setLocationName((prev) => ({
    //         ...prev,
    //         [name]: name === 'locationName' ? value.toUpperCase() : value
    //     }));
    // };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocationName((prevState) => ({
            ...prevState,
            [name]: value?.toUpperCase()?.trim(),
        }));
    };

    // -------------- Department Name ---------------


    const [DepartmentName, setDepartmentName] = useState({
        DepartmentId: '',
        DepartmentName: '',

    });

    const [Departments, setDepartments] = useState([])
    const [IsDepartmentGet, setIsDepartmentGet] = useState(false)


    const DepartmentColumns = [
        {
            key: "id",
            name: "Department Id",
            frozen: true
        },
        {
            key: "created_by",
            name: "Created By ",
            frozen: true
        },
        {
            key: "DepartmentName",
            name: "Department Name",
        },

        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditDepartmentstatus(params.row)}
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
                        onClick={() => handleeditDepartment(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ]



    const handleeditDepartmentstatus = (params) => {
        const data = {
            DepartmentId: params.id,
            Statusedit: true
        }
        axios.post(`${UrlLink}Masters/Department_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsDepartmentGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
    }



    const handleeditDepartment = (params) => {
        const { id, ...rest } = params
        setDepartmentName((prev) => ({
            ...prev,
            DepartmentId: id,
            ...rest
        }))
    }



    const handleDepartmentSubmit = () => {

        if (DepartmentName.DepartmentName) {
            const data = {
                ...DepartmentName,
                created_by: userRecord?.username || ''
            }
            axios.post(`${UrlLink}Masters/Department_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsDepartmentGet(prev => !prev)
                    setDepartmentName({
                        DepartmentId: '',
                        DepartmentName: '',

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
        axios.get(`${UrlLink}Masters/Department_Detials_link`)
            .then((res) => {
                const ress = res.data
                setDepartments(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsDepartmentGet, UrlLink])




    const handleDepartmentChange = (e) => {
        const { name, value } = e.target;
        setDepartmentName((prev) => ({
            ...prev,
            [name]: value?.toUpperCase()?.trim()
        }));
    };




    //------------------------------Designation-----------------------------------------


    const [Designation, setDesignation] = useState({
        DesignationId: '',
        // Department: '',
        Designation: '',


    });

    const [Designations, setDesignations] = useState([])
    const [IsDesignationGet, setIsDesignationGet] = useState(false)


    const DesignationColumns = [
        {
            key: "id",
            name: "Designation Id",
            frozen: true
        },
        {
            key: "created_by",
            name: "Created By ",
            frozen: true
        },
        // {
        //     key: "Department",
        //     name: "Department Name",
        // },
        {
            key: "Designation",
            name: "Designation Name",
        },

        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditDesignationstatus(params.row)}
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
                        onClick={() => handleeditDesignation(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ]




    const handleeditDesignationstatus = (params) => {
        const data = { DesignationId: params.id, Statusedit: true }
        axios.post(`${UrlLink}Masters/Designation_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                console.log(resres);
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsDesignationGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
    }



    const handleeditDesignation = (params) => {
        const { id, ...rest } = params
        console.log(rest);
        setDesignation((prev) => ({
            ...prev,
            DesignationId: id,
            // Department: rest?.DepartmentId,
            Designation: rest?.Designation

        }))
    }



    const handleDesignationSubmit = () => {

        if (Designation.Designation) {

            const data = {
                ...Designation,
                created_by: userRecord?.username || ''
            }
            axios.post(`${UrlLink}Masters/Designation_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    console.log(resres);
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsDesignationGet(prev => !prev)
                    setDesignation({
                        DesignationId: '',
                        // Department: '',
                        Designation: '',

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
        axios.get(`${UrlLink}Masters/Designation_Detials_link`)
            .then((res) => {
                const ress = res.data
                setDesignations(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsDesignationGet, UrlLink])


    const handleDesignationChange = (e) => {
        const { name, value } = e.target;
        setDesignation((prevState) => ({
            ...prevState,
            [name]: value?.toUpperCase()?.trim(),
        }));
    };


    //------------------------- Category insert get update ----------------------------------------------------



    const [Category, setCategory] = useState({
        CategoryId: '',
        Designation: '',
        CategoryName: '',

    })

    const [Categories, setCategories] = useState([])
    const [IsCategoryGet, setIsCategoryGet] = useState(false)


    const CategoriesColumns = [
        {
            key: "id",
            name: "Category Id",
            frozen: true
        },
        {
            key: "created_by",
            name: "Created By ",
            frozen: true
        },
        {
            key: "DesignationName",
            name: "Designation Name",
        },
        {
            key: "CategoryName",
            name: "Category Name",
        },

        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditCategorystatus(params.row)}
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
                        onClick={() => handleeditCategory(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ]



    const handleeditCategorystatus = (params) => {
        const data = {
            CategoryId: params.id,
            Statusedit: true
        }
        axios.post(`${UrlLink}Masters/Category_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsCategoryGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
    }



    const handleeditCategory = (params) => {
        const { id, ...rest } = params
        setCategory((prev) => ({
            ...prev,
            CategoryId: id,
            Designation: rest.DesignationId,
            CategoryName: rest.CategoryName
        }))
    }


    const handleCategorySubmit = () => {

        if (Category.CategoryName && Category.Designation) {

            const data = {
                ...Category,
                created_by: userRecord?.username || ''
            }
            axios.post(`${UrlLink}Masters/Category_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsCategoryGet(prev => !prev)
                    setCategory({
                        CategoryId: '',
                        Designation: '',
                        CategoryName: '',

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
        axios.get(`${UrlLink}Masters/Category_Detials_link`)
            .then((res) => {
                const ress = res.data
                setCategories(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsCategoryGet, UrlLink])



    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevState) => ({
            ...prevState,
            [name]: value?.toUpperCase()?.trim(),
        }));
    };




    //------------------------------ Speciality insert get update---------------------------------------------

    const [Speciality, setSpeciality] = useState({
        SpecialityId: '',
        Designation: '',
        SpecialityName: '',


    })

    const [SpecialityData, setSpecialityData] = useState([])
    const [IsSpecialityGet, setIsSpecialityGet] = useState(false)


    const SpecialityColumns = [
        {
            key: "id",
            name: "Speciality Id",
            frozen: true
        },
        {
            key: "created_by",
            name: "Created By ",
            frozen: true
        },
        {
            key: "DesignationName",
            name: "Designation",
        },
        {
            key: "SpecialityName",
            name: "Speciality",
        },

        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditSpecialitystatus(params.row)}
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
                        onClick={() => handleeditSpeciality(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ]





    const handleeditSpecialitystatus = (params) => {
        const data = { SpecialityId: params.id, Statusedit: true }
        axios.post(`${UrlLink}Masters/Speciality_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsSpecialityGet(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
    }



    const handleeditSpeciality = (params) => {
        const { id, ...rest } = params
        setSpeciality((prev) => ({
            ...prev,
            SpecialityId: id,
            Designation: rest.DesignationId,
            SpecialityName: rest.SpecialityName
        }))
    }



    const handleSpecialitySubmit = () => {

        if (Speciality.SpecialityName && Speciality.Designation) {

            const data = {
                ...Speciality,
                created_by: userRecord?.username || ''
            }
            axios.post(`${UrlLink}Masters/Speciality_Detials_link`, data)
                .then((res) => {
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsSpecialityGet(prev => !prev)
                    setSpeciality({
                        SpecialityId: '',
                        Designation: '',
                        SpecialityName: '',

                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const tdata = {
                message: `Please provide both Designation and Speciality.`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }
    }

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Speciality_Detials_link`)
            .then((res) => {
                const ress = res.data
                setSpecialityData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsSpecialityGet, UrlLink])



    const handleSpecialityChange = (e) => {
        const { name, value } = e.target;
        setSpeciality((prevState) => ({
            ...prevState,
            [name]: value?.toUpperCase()?.trim(),
        }));
    };

    //------------------------ RoleName ---------------------------------------------------

    const [RoleName, setRoleName] = useState({
        RoleId: '',
        Role: '',


    })


    const [RoleNameData, setRoleNameData] = useState([])
    const [IsRoleNameget, setIsRoleNameget] = useState(false)

    const RoleColumns = [
        {
            key: "id",
            name: "Role Id",
            frozen: true
        },
        {
            key: "created_by",
            name: "Created By ",
            frozen: true
        },
        {
            key: "Role",
            name: "Role",
        },

        {
            key: "Status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditRolestatus(params.row)}
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
                        onClick={() => handleeditRole(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }


    ]

    const handleeditRolestatus = (params) => {
        const data = {
            RoleId: params.id,
            Statusedit: true
        }
        axios.post(`${UrlLink}Masters/UserControl_Role_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setIsRoleNameget(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const handleeditRole = (params) => {
        const { id, ...rest } = params
        setRoleName((prev) => ({
            ...prev,
            RoleId: id,
            ...rest
        }))
    }


    const handleRolesubmit = () => {
        if (RoleName.Role) {
            const data = {
                ...RoleName,
                created_by: userRecord?.username || ''

                // created_by: LocationName.locationId ? LocationName.created_by : userRecord?.username || '',
            }
            axios.post(`${UrlLink}Masters/UserControl_Role_link`, data)
                .then((res) => {
                    const resData = res.data;
                    const mess = Object.values(resData)[0];
                    const typp = Object.keys(resData)[0];
                    const tdata = {
                        message: mess,
                        type: typp,
                    }



                    dispatchvalue({ type: 'toast', value: tdata })
                    setIsRoleNameget(prev => !prev)
                    setRoleName({
                        RoleId: '',
                        Role: '',


                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const tdata = {
                message: `Please provide both Role Name.`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
        }



    };


    useEffect(() => {
        axios.get(`${UrlLink}Masters/UserControl_Role_link`)
            .then((res) => {
                const ress = res.data
                setRoleNameData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [IsRoleNameget, UrlLink])


    const handleRoleChange = (e) => {
        const { name, value } = e.target;
        setRoleName((prevState) => ({
            ...prevState,
            [name]: value?.toUpperCase()?.trim(),
        }));
    };


    // ---------------------Relegion---------------------

    const [religionName, setReligionName] = useState({
        religionId: '',
        religion: '',
    });

    const [religionNameData, setReligionNameData] = useState([]);
    const [isReligionNameGet, setIsReligionNameGet] = useState(false);

    const religionColumns = [
        {
            key: "id",
            name: "Religion Id",
            frozen: true
        },
        {
            key: "created_by",
            name: "Created By",
            frozen: true
        },
        {
            key: "religion",
            name: "Religion",
        },
        {
            key: "status",
            name: "Status",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleEditReligionStatus(params.row)}
                    >
                        {params.row.status}
                    </Button>
                </>
            ),
        },
        {
            key: "action",
            name: "Action",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleEditReligion(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ];

    const handleEditReligionStatus = (params) => {
        const data = {
            religionId: params.id,
            statusEdit: true
        };
        axios.post(`${UrlLink}Masters/Relegion_Master_link`, data)
            .then((res) => {
                const resData = res.data;
                const type = Object.keys(resData)[0];
                const message = Object.values(resData)[0];
                const tdata = {
                    message: message,
                    type: type,
                };
                dispatchvalue({ type: 'toast', value: tdata });
                setIsReligionNameGet(prev => !prev);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEditReligion = (params) => {
        const { id, ...rest } = params;
        setReligionName((prev) => ({
            ...prev,
            religionId: id,
            ...rest
        }));
    };

    const handleReligionSubmit = () => {
        if (religionName.religion) {
            const data = {
                ...religionName,
                created_by: userRecord?.username || ''
            };
            axios.post(`${UrlLink}Masters/Relegion_Master_link`, data)
                .then((res) => {
                    const resData = res.data;
                    const message = Object.values(resData)[0];
                    const type = Object.keys(resData)[0];
                    const tdata = {
                        message: message,
                        type: type,
                    };
                    dispatchvalue({ type: 'toast', value: tdata });
                    setIsReligionNameGet(prev => !prev);
                    setReligionName({
                        religionId: '',
                        religion: '',
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            const tdata = {
                message: 'Please provide Religion Name.',
                type: 'warn'
            };
            dispatchvalue({ type: 'toast', value: tdata });
        }
    };

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Relegion_Master_link`)
            .then((res) => {
                const resData = res.data;
                setReligionNameData(resData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isReligionNameGet, UrlLink]);

    const handleReligionChange = (e) => {
        const { name, value } = e.target;
        setReligionName((prevState) => ({
            ...prevState,
            [name]: value?.toUpperCase()?.trim(),
        }));
    };

    //---------------------------------------------------------------------------

    //---------------------------------------------------------------------------



    return (
        <>
            <div className="Main_container_app">
                <h3>Basic Masters</h3>

                {/*---------------Flagging-----------------------------*/}
                <div className="common_center_tag">
                    <span> Color Flagging</span>
                </div>
                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label> Flagg Name <span>:</span> </label>
                        <input
                            type="text"
                            placeholder='Enter Flagg Name'
                            name='FlaggName'
                            required
                            value={FlaggName.FlaggName}
                            onChange={handleFlaggInputChange}
                        />
                    </div>
                    <div className="RegisForm_1">
                        <label> Flagg Color <span>:</span> </label>
                        <input
                            style={{ border: '0px' }}
                            type="color"
                            name='FlaggColor'
                            required
                            value={FlaggName.FlaggColor}
                            onChange={handleFlaggInputChange}
                        />
                    </div>
                </div>

                <div className="Main_container_Btn">
                    <button onClick={handleFlaggsubmit}>
                        {FlaggName.FlaggId ? 'Update' : 'Save'}
                    </button>
                </div>

                {FlaggData.length > 0 &&
                    <ReactGrid columns={FlaggColumns} RowData={FlaggData} />
                }


                {/*---------------Location-----------------------------*/}
                <div className="common_center_tag">
                    <span>Locations</span>
                </div>
                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label> Location Name <span>:</span> </label>
                        <input
                            type="text"
                            placeholder='Enter Location Name'
                            name='locationName'
                            required
                            value={LocationName.locationName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="RegisForm_1">
                        <label> Bed Count <span>:</span> </label>
                        <input
                            type="number"
                            placeholder='Enter Bed Count'
                            name='bedCount'
                            required
                            value={LocationName.bedCount}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="Main_container_Btn">
                    <button onClick={handleLocationsubmit}>
                        {LocationName.locationId ? 'Update' : 'Save'}
                    </button>
                </div>

                {Locations.length > 0 &&
                    <ReactGrid columns={LocationsColumns} RowData={Locations} />
                }
                {/*------------------Departments--------------------- */}
                <div className="common_center_tag">
                    <span>Departments</span>
                </div>

                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label> Department Name <span>:</span> </label>
                        <input
                            type="text"
                            name='DepartmentName'
                            required
                            value={DepartmentName.DepartmentName}
                            onChange={handleDepartmentChange}
                        />
                    </div>

                </div>

                <div className="Main_container_Btn">
                    <button onClick={handleDepartmentSubmit}>
                        {DepartmentName.DepartmentId ? "Update" : "Add"}
                    </button>
                </div>
                {Departments.length > 0 &&
                    <ReactGrid columns={DepartmentColumns} RowData={Departments} />
                }

                {/*------------------Designations--------------------- */}

                <div className="common_center_tag">
                    <span>Designations</span>
                </div>
                <div className="RegisFormcon_1">
                    {/* <div className="RegisForm_1">
                        <label> Department <span>:</span> </label>

                        <select
                            name='Department'
                            required
                            value={Designation.Department}
                            onChange={handleDesignationChange}
                        >
                            <option value=''>Select Department</option>
                            {Departments.filter(p => p.Status === 'Active').map((dept, indx) => (
                                <option key={indx} value={dept.id}>
                                    {dept.DepartmentName}
                                </option>
                            ))}
                        </select>
                    </div> */}
                    <div className="RegisFormcon_1">
                        <div className="RegisForm_1">
                            <label> Designation <span>:</span> </label>
                            <input
                                type="text"
                                name='Designation'
                                required
                                value={Designation.Designation}
                                onChange={handleDesignationChange}
                            />
                        </div>

                    </div>
                </div>



                <div className="Main_container_Btn">
                    <button onClick={handleDesignationSubmit}>
                        {Designation.DesignationId ? "Update" : "Add"}
                    </button>
                </div>
                {Designations.length > 0 &&
                    <ReactGrid columns={DesignationColumns} RowData={Designations} />
                }

                {/*------------------Category--------------------- */}
                <div className="common_center_tag">
                    <span>Category</span>
                </div>
                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label> Designation <span>:</span> </label>

                        <select
                            name='Designation'
                            required
                            value={Category.Designation}
                            onChange={handleCategoryChange}
                        >
                            <option value=''>Select Designation</option>
                            {Designations.filter(p => p.Status === 'Active')?.map((Catg, indx) => (
                                <option key={indx} value={Catg.id}>
                                    {Catg.Designation}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="RegisForm_1">
                        <label> Category <span>:</span> </label>
                        <input
                            type="text"
                            name='CategoryName'
                            required
                            value={Category.CategoryName}
                            onChange={handleCategoryChange}
                        />
                    </div>


                </div>
                <div className="Main_container_Btn">
                    <button onClick={handleCategorySubmit}>
                        {Category.CategoryId ? 'Update' : 'Save'}
                    </button>
                </div>

                {Categories.length > 0 &&
                    <ReactGrid columns={CategoriesColumns} RowData={Categories} />
                }
                {/*------------------Speciality--------------------- */}
                <div className="common_center_tag">
                    <span>Speciality</span>
                </div>

                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label> Designation <span>:</span> </label>

                        <select
                            name='Designation'
                            required
                            value={Speciality.Designation}
                            onChange={handleSpecialityChange}
                        >
                            <option value=''>Select Designation</option>
                            {Designations.filter(p => p.Status === 'Active')?.map((Catg, indx) => (
                                <option key={indx} value={Catg.id}>
                                    {Catg.Designation}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="RegisForm_1">
                        <label> Speciality <span>:</span> </label>
                        <input
                            type="text"
                            name='SpecialityName'
                            required
                            value={Speciality.SpecialityName}
                            onChange={handleSpecialityChange}
                        />
                    </div>


                </div>
                <div className="Main_container_Btn">
                    <button onClick={handleSpecialitySubmit}>
                        {Speciality.SpecialityId ? 'Update' : 'Save'}
                    </button>
                </div>

                {SpecialityData.length > 0 &&
                    <ReactGrid columns={SpecialityColumns} RowData={SpecialityData} />
                }
                {/*------------------Role--------------------- */}


                <div className="common_center_tag">
                    <span>Role</span>
                </div>

                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label>Role Name <span>:</span> </label>
                        <input
                            type="text"
                            name='Role'
                            required
                            value={RoleName.Role}
                            onChange={handleRoleChange}
                        />
                    </div>

                </div>

                <div className="Main_container_Btn">
                    <button onClick={handleRolesubmit}>
                        {RoleName.RoleId ? "Update" : "Add"}
                    </button>
                </div>
                {RoleNameData.length > 0 &&
                    <ReactGrid columns={RoleColumns} RowData={RoleNameData} />
                }

                {/*------------------Religion --------------------- */}


                <div className="common_center_tag">
                    <span>Religion</span>
                </div>

                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label>Relegion Name <span>:</span> </label>
                        <input
                            type="text"
                            name='religion'
                            required
                            value={religionName.religion}
                            onChange={handleReligionChange}
                        />
                    </div>

                </div>

                <div className="Main_container_Btn">
                    <button onClick={handleReligionSubmit}>
                        {religionName.religionId ? "Update" : "Add"}
                    </button>
                </div>
                {religionNameData.length > 0 &&
                    <ReactGrid columns={religionColumns} RowData={religionNameData} />
                }



            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />

        </>
    )
}

export default BasicMaster;