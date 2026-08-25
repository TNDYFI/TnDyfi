document.addEventListener("DOMContentLoaded",()=>{
  const videos=[
    {id:"campaign-launch",title:"Campaign Launch",desc:"Opening event video with highlights and public address.",type:"Campaign",src:"https://www.w3schools.com/html/mov_bbb.mp4",thumb:"https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"},
    {id:"district-meeting",title:"District Meeting",desc:"District level meeting coverage and coordination scenes.",type:"Meeting",src:"https://www.w3schools.com/html/movie.mp4",thumb:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"},
    {id:"youth-rally",title:"Youth Rally",desc:"Public rally, speech moments, and crowd visuals.",type:"Rally",src:"https://www.w3schools.com/html/mov_bbb.mp4",thumb:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"},
    {id:"service-activity",title:"Service Activity",desc:"Social service and community support coverage.",type:"Service",src:"https://www.w3schools.com/html/movie.mp4",thumb:"https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"},
    {id:"student-meet",title:"Student Meet",desc:"Campus interaction and student awareness session.",type:"Campus",src:"https://www.w3schools.com/html/mov_bbb.mp4",thumb:"https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80"},
    {id:"digital-campaign",title:"Digital Campaign",desc:"Online content and social media campaign launch.",type:"Digital",src:"https://www.w3schools.com/html/movie.mp4",thumb:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"}
  ];
  const $=id=>document.getElementById(id);
  const grid=$("videoGrid"),search=$("searchInput"),clear=$("clearSearch"),filters=$("categoryFilters"),empty=$("emptyState"),reset=$("resetFilters");
  const dialog=$("videoDialog"),video=$("dialogVideo"),close=$("closeDialog"),fullscreen=$("dialogFullscreen"),landscape=$("dialogLandscape"),closeFull=$("dialogCloseFull"),share=$("dialogShare");
  const title=$("dlgTitle"),desc=$("dlgDescription"),type=$("dlgType"),meta=$("dlgMeta");
  const total=$("totalVideos"),cats=$("totalCategories"),count=$("playlistCount"),info=$("resultInfo");
  const toast=$("toast"),toastText=$("toastText"),toastIcon=$("toastIcon");
  if(!grid||!dialog||!video)return;
  let selected="All",filtered=[...videos],current=null,historyOpen=false,timer;
  total.textContent=videos.length; cats.textContent=new Set(videos.map(v=>v.type)).size;
  const esc=v=>String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;");
  function showToast(text,ok=true){toastText.textContent=text;toastIcon.className=ok?"fas fa-check-circle":"fas fa-circle-exclamation";toast.classList.add("show");clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove("show"),2200);}
  function renderFilters(){filters.innerHTML="";["All",...new Set(videos.map(v=>v.type))].forEach(c=>{const b=document.createElement("button");b.type="button";b.className="category-btn"+(c===selected?" active":"");b.textContent=c;b.onclick=()=>{selected=c;apply();};filters.appendChild(b);});}
  function render(){
    grid.innerHTML="";count.textContent=filtered.length;info.textContent=selected==="All"?`Showing ${filtered.length} videos`:`${selected} • ${filtered.length} videos`;
    empty.classList.toggle("show",!filtered.length);
    filtered.forEach(item=>{
      const card=document.createElement("article");card.className="video-card";
      card.innerHTML=`<div class="video-thumb-wrap"><img class="video-thumb" src="${item.thumb}" alt="${esc(item.title)}" loading="lazy"><div class="thumb-play"><i class="fas fa-play"></i></div></div><div class="video-body"><span class="video-tag">${esc(item.type)}</span><h4>${esc(item.title)}</h4><p>${esc(item.desc)}</p><button class="playlist-share" type="button"><i class="fas fa-share-nodes"></i> Share</button></div>`;
      card.addEventListener("click",e=>{if(e.target.closest(".playlist-share"))return;openVideo(item,true);});
      card.querySelector(".playlist-share").addEventListener("click",e=>{e.stopPropagation();shareVideo(item);});
      grid.appendChild(card);
    });
  }
  function apply(){const q=search.value.trim().toLowerCase();filtered=videos.filter(v=>(selected==="All"||v.type===selected)&&(!q||`${v.title} ${v.desc} ${v.type}`.toLowerCase().includes(q)));clear.classList.toggle("show",!!q);renderFilters();render();}
  function openVideo(item,autoplay=true){
    current=item;type.textContent=item.type;title.textContent=item.title;meta.textContent=`${item.type} • Full Video`;desc.textContent=item.desc;video.pause();video.src=item.src;video.poster=item.thumb;video.load();
    try{if(!dialog.open)dialog.showModal();}catch{dialog.setAttribute("open","");}
    if(!historyOpen){history.pushState({...history.state,dyfiVideoDialog:true},"",`${location.pathname}${location.search}#video-view`);historyOpen=true;}
    if(autoplay)video.play().catch(()=>{});
  }
  function closeVideo(update=true){
    video.pause();video.removeAttribute("src");video.removeAttribute("poster");video.load();try{dialog.close();}catch{}dialog.removeAttribute("open");
    if(update&&historyOpen){historyOpen=false;if(history.state?.dyfiVideoDialog)history.back();}else historyOpen=false;
  }
  async function shareVideo(item){try{const data={title:item.title,text:item.desc,url:location.href.split("#")[0]};if(navigator.share)await navigator.share(data);else{await navigator.clipboard?.writeText(data.url);showToast("Video link copied ✓");}}catch(e){if(e?.name!=="AbortError")showToast("Unable to share",false);}}
  search.addEventListener("input",apply);
  clear.addEventListener("click",()=>{search.value="";apply();search.focus();});
  reset.addEventListener("click",()=>{search.value="";selected="All";apply();});
  close.addEventListener("click",e=>{e.preventDefault();closeVideo(true);});
  closeFull.addEventListener("click",async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();}catch{}closeVideo(true);});
  dialog.addEventListener("cancel",e=>{e.preventDefault();closeVideo(true);});
  dialog.addEventListener("click",e=>{if(e.target===dialog)closeVideo(true);});
  share.addEventListener("click",()=>{if(current)shareVideo(current);});
  async function enterLandscape(){
    try{
      if(!document.fullscreenElement){
        if(dialog.requestFullscreen) await dialog.requestFullscreen();
        else if(video.requestFullscreen) await video.requestFullscreen();
      }
      try{await screen.orientation?.lock?.("landscape");}catch{}
      dialog.classList.add("landscape-mode");
    }catch{showToast("Landscape unavailable",false);}
  }
  landscape?.addEventListener("click",enterLandscape);
  fullscreen.addEventListener("click",async()=>{try{if(!document.fullscreenElement){await enterLandscape();}else{await document.exitFullscreen();}}catch{showToast("Fullscreen unavailable",false);}});
  document.addEventListener("fullscreenchange",()=>{
    fullscreen.innerHTML=document.fullscreenElement?'<i class="fas fa-compress"></i>':'<i class="fas fa-expand"></i>';
    if(!document.fullscreenElement){try{screen.orientation?.unlock?.();}catch{};dialog.classList.remove("landscape-mode");}
  });
  window.addEventListener("popstate",()=>{if(historyOpen){historyOpen=false;closeVideo(false);}});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!dialog.open&&!video.paused)closeVideo(false);});
  document.addEventListener("visibilitychange",()=>{if(document.hidden)video.pause();});
  renderFilters();apply();
});
