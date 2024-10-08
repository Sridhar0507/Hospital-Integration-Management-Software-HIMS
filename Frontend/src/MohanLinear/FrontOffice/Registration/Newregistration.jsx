import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce';
import { differenceInYears, format, startOfYear, subYears, isBefore } from 'date-fns';
import axios from 'axios';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import ModelContainer from '../../OtherComponent/ModelContainer/ModelContainer';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoBedOutline } from "react-icons/io5";
import profile from '../../Assets/profileimg.jpeg'
import '../../App.css';

const Newregistration = () => {

    const dispatchvalue = useDispatch();
    const navigate = useNavigate();

    const relationships = [
        "Spouse",
        "Father",
        "Mother",
        "Brother",
        "Sister",
        "Father-in-law",
        "Mother-in-law",
        "Grandfather",
        "Grandmother",
        "Son",
        "Daughter",
        "Grandson",
        "Granddaughter",
        "Son-in-law",
        "Daughter-in-law",
        "Uncle",
        "Aunt",
        "Nephew",
        "Niece",
        "Cousin",
        "Step-father",
        "Step-mother",
        "Step-son",
        "Step-daughter"
    ];


    const [AppointmentRegisType, setAppointmentRegisType] = useState('OP');
    const Registeredit = useSelector((state) => state.Frontoffice?.Registeredit);
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const UserData = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const [loading, setLoading] = useState(false);
    const [SpecializationData, setSpecializationData] = useState([])
    const [DoctorData, setDoctorData] = useState([])
    const [ReferralDoctorData, setReferralDoctorData] = useState([])
    const [EmployeeData, setEmployeeData] = useState([])
    const [DoctorIdData, setDoctorIdData] = useState([])
    const [FlaggData, setFlaggData] = useState([])
    const [ReligionData, setReligionData] = useState([])
    const [AllDoctorData, setAllDoctorData] = useState([])
    const [InsuranceData, setInsuranceData] = useState([])
    const [ClientData, setClientData] = useState([])
    const [DonationData, setDonationData] = useState([])


    const [FilterbyPatientId, setFilterbyPatientId] = useState([])
    const [FilteredFormdata, setFilteredFormdata] = useState(null);
    const [FilteredFormdataAddress, setFilteredFormdataAddress] = useState(null);
    const [FilteredFormdataRoute, setFilteredFormdataRoute] = useState(null);
    const [FilteredFormdataIpDetials, setFilteredFormdataIpDetials] = useState(null);
    const [FilteredFormdataIpRoomDetials, setFilteredFormdataIpRoomDetials] = useState(null);
    const [Buildingby_loc, setBuildingby_loc] = useState([])
    const [Blockby_building, setBlockby_building] = useState([])
    const [Floorby_block, setFloorby_block] = useState([])
    const [WardTypeby_floor, setWardTypeby_floor] = useState([])
    const [RoomTypeby_ward, setRoomTypeby_ward] = useState([])
    const [RoomNoby_Room, setRoomNoby_Room] = useState([])
    const [BedNoby_RoomNo, setBedNoby_RoomNo] = useState([])
    const [RoomdeditalsShow, setRoomdeditalsShow] = useState({})
    const [patientPhoto, setpatientPhoto] = useState(profile)

    
    const [RegisterData, setRegisterData] = useState({
        IsConsciousness: 'Yes',

        PatientId: '',
        PhoneNo: "",
        Title: "",
        FirstName: "",
        MiddleName: "",
        SurName: "",
        Gender: "",
        AliasName: "",
        DOB: "",
        Age: "",
        Email: "",
        BloodGroup: "",
        Occupation: "",
        Religion: "",
        Nationality: "",
        UniqueIdType: "",
        UniqueIdNo: "",
        CaseSheetNo: "",

        VisitPurpose: "",

        Specialization: "",
        DoctorName: "",
        Complaint: "",
        PatientType: "General",
        PatientCategory: "General",
        InsuranceName: '',
        InsuranceType: '',
        ClientName: '',
        ClientType: 'Self',
        ClientEmployeeId: '',
        ClientEmployeeDesignation: '',
        ClientEmployeeRelation: '',
        EmployeeId: '',
        EmployeeRelation: '',
        DoctorId: '',
        DoctorRelation: '',
        DonationType: '',
        IsMLC: "No",
        Flagging: 1,
        IsReferral: "No",



        ReferralSource: "",
        ReferredBy: "",
        RouteNo: "",
        RouteName: "",
        TehsilName: "",
        VillageName: "",



        AdmissionPurpose: "",
        DrInchargeAtTimeOfAdmission: "",
        NextToKinName: "",
        Relation: "",
        RelativePhoneNo: "",
        PersonLiableForBillPayment: "",
        FamilyHead: "Yes",
        FamilyHeadName: '',
        IpKitGiven: 'No',

        DoorNo: "",
        Street: "",
        Area: "",
        City: "",
        State: "",
        Country: "",
        Pincode: "",

        Building: "",
        Block: "",
        Floor: "",
        WardType: "",
        RoomType: "",
        RoomNo: "",
        BedNo: "",
        RoomId: ''
    });

    const clearRegisterdata = () => {
        setRegisterData((prev) => ({
            ...prev,
            IsConsciousness: 'Yes',
            PatientId: '',
            PhoneNo: "",
            Title: "",
            FirstName: "",
            MiddleName: "",
            SurName: "",
            Gender: "",
            AliasName: "",
            DOB: "",
            Age: "",
            Email: "",
            BloodGroup: "",
            Occupation: "",
            Religion: "",
            Nationality: "",
            UniqueIdType: "",
            UniqueIdNo: "",
            CaseSheetNo: "",

            VisitPurpose: "",

            Specialization: "",
            DoctorName: "",
            Complaint: "",
            PatientType: "General",
            PatientCategory: "General",
            InsuranceName: '',
            InsuranceType: '',
            ClientName: '',
            ClientType: 'Self',
            ClientEmployeeId: '',
            ClientEmployeeDesignation: '',
            ClientEmployeeRelation: '',
            EmployeeId: '',
            EmployeeRelation: '',
            DoctorId: '',
            DoctorRelation: '',
            DonationType: '',
            IsMLC: "No",
            Flagging: 1,
            IsReferral: "No",



            ReferralSource: "",
            ReferredBy: "",
            RouteNo: "",
            RouteName: "",
            TehsilName: "",
            VillageName: "",

            DrInchargeAtTimeOfAdmission: "",
            NextToKinName: "",
            Relation: "",
            RelativePhoneNo: "",
            PersonLiableForBillPayment: "",
            FamilyHead: "Yes",
            FamilyHeadName: '',
            IpKitGiven: 'No',

            DoorNo: "",
            Street: "",
            Area: "",
            City: "",
            State: "",
            Country: "",
            Pincode: "",

            Building: "",
            Block: "",
            Floor: "",
            WardType: "",
            RoomType: "",
            RoomNo: "",
            BedNo: "",
            RoomId: ''
        }))
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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [specializationResponse, referralDoctorResponse, EmployeeResponse, DoctorResponse,
                    FlaggData, ReligionData, AllDoctorData, Insurancedata, ClientData, DonationData] = await Promise.all([
                        axios.get(`${UrlLink}Masters/Speciality_Detials_link`),
                        axios.get(`${UrlLink}Masters/get_referral_doctor_Name_Detials`),
                        axios.get(`${UrlLink}Frontoffice/get_Employee_by_PatientCategory`),
                        axios.get(`${UrlLink}Frontoffice/get_DoctorId_by_PatientCategory`),
                        axios.get(`${UrlLink}Masters/Flagg_color_Detials_link`),
                        axios.get(`${UrlLink}Masters/Relegion_Master_link`),
                        axios.get(`${UrlLink}Masters/get_All_doctor_Name_Detials`),
                        axios.get(`${UrlLink}Masters/get_insurance_data_registration`),
                        axios.get(`${UrlLink}Masters/get_client_data_registration`),
                        axios.get(`${UrlLink}Masters/get_donation_data_registration`),

                    ]);


                setSpecializationData(Array.isArray(specializationResponse.data) ? specializationResponse.data : []);
                setReferralDoctorData(Array.isArray(referralDoctorResponse.data) ? referralDoctorResponse.data : []);
                setEmployeeData(Array.isArray(EmployeeResponse.data) ? EmployeeResponse.data : []);
                setDoctorIdData(Array.isArray(DoctorResponse.data) ? DoctorResponse.data : []);
                setFlaggData(Array.isArray(FlaggData.data) ? FlaggData.data : []);
                setReligionData(Array.isArray(ReligionData.data) ? ReligionData.data : []);
                setAllDoctorData(Array.isArray(AllDoctorData.data) ? AllDoctorData.data : []);
                setInsuranceData(Array.isArray(Insurancedata.data) ? Insurancedata.data : []);
                setClientData(Array.isArray(ClientData.data) ? ClientData.data : []);
                setDonationData(Array.isArray(DonationData.data) ? DonationData.data : []);

                console.log("DoctorResponse.data", DoctorResponse.data);
                console.log("referralDoctorResponse.data", referralDoctorResponse.data);



            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [UrlLink]);
    useEffect(() => {
        if (UserData.location) {
            axios.get(`${UrlLink}Masters/get_building_Data_by_location?Location=${UserData?.location}`)
                .then(res => {
                    setBuildingby_loc(res.data)
                })
                .catch(err => {
                    setBuildingby_loc([])
                    console.log(err);
                })
        }

    }, [UserData.location, UrlLink])





    useEffect(() => {
        const fetchdat = async () => {
            try {
                const response = await axios.get(`${UrlLink}Masters/get_Doctor_by_Speciality_Detials?Speciality=${RegisterData.Specialization}`);

                setDoctorData(response.data);
                console.log(response.data, 'daaaaaaa');
            } catch (error) {
                setDoctorData([])
                console.error("Error fetching referral doctors:", error);
            }
        }
        if (RegisterData.Specialization) { fetchdat() }
    }, [UrlLink, RegisterData.Specialization])



    useEffect(() => {
        const data = {
            PatientId: RegisterData.PatientId,
            PhoneNo: RegisterData.PhoneNo,
            FirstName: RegisterData.FirstName,
        }
        axios.get(`${UrlLink}Frontoffice/Filter_Patient_by_Multiple_Criteria`, { params: data })
            .then((res) => {
                const data = res.data
                setFilterbyPatientId(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [UrlLink, RegisterData.PatientId, RegisterData.PhoneNo, RegisterData.FirstName]);

    const HandlesearchPatient = (value) => {
        const exist = FilterbyPatientId.find((f) => f.PatientId === value)
        if (!!!exist) {

            const tdata = {
                message: 'Please enter a valid Patient Id',
                type: 'warn',
            }

            dispatchvalue({ type: 'toast', value: tdata });
        } else {
            axios.get(`${UrlLink}Frontoffice/get_Patient_Details_by_patientId?PatientId=${value}`)
                .then((res) => {
                    const resss = res.data
                    console.log(resss);
                    setRegisterData((prev) => ({
                        ...prev,
                        ...resss
                    }))
                })
                .catch((err) => {
                    console.log(err);
                })
        }


    }

    const gridRef = useRef(null);

    useLayoutEffect(() => {
        const handleResize = debounce(() => {
            if (gridRef.current) {

                const { clientWidth } = gridRef.current;
                const updatedclientWidth = clientWidth - 20

                const items = document.querySelectorAll(".RegisForm_1");
                let totalWidth = 0;
                let currentRowItemsCount = 0;

                items.forEach((item) => {
                    const itemStyles = getComputedStyle(item);
                    const itemWidth =
                        item.offsetWidth +
                        parseFloat(itemStyles.marginLeft) +
                        parseFloat(itemStyles.marginRight);

                    if (totalWidth + itemWidth <= updatedclientWidth) {
                        totalWidth += itemWidth;
                        currentRowItemsCount++;
                    }
                });
                const remainingGap = updatedclientWidth - totalWidth;
                const gapBetweenItems = Math.floor(remainingGap / currentRowItemsCount);
                const container = document.getElementById("RegisFormcon_11");

                if (updatedclientWidth > 800) {
                    container.style.justifyContent = 'flex-start'
                    container.style.columnGap = `${gapBetweenItems === 0 ? 5 : gapBetweenItems}px`;
                } else {
                    container.style.justifyContent = 'center'
                    container.style.columnGap = `10px`;
                }
            }
        }, 100); // Adjust the debounce delay as needed

        const currentGridRef = gridRef.current;
        const resizeObserver = new ResizeObserver(handleResize);
        if (currentGridRef) {
            resizeObserver.observe(currentGridRef);
        }
        return () => {
            if (currentGridRef) {
                resizeObserver.unobserve(currentGridRef);
            }
            resizeObserver.disconnect();
        };
    }, []);



    const handleStopEvent = (event) => {
        document.body.style.pointerEvents = 'auto';
        event.preventDefault();
        event.stopPropagation();
    };

    const scrollToElement = (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {

            document.body.style.pointerEvents = 'none';
            element.scrollIntoView({ behavior: 'auto', block: 'start' });
            window.addEventListener('scroll', handleStopEvent);
            window.addEventListener('click', handleStopEvent);
        }
    };

    const onImageChange = (e) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            let formattedValue = files[0];

            // Optional: Add validation for file type and size
            const allowedTypes = ['image/jpeg', 'image/png']; // Example allowed types
            const maxSize = 5 * 1024 * 1024; // Example max size of 5MB

            if (!allowedTypes.includes(formattedValue.type)) {
                // Dispatch a warning toast or handle file type validation
                const tdata = {
                    message: 'Invalid file type. Please upload a JPEG or PNG file.',
                    type: 'warn'
                };
                dispatchvalue({ type: 'toast', value: tdata });
                setpatientPhoto(null)

            } else if (formattedValue.size > maxSize) {
                // Dispatch a warning toast or handle file size validation
                const tdata = {
                    message: 'File size exceeds the limit of 5MB.',
                    type: 'warn'
                };
                dispatchvalue({ type: 'toast', value: tdata });
                setpatientPhoto(null)

            } else {

                // Optional: If you want to convert the file to a data URL and dispatch it
                const reader = new FileReader();
                reader.onload = () => {

                    setpatientPhoto(reader.result)
                };
                reader.readAsDataURL(formattedValue);
            }
        } else {
            // Handle case where no file is selected
            const tdata = {
                message: 'No file selected. Please choose a file to upload.',
                type: 'warn'
            };
            dispatchvalue({ type: 'toast', value: tdata });
            setpatientPhoto(null)
        }
    };


    const HandleOnchange = async (e) => {
        const { name, value } = e.target
        const formattedValue = value.trim()
        if (name === 'PatientId') {
            setRegisterData((prev) => ({
                ...prev,
                IsConsciousness: 'Yes',
                PatientId: formattedValue,
                PhoneNo: "",
                Title: "",
                FirstName: "",
                MiddleName: "",
                SurName: "",
                Gender: "",
                AliasName: "",
                DOB: "",
                Age: "",
                Email: "",
                BloodGroup: "",
                Occupation: "",
                Religion: "",
                Nationality: "",
                UniqueIdType: "",
                UniqueIdNo: "",
                CaseSheetNo: "",

                VisitPurpose: "",

                Specialization: "",
                DoctorName: "",
                Complaint: "",
                PatientType: "General",
                PatientCategory: "General",
                InsuranceName: '',
                InsuranceType: '',
                ClientName: '',
                ClientType: 'Self',
                ClientEmployeeId: '',
                ClientEmployeeDesignation: '',
                ClientEmployeeRelation: '',
                EmployeeId: '',
                EmployeeRelation: '',
                DoctorId: '',
                DoctorRelation: '',
                DonationType: '',
                IsMLC: "No",
                Flagging: 1,
                IsReferral: "No",



                ReferralSource: "",
                ReferredBy: "",
                RouteNo: "",
                RouteName: "",
                TehsilName: "",
                VillageName: "",

                DrInchargeAtTimeOfAdmission: "",
                NextToKinName: "",
                Relation: "",
                RelativePhoneNo: "",
                PersonLiableForBillPayment: "",
                FamilyHead: "Yes",
                FamilyHeadName: '',
                IpKitGiven: 'No',

                DoorNo: "",
                Street: "",
                Area: "",
                City: "",
                State: "",
                Country: "",
                Pincode: "",

                Building: "",
                Block: "",
                Floor: "",
                WardType: "",
                RoomType: "",
                RoomNo: "",
                BedNo: "",
                RoomId: ''
            }))
        } else if (name === 'PhoneNo') {

            if (formattedValue.includes('|')) {
                const convert = formattedValue.split(' | ')


                if (convert.length <= 10) {
                    setRegisterData((prev) => ({
                        ...prev,
                        [name]: convert[2],
                        PatientId: convert[0],
                        FirstName: convert[1]

                    }))
                }
            } else {
                if (formattedValue.length <= 10) {
                    setRegisterData((prev) => ({
                        ...prev,
                        [name]: formattedValue,
                    }))
                }
            }

        } else if (name === 'FirstName') {

            if (formattedValue.includes('|')) {
                const convert = formattedValue.split(' | ')

                setRegisterData((prev) => ({
                    ...prev,
                    [name]: convert[1],
                    PatientId: convert[0],
                    PhoneNo: convert[2]
                }))

            } else {
                setRegisterData((prev) => ({
                    ...prev,
                    [name]: formattedValue
                }))

            }
        } else if (name === 'Title') {
            setRegisterData((prev) => ({
                ...prev,
                [name]: formattedValue,
                Gender: ['Miss', 'Ms', 'Mrs'].includes(value) ? 'Female' : ['Mr', 'Master'].includes(value) ? 'Male' : 'TransGender'
            }))
        } else if (name === 'DOB') {
            const currentdate = new Date()
            // Calculate the minimum allowed date (100 years before current date)
            const minAllowedDate = subYears(currentdate, 100);
            const selectedDate = new Date(value);

            if (isBefore(minAllowedDate, selectedDate) && isBefore(selectedDate, currentdate)) {
                const age = differenceInYears(currentdate, selectedDate);

                setRegisterData((prevFormData) => ({
                    ...prevFormData,
                    [name]: formattedValue,
                    Age: age,
                }));
            } else {
                setRegisterData((prevFormData) => ({
                    ...prevFormData,
                    [name]: formattedValue,
                    Age: '',
                }));
            }

        } else if (name === 'Age') {
            if (formattedValue) {
                if (!isNaN(formattedValue) && formattedValue.length <= 3) {
                    // Get the current date
                    const currentDate = new Date();

                    // Calculate the year to subtract
                    const targetYear = subYears(currentDate, formattedValue);

                    // Create a date for January 1st of the target year
                    const dob = startOfYear(targetYear);

                    // Format the DOB
                    const formattedDOB = format(dob, 'yyyy-MM-dd');
                    setRegisterData((prev) => ({
                        ...prev,
                        [name]: formattedValue,
                        DOB: format(formattedDOB, 'yyyy-MM-dd')
                    }));
                }
            } else {
                setRegisterData((prev) => ({
                    ...prev,
                    [name]: formattedValue,
                    DOB: ''
                }));
            }


        } else if (name === 'ReferredBy') {
            try {
                const response = await axios.get(`${UrlLink}Masters/get_route_details?DoctorId=${value}`);
                const route = response.data;

                if (route) {
                    setRegisterData(prevState => ({
                        ...prevState,
                        [name]: formattedValue,
                        RouteNo: route.RouteNo,
                        RouteName: route.RouteName,
                        TehsilName: route.TehsilName,
                        VillageName: route.VillageName
                    }));
                } else {
                    setRegisterData(prevState => ({
                        ...prevState,
                        [name]: formattedValue,
                        RouteNo: '',
                        RouteName: '',
                        TehsilName: '',
                        VillageName: ''
                    }));
                }
            } catch (error) {
                console.error("Error fetching route details:", error);
                setRegisterData(prevState => ({
                    ...prevState,
                    [name]: formattedValue,
                    RouteNo: '',
                    RouteName: '',
                    TehsilName: '',
                    VillageName: ''
                }));


            }

        } else if (name === 'Specialization') {
            setRegisterData((prev) => ({
                ...prev,
                [name]: formattedValue,
                DoctorName: ''
            }))



        } else if (name === 'Building') {
            const convertedval = Number(formattedValue)
            axios.get(`${UrlLink}Masters/get_block_Data_by_Building?Building=${convertedval}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setBlockby_building(res.data)
                    } else {
                        setBlockby_building([])
                    }
                })
                .catch(err => {
                    setBlockby_building([])
                    console.log(err);
                })
            setRegisterData((prev) => ({
                ...prev,
                [name]: formattedValue,
                Block: "",
                Floor: "",
                WardType: "",
                RoomType: "",
                RoomNo: "",
                BedNo: "",
                RoomId: ''
            }))



        } else if (name === 'Block') {
            const convertedval = Number(formattedValue)
            axios.get(`${UrlLink}Masters/get_Floor_Data_by_Building_block_loc?Block=${convertedval}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setFloorby_block(res.data)
                    } else {
                        setFloorby_block([])
                    }
                })
                .catch(err => {
                    setFloorby_block([])
                    console.log(err);
                })
            setRegisterData((prev) => ({
                ...prev,
                [name]: formattedValue,
                Floor: "",
                WardType: "",
                RoomType: "",
                RoomNo: "",
                BedNo: "",
                RoomId: ''
            }))



        } else if (name === 'Floor') {
            const convertedval = Number(formattedValue)
            axios.get(`${UrlLink}Masters/get_Ward_Data_by_Building_block_Floor_loc?Floor=${convertedval}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setWardTypeby_floor(res.data)
                    } else {
                        setWardTypeby_floor([])
                    }
                })
                .catch(err => {
                    setWardTypeby_floor([])
                    console.log(err);
                })
            setRegisterData((prev) => ({
                ...prev,
                [name]: formattedValue,
                WardType: "",
                RoomType: "",
                RoomNo: "",
                BedNo: "",
                RoomId: ''
            }))



        } else if (name === 'WardType') {
            const convertedval = Number(formattedValue)
            axios.get(`${UrlLink}Masters/get_RoomType_Data_by_Building_block_Floor_ward_loc?Ward=${convertedval}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setRoomTypeby_ward(res.data)
                    } else {
                        setRoomTypeby_ward([])
                    }
                })
                .catch(err => {
                    setRoomTypeby_ward([])
                    console.log(err);
                })
            setRegisterData((prev) => ({
                ...prev,
                [name]: formattedValue,
                RoomType: "",
                RoomNo: "",
                BedNo: "",
                RoomId: ''
            }))



        } else if (name === 'RoomType') {
            const convertedval = Number(formattedValue)
            axios.get(`${UrlLink}Masters/get_RoomNo_Data_by_Building_block_Floor_ward_Room_loc?Room=${convertedval}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setRoomNoby_Room(res.data)
                    } else {
                        setRoomNoby_Room([])
                    }
                })
                .catch(err => {
                    setRoomNoby_Room([])
                    console.log(err);
                })
            setRegisterData((prev) => ({
                ...prev,
                [name]: formattedValue,
                RoomNo: "",
                BedNo: "",
                RoomId: ''
            }))



        } else if (name === 'RoomNo') {
            const convertedval = parseInt(formattedValue)
            axios.get(`${UrlLink}Masters/get_BedNo_Data_by_Building_block_Floor_ward_RoomNo_loc?Room=${Number(RegisterData.RoomType)}&RoomNo=${convertedval}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setBedNoby_RoomNo(res.data)
                    } else {
                        setBedNoby_RoomNo([])
                    }

                })
                .catch(err => {
                    setBedNoby_RoomNo([])
                    console.log(err);
                })
            setRegisterData((prev) => ({
                ...prev,
                [name]: formattedValue,
                BedNo: "",
                RoomId: ''
            }))



        } else if (name === 'BedNo') {
            const convertedval = Number(formattedValue)
            const data = BedNoby_RoomNo.find(p => p.id === convertedval)

            setRegisterData((prev) => ({
                ...prev,
                [name]: formattedValue,
                RoomId: data ? data?.RoomId : ''
            }))
        } else {
            setRegisterData((prev) => ({
                ...prev,
                [name]: formattedValue
            }))
        }

    }
    const handlesubmit = () => {
        setLoading(true);
        scrollToElement('RegisFormcon_11');

        // List of required fields

        let requiredFields = [...FilteredFormdata, ...FilteredFormdataAddress];

        if (AppointmentRegisType === 'IP' || AppointmentRegisType === 'Casuality') {
            requiredFields = [...FilteredFormdata, ...FilteredFormdataAddress, ...FilteredFormdataIpRoomDetials];
        }

        let missingFields = [];

        // Identify missing fields (excluding 'PatientId')
        requiredFields.filter(field => field !== 'PatientId').forEach(field => {
            if (!RegisterData[field]) {
                missingFields.push(formatLabel(field)); // Assuming formatLabel is a function to format field names for display
            }
        });

        let filtereddata = [];

        // Apply additional filtering for Casuality type when patient is unconscious
        if (RegisterData.IsConsciousness === 'No' && AppointmentRegisType === 'Casuality') {
            filtereddata = missingFields.filter(field =>
                ['Building', 'Block', 'Floor', 'Ward Type', 'Room Type', 'Room No', 'Bed No', 'Room Id'].includes(field)
            );
        } else {
            filtereddata = [...missingFields];
        }
        console.log('RegisterData', RegisterData);
        console.log('missingFields', missingFields);
        console.log('filtereddata', filtereddata);

        // If any required fields are missing, show a warning
        if (filtereddata.length > 0) {
            setLoading(false);
            const tdata = {
                message: `Please fill out the required fields: ${filtereddata.join(', ')}`,
                type: 'warn',
            };
            dispatchvalue({ type: 'toast', value: tdata });
            return;
        }

        const submitdata = {
            ...RegisterData,
            PatientPhoto: patientPhoto,
            Created_by: UserData?.username,
            RegisterType: AppointmentRegisType,
            RegisterId: Registeredit?.RegistrationId,
            Location: UserData?.location

        };
        axios.post(`${UrlLink}Frontoffice/Patient_Registration`, submitdata)
            .then(res => {
                setLoading(false);
                console.log(res.data);
                const resres = res.data;
                let typp = Object.keys(resres)[0];
                let mess = Object.values(resres)[0];
                const tdata = {
                    message: mess,
                    type: typp,
                };
                dispatchvalue({ type: 'toast', value: tdata });
                clearRegisterdata();
                dispatchvalue({ type: 'Registeredit', value: {} });
                if (typp === 'success') {
                    navigate('/Home/RegistrationList');
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {

        let fdata = Object.keys(RegisterData).filter((p) => !['IsConsciousness', 'AliasName', 'DoorNo', 'Street', 'Area', 'City',
            'State', 'Country', 'Pincode',
            'InsuranceName', 'InsuranceType', 'ClientName', 'ClientType', 'VisitPurpose', 'Specialization', 'DoctorName',
            'EmployeeId', 'EmployeeDesignation',
            'ClientEmployeeId', 'ClientEmployeeDesignation',
            'ClientEmployeeRelation', 'EmployeeRelation', 'DoctorId',
            'DoctorRelation', 'DonationType',
            'ReferralSource', 'ReferredBy', 'RouteNo', 'RouteName',
            'TehsilName', 'VillageName', 'AdmissionPurpose', 'DrInchargeAtTimeOfAdmission',
            'NextToKinName', 'InsuranceType', 'Relation', 'RelativePhoneNo',
            'PersonLiableForBillPayment', 'FamilyHead', 'FamilyHeadName', 'IpKitGiven',
            'Building', 'Block', 'Floor', 'WardType', 'RoomType', 'RoomNo', 'BedNo', 'RoomId'
        ].includes(p))

        if (RegisterData.Title === 'Mrs' && RegisterData.Gender === 'Female') {
            const categoryIndex = fdata.indexOf('Gender');
            fdata.splice(categoryIndex + 1, 0, 'AliasName');
        }
        if (RegisterData.PatientCategory === 'Insurance') {
            const categoryIndex = fdata.indexOf('PatientCategory');
            fdata.splice(categoryIndex + 1, 0, 'InsuranceName', 'InsuranceType');
        }
        if (RegisterData.PatientCategory === 'Client') {
            const categoryIndex = fdata.indexOf('PatientCategory');
            fdata.splice(categoryIndex + 1, 0, 'ClientName', 'ClientType');
        }
        if (RegisterData.ClientType === 'Self' && RegisterData.PatientCategory === 'Client') {
            const categoryIndex = fdata.indexOf('ClientType');
            fdata.splice(categoryIndex + 1, 0, 'ClientEmployeeId', 'ClientEmployeeDesignation');
        }
        if (RegisterData.ClientType === 'Relative' && RegisterData.PatientCategory === 'Client') {
            const categoryIndex = fdata.indexOf('ClientType');
            fdata.splice(categoryIndex + 1, 0, 'ClientEmployeeId', 'ClientEmployeeDesignation', 'ClientEmployeeRelation');
        }
        if (RegisterData.PatientCategory === 'Employee') {
            const categoryIndex = fdata.indexOf('PatientCategory');
            fdata.splice(categoryIndex + 1, 0, 'EmployeeId');
        }
        if (RegisterData.PatientCategory === 'EmployeeRelation') {
            const categoryIndex = fdata.indexOf('PatientCategory');
            fdata.splice(categoryIndex + 1, 0, 'EmployeeId', 'EmployeeRelation');
        }
        if (RegisterData.PatientCategory === 'Doctor') {
            const categoryIndex = fdata.indexOf('PatientCategory');
            fdata.splice(categoryIndex + 1, 0, 'DoctorId');
        }
        if (RegisterData.PatientCategory === 'DoctorRelation') {
            const categoryIndex = fdata.indexOf('PatientCategory');
            fdata.splice(categoryIndex + 1, 0, 'DoctorId', 'DoctorRelation');
        }
        if (RegisterData.PatientCategory === 'Donation') {
            const categoryIndex = fdata.indexOf('PatientCategory');
            fdata.splice(categoryIndex + 1, 0, 'DonationType');
        }
        if (AppointmentRegisType === 'OP') {
            const categoryIndex = fdata.indexOf('CaseSheetNo');
            fdata.splice(categoryIndex + 1, 0, 'VisitPurpose');
            fdata.splice(categoryIndex + 2, 0, 'Specialization', 'DoctorName');
        }

        if (AppointmentRegisType !== 'OP') {
            const categoryIndex = fdata.indexOf('CaseSheetNo');
            fdata.splice(categoryIndex + 1, 0, 'Specialization', 'DoctorName');
        }
        if (AppointmentRegisType === 'Casuality') {
            fdata.unshift('IsConsciousness')
        }





        setFilteredFormdata(fdata)


        let Addressdata = Object.keys(RegisterData).filter((p) => ['DoorNo', 'Street', 'Area', 'City', 'State', 'Country', 'Pincode'].includes(p))
        setFilteredFormdataAddress(Addressdata)

        let routedata = Object.keys(RegisterData).filter((p) => ['ReferralSource', 'ReferredBy', 'RouteNo', 'RouteName', 'TehsilName', 'VillageName'].includes(p))
        setFilteredFormdataRoute(routedata)

        let roomdata = Object.keys(RegisterData).filter((p) => ['Building', 'Block', 'Floor', 'WardType', 'RoomType', 'RoomNo', 'BedNo'].includes(p))
        setFilteredFormdataIpRoomDetials(roomdata)



        let Ipdetialdata = Object.keys(RegisterData).filter((p) => ['AdmissionPurpose', 'DrInchargeAtTimeOfAdmission', 'NextToKinName', 'Relation', 'RelativePhoneNo', 'PersonLiableForBillPayment', 'FamilyHead', 'IpKitGiven'].includes(p))
        if (RegisterData.FamilyHead === 'No') {
            const categoryIndex = Ipdetialdata.indexOf('FamilyHead');
            Ipdetialdata.splice(categoryIndex + 1, 0, 'FamilyHeadName');
        }
        setFilteredFormdataIpDetials(Ipdetialdata)


    }, [RegisterData, RegisterData.FamilyHead, RegisterData.Title, RegisterData.Gender, RegisterData.Specialization, SpecializationData, AppointmentRegisType])

    useEffect(() => {
        if (Registeredit && Object.keys(Registeredit).length !== 0) {
            setAppointmentRegisType(Registeredit?.Type)
            if (Registeredit?.conversion) {
                axios.get(`${UrlLink}Frontoffice/get_Patient_Details_by_patientId?PatientId=${Registeredit?.PatientId}`)
                    .then((res) => {
                        const resss = res.data
                        console.log(resss);
                        setRegisterData((prev) => ({
                            ...prev,
                            ...resss
                        }))
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                axios.get(`${UrlLink}Frontoffice/get_Registration_edit_details`, {
                    params: {
                        RegistrationId: Registeredit?.RegistrationId || '',
                        RegistrationType: Registeredit?.Type || '',
                    }
                })
                    .then((response) => {
                        const resdata = response.data
                        const { BuildingName, BlockName, FloorName, WardTypeName, RoomTypeName, PatientProfile,...res } = resdata
                        setRoomdeditalsShow({
                            Building: BuildingName,
                            Block: BlockName,
                            Floor: FloorName,
                            WardType: WardTypeName,
                            RoomType: RoomTypeName,
                            RoomNo: res.RoomNo,
                            BedNo: res.BedNo,
                            RoomId: res.RoomId,
                        })
                        setpatientPhoto(PatientProfile)
                        setRegisterData((prev) => ({
                            ...prev,
                            IsConsciousness: res?.IsConsciousness || 'Yes',
                            PatientId: res.PatientId || '',
                            PhoneNo: res.PhoneNo || '',
                            Title: res.Title || '',
                            FirstName: res.FirstName || '',
                            MiddleName: res.MiddleName || '',
                            SurName: res.SurName || '',
                            Gender: res.Gender || '',
                            AliasName: res.AliasName || '',
                            DOB: res.DOB || '',
                            Age: res.Age || '',
                            Email: res.Email || '',
                            BloodGroup: res.BloodGroup || '',
                            Occupation: res.Occupation || '',
                            Religion: res.Religion || '',
                            Nationality: res.Nationality || '',
                            UniqueIdType: res.UniqueIdType || '',
                            UniqueIdNo: res.UniqueIdNo || '',
                            CaseSheetNo: res.CaseSheetNo || '',

                            VisitPurpose: res.VisitPurpose || '',

                            Specialization: res.Specialization || '',
                            DoctorName: res.DoctorName || '',
                            Complaint: res.Complaint || '',
                            PatientType: res.PatientType || 'General',
                            PatientCategory: res.PatientCategory || 'General',
                            InsuranceName: res.InsuranceName || '',
                            InsuranceType: res.InsuranceType || '',
                            ClientName: res.ClientName || '',
                            ClientType: res.ClientType || '',
                            ClientEmployeeId: res.ClientEmployeeId || '',
                            ClientEmployeeDesignation: res.ClientEmployeeDesignation || '',
                            ClientEmployeeRelation: res.ClientEmployeeRelation || '',
                            EmployeeId: res.EmployeeId || '',
                            EmployeeRelation: res.EmployeeRelation || '',
                            DoctorId: res.DoctorId || '',
                            DoctorRelation: res.DoctorRelation || '',
                            DonationType: res.DonationType || '',
                            IsMLC: res.IsMLC || '',
                            Flagging: res.Flagging || 1,
                            IsReferral: res.IsReferal || '',

                            ReferralSource: res.ReferralSource || '',
                            ReferredBy: res.ReferredBy || '',
                            RouteNo: res.RouteNo || '',
                            RouteName: res.RouteName || '',
                            TehsilName: res.TehsilName || '',
                            VillageName: res.VillageName || '',

                            DrInchargeAtTimeOfAdmission: res.DrInchargeAtTimeOfAdmission || '',
                            NextToKinName: res.NextToKinName || '',
                            Relation: res.Relation || '',
                            RelativePhoneNo: res.RelativePhoneNo || '',
                            PersonLiableForBillPayment: res.PersonLiableForBillPayment || '',
                            FamilyHead: res.FamilyHead || '',
                            FamilyHeadName: res.FamilyHeadName || '',
                            IpKitGiven: res.IpKitGiven || '',

                            DoorNo: res.DoorNo || '',
                            Street: res.Street || '',
                            Area: res.Area || '',
                            City: res.City || '',
                            State: res.State || '',
                            Country: res.Country || '',
                            Pincode: res.Pincode || '',

                            Building: res.Building || "",
                            Block: res.Block || "",
                            Floor: res.Floor || "",
                            WardType: res.WardType || "",
                            RoomType: res.RoomType || "",
                            RoomNo: res.RoomNo || "",
                            BedNo: res.BedNo || "",
                            RoomId: res.RoomId || "",
                        }))

                    })
                    .catch(e => {
                        console.error("Error fetching patient appointment details:", e);
                    })
            }

        } else {
            clearRegisterdata()
        }


    }, [Registeredit, UrlLink])

    return (
        <>
            <div className="Main_container_app">
                <h3>Registration</h3>
                <div className="RegisterTypecon">
                    <div className="RegisterType">
                        {["OP", "IP", "Casuality", "Diagnosis", "Laboratory"].filter(f => Object.keys(Registeredit).length !== 0 ? f === Registeredit?.Type : f).map((p, ind) => (
                            <div className="registertypeval" key={ind}>
                                <input
                                    type="radio"
                                    id={p}
                                    name="appointment_type"
                                    checked={AppointmentRegisType === p}
                                    onChange={(e) => {
                                        setAppointmentRegisType(e.target.value)
                                        clearRegisterdata()
                                    }}
                                    value={p}
                                />
                                <label htmlFor={p}>
                                    {p === "OP"
                                        ? "Out Patient (OP)"
                                        : p === "IP"
                                            ? "In Patient (IP)"
                                            : p}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <div className='DivCenter_container'>
                    <div className="img_1">
                        <div className="patient_profile_pic">
                            {patientPhoto && <img src={patientPhoto} alt="Patient Photo" />}
                        </div>
                        <input
                            type="file"
                            name="file"
                            id='Filechoosen_Patient_profile'
                            accept="image/png,image/jpeg"
                            onChange={onImageChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="Filechoosen_Patient_profile" className="ImgBtn">
                            Choose File
                        </label>
                    </div>
                </div>
                <br />
                <div className="RegisFormcon" id="RegisFormcon_11" ref={gridRef}>
                    {
                        FilteredFormdata && FilteredFormdata.map((field, index) => (
                            <div className="RegisForm_1" key={index}>
                                <label htmlFor={`${field}_${index}`}>
                                    {field === 'ANCNumber' ? 'ANC Number' : field === 'MCTSNo' ? 'MCTS No' : formatLabel(field)}
                                    <span>:</span>
                                </label>
                                {
                                    ['Title', 'Gender', 'BloodGroup', 'Religion', 'Nationality', 'UniqueIdType', 'VisitPurpose', 'Specialization', 'DoctorName', 'PatientType', 'PatientCategory', 'ColorFlag', 'ReferralSource', 'Flagging', 'InsuranceName', 'DonationType', 'InsuranceType', 'ClientName', 'ClientEmployeeRelation', 'EmployeeRelation', 'EmployeeId', 'EmployeeRelation', 'DoctorId', 'DoctorRelation'].includes(field) ?
                                        (
                                            <select
                                                id={`${field}_${index}`}
                                                name={field}
                                                value={RegisterData[field]}
                                                onChange={HandleOnchange}
                                            >
                                                <option value="">Select</option>
                                                {field === 'Title' &&
                                                    ['Miss', 'Ms', 'Mrs', 'Mr', 'Master', 'Baby', 'Mx'].map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }
                                                {field === 'Gender' &&
                                                    ['Male', 'Female', 'TransGender'].map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }
                                                {field === 'BloodGroup' &&
                                                    ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }
                                                {field === 'Religion' &&
                                                    ReligionData?.map((row, indx) => (
                                                        <option key={indx} value={row.id}>{row.religion}</option>
                                                    ))
                                                }
                                                {field === 'Nationality' &&
                                                    ['Indian', 'International'].map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }
                                                {field === 'UniqueIdType' &&
                                                    <>
                                                        {
                                                            RegisterData.Nationality === "Indian" && ['Aadhar', 'VoterId', 'SmartCard'].map((row, indx) => (
                                                                <option key={indx} value={row}>{row}</option>
                                                            ))
                                                        }
                                                        {
                                                            RegisterData.Nationality === "International" && ['DrivingLicence', 'Passport'].map((row, indx) => (
                                                                <option key={indx} value={row}>{row}</option>
                                                            ))
                                                        }
                                                    </>


                                                }
                                                {field === 'VisitPurpose' &&
                                                    ['NewConsultation', 'FollowUp'].map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }
                                                {field === 'Specialization' &&

                                                    SpecializationData?.filter(p => p.Status === 'Active')?.map((Catg, indx) => (
                                                        <option key={indx} value={Catg.id}>
                                                            {Catg.SpecialityName}
                                                        </option>
                                                    ))
                                                }
                                                {field === 'DoctorName' &&
                                                    DoctorData?.map((row, indx) => (
                                                        <option key={indx} value={row.id}>{row.ShortName}</option>
                                                    ))
                                                }
                                                {field === 'PatientType' &&
                                                    ['General', 'VIP', 'Govt'].map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }
                                                {field === 'PatientCategory' &&
                                                    ['General', 'Insurance', 'Client', 'Donation', 'Employee', 'EmployeeRelation', 'Doctor', 'DoctorRelation'].map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }


                                                {field === 'ReferralSource' &&
                                                    ['Call', 'Letter', 'Oral'].map((row, indx) => (
                                                        <option key={indx} value={row}>{formatLabel(row)}</option>
                                                    ))
                                                }
                                                {field === 'Flagging' &&
                                                    FlaggData?.filter(p => p.Status === 'Active').map((row, indx) => (
                                                        <option key={indx} value={row.id} style={{ backgroundColor: row.FlaggColor }}> {row.FlaggName}</option>
                                                    ))
                                                }
                                                {field === 'InsuranceType' &&
                                                    ['Cashless', 'Reimbursable'].map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }

                                                {['ClientEmployeeRelation', 'EmployeeRelation', 'DoctorRelation'].includes(field) &&
                                                    relationships?.map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }

                                                {['EmployeeId', 'EmployeeRelation'].includes(field) &&
                                                    EmployeeData?.map((row, indx) => (
                                                        <option key={indx} value={row.id}>{row.Name}</option>
                                                    ))
                                                }

                                                {['DoctorId', 'DoctorRelation'].includes(field) &&
                                                    DoctorIdData?.filter(p => p.id !== RegisterData.DoctorName).map((row, indx) => (
                                                        <option key={indx} value={row.id}>{row.ShortName}</option>
                                                    ))
                                                }
                                                {field === 'ClientName' &&
                                                    ClientData?.map((row, indx) => (
                                                        <option key={indx} value={row.id}>{row.Name}</option>
                                                    ))
                                                }
                                                {field === 'InsuranceName' &&
                                                    InsuranceData?.map((row, indx) => (
                                                        <option key={indx} value={row.id}>{row?.Type === 'MAIN' ? `${row?.Name} - ${row?.Type}` : `${row?.Name} - ${row?.Type} - ${row?.TPA_Name}`}</option>
                                                    ))
                                                }
                                                {field === 'DonationType' &&
                                                    DonationData?.map((row, indx) => (
                                                        <option key={indx} value={row.id}>{`${row?.Type} - ${row?.Name}`}</option>
                                                    ))
                                                }
                                            </select>
                                        ) :
                                        ['PhoneNo', 'FirstName', 'PatientId'].includes(field) ?
                                            (
                                                <div className='Search_patient_icons'>
                                                    <input
                                                        id={`${field}_${index}`}
                                                        type={field === 'PhoneNo' ? 'number' : 'text'}
                                                        list={`${field}_iddd`}
                                                        autoComplete='off'
                                                        name={field}
                                                        onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault() && field === 'PhoneNo'}
                                                        readOnly={field === 'PatientId' && Object.keys(Registeredit).length !== 0}
                                                        required={field !== 'PatientId'}
                                                        value={RegisterData[field]}
                                                        onChange={HandleOnchange}
                                                    />
                                                    <datalist id={`${field}_iddd`}>

                                                        {field === 'PatientId' &&
                                                            FilterbyPatientId.map((row, indx) => (
                                                                <option key={indx} value={row.PatientId}>
                                                                    {`${row.PhoneNo} | ${row.FirstName}`}
                                                                </option>
                                                            ))
                                                        }
                                                        {field === 'PhoneNo' &&
                                                            FilterbyPatientId.map((row, indx) => (
                                                                <option key={indx} value={` ${row.PatientId} | ${row.FirstName} | ${row.PhoneNo}`} />
                                                            ))
                                                        }
                                                        {field === 'FirstName' &&
                                                            FilterbyPatientId.map((row, indx) => (
                                                                <option key={indx} value={` ${row.PatientId} | ${row.FirstName} | ${row.PhoneNo}`} />
                                                            ))
                                                        }

                                                    </datalist>
                                                    {Object.keys(Registeredit).length === 0 && field === 'PatientId' &&
                                                        <span onClick={(e) => HandlesearchPatient(RegisterData[field])}>
                                                            <PersonSearchIcon />
                                                        </span>
                                                    }
                                                    {Object.keys(Registeredit).length !== 0 && field === 'PatientId' && AppointmentRegisType === 'Casuality' &&
                                                        <span onClick={(e) => HandlesearchPatient(RegisterData[field])}>
                                                            <PersonSearchIcon />
                                                        </span>
                                                    }
                                                </div>
                                            )
                                            : ['ClientType', 'IsMLC', 'IsReferral', 'IsConsciousness'].includes(field) ?
                                                (<div style={{ display: 'flex', justifyContent: 'space-between', width: '150px' }}>
                                                    <label style={{ width: 'auto' }} htmlFor={`${field}_yes`}>
                                                        <input
                                                            required
                                                            id={`${field}_yes`}
                                                            type="radio"
                                                            name={field}
                                                            value={field === 'ClientType' ? "Self" : 'Yes'}
                                                            style={{ width: '15px' }}
                                                            checked={field === 'ClientType' ? RegisterData[field] === "Self" : RegisterData[field] === 'Yes'}
                                                            onChange={(e) => setRegisterData(prevState => ({
                                                                ...prevState,
                                                                [field]: field === 'ClientType' ? "Self" : 'Yes'
                                                            }))}
                                                        />
                                                        {field === 'ClientType' ? "Self" : 'Yes'}
                                                    </label>
                                                    <label style={{ width: 'auto' }} htmlFor={`${field}_No`}>
                                                        <input
                                                            required
                                                            id={`${field}_No`}
                                                            type="radio"
                                                            name={field}
                                                            value={field === 'ClientType' ? "Relative" : 'No'}
                                                            style={{ width: '15px' }}
                                                            checked={field === 'ClientType' ? RegisterData[field] === "Relative" : RegisterData[field] === 'No'}
                                                            onChange={(e) => setRegisterData(prevState => ({
                                                                ...prevState,
                                                                [field]: field === 'ClientType' ? "Relative" : 'No'
                                                            }))}
                                                        />
                                                        {field === 'ClientType' ? "Relative" : 'No'}
                                                    </label>
                                                </div>
                                                )
                                                : field === 'Complaint' ?
                                                    (
                                                        <textarea
                                                            id={`${field}_${index}`}
                                                            autoComplete='off'
                                                            name={field}
                                                            required
                                                            value={RegisterData[field]}
                                                            onChange={HandleOnchange}
                                                        />
                                                    )
                                                    :
                                                    (
                                                        <input
                                                            id={`${field}_${index}`}
                                                            autoComplete='off'
                                                            type={field === 'DOB' ? 'date' : 'text'}
                                                            name={field}
                                                            required
                                                            value={RegisterData[field]}
                                                            onChange={HandleOnchange}
                                                        />
                                                    )
                                }

                            </div>
                        ))
                    }
                    <br />
                    {RegisterData.IsReferral === 'Yes' &&
                        <>
                            <div className='DivCenter_container'>Referral Information</div>

                            {
                                FilteredFormdataRoute && FilteredFormdataRoute.map((field, index) => (
                                    <div className="RegisForm_1" key={index}>
                                        <label htmlFor={`${field}_${index}`}>
                                            {formatLabel(field)}
                                            <span>:</span>
                                        </label>
                                        {['ReferralSource', 'ReferredBy'].includes(field) ?


                                            <select
                                                id={`${field}_${index}`}
                                                name={field}
                                                value={RegisterData[field]}
                                                onChange={HandleOnchange}
                                            >
                                                <option value="">Select</option>



                                                {field === 'ReferralSource' &&
                                                    ['Call', 'Letter', 'Oral'].map((row, indx) => (
                                                        <option key={indx} value={row}>{row}</option>
                                                    ))
                                                }
                                                {field === 'ReferredBy' &&
                                                    ReferralDoctorData.map((row, indx) => (
                                                        <option key={indx} value={row.id}>{row.ShortName}</option>
                                                        // <option value="">Select</option>

                                                    ))
                                                }
                                                {/* <option value="">Others</option> */}

                                            </select>
                                            :
                                            <input
                                                autoComplete='off'
                                                type='text'
                                                name={field}
                                                readOnly
                                                value={RegisterData[field]}
                                                onChange={HandleOnchange}
                                            />
                                        }
                                    </div>
                                ))
                            }

                        </>
                    }
                    <br />
                    <div className='DivCenter_container'>Patient Address</div>

                    {
                        FilteredFormdataAddress && FilteredFormdataAddress.map((field, index) => (
                            <div className="RegisForm_1" key={index}>
                                <label htmlFor={`${field}_${index}`}>
                                    {formatLabel(field)}
                                    <span>:</span>
                                </label>
                                <input
                                    id={`${field}_${index}`}
                                    autoComplete='off'
                                    type='text'
                                    name={field}
                                    value={RegisterData[field]}
                                    onChange={HandleOnchange}
                                />
                            </div>
                        ))
                    }
                    <br />

                    {AppointmentRegisType === 'IP' &&
                        <>
                            <div className='DivCenter_container'>Admission Details</div>
                            {
                                FilteredFormdataIpDetials && FilteredFormdataIpDetials.map((field, index) => (
                                    <div className="RegisForm_1" key={index}>
                                        <label htmlFor={field}>
                                            {formatLabel(field)}
                                            <span>:</span>
                                        </label>
                                        {
                                            field === 'FamilyHead' || field === 'IpKitGiven' ?
                                                (<div style={{ display: 'flex', justifyContent: 'space-between', width: '150px' }}>
                                                    <label style={{ width: '60px' }}>
                                                        <input
                                                            id='MLCYes'
                                                            type="radio"
                                                            name={field}
                                                            value="Yes"
                                                            style={{ width: '15px' }}
                                                            checked={RegisterData[field] === 'Yes'}
                                                            onChange={(e) => setRegisterData(prevState => ({
                                                                ...prevState,
                                                                [field]: 'Yes'
                                                            }))}
                                                        />
                                                        Yes
                                                    </label>
                                                    <label style={{ width: '60px' }}>
                                                        <input
                                                            id='MLCNo'
                                                            type="radio"
                                                            name={field}
                                                            value="No"
                                                            style={{ width: '15px' }}
                                                            checked={RegisterData[field] === 'No'}
                                                            onChange={(e) => setRegisterData(prevState => ({
                                                                ...prevState,
                                                                [field]: 'No'
                                                            }))}
                                                        />
                                                        No
                                                    </label>
                                                </div>
                                                ) :
                                                ['Relation', 'DrInchargeAtTimeOfAdmission', 'AdmissionPurpose'].includes(field) ?
                                                    (
                                                        <select
                                                            id={`${field}_${index}`}
                                                            name={field}
                                                            value={RegisterData[field]}
                                                            onChange={HandleOnchange}
                                                        >
                                                            <option value="">Select</option>



                                                            {field === 'Relation' &&
                                                                relationships.map((row, indx) => (
                                                                    <option key={indx} value={row}>{row}</option>
                                                                ))
                                                            }

                                                            {field === 'DrInchargeAtTimeOfAdmission' &&
                                                                AllDoctorData.map((row, indx) => (
                                                                    <option key={indx} value={row.id}>{row.ShortName}</option>
                                                                ))
                                                            }
                                                            {field === 'AdmissionPurpose' &&
                                                                ['Medical-Management', 'Surgery', 'Day-Care'].map((row, indx) => (
                                                                    <option key={indx} value={row}>{row}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    )
                                                    :
                                                    (
                                                        <input
                                                            autoComplete='off'
                                                            type='text'
                                                            name={field}
                                                            value={RegisterData[field]}
                                                            onChange={HandleOnchange}
                                                        />
                                                    )
                                        }

                                    </div>
                                ))
                            }
                            <br />

                        </>
                    }
                    {['IP', 'Casuality'].includes(AppointmentRegisType) &&
                        <>
                            <div className='DivCenter_container'>Room Details </div>
                            <div className='DivCenter_container'>
                                <IoBedOutline className='HotelIcon_registration' />
                            </div>
                            {
                                FilteredFormdataIpRoomDetials.map((field, index) => (
                                    <div className="RegisForm_1" key={index}>
                                        <label htmlFor={field}>
                                            {formatLabel(field)}
                                            <span>:</span>
                                        </label>
                                        {
                                            Object.keys(Registeredit).length !== 0 ?
                                                <input
                                                    type='text'
                                                    disabled
                                                    id={`${field}_${index}`}
                                                    name={field}
                                                    value={RoomdeditalsShow[field]}
                                                    onChange={HandleOnchange}
                                                />
                                                :
                                                <select
                                                    id={`${field}_${index}`}
                                                    name={field}
                                                    value={RegisterData[field]}
                                                    onChange={HandleOnchange}
                                                >
                                                    <option value="">Select</option>



                                                    {field === 'Building' &&
                                                        Buildingby_loc.map((p, index) => (
                                                            <option key={index} value={p.id}>{p.BuildingName}</option>
                                                        ))
                                                    }
                                                    {field === 'Block' &&
                                                        Blockby_building.map((p, index) => (
                                                            <option key={index} value={p.id}>{p.BlockName}</option>
                                                        ))
                                                    }
                                                    {field === 'Floor' &&
                                                        Floorby_block.map((p, index) => (
                                                            <option key={index} value={p.id}>{p.FloorName}</option>
                                                        ))
                                                    }
                                                    {field === 'WardType' &&
                                                        WardTypeby_floor.map((p, index) => (
                                                            <option key={index} value={p.id}>{p.WardName}</option>
                                                        ))
                                                    }
                                                    {field === 'RoomType' &&
                                                        RoomTypeby_ward.map((p, index) => (
                                                            <option key={index} value={p.id}>{p.RoomName}</option>
                                                        ))
                                                    }
                                                    {field === 'RoomNo' &&
                                                        RoomNoby_Room.map((p, index) => (
                                                            <option key={index} value={p.RoomNo}>{p.RoomNo}</option>
                                                        ))
                                                    }
                                                    {field === 'BedNo' &&
                                                        BedNoby_RoomNo.map((p, index) => (
                                                            <option key={index} value={p.id}>{p.BedNo}</option>
                                                        ))
                                                    }


                                                </select>
                                        }
                                    </div>
                                ))
                            }
                        </>
                    }
                    <div className="Main_container_Btn">
                        <button onClick={handlesubmit}>
                            {Object.keys(Registeredit).length !== 0 ? "Update" : "Save"}
                        </button>
                    </div>

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
                <br />
            </div>
        </>
    )
}

export default Newregistration