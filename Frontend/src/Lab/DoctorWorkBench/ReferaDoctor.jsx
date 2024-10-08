import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';
import ReactGrid from "../OtherComponent/ReactGrid/ReactGrid"


const ReferaDoctor = () => {
  const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);
  console.log("DoctorWorkbenchNavigation", DoctorWorkbenchNavigation)
  const toast = useSelector((state) => state.userRecord?.toast);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  console.log("userRecord", userRecord)
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);

  const dispatchvalue = useDispatch();

  const DoctorID = DoctorWorkbenchNavigation.DoctorName;
  console.log("1234",DoctorID)


  const [formData, setFormData] = useState({
    ReferId: "",
    doctorType: 'InHouse',
    doctorName: '',
    remarks: ''
  });

  const [doctorNames, setDoctorNames] = useState([]);
  const [ReferGet, setReferGet] = useState(false);
  const [ConsultGet,setConsultGet] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };



  useEffect(() => {
    axios.get(`${UrlLink}Masters/inhouse_doctor_details`, {
      params: { Doctortype: formData.doctorType, DoctorID: DoctorID }
    })
      .then((response) => {
        console.log("Response data:", response.data);
        setDoctorNames(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formData.doctorType, DoctorID, UrlLink]);


  const handleSubmitReferDoctor = () => {
    if (formData.doctorName !== "") {
      const data = {
        ...formData,
        created_by: userRecord?.username || "",
        PatientId: DoctorWorkbenchNavigation?.PatientId || "",
        VisitId: DoctorWorkbenchNavigation?.VisitId || "",
        DoctorID: DoctorWorkbenchNavigation?.DoctorName || "",

      };

      axios.post(`${UrlLink}OP/ReferDoctor_Details_link`, data)
        .then((res) => {
          const resData = res.data;
          console.log(resData)
          const type = Object.keys(resData)[0];
          const message = Object.values(resData)[0];
          const tdata = {
            message: message,
            type: type,
          };
          dispatchvalue({ type: "toast", value: tdata });
          setReferGet((prev) => !prev);
          setFormData({
            ReferId: "",
            doctorType: "",
            doctorName: "",
            remarks: "",
          });

        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const tdata = {
        message: "Please select doctorname .",
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  };
 
  useEffect(() => {
    if (DoctorWorkbenchNavigation?.PatientId && DoctorWorkbenchNavigation?.VisitId) {
        axios.get(`${UrlLink}OP/ReferDoctor_Details_link`, {
            params: {
                PatientId: DoctorWorkbenchNavigation.PatientId,
                VisitId: DoctorWorkbenchNavigation.VisitId
            }
        })
        .then((res) => {
            const ress = res.data;
            setConsultGet(ress);
            console.log("getrefer", ress);
        })
        .catch((err) => {
            console.error(err);
        });
    }
}, [ReferGet, UrlLink, DoctorWorkbenchNavigation]);

const ConsultDoctorColumns = [
  {
    key:"id",
    name:"S.No",
    frozen:true,
  },
  {
    key:"PrimaryDoctorName",
    name:"Primary Doctor",
  },
  {
    key:"ReferDoctorName",
    name:"Refering Doctor"
  }
]

  return (
    <>
    
    <div className='new-patient-registration-form'>
<br />
      <div className='RegisFormcon_1'>
        <div className='RegisForm_1'>
          <label htmlFor='doctorType'>Doctor Type<span>:</span></label>
          <select
            id='doctorType'
            name='doctorType'
            value={formData.doctorType}
            onChange={handleInputChange}
          >
            <option value='InHouse'>InHouse</option>
            <option value='Visiting'>Visiting</option>
          </select>
        </div>
        <div className="RegisForm_1">
          <label>
            Doctor Name <span>:</span>
          </label>
          <input
            type="text"
            list="doctorNameOptions"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <datalist id="doctorNameOptions">
            {doctorNames.map((doctor, index) => (
              <option key={index} value={doctor.DoctorID}>
                {`${doctor.DoctorID} - ${doctor.ShortName} (${doctor.SpecialityName})`}
              </option>
            ))}
          </datalist>
        </div>

        <div className='RegisForm_1'>
          <label>
            Remarks <span>:</span>
          </label>
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <br />
      
      <div className="Main_container_Btn">
        <button
          onClick={handleSubmitReferDoctor}
        >
          {formData.ReferId ? "Update" : "Save"}
        </button>

        <ToastAlert Message={toast.message} Type={toast.type} />
      </div>
      {ConsultGet.length > 0 && (
          <ReactGrid columns={ConsultDoctorColumns} RowData={ConsultGet} />
        )}
        </div>
   
    </>
  );
};

export default ReferaDoctor;
