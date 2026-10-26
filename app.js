const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const page = document.querySelector('.cc-page');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const projectGrid = document.querySelector('#projectGrid');
const projectFlower = document.querySelector('#projectFlower');
const projectCaption = document.querySelector('.project-caption');
const shortNames = ['HUPP-LID','Quantum Decoder','PersonaLearn','Seamless Minds','DoChat','Web Development'];
const flowerLines = [
 'Finding every language in a mixed-script sentence.',
 'Learning to decode quantum error syndromes.',
 'Learning paths that grow with the learner.',
 'Speech, translated into new possibilities.',
 'Your PDFs, with a little more conversation.',
 'Websites for academies & clinics. A game after dark.'
];
const projectPreviews=['hupp.svg','quantum.png','persona.png','speech.png','dochat.png','castle.png'];
projectGrid.innerHTML = PROJECTS.map((project,index) => `<button type="button" class="cc-project" data-project="${index}" aria-label="Open ${esc(shortNames[index])} project flower"><span class="project-visual" aria-hidden="true"><span class="preview-topline"><span>${String(index+1).padStart(2,'0')} / ${index===0?'RESEARCH OVERVIEW':'PROJECT PREVIEW'}</span><span>↗</span></span><img src="assets/project-previews/${projectPreviews[index]}" alt="" loading="lazy" width="1200" height="720"><span class="preview-open">Explore project ↗</span></span><span class="cc-small"><span class="project-emoji" aria-hidden="true">${project.emoji}</span> ${esc(project.label)}</span><h3>${esc(shortNames[index])}</h3><p>${esc(project.kind)}</p></button>`).join('');
let lastProjectTrigger = null;
let activeProjectIndex = null;
function showProject(index, trigger, preservePosition = false) {
 activeProjectIndex = index;
 lastProjectTrigger = trigger;
 if(night) { showProfessionalProject(index, preservePosition); return; }
 const project = PROJECTS[index];
 const tones=['mint','lilac','pink'];
 projectFlower.dataset.flowerTone=tones[index%3];
 const coordinates=Array.from({length:5},(_,i)=>{const angle=(-90+i*72)*Math.PI/180;return [Math.cos(angle),Math.sin(angle)];});
 projectFlower.innerHTML = `<div class="cc-magic-flower">${coordinates.map(([x,y],i)=>`<span class="cc-petal" aria-hidden="true" style="--px:${x.toFixed(4)};--py:${y.toFixed(4)};--delay:${i*65}ms"></span>`).join('')}<div class="cc-flower-heart"><span class="cc-flower-face" aria-hidden="true">✿</span><span class="cc-flower-category">${esc(project.label)}</span><h3>${esc(shortNames[index])}</h3><p>${esc(flowerLines[index])}</p><div class="cc-flower-tools">${project.tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</div></div></div><div class="flower-controls">${project.live?`<a class="flower-live" href="${esc(project.live)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(shortNames[index])} live project">${esc(project.liveLabel||'Open live project')} ↗</a>`:''}<button type="button" class="flower-notes-toggle" aria-expanded="false" aria-controls="flower-project-notes">Read the project notes ✧</button><button type="button" class="cc-flower-back">Back to the idea pile ↶</button></div><div class="flower-project-notes" id="flower-project-notes" hidden><span class="section-kicker">THE FULL STORY</span><h4>${esc(project.title)}</h4><p>${esc(project.kind)}</p><ul>${project.points.map(point=>`<li>${esc(point)}</li>`).join('')}</ul><div class="cc-flower-tools">${project.tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</div>${project.code?`<a class="flower-code" href="${esc(project.code)}" target="_blank" rel="noopener noreferrer">View source code ↗</a>`:''}</div>`;
 projectGrid.hidden=true;
 projectCaption.hidden=true;
 projectFlower.hidden=false;
 projectFlower.setAttribute('aria-busy','false');
 projectFlower.querySelector('.cc-flower-back').addEventListener('click',closeFlower);
 const notesToggle=projectFlower.querySelector('.flower-notes-toggle');
 notesToggle.addEventListener('click',()=>{
  const notes=projectFlower.querySelector('.flower-project-notes');
  notes.hidden=!notes.hidden;
  notesToggle.setAttribute('aria-expanded',String(!notes.hidden));
  notesToggle.textContent=notes.hidden?'Read the project notes ✧':'Fold the notes away ↟';
 });
 if(!preservePosition) { projectFlower.scrollIntoView({block:'start',behavior:'instant'}); projectFlower.querySelector('.cc-flower-back').focus({preventScroll:true}); }
}

function closeFlower() {
 activeProjectIndex = null;
 projectFlower.hidden=true;
 projectGrid.hidden=false;
 projectCaption.hidden=false;
 lastProjectTrigger?.focus({preventScroll:true});
 lastProjectTrigger?.scrollIntoView({block:'center',behavior:reduced.matches?'instant':'smooth'});
}
projectGrid.addEventListener('click',event=>{const button=event.target.closest('[data-project]');if(button)showProject(Number(button.dataset.project),button);});
document.querySelector('.cc-pick').addEventListener('click',event=>showProject(0,event.currentTarget));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!projectFlower.hidden&&!projectsDialog.open)closeFlower();});

document.querySelector('#experienceList').innerHTML=EXPERIENCE.map(e=>`<article class="timeline-item"><div class="time">${esc(e.when)}</div><div><h3>${esc(e.role)}</h3><div class="org">${esc(e.org)}</div><p>${esc(e.text)}</p></div></article>`).join('');
document.querySelector('#skillGrid').innerHTML=SKILLS.map(g=>`<article class="skill-card ${g.wide?'wide':''}"><h3>${esc(g.group)}</h3><div class="skill-chips">${g.items.map((s,i)=>`<span class="skill-chip"><span aria-hidden="true">${['✳','✦','●','◆','⌘'][i%5]}</span>${esc(s)}</span>`).join('')}</div></article>`).join('');
document.querySelector('#trainingGrid').innerHTML=TRAINING.map(c=>`<article class="cert"><b>${esc(c.n)}</b><span class="meta">${esc(c.o)}${c.d?', '+esc(c.d):''}</span>${c.t?`<p>${esc(c.t)}</p>`:''}</article>`).join('');
document.querySelector('#certGrid').innerHTML=CERTS.map(c=>`<article class="cert"><b>${esc(c.n)}</b><span class="meta">${esc(c.o)}, ${esc(c.d)}</span>${c.url?`<a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">Verify credential ↗</a>`:''}</article>`).join('');
document.querySelector('#educationGrid').innerHTML=EDUCATION.map(e=>`<article class="edu-card"><span class="edu-year">${esc(e.d)}</span><h3>${esc(e.t)}</h3><p>${esc(e.s)}</p></article>`).join('');

function showProfessionalProject(index, preservePosition = false) {
 const project=PROJECTS[index];
 projectFlower.innerHTML=`<article class="case-study"><div class="case-study-top"><span>PROJECT ${String(index+1).padStart(2,'0')} / ${esc(project.label)}</span><button class="case-study-back" type="button">← All projects</button></div><h3>${esc(project.title)}</h3><p class="case-study-summary">${esc(project.kind)}</p><div class="case-study-tags">${project.tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</div><h4>Project overview</h4><ul>${project.points.map(point=>`<li>${esc(point)}</li>`).join('')}</ul><div class="case-study-links">${project.live?`<a href="${esc(project.live)}" target="_blank" rel="noopener noreferrer">${esc(project.liveLabel||'View live project')} ↗</a>`:''}${project.code?`<a href="${esc(project.code)}" target="_blank" rel="noopener noreferrer">View source code ↗</a>`:''}</div></article>`;
 projectGrid.hidden=true;projectCaption.hidden=true;projectFlower.hidden=false;projectFlower.setAttribute('aria-busy','false');
 projectFlower.querySelector('.case-study-back').addEventListener('click',closeFlower);
 if(!preservePosition){projectFlower.scrollIntoView({block:'start',behavior:'instant'});projectFlower.querySelector('.case-study-back').focus({preventScroll:true});}
}
const themeToggle = document.querySelector('#theme-toggle');
let night = document.documentElement.dataset.theme === 'night';
let effectsReady = false;
const modeCopy = [
 ['.cc-brand','P. Lakshmi Chaitra'],
 ['.cc-intro-tag','Hey there ✦'],
 ['.cc-club-sticker.left','open to<br>internships'],
 ['.cc-club-sticker.right','thoughtfully<br>built ✦'],
 ['.cc-club-sticker.lower','curiosity → creation'],
 ['#hero-title','Curious about AI.<br><span class="cc-name">Serious about building.</span>'],
 ['.cc-intro','I’m Chaitra, a computer science student working across language technology, machine learning and web development.<br>Exploring ideas through research. Bringing them to life through code.'],
 ['.cc-actions .cc-button','Explore my projects <span>↗</span>'],
 ['.project-window-title','PORTFOLIO / MY PROJECTS'],
 ['#projects-title','My projects.'],
 ['.project-caption','Research and engineering projects across language technology, machine learning and web development.'],
 ['#about .section-kicker','02 / ABOUT'],
 ['#about h2','Research-minded.<br>Engineering-focused.'],
 ['#about .section-head > p','Computer science, applied mathematics and a focus on building practical tools.'],
 ['.about-label h3','AI/ML &amp;<br>software development.'],
 ['.mini-stats','<span class="mini-stat">Language technology</span><span class="mini-stat">Applied research</span><span class="mini-stat">Software engineering</span>'],
 ['#experience .section-kicker','03 / EXPERIENCE'],
 ['#skills .section-kicker','04 / TECHNICAL SKILLS'],
 ['#certifications .section-kicker','05 / TRAINING & CREDENTIALS'],
 ['#education .section-kicker','06 / EDUCATION'],
 ['#contact .section-kicker','07 / CONTACT'],
 ['#contact h2','Let’s build<br>something useful.'],
 ['#contact .contact-panel > div > p','For internship opportunities, project collaborations or conversations about language technology and applied AI, get in touch.'],
 ['#contactForm button','Send message <span>↗</span>'],
 ['.cc-nav nav a[href="#contact"]','Contact ↗'],
 ['.cc-footer > span','© <span id="year">'+new Date().getFullYear()+'</span> P. Lakshmi Chaitra · AI/ML &amp; Software Developer']
].map(([selector,professional])=>{const element=document.querySelector(selector);return {element,paper:element.innerHTML,professional};});
function applyTheme() {
 document.documentElement.dataset.theme=night?'night':'paper';
 document.documentElement.style.colorScheme=night?'dark':'light';
 document.querySelector('meta[name="theme-color"]').content=night?'#102b3a':'#fff3eb';
 themeToggle.textContent=night?'Casual ✿':'Professional ↗';
 themeToggle.setAttribute('aria-pressed',String(night));
 themeToggle.setAttribute('aria-label',night?'Switch to casual pastel mode':'Switch to professional mode');
 themeToggle.title=night?'Switch to casual pastel mode':'Switch to professional mode';
 modeCopy.forEach(copy=>{copy.element.innerHTML=night?copy.professional:copy.paper;});
 projectGrid.querySelectorAll('[data-project]').forEach(button=>{const index=Number(button.dataset.project);button.setAttribute('aria-label',night?`Read ${shortNames[index]} case study`:`Open ${shortNames[index]} project flower`);});
 if(activeProjectIndex!==null&&!projectFlower.hidden)showProject(activeProjectIndex,lastProjectTrigger,true);
 if(effectsReady)renderSparks();
}
applyTheme();
themeToggle.addEventListener('click',()=>{night=!night;applyTheme();try{localStorage.setItem('chaitra-portfolio-mode-v2',night?'professional':'pastel');}catch{}});
let surpriseIndex=0;
document.querySelector('.cc-surprise').addEventListener('click',event=>{
 const notes=night?['research<br>in progress ✦','always<br>learning ↗','ideas into<br>practice ✧','thoughtfully<br>built ✦']:['certified<br>“what if?” person','brb, making<br>a tiny thing ✿','one more idea.<br>then sleep. ☾','curiosity<br>club ✦'];
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
 const el=document.createElement('span');el.className='cursor-star';el.textContent=Math.random()>.5?'✦':'✳';el.style.left=x+'px';el.style.top=y+'px';el.style.fontSize=(burst?10+Math.random()*(night?18:12):13+Math.random()*5)+'px';if(night)el.style.color=['#83e8ef','#b9f4eb','#6dc9f2','#e5faff'][Math.floor(Math.random()*4)];sparkleLayer.append(el);
 const a=Math.random()*Math.PI*2,d=burst?(night?40+Math.random()*105:20+Math.random()*58):15+Math.random()*12,dx=burst?Math.cos(a)*d:(Math.random()-.5)*17,dy=burst?Math.sin(a)*d:-d;
 const animation=el.animate([{transform:'translate(-50%,-50%) scale(.3)',opacity:0},{offset:.15,transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.1) rotate(65deg)`,opacity:0}],{duration:night&&burst?950:700,easing:'cubic-bezier(.12,.65,.25,1)'});
 sparks.add(animation);const cleanup=()=>{el.remove();sparks.delete(animation);};animation.onfinish=cleanup;animation.oncancel=cleanup;
}
document.addEventListener('pointermove',event=>{if(!sparkleEnabled||reduced.matches||!fine.matches||event.pointerType!=='mouse')return;const t=performance.now();if(t-lastSpark<110)return;lastSpark=t;star(event.clientX,event.clientY);},{passive:true});
document.addEventListener('pointerdown',event=>{if(!sparkleEnabled||reduced.matches||event.button!==0||event.target.closest('#sparkle-toggle')||(!night&&event.target.closest('[data-project],.cc-pick,.flower-controls')))return;for(let i=0;i<(night?30:14);i++)star(event.clientX,event.clientY,true);},{passive:true});
sparkleToggle.addEventListener('click',()=>{sparkleEnabled=!sparkleEnabled;renderSparks();try{localStorage.setItem('chaitra-sticker-sparkles',sparkleEnabled?'on':'off');}catch{}});
reduced.addEventListener('change',()=>{renderSparks();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)clearSparks();});
effectsReady=true;
renderSparks();
document.querySelector('#year').textContent=new Date().getFullYear();
// Scroll reveals enhance otherwise visible content.
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.06});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
// Contact form retains the mailto fallback. Add a Web3Forms key in CONFIG to enable direct delivery.
document.querySelector("#contactForm").addEventListener("submit",async ev=>{ev.preventDefault();const form=ev.currentTarget,status=document.querySelector("#formStatus"),data=Object.fromEntries(new FormData(form).entries());if(!data.name||!data.email||!data.message){status.textContent="Please fill in all three fields.";return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){status.textContent="Please enter a valid email address.";return}if(data.botcheck){status.textContent="";return}if(!CONFIG.web3formsKey||CONFIG.web3formsKey.startsWith("YOUR_")){const subject=encodeURIComponent("Portfolio message from "+data.name);const body=encodeURIComponent(data.message+"\n\nFrom: "+data.name+" ("+data.email+")");status.textContent="Opening your email app…";window.location.href="mailto:"+CONFIG.email+"?subject="+subject+"&body="+body;return}const button=form.querySelector("button");button.disabled=true;status.textContent="Sending…";try{const res=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({access_key:CONFIG.web3formsKey,subject:"New message from your portfolio",from_name:"Portfolio contact form",name:data.name,email:data.email,message:data.message,botcheck:data.botcheck?true:false})});const result=await res.json();if(result.success){form.reset();status.textContent="Message sent — thank you! 💌"}else status.textContent="Could not send. Please email "+CONFIG.email+" instead."}catch(e){status.textContent="Could not send. Please email "+CONFIG.email+" instead."}button.disabled=false});

// A native dialog provides keyboard focus trapping and Escape-to-restore.
const projectsDialog=document.querySelector('#projects-dialog');
const projectBrowser=document.querySelector('.cc-browser');
const maximizeProjects=document.querySelector('.window-expand');
const restoreProjects=document.querySelector('.project-restore');
const browserSlot=document.createComment('Projects window position');
projectBrowser.before(browserSlot);
let projectsScroll=0;
let returnToPlayground=false;
maximizeProjects.addEventListener('click',()=>{
 if(projectsDialog.open){projectsDialog.close();return;}
 projectsScroll=window.scrollY;
 clearSparks();
 projectsDialog.append(projectBrowser,sparkleLayer);
 restoreProjects.hidden=false;
 maximizeProjects.setAttribute('aria-label','Restore projects window');maximizeProjects.title='Restore projects window';
 maximizeProjects.setAttribute('aria-expanded','true');
 projectsDialog.showModal();document.body.classList.add('projects-focused');
 projectsDialog.scrollTop=0;restoreProjects.focus({preventScroll:true});
});
restoreProjects.addEventListener('click',()=>projectsDialog.close());
projectsDialog.addEventListener('close',()=>{
 clearSparks();document.body.append(sparkleLayer);
 browserSlot.after(projectBrowser);
 restoreProjects.hidden=true;
 maximizeProjects.setAttribute('aria-label','Expand projects');maximizeProjects.title='Expand projects';
 maximizeProjects.setAttribute('aria-expanded','false');
 document.body.classList.remove('projects-focused');
 window.scrollTo({top:projectsScroll,behavior:'instant'});
 maximizeProjects.focus({preventScroll:true});
 if(returnToPlayground){returnToPlayground=false;document.querySelector('#top').scrollIntoView({behavior:'instant'});document.querySelector('.cc-brand').focus({preventScroll:true});}
});

document.querySelector('.window-pile').addEventListener('click',()=>{
 if(!projectFlower.hidden)closeFlower();
 if(projectsDialog.open)projectsDialog.close();
 else document.querySelector('#projects').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});
});
document.querySelector('.window-close').addEventListener('click',()=>{
 if(!projectFlower.hidden)closeFlower();
 if(projectsDialog.open){returnToPlayground=true;projectsDialog.close();}
 else{document.querySelector('#top').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});document.querySelector('.cc-brand').focus({preventScroll:true});}
});
