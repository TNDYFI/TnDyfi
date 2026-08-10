document.addEventListener("DOMContentLoaded",()=>{

const form=document.getElementById("branchForm");
const steps=[...document.querySelectorAll(".step")];

const progress=document.getElementById("progress");
const stepText=document.getElementById("stepText");
const percent=document.getElementById("percent");

let current=1;
const total=2;

function update(){

steps.forEach(step=>{
step.classList.toggle(
"active",
Number(step.dataset.step)===current
);
});

const p=current/total*100;

progress.style.width=p+"%";
stepText.textContent=`Step ${current} of ${total}`;
percent.textContent=p+"%";

window.scrollTo({
top:0,
behavior:"smooth"
});

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

/* MOBILE NUMBER */

document.querySelectorAll('input[type="tel"],input[inputmode="numeric"]')
.forEach(input=>{

input.addEventListener("input",()=>{

input.value=input.value
.replace(/\D/g,"")
.slice(0,10);

});

});

/* THEME */

const themeBtn=document.getElementById("themeBtn");

function themeIcon(){

const dark=document.documentElement
.classList.contains("dark");

themeBtn.innerHTML=
dark
?'<i class="fa-solid fa-sun"></i>'
:'<i class="fa-solid fa-moon"></i>';

}

themeIcon();

themeBtn.addEventListener("click",()=>{

document.documentElement.classList.toggle("dark");

const dark=document.documentElement
.classList.contains("dark");

localStorage.setItem(
"theme",
dark?"dark":"light"
);

themeIcon();

});

/* REGISTRATION ID */

function createId(){

const year=new Date().getFullYear();

const number=Math.floor(
100000+Math.random()*900000
);

return `BR-${year}-${number}`;

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

const element=document.getElementById("toast");

element.textContent=message;
element.classList.add("show");

setTimeout(()=>{
element.classList.remove("show");
},2500);

}

/* SUBMIT */

form.addEventListener("submit",e=>{

e.preventDefault();

if(!validate())return;

const data=getData();

data.registrationType="Branch Registration";
data.registrationId=createId();
data.submittedAt=new Date().toISOString();

let list=[];

try{

list=JSON.parse(
localStorage.getItem("branchRegistrations")||"[]"
);

if(!Array.isArray(list))
list=[];

}catch(e){

list=[];

}

list.push(data);

try{

localStorage.setItem(
"branchRegistrations",
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

/* COPY */

document.getElementById("copyId")
.addEventListener("click",async()=>{

const id=document.getElementById("regId")
.textContent;

try{

await navigator.clipboard.writeText(id);

toast("Registration ID copied");

}catch(e){

toast(id);

}

});

/* DONE */

document.getElementById("done")
.addEventListener("click",()=>{

document.getElementById("success")
.classList.remove("show");

document.body.style.overflow="";

form.reset();

current=1;

update();

});

update();

});