var o=class extends HTMLElement{constructor(){super(),this.rendered=!1,this.intersectionCallback=this.intersectionCallback.bind(this);let e={root:null,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(this.intersectionCallback,e)}getLaserbeakHost(){let{host:e}=window.location;return e.includes("snap0.api.no")?"https://services-snap0.api.no":e.includes("snap1.api.no")?"https://services-snap1.api.no":e.includes("snap2.api.no")?"https://services-snap2.api.no":e.includes("snap3.api.no")?"https://services-snap3.api.no":e.includes("snap4.api.no")?"https://services-snap4.api.no":e.includes("snap5.api.no")?"https://services-snap5.api.no":e.includes("snap6.api.no")?"https://services-snap6.api.no":e.includes("localhost")?"http://localhost:9652":"https://services.api.no"}async getTeaserMarkup(e,t,s,n,r){let a="".concat(this.getLaserbeakHost(),"/api/laserbeak/v1/teaser/").concat(e,"/").concat(t,"/").concat(s,"/").concat(n,"/").concat(r),i=await fetch(a);return i.ok?await i.text():(console.log("Laserbeak returned ".concat(i.status," ").concat(i.statusText,": ").concat(a)),"")}async getSportsTeaserMarkup(e,t,s){let n="".concat(this.getLaserbeakHost(),"/api/laserbeak/v1/sport/").concat(e,"/").concat(s,"/").concat(t),r=await fetch(n);return r.ok?await r.text():(console.log("Laserbeak returned ".concat(r.status," ").concat(r.statusText,": ").concat(n)),"")}async getMarkup(){let e=this.getAttribute("frontpage-id"),t=this.getAttribute("teaser-id"),s=this.getAttribute("checksum"),n=this.getAttribute("purpose"),r=this.getAttribute("theme"),a=this.getAttribute("publication")||window.location.hostname;return this.hasAttribute("sports")&&this.getAttribute("sports")==="true"?this.getSportsTeaserMarkup(t,a,s):this.getTeaserMarkup(e,t,s,n,r)}connectedCallback(){this.connected||(this.connected=!0,this.observer.observe(this))}async intersectionCallback(e){await Promise.all(e.map(async t=>{if(t.isIntersecting&&!this.rendered){this.rendered=!0;let s=await this.getMarkup(),n=document.createRange().createContextualFragment(s);this.appendChild(n)}}))}};customElements.get("amedia-laserbeak")||customElements.define("amedia-laserbeak",o);
//# sourceMappingURL=laserbeak.js.map
