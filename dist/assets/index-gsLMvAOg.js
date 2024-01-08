import{a6 as e,aa as r,W as s,a7 as a,k as t,j as n,m as i,a as o,L as l,c,ab as u,b as d,d as f,ac as h,A as m,ad as x,ae as v,af as b,ag as p,a9 as g}from"./index-q44zD4MW.js";import{u as j,C as y,S as w}from"./CardMedia-rCKiKybP.js";function N(s,a,t){return function(r,s,a){var t,n;"function"==typeof r?(t=s||[],n=a):(t=[],n=s);var i=e.useRef({hasResult:!1,result:n,error:null}),o=e.useReducer((function(e){return e+1}),0);o[0];var l=o[1],c=e.useMemo((function(){var e="function"==typeof r?r():r;if(!e||"function"!=typeof e.subscribe)throw r===e?new TypeError("Given argument to useObservable() was neither a valid observable nor a function."):new TypeError("Observable factory given to useObservable() did not return a valid observable.");if(!i.current.hasResult&&"undefined"!=typeof window&&("function"!=typeof e.hasValue||e.hasValue()))if("function"==typeof e.getValue)i.current.result=e.getValue(),i.current.hasResult=!0;else{var s=e.subscribe((function(e){i.current.result=e,i.current.hasResult=!0}));"function"==typeof s?s():s.unsubscribe()}return e}),t);if(e.useDebugValue(i.current.result),e.useEffect((function(){var e=c.subscribe((function(e){var r=i.current;null===r.error&&r.result===e||(r.error=null,r.result=e,r.hasResult=!0,l())}),(function(e){var r=i.current;r.error!==e&&(r.error=e,l())}));return"function"==typeof e?e:e.unsubscribe.bind(e)}),t),i.current.error)throw i.current.error;return i.current.result}((function(){return r(s)}),a||[],t)}function R(){const e="Favorites";s(e+" • Movs");const{data:r}=a(),{isLoading:R,isFetching:C,isRefetching:_,joinGenre:k}=j(),[V,L]=t.useState(),z=N((async()=>await g.favorites.where("userId").equals(r.id).toArray())),A=()=>{L(null)};return n.jsxs("div",{className:"max-w-screen-xl mx-auto p-4 lg_px-5",children:[n.jsx("h1",{className:"text-2xl",children:e}),(null==z?void 0:z.length)?n.jsx(i,{container:!0,spacing:{xs:2,md:3},columns:{xs:4,sm:8,md:12},children:null==z?void 0:z.map((e=>n.jsx(i,{item:!0,xs:2,sm:4,md:3,component:"article",children:n.jsxs(o,{className:"h-full flex flex-col relative",children:[n.jsx(l,{to:"/movie/"+e.id,className:"no-underline",children:n.jsx(y,{component:"img",alt:e.title||e.original_title,loading:"lazy",decoding:"async",image:"https://image.tmdb.org/t/p/w500"+e.backdrop_path,className:"aspect-video bg-slate-300",onLoad:e=>e.target.classList.remove("bg-slate-300")})}),n.jsx(c,{onClick:()=>L(e),color:"error",variant:"contained",size:"small",title:"Remove",sx:{minWidth:32,width:32,position:"absolute",top:9,right:9,zIndex:1,borderRadius:"50%"},children:n.jsx(u,{})}),n.jsxs(d,{className:"h-full flex flex-col",children:[n.jsx("h1",{className:"text-base line-clamp-2 body-color",children:n.jsx(l,{to:"/movie/"+e.id,className:"no-underline body-color",title:e.title||e.original_title,children:e.title||e.original_title})}),n.jsx(f,{variant:"body2",color:"text.secondary",className:"line-clamp-3",sx:{mt:"auto"},children:e.overview})]}),n.jsx(h,{children:R||C||_?n.jsx(w,{width:"60%"}):n.jsx("div",{className:"text-xs",children:k(e.genre_ids)})})]})},e.id)))}):n.jsxs(m,{severity:"info",children:[n.jsx(x,{sx:{fontWeight:700},children:"No data"}),"You don't have a favorite, please add your favorite movie."]}),n.jsxs(v,{open:!!V,onClose:A,"aria-labelledby":"confirm-title",children:[n.jsx(b,{id:"confirm-title",children:"Are you sure to remove this data?"}),n.jsxs(p,{children:[n.jsx(c,{onClick:A,children:"Cancel"}),n.jsx(c,{onClick:async()=>{await g.favorites.where("id").equals(V.id).delete(),A()},autoFocus:!0,children:"Yes"})]})]})]})}export{R as default};
