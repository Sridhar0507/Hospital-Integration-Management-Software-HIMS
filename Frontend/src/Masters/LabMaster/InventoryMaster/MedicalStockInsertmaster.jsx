import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';




const MedicalStockInsertmaster = () => {


    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);


    const [selectedFile, setSelectedFile] = useState(null);

    const [Stockdata,setStockdata]=useState([])

    const dispatchvalue = useDispatch();



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log('Selected file:', file);
    };

    const GetMedicalStock =useCallback(()=>{
        axios.get(`${UrlLink}Masters/Medical_Stock_InsetLink`)
        .then((res)=>{
            console.log(res.data);

            let data =res.data

            if(Array.isArray(data) && data.length !==0){
                setStockdata(data)
            }
            else{
                setStockdata([])
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])


    const Fileuploadfunc =()=>{

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post(`${UrlLink}Masters/Medical_Stock_InsetLink`, formData)
                .then((res) => {
                    // console.log(res.data);

                    let data = res.data
  
                    let type = Object.keys(data)[0]
                    let mess = Object.values(data)[0]
                    const tdata = {
                        message: mess,
                        type: type,
                    }
                    dispatchvalue({ type: 'toast', value: tdata }); 
                    GetMedicalStock()
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.error('No file selected for upload');
        }

    }


    useEffect(()=>{
        GetMedicalStock()
    },[UrlLink,GetMedicalStock])



    const StockColumn =[
        {
            key:'id',
            name:'id',
            frozen:true
        },
        {
            key:'Product_Name',
            name:'Product Name',
            frozen:true
        },
        {
            key:'Generic_Name',
            name:'Generic Name',
            frozen:true
        },
        {
            key:'Item_Type',
            name:'Item Type',
            frozen:true
        },
        {
            key:'Dosage',
            name:'Dosage',
            frozen:true
        },
        {
            key:'Available_Qantity',
            name:'Available Qantity',
            frozen:true
        }
    ]


  return (
    <>
      <div className="Main_container_app">
                <h3>Medical Product Master List</h3>
                
                <div className="search_div_bar">
                    <div className="search_div_bar_inp_1">
                        <label>Search Here<span>:</span></label>
                        <input
                            type="text"
                            // value={SearchQuery}
                            placeholder='Item Name,Generic Name,Company Name'
                            // onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <>
                        <input
                            id="fileInput"
                            type="file"
                            accept=".csv"
                            required
                            autoComplete="off"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <div style={{ width: '150px', display: 'flex', justifyContent: 'space-around' }}>
                            <label
                                htmlFor="fileInput"
                                className="RegisterForm_1_btns choose_file_update"
                                style={{ cursor: 'pointer' }} 
                            >
                                Choose File
                            </label>
                            <button className="fileviewbtn"
                            onClick={Fileuploadfunc}>Upload</button>
                        </div>
                    </>
                </div>

                <ReactGrid columns={StockColumn} RowData={Stockdata} />
                
                <ToastAlert Message={toast.message} Type={toast.type} />

            </div>
    </>
  )
}

export default MedicalStockInsertmaster;
