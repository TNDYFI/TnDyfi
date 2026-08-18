const NEWS = [
 {id:1,cat:'youth',badge:'YOUTH',title:'இளைஞர்களின் புதிய முயற்சிகளுக்கு தமிழகம் முழுவதும் புதிய வரவேற்பு',desc:'சமூக மாற்றம், கல்வி, வேலைவாய்ப்பு மற்றும் டிஜிட்டல் திறன்களை மையமாகக் கொண்ட இளைஞர் முயற்சிகள் பல்வேறு பகுதிகளில் வேகமெடுத்து வருகின்றன.',date:'18 ஆகஸ்ட் 2026',time:'10:30 AM',image:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',source:'இளைஞர் முழக்கம்',tags:['#Youth','#TamilNadu','#Community']},
 {id:2,cat:'education',badge:'EDUCATION',title:'மாணவர்களுக்கான டிஜிட்டல் கற்றல் முயற்சிகள் விரிவாக்கம்',desc:'கல்வி வளங்களை எளிதாக அணுகும் வகையில் டிஜிட்டல் learning மற்றும் திறன் மேம்பாட்டு திட்டங்கள் குறித்து புதிய முயற்சிகள் கவனம் பெற்றுள்ளன.',date:'18 ஆகஸ்ட் 2026',time:'09:45 AM',image:'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',source:'இளைஞர் முழக்கம்',tags:['#Education','#Students','#Skills']},
 {id:3,cat:'sports',badge:'SPORTS',title:'இளம் விளையாட்டு வீரர்களுக்கு புதிய வாய்ப்புகள் உருவாகும் சூழல்',desc:'உள்ளூர் அளவில் திறமைகளை கண்டறிந்து உயர்நிலை போட்டிகளுக்கு கொண்டு செல்லும் முயற்சிகள் மீண்டும் கவனம் பெற்றுள்ளன.',date:'17 ஆகஸ்ட் 2026',time:'08:20 PM',image:'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=85',source:'இளைஞர் முழக்கம்',tags:['#Sports','#Youth','#TamilNadu']},
 {id:4,cat:'society',badge:'SOCIETY',title:'சமூக சேவை நடவடிக்கைகளில் இளைஞர் பங்கேற்பு அதிகரிப்பு',desc:'பொது இடங்கள், கல்வி விழிப்புணர்வு மற்றும் சமூக நல நடவடிக்கைகளில் இளைஞர் குழுக்கள் தொடர்ந்து பங்களித்து வருகின்றன.',date:'17 ஆகஸ்ட் 2026',time:'06:10 PM',image:'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85',source:'இளைஞர் முழக்கம்',tags:['#Society','#Service','#Youth']},
 {id:5,cat:'politics',badge:'POLITICS',title:'மக்கள் பிரச்சினைகள் குறித்த விவாதங்கள் சமூக ஊடகங்களில் தீவிரம்',desc:'பொதுமக்களின் அன்றாட பிரச்சினைகள் தொடர்பான விவாதங்கள் சமூக ஊடக தளங்களில் அதிகரித்துள்ளன. பல்வேறு தரப்பினர் தங்கள் கருத்துகளை முன்வைத்து வருகின்றனர்.',date:'17 ஆகஸ்ட் 2026',time:'04:50 PM',image:'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=85',source:'இளைஞர் முழக்கம்',tags:['#Politics','#PublicIssues','#Tamil']},
 {id:6,cat:'india',badge:'INDIA',title:'இந்தியாவின் இளம் தலைமுறையை மையமாகக் கொண்ட புதிய திட்டங்கள்',desc:'திறன், தொழில்நுட்பம், entrepreneurship மற்றும் வேலைவாய்ப்பு தொடர்பான வாய்ப்புகள் குறித்து நாடு முழுவதும் கவனம் செலுத்தப்படுகிறது.',date:'16 ஆகஸ்ட் 2026',time:'03:15 PM',image:'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=85',source:'இளைஞர் முழக்கம்',tags:['#India','#Youth','#Future']},
 {id:7,cat:'world',badge:'WORLD',title:'உலக இளைஞர்களை இணைக்கும் டிஜிட்டல் சமூக முயற்சிகள் வளர்ச்சி',desc:'பல்வேறு நாடுகளைச் சேர்ந்த இளைஞர்கள் அறிவு, கலாச்சாரம் மற்றும் சமூக முயற்சிகளை பகிர்ந்து கொள்ளும் டிஜிட்டல் தளங்கள் அதிகரித்து வருகின்றன.',date:'16 ஆகஸ்ட் 2026',time:'12:40 PM',image:'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85',source:'இளைஞர் முழக்கம்',tags:['#World','#Youth','#Digital']},
 {id:8,cat:'youth',badge:'BREAKING',title:'இளைஞர் சமூக ஊடக திறன் பயிற்சிகளுக்கு அதிக வரவேற்பு',desc:'செய்தி உருவாக்கம், video production, design மற்றும் digital communication போன்ற திறன்களில் இளைஞர்களுக்கான பயிற்சிகள் முக்கியத்துவம் பெற்றுள்ளன.',date:'15 ஆகஸ்ட் 2026',time:'07:30 PM',image:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85',source:'இளைஞர் முழக்கம்',tags:['#SocialMedia','#Training','#Youth']},
 {id:9,cat:'education',badge:'UPDATE',title:'திறன் மேம்பாட்டை நோக்கிய புதிய learning communities உருவாக்கம்',desc:'மாணவர்கள் மற்றும் இளம் தொழில்நுட்ப ஆர்வலர்கள் இணைந்து கற்றுக்கொள்ளும் peer-learning communities குறித்து ஆர்வம் அதிகரித்துள்ளது.',date:'15 ஆகஸ்ட் 2026',time:'05:25 PM',image:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85',source:'இளைஞர் முழக்கம்',tags:['#Learning','#Skills','#Students']},
 {id:10,cat:'sports',badge:'SPORTS',title:'உள்ளூர் விளையாட்டு போட்டிகளுக்கு இளம் அணிகள் தயாராகின்றன',desc:'உள்ளூர் அளவில் நடைபெறும் போட்டிகளுக்காக பல்வேறு இளம் அணிகள் தீவிர பயிற்சியில் ஈடுபட்டு வருகின்றன.',date:'14 ஆகஸ்ட் 2026',time:'08:00 PM',image:'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=85',source:'இளைஞர் முழக்கம்',tags:['#Football','#Sports','#Youth']},
 {id:11,cat:'society',badge:'COMMUNITY',title:'சுற்றுச்சூழல் விழிப்புணர்வை மையமாகக் கொண்ட இளைஞர் இயக்கங்கள்',desc:'மரம் நடுதல், தூய்மை இயக்கம் மற்றும் சுற்றுச்சூழல் விழிப்புணர்வு போன்ற செயல்பாடுகளில் இளைஞர்கள் தொடர்ந்து பங்கேற்று வருகின்றனர்.',date:'14 ஆகஸ்ட் 2026',time:'11:10 AM',image:'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=85',source:'இளைஞர் முழக்கம்',tags:['#Environment','#GreenTamilNadu','#Community']},
 {id:12,cat:'politics',badge:'ANALYSIS',title:'இளைஞர்களின் குரல் மற்றும் பொதுக் கொள்கை விவாதங்கள்',desc:'இளம் தலைமுறையின் எதிர்பார்ப்புகள், வேலைவாய்ப்பு மற்றும் சமூக முன்னேற்றம் குறித்து பொதுவெளியில் தொடர்ந்து விவாதங்கள் நடைபெற்று வருகின்றன.',date:'13 ஆகஸ்ட் 2026',time:'02:30 PM',image:'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=85',source:'இளைஞர் முழக்கம்',tags:['#Policy','#YouthVoice','#TamilNadu']}
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const savedKey = 'ilm_saved_news_v1';
const likedKey = 'ilm_liked_news_v1';
let activeCategory = 'all';
let searchTerm = '';
let currentNews = null;

const saved = new Set(JSON.parse(localStorage.getItem(savedKey) || '[]'));
const liked = new Set(JSON.parse(localStorage.getItem(likedKey) || '[]'));

function persist(){ localStorage.setItem(savedKey, JSON.stringify([...saved])); localStorage.setItem(likedKey, JSON.stringify([...liked])); }
function toast(message){ const el=$('#toast'); if(!el)return; el.textContent=message; el.classList.add('show'); clearTimeout(window.__toast); window.__toast=setTimeout(()=>el.classList.remove('show'),2200); }
function escapeHTML(value){ return String(value ?? '').replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

function filteredNews(){
  return NEWS.filter(n=>{
    const catOk = activeCategory==='all' || n.cat===activeCategory;
    const text = `${n.title} ${n.desc} ${n.tags.join(' ')}`.toLowerCase();
    return catOk && (!searchTerm || text.includes(searchTerm));
  });
}

function cardTemplate(n){
  const isSaved=saved.has(n.id), isLiked=liked.has(n.id);
  return `<article class="news-card" data-id="${n.id}">
    <div class="news-image-wrap"><img class="news-image" src="${n.image}" alt="${escapeHTML(n.title)}" loading="lazy" crossorigin="anonymous"><span class="news-badge">${escapeHTML(n.badge)}</span><button class="floating-save ${isSaved?'active':''}" data-action="save" aria-label="Save"><i class="${isSaved?'fas':'far'} fa-bookmark"></i></button></div>
    <div class="news-card-body">
      <div class="meta-line"><span><i class="far fa-clock"></i> ${n.date} • ${n.time}</span><span><i class="fas fa-circle-check"></i> Official</span></div>
      <h2>${escapeHTML(n.title)}</h2><p>${escapeHTML(n.desc)}</p>
      <div class="tag-line">${n.tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div>
      <div class="card-actions">
        <button class="action ${isLiked?'liked':''}" data-action="like"><i class="${isLiked?'fas':'far'} fa-heart"></i><span>${isLiked?'Liked':'Like'}</span></button>
        <button class="action" data-action="share"><i class="fas fa-share-nodes"></i><span>Share</span></button>
        <button class="action" data-action="pdf"><i class="far fa-file-pdf"></i><span>PDF</span></button>
        <button class="action save-action ${isSaved?'saved':''}" data-action="save"><i class="${isSaved?'fas':'far'} fa-bookmark"></i><span>${isSaved?'Saved':'Save'}</span></button>
      </div>
    </div>
  </article>`;
}

function render(){
  const list=filteredNews();
  $('#newsFeed').innerHTML=list.map(cardTemplate).join('');
  $('#emptyState').hidden=list.length!==0;
  $('#storyCount').textContent=`${list.length || 0}`;
  bindCards();
}

function bindCards(){
  $$('#newsFeed [data-action]').forEach(btn=>btn.addEventListener('click', async e=>{
    e.preventDefault(); e.stopPropagation();
    const card=btn.closest('.news-card'); const news=NEWS.find(n=>n.id===Number(card.dataset.id)); if(!news)return;
    const action=btn.dataset.action;
    if(action==='save'){ saved.has(news.id)?saved.delete(news.id):saved.add(news.id); persist(); render(); toast(saved.has(news.id)?'செய்தி Save செய்யப்பட்டது':'Saved list-ல் இருந்து நீக்கப்பட்டது'); }
    if(action==='like'){ liked.has(news.id)?liked.delete(news.id):liked.add(news.id); persist(); render(); toast(liked.has(news.id)?'Liked ❤️':'Like removed'); }
    if(action==='share'){ openNewsShare(news); }
    if(action==='pdf'){ await generatePDF(news); }
  }));
}

function openNewsShare(news){ currentNews=news; const d=$('#shareDialog'); if(d?.showModal)d.showModal(); else d?.setAttribute('open',''); }
function closeDialog(id){ const d=document.getElementById(id); d?.close?.(); d?.removeAttribute?.('open'); }

async function shareApp(){
  const data={title:'இளைஞர் முழக்கம்',text:'தமிழ் இளைஞர்களுக்கான செய்தி தளத்தை பாருங்கள்.',url:location.href.replace(/\/news\.html.*$/,'/news.html')};
  if(navigator.share){ try{await navigator.share(data);}catch(e){} } else { await navigator.clipboard?.writeText(data.url); toast('App link copied ✓'); }
}

async function handleShare(type){
  const news=currentNews || NEWS[0]; const url=location.href.split('#')[0]+`#news-${news.id}`; const text=`${news.title} — இளைஞர் முழக்கம்`;
  if(type==='copy'){ await navigator.clipboard?.writeText(url); toast('News link copied ✓'); return; }
  if(type==='native'){ if(navigator.share){try{await navigator.share({title:news.title,text,url});}catch(e){}} else {await navigator.clipboard?.writeText(url);toast('Link copied ✓');} return; }
  const target=type==='whatsapp'?`https://wa.me/?text=${encodeURIComponent(text+' '+url)}`:type==='facebook'?`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`:`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(target,'_blank','noopener,noreferrer');
}

async function generatePDF(news){
  if(!window.html2canvas || !window.jspdf){toast('PDF engine loading...'); return;}
  const wrap=document.createElement('div'); wrap.className='pdf-render';
  wrap.innerHTML=`<div class="pdf-brand">இளைஞர் முழக்கம் <span>OFFICIAL NEWS NETWORK</span></div><h1>${escapeHTML(news.title)}</h1><div class="pdf-meta">${escapeHTML(news.badge)} • ${escapeHTML(news.date)} • ${escapeHTML(news.time)}</div><img src="${news.image}" crossorigin="anonymous" onerror="this.style.display='none'"><p>${escapeHTML(news.desc)}</p><div class="pdf-tags">${news.tags.map(t=>escapeHTML(t)).join('  ')}</div><div class="pdf-source">மூலம்: ${escapeHTML(news.source)}<br>Generated from Ilangarmuzhakkam News Feed • ${new Date().toLocaleDateString('ta-IN')}</div>`;
  document.body.appendChild(wrap); await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))); await new Promise(r=>setTimeout(r,500));
  const img=wrap.querySelector('img'); if(img&&!img.complete) await new Promise(r=>{img.onload=r;img.onerror=r});
  try{ const canvas=await html2canvas(wrap,{scale:2,useCORS:true,allowTaint:false,backgroundColor:'#fff',logging:false}); const {jsPDF}=window.jspdf; const pdf=new jsPDF({unit:'mm',format:'a4',compress:true}); const margin=10,w=190,h=canvas.height*w/canvas.width; let left=h,pos=margin; const data=canvas.toDataURL('image/jpeg',.96); pdf.addImage(data,'JPEG',margin,pos,w,h,undefined,'FAST'); left-=277; while(left>0){pdf.addPage();pos=margin-(h-left);pdf.addImage(data,'JPEG',margin,pos,w,h,undefined,'FAST');left-=277;} pdf.save(`${news.title.replace(/[<>:"/\\|?*]/g,'').slice(0,60)}.pdf`); toast('PDF Download தொடங்கியது ✓'); }catch(err){console.error(err);toast('PDF உருவாக்க முடியவில்லை');} finally{wrap.remove();}
}

function renderTrending(){ $('#trendingList').innerHTML=NEWS.slice(0,5).map((n,i)=>`<button class="trend-item" data-trend="${n.id}"><span>${String(i+1).padStart(2,'0')}</span><strong>${escapeHTML(n.title)}</strong></button>`).join(''); $$('#trendingList [data-trend]').forEach(b=>b.addEventListener('click',()=>document.querySelector(`[data-id="${b.dataset.trend}"]`)?.scrollIntoView({behavior:'smooth',block:'center'}))); }

function applyTheme(){ const dark=localStorage.getItem('theme')==='dark'; document.documentElement.classList.toggle('dark',dark); const t=$('#themeToggle'); if(t)t.checked=dark; }
function setupSettings(){
  applyTheme();
  $('#themeToggle')?.addEventListener('change',e=>{localStorage.setItem('theme',e.target.checked?'dark':'light');applyTheme();});
  const n=$('#notificationToggle'); if(n)n.checked=localStorage.getItem('ilm_notifications')==='on';
  n?.addEventListener('change',e=>{localStorage.setItem('ilm_notifications',e.target.checked?'on':'off');toast(e.target.checked?'Notifications enabled ✓':'Notifications disabled'); if(e.target.checked&&'Notification' in window&&Notification.permission==='default')Notification.requestPermission().catch(()=>{});});
  ['settingsBtn','sideSettings','footerSettings'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>{$('#settingsDialog')?.showModal?.();closeSidebar();}));
  ['dialogShare','sideShare','footerShare'].forEach(id=>document.getElementById(id)?.addEventListener('click',shareApp));
}
function openSidebar(){ $('#sidebar').classList.add('open');$('#overlay').classList.add('show');$('#sidebar').setAttribute('aria-hidden','false');$('#menuBtn').setAttribute('aria-expanded','true');document.body.classList.add('drawer-open'); }
function closeSidebar(){ $('#sidebar').classList.remove('open');$('#overlay').classList.remove('show');$('#sidebar').setAttribute('aria-hidden','true');$('#menuBtn').setAttribute('aria-expanded','false');document.body.classList.remove('drawer-open'); }

function init(){
  render(); renderTrending(); setupSettings();
  $('#menuBtn')?.addEventListener('click',()=>$('#sidebar').classList.contains('open')?closeSidebar():openSidebar()); $('#sidebarClose')?.addEventListener('click',closeSidebar); $('#overlay')?.addEventListener('click',closeSidebar);
  $('#searchBtn')?.addEventListener('click',()=>{const p=$('#searchPanel');p.hidden=!p.hidden;if(!p.hidden){p.scrollIntoView({behavior:'smooth',block:'nearest'});$('#searchInput').focus();}});
  $('#clearSearch')?.addEventListener('click',()=>{$('#searchInput').value='';searchTerm='';render();});
  $('#searchInput')?.addEventListener('input',e=>{searchTerm=e.target.value.toLowerCase().trim();render();});
  $$('#categoryBar .category-chip').forEach(chip=>chip.addEventListener('click',()=>{$$('#categoryBar .category-chip').forEach(c=>c.classList.remove('active'));chip.classList.add('active');activeCategory=chip.dataset.category;render();window.scrollTo({top:0,behavior:'smooth'});}));
  $('#refreshFeed')?.addEventListener('click',()=>{const b=$('#refreshFeed');b.classList.add('spin');setTimeout(()=>b.classList.remove('spin'),700);render();toast('Feed refreshed ✓');});
  $('#magazinePdf')?.addEventListener('click',async()=>{const magazine={title:'இளைஞர் முழக்கம் — மாத இதழ்',badge:'MONTHLY EDITION',date:new Date().toLocaleDateString('ta-IN'),time:'Editorial Desk',image:NEWS[0].image,desc:NEWS.map((n,i)=>`${i+1}. ${n.title}\n${n.desc}`).join('\n\n'),tags:['#Monthly','#IlangarMuzhakkam'],source:'Editorial Desk'};await generatePDF(magazine);});
  $$('.dialog-close,[data-close]').forEach(b=>b.addEventListener('click',()=>closeDialog(b.dataset.close || b.closest('dialog')?.id)));
  $$('#shareDialog [data-share-type]').forEach(b=>b.addEventListener('click',()=>handleShare(b.dataset.shareType)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSidebar();});
  let sx=0; document.addEventListener('touchstart',e=>sx=e.changedTouches[0].screenX,{passive:true}); document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-sx;if(dx>70&&sx<35)openSidebar();if(dx<-70&&$('#sidebar').classList.contains('open'))closeSidebar();},{passive:true});
  $('#breakingText').textContent=NEWS[0].title;
}
document.addEventListener('DOMContentLoaded',init);
