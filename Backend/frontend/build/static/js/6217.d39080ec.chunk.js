"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6217],{6217:(e,a,r)=>{r.r(a),r.d(a,{default:()=>c});var s=r(5043),i=r(3003),t=r(6133),n=r(6213),o=r(6324),l=r(7392),d=r(7260),m=r(579);const c=()=>{(0,i.wA)();const e=(0,i.d4)((e=>{var a;return null===(a=e.userRecord)||void 0===a?void 0:a.UrlLink})),a=(0,i.d4)((e=>{var a;return null===(a=e.userRecord)||void 0===a?void 0:a.toast})),r=(0,i.d4)((e=>{var a;return null===(a=e.Frontoffice)||void 0===a?void 0:a.IP_DoctorWorkbenchNavigation}));console.log(r,"IP_DoctorWorkbenchNavigation");(0,i.d4)((e=>{var a;return null===(a=e.userRecord)||void 0===a?void 0:a.UserData}));const[c,R]=(0,s.useState)({Date:"",Time:"",OperativeArea:"",OperativeAreaRemarks:"",Operativeinspected:"",OperativeinspectedRemarks:"",JewelleryRemoved:"",JewelleryRemovedRemarks:"",JewelleryTied:"",JewelleryTiesRemarks:"",NasogastricTube:"",NasogastricTubeRemarks:"",Falsetooth:"",FalsetoothRemarks:"",ColouredNail:"",ColouredNailRemarks:"",HairPrepared:"",HairPreparedRemarks:"",VoidedAmount:"",VoidedAmountRemarks:"",VoidedTime:"",VoidedTimeRemarks:"",VaginalDouche:"",VaginalDoucheRemarks:"",Allergies:"",AllergiesRemarks:"",BathTaken:"",BathTakenRemarks:"",BloodRequirement:"",BloodRequirementRemarks:"",ConsentForm:"",ConsentFormRemarks:"",MorningTPR:"",MorningTPRRemarks:"",MorningSample:"",MorningSampleRemarks:"",XRayFilms:"",XRayFilmsRemarks:"",PreanaestheticMedication:"",PreanaestheticMedicationRemarks:"",SideRails:"",SideRailsRemarks:"",PulseRate:"",PulseRateRemarks:"",RespRate:"",RespRateRemarks:"",IdentificationWristlet:"",IdentificationWristletRemarks:"",SpecialDrug:"",DutySisterName:""}),u=(e,a)=>{R((r=>({...r,[e]:a})))},h=(e,a)=>{R((r=>({...r,[e]:a})))},p=(e,a)=>(0,m.jsxs)("div",{className:"OtMangementForm_1 djkwked675 dedwe",children:[(0,m.jsxs)("label",{className:"jewj33j",children:[e,(0,m.jsx)("span",{children:":"})]}),(0,m.jsxs)("div",{className:"OtMangementForm_1_checkbox",children:[(0,m.jsxs)("label",{htmlFor:"".concat(a,"Yes"),children:[(0,m.jsx)("input",{type:"checkbox",id:"".concat(a,"Yes"),name:a,value:"Yes",checked:"Yes"===c[a],onChange:()=>u(a,"Yes")}),"Yes"]}),(0,m.jsxs)("label",{htmlFor:"".concat(a,"No"),children:[(0,m.jsx)("input",{type:"checkbox",id:"".concat(a,"No"),name:a,value:"No",checked:"No"===c[a],onChange:()=>u(a,"No")}),"No"]}),(0,m.jsxs)("div",{className:"EWFERYU7KUILP7",children:[(0,m.jsxs)("label",{children:["Remarks",(0,m.jsx)("span",{children:":"})]}),(0,m.jsx)("textarea",{value:c["".concat(a,"Remarks")],onChange:e=>h("".concat(a,"Remarks"),e.target.value)})]})]})]}),k=[{key:"id",name:"S.No",frozen:!0},{key:"view",frozen:!0,name:"View",renderCell:e=>(0,m.jsx)(l.A,{onClick:()=>T(e.row),children:(0,m.jsx)(d.A,{})})},{key:"VisitId",name:"VisitId",frozen:!0},{key:"PrimaryDoctorName",name:"Doctor Name",frozen:!0},{key:"Date",name:"Date",frozen:!0},{key:"Time",name:"Time",frozen:!0}],[g,v]=(0,s.useState)([]),[j,x]=(0,s.useState)(!1),[y,N]=(0,s.useState)(!1),T=e=>{R((a=>({...a,...e}))),N(!0)};(0,s.useEffect)((()=>{n.A.get("".concat(e,"Ip_Workbench/IP_PreOpChecklist_Details_Link"),{params:{RegistrationId:null===r||void 0===r?void 0:r.RegistrationId,Type:"Nurse"}}).then((e=>{const a=e.data;console.log(a),v(a)})).catch((e=>{console.log(e)}))}),[e,r,j]);const w=e=>{let{label:a,type:r,value:s,onChange:i}=e;return(0,m.jsxs)("div",{className:"OtMangementForm_1 djkwked675 dedwe",children:[(0,m.jsxs)("label",{className:"jewj33j",children:[a,":"]}),(0,m.jsx)("input",{type:r,value:s,onChange:i})]})};return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)("div",{className:"Main_container_app",children:[(0,m.jsx)("div",{className:"Supplier_Master_Container",children:(0,m.jsxs)("div",{className:"Print_ot_all_div_rfve",children:[(0,m.jsx)("h4",{style:{color:"var(--labelcolor)",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"start",padding:"10px"},children:"Ward Preoperative Checklist"}),(0,m.jsx)(w,{label:"Date",type:"date",value:c.Date,onChange:e=>R((a=>({...a,Date:e.target.value})))}),(0,m.jsx)(w,{label:"Time",type:"time",value:c.Time,onChange:e=>R((a=>({...a,Time:e.target.value})))}),p("1. Operative area prepared","OperativeArea"),p("2. Operative area inspected","Operativeinspected"),p("3. Jewellery Removed & handed over","JewelleryRemoved"),p("Jewellery Tied on","JewelleryTied"),p("4. False tooth removed","Falsetooth"),p("5. Coloured nail polish removed (from at least 2 fingers)","ColouredNail"),p("6. Hair prepared / Hairpins removed","HairPrepared"),p("7. Nasogastric tube passed","NasogastricTube"),p("8. Voided or catheterized","VoidedAmount"),p("Time","VoidedTime"),p("9. Vaginal douche / Bowel wash / Enema","VaginalDouche"),p("10. Bath taken / Given","BathTaken"),p("11. Consent form signed & attached","ConsentForm"),p("12. Morning T.P.R. charted","MorningTPR"),p("13. Morning Urine / Blood sample sent Report on chart","MorningSample"),p("14. X-ray films / CT Scan / MRI Films","XRayFilms"),p("15. Preanaesthetic medication Time","PreanaestheticMedication"),p("16. Side rails applied after giving premedication","SideRails"),p("17. Pulse & Resp. rate 30 min after premed","PulseRate"),p("Resp. rate","RespRate"),p("18. Identification wristlet applied","IdentificationWristlet"),(0,m.jsxs)("div",{className:"OtMangementForm_1 djkwked675 dedwe ueuhuedj",children:[(0,m.jsxs)("label",{className:"jewj33j hjwqhyss",children:[(0,m.jsx)("p",{children:"19."})," Special drugs / supplies being sent with patient (specify)",(0,m.jsx)("span",{children:":"})]}),(0,m.jsx)("div",{className:"OtMangementForm_1_checkbox",children:(0,m.jsx)("textarea",{className:"hfdtrft5",value:c.SpecialDrug,onChange:e=>h("SpecialDrug",e.target.value)})})]}),(0,m.jsxs)("div",{className:"OtMangementForm_1 djkwked675 dedwe",children:[(0,m.jsx)("label",{className:"jewj33j",children:"Checked by (Duty Sister Name) - "}),(0,m.jsx)("input",{type:"text",style:{border:"none",borderBottom:"2px solid var(--ProjectColor)",outline:"none"},value:c.DutySisterName,onChange:e=>R((a=>({...a,DutySisterName:e.target.value})))})]})]})}),(0,m.jsx)("div",{className:"Main_container_Btn",children:y&&(0,m.jsx)("button",{onClick:()=>{R({Date:"",Time:"",OperativeArea:"",OperativeAreaRemarks:"",Operativeinspected:"",OperativeinspectedRemarks:"",JewelleryRemoved:"",JewelleryRemovedRemarks:"",JewelleryTied:"",JewelleryTiesRemarks:"",NasogastricTube:"",NasogastricTubeRemarks:"",Falsetooth:"",FalsetoothRemarks:"",ColouredNail:"",ColouredNailRemarks:"",HairPrepared:"",HairPreparedRemarks:"",VoidedAmount:"",VoidedAmountRemarks:"",VoidedTime:"",VoidedTimeRemarks:"",VaginalDouche:"",VaginalDoucheRemarks:"",Allergies:"",AllergiesRemarks:"",BathTaken:"",BathTakenRemarks:"",BloodRequirement:"",BloodRequirementRemarks:"",ConsentForm:"",ConsentFormRemarks:"",MorningTPR:"",MorningTPRRemarks:"",MorningSample:"",MorningSampleRemarks:"",XRayFilms:"",XRayFilmsRemarks:"",PreanaestheticMedication:"",PreanaestheticMedicationRemarks:"",SideRails:"",SideRailsRemarks:"",PulseRate:"",PulseRateRemarks:"",RespRate:"",RespRateRemarks:"",IdentificationWristlet:"",IdentificationWristletRemarks:"",SpecialDrug:"",DutySisterName:""}),N(!1)},children:"Clear"})}),g.length>=0&&(0,m.jsx)(t.A,{columns:k,RowData:g}),(0,m.jsx)(o.A,{Message:a.message,Type:a.type})]})})}}}]);
//# sourceMappingURL=6217.d39080ec.chunk.js.map