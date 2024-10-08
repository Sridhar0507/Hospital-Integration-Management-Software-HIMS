import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import './HospitalDetials.css';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import debounce from 'lodash.debounce';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";


const HospitalDetials = () => {
    const dispatchvalue = useDispatch();
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const ClinicDetails = useSelector(state => state.userRecord?.ClinicDetails);
    const toast = useSelector(state => state.userRecord?.toast);
    const [type, setType] = useState("Intake");
    const [getclinicdata, setgetclinicdata] = useState(false);



    const handleChange = (event) => {
        setType(event.target.value);
    };

    const onImageChange = (e) => {
        const { name, files } = e.target;
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

            } else if (formattedValue.size > maxSize) {
                // Dispatch a warning toast or handle file size validation
                const tdata = {
                    message: 'File size exceeds the limit of 5MB.',
                    type: 'warn'
                };
                dispatchvalue({ type: 'toast', value: tdata });

            } else {

                // Optional: If you want to convert the file to a data URL and dispatch it
                const reader = new FileReader();
                reader.onload = () => {
                    const datass = {
                        ...ClinicDetails,
                        Clogo: reader.result
                    };
                    dispatchvalue({ type: 'ClinicDetails', value: datass });
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
        }
    };


    function b64toBlob(b64Data, contentType = "", sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    const onInsertOrUpdate = () => {
        if (!ClinicDetails?.Cname || !ClinicDetails?.Clogo) {

            const tdata = {
                message: `Please provide both clinic name and image.`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });
            return; // Exit the function early
        }
        const data = new FormData();
        data.append("hospitalName", ClinicDetails.Cname);
        data.append("created_by", userRecord?.username);
        data.append("hospitalId", ClinicDetails?.id);

        const [, base64Data] = ClinicDetails.Clogo.split(",");
        const blob = b64toBlob(base64Data, `image/*`);
        data.append("hospitalLogo", blob);

        axios
            .post(`${UrlLink}Masters/Hospital_Detials_link`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((res) => {
                console.log(res.data);


                const tdata = {
                    message: `Clinic/Hospital Detials Saved/Updated Successfully`,
                    type: 'success'
                }
                dispatchvalue({ type: 'toast', value: tdata });
                const datass = {
                    id: '',
                    Cname: '',
                    Clogo: null
                };
                dispatchvalue({ type: 'ClinicDetails', value: datass });
                setgetclinicdata(prev => !prev);
            })
            .catch((error) => {
                const err = error?.response?.data?.error
                console.log(error?.response?.data);

                const tdata = {
                    message: err?.join(','),
                    type: 'error'
                }
                dispatchvalue({ type: 'toast', value: tdata });

                console.error('Error updating clinic name and logo:', error);
            });
    };

    useEffect(() => {
        axios
            .get(`${UrlLink}Masters/Hospital_Detials_link`)
            .then((response) => {
                if (response.data) {
                    const { hospitalName, hospitalLogo, HospitalId } = response.data;
                    if (hospitalName && hospitalLogo && HospitalId) {
                        const datass = {
                            id: HospitalId,
                            Cname: hospitalName,
                            Clogo: `data:image/*;base64,${hospitalLogo}`
                        };
                        dispatchvalue({ type: 'ClinicDetails', value: datass });
                    } else {
                        console.log('Data is null or incomplete');
                    }
                } else {
                    console.log('Response data is null');
                    const datass = {
                        id: '',
                        Cname: '',
                        Clogo: null
                    };
                    dispatchvalue({ type: 'ClinicDetails', value: datass });
                }
            })
            .catch((error) => console.error('Error fetching data: ', error));
    }, [getclinicdata, dispatchvalue, UrlLink]);

    const gridRef = useRef(null);
    const [ClinicDatas, setClinicDatas] = useState({
        Location: '',
        ClinicId: '',
        Mail: '',
        PhoneNo: '',
        LandlineNo: '',
        GSTNo: '',
        DoorNo: '',
        Street: '',
        Area: '',
        City: '',
        State: '',
        Country: '',
        Pincode: '',
        created_by: '',
    });
    const [errors, setErrors] = useState({});
    const [getcliadddata, setgetcliadddata] = useState(false);
    const [Clinicarray, setClinicarray] = useState([]);
    const [LocationData, setLocationData] = useState([]);
    const handleinpchange = (e) => {
        const { name, value, pattern } = e.target;
        let formattedValue = value?.trim();
        if (name === 'PhoneNo') {
            if (formattedValue.length <= 10) {
                setClinicDatas((prev) => ({
                    ...prev,
                    [name]: value
                }));
            }
        } else if (name === 'LandlineNo') {
            if (formattedValue.length <= 13) {
                setClinicDatas((prev) => ({
                    ...prev,
                    [name]: formattedValue
                }));
            }


        } else if (name === 'Mail') {
            setClinicDatas((prev) => ({
                ...prev,
                [name]: formattedValue.toLowerCase()
            }));
        } else {
            setClinicDatas((prev) => ({
                ...prev,
                [name]: formattedValue
            }));
        }

        const validateField = (value, pattern) => {
            if (!value) {
                return 'Required';
            }
            if (pattern && !new RegExp(pattern).test(value)) {
                return 'Invalid';
            } else {
                return 'Valid';
            }


        };

        const error = validateField(value, pattern);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));

    };

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
        const handleResize = debounce(() => {
            if (gridRef.current) {
                const { clientWidth } = gridRef.current;
                const items = document.querySelectorAll(".RegisForm_1");
                let totalWidth = 0;
                let currentRowItemsCount = 0;

                items.forEach((item) => {
                    const itemStyles = getComputedStyle(item);
                    const itemWidth =
                        item.offsetWidth +
                        parseFloat(itemStyles.marginLeft) +
                        parseFloat(itemStyles.marginRight);

                    if (totalWidth + itemWidth <= clientWidth) {
                        totalWidth += itemWidth;
                        currentRowItemsCount++;
                    }
                });

                const remainingGap = clientWidth - totalWidth;
                const gapBetweenItems = Math.ceil(remainingGap / currentRowItemsCount);
                const container = document.getElementById("RegisFormcon_11");
                if (clientWidth < 620) {
                    container.style.justifyContent = 'center';
                } else {
                    container.style.justifyContent = 'flex-start';
                }
                container.style.columnGap = `${gapBetweenItems}px`;
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
    useEffect(() => {
        axios.get(`${UrlLink}Masters/Location_Detials_link`)
            .then((res) => {
                const ress = res.data
                setLocationData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [UrlLink])
    const handleeditdetials = (params) => {
        console.log((params, '---'));

        setClinicDatas((prev) => ({
            ...prev,
            ClinicId: params.id,
            Mail: params.Mail,
            PhoneNo: params.PhoneNo,
            LandlineNo: params.LandlineNo,
            GSTNo: params.GSTNo,
            DoorNo: params.DoorNo,
            Street: params.Street,
            Area: params.Area,
            City: params.City,
            State: params.State,
            Country: params.Country,
            Pincode: params.Pincode,
            Location: params.location,
            created_by: params.created_by,
        }))
    }
    const handleclinicsubmit = () => {
        const exist = Object.keys(ClinicDatas).filter(p => !['ClinicId', 'created_by', 'Location'].includes(p)).filter(field => !ClinicDatas[field])
        if (exist.length > 0) {
            const tdata = {
                message: `please fill the required field :  ${exist.join(',')}`,
                type: 'warn'
            }
            dispatchvalue({ type: 'toast', value: tdata });

        } else {
            const exist = Object.keys(errors).filter(p => errors[p] === 'Invalid')
            if (exist.length > 0) {

                const tdata = {
                    message: `please fill the field required pattern  :  ${exist.join(',')}`,
                    type: 'warn'
                }
                dispatchvalue({ type: 'toast', value: tdata });

            } else {
                const postdata = {
                    ...ClinicDatas,
                    created_by: ClinicDatas.ClinicId ? ClinicDatas.created_by : userRecord?.username || '',

                }
                console.log('postdata', postdata);
                axios.post(`${UrlLink}Masters/Clinic_Detials_link`, postdata)
                    .then((res) => {
                        const resres = res.data
                        let typp = Object.keys(resres)[0]
                        let mess = Object.values(resres)[0]
                        const tdata = {
                            message: mess,
                            type: typp,
                        }

                        dispatchvalue({ type: 'toast', value: tdata });
                        setgetcliadddata(prev => !prev)
                        setClinicDatas({
                            ClinicId: '',
                            Mail: '',
                            PhoneNo: '',
                            LandlineNo: '',
                            GSTNo: '',
                            DoorNo: '',
                            Street: '',
                            Area: '',
                            City: '',
                            State: '',
                            Country: '',
                            Pincode: '',
                            Location: '',
                            created_by: '',
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
    }

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Clinic_Detials_link`)
            .then((res) => {
                const result = res.data
                setClinicarray(result)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [getcliadddata, UrlLink])
    const columns = [

        {
            key: "id",
            name: "Clinic Id",
            frozen: true
        },
        {
            key: "locationName",
            name: "Location",
            frozen: true
        },
        {
            key: "created_by",
            name: "Created By",
            frozen: true
        },
        ...Object.keys(ClinicDatas).filter(p => !['Location', 'created_by', 'ClinicId'].includes(p)).map(field => ({
            key: field,
            name: formatLabel(field),

        })),
        {
            key: "Action",
            name: "Action",
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => handleeditdetials(params.row)}
                    >
                        <EditIcon className="check_box_clrr_cancell" />
                    </Button>
                </>
            ),
        }
    ];

    return (
        <>
            <div className="Main_container_app">
                <h3>Hospital Detials</h3>
                <ToggleButtonGroup
                    value={type}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton
                        value="Intake"
                        style={{
                            height: "30px",
                            width: "clamp(150px, 25vh, 180px)",
                            backgroundColor:
                                type === "Intake"
                                    ? "var(--selectbackgroundcolor)"
                                    : "inherit",
                        }}
                        className="togglebutton_container"
                    >
                        Logo
                    </ToggleButton>
                    <ToggleButton
                        value="Output"
                        style={{
                            backgroundColor:
                                type === "Output"
                                    ? "var(--selectbackgroundcolor)"
                                    : "inherit",
                            width: "clamp(150px, 25vh, 180px)",
                            height: "30px",
                        }}
                        className="togglebutton_container"
                    >
                        Detials
                    </ToggleButton>
                </ToggleButtonGroup>

                <div className="RegisFormcon" id="RegisFormcon_11" ref={gridRef}>
                    {type === "Intake" &&
                        <>
                            <div className="img_1">
                                <div className="img_2">
                                    {ClinicDetails && ClinicDetails?.Clogo && <img src={ClinicDetails?.Clogo} alt="Clinic Logo" />}
                                </div>
                                <input
                                    type="file"
                                    name="file"
                                    id='Filechoosen'
                                    accept="image/png,image/jpeg"
                                    onChange={onImageChange}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="Filechoosen" className="ImgBtn">
                                    Choose File
                                </label>
                            </div>
                            <div className="inp_1">
                                <label htmlFor="ClinicName">Clinic Name:</label>
                                <input
                                    type="text"
                                    name='ClinicName'
                                    autoComplete='off'
                                    placeholder="Enter the Clinic Name"
                                    value={ClinicDetails?.Cname}
                                    onChange={(e) => {
                                        const datass = {
                                            ...ClinicDetails,
                                            Cname: e.target.value?.toUpperCase()?.trim()
                                        };
                                        dispatchvalue({ type: 'ClinicDetails', value: datass });
                                    }}
                                />
                            </div>
                        </>
                    }
                    {type === "Output" &&
                        Object.keys(ClinicDatas)
                            .filter(p => !['ClinicId', 'created_by'].includes(p))
                            .map((field, index) => (
                                <div className="RegisForm_1" key={index}>
                                    <label htmlFor={`${field}_${index}_${field}`}>
                                        {formatLabel(field)}
                                        <span>:</span>
                                    </label>
                                    {
                                        field === 'Location' ?
                                            <select
                                                id={`${field}_${index}_${field}`}
                                                autoComplete='off'
                                                name={field}
                                                disabled={ClinicDatas.ClinicId}
                                                value={ClinicDatas[field]}
                                                onChange={handleinpchange}
                                            >
                                                <option value=''>Select</option>
                                                {
                                                    LocationData.map((p, index) => (
                                                        <option key={index} value={p.id}>{p.locationName}</option>
                                                    ))
                                                }
                                            </select>
                                            :
                                            <input
                                                id={`${field}_${index}_${field}`}
                                                autoComplete='off'
                                                pattern={
                                                    field === 'Mail' ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" :
                                                        field === 'PhoneNo' ? "\\d{10}" :
                                                            field === 'LandlineNo' ? "\\d{2,4}-\\d{6,8}" :
                                                                field === 'Pincode' ? "\\d{6}" :
                                                                    field === 'DoorNo' ?
                                                                        "[0-9]+" :
                                                                        field==='GSTNo'?
                                                                         "[A-Za-z-0-9]+":
                                                                        "[A-Za-z]+"
                                                }
                                                type={
                                                    field === 'Mail' ? 'email' :
                                                        field === 'PhoneNo' || field === 'Pincode' ? 'number' :
                                                            field === 'LandlineNo' ? 'tel' :
                                                                'text'
                                                }
                                                title={
                                                    field === 'Mail' ? "Format: example@example.com" :
                                                        field === 'PhoneNo' ? "Format: 10 digits" :
                                                            field === 'LandlineNo' ? "Format: 2-4 digits followed by - and 6-8 digits" :
                                                                ""
                                                }
                                                placeholder={field === 'LandlineNo' && 'eg. 001-78347434'}
                                                onKeyDown={(e) => {
                                                    // Allow tab and arrow key presses
                                                    if (e.key === 'Tab' || e.key.includes('Arrow')) return;

                                                    if ( ['PhoneNo','Pincode'].includes(field)  && ['e', 'E', '+', '-'].includes(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                    if (field === 'LandlineNo' && !/^[0-9-]*$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                                                        e.preventDefault();
                                                    }
                                                }}

                                                name={field}
                                                value={ClinicDatas[field]}
                                                onChange={handleinpchange}
                                                required
                                                className={errors[field] === 'Invalid' ? 'invalid' : errors[field] === 'Valid' ? 'valid' : ''}
                                            />
                                    }
                                </div>
                            ))
                    }
                </div>

                <div className="Main_container_Btn">
                    <button onClick={type === 'Intake' ? onInsertOrUpdate : handleclinicsubmit}>
                        {ClinicDatas.ClinicId ? 'Update' : 'Save'}
                    </button>
                </div>
                {type === "Output" &&
                    <ReactGrid columns={columns} RowData={Clinicarray} />
                }
            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
        </>
    );
}

export default HospitalDetials;
