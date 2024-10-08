"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4639],{4639:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m});var i=n(5043),s=(n(8340),n(6213)),l=n(3159),r=n(2505),c=n(3471),a=n(3003),d=n(8983),o=n(1828),h=n(6324),u=n(579);const m=()=>{const e=(0,a.d4)((e=>{var t;return null===(t=e.userRecord)||void 0===t?void 0:t.toast})),t=(0,a.d4)((e=>{var t;return null===(t=e.userRecord)||void 0===t?void 0:t.UserData})),n=(0,a.d4)((e=>{var t;return null===(t=e.Frontoffice)||void 0===t?void 0:t.DoctorWorkbenchNavigation})),m=(0,a.d4)((e=>{var t;return null===(t=e.userRecord)||void 0===t?void 0:t.UrlLink})),[x,j]=(0,i.useState)("Intake"),[p,b]=(0,i.useState)({GenericName:"",ItemName:"",dose:"",route:"",qty:"",instruction:"",frequency:"",durationNumber:"",durationUnit:"days",itemtype:""}),N=(0,a.wA)(),[y,v]=(0,i.useState)([]),[_,g]=(0,i.useState)({}),[I,f]=(0,i.useState)({}),[k,q]=(0,i.useState)(null),[D,F]=(0,i.useState)([]);(0,i.useEffect)((()=>{s.A.get("".concat(m,"Workbench/Medical_Stock_InsetLink_for_Prescription")).then((e=>{console.log("response.data"),console.log("response.data123",e.data),F(e.data)})).catch((e=>{console.error("Error fetching generic names:",e)}))}),[m]);const[S,G]=(0,i.useState)(!1);console.log("genericName",D);(0,i.useEffect)((()=>{s.A.get("".concat(m,"Workbench/Workbench_Prescription_Details"),{params:{RegistrationId:null===n||void 0===n?void 0:n.pk}}).then((e=>{const t=e.data;console.log(e),g(t)})).catch((e=>{console.log(e)}))}),[null===n||void 0===n?void 0:n.RegistrationId,m,x]),(0,i.useEffect)((()=>{s.A.get("".concat(m,"Workbench/Doctor_previous_prescripion_details"),{params:{RegistrationId:null===n||void 0===n?void 0:n.pk}}).then((e=>{console.log("response.data",e.data),f(e.data)})).catch((e=>{console.error("Error fetching UOM:",e)}))}),[n,m]);const C=e=>{const{name:t,value:n}=e.target;b({...p,[t]:n});const{frequency:i,durationNumber:s,durationUnit:l,itemtype:r,GenericName:c}={...p,[t]:n};if("GenericName"===t&&""===n&&b({GenericName:"",ItemName:"",dose:"",route:"",qty:"",instruction:"",frequency:"",durationNumber:"",durationUnit:"days",itemtype:""}),"GenericName"===t&&D.filter((e=>e.Generic_Name===c)).map((e=>b((t=>({...t,ItemName:e.Generic_Name,itemtype:e.Item_Type,dose:e.Dosage}))))),("Tablets"===r||"TABLET"===r||"Tablet"===r)&&(console.log("hiiii"),["frequency","durationNumber","durationUnit"].includes(t))){if(!s||!l)return void b((e=>({...e,qty:""})));const[e,t,n]=i.split("-");let r=parseInt(e)+parseInt(t)+parseInt(n),c=1;switch(l){case"days":c=parseInt(s);break;case"weeks":c=7*parseInt(s);break;case"months":c=30*parseInt(s);break;default:return}const a=r*c;b((e=>({...e,qty:a})))}};return(0,u.jsx)("div",{className:"for",children:(0,u.jsxs)("div",{className:"RegisFormcon",children:[(0,u.jsx)("div",{style:{width:"100%",display:"grid",placeItems:"center"},children:(0,u.jsxs)(o.A,{value:x,exclusive:!0,onChange:(e,t)=>{null!==t&&t!==x&&j(t)},"aria-label":"Platform",children:[(0,u.jsx)(d.A,{value:"Intake",style:{height:"30px",width:"180px",backgroundColor:"Intake"===x?"var(--selectbackgroundcolor)":"inherit"},className:"togglebutton_container",children:"Add Drugs"}),(0,u.jsx)(d.A,{value:"Output",style:{backgroundColor:"Output"===x?"var(--selectbackgroundcolor)":"inherit",width:"180px",height:"30px"},className:"togglebutton_container",children:"View Drugs"})]})}),"Intake"===x&&(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)("div",{className:"RegisFormcon",children:[Object.keys(I).length>0?(0,u.jsx)("div",{className:"for",children:Object.entries(I).map((e=>{let[t,n]=e;return(0,u.jsxs)("div",{className:"Add_items_Purchase_Master",children:[(0,u.jsx)("span",{children:"Given Medicine by Dr.".concat(t)}),(0,u.jsx)("div",{className:"Selected-table-container",children:(0,u.jsxs)("table",{className:"selected-medicine-table2",children:[(0,u.jsx)("thead",{children:(0,u.jsxs)("tr",{children:[(0,u.jsx)("th",{id:"slectbill_ins",children:"GenericName"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"ItemName"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Item Type"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Dose"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Route"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Frequency"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Duration"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Qty"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Instruction"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Action"})]})}),(0,u.jsx)("tbody",{children:n.map(((e,n)=>(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:e.GenericName}),(0,u.jsx)("td",{children:e.ItemName}),(0,u.jsx)("td",{children:e.Itemtype}),(0,u.jsx)("td",{children:e.Dose}),(0,u.jsx)("td",{children:e.Route}),(0,u.jsx)("td",{children:e.Frequency}),(0,u.jsx)("td",{children:"".concat(e.DurationNumber," ").concat(e.DurationUnit)}),(0,u.jsx)("td",{children:e.Qty}),(0,u.jsx)("td",{children:e.Instruction}),(0,u.jsx)("td",{children:(0,u.jsx)("button",{className:"delnamebtn",onClick:()=>((e,t)=>{const n=I[t][e];console.log("prevMedicine",n),b({GenericName:n.GenericName,ItemName:n.ItemName,dose:n.Dose,route:n.Route,qty:n.Qty,instruction:n.Instruction,frequency:n.Frequency,durationNumber:n.DurationNumber,durationUnit:"days",itemtype:n.Itemtype}),q(null)})(n,t),children:(0,u.jsx)(r.A,{})})})]},n)))})]})})]},t)}))}):(0,u.jsx)("div",{className:"DivCenter_container",children:"No medication was issued during the previous visit."}),(0,u.jsx)("br",{}),(0,u.jsxs)("div",{className:"RegisFormcon_1",children:[(0,u.jsxs)("div",{className:"RegisForm_1",children:[(0,u.jsxs)("label",{htmlFor:"title",children:["Generic Name",(0,u.jsx)("span",{children:":"})]}),(0,u.jsx)("input",{id:"medicine",name:"GenericName",value:p.GenericName,onChange:C,list:"GenericName-options",autoComplete:"off"}),(0,u.jsxs)("datalist",{id:"GenericName-options",children:[(0,u.jsx)("option",{value:"",children:"Select"}),D.map(((e,t)=>(0,u.jsx)("option",{value:e.Generic_Name},t)))]})]}),(0,u.jsxs)("div",{className:"RegisForm_1",children:[(0,u.jsxs)("label",{htmlFor:"title",children:["Item Name",(0,u.jsx)("span",{children:":"})]}),(0,u.jsx)("input",{id:"medicine",name:"ItemName",value:p.ItemName,onChange:C,list:"ItemName-options",autoComplete:"off"})]}),(0,u.jsxs)("div",{className:"RegisForm_1",children:[(0,u.jsxs)("label",{htmlFor:"itemtype",children:["Item Type",(0,u.jsx)("span",{children:":"})]}),(0,u.jsx)("input",{id:"itemtype",name:"itemtype",value:p.itemtype,onChange:C})]}),(0,u.jsxs)("div",{className:"RegisForm_1",children:[(0,u.jsxs)("label",{htmlFor:"dose",children:["Dose",(0,u.jsx)("span",{children:":"})]}),(0,u.jsx)("input",{id:"dose",name:"dose",value:p.dose,onChange:C})]}),(0,u.jsxs)("div",{className:"RegisForm_1",children:[(0,u.jsxs)("label",{htmlFor:"title",children:["Route",(0,u.jsx)("span",{children:":"})]}),(0,u.jsxs)("select",{id:"route",name:"route",value:p.route,onChange:C,children:[(0,u.jsx)("option",{value:"",children:"Select"}),(0,u.jsx)("option",{value:"Oral",children:"Oral"}),(0,u.jsx)("option",{value:"Injection",children:"Injection"}),(0,u.jsx)("option",{value:"External",children:"External"})]})]}),(0,u.jsxs)("div",{className:"RegisForm_1",children:[(0,u.jsxs)("label",{htmlFor:"notes",children:["Frequency",(0,u.jsx)("span",{children:":"})]}),(0,u.jsxs)("select",{id:"frequency",name:"frequency",rows:"2",value:p.frequency,onChange:C,children:[(0,u.jsx)("option",{value:"",children:"Select"}),(0,u.jsx)("option",{value:"0-0-1",children:"0-0-1"}),(0,u.jsx)("option",{value:"0-1-1",children:"0-1-1"}),(0,u.jsx)("option",{value:"1-1-1",children:"1-1-1"}),(0,u.jsx)("option",{value:"1-1-0",children:"1-1-0"}),(0,u.jsx)("option",{value:"1-0-1",children:"1-0-1"}),(0,u.jsx)("option",{value:"SOS",children:"SOS"})]})]}),(0,u.jsxs)("div",{className:"RegisForm_1",children:[(0,u.jsxs)("label",{htmlFor:"duration",children:["Duration",(0,u.jsx)("span",{children:":"})]}),(0,u.jsx)("input",{type:"number",id:"durationNumber",name:"durationNumber",className:"dura_with1",value:p.durationNumber,onKeyDown:e=>["e","E","+","-"].includes(e.key)&&e.preventDefault(),onChange:C,disabled:"SOS"===p.frequency}),(0,u.jsxs)("select",{id:"durationUnit",name:"durationUnit",className:"dura_with",value:p.durationUnit,onChange:C,disabled:"SOS"===p.frequency,children:[(0,u.jsx)("option",{value:"days",children:"Days"}),(0,u.jsx)("option",{value:"weeks",children:"Weeks"}),(0,u.jsx)("option",{value:"months",children:"Months"})]})]}),(0,u.jsxs)("div",{className:"RegisForm_1",children:[(0,u.jsxs)("label",{htmlFor:"title",children:["Qty",(0,u.jsx)("span",{children:":"})]}),(0,u.jsx)("input",{id:"qty",name:"qty",value:p.qty,onChange:C,readOnly:("Tablets"===p.itemtype||"Tablet"===p.itemtype)&&""!==p.itemtype,disabled:"SOS"===p.frequency})]}),(0,u.jsxs)("div",{className:"RegisForm_1",children:[(0,u.jsxs)("label",{htmlFor:"instruction",children:["Instruction",(0,u.jsx)("span",{children:":"})]}),(0,u.jsx)("textarea",{id:"instruction",name:"instruction",rows:"2",value:p.instruction,onChange:C})]})]}),(0,u.jsx)("div",{className:"Main_container_Btn",children:(0,u.jsx)("button",{className:"RegisterForm_1_btns",type:"button",onClick:null!==k?()=>{const e=[...y];e[k]={id:y[k].id,...p},v(e),q(null),b({GenericName:"",ItemName:"",dose:"",route:"",qty:"",instruction:"",frequency:"",durationNumber:"",durationUnit:"days",itemtype:""})}:()=>{const e={id:y.length+1,...p};if(y.some((t=>t.ItemName===e.ItemName))){N({type:"toast",value:{message:"Medicine with the same Item Name is already added",type:"warn"}})}else v([...y,e]);b({GenericName:"",ItemName:"",dose:"",route:"",qty:"",instruction:"",frequency:"",durationNumber:"",durationUnit:"days",itemtype:""})},children:null!==k?"Update ":"Add "})}),y.length>0&&(0,u.jsxs)("div",{className:"for",children:[(0,u.jsx)("div",{className:"Add_items_Purchase_Master",children:(0,u.jsx)("span",{children:"Selected Medicine"})}),(0,u.jsx)("div",{className:"Selected-table-container",children:(0,u.jsxs)("table",{className:"selected-medicine-table2",children:[(0,u.jsx)("thead",{children:(0,u.jsxs)("tr",{children:[(0,u.jsx)("th",{id:"slectbill_ins",children:"GenericName"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"ItemName"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Item Type"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Dose"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Route"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Frequency"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Duration"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Qty"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Instruction"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Action"})]})}),(0,u.jsx)("tbody",{children:y.map(((e,t)=>(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:e.GenericName}),(0,u.jsx)("td",{children:e.ItemName}),(0,u.jsx)("td",{children:e.itemtype}),(0,u.jsx)("td",{children:e.dose}),(0,u.jsx)("td",{children:e.route}),(0,u.jsx)("td",{children:e.frequency}),(0,u.jsxs)("td",{children:[e.durationNumber," ",e.durationUnit]}),(0,u.jsx)("td",{children:e.qty}),(0,u.jsx)("td",{children:e.instruction}),(0,u.jsxs)("td",{children:[(0,u.jsx)("button",{className:"delnamebtn",onClick:()=>(e=>{const t=y[e];b({...t}),q(e)})(t),children:(0,u.jsx)(l.A,{})}),(0,u.jsx)("button",{className:"delnamebtn",onClick:()=>(e=>{const t=y.filter(((t,n)=>n!==e));v(t),q(null)})(t),children:(0,u.jsx)(c.A,{})})]})]},t)))})]})})]}),y.length>0&&(0,u.jsxs)("div",{className:"Main_container_Btn",children:[S&&(0,u.jsx)("button",{onClick:()=>{b({GenericName:"",ItemName:"",dose:"",route:"",qty:"",instruction:"",frequency:"",durationNumber:"",durationUnit:"days",itemtype:""}),G(!1)},children:"Clear"}),!S&&(0,u.jsx)("button",{onClick:()=>{const e=y.map((e=>({RegistrationId:null===n||void 0===n?void 0:n.pk,created_by:(null===t||void 0===t?void 0:t.username)||"",GenericName:e.GenericName,ItemName:e.ItemName,itemtype:e.itemtype,dose:e.dose,route:e.route,frequency:e.frequency,duration:"".concat(e.durationNumber," ").concat(e.durationUnit),qty:e.qty,instruction:e.instruction,Doctor_id:null===n||void 0===n?void 0:n.DoctorName})));if(console.log(e,"dataToSend"),0!==e.length)s.A.post("".concat(m,"Workbench/Workbench_Prescription_Details"),e).then((e=>{if(e.data.duplicate_item_names){const t=e.data.duplicate_item_names.join(", "),n={message:"Duplicate ItemNames found: ".concat(t),type:"warn"};N({type:"toast",value:n})}else console.log(e.data.message),v([])})).catch((e=>{console.error(e)}));else{N({type:"toast",value:{message:"No Prescription Data To Save",type:"warn"}})}},children:"Submit"})]}),(0,u.jsx)(h.A,{Message:e.message,Type:e.type})]})}),"Output"===x&&(0,u.jsx)(u.Fragment,{children:Object.keys(_).length>0?(0,u.jsx)("div",{className:"for",children:Object.entries(_).map((e=>{let[t,n]=e;return(0,u.jsxs)("div",{className:"Add_items_Purchase_Master",children:[(0,u.jsx)("span",{children:"Given Medicine by Dr.".concat(t)}),(0,u.jsx)("div",{className:"Selected-table-container",children:(0,u.jsxs)("table",{className:"selected-medicine-table2",children:[(0,u.jsx)("thead",{children:(0,u.jsxs)("tr",{children:[(0,u.jsx)("th",{id:"slectbill_ins",children:"GenericName"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"ItemName"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Item Type"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Dose"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Route"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Frequency"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Duration"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Qty"}),(0,u.jsx)("th",{id:"slectbill_ins",children:"Instruction"})]})}),(0,u.jsx)("tbody",{children:n.map(((e,t)=>(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:e.GenericName}),(0,u.jsx)("td",{children:e.ItemName}),(0,u.jsx)("td",{children:e.Itemtype}),(0,u.jsx)("td",{children:e.Dose}),(0,u.jsx)("td",{children:e.Route}),(0,u.jsx)("td",{children:e.Frequency}),(0,u.jsx)("td",{children:"".concat(e.DurationNumber," ").concat(e.DurationUnit)}),(0,u.jsx)("td",{children:e.Qty}),(0,u.jsx)("td",{children:e.Instruction})]},t)))})]})})]},t)}))}):(0,u.jsx)("div",{className:"DivCenter_container",children:"No medication was issued during the Current visit."})}),(0,u.jsx)(h.A,{Message:e.message,Type:e.type})]})})}},8340:()=>{}}]);
//# sourceMappingURL=4639.a74f4b38.chunk.js.map