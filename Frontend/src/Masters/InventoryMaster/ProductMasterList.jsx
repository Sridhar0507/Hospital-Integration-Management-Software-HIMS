import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector ,useDispatch} from 'react-redux';
import LoupeIcon from "@mui/icons-material/Loupe";
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import EditIcon from "@mui/icons-material/Edit";






const ProductMasterList = () => {


    const UrlLink = useSelector(state => state.userRecord?.UrlLink);


    const [ProductArray,setProductArray]=useState([])
    const [SearchQuery, setSearchQuery] = useState('');
    const[FilteredRows,setFilteredRows]=useState([])

    const navigate = useNavigate();
    const dispatchvalue = useDispatch();


    console.log("ProductArray",ProductArray);


    const handleNewMaster = () => {
    
        dispatchvalue({ type: 'MedicalProductMaster', value: {} });
        navigate('/Home/Productmaster');
    };


    useEffect(()=>{

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


const HandelEditdata =(params)=>{
    dispatchvalue({ type: 'MedicalProductMaster', value: params });
    navigate('/Home/Productmaster');
}



useEffect(() => {
    const lowerCaseQuery = SearchQuery.toLowerCase();
    const filteredData = ProductArray.filter((row) => {
      const lowerCaseItemName = row.ItemName.toLowerCase();
      const lowerCaseGenericName = row.GenericName.toLowerCase();
      const lowerCaseCompanyName = row.CompanyName.toLowerCase(); 

      return (
        lowerCaseItemName.includes(lowerCaseQuery) ||
        lowerCaseGenericName.includes(lowerCaseQuery) ||
        lowerCaseCompanyName.includes(lowerCaseQuery)
      );
    });

    setFilteredRows(filteredData);
  }, [SearchQuery, ProductArray]);


const ProductColumn =[
    {
        key:'id',
        name:'Item Id',
        frozen: true
    },
    {
        key:'ItemName', 
        name:'Item Name',
        frozen:true
    },
    {
        key:'GenericName',
        name:'Generic Name',
        frozen:true
    },
    {
        key:'CompanyName',
        name:'Company Name',
        frozen:true
    },
    {
        key:'Strength',
        name:'Strength',
        frozen:true
    },
    {
        key:'UOM',
        name:'UOM',
        frozen:true
    },
    {
        key:'HSNCode',
        name:'HSN Code'
    },
    {
        key:'Use_ProductCategory',
        name:'Product Category'
    },    
    {
        key:'Use_SubCategory',
        name:'Sub Category'
    },
    {
        key:'Use_DrugGroup',
        name:'Drug Group'
    },
    {
        key:'Use_PackingType',
        name:'Purchase Pack'
    },
    {
        key:'PackingQty',
        name:'Packing Qty'
    },    
    {
        key:'Use_LeastSellablePack',
        name:'Least Sellable Pack'
    },
    {
        key:'LeastSellableQty',
        name:'Least Sellable Qty'
    },
    {
        key:'MinimumQty',
        name:'Minimum Qantity'
    },
    {
        key:'MaximumQty',
        name:'Maximum Qantity'
    },
    {
        key:'Remarks',
        name:'Remarks'
    },
    {
        key:'IsConsumption',
        name:'Is Consumption',
        renderCell:(params)=>(
            <>
            {params.row.IsDistribution ? "Yes" : "No"}
            </>
        )
    },
    {
        key:'InActive',
        name:'In Active',
        renderCell:(params)=>(
            <>           
            {params.row.InActive ? "Yes" : "No"}
            </>
        )
    },
    {
        key:'Action',
        name:'Action',
        renderCell:(params)=>(
            <>
            <Button className="cell_btn" 
            onClick={()=>HandelEditdata(params.row)}               
            >
            <EditIcon className="check_box_clrr_cancell" />
            </Button>
            </>
        )
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
                            value={SearchQuery}
                            placeholder='Item Name,Generic Name,Company Name'
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        className="search_div_bar_btn_1"
                        onClick={handleNewMaster}
                        title="New Doctor Register"
                    >
                        <LoupeIcon />
                    </button>
                </div>

                <ReactGrid columns={ProductColumn} RowData={FilteredRows} />
            </div>
   </>
  )
}

export default ProductMasterList;
