import{s as S,e as _,t as f,b as q,f as d,k as g,m as h,j as u,d as x,i as m,o as v,p as $,n as E,q as j}from"../chunks/scheduler.CZthHrpQ.js";import{S as k,i as y}from"../chunks/index.DliZTgwW.js";import{s as C}from"../chunks/entry.BSuMfSEu.js";const H=()=>{const s=C;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},P={subscribe(s){return H().page.subscribe(s)}};function w(s){var b;let t,r=s[0].status+"",o,n,i,p=((b=s[0].error)==null?void 0:b.message)+"",l;return{c(){t=_("h1"),o=f(r),n=q(),i=_("p"),l=f(p)},l(e){t=d(e,"H1",{});var a=g(t);o=h(a,r),a.forEach(u),n=x(e),i=d(e,"P",{});var c=g(i);l=h(c,p),c.forEach(u)},m(e,a){m(e,t,a),v(t,o),m(e,n,a),m(e,i,a),v(i,l)},p(e,[a]){var c;a&1&&r!==(r=e[0].status+"")&&$(o,r),a&1&&p!==(p=((c=e[0].error)==null?void 0:c.message)+"")&&$(l,p)},i:E,o:E,d(e){e&&(u(t),u(n),u(i))}}}function z(s,t,r){let o;return j(s,P,n=>r(0,o=n)),[o]}let F=class extends k{constructor(t){super(),y(this,t,z,w,S,{})}};export{F as component};
