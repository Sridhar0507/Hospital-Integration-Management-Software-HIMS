import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import OTpic from "../../../Assets/OTpic.jpg";
import { useDispatch, useSelector } from "react-redux";
import "./IpPreoperativeIns.css"; // Import CSS file for styling
// import html2canvas from "html2canvas";


const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

function PreOperativeIns() {
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const dispatch = useDispatch();
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const IpNurseQueSelectedRow = {
    Booking_Id: '1001A',  // Replace with actual data or initialize as needed
    PatientId: '1',
    PatientName: 'diya'
  };

  // const IpNurseQueSelectedRow = useSelector((state) => state.InPatients?.IpNurseQueSelectedRow);
  // console.log(IpNurseQueSelectedRow,'IpNurseQueSelectedRow')

  const formData = useSelector((state) => state.userRecord?.workbenchformData);
  console.log(formData, 'kkkkkkkkkkkkkkk')

  const dispatchvalue = useDispatch();

  const [annotations, setAnnotations] = useState([]);
  console.log('annotations', annotations)
  const [currentAnnotationIndex, setCurrentAnnotationIndex] = useState(0);
  const imageRef = useRef();
  const imageWidth = 1000; // Set your image width here
  const imageHeight = 600; // Set your image height here

  const handleAnnotation = (event) => {
    const imageRect = imageRef.current.getBoundingClientRect();
    const offsetX = event.clientX - imageRect.left;
    const offsetY = event.clientY - imageRect.top;
    const x = (offsetX / imageRect.width) * 100;
    const y = (offsetY / imageRect.height) * 100;
    setAnnotations([...annotations, { x, y }]);
  };

  const handleResetAnnotation = () => {
    if (annotations.length === 0) return;
    const newAnnotations = [...annotations];
    newAnnotations.pop();
    setAnnotations(newAnnotations);
    setCurrentAnnotationIndex(
      currentAnnotationIndex > 0 ? currentAnnotationIndex - 1 : 0
    );
  };

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

  console.log(inputValuesIns, 'uuuuuuuuuuuu')



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

  console.log(startIV, 'startIV')

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

  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);
  const componentRef = useRef();

  const handlePrint2 = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: async () => {
      // Additional action after printing, if needed
    },
  });

  const Submitalldata = () => {
    setIsPrintButtonVisible(false);
    setTimeout(() => {
      handlePrint2();
      // handleSubmit();
      setIsPrintButtonVisible(true); // Resetting print button visibility
    }, 500); // Adjust delay as needed
  };

  const [clinicName, setClinicName] = useState("");
  const [clinicLogo, setClinicLogo] = useState(null);
  const [location, setLocation] = useState("");


  const [PreOpGet, setPreOpGet] = useState(false);


  const [annotatedImage, setAnnotatedImage] = useState(null); // State for annotated image


  useEffect(() => {
    if (IpNurseQueSelectedRow?.Booking_Id) {
      axios.get(`${UrlLink}IP/Ward_PreOpInstructions_Details_Link?Booking_Id=${IpNurseQueSelectedRow.Booking_Id}`)
        .then((response) => {
          const data = response.data[0]; // Assuming it returns an array with a single object
          console.log("Fetched data:", data);

          const nilOrallyAfterParts = data?.nilOrallyAfter?.split(' ') || ['', 'am'];
          const ivDripAtParts = data?.ivDripAt?.split(' ') || ['', 'am'];

          setStartIV({
            nilOrallyAfter: {
              value: nilOrallyAfterParts[0],
              period: nilOrallyAfterParts[1] || 'am',
            },
            ivDripAt: {
              value: ivDripAtParts[0],
              period: ivDripAtParts[1] || 'am',
            },
            ivSiteList: data?.ivSiteList || 'Select',
            location: data?.location || 'Select',
          });

          setInputValuesIns({
            ScalpHair: data?.ScalpHair || '',
            Nails: data?.Nails || '',
            Givemouth: data?.Givemouth || '',
            Vaginal: data?.Vaginal || '',
            Bowel: data?.Bowel || '',
            Enema: data?.Enema || '',
            secTextArea: data?.secTextArea || '',
            SixTextArea: data?.SixTextArea || '',
            SevenTextArea: data?.SevenTextArea || '',
            ThirdTextArea: data?.ThirdTextArea || '',
            urinaryCatheter: data?.urinaryCatheter || '',
            DutySisterName: data?.DutySisterName || '',
            nasogastricTube: data?.nasogastricTube || '',
            Date: data?.Date || '',
            Time: data?.Time || '',
          });

          // Display annotated image if available
          if (data?.AnnotatedImage) {
            setAnnotatedImage(data.AnnotatedImage); // Assuming you have a state variable for annotated image
          }

        })
        .catch((error) => {
          console.log('Error fetching data:', error);
        })
        .finally(() => {
          setPreOpGet(false);
        });
    }
  }, [IpNurseQueSelectedRow?.Booking_Id, PreOpGet, annotatedImage]);

  // const [formData, setWorkbenchFormData] = useState({
  //   SerialNo: "",
  //   PatientID: "",
  //   AppointmentID: "",
  //   visitNo: "",
  //   firstName: "",
  //   lastName: "",
  //   AppointmentDate: "",
  //   Complaint: "",
  //   PatientPhoto: "",
  //   DoctorName: "",
  //   Age: "",
  //   Gender: "",
  //   Location: "",
  // });

  // console.log(formData,'formData')

  useEffect(() => {
    dispatchvalue({
      type: "formData",
      value: formData,
    });
  }, [formData, dispatchvalue]);











  const [lines, setLines] = useState([]);
  const drawingPadRefcircle = useRef(null);

  const handleSubmit = () => {
    console.log(lines, OTpic, '-------');
    // if (OTpic && lines.length > 0) {
    //   // Capture the contents of the drawingPadRefcircle (both image and SVG)
    //   html2canvas(drawingPadRefcircle.current, { useCORS: true }).then((canvas) => {
    //     const mergedImage = canvas.toDataURL("image/jpeg");
    //     console.log("Annotated Image Data URL:", mergedImage);
    //     const formData = new FormData();
    //     const imageData = mergedImage.split(',')[1];
    //     formData.append('AnnotatedImage', imageData);

    //     // Prepare postData including annotated image
    //     const postData = {
    //       ...inputValuesIns,
    //       nilOrallyAfter: `${startIV.nilOrallyAfter.value} ${startIV.nilOrallyAfter.period}`,
    //       ivDripAt: `${startIV.ivDripAt.value} ${startIV.ivDripAt.period}`,
    //       ivSiteList: startIV.ivSiteList,
    //       location: startIV.location,
    //       Patient_Id: IpNurseQueSelectedRow?.PatientId,
    //       PatientName: IpNurseQueSelectedRow?.PatientName,
    //       Booking_Id: IpNurseQueSelectedRow?.Booking_Id,
    //       Location: userRecord?.location || 'chennai',
    //       CapturedBy: userRecord?.username,
    //     };

    //     // Append each key-value pair from postData to formData
    //     Object.keys(postData).forEach(key => {
    //       formData.append(key, postData[key]);
    //     });

    //     axios.post(`${UrlLink}IP/Ward_PreOpInstructions_Details_Link`, formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data", // Ensure correct content type
    //       },
    //     })
    //       .then((res) => {
    //         console.log(res);
    //         const resData = res.data;
    //         const type = Object.keys(resData)[0];
    //         const message = Object.values(resData)[0];
    //         const toastData = {
    //           message: message,
    //           type: type,
    //         };
    //         dispatch({ type: 'toast', value: toastData });
    //         setPreOpGet(true);
    //       })
    //       .catch((error) => {
    //         console.error('Error submitting data:', error);
    //         // Handle error, e.g., show error message
    //       });

    //   });
    // }
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

  console.log(lines, '-----');

  return (
    <>
      {isPrintButtonVisible ? (
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
                  />
                </label>
              </div>
            </div>

            <div className="wdqqwqxxz">
              <textarea
                value={inputValuesIns.secTextArea}
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
                    value={startIV.nilOrallyAfter.value}
                    onChange={(e) =>
                      handleInputChange3(e, "nilOrallyAfter", "value")
                    }
                  />
                </label>
                <select
                  value={startIV.nilOrallyAfter.period}
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
                  value={startIV.ivDripAt.value}
                  onChange={(e) => handleInputChange3(e, "ivDripAt", "value")}
                />
              </label>
              <select
                value={startIV.ivDripAt.period}
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
                onChange={(e) => handleTextareaChange(e, 'SevenTextArea')}
              ></textarea>
            </div>

            <div className="OtMangementForm_1 djkwked675 dedwe">
              <label className="jewj33j">Checked by(Duty Sister Name) - </label>
              <input
                type="text"
                style={{ border: "none", borderBottom: "2px solid var(--ProjectColor)", outline: "none" }}
                value={inputValuesIns.DutySisterName}
                onChange={(e) =>
                  setInputValuesIns((prevData) => ({
                    ...prevData,
                    DutySisterName: e.target.value,
                  }))
                }
              />
            </div>

            {/* <div className="cccccccbbn">
                    <label className="wdqqwqxxz">Checked by(Duty Sister Name) - </label>
                    <input
                        type="text"
                        style={{ border: "none", borderBottom: "1px solid var(--ProjectColor)", outline: "none" }}
                        value={inputValuesIns.DutySisterName}
                        onChange={(e) =>
                            setInputValuesIns((prevData) => ({
                            ...prevData,
                            DutySisterName: e.target.value,
                        }))
                        }
                    />
                </div> */}

            {isPrintButtonVisible && (
              <>
                <div className="Main_container_Btn">
                  <button className="RegisterForm_1_btns" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
                <div className="Main_container_Btn">
                  <button className="RegisterForm_1_btns" onClick={Submitalldata}>
                    Print
                  </button>
                </div>
              </>
            )}
          </div>

        </div>

      ) :



        (
          <>
            <PrintContent
              ref={componentRef}
              style={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
              }}


            //   willReadFrequently={true}
            >
              <div className="Print_ot_all_div" id="reactprintcontent">

                <div className="new-patient-registration-form ">
                  <div>
                    <div className="paymt-fr-mnth-slp">
                      <div className="logo-pay-slp">
                        <img src={clinicLogo} alt="" />
                      </div>
                      <div>
                        <h2>
                          {clinicName} ({location})
                        </h2>
                      </div>
                    </div>

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
                      Nurse
                    </h4>
                  </div>

                  {/* data fetch from doctor workbench */}

                  {/* <div className="dctr_info_up_head Print_ot_all_div_second2">
                  <div className="RegisFormcon ">
                    <div className="dctr_info_up_head22">
                      {formData.PatientPhoto ? (
                        <img
                          src={formData.PatientPhoto}
                          alt="Patient Photo"
                        />
                      ) : (
                        <img src={bgImg2} alt="Default Patient Photo" />
                      )}
                      <label>Profile</label>
                    </div>
                  </div>

                  <div className="RegisFormcon">
                    <div className="RegisForm_1 ">
                      <label htmlFor="FirstName">
                        Patient Name <span>:</span>{" "}
                      </label>

                      <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                        {formData.firstName +
                          " " +
                          formData.lastName}{" "}
                      </span>
                    </div>
                    <div className="RegisForm_1 ">
                      <label htmlFor="FirstName">
                        Patient ID <span>:</span>
                      </label>

                      <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                        {formData.PatientID}{" "}
                      </span>
                    </div>

                    <div className="RegisForm_1 ">
                      <label htmlFor="FirstName">
                        Age <span>:</span>{" "}
                      </label>

                      <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                        {formData.Age}{" "}
                      </span>
                    </div>
                    <div className="RegisForm_1 ">
                      <label htmlFor="FirstName">
                        Gender <span>:</span>{" "}
                      </label>

                      <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                        {formData.Gender}{" "}
                      </span>
                    </div>
                    <div className="RegisForm_1 ">
                      <label htmlFor="FirstName">
                        Primary Doctor <span>:</span>{" "}
                      </label>

                      <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                        {formData.DoctorName}{" "}
                      </span>
                    </div>
                    <div className="RegisForm_1 ">
                      <label htmlFor="FirstName">
                        Location <span>:</span>{" "}
                      </label>

                      <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                        {formData.Location}{" "}
                      </span>
                    </div>
                  </div>
                </div> */}
                </div>

                <div className="Supplier_Master_Container">
                  <div className="Print_ot_all_div_rfve">
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
                      
                        <img src={annotatedImage} style={{width:'80%'}} alt="background" />

                      


                      {/* <div className="image-container">
                        <img
                          src={OTpic}
                          alt="PHOTO"
                          className="image_ANNNNT"
                          ref={imageRef}
                        />
                        <div className="annotation-overlay" onClick={handleAnnotation}>
                        
                          {annotations.map((annotation, index) => (
                            <div
                              key={index}
                              className="annotation"
                              style={{
                                left: `${annotation.x}%`,
                                top: `${annotation.y}%`,
                              }}
                            />
                          ))}
                        </div>
                    
                        <div className="annotation-buttons">
                          <button onClick={handleResetAnnotation}>
                            <FontAwesomeIcon icon={faUndo} />
                          </button>
                        </div>
                      </div> */}


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
                          />
                        </label>
                      </div>
                    </div>
                    <br />
                    <div className="wdqqwqxxz">
                      <textarea
                        value={inputValuesIns.secTextArea}
                        onChange={(e) => handleTextareaChange(e, 'secTextArea')}
                      ></textarea>
                    </div>

                    <br />

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
                        onChange={(e) => handleTextareaChange(e, 'ThirdTextArea')}
                      ></textarea>
                    </div>


                    {/* <div className="cccccccbbn">
                    <div className="wdqqwqxxz">
                      <label>
                        <p style={{ marginRight: "10px" }}>3.</p> Pass urinary catheter
                      </label>
                      <label htmlFor="urinaryCatheter" className="qwdw33wew2sd">
                        <input
                          type="checkbox"
                          id="urinaryCatheter"
                          name="urinaryCatheter"
                          checked={selectedOption.selectedOption === "urinaryCatheter"}
                          onChange={() => handleCheckboxChange2("urinaryCatheter")}
                        />
                      </label>
                    </div>

                    <div className="wdqqwqxxz">
                      <label>nasogastric tube</label>
                      <label htmlFor="nasogastricTube" className="qwdw33wew2sd">
                        <input
                          type="checkbox"
                          id="nasogastricTube"
                          name="nasogastricTube"
                          checked={selectedOption.selectedOption === "nasogastricTube"}
                          onChange={() => handleCheckboxChange2("nasogastricTube")}
                        />
                      </label>
                    </div>
                  </div> */}


                    {/* <br />
                  <div className="wdqqwqxxz">
                    <textarea
                      value={inputValuesIns.textareaValuePass}
                      onChange={(e) => handleTextareaChange(e, 'textareaValuePass')}
                    ></textarea>
                  </div> */}

                    <br />

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
                            value={startIV.nilOrallyAfter.value}
                            onChange={(e) =>
                              handleInputChange3(e, "nilOrallyAfter", "value")
                            }
                          />
                        </label>
                        <select
                          value={startIV.nilOrallyAfter.period}
                          onChange={(e) =>
                            handleInputChange3(e, "nilOrallyAfter", "period")
                          }
                        >
                          <option>am</option>
                          <option>pm</option>
                        </select>
                      </div>
                    </div>
                    <br />

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
                    </div>
                    <br />

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
                            value={startIV.ivDripAt.value}
                            onChange={(e) => handleInputChange3(e, "ivDripAt", "value")}
                          />
                        </label>
                        <select
                          value={startIV.ivDripAt.period}
                          onChange={(e) => handleInputChange3(e, "ivDripAt", "period")}
                        >
                          <option>am</option>
                          <option>pm</option>
                        </select>
                      </div>
                    </div>
                    <br />

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
                    </div>
                    <br />

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
                          onChange={(e) => handleInputChange3(e, "location")}
                        >
                          <option>Select</option>
                          <option>Left</option>
                          <option>Right</option>
                        </select>
                      </div>
                    </div>
                    <br />
                    <br />
                    <div className="cccccccbbn">
                      <div className="wdqqwqxxz">
                        <label>
                          <p style={{ marginRight: "10px" }}>6.</p> Preanaesthetic medication / Anticoagulants / Other Medicines
                        </label>

                      </div>
                    </div>
                    <br />


                    <div className="wdqqwqxxz">
                      <textarea
                        value={inputValuesIns.SixTextArea}
                        onChange={(e) => handleTextareaChange(e, 'SixTextArea')}

                      ></textarea>
                    </div>


                    <br />
                    <br />

                    <div className="cccccccbbn">
                      <div className="wdqqwqxxz">
                        <label>
                          <p style={{ marginRight: "10px" }}>7.</p> Send all Records & Reports with the patient to the Operation Room
                        </label>

                      </div>
                    </div>
                    <br />
                    <div className="wdqqwqxxz">
                      <textarea
                        value={inputValuesIns.SevenTextArea}
                        onChange={(e) => handleTextareaChange(e, 'SevenTextArea')}
                      ></textarea>
                    </div>

                    <div className="OtMangementForm_1 djkwked675 dedwe">
                      <label className="jewj33j">Checked by(Duty Sister Name) - </label>
                      <input
                        type="text"
                        style={{ border: "none", borderBottom: "2px solid var(--ProjectColor)", outline: "none" }}
                        value={inputValuesIns.DutySisterName}
                        onChange={(e) =>
                          setInputValuesIns((prevData) => ({
                            ...prevData,
                            DutySisterName: e.target.value,
                          }))
                        }
                      />
                    </div>







                  </div>
                </div> </div>
            </PrintContent>

            {/* Display PDF if generated */}
          </>
        )}
    </>
  );
}

export default PreOperativeIns;
