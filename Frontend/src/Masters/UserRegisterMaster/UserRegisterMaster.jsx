import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UserRegisterMaster = () => {
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const userRecord = useSelector(state => state.userRecord?.UserData);
  const toast = useSelector(state => state.userRecord?.toast);
  const UserListId = useSelector(state => state.userRecord?.UserListId);
  const Usercreatedocdata = useSelector(state => state.userRecord?.Usercreatedocdata);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [UserRegister, setUserRegister] = useState({
    UserId: '',
    EmployeeType: '',
    DoctorId: '',
    EmployeeId: '',
    Title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    Email: '',
    PhoneNo: '',
    Gender: '',
    Qualification: '',
    UserName: '',
    roleName: '',
  });
  const [UserRegistershow, setUserRegistershow] = useState([])
  const [RoleNameData, setRoleNameData] = useState([]);

  useEffect(() => {
    axios.get(`${UrlLink}Masters/UserControl_Role_link`)
      .then((res) => {
        const ress = res.data;
        setRoleNameData(ress);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [UrlLink]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserRegister((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const [checkedItems, setCheckedItems] = useState([
    {
      key: '1',
      value: 'A',
      label: 'ClinicMetrics',
      check: false,
      children: []
    },
    {
      key: '2',
      value: 'B',
      label: 'FrontOffice',
      check: false,
      children: [
        { key: '2-1', value: 'B2-1', label: 'AppointmentCalendar', check: false },
        { key: '2-2', value: 'B2-2', label: 'AppoinmentRequest', check: false },
        { key: '2-3', value: 'B2-3', label: 'BookingConfimation', check: false },
        { key: '2-4', value: 'B2-4', label: 'OPRegister', check: false },
        { key: '2-5', value: 'B2-5', label: 'ConcernForms', check: false },
        { key: '2-6', value: 'B2-6', label: 'LabReport', check: false }
      ]
    },
    {
      key: '3',
      value: 'C',
      label: 'Nurse',
      check: false,
      children: [
        { key: '3-1', value: 'C3-1', label: 'ConcernForms', check: false },
        { key: '3-2', value: 'C3-2', label: 'PatientQueueList', check: false }
      ]
    },
    {
      key: '4',
      value: 'D',
      label: 'DoctorWorkbench',
      check: false,
      children: [
        { key: '4-1', value: 'D4-1', label: 'PatientList', check: false },
        { key: '4-2', value: 'D4-2', label: 'PatientQueueList', check: false }
      ]
    },
    {
      key: '5',
      value: 'E',
      label: 'Counselor',
      check: false,
      children: [
        { key: '5-1', value: 'E5-1', label: 'PatientList', check: false },
        { key: '5-2', value: 'E5-2', label: 'AppointmentCalendar', check: false },
        { key: '5-3', value: 'E5-3', label: 'PatientQueueList', check: false },
        { key: '5-4', value: 'E5-4', label: 'CounselorQueueList', check: false }
      ]
    },
    {
      key: '6',
      value: 'F',
      label: 'Therapist',
      check: false,
      children: [
        { key: '6-1', value: 'F6-1', label: 'PatientList', check: false },
        { key: '6-2', value: 'F6-2', label: 'AppointmentCalendar', check: false },
        { key: '6-3', value: 'F6-3', label: 'PatientQueueList', check: false },
        { key: '6-4', value: 'F6-4', label: 'CounselorQueueList', check: false }
      ]
    },
    {
      key: '7',
      value: 'G',
      label: 'Pharmacy',
      check: false,
      children: [
        { key: '7-1', value: 'G7-1', label: 'PharmacyBilling', check: false },
        { key: '7-2', value: 'G7-2', label: 'BillCancellation/Refund', check: false },
        { key: '7-3', value: 'G7-3', label: 'BillingHistory', check: false },
        { key: '7-4', value: 'G7-4', label: 'ShiftClosing', check: false },
        { key: '7-5', value: 'G7-5', label: 'DayClosing', check: false },
        { key: '7-6', value: 'G7-6', label: 'Report', check: false }
      ]
    },
    {
      key: '8',
      value: 'H',
      label: 'Cashier',
      check: false,
      children: [
        { key: '8-1', value: 'H8-1', label: 'Billing', check: false },
        { key: '8-2', value: 'H8-2', label: 'DueHistory', check: false },
        { key: '8-3', value: 'H8-3', label: 'BillCancellation', check: false },
        { key: '8-4', value: 'H8-4', label: 'BillingHistory', check: false },
        { key: '8-5', value: 'H8-5', label: 'ShiftClosing', check: false },
        { key: '8-6', value: 'H8-6', label: 'DayClosing', check: false },
        { key: '8-7', value: 'H8-7', label: 'Report', check: false }
      ]
    },
    {
      key: '9',
      value: 'I',
      label: 'PettyCash',
      check: false,
      children: [
        { key: '9-1', value: 'I9-1', label: 'ExpenseMaster', check: false },
        { key: '9-2', value: 'I9-2', label: 'CashExpenses', check: false },
        { key: '9-3', value: 'I9-3', label: 'DigitalExpenses', check: false },
        { key: '9-4', value: 'I9-4', label: 'ExpensesReport', check: false },
        { key: '9-5', value: 'I9-5', label: 'HandOverSummary', check: false },
        { key: '9-6', value: 'I9-6', label: 'DayReport', check: false }
      ]
    },
    {
      key: '10',
      value: 'J',
      label: 'StockManagement',
      check: false,
      children: [
        { key: '10-1', value: 'J10-1', label: 'QuickStock', check: false },
        { key: '10-2', value: 'J10-2', label: 'Supplierpay', check: false },
        { key: '10-3', value: 'J10-3', label: 'SupplierMaster', check: false },
        { key: '10-4', value: 'J10-4', label: 'ProductMaster', check: false },
        { key: '10-5', value: 'J10-5', label: 'PurchaseMaster', check: false },
        { key: '10-6', value: 'J10-6', label: 'GRN', check: false },
        { key: '10-7', value: 'J10-7', label: 'IndentApprove', check: false },
        { key: '10-8', value: 'J10-8', label: 'GRNApprove', check: false },
        { key: '10-9', value: 'J10-9', label: 'IndentRaise', check: false },
        { key: '10-10', value: 'J10-10', label: 'IndentRecieve', check: false },
        { key: '10-11', value: 'J10-11', label: 'IndentIssue', check: false }
      ]
    },
    {
      key: '11',
      value: 'K',
      label: 'UserControl',
      check: false,
      children: [
        { key: '11-1', value: 'K11-1', label: 'RoleManagement', check: false },
        { key: '11-2', value: 'K11-2', label: 'EmployeeQueueList', check: false },
        { key: '11-3', value: 'K11-3', label: 'UserRegister', check: false },
        { key: '11-4', value: 'K11-4', label: 'RatecardCharges', check: false },
        { key: '11-5', value: 'K11-5', label: 'AccountSettings', check: false },
        { key: '11-6', value: 'K11-6', label: 'ClinicDetails', check: false },
        { key: '11-7', value: 'K11-7', label: 'UserList', check: false },
        { key: '11-8', value: 'K11-8', label: 'LeaveManagement', check: false },
        { key: '11-9', value: 'K11-9', label: 'AdvanceManagement', check: false },
        { key: '11-10', value: 'K11-10', label: 'VisitDoctorBilling', check: false }
      ]
    },
    {
      key: '12',
      value: 'L',
      label: 'HRManagement',
      check: false,
      children: [
        { key: '12-1', value: 'L12-1', label: 'EmployeeRegister', check: false },
        { key: '12-2', value: 'L12-2', label: 'EmployeeList', check: false },
        { key: '12-3', value: 'L12-3', label: 'Attendance', check: false },
        { key: '12-4', value: 'L12-4', label: 'LeaveApproval', check: false },
        { key: '12-5', value: 'L12-5', label: 'AdvanceApproval', check: false },
        { key: '12-6', value: 'L12-6', label: 'PerformanceAppraisal', check: false },
        { key: '12-7', value: 'L12-7', label: 'PerformanceManagement', check: false },
        { key: '12-8', value: 'L12-8', label: 'LeaveManagement', check: false },
        { key: '12-9', value: 'L12-9', label: 'AdvanceManagement', check: false },
        { key: '12-10', value: 'L12-10', label: 'PayRoll', check: false }
      ]
    },
    {
      key: '13',
      value: 'M',
      label: 'VisitingDoctor',
      check: false,
      children: [
        { key: '13-1', value: 'M13-1', label: 'VisitingDoctorPatients', check: false }
      ]
    },
    {
      key: '14',
      value: 'N',
      label: 'EmployeeRequest',
      check: false,
      children: [
        { key: '14-1', value: 'N14-1', label: 'LeaveManagement', check: false },
        { key: '14-2', value: 'N14-2', label: 'AdvanceManagement', check: false }
      ]
    }
  ]);
  const [Locations, setLocations] = useState([])
  const [LocationData, setLocationData] = useState([])
  const [ParentData, setParentData] = useState([])
  const [ChildData, setChildData] = useState([]);


  useEffect(() => {
    axios.get(`${UrlLink}Masters/Location_Detials_link`)
      .then((res) => {
        const ress = res.data
        console.log(ress);
        setLocations(ress)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [UrlLink])


  useEffect(() => {
    if (UserListId && UserListId.UserId) {
      axios.get(`${UrlLink}Masters/Get_User_Detialsby_id?UserId=${UserListId.UserId}`)
        .then((res) => {
          const resss = res.data;
          setUserRegister({
            UserId: resss?.id || '',
            EmployeeType: resss?.EmployeeType || '',
            DoctorId: resss?.DoctorId || '',
            EmployeeId: resss?.EmployeeId || '',
            Title: resss?.Title || '',
            firstName: resss?.firstName || '',
            middleName: resss?.middleName || '',
            lastName: resss?.lastName || '',
            Email: resss?.Email || '',
            PhoneNo: resss?.PhoneNo || '',
            Gender: resss?.Gender || '',
            Qualification: resss?.Qualification || '',
            UserName: resss.UserName || '',
            roleName: resss?.roleName || '',
          });
          const ParentData = resss?.Access?.split(',') || [];
          const ChildData = resss?.SubAccess?.split(',') || [];



          const locData = resss?.Locations || [];
          if (locData.length === 1 && locData[0].Location_Name === 'All') {
            setLocationData([...Locations])
          } else {
            const locationNames = locData.map(loc => loc.Location_Name);
            setLocationData([...locationNames]);
          }


          setCheckedItems((prev) => {
            return prev.map((item) => {
              if (item.children && item.children.length > 0) {
                const updatedChildren = item.children.map((child) => {
                  if (ChildData.includes(child.value)) {
                    return { ...child, check: true };
                  }
                  return child;
                });

                const someval = updatedChildren.some((child) => child.check) || ParentData.includes(item.value);
                console.log(item, '---', someval);
                return { ...item, check: someval, children: updatedChildren };
              } else {
                if (ParentData.includes(item.value)) {
                  return { ...item, check: true };
                }
              }
              return item;
            });
          });
          setChildData(ChildData);
          setParentData(ParentData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (Usercreatedocdata && Usercreatedocdata?.DoctorId) {
      axios.get(`${UrlLink}Masters/get_User_Doctor_Detials?DoctorId=${Usercreatedocdata.DoctorId}`)
      .then(res => {
        const resData = res.data;

        setUserRegister((prev) => ({
          ...prev,
          DoctorId:resData?.id,
          EmployeeId:'',
          EmployeeType: Usercreatedocdata?.Type,
          Title: resData?.Title,
          firstName: resData?.firstName,
          middleName: resData?.middleName,
          lastName: resData?.lastName,
          Email: resData?.Email,
          PhoneNo: resData?.PhoneNo,
          Gender: resData?.Gender,
          Qualification: resData?.Qualification,
  
        }))
      })
      .catch(err=>{
        console.log(err);
      })
      
    } else {
      navigate('/Home/UserRegisterList');
    }
  }, [UserListId, UrlLink, navigate, Locations, Usercreatedocdata]);




  const handlelocationChange = (lname) => {

    setLocationData((prev) => {
      if (!prev.includes(lname)) {
        return [...prev, lname];
      } else {
        return [...prev.filter((value) => value !== lname)]
      }

    });

  }


  const handleParentChange = (index) => {
    setCheckedItems((prev) => {
      const updated = [...prev];
      updated[index].check = !updated[index].check;
      if (updated[index].children.length > 0) {
        updated[index].children.forEach((child) => {
          if (updated[index].check) {
            child.check = true;
            setChildData((prev) => [...prev, child.value]);
          } else {
            child.check = false;
            setChildData((prev) => prev.filter((value) => value !== child.value));
          }
        });
      }
      if (updated[index].check) {
        setParentData((prev) => [...prev, updated[index].value]);
      } else {
        setParentData((prev) => prev.filter((value) => value !== updated[index].value));
      }
      return updated;
    });
  };

  const handleChildChange = (parentIndex, childIndex) => {
    setCheckedItems((prev) => {
      const updated = [...prev];
      updated[parentIndex].children[childIndex].check = !updated[parentIndex].children[childIndex].check;
      if (updated[parentIndex].children[childIndex].check) {
        setChildData((prev) => [...prev, updated[parentIndex].children[childIndex].value]);
      } else {
        setChildData((prev) => prev.filter((value) => value !== updated[parentIndex].children[childIndex].value));
      }
      if (updated[parentIndex].children.some((child) => child.check)) {
        updated[parentIndex].check = true;
        setParentData((prev) => {
          if (!prev.includes(updated[parentIndex].value)) {
            return [...prev, updated[parentIndex].value];
          }
          return prev;
        });
      } else {
        updated[parentIndex].check = false;
        setParentData((prev) => prev.filter((value) => value !== updated[parentIndex].value));
      }
      return updated;
    });
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

  const handleUserRegistersubmit = () => {

    if (Object.keys(UserRegister).filter(p => UserRegister.EmployeeType==='DOCTOR'? !['UserId','EmployeeId'].includes(p) : !['UserId','DoctorId'].includes(p)).filter(value => !UserRegister[value]).length !== 0 || (ChildData.length === 0 || ParentData.length === 0) || LocationData.length === 0) {
      dispatch({ type: 'toast', value: { message: 'Please provide all required fields.', type: 'warn' } });
      
      console.log('gggggg', Object.keys(UserRegister).filter(p => p !== 'UserId').filter(p => UserRegister.EmployeeType==='DOCTOR'? !['UserId','EmployeeId'].includes(p) : !['UserId','DoctorId'].includes(p)).filter(value => !UserRegister[value]));

    } else {
      let locadata = LocationData.join(',')

      const data = {
        ...UserRegister,
        created_by: userRecord?.username || '',
        ChildData: ChildData.join(','),
        ParentData: ParentData.join(','),
        Location: locadata,
    
      };
      axios.post(`${UrlLink}Masters/UserRegister_Detials_link`, data)
        .then((res) => {
          const resData = res.data;
          const mess = Object.values(resData)[0];
          const typp = Object.keys(resData)[0];
          const tdata = { message: mess, type: typp };
          dispatch({ type: 'toast', value: tdata });
          setUserRegister({
            UserId: '', EmployeeType: '',DoctorId: '',
            EmployeeId: '', UserName: '', firstName: '', middleName: '', lastName: '', Title: '', Email: '',
            Password: '', confirmPassword: '', roleName: '', PhoneNo: '', Gender: '',
            Qualification: ''
          });
          navigate('/Home/UserRegisterList')
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  
  useEffect(() => {
    let data = Object.keys(UserRegister).filter(p => !['UserId', 'DoctorId', 'EmployeeId'].includes(p))

    if (UserRegister.EmployeeType === 'DOCTOR') {
      const categoryIndex = data.indexOf('EmployeeType');
      data.splice(categoryIndex + 1, 0, 'DoctorId');
    }
    if (UserRegister.EmployeeType === 'EMPLOYEE') {
      const categoryIndex = data.indexOf('EmployeeType');
      data.splice(categoryIndex + 1, 0, 'EmployeeId');
    }
    setUserRegistershow(data)
  }, [UserRegister])
  return (
    <>
      <div className="Main_container_app">
        <h3>User Register</h3>
        <div className="common_center_tag">
          <span>User Register</span>
        </div>
        <div className="RegisFormcon_1">
          {UserRegistershow.map((field, index) => (
            <div className="RegisForm_1" key={index}>
              <label htmlFor={`${field}_${index}_${field}`}>
                {formatLabel(field)}
                <span>:</span>
              </label>
              {field === 'roleName' ? (
                <select
                  name={field}
                  id={`${field}_${index}_${field}`}
                  value={UserRegister[field] || ''}
                  onChange={handleInputChange}
                >
                  <option value="">select</option>
                  {RoleNameData.filter(p => p.Status === 'Active').map((p, indx) => (
                    <option value={p.Role} key={indx}>{p.Role}</option>
                  ))}
                </select>
              ) : (
                <input
                  // readOnly
                  id={`${field}_${index}_${field}`}
                  autoComplete='off'
                  readOnly={field !== 'UserName'}
                  pattern={
                    field === 'Email' ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" :
                      field === 'PhoneNo' ? "\\d{10}" :
                        field === 'Password' ? "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$" :
                          null
                  }
                  type={
                    field === 'Email' ? 'Email' :
                      field === 'PhoneNo' ? 'tel' :
                        field === 'Password' ? 'password' :
                          'text'
                  }
                  title={
                    field === 'Email' ? "Format: example@example.com" :
                      field === 'PhoneNo' ? "Format: 10 digits only" :
                        field === 'Password' ? "Must contain 8 characters, one uppercase, one lowercase, one number and one special character" :
                          ''
                  }
                  name={field}
                  value={UserRegister[field] || ''}
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}
        </div>
        <div className="DivCenter_container">
          Location Access
        </div>
        <div className="displayuseraccess">
          {
            Locations.map((p, indx) => (
              <div className="displayuseraccess_child">
                <input
                  type="checkbox"
                  id={`${indx}_${p?.locationName}`}
                  checked={LocationData.includes(p?.locationName)}
                  onChange={() => handlelocationChange(p?.locationName)}
                />
                <label htmlFor={`${indx}_${p?.locationName}`} className='par_acc_lab'>{p?.locationName}</label>
              </div>
            ))
          }
        </div>
        <div className="DivCenter_container">
          Access
        </div>
        <div className='displayuseraccess'>

          {checkedItems.map((item, indx) => (
            <div key={indx} className='displayuseraccess_child'>
              <input
                type="checkbox"
                id={item.key}
                checked={item.check}
                onChange={() => handleParentChange(indx)}
              />
              <label htmlFor={item.key} className='par_acc_lab'>{item.label}</label>
              {item.children.map((child, ind1) => (
                <div key={ind1} style={{ marginLeft: "20px", marginTop: '5px' }}>
                  <input
                    type="checkbox"
                    id={child.key}
                    checked={child.check}
                    onChange={() => handleChildChange(indx, ind1)}
                  />
                  <label htmlFor={child.key} className='chi_acc_lab'>{child.label}</label><br />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="Main_container_Btn">
          <button onClick={handleUserRegistersubmit}>{UserRegister?.UserId ? 'Update' : 'Submit'}</button>
        </div>
      </div>
      <ToastAlert Message={toast.message} Type={toast.type} />
    </>
  );
}; 

export default UserRegisterMaster;






















