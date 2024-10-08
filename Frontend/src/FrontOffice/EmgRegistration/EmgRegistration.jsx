import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';

const EmgRegistration = () => {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const dispatch = useDispatch();
  const [SpecialityData, setSpecialityData] = useState([]);
  const [PrimaryDocData, setPrimaryDocData] = useState([]);
  const [EmgRegister, setEmgRegister] = useState({
    PatientName: '',
    PhoneNumber: '',
    Specialty: '',
    PrimaryDoctor: '',
    ReferalDoctor: '',
  });

  const formatLabel = (label) => {
    if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
      return label
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^./, (str) => str.toUpperCase());
    } else {
      return label;
    }
  };

  const EmgRegisterColumns = [
    { key: 'id', name: 'S.No', frozen: true },
    { key: 'created_by', name: 'Created By', frozen: true },
    { key: 'Date', name: 'Date', frozen: true },
    { key: 'Time', name: 'Time', frozen: true },
    { key: 'PatientName', name: 'Patient Name' },
    { key: 'PatientPhone', name: 'Phone Number' },
    { key: 'Speciality', name: 'Specialty' },
    { key: 'PrimaryDoctor', name: 'Primary Doctor' },
    { key: 'ReferalDoctor', name: 'Referral Doctor' },
  ];

  const [RegData, setRegData] = useState([])
  const [IsRegDataget, setIsRegDataget] = useState(false)


  useEffect(() => {
    axios.get(`${UrlLink}Frontoffice/Emergency_Registration_Details`)
        .then((res) => {
            const ress = res.data
            setRegData(ress)
        })
        .catch((err) => {
            console.log(err);
        })
}, [IsRegDataget,UrlLink])

  useEffect(() => {
    axios
      .get(`${UrlLink}Masters/Speciality_Detials_link`)
      .then((res) => setSpecialityData(res.data))
      .catch((err) => console.log(err));
  }, [UrlLink]);

  useEffect(() => {
    if (EmgRegister.Specialty){

        axios
        .get(`${UrlLink}Masters/get_Doctor_by_Speciality_Detials?Speciality=${EmgRegister.Specialty}`)
        .then((res) => setPrimaryDocData(res.data))
        .catch((err) => console.log(err));
    }
    
  }, [EmgRegister.Specialty,UrlLink]);

  const handleSubmit = () => {
    if (Object.keys(EmgRegister).filter(p=>!EmgRegister[p])) {
      const data = {
        ...EmgRegister,
        created_by: userRecord?.username || '',
      };

      axios
        .post(`${UrlLink}Frontoffice/Emergency_Registration_Details`, data)
        .then((res) => {
          const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
          dispatch({ type: 'toast', value: { message, type } });
          setIsRegDataget(prev => !prev)
          
          setEmgRegister({
            PatientName: '',
            PhoneNumber: '',
            Specialty: '',
            PrimaryDoctor: '',
            ReferalDoctor: '',
          });
        })
        .catch((err) => console.log(err));
    } else {
      dispatch({
        type: 'toast',
        value: { message: 'Please provide all the fields.', type: 'warn' },
      });
    }
  };

  return (
    <>
      <div className="Main_container_app">
        <h3>Emergency Registration</h3>
        <div className="RegisFormcon_1">
          {Object.keys(EmgRegister).map((field, indx) => (
            <div className="RegisForm_1" key={indx}>
              <label>
                {formatLabel(field)} <span>:</span>
              </label>
              {field === 'Specialty' || field==='PrimaryDoctor'? (
                <select
                  name={field}
                  required
                  value={EmgRegister[field]}
                  onChange={(e) => setEmgRegister((prev) => ({ ...prev, [field]: e.target.value }))}
                >
                  <option value="">Select</option>
                  {field==='Specialty'&&SpecialityData.map((p, index) => (
                    <option key={index} value={p.id}>
                      {p.SpecialityName}
                    </option>
                  ))}
                  {field==='PrimaryDoctor'&&  PrimaryDocData.map((p, index) => (
                    <option key={index} value={p.id}>
                      {p.ShortName}
                    </option>
                  ))}
                </select>
              )  :  (
                <input
                  name={field}
                  required
                  type={field==='PhoneNumber'?'number':'text'}
                  onKeyDown={(e)=>field==='PhoneNumber'&& ['e','E','+','-'].includes(e.key)&&e.preventDefault}
                  value={EmgRegister[field]}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (field === 'PhoneNumber' && value.length > 10) return;
                    setEmgRegister((prev) => ({ ...prev, [field]: value }));
                  }}
                  
                />
              ) }
            </div>
          ))}
        </div>
        <div className="Main_container_Btn">
          <button onClick={handleSubmit}>Add</button>
        </div>
        {RegData.length > 0 &&
            <ReactGrid columns={EmgRegisterColumns} RowData={RegData} />
        }

        <ToastAlert Message={toast.message} Type={toast.type} />
      </div>
    </>
  );
};

export default EmgRegistration;
