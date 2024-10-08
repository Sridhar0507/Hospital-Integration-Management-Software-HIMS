import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { format } from "date-fns";
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';



const IP_SurgicalHistory = () => {
    const dispatch = useDispatch();
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
    console.log(IP_DoctorWorkbenchNavigation,'IP_DoctorWorkbenchNavigation');
    

    
    const userRecord = useSelector((state) => state.userRecord?.UserData);

    
    const formatLabel = (label) => {

        if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
            return label
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase());
        } else {
            return label;
        }
    };

   

    const [SurgicalHistory, setSurgicalHistory] = useState({
       
        SurgicalProcedure: "",
        DateOfSurgery: "",
        PostOpDate: "",
        MajorSurgicalEvents: "",
        BloodProductsTransfusedDuringSurgery: "",
        NoOfBags: "",
        AnyAdverseReactions: "",
        Remarks: "",
       
    });


    const [gridData, setGridData] = useState([])
    const [IsGetData, setIsGetData] = useState(false)

    const [IsViewMode, setIsViewMode] = useState(false)
  
    const SurgicalHistoryColumns = [
        {
            key: 'id',
            name: 'S.No',
            frozen: true
        },
        { key: 'PrimaryDoctorId', name: 'Doctor Id',frozen: true },
        { key: 'PrimaryDoctorName', name: 'Doctor Name',frozen: true },
      
        {
            key: 'Date',
            name: 'Date',
            frozen: true
        },
        {
            key: 'Time',
            name: 'Time',
            frozen: true
        },
       
        
       
        {
            key: 'view',
            frozen: true,
            name: 'View',
            renderCell: (params) => (
              <IconButton onClick={() => handleView(params.row)}>
                <VisibilityIcon />
              </IconButton>
            ),
          },
        
    ]

     // Handle setting the form data when viewing
     const handleView = (data) => {
        setSurgicalHistory({
            SurgicalProcedure: data.SurgicalProcedure || '',
            DateOfSurgery: data.DateOfSurgery || '',
            PostOpDate: data.PostOpDate || '',
            MajorSurgicalEvents: data.MajorSurgicalEvents || '',
            BloodProductsTransfusedDuringSurgery: data.BloodProductsTransfusedDuringSurgery || '',
            NoOfBags: data.NoOfBags || '',
            AnyAdverseReactions: data.AnyAdverseReactions || '',
            Remarks: data.Remarks || '',
           
            // Createdby: data.Createdby || '',
        });
        setIsViewMode(true);
    };
    
  
  // Handle clearing the form and resetting the view mode
  const handleClear = () => {
    setSurgicalHistory({
        SurgicalProcedure: '',
        DateOfSurgery: '',
        PostOpDate: '',
        MajorSurgicalEvents: '',
        BloodProductsTransfusedDuringSurgery: '',
        NoOfBags: '',
        AnyAdverseReactions: '',
        Remarks: '',
        
    });
    setIsViewMode(false);
};

  

    // useEffect(() => {
    //     axios.get(`${UrlLink}Ip_Workbench/IP_SurgicalHistory_Details_Link`,{params:{RegistrationId:IP_DoctorWorkbenchNavigation?.RegistrationId}})
    //         .then((res) => {
    //             const ress = res.data
    //             console.log(ress)
    //             setGridData(ress)
    
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //   }, [UrlLink,IP_DoctorWorkbenchNavigation,IsGetData])
    
    useEffect(() => {

        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        if (RegistrationId) {
            axios.get(`${UrlLink}Ip_Workbench/IP_SurgicalHistory_Details_Link`, {
                params: {
                    RegistrationId: RegistrationId,
                    DepartmentType: departmentType
                }
            })
            .then((res) => {
                setGridData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [UrlLink, IP_DoctorWorkbenchNavigation, IsGetData]);
    


      const HandleOnChange = (e) => {
        const { name, value } = e.target;
        
        setSurgicalHistory((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    

    const handleSurgicalSubmit = () => {
        
        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const DepartmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        if (!RegistrationId) {
            dispatch({ type: 'toast', value: { message: 'Registration ID is missing', type: 'error' } });
            return;
        }

        const senddata = {
            ...SurgicalHistory,
            RegistrationId,
            Createdby: userRecord?.username,
            DepartmentType,
        };
        console.log(senddata,'senddata');
        

        axios.post(`${UrlLink}Ip_Workbench/IP_SurgicalHistory_Details_Link`, senddata)
            .then((res) => {
                const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
                dispatch({ type: 'toast', value: { message, type } });
                setIsGetData(prev => !prev);
                handleClear();
            })
            .catch((err) => console.log(err));
        
    }


    return (
        <div className='new-patient-registration-form'>
                        <br />

          <div className="RegisFormcon_1" >

              
            {
                Object.keys(SurgicalHistory).map((p, index) =>
                (
                  <div className='RegisForm_1' key={p}>
                    <label htmlFor={`${p}_${index}`}>
                        {formatLabel(p)} <span>:</span>
                    </label>
                    {p === 'DateOfSurgery' ? (
                        <input
                            id={`${p}_${index}`}
                            autoComplete='off'
                            type='date'
                            name={p}
                            value={SurgicalHistory[p]}
                            onChange={HandleOnChange}
                            readOnly={IsViewMode}
                        />
                    ) : p === 'BloodProductsTransfusedDuringSurgery' ? (
                        <select
                            id={`${p}_${index}`}
                            name={p}
                            value={SurgicalHistory[p]}
                            onChange={HandleOnChange}
                            readOnly={IsViewMode}
                            disabled = {IsViewMode}
                        >
                            <option value=''>Select</option>
                            <option value='WholeBlood'>Whole Blood</option>
                            <option value='Plasma'>Plasma</option>
                            <option value='Platelets'>Platelets</option>
                            <option value='RBCs'>RBCs</option>
                        </select>
                    ) : p === 'AnyAdverseReactions' ? (
                        <div className="text_adjust_mt_Ot_rado_0">
                            <input
                                type='radio'
                                id={`${p}_yes_${index}`}
                                name={p}
                                value='Yes'
                                checked={SurgicalHistory[p] === 'Yes'}
                                onChange={HandleOnChange}
                                readOnly={IsViewMode}
                                disabled = {IsViewMode}
                            />
                            <label htmlFor={`${p}_yes_${index}`}>Yes</label>
                            
                            <input
                                type='radio'
                                id={`${p}_no_${index}`}
                                name={p}
                                value='No'
                                checked={SurgicalHistory[p] === 'No'}
                                onChange={HandleOnChange}
                                readOnly={IsViewMode}
                                disabled = {IsViewMode}
                            />
                            <label htmlFor={`${p}_no_${index}`}>No</label>
                        </div>
                    ) : p === 'Remarks' ? (
                        <textarea
                            id={`${p}_${index}`}
                            name={p}
                            value={SurgicalHistory[p]}
                            onChange={HandleOnChange}
                            readOnly={IsViewMode}
                        />
                    ) : (
                        <input
                            id={`${p}_${index}`}
                            autoComplete='off'
                            type='text'
                            name={p}
                            value={SurgicalHistory[p]}
                            onChange={HandleOnChange}
                            readOnly={IsViewMode}

                        />
                    )}
                  </div>
              
                ))
            }
          </div>
          <br />
          <div className="Main_container_Btn">
      
              {IsViewMode && (
                  <button onClick={handleClear}>Clear</button>
              )}
              {!IsViewMode && (
                  <button onClick={handleSurgicalSubmit}>Submit</button>
              )}
          </div>
          <br />

          {gridData.length >= 0 &&
              <ReactGrid columns={SurgicalHistoryColumns} RowData={gridData} />
          }
      
        <ToastAlert Message={toast.message} Type={toast.type} />

      </div>
    )
}


export default IP_SurgicalHistory