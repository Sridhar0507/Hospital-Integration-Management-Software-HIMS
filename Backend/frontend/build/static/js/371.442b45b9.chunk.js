"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[371],{5371:(e,s,a)=>{a.r(s),a.d(s,{default:()=>h});var t=a(5043),i=(a(7022),a(6324)),l=a(7392),o=a(7260),r=a(6133),n=(a(1036),a(3003)),c=a(6213),d=a(579);const h=function(){const e=(0,n.d4)((e=>{var s;return null===(s=e.userRecord)||void 0===s?void 0:s.UrlLink})),s=(0,n.d4)((e=>{var s;return null===(s=e.userRecord)||void 0===s?void 0:s.toast})),a=(0,n.d4)((e=>{var s;return null===(s=e.Frontoffice)||void 0===s?void 0:s.DoctorWorkbenchNavigation})),h=(0,n.d4)((e=>{var s;return null===(s=e.userRecord)||void 0===s?void 0:s.UserData})),m=(0,n.wA)(),[u,x]=(0,t.useState)({illnessordiseases:"No",illnessordiseasesText:"",surgerybefore:"No",surgerybeforeText:"",pressureorheartdiseases:"No",pressureorheartdiseasesText:"",stomachacidityproblem:"No",stomachacidityproblemText:"",allergicmedicine:"No",allergicmedicineText:"",drinkalcohol:"No",drinkalcoholText:"",smoke:"No",smokeText:"",diabetesorAsthmadisease:"No",diabetesorAsthmadiseaseText:"",localanesthesiabefore:"No",localanesthesiabeforeText:"",healthproblems:"No",healthproblemsText:"",regularbasis:"No",regularbasisText:"",allergicfood:"No",allergicfoodText:"",operativeinstuctions:"No",operativeinstuctionsText:"",Other:""}),[p,v]=(0,t.useState)([]),[b,g]=(0,t.useState)(!1),[j,N]=(0,t.useState)(!1),y=[{key:"id",name:"S.No",frozen:!0},{key:"VisitId",name:"VisitId",frozen:!0},{key:"PrimaryDoctorId",name:"PrimaryDoctorId",frozen:!0},{key:"PrimaryDoctorName",name:"PrimaryDoctorName",frozen:!0},{key:"Date",name:"Date",frozen:!0},{key:"Time",name:"Time",frozen:!0},{key:"other",name:"Other"},{key:"view",name:"View",renderCell:e=>(0,d.jsx)(l.A,{onClick:()=>T(e.row),children:(0,d.jsx)(o.A,{})})}];(0,t.useEffect)((()=>{c.A.get("".concat(e,"Workbench/Workbench_PastHistory_Details"),{params:{RegistrationId:null===a||void 0===a?void 0:a.pk}}).then((e=>{const s=e.data;console.log(s),v(s)})).catch((e=>{console.log(e)}))}),[e,a,b]);const f=e=>{const{name:s,value:a}=e.target;x((e=>({...e,[s]:a})))},T=e=>{x({illnessordiseases:e.illnessordiseases||"",illnessordiseasesText:e.illnessordiseasesText||"",surgerybefore:e.surgerybefore||"",surgerybeforeText:e.surgerybeforeText||"",pressureorheartdiseases:e.pressureorheartdiseases||"",pressureorheartdiseasesText:e.pressureorheartdiseasesText||"",stomachacidityproblem:e.stomachacidityproblem||"",stomachacidityproblemText:e.stomachacidityproblemText||"",allergicmedicine:e.allergicmedicine||"",allergicmedicineText:e.allergicmedicineText||"",drinkalcohol:e.drinkalcohol||"",drinkalcoholText:e.drinkalcoholText||"",smoke:e.smoke||"",smokeText:e.smokeText||"",diabetesorAsthmadisease:e.diabetesorAsthmadisease||"",diabetesorAsthmadiseaseText:e.diabetesorAsthmadiseaseText||"",localanesthesiabefore:e.localanesthesiabefore||"",localanesthesiabeforeText:e.localanesthesiabeforeText||"",healthproblems:e.healthproblems||"",healthproblemsText:e.healthproblemsText||"",regularbasis:e.regularbasis||"",regularbasisText:e.regularbasisText||"",allergicfood:e.allergicfood||"",allergicfoodText:e.allergicfoodText||"",operativeinstuctions:e.operativeinstuctions||"",operativeinstuctionsText:e.operativeinstuctionsText||"",Other:e.other||""}),N(!0)},w=()=>{x({illnessordiseases:"",illnessordiseasesText:"",surgerybefore:"",surgerybeforeText:"",pressureorheartdiseases:"",pressureorheartdiseasesText:"",stomachacidityproblem:"",stomachacidityproblemText:"",allergicmedicine:"",allergicmedicineText:"",drinkalcohol:"",drinkalcoholText:"",smoke:"",smokeText:"",diabetesorAsthmadisease:"",diabetesorAsthmadiseaseText:"",localanesthesiabefore:"",localanesthesiabeforeText:"",healthproblems:"",healthproblemsText:"",regularbasis:"",regularbasisText:"",allergicfood:"",allergicfoodText:"",operativeinstuctions:"",operativeinstuctionsText:"",Other:""}),N(!1)};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("div",{className:"new-patient-registration-form",children:[(0,d.jsxs)("div",{className:"new-patient-info-container",children:[(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Do you suffer from any illness or diseases ?"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 1 - cosmetic surgery",name:"illnessordiseases",value:u.illnessordiseases,onChange:f,className:"new-custom-select-title",children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 11 - Other",name:"illnessordiseasesText",value:u.illnessordiseasesText,onChange:f,disabled:"No"===u.illnessordiseases})]})]}),(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Have you had any surgery before ?"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 2 - previous treatments adverse reaction",name:"surgerybefore",value:u.surgerybefore,onChange:f,className:"new-custom-select-title",children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 11 - Other",name:"surgerybeforeText",value:u.surgerybeforeText,onChange:f,disabled:"No"===u.surgerybefore})]})]})]}),(0,d.jsxs)("div",{className:"new-patient-info-container",children:[(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Did you have high blood pressure or heart diseases ?"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 3 - allergies to cosmetic products",name:"pressureorheartdiseases",value:u.pressureorheartdiseases,onChange:f,className:"new-custom-select-title",children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 11 - Other",name:"pressureorheartdiseasesText",value:u.pressureorheartdiseasesText,onChange:f,disabled:"No"===u.pressureorheartdiseases})]})]}),(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Did you suffer from any stomach acidity problem ?"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 4 - On medications",name:"stomachacidityproblem",value:u.stomachacidityproblem,onChange:f,className:"new-custom-select-title",children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 11 - Other",name:"stomachacidityproblemText",value:u.stomachacidityproblemText,onChange:f,disabled:"No"===u.stomachacidityproblem})]})]})]}),(0,d.jsxs)("div",{className:"new-patient-info-container",children:[(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Are you allergic to any medicine ?"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 4 - On medications",name:"allergicmedicine",value:u.allergicmedicine,onChange:f,className:"new-custom-select-title",children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 5 - Allergies",name:"allergicmedicineText",value:u.allergicmedicineText,onChange:f,disabled:"No"===u.allergicmedicine})]})]}),(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Do you drink alcohol ?"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 6 - Smoking Habits",className:"new-custom-select-title",name:"drinkalcohol",value:u.drinkalcohol,onChange:f,children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 5 - Allergies",name:"drinkalcoholText",value:u.drinkalcoholText,onChange:f,disabled:"No"===u.drinkalcohol})]})]})]}),(0,d.jsxs)("div",{className:"new-patient-info-container",children:[(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Do you smoke ?"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 6 - Smoking Habits",className:"new-custom-select-title",name:"smoke",value:u.smoke,onChange:f,children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 5 - Allergies",name:"smokeText",value:u.smokeText,onChange:f,disabled:"No"===u.smoke})]})]}),(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Do you have diabetes/Asthma/any other disease ?"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 7 - Alcohol Consumptions",className:"new-custom-select-title",name:"diabetesorAsthmadisease",value:u.diabetesorAsthmadisease,onChange:f,children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 5 - Allergies",name:"diabetesorAsthmadiseaseText",value:u.diabetesorAsthmadiseaseText,onChange:f,disabled:"No"===u.diabetesorAsthmadisease})]})]})]}),(0,d.jsxs)("div",{className:"new-patient-info-container",children:[(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Have you had any local anesthesia before ?"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 8 - Pregnant",className:"new-custom-select-title",name:"localanesthesiabefore",value:u.localanesthesiabefore,onChange:f,children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 5 - Allergies",name:"localanesthesiabeforeText",value:u.localanesthesiabeforeText,onChange:f,disabled:"No"===u.localanesthesiabefore})]})]}),(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Are you in medication for any health problems?"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 9 - breastfeeding",className:"new-custom-select-title",name:"healthproblems",value:u.healthproblems,onChange:f,children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 5 - Allergies",name:"healthproblemsText",value:u.healthproblemsText,onChange:f,disabled:"No"===u.healthproblems})]})]})]}),(0,d.jsxs)("div",{className:"new-patient-info-container",children:[(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Do you take any vitamin supplements or aspirin on regular basis ?"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 10 - Skin Type",className:"new-custom-select-title",name:"regularbasis",value:u.regularbasis,onChange:f,children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 5 - Allergies",name:"regularbasisText",value:u.regularbasisText,onChange:f,disabled:"No"===u.regularbasis})]})]}),(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsxs)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:["Are you allergic to any food ? ",(0,d.jsx)("br",{}),"please list all types of allergies if any"]}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 10 - Skin Type",className:"new-custom-select-title",name:"allergicfood",value:u.allergicfood,onChange:f,children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 11 - Other",name:"allergicfoodText",value:u.allergicfoodText,onChange:f,disabled:"No"===u.allergicfood})]})]})]}),(0,d.jsxs)("div",{className:"new-patient-info-container",children:[(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Have you received pre and post operative instuctions ?"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,d.jsxs)("select",{id:"Question 10 - Skin Type",className:"new-custom-select-title",name:"operativeinstuctions",value:u.operativeinstuctions,onChange:f,children:[(0,d.jsx)("option",{value:"",children:"Select"}),(0,d.jsx)("option",{value:"Yes",children:"Yes"}),(0,d.jsx)("option",{value:"No",children:"No"})]}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 11 - Other",name:"operativeinstuctionsText",value:u.operativeinstuctionsText,onChange:f,disabled:"No"===u.operativeinstuctions})]})]}),(0,d.jsxs)("div",{className:"new-custom-form-row width_pasthist",children:[(0,d.jsx)("label",{htmlFor:"title",className:"new-custom-label-title pasthist",children:"Other"}),(0,d.jsx)("textarea",{className:"area_pasthistory",id:"Question 11 - Other",name:"Other",value:u.Other,onChange:f})]})]}),(0,d.jsxs)("div",{className:"Main_container_Btn",children:[j&&(0,d.jsx)("button",{onClick:w,children:"Clear"}),!j&&(0,d.jsx)("button",{onClick:()=>{const s={RegistrationId:null===a||void 0===a?void 0:a.pk,Created_By:null===h||void 0===h?void 0:h.username,...u};console.log(s,"dataToSend"),c.A.post("".concat(e,"Workbench/Workbench_PastHistory_Details"),s).then((e=>{const[s,a]=[Object.keys(e.data)[0],Object.values(e.data)[0]];m({type:"toast",value:{message:a,type:s}}),g((e=>!e)),w()})).catch((e=>console.log(e)))},children:"Submit"})]}),p.length>0&&(0,d.jsx)(r.A,{columns:y,RowData:p}),(0,d.jsx)(i.A,{Message:s.message,Type:s.type})]})})}}}]);
//# sourceMappingURL=371.442b45b9.chunk.js.map