(() => {
 const variants=[['currents','01','Ocean currents'],['caustics','02','Underwater light'],['ribbon','03','Wave ribbon']];
 const params=new URLSearchParams(location.search);
 const requested=params.get('hero');
 const initial=variants.some(([key])=>key===requested)?requested:'ribbon';
 document.documentElement.dataset.hero=initial;
 const hero=document.querySelector('.cc-hero');
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 hero.addEventListener('pointermove',event=>{
  if(document.documentElement.dataset.theme!=='night'||!['caustics','ribbon'].includes(document.documentElement.dataset.hero)||reducedMotion.matches||event.pointerType==='touch')return;
  const bounds=hero.getBoundingClientRect();
  const x=Math.max(-1,Math.min(1,(event.clientX-bounds.left)/bounds.width*2-1));
  const y=Math.max(-1,Math.min(1,(event.clientY-bounds.top)/bounds.height*2-1));
  hero.style.setProperty('--water-x',`${(x*32).toFixed(2)}px`);
  hero.style.setProperty('--water-y',`${(y*24).toFixed(2)}px`);
  hero.style.setProperty('--water-turn',`${(x*1.2).toFixed(3)}deg`);
 },{passive:true});
 reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){hero.style.removeProperty('--water-x');hero.style.removeProperty('--water-y');hero.style.removeProperty('--water-turn');}});
 if(params.get('compare')!=='1')return;
 const chooser=document.createElement('nav');chooser.className='hero-study-picker';chooser.setAttribute('aria-label','Compare homepage backgrounds');
 chooser.innerHTML='<span class="hero-study-label">HOMEPAGE STUDIES</span><div>'+variants.map(([key,no,title])=>`<button type="button" data-hero="${key}" aria-pressed="false"><span>${no}</span>${title}</button>`).join('')+'</div>';
 document.body.append(chooser);
 function choose(key){
  document.documentElement.dataset.hero=key;
  chooser.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.hero===key)));
  const url=new URL(location.href);url.searchParams.set('hero',key);history.replaceState(null,'',url);
 }
 chooser.addEventListener('click',event=>{const button=event.target.closest('[data-hero]');if(button)choose(button.dataset.hero);});
 choose(initial);
})();
