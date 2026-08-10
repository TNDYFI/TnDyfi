document.addEventListener("DOMContentLoaded",()=>{

const form=document.getElementById("memberForm");
const steps=[...document.querySelectorAll(".step")];
const progress=document.getElementById("progress");
const stepText=document.getElementById("stepText");
const percent=document.getElementById("percent");

let current=1;
const total=4;

function update(){

steps.forEach(s=>{
s.classList.toggle(
"active",
Number(s.dataset.step)===current
);
});

const p=(current/total)*100;

progress.style.width=p+"%";
stepText.textContent=`Step ${current} of ${total}`;
percent.textContent=p+"%";

window.scrollTo({
top:0,
behavior:"smooth"
});

if(current===4)
setTimeout(resizeCanvas,100);
}

function validate(){

const section=document.querySelector(
`.step[data-step="${current}"]`
);

const fields=section.querySelectorAll(
"input[required],select[required],textarea[required]"
);

for(const field of fields){

if(!field.checkValidity()){

field.reportValidity();
field.focus();
return false;

}

}

return true;
}

document.querySelectorAll(".next").forEach(btn=>{
btn.addEventListener("click",()=>{

if(validate() && current<total){
current++;
update();
}

});
});

document.querySelectorAll(".back").forEach(btn=>{
btn.addEventListener("click",()=>{

if(current>1){
current--;
update();
}

});
});

document.querySelectorAll('input[type="tel"]').forEach(input=>{
input.addEventListener("input",()=>{
input.value=input.value
.replace(/\D/g,"")
.slice(0,10);
});
});

/* THEME */

const themeBtn=document.getElementById("themeBtn");

function themeIcon(){

const dark=document.documentElement.classList.contains("dark");

themeBtn.innerHTML=
dark
?'<i class="fa-solid fa-sun"></i>'
:'<i class="fa-solid fa-moon"></i>';

}

themeIcon();

themeBtn.addEventListener("click",()=>{

document.documentElement.classList.toggle("dark");

const dark=document.documentElement.classList.contains("dark");

localStorage.setItem(
"theme",
dark?"dark":"light"
);

themeIcon();

});

/* SIGNATURE */

const canvas=document.getElementById("signatureCanvas");
const wrapper=document.getElementById("signatureWrap");
const clear=document.getElementById("clearSign");

let ctx;
let drawing=false;
let signed=false;

function resizeCanvas(){

const rect=canvas.getBoundingClientRect();

if(!rect.width || !rect.height)return;

const ratio=window.devicePixelRatio||1;

canvas.width=rect.width*ratio;
canvas.height=rect.height*ratio;

ctx=canvas.getContext("2d");

ctx.setTransform(
ratio,0,0,ratio,0,0
);

ctx.lineWidth=2.2;
ctx.lineCap="round";
ctx.lineJoin="round";
ctx.strokeStyle="#111827";

}

function position(e){

const rect=canvas.getBoundingClientRect();

return{
x:e.clientX-rect.left,
y:e.clientY-rect.top
};

}

canvas.addEventListener("pointerdown",e=>{

if(!ctx)resizeCanvas();

e.preventDefault();

drawing=true;
signed=true;

wrapper.classList.add("signed");

canvas.setPointerCapture?.(e.pointerId);

const p=position(e);

ctx.beginPath();
ctx.moveTo(p.x,p.y);

},{passive:false});

canvas.addEventListener("pointermove",e=>{

if(!drawing)return;

e.preventDefault();

const p=position(e);

ctx.lineTo(p.x,p.y);
ctx.stroke();

},{passive:false});

["pointerup","pointercancel","pointerleave"]
.forEach(type=>{

canvas.addEventListener(type,e=>{

drawing=false;
ctx?.closePath();

},{passive:false});

});

clear.addEventListener("click",()=>{

if(!ctx)resizeCanvas();

ctx.clearRect(
0,0,
canvas.width,
canvas.height
);

signed=false;
wrapper.classList.remove("signed");

});

/* SUBMIT */

function registrationId(){

const year=new Date().getFullYear();

const number=Math.floor(
100000+Math.random()*900000
);

return `MEM-${year}-${number}`;

}

function getData(){

const data={};

new FormData(form).forEach((value,key)=>{

if(key!=="agreement")
data[key]=String(value).trim();

});

return data;

}

function toast(message){

const t=document.getElementById("toast");

t.textContent=message;
t.classList.add("show");

setTimeout(()=>{
t.classList.remove("show");
},2500);

}

form.addEventListener("submit",e=>{

e.preventDefault();

if(!validate())return;

if(!signed){

toast("Please add your signature.");
return;

}

const data=getData();

data.registrationType="Member Registration";
data.registrationId=registrationId();
data.signature=canvas.toDataURL("image/png");
data.submittedAt=new Date().toISOString();

let list=[];

try{
list=JSON.parse(
localStorage.getItem("memberRegistrations")||"[]"
);

if(!Array.isArray(list))list=[];

}catch(e){}

list.push(data);

try{

localStorage.setItem(
"memberRegistrations",
JSON.stringify(list)
);

}catch(e){

toast("Storage error");
return;

}

document.getElementById("regId").textContent=
data.registrationId;

document.getElementById("success")
.classList.add("show");

document.body.style.overflow="hidden";

});

document.getElementById("copyId")
.addEventListener("click",async()=>{

const id=document.getElementById("regId").textContent;

try{

await navigator.clipboard.writeText(id);
toast("Registration ID copied");

}catch(e){

toast(id);

}

});

document.getElementById("done")
.addEventListener("click",()=>{

document.getElementById("success")
.classList.remove("show");

document.body.style.overflow="";

form.reset();

signed=false;
wrapper.classList.remove("signed");

current=1;
update();

});

window.addEventListener("resize",()=>{
if(current===4)
setTimeout(resizeCanvas,100);
});

update();

});
