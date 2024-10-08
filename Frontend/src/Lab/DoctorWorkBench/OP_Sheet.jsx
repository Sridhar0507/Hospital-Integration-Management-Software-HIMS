import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ToastAlert from "../OtherComponent/ToastContainer/ToastAlert";
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';

const OP_Sheet = () => {

  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  // const UsercreatePatientdata = useSelector(state => state.userRecord?.UsercreatePatientdata);
  const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);

  const dispatch = useDispatch();


  const [OpSheet, setOpSheet] = useState({
    PresentComplaints: "",
    PastHistory: "",
    Allergies: "",
    Diagnosis: "",
    Treatment: "",
  });

  console.log("opshett", OpSheet);


  const [gridData, setGridData] = useState([]);
  const [IsGetData, setIsGetData] = useState(false)
  const [IsViewMode, setIsViewMode] = useState(false)



  const OPSheetcolumns = [
    { key: 'id', name: 'S.No', frozen: true },
    { key: 'VisitId', name: 'VisitId', frozen: true },
    { key: 'PrimaryDoctorId', name: 'Doctor Id', frozen: true },
    { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },
    { key: 'Date', name: 'Date', frozen: true },
    { key: 'Time', name: 'Time', frozen: true },
    { key: 'PresentComplaints', name: 'Present Complaints' },
    { key: 'PastHistory', name: 'Past History' },
    { key: 'Allergies', name: 'Allergies' },
    { key: 'Diagnosis', name: 'Diagnosis' },
    { key: 'Treatment', name: 'Treatment' },
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
    axios.get(`${UrlLink}Workbench/Workbench_OP_Sheet_Details`, { params: { RegistrationId: DoctorWorkbenchNavigation?.pk } })
      .then((res) => {
        const ress = res.data
        console.log(res);
        setGridData(ress)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [IsGetData, UrlLink])


  const handleView = (data) => {
    setOpSheet({
      PresentComplaints: data.PresentComplaints || '',
      PastHistory: data.PastHistory || '',
      Allergies: data.Allergies || '',
      Diagnosis: data.Diagnosis || '',
      Treatment: data.Treatment || '',
    });
    setIsViewMode(true);
  };

  const handleClear = () => {
    setOpSheet({
      PresentComplaints: '',
      PastHistory: '',
      Allergies: '',
      Diagnosis: '',
      Treatment: '',
    });
    setIsViewMode(false);
  };


  const handleMlcChange = (e) => {
    const { name, value } = e.target;
    setOpSheet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = () => {
    const filledFormData = Object.fromEntries(
      Object.entries(OpSheet).filter(([_, value]) => value.trim() !== '')
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
      RegistrationId: DoctorWorkbenchNavigation?.pk,

      // PatientId: UsercreatePatientdata?.PatientId?.id,
      // PatientName: `${UsercreatePatientdata?.PatientId?.FirstName || ''} ${UsercreatePatientdata?.PatientId?.MiddleName || ''} ${UsercreatePatientdata?.PatientId?.SurName || ''}`,
      created_by: userRecord?.username || '',
    };

    console.log(data, 'data ');

    axios
      .post(`${UrlLink}Workbench/Workbench_OP_Sheet_Details`, data)
      .then((res) => {
        const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
        dispatch({ type: 'toast', value: { message, type } });
        setIsGetData(prev => !prev);
        handleClear();
      })
      .catch((err) => console.log(err));
  };




  return (
    <>
      <div className="form-section5">
        <div className="common_center_tag">
          <h3>Dr Shree Vijay Phadke - OP</h3>
        </div>
        <br />
        <div className="Otdoctor_intra_Con">
          {[
            { id: "PresentComplaints", label: "Present Complaints" },
            { id: "PastHistory", label: "Past History" },
            { id: "Allergies", label: "Allergies" },
            { id: "Diagnosis", label: "Diagnosis" },
            { id: "Treatment", label: "Treatment" },
          ].map((field, indx) => (
            <div className="text_adjust_mt_Ot" key={indx}>
              <label htmlFor={field.id}>
                {field.label} <span>:</span>
              </label>
              <textarea
                id={field.id}
                name={field.id}
                value={OpSheet[field.id]}
                onChange={handleMlcChange}
              ></textarea>
            </div>
          ))}
        </div>
      </div>
      <br />

      <div className="Main_container_Btn">

        {IsViewMode && (
          <button onClick={handleClear}>Clear</button>
        )}
        {!IsViewMode && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>

      {gridData.length > 0 &&
        <ReactGrid columns={OPSheetcolumns} RowData={gridData} />
      }

      <ToastAlert Message={toast.message} Type={toast.type} />



    </>
  );
};

export default OP_Sheet;
