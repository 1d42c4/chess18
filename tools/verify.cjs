const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{Chess}=require('../vendor/chess.cjs');
const root=path.resolve(__dirname,'..'),C=JSON.parse(fs.readFileSync(path.join(root,'source/course.json'),'utf8'));
assert.equal(C.lessons.length,16);assert.equal(new Set(C.lessons.map(l=>l.title)).size,16);assert.equal(new Set(C.lessons.map(l=>l.filename)).size,16);
let plies=0,refs=0,tbPositions=0,words=0;
const checkPosition=c=>{const other=c.turn()==='w'?'b':'w';assert.ok(!c.isAttacked(c.findPiece({type:'k',color:other})[0],c.turn()),'opponent king not already checked');};
for(const l of C.lessons){
 const c=new Chess(l.fen);checkPosition(c);assert.ok(l.wordCount>=150,'substantive direct explanation');words+=l.wordCount;
 if(l.opening){const opening=new Chess();for(const san of l.opening)opening.move(san);assert.equal(opening.fen(),l.fen);}
 for(const step of l.steps){assert.equal(c.turn(),step.side);const m=c.move({from:step.uci.slice(0,2),to:step.uci.slice(2,4),promotion:step.uci.slice(4)||undefined});assert.equal(m.san,step.san);assert.equal(c.fen(),step.fen);checkPosition(c);plies++;}
 assert.equal(c.fen(),l.finalFen);assert.equal(c.isCheckmate(),l.checkmate);assert.equal(c.isStalemate(),l.stalemate);
 if(C.slug==='endgames'){assert.ok(l.tablebase);assert.equal(l.tablebase.steps.length,l.steps.length);for(const t of l.tablebase.steps){assert.equal(t.whiteResult,l.tablebase.start.whiteResult,'endgame line preserves its exact outcome');tbPositions++;}tbPositions++;}
 const html=fs.readFileSync(path.join(root,'lessons',l.filename),'utf8').replace(/<!--[\s\S]*?-->/g,'');
 assert.ok(!/<(?:script|input|button|form|textarea|select|details)\b/i.test(html),'direct reading only');assert.ok(!/<(?:img|iframe|video|audio)\b/i.test(html),'no external display assets');assert.ok(!/@import|url\(\s*['"]?https?:/i.test(html),'no external CSS dependencies');
 assert.equal((html.match(/class="board"/g)||[]).length,2);assert.equal((html.match(/class="sq(?: dark)?(?: marked)?"/g)||[]).length,128);assert.ok(html.includes('<style>')&&html.includes('<svg'),'self-contained CSS and vector pieces');
}
function files(folder){return fs.readdirSync(folder,{withFileTypes:true}).filter(e=>e.name!=='.git').flatMap(e=>e.isDirectory()?files(path.join(folder,e.name)):[path.join(folder,e.name)]);}
const all=files(root),counts=new Map();for(const f of all){let dir=path.dirname(f);if(!counts.has(dir))counts.set(dir,fs.readdirSync(dir).filter(n=>n!=='.git').length);}const maxEntries=Math.max(...counts.values());assert.ok(maxEntries<1000);
for(const file of all.filter(f=>f.endsWith('.html'))){const text=fs.readFileSync(file,'utf8').replace(/<!--[\s\S]*?-->/g,'');assert.ok(!/<(?:script|input|button|form|textarea|select|details)\b/i.test(text));for(const match of text.matchAll(/\b(?:href|src)="([^"]*)"/g)){const ref=match[1];if(!ref||/^(?:https?:|mailto:|#)/.test(ref))continue;const target=path.resolve(path.dirname(file),decodeURIComponent(ref.split(/[?#]/)[0]));assert.ok(target.startsWith(root+path.sep));assert.ok(fs.existsSync(target),path.relative(root,file)+' -> '+ref);refs++;}}
const pgn=fs.readFileSync(path.join(root,'downloads/illustrated-lines.pgn'),'utf8').trim().split(/\n\n(?=\[Event )/);assert.equal(pgn.length,16);for(const game of pgn){const c=new Chess();c.loadPgn(game);}
if(C.slug==='foundations'){
 const knight=new Chess(C.lessons[3].fen);assert.equal(knight.moves({square:'d4'}).length,8);
 assert.ok(!new Chess(C.lessons[5].fen).moves().includes('Kxd3'));
 assert.ok(!new Chess(C.lessons[9].fen).moves().includes('O-O'));
 const ep=new Chess(C.lessons[10].finalFen);assert.equal(ep.get('d5'),undefined);assert.equal(ep.get('d6').color,'w');
 const mate=new Chess(C.lessons[14].fen);mate.move('Qh4#');assert.ok(mate.isCheckmate());assert.ok(C.lessons[14].stalemate);
}
if(C.slug==='endgames'){const alt=new Chess(C.lessons[15].fen);alt.move('c8=Q');assert.ok(alt.isStalemate());assert.ok(C.lessons[15].checkmate);}
const report={repository:C.repo,lessons:16,lessonWords:words,lessonDiagrams:32,legalIllustratedPlies:plies,tablebasePositionsChecked:tbPositions,htmlPages:all.filter(f=>f.endsWith('.html')).length,localReferencesChecked:refs,maximumDirectoryEntries:maxEntries,clientScripts:0,answerInputs:0,standaloneLessons:16,status:'passed'};
fs.writeFileSync(path.join(root,'VERIFICATION.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
