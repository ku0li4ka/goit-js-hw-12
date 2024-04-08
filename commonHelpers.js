import{a as y,S as h,i as f}from"./assets/vendor-e7786203.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();async function g(o,r=1){try{const t=await y.get(`https://pixabay.com/api/?key=42977219-0f6c9f9217f976d8651793c3a&q=${o}&image_type=photo&per_page=15&page=${r}&orientation=horizontal&safesearch=true`);if(t.data.hits.length===0)throw new Error("No images found");return t.data.hits}catch(t){throw new Error(t.response.data.message||"Failed to fetch images. Please try again later.")}}function b(o,r,t){const l=o.map(e=>`<div class="blockForAllElements">
        <li>
        <a href="${e.largeImageURL}" download="false">
        <img src="${e.webformatURL}" alt="${e.tags}" class="imgOfUser">
        </a>
        </li>
        <div class="divForDescription"> 
        <ul class="blockOfInfo"> 
          <li class="title">Likes</li>
          <li class="info">${e.likes}</li>
        </ul>
        <ul class="block">
          <li class="title">Views</li>
          <li class="info">${e.views}</li>
        </ul>
        <ul class="block">
          <li class="title">Comments</li>
          <li class="info">${e.comments}</li>
        </ul>
        <ul class="block">
          <li class="title">Downloads</li>
          <li class="info">${e.downloads}</li>
        </ul>
        </div>
      </div>`).join("");r.insertAdjacentHTML("beforeend",l),t.refresh()}function i(o,r){if(r){const t=document.createElement("div");t.classList.add("loader"),o.appendChild(t)}else{const t=o.querySelector(".loader");t&&t.remove()}}function v(){const o=document.querySelector(".loader");o&&o.remove()}const w=document.querySelector(".searchInput");document.querySelector(".searchButton");const L=document.querySelector(".formForInput"),m=document.querySelector(".photoGallery"),c=document.querySelector(".loaderContainer"),u=document.querySelector(".loadMoreButton"),q=new h(".gallery a",{captionDelay:250,captionsData:"alt"});let n=1,d="";L.addEventListener("submit",async o=>{o.preventDefault(),m.innerHTML="",d=w.value.trim(),n=1,await p(d,n)});u.addEventListener("click",async()=>{i(c),n++,await p(d,n)});async function p(o,r){try{i(c,!0);const t=await g(o,r);b(t,m,q),t.length<15?(u.style.display="none",f.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topCenter"})):u.style.display="block",S()}catch(t){console.error(t);let l="Failed to fetch images. Please try again later.";t.response&&t.response.status===404?l="No data found for your query":t.message==="No images found"&&(l="No results found for your query"),f.error({title:"Error",message:l,position:"topCenter"})}finally{i(c,!1),v()}}function S(){document.addEventListener("DOMContentLoaded",function(){const o=document.querySelector(".blockForAllElements").offsetHeight;window.scrollBy({top:o*2,left:0,behavior:"smooth"})})}
//# sourceMappingURL=commonHelpers.js.map
