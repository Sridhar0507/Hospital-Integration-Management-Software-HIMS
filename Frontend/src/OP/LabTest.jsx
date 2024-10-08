
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactGrid from "../OtherComponent/ReactGrid/ReactGrid";
import ToastAlert from "../OtherComponent/ToastContainer/ToastAlert";
import { useDispatch, useSelector } from "react-redux";


const LabTest = () => {
    const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector((state) => state.userRecord?.toast);
    const dispatchvalue = useDispatch();


    const [LabQueue,setLabQueue] = useState({
    LabQueueId:"",
       IndivitualArr:"",
       FavouritesArr:"",
       Status: "Active",
    });
    const [testType, setTestType] = useState("Individual");
    const [activetestnames, setActivetestnames] = useState([]);
    const [FavTest, setFavTest] = useState([]);
    const [indivitualChecked, setIndivitualChecked] = useState([]);
    const [FavouriteChecked, setFavouriteChecked] = useState([]);
    console.log("indivitualChecked", indivitualChecked);
    console.log("FavouriteChecked", FavouriteChecked);


    useEffect(() => {
        axios.get(`${UrlLink}Masters/Test_Names_link_LabTest`)
            .then((response) => {
                setActivetestnames(response.data);

            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink]);

    useEffect(() => {
        axios.get(`${UrlLink}Masters/Favourites_Names_link`)
            .then((response) => {
                setFavTest(response.data);

            })
            .catch((err) => {
                console.log(err);
            });
    }, [UrlLink]);

    const handleIndividualCheckboxChange = (id, Test_Name) => {

        console.log("testName", Test_Name);
        const isChecked = indivitualChecked.some(item => item.id === id);

        if (isChecked) {
            const newCheckedState = indivitualChecked.filter(item => item.id !== id);
            setIndivitualChecked(newCheckedState);
        } else {
            const newCheckedState = [...indivitualChecked, { id, Test_Name }];
            setIndivitualChecked(newCheckedState);
        }
    };

    const handleFavoriteCheckboxChange = (key, FavouriteName, Current_Amount, TestDetails) => {
        console.log("Change detected:", key, FavouriteName, Current_Amount, TestDetails);

        const isChecked = FavouriteChecked.some(item => item.key === key);

        if (isChecked) {
            const newCheckedState = FavouriteChecked.filter(item => item.key !== key);
            setFavouriteChecked(newCheckedState);
        } else {
            const newCheckedState = [...FavouriteChecked, { key, FavouriteName, Current_Amount, TestDetails }];
            setFavouriteChecked(newCheckedState);
        }
    };

    const transformFavouriteData = (FavouriteChecked) => {
        return FavouriteChecked.flatMap(favourite =>
            favourite.TestDetails.map((testDetail, ind) => ({
                FavouriteName: favourite.FavouriteName,
                TestCode: testDetail.TestCode,
                TestName: testDetail.TestName,
                id: ind + 1,  // Ensure unique key for each row
            }))
        );
    };
    const transformFavouriteData1 = (indivitualChecked) => {
        return indivitualChecked.map((indivitual, ind) => ({
            TestCode: indivitual.id,
            TestName: indivitual.Test_Name,
            id: ind + 1,  // Ensure unique key for each row
        }));
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
            key: "FavouriteName",
            name: "Favourite Name",
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
    ];
    const transformedFavouriteData = transformFavouriteData(FavouriteChecked);
    const transformedFavouriteData1 = transformFavouriteData1(indivitualChecked);
   
    const [IsLabQueueGet,setIsLabQueueGet] = useState(false);
    const [LabQueueDatas,setLabQueueDatas] = useState([]);



    const handleSubmitSelectedTest = () => {
        if (indivitualChecked.length > 0 || FavouriteChecked.length > 0) {
            const data = {
                LabQueueId:LabQueue.LabQueueId,
                IndivitualArr:indivitualChecked||[],
                FavouritesArr:FavouriteChecked || [],
                Status:"Active"
            };
            console.log("data",data);
            // axios.post(`${UrlLink}Op/LabTest_Queue_Link`,data)
            // .then((res)=>{
            //     const  resData = res.data;
            //     const type = Object.keys(resData)[0];
            //     const message = Object.values(resData)[0];
            //     const tdata = {
            //         message:message,
            //         type:type,
            //     };
            //     dispatchvalue({type:"toast",value:tdata});
            //     setIsLabQueueGet((prev)=> !prev);
            //     setLabQueue({
            //         LabQueueId:"",
            //         IndivitualArr:"",
            //         FavouritesArr:"",
            //         Status:"Active",
            //     });
            //     setIndivitualChecked([]);
            //     setIndivitualChecked([]);

            // })
            // .catch((err)=>{
            //     console.log(err);
            // })  ;
        }
        else {
            const tdata = {
                message: "Please Select TestNames Or Favourites Names.",
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
    //         setLabQueueDatas(ress);
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     });
    // },[IsLabQueueGet,UrlLink]);


    return (
        <>
            <div className="Main_container_app">
                <div className="common_center_tag">
                    <span>Lab Test Name</span>
                </div>

                <div className="RegisFormcon_1">
                    <div className="RegisForm_1">
                        <label style={{ fontSize: '20px' }}>
                            Test Type <span>:</span>
                        </label>
                        <select
                            name="testType"
                            value={testType}
                            autoComplete="off"
                            onChange={(e) => setTestType(e.target.value)}
                        >
                            <option value="Individual">Individual</option>
                            <option value="Favourites">Favourites</option>
                        </select>
                    </div>
                </div>

                {testType === "Individual" ? (
                    <div className='displayuseraccess'>
                        {activetestnames.map((item, indx) => (
                            <div key={indx} className='displayuseraccess_child' style={{marginLeft:"80px"}}>
                                <input
                                    type="checkbox"
                                    id={item.id}
                                    onChange={() => handleIndividualCheckboxChange(item.id, item.Test_Name)}
                                    checked={indivitualChecked.some(checkedItem => checkedItem.id === item.id)}
                                />
                                <label htmlFor={item.id} className='par_acc_lab'>{item.Test_Name}</label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='displayuseraccess'>
                        {FavTest.map((item) => (
                            <div key={item.id} className='displayuseraccess_child'>
                                <input
                                    type="checkbox"
                                    id={item.id}
                                    onChange={() => handleFavoriteCheckboxChange(
                                        item.id,
                                        item.FavouriteName,
                                        item.Current_Amount,
                                        item.TestName
                                    )}
                                    checked={FavouriteChecked.some(checkedItem => checkedItem.key === item.id)}
                                />
                                <label htmlFor={item.id} className='par_acc_lab'>{item.FavouriteName}</label>
                                {item.TestName.map((child, ind1) => (
                                    <div key={ind1} style={{ marginLeft: "20px", marginTop: '5px' }}>
                                        <label htmlFor={child.TestCode} className='chi_acc_lab'>{child.TestName}</label><br />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                {transformedFavouriteData1.length > 0 && (
                    <>
                        <div className="common_center_tag">
                            <span>Selected Individual TestName</span>
                        </div>
                        <ReactGrid columns={IndivitualColumns} RowData={transformedFavouriteData1} />
                    </>
                )}

                {transformedFavouriteData.length > 0 && (
                    <>
                        <div className="common_center_tag">
                            <span>Selected Favourites Name</span>
                        </div>
                        <ReactGrid columns={FavouritesColumns} RowData={transformedFavouriteData} />
                    </>
                )}

                <div className="Main_container_Btn">
                    <button onClick={handleSubmitSelectedTest}>
                        {/* {indivitualChecked.length > 0 ? "Save" : "Update"} */}
                        save
                    </button>
                </div>


                <ToastAlert Message={toast.message} Type={toast.type} />
            </div>
        </>
    );
};

export default LabTest;
