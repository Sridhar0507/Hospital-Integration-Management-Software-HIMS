import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';

function Gynecology() {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const dispatch = useDispatch();
  // const UsercreatePatientdata = useSelector(state => state.userRecord?.UsercreatePatientdata);
  const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);

  console.log(DoctorWorkbenchNavigation, 'DoctorWorkbenchNavigation');

  const [formData, setFormData] = useState({
    OH: "",
    MH: "",
    EXAMI: "",
    PS: "",
    PV: "",
  });



  const [gridData, setGridData] = useState([]);
  const [IsGetData, setIsGetData] = useState(false)
  const [IsViewMode, setIsViewMode] = useState(false)

  const Gyneccolumns = [
    { key: 'id', name: 'S.No', frozen: true },
    // { key: 'VisitId', name: 'VisitId', frozen: true },
    // { key: 'PrimaryDoctorId', name: 'Doctor Id', frozen: true },
    { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },
    { key: 'Date', name: 'Date', frozen: true },
    { key: 'Time', name: 'Time', frozen: true },
    // { key: 'OH', name: 'OH' },
    // { key: 'MH', name: 'MH' },
    // { key: 'EXAMI', name: 'EXAMI' },
    // { key: 'PS', name: 'PS' },
    // { key: 'PV', name: 'PV' },
    
    {
      key: 'view',
      name: 'View',
      frozen: true,
      renderCell: (params) => (
        <IconButton onClick={() => handleView(params.row)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];




  useEffect(() => {
    axios.get(`${UrlLink}Workbench/Workbench_Gynecology_Details`, { params: { RegistrationId: DoctorWorkbenchNavigation?.pk } })
      .then((res) => {
        const ress = res.data
        console.log(res);
        setGridData(ress)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [IsGetData, UrlLink, DoctorWorkbenchNavigation])




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleView = (data) => {
    setFormData({
      OH: data.OH || '',
      MH: data.MH || '',
      EXAMI: data.EXAMI || '',
      PS: data.PS || '',
      PV: data.PV || '',
    });
    setIsViewMode(true);
  };

  const handleClear = () => {
    setFormData({
      OH: '',
      MH: '',
      EXAMI: '',
      PS: '',
      PV: '',
    });
    setIsViewMode(false);
  };

  const handleSubmit = () => {

    const filledFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== '')
    );

    if (Object.keys(filledFormData).length === 0) {

      dispatch({
        type: 'toast',
        value: { message: 'Please provide at least one field.', type: 'warn' },
      });
      return; // Exit the function early if no fields are filled

    }
    const data = {
      ...filledFormData,
      created_by: userRecord?.username || '',
      RegistrationId: DoctorWorkbenchNavigation?.pk,

    };
    console.log(data, 'data ');

    axios
      .post(`${UrlLink}Workbench/Workbench_Gynecology_Details`, data)
      .then((res) => {
        const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
        dispatch({ type: 'toast', value: { message, type } });
        setIsGetData(prev => !prev)
        handleClear();
      })
      .catch((err) => console.log(err));


  };



  return (
    <>

      <div className="appointment">
        <h4
          style={{
            color: 'var(--labelcolor)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'start',
            padding: '10px',
          }}
        >
          Gynecology
        </h4>



        <div className="case_sheet_5con">
          {['OH', 'MH', 'EXAMI', 'PS', 'PV'].map((field, indx) => (
            <div className="case_sheet_5con_20" key={indx}>
              <label>
                {field} <span>:</span>
              </label>
              <textarea
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                readOnly={IsViewMode}

              />
            </div>
          ))}
        </div>




      </div>
      <div className="Main_container_Btn">



        {IsViewMode && (
          <button onClick={handleClear}>Clear</button>
        )}
        {!IsViewMode && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>

      {gridData.length > 0 &&
        <ReactGrid columns={Gyneccolumns} RowData={gridData} />
      }

      <ToastAlert Message={toast.message} Type={toast.type} />


    </>
  );
}

export default Gynecology;

