import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';
import '../OtManagement/OtManagement.css';


function Neurology() {
  //73 inputs
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const dispatch = useDispatch();
  // const UsercreatePatientdata = useSelector(state => state.userRecord?.UsercreatePatientdata);

  // console.log(UsercreatePatientdata,'UsercreatePatientdata');

  const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);

  const [neurologyData, setNeurologyData] = useState({

    History: "",
    PastInvestigations: "",
    Examination: "",
    GeneralExam: "",
    Vision: "",
    Fundus: "",
    Fields: "",
    EOM: "",
    Pupils: "",
    Nerves: "",
    LowerCranialNerves: "",

    SensoryExam: "",
    InvoluntaryMovements: "",
    FN: "",
    Dysdiadoko: "",
    Tandem: "",
    Gait: "",
    Power: "",
    Neck: "",
  });

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setNeurologyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [inputValuesR, setInputValuesR] = useState({
    ShoulderR: ["", "", "", ""],
    HipR: ["", "", "", ""],
    ElbowR: ["", ""],
    KneeR: ["", ""],
    WristR: ["", ""],
    HandR: ["", ""],
    AnkleR: ["", "", "", ""],
  });


  const [inputValuesL, setInputValuesL] = useState({
    ShoulderL: ["", "", "", ""],
    HipL: ["", "", "", ""],
    ElbowL: ["", ""],
    KneeL: ["", ""],
    WristL: ["", ""],
    HandL: ["", ""],
    AnkleL: ["", "", "", ""],
  });

  const handleChangeR = (area, index, event) => {
    const value = event.target.value;
    setInputValuesR((prevState) => ({
      ...prevState,
      [area + 'R']: [
        ...(prevState[area + 'R'] || []).slice(0, index),
        value,
        ...(prevState[area + 'R'] || []).slice(index + 1),
      ],
    }));
  };


  const handleChangeL = (area, index, event) => {
    const value = event.target.value;
    setInputValuesL((prevState) => ({
      ...prevState,
      [area + 'L']: [
        ...(prevState[area + 'L'] || []).slice(0, index),
        value,
        ...(prevState[area + 'L'] || []).slice(index + 1),
      ],
    }));
  };

  const [inputValuesReflexesR, setInputValuesReflexesR] = useState({
    RB1: '',
    RT1: '',
    RS1: '',
    RK1: '',
    RA1: '',
    RPlantars1: '',
    RAbdominals1: '',
    RAbdominals2: '',
    RCr1: ''
  });

  const handleChangeReflexesR = (e, key) => {
    const { value } = e.target;
    setInputValuesReflexesR(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const [inputValuesReflexesL, setInputValuesReflexesL] = useState({
    LB1: '',
    LT1: '',
    LS1: '',
    LK1: '',
    LA1: '',
    LPlantars1: '',
    LAbdominals1: '',
    LAbdominals2: '',
    LCr1: ''
  });

  const handleChangeReflexesL = (e, key) => {
    const { value } = e.target;
    setInputValuesReflexesL(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const NeurologyColumns = [
    { key: 'id', name: 'S.No', frozen: true },
    { key: 'VisitId', name: 'VisitId', frozen: true },
    { key: 'PrimaryDoctorId', name: 'Doctor Id', frozen: true },
    { key: 'PrimaryDoctorName', name: 'Doctor Name', frozen: true },
    { key: 'created_by', name: 'Created By', frozen: true },
    { key: 'Date', name: 'Date', frozen: true },
    { key: 'Time', name: 'Time', frozen: true },
    { key: 'History', name: 'History' },
    { key: 'PastInvestigations', name: 'Past Investigations' },
    { key: 'Examination', name: 'Examination' },
    { key: 'GeneralExam', name: 'General Exam' },
    { key: 'Vision', name: 'Vision' },
    { key: 'Fundus', name: 'Fundus' },
    { key: 'Fields', name: 'Fields' },
    { key: 'Eom', name: 'EOM' },
    { key: 'Pupils', name: 'Pupils' },
    { key: 'Nerves', name: 'Nerves' },
    { key: 'LowerCranialNerves', name: 'Lower Cranial Nerves' },
    { key: 'SensoryExam', name: 'SensoryExam' },
    { key: 'InvoluntaryMovements', name: 'InvoluntaryMovements' },
    { key: 'Fn', name: 'FN' },
    { key: 'Dysdiadoko', name: 'Dysdiadoko' },
    { key: 'Tandem', name: 'Tandem' },
    { key: 'Gait', name: 'Gait' },
    { key: 'Power', name: 'Power' },
    { key: 'Neck', name: 'Neck' },
    { key: 'ShoulderR', name: 'ShoulderR' },
    { key: 'HipR', name: 'HipR' },
    { key: 'ElbowR', name: 'ElbowR' },
    { key: 'KneeR', name: 'KneeR' },
    { key: 'WristR', name: 'WristR' },
    { key: 'HandR', name: 'HandR' },
    { key: 'AnkleR', name: 'AnkleR' },
    { key: 'ShoulderL', name: 'ShoulderL' },
    { key: 'HipL', name: 'HipL' },
    { key: 'ElbowL', name: 'ElbowL' },
    { key: 'KneeL', name: 'KneeL' },
    { key: 'WristL', name: 'WristL' },
    { key: 'HandL', name: 'HandL' },
    { key: 'AnkleL', name: 'AnkleL' },
    { key: 'Rb1', name: 'Rb1' },
    { key: 'Rt1', name: 'Rt1' },
    { key: 'Rs1', name: 'Rs1' },
    { key: 'Rk1', name: 'Rk1' },
    { key: 'Ra1', name: 'Ra1' },
    { key: 'RPlantars1', name: 'RPlantars1' },
    { key: 'RAbdominals1', name: 'RAbdominals1' },
    { key: 'RAbdominals2', name: 'RAbdominals2' },
    { key: 'RCr1', name: 'RCr1' },
    { key: 'Lb1', name: 'Lb1' },
    { key: 'Lt1', name: 'Lt1' },
    { key: 'Ls1', name: 'Ls1' },
    { key: 'Lk1', name: 'Lk1' },
    { key: 'La1', name: 'La1' },
    { key: 'LPlantars1', name: 'LPlantars1' },
    { key: 'LAbdominals1', name: 'LAbdominals1' },
    { key: 'LAbdominals2', name: 'LAbdominals2' },
    { key: 'LCr1', name: 'LCr1' },

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


  const [GetData, setGetData] = useState([]);
  const [IsGetData, setIsGetData] = useState(false);
  const [IsViewMode, setIsViewMode] = useState(false)



  useEffect(() => {
    axios.get(`${UrlLink}Workbench/Workbench_Neurology_Details`, { params: { RegistrationId: DoctorWorkbenchNavigation?.pk } })
      .then((res) => {
        const ress = res.data
        setGetData(ress)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [IsGetData, UrlLink, DoctorWorkbenchNavigation])


  const handleView = (data) => {
    console.log(data, '8888888');

    const parseArray = (str, defaultValue) => {
      try {
        return JSON.parse(str.replace(/'/g, '"')); // replace single quotes with double quotes to parse correctly
      } catch (e) {
        return defaultValue;
      }
    };



    setNeurologyData({
      History: data.History || '',
      PastInvestigations: data.PastInvestigations || '',
      Examination: data.Examination || '',
      GeneralExam: data.GeneralExam || '',
      Vision: data.Vision || '',
      Fundus: data.Fundus || '',
      Fields: data.Fields || '',
      EOM: data.Eom || '',
      Pupils: data.Pupils || '',
      Nerves: data.Nerves || '',
      LowerCranialNerves: data.LowerCranialNerves || '',
      SensoryExam: data.SensoryExam || '',
      InvoluntaryMovements: data.InvoluntaryMovements || '',
      FN: data.Fn || '',
      Dysdiadoko: data.Dysdiadoko || '',
      Tandem: data.Tandem || '',
      Gait: data.Gait || '',
      Power: data.Power || '',
      Neck: data.Neck || '',
    });

    setInputValuesR({
      ShoulderR: parseArray(data.ShoulderR, ['', '', '', '']),
      HipR: parseArray(data.HipR, ['', '', '', '']),
      ElbowR: parseArray(data.ElbowR, ['', '']),
      KneeR: parseArray(data.KneeR, ['', '']),
      WristR: parseArray(data.WristR, ['', '']),
      HandR: parseArray(data.HandR, ['', '']),
      AnkleR: parseArray(data.AnkleR, ['', '', '', '']),
    });

    setInputValuesL({
      ShoulderL: parseArray(data.ShoulderL, ['', '', '', '']),
      HipL: parseArray(data.HipL, ['', '', '', '']),
      ElbowL: parseArray(data.ElbowL, ['', '']),
      KneeL: parseArray(data.KneeL, ['', '']),
      WristL: parseArray(data.WristL, ['', '']),
      HandL: parseArray(data.HandL, ['', '']),
      AnkleL: parseArray(data.AnkleL, ['', '', '', '']),
    });

    setInputValuesReflexesR({
      RB1: data.Rb1 || '',
      RT1: data.Rt1 || '',
      RS1: data.Rs1 || '',
      RK1: data.Rk1 || '',
      RA1: data.Ra1 || '',
      RPlantars1: data.RPlantars1 || '',
      RAbdominals1: data.RAbdominals1 || '',
      RAbdominals2: data.RAbdominals2 || '',
      RCr1: data.RCr1 || ''
    });

    setInputValuesReflexesL({
      LB1: data.Lb1 || '',
      LT1: data.Lt1 || '',
      LS1: data.Ls1 || '',
      LK1: data.Lk1 || '',
      LA1: data.La1 || '',
      LPlantars1: data.LPlantars1 || '',
      LAbdominals1: data.LAbdominals1 || '',
      LAbdominals2: data.LAbdominals2 || '',
      LCr1: data.LCr1 || ''
    });

    setIsViewMode(true);
  };


  const handleClear = () => {
    setNeurologyData({
      History: "",
      PastInvestigations: "",
      Examination: "",
      GeneralExam: "",
      Vision: "",
      Fundus: "",
      Fields: "",
      EOM: "",
      Pupils: "",
      Nerves: "",
      LowerCranialNerves: "",
      SensoryExam: "",
      InvoluntaryMovements: "",
      FN: "",
      Dysdiadoko: "",
      Tandem: "",
      Gait: "",
      Power: "",
      Neck: "",
    });
    setInputValuesR({
      ShoulderR: ["", "", "", ""],
      HipR: ["", "", "", ""],
      ElbowR: ["", ""],
      KneeR: ["", ""],
      WristR: ["", ""],
      HandR: ["", ""],
      AnkleR: ["", "", "", ""],
    })

    setInputValuesL({
      ShoulderL: ["", "", "", ""],
      HipL: ["", "", "", ""],
      ElbowL: ["", ""],
      KneeL: ["", ""],
      WristL: ["", ""],
      HandL: ["", ""],
      AnkleL: ["", "", "", ""],
    })

    setInputValuesReflexesR({
      RB1: '',
      RT1: '',
      RS1: '',
      RK1: '',
      RA1: '',
      RPlantars1: '',
      RAbdominals1: '',
      RAbdominals2: '',
      RCr1: ''
    });

    setInputValuesReflexesL({
      LT1: '',
      LS1: '',
      LK1: '',
      LA1: '',
      LPlantars1: '',
      LAbdominals1: '',
      LAbdominals2: '',
      LCr1: ''
    })
    setIsViewMode(false);
  }

  const handleSubmit = () => {

    const Data = {
      ...neurologyData,
      ...inputValuesR,
      ...inputValuesL,
      ...inputValuesReflexesR,
      ...inputValuesReflexesL,
      RegistrationId: DoctorWorkbenchNavigation?.pk,

      // PatientId: UsercreatePatientdata?.PatientId?.id,
      // PatientName: `${UsercreatePatientdata?.PatientId?.FirstName || ''} ${UsercreatePatientdata?.PatientId?.MiddleName || ''} ${UsercreatePatientdata?.PatientId?.SurName || ''}`,
      created_by: userRecord?.username || '',
    };
    console.log(Data, 'dataaaaaaaa');
    axios.post(`${UrlLink}Workbench/Workbench_Neurology_Details`, Data)
      .then((res) => {
        const resData = res.data;
        const type = Object.keys(resData)[0];
        const message = Object.values(resData)[0];
        const toastData = {
          message: message,
          type: type,
        };

        dispatch({ type: 'toast', value: toastData });
        setIsGetData(prev => !prev)
        handleClear();
      })
      .catch((err) => {
        console.log(err);
      });


  };


  return (
    <>
      <div className='new-patient-registration-form'>

        <div className="Otdoctor_intra_Con">
          <div className="Otdoctor_intra_Con_2">
            <label>
              History <span>:</span>
            </label>
            <textarea
              name="History"
              value={neurologyData.History}
              onChange={handleChange1}
            ></textarea>
          </div>
        </div>
        <br />

        <div className="case_sheet_5con">
          <div className="case_sheet_5con_20">
            <label>
              Past Investigations <span>:</span>
            </label>
            <textarea
              id="PastInvestigations"
              name="PastInvestigations"
              value={neurologyData.PastInvestigations}
              onChange={handleChange1}
            ></textarea>
          </div>
        </div>
        <br />

        <div className="efwewedc_neuro">
          <div className="case_sheet_5con_20 nero20">
            <label>
              Examination <span>:</span>
            </label>
            <textarea
              id="Examination"
              name="Examination"
              value={neurologyData.Examination}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>

          <div className="case_sheet_5con_20 nero20">
            <label>
              General Exam <span>:</span>
            </label>
            <textarea
              id="GeneralExam"
              name="GeneralExam"
              value={neurologyData.GeneralExam}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>

        </div>
        <br />

        <br />

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
          Higher Functions
        </h4>
        <br />

        <div className="efwewedc_neuro">
          <div className="case_sheet_5con_20 nero20">
            <label>
              Vision <span>:</span>
            </label>
            <textarea
              id="Vision"
              name="Vision"
              value={neurologyData.Vision}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>
          <div className="case_sheet_5con_20 nero20">
            <label>
              Fundus <span>:</span>
            </label>
            <textarea
              id="Fundus"
              name="Fundus"
              value={neurologyData.Fundus}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>
          <div className="case_sheet_5con_20 nero20">
            <label>
              Fields <span>:</span>
            </label>
            <textarea
              id="Fields"
              name="Fields"
              value={neurologyData.Fields}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>
          <div className="case_sheet_5con_20 nero20">
            <label>
              EOM <span>:</span>
            </label>
            <textarea
              id="EOM"
              name="EOM"
              value={neurologyData.EOM}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>
          <div className="case_sheet_5con_20 nero20">
            <label>
              Pupils <span>:</span>
            </label>
            <textarea
              id="Pupils"
              name="Pupils"
              value={neurologyData.Pupils}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>
          <div className="case_sheet_5con_20 nero20">
            <label>
              5,7,8 Nerves <span>:</span>
            </label>
            <textarea
              id="Nerves"
              name="Nerves"
              value={neurologyData.Nerves}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>
          <div className="case_sheet_5con_20 nero20">
            <label>
              Lower Cranial Nerves <span>:</span>
            </label>
            <textarea
              id="LowerCranialNerves"
              name="LowerCranialNerves"
              value={neurologyData.LowerCranialNerves}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>
        </div>

        <br />

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
          Nutrition / Tone
        </h4>

        <br />
        <div className="RegisFormcon" style={{ justifyContent: "center" }}>
          <div className="RegisForm_1">
            <label htmlFor="Power">
              Power <span>:</span>
            </label>
            <input
              type="text"
              id="Power"
              name="Power"
              value={neurologyData.Power}
              onChange={handleChange1}
              required
            />
          </div>
          <div className="RegisForm_1">
            <label htmlFor="Neck">
              Neck <span>:</span>
            </label>
            <input
              type="text"
              id="Neck"
              name="Neck"
              value={neurologyData.Neck}
              onChange={handleChange1}
              required
            />
          </div>
        </div>

        <br />

        <div className="Selected-table-container">
          <table className="selected-medicine-table2">
            <thead>
              <tr>
                <th></th>
                <th>R</th>

                <th>L</th>

                <th></th>
                <th>R</th>
                <th>L</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "200px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      textAlign: "start",
                      width: "200px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "bolder",
                        width: "80px",
                        display: "flex",
                        textAlign: "start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <td>Shoulder</td>
                    </div>

                    <div
                      style={{ display: "flex", flexDirection: "column" }}
                      className="eewujtd_u"
                    >
                      <td>
                        F <span>:</span>
                      </td>
                      <td>
                        E <span>:</span>
                      </td>
                      <td>
                        Abd <span>:</span>
                      </td>
                      <td>
                        Add <span>:</span>
                      </td>
                    </div>
                  </div>
                </td>
                <td style={{ width: "150px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="ejd_td_input6"
                  >
                    {inputValuesR.ShoulderR.map((value, index) => (
                      <input
                        key={index}
                        type="text"
                        value={value}
                        onChange={(event) => handleChangeR("Shoulder", index, event)}
                      />
                    ))}
                  </div>
                </td>

                <td style={{ width: "150px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="ejd_td_input6"
                  >
                    {inputValuesL.ShoulderL.map((value, index) => (
                      <input
                        key={index}
                        type="text"
                        value={value}
                        onChange={(event) => handleChangeL("Shoulder", index, event)}
                      />
                    ))}
                  </div>
                </td>

                <td style={{ width: "200px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      textAlign: "start",
                      width: "200px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "bolder",
                        width: "80px",
                        display: "flex",
                        textAlign: "start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <td>Hip</td>
                    </div>

                    <div
                      style={{ display: "flex", flexDirection: "column" }}
                      className="eewujtd_u"
                    >
                      <td>
                        F <span>:</span>
                      </td>
                      <td>
                        E <span>:</span>
                      </td>
                      <td>
                        Abd <span>:</span>
                      </td>
                      <td>
                        Add <span>:</span>
                      </td>
                    </div>
                  </div>
                </td>
                <td style={{ width: "150px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="ejd_td_input6"
                  >
                    <input
                      type="text"
                      value={inputValuesR.HipR[0]}
                      onChange={(event) => handleChangeR("Hip", 0, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesR.HipR[1]}
                      onChange={(event) => handleChangeR("Hip", 1, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesR.HipR[2]}
                      onChange={(event) => handleChangeR("Hip", 2, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesR.HipR[3]}
                      onChange={(event) => handleChangeR("Hip", 3, event)}
                    />
                  </div>
                </td>
                <td style={{ width: "150px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="ejd_td_input6"
                  >
                    <input
                      type="text"
                      value={inputValuesL.HipL[0]}
                      onChange={(event) => handleChangeL("Hip", 0, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesL.HipL[1]}
                      onChange={(event) => handleChangeL("Hip", 1, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesL.HipL[2]}
                      onChange={(event) => handleChangeL("Hip", 2, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesL.HipL[3]}
                      onChange={(event) => handleChangeL("Hip", 3, event)}
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ width: "200px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      textAlign: "start",
                      width: "200px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "bolder",
                        width: "80px",
                        display: "flex",
                        textAlign: "start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <td>Elbow</td>
                    </div>

                    <div
                      style={{ display: "flex", flexDirection: "column" }}
                      className="eewujtd_u"
                    >
                      <td>
                        F <span>:</span>
                      </td>
                      <td>
                        E <span>:</span>
                      </td>
                    </div>
                  </div>
                </td>
                <td style={{ width: "150px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="ejd_td_input6"
                  >
                    <input
                      type="text"
                      value={inputValuesR.ElbowR[0]}
                      onChange={(event) => handleChangeR("Elbow", 0, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesR.ElbowR[1]}
                      onChange={(event) => handleChangeR("Elbow", 1, event)}
                    />
                  </div>
                </td>
                <td style={{ width: "150px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="ejd_td_input6"
                  >
                    <input
                      type="text"
                      value={inputValuesL.ElbowL[0]}
                      onChange={(event) => handleChangeL("Elbow", 0, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesL.ElbowL[1]}
                      onChange={(event) => handleChangeL("Elbow", 1, event)}
                    />
                  </div>
                </td>

                <td style={{ width: "200px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      textAlign: "start",
                      width: "200px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "bolder",
                        width: "80px",
                        display: "flex",
                        textAlign: "start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <td>Knee</td>
                    </div>

                    <div
                      style={{ display: "flex", flexDirection: "column" }}
                      className="eewujtd_u"
                    >
                      <td>
                        F <span>:</span>
                      </td>
                      <td>
                        E <span>:</span>
                      </td>
                    </div>
                  </div>
                </td>
                <td style={{ width: "150px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="ejd_td_input6"
                  >
                    <input
                      type="text"
                      value={inputValuesR.KneeR[0]}
                      onChange={(event) => handleChangeR("Knee", 0, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesR.KneeR[1]}
                      onChange={(event) => handleChangeR("Knee", 1, event)}
                    />
                  </div>
                </td>
                <td style={{ width: "150px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="ejd_td_input6"
                  >
                    <input
                      type="text"
                      value={inputValuesL.KneeL[0]}
                      onChange={(event) => handleChangeL("Knee", 0, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesL.KneeL[1]}
                      onChange={(event) => handleChangeL("Knee", 1, event)}
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ width: "200px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      textAlign: "start",
                      width: "200px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "bolder",
                        width: "80px",
                        display: "flex",
                        textAlign: "start",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        rowGap: "25px",
                      }}
                    >
                      <td>Wrist</td>
                      <td>Hand</td>
                    </div>

                    <div
                      style={{ display: "flex", flexDirection: "column" }}
                      className="eewujtd_u"
                    >
                      <td>
                        F <span>:</span>
                      </td>
                      <td>
                        E <span>:</span>
                      </td>
                      <td>
                        I <span>:</span>
                      </td>
                      <td>
                        E <span>:</span>
                      </td>
                    </div>
                  </div>
                </td>
                <td style={{ width: "150px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="ejd_td_input6"
                  >
                    <input
                      type="text"
                      value={inputValuesR.WristR[0]}
                      onChange={(event) => handleChangeR("Wrist", 0, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesR.WristR[1]}
                      onChange={(event) => handleChangeR("Wrist", 1, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesR.HandR[0]}
                      onChange={(event) => handleChangeR("Hand", 0, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesR.HandR[1]}
                      onChange={(event) => handleChangeR("Hand", 1, event)}
                    />
                  </div>
                </td>

                <td style={{ width: "150px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="ejd_td_input6"
                  >
                    <input
                      type="text"
                      value={inputValuesL.WristL[0]}
                      onChange={(event) => handleChangeL("Wrist", 0, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesL.WristL[1]}
                      onChange={(event) => handleChangeL("Wrist", 1, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesL.HandL[0]}
                      onChange={(event) => handleChangeL("Hand", 0, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesL.HandL[1]}
                      onChange={(event) => handleChangeL("Hand", 1, event)}
                    />
                  </div>
                </td>
                <td style={{ width: "200px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      textAlign: "start",
                      width: "200px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "bolder",
                        width: "80px",
                        display: "flex",
                        textAlign: "start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <td>Ankle</td>
                    </div>

                    <div
                      style={{ display: "flex", flexDirection: "column" }}
                      className="eewujtd_u"
                    >
                      <td>
                        DF <span>:</span>
                      </td>
                      <td>
                        PF <span>:</span>
                      </td>
                      <td>
                        I <span>:</span>
                      </td>
                      <td>
                        E <span>:</span>
                      </td>
                    </div>
                  </div>
                </td>
                <td style={{ width: "150px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="ejd_td_input6"
                  >
                    <input
                      type="text"
                      value={inputValuesR.AnkleR[0]}
                      onChange={(event) => handleChangeR("Ankle", 0, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesR.AnkleR[1]}
                      onChange={(event) => handleChangeR("Ankle", 1, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesR.AnkleR[2]}
                      onChange={(event) => handleChangeR("Ankle", 2, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesR.AnkleR[3]}
                      onChange={(event) => handleChangeR("Ankle", 3, event)}
                    />
                  </div>
                </td>
                <td style={{ width: "150px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="ejd_td_input6"
                  >
                    <input
                      type="text"
                      value={inputValuesL.AnkleL[0]}
                      onChange={(event) => handleChangeL("Ankle", 0, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesL.AnkleL[1]}
                      onChange={(event) => handleChangeL("Ankle", 1, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesL.AnkleL[2]}
                      onChange={(event) => handleChangeL("Ankle", 2, event)}
                    />
                    <input
                      type="text"
                      value={inputValuesL.AnkleL[3]}
                      onChange={(event) => handleChangeL("Ankle", 3, event)}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="Selected-table-container">
          <table className="selected-medicine-table2">
            <thead>
              <tr>
                <th>Reflexes</th>
                <th>B</th>
                <th>T</th>
                <th>S</th>
                <th>K</th>
                <th>A</th>
                <th>Plantars</th>
                <th>Abdominals</th>
                <th>Cr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>R</td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesR.RB1} onChange={e => handleChangeReflexesR(e, 'RB1')} />
                </td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesR.RT1} onChange={e => handleChangeReflexesR(e, 'RT1')} />
                </td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesR.RS1} onChange={e => handleChangeReflexesR(e, 'RS1')} />
                </td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesR.RK1} onChange={e => handleChangeReflexesR(e, 'RK1')} />
                </td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesR.RA1} onChange={e => handleChangeReflexesR(e, 'RA1')} />
                </td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesR.RPlantars1} onChange={e => handleChangeReflexesR(e, 'RPlantars1')} />
                </td>
                <td style={{ display: 'flex', gap: '25px', justifyContent: 'center' }}>
                  <div className="ejd_td_input6">
                    <input type="text" value={inputValuesReflexesR.RAbdominals1} onChange={e => handleChangeReflexesR(e, 'RAbdominals1')} />
                  </div>
                  <div className="ejd_td_input6">
                    <input type="text" value={inputValuesReflexesR.RAbdominals2} onChange={e => handleChangeReflexesR(e, 'RAbdominals2')} />
                  </div>
                </td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesR.RCr1} onChange={e => handleChangeReflexesR(e, 'RCr1')} />
                </td>
              </tr>

              <tr>
                <td>L</td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesL.LB1} onChange={e => handleChangeReflexesL(e, 'LB1')} />
                </td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesL.LT1} onChange={e => handleChangeReflexesL(e, 'LT1')} />
                </td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesL.LS1} onChange={e => handleChangeReflexesL(e, 'LS1')} />
                </td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesL.LK1} onChange={e => handleChangeReflexesL(e, 'LK1')} />
                </td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesL.LA1} onChange={e => handleChangeReflexesL(e, 'LA1')} />
                </td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesL.LPlantars1} onChange={e => handleChangeReflexesL(e, 'LPlantars1')} />
                </td>
                <td style={{ display: 'flex', gap: '25px', justifyContent: 'center' }}>
                  <div className="ejd_td_input6">
                    <input type="text" value={inputValuesReflexesL.LAbdominals1} onChange={e => handleChangeReflexesL(e, 'LAbdominals1')} />
                  </div>
                  <div className="ejd_td_input6">
                    <input type="text" value={inputValuesReflexesL.LAbdominals2} onChange={e => handleChangeReflexesL(e, 'LAbdominals2')} />
                  </div>
                </td>
                <td className="ejd_td_input6">
                  <input type="text" value={inputValuesReflexesL.LCr1} onChange={e => handleChangeReflexesL(e, 'LCr1')} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        <br />

        <div className="efwewedc_neuro">
          <div className="case_sheet_5con_20 nero20">
            <label>
              Sensory Exam <span>:</span>
            </label>
            <textarea
              id="SensoryExam"
              name="SensoryExam"
              value={neurologyData.SensoryExam}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>
          <div className="case_sheet_5con_20 nero20">
            <label>
              Involuntary Movements <span>:</span>
            </label>
            <textarea
              id="InvoluntaryMovements"
              name="InvoluntaryMovements"
              value={neurologyData.InvoluntaryMovements}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>
        </div>
        <br />
        <br />
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
          Cerebellar Signs
        </h4>

        <br />
        <div className="efwewedc_neuro">
          <div className="case_sheet_5con_20 nero20">
            <label>
              F.N. <span>:</span>
            </label>
            <textarea
              id="FN"
              name="FN"
              value={neurologyData.FN}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>
          <div className="case_sheet_5con_20 nero20">
            <label>
              Dysdiadoko <span>:</span>
            </label>
            <textarea
              id="Dysdiadoko"
              name="Dysdiadoko"
              value={neurologyData.Dysdiadoko}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>
          <div className="case_sheet_5con_20 nero20">
            <label>
              Tandem <span>:</span>
            </label>
            <textarea
              id="Tandem"
              name="Tandem"
              value={neurologyData.Tandem}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
          </div>
          <div className="case_sheet_5con_20 nero20">
            <label>
              Gait <span>:</span>
            </label>
            <textarea
              id="Gait"
              name="Gait"
              value={neurologyData.Gait}
              onChange={handleChange1}
              className="lifecycle_h3udwh34"
            ></textarea>
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
          {/* <button className="RegisterForm_1_btns" onClick={handleSubmit}>Submit</button> */}
        </div>


      </div>

      {GetData.length > 0 &&
        <ReactGrid columns={NeurologyColumns} RowData={GetData} />
      }




      <ToastAlert Message={toast.message} Type={toast.type} />


    </>

  );
}

export default Neurology;









