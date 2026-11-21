(() => {
const q = s => document.querySelector(s);

/* ===== TESTI DA PERSONALIZZARE ===== */
const NOME = ""; // la tua firma in fondo alla letterina (lascia vuoto per non mostrarla)
const FINALE = "Il regalo più grande siete voi.<br>Buon Natale! ❤️"; // frase che compare quando vincono il gioco del 24
const GIORNO_GIOCO = 12; // giorno in cui, oltre al messaggio, compare il gioco bonus "trova le coppie"
const LETTERA = [
 "Caro Babbo Natale,",
 "quest’anno mi sono comportato bene, o almeno ci ho provato. Ho preparato una lista con le cose che mi farebbero davvero felice: un po’ di sport, qualche avventura in montagna e tanta elettronica da smontare e rimontare.",
 "Non serve spendere tanto: anche un pensiero fa la sua parte. Scartate i pacchi qui sotto e scegliete quello che vi piace di più.",
 "Grazie di cuore! Vi voglio bene."
];
const AVVENTO = [ // un messaggio per ogni giorno (il 24 è il gioco)
 "Si parte! Da oggi ogni giorno una casella nuova: la neve è ufficialmente in servizio. Prepara una cioccolata calda e goditi il viaggio verso Natale. ❄️",
 "Curiosità: si racconta che il calendario dell’Avvento sia nato in Germania, quando le famiglie segnavano i giorni con righe di gesso. Oggi basta una casella. 🚪",
 "Consiglio: metti le luci dell’albero su un timer. Risparmi corrente, le spegni anche quando ti addormenti e la casa è sempre pronta per la festa. 💡",
 "Complimento del giorno: hai un modo di esserci che rende ogni festa più calda. Non serve nemmeno il camino. 🔥",
 "Oggi canta una canzone di Natale, anche stonata. Sapevi che «Astro del ciel» è la versione italiana di «Stille Nacht», nata nel 1818 in Austria? 🎶",
 "6 dicembre: San Nicola. Da questo vescovo vissuto in Turchia nasce la tradizione di Babbo Natale. Quindi, tecnicamente, siamo tutti suoi fan. 🎅",
 "Consiglio utile: scrivi una lista dei regali, anche piccola. Regalare bene non vuol dire spendere tanto, ma pensare a chi lo riceve. 📝",
 "L’8 dicembre in Italia è il giorno tradizionale per fare albero e presepe. Se sei in ritardo, niente paura: le lucine accettano anche i ritardatari. 🎄",
 "Trucco da cucina: il panettone avanzato, tostato in padella con un po’ di burro, diventa una colazione da re. 👑",
 "Complimento: le persone che ascoltano davvero sono rare, e tu sei una di quelle. Grazie, davvero. 💛",
 "Sapevi che in Islanda ci sono 13 Babbi Natale dispettosi, uno per ogni notte prima di Natale? Da noi ne basta uno, per fortuna. 😄",
 "Metà strada! Il pupazzo di neve nella home ti aspetta: riesci a battere il tuo record? Oggi c’è anche un gioco bonus qui sotto. ⛄",
 "Il 13 dicembre è Santa Lucia: in Svezia le ragazze sfilano con una corona di candele in testa, in Sicilia si mangia la cuccìa. Il mondo è bello perché è vario. 🕯️",
 "Consiglio da montagna: l’inverno regala i panorami più nitidi. Se esci, vestiti a strati e porta sempre qualcosa di caldo da bere. 🏔️",
 "Il primo presepe, vivente, lo fece San Francesco a Greccio nel 1223. Più di ottocento anni fa… e oggi lo facciamo ancora, con il muschio. 🐑",
 "Oggi regalati una pausa: copertina, un film di Natale e zero sensi di colpa. Te la sei guadagnata. 🍿",
 "Piccola verità: le feste non sono perfette, sono belle perché ci siamo tutti, con i nostri difetti e le nostre risate. 🤍",
 "Fai una foto di gruppo prima che inizi il caos del pranzo. Tra dieci anni la guarderete dicendo: «ma quanto eravamo giovani!» 📸",
 "Consiglio: tra un dolce e l’altro, una passeggiata di dieci minuti dopo pranzo fa bene a tutti. Poi si torna a mangiare, promesso. 🚶",
 "Sapevi che in Giappone a Natale si mangia spesso pollo fritto da asporto? Ogni Paese ha le sue tradizioni: la nostra è stare insieme. 🍗",
 "Oggi è il solstizio d’inverno, il giorno più corto dell’anno. Da qui in poi la luce torna ad aumentare, un minuto alla volta. 🌅",
 "Grazie. Per le risate, per i pranzi infiniti, per le volte che ci siete stati senza che lo chiedessi. Il regalo più grande è questo. 💛",
 "Quasi ci siamo. Domani si apre l’ultima casella, con una sorpresa da giocare… e da lì parte il Natale. 🎁"
];

/* ===== Pupazzo goloso ===== */
const c = q("#pupazzo"), x = c.getContext("2d"), W = 360, H = 420, TIPI = ["🎁","🍪","🪨"];
let px = W/2, it = [], sc = 0, vite = 3, st = "pronto", t = 0, ouch = 0, say = "", sayT = 0, best = 0;
try { best = +localStorage.getItem("pupBest") || 0; } catch(e) {}
const hud = () => { q("#pp").textContent = `Punti: ${sc} · Record: ${best}`; q("#pv").textContent = "❤️".repeat(vite) + "🤍".repeat(3 - vite); };
function via(){ px = W/2; it = []; sc = 0; vite = 3; t = 0; say = ""; sayT = 0; st = "gioca"; hud(); }
function mossa(e){ const r = c.getBoundingClientRect(); px = Math.max(34, Math.min(W-34, (e.clientX - r.left) * W / r.width)); }
c.addEventListener("pointerdown", e => { if(st !== "gioca") via(); mossa(e); });
c.addEventListener("pointermove", mossa);
c.addEventListener("keydown", e => {
 if(e.key === "ArrowLeft") px = Math.max(34, px-24);
 else if(e.key === "ArrowRight") px = Math.min(W-34, px+24);
 else if(e.key === " " || e.key === "Enter"){ if(st !== "gioca") via(); }
 else return;
 e.preventDefault();
});

function passo(){
 t++;
 if(st === "gioca"){
  if(t % Math.max(16, 42 - (sc >> 1)) === 0){ const r = Math.random(); it.push({k: r < .6 ? 0 : r < .8 ? 1 : 2, x: 24 + Math.random()*(W-48), y: -20, v: 2 + Math.random() + sc*.04}); }
  for(const i of it){
   i.y += i.v;
   if(!i.d && i.y > H-150 && i.y < H-25 && Math.abs(i.x - px) < 46){
    i.d = 1;
    if(i.k < 2){ sc += i.k ? 3 : 1; say = i.k ? "Gnam!" : ["Grazie!","Evvai!","Che bello!"][sc % 3]; }
    else { vite--; ouch = 30; say = "Ahi!"; }
    sayT = 45; hud();
    if(vite < 1){ st = "fine"; if(sc > best){ best = sc; try { localStorage.setItem("pupBest", best); } catch(e) {} hud(); } }
   }
  }
  it = it.filter(i => !i.d && i.y < H+30);
 }
 disegna(); requestAnimationFrame(passo);
}

function disegna(){
 x.clearRect(0,0,W,H);
 x.fillStyle = "#fff"; x.beginPath(); x.ellipse(W/2, H+10, W*.7, 34, 0, 0, 7); x.fill();
 x.font = "30px serif"; x.textAlign = "center"; x.textBaseline = "middle";
 for(const i of it) x.fillText(TIPI[i.k], i.x, i.y);
 const sq = 1 + Math.sin(Math.max(0, sayT)/45*Math.PI) * .07, br = sayT > 0 ? 9 : 2;
 x.save(); x.translate(px, H-8); x.scale(1/sq, sq);
 x.strokeStyle = "#16213a"; x.lineWidth = 3; x.lineJoin = "round"; x.fillStyle = "#fff";
 for(const [y,r] of [[-34,34],[-84,26],[-122,19]]){ x.beginPath(); x.arc(0,y,r,0,7); x.fill(); x.stroke(); }
 x.beginPath(); x.moveTo(-25,-90); x.lineTo(-52, -112 + Math.sin(t/8)*br); x.moveTo(25,-90); x.lineTo(52, -112 - Math.sin(t/8)*br); x.stroke();
 x.fillStyle = "#16213a"; x.fillRect(-24,-146,48,7); x.fillRect(-15,-176,30,32);
 x.fillStyle = "#d2334f"; x.fillRect(-15,-154,30,7); x.fillRect(-22,-106,44,8);
 x.fillStyle = "#16213a";
 if(ouch > 0){ x.font = "bold 16px sans-serif"; x.fillText("×",-7,-126); x.fillText("×",7,-126); }
 else for(const e of [-7,7]){ x.beginPath(); x.arc(e,-127,2.6,0,7); x.fill(); }
 for(let k = -2; k <= 2; k++){ x.beginPath(); x.arc(k*4, -111 - k*k*.5, 1.5, 0, 7); x.fill(); }
 for(const y of [-90,-78]){ x.beginPath(); x.arc(0,y,3,0,7); x.fill(); }
 x.fillStyle = "#ff8a1f"; x.beginPath(); x.moveTo(0,-122); x.lineTo(17,-118); x.lineTo(0,-114); x.fill();
 x.restore();
 if(sayT > 0){
  const bx = Math.max(44, Math.min(W-44, px));
  x.fillStyle = "#fff"; x.fillRect(bx-42, H-232, 84, 28);
  x.fillStyle = "#16213a"; x.font = "bold 16px Figtree,sans-serif"; x.fillText(say, bx, H-218);
  sayT--;
 }
 if(ouch > 0) ouch--;
 if(st !== "gioca"){
  x.fillStyle = "#101b34cc"; x.fillRect(0,0,W,H); x.fillStyle = "#fff";
  x.font = "800 26px Fraunces,Georgia,serif"; x.fillText(st === "fine" ? `Fine! ${sc} punti` : "Pupazzo goloso", W/2, 150);
  x.font = "600 16px Figtree,sans-serif";
  x.fillText("Prendi 🎁 e 🍪, evita i 🪨", W/2, 190);
  x.fillText(st === "fine" ? "Tocca per rigiocare" : "Tocca per giocare", W/2, 222);
 }
}
hud(); passo();

/* ===== Finestre ===== */
const dlg = q("#dlg"), dlb = q("#dlb");
const mostra = h => { dlb.innerHTML = `<div class="in">${h}</div>`; if(!dlg.open) dlg.showModal(); };
for(const d of [dlg, q("#lett")]) d.addEventListener("click", e => { if(e.target === d) d.close(); });

/* ===== Calendario dell'Avvento ===== */
// Per provarlo prima di dicembre: aggiungi ?test alla fine dell'indirizzo
const TEST = /[?&]test/.test(location.search), n = new Date();
const libero = d => TEST || n.getFullYear() > 2026 || (n.getFullYear() === 2026 && n.getMonth() === 11 && n.getDate() >= d);
let vis = [];
try { vis = JSON.parse(localStorage.getItem("av26")) || []; } catch(e) {}
const giorni = q("#days");
giorni.innerHTML = Array.from({length:24}, (_, i) => { const d = i+1;
 return `<button class="dy ${libero(d) ? "" : "lock"} ${vis.includes(d) ? "vista" : ""}" data-d="${d}" aria-label="Casella ${d}">${d}<small>${libero(d) ? (d === 24 || d === GIORNO_GIOCO ? "🎮" : "🎁") : "🔒"}</small></button>`;
}).join("");
giorni.onclick = e => {
 const b = e.target.closest(".dy"); if(!b) return;
 const d = +b.dataset.d;
 if(!libero(d)) return mostra(`<h3>Non ancora!</h3><p>Questa casella si apre il ${d} dicembre.</p>`);
 if(!vis.includes(d)){ vis.push(d); try { localStorage.setItem("av26", JSON.stringify(vis)); } catch(e) {} b.classList.add("vista"); }
 if(d === 24) albero();
 else if(d === GIORNO_GIOCO){
  mostra(`<h3>${d} dicembre</h3><p>${AVVENTO[d-1]}</p><button class="nb hot" id="bonus" type="button" style="margin-top:14px">Gioco bonus: trova le coppie</button>`);
  q("#bonus").onclick = memory;
 }
 else mostra(`<h3>${d} dicembre</h3><p>${AVVENTO[d-1]}</p>`);
};

/* ===== ALBERO:INIZIO ===== */
/* Accendi l’albero: infinito, finisce al primo errore. Record e tentativi restano sul dispositivo. */
function avviaAlbero(root, finale){
 const COL = ["#e53950","#f6c344","#4f9cff","#c15cff"], POS = [[50,38],[32,58],[68,58],[50,78]];
 const ld = k => { try { return +localStorage.getItem(k) || 0; } catch(e) { return 0; } };
 const sv = (k,v) => { try { localStorage.setItem(k,v); } catch(e) {} };
 let best = ld("alb_best"), tent = ld("alb_tent"), seq = [], pos = 0, t = 0, busy = 1, run = 0;
 root.innerHTML = `<div class="scena">
  <div class="hud"><span>Turno<b class="tn">–</b></span><span class="dx">Record<b class="rc">${best}</b></span></div>
  <div class="albero2">
   <svg class="alb" viewBox="0 0 300 340" aria-hidden="true">
    <ellipse cx="150" cy="322" rx="150" ry="22" fill="#f4f8ff"/>
    <rect x="132" y="276" width="36" height="46" rx="4" fill="#7a4a26" stroke="#0b1a33" stroke-width="3"/>
    <g stroke="#0b1a33" stroke-width="3" stroke-linejoin="round">
     <path d="M24 286 L150 168 L276 286 Z" fill="#1f7a4d"/><path d="M50 222 L150 112 L250 222 Z" fill="#26905a"/><path d="M82 158 L150 58 L218 158 Z" fill="#2fa56a"/>
    </g>
    <g fill="#fff" stroke="#0b1a33" stroke-width="2" stroke-linejoin="round">
     <path d="M150 58 L128 90 Q139 98 150 90 Q161 98 172 90 Z"/><path d="M150 112 L120 150 Q135 158 150 148 Q165 158 180 150 Z"/><path d="M150 168 L112 214 Q131 222 150 212 Q169 222 188 214 Z"/>
    </g>
    <g fill="none" stroke="#f0b94a" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"><path d="M40 272 Q150 306 262 268"/><path d="M68 210 Q150 238 232 208"/><path d="M98 150 Q150 166 202 148"/></g>
    <g stroke="#0b1a33" stroke-width="3" stroke-linejoin="round"><rect x="26" y="296" width="40" height="28" rx="3" fill="#d2334f"/><rect x="42" y="296" width="8" height="28" fill="#f0b94a"/><rect x="232" y="300" width="36" height="24" rx="3" fill="#4f9cff"/><rect x="246" y="300" width="8" height="24" fill="#fff"/></g>
    <polygon class="star" points="150,16 157,33 176,34 161,46 167,64 150,54 133,64 139,46 124,34 143,33" fill="#f0b94a" stroke="#0b1a33" stroke-width="3" stroke-linejoin="round"/>
   </svg>
   ${COL.map((c,i) => `<button class="lu" data-i="${i}" style="--l:${c};left:${POS[i][0]}%;top:${POS[i][1]}%" aria-label="Lucina ${i+1}"></button>`).join("")}
  </div>
  <p class="stato">Tocca “Via!” per iniziare</p>
  <button class="go via" type="button">Via!</button>
  <div class="over" hidden></div>
 </div>`;
 const $ = s => root.querySelector(s), sc = $(".scena"), lu = [...root.querySelectorAll(".lu")], st = $(".stato"), via = $(".via"), ov = $(".over");
 const ms = () => Math.max(200, 620 - t*35), pausa = x => new Promise(r => setTimeout(r, x));
 const hud = () => { $(".tn").textContent = t || "–"; $(".rc").textContent = best; };
 async function guarda(my){
  busy = 1; st.textContent = "Guarda…"; await pausa(550);
  for(const i of seq){
   if(my !== run) return;
   lu[i].classList.add("on"); await pausa(ms()); lu[i].classList.remove("on"); await pausa(ms() * .4);
  }
  if(my !== run) return;
  pos = 0; busy = 0; st.textContent = "Tocca tu!";
 }
 function turno(){ t++; seq.push(Math.floor(Math.random()*4)); hud(); guarda(run); }
 function inizia(){ run++; seq = []; pos = 0; t = 0; tent++; sv("alb_tent", tent); sc.classList.remove("err"); ov.hidden = true; via.hidden = true; turno(); }
 function fine(){
  busy = 1; run++; sc.classList.add("err"); st.textContent = "Ops!";
  const fatti = t - 1, nuovo = fatti > best;
  if(nuovo){ best = fatti; sv("alb_best", best); }
  setTimeout(() => {
   ov.innerHTML = `<h3>Fine del gioco</h3><div class="big">${fatti}</div><p>turni completati</p><p class="rec2">Record: ${best}${nuovo && fatti > 0 ? " · nuovo record! 🎉" : ""}</p><p>Tentativi: ${tent}</p><p class="fin">${finale}</p><button class="go" type="button">Riprova</button>`;
   ov.hidden = false; ov.querySelector("button").onclick = inizia; hud();
  }, 750);
 }
 via.onclick = inizia;
 $(".albero2").onclick = e => {
  const b = e.target.closest(".lu"); if(!b || busy) return;
  const i = +b.dataset.i; b.classList.add("on"); setTimeout(() => b.classList.remove("on"), 160);
  if(i !== seq[pos]) return fine();
  if(++pos < seq.length) return;
  busy = 1; st.textContent = "Bravo!"; setTimeout(turno, 700);
 };
}
/* ===== ALBERO:FINE ===== */

function albero(){
 mostra(`<h3>24 dicembre: accendi l’albero</h3><p class="sub3">Ripeti la sequenza di lucine. Non finisce mai… finché non sbagli!</p><div id="albero-root"></div>`);
 avviaAlbero(q("#albero-root"), FINALE);
}

/* ===== Gioco bonus: trova le coppie ===== */
function memory(){
 const e = ["🎄","⛄","🎁","🔔","🦌","🍪","⭐","🧦"], d = [...e, ...e].sort(() => Math.random() - .5);
 let a = null, lock = 0, m = 0, ok = 0;
 mostra(`<h3>Gioco bonus: trova le coppie</h3><p id="mm">Mosse: 0</p><div class="mem">${d.map(s => `<button class="mc" data-s="${s}" aria-label="Carta coperta">?</button>`).join("")}</div>`);
 q(".mem").onclick = ev => {
  const b = ev.target.closest(".mc");
  if(!b || lock || b === a || b.classList.contains("ok")) return;
  b.textContent = b.dataset.s; b.classList.add("up");
  if(!a){ a = b; return; }
  m++; q("#mm").textContent = "Mosse: " + m;
  if(a.dataset.s === b.dataset.s){
   a.classList.add("ok"); b.classList.add("ok"); a = null;
   if(++ok === 8) q("#mm").textContent = `Bravo! Tutte le coppie in ${m} mosse. 🎉`;
  } else {
   lock = 1;
   setTimeout(() => { for(const z of [a, b]){ z.textContent = "?"; z.classList.remove("up"); } a = null; lock = 0; }, 700);
  }
 };
}

/* ===== Letterina ===== */
q("#ltr").innerHTML = LETTERA.map(p => `<p>${p}</p>`).join("") + (NOME ? `<p class="fm">${NOME}</p>` : "");
q("#openLett").onclick = () => { q("#envb").hidden = false; q("#ltr").hidden = true; q("#lett").showModal(); };
q("#envb").onclick = () => { q("#envb").hidden = true; q("#ltr").hidden = false; };
})();
