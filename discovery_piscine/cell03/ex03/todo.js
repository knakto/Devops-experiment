
const KEY = "todo-v1";
const sample = [];
let tasks, filter = "all";
try { tasks = JSON.parse(localStorage.getItem(KEY)) || sample; } catch { tasks = sample; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(tasks)); } catch {} };
const order = { high: 0, med: 1, low: 2 };
const $ = id => document.getElementById(id);

$("today").textContent = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

function render() {
  const list = $("list");
  list.innerHTML = "";
  const shown = tasks.filter(t => filter === "all" || (filter === "done") === t.done)
    .sort((a, b) => a.done - b.done || order[a.prio] - order[b.prio]);
  if (!shown.length) {
    const li = document.createElement("li"); li.className = "empty"; li.style.display = "block";
    li.textContent = filter === "done" ? "Nothing finished yet." : "No tasks. Add one above.";
    list.append(li);
  }
  for (const t of shown) {
    const li = document.createElement("li");
    if (t.done) li.className = "done";
    const cb = Object.assign(document.createElement("input"), { type: "checkbox", className: "chk", checked: t.done, id: "c" + t.id });
    cb.setAttribute("aria-label", "Mark done");
    cb.onchange = () => { t.done = cb.checked; save(); render(); };
    const span = Object.assign(document.createElement("span"), { className: "txt", textContent: t.text });
    span.ondblclick = () => {
      const inp = Object.assign(document.createElement("input"), { type: "text", value: t.text, id: "e" + t.id });
      const commit = () => { const v = inp.value.trim(); if (v) t.text = v; save(); render(); };
      inp.onblur = commit; inp.onkeydown = e => { if (e.key === "Enter") commit(); if (e.key === "Escape") render(); };
      span.replaceWith(inp); inp.focus();
    };
    const pri = Object.assign(document.createElement("span"), { className: "pri " + t.prio, textContent: t.prio === "med" ? "Med" : t.prio });
    const del = Object.assign(document.createElement("button"), { className: "del", textContent: "×", type: "button" });
    del.setAttribute("aria-label", "Delete task");
    del.onclick = () => { tasks = tasks.filter(x => x !== t); save(); render(); };
    li.append(cb, span, pri, del);
    list.append(li);
  }
  const d = tasks.filter(t => t.done).length;
  $("doneN").textContent = d; $("totalN").textContent = tasks.length;
  $("fill").style.width = tasks.length ? (d / tasks.length * 100) + "%" : "0";
}

$("f").addEventListener("submit", e => {
  e.preventDefault();
  const v = $("task").value.trim(); if (!v) return;
  tasks.push({ id: Date.now(), text: v, prio: $("prio").value, done: false });
  $("task").value = ""; save(); render();
});



document.querySelectorAll(".tabs [data-f]").forEach(b => b.onclick = () => {
  filter = b.dataset.f;
  document.querySelectorAll(".tabs [data-f]").forEach(x => x.setAttribute("aria-pressed", x === b));
  render();
});
$("clear").onclick = () => { tasks = tasks.filter(t => !t.done); save(); render(); };
render();