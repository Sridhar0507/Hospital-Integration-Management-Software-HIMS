import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoupeIcon from "@mui/icons-material/Loupe";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import ModelContainer from '../../OtherComponent/ModelContainer/ModelContainer';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';

const InsClientDonationList = () => {
    const dispatchvalue = useDispatch();
    const navigate = useNavigate()
    const [InsuranceClientForm, setInsuranceClientForm] = useState('Insurance');
    const [InsuranceClientDonationColumn, setInsuranceClientDonationColumn] = useState([]);
    const [InsuranceClientDonationData, setInsuranceClientDonationData] = useState([]);
    const [getChanges, setgetChanges] = useState(false);
    const [loading, setLoading] = useState(false);
    const pagewidth = useSelector(state => state.userRecord?.pagewidth);
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const [SearchQuery, setSearchQuery] = useState({
        Type: '',
        SearchBy: ''
    })

    const handlesearch = (e) => {
        const { name, value } = e.target
        setSearchQuery((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleselectChange = (e) => {
        const { value } = e.target
        setLoading(true)
        setTimeout(() => {
            setInsuranceClientForm(value)
            setSearchQuery({
                Type: '',
                SearchBy: ''
            })
            setLoading(false)
        }, 200);


    }

    const handlenewmaster = () => {

        dispatchvalue({ type: 'InsClientDonationMaster', value: {} })
        navigate('/Home/InsClientDonationMaster')
    }



    const handleVisibilityClick = useCallback((fileval) => {
        if (fileval) {
            let tdata = {
                Isopen: false,
                content: null,
                type: 'image/jpg'
            };
            if (['data:image/jpeg;base64', 'data:image/jpg;base64'].includes(fileval?.split(',')[0])) {
                tdata = {
                    Isopen: true,
                    content: fileval,
                    type: 'image/jpeg'
                };
            } else if (fileval?.split(',')[0] === 'data:image/png;base64') {
                tdata = {
                    Isopen: true,
                    content: fileval,
                    type: 'image/png'
                };
            } else if (fileval?.split(',')[0] === 'data:application/pdf;base64') {
                tdata = {
                    Isopen: true,
                    content: fileval,
                    type: 'application/pdf'
                };
            }

            dispatchvalue({ type: 'modelcon', value: tdata });
        } else {
            const tdata = {
                message: 'There is no file to view.',
                type: 'warn'
            };
            dispatchvalue({ type: 'toast', value: tdata });
        }

    }, [dispatchvalue]);

    const handleeditstatus = useCallback((params) => {
        const data = {
            MasterType: InsuranceClientForm,
            id: params.id,
        }
        axios.post(`${UrlLink}Masters/update_status_Insurance_Client_Detials_link`, data)
            .then((res) => {
                const resres = res.data
                let typp = Object.keys(resres)[0]
                let mess = Object.values(resres)[0]
                const tdata = {
                    message: mess,
                    type: typp,
                }

                dispatchvalue({ type: 'toast', value: tdata });
                setgetChanges(prev => !prev)
            })
            .catch((err) => {
                console.log(err);
            })

    }, [InsuranceClientForm, UrlLink, dispatchvalue])

    const handleRequestEdit = useCallback((data) => {
        dispatchvalue({ type: 'InsClientDonationMaster', value: { MasterType: InsuranceClientForm, ...data } })
        navigate('/Home/InsClientDonationMaster')
    }, [InsuranceClientForm, dispatchvalue])

    useEffect(() => {


        const insuranceColumns = [
            {
                key: 'id',
                name: 'Insurance Id',
                frozen: pagewidth > 500 ? true : false
            },
            {
                key: 'Name',
                name: 'Insurance Name',
                frozen: pagewidth > 700 ? true : false
            },
            { key: 'Type', name: 'Type' },
            { key: 'TPAName', name: 'TPA Name' },
            { key: 'PolicyType', name: 'PolicyType' },
            { key: 'PayerZone', name: 'PayerZone', },
            { key: 'PayerMemberId', name: 'Payer Member Id', },
            { key: 'ContactPerson', name: 'Contact Person', },
            { key: 'PhoneNumber', name: 'Phone Number', },
            { key: 'MailId', name: 'Mail Id', },


            {
                key: "TreatmentList",
                name: "Treatment List",
                renderCell: (params) => (
                    <Button className="cell_btn" onClick={() => handleVisibilityClick(params.row.TreatmentList)}>
                        <VisibilityIcon />
                    </Button>
                ),
            },
            {
                key: "OtherDocuments",
                name: "Other Documents",
                renderCell: (params) => (
                    <Button className="cell_btn" onClick={() => handleVisibilityClick(params.row.OtherDocuments)}>
                        <VisibilityIcon />
                    </Button>
                ),
            },
            {
                key: "Status",
                name: "Status",
                frozen: pagewidth > 1000 ? true : false,
                renderCell: (params) => (

                    <Button
                        className="cell_btn"
                        onClick={() => handleeditstatus(params.row)}
                    >
                        {params.row.Status}
                    </Button>
                )

            },
            {
                key: 'Action',
                name: 'Action',
                renderCell: (params) => (
                    <Button className='cell_btn' onClick={() => handleRequestEdit(params.row)}>
                        <EditIcon />
                    </Button>
                ),
            },
        ];

        const clientColumns = [
            {
                key: 'id',
                name: 'Client Id',
                frozen: pagewidth > 500 ? true : false
            },
            {
                key: 'Name',
                name: 'Client Name',
                frozen: pagewidth > 700 ? true : false
            },
            { key: 'ContactPerson', name: 'Contact Person', },
            { key: 'PhoneNumber', name: 'Phone Number', },
            { key: 'MailId', name: 'Mail Id', },

            {
                key: "TreatmentList",
                name: "Treatment List",
                renderCell: (params) => (
                    <Button className="cell_btn" onClick={() => handleVisibilityClick(params.row.TreatmentList)}>
                        <VisibilityIcon />
                    </Button>
                ),
            },
            {
                key: "OtherDocuments",
                name: "Other Documents",
                renderCell: (params) => (
                    <Button className="cell_btn" onClick={() => handleVisibilityClick(params.row.OtherDocuments)}>
                        <VisibilityIcon />
                    </Button>
                ),
            },
            {
                key: "Status",
                name: "Status",
                frozen: pagewidth > 1000 ? true : false,
                renderCell: (params) => (

                    <Button
                        className="cell_btn"
                        onClick={() => handleeditstatus(params.row)}
                    >
                        {params.row.Status}
                    </Button>
                )

            },
            {
                key: 'Action',
                name: 'Action',
                renderCell: (params) => (
                    <Button className='cell_btn' onClick={() => handleRequestEdit(params.row)}>
                        <EditIcon />
                    </Button>
                ),
            },
        ];
        const donationColumns = [
            {
                key: 'id',
                name: 'Donation Id',
                frozen: pagewidth > 500 ? true : false
            },
            {
                key: 'Name',
                name: 'Donation Name',
                frozen: pagewidth > 700 ? true : false
            },
            { key: 'Type', name: 'Type', },
            { key: 'ContactPerson', name: 'Contact Person', },
            { key: 'PhoneNumber', name: 'Phone Number', },
            { key: 'MailId', name: 'Mail Id', },
            {
                key: 'Designation',
                name: 'Designation',
            },
            {
                key: 'PancardNo',
                name: 'PancardNo',
            },
            {
                key: 'CIN',
                name: 'CIN',
            },
            {
                key: 'TAN',
                name: 'TAN',
            },


            {
                key: "Document1",
                name: "Document One",
                renderCell: (params) => (
                    <Button className="cell_btn" onClick={() => handleVisibilityClick(params.row.Document1)}>
                        <VisibilityIcon />
                    </Button>
                ),
            },
            {
                key: "Document2",
                name: "Document Two",
                renderCell: (params) => (
                    <Button className="cell_btn" onClick={() => handleVisibilityClick(params.row.Document2)}>
                        <VisibilityIcon />
                    </Button>
                ),
            },
            {
                key: "Document3",
                name: "Document Three",
                renderCell: (params) => (
                    <Button className="cell_btn" onClick={() => handleVisibilityClick(params.row.Document3)}>
                        <VisibilityIcon />
                    </Button>
                ),
            },
            {
                key: "Status",
                name: "Status",
                frozen: pagewidth > 1000 ? true : false,
                renderCell: (params) => (

                    <Button
                        className="cell_btn"
                        onClick={() => handleeditstatus(params.row)}
                    >
                        {params.row.Status}
                    </Button>
                )

            },
            {
                key: 'Action',
                name: 'Action',
                renderCell: (params) => (
                    <Button className='cell_btn' onClick={() => handleRequestEdit(params.row)}>
                        <EditIcon />
                    </Button>
                ),
            },
        ];

        setInsuranceClientDonationColumn(InsuranceClientForm === 'Insurance' ? insuranceColumns : InsuranceClientForm === 'Client' ? clientColumns : donationColumns);
    }, [InsuranceClientForm, pagewidth, handleVisibilityClick, handleRequestEdit, handleeditstatus]);


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data ={
                    MasterType:InsuranceClientForm,
                    ...SearchQuery
                }
                const [filteredRows] = await Promise.all([
                    axios.get(`${UrlLink}Masters/Insurance_Client_Master_Detials_link`,{params:data})
                ])
                setInsuranceClientDonationData(filteredRows.data)
                // setMastertypedata(Mastertypedata.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }


        fetchdata()
    }, [UrlLink, getChanges, InsuranceClientForm,SearchQuery]);

    return (
        <>
            <div className="Main_container_app">
                <h3>Insurance / Client / Donation Master</h3>
                <div className="RegisterTypecon">
                    <div className="RegisterType">
                        {["Insurance", "Client", "Donation"].map((p, ind) => (
                            <div className="registertypeval" key={ind + 'key'}>
                                <input
                                    type="radio"
                                    id={p}
                                    name="appointment_type"
                                    checked={InsuranceClientForm === p}
                                    onChange={handleselectChange}
                                    value={p}
                                />
                                <label htmlFor={p}>
                                    {p}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <div className="search_div_bar">
                    {InsuranceClientForm !== 'Client' &&
                        <div className=" search_div_bar_inp_1">
                            <label htmlFor="">{InsuranceClientForm} Type
                                <span>:</span>
                            </label>
                            <select
                                name='Type'
                                value={SearchQuery.Type}
                                onChange={handlesearch}
                            >
                                <option value="">Select</option>
                                {
                                    InsuranceClientForm === 'Insurance' &&
                                    ['TPA', 'MAIN'].map((p, ind) => (
                                        <option value={p} key={ind}>{p}</option>
                                    ))
                                }
                                {
                                    InsuranceClientForm === 'Donation' &&
                                    ['Organization', 'Trust', 'NGO', 'Individual'].map((p, ind) => (
                                        <option value={p} key={ind}>{p}</option>
                                    ))
                                }
                            </select>
                        </div>}
                    <div className=" search_div_bar_inp_1">
                        <label htmlFor="">Search Here
                            <span>:</span>
                        </label>
                        <input
                            type="text"
                            name='SearchBy'
                            value={SearchQuery.SearchBy}
                            placeholder={`By ${InsuranceClientForm} ...`}
                            onChange={handlesearch}
                        />
                    </div>
                    <button
                        className="search_div_bar_btn_1"
                        onClick={handlenewmaster}
                        title="New Master"
                    >
                        <LoupeIcon />
                    </button>

                </div>
                <br />
                <ReactGrid columns={InsuranceClientDonationColumn} RowData={InsuranceClientDonationData} />
            </div>
            {loading &&
                <div className="loader">
                    <div className="Loading">
                        <div className="spinner-border"></div>
                        <div>Loading...</div>
                    </div>
                </div>
            }
            <ToastAlert Message={toast.message} Type={toast.type} />
            <ModelContainer />
        </>
    )
}

export default InsClientDonationList