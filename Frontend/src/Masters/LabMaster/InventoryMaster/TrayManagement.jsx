
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector ,useDispatch} from 'react-redux';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { useNavigate } from 'react-router-dom';


const TrayManagement = () => {

    const UrlLink = useSelector(state => state.userRecord?.UrlLink);

    const toast = useSelector(state => state.userRecord?.toast);
    const userRecord = useSelector((state) => state.userRecord?.UserData);

    const navigate = useNavigate();

    const dispatchvalue = useDispatch();


    
    const [TrayArray,setTrayArray]=useState([])

    const [FilterTray,setFilterTray]=useState([])

    const [ShelfArray,setShelfArray]=useState([])

    const [FilterShelf,setFilterShelf]=useState([])

    const [RackArray,setRackArray]=useState([])

    const [ProductArray,setProductArray]=useState([])

    const [TrayManageArray,setTrayManageArray]=useState([])


    const[mapingState,setmapingState]=useState({
        RackName:'',
        ShelfName:'',
        TrayName:'',
        ItemCode:'',
        ItemName:'',
        GenericName:'',
        CompanyName:'',
        Strength:'',
        UOM:'',
        HSNCode:'',
    })



    


    useEffect(()=>{  
        axios.get(`${UrlLink}Masters/Difine_Tray_For_Medicen`)
        .then((res)=>{
            console.log('000',res.data);
            let data=res.data
            if(data.length !==0 && Array.isArray(data))
            {
                setTrayManageArray(data)
            }
            else{
                setTrayManageArray([])
            }
        })
        .catch((err)=>{
            console.log(err);
        })        

    },[UrlLink])

    useEffect(()=>{
        
    axios.get(`${UrlLink}Masters/Rack_Detials_link`)
    .then((res)=>{
        console.log('111',res.data);

        let data =res.data

        if(Array.isArray(data) && data.length !==0){

            let Fdata=data.filter((ele)=>ele.Status === true)
            setRackArray(Fdata)
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
        console.log('222',res.data);


            if(Array.isArray(data) && data.length !==0){
                let Fdata=data.filter((ele)=>ele.Status === true)
                setShelfArray(Fdata)
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
        console.log('333',res.data);


      if(Array.isArray(data) && data.length !==0){
        let Fdata=data.filter((ele)=>ele.Status === true)
          setTrayArray(Fdata)
      }
      else{
          setTrayArray([])
      }
    })
    .catch((err)=>{
        console.log(err);
    })



    // ----------------------

        axios.get(`${UrlLink}Masters/Medical_ProductMaster_link`)
          .then((res)=>{
            let data =res.data
    
            if(Array.isArray(data) && data.length !==0){
              setProductArray(data)
            }
            else{
              setProductArray([])
            }    
          })
          .catch((err)=>{
            console.log(err)
          })

    },[UrlLink])


    const formatLabel = (label) => {

        if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
            return label
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase());
        } else {
            return label;
        }
    };


    useEffect(()=>{

        if(mapingState.RackName !=='' && ShelfArray.length !==0){
            
            let Filter=ShelfArray.filter((ele)=>ele.Rack_Id === +mapingState.RackName)
            setFilterShelf(Filter)
        }
       if(mapingState.ShelfName !==''&& TrayArray.length !==0 )
        {
            let Filter=TrayArray.filter((ele)=>ele.Shelf_Id === +mapingState.ShelfName && ele.BookingStatus === "Available")
            setFilterTray(Filter)
        }
        
    },[mapingState.RackName,mapingState.ShelfName,ShelfArray,TrayArray])


    const HandelChange =(e)=>{

        const {name,value}=e.target

        if(name === 'RackName'){
        
        setmapingState((prev)=>({
            ...prev,
            [name]:value,
            ShelfName: '',
            TrayName:'',
        }))
        }
        else if(name === 'ShelfName'){
           
            setmapingState((prev)=>({
                ...prev,
                [name]:value,
                TrayName:'',
            }))
        }
        else if(name === 'ItemCode'){
            let find=ProductArray.find((ele)=>ele.id === value)
            
            if(find){
                setmapingState((prev)=>({
                    ...prev,
                    [name]:value,
                    ItemName:find?.ItemName,
                    GenericName:find?.GenericName,
                    CompanyName:find?.CompanyName,
                    Strength:find?.Strength,
                    UOM:find?.UOM,
                    HSNCode:find?.HSNCode,
                }))
            }
            else{
                setmapingState((prev)=>({
                    ...prev,
                    [name]:value,
                    ItemName:'',
                    GenericName:'',
                    CompanyName:'',
                    Strength:'',
                    UOM:'',
                    HSNCode:'',
                }))

            }
        }

        else if(name === 'ItemName'){
            let find=ProductArray.find((ele)=>ele.ItemName === value)
            
            if(find){
                setmapingState((prev)=>({
                    ...prev,
                    [name]:value,
                    ItemCode:find?.id,
                    GenericName:find?.GenericName,
                    CompanyName:find?.CompanyName,
                    Strength:find?.Strength,
                    UOM:find?.UOM,
                    HSNCode:find?.HSNCode,
                }))
            }
            else{
                setmapingState((prev)=>({
                    ...prev,
                    [name]:value,
                    ItemCode:'',
                    GenericName:'',
                    CompanyName:'',
                    Strength:'',
                    UOM:'',
                    HSNCode:'',
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



    const HandelSave =()=>{

        if(mapingState.TrayName === '' || mapingState.ItemName === '')
        {   
            const tdata = {
                        message: 'TrayName and ItemName mandatory',
                        type:'warn',
                    }
        
            dispatchvalue({ type: 'toast', value: tdata });
        }
        else{    
    
            let ItemDublicate = TrayManageArray.some((ele)=>ele.ItemCode === mapingState.ItemCode)

            let findItemDublicate = TrayManageArray.find((ele)=>ele.ItemCode === mapingState.ItemCode)
    
            console.log('ItemDublicate',ItemDublicate,findItemDublicate);

            if (ItemDublicate)
            {
                let confirmMessage =`This Item already exists on below Tray Do you want to change the item combination and free the below Tray?
                Rack Name: ${findItemDublicate.Rack_Name},Shelf Name: ${findItemDublicate.Shelf_Name},Tray Name: ${findItemDublicate.Tray_Name}.`;

                let ItemConfirmed = window.confirm(confirmMessage);

                console.log('11conform',ItemConfirmed);

                if (ItemConfirmed){


                    let Senddata={
                        ...mapingState,
                        created_by: userRecord?.username || '' ,
                        ItemConfirmed:ItemConfirmed,
                        EditTrayManaID:findItemDublicate.id,
                        EditTrayID:findItemDublicate.TrayID,
                    }

                    axios.post(`${UrlLink}Masters/Difine_Tray_For_Medicen`,Senddata)
                    .then((res)=>{
                    console.log(res.data)
        
                    let resdata =res.data
                    let type = Object.keys(resdata)[0]
                    let mess = Object.values(resdata)[0]
                    const tdata = {
                        message: mess,
                        type: type,
                    }
        
                    dispatchvalue({ type: 'toast', value: tdata });
        
                    if(type ==='Success'){
                    navigate('/Home/TrayManagementList');
                    }
        
                })
                .catch((err)=>{
                    console.log(err);
                    
                })
            

                }
                

            }
            else{

                let Senddata={
                    ...mapingState,
                    created_by: userRecord?.username || '' ,
                }


                axios.post(`${UrlLink}Masters/Difine_Tray_For_Medicen`,Senddata)
                .then((res)=>{
                    console.log(res.data)
        
                    let resdata =res.data
                    let type = Object.keys(resdata)[0]
                    let mess = Object.values(resdata)[0]
                    const tdata = {
                        message: mess,
                        type: type,
                    }
        
                    dispatchvalue({ type: 'toast', value: tdata });
        
                    if(type ==='Success'){
                    navigate('/Home/TrayManagementList');
                    }
        
                })
                .catch((err)=>{
                    console.log(err);
                    
                })
            }
    
            
            
            
        }
       
        
    
    }


  return (
   <>
   <div className="Main_container_app">
   <h3>Tray Management</h3>

   <div className="RegisFormcon_1">
    {
        Object.keys(mapingState).filter((ele)=>ele !== 'id').map((StateName,ind)=>{
        
            let OprationArray=[]
            
            switch(StateName){
                case 'RackName':
                    OprationArray=RackArray;
                    break;
                case 'ShelfName':
                    OprationArray=FilterShelf;
                    break;
                case 'TrayName':
                    OprationArray=FilterTray;
                    break;
                case 'ItemCode':
                    OprationArray=ProductArray;
                    break;
                case 'ItemName':
                    OprationArray=ProductArray;
                    break;
                default:
                    OprationArray=[]

            }

            
        return( 
            <div className="RegisForm_1" key={ind+'key'}>
                <label htmlFor={StateName}>{formatLabel(StateName)} :</label>
                
               { 

               ['RackName','ShelfName','TrayName'].includes(StateName) ?
               <select
               id={StateName}
               name={StateName}
               value={mapingState[StateName]}
               onChange={HandelChange}
               disabled={(mapingState.RackName === '' &&  StateName ==='ShelfName') ||
                (mapingState.ShelfName === '' &&  StateName ==='TrayName')
               }
               >
                <option value=''>Select</option>
                {
                OprationArray.map((option,index)=>(
                    <option key={index} value={option.id}>
                        {StateName === 'RackName' ?option.RackName :
                        StateName === 'ShelfName' ?option.Shelf_Name:
                        StateName === 'TrayName' ?option.Tray_Name:''}
                    </option>
                ))
                }
               </select>
               
               :
                <>
               <input
                type='text'
                id={StateName}
                name={StateName}
                value={mapingState[StateName]}
                onChange={HandelChange}
                list={StateName+'List'}
                disabled={
                    (mapingState.RackName === '' || mapingState.ShelfName === '' || mapingState.TrayName === '') &&
                    (StateName === 'ItemCode' || StateName === 'ItemName') ||
                    ['GenericName', 'CompanyName', 'Strength', 'UOM', 'HSNCode'].includes(StateName)
                  }
                />
                <datalist
                id={StateName+'List'}
                >
                 {
                    OprationArray.map((option,index)=>(
                    <option key={index+'key'} value={StateName === 'ItemCode' ? option.id : option.ItemName}>                         
                    </option>
                    ))
                 }   
                </datalist>
                </>
             }

            </div>
        )})
    }
   </div>

     <div className="Main_container_Btn">
        <button onClick={HandelSave} >
           {mapingState.id?'Update':'Save'} 
        </button>
        </div>

   </div>
   <ToastAlert Message={toast.message} Type={toast.type} />
   </>
  )
}

export default TrayManagement
