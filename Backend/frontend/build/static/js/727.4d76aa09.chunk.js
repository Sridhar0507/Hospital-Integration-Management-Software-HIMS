"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[727],{8727:(e,o,a)=>{a.r(o),a.d(o,{default:()=>c});var l=a(5043),d=a(3003),n=a(5394),t=a(7513),i=a(6213),r=a(6133),s=a(6324),m=a(579);const c=()=>{var e;const o=(0,d.d4)((e=>{var o;return null===(o=e.Frontoffice)||void 0===o?void 0:o.Registeredit})),a=(0,d.d4)((e=>{var o;return null===(o=e.Frontoffice)||void 0===o?void 0:o.RegisterRoomShow})),c=(0,d.d4)((e=>{var o;return null===(o=e.Frontoffice)||void 0===o?void 0:o.SelectRoomRegister})),u=(0,d.d4)((e=>{var o;return null===(o=e.userRecord)||void 0===o?void 0:o.UrlLink})),v=(0,d.d4)((e=>{var o;return null===(o=e.userRecord)||void 0===o?void 0:o.toast})),N=(0,d.d4)((e=>{var o;return null===(o=e.userRecord)||void 0===o?void 0:o.UserData})),[R,g]=(0,l.useState)(!1),[B,I]=(0,l.useState)({BuildingId:null,BuildingName:"",BlockId:null,BlockName:"",FloorId:null,FloorName:"",WardId:null,WardName:"",RoomId:null,RoomName:"",RoomNo:"",BedNo:"",id:""}),[k,h]=(0,l.useState)(null),p=(0,d.wA)();(0,l.useEffect)((()=>{0!==Object.keys(c).length&&I({BuildingId:c.BuildingId,BuildingName:c.BuildingName,BlockId:c.BlockId,BlockName:c.BlockName,FloorId:c.FloorId,FloorName:c.FloorName,WardId:c.WardId,WardName:c.WardName,RoomId:c.RoomId,RoomName:c.RoomName,RoomNo:c.RoomNo,BedNo:c.BedNo,id:c.id})}),[c]),(0,l.useEffect)((()=>{i.A.get("".concat(u,"Frontoffice/get_ip_roomdetials_before_handover_details?RegistrationId=").concat(null===o||void 0===o?void 0:o.RegistrationId)).then((e=>{const o=e.data;h(o)})).catch((e=>{h(null),console.log(e)}))}),[u,o,R]);const f=[{key:"DateTime",name:"DateTime",frozen:!0},{key:"BuildingName",name:"Building Name"},{key:"BlockName",name:"Block Name"},{key:"FloorName",name:"Floor Name"},{key:"WardName",name:"Ward Name"},{key:"RoomName",name:"Room Name"},{key:"RoomNo",name:"Room No"},{key:"BedNo",name:"Bed No"},{key:"RoomId",name:"Room Id"}];return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"new-patient-registration-form",children:[(0,m.jsx)("div",{className:"DivCenter_container",children:"Selected Room on Registration "}),(0,m.jsx)("br",{}),(null===k||void 0===k?void 0:k.ip_register_data)&&(0,m.jsx)(r.A,{columns:f,RowData:null===k||void 0===k?void 0:k.ip_register_data}),(0,m.jsx)("br",{}),(0,m.jsx)("div",{className:"DivCenter_container",children:"Change Room  "}),(0,m.jsx)("div",{className:"DivCenter_container",children:(0,m.jsx)(n.aRz,{className:"HotelIcon_registration",onClick:()=>{p({type:"RegisterRoomShow",value:{type:"IP",val:!0}})}})}),(0,m.jsx)("br",{}),(0,m.jsx)("div",{className:"RegisFormcon_1",children:["BuildingName","BlockName","FloorName","WardName","RoomName","RoomNo","BedNo"].map(((e,o)=>{return(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{htmlFor:"".concat(e,"_").concat(o),children:[(a=e,/[a-z]/.test(a)&&/[A-Z]/.test(a)&&!/\d/.test(a)?a.replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^./,(e=>e.toUpperCase())):a),(0,m.jsx)("span",{children:":"})]}),(0,m.jsx)("input",{type:"text",value:B[e],disabled:!0})]},o);var a}))}),(0,m.jsx)("div",{className:"Main_container_Btn",children:(0,m.jsx)("button",{onClick:()=>{if(null!==B&&void 0!==B&&B.id){const e={RegistrationId:null===o||void 0===o?void 0:o.RegistrationId,RoomId:null===B||void 0===B?void 0:B.id,createdby:null===N||void 0===N?void 0:N.username};console.log(e),i.A.post("".concat(u,"Frontoffice/post_ip_roomdetials_before_handover_details"),e).then((e=>{console.log(e.data);const o=e.data;let a=Object.keys(o)[0];const l={message:Object.values(o)[0],type:a};g((e=>!e)),p({type:"toast",value:l}),I({BuildingId:null,BuildingName:"",BlockId:null,BlockName:"",FloorId:null,FloorName:"",WardId:null,WardName:"",RoomId:null,RoomName:"",RoomNo:"",BedNo:"",RoomId:""}),p({type:"SelectRoomRegister",value:{}})})).catch((e=>{console.log(e)}))}else{p({type:"toast",value:{message:"Please select a Room To change",type:"warn"}})}},children:"Change"})})]}),k&&0!==(null===k||void 0===k||null===(e=k.Roomsdata)||void 0===e?void 0:e.length)&&(0,m.jsx)(r.A,{columns:f,RowData:null===k||void 0===k?void 0:k.Roomsdata}),a.val&&(0,m.jsx)(t.A,{}),(0,m.jsx)(s.A,{Message:v.message,Type:v.type})]})}}}]);
//# sourceMappingURL=727.4d76aa09.chunk.js.map