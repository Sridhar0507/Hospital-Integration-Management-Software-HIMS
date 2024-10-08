import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';
import ModelContainer from '../OtherComponent/ModelContainer/ModelContainer';


const GeneralEvaluation = () => {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const dispatch = useDispatch();
  const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);

  const [GeneralEvaluation, setGeneralEvaluation] = useState({
    cheifComplaint: '',
    History: '',
    Examine: '',
    Diagnosis: '',
    ChooseDocument: null,

  });

  const [gridData, setGridData] = useState([]);
  const [IsGetData, setIsGetData] = useState(false)
  const [IsViewMode, setIsViewMode] = useState(false)

  const Selectedfileview = (fileval) => {
    if (fileval) {
        let tdata = {
            Isopen: false,
            content: null,
            type: "image/jpg",
        };
        if (["data:image/jpeg;base64", "data:image/jpg;base64"].includes(fileval?.split(",")[0])) {
            tdata = {
                Isopen: true,
                content: fileval,
                type: "image/jpeg",
            };
        } else if (fileval?.split(",")[0] === "data:image/png;base64") {
            tdata = {
                Isopen: true,
                content: fileval,
                type: "image/png",
            };
        } else if (fileval?.split(",")[0] === "data:application/pdf;base64") {
            tdata = {
                Isopen: true,
                content: fileval,
                type: "application/pdf",
            };
        }

        dispatch({ type: "modelcon", value: tdata });
    } else {
        const tdata = {
            message: "There is no file to view.",
            type: "warn",
        };
        dispatch({ type: "toast", value: tdata });
    }
};


const handleinpchangeDocumentsForm = (e) => {
  const { name, files } = e.target;

  // Ensure that files exist and are not empty
  if (files && files.length > 0) {
      const formattedValue = files[0];

      // Optional: Add validation for file type and size
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"]; // Example allowed types
      const maxSize = 5 * 1024 * 1024; // Example max size of 5MB
      if (!allowedTypes.includes(formattedValue.type) || formattedValue.type === "") {
          // Dispatch a warning toast or handle file type validation
          const tdata = {
              message: "Invalid file type. Please upload a PDF, JPEG, or PNG file.",
              type: "warn",
          };
          dispatch({ type: "toast", value: tdata });
      } else if (formattedValue.size > maxSize) {
          // Dispatch a warning toast or handle file size validation
          const tdata = {
              message: "File size exceeds the limit of 5MB.",
              type: "warn",
          };
          dispatch({ type: "toast", value: tdata });
      } else {
          const reader = new FileReader();
          reader.onload = () => {
              setGeneralEvaluation(prev => ({
                  ...prev,
                  [name]: reader.result,
              }));
          };
          reader.readAsDataURL(formattedValue);
      }
  } else {
      // Handle case where no file is selected
      const tdata = {
          message: "No file selected. Please choose a file to upload.",
          type: "warn",
      };
      dispatch({ type: "toast", value: tdata });
  }
};

  const GeneralEvaluationColumns = [
    { key: 'id', name: 'S.No', frozen: true },
    { key: 'VisitId', name: 'VisitId', frozen: true },
    { key: 'PrimaryDoctorId', name: 'Doctor Id', frozen: true },
    { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },
    { key: 'Date', name: 'Date', frozen: true },
    { key: 'Time', name: 'Time', frozen: true },
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
    axios.get(`${UrlLink}Workbench/Workbench_GeneralEvaluation_Details`, { params: { RegistrationId: DoctorWorkbenchNavigation?.pk } })
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
    console.log(name, value, '-------');

    setGeneralEvaluation(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleView = (data) => {
    setGeneralEvaluation({
      cheifComplaint: data.cheifComplaint || '',
      History: data.History || '',
      Examine: data.Examine || '',
      Diagnosis: data.Diagnosis || '',
      ChooseDocument: data.ChooseDocument || null,

    });
    setIsViewMode(true);
  };

  const handleClear = () => {
    setGeneralEvaluation({
      cheifComplaint: '',
      History: '',
      Examine: '',
      Diagnosis: '',
      ChooseDocument: null,

    });
    setIsViewMode(false);
  };


  const handleSubmit = async () => {
    const formData = new FormData();
    console.log(FormData,'formData');
    
    formData.append("cheifComplaint", GeneralEvaluation.cheifComplaint);
    formData.append("History", GeneralEvaluation.History);
    formData.append("Examine", GeneralEvaluation.Examine);
    formData.append("Diagnosis", GeneralEvaluation.Diagnosis);
    

    if (GeneralEvaluation.ChooseDocument) {
      formData.append("ChooseDocument", GeneralEvaluation.ChooseDocument);
    }
    console.log(GeneralEvaluation.ChooseDocument);
    

     
    formData.append('RegistrationId', DoctorWorkbenchNavigation?.pk);
    formData.append('Createdby', userRecord?.username);

    try {
      const response = await axios.post(`${UrlLink}Workbench/Workbench_GeneralEvaluation_Details`, formData,{
          headers: {
              'Content-Type': 'multipart/form-data',
          }
      });
      const [type, message] = [Object.keys(response.data)[0], Object.values(response.data)[0]];
      dispatch({ type: 'toast', value: { message, type } });
      setIsGetData(prev => !prev);
      handleClear();
  } catch (error) {
      console.error(error);
  }

   
  };




  return (
    <>
      <div className="appointment">
        <div className="treatcon_body_1 txtWidth">
          <label>
            Cheif Complaint <span>:</span>
          </label>
          <textarea
            id='cheifComplaint'
            name='cheifComplaint'
            value={GeneralEvaluation.cheifComplaint}
            onChange={handleChange}
          />
        </div>
        <div className="treatcon_body_1 txtWidth">
          <label>
            History <span>:</span>
          </label>
          <textarea
            id='History'
            name='History'
            value={GeneralEvaluation.History}
            onChange={handleChange}
          />
        </div>
        <div className="treatcon_body_1 txtWidth">
          <label>
            Examination <span>:</span>
          </label>
          <textarea
            id='Examine'
            name='Examine'
            value={GeneralEvaluation.Examine}
            onChange={handleChange}
          />
        </div>
        <div className="treatcon_body_1 txtWidth">
          <label>
            Diagnosis <span>:</span>
          </label>
          <textarea
            id='Diagnosis'
            name='Diagnosis'
            value={GeneralEvaluation.Diagnosis}
            onChange={handleChange}
          />
        </div>
        <div className="treatcon_body_1 txtWidth">
          <label>
            Choose Document <span>:</span>
          </label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                  type="file"
                  name={'ChooseDocument'}
                  accept="image/jpeg, image/png, application/pdf"
                  required
                  id={'ChooseDocument'}
                  autoComplete="off"
                  onChange={handleinpchangeDocumentsForm}
                  style={{ display: 'none' }}
              />
              <div style={{ width: "150px", display: "flex", justifyContent: "space-around" }}>
                  <label
                      htmlFor={'ChooseDocument'}
                      className="RegisterForm_1_btns choose_file_update"
                  >
                      Choose File
                  </label>
                  <button
                      className="fileviewbtn"
                      onClick={() => Selectedfileview(GeneralEvaluation.ChooseDocument)}
                  >
                      View
                  </button>
              </div>
          </div>
          
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
        <ReactGrid columns={GeneralEvaluationColumns} RowData={gridData} />
      }

      <ToastAlert Message={toast.message} Type={toast.type} />
      <ModelContainer />


    </>




  )
}

export default GeneralEvaluation;