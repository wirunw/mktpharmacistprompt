const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get(k,d){try{const v=localStorage.getItem(k);return v===null?d:v}catch(e){return d}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),1600)}
async function copyText(t){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}toast('คัดลอกแล้ว นำไปวางในเครื่องมือ AI ขององค์กรได้เลย')}
function applyTheme(t){if(t==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',t);const b=$('#theme');if(b)b.textContent=t==='dark'?'☾ มืด':t==='light'?'☀ สว่าง':'◐ ตามเครื่อง'}
function initTheme(){let t=store.get('mkp-theme','auto');applyTheme(t);$('#theme').addEventListener('click',()=>{t=t==='auto'?'light':t==='light'?'dark':'auto';store.set('mkp-theme',t);applyTheme(t)})}
const FAC={
 pm:{name:'Product / Brand Manager',st:'Product Manager ของบริษัทยาในประเทศไทย',topic:'ยาลดน้ำตาลกลุ่ม SGLT2 inhibitor'},
 med:{name:'Medical Affairs / Medical Information',st:'เภสัชกรฝ่าย Medical Affairs ของบริษัทยาในประเทศไทย',topic:'ยาต้านการแข็งตัวของเลือดชนิดรับประทาน (DOAC)'},
 access:{name:'Market Access / Regulatory',st:'เภสัชกรฝ่าย Market Access ของบริษัทยาในประเทศไทย',topic:'ยาชีววัตถุสำหรับโรคข้ออักเสบรูมาตอยด์'},
 sales:{name:'Sales Manager / ผู้แทนยา',st:'ผู้จัดการทีมขาย (เภสัชกร) ของบริษัทยาในประเทศไทย',topic:'ยาลดไขมันกลุ่ม statin'},
 admin:{name:'Pharmacy Administration',st:'เภสัชกรฝ่ายบริหารเภสัชกิจ',topic:'ยาปฏิชีวนะในบัญชียาโรงพยาบาล'}};
function G(){const f=store.get('mkp-role','pm'),F=FAC[f]||FAC.pm;const org=(store.get('mkp-org','')||'').trim();return{f,F,role:F.st+(org?' ('+org+')':''),topic:F.topic}}
function initSetup(onChange){const fs=$('#g-role'),os=$('#g-org');fs.value=store.get('mkp-role','pm');os.value=store.get('mkp-org','');
 fs.addEventListener('change',()=>{store.set('mkp-role',fs.value);onChange()});os.addEventListener('input',()=>{store.set('mkp-org',os.value);onChange()})}
