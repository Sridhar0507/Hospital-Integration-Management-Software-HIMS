"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5018],{5018:(e,a,n)=>{n.r(a),n.d(a,{default:()=>p});var t=n(5043),l=n(3003),s=n(6213),o=n(6324),r=n(7392),i=n(7260),u=n(6133),c=n(8983),d=n(1828),m=n(579);const p=()=>{const e=(0,l.d4)((e=>{var a;return null===(a=e.userRecord)||void 0===a?void 0:a.UrlLink})),a=(0,l.d4)((e=>{var a;return null===(a=e.userRecord)||void 0===a?void 0:a.UserData})),n=(0,l.d4)((e=>{var a;return null===(a=e.userRecord)||void 0===a?void 0:a.toast})),p=(0,l.d4)((e=>{var a;return null===(a=e.Frontoffice)||void 0===a?void 0:a.IP_DoctorWorkbenchNavigation}));console.log(p,"IP_DoctorWorkbenchNavigation");const h=(0,l.wA)(),[y,x]=(0,t.useState)("Intake"),[v,j]=(0,t.useState)({IntakeType:"",IntakeMode:"",Site:"",Measurement1:"",MeasurementType1:"ml",Duration:"",DurationType:"hours",Remarks1:""}),[g,k]=(0,t.useState)({OutputType:"",Measurement2:"",MeasurementType2:"ml",Remarks2:""}),[D,I]=(0,t.useState)({totalInputDay:"",totalOutputDay:"",balance:"",balanceType:""}),b=e=>["e","E","+","-"].includes(e.key)&&e.preventDefault(),[T,O]=(0,t.useState)(!1),[R,S]=(0,t.useState)(!1),[M,N]=(0,t.useState)([]),[f,C]=(0,t.useState)([]),[w,F]=(0,t.useState)([]),[_,A]=(0,t.useState)(0),[z,P]=(0,t.useState)(0),V=[{key:"id",name:"S.No",frozen:!0},{key:"VisitId",name:"Visit ID",frozen:!0},{key:"PrimaryDoctorId",name:"Doctor Id",frozen:!0},{key:"PrimaryDoctorName",name:"Doctor Name",frozen:!0},{key:"IntakeType",name:"Intake Type"},{key:"IntakeMode",name:"Intake Mode"},{key:"Site",name:"Site"},{key:"Measurement1",name:"Measurement"},{key:"MeasurementType1",name:"Measurement Type"},{key:"Duration",name:"Duration"},{key:"Remarks",name:"Remarks"},{key:"Date",name:"Date",frozen:!0},{key:"Time",name:"Time",frozen:!0},{key:"view",name:"View",frozen:!0,renderCell:e=>(0,m.jsx)(r.A,{onClick:()=>E(e.row),children:(0,m.jsx)(i.A,{})})}],B=[{key:"id",name:"S.No",frozen:!0},{key:"VisitId",name:"Visit ID",frozen:!0},{key:"PrimaryDoctorId",name:"Doctor Id",frozen:!0},{key:"PrimaryDoctorName",name:"Doctor Name",frozen:!0},{key:"OutputType",name:"Output Type"},{key:"Measurement2",name:"Measurement"},{key:"MeasurementType2",name:"Measurement Type"},{key:"Remarks2",name:"Remarks"},{key:"Date",name:"Date",frozen:!0},{key:"Time",name:"Time",frozen:!0},{key:"view",name:"View",frozen:!0,renderCell:e=>(0,m.jsx)(r.A,{onClick:()=>E(e.row),children:(0,m.jsx)(i.A,{})})}],K=[{key:"id",name:"S.No",frozen:!0},{key:"VisitId",name:"Visit ID",frozen:!0},{key:"PrimaryDoctorId",name:"Doctor Id",frozen:!0},{key:"PrimaryDoctorName",name:"Doctor Name",frozen:!0},{key:"totalInputDay",name:"Total Input (Day)"},{key:"totalOutputDay",name:"Total Output (Day)"},{key:"balance",name:"Balance"},{key:"balanceType",name:"Balance Type"},{key:"Date",name:"Date",frozen:!0},{key:"Time",name:"Time",frozen:!0},{key:"view",name:"View",frozen:!0,renderCell:e=>(0,m.jsx)(r.A,{onClick:()=>E(e.row),children:(0,m.jsx)(i.A,{})})}];(0,t.useEffect)((()=>{s.A.get("".concat(e,"Ip_Workbench/IP_InputOutputBalance_Details_Link"),{params:{RegistrationId:null===p||void 0===p?void 0:p.RegistrationId}}).then((e=>{const{intake_details:a,output_details:n,balance_details:t}=e.data;console.log("Intake Details:",a),console.log("Output Details:",n),console.log("Balance Details:",t),N(a||[]),C(n||[]),F(t||[]),W(a||[]),U(n||[])})).catch((e=>{console.error(e)}))}),[T,e,null===p||void 0===p?void 0:p.RegistrationId]);const L=()=>{const e=new Date,a=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),t=String(e.getDate()).padStart(2,"0");return"".concat(t,"-").concat(n,"-").concat(a.toString().slice(-2))},W=e=>{const a=L(),n=e.filter((e=>e.Date===a)).reduce(((e,a)=>e+(parseFloat(a.Measurement1)||0)),0);A(n),I((e=>{const a=n-e.totalOutputDay;return{...e,totalInputDay:n,balance:a,balanceType:a<0?"Negative":"Positive"}}))},U=e=>{const a=L(),n=e.filter((e=>e.Date===a)).reduce(((e,a)=>e+(parseFloat(a.Measurement2)||0)),0);P(n),I((e=>{const a=e.totalInputDay-n;return{...e,totalOutputDay:n,balance:a,balanceType:a<0?"Negative":"Positive"}}))},E=e=>{j({ReasonForAdmission:e.ReasonForAdmission||"",PatientConditionOnAdmission:e.PatientConditionOnAdmission||"",DoctorIncharge:e.DoctorIncharge||"",NurseIncharge:e.NurseIncharge||"",ReceptionInchargeName:e.ReceptionInchargeName||"",PatientFile:e.PatientFile||"",AadharCardNo:e.AadharCardNo||"",IntakeType:e.IntakeType||"",IntakeMode:e.IntakeMode||"",Site:e.Site||"",Measurement1:e.Measurement1||"",MeasurementType1:e.MeasurementType1||"ml",Duration:e.Duration||"",DurationType:e.DurationType||"hours",Remarks1:e.Remarks||""}),k({OutputType:e.OutputType||"",Measurement2:e.Measurement2||"",MeasurementType2:e.MeasurementType2||"ml",Remarks2:e.Remarks2||""}),I({totalInputDay:e.totalInputDay||"",totalOutputDay:e.totalOutputDay||"",balance:e.balance||"",balanceType:e.balanceType||""}),S(!0)},H=()=>{j({ReasonForAdmission:"",PatientConditionOnAdmission:"",DoctorIncharge:"",NurseIncharge:"",ReceptionInchargeName:"",PatientFile:"",AadharCardNo:"",IntakeType:"",IntakeMode:"",Site:"",Measurement1:"",MeasurementType1:"ml",Duration:"",DurationType:"hours",Remarks1:""}),k({OutputType:"",Measurement2:"",MeasurementType2:"ml",Remarks2:""}),I({totalInputDay:"",totalOutputDay:"",balance:"",balanceType:""}),S(!1)},J=e=>{const{name:a,value:n}=e.target;console.log(a,n),"Intake"===y?j((e=>({...e,[a]:n}))):"Output"===y?k((e=>({...e,[a]:n}))):I((e=>({...e,[a]:n})))};return(0,m.jsxs)("div",{className:"new-patient-registration-form",children:[(0,m.jsx)("br",{}),(0,m.jsxs)("div",{className:"RegisFormcon_1",children:[(0,m.jsx)("div",{style:{width:"100%",display:"grid",placeItems:"center"},children:(0,m.jsxs)(d.A,{value:y,exclusive:!0,onChange:e=>{x(e.target.value)},"aria-label":"Platform",children:[(0,m.jsx)(c.A,{value:"Intake",style:{height:"30px",width:"100px",backgroundColor:"Intake"===y?"var(--selectbackgroundcolor)":"inherit"},className:"togglebutton_container",children:"Intake"}),(0,m.jsx)(c.A,{value:"Output",style:{backgroundColor:"Output"===y?"var(--selectbackgroundcolor)":"inherit",width:"100px",height:"30px"},className:"togglebutton_container",children:"Output"}),(0,m.jsx)(c.A,{value:"Balance",style:{backgroundColor:"Balance"===y?"var(--selectbackgroundcolor)":"inherit",width:"100px",height:"30px"},className:"togglebutton_container",children:"Balance"})]})}),"Intake"===y?(0,m.jsxs)("div",{className:"RegisFormcon",children:[(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Intake Type ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsxs)("select",{name:"IntakeType",value:v.IntakeType,onChange:J,readOnly:R,children:[(0,m.jsx)("option",{value:"",children:"Select"}),(0,m.jsx)("option",{value:"Solid",children:"Solid"}),(0,m.jsx)("option",{value:"SemiSolid",children:"Semi Solid"}),(0,m.jsx)("option",{value:"Fulid",children:"Fluid"})]})]}),(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Intake Mode ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsxs)("select",{name:"IntakeMode",value:v.IntakeMode,onChange:J,readOnly:R,children:[(0,m.jsx)("option",{value:"",children:"Select"}),(0,m.jsx)("option",{value:"Oral",children:"Oral"}),(0,m.jsx)("option",{value:"IV",children:"IV"}),(0,m.jsx)("option",{value:"RylesTube",children:"RylesTube"})]})]}),"IV"===v.IntakeMode&&(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Site ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsxs)("select",{name:"Site",value:v.Site,onChange:J,readOnly:R,children:[(0,m.jsx)("option",{value:"",children:"Select"}),(0,m.jsx)("option",{value:"External Jugular",children:"External Jugular"}),(0,m.jsx)("option",{value:"Subclavian",children:"Subclavian"}),(0,m.jsx)("option",{value:"Femoral vein",children:"Femoral vein"}),(0,m.jsx)("option",{value:"Dorsal Venous Network of Hand",children:"Dorsal Venous Network of Hand"}),(0,m.jsx)("option",{value:"Radial vein",children:"Radial vein"}),(0,m.jsx)("option",{value:"Median Cubital vein",children:"Median Cubital vein"}),(0,m.jsx)("option",{value:"Cephalic vein",children:"Cephalic vein"}),(0,m.jsx)("option",{value:"Dorsal Venous Network of Leg",children:"Dorsal Venous Network of Leg"}),(0,m.jsx)("option",{value:"Saphaneous vein",children:"Saphaneous vein"}),(0,m.jsx)("option",{value:"Superficial Temporal vein",children:"Superficial Temporal vein"})]})]}),(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Duration ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsx)("input",{name:"Duration",type:"number",onKeyDown:b,style:{width:"50px"},value:v.Duration,onChange:J,readOnly:R}),(0,m.jsxs)("select",{name:"DurationType",style:{width:"110px"},value:v.DurationType,onChange:J,readOnly:R,children:[(0,m.jsx)("option",{value:"hours",children:"hours"}),(0,m.jsx)("option",{value:"minutes",children:"minutes"})]})]}),(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Measurement ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsx)("input",{name:"Measurement1",type:"number",onKeyDown:b,style:{width:"50px"},value:v.Measurement1,onChange:J,readOnly:R}),(0,m.jsxs)("select",{name:"MeasurementType1",style:{width:"110px"},value:v.MeasurementType1,onChange:J,readOnly:R,children:[(0,m.jsx)("option",{value:"grams",children:"grams"}),(0,m.jsx)("option",{value:"ml",children:"ml"})]})]}),(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Remarks ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsx)("textarea",{name:"Remarks1",value:v.Remarks1,onChange:J,readOnly:R})]})]}):"Output"===y?(0,m.jsxs)("div",{className:"RegisFormcon",children:[(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Output Type ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsxs)("select",{name:"OutputType",value:g.OutputType,onChange:J,readOnly:R,children:[(0,m.jsx)("option",{value:"",children:"Select"}),(0,m.jsx)("option",{value:"Vomit",children:"Vomit"}),(0,m.jsx)("option",{value:"Urine",children:"Urine"}),(0,m.jsx)("option",{value:"Stules",children:"Stools"}),(0,m.jsx)("option",{value:"Vomit",children:"Surgical Site Drainage"}),(0,m.jsx)("option",{value:"Urine",children:"Gastric"}),(0,m.jsx)("option",{value:"Stules",children:"Lab sample"}),(0,m.jsx)("option",{value:"Stules",children:"Insensible loss"}),(0,m.jsx)("option",{value:"Stules",children:"Sweating"}),(0,m.jsx)("option",{value:"Stules",children:"Oozing"}),(0,m.jsx)("option",{value:"Stules",children:"Bleeding"})]})]}),(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Measurement ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsx)("input",{name:"Measurement2",type:"number",onKeyDown:b,style:{width:"50px"},value:g.Measurement2,onChange:J,readOnly:R}),(0,m.jsxs)("select",{name:"MeasurementType2",style:{width:"110px"},value:g.MeasurementType2,onChange:J,readOnly:R,children:[(0,m.jsx)("option",{value:"grams",children:"grams"}),(0,m.jsx)("option",{value:"ml",children:"ml"})]})]}),(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Remarks ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsx)("textarea",{name:"Remarks2",value:g.Remarks2,onChange:J,readOnly:R})]})]}):(0,m.jsxs)("div",{className:"RegisFormcon",children:[(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Total Input of the day (ml/gms) ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsx)("input",{name:"totalInputDay",type:"number",onKeyDown:b,style:{width:"140px"},value:D.totalInputDay,onChange:J,readOnly:R})]}),(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Total Output of the day (ml/gms) ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsx)("input",{name:"totalOutputDay",type:"number",onKeyDown:b,style:{width:"140px"},value:D.totalOutputDay,onChange:J,readOnly:R})]}),(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Balance ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsx)("input",{name:"balance",type:"number",onKeyDown:b,style:{width:"140px"},value:D.balance,onChange:J,readOnly:R})]}),(0,m.jsxs)("div",{className:"RegisForm_1",children:[(0,m.jsxs)("label",{children:["Balance Type ",(0,m.jsx)("span",{children:":"})]}),(0,m.jsxs)("select",{name:"balanceType",value:D.balanceType,onChange:J,readOnly:R,children:[(0,m.jsx)("option",{value:"",children:"Select"}),(0,m.jsx)("option",{value:"Positive",children:"Positive"}),(0,m.jsx)("option",{value:"Negative",children:"Negative"})]})]})]}),(0,m.jsxs)("div",{className:"Main_container_Btn",children:[R&&(0,m.jsx)("button",{onClick:H,children:"Clear"}),!R&&(0,m.jsx)("button",{onClick:()=>{let n={};"Intake"===y?n=v:"Output"===y?n=g:"Balance"===y&&(n=D);const t={...n,Inserttype:y,RegistrationId:null===p||void 0===p?void 0:p.RegistrationId,Createdby:null===a||void 0===a?void 0:a.username};console.log(t,"sendData "),s.A.post("".concat(e,"Ip_Workbench/IP_InputOutputBalance_Details_Link"),t).then((e=>{const[a,t]=[Object.keys(e.data)[0],Object.values(e.data)[0]];h({type:"toast",value:{message:t,type:a}}),"Intake"===a?N((e=>{const a=[...e,n];return W(a),a})):"Output"===a?C((e=>{const a=[...e,n];return U(a),a})):"Balance"===a&&I((e=>({...e,totalInputDay:n.totalInputDay,totalOutputDay:n.totalOutputDay,balance:n.balance,balanceType:n.balanceType}))),O((e=>!e)),H()})).catch((e=>console.log(e)))},children:"Submit"})]}),"Intake"===y&&M.length>0&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(u.A,{columns:V,RowData:M}),(0,m.jsxs)("div",{style:{padding:"10px",fontWeight:"bold"},children:["Total Measurement: ",_," ml"]})]}),"Output"===y&&f.length>0&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(u.A,{columns:B,RowData:f}),(0,m.jsxs)("div",{style:{padding:"10px",fontWeight:"bold"},children:["Total Measurement: ",z," ml"]})]}),"Balance"===y&&w.length>0&&(0,m.jsx)(u.A,{columns:K,RowData:w}),(0,m.jsx)(o.A,{Message:n.message,Type:n.type})]})]})}}}]);
//# sourceMappingURL=5018.e5457c7b.chunk.js.map