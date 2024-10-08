import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';


const Apprenewal = () => {
    const [formValues, setFormValues] = useState({
        subscriptionType: "monthly", // default to monthly
        startDate: "",
        duration: "", // holds days, months, or years
        endDate: "",
        status: "", // Active or Inactive
    });
    const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
    const UserData = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const Usersessionid = useSelector((state) => state.userRecord?.Usersessionid);

    const dispatchvalue = useDispatch();

    const [errors, setErrors] = useState({});
    const [appdata, setAppdata] = useState([]);
    const subscriptionOptions = ["monthly", "yearly", "days", "demo"];
    const statusOptions = ["active", "inactive"]; // Status options

    // Utility function to calculate end date
    const calculateEndDate = (startDate, duration, subscriptionType) => {
        if (!startDate || !duration) return ""; // If either is empty, no need to calculate

        const start = new Date(startDate);
        let endDate;

        switch (subscriptionType) {
            case "monthly":
                endDate = new Date(start.setMonth(start.getMonth() + parseInt(duration)));
                break;
            case "yearly":
                endDate = new Date(start.setFullYear(start.getFullYear() + parseInt(duration)));
                break;
            case "days":
                endDate = new Date(start.setDate(start.getDate() + parseInt(duration)));
                break;
            case "demo":
                endDate = new Date(start.setDate(start.getDate() + parseInt(duration)));
                break;
            default:
                break;
        }

        return endDate ? endDate.toISOString().split('T')[0] : ""; // Return date in YYYY-MM-DD format
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => {
            const newValues = { ...prevValues, [name]: value };

            // Calculate end date when startDate or duration changes
            if (name === "startDate" || name === "duration") {
                const endDate = calculateEndDate(newValues.startDate, newValues.duration, newValues.subscriptionType);
                newValues.endDate = endDate;
            }

            return newValues;
        });

        // Perform validation
        if (name === "duration" && isNaN(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                duration: "Invalid",
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "Valid",
            }));
        }
    };

    const handleSubscriptionChange = (e) => {
        const { value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            subscriptionType: value,
            duration: "", // Reset duration when the subscription type changes
            endDate: "",  // Reset end date on subscription type change
        }));
    };

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            status: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (formValues) {
            axios.post(`${UrlLink}Masters/subscribeapp`, formValues, {
                headers: {
                    'Apikey': UserData.api_key,
                    'Apipassword': UserData.api_password,
                    'Sessionid': Usersessionid.session_id
                }
            })
                .then((res) => {
                    console.log(res.data);
                    const { message, success } = res.data
                    dispatchvalue({ type: 'toast', value: { message, type: success } });
                    setFormValues((prevValues) => ({
                        ...prevValues,
                        subscriptionType: "",
                        duration: "",
                        endDate: "",
                        startDate: "",
                        status: "",
                    }));
                })
                .catch(error => {
                    console.error("error occured :", error);
                })
        }

        // Add your form submission logic here
        console.log(formValues);
    };

    useEffect(() => {


        axios.get(`${UrlLink}Masters/subscribeapp`, {
            headers: {
                'Apikey': UserData.api_key,
                'Apipassword': UserData.api_password,
                'Sessionid': Usersessionid.session_id
            }
        })
            .then((res) => {
                console.log(res.data.data)
                setAppdata(res.data.data);  // Set the retrieved data to state
            })
            .catch((error) => {
                console.error("Error occurred:", error);  // Corrected syntax
            });
    }, []);


    const columns = [

        {
            key: "seraialno",
            name: "S_no",
            frozen: true
        },
        {
            key: "subscriptionType",
            name: "Subscription Type",
            frozen: true
        },
        {
            key: "duration",
            name: "Duration",
            frozen: true
        },
        {
            key: "startDate",
            name: "start Date",
            frozen: true
        },
        {
            key: "endDate",
            name: "End Date",
            frozen: true
        }, {
            key: "status",
            name: "Status",
            frozen: true
        },

    ];
    return (
        <>
            <div className="Main_container_app">
                <h3>Software Subscription Setup</h3>
                <br />
                <div className="RegisFormcon">
                    {['subscriptionType', 'duration', ...Object.keys(formValues).filter(field => !['subscriptionType', 'duration', 'endDate', 'status'].includes(field))]
                        .map((field, index) => (
                            <div className="RegisForm_1" key={index}>
                                <label htmlFor={`${field}_${index}`}>
                                    {field === "subscriptionType"
                                        ? "Subscription Type"
                                        : field.charAt(0).toUpperCase() + field.slice(1)}
                                    <span>:</span>
                                </label>
                                {
                                    field === "subscriptionType" ? (
                                        <select
                                            id={`${field}_${index}`}
                                            name={field}
                                            value={formValues[field]}
                                            onChange={handleSubscriptionChange}
                                            required
                                        >
                                            <option value="">Select</option>
                                            {subscriptionOptions.map((option, idx) => (
                                                <option key={idx} value={option}>
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field === "duration" ? (
                                        <input
                                            id={`${field}_${index}`}
                                            type="number"
                                            name={field}
                                            value={formValues[field]}
                                            onChange={handleInputChange}
                                            placeholder={formValues.subscriptionType === "custom" ? "Enter Days" : "Enter Months/Years"}
                                            className={errors[field] === "Invalid" ? "invalid" : errors[field] === "Valid" ? "valid" : ""}
                                            required
                                        />
                                    ) : (
                                        <input
                                            id={`${field}_${index}`}
                                            type={field === "startDate" ? "date" : "text"}
                                            name={field}
                                            value={formValues[field]}
                                            onChange={handleInputChange}
                                            className={errors[field] === "Invalid" ? "invalid" : errors[field] === "Valid" ? "valid" : ""}
                                        />
                                    )
                                }
                            </div>
                        ))}

                    {/* Auto-calculated End Date (Readonly) */}
                    <div className="RegisForm_1">
                        <label htmlFor="endDate">
                            End Date:
                            <span>:</span>
                        </label>
                        <input
                            id="endDate"
                            type="date"
                            name="endDate"
                            value={formValues.endDate}
                            readOnly
                        />
                    </div>

                    {/* Status Field */}
                    <div className="RegisForm_1">
                        <label htmlFor="status">
                            Status:
                            <span>:</span>
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formValues.status}
                            onChange={handleStatusChange}
                            required
                        >
                            <option>select</option>
                            {statusOptions.map((option, idx) => (
                                <option key={idx} value={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="Main_container_Btn">
                        <button type="submit" onClick={handleFormSubmit}>
                            Save
                        </button>
                    </div>
                </div>
                <ToastAlert Message={toast.message} Type={toast.type} />
                <ReactGrid columns={columns} RowData={appdata} />
            </div>
        </>
    );
};

export default Apprenewal;

