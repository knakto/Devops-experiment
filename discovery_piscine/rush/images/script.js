const KEYS = Object.keys(groups);
const PAIRS = 20;
// groups.js stores cats as objects; the code below reads them as [name, trait, fur, eye, ear, pattern, patternColor, longHair, eye2]
KEYS.forEach(key => { groups[key].cats = groups[key].cats.map(cat => Array.isArray(cat) ? cat : [cat.name, cat.trait, cat.fur, cat.eye, cat.ear, cat.pattern, cat.patternColor, cat.longHair, cat.eye2]); });
// Shorthand for document.getElementById
const $ = id => document.getElementById(id);

// Photo: images/cats/<group>-<n>.jpg
function photo(cat) {
  const img = new Image();
  img.alt = cat[0];
  img.className = "mh-card__photo";
  img.src = `images/cats/${cat.group}-${cat.idx}.jpg`;
  return img;
}





function shuffle(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[array[i], array[j]] = [array[j], array[i]]; } return array; }

let pools, scores, pair, current, picks, locked = false;

// Reset game state: shuffle each group's cats into its own pool (tagged with group + photo index), zero the scores and picks, restart the pair counter
function buildPools() {
  pools = {}; scores = {}; picks = [];
  KEYS.forEach(key => {
    pools[key] = shuffle(groups[key].cats.map((cat, index) => Object.assign([...cat], { group: key, idx: index + 1 })));
    scores[key] = 0;
    
  });
  pair = 0;
}

// Two groups with the most cats left, one cat from each → never same-group, uses all 40
function nextPair() {
  const order = shuffle([...KEYS]).sort((keyA, keyB) => pools[keyB].length - pools[keyA].length);
  const p = [pools[order[0]].pop(), pools[order[1]].pop()];
  return Math.random() < .5 ? p : [p[1], p[0]];
}

// Render one choice card: photo, name, trait and the keyboard hint (A ← / B →)
function fillCard(el, cat, key) {
  el.className = "mh-card";
  el.innerHTML = "";
  el.append(photo(cat));
  const body = document.createElement("span");
  body.className = "mh-card__body";
  body.innerHTML = `<span class="mh-card__name">${cat[0]}</span><span class="mh-card__trait">${cat[1]}</span><span class="mh-card__key">${key}</span>`;
  el.append(body);
  el.setAttribute("aria-label", `${cat[0]} — ${cat[1]}`);
}

// Draw the next pair of cats into cards A and B, update the pair label and progress bar, and unlock input
function showPair() {
  current = nextPair();
  fillCard($("cardA"), current[0], "A ←");
  fillCard($("cardB"), current[1], "B →");
  $("pairLabel").textContent = `คู่ที่ ${pair + 1} / ${PAIRS}`;
  $("progFill").style.width = (pair / PAIRS * 100) + "%";
  $("progTrack").setAttribute("aria-valuenow", pair);
  locked = false;
}

// Handle a pick (side 0 = left, 1 = right): score the cat's group, record it, then after a short delay show the next pair or finish. Ignored while locked or when the test isn't visible
function choose(side) {
  if (locked || $("test").hidden) return;
  locked = true;
  const cat = current[side];
  scores[cat.group]++;
  console.log(`Pair ${pair + 1}: ${cat[0]} (${cat.group}) chosen, score = ${scores[cat.group]}`);
  picks.push(cat);
  pair++;
  const el = side ? $("cardB") : $("cardA");
  el.classList.add("is-chosen");
  $("progFill").style.width = (pair / PAIRS * 100) + "%";
  setTimeout(() => pair >= PAIRS ? finish() : showPair(), 320);
}

// Return the group keys sorted from highest to lowest score
function rank(groupScores) { return [...KEYS].sort((keyA, keyB) => groupScores[keyB] - groupScores[keyA]); }

// End of the test: find the top-scoring group(s) (ties allowed), save the result, and show the result screen
function finish() {
  const order = rank(scores);
  const top = scores[order[0]];
  const winners = order.filter(key => scores[key] === top);

  saveResult({ scores, winners, at: Date.now() });
  renderResult(scores, winners, picks);
  show("result");
}

// Ranked list, no chart: rank · group name · points (ties share a rank)
function scoreRows(groupScores, winners, useShort) {
  let prev = null, currentRank = 0;
  return rank(groupScores).map((key, index) => {
    if (groupScores[key] !== prev) { currentRank = index + 1; prev = groupScores[key]; }
    return `<li class="mh-score${winners.includes(key) ? " is-winner" : ""}">
      <span class="mh-score__rank">${currentRank}</span>
      <span class="mh-score__name">${useShort ? groups[key].short : groups[key].name}</span>
      <span class="mh-score__value"><b>${groupScores[key]}</b> คะแนน</span></li>`;
  }).join("");
}

// Fill the result screen: winning group name(s) and description, score list, and the cats the user picked from the winning group(s)
function renderResult(groupScores, winners, picked) {
  const tie = winners.length > 1; groups
  $("winTitle").innerHTML = winners.map(key => `<span style="color:var(${groups[key].color})">${groups[key].name}</span>`).join(tie ? "<br>" : "");
  $("winDesc").textContent = tie
    ? `เสมอกัน ${winners.length} กลุ่ม คุณชอบแมวหลายแบบเท่าๆ กัน ` + groups[winners[0]].desc
    : groups[winners[0]].desc;
  $("scores").innerHTML = scoreRows(groupScores, winners, false);
  $("pickedTitle").textContent = tie ? "แมวที่คุณเลือกในกลุ่มที่ชนะ" : "แมวที่คุณเลือกในกลุ่มนี้";
  const box = $("picked"); box.innerHTML = "";
  picked.filter(cat => winners.includes(cat.group)).forEach(cat => {
    const mini = document.createElement("div"); mini.className = "mini";  // Script สำหรับสลับ Theme Light / Dark
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');

    themeToggleBtn?.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '🌙';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '☀️';
      }
    });
    mini.append(photo(cat));
    const text = document.createElement("div"); text.innerHTML = `${cat[0]}<small>${cat[1]}</small>`;
    mini.append(text); box.append(mini);
  });
}

// Store the last result in localStorage, plus a cookie backup (each silently ignored if unavailable)
function saveResult(result) {
  const json = JSON.stringify(result);
  try { localStorage.setItem("meowHavenLast", json); } catch (error) { }
  // Backup copy in a cookie (1 year) in case localStorage is cleared or unavailable
  try { document.cookie = `meowHavenLast=${encodeURIComponent(json)}; max-age=31536000; path=/; SameSite=Lax`; } catch (error) { }
}
// Read the backup cookie, or null if absent
function readCookie() {
  const match = document.cookie.split("; ").find(part => part.startsWith("meowHavenLast="));
  return match ? JSON.parse(decodeURIComponent(match.slice("meowHavenLast=".length))) : null;
}
// Read the last saved result from localStorage, falling back to the cookie; null if neither is readable
function loadResult() {
  try { const stored = JSON.parse(localStorage.getItem("meowHavenLast")); if (stored) return stored; } catch (error) { }
  try { return readCookie(); } catch (error) { return null; }
}

// Intro panel: show the previous result if there is one, otherwise the how-to-play instructions
function renderLast() {
  const result = loadResult();
  const panel = $("lastPanel");
  if (result && result.scores && result.winners) {
    panel.innerHTML = `<h2>ผลครั้งก่อน</h2><p>คุณชอบแมว ${result.winners.map(key => `<b style="color:var(${groups[key].color})">${groups[key].name}</b>`).join(" และ ")} มากที่สุด</p>
      <ol class="scores">${scoreRows(result.scores, result.winners, true)}</ol>`;
  } else {
    panel.innerHTML = `<h2>เล่นยังไง</h2><p>ใช้เวลาประมาณ 1 นาที</p>
      <ol class="rules"><li>แมวจะขึ้นมาทีละคู่ เลือกตัวที่ชอบมากกว่า</li><li>คลิกการ์ด หรือกด A / B หรือ ← →</li><li>ครบ 20 คู่ ระบบจะบอกว่าคุณชอบแมวกลุ่มไหน</li></ol>`;
  }
}

// Build the breeds section: one column per group listing its cats and traits
function renderBreeds() {
  $("breedGrid").innerHTML = KEYS.map(key => `<div class="breed-col"><h3><i style="background:var(${groups[key].color})"></i>${groups[key].name}</h3>
    <ul>${groups[key].cats.map(cat => `<li>${cat[0]}<span>${cat[1]}</span></li>`).join("")}</ul></div>`).join("");
}

// Build the four group cards: cover photo (first cat), name and the group's description
function renderGroups() {
  $("groupGrid").innerHTML = KEYS.map(key => `<article class="group-card">
    <img src="images/cats/${key}-1.jpg" alt="">
    <div><h3><i style="background:var(${groups[key].color})"></i>${groups[key].name}</h3><p>${groups[key].desc}</p></div>
  </article>`).join("");
}

// Show one screen (intro / test / result), hide the others, scroll to top
function show(id) {
  ["intro", "test", "result"].forEach(section => $(section).hidden = section !== id);
  window.scrollTo(0, 0);
}

// Begin a new test: reset the pools and show the first pair
function start() { buildPools(); showPair(); show("test"); }

// Delegated click handler for [data-go] links: start the test, or return to the intro (jumping to the link's #section if it has one)
document.addEventListener("click", event => {
  const go = event.target.closest("[data-go]");
  if (!go) return;
  event.preventDefault();
  if (go.dataset.go === "test") return start();
  renderLast();
  show("intro");
  const target = go.hash && document.querySelector(go.hash);
  if (target && go.hash !== "#intro") target.scrollIntoView();
});
$("startBtn").addEventListener("click", start);
$("againBtn").addEventListener("click", start);
$("cardA").addEventListener("click", () => choose(0));
$("cardB").addEventListener("click", () => choose(1));
// Keyboard shortcuts: A / ← picks the left card, B / → picks the right card (ignored while typing in a field)
document.addEventListener("keydown", event => {
  if (event.target.closest && event.target.closest("input,textarea")) return;
  const key = event.key.toLowerCase();
  if (key === "a" || key === "arrowleft") choose(0);
  if (key === "b" || key === "arrowright") choose(1);
});

// Initial page setup
renderBreeds();
renderGroups();
renderLast();
show("intro");

// Theme toggle (light / dark). With no explicit choice yet, start from the system preference so the first click always flips what's on screen
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
}
themeToggleBtn?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme')
    || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(current === 'light' ? 'dark' : 'light'); // not set them defult is dark . 
});
applyTheme(matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

// Card nav open/close
(function () {
  var nav = document.getElementById('cardNav'), btn = document.getElementById('cnBurger'), cards = document.getElementById('cnCards');
  function size() { nav.style.setProperty('--cn-h', (60 + cards.scrollHeight) + 'px'); }
  function set(o) { if (o) size(); nav.classList.toggle('is-open', o); btn.setAttribute('aria-expanded', o); btn.setAttribute('aria-label', o ? 'ปิดเมนู' : 'เปิดเมนู'); }
  btn.addEventListener('click', function () { set(!nav.classList.contains('is-open')); });
  cards.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  window.addEventListener('resize', function () { if (nav.classList.contains('is-open')) size(); });
})();

