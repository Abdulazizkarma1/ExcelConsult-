'use strict';
// Set verified contact details before publishing. Never put private credentials here.
const BUSINESS = {
  whatsapp: '', // digits only, e.g. 233XXXXXXXXX
  email: '', // public business email address
  bookingUrl: '' // optional public appointment scheduling URL
};
const services=[
 {category:'Research & Academic Support',name:'Research & Thesis Guidance',desc:'Research topics, proposals, methodology, literature review and chapter feedback.',audience:'Undergraduates, postgraduate researchers',deliverables:'Guided review, research plan and clear feedback'},
 {category:'Research & Academic Support',name:'Presentations & Defence Coaching',desc:'Slide design, mock defence, explanation of findings and practice for examiner questions.',audience:'Students preparing a defence',deliverables:'Presentation deck, rehearsal and feedback'},
 {category:'Research & Academic Support',name:'Editing, Formatting & Referencing',desc:'Language editing, reference organisation and academic document formatting.',audience:'Students, researchers and professionals',deliverables:'Marked edits and formatted document'},
 {category:'Software & Technology',name:'Software & Systems Development',desc:'Websites, digital applications, prototyping, testing, integration and deployment advice.',audience:'Businesses, organisations and project teams',deliverables:'Agreed prototype or technical scope and documentation'},
 {category:'Software & Technology',name:'Student Software Mentorship',desc:'Guided implementation, architecture discussions, code review and debugging.',audience:'Computer science and IT students',deliverables:'Mentoring sessions and actionable code feedback'},
 {category:'Data & Analytics',name:'Data Analysis & Research Tools',desc:'Excel, SPSS, R or Python support for data preparation, analysis and interpretation.',audience:'Researchers, NGOs and businesses',deliverables:'Analysis plan, agreed outputs and interpretation guidance'},
 {category:'Data & Analytics',name:'Survey & Data Collection Design',desc:'Questionnaire structure, survey tools, validation and data quality planning.',audience:'Students, field teams and researchers',deliverables:'Reviewed instrument and collection workflow'},
 {category:'Business & Digital Consulting',name:'Business Digital Solutions',desc:'Technology strategy, workflow improvements, automation and technical advisory.',audience:'SMEs, institutions and organisations',deliverables:'Discovery consultation and scoped recommendations'}
];
const categories=[...new Set(services.map(s=>s.category))];
const packages=[
 {name:'Research Starter',price:350,term:'one-time',featured:false,items:['Topic & feasibility consultation','Proposal structure guidance','Chapter One feedback, up to 10 pages','One 45-minute online session','One feedback revision']},
 {name:'Complete Research Support',price:1200,term:'per project',featured:false,items:['Research coaching across Chapters 1–5','Draft reviews, up to 60 pages','Research methods & citation support','Three online consultations','Two feedback rounds']},
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
document.getElementById('servicecards').innerHTML=categories.map((cat,i)=>'<section class="service-group"><div class="service-group-heading"><span class="service-number">0'+(i+1)+'</span><h3>'+esc(cat)+'</h3></div><div class="service-items">'+services.filter(s=>s.category===cat).map(s=>'<article class="service-item"><div><h4>'+esc(s.name)+'</h4><p>'+esc(s.desc)+'</p><p class="service-meta"><strong>For:</strong> '+esc(s.audience)+'<br><strong>Typical support:</strong> '+esc(s.deliverables)+'</p></div><a class="inline-link service-link" data-service="'+esc(s.name)+'" href="#contact">Enquire about this service <span aria-hidden="true">↗</span></a></article>').join('')+'</div></section>').join('');
document.getElementById('pricingcards').innerHTML=packages.map(p=>'<article class="pricecard"><span class="tiny">SUPPORT PACKAGE</span><h3>'+esc(p.name)+'</h3><div class="price">'+price(p.price)+' <small>'+esc(p.term)+'</small></div><ul>'+p.items.map(i=>'<li>'+esc(i)+'</li>').join('')+'</ul><p class="pricing-disclaimer">Scope, exclusions and meeting lengths are confirmed in the quotation.</p><a class="btn outline package-link" data-service="'+esc(p.name)+'" href="#contact">Request this package <span aria-hidden="true">↗</span></a></article>').join('');
const serviceSelect=document.getElementById('serviceSelect');
const categorySelect=document.getElementById('categorySelect');
for(const cat of categories){let opt=document.createElement('option');opt.value=cat;opt.textContent=cat;categorySelect.add(opt)}
categorySelect.addEventListener('change',()=>{
 const prior=serviceSelect.value;serviceSelect.replaceChildren(new Option('Select a service',''));
 services.filter(s=>s.category===categorySelect.value).forEach(s=>serviceSelect.add(new Option(s.name,s.name)));
 if(categorySelect.value==='Research & Academic Support')packages.forEach(p=>serviceSelect.add(new Option(p.name,p.name)));
 if([...serviceSelect.options].some(o=>o.value===prior))serviceSelect.value=prior;
});
document.querySelectorAll('[data-service]').forEach(el=>el.addEventListener('click',()=>{
 const service=el.dataset.service;
 const matched=services.find(s=>s.name===service);
 categorySelect.value=matched?.category||(service==='Software Project Mentorship'?'Software & Technology':'Research & Academic Support');
 categorySelect.dispatchEvent(new Event('change'));
 if(![...serviceSelect.options].some(o=>o.value===service))serviceSelect.add(new Option(service,service));
 serviceSelect.value=service;
}));
document.getElementById('faqlist').innerHTML=faqs.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('');
const pkg=document.getElementById('package');
function updateBreakdown(){
 const n=Number(pkg.value);
 const selected=pkg.options[pkg.selectedIndex].textContent;
 const parts=selected.includes('Software')?[[40,'Planning & deposit'],[30,'Prototype milestone'],[20,'Testing & review'],[10,'Final handover']]:[[40,'Booking & kickoff'],[30,'Midpoint milestone'],[30,'Final handover']];
 document.getElementById('breakdown').innerHTML=parts.map(([pct,label])=>'<div class="payrow"><span>'+pct+'% · '+label+'</span><b>'+price(n*pct/100)+'</b></div>').join('');
}
pkg.addEventListener('change',updateBreakdown);updateBreakdown();
const toggle=document.getElementById('menubtn');
const nav=document.getElementById('navlinks');
function closeMenu(returnFocus=false){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');toggle.querySelector('span').textContent='Menu';document.body.classList.remove('menu-open');if(returnFocus)toggle.focus()}
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');toggle.querySelector('span').textContent=open?'Close':'Menu';document.body.classList.toggle('menu-open',open);if(open)nav.querySelector('a')?.focus()});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',ev=>{if(!nav.classList.contains('open'))return;if(ev.key==='Escape'){ev.preventDefault();closeMenu(true)}if(ev.key==='Tab'){const links=[toggle,...nav.querySelectorAll('a')];const first=links[0],last=links[links.length-1];if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus()}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus()}}});
document.addEventListener('pointerdown',ev=>{if(nav.classList.contains('open')&&!nav.contains(ev.target)&&!toggle.contains(ev.target))closeMenu()});
window.matchMedia('(min-width: 761px)').addEventListener('change',ev=>{if(ev.matches)closeMenu()});
document.getElementById('year').textContent=String(new Date().getFullYear());
const form=document.getElementById('inquiry'),result=document.getElementById('formresult'),prepared=document.getElementById('prepared'),contactlink=document.getElementById('contactlink');
let preparing=false;
form.addEventListener('submit',ev=>{
 ev.preventDefault();if(preparing)return;
 const err=document.getElementById('formerror');err.hidden=true;err.textContent='';
 if(!form.reportValidity())return;
 const fd=new FormData(form);
 const phone=String(fd.get('phone')||'').trim();
 if(phone&&!/^\\+?[0-9 ()-]{7,20}$/.test(phone)){err.textContent='Please enter a valid phone number or leave the optional field blank.';err.hidden=false;form.elements.phone.focus();return}
 preparing=true;
 const btn=document.getElementById('submitInquiry');btn.disabled=true;btn.textContent='Preparing enquiry…';
 const channel=String(fd.get('channel'));
 const message=['Hello ExcelConsult Research & Technology,','I would like to request a consultation.','','Name: '+fd.get('name'),'Email: '+fd.get('email'),'Phone: '+(phone||'Not provided'),'Client type: '+fd.get('clientType'),'Service category: '+fd.get('category'),'Specific service: '+fd.get('service'),'Timeline: '+fd.get('timeline'),'Preferred contact: '+channel,'Project requirements: '+fd.get('details'),'','Please advise on next steps and a quotation.'].join('\\n');
 prepared.value=message;result.hidden=false;
 const validWhatsApp=/^[1-9][0-9]{7,14}$/.test(BUSINESS.whatsapp);
 const validEmail=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(BUSINESS.email);
 contactlink.hidden=true;
 if(channel==='WhatsApp'&&validWhatsApp){contactlink.href='https://wa.me/'+BUSINESS.whatsapp+'?text='+encodeURIComponent(message);contactlink.textContent='Open WhatsApp ↗';contactlink.hidden=false}
 else if(validEmail){contactlink.href='mailto:'+BUSINESS.email+'?subject='+encodeURIComponent('ExcelConsult consultation enquiry')+'&body='+encodeURIComponent(message);contactlink.textContent='Open email app ↗';contactlink.hidden=false}
 else if(validWhatsApp){contactlink.href='https://wa.me/'+BUSINESS.whatsapp+'?text='+encodeURIComponent(message);contactlink.textContent='Open WhatsApp ↗';contactlink.hidden=false}
 if(contactlink.hidden){err.textContent='The company contact channels are not configured yet. You may copy your prepared message, but it has not been submitted.';err.hidden=false;}
 if(channel==='Google Meet request'){const p=document.createElement('p');p.className='fine';p.textContent='Google Meet bookings are confirmed by the team after an enquiry; this form does not book a meeting.';result.append(p)}
 btn.disabled=false;btn.textContent='Prepare my enquiry ↗';preparing=false;result.scrollIntoView({behavior:'smooth',block:'nearest'});
});
document.getElementById('copybtn').addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText(prepared.value);document.getElementById('copybtn').textContent='Copied ✓'}catch{prepared.focus();prepared.select();document.getElementById('copybtn').textContent='Select & copy text'}
});
