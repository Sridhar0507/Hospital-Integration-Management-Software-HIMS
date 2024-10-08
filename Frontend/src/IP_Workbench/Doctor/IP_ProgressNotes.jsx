import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';

const IP_ProgressNotes = () => {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);

  const dispatch = useDispatch();

  const [IpProgressNotes, setIpProgressNotes] = useState({
    ProgressNotes: "",
    TreatmentNotes: "",
    AdverseEvents: "no", // This will store "yes" or "no"
    colorFlag: "no", // This will store "yes" or "no"
  });

  const [gridData, setGridData] = useState([]);
  const [lastdata, setlastdata] = useState(null);
  const [IsGetData, setIsGetData] = useState(false);
  const [IsViewMode, setIsViewMode] = useState(false);

  const IpProgressNotesColumns = [
    { key: 'id', name: 'S.No', frozen: true },
    { key: 'Date', name: 'Date' },
    { key: 'Time', name: 'Time' },
    { key: 'Type', name: 'Type' },
    { key: 'ProgressNotes', name: 'ProgressNotes' },
    { key: 'TreatmentNotes', name: 'TreatmentNotes' },
    { key: 'AdverseEvents', name: 'AdverseEvents' },
    // { key: 'colorFlag', name: 'colorFlag' },
    {
      key: 'colorFlag',
      name: 'Color Flag',
      renderCell: (params) => {
        // Determine the background color based on the value of colorFlag
        const color = params.row.colorFlag === "yes" ? "orange" : "green";
        
        return (
          <div
            style={{
              backgroundColor: color,
              color: 'white',
              padding: '5px',
              textAlign: 'center',
              borderRadius: '4px',
              minWidth: '60px', // Adjust size as needed
            }}
          >
            {params.row.colorFlag === "yes" ? 'Open' : 'Closed'}
          </div>
        );
      },
    },
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

  // useEffect(() => {
  //   axios.get(`${UrlLink}Ip_Workbench/IP_ProgressNotes_Details_Link`, { params: { RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId } })
  //     .then((res) => {
  //       setGridData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [IsGetData, UrlLink, IP_DoctorWorkbenchNavigation?.RegistrationId]);


  // useEffect(() => {
  //   axios.get(`${UrlLink}Ip_Workbench/IP_ProgressNotes_Details_Link`, { params: { RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId } })
  //     .then((res) => {
  //       const data = res.data;
  
  //       if (data.length > 0) {
  //         // Sort by id or date to get the most recent entry
  //         // Assuming data is sorted by id or use another field to determine the latest entry
  //         const latestEntry = data[data.length - 1]; // Use appropriate logic to get the latest entry
  
  //         // Set grid data
  //         setGridData(data);
          
  //         // Prepopulate IpProgressNotes with the latest entry's AdverseEvents and colorFlag
  //         setIpProgressNotes({
  //           AdverseEvents: latestEntry.AdverseEvents || '',
  //           colorFlag: latestEntry.colorFlag || '',
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [IsGetData, UrlLink, IP_DoctorWorkbenchNavigation?.RegistrationId]);

  

 
  useEffect(() => {
    const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
    const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;

    if (RegistrationId) {
      axios.get(`${UrlLink}Ip_Workbench/IP_ProgressNotes_Details_Link`, { 
        params: { 
          RegistrationId: RegistrationId,
          DepartmentType: departmentType,
          Type:'Doctor'
      
      } })
        .then((res) => {
          const data = res.data;
    
          if (data.length > 0) {
            // Sort by id or another field to get the most recent entry
            const latestEntry = data[data.length - 1]; // Assuming the most recent entry is last
    
            // Set grid data
            setGridData(data);
    
            // Update state based on the latest entry's AdverseEvents and colorFlag
            if (latestEntry.colorFlag === "yes" ) {
              setlastdata(latestEntry)
              setIpProgressNotes({
                AdverseEvents: latestEntry.AdverseEvents || '',
                colorFlag: latestEntry.colorFlag || '',
              });
            } else {
              setlastdata(null)
              setIpProgressNotes({
                AdverseEvents: 'no',
                colorFlag: 'no', // Clear the colorFlag if it is "no"
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
  }, [IsGetData, UrlLink, IP_DoctorWorkbenchNavigation]);
  


  const handleView = (data) => {
    setIpProgressNotes({
      ProgressNotes: data.ProgressNotes || '',
      TreatmentNotes: data.TreatmentNotes || '',
      AdverseEvents: data.AdverseEvents || '',
      colorFlag: data.colorFlag || '', // Assuming you want to prepopulate this too
    });
    setIsViewMode(true);
  };

  const handleClear = () => {
    setIpProgressNotes({
      ProgressNotes: '',
      TreatmentNotes: '',
      AdverseEvents: 'no',
      colorFlag: 'no',
    });
    setIsViewMode(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIpProgressNotes((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'yes' : 'no') : value,
    }));
  };

  const handleSubmit = () => {
    const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
    const DepartmentType = IP_DoctorWorkbenchNavigation?.RequestType;

    if (!RegistrationId) {
      dispatch({ type: 'toast', value: { message: 'Registration ID is missing', type: 'error' } });
      return;
    }
    const data = {
      ...IpProgressNotes,
      RegistrationId,
      DepartmentType,
      Createdby: userRecord?.username,
      Type:'Doctor'
    };
    console.log(data,'data');
    

    axios
      .post(`${UrlLink}Ip_Workbench/IP_ProgressNotes_Details_Link`, data)
      .then((res) => {
        const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
        dispatch({ type: 'toast', value: { message, type } });
        setIsGetData((prev) => !prev);
        handleClear();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="form-section5">
        <br />
        <div className="Otdoctor_intra_Con">
          {[
            { id: "ProgressNotes", label: "Progress Notes", type: "textarea" },
            { id: "TreatmentNotes", label: "Treatment Notes", type: "textarea" },
            { id: "AdverseEvents", label: "Adverse Events", type: "radio" },
            { id: "colorFlag", label: "Is Adverse Open", type: "radio" },
          ].map((field, indx) => (
            <div className="text_adjust_mt_Ot" key={indx}>
              {field.id === "colorFlag" && IpProgressNotes.AdverseEvents !== "yes" ? (
                // Do not render anything if colorFlag should be hidden
                null
              ) : (
             
                <>
                
                  <label htmlFor={field.id}>
                    {field.label} <span>:</span>
                  </label>

                  {field.id === "AdverseEvents" ? (
                <div className="text_adjust_mt_Ot_rado_0">
                      <input
                        type="radio"
                        id={`${field.id}_yes`}
                        name={field.id}
                        value="yes"
                        checked={IpProgressNotes[field.id] === "yes"}
                        onChange={handleChange}
                        disabled={lastdata || IsViewMode}
                      />
                      <label htmlFor={`${field.id}_yes`}>Yes</label>

                      <input
                        type="radio"
                        id={`${field.id}_no`}
                        name={field.id}
                        value="no"
                        disabled={lastdata ||IsViewMode}
                        checked={IpProgressNotes[field.id] === "no"}
                        onChange={handleChange}
                        // disabled={IpProgressNotes.AdverseEvents === "yes"}
                      />
                      <label htmlFor={`${field.id}_no`}>No</label>
                    </div>
                    
                  ) : field.id === "colorFlag" && IpProgressNotes.AdverseEvents === "yes" ? (
                    <>
                      <input
                        type="radio"
                        id={`${field.id}_yes`}
                        name={field.id}
                        value="yes"
                        checked={IpProgressNotes[field.id] === "yes"}
                        onChange={handleChange}
                        disabled={IsViewMode}
                        // disabled={IpProgressNotes.colorFlag === "no"}


                      />
                      <label htmlFor={`${field.id}_yes`}>Yes</label>

                      <input
                        type="radio"
                        id={`${field.id}_no`}
                        name={field.id}
                        value="no"
                        checked={IpProgressNotes[field.id] === "no"}
                        onChange={handleChange}
                        disabled={IsViewMode}
                        // disabled={IpProgressNotes.colorFlag === "no"}

                      />
                      <label htmlFor={`${field.id}_no`}>No</label>
                    </>
                  ) : (
                    field.id !== "colorFlag" && field.id !== "AdverseEvents" && (
                      <textarea
                        id={field.id}
                        name={field.id}
                        value={IpProgressNotes[field.id]}
                        onChange={handleChange}
                        readOnly={IsViewMode}
                      ></textarea>
                    )
                  )}
                </>
              )}
            </div>
          ))}
        </div>


      </div>

      <br />

      <div className="Main_container_Btn">
        {IsViewMode && <button onClick={handleClear}>Clear</button>}
        {!IsViewMode && <button onClick={handleSubmit}>Submit</button>}
      </div>

      {gridData.length > 0 && (
        <ReactGrid columns={IpProgressNotesColumns} RowData={gridData} />
      )}

      <ToastAlert Message={toast.message} Type={toast.type} />
    </>
  );
};

export default IP_ProgressNotes;
