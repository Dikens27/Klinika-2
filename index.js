(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();let l=1,o=!1;document.addEventListener("DOMContentLoaded",()=>{u()});document.querySelector(".prev").addEventListener("click",()=>{o||c(-1)});document.querySelector(".next").addEventListener("click",()=>{o||c(1)});function u(){let r=document.querySelectorAll(".slide");r[0].style.display="block"}function c(r){o=!0;let i=document.querySelectorAll(".slide"),n=l-1;l+=r,l>i.length&&(l=1),l<1&&(l=i.length);let s=i[l-1],e=i[n];r>0?(s.style.display="block",e.classList.add("slideOutToLeft"),s.classList.add("slideInFromRight")):(s.style.display="block",e.classList.add("slideOutToRight"),s.classList.add("slideInFromLeft")),e.addEventListener("animationend",function(){e.style.display="none",e.classList.remove("slideOutToLeft","slideOutToRight"),s.classList.remove("slideInFromRight","slideInFromLeft"),o=!1},{once:!0})}
//# sourceMappingURL=index.js.map
