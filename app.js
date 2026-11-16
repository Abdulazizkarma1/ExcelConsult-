'use strict';
// Set verified contact details before publishing. Never put private credentials here.
const BUSINESS = {
  whatsapp: '', // digits only, e.g. 233XXXXXXXXX
  email: '', // public business email address
  bookingUrl: '' // optional public appointment scheduling URL
};
const services=[
 {icon:'◈',tag:'Academic support',name:'Research & Thesis Guidance',desc:'Topic selection, proposal coaching, methodology guidance, literature review support and constructive chapter-by-chapter feedback.'},
 {icon:'⌘',tag:'Technology',name:'Software & Systems Development',desc:'Websites, applications, architecture, guided student development, debugging, testing and deployment support.'},
 {icon:'▥',tag:'Data & research',name:'Data Analysis & Research Tools',desc:'Support with Excel, SPSS, Python, R, survey instruments, data cleaning, visualisation and interpretation.'},
 {icon:'▣',tag:'Academic support',name:'Presentations & Defence Coaching',desc:'Professional slides, research storytelling, mock defence, technical demonstration and speaking practice.'},
 {icon:'✎',tag:'Academic support',name:'Editing, Formatting & Referencing',desc:'Proofreading, language editing, citation guidance, reference formatting and quality review.'},
 {icon:'✧',tag:'Technology consulting',name:'Business Digital Solutions',desc:'Digital strategy, websites, workflow automation, prototyping, technical advisory and professional training.'}
];
const packages=[
 {name:'Research Starter',price:350,term:'one-time',featured:false,items:['Topic & feasibility consultation','Proposal structure guidance','Chapter One feedback, up to 10 pages','One 45-minute online session','One feedback revision']},
 {name:'Complete Research Support',price:1200,term:'per project',featured:true,items:['Research coaching across Chapters 1–5','Draft reviews, up to 60 pages','Research methods & citation support','Three online consultations','Two feedback rounds']},
 {name:'Software Project Mentorship',price:2000,term:'starting from',featured:false,items:['Scope & architecture guidance','Guided implementation and code reviews','Database, tests & deployment coaching','Four technical sessions','Demo and documentation review']},
 {name:'Defence Excellence',price:250,term:'one-time',featured:false,items:['Up to 15 designed slides','Presentation structure coaching','Likely question practice','One 45-minute mock defence','One revision round']}
];
const faqs=[
 ['Can you complete my entire final-year thesis for me?','We provide research coaching, editing, technical mentoring and appropriate consulting support. Students must undertake their own assessed work in accordance with institutional academic integrity requirements.'],
 ['Can I pay in instalments?','Eligible packages offer milestone payments. A usual arrangement is 40% upfront, 30% at the midpoint and 30% before final handover. Confirmed terms are provided in your quotation.'],
 ['How will we communicate?','We typically coordinate through WhatsApp, share files through Google Drive and schedule consultations using Google Meet. The meeting allowance depends on your package.'],
 ['Do you provide free Turnitin checks?','A complimentary similarity check may be included in qualifying packages when authorised Turnitin access is available. AI-writing reports depend on the institution or licence and cannot conclusively determine authorship.'],
 ['Do you serve businesses as well as students?','Yes. We offer software development, technology advisory, research tools, training and business digital solutions. Organisational projects are quoted separately.'],
 ['What if my supervisor requests revisions?','Feedback within the original scope can be addressed within the agreed revision allowance. New requirements or major scope changes may require a new quotation.'],
 ['Will you guarantee a particular grade?','No. We commit to the agreed services and deliverables, but academic grades, supervisor acceptance and institutional decisions are outside our control.']
];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const price=n=>'GH₵'+n.toLocaleString('en-GH');
document.getElementById('servicecards').innerHTML=services.map(s=>'<article class="servicecard"><div class="symbol">'+esc(s.icon)+'</div><span class="tiny">'+esc(s.tag)+'</span><h3>'+esc(s.name)+'</h3><p>'+esc(s.desc)+'</p><a class="inline-link service-link" data-service="'+esc(s.name)+'" href="#contact">Discuss this service →</a></article>').join('');
document.getElementById('pricingcards').innerHTML=packages.map(p=>'<article class="pricecard '+(p.featured?'featured':'')+'"><span class="tiny">'+(p.featured?'MOST POPULAR':'SUPPORT PACKAGE')+'</span><h3>'+esc(p.name)+'</h3><div class="price">'+price(p.price)+' <small>'+esc(p.term)+'</small></div><ul>'+p.items.map(i=>'<li>'+esc(i)+'</li>').join('')+'</ul><a class="btn '+(p.featured?'dark':'outline')+' package-link" data-service="'+esc(p.name)+'" href="#contact">Request this package ↗</a></article>').join('');
const serviceSelect=document.getElementById('serviceSelect');
[...services.map(s=>s.name),...packages.map(p=>p.name)].forEach(name=>{const opt=document.createElement('option');opt.value=name;opt.textContent=name;serviceSelect.append(opt)});
document.querySelectorAll('[data-service]').forEach(el=>el.addEventListener('click',()=>{serviceSelect.value=el.dataset.service}));
document.getElementById('faqlist').innerHTML=faqs.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('');
const pkg=document.getElementById('package');
function updateBreakdown(){
 const n=Number(pkg.value);
 const selected=pkg.options[pkg.selectedIndex].textContent;
 const parts=selected.includes('Software')?[[40,'Planning & deposit'],[30,'Prototype milestone'],[20,'Testing & review'],[10,'Final handover']]:[[40,'Booking & kickoff'],[30,'Midpoint milestone'],[30,'Final handover']];
 document.getElementById('breakdown').innerHTML=parts.map(([pct,label])=>'<div class="payrow"><span>'+pct+'% · '+label+'</span><b>'+price(n*pct/100)+'</b></div>').join('');
}
pkg.addEventListener('change',updateBreakdown);updateBreakdown();
const toggle=document.getElementById('menubtn');const nav=document.getElementById('navlinks');
toggle.addEventListener('click',()=>{let open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'✕':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}));
document.getElementById('year').textContent=String(new Date().getFullYear());
const form=document.getElementById('inquiry'),result=document.getElementById('formresult'),prepared=document.getElementById('prepared'),contactlink=document.getElementById('contactlink');
form.addEventListener('submit',ev=>{
 ev.preventDefault();if(!form.reportValidity())return;
 const fd=new FormData(form);
 const message=['Hello ExcelConsult Research & Technology,','I would like to request a consultation.','','Name: '+fd.get('name'),'Email: '+fd.get('email'),'Service: '+fd.get('service'),'Timeline: '+fd.get('timeline'),'Project requirements: '+fd.get('details'),'','Please advise on the next steps and a quotation.'].join('\n');
 prepared.value=message;result.hidden=false;
 if(BUSINESS.whatsapp){contactlink.href='https://wa.me/'+BUSINESS.whatsapp+'?text='+encodeURIComponent(message);contactlink.textContent='Send via WhatsApp ↗';contactlink.hidden=false}
 else if(BUSINESS.email){contactlink.href='mailto:'+BUSINESS.email+'?subject='+encodeURIComponent('ExcelConsult consultation inquiry')+'&body='+encodeURIComponent(message);contactlink.textContent='Send via email ↗';contactlink.hidden=false}
 else{contactlink.hidden=true;}
 result.scrollIntoView({behavior:'smooth',block:'nearest'});
});
document.getElementById('copybtn').addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText(prepared.value);document.getElementById('copybtn').textContent='Copied ✓'}catch{prepared.focus();prepared.select();document.getElementById('copybtn').textContent='Select & copy text'}
});
