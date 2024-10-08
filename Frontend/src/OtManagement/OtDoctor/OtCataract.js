import React, { useState, useRef, useEffect } from "react";
import bgImg2 from "../../Assets/bgImg2.jpg";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});

const OtCataract = () => {
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);
  const dispatchvalue = useDispatch();

  const [preNurseInputs, setPreNurseInputs] = useState({
    Eye: "",
    NameoftheSurgery: "",
    Incision: "",
    SiteOfIncision: "",
    Capsulorhexis: "",

    NucleusRemoval: "",
    LensImplantation: "",
    IntraopComplications: "",
    PostOp: "",
  });
  console.log("preNurseInputs", preNurseInputs);
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    const newValue = type === "checkbox" ? (checked ? value : "") : value;

    setPreNurseInputs({
      ...preNurseInputs,
      [name]: newValue,
    });
  };

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
      setIsPrintButtonVisible(true); // Resetting print button visibility
    }, 500);
  };
  const [workbenchformData, setFormData] = useState({
    SerialNo: "",
    PatientID: "",
    AppointmentID: "",
    visitNo: "",
    firstName: "",
    lastName: "",
    AppointmentDate: "",
    Complaint: "",
    PatientPhoto: "",
    DoctorName: "",
    Age: "",
    Gender: "",
    Location: "",
  });
  const [clinicName, setClinicName] = useState("");
  const [clinicLogo, setClinicLogo] = useState(null);
  const [location, setlocation] = useState("");
  console.log(workbenchformData);
  dispatchvalue({
    type: "workbenchformData",
    value: workbenchformData,
  });
  useEffect(() => {
    const location = userRecord?.location;

    axios
      .get("your_api_endpoint")
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          const data = response.data;
          setClinicName(data.Clinic_Name);
          setClinicLogo(`data:image/png;base64,${data.Clinic_Logo}`);
          setlocation(data.location);
        } else {
          // Handle error if needed
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [userRecord]);

  return (
    <>
      {isPrintButtonVisible ? (
        <div className="appointment ">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
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
              Cataract
            </h4>

            <div className="OtMangementForm_1 djkwked675">
              <label className="lokm89">
                Eye<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox">
                <label htmlFor="LeftCheckbox">
                  <input
                    type="checkbox"
                    id="LeftCheckbox"
                    name="Eye"
                    value="Left"
                    checked={preNurseInputs.Eye === "Left"}
                    onChange={handleInputChange}
                  />
                  <span>Left</span>
                </label>
                <label htmlFor="rightCheckbox">
                  <input
                    type="checkbox"
                    id="rightCheckbox"
                    name="Eye"
                    value="Right"
                    checked={preNurseInputs.Eye === "Right"}
                    onChange={handleInputChange}
                  />
                  <span>Right</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label className="lokm89">
                Name of Surgery<span>:</span>
              </label>
              <textarea
                id="NameoftheSurgery"
                name="NameoftheSurgery"
                value={preNurseInputs.NameoftheSurgery}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label className="lokm89">
                Incision<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                <label htmlFor="ClearCornealCheckbox">
                  <input
                    type="checkbox"
                    id="ClearCornealCheckbox"
                    name="Incision"
                    value="ClearCorneal"
                    checked={preNurseInputs.Incision === "ClearCorneal"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>ClearCorneal</span>
                </label>
                <label htmlFor="ScleralCheckbox">
                  <input
                    type="checkbox"
                    id="ScleralCheckbox"
                    name="Incision"
                    value="Scleral"
                    checked={preNurseInputs.Incision === "Scleral"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Scleral</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label className="lokm89">
                Site of Incision<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                <label htmlFor="TemporalCheckbox">
                  <input
                    type="checkbox"
                    id="TemporalCheckbox"
                    name="SiteOfIncision"
                    value="Temporal"
                    checked={preNurseInputs.SiteOfIncision === "Temporal"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Temporal</span>
                </label>

                <label htmlFor="120clockareCheckbox">
                  <input
                    type="checkbox"
                    id="120clockCheckbox"
                    name="SiteOfIncision"
                    value="120'clock"
                    checked={preNurseInputs.SiteOfIncision === "120'clock"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>120'Clock</span>
                </label>

                <label htmlFor="SuperotemporalCheckbox">
                  <input
                    type="checkbox"
                    id="SuperotemporalCheckbox"
                    name="SiteOfIncision"
                    value="Superotemporal"
                    checked={preNurseInputs.SiteOfIncision === "Superotemporal"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Superotemporal</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label className="lokm89">
                Capsulorhexis<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                <label htmlFor="CompleteCheckbox">
                  <input
                    type="checkbox"
                    id="CompleteCheckbox"
                    name="Capsulorhexis"
                    value="Complete"
                    checked={preNurseInputs.Capsulorhexis === "Complete"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Complete</span>
                </label>

                <label htmlFor="IncompleteaCheckbox">
                  <input
                    type="checkbox"
                    id="IncompleteCheckbox"
                    name="Capsulorhexis"
                    value="Incomplete"
                    checked={preNurseInputs.Capsulorhexis === "Incomplete"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Incomplete</span>
                </label>

                <label htmlFor="ExtendedCheckbox">
                  <input
                    type="checkbox"
                    id="ExtendedCheckbox"
                    name="Capsulorhexis"
                    value="Extended"
                    checked={preNurseInputs.Capsulorhexis === "Extended"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Extended</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label className="lokm89">
                Nucleus Removal<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                <label htmlFor="PhacoemulsificationCheckbox">
                  <input
                    type="checkbox"
                    id="PhacoemulsificationCheckbox"
                    name="NucleusRemoval"
                    value="Phacoemulsification"
                    checked={
                      preNurseInputs.NucleusRemoval === "Phacoemulsification"
                    }
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "500px" }}>Phacoe-mulsification</span>
                </label>

                <label htmlFor="ManualCheckbox">
                  <input
                    type="checkbox"
                    id="ManualCheckbox"
                    name="NucleusRemoval"
                    value="Manual"
                    checked={preNurseInputs.NucleusRemoval === "Manual"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Manual</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label className="lokm89">
                Lens Implantation<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                <label htmlFor="inthebagCheckbox">
                  <input
                    type="checkbox"
                    id="inthebagCheckbox"
                    name="LensImplantation"
                    value="inthebag"
                    checked={preNurseInputs.LensImplantation === "inthebag"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>In The Bag</span>
                </label>

                <label htmlFor="inthesulcusCheckbox">
                  <input
                    type="checkbox"
                    id="inthesulcusCheckbox"
                    name="LensImplantation"
                    value="inthesulcus"
                    checked={preNurseInputs.LensImplantation === "inthesulcus"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>In The Sulcus</span>
                </label>
              </div>
            </div>

            <div className="OtMangementForm_1 djkwked675">
              <label className="lokm89">
                Intraop Complications<span>:</span>
              </label>

              <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                <label htmlFor="ZonulodialysisCheckbox">
                  <input
                    type="checkbox"
                    id="ZonulodialysisCheckbox"
                    name="IntraopComplications"
                    value="Zonulodialysis"
                    checked={
                      preNurseInputs.IntraopComplications === "Zonulodialysis"
                    }
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Zonulodialysis</span>
                </label>

                <label htmlFor="PCrentCheckbox">
                  <input
                    type="checkbox"
                    id="PCrentCheckbox"
                    name="IntraopComplications"
                    value="PCrent"
                    checked={preNurseInputs.IntraopComplications === "PCrent"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>PC rent</span>
                </label>

                <label htmlFor="VitreousLossCheckbox">
                  <input
                    type="checkbox"
                    id="VitreousLossCheckbox"
                    name="IntraopComplications"
                    value="VitreousLoss"
                    checked={
                      preNurseInputs.IntraopComplications === "VitreousLoss"
                    }
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Vitreous Loss</span>
                </label>
                <label htmlFor="NillLossCheckbox">
                  <input
                    type="checkbox"
                    id="NillLossCheckbox"
                    name="IntraopComplications"
                    value="Nill"
                    checked={preNurseInputs.IntraopComplications === "Nill"}
                    onChange={handleInputChange}
                  />
                  <span style={{ width: "200px" }}>Nill</span>
                </label>
              </div>
            </div>

            <div className="Otdoctor_intra_Con_2 with_increse_85">
              <label htmlFor="postop">
                Post Op<span>:</span>
              </label>
              <textarea
                //  style={{width:"305px",height:"70px"}}

                id="PostOp"
                name="PostOp"
                value={preNurseInputs.PostOp}
                onChange={handleInputChange}
                required
              />
            </div>
            <br />
            {isPrintButtonVisible && (
              <div className="Register_btn_con">
                <button className="RegisterForm_1_btns" onClick={Submitalldata}>
                  Print
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <PrintContent
          ref={componentRef}
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
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

              <div className="dctr_info_up_head Print_ot_all_div_second2">
                <div className="RegisFormcon ">
                  <div className="dctr_info_up_head22">
                    {workbenchformData.PatientPhoto ? (
                      <img
                        src={workbenchformData.PatientPhoto}
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
                      {workbenchformData.firstName +
                        " " +
                        workbenchformData.lastName}{" "}
                    </span>
                  </div>
                  <div className="RegisForm_1 ">
                    <label htmlFor="FirstName">
                      Patient ID <span>:</span>
                    </label>

                    <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                      {workbenchformData.PatientID}{" "}
                    </span>
                  </div>

                  <div className="RegisForm_1 ">
                    <label htmlFor="FirstName">
                      Age <span>:</span>{" "}
                    </label>

                    <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                      {workbenchformData.Age}{" "}
                    </span>
                  </div>
                  <div className="RegisForm_1 ">
                    <label htmlFor="FirstName">
                      Gender <span>:</span>{" "}
                    </label>

                    <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                      {workbenchformData.Gender}{" "}
                    </span>
                  </div>
                  <div className="RegisForm_1 ">
                    <label htmlFor="FirstName">
                      Primary Doctor <span>:</span>{" "}
                    </label>

                    <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                      {workbenchformData.DoctorName}{" "}
                    </span>
                  </div>
                  <div className="RegisForm_1 ">
                    <label htmlFor="FirstName">
                      Location <span>:</span>{" "}
                    </label>

                    <span className="dctr_wrbvh_pice" htmlFor="FirstName">
                      {workbenchformData.Location}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="appointment ">
              <div className="ewdfhyewuf65">
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
                  Cataract
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div className="OtMangementForm_1 djkwked675">
                    <label>
                      Eye<span>:</span>
                    </label>

                    <div className="OtMangementForm_1_checkbox">
                      <label htmlFor="LeftCheckbox">
                        <input
                          type="checkbox"
                          id="LeftCheckbox"
                          name="Eye"
                          value="Left"
                          checked={preNurseInputs.Eye === "Left"}
                          onChange={handleInputChange}
                        />
                        <span>Left</span>
                      </label>
                      <label htmlFor="rightCheckbox">
                        <input
                          type="checkbox"
                          id="rightCheckbox"
                          name="Eye"
                          value="Right"
                          checked={preNurseInputs.Eye === "Right"}
                          onChange={handleInputChange}
                        />
                        <span>Right</span>
                      </label>
                    </div>
                  </div>

                  <div className="OtMangementForm_1 djkwked675">
                    <label htmlFor="NameoftheSurgery">
                      Name of Surgery<span>:</span>
                    </label>
                    <textarea
                      style={{ width: "305px", height: "40px" }}
                      id="NameoftheSurgery"
                      name="NameoftheSurgery"
                      value={preNurseInputs.NameoftheSurgery}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="OtMangementForm_1 djkwked675">
                    <label>
                      Incision<span>:</span>
                    </label>

                    <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                      <label htmlFor="ClearCornealCheckbox">
                        <input
                          type="checkbox"
                          id="ClearCornealCheckbox"
                          name="Incision"
                          value="ClearCorneal"
                          checked={preNurseInputs.Incision === "ClearCorneal"}
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>ClearCorneal</span>
                      </label>
                      <label htmlFor="ScleralCheckbox">
                        <input
                          type="checkbox"
                          id="ScleralCheckbox"
                          name="Incision"
                          value="Scleral"
                          checked={preNurseInputs.Incision === "Scleral"}
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>Scleral</span>
                      </label>
                    </div>
                  </div>

                  <div className="OtMangementForm_1 djkwked675">
                    <label>
                      Site of Incision<span>:</span>
                    </label>

                    <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                      <label htmlFor="TemporalCheckbox">
                        <input
                          type="checkbox"
                          id="TemporalCheckbox"
                          name="SiteOfIncision"
                          value="Temporal"
                          checked={preNurseInputs.SiteOfIncision === "Temporal"}
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>Temporal</span>
                      </label>

                      <label htmlFor="120clockareCheckbox">
                        <input
                          type="checkbox"
                          id="120clockCheckbox"
                          name="SiteOfIncision"
                          value="120'clock"
                          checked={
                            preNurseInputs.SiteOfIncision === "120'clock"
                          }
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>120'Clock</span>
                      </label>

                      <label htmlFor="SuperotemporalCheckbox">
                        <input
                          type="checkbox"
                          id="SuperotemporalCheckbox"
                          name="SiteOfIncision"
                          value="Superotemporal"
                          checked={
                            preNurseInputs.SiteOfIncision === "Superotemporal"
                          }
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>Superotemporal</span>
                      </label>
                    </div>
                  </div>

                  <div className="OtMangementForm_1 djkwked675">
                    <label>
                      Capsulorhexis<span>:</span>
                    </label>

                    <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                      <label htmlFor="CompleteCheckbox">
                        <input
                          type="checkbox"
                          id="CompleteCheckbox"
                          name="Capsulorhexis"
                          value="Complete"
                          checked={preNurseInputs.Capsulorhexis === "Complete"}
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>Complete</span>
                      </label>

                      <label htmlFor="IncompleteaCheckbox">
                        <input
                          type="checkbox"
                          id="IncompleteCheckbox"
                          name="Capsulorhexis"
                          value="Incomplete"
                          checked={
                            preNurseInputs.Capsulorhexis === "Incomplete"
                          }
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>Incomplete</span>
                      </label>

                      <label htmlFor="ExtendedCheckbox">
                        <input
                          type="checkbox"
                          id="ExtendedCheckbox"
                          name="Capsulorhexis"
                          value="Extended"
                          checked={preNurseInputs.Capsulorhexis === "Extended"}
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>Extended</span>
                      </label>
                    </div>
                  </div>

                  <div className="OtMangementForm_1 djkwked675">
                    <label>
                      Nucleus Removal<span>:</span>
                    </label>

                    <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                      <label htmlFor="PhacoemulsificationCheckbox">
                        <input
                          type="checkbox"
                          id="PhacoemulsificationCheckbox"
                          name="NucleusRemoval"
                          value="Phacoemulsification"
                          checked={
                            preNurseInputs.NucleusRemoval ===
                            "Phacoemulsification"
                          }
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "500px" }}>
                          Phacoemulsification
                        </span>
                      </label>

                      <label htmlFor="ManualCheckbox">
                        <input
                          type="checkbox"
                          id="ManualCheckbox"
                          name="NucleusRemoval"
                          value="Manual"
                          checked={preNurseInputs.NucleusRemoval === "Manual"}
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>Manual</span>
                      </label>
                    </div>
                  </div>

                  <div className="OtMangementForm_1 djkwked675">
                    <label>
                      Lens Implantation<span>:</span>
                    </label>

                    <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                      <label htmlFor="inthebagCheckbox">
                        <input
                          type="checkbox"
                          id="inthebagCheckbox"
                          name="LensImplantation"
                          value="inthebag"
                          checked={
                            preNurseInputs.LensImplantation === "inthebag"
                          }
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>In The Bag</span>
                      </label>

                      <label htmlFor="inthesulcusCheckbox">
                        <input
                          type="checkbox"
                          id="inthesulcusCheckbox"
                          name="LensImplantation"
                          value="inthesulcus"
                          checked={
                            preNurseInputs.LensImplantation === "inthesulcus"
                          }
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>In The Sulcus</span>
                      </label>
                    </div>
                  </div>

                  <div className="OtMangementForm_1 djkwked675">
                    <label>
                      Intraop Complications<span>:</span>
                    </label>

                    <div className="OtMangementForm_1_checkbox nmmlkiu76d">
                      <label htmlFor="ZonulodialysisCheckbox">
                        <input
                          type="checkbox"
                          id="ZonulodialysisCheckbox"
                          name="IntraopComplications"
                          value="Zonulodialysis"
                          checked={
                            preNurseInputs.IntraopComplications ===
                            "Zonulodialysis"
                          }
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>Zonulodialysis</span>
                      </label>

                      <label htmlFor="PCrentCheckbox">
                        <input
                          type="checkbox"
                          id="PCrentCheckbox"
                          name="IntraopComplications"
                          value="PCrent"
                          checked={
                            preNurseInputs.IntraopComplications === "PCrent"
                          }
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>PC rent</span>
                      </label>

                      <label htmlFor="VitreousLossCheckbox">
                        <input
                          type="checkbox"
                          id="VitreousLossCheckbox"
                          name="IntraopComplications"
                          value="VitreousLoss"
                          checked={
                            preNurseInputs.IntraopComplications ===
                            "VitreousLoss"
                          }
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>Vitreous Loss</span>
                      </label>
                      <label htmlFor="NillLossCheckbox">
                        <input
                          type="checkbox"
                          id="NillLossCheckbox"
                          name="IntraopComplications"
                          value="Nill"
                          checked={
                            preNurseInputs.IntraopComplications === "Nill"
                          }
                          onChange={handleInputChange}
                        />
                        <span style={{ width: "200px" }}>Nill</span>
                      </label>
                    </div>
                  </div>

                  <div className="Otdoctor_intra_Con_2 with_increse_85">
                    <label htmlFor="postop">
                      Post Op<span>:</span>
                    </label>
                    <textarea
                      //  style={{width:"305px",height:"70px"}}

                      id="PostOp"
                      name="PostOp"
                      value={preNurseInputs.PostOp}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PrintContent>
      )}
    </>
  );
};

export default OtCataract;
