import{g as e,j as a,C as s,Y as n,h as i,G as r,_ as o,q as t,f as l,n as d,a as m,b as p,A as c,B as x,T as g,c as h,d as u,M as j,e as f,D as v,S as b}from"./index-DPNEyMe_.js";import{s as y}from"./socialProviders-1i34LJVN.js";const w=e(a.jsx("path",{d:"M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1zm5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2zm-2 0H9V4h9v12z"}),"ContentCopyRounded");var S={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const C=({loginLink:e,wrapperProps:C,contentProps:A,renderContent:P,providers:L,formProps:W,hideForm:D})=>{const{onSubmit:I,...T}=W||{},{register:k,handleSubmit:z,formState:{errors:E}}=s({...T}),N=n(),{mutate:_,isLoading:V}=i({v3LegacyAuthProviderCompatible:!!(null==N?void 0:N.isLegacy)}),{mutate:H,isLoading:M}=r({v3LegacyAuthProviderCompatible:!!(null==N?void 0:N.isLegacy)}),R=o(),q=t(),F=l(),{Link:Z}=d(),B="legacy"===q?Z:F,O=e=>{_(e,{onSuccess:a=>{a.success&&H(e)}})},$=a.jsxs(a.Fragment,{children:[a.jsx("img",{width:85,alt:S.VITE_APP_NAME,src:"/images/logos/logo-96x96.png",className:"shadow-md rounded-full border-4 border-white relative block -mb-10 mx-auto"}),a.jsx(m,{...A??{},children:a.jsxs(p,{sx:{p:"32px",pt:7,"&:last-child":{pb:"32px"}},children:[a.jsx(c,{severity:"warning",className:"mb-4",children:R("attentionAuth")}),!D&&a.jsxs(x,{component:"form",onSubmit:z((e=>I?I(e):O(e))),children:[a.jsx(g,{...k("email",{required:!0,pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Invalid email address"}}),id:"email",margin:"normal",fullWidth:!0,label:"Email",error:!!E.email,helperText:E.email?E.email.message:"",name:"email",autoComplete:"email",sx:{mt:0}}),a.jsx(g,{...k("name",{required:!0,pattern:{value:/^\S(.*\S)?$/,message:"No leading and trailing whitespace"}}),id:"name",margin:"normal",fullWidth:!0,label:"Name",error:!!E.name,helperText:E.name?E.name.message:"",name:"name",autoComplete:"name"}),a.jsx(g,{...k("password",{required:!0}),id:"password",margin:"normal",fullWidth:!0,name:"password",label:"Password",helperText:E.password?E.password.message:"",error:!!E.password,type:"password",autoComplete:"current-password",sx:{mb:0}}),a.jsx(h,{type:"submit",fullWidth:!0,variant:"contained",disabled:V,sx:{mt:"24px"},children:"Sign up"})]}),a.jsxs(a.Fragment,{children:[!D&&a.jsx(v,{sx:{fontSize:"18px",marginY:"16px"},children:R("pages.login.divider")}),a.jsx(b,{spacing:1,children:y.map((e=>a.jsx(h,{color:"secondary",fullWidth:!0,variant:"outlined",sx:{color:"primary.light",borderColor:"primary.light",textTransform:"none"},onClick:()=>O({name:"Jane Doe",email:"jane.doe@email.com",password:"password",providerName:e.name}),startIcon:a.jsx(e.icon,{}),children:e.label},e.name)))})]}),e??a.jsxs(x,{display:"flex",justifyContent:"flex-end",alignItems:"center",sx:{mt:"24px",display:"flex",justifyContent:"center",alignItems:"center"},children:[a.jsx(u,{variant:"body2",component:"span",fontSize:"14px",children:R("pages.login.buttons.haveAccount")}),a.jsx(j,{ml:"4px",variant:"body2",color:"primary",component:B,underline:"none",to:"/login",fontSize:"14px",fontWeight:"bold",children:R("pages.login.signin")})]})]})})]});return a.jsx(x,{component:"div",...C??{},sx:{backgroundImage:'url("images/movie_poster_mix.jpg")'},children:a.jsx(x,{sx:{backgroundColor:"rgba(0,0,0,.2)"},children:a.jsx(f,{component:"main",sx:{display:"flex",flexDirection:"column",justifyContent:D?"flex-start":"center",alignItems:"center",minHeight:"100dvh",padding:"16px",width:"100%",maxWidth:"400px"},children:a.jsx(x,{sx:{width:"100%",maxWidth:"400px",display:"flex",flexDirection:"column",paddingTop:D?"15dvh":0},children:P?P(w):$})})})})};export{C as default};
