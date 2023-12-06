import{a as v,S as L,i as P}from"./assets/vendor-30bfe4fa.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const q="https://pixabay.com/api/",$="33612698-29a0e4fa17aff9da96c8a261f";async function m(e,o,s){const a=new URLSearchParams({key:$,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:s});return(await v.get(`${q}?${a}`)).data}const x=document.querySelector(".gallery");function g(e){const o=e.map(({webformatURL:s,largeImageURL:a,tags:t,likes:r,views:i,comments:w,downloads:S})=>` <li class="gallery__item">
          <a class="gallery__link" href="${a}">
      <div class="gallery__photo-card">
         <img class="gallery__image"src="${s}" alt="${t}" loading="lazy"/>
      </div>
      <div class="gallery__info">
         <p class="info__item">
             <span class="info__item-name">Likes</span><br>
            <span class="info__item-data">${r}</span>
         </p>
         <p class="info__item">
             <span class="info__item-name">Views</span><br>
             <span class="info__item-data">${i}</span>
         </p>
         <p class="info__item">
             <span class="info__item-name">Comments</span><br>
             <span class="info__item-data">${w}</span>
         </p>
        <p class="info__item">
             <span class="info__item-name">Downloads</span><br>
             <span class="info__item-data">${S}</span>
         </p>
      </div>
         </a>
     </li>`).join("");x.insertAdjacentHTML("beforeend",o)}const O=document.querySelector("#search-form"),M=document.querySelector(".gallery"),d=document.querySelector(".js-guard"),T=document.querySelector(".finish-text"),f=40;let p="",n=1,c=1;const E={captionsData:"alt",captionPosition:"bottom",captionDelay:250},h=new L(".gallery .gallery__link",E),I={root:null,rootMargin:"300px",threshold:1},y=new IntersectionObserver(H,I);O.addEventListener("submit",C);async function C(e){e.preventDefault();const o=e.currentTarget.elements.searchQuery.value.trim();if(!o){R("Please enter a search query!"),u();return}u(),n=1,p=o;try{const{hits:s,totalHits:a}=await m(p,n,f);if(c=Math.ceil(a/f),a===0){z("Sorry, there are no images matching your search query. Please try again."),u();return}else g(s),A(`Hooray! We found ${a} images.`),h.refresh(),n<c&&y.observe(d)}catch(s){_(s)}b()}async function H(e){e.forEach(async o=>{if(o.isIntersecting){n+=1;try{const{hits:s}=await m(p,n,f);g(s),h.refresh(),D(),n>=c&&(y.unobserve(d),b())}catch(s){_(s)}}})}function R(e){l("Caution",e,"yellow")}function z(e){l("Info",e,"yellow")}function A(e){l("Success",e,"green")}function _(e){console.error(e),l("Error","Oops! Something went wrong. Please try again later.","red")}function l(e,o,s){P.show({title:e,message:o,messageColor:"black",messageSize:"18px",backgroundColor:s,position:"topRight",timeout:2500})}function b(){T.classList.toggle("is-hidden",n<c)}function u(){M.innerHTML=""}function D(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
