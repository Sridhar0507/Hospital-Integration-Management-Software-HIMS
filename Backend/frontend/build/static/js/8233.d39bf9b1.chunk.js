"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8233],{8233:(e,n,t)=>{t.r(n),t.d(n,{default:()=>C});var o=t(5043),a=t(3003),r=t(8279),l=t(6133),s=t(1036),i=t(407),d=t(6213),c=t(1906),u=t(3723),m=t(9778),p=t(9864),h=t(5502),v=(t(3159),t(35)),y=t(6600),g=t(5316),x=t(9347),f=t(8638),j=t(579);function A(e){let{open:n,onClose:t,onConfirm:o,cancelsenddata:a,setcancelsenddata:r}=e;console.log(n,"ppiup");return(0,j.jsxs)(v.A,{open:n,onClose:t,children:[(0,j.jsx)(y.A,{children:"Drug Stop Reason"}),(0,j.jsx)(g.A,{children:(0,j.jsx)(f.A,{label:"Drug Stop Reason",multiline:!0,rows:4,variant:"outlined",fullWidth:!0,value:null===a||void 0===a?void 0:a.Reason,onChange:e=>r((n=>({...n,Reason:e.target.value})))})}),(0,j.jsxs)(x.A,{children:[(0,j.jsx)(c.A,{onClick:()=>{r(null),t()},color:"primary",children:"Close"}),(0,j.jsx)(c.A,{onClick:()=>{o(a),t()},color:"primary",children:"Save"})]})]})}(0,r.A)({components:{MuiDataGrid:{styleOverrides:{columnHeader:{backgroundColor:"var(--ProjectColor)",textAlign:"Center"},root:{"& .MuiDataGrid-root .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeaderTitleContainer":{textAlign:"center",display:"flex !important",justifyContent:"center !important"},"& .MuiDataGrid-window":{overflow:"hidden !important"}},cell:{borderTop:"0px !important",borderBottom:"1px solid  var(--ProjectColor) !important",display:"flex",justifyContent:"center"}}}}});const C=()=>{const e=(0,a.d4)((e=>{var n;return null===(n=e.userRecord)||void 0===n?void 0:n.UserData}));console.log("userRecord",e);const n=(0,a.d4)((e=>{var n;return null===(n=e.userRecord)||void 0===n?void 0:n.UrlLink})),t=(0,a.d4)((e=>{var n;return null===(n=e.Frontoffice)||void 0===n?void 0:n.IP_DoctorWorkbenchNavigation})),[r,v]=(0,o.useState)(""),[y,g]=(0,o.useState)(!1),[x,f]=(0,o.useState)([]),[C,_]=(0,o.useState)(null),[k,D]=(0,o.useState)(null),[S,M]=(0,o.useState)(null),[I,w]=(0,o.useState)(null),[b,q]=(0,o.useState)(!1),[N,P]=(0,o.useState)(0),[F,R]=(null===k||void 0===k||k.medicinedata.length,Math.ceil((null===k||void 0===k?void 0:k.medicinedata.length)/10),(0,o.useState)(0));console.log("OpenDialog",b,typeof b);null===S||void 0===S||S.length,Math.ceil((null===S||void 0===S?void 0:S.length)/10);(0,o.useEffect)((()=>{if(null!==t&&void 0!==t&&t.RegistrationId&&n){const e=(0,i.GP)(new Date,"yyyy-MM-dd");d.A.get("".concat(n,"DrugAdminstrations/get_Drug_Administration_datas?Booking_Id=").concat(null===t||void 0===t?void 0:t.RegistrationId,"&Date=").concat(e)).then((e=>{var n;const t=e.data.Regular;console.log("data",t);const o=[...new Set(null===t||void 0===t?void 0:t.flatMap((e=>{var n;return null===(n=e.FrequencyIssued)||void 0===n?void 0:n.flatMap((e=>e.FrequencyIssued))})))].map((e=>(e=>{const n=parseInt(e);return n>=1&&n<=11?n+" AM":12===n?"12 PM":0===n?"12 AM":n-12+" PM"})(e))).sort(((e,n)=>{const[t,o]=e.split(" "),[a,r]=n.split(" ");return o!==r?o.localeCompare(r):parseInt(t)-parseInt(a)}));console.log("freqdata",o),M(null===(n=e.data.SOS)||void 0===n?void 0:n.map(((e,n)=>({...e,id:n+1})))),console.log(e.data.SOS,"freqqq"),D({frequencyTime:o,medicinedata:t.map(((e,n)=>({...e,id:n+1})))})})).catch((e=>{console.log(e)}))}}),[t,null===t||void 0===t?void 0:t.Booking_Id,n,y]),console.log("TabletShowSOS",S);const G=e=>/[a-z]/.test(e)&&/[A-Z]/.test(e)&&!/\d/.test(e)?e.replace(/([a-z])([A-Z])/g,"$1 $2").replace(/^./,(e=>e.toUpperCase())):e;["Date","Department","DoctorName","MedicineName","Instruction"].map(((e,n)=>{const t=G(e),o=function(e){const n=document.createElement("span");n.textContent=e,n.style.visibility="hidden",n.style.whiteSpace="nowrap",document.body.appendChild(n);const t=n.offsetWidth;return document.body.removeChild(n),t}(t);return{field:e,headerName:t,width:["Instruction","Date"].find((n=>n===e))?o+100:o+30,valueGetter:n=>{const t=n.row[e];return t||"-"}}}));return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(s.N9,{}),k&&0!==(null===k||void 0===k?void 0:k.medicinedata.length)&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("div",{className:"Add_items_Purchase_Master",children:(0,j.jsx)("span",{children:"Regular Medicines"})}),(0,j.jsx)(l.A,{columns:[{key:"S_No",name:"S_No"},{key:"PrescribedDate",name:"Prescribed Date"},{key:"CurrentDate",name:"Current Date"},{key:"Department",name:"Department"},{key:"DoctorName",name:"Doctor Name"},{key:"MedicineName",name:"Medicine Name"},{key:"FrequencyType",name:"Frequency Type"},{key:"Instruction",name:"Instruction"},...(Array.isArray(null===k||void 0===k?void 0:k.frequencyTime)?k.frequencyTime:[]).map((e=>{const n=G(e);return{key:e,name:n,renderCell:n=>{const[t,o]=e.split(" ");let a=0;a="PM"===o&&"12"!==t?+t+12:"AM"===o&&"12"===t?0:+t;const r=n.row;if(Array.isArray(r.FrequencyIssued)){const n=r.FrequencyIssued.find((e=>+e.FrequencyIssued===a));if(n){const{Status:t}=n;console.log("Status",t);const o={Pending:"blue",Issued:"green",Before:"orange",Delay:"pink",NotIssued:"red"};return(0,j.jsx)("span",{children:o[t]?(0,j.jsx)("span",{style:{color:"".concat(o[t]," !important")},children:"Pending"===t?(0,j.jsx)("input",{className:"myCheckbox_Frequency",type:"checkbox",onChange:n=>((e,n,t)=>{const o=e.target.checked,a={...n,FrequencyIssued:"PM"===t.split(" ")[1]?+t.split(" ")[0]+12:+t.split(" ")[0]};if(o)f((e=>[...e,a]));else{const e=x.filter((e=>Object.entries(a).some((n=>{let[t,o]=n;return e[t]!==o}))));f(e)}_(null),console.log("newrow",a)})(n,r,e)}):(0,j.jsxs)("span",{children:["Issued"===t&&(0,j.jsx)(m.A,{}),"Before"===t&&(0,j.jsx)(m.A,{}),"Delay"===t&&(0,j.jsx)(m.A,{}),"NotIssued"===t&&(0,j.jsx)(p.A,{})]})}):(0,j.jsx)("span",{className:"check_box_clrr",children:(0,j.jsx)(u.A,{style:{color:"grey"}})})})}return"-"}return"-"}}})),{key:"Action",name:"Action",renderCell:n=>(0,j.jsx)(c.A,{className:"cell_btn",onClick:()=>(n=>{const o={Booking_Id:null===t||void 0===t?void 0:t.Booking_Id,Prescibtion_Id:null===n||void 0===n?void 0:n.Prescibtion_Id,Reason:"",Stopped_date:(0,i.GP)(new Date,"yyyy-MM-dd"),Stopped_time:(0,i.GP)(new Date,"HH:mm:ss"),CapturedBy:null===e||void 0===e?void 0:e.username};w(o),q(!0),console.log("---------",o)})(n.row),children:(0,j.jsx)(h.A,{className:"check_box_clrr_cancell"})})}],RowData:null===k||void 0===k?void 0:k.medicinedata}),(0,j.jsxs)("div",{className:"RegisForm_1",children:[(0,j.jsxs)("label",{children:["Remarks ",(0,j.jsx)("span",{children:":"})]}),(0,j.jsx)("textarea",{value:r,placeholder:"Maximum 150 words",onChange:e=>v(e.target.value)})]}),(0,j.jsx)("div",{style:{display:"grid",placeItems:"center",width:"100%"},children:(0,j.jsx)("button",{className:"btn-add",onClick:()=>{if(x.length>0||C){const o=(0,i.GP)(new Date,"HH:mm:ss"),a=(0,i.GP)(new Date,"yyyy-MM-dd");let l;l=x.length>0?x.map((n=>({...n,FrequencyIssued:n.FrequencyIssued,Remarks:r,Completed_Date:a,Completed_Time:o,Quantity:1,Capturedby:null===e||void 0===e?void 0:e.username,Location:null===e||void 0===e?void 0:e.location,Booking_Id:null===t||void 0===t?void 0:t.RegistrationId}))):[C],console.log("postrewss",l),d.A.post("".concat(n,"DrugAdminstrations/insert_Drug_Administration_nurse_frequencywise_datas"),l).then((e=>{console.log(e),D(null),g(!y),v(""),_(null),f([]);document.querySelectorAll(".myCheckbox_Frequency").forEach((e=>{e.checked=!1}))})).catch((e=>{console.log(e)}))}},children:"Save"})})]}),S&&S.length>0&&(0,j.jsx)(j.Fragment,{children:(0,j.jsx)("div",{className:"Add_items_Purchase_Master",children:(0,j.jsx)("span",{children:"SOS Medicines"})})}),(0,j.jsx)(A,{open:b,onClose:()=>q(!1),onConfirm:()=>{const e=[...Object.keys(I)].filter((e=>!I[e]));if(e.length>0)alert("Please fill the Required Fields for ".concat(e.join(",")));else{const e=window.confirm("Are you sure you want to Stop the Drug ?.");console.log(e),e?(d.A.post("".concat(n,"ipregistration/cancel_drug_administration"),I).then((e=>{console.log(e.data),g(!y)})).catch((e=>{console.log(e)})),q(!1),w(null)):(q(!1),w(null))}},setcancelsenddata:w,cancelsenddata:I})]})}},9778:(e,n,t)=>{var o=t(4994);n.A=void 0;var a=o(t(39)),r=t(579);n.A=(0,a.default)((0,r.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"}),"CheckCircle")},9864:(e,n,t)=>{var o=t(4994);n.A=void 0;var a=o(t(39)),r=t(579);n.A=(0,a.default)((0,r.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m4 14H8V8h8z"}),"StopCircle")}}]);
//# sourceMappingURL=8233.d39bf9b1.chunk.js.map