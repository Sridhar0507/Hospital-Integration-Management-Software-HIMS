"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9630],{9630:(e,s,a)=>{a.r(s),a.d(s,{default:()=>v});var n=a(5043),r=a(6213),i=a(3141),t=a(3003),l=a(7201),d=a(8780),o=a(2505),c=a(6164),h=a(1556),m=a(6324),x=a(7392),u=a(7260),j=a(6133),y=(a(4312),a(7022),a(8340),a(579));const p=n.forwardRef(((e,s)=>(0,y.jsx)("div",{ref:s,className:"print-content",children:e.children})));const v=function(){const e=(0,t.d4)((e=>{var s;return null===(s=e.userRecord)||void 0===s?void 0:s.UrlLink})),s=(0,t.d4)((e=>{var s;return null===(s=e.userRecord)||void 0===s?void 0:s.UserData})),a=(0,t.d4)((e=>{var s;return null===(s=e.userRecord)||void 0===s?void 0:s.toast})),v=(0,t.wA)(),g=(0,t.d4)((e=>{var s;return null===(s=e.Frontoffice)||void 0===s?void 0:s.DoctorWorkbenchNavigation})),b=(0,t.wA)(),[N,D]=(0,n.useState)({husbandName:"",husbandage:"",bloodGroupHusband:"",durationRelation:"",phoneNumber:"",address:"",menstrualHistory:"",noOfDays:"",dysmenorrhea:"",MCB:"",attemptingPregnancy:"",sexualHistory:"",durationIC:"",visitAboard:"",medicalHistory:"",obstlHistory:"",surgicalHistory:"",AddDate:"",AddImpression:"",USGDate:"",USGImpression:""}),_=e=>{const{name:s,value:a}=e.target;D({...N,[s]:a})},[C,H]=(0,n.useState)([""]),f=["Hb","TLC","BSL","S.Prolactin","FSH","E2","HIV","Urine","AMH","TSH","LH","T3","T4","S.HCG"],[F,A]=(0,n.useState)(f.reduce(((e,s)=>({...e,[s]:""})),{})),k={date:"",count:"",mot:"",norm:""},[S,R]=(0,n.useState)([k]),I=(e,s,a)=>{const n=S.map(((n,r)=>r===e?{...n,[s]:a}:n));R(n)},[P,w]=(0,n.useState)([]),[M,O]=(0,n.useState)([{DateforDelivery:"",DayDelivery:"",RODelivery:"",LODelivery:"",ETDelivery:"",StimDelivery:""}]),G=(e,s,a)=>{const n=[...M];n[s][a]=e.target.value,O(n)},[B,L]=(0,n.useState)(!0),T=(0,n.useRef)(),U=(0,i.useReactToPrint)({content:()=>T.current,onAfterPrint:async()=>{}}),[q,E]=(0,n.useState)(""),[z,V]=(0,n.useState)(null),[W,Y]=(0,n.useState)(""),[Z,$]=(0,n.useState)({SerialNo:"",PatientID:"",AppointmentID:"",visitNo:"",firstName:"",lastName:"",AppointmentDate:"",Complaint:"",PatientPhoto:"",DoctorName:"",Age:"",Gender:"",Location:""});console.log(Z),b({type:"workbenchformData",value:Z});const J=[{key:"id",name:"S.No",frozen:!0},{key:"VisitId",name:"VisitId",frozen:!0},{key:"PrimaryDoctorId",name:"Doctor Id",frozen:!0},{key:"PrimaryDoctorName",name:"Doctor Name",frozen:!0},{key:"created_by",name:"Created By",frozen:!0},{key:"Date",name:"Date",frozen:!0},{key:"Time",name:"Time",frozen:!0},{key:"husbandName",name:"Husband Name"},{key:"husbandage",name:"Husband age"},{key:"bloodGroupHusband",name:"BloodGroupHusband"},{key:"durationRelation",name:"Duration Relation"},{key:"phoneNumber",name:"PhoneNumber"},{key:"address",name:"Address"},{key:"attemptingPregnancy",name:"AttemptingPregnancy"},{key:"menstrualHistory",name:"MenstrualHistory"},{key:"noOfDays",name:"NoOfDays"},{key:"dysmenorrhea",name:"Dysmenorrhea"},{key:"Mcb",name:"Mcb"},{key:"LMPs",name:"LMPs"},{key:"sexualHistory",name:"sexualHistory"},{key:"durationIC",name:"durationIC"},{key:"visitAboard",name:"visitAboard"},{key:"medicalHistory",name:"MedicalHistory"},{key:"obstlHistory",name:"obstlHistory"},{key:"surgicalHistory",name:"surgicalHistory"},{key:"AddDate",name:"AddDate"},{key:"AddImpression",name:"AddImpression"},{key:"USGDate",name:"USGDate"},{key:"USGImpression",name:"USGImpression"},{key:"Hb",name:"Hb"},{key:"Tlc",name:"Tlc"},{key:"Bsl",name:"Bsl"},{key:"Prolactin",name:"Prolactin"},{key:"Fsh",name:"Fsh"},{key:"e2",name:"e2"},{key:"Hiv",name:"Hiv"},{key:"Urine",name:"Urine"},{key:"Amh",name:"Amh"},{key:"Tsh",name:"Tsh"},{key:"Lh",name:"Lh"},{key:"t3",name:"t3"},{key:"t4",name:"t4"},{key:"Hcg",name:"Hcg"},{key:"selectedRows",name:"selectedRows"},{key:"view",name:"View",frozen:!0,renderCell:e=>(0,y.jsx)(x.A,{onClick:()=>ne(e.row),children:(0,y.jsx)(u.A,{})})}],[K,Q]=(0,n.useState)([]),[X,ee]=(0,n.useState)(!1),[se,ae]=(0,n.useState)(!1);(0,n.useEffect)((()=>{r.A.get("".concat(e,"Workbench/Workbench_IFCard_Details"),{params:{RegistrationId:null===g||void 0===g?void 0:g.pk}}).then((e=>{const s=e.data;Q(s),console.log(e.data,"res.data")})).catch((e=>{console.log(e)}))}),[X,e,g]);const ne=e=>{console.log(e,"8888888");D({husbandName:e.husbandName||"",husbandage:e.husbandage||"",bloodGroupHusband:e.bloodGroupHusband||"",durationRelation:e.durationRelation||"",phoneNumber:e.phoneNumber||"",address:e.address||"",menstrualHistory:e.menstrualHistory||"",noOfDays:e.noOfDays||"",dysmenorrhea:e.dysmenorrhea||"",MCB:e.Mcb||"",attemptingPregnancy:e.attemptingPregnancy||"",sexualHistory:e.sexualHistory||"",durationIC:e.durationIC||"",visitAboard:e.visitAboard||"",medicalHistory:e.medicalHistory||"",obstlHistory:e.obstlHistory||"",surgicalHistory:e.surgicalHistory||"",AddDate:e.AddDate||"",AddImpression:e.AddImpression||"",USGDate:e.USGDate||"",USGImpression:e.USGImpression||""}),A({Hb:e.Hb||"",TLC:e.Tlc||"",BSL:e.Bsl||"",SProlactin:e.Prolactin||"",FSH:e.Fsh||"",E2:e.e2||"",HIV:e.Hiv||"",Urine:e.Urine||"",AMH:e.Amh||"",TSH:e.Tsh||"",LH:e.Lh||"",T3:e.t3||"",T4:e.t4||"",SHCG:e.Hcg||""}),H(e.LMPs||[""]),O(e.drainsData3||[{DateforDelivery:"",DayDelivery:"",RODelivery:"",LODelivery:"",ETDelivery:"",StimDelivery:""}]),R(e.rows||[k]),w(e.selectedRows||[]),ae(!0)},re=()=>{D({husbandName:"",husbandage:"",bloodGroupHusband:"",durationRelation:"",phoneNumber:"",address:"",menstrualHistory:"",noOfDays:"",dysmenorrhea:"",MCB:"",attemptingPregnancy:"",sexualHistory:"",durationIC:"",visitAboard:"",medicalHistory:"",obstlHistory:"",surgicalHistory:"",AddDate:"",AddImpression:"",USGDate:"",USGImpression:""}),H([""]),R([k]),w([]),O([{DateforDelivery:"",DayDelivery:"",RODelivery:"",LODelivery:"",ETDelivery:"",StimDelivery:""}]),A(f.reduce(((e,s)=>({...e,[s]:""})),{})),ae(!1)};return(0,y.jsxs)(y.Fragment,{children:[B?(0,y.jsxs)("div",{className:"new-patient-registration-form",children:[(0,y.jsx)("br",{}),(0,y.jsxs)("div",{className:"RegisFormcon",children:[(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"husbandName",children:["Husband's Name",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("input",{type:"text",id:"husbandName",name:"husbandName",pattern:"[A-Za-z ]+",title:"Only letters and spaces are allowed",value:N.husbandName,onChange:_,required:!0})]}),(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"age",children:["Husband's Age",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("input",{type:"number",id:"husbandage",name:"husbandage",value:N.husbandage,onChange:_,required:!0})]}),(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"bloodGroupHusband",children:["Husband's Blood Group",(0,y.jsx)("span",{children:":"})]}),(0,y.jsxs)("select",{id:"bloodGroupHusband",name:"bloodGroupHusband",value:N.bloodGroupHusband,onChange:_,required:!0,children:[(0,y.jsx)("option",{value:"",children:"Select"}),(0,y.jsx)("option",{value:"A+",children:"A+"}),(0,y.jsx)("option",{value:"A-",children:"A-"}),(0,y.jsx)("option",{value:"B+",children:"B+"}),(0,y.jsx)("option",{value:"B-",children:"B-"}),(0,y.jsx)("option",{value:"AB+",children:"AB+"}),(0,y.jsx)("option",{value:"AB-",children:"AB-"}),(0,y.jsx)("option",{value:"O+",children:"O+"}),(0,y.jsx)("option",{value:"O-",children:"O-"})]})]}),(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"durationRelation",children:["Duration of Relationship",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("input",{type:"text",id:"durationRelation",name:"durationRelation",value:N.durationRelation,onChange:_,required:!0})]}),(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"phoneNumber",children:["Phone Number",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("input",{type:"tel",id:"phoneNumber",name:"phoneNumber",maxLength:"10",pattern:"^\\d{10}$",onInput:e=>e.target.value=e.target.value.replace(/[^0-9]/g,""),title:"Enter a valid 10-digit phone number",value:N.phoneNumber,onChange:_,required:!0})]}),(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"address",children:["Address",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("textarea",{id:"address",name:"address",style:{height:"35px",width:"160px"},value:N.address,onChange:_,required:!0})]})]}),(0,y.jsx)("br",{}),(0,y.jsx)("h4",{style:{color:"var(--labelcolor)",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"start",padding:"10px"},children:"Fertility History"}),(0,y.jsx)("div",{className:"case_sheet_5con",children:(0,y.jsxs)("div",{className:"case_sheet_5con_20",children:[(0,y.jsxs)("label",{htmlFor:"attemptingPregnancy",children:["Duration of attempting Pregnancy ",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("textarea",{id:"attemptingPregnancy",name:"attemptingPregnancy",value:N.attemptingPregnancy,onChange:_})]})}),(0,y.jsx)("br",{}),(0,y.jsxs)("div",{className:"RegisFormcon",children:[(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"menstrualHistory",children:["Menstrual History",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("textarea",{id:"menstrualHistory",name:"menstrualHistory",value:N.menstrualHistory,onChange:_,required:!0})]}),(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"noOfDays",children:["No.of.Days",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("input",{type:"text",id:"noOfDays",name:"noOfDays",value:N.noOfDays,onChange:_,required:!0})]}),(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{children:["Dysmenorrhea",(0,y.jsx)("span",{children:":"})]}),(0,y.jsxs)("div",{className:"radio_Nurse_ot2_head",children:[(0,y.jsx)("div",{className:"radio_Nurse_ot2",children:(0,y.jsxs)("label",{htmlFor:"mild",children:[(0,y.jsx)("input",{type:"radio",id:"mild",name:"dysmenorrhea",value:"mild",className:"radio_Nurse_ot2_input",checked:"mild"===N.dysmenorrhea,onChange:_}),"Mild"]})}),(0,y.jsx)("div",{className:"radio_Nurse_ot2",children:(0,y.jsxs)("label",{htmlFor:"severe",children:[(0,y.jsx)("input",{type:"radio",id:"severe",name:"dysmenorrhea",value:"severe",className:"radio_Nurse_ot2_input",checked:"severe"===N.dysmenorrhea,onChange:_}),"Severe"]})})]})]}),(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{children:["MCB",(0,y.jsx)("span",{children:":"})]}),(0,y.jsxs)("div",{className:"radio_Nurse_ot2_head",children:[(0,y.jsx)("div",{className:"radio_Nurse_ot2",children:(0,y.jsxs)("label",{htmlFor:"MCBYes",children:[(0,y.jsx)("input",{type:"radio",id:"MCBYes",name:"MCB",value:"MCBYes",className:"radio_Nurse_ot2_input",checked:"MCBYes"===N.MCB,onChange:_}),"Yes"]})}),(0,y.jsx)("div",{className:"radio_Nurse_ot2",children:(0,y.jsxs)("label",{htmlFor:"MCBNo",children:[(0,y.jsx)("input",{type:"radio",id:"MCBNo",name:"MCB",value:"MCBNo",className:"radio_Nurse_ot2_input",checked:"MCBNo"===N.MCB,onChange:_}),"No"]})})]})]})]}),(0,y.jsx)("br",{}),(0,y.jsx)("br",{}),(0,y.jsxs)("div",{className:"RegisFormcon",style:{justifyContent:"center"},children:[Array.isArray(C)&&C.map(((e,s)=>(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"LMP".concat(s),children:["LMP ",s+1,(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("input",{type:"date",id:"LMP".concat(s),name:"LMP".concat(s),value:e,onChange:e=>((e,s)=>{const a=[...C];a[e]=s,H(a)})(s,e.target.value),required:!0}),(0,y.jsx)(d.A,{onClick:()=>(e=>{const s=C.filter(((s,a)=>a!==e));H(s)})(s),style:{cursor:"pointer"}})]},s))),(0,y.jsx)("div",{className:"RegisForm_1",children:(0,y.jsx)(l.A,{onClick:()=>{H([...C,""])},style:{cursor:"pointer"}})})]}),(0,y.jsx)("br",{}),(0,y.jsx)("br",{}),(0,y.jsxs)("div",{className:"RegisFormcon",children:[(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"sexualHistory",children:["Contraceptive / Sexual History",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("textarea",{id:"sexualHistory",name:"sexualHistory",value:N.sexualHistory,onChange:_,required:!0})]}),(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"durationIC",children:["Duration of IC",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("input",{type:"text",id:"durationIC",name:"durationIC",value:N.durationIC,onChange:_,required:!0})]}),(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"visitAboard",children:["Husband Visits of Abroad",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("input",{type:"text",id:"visitAboard",name:"visitAboard",value:N.visitAboard,onChange:_,required:!0})]})]}),(0,y.jsx)("br",{}),(0,y.jsxs)("div",{className:"case_sheet_5con",children:[(0,y.jsxs)("div",{className:"case_sheet_5con_20",children:[(0,y.jsxs)("label",{htmlFor:"medicalHistory",children:["Medical History ",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("textarea",{id:"medicalHistory",name:"medicalHistory",value:N.medicalHistory,onChange:_})]}),(0,y.jsxs)("div",{className:"case_sheet_5con_20",children:[(0,y.jsxs)("label",{htmlFor:"obstlHistory",children:["Obst History ",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("textarea",{id:"obstlHistory",name:"obstlHistory",value:N.obstlHistory,onChange:_})]}),(0,y.jsxs)("div",{className:"case_sheet_5con_20",children:[(0,y.jsxs)("label",{htmlFor:"surgicalHistory",children:["Surgical History ",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("textarea",{id:"surgicalHistory",name:"surgicalHistory",value:N.surgicalHistory,onChange:_})]})]}),(0,y.jsx)("br",{}),(0,y.jsxs)("div",{className:"RegisFormcon",style:{justifyContent:"center"},children:[(0,y.jsxs)("div",{className:"u78i7",children:[(0,y.jsxs)("h4",{style:{color:"var(--labelcolor)",display:"flex",justifyContent:"space-around",alignItems:"center",textAlign:"start",padding:"10px",width:"120px"},children:["HSG ",(0,y.jsx)("span",{children:"-"})]}),(0,y.jsxs)("div",{className:"RegisForm_1_Opthal ecdeeed",children:[(0,y.jsxs)("div",{className:"ejdc7x sdiidc",children:[(0,y.jsx)("div",{className:"fvgg",children:(0,y.jsxs)("label",{htmlFor:"AddDate",children:["Date ",(0,y.jsx)("span",{children:":"})]})}),(0,y.jsx)("input",{type:"date",id:"AddDate",name:"AddDate",value:N.AddDate,onChange:_,required:!0})]}),(0,y.jsxs)("div",{className:"ejdc7x",children:[(0,y.jsxs)("label",{htmlFor:"AddImpression",children:["Impression ",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("textarea",{type:"text",id:"AddImpression",name:"AddImpression",style:{height:"60px",width:"160px"},value:N.AddImpression,onChange:_,required:!0})]})]})]}),(0,y.jsxs)("div",{className:"u78i7",children:[(0,y.jsxs)("h4",{style:{color:"var(--labelcolor)",display:"flex",justifyContent:"space-around",alignItems:"center",textAlign:"start",padding:"10px",width:"120px"},children:["USG ",(0,y.jsx)("span",{children:"-"})]}),(0,y.jsxs)("div",{className:"RegisForm_1_Opthal ecdeeed",children:[(0,y.jsxs)("div",{className:"ejdc7x sdiidc",children:[(0,y.jsx)("div",{className:"fvgg",children:(0,y.jsxs)("label",{htmlFor:"USGDate",children:["Date ",(0,y.jsx)("span",{children:":"})]})}),(0,y.jsx)("input",{type:"date",id:"USGDate",name:"USGDate",value:N.USGDate,onChange:_,required:!0})]}),(0,y.jsxs)("div",{className:"ejdc7x",children:[(0,y.jsxs)("label",{htmlFor:"USGImpression",children:["Impression ",(0,y.jsx)("span",{children:":"})]}),(0,y.jsx)("textarea",{type:"text",id:"USGImpression",name:"USGImpression",style:{height:"60px",width:"160px"},value:N.USGImpression,onChange:_,required:!0})]})]})]})]}),(0,y.jsx)("br",{}),(0,y.jsx)("h4",{style:{color:"var(--labelcolor)",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"start",padding:"10px"},children:"Investigation"}),(0,y.jsx)("br",{}),(0,y.jsx)("div",{className:"RegisFormcon",children:(0,y.jsx)("div",{className:"RegisForm_1_Opthal ecdeeedrdfdf",children:Object.keys(F).map(((e,s)=>(0,y.jsxs)("div",{className:"ejdc7x",children:[(0,y.jsx)("div",{children:(0,y.jsxs)("label",{htmlFor:e,children:[e," ",(0,y.jsx)("span",{children:":"})]})}),(0,y.jsx)("div",{className:"mlpocvfd",children:(0,y.jsx)("div",{className:"idoop9",children:(0,y.jsx)("input",{type:"text",id:e,name:e,value:F[e],onChange:s=>((e,s)=>{const a=s.target.value;A((s=>({...s,[e]:a})))})(e,s),required:!0})})})]},s)))})}),(0,y.jsx)("br",{}),(0,y.jsx)("h4",{style:{color:"var(--labelcolor)",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"start",padding:"10px"},children:"Semen Analysis"}),(0,y.jsx)("div",{className:"Selected-table-container",children:(0,y.jsx)("table",{className:"selected-medicine-table2 fverfercer45",children:(0,y.jsxs)("thead",{children:[(0,y.jsxs)("tr",{children:[(0,y.jsx)("th",{children:"Date"}),(0,y.jsx)("td",{children:(0,y.jsx)("div",{style:{display:"flex",justifyContent:"space-evenly"},children:S.map(((e,s)=>(0,y.jsx)("div",{style:{display:"flex",alignItems:"center"},children:(0,y.jsx)("input",{type:"date",className:"ewdnlpi944",value:e.date,onChange:e=>I(s,"date",e.target.value)})},s)))})})]}),(0,y.jsxs)("tr",{children:[(0,y.jsx)("th",{children:"Count"}),(0,y.jsx)("td",{children:(0,y.jsx)("div",{style:{display:"flex",justifyContent:"space-evenly"},children:S.map(((e,s)=>(0,y.jsx)("div",{style:{display:"flex",alignItems:"center"},children:(0,y.jsx)("input",{type:"text",className:"ewdnlpi944",value:e.count,onChange:e=>I(s,"count",e.target.value)})},s)))})})]}),(0,y.jsxs)("tr",{children:[(0,y.jsx)("th",{children:"Mot"}),(0,y.jsx)("td",{children:(0,y.jsx)("div",{style:{display:"flex",justifyContent:"space-evenly"},children:S.map(((e,s)=>(0,y.jsx)("div",{style:{display:"flex",alignItems:"center"},children:(0,y.jsx)("input",{type:"text",className:"ewdnlpi944",value:e.mot,onChange:e=>I(s,"mot",e.target.value)})},s)))})})]}),(0,y.jsxs)("tr",{children:[(0,y.jsx)("th",{children:"Norm"}),(0,y.jsx)("td",{children:(0,y.jsx)("div",{style:{display:"flex",justifyContent:"space-evenly"},children:S.map(((e,s)=>(0,y.jsx)("div",{style:{display:"flex",alignItems:"center"},children:(0,y.jsx)("input",{type:"text",className:"ewdnlpi944",value:e.norm,onChange:e=>I(s,"norm",e.target.value)})},s)))})})]})]})})}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"center",gap:"10px",margin:"10px"},children:[(0,y.jsx)("button",{className:"cell_btn12",onClick:()=>{R([...S,k])},children:(0,y.jsx)(o.A,{})}),S.length>1&&(0,y.jsx)("button",{className:"cell_btn12",onClick:()=>{return e=S.length-1,void R(S.filter(((s,a)=>a!==e)));var e},children:(0,y.jsx)(c.A,{})})]}),(0,y.jsx)("div",{className:"Selected-table-container",children:(0,y.jsxs)("table",{className:"selected-medicine-table2",children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)("th",{children:"Date"}),(0,y.jsx)("th",{children:"Day"}),(0,y.jsx)("th",{children:"RO"}),(0,y.jsx)("th",{children:"LO"}),(0,y.jsx)("th",{children:"ET"}),(0,y.jsx)("th",{children:"Stim(+Dose)"}),(0,y.jsx)("th",{children:(0,y.jsx)("button",{className:"cell_btn12",onClick:()=>{O([...M,{DateforDelivery:"",DayDelivery:"",RODelivery:"",LODelivery:"",ETDelivery:"",StimDelivery:""}])},children:(0,y.jsx)(o.A,{})})}),(0,y.jsx)("th",{children:"Select to Print"})]})}),(0,y.jsx)("tbody",{children:M.map(((e,s)=>(0,y.jsxs)("tr",{children:[(0,y.jsx)("td",{children:(0,y.jsx)("input",{type:"date",className:"wedscr54_secd_8643r uujhghbg",value:e.DateforDelivery,onChange:e=>G(e,s,"DateforDelivery")})}),(0,y.jsx)("td",{children:(0,y.jsx)("input",{type:"number",className:"wedscr54_secd_8643r uujhghbg",value:e.DayDelivery,onChange:e=>G(e,s,"DayDelivery")})}),(0,y.jsx)("td",{children:(0,y.jsx)("input",{type:"number",className:"wedscr54_secd_8643r uujhghbg",value:e.RODelivery,onChange:e=>G(e,s,"RODelivery")})}),(0,y.jsx)("td",{children:(0,y.jsx)("input",{className:"wedscr54_secd_8643r uujhghbg",value:e.LODelivery,onChange:e=>G(e,s,"LODelivery")})}),(0,y.jsx)("td",{children:(0,y.jsx)("input",{type:"number",className:"wedscr54_secd_8643r uujhghbg",value:e.ETDelivery,onChange:e=>G(e,s,"ETDelivery")})}),(0,y.jsx)("td",{children:(0,y.jsx)("input",{type:"text",className:"wedscr54_secd_8643r uujhghbg",value:e.StimDelivery,onChange:e=>G(e,s,"StimDelivery")})}),(0,y.jsx)("td",{children:(0,y.jsx)("button",{className:"cell_btn12",onClick:()=>(e=>{const s=[...M];s.splice(e,1),O(s)})(s),children:(0,y.jsx)(c.A,{})})}),(0,y.jsx)("td",{children:(0,y.jsx)("input",{type:"checkbox",className:"cell_btn123",checked:P.includes(s),onChange:()=>(e=>{w((s=>s.includes(e)?s.filter((s=>s!==e)):[...s,e]))})(s)})})]},s)))})]})}),B&&(0,y.jsx)("div",{className:"Main_container_Btn",children:(0,y.jsx)("button",{className:"RegisterForm_1_btns",onClick:()=>{L(!1),setTimeout((()=>{U(),L(!0)}),500)},children:"Print"})})]}):(0,y.jsx)(p,{ref:T,className:"landscape-print",children:(0,y.jsxs)("div",{className:"Print_ot_all_div",id:"reactprintcontent",children:[(0,y.jsxs)("div",{className:"new-patient-registration-form ",children:[(0,y.jsxs)("div",{children:[(0,y.jsxs)("div",{className:"paymt-fr-mnth-slp",children:[(0,y.jsx)("div",{className:"logo-pay-slp",children:(0,y.jsx)("img",{src:z,alt:""})}),(0,y.jsx)("div",{children:(0,y.jsxs)("h2",{children:[q," (",W,")"]})})]}),(0,y.jsx)("h4",{style:{color:"var(--labelcolor)",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"start",padding:"10px"},children:"Doctor"})]}),(0,y.jsxs)("div",{className:"dctr_info_up_head Print_ot_all_div_second2",children:[(0,y.jsx)("div",{className:"RegisFormcon ",children:(0,y.jsxs)("div",{className:"dctr_info_up_head22",children:[Z.PatientPhoto?(0,y.jsx)("img",{src:Z.PatientPhoto,alt:"Patient Photo"}):(0,y.jsx)("img",{src:h,alt:"Default Patient Photo"}),(0,y.jsx)("label",{children:"Profile"})]})}),(0,y.jsxs)("div",{className:"RegisFormcon",children:[(0,y.jsxs)("div",{className:"RegisForm_1",children:[(0,y.jsxs)("label",{htmlFor:"FirstName",children:["Patient Name ",(0,y.jsx)("span",{children:":"})," "]}),(0,y.jsxs)("span",{className:"dctr_wrbvh_pice",htmlFor:"FirstName",children:[Z.firstName+" "+Z.lastName," "]})]}),(0,y.jsxs)("div",{className:"RegisForm_1 ",children:[(0,y.jsxs)("label",{htmlFor:"FirstName",children:["Patient ID ",(0,y.jsx)("span",{children:":"})]}),(0,y.jsxs)("span",{className:"dctr_wrbvh_pice",htmlFor:"FirstName",children:[Z.PatientID," "]})]}),(0,y.jsxs)("div",{className:"RegisForm_1 ",children:[(0,y.jsxs)("label",{htmlFor:"FirstName",children:["Age ",(0,y.jsx)("span",{children:":"})," "]}),(0,y.jsxs)("span",{className:"dctr_wrbvh_pice",htmlFor:"FirstName",children:[Z.Age," "]})]}),(0,y.jsxs)("div",{className:"RegisForm_1 ",children:[(0,y.jsxs)("label",{htmlFor:"FirstName",children:["Gender ",(0,y.jsx)("span",{children:":"})," "]}),(0,y.jsxs)("span",{className:"dctr_wrbvh_pice",htmlFor:"FirstName",children:[Z.Gender," "]})]}),(0,y.jsxs)("div",{className:"RegisForm_1 ",children:[(0,y.jsxs)("label",{htmlFor:"FirstName",children:["Primary Doctor ",(0,y.jsx)("span",{children:":"})," "]}),(0,y.jsxs)("span",{className:"dctr_wrbvh_pice",htmlFor:"FirstName",children:[Z.DoctorName," "]})]}),(0,y.jsxs)("div",{className:"RegisForm_1 ",children:[(0,y.jsxs)("label",{htmlFor:"FirstName",children:["Location ",(0,y.jsx)("span",{children:":"})," "]}),(0,y.jsxs)("span",{className:"dctr_wrbvh_pice",htmlFor:"FirstName",children:[Z.Location," "]})]})]})]})]}),(0,y.jsxs)("div",{className:"appointment",children:[(0,y.jsx)("br",{}),(0,y.jsx)("div",{className:"Selected-table-container",children:(0,y.jsxs)("table",{className:"selected-medicine-table2",children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)("th",{children:"Date"}),(0,y.jsx)("th",{children:"Day"}),(0,y.jsx)("th",{children:"RO"}),(0,y.jsx)("th",{children:"LO"}),(0,y.jsx)("th",{children:"ET"}),(0,y.jsx)("th",{children:"Stim(+Dose)"})]})}),(0,y.jsx)("tbody",{children:M.filter(((e,s)=>P.includes(s))).map(((e,s)=>(0,y.jsxs)("tr",{children:[(0,y.jsx)("td",{children:e.DateforDelivery}),(0,y.jsx)("td",{children:e.DayDelivery}),(0,y.jsx)("td",{children:e.RODelivery}),(0,y.jsx)("td",{children:e.LODelivery}),(0,y.jsx)("td",{children:e.ETDelivery}),(0,y.jsx)("td",{children:e.StimDelivery})]},s)))})]})})]})]})}),(0,y.jsxs)("div",{className:"Main_container_Btn",children:[se&&(0,y.jsx)("button",{onClick:re,children:"Clear"}),!se&&(0,y.jsx)("button",{onClick:()=>{const a={...N,LMPs:C,rows:S,selectedRows:P,drainsData3:M,labelsData:F,RegistrationId:null===g||void 0===g?void 0:g.pk,created_by:(null===s||void 0===s?void 0:s.username)||""};console.log(a,"IFard_instance"),r.A.post("".concat(e,"Workbench/Workbench_IFCard_Details"),a).then((e=>{const s=e.data,a=Object.keys(s)[0],n=Object.values(s)[0];v({type:"toast",value:{message:n,type:a}}),ee((e=>!e)),re()})).catch((e=>{console.log(e)}))},children:"Submit"})]}),K.length>0&&(0,y.jsx)(j.A,{columns:J,RowData:K}),(0,y.jsx)(m.A,{Message:a.message,Type:a.type})]})}},7201:(e,s,a)=>{var n=a(4994);s.A=void 0;var r=n(a(39)),i=a(579);s.A=(0,r.default)((0,i.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"}),"AddCircle")},8780:(e,s,a)=>{var n=a(4994);s.A=void 0;var r=n(a(39)),i=a(579);s.A=(0,r.default)((0,i.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m5 11H7v-2h10z"}),"RemoveCircle")},8340:()=>{}}]);
//# sourceMappingURL=9630.d7bbc9ce.chunk.js.map