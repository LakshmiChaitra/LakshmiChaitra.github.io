const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const page = document.querySelector('.cc-page');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const projectGrid = document.querySelector('#projectGrid');
const projectFlower = document.querySelector('#projectFlower');
const projectCaption = document.querySelector('.project-caption');
const shortNames = ['HUPP-LID','Quantum Decoder','PersonaLearn','Seamless Minds','DocChat & rag-api','SmartSpend','Academies & clinics'];
projectGrid.innerHTML = PROJECTS.map((project,index) => `<button type="button" class="cc-project" data-project="${index}" aria-label="Open ${esc(shortNames[index])} project flower"><span class="cc-small">${project.emoji} ${esc(project.label)}</span><h3>${esc(shortNames[index])}</h3><p>${esc(project.kind)}</p></button>`).join('');
let opening = false;
let lastProjectTrigger = null;
let flowerAnimation = null;
function showProject(index, trigger) {
 if (opening) return;
 opening = true;
 lastProjectTrigger = trigger;
 const project = PROJECTS[index];
 const coordinates = [[0,-1],[.707,-.707],[1,0],[.707,.707],[0,1],[-.707,.707],[-1,0],[-.707,-.707]];
 projectFlower.innerHTML = `<div class="cc-magic-flower">${coordinates.map(([x,y],i) => `<span class="cc-petal" aria-hidden="true" style="--px:${x};--py:${y};--delay:${i*45}ms"></span>`).join('')}<div class="cc-flower-heart"><span class="cc-flower-face" aria-hidden="true">✿</span><span class="cc-flower-category">${esc(project.label)}</span><h3>${esc(project.title)}</h3><p>${esc(project.kind)}</p><div class="cc-flower-tools">${project.tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</div><details class="flower-notes"><summary>Read the project notes</summary><ul>${project.points.map(point=>`<li>${esc(point)}</li>`).join('')}</ul></details>${project.code?`<a class="flower-code" href="${esc(project.code)}" target="_blank" rel="noopener noreferrer">View source code ↗</a>`:''}<button type="button" class="cc-flower-back">Back to the idea pile ↶</button></div></div>`;
 const reveal = () => {
  opening = false;
  projectGrid.hidden = true;
  projectCaption.hidden = true;
  projectFlower.hidden = false;
  projectFlower.classList.add('cc-blooming');
  const back = projectFlower.querySelector('.cc-flower-back');
  back.addEventListener('click',closeFlower);
  back.focus({preventScroll:true});
  projectFlower.scrollIntoView({block:'center',behavior:reduced.matches?'instant':'smooth'});
 };
 projectFlower.hidden = true;
 if (reduced.matches || projectGrid.hidden) reveal();
 else {
  flowerAnimation = projectGrid.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.86) rotate(-2deg)'}],{duration:220,easing:'ease-in'});
  flowerAnimation.onfinish = reveal;
 }
}
function closeFlower() {
 projectFlower.hidden = true;
 projectFlower.classList.remove('cc-blooming');
 projectGrid.hidden = false;
 projectCaption.hidden = false;
 lastProjectTrigger?.focus({preventScroll:true});
 lastProjectTrigger?.scrollIntoView({block:'center',behavior:reduced.matches?'instant':'smooth'});
}
projectGrid.addEventListener('click',event => {
 const button=event.target.closest('[data-project]');
 if(button)showProject(Number(button.dataset.project),button);
});
document.querySelector('.cc-pick').addEventListener('click',event=>showProject(0,event.currentTarget));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!projectFlower.hidden)closeFlower();});

document.querySelector('#experienceList').innerHTML=EXPERIENCE.map(e=>`<article class="timeline-item"><div class="time">${esc(e.when)}</div><div><h3>${esc(e.role)}</h3><div class="org">${esc(e.org)}</div><p>${esc(e.text)}</p></div></article>`).join('');
document.querySelector('#skillGrid').innerHTML=SKILLS.map(g=>`<article class="skill-card ${g.wide?'wide':''}"><h3>${esc(g.group)}</h3><div class="skill-chips">${g.items.map((s,i)=>`<span class="skill-chip"><span aria-hidden="true">${['✳','✦','●','◆','⌘'][i%5]}</span>${esc(s)}</span>`).join('')}</div></article>`).join('');
document.querySelector('#trainingGrid').innerHTML=TRAINING.map(c=>`<article class="cert"><b>${esc(c.n)}</b><span class="meta">${esc(c.o)}${c.d?', '+esc(c.d):''}</span>${c.t?`<p>${esc(c.t)}</p>`:''}</article>`).join('');
document.querySelector('#certGrid').innerHTML=CERTS.map(c=>`<article class="cert"><b>${esc(c.n)}</b><span class="meta">${esc(c.o)}, ${esc(c.d)}</span>${c.url?`<a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">Verify credential ↗</a>`:''}</article>`).join('');
document.querySelector('#educationGrid').innerHTML=EDUCATION.map(e=>`<article class="edu-card"><span class="edu-year">${esc(e.d)}</span><h3>${esc(e.t)}</h3><p>${esc(e.s)}</p></article>`).join('');

const themeToggle = document.querySelector('#theme-toggle');
let night = false;
try { night=localStorage.getItem('chaitra-sticker-theme')==='night'; } catch {}
function applyTheme() {
 document.documentElement.dataset.theme=night?'night':'paper';
 document.documentElement.style.colorScheme=night?'dark':'light';
 document.querySelector('meta[name="theme-color"]').content=night?'#2d2330':'#fff3eb';
 themeToggle.textContent=night?'☀':'☾';
 themeToggle.setAttribute('aria-pressed',String(night));
 themeToggle.setAttribute('aria-label',night?'Switch to pastel paper':'Switch to night palette');
}
applyTheme();
themeToggle.addEventListener('click',()=>{night=!night;applyTheme();try{localStorage.setItem('chaitra-sticker-theme',night?'night':'paper');}catch{}});
let surpriseIndex=0;
document.querySelector('.cc-surprise').addEventListener('click',event=>{
 const notes=['certified<br>“what if?” person','brb, making<br>a tiny thing ✿','one more idea.<br>then sleep. ☾','curiosity<br>club ✦'];
 event.currentTarget.innerHTML=notes[surpriseIndex++%notes.length];
});

const sparkleLayer=document.querySelector('#sparkle-layer');
const sparkleToggle=document.querySelector('#sparkle-toggle');
const fine=matchMedia('(hover:hover) and (pointer:fine)');
const sparks=new Set();
let sparkleEnabled=true,lastSpark=0;
try{sparkleEnabled=localStorage.getItem('chaitra-sticker-sparkles')!=='off';}catch{}
function clearSparks(){for(const animation of sparks)animation.cancel();sparks.clear();sparkleLayer.replaceChildren();}
function renderSparks(){const on=sparkleEnabled&&!reduced.matches;sparkleToggle.textContent=`✦ Sparkles ${on?'on':'off'}`;sparkleToggle.setAttribute('aria-pressed',String(on));sparkleToggle.disabled=reduced.matches;if(!on)clearSparks();}
function star(x,y,burst=false){
 if(sparks.size>=90)return;
 const el=document.createElement('span');el.className='cursor-star';el.textContent=Math.random()>.5?'✦':'✳';el.style.left=x+'px';el.style.top=y+'px';el.style.fontSize=(burst?10+Math.random()*12:13+Math.random()*5)+'px';sparkleLayer.append(el);
 const a=Math.random()*Math.PI*2,d=burst?20+Math.random()*58:15+Math.random()*12,dx=burst?Math.cos(a)*d:(Math.random()-.5)*17,dy=burst?Math.sin(a)*d:-d;
 const animation=el.animate([{transform:'translate(-50%,-50%) scale(.3)',opacity:0},{offset:.15,transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.1) rotate(65deg)`,opacity:0}],{duration:700,easing:'ease-out'});
 sparks.add(animation);const cleanup=()=>{el.remove();sparks.delete(animation);};animation.onfinish=cleanup;animation.oncancel=cleanup;
}
document.addEventListener('pointermove',event=>{if(!sparkleEnabled||reduced.matches||!fine.matches||event.pointerType!=='mouse')return;const t=performance.now();if(t-lastSpark<110)return;lastSpark=t;star(event.clientX,event.clientY);},{passive:true});
document.addEventListener('pointerdown',event=>{if(!sparkleEnabled||reduced.matches||event.button!==0||event.target.closest('#sparkle-toggle'))return;for(let i=0;i<14;i++)star(event.clientX,event.clientY,true);},{passive:true});
sparkleToggle.addEventListener('click',()=>{sparkleEnabled=!sparkleEnabled;renderSparks();try{localStorage.setItem('chaitra-sticker-sparkles',sparkleEnabled?'on':'off');}catch{}});
reduced.addEventListener('change',()=>{renderSparks();if(reduced.matches&&opening&&flowerAnimation)flowerAnimation.finish();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)clearSparks();});
renderSparks();
document.querySelector('#year').textContent=new Date().getFullYear();
// Scroll reveals enhance otherwise visible content.
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.06});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
// Script demo: identifies Unicode script only; it does not identify the language.
(()=>{const input=document.querySelector("#scriptIn"),out=document.querySelector("#scriptOut"),btn=document.querySelector("#scriptEx");const scripts=[["Devanagari",/[\u0900-\u097F]/g,"#ffe0e9"],["Gurmukhi",/[\u0A00-\u0A7F]/g,"#d9f6e8"],["Telugu",/[\u0C00-\u0C7F]/g,"#e4dcff"],["Perso-Arabic",/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/g,"#d9efff"],["Latin",/[A-Za-z\u00C0-\u024F]/g,"#fff0bd"]];const examples=["Hello नमस्ते ਸਤ ਸ੍ਰੀ ਅਕਾਲ سلام నమస్తే","kal meeting के बाद call करना","Chai తాగుదామా ਚਲੋ چلو","I love Hyderabad హైదరాబాద్ हैदराबاد"];let n=0;function render(){out.replaceChildren();const words=input.value.trim().split(/\s+/).filter(Boolean).slice(0,30);if(!words.length){out.textContent="Your word tags will show up here.";return}words.forEach(w=>{let match=null,best=0;scripts.forEach(s=>{const count=(w.match(s[1])||[]).length;if(count>best){best=count;match=s}});const card=document.createElement("span");card.style.cssText=`display:inline-flex;flex-direction:column;gap:3px;padding:8px 10px;border:1.5px solid var(--ink);border-radius:11px;background:${match?match[2]:"#fff"}`;const word=document.createElement("b");word.textContent=w;word.dir="auto";const label=document.createElement("small");label.textContent=match?match[0]:"Other";label.style.cssText="font-size:.68rem;font-weight:700;color:#554c65";card.append(word,label);out.append(card)})}input.addEventListener("input",render);btn.addEventListener("click",()=>{n=(n+1)%examples.length;input.value=examples[n];render()});render()})();
// Contact form retains the mailto fallback. Add a Web3Forms key in CONFIG to enable direct delivery.
document.querySelector("#contactForm").addEventListener("submit",async ev=>{ev.preventDefault();const form=ev.currentTarget,status=document.querySelector("#formStatus"),data=Object.fromEntries(new FormData(form).entries());if(!data.name||!data.email||!data.message){status.textContent="Please fill in all three fields.";return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){status.textContent="Please enter a valid email address.";return}if(data.botcheck){status.textContent="";return}if(!CONFIG.web3formsKey||CONFIG.web3formsKey.startsWith("YOUR_")){const subject=encodeURIComponent("Portfolio message from "+data.name);const body=encodeURIComponent(data.message+"\n\nFrom: "+data.name+" ("+data.email+")");status.textContent="Opening your email app…";window.location.href="mailto:"+CONFIG.email+"?subject="+subject+"&body="+body;return}const button=form.querySelector("button");button.disabled=true;status.textContent="Sending…";try{const res=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({access_key:CONFIG.web3formsKey,subject:"New message from your portfolio",from_name:"Portfolio contact form",name:data.name,email:data.email,message:data.message,botcheck:data.botcheck?true:false})});const result=await res.json();if(result.success){form.reset();status.textContent="Message sent — thank you! 💌"}else status.textContent="Could not send. Please email "+CONFIG.email+" instead."}catch(e){status.textContent="Could not send. Please email "+CONFIG.email+" instead."}button.disabled=false});
