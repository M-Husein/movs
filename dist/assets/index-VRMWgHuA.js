import{g as e,j as a,C as n,Y as i,h as s,G as r,_ as o,q as t,f as l,n as d,a as m,b as p,T as c,B as x,c as h,d as g,M as u,e as f,S as v,D as j}from"./index-HhdMA2AP.js";const y=e(a.jsx("path",{d:"M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1zm5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2zm-2 0H9V4h9v12z"}),"ContentCopyRounded"),b=({loginLink:e,wrapperProps:b,contentProps:w,renderContent:S,providers:C,formProps:W,hideForm:L})=>{const{onSubmit:z,...A}=W||{},{register:I,handleSubmit:P,formState:{errors:T}}=n({...A}),k=i(),{mutate:D,isLoading:H}=s({v3LegacyAuthProviderCompatible:!!(null==k?void 0:k.isLegacy)}),{mutate:q,isLoading:N}=r({v3LegacyAuthProviderCompatible:!!(null==k?void 0:k.isLegacy)}),V=o(),Z=t(),_=l(),{Link:B}=d(),F="legacy"===Z?B:_,M=a.jsx(m,{...w??{},children:a.jsxs(p,{sx:{p:"32px","&:last-child":{pb:"32px"}},children:[a.jsx(c,{component:"h1",variant:"h5",align:"center",color:"primary",fontWeight:700,sx:{textAlign:"center",fontSize:"24px",marginBottom:"24px",overflowWrap:"break-word",hyphens:"manual",textOverflow:"unset",whiteSpace:"pre-wrap"},children:V("pages.register.title")}),C&&C.length>0?a.jsxs(a.Fragment,{children:[a.jsx(v,{spacing:1,children:C.map((e=>a.jsx(g,{color:"secondary",fullWidth:!0,variant:"outlined",sx:{color:"primary.light",borderColor:"primary.light",textTransform:"none"},onClick:()=>D({name:"John Doe",email:"john.doe@email.com",password:"password",providerName:e.name}),startIcon:e.icon,children:e.label},e.name)))}),!L&&a.jsx(j,{sx:{fontSize:"12px",marginY:"16px"},children:V("pages.login.divider")})]}):null,!L&&a.jsxs(x,{component:"form",onSubmit:P((e=>(console.log("data: ",e),z?z(e):D(e,{onSuccess:a=>{a.success&&q(e)}})))),children:[a.jsx(h,{...I("email",{required:!0,pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Invalid email address"}}),id:"email",margin:"normal",fullWidth:!0,label:"Email",error:!!T.email,helperText:T.email?T.email.message:"",name:"email",autoComplete:"email",sx:{mt:0}}),a.jsx(h,{...I("name",{required:!0,pattern:{value:/^\S(.*\S)?$/,message:"No leading and trailing whitespace"}}),id:"name",margin:"normal",fullWidth:!0,label:"Name",error:!!T.name,helperText:T.name?T.name.message:"",name:"name",autoComplete:"name"}),a.jsx(h,{...I("password",{required:!0}),id:"password",margin:"normal",fullWidth:!0,name:"password",label:"Password",helperText:T.password?T.password.message:"",error:!!T.password,type:"password",autoComplete:"current-password",sx:{mb:0}}),a.jsx(g,{type:"submit",fullWidth:!0,variant:"contained",disabled:H,sx:{mt:"24px"},children:"Sign up"})]}),e??a.jsxs(x,{display:"flex",justifyContent:"flex-end",alignItems:"center",sx:{mt:"24px",display:"flex",justifyContent:"center",alignItems:"center"},children:[a.jsx(c,{variant:"body2",component:"span",fontSize:"14px",children:V("pages.login.buttons.haveAccount")}),a.jsx(u,{ml:"4px",variant:"body2",color:"primary",component:F,underline:"none",to:"/login",fontSize:"14px",fontWeight:"bold",children:V("pages.login.signin")})]})]})});return a.jsx(x,{component:"div",...b??{},sx:{backgroundImage:'url("images/movie_poster_mix.jpg")'},children:a.jsx(f,{component:"main",sx:{display:"flex",flexDirection:"column",justifyContent:L?"flex-start":"center",alignItems:"center",minHeight:"100dvh",padding:"16px",width:"100%",maxWidth:"400px"},children:a.jsx(x,{sx:{width:"100%",maxWidth:"400px",display:"flex",flexDirection:"column",paddingTop:L?"15dvh":0},children:S?S(y):M})})})};export{b as default};