
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from "../OtherComponent/ReactGrid/ReactGrid";
import ToastAlert from "../OtherComponent/ToastContainer/ToastAlert";



const RadiologyTest = () => {
    const [IsTestNameGet, setIsTestNameGet] = useState(false);
    const [TestNames, setTestNames] = useState([]);
    const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector((state) => state.userRecord?.toast);
    const dispatchvalue = useDispatch();

    useEffect(() => {
        axios
            .get(`${UrlLink}Masters/Radiology_details_link_view`)
            .then((res) => {
                const ress = res.data;
                console.log("testnameasas", ress);
                setTestNames(ress);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [IsTestNameGet, UrlLink]);

    const [CheckedTestName, setCheckedTestName] = useState([]);
    const [SubtestNo, setSubtestNo] = useState([]);
    console.log("CheckedTestName",CheckedTestName);
    console.log("SubtestNo",SubtestNo);

    const handleCheckboxChange = (Subtestid, SubTest_Code, SubTestName, Amount, testid, TestName,TestCode, Radiologyid, RadiologyName) => {
        const isChecked = CheckedTestName.some(item => item.SubTest_Code === SubTest_Code);
        if (isChecked) {
            const newCheckedState = CheckedTestName.filter(item => item.SubTest_Code !== SubTest_Code);
            setCheckedTestName(newCheckedState);
        } else {
            const newCheckedState = [...CheckedTestName, { Radiologyid, RadiologyName, testid, TestName, TestCode,Subtestid, SubTest_Code, SubTestName, Amount }];
            setCheckedTestName(newCheckedState);
        }
    };
    const handleCheckboxSubtestNo = (Curr_Amount, testid, TestName, Radiologyid, RadiologyName, TestCode) => {
        console.log("Curr_Amount", Curr_Amount);
        console.log("testid", testid);
        console.log("TestName", TestName);
        console.log("Radiologyid", Radiologyid);
        console.log("RadiologyName", RadiologyName);
        console.log("TestCode", TestCode);
    
        const isChecked = SubtestNo.some(item => item.TestCode === TestCode);
        if (isChecked) {
            const newCheckedState = SubtestNo.filter(item => item.TestCode !== TestCode);
            setSubtestNo(newCheckedState);
        } else {
            const newCheckedState = [...SubtestNo, { Radiologyid, RadiologyName, testid, TestName, Curr_Amount,TestCode }];
            setSubtestNo(newCheckedState);
        }
    };

    const IndivitualColumns = [

        {
            key: "id",
            name: "S.No",
            frozen: true,

        },
        {
            key: "TestCode",
            name: "Test Code",
            frozen: true,
        },
        {
            key: "RadiologyName",
            name: "Radiology Name",
            frozen: true,
        },
   

        {
            key: "TestName",
            name: "Test Name",
            frozen: true,
        },
    ];
    const FavouritesColumns = [
        {
            key: "id",
            name: "S.No ",
            frozen: true,
        },
        {
            key: "RadiologyName",
            name: "RadiologyName",
            frozen: true,
        },
        {
            key: "TestCode",
            name: "Test Code",
        },
        {
            key: "TestName",
            name: "Test Name",
        },
        {
            key: "SubTestName",
            name: "Sub TestName",
        },
        {
            key: "Amount",
            name: "Amount",
        },
    ];
    
    const transformFavouriteData = (CheckedTestName) => {
        return CheckedTestName.map((sutestyes,ind) =>({
            // sutestyes.map((sutestyes, ind) => 
                Radiologyid:sutestyes.sutestyes,
                RadiologyName: sutestyes.RadiologyName,
                TestCode: sutestyes.TestCode,
                TestName: sutestyes.TestName,
                Amount:sutestyes.Amount,
                SubTestName:sutestyes.SubTestName,
                SubTest_Code:sutestyes.SubTest_Code,
                id: ind + 1,  // Ensure unique key for each row
            }));
       
    };
    
    const transformFavouriteData1 = (SubtestNo) => {
        return SubtestNo.map((sutestno, ind) => ({
            Radiologyid:sutestno.sutestyes,
            RadiologyName: sutestno.RadiologyName,
            TestCode: sutestno.TestCode,
            TestName: sutestno.TestName,
            id: ind + 1,  // Ensure unique key for each row
        }));
    };
    const transformedFavouriteData = transformFavouriteData(CheckedTestName);
    const transformedFavouriteData1 = transformFavouriteData1(SubtestNo);

     const [RadiologyTest,setRadiologyTest] = useState({
        RadiologyTestId:"",
        CheckedTestNameArr:"",
        SubtestNoArr:"",
        Status:"Active"
     });
     const [IsRadilogyGet,setIsRadilogyGet] =useState(false);
     const [RadiologyGetNames,setRadiologyGetNames] = useState([]);

    const handleSubmitRadiologyTest = ()=>{
        if(CheckedTestName.length>0 || SubtestNo.length > 0){
            const data = {
                RadiologyTestId:RadiologyTest.RadiologyTestId,
                CheckedTestNameArr:CheckedTestName,
                SubtestNoArr:SubtestNo,
                Status:RadiologyTest.Status,
                PatientId:"2334",
                VisitId:"sdf35",
                PatientName:"TamilSelvan",
                Types:"Inpatient"
              };
             console.log("data",data) ;
            //  axios.post(`${UrlLink}Op/LabTest_Queue_Link`,data)
            //  .then((res)=>{
            //     const resData = res.data;
            //     const type = Object.keys(resData)[0];
            //     const message = Object.values(resData)[0];
            //     const tdata = {
            //         message:message,
            //         type:type,
            //     };
            //     dispatchvalue({type:"toast",value:tdata});
            //     setIsRadilogyGet((prev)=>!prev);
            //     setRadiologyTest({
                  
            //         RadiologyTestId:"",
            //         CheckedTestNameArr:[],
            //         SubtestNoArr:[],
            //         Status:"Active",
            //     });
            //    setCheckedTestName([]) ;
            //    setSubtestNo([]);
            //  })
            //  .catch((err)=>{
            //     console.log(err);
            //  });
        }
        else {
            const tdata = {
                message: "Please Select TestNames .",
                type: "warn",
            }
            dispatchvalue({ type: "toast", value: tdata });
        }
    };

    // useEffect(()=>{
    //     axios.get(`${UrlLink}Op/Radiology_details_link`)
    //     .then((res)=>{
    //         const ress = res.data;
    //         console.log("response",ress);
    //         setRadiologyGetNames(ress);
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     });
    // },[IsRadilogyGet,UrlLink]);

    return (
       
        <div className="Main_container_app">
    <div className="common_center_tag">
        <span>Radiology TestName</span>
    </div>
    <div className='displayuseraccess'>
        {TestNames.map((item) => (
            <div key={item.id} className='displayuseraccess_child'>
                <label htmlFor={item.id} style={{ fontSize: '20px', fontWeight: 'bold' }} className='par_acc_lab'>
                    {item.RadiologyName}
                </label>
                {item.TestNames.filter(test => test.Types === "No").map((test) => (
                    <div key={test.id} style={{ marginLeft: '20px', marginTop: '5px' }}>
                        <input
                            type="checkbox"
                            id={test.id}
                            onChange={() => handleCheckboxSubtestNo(test.Curr_Amount, test.id, test.TestName, item.id, item.RadiologyName, test.TestCode)}
                            checked={SubtestNo.some(checkedItem => checkedItem.TestCode === test.TestCode)}
                            
                            style={{ marginRight: '10px' }}
                        />
                        <label htmlFor={test.id} className='chi_acc_lab'>
                            {test.TestName}
                        </label>
                    </div>
                ))}
                {item.TestNames.filter(test => test.Types === "Yes").map((test) => (
                    <div key={test.id} className='displayuseraccess_child'>
                        <label htmlFor={test.id} style={{ fontSize: '16px', fontWeight: 'bold' }} className="par_acc_lab">
                            {test.TestName}
                        </label>
                        {test.Sub_test_data && test.Sub_test_data.map((subTest) => (
                            <div key={subTest.id} style={{ marginLeft: '20px', marginTop: '5px' }}>
                                <input
                                    type="checkbox"
                                    id={subTest.SubTest_Code}
                                    onChange={() => handleCheckboxChange(subTest.id, subTest.SubTest_Code, subTest.SubTestName, subTest.Amount, test.id, test.TestName, test.TestCode, item.id, item.RadiologyName)}
                                    checked={CheckedTestName.some(checkedItem => checkedItem.SubTest_Code === subTest.SubTest_Code)}
                                    style={{ marginRight: '10px' }}
                                />
                                <label htmlFor={subTest.SubTest_Code} style={{ fontSize: '16px', color: '#555' }}>
                                    {subTest.SubTestName}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        ))}
    </div>
    {transformedFavouriteData1.length > 0 && (
        <>
            <div className="common_center_tag">
                <span>Selected TestName</span>
            </div>
            <ReactGrid columns={IndivitualColumns} RowData={transformedFavouriteData1} />
        </>
    )}
    {transformedFavouriteData.length > 0 && (
        <>
            <div className="common_center_tag">
                <span>Selected SubTest Name</span>
            </div>
            <ReactGrid columns={FavouritesColumns} RowData={transformedFavouriteData} />
        </>
    )}
    <div className="Main_container_Btn">
        <button  onClick={handleSubmitRadiologyTest}>
            {/* {indivitualChecked.length > 0 ? "Save" : "Update"} */}
            save
        </button>
    </div>
    <ToastAlert Message={toast.message} Type={toast.type} />
</div>

    );

};

export default RadiologyTest;

