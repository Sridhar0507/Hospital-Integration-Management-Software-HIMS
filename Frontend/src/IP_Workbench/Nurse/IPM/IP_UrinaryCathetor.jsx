import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from '../../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';



const IP_UrinaryCathetor = () => {
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

   

    const [UrinaryCathetor, setUrinaryCathetor] = useState({
        Status: "",  
        CathetorFunction: "",
        UrineQuality: "",
        CatheterSite: "",  
        UrinaryCatheterSize: "", 
        Uti: "",  
        Remarks: "",

    });


    const [gridData, setGridData] = useState([])
    const [IsGetData, setIsGetData] = useState(false)

    const [IsViewMode, setIsViewMode] = useState(false)
  
    
      
    const UrinaryCathetorColumns = [
        {
            key: 'id',
            name: 'S.No',
            frozen: true
        },
        { key: 'PrimaryDoctorName', name: 'Doctor Name',frozen: true },
      
        {
            key: 'CurrDate',
            name: 'Date',
            frozen: true
        },
        {
            key: 'CurrTime',
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
        { key: 'Status', name: 'Status' },
        { key: 'CathetorFunction', name: 'Cathetor Function' },
        { key: 'UrineQuality', name: 'Urine Quality'},
        { key: 'CatheterSite', name: 'Catheter Site'},
        { key: 'UrinaryCatheterSize', name: 'Urinary Catheter Size'},
        { key: 'Uti', name: 'Uti'},
        { key: 'Remarks', name: 'Remarks'},

        
    ]

     // Handle setting the form data when viewing
     const handleView = (data) => {
        setUrinaryCathetor({
            CathetorFunction: data.CathetorFunction || '',
            UrineQuality: data.UrineQuality || '',
            CatheterSite: data.CatheterSite || '',
            UrinaryCatheterSize: data.UrinaryCatheterSize || '',
            Status: data.Status || '',
            Uti: data.Uti || '',
            Remarks: data.Remarks || '',
            
        });
        setIsViewMode(true);
    };
    
  
  // Handle clearing the form and resetting the view mode
  const handleClear = () => {
    setUrinaryCathetor({
        CathetorFunction: '',
        UrineQuality: '',
        CatheterSite: '',
        UrinaryCatheterSize: '',
        Status: '',
        Uti: '',
        Remarks: '',
       
    });
    setIsViewMode(false);
};

  

    useEffect(() => {

        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        if (RegistrationId) {
            axios.get(`${UrlLink}Ip_Workbench/IP_UrinaryCathetor_Details_Link`,{
                params:{
                    RegistrationId: RegistrationId,
                    DepartmentType: departmentType,
                    Type: 'Nurse'

                }})
                .then((res) => {
                    const ress = res.data
                    console.log(ress)
                    setGridData(ress)
        
                })
                .catch((err) => {
                    console.log(err);
                })
        }
      }, [UrlLink,IP_DoctorWorkbenchNavigation,IsGetData])
    
    


      const HandleOnChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = value.trim();
        setUrinaryCathetor((prevFormData) => ({
            ...prevFormData,
            [name]: formattedValue,
        }));
    };


    const handleSubmit = () => {
        
        console.log(IP_DoctorWorkbenchNavigation?.RegistrationId);
        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const DepartmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        const senddata={
            ...UrinaryCathetor,
            RegistrationId,
            DepartmentType,
            Createdby:userRecord?.username,
            
            
        }

        console.log(senddata,'senddata');
        
        axios.post(`${UrlLink}Ip_Workbench/IP_UrinaryCathetor_Details_Link`, senddata)
        .then((res) => {
            const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
            dispatch({ type: 'toast', value: { message, type } });
            setIsGetData(prev => !prev);
            handleClear();
            })
        .catch((err) => console.log(err));
        
    }


    return (
        <>
                <div className="RegisFormcon_1">
                <br/>
                    <div className="common_center_tag">
                        <span>Urinary Cathetor</span>
                    </div>
                    {
                        Object.keys(UrinaryCathetor).map((p, index) => (
                            <div className='RegisForm_1' key={p}>
                                {/* Render fields with proper labels */}
                                {p === 'CathetorFunction' ? (
                                    <>
                                        <label htmlFor={`${p}_${index}`}>Catheter Function<span>:</span></label>
                                        <select
                                            id={`${p}_${index}`}
                                            name={p}
                                            value={UrinaryCathetor[p]}
                                            onChange={HandleOnChange}
                                            readOnly={IsViewMode}
                                            disabled = {IsViewMode}
                                        >
                                            <option value="">Select</option>
                                            <option value="Draining">Draining</option>
                                            <option value="Blocked">Blocked</option>
                                        </select>
                                    </>
                                ) : p === 'UrineQuality' ? (
                                    <>
                                        <label htmlFor={`${p}_${index}`}>Urine Quality<span>:</span></label>
                                        <select
                                            id={`${p}_${index}`}
                                            name={p}
                                            value={UrinaryCathetor[p]}
                                            onChange={HandleOnChange}
                                            readOnly={IsViewMode}
                                            disabled = {IsViewMode}
                                        >
                                            <option value="">Select</option>
                                            <option value="Clear">Clear</option>
                                            <option value="Turbid">Turbid</option>
                                            <option value="Bloodstained">Bloodstained</option>
                                            <option value="Hematuria">Hematuria</option>
                                        </select>
                                    </>
                                ) : p === 'CatheterSite' ? (
                                    <>
                                        <label htmlFor={`${p}_${index}`}>Catheter Site<span>:</span></label>
                                        <select
                                            id={`${p}_${index}`}
                                            name={p}
                                            value={UrinaryCathetor[p]}
                                            onChange={HandleOnChange}
                                            readOnly={IsViewMode}
                                            disabled = {IsViewMode}
                                        >
                                            <option value="">Select</option>
                                            <option value="Redness">Redness</option>
                                            <option value="Discoloration">Discoloration</option>
                                            <option value="Swelling">Swelling</option>
                                        </select>
                                    </>
                                ) : p === 'Status' ? (
                                    <>
                                        <label htmlFor={`${p}_${index}`}>Status<span>:</span></label>
                                        <select
                                            id={`${p}_${index}`}
                                            name={p}
                                            value={UrinaryCathetor[p]}
                                            onChange={HandleOnChange}
                                            readOnly={IsViewMode}
                                            disabled = {IsViewMode}
                                        >
                                            <option value="">Select</option>
                                            <option value="Inserted">Inserted</option>
                                            <option value="StatusCheck">StatusCheck</option>
                                            <option value="Removed">Removed</option>
                                        </select>
                                    </>
                                ) : UrinaryCathetor.Status !== 'Inserted' && p === 'Uti' ? (
                                    <>
                                        <label htmlFor={`${p}_${index}`}>UTI <span>:</span></label>
                                        <div className="text_adjust_mt_Ot_rado_0">
                                            <input
                                                type='radio'
                                                id="Uti_Yes"
                                                name="Uti"
                                                value='Yes'
                                                checked={UrinaryCathetor.Uti === 'Yes'}
                                                onChange={HandleOnChange}
                                                readOnly={IsViewMode}
                                                disabled = {IsViewMode}
                                            />
                                            <label htmlFor="Uti_Yes">Yes</label>

                                            <input
                                                type='radio'
                                                id="Uti_No"
                                                name="Uti"
                                                value='No'
                                                checked={UrinaryCathetor.Uti === 'No'}
                                                onChange={HandleOnChange}
                                                readOnly={IsViewMode}
                                                disabled = {IsViewMode}
                                            />
                                            <label htmlFor="Uti_No">No</label>
                                        </div>
                                    </>
                                ) : p === 'Remarks' ? (
                                    <>
                                        <label htmlFor={`${p}_${index}`}>Remarks <span>:</span></label>
                                        <textarea
                                            id={`${p}_${index}`}
                                            name={p}
                                            value={UrinaryCathetor[p]}
                                            onChange={HandleOnChange}
                                            readOnly={IsViewMode}
                                            placeholder='Enter your remarks here'
                                        />
                                    </>
                                ) : p === 'UrinaryCatheterSize' ? (
                                    <>
                                        <label htmlFor={`${p}_${index}`}>Urinary Catheter Size<span>:</span></label>
                                        <input
                                            id={`${p}_${index}`}
                                            name={p}
                                            readOnly={IsViewMode}
                                            value={UrinaryCathetor[p]}
                                            onChange={HandleOnChange}
                                        />
                                    </>
                                ) : null}
                            </div>
                        ))
                    }
                </div>



                <div className="Main_container_Btn">
            
                    {IsViewMode && (
                        <button onClick={handleClear}>Clear</button>
                    )}
                    {!IsViewMode && (
                        <button onClick={handleSubmit}>Submit</button>
                    )}
                </div>

                {gridData.length >= 0 &&
                    <ReactGrid columns={UrinaryCathetorColumns} RowData={gridData} />
                }
            
            <ToastAlert Message={toast.message} Type={toast.type} />

        </>
    )
}


export default IP_UrinaryCathetor;