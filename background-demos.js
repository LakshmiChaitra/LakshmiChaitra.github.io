(() => {
 const concepts=[['aurora','01','Aurora glow'],['constellation','02','Constellation'],['glass','03','Glass layers']];
 const query=new URLSearchParams(location.search),requested=query.get('background');
 const initial=concepts.some(([id])=>id===requested)?requested:'glass';
 const page=document.querySelector('.cc-page');
 const stage=document.createElement('div');stage.className='background-stage';stage.setAttribute('aria-hidden','true');
 const stars=[[4,24],[11,37],[18,16],[28,23],[32,8],[46,14],[56,6],[69,17],[82,10],[94,29],[89,47],[98,62],[81,68],[91,89],[72,82],[61,94],[53,76],[40,90],[27,77],[16,88],[6,66],[19,56],[4,91],[74,43]];
 const edges=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[10,12],[12,13],[12,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,1],[21,18],[20,22],[7,23],[23,10],[23,12],[3,21]];
 stage.innerHTML=`<div class="demo-aurora"><i></i><i></i><i></i></div><div class="demo-constellation"><svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">${edges.map(([a,b])=>`<line x1="${stars[a][0]*10}" y1="${stars[a][1]*7}" x2="${stars[b][0]*10}" y2="${stars[b][1]*7}"/>`).join('')}${stars.map(([x,y],i)=>`<circle cx="${x*10}" cy="${y*7}" r="${i%4===0?3.2:1.7}" class="${i%4===0?'bright':''}"/>`).join('')}</svg><div class="constellation-halo"></div></div><div class="demo-glass"><i class="glass-panel panel-one"></i><i class="glass-panel panel-two"></i><i class="glass-panel panel-three"></i></div><div class="background-vignette"></div>`;
 page.prepend(stage);
 const picker=document.createElement('nav');picker.className='hero-study-picker background-picker';picker.setAttribute('aria-label','Compare background concepts');
 picker.innerHTML='<span class="hero-study-label">BACKGROUND CONCEPTS · PREVIEW ONLY</span><div>'+concepts.map(([id,num,label])=>`<button type="button" data-background="${id}" aria-pressed="false"><span>${num}</span>${label}</button>`).join('')+'</div>';
 if(query.get('compare')==='1')document.body.append(picker);
 function choose(id,updateUrl=false){document.documentElement.dataset.background=id;picker.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.background===id)));if(updateUrl){const url=new URL(location.href);url.searchParams.set('background',id);history.replaceState(null,'',url);}}
 picker.addEventListener('click',event=>{const b=event.target.closest('button');if(b)choose(b.dataset.background,true);});
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.addEventListener('pointermove',event=>{if(reduced.matches||event.pointerType==='touch'||document.documentElement.dataset.theme!=='night')return;const x=event.clientX/innerWidth,y=event.clientY/innerHeight;stage.style.setProperty('--bg-x',`${((x-.5)*34).toFixed(2)}px`);stage.style.setProperty('--bg-y',`${((y-.5)*28).toFixed(2)}px`);stage.style.setProperty('--pointer-x',`${(x*100).toFixed(2)}%`);stage.style.setProperty('--pointer-y',`${(y*100).toFixed(2)}%`);});
 choose(initial);
})();
