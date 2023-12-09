var w=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var p=(s,n,e,t)=>{for(var i=t>1?void 0:t?S(n,e):n,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(t?o(n,e,i):o(i))||i);return t&&i&&w(n,e,i),i};import{BrickElement as E,defineCustomElement as $}from"https://assets.acdn.no/pkg/@amedia/brick-template/v1/brick-template.js";import{css as T,sroStyle as a}from"https://assets.acdn.no/pkg/@amedia/brick-tokens/v5/brick-tokens.js";var m=T({$$carouselWidth:"100%",$$contentWidth:"45%",$$contentGap:"12px",$$colorGrey:"hsl(0, 0%, 44%)",$$colorWhite:"hsl(360 100% 100% / 100%)",$$colorWhiteDisabled:"hsl(360 100% 100% / 60%)",$$colorAlphaWhite:"hsl(360 100% 100% / 80%)",$$colorBlack:"hsl(0 0% 0% / 100%)",$$imgBackgrColor:"hsl(0 0% 20% / 100%)",display:"block",position:"relative",maxWidth:"$$carouselWidth",overflow:"hidden",'a[href="#carousel-skip-target"]':{fontSize:"1.2rem",color:"$$colorBlack",display:"inline-block",outline:"2px solid $$colorBlack",outlineOffset:"-2px",padding:"0.2rem"},'a[href="#carousel-skip-target"]:focus-visible':{textDecoration:"none"},"& .contents-wrapper":{display:"grid",gridTemplateColumns:"repeat(20, $$contentWidth)",columnGap:"$$contentGap",margin:"0",padding:"0",overflowY:"hidden",overflowX:"auto",overscrollBehaviorInline:"contain","-ms-overflow-style":"none",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},"& .contents-wrapper:not(.grabbing)":{scrollBehavior:"smooth","@media (prefers-reduced-motion)":{scrollBehavior:"auto"}},"&.navigation .carousel:hover, &.navigation .content-wrapper:hover, &.navigation .content-wrapper a:hover":{cursor:"grab"},"&.navigation .grabbing:active":{cursor:"grabbing"},"&.navigation .carousel:hover, &.navigation .content-wrapper:hover":{cursor:"default"},"& .content-wrapper":{maxWidth:"100%",overflow:"hidden",listStyle:"none",scrollSnapAlign:"start"},"& .grabbing .content-wrapper":{userSelect:"none",scrollSnapAlign:"none",pointerEvents:"none"},"& .content-wrapper > p + *":{height:"100%"},"& .carousel-nav":{position:"absolute",top:"0",zIndex:"1",minWidth:"100%",height:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",listStyle:"none",padding:"0",margin:"0",pointerEvents:"none","& button":{all:"unset",appearance:"none",background:"transparent",width:"3.125rem",height:"3.125rem",zIndex:"1",cursor:"pointer",pointerEvents:"auto",color:"#000",display:"none","& > div":{position:"relative",borderRadius:"50%",width:"clamp(2rem, 6vw, 3.125rem)",height:"clamp(2rem, 6vw, 3.125rem)",display:"flex",justifyContent:"center",alignItems:"center",background:"$$colorAlphaWhite",boxShadow:"0 3px 8px hsl(0 0% 0% / 20%)",transition:"background .1s ease"},"& svg":{width:"clamp(1.125rem, 3vw, 2.125rem)",height:"clamp(1.125rem, 3vw, 2.125rem)"}},".prev-btn div":{left:"0.938rem"},".next-btn div":{right:"0.938rem"},"@media only screen and (min-width: 37.5em)":{"& .prev-btn div":{left:"1.5rem"},"& .next-btn div":{right:"1.5rem"}},"& button:hover > div, & button:focus-visible > div":{background:"hsl(243 0% 20% / 80%)","& > svg":{fill:"$$colorWhite"}},"& button:focus-visible > div":{outline:"2px solid $$colorWhite",outlineOffset:"1px"},"& button:disabled":{cursor:"default"},"& button:disabled > div, & button:hover:disabled > div":{background:"hsl(243 0% 20% / 60%)","& > svg":{fill:"$$colorWhiteDisabled"}}}});var k=()=>{if(typeof crypto=="object"){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();if(typeof crypto.getRandomValues=="function"&&typeof Uint8Array=="function"){let e=t=>{let i=Number(t);return(i^crypto.getRandomValues(new Uint8Array(1))[0]&15>>i/4).toString(16)};return"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e)}}let s=new Date().getTime(),n=typeof performance<"u"&&performance.now&&performance.now()*1e3||0;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{let t=Math.random()*16;return s>0?(t=(s+t)%16|0,s=Math.floor(s/16)):(t=(n+t)%16|0,n=Math.floor(n/16)),(e==="x"?t:t&3|8).toString(16)})},D=k();function c(s){return s.length}function b(s){if(!s)return"";let{children:n,titleLevel:e}=s,t=e==null?void 0:e.replace(/(<([^>]+)>)/gi,""),i="";return[...n].forEach((o,x)=>{i+=`
      <li class="content-wrapper" data-content-wrapper>
        <p class="${a} count">
          Artikkel ${x+1} av ${c(n)}.
        </p>
      </li>
    `}),` 
      ${`
  <a href="#skip-" class="${a}">Hopp over karusellen.</a>
  <section 
    role="region" 
    class="carousel" 
    aria-label="Innholdskarusell." 
    aria-describedby="carousel-title-"
    tabindex="0">

    <${t} class="${a}" id="carousel-title-">
      Innholdskarusell med ${c(n)} artikler.
    </${t}>

    <ul aria-label="Navigasjon for innholdskarusell" class="carousel-nav">
      <li>
        <button 
          type="button" 
          class="prev-btn content-slider-btn" 
          data-content-slider-btn 
          aria-label="Forrige artikkel." 
          disabled>
          <div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              aria-hidden="true" 
              focusable="false"  
              width="20" 
              height="20" 
              fill="currentColor" 
              class="arrow-left" 
              viewBox="0 0 16 16"> 
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
            </div>
        </button>
      </li>
      
      <li>
        <button 
          type="button" 
          class="next-btn content-slider-btn" 
          data-content-slider-btn 
          aria-label="Neste artikkel.">
          <div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              aria-hidden="true" 
              focusable="false" 
              width="20" 
              height="20" 
              fill="currentColor" 
              class="arrow-right" 
              viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/> 
              </svg>
            </div>
        </button>
      </li>
    </ul>

    <ul 
      class="contents-wrapper" 
      data-contents-wrapper 
      style="grid-template-columns: repeat(${c(n)}, 45%)">${i}
    </ul>
  </section>
  <div id="skip-" data-target="skip" class="${a}" tabindex="-1"></div>
  `}
    `}var f="ontouchstart"in window||navigator.maxTouchPoints>0,L=["carousel","gallery"],g=s=>L.some(e=>e===s)?s:"carousel",l={isDown:!1,isDragging:!1,startX:0,scrollLeft:0},v=(s,n)=>{l.isDown=!0,l.isDragging=!1,l.startX=n,l.scrollLeft=s.scrollLeft},y=(s,n)=>{if(!!l.isDown&&l.isDown){s.classList.add("grabbing");let t=n-l.startX;s.scrollLeft=l.scrollLeft-t,Math.abs(t)>5&&(l.isDragging=!0)}},d=(s,n)=>{s.classList.remove("grabbing"),s.scrollBy({top:0,left:n})};function u(s,n=100){globalThis.clearTimeout(s.debounceTimer),s.debounceTimer=window.setTimeout(s,n)}var h=class extends E{constructor(e){super();this.calculateSlideCountInVew=()=>{let{numberOfSlides:e,minSlidesToShow:t,sliderWidth:i}=this;return this.data.type==="gallery"?1:e===t||i<460?t:i<=768?2:i>768&&e<=3?e:3};this.calculateSliderGrid=()=>{let{numberOfSlides:e,minSlidesToShow:t,sliderWidth:i}=this;return this.data.type==="gallery"?"100%":e===t?"1fr":i<460?"85%":i<=768&&e===2?"1fr":i<=768?"45%":i>768&&e<=3?"1fr":"30%"};this.setSlides=e=>{e.style.gridTemplateColumns=`repeat(${this.numberOfSlides}, ${this.gridColWidth})`,e.style.scrollSnapType="inline mandatory"};this.handleMouseDown=e=>{v(this.slider,e.clientX)};this.handleMouseMove=e=>{y(this.slider,e.clientX)};this.handleMouseLeave=()=>{l.isDown=!1,this.slider&&(this.slider.classList.remove("grabbing"),this.slider.style.scrollSnapType="none",this.toggleButtons())};this.handleResize=()=>{if(this.sliderWidth=this.clientWidth,!this.slider)return;let e=this.calculateSlideCountInVew(),t=this.calculateSliderGrid();this.data.type!=="gallery"&&this.slidesToShow===e&&this.gridColWidth===t||(this.slidesToShow=e,this.gridColWidth=t,this.setSlides(this.slider))};this.btnClick=e=>{let t=e.target.closest("button");this.slider&&(this.slider.style.scrollSnapType="inline mandatory"),t.classList.contains("prev-btn")?d(this.slider,-this.slideWidth):t.classList.contains("next-btn")&&d(this.slider,this.slideWidth)};this.getSlider=()=>this.querySelector("[data-contents-wrapper]");this.getSection=()=>this.querySelector(".carousel");this.getSlideContents=()=>this.querySelectorAll("[data-content-wrapper]");this.initializeSlider=()=>{if(this.slider=this.getSlider(),!this.slider)return;let e=this.getSlideContents();!e||(this.numberOfSlides=e.length,this.section=this.getSection(),this.btns=this.querySelectorAll("[data-content-slider-btn]"),this.data.children.forEach((t,i)=>{e[i].appendChild(t)}),this.slidesToShow=this.calculateSlideCountInVew(),this.gridColWidth=this.calculateSliderGrid(),this.setSlides(this.slider),this.slideWidth=this.getSlideContents()[0].clientWidth,this.handleEvents(),!f&&this.numberOfSlides>this.slidesToShow&&(this.btns.forEach(t=>t.style.display="block"),this.classList.add("navigation")))};this.data=e,this.slider=null,this.section=null,this.slideContentsArray=null,this.sliderWidth=768,this.slidesToShow=3,this.minSlidesToShow=1,this.gridColWidth="30%",this.numberOfSlides=0,this.isScrolling=!1,this.uniqueId=this.generateUUID(),this.btnClick=this.btnClick.bind(this),this.reEnableButton=this.reEnableButton.bind(this),this.handleResize=this.handleResize.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.updateButtonsAfterScroll=this.updateButtonsAfterScroll.bind(this),this._btns=null,this._minSlidesToShow=1}async connectedCallback(){this.classList.add(m()),this.setData(),super.connectedCallback(),this.slideContentsArray=Array.from(this.getSlideContents()),this.sliderWidth=this.clientWidth||768,this.minSlidesToShow=parseInt(this.getAttribute("min-slides-to-show")||"1"),this.initializeSlider();let e=this.querySelector('a[href^="#skip-"]');e&&e.setAttribute("href",`#skip-${this.uniqueId}`);let t=this.querySelector("section");t&&t.setAttribute("aria-describedby",`carousel-title-${this.uniqueId}`);let i=this.querySelector('[id^="carousel-title-"]');i&&i.setAttribute("id",`carousel-title-${this.uniqueId}`);let r=this.querySelector('div[id^="skip-"]');r&&r.setAttribute("id",`skip-${this.uniqueId}`)}setData(){this.data={children:this.querySelectorAll("brick-carousel > *"),titleLevel:this.getAttribute("titlelevel")||"h3",type:g(this.getAttribute("type")||"carousel")}}toggleButtons(){if(this.btns&&this.slider){let e=Math.ceil(this.slider.scrollLeft);this.btns[0].disabled=e<=this.slideWidth,e>=this.slider.scrollWidth-this.slider.clientWidth?(this.btns[1].disabled=!0,this.btns[0].disabled=!1):this.btns[1].disabled=!1}}get minSlidesToShow(){return this._minSlidesToShow||1}set minSlidesToShow(e){let t=this.getSlideContents().length;e&&t===e?this._minSlidesToShow=e:this._minSlidesToShow=1}get sliderWidth(){return this._sliderWidth}set sliderWidth(e){this._sliderWidth=e}get btns(){return this._btns}set btns(e){this._btns=e}get eventListeners(){return[{selector:"section",action:"keydown",listener:this.handleKeydown.bind(this)},{selector:"window",action:"resize",listener:u(this.handleResize.bind(this))},{selector:"window",action:"orientationchange",listener:u(this.handleResize.bind(this))}]}removeNavigationEvents(){let{slider:e}=this;!e||(e.removeEventListener("mousedown",this.handleMouseDown),e.removeEventListener("mouseleave",this.handleMouseLeave),e.removeEventListener("mouseup",this.handleMouseLeave),e.removeEventListener("mousemove",this.handleMouseMove))}addNavigationEvents(){var e;!this.slider||(this.slider.addEventListener("mousedown",this.handleMouseDown),this.slider.addEventListener("mouseleave",this.handleMouseLeave),this.slider.addEventListener("mouseup",this.handleMouseLeave),this.slider.addEventListener("mousemove",this.handleMouseMove),this.btns&&this.btns.forEach(t=>t.addEventListener("click",this.btnClick)),(e=this.slider)==null||e.addEventListener("scroll",this.updateButtonsAfterScroll))}handleEvents(){this.addNavigationEvents()}updateButtonsAfterScroll(){this.isScrolling||(this.isScrolling=!0,requestAnimationFrame(()=>{this.toggleButtons(),this.isScrolling=!1}))}skipTarget(){return this.querySelector('div[data-target="skip"')}generateUUID(){if(typeof crypto=="object"){if(typeof crypto.randomUUID=="function")return crypto.randomUUID();if(typeof crypto.getRandomValues=="function"&&typeof Uint8Array=="function"){let i=r=>{let o=Number(r);return(o^crypto.getRandomValues(new Uint8Array(1))[0]&15>>o/4).toString(16)};return"10000000-1000-4000-8000-100000000000".replace(/[018]/g,i)}}let e=new Date().getTime(),t=typeof performance<"u"&&performance.now&&performance.now()*1e3||0;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,i=>{let r=Math.random()*16;return e>0?(r=(e+r)%16|0,e=Math.floor(e/16)):(r=(t+r)%16|0,t=Math.floor(t/16)),(i==="x"?r:r&3|8).toString(16)})}reEnableButton(){!this.btns||Array.from(this.btns).find(i=>i.disabled)==null}async disconnectedCallback(){super.disconnectedCallback(),this.removeNavigationEvents()}get HTML(){return b(this.data)}handleKeydown(e){var i;let t=this.querySelectorAll('[data-content-wrapper]:nth-last-of-type(2) button, [data-content-wrapper]:nth-last-of-type(2) [href], [data-content-wrapper]:nth-last-of-type(2) input, [data-content-wrapper]:nth-last-of-type(2) [tabindex="0"]')[0];switch(e.key){case"ArrowLeft":d(this.slider,-this.slideWidth);break;case"ArrowRight":d(this.slider,this.slideWidth);break;case"Tab":if(!this.btns)return;(i=this.btns[1])==null||i.classList.add("hidden"),t===document.activeElement&&(this.btns[1].disabled=!0);break;case"Escape":this.skipTarget().focus();break;default:return}}};h=p([$({selector:"brick-carousel"})],h);export{h as BrickCarousel};
//# sourceMappingURL=brick-carousel.js.map
