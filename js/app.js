(function(){
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  let booted=false;

  function hideLoader(){
    const loader=$('#loader');
    if(!loader)return;
    loader.classList.add('loader-done');
    setTimeout(()=>{loader.style.display='none';},350);
    try{window.dispatchEvent(new Event('dyfi:boot-ready'));}catch{}
  }

  function applyTheme(){
    try{
      const dark=localStorage.getItem('theme')==='dark';
      document.documentElement.classList.toggle('dark',dark);
      document.dispatchEvent(new CustomEvent('dyfi:theme',{detail:{dark}}));
    }catch{}
  }

  function setupHomeSidebar(){
    if(page!=='index.html')return;
    const sidebar=$('#sidebar'),overlay=$('#overlay'),menu=$('#menuBtn'),close=$('#sidebarCloseBtn');
    if(!sidebar||!overlay||!menu)return;
    const open=()=>{sidebar.classList.add('open');overlay.classList.add('active');menu.classList.add('active');document.body.classList.add('sidebar-open');sidebar.setAttribute('aria-hidden','false');};
    const shut=()=>{sidebar.classList.remove('open');overlay.classList.remove('active');menu.classList.remove('active');document.body.classList.remove('sidebar-open');sidebar.setAttribute('aria-hidden','true');};
    menu.addEventListener('click',e=>{e.preventDefault();sidebar.classList.contains('open')?shut():open();});
    close?.addEventListener('click',shut); overlay.addEventListener('click',shut);
    $$('.side-link[href]',sidebar).forEach(a=>a.addEventListener('click',shut));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')shut();});
    let sx=0;
    sidebar.addEventListener('touchstart',e=>{sx=e.changedTouches[0]?.clientX||0;},{passive:true});
    sidebar.addEventListener('touchend',e=>{if(sx-e.changedTouches[0]?.clientX>70)shut();},{passive:true});
  }

  function setupHomeSlider(){
    if(page!=='index.html')return;
    const slides=$$('.slide');if(slides.length<2)return;
    let i=Math.max(0,slides.findIndex(s=>s.classList.contains('active')));
    window.setInterval(()=>{slides[i]?.classList.remove('active');i=(i+1)%slides.length;slides[i]?.classList.add('active');},4200);
  }

  function setupHomeNews(){
    if(page!=='index.html')return;
    const data={
      1:{badge:'BREAKING',title:'State Youth Conference Announced',meta:'Chennai • 15 Aug 2026 • Official Update',image:'assets/banner1.jpg',body:'State-level youth activities and conference preparations are being announced through the official web application. This update brings programme information, participation details and coordination notes together in one readable news story.',extra:'Use the News page for category filters, the complete feed, save, share and full PDF download.'},
      2:{badge:'UPDATE',title:'Volunteer Registration Portal Updated',meta:'Tamil Nadu • 15 Aug 2026 • Official Update',image:'assets/banner2.jpg',body:'The volunteer registration experience has been refreshed with clearer profile fields and a simpler onboarding flow. Users can review information, continue registration and access related services more easily.',extra:'Open the News page to read related updates and the latest official feed.'},
      3:{badge:'CAMPAIGN',title:'Green Tamil Nadu Tree Drive',meta:'Madurai • 14 Aug 2026 • Campaign Update',image:'assets/gallery1.jpg',body:'Volunteer groups are expanding plantation and environmental awareness activities with local participation. The initiative focuses on public spaces, community involvement and continued follow-up work.',extra:'Visit Campaigns for campaign information and News for related updates.'},
      4:{badge:'EVENT',title:'District Committee Meeting Completed',meta:'Coimbatore • 14 Aug 2026 • Event Update',image:'assets/event1.jpg',body:'A district-level meeting has been completed with discussions around upcoming programmes, local coordination and follow-up activities. The update highlights continued planning at district level.',extra:'Visit Events and Districts for related programme and network information.'},
      5:{badge:'NOTICE',title:'New Social Service Activities Started',meta:'Tamil Nadu • 13 Aug 2026 • Community Update',image:'assets/gallery2.jpg',body:'Volunteer teams have started new community-focused activities across local areas. The work includes public participation, awareness and practical social-service initiatives.',extra:'The News section contains the latest updates and the complete news archive.'}
    };
    let current=null;const dialog=$('#homeNewsDialog');if(!dialog)return;
    const openNews=id=>{const n=data[id];if(!n)return;current=n;$('#homeNewsBadge').textContent=n.badge;$('#homeNewsTitle').textContent=n.title;$('#homeNewsMeta').textContent=n.meta;$('#homeNewsImage').src=n.image;$('#homeNewsImage').alt=n.title;$('#homeNewsText').textContent=n.body;$('#homeNewsExtra').textContent=n.extra;try{dialog.showModal();}catch{dialog.setAttribute('open','');}};
    $$('.home-see-more').forEach(b=>b.addEventListener('click',()=>openNews(b.dataset.newsId)));
    $('#closeHomeNews')?.addEventListener('click',()=>dialog.close?.());
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close?.();});
    $('#homeNewsShare')?.addEventListener('click',async()=>{if(!current)return;const url=new URL('news.html',location.href).href;try{if(navigator.share)await navigator.share({title:current.title,text:current.title+' — இளைஞர் முழக்கம்',url});else{await navigator.clipboard?.writeText(url);window.__dyfiToast?.('News link copied ✓');}}catch{}});
    $('#homeNewsSave')?.addEventListener('click',()=>{if(!current)return;try{const k='home_saved_news';const s=new Set(JSON.parse(localStorage.getItem(k)||'[]'));const id=current.title;s.has(id)?s.delete(id):s.add(id);localStorage.setItem(k,JSON.stringify([...s]));window.__dyfiToast?.(s.has(id)?'News saved ✓':'Removed from saved');}catch{}});
    $('#homeNewsPdf')?.addEventListener('click',()=>window.__dyfiPDF?.(current));
    $$('.home-card-actions [data-home-share]').forEach(b=>b.addEventListener('click',async e=>{e.stopPropagation();const n=data[b.dataset.homeShare];if(!n)return;const url=new URL('news.html',location.href).href+'#'+encodeURIComponent(n.title);try{if(navigator.share)await navigator.share({title:n.title,text:n.title+' — இளைஞர் முழக்கம்',url});else{await navigator.clipboard?.writeText(url);window.__dyfiToast?.('News link copied ✓');}}catch{}}));
    $$('.home-card-actions [data-home-pdf]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();const n=data[b.dataset.homePdf];if(n)window.__dyfiPDF?.(n);}));
    $$('.home-card-actions [data-home-save]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();const n=data[b.dataset.homeSave];if(!n)return;try{const k='home_saved_news';const set=new Set(JSON.parse(localStorage.getItem(k)||'[]'));set.has(n.title)?set.delete(n.title):set.add(n.title);localStorage.setItem(k,JSON.stringify([...set]));b.classList.toggle('saved',set.has(n.title));const i=b.querySelector('i');if(i)i.className=set.has(n.title)?'fas fa-bookmark':'far fa-bookmark';window.__dyfiToast?.(set.has(n.title)?'News saved ✓':'Removed from saved');}catch{}}));
  }

  function setupVideoModal(){
    if(page!=='index.html')return;const modal=$('#videoModal'),player=$('#youtubePlayer');
    $$('.video-card[data-video-id]').forEach(card=>card.addEventListener('click',()=>{const id=card.dataset.videoId;if(!id||!modal||!player)return;player.src='https://www.youtube.com/embed/'+encodeURIComponent(id)+'?autoplay=1';modal.classList.add('active');}));
    const close=()=>{modal?.classList.remove('active');if(player)player.src='';};$('#closeVideoBtn')?.addEventListener('click',close);modal?.addEventListener('click',e=>{if(e.target===modal)close();});
  }

  function setupSwipeRefresh(){
    let start=0,armed=false,moved=false;
    const indicator=$('#swipeIndicator');
    const threshold=160;
    document.addEventListener('touchstart',e=>{
      if(location.pathname.endsWith('registration.html')||location.pathname.endsWith('login.html'))return;
      if(window.scrollY<=0 && e.touches[0]){start=e.touches[0].clientY;armed=false;moved=false;}
      else start=0;
    },{passive:true});
    document.addEventListener('touchmove',e=>{
      if(!start || window.scrollY>0 || !e.touches[0])return;
      const d=e.touches[0].clientY-start;
      moved=Math.abs(d)>12;
      if(d>=threshold){armed=true;indicator?.classList.add('active');}
      else if(d<threshold){armed=false;indicator?.classList.remove('active');}
    },{passive:true});
    document.addEventListener('touchend',()=>{
      if(armed && moved){indicator?.classList.remove('active');window.location.reload();}
      else indicator?.classList.remove('active');
      start=0;armed=false;moved=false;
    },{passive:true});
    document.addEventListener('touchcancel',()=>{indicator?.classList.remove('active');start=0;armed=false;moved=false;},{passive:true});
  }

  function init(){
    if(booted)return;booted=true;
    try{applyTheme();setupHomeSidebar();setupHomeSlider();setupHomeNews();setupVideoModal();setupSwipeRefresh();}catch(err){console.error('[DYFI boot]',err);}
    hideLoader();window.addEventListener('load',hideLoader,{once:true});window.setTimeout(hideLoader,2800);
    if(window.AndroidHandler){let t;window.addEventListener('scroll',()=>{try{window.AndroidHandler.onScrollStart?.();clearTimeout(t);t=setTimeout(()=>window.AndroidHandler.onScrollEnd?.(),200);}catch{}});}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
