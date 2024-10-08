import React, { useState, useEffect,useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import OTpic from "../../Assets/OTpic.jpg";
// import "../IP/ICU_Management/ICU_Doctor/IpPreoperativeIns.css"
import OTpic from "../../Assets/OTpic.jpg";
import html2canvas from "html2canvas";


const IP_NursePreOPIns = () => {
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

 
  const [annotatedImage, setAnnotatedImage] = useState(null); // State for annotated image


  
  const [inputValuesIns, setInputValuesIns] = useState({
    ScalpHair: false,
    Nails: false,
    Givemouth: false,
    Vaginal: false,
    Bowel: false,
    Enema: false,
    secTextArea: "",
    SixTextArea: "",
    SevenTextArea: "",
    ThirdTextArea: "",
    urinaryCatheter: false,
    DutySisterName: "",
    nasogastricTube: false,
    Date: "",
    Time: "",
  });


  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setInputValuesIns((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const handleTextareaChange = (e, fieldName) => {
    const { value } = e.target;
    setInputValuesIns((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  
  const handlecircleClick = (event) => {
    const rect = drawingPadRefcircle.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newCircle = {
      x: x,
      y: y,
      radius: 15, // 3cm radius (1cm ≈ 37.795275591px, so 3cm ≈ 113.3858268px)
      colour: 'red',
      linewidth: 2
    };

    setLines([...lines, newCircle]);
  };


  const [startIV, setStartIV] = useState({
    nilOrallyAfter: {
      value: "",
      period: "am",
    },

    ivDripAt: {
      value: "",
      period: "am",
    },
    ivSiteList: "Select",
    location: "Select",
  });

  const handleInputChange3 = (e, fieldName, nestedField = null) => {
    const { value } = e.target;
    if (nestedField) {
      setStartIV((prevData) => ({
        ...prevData,
        [fieldName]: {
          ...prevData[fieldName],
          [nestedField]: value,
        },
      }));
    } else {
      setStartIV((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  };


  const [gridData, setGridData] = useState([])
  const [IsGetData, setIsGetData] = useState(false)

  const [IsViewMode, setIsViewMode] = useState(false)


  const PreOpInsColumns = [
    {
        key: 'id',
        name: 'S.No',
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
    // { key: 'VisitId', name: 'VisitId',frozen: true },
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
   
   
   
  
    
]

const handleView = (data) => {
    if (!data) {
      console.error("No data provided for view.");
      return;
    }
  
    // Process time fields
    const nilOrallyAfterParts = data.nilOrallyAfter?.split(' ') || ['', 'am'];
    const ivDripAtParts = data.ivDripAt?.split(' ') || ['', 'am'];
  
    // Update startIV state
    setStartIV({
      nilOrallyAfter: {
        value: nilOrallyAfterParts[0],
        period: nilOrallyAfterParts[1] || 'am',
      },
      ivDripAt: {
        value: ivDripAtParts[0],
        period: ivDripAtParts[1] || 'am',
      },
      ivSiteList: data.ivSiteList || 'Select',
      location: data.location || 'Select',
    });
  
    // Update inputValuesIns state
    setInputValuesIns({
      ScalpHair: data.ScalpHair || '',
      Nails: data.Nails || '',
      Givemouth: data.Givemouth || '',
      Vaginal: data.Vaginal || '',
      Bowel: data.Bowel || '',
      Enema: data.Enema || '',
      secTextArea: data.secTextArea || '',
      SixTextArea: data.SixTextArea || '',
      SevenTextArea: data.SevenTextArea || '',
      ThirdTextArea: data.ThirdTextArea || '',
      urinaryCatheter: data.urinaryCatheter || '',
      DutySisterName: data.DutySisterName || '',
      nasogastricTube: data.nasogastricTube || '',
      Date: data.Date || '',
      Time: data.Time || '',
    });
  
    // Display annotated image if available
    if (data.AnnotatedImage) {
      setAnnotatedImage(data.AnnotatedImage);
    } else {
      setAnnotatedImage(null); // Clear the image if not available
    }
  
    // Set view mode
    setIsViewMode(true);
  };

  
  const handleClear = () => {
    // Reset state values to initial or default values
    setStartIV({
      nilOrallyAfter: {
        value: '',
        period: 'am',
      },
      ivDripAt: {
        value: '',
        period: 'am',
      },
      ivSiteList: 'Select',
      location: 'Select',
    });
  
    setInputValuesIns({
      ScalpHair: '',
      Nails: '',
      Givemouth: '',
      Vaginal: '',
      Bowel: '',
      Enema: '',
      secTextArea: '',
      SixTextArea: '',
      SevenTextArea: '',
      ThirdTextArea: '',
      urinaryCatheter: '',
      DutySisterName: '',
      nasogastricTube: '',
      Date: '',
      Time: '',
    });
  
    setAnnotatedImage(null); // Clear the annotated image if present
  
    // Set view mode to false
    setIsViewMode(false);
  };
  

  useEffect(() => {

    const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
    const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;

    if (RegistrationId) {
      axios.get(`${UrlLink}Ip_Workbench/IP_PreOpInstructions_Details_Link`,{
        params:{
          RegistrationId: RegistrationId,
          DepartmentType: departmentType
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
  }, [UrlLink,IP_DoctorWorkbenchNavigation,IsGetData,annotatedImage])


  const [lines, setLines] = useState([]);
  const drawingPadRefcircle = useRef(null);


  const handleSubmit = () => {
    console.log(lines, OTpic, '-------');

    const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
    const DepartmentType = IP_DoctorWorkbenchNavigation?.RequestType;

    if (!RegistrationId) {
        dispatch({ type: 'toast', value: { message: 'Registration ID is missing', type: 'error' } });
        return;
    }

    if (OTpic && lines.length > 0) {
      html2canvas(drawingPadRefcircle.current, { useCORS: true }).then((canvas) => {
        const mergedImage = canvas.toDataURL("image/jpeg");
        console.log("Annotated Image Data URL:", mergedImage);
  
        const formData = new FormData();
        const imageData = mergedImage.split(',')[1];
        formData.append('AnnotatedImage', imageData);

        // formData.append('AnnotatedImage', new Blob([imageData], { type: 'image/jpeg' }), 'annotatedImage.jpg');
  
        const postData = {
            ...inputValuesIns,
            nilOrallyAfter: `${startIV.nilOrallyAfter.value} ${startIV.nilOrallyAfter.period}`,
            ivDripAt: `${startIV.ivDripAt.value} ${startIV.ivDripAt.period}`,
            ivSiteList: startIV.ivSiteList,
            location: startIV.location,
            RegistrationId,
            Createdby: userRecord?.username,
            DepartmentType,
           
          };
  
          // Append each key-value pair from postData to formData
          Object.keys(postData).forEach(key => {
            formData.append(key, postData[key]);
          });
       
        axios.post(`${UrlLink}Ip_Workbench/IP_PreOpInstructions_Details_Link`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
          dispatch({ type: 'toast', value: { message, type } });
          setIsGetData(prev => !prev);
          handleClear();
        })
        .catch((err) => {
          console.error('Submission error:', err);
        });
  
      }).catch((error) => {
        console.error('Error capturing image:', error);
      });
    } else {
      console.warn('OTpic is missing or lines length is zero.');
    }
  };
  


  return (
    <>
         <div className="Main_container_app">


            <div className="Supplier_Master_Container">
            <h4
                style={{
                color: "var(--labelcolor)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "start",
                padding: "10px",
                }}
            >
                Preoperative Intructions
            </h4>

            <div className="OtMangementForm_1 djkwked675 dedwe">
                <label className="jewj33j">Date:</label>
                <input
                type="date"
                value={inputValuesIns.Date}
                disabled = {IsViewMode}
                readOnly={IsViewMode}
                onChange={(e) =>
                    setInputValuesIns((prevData) => ({
                    ...prevData,
                    Date: e.target.value,
                    }))
                }
                />
            </div>
            <div className="OtMangementForm_1 djkwked675 dedwe">
                <label className="jewj33j">Time:</label>
                <input
                type="time"
                value={inputValuesIns.Time}
                readOnly={IsViewMode}
                disabled = {IsViewMode}
                onChange={(e) =>
                    setInputValuesIns((prevData) => ({
                    ...prevData,
                    Time: e.target.value,
                    }))
                }
                />
            </div>

            <div
                className="wdqqwqxxz"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <label>
                <p style={{ marginRight: "10px" }}>1.</p> (a) Prepare the
                following area (mark the area) :
                </label>
                {
                !annotatedImage ?
                    <div className="web_camera_svg" ref={drawingPadRefcircle}>
                    <img src={OTpic} alt="background" />
                    <svg onClick={handlecircleClick}>
                        {lines.map((circle, index) => (
                        <circle
                            key={index}
                            cx={circle.x}
                            cy={circle.y}
                            r={circle.radius}
                            stroke={circle.colour}
                            strokeWidth={circle.linewidth}
                            fill="none"
                        />
                        ))}
                    </svg>
                    </div>
                    :
                
                    <img src={annotatedImage} alt="background" />
                    
                }

            </div>

            <div className="wdqqwqxxz">
                <label>
                <p
                    style={{
                    marginRight: "10px",
                    width: "10px !important",
                    display: "flex",
                    justifyContent: "space-between",
                    }}
                >
                    (b)
                </p>
                <span
                    className="ddddd445"
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    width: "280px",
                    }}
                >
                    Scalp Hair to he covered braided / clipped<span>:</span>
                </span>
                </label>

                <div className="dccffcfc5">
                <label htmlFor="ScalpHair">
                    <input
                    type="checkbox"
                    readOnly={IsViewMode}
                    disabled = {IsViewMode}
                    id="ScalpHair"
                    name="ScalpHair"
                    checked={inputValuesIns.ScalpHair}
                    onChange={handleCheckboxChange}
                    />
                </label>
                </div>
            </div>
            <br />

            <div className="wdqqwqxxz">
                <label>
                <p
                    style={{
                    marginRight: "10px",
                    width: "10px !important",
                    display: "flex",
                    justifyContent: "space-between",
                    }}
                >
                    (c)
                </p>
                <span
                    className="ddddd445"
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    width: "280px",
                    }}
                >
                    {" "}
                    Nails to be cleaned,clipped<span>:</span>
                </span>
                </label>

                <div className="dccffcfc5">
                <label htmlFor="Nails">
                    <input
                    type="checkbox"
                    id="Nails"
                    name="Nails"
                    checked={inputValuesIns.Nails}
                    onChange={handleCheckboxChange}
                    readOnly={IsViewMode}
                    disabled = {IsViewMode}
                    />
                </label>
                </div>
            </div>

            <br />

            <div className="cccccccbbn">
                <div className="wdqqwqxxz">
                <label>
                    <p style={{ marginRight: "10px" }}>2.</p>Give mouth wash
                </label>
                <label htmlFor="Givemouth" className="qwdw33wew2sd">
                    <input
                    type="checkbox"
                    id="Givemouth"
                    name="Givemouth"
                    checked={inputValuesIns.Givemouth}
                    onChange={handleCheckboxChange}
                    readOnly={IsViewMode}
                    disabled = {IsViewMode}
                    />
                </label>
                </div>

                <div className="wdqqwqxxz">
                <label>Vaginal douche</label>
                <label htmlFor="Vaginal" className="qwdw33wew2sd">
                    <input
                    type="checkbox"
                    id="Vaginal"
                    name="Vaginal"
                    checked={inputValuesIns.Vaginal}
                    onChange={handleCheckboxChange}
                    readOnly={IsViewMode}
                    disabled = {IsViewMode}
                    />
                </label>
                </div>

                <div className="wdqqwqxxz">
                <label>Bowel wash</label>
                <label htmlFor="Bowel" className="qwdw33wew2sd">
                    <input
                    type="checkbox"
                    id="Bowel"
                    name="Bowel"
                    checked={inputValuesIns.Bowel}
                    onChange={handleCheckboxChange}
                    readOnly={IsViewMode}
                    disabled = {IsViewMode}
                    />
                </label>
                </div>

                <div className="wdqqwqxxz">
                <label>Enema </label>
                <label htmlFor="Enema" className="qwdw33wew2sd">
                    <input
                    type="checkbox"
                    id="Enema"
                    name="Enema"
                    checked={inputValuesIns.Enema}
                    onChange={handleCheckboxChange}
                    readOnly={IsViewMode}
                    disabled = {IsViewMode}
                    />
                </label>
                </div>
            </div>

            <div className="wdqqwqxxz">
                <textarea
                value={inputValuesIns.secTextArea}
                readOnly={IsViewMode}
                // disabled = {IsViewMode}
                onChange={(e) => handleTextareaChange(e, 'secTextArea')}
                ></textarea>
            </div>

            <div className="cccccccbbn">
                <div className="wdqqwqxxz">
                <label>
                    <p style={{ marginRight: "10px" }}>3.</p> Pass urinary catheter
                </label>
                <label htmlFor="urinaryCatheter" className="qwdw33wew2sd">
                    <input
                    type="checkbox"
                    id="urinaryCatheter"
                    name="urinaryCatheter"
                    readOnly={IsViewMode}
                    disabled = {IsViewMode}
                    checked={inputValuesIns.urinaryCatheter}
                    onChange={handleCheckboxChange}
                    />
                </label>
                </div>

                <div className="wdqqwqxxz">
                <label>nasogastric tube</label>
                <label htmlFor="nasogastricTube" className="qwdw33wew2sd">
                    <input
                    type="checkbox"
                    id="nasogastricTube"
                    readOnly={IsViewMode}
                    disabled = {IsViewMode}
                    name="nasogastricTube"
                    checked={inputValuesIns.nasogastricTube}
                    onChange={handleCheckboxChange}
                    />
                </label>
                </div>
            </div>

            <div className="wdqqwqxxz">
                <textarea
                value={inputValuesIns.ThirdTextArea}
                readOnly={IsViewMode}
                // disabled = {IsViewMode}
                onChange={(e) => handleTextareaChange(e, 'ThirdTextArea')}
                ></textarea>
            </div>




            <div className="cccccccbbn">
                <div className="wdqqwqxxz">
                <label>
                    <p
                    style={{
                        marginRight: "10px",
                        width: "10px !important",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                    >
                    4.
                    </p>
                    <span
                    className="ddddd445"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                        width: "140px",
                    }}
                    >
                    Nil orally after <span>:</span>
                    </span>
                </label>
                <label htmlFor="" className="jyutr">
                    <input
                    type="number"
                    readOnly={IsViewMode}
                // disabled = {IsViewMode}
                    value={startIV.nilOrallyAfter.value}
                    onChange={(e) =>
                        handleInputChange3(e, "nilOrallyAfter", "value")
                    }
                    />
                </label>
                <select
                    value={startIV.nilOrallyAfter.period}
                    readOnly={IsViewMode}
                    disabled = {IsViewMode}
                    onChange={(e) =>
                    handleInputChange3(e, "nilOrallyAfter", "period")
                    }
                >
                    <option>am</option>
                    <option>pm</option>
                </select>
                </div>
            </div>

            <div className="wdqqwqxxz">
                <label>
                <p
                    style={{
                    marginRight: "10px",
                    width: "10px !important",
                    display: "flex",
                    justifyContent: "space-between",
                    }}
                >
                    5.
                </p>{" "}
                <span
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    width: "130px",
                    }}
                >
                    Start IV with Venflo<span>:</span>
                </span>
                </label>
            </div>

            <div className="wdqqwqxxz">
                <label>
                <p
                    style={{
                    marginRight: "10px",
                    width: "10px !important",
                    display: "flex",
                    justifyContent: "space-between",
                    }}
                >
                    (a)
                </p>
                <span
                    className="ddddd445"
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    width: "140px",
                    }}
                >
                    Drip at<span>:</span>
                </span>
                </label>
                <label htmlFor="" className="jyutr">
                <input
                    type="number"
                    readOnly={IsViewMode}
                // disabled = {IsViewMode}
                    value={startIV.ivDripAt.value}
                    onChange={(e) => handleInputChange3(e, "ivDripAt", "value")}
                />
                </label>
                <select
                value={startIV.ivDripAt.period}
                readOnly={IsViewMode}
                disabled = {IsViewMode}
                onChange={(e) => handleInputChange3(e, "ivDripAt", "period")}
                >
                <option>am</option>
                <option>pm</option>
                </select>
            </div>

            <div className="wdqqwqxxz">
                <label>
                <p
                    style={{
                    marginRight: "10px",
                    width: "10px !important",
                    display: "flex",
                    justifyContent: "space-between",
                    }}
                >
                    (b)
                </p>
                <span
                    className="ddddd445"
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    width: "140px",
                    }}
                >
                    IV Site List<span>:</span>
                </span>
                </label>
                <select
                className="jjklkj1"
                value={startIV.ivSiteList}
                readOnly={IsViewMode}
                disabled = {IsViewMode}
                onChange={(e) => handleInputChange3(e, "ivSiteList")}
                >
                <option>Select</option>
                <option>External Jugular</option>
                <option>Subclavian vein</option>
                <option>Femoral vein</option>
                <option>Dorsal Venous Network of Hand</option>
                <option>Radial vein</option>
                <option>Median Cubital vein</option>
                <option>Cephalic vein</option>
                <option>Dorsal Venous Network of Leg</option>
                <option>Saphaneous vein</option>
                <option>Superficial Temporal vein</option>
                </select>
            </div>

            <div className="wdqqwqxxz">
                <label>
                <p
                    style={{
                    marginRight: "10px",
                    width: "10px !important",
                    display: "flex",
                    justifyContent: "space-between",
                    }}
                >
                    (c)
                </p>
                <span
                    className="ddddd445"
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    width: "140px",
                    }}
                >
                    Location<span>:</span>
                </span>
                </label>
                <select
                className="jjklkj1"
                value={startIV.location}
                readOnly={IsViewMode}
                disabled = {IsViewMode}
                onChange={(e) => handleInputChange3(e, "location")}
                >
                <option>Select</option>
                <option>Left</option>
                <option>Right</option>
                </select>
            </div>

            <div className="cccccccbbn">
                <div className="wdqqwqxxz">
                <label>
                    <p style={{ marginRight: "10px" }}>6.</p> Preanaesthetic medication / Anticoagulants / Other Medicines
                </label>

                </div>
            </div>

            <div className="wdqqwqxxz">
                <textarea
                readOnly={IsViewMode}
                // disabled = {IsViewMode}
                value={inputValuesIns.SixTextArea}
                onChange={(e) => handleTextareaChange(e, 'SixTextArea')}

                ></textarea>
            </div>



            <div className="cccccccbbn">
                <div className="wdqqwqxxz">
                <label>
                    <p style={{ marginRight: "10px" }}>7.</p> Send all Records & Reports with the patient to the Operation Room
                </label>

                </div>
            </div>

            <div className="wdqqwqxxz">
                <textarea
                value={inputValuesIns.SevenTextArea}
                readOnly={IsViewMode}
                // disabled = {IsViewMode}
                onChange={(e) => handleTextareaChange(e, 'SevenTextArea')}
                ></textarea>
            </div>

            <div className="OtMangementForm_1 djkwked675 dedwe">
                <label className="jewj33j">Checked by(Duty Sister Name) - </label>
                <input
                type="text"
                style={{ border: "none", borderBottom: "2px solid var(--ProjectColor)", outline: "none" }}
                value={inputValuesIns.DutySisterName}
                readOnly={IsViewMode}
                // disabled = {IsViewMode}
                onChange={(e) =>
                    setInputValuesIns((prevData) => ({
                    ...prevData,
                    DutySisterName: e.target.value,
                    }))
                }
                />
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
                <ReactGrid columns={PreOpInsColumns} RowData={gridData} />
            }
        
            <ToastAlert Message={toast.message} Type={toast.type} />

                
         
            </div>

        </div>
    </>
  )
}

export default IP_NursePreOPIns