(function(){
if(window.__ptr)return;
var SA=navigator.standalone===true||(window.matchMedia&&matchMedia('(display-mode: standalone)').matches);
if(!SA)return;window.__ptr=1;
var T=70,MAX=120,y0=null,x0=0,d=0,busy=false,pulling=false;
var st=document.createElement('style');
st.textContent='#ptr{position:fixed;left:0;right:0;top:env(safe-area-inset-top);z-index:99;display:flex;flex-direction:column;align-items:center;pointer-events:none;transform:translateY(-60px);opacity:0}'+
'#ptr .b{width:38px;height:38px;border-radius:50%;background:#2a2540;box-shadow:0 4px 14px rgba(0,0,0,.45);display:grid;place-items:center}'+
'#ptr svg{width:24px;height:24px}#ptr .t{margin-top:6px;font-size:12px;color:#a1a1aa}'+
'#ptr.go{transition:transform .25s,opacity .25s}#ptr.spin svg{animation:ptrs .8s linear infinite}@keyframes ptrs{to{transform:rotate(360deg)}}';
document.head.appendChild(st);
var el=document.createElement('div');el.id='ptr';
el.innerHTML='<div class="b"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#3d3658" stroke-width="2.5"/><circle id="ptrc" cx="12" cy="12" r="9" fill="none" stroke="#bf9bff" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="56.5" stroke-dashoffset="56.5" transform="rotate(-90 12 12)"/></svg></div><div class="t">下拉刷新</div>';
document.body.appendChild(el);
var c=el.querySelector('#ptrc'),tx=el.querySelector('.t');
function set(p){var k=Math.min(p/T,1);el.style.transform='translateY('+(Math.min(p,MAX)*0.7-60)+'px)';el.style.opacity=Math.min(1,p/30);c.setAttribute('stroke-dashoffset',56.5*(1-k));tx.textContent=k>=1?'松开刷新':'下拉刷新'}
function hide(anim){y0=null;d=0;pulling=false;el.classList.remove('spin');el.classList.toggle('go',!!anim);set(0);el.style.transform='translateY(-60px)';el.style.opacity=0;tx.textContent='下拉刷新'}
addEventListener('touchstart',function(e){if(busy||e.touches.length>1||(scrollY||document.documentElement.scrollTop)>0){y0=null;return}y0=e.touches[0].clientY;x0=e.touches[0].clientX;d=0;pulling=false;el.classList.remove('go')},{passive:true});
addEventListener('touchmove',function(e){if(y0===null||busy)return;var t=e.touches[0];d=t.clientY-y0;
 if(!pulling){if(Math.abs(t.clientX-x0)>Math.abs(d)&&Math.abs(t.clientX-x0)>8){y0=null;return}if(d>8)pulling=true;else return}
 if(d<=0||scrollY>0){set(0);return}set(d*0.6)},{passive:true});
// suppress the click that follows a pull gesture so a card isn't opened
addEventListener('click',function(e){if(busy||window.__ptrJust){e.preventDefault();e.stopPropagation()}},true);
function end(){if(y0===null)return;var wasPull=pulling;y0=null;el.classList.add('go');
 if(wasPull){window.__ptrJust=1;setTimeout(function(){window.__ptrJust=0},350)}
 if(wasPull&&d*0.6>=T){busy=true;el.style.transform='translateY(14px)';el.style.opacity=1;c.setAttribute('stroke-dashoffset',40);el.classList.add('spin');tx.textContent='正在刷新…';if(window.__homeReset)window.__homeReset();setTimeout(function(){location.reload()},250)}
 else hide(true)}
addEventListener('touchend',end,{passive:true});
addEventListener('touchcancel',function(){if(!busy)hide(true)},{passive:true});
addEventListener('pageshow',function(){busy=false;window.__ptrJust=0;hide(false)});
})();
