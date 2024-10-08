import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Dama.css';

const Dama = () => {
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const userRecord = useSelector(state => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const dispatch = useDispatch();

    const IpNurseQueSelectedRow = {
        Booking_Id: '1001A',  // Replace with actual data or initialize as needed
        PatientId: '1',
        PatientName: 'diya'
    };

    const [Dama, setDama] = useState({
        BroughtDead: false,
        BroughtDeadDate: "",
        BroughtDeadTime: "",

        HigherCenter: false,
        HigherCenterDate: "",
        HigherCenterTime: "",

        NonAvailabilityOfConsultant: false,
        NonAvailabilityOfConsultantDate: "",
        NonAvailabilityOfConsultantTime: "",

        NonAvailabilityOfIcuBed: false,
        NonAvailabilityOfIcuBedDate: "",
        NonAvailabilityOfIcuBedTime: "",

        ToxicPatientsOrRelatives: false,
        ToxicPatientsOrRelativesDate: "",
        ToxicPatientsOrRelativesTime: "",

        DrunkPatients: false,
        DrunkPatientsDate: "",
        DrunkPatientsTime: "",

        RelativesNotAvailable: false,
        RelativesNotAvailableDate: "",
        RelativesNotAvailableTime: "",

        TransferredtoCOVIDcentre: false,
        TransferredtoCOVIDcentreDate: "",
        TransferredtoCOVIDcentreTime: "",

        Absconded: false,
        AbscondedDate: "",
        AbscondedTime: "",

        DamaNonAffordable: false,
        DamaNonAffordableDate: "",
        DamaNonAffordableTime: "",

        DamaRelativesNotWish: false,
        DamaRelativesNotWishDate: "",
        DamaRelativesNotWishTime: "",

        DamaInsuranceOrCashless: false,
        DamaInsuranceOrCashlessDate: "",
        DamaInsuranceOrCashlessTime: "",

    });

    console.log(Dama, 'Damaaaaaaaaaaa')
    const [OtherReasons, setOtherReasons] = useState("");
    console.log(OtherReasons, 'OtherReasonsssssssssss')

    const [DamaGet, setDamaGet] = useState(false);

    useEffect(() => {
        if (IpNurseQueSelectedRow?.Booking_Id) {
            axios.get(`http://127.0.0.1:8000/IP/Dama_Details_Link?Booking_Id=${IpNurseQueSelectedRow.Booking_Id}`)
                .then((response) => {
                    const data = response.data[0];  // Assuming it returns an array with a single object
                    console.log("Fetched Dama data:", data);

                    setDama({
                        BroughtDead: data?.BroughtDead ==='True'? true: false,
                        BroughtDeadDate: data?.BroughtDeadDate || '',
                        BroughtDeadTime: data?.BroughtDeadTime || '',
                        HigherCenter: data?.HigherCenter ==='True'? true: false,
                        HigherCenterDate: data?.HigherCenterDate || '',
                        HigherCenterTime: data?.HigherCenterTime || '',
                        NonAvailabilityOfConsultant: data?.NonAvailabilityOfConsultant ==='True'? true: false,
                        NonAvailabilityOfConsultantDate: data?.NonAvailabilityOfConsultantDate || '',
                        NonAvailabilityOfConsultantTime: data?.NonAvailabilityOfConsultantTime || '',
                        NonAvailabilityOfIcuBed: data?.NonAvailabilityOfIcuBed ==='True'? true:false,
                        NonAvailabilityOfIcuBedDate: data?.NonAvailabilityOfIcuBedDate || '',
                        NonAvailabilityOfIcuBedTime: data?.NonAvailabilityOfIcuBedTime || '',
                        ToxicPatientsOrRelatives: data?.ToxicPatientsOrRelatives ==='True'? true: false,
                        ToxicPatientsOrRelativesDate: data?.ToxicPatientsOrRelativesDate || '',
                        ToxicPatientsOrRelativesTime: data?.ToxicPatientsOrRelativesTime || '',
                        DrunkPatients: data?.DrunkPatients ==='True'? true: false,
                        DrunkPatientsDate: data?.DrunkPatientsDate || '',
                        DrunkPatientsTime: data?.DrunkPatientsTime || '',
                        RelativesNotAvailable: data?.RelativesNotAvailable ==='True'? true: false,
                        RelativesNotAvailableDate: data?.RelativesNotAvailableDate || '',
                        RelativesNotAvailableTime: data?.RelativesNotAvailableTime || '',
                        TransferredtoCOVIDcentre: data?.TransferredtoCOVIDcentre ==='True'? true: false,
                        TransferredtoCOVIDcentreDate: data?.TransferredtoCOVIDcentreDate || '',
                        TransferredtoCOVIDcentreTime: data?.TransferredtoCOVIDcentreTime || '',
                        Absconded: data?.Absconded ==='True'? true: false,
                        AbscondedDate: data?.AbscondedDate || '',
                        AbscondedTime: data?.AbscondedTime || '',
                        DamaNonAffordable: data?.DamaNonAffordable ==='True'? true: false,
                        DamaNonAffordableDate: data?.DamaNonAffordableDate || '',
                        DamaNonAffordableTime: data?.DamaNonAffordableTime || '',
                        DamaRelativesNotWish: data?.DamaRelativesNotWish ==='True'? true: false,
                        DamaRelativesNotWishDate: data?.DamaRelativesNotWishDate || '',
                        DamaRelativesNotWishTime: data?.DamaRelativesNotWishTime || '',
                        DamaInsuranceOrCashless: data?.DamaInsuranceOrCashless ==='True'? true: false,
                        DamaInsuranceOrCashlessDate: data?.DamaInsuranceOrCashlessDate || '',
                        DamaInsuranceOrCashlessTime: data?.DamaInsuranceOrCashlessTime || '',

                        
                    });

                    setOtherReasons(data?.OtherReasons || '');

                    console.log("Fetched data:", data);
                })
                .catch((error) => {
                    console.log('Error fetching data:', error);
                })
                .finally(() => {
                    setDamaGet(false);
                });
        }
    }, [IpNurseQueSelectedRow?.Booking_Id, DamaGet]);  // Dependency array with IpNurseQueSelectedRow.Booking_Id
  
  
  
    // const damaKeys = Object.keys(Dama); // Define damaKeys here

    const damaKeys = Object.keys(Dama).filter(key => key !== 'OtherReasons');
    const getLabelName = (key) => {
        switch (key) {
            case 'HigherCenter':
                return 'Higher Center For Further Investigation & Treatment';
            case 'NonAvailabilityOfIcuBed':
                return 'Non Availability Of ICU Bed';
            case 'RelativesNotAvailable':
                return 'Relatives Not Available (Unknown Patients)';
            case 'TransferredtoCOVIDcentre':
                return 'Transferred to COVID centre';
            default:
                return key.replace(/([A-Z])/g, ' $1');
        }
    };

    const handleDamaChange = (e) => {
        const { name, type, checked, value } = e.target;
        setDama(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleOtherReasonsChange = (e) => {
        setOtherReasons(e.target.value);
    };

    const handleSubmit = () => {
        const Allsenddata = {
            ...Dama,
            OtherReasons,
            PatientId: IpNurseQueSelectedRow?.PatientId,
            Booking_Id: IpNurseQueSelectedRow?.Booking_Id,
            PatientName: IpNurseQueSelectedRow?.PatientName,
            Location: userRecord?.location || 'chennai',
            CreatedBy: userRecord?.username || 'admin',
        };

        axios.post(`${UrlLink}IP/Dama_Details_Link`, Allsenddata)
            .then((res) => {
                const resData = res.data;

                const type = Object.keys(resData)[0];
                const message = Object.values(resData)[0];
                const toastData = {
                    message: message,
                    type: type,
                };

                dispatch({ type: 'toast', value: toastData });
                setDamaGet(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="Main_container_app">
                <div className="form-section5">
                    <div className="common_center_tag">
                        <h3>Transfer To (capture with date & time) & Reason</h3>
                    </div><br />

                    <div>
                        {damaKeys.map((key) => (
                            !key.includes('Date') && !key.includes('Time') &&
                            <div key={key} className="RegisFormcon_1 gap_align">
                                <div className="RegisForm_1 size_align">
                                    <label htmlFor={key}>{getLabelName(key)}</label>
                                    <input
                                        type="checkbox"
                                        id={key}
                                        name={key}
                                        checked={Dama[key]}
                                        onChange={handleDamaChange}
                                    />
                                </div><br />
                                <div className="RegisForm_1 width_align">
                                    <label htmlFor={`${key}Date`}> Date</label>
                                    <input
                                        type="date"
                                        id={`${key}Date`}
                                        name={`${key}Date`}
                                        value={Dama[`${key}Date`]}
                                        onChange={handleDamaChange}
                                    />
                                </div><br />
                                <div className="RegisForm_1 width_align">
                                    <label htmlFor={`${key}Time`}>Time</label>
                                    <input
                                        type="time"
                                        id={`${key}Time`}
                                        name={`${key}Time`}
                                        value={Dama[`${key}Time`]}
                                        onChange={handleDamaChange}
                                    />
                                </div><br />
                            </div>
                        ))}
                    </div><br />

                    <div className="RegisForm_1  gap_align">
                        <div className="RegisFormcon_1">
                            <label htmlFor="OtherReasons">Others Reasons</label>
                            <textarea
                                id="OtherReasons"
                                name="OtherReasons"
                                value={OtherReasons}
                                onChange={handleOtherReasonsChange}
                                style={{ width: '100%' }} // Set the width here
                            />
                        </div><br />
                    </div>
                </div>

                <div className="Main_container_Btn">
                    <button className="RegisterForm_1_btns" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
}

export default Dama;
