"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3685],{3685:(e,o,a)=>{a.r(o),a.d(o,{default:()=>c});var n=a(6213),d=a(5043),l=a(3003),t=a(6133),i=a(7513),r=a(5394),m=a(6324),s=a(579);const c=()=>{const[e,o]=(0,d.useState)(null),a=(0,l.d4)((e=>{var o;return null===(o=e.Frontoffice)||void 0===o?void 0:o.IP_DoctorWorkbenchNavigation})),c=(0,l.d4)((e=>{var o;return null===(o=e.userRecord)||void 0===o?void 0:o.toast})),u=(0,l.d4)((e=>{var o;return null===(o=e.userRecord)||void 0===o?void 0:o.UserData})),N=(0,l.d4)((e=>{var o;return null===(o=e.userRecord)||void 0===o?void 0:o.UrlLink})),v=(0,l.d4)((e=>{var o;return null===(o=e.Frontoffice)||void 0===o?void 0:o.RegisterRoomShow})),R=(0,l.d4)((e=>{var o;return null===(o=e.Frontoffice)||void 0===o?void 0:o.SelectRoomRegister})),[g,k]=(0,d.useState)(!1),[B,y]=(0,d.useState)({BuildingId:null,BuildingName:"",BlockId:null,BlockName:"",FloorId:null,FloorName:"",WardId:null,WardName:"",RoomId:null,RoomName:"",RoomNo:"",BedNo:"",id:""}),I=(0,l.wA)();(0,d.useEffect)((()=>{0!==Object.keys(R).length&&y({BuildingId:R.BuildingId,BuildingName:R.BuildingName,BlockId:R.BlockId,BlockName:R.BlockName,FloorId:R.FloorId,FloorName:R.FloorName,WardId:R.WardId,WardName:R.WardName,RoomId:R.RoomId,RoomName:R.RoomName,RoomNo:R.RoomNo,BedNo:R.BedNo,id:R.id})}),[R]),(0,d.useEffect)((()=>{n.A.get("".concat(N,"Frontoffice/get_ip_roomdetials_for_bedtransfer_details?RegistrationId=").concat(null===a||void 0===a?void 0:a.RegistrationId)).then((e=>{const a=e.data;o(a)})).catch((e=>{o(null),console.log(e)}))}),[N,a,g]);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"new-patient-registration-form",children:[(0,s.jsx)("br",{}),(0,s.jsx)("div",{className:"DivCenter_container",children:"Bed Transfer Request"}),(0,s.jsx)("br",{}),(null===e||void 0===e?void 0:e.Roomsdata)&&0!==(null===e||void 0===e?void 0:e.Roomsdata.length)&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"DivCenter_container",children:" Previous Room "}),(0,s.jsx)("br",{}),(0,s.jsx)(t.A,{columns:[{key:"DateTime",name:"DateTime",frozen:!0},{key:"Status",name:"Status",frozen:!0},{key:"Admitted_Date",name:"In Time"},{key:"Discharge_Date",name:"Out Time"},{key:"BuildingName",name:"Building Name"},{key:"BlockName",name:"Block Name"},{key:"FloorName",name:"Floor Name"},{key:"WardName",name:"Ward Name"},{key:"RoomName",name:"Room Name"},{key:"RoomNo",name:"Room No"},{key:"BedNo",name:"Bed No"},{key:"RoomId",name:"Room Id"}],RowData:null===e||void 0===e?void 0:e.Roomsdata})]}),(0,s.jsx)("div",{className:"DivCenter_container",children:" current Room "}),(0,s.jsx)("br",{}),(null===e||void 0===e?void 0:e.ip_register_data)&&(0,s.jsx)(t.A,{columns:[{key:"DateTime",name:"DateTime",frozen:!0},{key:"BuildingName",name:"Building Name"},{key:"BlockName",name:"Block Name"},{key:"FloorName",name:"Floor Name"},{key:"WardName",name:"Ward Name"},{key:"RoomName",name:"Room Name"},{key:"RoomNo",name:"Room No"},{key:"BedNo",name:"Bed No"},{key:"RoomId",name:"Room Id"}],RowData:null===e||void 0===e?void 0:e.ip_register_data}),(0,s.jsx)("div",{className:"DivCenter_container",children:"Change Room  "}),(0,s.jsx)("div",{className:"DivCenter_container",children:(0,s.jsx)(r.aRz,{className:"HotelIcon_registration",onClick:()=>{I({type:"RegisterRoomShow",value:{type:"IP",val:!0}})}})}),(0,s.jsx)("div",{className:"RegisFormcon_1",children:["BuildingName","BlockName","FloorName","WardName","RoomName","RoomNo","BedNo"].map(((e,o)=>{return(0,s.jsxs)("div",{className:"RegisForm_1",children:[(0,s.jsxs)("label",{htmlFor:"".concat(e,"_").concat(o),children:[(a=e,/[a-z]/.test(a)&&/[A-Z]/.test(a)&&!/\d/.test(a)?a.replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^./,(e=>e.toUpperCase())):a),(0,s.jsx)("span",{children:":"})]}),(0,s.jsx)("input",{type:"text",value:B[e],disabled:!0})]},o);var a}))}),(0,s.jsx)("div",{className:"Main_container_Btn",children:(0,s.jsx)("button",{onClick:()=>{if(null!==B&&void 0!==B&&B.id){const e=window.prompt("Write an Reason For Bed Transfer");if(e){const o={RegistrationId:null===a||void 0===a?void 0:a.RegistrationId,RoomId:null===B||void 0===B?void 0:B.id,createdby:null===u||void 0===u?void 0:u.username,Reason:e};n.A.post("".concat(N,"Frontoffice/post_ip_bed_transfer_details"),o).then((e=>{console.log(e.data);const o=e.data;let a=Object.keys(o)[0];const n={message:Object.values(o)[0],type:a};k((e=>!e)),I({type:"toast",value:n}),y({BuildingId:null,BuildingName:"",BlockId:null,BlockName:"",FloorId:null,FloorName:"",WardId:null,WardName:"",RoomId:null,RoomName:"",RoomNo:"",BedNo:"",RoomId:""}),I({type:"SelectRoomRegister",value:{}})})).catch((e=>{console.log(e)}))}}else{I({type:"toast",value:{message:"Please select a Room To change",type:"warn"}})}},children:"Request to Transfer"})})]}),v.val&&(0,s.jsx)(i.A,{}),(0,s.jsx)(m.A,{Message:c.message,Type:c.type})]})}}}]);
//# sourceMappingURL=3685.2f138c6e.chunk.js.map