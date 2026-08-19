(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded',()=>{
    const panel=document.getElementById('notificationPanel');
    const openBtn=document.getElementById('notificationBtn');
    const closeBtn=document.getElementById('closeNotification');
    const badge=document.getElementById('notificationBadge');
    if(!panel||!openBtn)return;
    const open=()=>{panel.classList.add('active');panel.setAttribute('aria-hidden','false');if(badge)badge.textContent='0';};
    const close=()=>{panel.classList.remove('active');panel.setAttribute('aria-hidden','true');};
    openBtn.addEventListener('click',e=>{e.preventDefault();panel.classList.contains('active')?close():open();});
    closeBtn?.addEventListener('click',close);
    document.addEventListener('click',e=>{if(panel.classList.contains('active')&&!panel.contains(e.target)&&!openBtn.contains(e.target))close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  });
})();
