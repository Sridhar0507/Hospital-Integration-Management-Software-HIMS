const initstate = {
    Usersessionid: {},
    UserData: {},
    SidebarToggle: false,
    ShowIconsOnly: false,
    DoctorListId: {},
    UserListId: {},
    Usercreatedocdata: {},
    ServiceProcedureMaster: {},
    ServiceProcedureRatecardView: {},
    InsClientDonationMaster: {},
    ClinicDetails: {
        id: '',
        Cname: '',
        Clogo: null
    },
    toast: {
        message: '',
        type: ''
    },
    modelcon: {
        Isopen: false,
        content: null,
        type: 'image/jpg'
    },
    pagewidth: 0,
    UrlLink: 'http://127.0.0.1:8000/',
    // UrlLink: 'https://hims.vesoft.co.in/',
    Selected_Patient_Pharmacy: null,
};

const Userdata = (state = initstate, action) => {
    switch (action.type) {
        case 'UserData':
            return { ...state, UserData: action.value }
        case 'Usersessionid':
            return { ...state, Usersessionid: action.value }

        case 'SidebarToggle':  // Fixed typo here
            return { ...state, SidebarToggle: action.value };

        case 'ShowIconsOnly':
            return { ...state, ShowIconsOnly: action.value };

        case 'ClinicDetails':
            return { ...state, ClinicDetails: action.value }

        case 'toast':
            return { ...state, toast: action.value }
        case 'modelcon':
            return { ...state, modelcon: action.value }

        case 'DoctorListId':
            return { ...state, DoctorListId: action.value }
        case 'UserListId':
            return { ...state, UserListId: action.value }
        case 'Usercreatedocdata':
            return { ...state, Usercreatedocdata: action.value }
        case 'pagewidth':
            return { ...state, pagewidth: action.value }

        case 'InsClientDonationMaster':
            return { ...state, InsClientDonationMaster: action.value }
        case 'ServiceProcedureMaster':
            return { ...state, ServiceProcedureMaster: action.value }
        case 'ServiceProcedureRatecardView':
            return { ...state, ServiceProcedureRatecardView: action.value }

        case "Selected_Patient_Pharmacy":
            return { ...state, Selected_Patient_Pharmacy: action.value };



        default:
            return state;
    }
}

export default Userdata;