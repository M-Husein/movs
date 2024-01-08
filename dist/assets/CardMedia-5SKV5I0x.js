import{u as e,t,ah as a,v as i,x as n,z as o,ai as r,k as s,H as d,I as l,j as h,J as m,K as c,l as u,$ as g}from"./index-G9kx53fn.js";function p(t){return e("MuiSkeleton",t)}t("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const f=["animation","className","component","height","style","variant","width"];let v,w,b,C,k=e=>e;const y=a(v||(v=k`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),M=a(w||(w=k`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),S=i("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],!1!==a.animation&&t[a.animation],a.hasChildren&&t.withChildren,a.hasChildren&&!a.width&&t.fitContent,a.hasChildren&&!a.height&&t.heightAuto]}})((({theme:e,ownerState:t})=>{const a=(i=e.shape.borderRadius,String(i).match(/[\d.\-+]*\s*(.*)/)[1]||""||"px");var i;const r=(s=e.shape.borderRadius,parseFloat(s));var s;return n({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:o(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em"},"text"===t.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${r}${a}/${Math.round(r/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===t.variant&&{borderRadius:"50%"},"rounded"===t.variant&&{borderRadius:(e.vars||e).shape.borderRadius},t.hasChildren&&{"& > *":{visibility:"hidden"}},t.hasChildren&&!t.width&&{maxWidth:"fit-content"},t.hasChildren&&!t.height&&{height:"auto"})}),(({ownerState:e})=>"pulse"===e.animation&&r(b||(b=k`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),y)),(({ownerState:e,theme:t})=>"wave"===e.animation&&r(C||(C=k`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),M,(t.vars||t).palette.action.hover))),R=s.forwardRef((function(e,t){const a=d({props:e,name:"MuiSkeleton"}),{animation:i="pulse",className:o,component:r="span",height:s,style:u,variant:g="text",width:v}=a,w=l(a,f),b=n({},a,{animation:i,component:r,variant:g,hasChildren:Boolean(w.children)}),C=(e=>{const{classes:t,variant:a,animation:i,hasChildren:n,width:o,height:r}=e;return c({root:["root",a,i,n&&"withChildren",n&&!o&&"fitContent",n&&!r&&"heightAuto"]},p,t)})(b);return h.jsx(S,n({as:r,ref:t,className:m(C.root,o),ownerState:b},w,{style:n({width:v,height:s},u)}))})),x=()=>{const e=u()(),{data:t,isLoading:a,isFetching:i,isRefetching:n}=g({queryOptions:{retry:!1},pagination:{mode:"off"},resource:"genre/movie/list",meta:{params:{language:e}}});return{data:t,isLoading:a,isFetching:i,isRefetching:n,joinGenre:e=>{const a=(null==t?void 0:t.genres)||[];return(e||[]).map((e=>{var t;return null==(t=a.find((t=>t.id===e)))?void 0:t.name})).join(" • ")}}};function $(t){return e("MuiCardMedia",t)}t("MuiCardMedia",["root","media","img"]);const j=["children","className","component","image","src","style"],I=i("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e,{isMediaComponent:i,isImageComponent:n}=a;return[t.root,i&&t.media,n&&t.img]}})((({ownerState:e})=>n({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},e.isMediaComponent&&{width:"100%"},e.isImageComponent&&{objectFit:"cover"}))),N=["video","audio","picture","iframe","img"],F=["picture","img"],A=s.forwardRef((function(e,t){const a=d({props:e,name:"MuiCardMedia"}),{children:i,className:o,component:r="div",image:s,src:u,style:g}=a,p=l(a,j),f=-1!==N.indexOf(r),v=!f&&s?n({backgroundImage:`url("${s}")`},g):g,w=n({},a,{component:r,isMediaComponent:f,isImageComponent:-1!==F.indexOf(r)}),b=(e=>{const{classes:t,isMediaComponent:a,isImageComponent:i}=e;return c({root:["root",a&&"media",i&&"img"]},$,t)})(w);return h.jsx(I,n({className:m(b.root,o),as:r,role:!f&&s?"img":void 0,ref:t,style:v,ownerState:w,src:f?s||u:void 0},p,{children:i}))}));export{A as C,R as S,x as u};
