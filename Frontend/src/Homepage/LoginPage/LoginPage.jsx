import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import DocwithEarth from "../../Assets/DocwithEarth.jpg";
import { FaUser, FaLock, FaEyeSlash } from "react-icons/fa";
import { FaEye, FaLocationDot } from "react-icons/fa6";
import './LoginPage.css';
import dayjs from 'dayjs';
// import ConfirmationModal from './ConfirmationModal';

const LoginPage = () => {
  // States
  const [ClinicDetails, setClinicDetails] = useState(null);
  const [UserValues, setUserValues] = useState({
    UserName: '',
    Password: '',
    Location: '',
    Email: '',
    otp: '',
    user_id: '',
    newPassword: '',
    confirmpassword: ''
  });
  const [Locationoptions, setLocationOptions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);

  // State to store OTP expiration time
  const [otpExpirationTime, setOtpExpirationTime] = useState(null);
  const [expiringSubscriptions, setExpiringSubscriptions] = useState([]);


  const [loadingOtp, setLoadingOtp] = useState(false); // Loader state
  const [receivedotp, setReceivedOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const toast = useSelector(state => state.userRecord?.toast);
  const dispatchvalue = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUserValues((prev) => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  // Fetch clinic details
  useEffect(() => {
    axios.get(`${UrlLink}Masters/Hospital_Detials_link`, {
      headers: {
        'Apikey': '11b8e78a-77f7-4a11-bf8e-48c783214ded',
        'Apipassword': 'v7!yePC1KZX>r#4.=RPC'
      }
    })
      .then((response) => {
        const { hospitalName, hospitalLogo, HospitalId } = response.data;
        if (hospitalName && hospitalLogo && HospitalId) {
          const datass = {
            id: HospitalId,
            Cname: hospitalName,
            Clogo: `data:image/*;base64,${hospitalLogo}`
          };
          setClinicDetails(datass);
        } else {
          setClinicDetails(null);
        }
      })
      .catch((error) => console.error("Error fetching data", error));
  }, [UrlLink]);

  // Fetch location options
  useEffect(() => {
    if (UserValues.UserName.trim() !== '') {
      let timer = setTimeout(() => {
        axios.get(`${UrlLink}Masters/get_Location_data_for_login?username=${UserValues.UserName}`, {
          headers: {
            'Apikey': '11b8e78a-77f7-4a11-bf8e-48c783214ded',
            'Apipassword': 'v7!yePC1KZX>r#4.=RPC'
          }
        })
          .then(response => {
            const data = response.data;
            if (Array.isArray(data)) {
              if (data.length === 1) {
                setUserValues((prev) => ({
                  ...prev,
                  Location: data[0].id
                }));
              }
              setLocationOptions(data);
            } else if (data.message) {

              setLocationOptions([]);
            }
          })
          .catch(error => {
            console.error("Error fetching Location options:", error);
            setLocationOptions([]);
          });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [UserValues.UserName, UrlLink, dispatchvalue]);



  useEffect(() => {
    if (isRecoveringPassword) {
      if (UserValues.UserName.trim() !== '') {
        axios.get(`${UrlLink}Masters/getemail_for_user?username=${UserValues.UserName}`, {
          headers: {
            'Apikey': '11b8e78a-77f7-4a11-bf8e-48c783214ded',
            'Apipassword': 'v7!yePC1KZX>r#4.=RPC'
          }
        })
          .then(response => {
            const getmaildata = response.data;
            if (getmaildata.success) {
              setUserValues((prev) => ({
                ...prev,
                Email: getmaildata.email
              }));
            }
          })
          .catch(error => {
            console.error("Error fetching Email:", error);
          });
      }
    }
  }, [UserValues.UserName, UrlLink, dispatchvalue]);

  // Handle login form submission
  const handleLoginFormSubmit = () => {
    if (!isRecoveringPassword) {
      const { UserName, Password, Location } = UserValues;
      if (UserName && Password && Location) {
        axios.post(`${UrlLink}Masters/login_logic`, { UserName, Password, Location }, {
          headers: {
            'Apikey': '11b8e78a-77f7-4a11-bf8e-48c783214ded',
            'Apipassword': 'v7!yePC1KZX>r#4.=RPC'
          }
        })
          .then(response => {
            console.log(response)
            const { message, token } = response.data;
            if (response.data.success) {
              localStorage.setItem('Chrrtoken', token);
              dispatchvalue({ type: 'toast', value: { message:message, type: 'success' } });
              setTimeout(() => {
                navigate('/Home/DashBoardDetails');
              }, 1000);
            } else {
              dispatchvalue({ type: 'toast', value: { message:message, type: 'warn' } });
            }
          })
          .catch(error => {
            console.error("Login error:", error);
            dispatchvalue({ type: 'toast', value: { message: 'Login failed. Please try again.', type: 'error' } });
          });
      } else {
        dispatchvalue({ type: 'toast', value: { message: 'Please provide all fields: Username, Password, and Location.', type: 'warn' } });
      }
    }
  };

  // Handle OTP request
  const handleSendOTP = (event) => {
    event.preventDefault();
    setLoadingOtp(true);
    const { UserName, Email } = UserValues;
    if (UserName && Email) {
      axios.get(`${UrlLink}Masters/send_otp?username=${UserName}&onemail=${Email}`, {
        headers: {
          'Apikey': '11b8e78a-77f7-4a11-bf8e-48c783214ded',
          'Apipassword': 'v7!yePC1KZX>r#4.=RPC'
        }
      }
      )
        .then(response => {
          const { success, message } = response.data;
          if (success) {
            const currentTime = new Date().getTime(); // Get current time
            const expirationTime = currentTime + 2 * 60 * 1000; // Set expiration time to 5 minutes from now
            setUserValues((prev) => ({
              ...prev,
              user_id: response.data.userid
            }))
            setReceivedOtp(response.data.otp)
            setOtpExpirationTime(expirationTime)
            setOtpSent(true)
            setIsRecoveringPassword(false);
            dispatchvalue({ type: 'toast', value: { message: 'OTP sent successfully', type: 'success' } });
            setLoadingOtp(false); // Stop loader
          } else {
            dispatchvalue({ type: 'toast', value: { message, type: 'warn' } });
          }
          setLoadingOtp(false); // Hide loader after response
        })
        .catch(error => console.error("Error sending OTP:", error));
    } else {
      dispatchvalue({ type: 'toast', value: { message: 'Please provide Username and Email.', type: 'warn' } });
      setLoadingOtp(false); // Hide loader if inputs are missing
    }
  };


  // Save new password to the database
  const handleSavePassword = (event) => {
    const { newPassword, confirmpassword, user_id, otp } = UserValues;
    const currentTime = new Date().getTime(); // Get current time

    // Check if OTP is expired
    if (otpExpirationTime && currentTime > otpExpirationTime) {
      dispatchvalue({ type: 'toast', value: { message: 'OTP has expired. Please request a new one.', type: 'warn' } });
      setTimeout(() => {
        // Change state when OTP is expired
        setIsRecoveringPassword(true); // Enable password recovery mode
        setOtpSent(false); // Disable OTP sent status
        setUserValues(prevState => ({
          ...prevState,
          otp: '',
          newPassword: '',
          confirmpassword: '',
          Location: ''
        }));
      }, 2000);
      return; // Stop execution if OTP is expired
    }

    // Check if OTP is correct
    if (otp !== receivedotp) {
      dispatchvalue({ type: 'toast', value: { message: 'Enter Correct OTP', type: 'warn' } });
      return; // Stop execution if OTP is incorrect
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmpassword) {
      dispatchvalue({ type: 'toast', value: { message: 'Password Mismatch', type: 'warn' } });
      return; // Stop execution if passwords don't match
    }

    // Proceed to save the new password
    event.preventDefault();

    axios.post(`${UrlLink}Masters/save_new_password`, { newPassword, user_id }, {
      headers: {
        'Apikey': '11b8e78a-77f7-4a11-bf8e-48c783214ded',
        'Apipassword': 'v7!yePC1KZX>r#4.=RPC'
      }
    })
      .then(response => {
        const { success, message } = response.data;
        if (success) {
          dispatchvalue({ type: 'toast', value: { message: 'Password updated successfully', type: 'success' } });
          setUserValues(prevState => ({
            ...prevState,
            UserName: '',
            Email: '',
            otp: '',
            newPassword: '',
            confirmpassword: '',
            Location: ''
          }));
          setOtpSent(false); // Reset OTP state
          setIsRecoveringPassword(false);
        } else {
          dispatchvalue({ type: 'toast', value: { message, type: 'warn' } });
        }
      })
      .catch(error => console.error("Error saving password:", error));
  };


  const handleForgotPasswordClick = () => {
    console.log("Forgot Password clicked"); // Check if this is logged
    setIsRecoveringPassword(true);
    setUserValues(prevState => ({
      ...prevState,
      UserName: '',
      Location: ''
    }));
  };

  // const handleConfirm = () => {
  //   setIsRecoveringPassword(true);
  //   setShowModal(false);
  // };

  // const handleCancel = () => {
  //   setShowModal(false);
  // };

  const handleBackToLogin = () => {
    setIsRecoveringPassword(false);
    setLoadingOtp(false);
    setOtpSent(false);
    setUserValues(prevState => ({
      ...prevState,
      UserName: '',
      Email: '',
      otp: '',
      newPassword: '',
      confirmpassword: '',
      Location: ''
    }));// Fetch expiring subscriptions from the Django API
  };



  // Fetch expiring subscriptions from the Django API
  useEffect(() => {
    axios.get(`${UrlLink}Masters/marquerun`, {
      headers: {
        'Apikey': '11b8e78a-77f7-4a11-bf8e-48c783214ded',
        'Apipassword': 'v7!yePC1KZX>r#4.=RPC'
      }
    })
      .then((response) => {
        console.log(response.data.data)
        // Assuming the API response has the data structure with 'data' key containing the result
        setExpiringSubscriptions(response.data.data); // Adjust based on the actual API response
      })
      .catch((error) => {
        console.error('Error fetching subscriptions:', error);
      });

  }, [UrlLink]);

  // Helper function to calculate the difference in days between today and the end date
  const calculateDaysLeft = (endDate) => {
    const today = dayjs();
    const expirationDate = dayjs(endDate);
    return expirationDate.diff(today, 'day');
  };

  // Function to render the message based on subscription type and days left
  const renderMessage = (subscription, daysLeft) => {
    const { subscriptionType, endDate } = subscription;

    if (daysLeft < 0) {
      return `Your subscription has expired. Please renew to continue using our services.`;
    }

    switch (subscriptionType) {
      case 'monthly':
        return `Your monthly subscription will expire in ${daysLeft} days on ${endDate}. Please renew to continue using our services.`;
      case 'yearly':
        return `Your yearly subscription will expire in ${daysLeft} days. Kindly renew by ${endDate}.`;
      case 'custom':
        return `Your custom subscription will expire in ${daysLeft} days. Contact support for renewal before ${endDate}.`;
      case 'demo':
        return `Your demo login will expire in ${daysLeft} days on ${endDate}. Upgrade to a full subscription before it ends.`;
      default:
        return ''; // Fallback in case of an unknown subscription type
    }
  };


  return (
    <>
      <div className="login-page">


        <img src={DocwithEarth} alt="Background" className="background-img_login" />
        <div className="box_login">
          <div className="form_login">
            <div className="login_logo_plo">
              {ClinicDetails?.Clogo && <img src={ClinicDetails?.Clogo} alt={ClinicDetails?.Cname} className="rounded-logo-img" />}
            </div>
            {!otpSent && (
              <div className="inputBox_login">
                <input
                  type="text"
                  id="UserName"
                  name="UserName"
                  onChange={handlechange}
                  required
                  autoFocus
                  value={UserValues.UserName}
                />
                <span><FaUser className="input_oicon_8" />Username</span>
                <i></i>
              </div>
            )}
            {otpSent && (
              <>
                <div className="inputBox_login">
                  <input
                    type="number"
                    id="otp"
                    name="otp"
                    onChange={handlechange}
                    required
                    autoFocus
                    value={UserValues.otp}
                  />
                  <span><FaUser className="input_oicon_8" />OTP</span>
                  <i></i>
                </div>
                <div className="inputBox_login">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    onChange={handlechange}
                    required
                    value={UserValues.newPassword}
                  />
                  <p className="toggle_password22_" onClick={() => setShowPassword2(prev => !prev)}>
                    {showPassword2 ? <FaEye /> : <FaEyeSlash />}
                  </p>
                  <span><FaUser className="input_oicon_8" />New Password</span>
                  <i></i>
                </div>
                <div className="inputBox_login">
                  <input
                    type={showPassword3 ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmpassword"
                    onChange={handlechange}
                    required
                    value={UserValues.confirmpassword}
                  />
                  <p className="toggle_password22_" onClick={() => setShowPassword3(prev => !prev)}>
                    {showPassword3 ? <FaEye /> : <FaEyeSlash />}
                  </p>
                  <span><FaUser className="input_oicon_8" />Confirm Password</span>
                  <i></i>
                </div>
                <div className="links">
                  <p onClick={handleBackToLogin}>Back to Login</p>
                </div>
                <div className="decjjwed8">
                  <button onClick={otpSent ? handleSavePassword : handleLoginFormSubmit}>
                    {otpSent ? 'Save' : 'Login'}</button>
                </div>
              </>
            )}
            {!isRecoveringPassword && !otpSent && (
              <>
                <div className="inputBox_login">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="Password"
                    name="Password"
                    value={UserValues.Password}
                    onChange={handlechange}
                    required
                  />
                  <p className="toggle_password22_" onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </p>
                  <span><FaLock className="input_oicon_8" />Password</span>
                  <i></i>
                </div>

                <div className="inputBox_login">
                  <select
                    id="Location"
                    name="Location"
                    value={UserValues.Location}
                    onChange={handlechange}
                    required
                  >
                    <option value=''>Select </option>
                    {Locationoptions.map((loc, indx) => (
                      <option key={indx} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                  <span><FaLocationDot className="input_oicon_8" />Location</span>
                  <i></i>
                </div>

              </>
            )}

            {isRecoveringPassword && !otpSent && (
              <>
                <div className="inputBox_login">
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    value={UserValues.Email}
                    onChange={handlechange}
                    required
                  />
                  <span><FaUser className="input_oicon_8" />Email</span>
                  <i></i>
                </div>



                <div className="links">
                  {isRecoveringPassword ? (
                    <p onClick={handleBackToLogin}>Back to Login</p >
                  ) : (
                    <p onClick={handleForgotPasswordClick}>Forgot Password ?</p>
                  )}
                </div>
                <br />

                <div className="decjjwed8 dcccd_po_M">
                  <button type='button' onClick={handleSendOTP}>
                    Send OTP
                  </button>
                </div>
                {loadingOtp && (
                  <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                  </div>
                )}
              </>
            )}
            {!isRecoveringPassword && !otpSent && (
              <>
                <div className="links">
                  <p onClick={handleForgotPasswordClick}>Forgot Password?</p>
                </div>
                <div className="decjjwed8">
                  <button onClick={handleLoginFormSubmit}>Login</button>
                </div>
              </>
            )}

          </div>

        </div>

        {/* <ConfirmationModal
          showModal={showModal}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        /> */}

        <ToastAlert Message={toast.message} Type={toast.type} />


      </div>
      <div className="scroll-left">
        {expiringSubscriptions.map((sub, index) => {
          const daysLeft = calculateDaysLeft(sub.endDate);

          // Render only one message per subscription based on its status
          if (daysLeft < 0) {
            return <span key={index}>{renderMessage(sub, daysLeft)}</span>;
          } else if (daysLeft <= 3) {
            return <span key={index}>{renderMessage(sub, daysLeft)}</span>;
          }

          return null; // Skip rendering if the subscription is neither expired nor expiring soon
        })}
      </div>
    </>
  );
};

export default LoginPage;
