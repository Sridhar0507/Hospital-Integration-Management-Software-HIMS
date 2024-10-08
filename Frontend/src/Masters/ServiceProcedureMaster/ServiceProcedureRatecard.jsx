import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import axios from 'axios';

const ServiceProcedureRatecard = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const ServiceProcedureRatecardView = useSelector(state => state.userRecord?.ServiceProcedureRatecardView);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [DoctorRateCardColumns, setDoctorRateCardColumns] = useState([]);
    const [DoctorRateCardData, setDoctorRateCardData] = useState([]);
    const [RoomTypes, setRoomTypes] = useState([]);
    const [ServiceProcedure, setServiceProcedure] = useState(null);
    const [editing, setEditing] = useState(null);
    const [getChanges, setGetChanges] = useState(false);

    useEffect(() => {
        if (Object.keys(ServiceProcedureRatecardView).length > 0 && ServiceProcedureRatecardView.MasterType && ServiceProcedureRatecardView.id) {
            axios.get(`${UrlLink}Masters/Service_Procedure_Ratecard_details_view_by_id?MasterType=${ServiceProcedureRatecardView.MasterType}&id=${ServiceProcedureRatecardView.id}`)
                .then((res) => {
                    const { Ratecarddetials, Roomtypes, ...rest } = res.data;
                    setRoomTypes(Roomtypes);
                    setServiceProcedure(rest);
                    setDoctorRateCardData(Array.isArray(Ratecarddetials) ? Ratecarddetials : []);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setRoomTypes([]);
            setDoctorRateCardData([]);
            navigate('/Home/ServiceProcedureMasterList');
        }

    }, [UrlLink, getChanges, ServiceProcedureRatecardView, navigate]);

    const handleChange = useCallback((e, rowIdx, column) => {
        const updatedRows = DoctorRateCardData.map((row, index) =>
            index === rowIdx ? { ...row, [column]: e.target.value } : row
        );
        setDoctorRateCardData(updatedRows);
    }, [DoctorRateCardData]);

    const handleDoubleClick = useCallback((rowIdx, column) => {
        if (ServiceProcedure?.Status === 'Active') {
            setEditing({ rowIdx, column });
        } else {
            const tdata = {
                message: `The Selected Doctor is Inactive, enable it to edit Rates`,
                type: 'warn',
            };
            dispatch({ type: 'toast', value: tdata });
        }
    }, [dispatch, ServiceProcedure]);

    const handleSaveChanges = useCallback((row, columnchanged) => {
        const [column, id] = columnchanged.split('_');

        const editval = {
            MasterType: ServiceProcedureRatecardView?.MasterType,
            id: ServiceProcedureRatecardView?.id,
            col: column,
            colId: !column.includes('OP_charge') ? parseInt(id) : null,
            RatecardType: row?.RatecardType,
            SP_ratecard_id: row?.ratecard_id || null,
            SP_Ratecardid: row?.Ratecardid || null,
            location: row?.location_id,
            changedRate: !column.includes('OP_charge') ? row[columnchanged] : row['fee']
        };

        const confirmChange = window.confirm("Do you want to save the changes?");
        if (confirmChange) {
            axios.post(`${UrlLink}Masters/Service_Procedure_Ratecard_details_update`, editval)
                .then((res) => {
                    const resData = res.data;
                    const messageType = Object.keys(resData)[0];
                    const message = Object.values(resData)[0];

                    const tdata = {
                        message: message,
                        type: messageType,
                    };

                    dispatch({ type: 'toast', value: tdata });
                })
                .catch((err) => {
                    console.log(err);
                });

            setGetChanges(prev => !prev);
        } else {
            setGetChanges(prev => !prev);
        }
    }, [ServiceProcedureRatecardView, UrlLink, dispatch]);

    const handleKeyDown = useCallback((e, row, changedColumn) => {
        if (e.key === 'Enter') {
            setEditing(null);
            if (row && changedColumn) {
                handleSaveChanges(row, changedColumn);
            }
        } else if (['e', 'E', '+', '-'].includes(e.key)) {
            e.preventDefault();
        }
    }, [handleSaveChanges]);

    useEffect(() => {
        const predefinedColumns = [
            { key: "locationshow", name: "Location" },
            { key: "RatecardShow", name: "RateCard Type" },
            { key: "RatecardName", name: "Ratecard Name" }
        ];

        if (ServiceProcedure?.Typess !== 'IP') {
            predefinedColumns.push(
                {
                    key: "OP_Charge",
                    name: "OP Charge",
                    children: [
                        { key: 'prev_fee', name: 'Prev Fee' },
                        {
                            key: 'fee',
                            name: 'Current Fee',
                            editable: true,
                            renderCell: (params) => (
                                editing && editing.rowIdx === params.row.id && editing.column === 'fee' ? (
                                    <input
                                        type="number"
                                        autoFocus
                                        className='ratecard_inputs'
                                        onKeyDown={(e) => handleKeyDown(e, params.row, 'OP_Charge')}
                                        value={params.row.fee || ""}
                                        onChange={(e) => handleChange(e, params.row.id, 'fee')}
                                    />
                                ) : (
                                    <div onDoubleClick={() => handleDoubleClick(params.row.id, 'fee')}>
                                        {params.row.fee}
                                    </div>
                                )
                            ),
                        }
                    ]
                }
            );
        }

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
                                    value={params.row[`${keyval?.name}_${keyval?.id}_curr_fee`] || ""}
                                    onChange={(e) => handleChange(e, params.row.id, `${keyval?.name}_${keyval?.id}_curr_fee`)}
                                />
                            ) : (
                                <div onDoubleClick={() => handleDoubleClick(params.row.id, `${keyval?.name}_${keyval?.id}_curr_fee`)}>
                                    {params.row[`${keyval?.name}_${keyval?.id}_curr_fee`]}
                                </div>
                            )
                        ),
                    }
                ]
            })) : [];

        if (ServiceProcedure?.Typess !== 'OP') {
            predefinedColumns.push(
                {
                    key: "IP_Charge",
                    name: "IP Charge",
                    children: dynamicColumns
                }
            );
        }

        setDoctorRateCardColumns([...predefinedColumns]);
    }, [RoomTypes, editing, handleKeyDown, handleChange, handleDoubleClick, ServiceProcedure]);

    return (
        <>
            <div className="Main_container_app">
                <h3>
                    {ServiceProcedureRatecardView?.MasterType} Rate Card List
                </h3>

                <div className="common_center_tag">
                    <span>{ServiceProcedureRatecardView?.MasterType === 'Service' ? 'Department' : 'Specialization'} : {ServiceProcedure?.Typess}</span>
                    <br />
                    <span>{ServiceProcedureRatecardView?.MasterType} Name : {ServiceProcedure?.Service_procedure_name}</span>
                </div>

                {DoctorRateCardColumns &&
                    <ReactGrid columns={DoctorRateCardColumns} RowData={DoctorRateCardData} />
                }
            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    );
};

export default ServiceProcedureRatecard;
