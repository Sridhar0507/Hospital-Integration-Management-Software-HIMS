"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6487],{6487:(e,a,n)=>{n.r(a),n.d(a,{default:()=>d});var t=n(5043),o=n(3003),i=n(6133),s=n(6213),l=n(6324),c=n(7392),r=n(7260),u=n(579);const d=()=>{const e=(0,o.wA)(),a=(0,o.d4)((e=>{var a;return null===(a=e.userRecord)||void 0===a?void 0:a.UrlLink})),n=(0,o.d4)((e=>{var a;return null===(a=e.userRecord)||void 0===a?void 0:a.toast})),d=(0,o.d4)((e=>{var a;return null===(a=e.Frontoffice)||void 0===a?void 0:a.IP_DoctorWorkbenchNavigation}));console.log(d,"IP_DoctorWorkbenchNavigation");const h=(0,o.d4)((e=>{var a;return null===(a=e.userRecord)||void 0===a?void 0:a.UserData})),[m,v]=(0,t.useState)({Status:"",Site:"",LocationLR:"",Quality:"",DrainageTubeSize:"",Remarks:""}),[p,g]=(0,t.useState)([]),[x,j]=(0,t.useState)(!1),[k,S]=(0,t.useState)(!1),y=[{key:"id",name:"S.No",frozen:!0},{key:"PrimaryDoctorName",name:"Doctor Name",frozen:!0},{key:"CurrDate",name:"Date",frozen:!0},{key:"CurrTime",name:"Time",frozen:!0},{key:"view",frozen:!0,name:"View",renderCell:e=>(0,u.jsx)(c.A,{onClick:()=>R(e.row),children:(0,u.jsx)(r.A,{})})},{key:"Status",name:"Status"},{key:"Site",name:"Site"},{key:"LocationLR",name:"Location"},{key:"Quality",name:"Quality"},{key:"DrainageTubeSize",name:"DrainageTubeSize"},{key:"Remarks",name:"Remarks"}],R=e=>{v({Status:e.Status||"",Site:e.Site||"",LocationLR:e.LocationLR||"",Quality:e.Quality||"",DrainageTubeSize:e.DrainageTubeSize||"",Remarks:e.Remarks||""}),S(!0)},D=()=>{v({Status:"",Site:"",LocationLR:"",Quality:"",DrainageTubeSize:"",Remarks:""}),S(!1)};(0,t.useEffect)((()=>{s.A.get("".concat(a,"Ip_Workbench/IP_DrainageTubes_Details_Link"),{params:{RegistrationId:null===d||void 0===d?void 0:d.RegistrationId,Type:"Nurse"}}).then((e=>{const a=e.data;console.log(a),g(a)})).catch((e=>{console.log(e)}))}),[a,d,x]);const b=e=>{const{name:a,value:n}=e.target;v((e=>({...e,[a]:n})))};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{className:"RegisFormcon_1",children:Object.keys(m).map(((e,a)=>{return(0,u.jsxs)("div",{className:"RegisForm_1",children:[(0,u.jsxs)("label",{htmlFor:"".concat(e,"_").concat(a),children:["LocationLR"===e?"Location":(n=e,/[a-z]/.test(n)&&/[A-Z]/.test(n)&&!/\d/.test(n)?n.replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^./,(e=>e.toUpperCase())):n),(0,u.jsx)("span",{children:":"})]}),"Site"===e?(0,u.jsxs)("select",{id:"".concat(e,"_").concat(a),name:e,value:m[e],onChange:b,children:[(0,u.jsx)("option",{value:"",children:"Select"}),(0,u.jsx)("option",{value:"Chest",children:"Chest"}),(0,u.jsx)("option",{value:"Abdominal",children:"Abdominal"}),(0,u.jsx)("option",{value:"Orthopedic",children:"Orthopedic"}),(0,u.jsx)("option",{value:"Others",children:"Others"})]}):"Status"===e?(0,u.jsxs)("select",{id:"".concat(e,"_").concat(a),name:e,value:m[e],onChange:b,children:[(0,u.jsx)("option",{value:"",children:"Select"}),(0,u.jsx)("option",{value:"Inserted",children:"Inserted"}),(0,u.jsx)("option",{value:"StatusCheck",children:"StatusCheck"}),(0,u.jsx)("option",{value:"Removed",children:"Removed"})]}):"LocationLR"===e?(0,u.jsxs)("select",{id:"".concat(e,"_").concat(a),name:e,value:m[e],onChange:b,children:[(0,u.jsx)("option",{value:"",children:"Select"}),(0,u.jsx)("option",{value:"Left",children:"Left"}),(0,u.jsx)("option",{value:"Right",children:"Right"})]}):"Measurement"===e?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("input",{id:"".concat(e,"_").concat(a),name:"MeasurementValue",style:{width:"50px"},value:m.Measurement.replace(/[^\d]/g,""),onChange:e=>(e=>{const{value:a}=e.target;v((e=>({...e,Measurement:e.Measurement.replace(/^\d+/g,"")+a})))})(e)}),(0,u.jsxs)("select",{id:"".concat(e,"_").concat(a,"_unit"),name:"MeasurementUnit",value:m.Measurement.replace(/\d+/g,""),onChange:e=>(e=>{const{value:a}=e.target;v((e=>{const n=e.Measurement.replace(/\D+/g,"");return{...e,Measurement:n+a}}))})(e),children:[(0,u.jsx)("option",{value:"",children:"Select"}),(0,u.jsx)("option",{value:"ml",children:"ml"}),(0,u.jsx)("option",{value:"gms",children:"gms"})]})]}):"Quality"===e?(0,u.jsxs)("select",{id:"".concat(e,"_").concat(a),name:e,value:m[e],onChange:b,children:[(0,u.jsx)("option",{value:"",children:"Select"}),(0,u.jsx)("option",{value:"PatientExtubated",children:"Fresh blood"}),(0,u.jsx)("option",{value:"Dead",children:"Dark blood"}),(0,u.jsx)("option",{value:"Dead",children:"Pus"}),(0,u.jsx)("option",{value:"Dead",children:"Blood clots"}),(0,u.jsx)("option",{value:"Dead",children:"Stopped"})]}):"CentralLineInfection"===e?(0,u.jsxs)("select",{id:"".concat(e,"_").concat(a),name:e,value:m[e],onChange:b,children:[(0,u.jsx)("option",{value:"",children:"Select"}),(0,u.jsx)("option",{value:"Yes",children:"Yes"}),(0,u.jsx)("option",{value:"No",children:"No"})]}):"Remarks"===e?(0,u.jsx)("textarea",{id:"".concat(e,"_").concat(a),name:e,value:m[e],onChange:b,placeholder:"Enter your remarks here"}):"Measurement"!==e?(0,u.jsx)("input",{id:"".concat(e,"_").concat(a),autoComplete:"off",type:"DrainRemovalDate"===e||"Date"===e?"date":"DrainRemovalTime"===e?"time":"text",name:e,value:m[e],onChange:b}):null]},e);var n}))}),(0,u.jsxs)("div",{className:"Main_container_Btn",children:[k&&(0,u.jsx)("button",{onClick:D,children:"Clear"}),!k&&(0,u.jsx)("button",{onClick:()=>{console.log(null===d||void 0===d?void 0:d.RegistrationId);const n={...m,RegistrationId:null===d||void 0===d?void 0:d.RegistrationId,Createdby:null===h||void 0===h?void 0:h.username,Type:"Nurse"};console.log(n,"senddata"),s.A.post("".concat(a,"Ip_Workbench/IP_DrainageTubes_Details_Link"),n).then((a=>{const[n,t]=[Object.keys(a.data)[0],Object.values(a.data)[0]];e({type:"toast",value:{message:t,type:n}}),j((e=>!e)),D()})).catch((e=>console.log(e)))},children:"Submit"})]}),p.length>=0&&(0,u.jsx)(i.A,{columns:y,RowData:p}),(0,u.jsx)(l.A,{Message:n.message,Type:n.type})]})}}}]);
//# sourceMappingURL=6487.a38dd96f.chunk.js.map