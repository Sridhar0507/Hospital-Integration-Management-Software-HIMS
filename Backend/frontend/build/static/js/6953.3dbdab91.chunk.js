"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6953],{6953:(e,a,i)=>{i.r(a),i.d(a,{default:()=>m});var t=i(5043),s=i(3003),n=i(6133),l=i(6213),r=i(6324),c=i(7392),d=i(7260),o=i(8309),x=i(5239),h=i.n(x),p=i(579);const m=()=>{const e=(0,s.wA)(),a=(0,s.d4)((e=>{var a;return null===(a=e.userRecord)||void 0===a?void 0:a.UrlLink})),i=(0,s.d4)((e=>{var a;return null===(a=e.userRecord)||void 0===a?void 0:a.toast})),x=(0,s.d4)((e=>{var a;return null===(a=e.Frontoffice)||void 0===a?void 0:a.IP_DoctorWorkbenchNavigation}));console.log(x,"IP_DoctorWorkbenchNavigation");const m=(0,s.d4)((e=>{var a;return null===(a=e.userRecord)||void 0===a?void 0:a.UserData})),[j,u]=(0,t.useState)(null),[v,w]=(0,t.useState)({ScalpHair:!1,Nails:!1,Givemouth:!1,Vaginal:!1,Bowel:!1,Enema:!1,secTextArea:"",SixTextArea:"",SevenTextArea:"",ThirdTextArea:"",urinaryCatheter:!1,DutySisterName:"",nasogastricTube:!1,Date:"",Time:""}),g=e=>{const{name:a,checked:i}=e.target;w((e=>({...e,[a]:i})))},y=(e,a)=>{const{value:i}=e.target;w((e=>({...e,[a]:i})))},[b,f]=(0,t.useState)({nilOrallyAfter:{value:"",period:"am"},ivDripAt:{value:"",period:"am"},ivSiteList:"Select",location:"Select"}),N=function(e,a){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;const{value:t}=e.target;f(i?e=>({...e,[a]:{...e[a],[i]:t}}):e=>({...e,[a]:t}))},[q,S]=(0,t.useState)([]),[C,A]=(0,t.useState)(!1),[k,T]=(0,t.useState)(!1),D=[{key:"id",name:"S.No",frozen:!0},{key:"view",frozen:!0,name:"View",renderCell:e=>(0,p.jsx)(c.A,{onClick:()=>R(e.row),children:(0,p.jsx)(d.A,{})})},{key:"VisitId",name:"VisitId",frozen:!0},{key:"PrimaryDoctorName",name:"Doctor Name",frozen:!0},{key:"Date",name:"Date",frozen:!0},{key:"Time",name:"Time",frozen:!0}],R=e=>{var a,i;if(!e)return void console.error("No data provided for view.");const t=(null===(a=e.nilOrallyAfter)||void 0===a?void 0:a.split(" "))||["","am"],s=(null===(i=e.ivDripAt)||void 0===i?void 0:i.split(" "))||["","am"];f({nilOrallyAfter:{value:t[0],period:t[1]||"am"},ivDripAt:{value:s[0],period:s[1]||"am"},ivSiteList:e.ivSiteList||"Select",location:e.location||"Select"}),w({ScalpHair:e.ScalpHair||"",Nails:e.Nails||"",Givemouth:e.Givemouth||"",Vaginal:e.Vaginal||"",Bowel:e.Bowel||"",Enema:e.Enema||"",secTextArea:e.secTextArea||"",SixTextArea:e.SixTextArea||"",SevenTextArea:e.SevenTextArea||"",ThirdTextArea:e.ThirdTextArea||"",urinaryCatheter:e.urinaryCatheter||"",DutySisterName:e.DutySisterName||"",nasogastricTube:e.nasogastricTube||"",Date:e.Date||"",Time:e.Time||""}),e.AnnotatedImage?u(e.AnnotatedImage):u(null),T(!0)},z=()=>{f({nilOrallyAfter:{value:"",period:"am"},ivDripAt:{value:"",period:"am"},ivSiteList:"Select",location:"Select"}),w({ScalpHair:"",Nails:"",Givemouth:"",Vaginal:"",Bowel:"",Enema:"",secTextArea:"",SixTextArea:"",SevenTextArea:"",ThirdTextArea:"",urinaryCatheter:"",DutySisterName:"",nasogastricTube:"",Date:"",Time:""}),u(null),T(!1)};(0,t.useEffect)((()=>{l.A.get("".concat(a,"Ip_Workbench/IP_PreOpInstructions_Details_Link"),{params:{RegistrationId:null===x||void 0===x?void 0:x.RegistrationId}}).then((e=>{const a=e.data;console.log(a),S(a)})).catch((e=>{console.log(e)}))}),[a,x,C,j]);const[O,I]=(0,t.useState)([]),_=(0,t.useRef)(null);return(0,p.jsxs)("div",{className:"new-patient-registration-form",children:[(0,p.jsx)("br",{}),(0,p.jsxs)("div",{className:"Supplier_Master_Container",children:[(0,p.jsx)("h4",{style:{color:"var(--labelcolor)",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"start",padding:"10px"},children:"Preoperative Intructions"}),(0,p.jsxs)("div",{className:"OtMangementForm_1 djkwked675 dedwe",children:[(0,p.jsx)("label",{className:"jewj33j",children:"Date:"}),(0,p.jsx)("input",{type:"date",value:v.Date,onChange:e=>w((a=>({...a,Date:e.target.value})))})]}),(0,p.jsxs)("div",{className:"OtMangementForm_1 djkwked675 dedwe",children:[(0,p.jsx)("label",{className:"jewj33j",children:"Time:"}),(0,p.jsx)("input",{type:"time",value:v.Time,onChange:e=>w((a=>({...a,Time:e.target.value})))})]}),(0,p.jsxs)("div",{className:"wdqqwqxxz",style:{display:"flex",flexDirection:"column"},children:[(0,p.jsxs)("label",{children:[(0,p.jsx)("p",{style:{marginRight:"10px"},children:"1."})," (a) Prepare the following area (mark the area) :"]}),j?(0,p.jsx)("img",{src:j,alt:"background"}):(0,p.jsxs)("div",{className:"web_camera_svg",ref:_,children:[(0,p.jsx)("img",{src:o,alt:"background"}),(0,p.jsx)("svg",{onClick:e=>{const a=_.current.getBoundingClientRect(),i={x:e.clientX-a.left,y:e.clientY-a.top,radius:15,colour:"red",linewidth:2};I([...O,i])},children:O.map(((e,a)=>(0,p.jsx)("circle",{cx:e.x,cy:e.y,r:e.radius,stroke:e.colour,strokeWidth:e.linewidth,fill:"none"},a)))})]})]}),(0,p.jsxs)("div",{className:"wdqqwqxxz",children:[(0,p.jsxs)("label",{children:[(0,p.jsx)("p",{style:{marginRight:"10px",width:"10px !important",display:"flex",justifyContent:"space-between"},children:"(b)"}),(0,p.jsxs)("span",{className:"ddddd445",style:{display:"flex",justifyContent:"space-between",gap:"10px",width:"280px"},children:["Scalp Hair to he covered braided / clipped",(0,p.jsx)("span",{children:":"})]})]}),(0,p.jsx)("div",{className:"dccffcfc5",children:(0,p.jsx)("label",{htmlFor:"ScalpHair",children:(0,p.jsx)("input",{type:"checkbox",id:"ScalpHair",name:"ScalpHair",checked:v.ScalpHair,onChange:g})})})]}),(0,p.jsx)("br",{}),(0,p.jsxs)("div",{className:"wdqqwqxxz",children:[(0,p.jsxs)("label",{children:[(0,p.jsx)("p",{style:{marginRight:"10px",width:"10px !important",display:"flex",justifyContent:"space-between"},children:"(c)"}),(0,p.jsxs)("span",{className:"ddddd445",style:{display:"flex",justifyContent:"space-between",gap:"10px",width:"280px"},children:[" ","Nails to be cleaned,clipped",(0,p.jsx)("span",{children:":"})]})]}),(0,p.jsx)("div",{className:"dccffcfc5",children:(0,p.jsx)("label",{htmlFor:"Nails",children:(0,p.jsx)("input",{type:"checkbox",id:"Nails",name:"Nails",checked:v.Nails,onChange:g})})})]}),(0,p.jsx)("br",{}),(0,p.jsxs)("div",{className:"cccccccbbn",children:[(0,p.jsxs)("div",{className:"wdqqwqxxz",children:[(0,p.jsxs)("label",{children:[(0,p.jsx)("p",{style:{marginRight:"10px"},children:"2."}),"Give mouth wash"]}),(0,p.jsx)("label",{htmlFor:"Givemouth",className:"qwdw33wew2sd",children:(0,p.jsx)("input",{type:"checkbox",id:"Givemouth",name:"Givemouth",checked:v.Givemouth,onChange:g})})]}),(0,p.jsxs)("div",{className:"wdqqwqxxz",children:[(0,p.jsx)("label",{children:"Vaginal douche"}),(0,p.jsx)("label",{htmlFor:"Vaginal",className:"qwdw33wew2sd",children:(0,p.jsx)("input",{type:"checkbox",id:"Vaginal",name:"Vaginal",checked:v.Vaginal,onChange:g})})]}),(0,p.jsxs)("div",{className:"wdqqwqxxz",children:[(0,p.jsx)("label",{children:"Bowel wash"}),(0,p.jsx)("label",{htmlFor:"Bowel",className:"qwdw33wew2sd",children:(0,p.jsx)("input",{type:"checkbox",id:"Bowel",name:"Bowel",checked:v.Bowel,onChange:g})})]}),(0,p.jsxs)("div",{className:"wdqqwqxxz",children:[(0,p.jsx)("label",{children:"Enema "}),(0,p.jsx)("label",{htmlFor:"Enema",className:"qwdw33wew2sd",children:(0,p.jsx)("input",{type:"checkbox",id:"Enema",name:"Enema",checked:v.Enema,onChange:g})})]})]}),(0,p.jsx)("div",{className:"wdqqwqxxz",children:(0,p.jsx)("textarea",{value:v.secTextArea,onChange:e=>y(e,"secTextArea")})}),(0,p.jsxs)("div",{className:"cccccccbbn",children:[(0,p.jsxs)("div",{className:"wdqqwqxxz",children:[(0,p.jsxs)("label",{children:[(0,p.jsx)("p",{style:{marginRight:"10px"},children:"3."})," Pass urinary catheter"]}),(0,p.jsx)("label",{htmlFor:"urinaryCatheter",className:"qwdw33wew2sd",children:(0,p.jsx)("input",{type:"checkbox",id:"urinaryCatheter",name:"urinaryCatheter",checked:v.urinaryCatheter,onChange:g})})]}),(0,p.jsxs)("div",{className:"wdqqwqxxz",children:[(0,p.jsx)("label",{children:"nasogastric tube"}),(0,p.jsx)("label",{htmlFor:"nasogastricTube",className:"qwdw33wew2sd",children:(0,p.jsx)("input",{type:"checkbox",id:"nasogastricTube",name:"nasogastricTube",checked:v.nasogastricTube,onChange:g})})]})]}),(0,p.jsx)("div",{className:"wdqqwqxxz",children:(0,p.jsx)("textarea",{value:v.ThirdTextArea,onChange:e=>y(e,"ThirdTextArea")})}),(0,p.jsx)("div",{className:"cccccccbbn",children:(0,p.jsxs)("div",{className:"wdqqwqxxz",children:[(0,p.jsxs)("label",{children:[(0,p.jsx)("p",{style:{marginRight:"10px",width:"10px !important",display:"flex",justifyContent:"space-between"},children:"4."}),(0,p.jsxs)("span",{className:"ddddd445",style:{display:"flex",justifyContent:"space-between",gap:"10px",width:"140px"},children:["Nil orally after ",(0,p.jsx)("span",{children:":"})]})]}),(0,p.jsx)("label",{htmlFor:"",className:"jyutr",children:(0,p.jsx)("input",{type:"number",value:b.nilOrallyAfter.value,onChange:e=>N(e,"nilOrallyAfter","value")})}),(0,p.jsxs)("select",{value:b.nilOrallyAfter.period,onChange:e=>N(e,"nilOrallyAfter","period"),children:[(0,p.jsx)("option",{children:"am"}),(0,p.jsx)("option",{children:"pm"})]})]})}),(0,p.jsx)("div",{className:"wdqqwqxxz",children:(0,p.jsxs)("label",{children:[(0,p.jsx)("p",{style:{marginRight:"10px",width:"10px !important",display:"flex",justifyContent:"space-between"},children:"5."})," ",(0,p.jsxs)("span",{style:{display:"flex",justifyContent:"space-between",gap:"10px",width:"130px"},children:["Start IV with Venflo",(0,p.jsx)("span",{children:":"})]})]})}),(0,p.jsxs)("div",{className:"wdqqwqxxz",children:[(0,p.jsxs)("label",{children:[(0,p.jsx)("p",{style:{marginRight:"10px",width:"10px !important",display:"flex",justifyContent:"space-between"},children:"(a)"}),(0,p.jsxs)("span",{className:"ddddd445",style:{display:"flex",justifyContent:"space-between",gap:"10px",width:"140px"},children:["Drip at",(0,p.jsx)("span",{children:":"})]})]}),(0,p.jsx)("label",{htmlFor:"",className:"jyutr",children:(0,p.jsx)("input",{type:"number",value:b.ivDripAt.value,onChange:e=>N(e,"ivDripAt","value")})}),(0,p.jsxs)("select",{value:b.ivDripAt.period,onChange:e=>N(e,"ivDripAt","period"),children:[(0,p.jsx)("option",{children:"am"}),(0,p.jsx)("option",{children:"pm"})]})]}),(0,p.jsxs)("div",{className:"wdqqwqxxz",children:[(0,p.jsxs)("label",{children:[(0,p.jsx)("p",{style:{marginRight:"10px",width:"10px !important",display:"flex",justifyContent:"space-between"},children:"(b)"}),(0,p.jsxs)("span",{className:"ddddd445",style:{display:"flex",justifyContent:"space-between",gap:"10px",width:"140px"},children:["IV Site List",(0,p.jsx)("span",{children:":"})]})]}),(0,p.jsxs)("select",{className:"jjklkj1",value:b.ivSiteList,onChange:e=>N(e,"ivSiteList"),children:[(0,p.jsx)("option",{children:"Select"}),(0,p.jsx)("option",{children:"External Jugular"}),(0,p.jsx)("option",{children:"Subclavian vein"}),(0,p.jsx)("option",{children:"Femoral vein"}),(0,p.jsx)("option",{children:"Dorsal Venous Network of Hand"}),(0,p.jsx)("option",{children:"Radial vein"}),(0,p.jsx)("option",{children:"Median Cubital vein"}),(0,p.jsx)("option",{children:"Cephalic vein"}),(0,p.jsx)("option",{children:"Dorsal Venous Network of Leg"}),(0,p.jsx)("option",{children:"Saphaneous vein"}),(0,p.jsx)("option",{children:"Superficial Temporal vein"})]})]}),(0,p.jsxs)("div",{className:"wdqqwqxxz",children:[(0,p.jsxs)("label",{children:[(0,p.jsx)("p",{style:{marginRight:"10px",width:"10px !important",display:"flex",justifyContent:"space-between"},children:"(c)"}),(0,p.jsxs)("span",{className:"ddddd445",style:{display:"flex",justifyContent:"space-between",gap:"10px",width:"140px"},children:["Location",(0,p.jsx)("span",{children:":"})]})]}),(0,p.jsxs)("select",{className:"jjklkj1",value:b.location,onChange:e=>N(e,"location"),children:[(0,p.jsx)("option",{children:"Select"}),(0,p.jsx)("option",{children:"Left"}),(0,p.jsx)("option",{children:"Right"})]})]}),(0,p.jsx)("div",{className:"cccccccbbn",children:(0,p.jsx)("div",{className:"wdqqwqxxz",children:(0,p.jsxs)("label",{children:[(0,p.jsx)("p",{style:{marginRight:"10px"},children:"6."})," Preanaesthetic medication / Anticoagulants / Other Medicines"]})})}),(0,p.jsx)("div",{className:"wdqqwqxxz",children:(0,p.jsx)("textarea",{value:v.SixTextArea,onChange:e=>y(e,"SixTextArea")})}),(0,p.jsx)("div",{className:"cccccccbbn",children:(0,p.jsx)("div",{className:"wdqqwqxxz",children:(0,p.jsxs)("label",{children:[(0,p.jsx)("p",{style:{marginRight:"10px"},children:"7."})," Send all Records & Reports with the patient to the Operation Room"]})})}),(0,p.jsx)("div",{className:"wdqqwqxxz",children:(0,p.jsx)("textarea",{value:v.SevenTextArea,onChange:e=>y(e,"SevenTextArea")})}),(0,p.jsxs)("div",{className:"OtMangementForm_1 djkwked675 dedwe",children:[(0,p.jsx)("label",{className:"jewj33j",children:"Checked by(Duty Sister Name) - "}),(0,p.jsx)("input",{type:"text",style:{border:"none",borderBottom:"2px solid var(--ProjectColor)",outline:"none"},value:v.DutySisterName,onChange:e=>w((a=>({...a,DutySisterName:e.target.value})))})]}),(0,p.jsxs)("div",{className:"Main_container_Btn",children:[k&&(0,p.jsx)("button",{onClick:z,children:"Clear"}),!k&&(0,p.jsx)("button",{onClick:()=>{console.log(O,o,"-------"),o&&O.length>0?h()(_.current,{useCORS:!0}).then((i=>{const t=i.toDataURL("image/jpeg");console.log("Annotated Image Data URL:",t);const s=new FormData,n=t.split(",")[1];s.append("AnnotatedImage",n);const r={...v,nilOrallyAfter:"".concat(b.nilOrallyAfter.value," ").concat(b.nilOrallyAfter.period),ivDripAt:"".concat(b.ivDripAt.value," ").concat(b.ivDripAt.period),ivSiteList:b.ivSiteList,location:b.location,RegistrationId:null===x||void 0===x?void 0:x.RegistrationId,Createdby:null===m||void 0===m?void 0:m.username};Object.keys(r).forEach((e=>{s.append(e,r[e])})),l.A.post("".concat(a,"Ip_Workbench/IP_PreOpInstructions_Details_Link"),s,{headers:{"Content-Type":"multipart/form-data"}}).then((a=>{const[i,t]=[Object.keys(a.data)[0],Object.values(a.data)[0]];e({type:"toast",value:{message:t,type:i}}),A((e=>!e)),z()})).catch((e=>{console.error("Submission error:",e)}))})).catch((e=>{console.error("Error capturing image:",e)})):console.warn("OTpic is missing or lines length is zero.")},children:"Submit"})]}),q.length>=0&&(0,p.jsx)(n.A,{columns:D,RowData:q}),(0,p.jsx)(r.A,{Message:i.message,Type:i.type})]})]})}}}]);
//# sourceMappingURL=6953.3dbdab91.chunk.js.map