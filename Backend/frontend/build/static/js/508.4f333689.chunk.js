"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[508],{508:(e,s,t)=>{t.r(s),t.d(s,{default:()=>v});var o=t(5043),n=t(3003),r=t(6213),a=t(6324),d=t(7392),l=t(7260),i=t(6133),c=t(579);const v=()=>{const e=(0,n.d4)((e=>{var s;return null===(s=e.userRecord)||void 0===s?void 0:s.UrlLink})),s=(0,n.d4)((e=>{var s;return null===(s=e.userRecord)||void 0===s?void 0:s.UserData})),t=(0,n.d4)((e=>{var s;return null===(s=e.userRecord)||void 0===s?void 0:s.toast})),v=(0,n.d4)((e=>{var s;return null===(s=e.Frontoffice)||void 0===s?void 0:s.IP_DoctorWorkbenchNavigation})),g=(0,n.wA)(),[u,h]=(0,o.useState)({ProgressNotes:"",TreatmentNotes:"",AdverseEvents:"no",colorFlag:"no"}),[m,y]=(0,o.useState)([]),[x,p]=(0,o.useState)(null),[j,b]=(0,o.useState)(!1),[k,_]=(0,o.useState)(!1),N=[{key:"id",name:"S.No",frozen:!0},{key:"Date",name:"Date"},{key:"Time",name:"Time"},{key:"Type",name:"Type"},{key:"ProgressNotes",name:"ProgressNotes"},{key:"TreatmentNotes",name:"TreatmentNotes"},{key:"AdverseEvents",name:"AdverseEvents"},{key:"colorFlag",name:"Color Flag",renderCell:e=>{const s="yes"===e.row.colorFlag?"orange":"green";return(0,c.jsx)("div",{style:{backgroundColor:s,color:"white",padding:"5px",textAlign:"center",borderRadius:"4px",minWidth:"60px"},children:"yes"===e.row.colorFlag?"Open":"Closed"})}},{key:"view",name:"View",frozen:!0,renderCell:e=>(0,c.jsx)(d.A,{onClick:()=>F(e.row),children:(0,c.jsx)(l.A,{})})}];(0,o.useEffect)((()=>{r.A.get("".concat(e,"Ip_Workbench/IP_ProgressNotes_Details_Link"),{params:{RegistrationId:null===v||void 0===v?void 0:v.RegistrationId}}).then((e=>{const s=e.data;if(s.length>0){const e=s[s.length-1];y(s),"yes"===e.colorFlag?(p(e),h({AdverseEvents:e.AdverseEvents||"",colorFlag:e.colorFlag||""})):(p(null),h({AdverseEvents:"no",colorFlag:"no"}))}})).catch((e=>{console.log(e)}))}),[j,e,null===v||void 0===v?void 0:v.RegistrationId]);const F=e=>{h({ProgressNotes:e.ProgressNotes||"",TreatmentNotes:e.TreatmentNotes||"",AdverseEvents:e.AdverseEvents||"",colorFlag:e.colorFlag||""}),_(!0)},A=()=>{h({ProgressNotes:"",TreatmentNotes:"",AdverseEvents:"no",colorFlag:"no"}),_(!1)},C=e=>{const{name:s,value:t,type:o,checked:n}=e.target;h((e=>({...e,[s]:"checkbox"===o?n?"yes":"no":t})))};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{className:"form-section5",children:[(0,c.jsx)("br",{}),(0,c.jsx)("div",{className:"Otdoctor_intra_Con",children:[{id:"ProgressNotes",label:"Progress Notes",type:"textarea"},{id:"TreatmentNotes",label:"Treatment Notes",type:"textarea"},{id:"AdverseEvents",label:"Adverse Events",type:"radio"},{id:"colorFlag",label:"Is Adverse Open",type:"radio"}].map(((e,s)=>(0,c.jsx)("div",{className:"text_adjust_mt_Ot",children:"colorFlag"===e.id&&"yes"!==u.AdverseEvents?null:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("label",{htmlFor:e.id,children:[e.label," ",(0,c.jsx)("span",{children:":"})]}),"AdverseEvents"===e.id?(0,c.jsxs)("div",{className:"text_adjust_mt_Ot_rado_0",children:[(0,c.jsx)("input",{type:"radio",id:"".concat(e.id,"_yes"),name:e.id,value:"yes",checked:"yes"===u[e.id],onChange:C,disabled:x||k}),(0,c.jsx)("label",{htmlFor:"".concat(e.id,"_yes"),children:"Yes"}),(0,c.jsx)("input",{type:"radio",id:"".concat(e.id,"_no"),name:e.id,value:"no",disabled:x||k,checked:"no"===u[e.id],onChange:C}),(0,c.jsx)("label",{htmlFor:"".concat(e.id,"_no"),children:"No"})]}):"colorFlag"===e.id&&"yes"===u.AdverseEvents?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("input",{type:"radio",id:"".concat(e.id,"_yes"),name:e.id,value:"yes",checked:"yes"===u[e.id],onChange:C,disabled:k}),(0,c.jsx)("label",{htmlFor:"".concat(e.id,"_yes"),children:"Yes"}),(0,c.jsx)("input",{type:"radio",id:"".concat(e.id,"_no"),name:e.id,value:"no",checked:"no"===u[e.id],onChange:C,disabled:k}),(0,c.jsx)("label",{htmlFor:"".concat(e.id,"_no"),children:"No"})]}):"colorFlag"!==e.id&&"AdverseEvents"!==e.id&&(0,c.jsx)("textarea",{id:e.id,name:e.id,value:u[e.id],onChange:C,readOnly:k})]})},s)))})]}),(0,c.jsx)("br",{}),(0,c.jsxs)("div",{className:"Main_container_Btn",children:[k&&(0,c.jsx)("button",{onClick:A,children:"Clear"}),!k&&(0,c.jsx)("button",{onClick:()=>{const t={...u,RegistrationId:null===v||void 0===v?void 0:v.RegistrationId,Createdby:null===s||void 0===s?void 0:s.username,Type:"Doctor"};r.A.post("".concat(e,"Ip_Workbench/IP_ProgressNotes_Details_Link"),t).then((e=>{const[s,t]=[Object.keys(e.data)[0],Object.values(e.data)[0]];g({type:"toast",value:{message:t,type:s}}),b((e=>!e)),A()})).catch((e=>console.log(e)))},children:"Submit"})]}),m.length>0&&(0,c.jsx)(i.A,{columns:N,RowData:m}),(0,c.jsx)(a.A,{Message:t.message,Type:t.type})]})}}}]);
//# sourceMappingURL=508.4f333689.chunk.js.map