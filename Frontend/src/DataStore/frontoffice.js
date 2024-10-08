const initstate = {
    Registeredit: {},
    RegisterRoomShow: {type:'',val:false},
    SelectRoomRegister: {},
    RegistereditIP:{},
    RegistereditCasuality:{},
    RegistereditDiagnosis:{},
    RegistereditLaboratory:{},
    DoctorWorkbenchNavigation:{},
    IP_DoctorWorkbenchNavigation:{},
    Casuality_DoctorWorkbenchNavigation:{},
    LabWorkbenchNavigation:{},
    OPBillingData:{},
    IPBillingData:{},
    RadiologyWorkbenchNavigation:{},
    

};

const Frontoffice = (state = initstate, action) => {
    switch (action.type) {
        case 'Registeredit':
            return { ...state, Registeredit: action.value }
        case 'RegisterRoomShow':
            return { ...state, RegisterRoomShow: action.value }
        case 'SelectRoomRegister':
            return { ...state, SelectRoomRegister: action.value }
        case 'RegistereditIP':
            return { ...state, RegistereditIP: action.value }
        case 'RegistereditCasuality':
            return { ...state, RegistereditCasuality: action.value }
        case 'RegistereditDiagnosis':
            return { ...state, RegistereditDiagnosis: action.value }
        case 'RegistereditLaboratory':
            return { ...state, RegistereditLaboratory: action.value }

        
        case 'DoctorWorkbenchNavigation':
            return { ...state, DoctorWorkbenchNavigation: action.value }
        case 'IP_DoctorWorkbenchNavigation':
            return { ...state, IP_DoctorWorkbenchNavigation: action.value }
        case 'Casuality_DoctorWorkbenchNavigation':
            return { ...state, Casuality_DoctorWorkbenchNavigation: action.value }
            
        case 'LabWorkbenchNavigation':
            return { ...state, LabWorkbenchNavigation: action.value }
        case 'RadiologyWorkbenchNavigation':
            return{...state,RadiologyWorkbenchNavigation:action.value}
        case 'OPBillingData':
                return { ...state, OPBillingData: action.value }
        case 'IPBillingData':
                return { ...state, IPBillingData: action.value }
    
        default:
            return state;
    }
}

export default Frontoffice;











