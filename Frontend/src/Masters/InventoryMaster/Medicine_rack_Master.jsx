import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';



    


const Medicine_rack_Master =()=>{


    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);

    
    const dispatchvalue = useDispatch();

    const [LocationData, setLocationData] = useState([]);

    const userRecord = useSelector((state) => state.userRecord?.UserData);


    const [RackState,setrackState]=useState({
        RackID:'',
        RackName:'',
        Location:'',
    })

    const [RackArray,setRackArray]=useState([])


    const [Shelfstate,setshelfstate]=useState({
        ShelfID:'',
        RackName:'',
        ShelfName:'',
        Location:'',
    })


    const [ShelfArray,setShelfArray]=useState([])

    const [Traystate,setTraystate]=useState({
        TrayID:'',
        RackName:'',
        ShelfName:'',
        TrayName:'',        
        Location:'',
    })


    const [TrayArray,setTrayArray]=useState([])




    useEffect(() => {
        axios.get(`${UrlLink}Masters/Location_Detials_link`)
            .then((res) => {
                const ress = res.data
                setLocationData(ress)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [UrlLink])


    // --------------------------RACK Functions--------------------------------------------------


    const GetRackdataFun = useCallback(()=>{
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
    },[UrlLink])
    

    useEffect(()=>{
        GetRackdataFun()
    },[GetRackdataFun])



    const HandleEditRackStatus = (params) => {

        console.log(params,'=====');
        let data = {
            RackID: params.id,
            Statusedit: true
        }

        axios.post(`${UrlLink}Masters/Rack_Detials_link`,data)
        .then((res)=>{
            console.log(res.data)
            let resdata=res.data
            let type=Object.keys(resdata)[0]
            let mess=Object.values(resdata)[0]
            const tdata = {
                message: mess,
                type: type,
            }
    
            dispatchvalue({ type: 'toast', value: tdata });
            GetRackdataFun()
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const HandelEditdata =(params)=>{

        let Editdata=params.row

        console.log(Editdata);

        setrackState((prev)=>({
            ...prev,
            RackName:Editdata.RackName,
            Location:Editdata.Location_Id,
            RackID:Editdata.id,

        }))
    }

    const RackColumns =[
        {
            key: 'id',
            name:'Rack Id',
            frozen: true
        },
        {
            key: 'RackName',
            name:'Rack Name',
            frozen: true
        },
        {
            key:'Location',
            name:'Location',
        },
        {
            key:'Status',
            name:'Status',
            renderCell: (params) => (
                <>
                    <Button
                        className="cell_btn"
                        onClick={() => HandleEditRackStatus(params.row)}
                    >
                        {params.row.Status ? "ACTIVE" : "INACTIVE"}
                    </Button>
                </>
            ),
        },
        {
            key:'Action',
            name:'Action',
            renderCell:(params)=>(
                <>
                <Button className="cell_btn" 
                onClick={()=>HandelEditdata(params)}                
                >
                <EditIcon className="check_box_clrr_cancell" />
                </Button>
                </>

            )
        }
        

    ]


   

    const HandleSaveRack =()=>{
      
            let senddata={
                ...RackState,
                created_by: userRecord?.username || ''
            }
            
            axios.post(`${UrlLink}Masters/Rack_Detials_link`,senddata)
            .then((res)=>{
                let resdata =res.data
                let type = Object.keys(resdata)[0]
                let mess = Object.values(resdata)[0]
                const tdata = {
                    message: mess,
                    type: type,
                }
        
                dispatchvalue({ type: 'toast', value: tdata });
                GetRackdataFun() 
                setrackState({
                    RackID:'',
                    RackName:'',
                    Location:''
                })
            })  
            .catch((err)=>{
                console.log(err);
            })  
        
                 
    }




// ---------------------------------------------------------------


const getShelfdata = useCallback (()=>{

    axios.get(`${UrlLink}Masters/Shelf_Detials_link`)
    .then((res)=>{
        // console.log(res.data);
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

},[UrlLink])


useEffect(()=>{
    getShelfdata()
},[getShelfdata])


const HandelChangeShelfStatus =(params)=>{

    // console.log(params);
    let data = {
        ShelfID:params.id,
        Statusedit: true
    }

    axios.post(`${UrlLink}Masters/Shelf_Detials_link`,data)
    .then((res)=>{
        console.log(res.data);
        let resdata=res.data
            let type=Object.keys(resdata)[0]
            let mess=Object.values(resdata)[0]
            const tdata = {
                message: mess,
                type: type,
            }

            dispatchvalue({ type: 'toast', value: tdata });
            getShelfdata()

    })
    .catch((err)=>{
        console.log(err);
    })
}



const HandelEditShelfdata =(params)=>{

    let Editdata=params
    setshelfstate((prev)=>({
        ...prev,
        ShelfID:Editdata.id,
        RackName:Editdata.Rack_Id,
        ShelfName:Editdata.Shelf_Name,
        Location:Editdata.Location_Id,
    }))


}


const ShelfColumns=[
    {
        key:'id',
        name:'Shelf Id',
        frozen: true
    },
    {
        key:'Shelf_Name',
        name:'Shelf Name',
        frozen:true
    },
    {
        key:'Rack_Name',
        name:'Rack_Name',
        frozen:true
    },
    {
        key:'Location_Name',
        name:'Location',
        frozen:true

    },
    {
        key:'Status',
        name:'Status',
        renderCell:(params)=>(
            <>
            <Button
            className="cell_btn"
            onClick={()=>HandelChangeShelfStatus(params.row)}
            >
            {params.row.Status ? "ACTIVE" : "INACTIVE"}
            </Button>
            </>
        )
    },
    {
        key:'Action',
        name:'Action',
        renderCell:(params)=>(
            <>
            <Button 
            className="cell_btn"
            onClick={()=>HandelEditShelfdata(params.row)}
            >
            <EditIcon className="check_box_clrr_cancell" />
            </Button>
            </>
        )

    }
]




const HandleSaveShelf =()=>{

   
        let  senddata={
            ...Shelfstate,
            created_by: userRecord?.username || ''
        }
        axios.post(`${UrlLink}Masters/Shelf_Detials_link`,senddata)
        .then((res)=>{
            // console.log(res.data);
            let resdata=res.data
            let type=Object.keys(resdata)[0]
            let mess=Object.values(resdata)[0]
            const tdata = {
                message: mess,
                type: type,
            }

            dispatchvalue({ type: 'toast', value: tdata });
            setshelfstate({
                ShelfID:'',
                RackName:'',
                ShelfName: '',
                Location: '',
            })

            getShelfdata()
        })
        .catch((err)=>{
            console.log(err);
        })
    

}


// ------------------------------------------------------------------


const getTraydata =useCallback(()=>{

    axios.get(`${UrlLink}Masters/Tray_Detials_link`)
    .then((res)=>{
        let data =res.data
        // console.log('0000',data);
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

},[])

useEffect(()=>{
    getTraydata()
},[getTraydata])


const HandelChangeTrayStatus =(params)=>{
    let data = {
        TrayID:params.id,
        Statusedit: true
    }

    axios.post(`${UrlLink}Masters/Tray_Detials_link`,data)
    .then((res)=>{
        console.log(res.data);
        getTraydata()
    })
    .catch((err)=>{
        console.log(err);
    })
}

const HandelEditTraydata =(params)=>{

    let Editdata =params

    setTraystate((prev)=>({
        ...prev,
        TrayID:Editdata.id,
        TrayName:Editdata.Tray_Name,
        RackName:Editdata.Rack_Id,
        ShelfName:Editdata.Shelf_Id,
        Location:Editdata.Location_Id,
    }))

}

const TrayColumn=[
    {
        key:'id',
        name:'Tray Id',
        frozen:true 
    },
    {
        key:'Tray_Name',
        name:'Tray Name',
        frozen:true
    },
    {
        key:'Shelf_Name',
        name:'Shelf Name',
    },
    {
        key:'Rack_Name',
        name:'Rack Name'
    },
    {
        key:'Location_Name',
        name:'Location Name'
    },
    {
        key:'Status',
        name:'Status',
        renderCell:(params)=>(
            <>
            <Button
             className="cell_btn"
             onClick={()=>HandelChangeTrayStatus(params.row)}
            >
            {params.row.Status ? "ACTIVE" : "INACTIVE"}
            </Button>
            </>
        )
    },
    {
        key:'Action',
        name:'Action',
        renderCell:(params)=>(
            <>
            <Button
            className="cell_btn"
            onClick={()=>HandelEditTraydata(params.row)}
            >
            <EditIcon className="check_box_clrr_cancell" />
            </Button>
            </>
        )
    }
]

const  HandleSaveTray =()=>{

    let  senddata={
        ...Traystate,
        created_by: userRecord?.username || ''
    }

    axios.post(`${UrlLink}Masters/Tray_Detials_link`,senddata)
    .then((res)=>{
        // console.log(res.data);
        let resdata =res.data
        let type = Object.keys(resdata)[0]
        let mess = Object.values(resdata)[0]
        const tdata = {
            message: mess,
            type: type,
        }

        dispatchvalue({ type: 'toast', value: tdata });

        setTraystate({
            TrayID: "",
            RackName:  "",
            ShelfName:  "",
            TrayName: "",
            Location:"",
        })

        getTraydata()

    })
    .catch((res)=>{
        console.log(res);
    })

}


    return(
        <>
        <div className="Main_container_app">
         <h3>Medicine Rack Master</h3>
         <div className="common_center_tag">
             <span>Rack Name</span>
         </div>

        <div className="RegisFormcon_1">

            <div className="RegisForm_1">
                <label> Location <span>:</span> </label>
                <select
                    name='Location'
                    required
                    value={RackState.Location}
                    onChange={(e) => setrackState((prev) => ({ ...prev, Location: e.target.value, RackName : '' }))}
                >
                    <option value=''>Select</option>
                    {
                        LocationData.map((p, index) => (
                            <option key={index} value={p.id}>{p.locationName}</option>
                        ))
                    }
                </select>
                </div>

                <div className="RegisForm_1">
                    <label> Rack Name <span>:</span> </label>
                    <input
                        type="text"
                        name='RackName'
                        autoComplete='off'
                        required
                        value={RackState.RackName}
                        onChange={(e) => setrackState((prev) => ({ ...prev, RackName: e.target.value.toUpperCase() }))}
                    />
                </div>
        </div>

        <div className="Main_container_Btn">
            <button onClick={HandleSaveRack} >
            {RackState.RackID ? "Update" : "Add"}
        </button>
        </div>


        <ReactGrid columns={RackColumns} RowData={RackArray}/>


        {/* --------------------------------------------- */}

        <div className="common_center_tag">
             <span>Shelf Name</span>
        </div>

        <div className="RegisFormcon_1">

        <div className="RegisForm_1">
            <label> Location <span>:</span> </label>
            <select
                name='Location'
                required
                value={Shelfstate.Location}
                onChange={(e) => setshelfstate((prev) => ({ ...prev, Location: e.target.value,RackName : '',ShelfName : '' }))}
            >
            <option value=''>Select</option>
            {
                LocationData.map((p, index) => (
                    <option key={index} value={p.id}>{p.locationName}</option>
                ))
            }
            </select>
            </div>


        <div className="RegisForm_1">
            <label> Rack Name <span>:</span> </label>
            <select
                name='RackName'
                required
                value={Shelfstate.RackName}
                onChange={(e) => setshelfstate((prev) => ({ ...prev, RackName: e.target.value, ShelfName : '' }))}
            >
                <option value=''>Select</option>
                {   
                    RackArray.filter((ele)=>ele.Location_Id === +Shelfstate.Location && ele.Status === true).map((p, index) => (
                        <option key={index} value={p.id}>{p.RackName}</option>
                    ))
                }
                </select>
            </div>

            <div className="RegisForm_1">
                <label> Shelf Name <span>:</span> </label>
                <input
                    type="text"
                    name='ShelfName'
                    autoComplete='off'
                    required
                    value={Shelfstate.ShelfName}
                    onChange={(e) => setshelfstate((prev) => ({ ...prev, ShelfName: e.target.value.toUpperCase() }))}
                />
            </div>
        </div>

        <div className="Main_container_Btn">
            <button onClick={HandleSaveShelf} >
            {Shelfstate.ShelfID ? "Update" : "Add"}
        </button>
        </div>


        <ReactGrid columns={ShelfColumns} RowData={ShelfArray}/>


{/* ----------------------------------------------------- */}

        <div className="common_center_tag">
             <span>Tray Name</span>
        </div>

        <div className="RegisFormcon_1">

        <div className="RegisForm_1">
            <label> Location <span>:</span> </label>
            <select
                name='Location'
                required
                value={Traystate.Location}
                onChange={(e) => setTraystate((prev) => ({ ...prev, Location: e.target.value,RackName : '',ShelfName : '' }))}
            >
            <option value=''>Select</option>
            {
                LocationData.map((p, index) => (
                    <option key={index} value={p.id}>{p.locationName}</option>
                ))
            }
            </select>
            </div>


        <div className="RegisForm_1">
            <label> Rack Name <span>:</span> </label>
            <select
                name='RackName'
                required
                value={Traystate.RackName}
                onChange={(e) => setTraystate((prev) => ({ ...prev, RackName: e.target.value, ShelfName : '',TrayName:'' }))}
            >
                <option value=''>Select</option>
                {   
                    RackArray.filter((ele)=>ele.Location_Id === +Traystate.Location && ele.Status === true).map((p, index) => (
                        <option key={index} value={p.id}>{p.RackName}</option>
                    ))
                }
                </select>
            </div>

            <div className="RegisForm_1">
            <label> Shelf Name <span>:</span> </label>
            <select
                name='ShelfName'
                required
                value={Traystate.ShelfName}
                onChange={(e) => setTraystate((prev) => ({ ...prev, ShelfName: e.target.value, TrayName : '' }))}
            >
                <option value=''>Select</option>
                {   
                    ShelfArray.filter((ele)=>ele.Rack_Id === +Traystate.RackName && ele.Status === true).map((p, index) => (
                        <option key={index} value={p.id}>{p.Shelf_Name}</option>
                    ))
                }
                </select>
            </div>

            <div className="RegisForm_1">
                <label> Tray Name <span>:</span> </label>
                <input
                    type="text"
                    name='TrayName'
                    autoComplete='off'
                    required
                    value={Traystate.TrayName}
                    onChange={(e) => setTraystate((prev) => ({ ...prev, TrayName: e.target.value.toUpperCase() }))}
                />
            </div>
        </div>

        <div className="Main_container_Btn">
            <button onClick={HandleSaveTray} >
            {Traystate.TrayID ? "Update" : "Add"}
        </button>
        </div>


        <ReactGrid columns={TrayColumn} RowData={TrayArray}/>




        </div>

        <ToastAlert Message={toast.message} Type={toast.type} />
        
        </>
    )
}

export default Medicine_rack_Master;