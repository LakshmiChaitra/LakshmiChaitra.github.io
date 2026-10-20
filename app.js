const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const page = document.querySelector('.cc-page');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const projectGrid = document.querySelector('#projectGrid');
const projectFlower = document.querySelector('#projectFlower');
const projectCaption = document.querySelector('.project-caption');
const shortNames = ['HUPP-LID','Quantum Decoder','PersonaLearn','Seamless Minds','DoChat','Academies & clinics'];
const flowerLines = [
 'Finding every language in a mixed-script sentence.',
 'Learning to decode quantum error syndromes.',
 'Learning paths that grow with the learner.',
 'Speech, translated into new possibilities.',
 'Your PDFs, with a little more conversation.',
 'Handmade websites for real-world spaces.'
];
projectGrid.innerHTML = PROJECTS.map((project,index) => `<button type="button" class="cc-project" data-project="${index}" aria-label="Open ${esc(shortNames[index])} project flower"><span class="cc-small">${project.emoji} ${esc(project.label)}</span><h3>${esc(shortNames[index])}</h3><p>${esc(project.kind)}</p></button>`).join('');
let opening = false;
let lastProjectTrigger = null;
let bloomRun = 0;
let settleBloom = null;
const bloomAnimations = new Set();
function cancelBloomAnimations() {
 for (const animation of bloomAnimations) animation.cancel();
 bloomAnimations.clear();
 projectFlower.querySelector('.flower-dust')?.remove();
}
function bloomAnimate(element,keyframes,options) {
 const animation=element.animate(keyframes,options);
 bloomAnimations.add(animation);
 animation.finished.then(()=>bloomAnimations.delete(animation),()=>bloomAnimations.delete(animation));
 return animation;
}
function showProject(index, trigger) {
 if (opening) return;
 opening = true;
 const run=++bloomRun;
 lastProjectTrigger = trigger;
 const project = PROJECTS[index];
 const source=projectGrid.querySelector(`[data-project="${index}"]`);
 const sourceRect=source.getBoundingClientRect();
 const areaRect=document.querySelector('.cc-project-area').getBoundingClientRect();
 const sourceX=sourceRect.left+sourceRect.width/2-areaRect.left;
 const sourceY=sourceRect.top+sourceRect.height/2-areaRect.top;
 const tones=['mint','lilac','pink'];
 projectFlower.dataset.flowerTone=tones[index%3];
 const coordinates=Array.from({length:5},(_,i)=>{const angle=(-90+i*72)*Math.PI/180;return [Math.cos(angle),Math.sin(angle)];});
 projectFlower.innerHTML = `<div class="cc-magic-flower">${coordinates.map(([x,y],i)=>`<span class="cc-petal" aria-hidden="true" style="--px:${x.toFixed(4)};--py:${y.toFixed(4)};--delay:${i*65}ms"></span>`).join('')}<div class="cc-flower-heart"><span class="cc-flower-face" aria-hidden="true">✿</span><span class="cc-flower-category">${esc(project.label)}</span><h3>${esc(shortNames[index])}</h3><p>${esc(flowerLines[index])}</p><div class="cc-flower-tools">${project.tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</div></div></div><div class="flower-controls">${project.live?`<a class="flower-live" href="${esc(project.live)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(shortNames[index])} live project">Open live project ↗</a>`:''}<button type="button" class="flower-notes-toggle" aria-expanded="false" aria-controls="flower-project-notes">Read the project notes ✧</button><button type="button" class="cc-flower-back">Back to the idea pile ↶</button></div><div class="flower-project-notes" id="flower-project-notes" hidden><span class="section-kicker">THE FULL STORY</span><h4>${esc(project.title)}</h4><p>${esc(project.kind)}</p><ul>${project.points.map(point=>`<li>${esc(point)}</li>`).join('')}</ul><div class="cc-flower-tools">${project.tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</div>${project.code?`<a class="flower-code" href="${esc(project.code)}" target="_blank" rel="noopener noreferrer">View source code ↗</a>`:''}</div><div class="flower-dust" aria-hidden="true"></div>`;
 projectFlower.setAttribute('aria-busy','true');
 projectFlower.classList.remove('cc-blooming');
 projectFlower.classList.add('cc-forming');
 const controls=projectFlower.querySelectorAll('button');
 controls.forEach(button=>button.disabled=true);
 let settled=false;
 const finish=()=>{
  if(settled||run!==bloomRun)return;
  settled=true;
  cancelBloomAnimations();
  projectGrid.hidden=true;
  projectCaption.hidden=true;
  projectFlower.hidden=false;
  projectFlower.classList.remove('cc-forming');
  projectFlower.classList.add('cc-blooming');
  projectFlower.setAttribute('aria-busy','false');
  controls.forEach(button=>button.disabled=false);
  opening=false;
  settleBloom=null;
  projectFlower.querySelector('.cc-flower-back').focus({preventScroll:true});
 };
 settleBloom=finish;
 projectFlower.querySelector('.cc-flower-back').addEventListener('click',closeFlower);
 const notesToggle=projectFlower.querySelector('.flower-notes-toggle');
 notesToggle.addEventListener('click',()=>{
  const notes=projectFlower.querySelector('.flower-project-notes');
  notes.hidden=!notes.hidden;
  notesToggle.setAttribute('aria-expanded',String(!notes.hidden));
  notesToggle.textContent=notes.hidden?'Read the project notes ✧':'Fold the notes away ↟';
 });
 const beginGathering=()=>{
  if(settled||run!==bloomRun)return;
  projectGrid.hidden=true;
  projectCaption.hidden=true;
  projectFlower.hidden=false;
  projectFlower.scrollIntoView({block:'start',behavior:'smooth'});
  const layer=projectFlower.querySelector('.flower-dust');
  const stageRect=projectFlower.getBoundingClientRect();
  const width=stageRect.width;
  const height=projectFlower.querySelector('.cc-magic-flower').offsetHeight;
  const sx=Math.max(20,Math.min(width-20,sourceX));
  const sy=Math.max(40,Math.min(height-40,sourceY));
  const petals=[...projectFlower.querySelectorAll('.cc-petal')];
  const animations=[];
  for(let i=0;i<45;i++){
   const petal=petals[i%5].getBoundingClientRect();
   const phase=(i%9)/9*Math.PI*2;
   const tx=petal.left-stageRect.left+petal.width/2+Math.cos(phase)*petal.width*.36;
   const ty=petal.top-stageRect.top+petal.height/2+Math.sin(phase)*petal.height*.36;
   const x=sx+(Math.random()-.5)*Math.min(sourceRect.width,160);
   const y=sy+(Math.random()-.5)*70;
   const angle=Math.random()*Math.PI*2;
   const burstX=x+Math.cos(angle)*(50+Math.random()*80);
   const burstY=y+Math.sin(angle)*(40+Math.random()*70);
   const sparkle=document.createElement('span');
   sparkle.className='flower-dust-star';
   sparkle.textContent=i%3===0?'✳':'✦';
   sparkle.style.fontSize=(10+Math.random()*12)+'px';
   layer.append(sparkle);
   animations.push(bloomAnimate(sparkle,[
    {transform:`translate(${x}px,${y}px) scale(.2) rotate(0deg)`,opacity:0},
    {offset:.2,transform:`translate(${burstX}px,${burstY}px) scale(1.25) rotate(35deg)`,opacity:1},
    {offset:.62,transform:`translate(${tx+Math.cos(phase)*40}px,${ty+Math.sin(phase)*35}px) scale(.85) rotate(100deg)`,opacity:.95},
    {transform:`translate(${tx}px,${ty}px) scale(.12) rotate(170deg)`,opacity:0}
   ],{duration:1050,delay:(i%9)*20,easing:'cubic-bezier(.2,.6,.2,1)',fill:'both'}).finished);
  }
  Promise.allSettled(animations).then(finish);
 };
 if(reduced.matches||!sparkleEnabled){finish();return;}
 bloomAnimate(projectGrid,[{opacity:1,filter:'brightness(1)',transform:'scale(1)'},{opacity:.6,filter:'brightness(1.8)',transform:'scale(1.015)'},{opacity:0,filter:'brightness(2.5)',transform:'scale(.96)'}],{duration:230,easing:'ease-in'}).finished.then(beginGathering,()=>{});
}
function closeFlower() {
 ++bloomRun;
 opening=false;
 settleBloom=null;
 cancelBloomAnimations();
 projectFlower.hidden=true;
 projectFlower.classList.remove('cc-blooming','cc-forming');
 projectGrid.hidden=false;
 projectCaption.hidden=false;
 lastProjectTrigger?.focus({preventScroll:true});
 lastProjectTrigger?.scrollIntoView({block:'center',behavior:reduced.matches?'instant':'smooth'});
}
projectGrid.addEventListener('click',event=>{const button=event.target.closest('[data-project]');if(button)showProject(Number(button.dataset.project),button);});
document.querySelector('.cc-pick').addEventListener('click',event=>showProject(0,event.currentTarget));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&(opening||!projectFlower.hidden))closeFlower();});

document.querySelector('#experienceList').innerHTML=EXPERIENCE.map(e=>`<article class="timeline-item"><div class="time">${esc(e.when)}</div><div><h3>${esc(e.role)}</h3><div class="org">${esc(e.org)}</div><p>${esc(e.text)}</p></div></article>`).join('');
document.querySelector('#skillGrid').innerHTML=SKILLS.map(g=>`<article class="skill-card ${g.wide?'wide':''}"><h3>${esc(g.group)}</h3><div class="skill-chips">${g.items.map((s,i)=>`<span class="skill-chip"><span aria-hidden="true">${['✳','✦','●','◆','⌘'][i%5]}</span>${esc(s)}</span>`).join('')}</div></article>`).join('');
document.querySelector('#trainingGrid').innerHTML=TRAINING.map(c=>`<article class="cert"><b>${esc(c.n)}</b><span class="meta">${esc(c.o)}${c.d?', '+esc(c.d):''}</span>${c.t?`<p>${esc(c.t)}</p>`:''}</article>`).join('');
document.querySelector('#certGrid').innerHTML=CERTS.map(c=>`<article class="cert"><b>${esc(c.n)}</b><span class="meta">${esc(c.o)}, ${esc(c.d)}</span>${c.url?`<a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">Verify credential ↗</a>`:''}</article>`).join('');
document.querySelector('#educationGrid').innerHTML=EDUCATION.map(e=>`<article class="edu-card"><span class="edu-year">${esc(e.d)}</span><h3>${esc(e.t)}</h3><p>${esc(e.s)}</p></article>`).join('');

const themeToggle = document.querySelector('#theme-toggle');
let night = true;
try { night=localStorage.getItem('chaitra-sticker-theme')!=='paper'; } catch {}
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
sparkleToggle.addEventListener('click',()=>{sparkleEnabled=!sparkleEnabled;renderSparks();if(!sparkleEnabled&&opening)settleBloom?.();try{localStorage.setItem('chaitra-sticker-sparkles',sparkleEnabled?'on':'off');}catch{}});
reduced.addEventListener('change',()=>{renderSparks();if(reduced.matches&&opening)settleBloom?.();});
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
