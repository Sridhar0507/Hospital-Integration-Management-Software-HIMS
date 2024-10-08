
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { Button } from '@mui/material';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import EditIcon from "@mui/icons-material/Edit";



const Productcategory = () => {

    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const userRecord = useSelector((state) => state.userRecord?.UserData);

    const dispatchvalue = useDispatch();


    const[ProductCategorystate,setProductCategorystate]=useState({
        ProductCategoryName:'',
        ProductCategoryId:'',  
    })

    const [ProductCategoryArray,setProductCategoryArray]=useState([])

    const[SubCategorystate,setSubCategorystate]=useState({
        ProductCategoryId:'',
        SubCategoryName:'',
        SubCategoryId:'',  
    })

    const [SubCategoryArray,setSubCategoryArray]=useState([])




    const[DrugGroupState,setDrugGroupState]=useState({
        DrugGroupID:'',
        DrugGroupName:''
    })


    const[DrugGroupArray,setDrugGroupArray]=useState([])


    const[ProductTypeState,setProductTypeState]=useState({
        ProductTypeID:'',
        ProductTypeName:''
    })


    const[ProductTypeArray,setProductTypeArray]=useState([])


// --------------------------------------------------------------------



const GetCategorydata=useCallback(()=>{

    axios.get(`${UrlLink}Masters/ProductCategory_Master_link`)
    .then((res)=>{
        console.log(res.data);
        let data =res.data

        if(Array.isArray(data) && data.length !==0){
            setProductCategoryArray(data)
        }
        else{
            setProductCategoryArray([])
        }

    })
    .catch((err)=>{
        console.log(err);
    })

},[])



const HandleUpdateStatus =(params)=>{
    
    let Editdata={
        ProductCategoryId:params.id,
        Statusedit:true
    }

    axios.post(`${UrlLink}Masters/ProductCategory_Master_link`,Editdata)
    .then((res)=>{
        // console.log(res.data);
        let data = res.data

        let type = Object.keys(data)[0]
        let mess = Object.values(data)[0]
        const tdata = {
            message: mess,
            type: type,
        }
        dispatchvalue({ type: 'toast', value: tdata });
        GetCategorydata()
    })
    .catch((err)=>{
        console.log(err);
    })
}


const HandeleEditName =(params)=>{

    let Editdata=params

    setProductCategorystate((prev)=>({
        ...prev,
        ProductCategoryName:Editdata.ProductCategoryName,
        ProductCategoryId:Editdata.id
        
    }))

}



const ProductCategoryColumn=[
    {
        key:'id',
        name:'Category Id',
        frozen: true
    },
    {
        key:'ProductCategoryName',
        name:'Category Name',
        frozen:true
    },
    {
        key:'Status',
        name:'Status',
        renderCell:(params)=>(
            <>
            <Button
            className="cell_btn"
            onClick={()=>HandleUpdateStatus(params.row)}
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
            onClick={()=>HandeleEditName(params.row)}
            >
            <EditIcon className="check_box_clrr_cancell" />
            </Button>
            </>
        )
    }
 
]

   
    useEffect(()=>{
     GetCategorydata()
    },[GetCategorydata])







const HandleSaveProductCategory=()=>{

    let senddata={
        ...ProductCategorystate,
        created_by: userRecord?.username || '' 
    }

    axios.post(`${UrlLink}Masters/ProductCategory_Master_link`,senddata)
    .then((res)=>{
        console.log(res.data);

            let data = res.data

            let type = Object.keys(data)[0]
            let mess = Object.values(data)[0]
            const tdata = {
                message: mess,
                type: type,
            }
            dispatchvalue({ type: 'toast', value: tdata });

            setProductCategorystate({
                ProductCategoryName:'',
                ProductCategoryId:'',  
            })

            GetCategorydata()

    })
    .catch((err)=>{
        console.log(err);
    })
    


}








// -----------------Sub Cat---------------------------------------------------------


const GetSubCategorydata=useCallback(()=>{

        axios.get(`${UrlLink}Masters/SubCategory_Master_link`)
        .then((res)=>{
            console.log(res.data);
            let data =res.data

            if(Array.isArray(data) && data.length !==0){
                setSubCategoryArray(data)
            }
            else{
                setSubCategoryArray([])
            }

        })
        .catch((err)=>{
            console.log(err);
        })

    },[])


const HandleUpdateSubStatus =(params)=>{
    
    let Editdata={
        SubCategoryId:params.id,
        Statusedit:true
    }

    axios.post(`${UrlLink}Masters/SubCategory_Master_link`,Editdata)
    .then((res)=>{
        // console.log(res.data);
        let data = res.data

        let type = Object.keys(data)[0]
        let mess = Object.values(data)[0]
        const tdata = {
            message: mess,
            type: type,
        }
        dispatchvalue({ type: 'toast', value: tdata });
        GetSubCategorydata()
    })
    .catch((err)=>{
        console.log(err);
    })
}



const HandeleSubCatEditName =(params)=>{

    let Editdata=params

    setSubCategorystate((prev)=>({
        ...prev,
        ProductCategoryId:Editdata.ProductCategoryId,
        SubCategoryName:Editdata.SubCategoryName,
        SubCategoryId:Editdata.id
        
    }))

}


const SubCategoryColumn=[
    {
        key:'id',
        name:'SubCategory Id',
        frozen: true
    },
    {
        key:'ProductCategory_Name',
        name:'Category Name',
        frozen:true
    },
    {
        key:'SubCategoryName',
        name:'SubCategory Name',
        frozen:true
    },
    {
        key:'Status',
        name:'Status',
        renderCell:(params)=>(
            <>
            <Button
            className="cell_btn"
            onClick={()=>HandleUpdateSubStatus(params.row)}
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
            onClick={()=>HandeleSubCatEditName(params.row)}
            >
            <EditIcon className="check_box_clrr_cancell" />
            </Button>
            </>
        )
    }
 
]

   
    useEffect(()=>{
     GetSubCategorydata()
    },[GetSubCategorydata])


    const HandleSaveCategory =()=>{
        let Senddata={
           ...SubCategorystate,
           created_by: userRecord?.username || '' 
        }

        axios.post(`${UrlLink}Masters/SubCategory_Master_link`,Senddata)
        .then((res)=>{
            console.log(res.data);

            let data = res.data

            let type = Object.keys(data)[0]
            let mess = Object.values(data)[0]
            const tdata = {
                message: mess,
                type: type,
            }
            dispatchvalue({ type: 'toast', value: tdata });

            setSubCategorystate({
                ProductCategoryId:'',
                SubCategoryName: '',
                SubCategoryId: ''
            })

            GetSubCategorydata()
        })
        .catch((err)=>{
            console.log(err);
        })


    }



// -----------------------------------------------------------------------


const GetDrugGroupdata = useCallback(()=>{
    axios.get(`${UrlLink}Masters/Drug_Group_link`)
    .then((res)=>{
        console.log(res.data);
        let data=res.data

        if(Array.isArray(data) && data.length !==0){
            setDrugGroupArray(data)
        }
        else{
        setDrugGroupArray([])
        }

    })
    .catch((err)=>{
        console.log(err);
    })
},[])


useEffect(()=>{
    GetDrugGroupdata()
},[GetDrugGroupdata])


const HandleUpdateStatusDrug =(params)=>{

    let Editdata={
        DrugGroupID:params.id,
        Statusedit:true
    }

    axios.post(`${UrlLink}Masters/Drug_Group_link`,Editdata)
    .then((res)=>{
        // console.log(res.data);

        let data=res.data

        let type =Object.keys(data)[0]
        let mess=Object.values(data)[0]
        
        const tdata = {
            message: mess,
            type: type,
        }
        dispatchvalue({ type: 'toast', value: tdata });

        GetDrugGroupdata()

    })
    .catch((err)=>{
        console.log(err);
    })



}


const HandeleEditDrugName =(params)=>{
    let Editdata =params

    setDrugGroupState((prev)=>({
        ...prev,
        DrugGroupID:Editdata.id,
        DrugGroupName: Editdata.DrugGroupName,
    }))

}


const DrugGroupColumn=[
    {
        key:'id',
        name:'Drug Group Id',
        frozen:true
    },
    {
        key:'DrugGroupName',
        name:'Drug Group Name',
        frozen:true
    },
    {
        key:'Status',
        name:'Status',
        renderCell:(params)=>(
            <>
            <Button
            className="cell_btn"
            onClick={()=>HandleUpdateStatusDrug(params.row)}
            >
            {params.row.Status?"ACTIVE" : "INACTIVE"}
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
            onClick={()=>HandeleEditDrugName(params.row)}
            >
            <EditIcon className="check_box_clrr_cancell" />
            </Button>
            </>
        )
    }
]



const HandleSaveDrugGroup =()=>{


    let senddata={
        ...DrugGroupState,
        created_by: userRecord?.username || '' 
    }

    axios.post(`${UrlLink}Masters/Drug_Group_link`,senddata)
    .then((res)=>{
        // console.log(res.data);

        let data = res.data

        let type = Object.keys(data)[0]
        let mess = Object.values(data)[0]
        const tdata = {
            message: mess,
            type: type,
        }
        dispatchvalue({ type: 'toast', value: tdata });

        setDrugGroupState({
            DrugGroupID:'',
            DrugGroupName:''
        })

        GetDrugGroupdata()

    })
    .catch((err)=>{
        console.log(err);
    })

}


// ---------------------------------------------------------------------


const GetProductTypedata = useCallback(()=>{
    axios.get(`${UrlLink}Masters/ProductType_Master_lik`)
    .then((res)=>{
        console.log(res.data);
        let data=res.data

        if(Array.isArray(data) && data.length !==0){
            setProductTypeArray(data)
        }
        else{
            setProductTypeArray([])
        }

    })
    .catch((err)=>{
        console.log(err);
    })
},[])


const HandeleEditProducttype =(params)=>{
    let Editdata =params

    setProductTypeState((prev)=>({
        ...prev,
        ProductTypeID:Editdata.id,
        ProductTypeName: Editdata.ProductTypeName,
    }))

}


const HandleUpdateStatusPro =(params)=>{
    
    let Editdata={
        ProductTypeID:params.id,
        Statusedit:true
    }

    axios.post(`${UrlLink}Masters/ProductType_Master_lik`,Editdata)
    .then((res)=>{
        // console.log(res.data);
        let data = res.data

        let type = Object.keys(data)[0]
        let mess = Object.values(data)[0]
        const tdata = {
            message: mess,
            type: type,
        }
        dispatchvalue({ type: 'toast', value: tdata });
        GetProductTypedata()
    })
    .catch((err)=>{
        console.log(err);
    })
}

const ProductColumn=[
    {
        key:'id',
        name:'ProductType Id',
        frozen: true
    },
    {
        key:'ProductTypeName',
        name:'ProductType Name',
        frozen:true
    },
    {
        key:'Status',
        name:'Status',
        renderCell:(params)=>(
            <>
            <Button
            className="cell_btn"
            onClick={()=>HandleUpdateStatusPro(params.row)}
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
            onClick={()=>HandeleEditProducttype(params.row)}
            >
            <EditIcon className="check_box_clrr_cancell" />
            </Button>
            </>
        )
    }
 
]

useEffect(()=>{
    GetProductTypedata()
},[GetProductTypedata])




const HandleSaveProductType=()=>{

    let senddata={
        ...ProductTypeState,
        created_by: userRecord?.username || '' 
    }

    axios.post(`${UrlLink}Masters/ProductType_Master_lik`,senddata)
    .then((res)=>{
        // console.log(res.data);

        let data = res.data

        let type = Object.keys(data)[0]
        let mess = Object.values(data)[0]
        const tdata = {
            message: mess,
            type: type,
        }
        dispatchvalue({ type: 'toast', value: tdata });

        setProductTypeState({
            ProductTypeID:'',
            ProductTypeName:''
        })

        GetProductTypedata()


    })
    .catch((err)=>{
        console.log(err);
    })

}




  return (
        <>

        <div className="Main_container_app">
            <h3>Category & Drug Group & Product Type Master</h3>

            <br/>
            <div className="common_center_tag">
                <span>Product Category</span>
            </div>
            <br/>
            
            <div className="RegisFormcon_1">

            <div className="RegisForm_1">
            <label>Product Category <span>:</span> </label>
            <input
                type="text"
                name='ProductCategoryName'
                autoComplete='off'
                required
                value={ProductCategorystate.ProductCategoryName}
                onChange={(e) => setProductCategorystate((prev) => ({ ...prev, ProductCategoryName: e.target.value.toUpperCase()}))}
            />
            </div>
            </div>

            <div className="Main_container_Btn">
            <button onClick={HandleSaveProductCategory} >
             {ProductCategorystate.ProductCategoryId ? "Update" : "Add"}
            </button>
            </div>

            <ReactGrid columns={ProductCategoryColumn} RowData={ProductCategoryArray}/>


{/* ----------------------------------------------------------------------- */}
            
            <br/>

            <div className="common_center_tag">
                <span>Sub Category</span>
            </div>

            <br/>

            <div className="RegisFormcon_1">

            <div className="RegisForm_1">

            <label>Product Category<span>:</span> </label>
            <select
            name='ProductCategoryId'
            required
            value={SubCategorystate.ProductCategoryId}
            onChange={(e) => setSubCategorystate((prev) => ({ ...prev, ProductCategoryId: e.target.value}))}
            >
            <option value=''>Select</option>
            {
            ProductCategoryArray.map((ele,ind)=>(
                <option key={ind+'key'} value={ele.id} >{ele.ProductCategoryName}</option>
            ))
            }
            </select>
            </div>


            <div className="RegisForm_1">            
            <label>Sub Category<span>:</span> </label>
            <input
                type="text"
                name='SubCategoryName'
                autoComplete='off'
                required
                value={SubCategorystate.SubCategoryName}
                onChange={(e) => setSubCategorystate((prev) => ({ ...prev, SubCategoryName: e.target.value.toUpperCase()}))}
            />
            </div>

            </div>

            <div className="Main_container_Btn">
            <button onClick={HandleSaveCategory} >
             {SubCategorystate.SubCategoryId ? "Update" : "Add"}
            </button>
            </div>

            <ReactGrid columns={SubCategoryColumn} RowData={SubCategoryArray}/>




{/* ------------------------------------------------------------------ */}
            <br/>
            <div className="common_center_tag">
                <span>Drug Group </span>
            </div>

            <br/>
            <div className="RegisFormcon_1">

            <div className="RegisForm_1">
            <label> Drug Group <span>:</span> </label>
            <input
                type="text"
                name='DrugGroupName'
                autoComplete='off'
                required
                value={DrugGroupState.DrugGroupName}
                onChange={(e) => setDrugGroupState((prev) => ({ ...prev, DrugGroupName: e.target.value.toUpperCase()}))}
            />
            </div>
            </div>

            <div className="Main_container_Btn">
            <button onClick={HandleSaveDrugGroup} >
             {DrugGroupState.DrugGroupID ? "Update" : "Add"}
            </button>
            </div>

            <ReactGrid columns={DrugGroupColumn} RowData={DrugGroupArray}/>

{/* -------------------------------------------------------------------------------------- */}
            
            <br/>

            <div className="common_center_tag">
                <span>Product Type</span>
            </div>
            <br/>
            
            <div className="RegisFormcon_1">

            <div className="RegisForm_1">
            <label>Product Type<span>:</span> </label>
            <input
                type="text"
                name='ProductTypeName'
                autoComplete='off'
                required
                value={ProductTypeState.ProductTypeName}
                onChange={(e) => setProductTypeState((prev) => ({ ...prev, ProductTypeName: e.target.value.toUpperCase()}))}
            />
            </div>
            </div>

            <div className="Main_container_Btn">
            <button onClick={HandleSaveProductType} >
             {ProductTypeState.ProductTypeID ? "Update" : "Add"}
            </button>
            </div>

            <ReactGrid columns={ProductColumn} RowData={ProductTypeArray}/>


        </div>
    
        <ToastAlert Message={toast.message} Type={toast.type} />
      
    </>
  )
}

export default Productcategory
