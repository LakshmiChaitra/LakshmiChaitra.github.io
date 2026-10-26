(() => {
 const variants=[['currents','01','Ocean currents'],['caustics','02','Underwater light'],['ribbon','03','Wave ribbon']];
 const params=new URLSearchParams(location.search);
 const requested=params.get('hero');
 const initial=variants.some(([key])=>key===requested)?requested:'ribbon';
 document.documentElement.dataset.hero=initial;
 const hero=document.querySelector('.cc-hero');
 const oceanPage=document.querySelector('.cc-page');
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 document.addEventListener('pointermove',event=>{
  if(document.documentElement.dataset.theme!=='night'||!['caustics','ribbon'].includes(document.documentElement.dataset.hero)||reducedMotion.matches||event.pointerType==='touch')return;
  const bounds={left:0,top:0,width:window.innerWidth,height:window.innerHeight};
  const x=Math.max(-1,Math.min(1,(event.clientX-bounds.left)/bounds.width*2-1));
  const y=Math.max(-1,Math.min(1,(event.clientY-bounds.top)/bounds.height*2-1));
  oceanPage.style.setProperty('--water-x',`${(x*32).toFixed(2)}px`);
  oceanPage.style.setProperty('--water-y',`${(y*24).toFixed(2)}px`);
  oceanPage.style.setProperty('--water-turn',`${(x*1.2).toFixed(3)}deg`);
 },{passive:true});
 reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){oceanPage.style.removeProperty('--water-x');oceanPage.style.removeProperty('--water-y');oceanPage.style.removeProperty('--water-turn');}});
 // One continuous ribbon runs from the hero to the footer.
 const wave=document.createElement('div');wave.className='site-ocean-wave';wave.setAttribute('aria-hidden','true');oceanPage.prepend(wave);
 function drawConnectedWave(){
  const width=oceanPage.clientWidth,height=oceanPage.scrollHeight;
  const pageTop=oceanPage.getBoundingClientRect().top+window.scrollY;
  const sections=[...document.querySelectorAll('main>section')];
  const positions=sections.map(section=>section.getBoundingClientRect().top+window.scrollY-pageTop);
  const heroY=(positions[0]||100)+350;
  let path=`M -150 ${heroY+170} C ${width*.15} ${heroY-230}, ${width*.25} ${heroY+330}, ${width*.54} ${heroY+20} S ${width*.9} ${heroY-340}, ${width+80} ${heroY-190}`;
  let lastY=heroY-190,lastX=width+80;
  positions.slice(1).forEach((y,index)=>{
   const targetX=index%2===0?width-45:45;
   const targetY=Math.max(y+100,lastY+230);
   const bend=index%2===0?width+160:-160;
   path+=` C ${lastX} ${lastY+200}, ${bend} ${targetY-160}, ${targetX} ${targetY}`;
   lastX=targetX;lastY=targetY;
  });
  path+=` C ${lastX} ${lastY+200}, ${width*.7} ${height-60}, ${width+100} ${height+80}`;
  const strokes=Array.from({length:13},(_,i)=>`<path d="${path}" transform="translate(${(i-6)*8},0)" stroke="#a1eced" stroke-width=".65" opacity=".12"/>`).join('');
  wave.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none"><defs><linearGradient id="site-ribbon-gradient"><stop stop-color="#22566d" stop-opacity=".12"/><stop offset=".32" stop-color="#4ca6bc" stop-opacity=".25"/><stop offset=".62" stop-color="#7bc6dd" stop-opacity=".33"/><stop offset="1" stop-color="#2c6a8f" stop-opacity=".16"/></linearGradient></defs><path d="${path}" stroke="url(#site-ribbon-gradient)" stroke-width="135" stroke-linecap="round"/>${strokes}</svg>`;
 }
 drawConnectedWave();
 const waveObserver=new ResizeObserver(drawConnectedWave);
 waveObserver.observe(oceanPage);
 document.fonts.ready.then(drawConnectedWave);
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
