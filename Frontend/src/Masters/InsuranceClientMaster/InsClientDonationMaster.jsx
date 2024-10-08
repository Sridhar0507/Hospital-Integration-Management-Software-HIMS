import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import ModelContainer from '../../OtherComponent/ModelContainer/ModelContainer';

const InsClientDonationMaster = () => {
    const dispatchvalue = useDispatch()
    const navigate = useNavigate()
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const UserData = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const InsClientDonationMaster = useSelector(state => state.userRecord?.InsClientDonationMaster);
    const [InsuranceClientDonationForm, setInsuranceClientDonationForm] = useState({
        Code: "",
        Name: "", 
        Type: "",
        TPAName: "",
        PolicyType: "",
        PayerZone: "",
        PayerMemberId: "",
        ContactPerson: "",
        Designation: "",
        PancardNo: '',
        CIN: '',
        TAN: '',
        MailId: "",
        PhoneNumber: "",
        Address: "",
        OtherDocuments1: null,
        OtherDocuments2: null,
        OtherDocuments3: null,
    });
    const [FillteredFields, setFillteredFields] = useState([])
    const [InsuranceNamedata, setInsuranceNamedata] = useState([]);
    const [InsuranceClientDonationType, setInsuranceClientDonationType] = useState('Insurance');


    const cleardatass = useCallback(() => {
        setInsuranceClientDonationForm({
            Code: "",
            Name: "",
            Type: "",
            TPAName: "",
            PolicyType: "",
            PayerZone: "",
            PayerMemberId: "",
            ContactPerson: "",
            Designation: "",
            PancardNo: '',
            CIN: '',
            TAN: '',
            MailId: "",
            PhoneNumber: "",
            Address: "",
            OtherDocuments1: null,
            OtherDocuments2: null,
            OtherDocuments3: null,
        })
    }, [InsuranceClientDonationType])

    const handleselectChange = (e) => {
        const { value } = e.target
        setInsuranceClientDonationType(value)
        cleardatass()
    }
    useEffect(() => {
        axios.get(`${UrlLink}Masters/get_insurance_client_name`)
            .then((res) => {
                setInsuranceNamedata(Array.isArray(res.data) ? res.data : [])
            })
            .catch((err) => {
                console.log(err);

            })
        if (InsuranceClientDonationType === 'Donation') {
            setInsuranceClientDonationForm((prev) => ({
                ...prev,
                Type: 'Organization'
            }))
        }
    }, [UrlLink, InsuranceClientDonationType]);


    useEffect(() => {
        let fdata = [];

        if (InsuranceClientDonationType === 'Insurance') {
            fdata = [
                'Code', 'Name', 'Type', 'TPAName', 'PolicyType', 'PayerZone',
                'PayerMemberId', 'ContactPerson', 'MailId', 'PhoneNumber', 'OtherDocuments1', 'OtherDocuments2'
            ];
        } else if (InsuranceClientDonationType === 'Client') {
            fdata = [
                'Code', 'Name', 'ContactPerson', 'MailId', 'PhoneNumber', 'Address', 'OtherDocuments1', 'OtherDocuments2'
            ];
        } else if (InsuranceClientDonationType === 'Donation') {
            fdata = [
                'Code', 'Name', 'Type', 'ContactPerson', 'Designation', 'PancardNo', 'CIN', 'TAN', 'MailId', 'PhoneNumber', 'Address', 'OtherDocuments1', 'OtherDocuments2', 'OtherDocuments3'
            ];
        }

        if (InsuranceClientDonationForm?.Type !== 'Organization') {
            fdata = fdata.filter(item => item !== 'CIN');
        }
        if (InsuranceClientDonationForm?.Type === 'Individual') {
            fdata = fdata.filter(item => !['CIN', 'TAN', 'OtherDocuments3'].includes(item));
        }
        if (Object.keys(InsClientDonationMaster).length === 0) {
            fdata = fdata.filter(item => item !== 'Code');
        }
        console.log(fdata);

        setFillteredFields(fdata);
    }, [InsuranceClientDonationType, InsuranceClientDonationForm, InsClientDonationMaster]);

    useEffect(() => {
        if (Object.keys(InsClientDonationMaster).length > 0) {
            const { CreatedBy, Status,MasterType, id, ...data } = InsClientDonationMaster
            setInsuranceClientDonationType(MasterType)
            setInsuranceClientDonationForm((prev) => ({
                Code: id,
                ...data
            }))
        } else {
            cleardatass()
        }
    }, [InsClientDonationMaster, cleardatass])

    const handleOnchange = (e) => {
        const { name, value, files } = e.target
        if (['OtherDocuments1', 'OtherDocuments2', 'OtherDocuments3'].includes(name)) {
            if (files && files.length > 0) {
                let formattedValue = files[0];

                // Optional: Add validation for file type and size
                const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']; // Example allowed types
                const maxSize = 5 * 1024 * 1024; // Example max size of 5MB
                if (!allowedTypes.includes(formattedValue.type) || formattedValue.type === '') {
                    // Dispatch a warning toast or handle file type validation
                    const tdata = {
                        message: 'Invalid file type. Please upload a PDF, JPEG, or PNG file.',
                        type: 'warn'
                    };
                    dispatchvalue({ type: 'toast', value: tdata });

                } else {
                    if (formattedValue.size > maxSize) {
                        // Dispatch a warning toast or handle file size validation
                        const tdata = {
                            message: 'File size exceeds the limit of 5MB.',
                            type: 'warn'
                        };
                        dispatchvalue({ type: 'toast', value: tdata });

                    } else {
                        const reader = new FileReader();
                        reader.onload = () => {


                            setInsuranceClientDonationForm((prev) => ({
                                ...prev,
                                [name]: reader.result
                            }));

                        };
                        reader.readAsDataURL(formattedValue);




                    }
                }



            } else {
                // Handle case where no file is selected
                const tdata = {
                    message: 'No file selected. Please choose a file to upload.',
                    type: 'warn'
                };
                dispatchvalue({ type: 'toast', value: tdata });
            }
        } else if (name === "PhoneNumber") {

            console.log(value)

            const newval = value.length;
            if (newval <= 10) {
                setInsuranceClientDonationForm((prev) => ({
                    ...prev,
                    [name]: value.trim()

                }))


            }

        }
        else if (name === "Type") {

            setInsuranceClientDonationForm((prev) => ({
                ...prev,
                [name]: value,
                TPAName: value === "MAIN" ? 'Nill' : ''
            }));


        }
        else if (name === "MailId") {

            setInsuranceClientDonationForm((prev) => ({
                ...prev,
                [name]: value.toLowerCase().trim()

            }))



        }
        else {

            const uppercaseValue = (name === "Name" || name === "TPAName" || name === "PolicyType"
                || name === "PayerZone" || name === "PayerMemberId") ? value.toUpperCase() : value;

            setInsuranceClientDonationForm((prev) => ({
                ...prev,
                [name]: uppercaseValue.trim()

            }))


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
    }
    const Selectedfileview = (fileval) => {
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
    }


    const handlesubmit = () => {
        
        
        let missingFields = [];

        FillteredFields.filter(field =>!['Code','OtherDocuments1', 'OtherDocuments2','OtherDocuments3'].includes(field)).forEach(field => {
            if (!InsuranceClientDonationForm[field]) {
              
                missingFields.push(formatLabel(field));
            }
        });
        if (missingFields.length > 0) {
            const tdata = {
                message: `Please fill empty fields: ${missingFields.join(", ")}`,
                type: 'warn',
            }

            dispatchvalue({ type: 'toast', value: tdata });

        } else {
            let submitdata = {
                    ...InsuranceClientDonationForm,
                    Created_by: UserData?.username,
                    MasterType: InsuranceClientDonationType,
                };
            
            const datatosend = new FormData();
            Object.keys(submitdata).forEach(key => {
                if (['OtherDocuments1', 'OtherDocuments2','OtherDocuments3'].includes(key)) {

                    if (submitdata[key] !== null) {
                        datatosend.append(key, submitdata[key]);
                    }
                } else {
                    datatosend.append(key, submitdata[key]);
                }
            });
            axios.post(`${UrlLink}Masters/Insurance_Client_Master_Detials_link`, datatosend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(res => {
                    dispatchvalue({ type: 'InsClientDonationMaster', value: {} })
                    console.log(res.data);
                    const resres = res.data
                    let typp = Object.keys(resres)[0]
                    let mess = Object.values(resres)[0]
                    const tdata = {
                        message: mess,
                        type: typp,
                    }

                    dispatchvalue({ type: 'toast', value: tdata });
                    cleardatass()
                    navigate('/Home/InsClientDonationList')
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    return (
        <>
            <div className="Main_container_app">
                <h3>Insurance / Client / Donation Master</h3>
                <br />
                <div className="RegisterTypecon">
                    <div className="RegisterType">
                        {["Insurance", "Client", "Donation"].filter((p)=> Object.keys(InsClientDonationMaster).length>0 ? p===InsClientDonationMaster.MasterType : p).map((p, ind) => (
                            <div className="registertypeval" key={ind + 'key'}>
                                <input
                                    type="radio"
                                    id={p}
                                    name="appointment_type"
                                    checked={InsuranceClientDonationType === p}
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
                <div className="RegisFormcon_1">
                    {FillteredFields.map((field, indx) => (
                        <div className="RegisForm_1" key={indx}>
                            <label htmlFor={`${field}_${indx}_${field}`}>
                                {
                                    field === 'TPAName' ?
                                        'TPA Name' : field === 'Code' ?
                                            `${InsuranceClientDonationType} Code` : field === 'Name' ?
                                                `${InsuranceClientDonationType} Name` :
                                                field === 'OtherDocuments1' ?
                                                    (
                                                        InsuranceClientDonationType !== 'Donation' ? 'TreatmentList' : 'Document One'
                                                    ) :
                                                    field === 'OtherDocuments2' ?
                                                        (
                                                            InsuranceClientDonationType !== 'Donation' ? 'Other Document' : 'Document Two'
                                                        ) : field === 'OtherDocuments3' ?
                                                            'Document Three'
                                                            :
                                                            formatLabel(field)
                                }
                                <span>:</span> </label>
                            {
                                ['OtherDocuments1', 'OtherDocuments2', 'OtherDocuments3'].includes(field) ?


                                    <>
                                        <input
                                            type='file'
                                            name={field}

                                            accept='image/jpeg, image/png,application/pdf'
                                            required
                                            id={`${field}_${indx}_${field}`}
                                            autoComplete='off'
                                            onChange={handleOnchange}
                                            style={{ display: 'none' }}
                                        />
                                        <div style={{ width: '150px', display: 'flex', justifyContent: 'space-around' }}>
                                            <label
                                                htmlFor={`${field}_${indx}_${field}`}
                                                className="RegisterForm_1_btns choose_file_update"
                                            >
                                                Choose File
                                            </label>
                                            <button className='fileviewbtn' onClick={() => Selectedfileview(InsuranceClientDonationForm[field])}>view</button>
                                        </div>
                                    </>
                                    :
                                    field === "Type" ?
                                        <select
                                            name={field}
                                            value={InsuranceClientDonationForm[field]}
                                            onChange={handleOnchange}
                                        >
                                            <option value="">Select</option>
                                            {
                                                InsuranceClientDonationType === 'Insurance' &&
                                                ['TPA', 'MAIN'].map((p, ind) => (
                                                    <option value={p} key={ind}>{p}</option>
                                                ))
                                            }
                                            {
                                                InsuranceClientDonationType === 'Donation' &&
                                                ['Organization', 'Trust', 'NGO', 'Individual'].map((p, ind) => (
                                                    <option value={p} key={ind}>{p}</option>
                                                ))
                                            }
                                        </select>
                                        :
                                        field === 'Name' && InsuranceClientDonationType === 'Insurance' ?
                                            (
                                                <>
                                                    <input
                                                        list={`${field}_list`}
                                                        type='text'
                                                        value={InsuranceClientDonationForm[field]}
                                                        onChange={handleOnchange}
                                                        name={field}
                                                        autoComplete="off"
                                                    />
                                                    <datalist id={`${field}_list`}>
                                                        {InsuranceNamedata.map((p, ind) => (
                                                            <option value={p.Insurance_Name} key={ind} />
                                                        ))}
                                                    </datalist>
                                                </>

                                            )
                                            : field === 'Address' ?
                                                <textarea 
                                                onChange={handleOnchange}
                                                value={InsuranceClientDonationForm[field]}
                                                name={field}
                                                />
                                                :

                                                <input
                                                    readOnly={field === 'TPAName' ? InsuranceClientDonationForm.Type === 'MAIN' : ['Code'].includes(field) && Object.keys(InsClientDonationMaster).length > 0}
                                                    type={field === 'PhoneNumber' ? 'number' : field === 'MailId' ? 'email' : 'text'}
                                                    onKeyDown={(e) => field === 'PhoneNumber' && ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                                                    value={InsuranceClientDonationForm[field]}
                                                    onChange={handleOnchange}
                                                    name={field}
                                                    autoComplete="off"
                                                />
                            }
                        </div>

                    ))}
                    <div className="Main_container_Btn">
                        <button onClick={handlesubmit}>
                            {InsuranceClientDonationForm.Code ? "Update" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
            <ModelContainer />
        </>
    )
}

export default InsClientDonationMaster