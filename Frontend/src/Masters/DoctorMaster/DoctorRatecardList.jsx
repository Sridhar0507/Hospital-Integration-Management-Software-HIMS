import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import axios from 'axios';

const DoctorRatecardList = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const DoctorListId = useSelector(state => state.userRecord?.DoctorListId);
    const dispatchvalue = useDispatch();
    const navigate = useNavigate();

    const [DoctorRateCardColumns, setDoctorRateCardColumns] = useState([]);
    const [DoctorRateCardData, setDoctorRateCardData] = useState([]);
    const [RoomTypes, setRoomTypes] = useState([]);
    const [DoctorDetials, setDoctorDetials] = useState(null);
    const [editing, setEditing] = useState(null);
    const [getChanges, setGetChanges] = useState(false);

    

    useEffect(() => {
        if (Object.keys(DoctorListId).length > 0 && DoctorListId.DoctorId) {
            axios.get(`${UrlLink}Masters/doctor_Ratecard_details_view_by_doctor_id?DoctorId=${DoctorListId.DoctorId}`)
                .then((res) => {
                    const { Ratecarddetials, Roomtypes, ...rest } = res.data
                    setRoomTypes(Roomtypes);
                    setDoctorDetials(rest)
                    setDoctorRateCardData(Array.isArray(Ratecarddetials) ? Ratecarddetials : []);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setRoomTypes([]);
            setDoctorRateCardData([]);
            navigate('/Home/DoctorList')
        }

    }, [UrlLink, getChanges,DoctorListId,navigate]);

    const handleChange = useCallback((e, rowIdx, column) => {
        const indexx = DoctorRateCardData.findIndex(p => p.id === rowIdx)
        const updatedRow = { ...DoctorRateCardData[indexx], [column]: e.target.value };
        const newRows = DoctorRateCardData.map((row, index) => (index === indexx ? updatedRow : row));
        setDoctorRateCardData(newRows);
    }, [DoctorRateCardData]);

    const handleDoubleClick = useCallback((rowIdx, column, status) => {
        if (DoctorDetials?.Status === 'Active') {
            setEditing({ rowIdx, column });
        } else {
            const tdata = {
                message: `The Selected Doctor are in Inactive ,enable it to edit Rates`,
                type: 'warn',
            }

            dispatchvalue({ type: 'toast', value: tdata });
        }

    }, [dispatchvalue, DoctorDetials]);

    const handleSaveChanges = useCallback((rows, columnchanged) => {
        console.log(rows, columnchanged);
        const splited = columnchanged.split('_')

        const editval = {
            doctor_id: DoctorListId?.DoctorId,
            col: splited[0],
            colId: !['consultation', 'follow', 'emg'].includes(splited[0]) ? parseInt(splited[1]) : null,
            RatecardType: rows?.RatecardType,
            doctor_ratecard_id: rows?.doctor_ratecard_id || null,
            Ratecardid: rows?.Ratecardid || null,
            changedRate: rows[columnchanged]
        }
        const confirmChange = window.confirm("Do you want to save the changes?");
        if (confirmChange) {
            axios.post(`${UrlLink}Masters/doctor_Ratecard_details_update`, editval)
                .then((res) => {
                    console.log(res);
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                })
                .catch((err) => {
                    console.log(err);
                })
            setGetChanges(prev => !prev);
        } else {
            setGetChanges(prev => !prev);
        }
        console.log('editval', editval);

    }, [DoctorListId,UrlLink,dispatchvalue])
    const handleKeyDown = useCallback((e, rowss, changedcolumn) => {

        if (e.key === 'Enter') {
            setEditing(null);
            if (rowss && changedcolumn) {
                handleSaveChanges(rowss, changedcolumn);
            }
        } else if (['e', 'E', '+', '-'].includes(e.key)) {
            e.preventDefault();
        }
    }, [handleSaveChanges])


    useEffect(() => {
        const predefinedColumns = [
            { key: "RatecardShow", name: "RateCard Type", frozen: true },
            { key: "RatecardName", name: "Ratecard Name", frozen: true },
            {
                key: "consultation_fee",
                name: "Consultation Fee",
                children: [
                    { key: 'consultation_Prev_fee', name: 'Prev Fee' },
                    {
                        key: 'consultation_curr_fee',
                        name: 'Current Fee',
                        editable: true,
                        renderCell: (params) => (
                            editing && editing.rowIdx === params.row.id && editing.column === 'consultation_curr_fee' ? (
                                <input
                                    type="number"
                                    autoFocus
                                    className='ratecard_inputs'
                                    onKeyDown={(e) => handleKeyDown(e, params.row, 'consultation_curr_fee')}
                                    value={params.row.consultation_curr_fee}
                                    onChange={(e) => handleChange(e, params.row.id, 'consultation_curr_fee')}
                                />
                            ) : (
                                <div onDoubleClick={() => handleDoubleClick(params.row.id, 'consultation_curr_fee', params.row.Status)}>
                                    {params.row.consultation_curr_fee}
                                </div>
                            )
                        ),
                    }
                ]
            },
            {
                key: "follow_up_fee",
                name: "Followup Fee",
                children: [
                    { key: 'follow_up_Prev_fee', name: 'Prev Fee' },
                    {
                        key: 'follow_up_curr_fee',
                        name: 'Current Fee',
                        editable: true,
                        renderCell: (params) => (
                            editing && editing.rowIdx === params.row.id && editing.column === 'follow_up_curr_fee' ? (
                                <input
                                    type="number"
                                    autoFocus
                                    className='ratecard_inputs'
                                    onKeyDown={(e) => handleKeyDown(e, params.row, 'follow_up_curr_fee')}
                                    value={params.row.follow_up_curr_fee}
                                    onChange={(e) => handleChange(e, params.row.id, 'follow_up_curr_fee')}
                                />
                            ) : (
                                <div onDoubleClick={() => handleDoubleClick(params.row.id, 'follow_up_curr_fee', params.row.Status)}>
                                    {params.row.follow_up_curr_fee}
                                </div>
                            )
                        ),
                    }
                ]
            },
            {
                key: "emg_consultant_fee",
                name: "Emg Consultation Fee",
                children: [
                    { key: 'emg_consultant_Prev_fee', name: 'Prev Fee' },
                    {
                        key: 'emg_consultant_curr_fee',
                        name: 'Current Fee',
                        editable: true,
                        renderCell: (params) => (
                            editing && editing.rowIdx === params.row.id && editing.column === 'emg_consultant_curr_fee' ? (
                                <input
                                    type="number"
                                    className='ratecard_inputs'
                                    autoFocus
                                    onKeyDown={(e) => handleKeyDown(e, params.row, 'emg_consultant_curr_fee')}
                                    value={params.row.emg_consultant_curr_fee}
                                    onChange={(e) => handleChange(e, params.row.id, 'emg_consultant_curr_fee')}
                                />
                            ) : (
                                <div onDoubleClick={() => handleDoubleClick(params.row.id, 'emg_consultant_curr_fee', params.row.Status)}>
                                    {params.row.emg_consultant_curr_fee}
                                </div>
                            )
                        ),
                    }
                ]
            }
        ];

        const dynamicColumns = (RoomTypes && RoomTypes.length > 0) ?
            RoomTypes.map(keyval => ({
                key: `${keyval?.id}_${keyval?.name}`,
                name: keyval?.name,
                children: [
                    { key: `${keyval?.name}_${keyval?.id}_prev_fee`, name: 'Prev Fee', width: 120 },
                    {
                        key: `${keyval?.name}_${keyval?.id}_curr_fee`,
                        name: 'Current Fee',
                        editable: true,
                        width: 120,
                        renderCell: (params) => (
                            editing && editing.rowIdx === params.row.id && editing.column === `${keyval?.name}_${keyval?.id}_curr_fee` ? (
                                <input
                                    type="number"
                                    autoFocus
                                    className='ratecard_inputs'
                                    onKeyDown={(e) => handleKeyDown(e, params.row, `${keyval?.name}_${keyval?.id}_curr_fee`)}
                                    value={params.row[`${keyval?.name}_${keyval?.id}_curr_fee`]}
                                    onChange={(e) => handleChange(e, params.row.id, `${keyval?.name}_${keyval?.id}_curr_fee`)}
                                />
                            ) : (
                                <div onDoubleClick={() => handleDoubleClick(params.row.id, `${keyval?.name}_${keyval?.id}_curr_fee`, params.row.Status)}>
                                    {params.row[`${keyval?.name}_${keyval?.id}_curr_fee`]}
                                </div>
                            )
                        ),
                    }
                ]
            })) : [];

        const Columns = [...predefinedColumns, ...dynamicColumns];
        setDoctorRateCardColumns(Columns);
    }, [RoomTypes, editing, handleKeyDown, handleChange, handleDoubleClick]);


    return (
        <>
            <div className="Main_container_app">
                <h3>Doctor Rate Card List</h3>

                <div className="common_center_tag">
                    <span>Doctor Id : {DoctorDetials?.id}</span> 
                    <br />
                    <span>Doctor Name : {DoctorDetials?.doctor_name}</span>
                </div>
                <ReactGrid columns={DoctorRateCardColumns} RowData={DoctorRateCardData} />
            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    )
}

export default DoctorRatecardList;