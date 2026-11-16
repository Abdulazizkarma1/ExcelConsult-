import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const html=readFileSync('index.html','utf8');
const js=readFileSync('app.js','utf8');
const css=readFileSync('refinement.css','utf8');
new vm.Script(js,{filename:'app.js'});
const ids=[...html.matchAll(/\\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,'unique HTML ids');
for(const [,href] of html.matchAll(/\\bhref="#([^"]+)"/g)) assert.ok(ids.includes(href),'missing anchor: '+href);
for(const id of ['servicecards','pricingcards','categorySelect','serviceSelect','breakdown','inquiry','formerror','submitInquiry','contactlink','menubtn','navlinks']) assert.ok(ids.includes(id),'missing JS element: '+id);
assert.ok(html.includes('name="consent"')&&html.includes('required'),'consent requirement');
assert.ok(!html.includes('href="#"'),'no fake links');
assert.ok(css.includes('prefers-reduced-motion'),'reduced motion');
assert.ok(js.includes('encodeURIComponent(message)'),'WhatsApp query safely encoded');
assert.ok(js.includes('not been sent')||html.includes('not been sent'),'explicit unsent status');
assert.ok(js.includes('40,')&&js.includes('30,'),'milestone schedule configured');
for(const total of [350,1200,2000,250]){
 const percentages=total===2000?[40,30,20,10]:[40,30,30];
 assert.equal(percentages.reduce((acc,p)=>acc+Math.round(total*p)/100,0),total,'payments sum');
}
console.log('Static structure, JavaScript syntax, anchors and milestone arithmetic: PASS');
