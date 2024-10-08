import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector ,useDispatch} from 'react-redux';
import LoupeIcon from "@mui/icons-material/Loupe";
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import EditIcon from "@mui/icons-material/Edit";

const TrayManagementList =()=> {

    const UrlLink = useSelector(state => state.userRecord?.UrlLink);


    const [ProductArray,setProductArray]=useState([])
    const [ItemsArray,setItemsArray]=useState([])

    const [TrayStatus,setTrayStatus]=useState('All')


    const [TrayArray,setTrayArray]=useState([])

    const [FilterTray,setFilterTray]=useState([])

    const [ShelfArray,setShelfArray]=useState([])

    const [FilterShelf,setFilterShelf]=useState([])

    const [RackArray,setRackArray]=useState([])

    const[mapingState,setmapingState]=useState({
        RackName:'',
        ShelfName:'',
        TrayName:'',
        ItemCode:'',
        ItemName:'',
    })


    const navigate = useNavigate();
    const dispatchvalue = useDispatch();

    const handleNewMaster = () => {
        navigate('/Home/TrayManagement');
        dispatchvalue({ type: 'TrayManagementState', value: {}});

    };

    useEffect(()=>{
        axios.get(`${UrlLink}Masters/Rack_Detials_link`)
        .then((res)=>{
            // console.log('kkkk',res.data);
    
            let data =res.data
    
            if(Array.isArray(data) && data.length !==0){
                setRackArray(data)
            }
            else{
                setRackArray([])
            }
    
        })
        .catch((err)=>{
            console.log(err);
        })
    
    // ------------------------------------------------------
    
        axios.get(`${UrlLink}Masters/Shelf_Detials_link`)
        .then((res)=>{
            let data =res.data
    
                if(Array.isArray(data) && data.length !==0){
                    setShelfArray(data)
                }
                else{
                    setShelfArray([])
                }
    
        })
        .catch((err)=>{
            console.log(err);
        })
    
    // ------------------------------------------------------
    
        axios.get(`${UrlLink}Masters/Tray_Detials_link`)
        .then((res)=>{
            let data =res.data
    
          if(Array.isArray(data) && data.length !==0){
              setTrayArray(data)
          }
          else{
              setTrayArray([])
          }
        })
        .catch((err)=>{
            console.log(err);
        })


    // ---------------------------------

    axios.get(`${UrlLink}Masters/Medical_ProductMaster_link`)
          .then((res)=>{
            let data =res.data
    
            if(Array.isArray(data) && data.length !==0){
              setItemsArray(data)
            }
            else{
                setItemsArray([])
            }    
          })
          .catch((err)=>{
            console.log(err)
          })


    },[UrlLink])



    const handleInputChange=(e)=>{
        const {name,value}=e.target

        if(name === 'RackName'){
        let Filter=ShelfArray.filter((ele)=>ele.Rack_Id === +value)
        setFilterShelf(Filter)
        setmapingState((prev)=>({
            ...prev,
            [name]:value,
            ShelfName: '',
            TrayName:'',
        }))
        }
        else if(name === 'ShelfName'){
            let Filter=TrayArray.filter((ele)=>ele.Shelf_Id === +value)
            setFilterTray(Filter)
            setmapingState((prev)=>({
                ...prev,
                [name]:value,
                TrayName:'',
            }))
        }
        else if(name === 'ItemCode'){
            let find=ItemsArray.find((ele)=>ele.id === value)
            
            if(find){
                setmapingState((prev)=>({
                    ...prev,
                    [name]:value,
                    ItemName:find?.ItemName,
                }))
            }
            else{
                setmapingState((prev)=>({
                    ...prev,
                    [name]:value,
                    ItemName:'',
                }))

            }
        }

        else if(name === 'ItemName'){
            let find=ItemsArray.find((ele)=>ele.ItemName === value)
            
            if(find){
                setmapingState((prev)=>({
                    ...prev,
                    [name]:value,
                    ItemCode:find?.id,
                }))
            }
            else{
                setmapingState((prev)=>({
                    ...prev,
                    [name]:value,
                    ItemCode:'',
                }))

            }
        }
        else{
            setmapingState((prev)=>({
                ...prev,
                [name]:value
            }))  
        }

    }


    useEffect(()=>{

        let Senddata={
            TrayStatus:TrayStatus,
            RackName:mapingState.RackName,
            ShelfName:mapingState.ShelfName,
            TrayName:mapingState.TrayName,
            ItemCode:mapingState.ItemCode
        }

        let queryString = new URLSearchParams(Senddata).toString();

        axios.get(`${UrlLink}Masters/Tray_Management_List_For_Medicen?${queryString}`)
        .then((res)=>{
            console.log('222',res.data);
            let data=res.data
            if(data.length !==0 && Array.isArray(data))
            {
                setProductArray(data)
            }
            else{
                setProductArray([])
            }            
            
        })
        .catch((err)=>{
            console.log(err);            
        })
    },[TrayStatus,mapingState])

   


    const TrayManagementColumn=[
        {
            key:'id',
            name:'S.No',
            frozen:true
        },
        {
            key:'Rack_Name',
            name:'Rack Name',
            frozen:true
        },
        {
            key:'Shelf_Name',
            name:'Shelf Name',
            frozen:true
        },
        {
            key:'Tray_Name',
            name:'Tray Name',
            frozen:true
        },
        {
            key:'Item_Code',
            name:'Item Code'
        },
        {
            key:'Item_Name',
            name:'Item Name'
        },
        
        
    ]




  return (
    <>
      <div className="Main_container_app">
                <h3>Medical Tray Management List</h3>

                <div className="RegisterTypecon">
                    <div className="RegisterType">
                        {["All", "Available", "Occupied","InActive"].map((p, ind) => (
                            <div className="registertypeval" key={ind}>
                                <input
                                    type="radio"
                                    id={p}
                                    name="appointment_type"
                                    checked={TrayStatus === p}
                                    onChange={(e) => {
                                        setTrayStatus(e.target.value)
                                    }}
                                    value={p}
                                />
                                <label htmlFor={p}>
                                    {p}
                                </label>
                            </div>
                        ))}
                        <button
                        className="search_div_bar_btn_1"
                        onClick={handleNewMaster}
                        title="New Doctor Register"
                        >
                            <LoupeIcon />
                        </button>
                    </div>
                    
                </div>
                
                <br/>
                
                <div className="RegisFormcon_1"> 
                
                <div className="RegisForm_1">
                <label htmlFor='RackName'>Rack Name:</label>
                <select
                    id="RackName"
                    name="RackName"
                    value={mapingState.RackName}
                    onChange={handleInputChange}
                    >
                    <option value="">Select</option>
                    {RackArray.filter((ele) => ele.Status === true).map((ele, ind) => (
                        <option key={ind} value={ele.id}>
                        {ele.RackName}
                        </option>
                    ))}
                    </select>
                    
                    </div>

                    <div className="RegisForm_1">
                    <label htmlFor='ShelfName' >Shelf Name:</label>
                    <select
                    id="ShelfName"
                    name="ShelfName"
                    value={mapingState.ShelfName}
                    onChange={handleInputChange}
                    disabled={mapingState.RackName === ''}
                    >
                    <option value="">Select</option>
                    {FilterShelf.filter((ele) => ele.Status === true).map((ele, ind) => (
                        <option key={ind} value={ele.id}>{ele.Shelf_Name}</option>
                    ))}
                    </select>

                    </div>

                    <div className="RegisForm_1">
                    <label htmlFor='TrayName' >Tray Name:</label>
                    <select
                    id="TrayName"
                    name="TrayName"
                    value={mapingState.TrayName}
                    disabled={mapingState.ShelfName === ''}
                    onChange={handleInputChange}
                    >
                    <option value="">Select</option>
                    {FilterTray.filter((ele) => ele.Status === true).map((ele, ind) => (
                       <option key={ind} value={ele.id}>{ele.Tray_Name}</option> 
                    ))}
                    </select>

                    </div>

                    <div className="RegisForm_1">
                    <label htmlFor='TrayName' >Item Code:</label>
                    <input
                        type='text'
                        id="ItemCode"
                        name="ItemCode"
                        list='ItemCodeList'
                        value={mapingState.ItemCode}
                        onChange={handleInputChange}
                    />
                    <datalist id='ItemCodeList'>
                        {ItemsArray.map((option,index)=>(
                        <option key={index} value={option.id} ></option>
                        ))}
                    </datalist>
                    

                    </div>

                    <div className="RegisForm_1">
                    <label htmlFor='TrayName' >Item Code:</label>
                    <input
                        type='text'
                        id="ItemName"
                        name="ItemName"
                        list='ItemNameList'
                        value={mapingState.ItemName}
                        onChange={handleInputChange}
                    />
                    <datalist id='ItemNameList'>
                        {ItemsArray.map((option,index)=>(
                        <option key={index} value={option.ItemName} ></option>
                        ))}
                    </datalist>
                    

                    </div>


               
                </div>
                
                 <br/>
                <ReactGrid columns={TrayManagementColumn} RowData={ProductArray} />
            </div>
    </>
  )
}

export default TrayManagementList;