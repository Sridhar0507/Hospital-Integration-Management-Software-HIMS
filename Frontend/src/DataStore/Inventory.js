

const initstate={
    MedicalProductMaster:{},
    SupplierMasterStore:{},
    PurchaseOrderList:{},
    GoodsReceiptNoteList:{},

}


const Inventory = (state = initstate, action) => {
  
    switch(action.type){
        case 'MedicalProductMaster':
            return {...state,MedicalProductMaster:action.value}
        case 'SupplierMasterStore':
            return {...state,SupplierMasterStore:action.value}
        case 'PurchaseOrderList':
            return {...state,PurchaseOrderList:action.value}
        case 'GoodsReceiptNoteList':
            return {...state,GoodsReceiptNoteList:action.value}
        default:
            return state;
            
    }
    
}

export default Inventory;
