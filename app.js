/* ============================================================
   APP.JS — Portfolio logic for Nilesh Nitin Bhondave
   ============================================================ */

let CMDS = {};

window.addEventListener('DOMContentLoaded', () => {
  startMatrix();
  initCursor();
  startClock();
  setLoad(10, 'Fetching operator profile...');
  setTimeout(() => setLoad(50, 'Decrypting data...'), 200);
  setTimeout(() => { setLoad(80, 'Rendering interface...'); render(DATA); }, 500);
  setTimeout(() => setLoad(100, 'BREACH COMPLETE'), 800);
  setTimeout(hideLoader, 1100);
});

function setLoad(pct, msg) {
  document.getElementById('ls-bar').style.width = pct + '%';
  document.getElementById('ls-msg').textContent = msg;
}
function hideLoader() {
  const ls = document.getElementById('loading-screen');
  ls.classList.add('hidden');
  setTimeout(() => ls.remove(), 600);
}

/* ── RENDER ── */
function render(D) {
  const id = D.identity || {};
  typeBio(id.bio || '');
  buildBoot(id.alias);

  // Stats
  const statsEl = document.getElementById('hero-stats');
  statsEl.innerHTML = '';
  (D.stats || []).forEach(s => {
    const d = document.createElement('div');
    d.className = 'hstat';
    d.innerHTML = `<span class="hstat-n">${s.value}</span><span class="hstat-l">${s.label}</span>`;
    statsEl.appendChild(d);
  });

  renderAbout(id, D.education || []);
  renderSkills(D.skills || []);
  renderProjects(D.projects || []);
  renderEducation(D.education || []);
  renderAchievements(D.achievements || []);
  renderCerts(D.certifications || []);
  renderExperience(D.experience || []);
  renderResume(D);
  renderContact(D.social || []);
  buildCmds(D);
  heroSplash();
  initReveal();
  initHovers();
}

/* ── BOOT SEQUENCE ── */
function buildBoot(alias) {
  const el = document.getElementById('boot-seq');
  el.innerHTML = '';
  [
    [`Initializing kernel 6.6.9-amd64`,  'ok'],
    [`Loading exploit-db signatures`,     'ok'],
    [`Mounting /dev/${alias}-fs`,         'ok'],
    [`Starting NetworkManager`,           'ok'],
    [`IDS/IPS evasion mode ON`,           'warn'],
    [`Red Team environment ready`,        'ok'],
  ].forEach(([t, c], i) => {
    const d = document.createElement('div');
    d.className = `boot-line ${c}`;
    d.textContent = t;
    d.style.animationDelay = `${i * .12}s`;
    el.appendChild(d);
  });
}

function typeBio(bio) {
  const el = document.getElementById('typed-bio');
  let i = 0;
  function type() { if (i < bio.length) { el.textContent += bio[i++]; setTimeout(type, 18); } }
  setTimeout(type, 1400);
}

/* ── ABOUT ── */
function renderAbout(id, edu) {
  const el = document.getElementById('about-term');
  const primary = edu[0] || {};
  const rows = [
    { p:true,  t:`cat /home/${id.alias}/.profile` },
    { p:false, t:'' },
    { p:false, t:`NAME     : ${id.name}` },
    { p:false, t:`ALIAS    : @${id.alias}`, hl:true },
    { p:false, t:`ROLE     : ${id.title}` },
    { p:false, t:`LOCATION : ${id.location}` },
    { p:false, t:`COLLEGE  : ${primary.institution || ''}` },
    { p:false, t:`DEGREE   : ${primary.degree || ''}` },
    { p:false, t:`BATCH    : ${primary.year || ''} | ${primary.score || ''}`, hl:true },
    { p:false, t:'' },
    { p:true,  t:'id' },
    { p:false, t:`uid=1337(${id.alias}) gid=1337(redteam) groups=1337(redteam),0(root)` },
    { p:false, t:'' },
    { cursor:true },
  ];
  el.innerHTML = '';
  rows.forEach(r => {
    if (r.cursor) { const s = document.createElement('span'); s.className = 'cursor-blink'; el.appendChild(s); return; }
    const d = document.createElement('div');
    if (r.p) {
      d.className = 'atl';
      d.innerHTML = `<span class="atp">┌──(${id.alias}㉿kali)-[~]<br>└─$ </span><span style="color:#eeffee;font-weight:700">${r.t}</span>`;
    } else {
      d.className = 'ato'; d.textContent = r.t;
      if (r.hl) d.style.color = 'var(--g)';
    }
    el.appendChild(d);
  });

  // Info grid
  const ig = document.getElementById('info-grid');
  ig.innerHTML = '';
  [
    [`// Email`,     `<a href="mailto:${id.email}">${id.email}</a>`],
    [`// Phone`,     `<a href="tel:${id.phone}">${id.phone}</a>`],
    [`// LinkedIn`,  `<a href="${id.linkedin}" target="_blank">linkedin.com/in/nilesh-b</a>`],
    [`// GitHub`,    `<a href="${id.github}" target="_blank">github.com/nilesh925</a>`],
    [`// TryHackMe`, `<a href="${id.tryhackme}" target="_blank">@ExploitNilX</a>`],
    [`// Status`,    `<span style="color:var(--g)">${id.status}</span>`],
  ].forEach(([l, v]) => {
    const d = document.createElement('div');
    d.className = 'ic';
    d.innerHTML = `<div class="ic-l">${l}</div><div class="ic-v">${v}</div>`;
    ig.appendChild(d);
  });
}

/* ── SKILLS ── */
function renderSkills(skills) {
  const el = document.getElementById('skills-grid');
  el.innerHTML = '';
  skills.forEach(s => {
    const d = document.createElement('div');
    d.className = 'skcat reveal';
    d.innerHTML = `<div class="skcat-bar"></div><div class="skcat-t">// ${s.cat}</div>
      <div class="sktags">${(s.tags || []).map(t => `<span class="skt">${t}</span>`).join('')}</div>`;
    el.appendChild(d);
  });
}

/* ── PROJECTS ── */
function renderProjects(projects) {
  const el = document.getElementById('proj-grid');
  el.innerHTML = '';
  projects.forEach((p, i) => {
    const d = document.createElement('div');
    d.className = 'pc reveal';
    d.innerHTML = `<div class="pc-num">0${i + 1}</div>
      <div class="pc-tag">// ${p.tag}</div>
      <div class="pc-t">${p.title}</div>
      <div class="pc-date" style="font-size:.65rem;color:var(--g);letter-spacing:2px;margin-bottom:8px;font-weight:700">${p.date || ''}</div>
      <div class="pc-d">${p.desc}</div>
      <div class="ptags">${(p.tech || []).map(t => `<span class="pt">${t}</span>`).join('')}</div>
      ${p.link ? `<a href="${p.link}" target="_blank" class="pc-link">↗ VIEW PROJECT</a>` : ''}`;
    el.appendChild(d);
  });
}

/* ── EDUCATION ── */
function renderEducation(edu) {
  const el = document.getElementById('edu-list');
  el.innerHTML = '';
  edu.forEach((e, i) => {
    const d = document.createElement('div');
    d.className = 'edu-item reveal';
    d.innerHTML = `
      <div class="edu-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="edu-body">
        <div class="edu-inst">${e.institution}</div>
        <div class="edu-deg">${e.degree}</div>
        <div class="edu-meta">
          <span class="edu-year">${e.year}</span>
          <span class="edu-score">${e.score}</span>
        </div>
      </div>`;
    el.appendChild(d);
  });
}

/* ── ACHIEVEMENTS ── */
function renderAchievements(ach) {
  const el = document.getElementById('ach-list');
  el.innerHTML = '';
  ach.forEach(a => {
    const d = document.createElement('div');
    d.className = `ai reveal${a.hot ? ' hot' : ''}`;
    d.innerHTML = `<div class="ai-sweep"></div><div class="ai-underline"></div>
      <div class="ai-rank">${a.rank}</div>
      <div class="ai-info">
        <div class="ai-t">${a.title}${a.isNew ? '<span class="new-pill">NEW</span>' : ''}</div>
        <div class="ai-m">${a.meta}</div>
      </div>
      <div class="ai-badge">${a.badge}</div>`;
    el.appendChild(d);
  });
}

/* ── CERTIFICATIONS ── */
function renderCerts(certs) {
  const el = document.getElementById('certs-grid');
  el.innerHTML = '';
  certs.forEach(c => {
    const a = document.createElement('a');
    a.className = 'cc reveal';
    if (c.link) { a.href = c.link; a.target = '_blank'; }
    a.innerHTML = `<div class="cc-dot${c.ongoing ? ' ng' : ''}"></div>
      <div class="cc-id">${c.id}${c.ongoing ? ' · IN PROGRESS' : ''}</div>
      <div class="cc-name">${c.name}</div>
      <div class="cc-iss">${c.issuer} · ${c.date}</div>
      ${c.link ? '<div class="cc-hint">↗ VIEW CERT</div>' : ''}`;
    el.appendChild(a);
  });
}

/* ── EXPERIENCE ── */
function renderExperience(exp) {
  const el = document.getElementById('exp-timeline');
  el.innerHTML = '';
  exp.forEach(e => {
    const d = document.createElement('div');
    d.className = 'ti reveal';
    d.innerHTML = `<div class="ti-d">${e.date}</div>
      <div class="ti-t">${e.title}</div>
      <div class="ti-c">// ${e.company}</div>
      <ul class="ti-pts">${(e.points || []).map(p => `<li>${p}</li>`).join('')}</ul>`;
    el.appendChild(d);
  });
}

/* ── RESUME ── */
function renderResume(D) {
  const id = D.identity || {};
  const highlights = [
    { label: 'ROLE',     value: id.title },
    { label: 'LOCATION', value: id.location },
    { label: 'CERTS',    value: (D.certifications || []).length + ' Active' },
    { label: 'CTF',      value: '1st Place — Hierro CTF' },
    { label: 'COLLEGE',  value: (D.education || [])[0]?.institution || '' },
    { label: 'CGPA',     value: (D.education || [])[0]?.score || '' },
  ];
  const el = document.getElementById('resume-highlights');
  el.innerHTML = '';
  highlights.forEach(h => {
    const d = document.createElement('div');
    d.className = 'ic';
    d.innerHTML = `<div class="ic-l">// ${h.label}</div><div class="ic-v">${h.value}</div>`;
    el.appendChild(d);
  });
}

/* ── CONTACT ── */
function renderContact(social) {
  const el = document.getElementById('contact-links');
  el.innerHTML = '';
  social.forEach(s => {
    const a = document.createElement('a');
    a.className = 'clink';
    a.href = s.href || '#';
    if (s.href && !s.href.startsWith('mailto') && !s.href.startsWith('tel')) a.target = '_blank';
    a.textContent = s.label;
    el.appendChild(a);
  });
}

/* ── TERMINAL COMMANDS ── */
function buildCmds(D) {
  const id  = D.identity  || {};
  const edu = D.education || [];
  CMDS = {
    help: `<span class="tl g">╔══════════════════════════════════════════╗</span>
<span class="tl g">║   EXPLOITNILX SHELL v1.0 — COMMANDS     ║</span>
<span class="tl g">╚══════════════════════════════════════════╝</span>
<span class="tl"> </span>
<span class="tl"> <span style="color:var(--g)">whoami     </span> operator profile</span>
<span class="tl"> <span style="color:var(--g)">skills     </span> technical arsenal</span>
<span class="tl"> <span style="color:var(--g)">certs      </span> certifications</span>
<span class="tl"> <span style="color:var(--g)">ctf        </span> achievements & CTF wins</span>
<span class="tl"> <span style="color:var(--g)">experience </span> work history</span>
<span class="tl"> <span style="color:var(--g)">education  </span> academic background</span>
<span class="tl"> <span style="color:var(--g)">contact    </span> reach out</span>
<span class="tl"> <span style="color:var(--g)">nmap       </span> port scan demo</span>
<span class="tl"> <span style="color:var(--g)">neofetch   </span> system info</span>
<span class="tl"> <span style="color:var(--g)">hack       </span> try to pwn me</span>
<span class="tl"> <span style="color:var(--g)">clear      </span> clear terminal</span>
<span class="tl"> </span>`,

    whoami: `<span class="tl"> </span>
<span class="tl g">[ OPERATOR — @${id.alias} ]</span>
<span class="tl"> </span>
<span class="tl"> NAME   : ${id.name}</span>
<span class="tl"> ROLE   : ${id.title}</span>
<span class="tl"> LOC    : ${id.location}</span>
<span class="tl"> MAIL   : ${id.email}</span>
<span class="tl"> PHONE  : ${id.phone}</span>
<span class="tl"> STATUS : <span style="color:var(--g)">${id.status}</span></span>
<span class="tl"> </span>
<span class="tl d"> ${id.bio}</span>
<span class="tl"> </span>`,

    skills: `<span class="tl"> </span>
<span class="tl g">[ ARSENAL ]</span>
<span class="tl"> </span>
${(D.skills || []).map(s =>
  `<span class="tl"> <span style="color:var(--cyan)">${s.cat.padEnd(20)}</span> ${(s.tags || []).join(' · ')}</span>`
).join('\n')}
<span class="tl"> </span>`,

    certs: `<span class="tl"> </span>
<span class="tl g">[ CERTIFICATIONS — ${(D.certifications || []).length} ]</span>
<span class="tl"> </span>
${(D.certifications || []).map(c =>
  `<span class="tl"> [${c.ongoing ? '~' : '✓'}] <span style="color:var(--g)">${c.name}</span> — ${c.issuer} · ${c.date}</span>`
).join('\n')}
<span class="tl"> </span>`,

    ctf: `<span class="tl"> </span>
<span class="tl g">[ ACHIEVEMENTS & CTF RECORD ]</span>
<span class="tl"> </span>
${(D.achievements || []).map(a =>
  `<span class="tl"> <span style="color:${a.hot ? 'var(--red)' : 'var(--g)'}">${a.rank.padEnd(8)}</span> ${a.title}</span>`
).join('\n')}
<span class="tl"> </span>`,

    experience: `<span class="tl"> </span>
<span class="tl g">[ EXPERIENCE ]</span>
<span class="tl"> </span>
${(D.experience || []).map(e =>
  `<span class="tl"> <span style="color:var(--g)">${e.title}</span> — ${e.company}</span>\n<span class="tl d">   ${e.date}</span>`
).join('\n')}
<span class="tl"> </span>`,

    education: `<span class="tl"> </span>
<span class="tl g">[ EDUCATION ]</span>
<span class="tl"> </span>
${edu.map(e =>
  `<span class="tl"> <span style="color:var(--g)">${e.institution}</span></span>\n<span class="tl d">   ${e.degree} · ${e.year} · ${e.score}</span>`
).join('\n')}
<span class="tl"> </span>`,

    contact: `<span class="tl"> </span>
<span class="tl g">[ CONTACT ]</span>
<span class="tl"> </span>
${(D.social || []).map(s =>
  `<span class="tl"> ${s.label.padEnd(16)} <span style="color:var(--g)">${s.href.replace('mailto:', '').replace('tel:', '')}</span></span>`
).join('\n')}
<span class="tl"> </span>`,

    neofetch: `<span class="tl g">  .---.  </span>
<span class="tl g"> (o o o) </span><span class="tl" style="display:inline"> ExploitNilX@kali</span>
<span class="tl g">  | O |  </span><span class="tl" style="display:inline"> OS: Kali Linux x86_64</span>
<span class="tl g">   \\ /   </span><span class="tl" style="display:inline"> Kernel: 6.6.9-amd64</span>
<span class="tl">          Role: ${id.title}</span>
<span class="tl">          Certs: ${(D.certifications || []).length} Active</span>
<span class="tl">          CTF: 1st Place — Hierro CTF</span>
<span class="tl">          THM: Top 2% Global</span>
<span class="tl">          Status: <span style="color:var(--g)">${id.status}</span></span>
<span class="tl"> </span>`,

    nmap: `<span class="tl w">Starting Nmap 7.94</span>
<span class="tl">Scan: portfolio.exploitnilx.io (127.0.0.1)</span>
<span class="tl"> </span>
<span class="tl">22/tcp   open  ssh</span>
<span class="tl">80/tcp   open  http</span>
<span class="tl">443/tcp  open  https</span>
<span class="tl">1337/tcp open  <span style="color:var(--g)">redteam — @ExploitNilX</span></span>
<span class="tl"> </span>
<span class="tl g">Scan complete. 1 host up.</span>
<span class="tl"> </span>`,

    hack: `<span class="tl"> </span>
<span class="tl w">BREACH ATTEMPT: portfolio.exploitnilx.io</span>
<span class="tl"> </span>
<span class="tl">[▓▓▓▓░░░░░░░░] 20% — scanning...</span>
<span class="tl">[▓▓▓▓▓▓▓▓░░░░] 60% — exploiting...</span>
<span class="tl">[▓▓▓▓▓▓▓▓▓▓▓▓] 100%</span>
<span class="tl"> </span>
<span class="tl r">CRITICAL: HONEYPOT TRIGGERED</span>
<span class="tl r">CRITICAL: IP LOGGED + REPORTED TO DRDO</span>
<span class="tl"> </span>
<span class="tl g">Nice try. I'm the one doing the hacking. 😏</span>
<span class="tl g">— @ExploitNilX | 1st Place Hierro CTF</span>
<span class="tl"> </span>`,
  };
}

/* ── TERMINAL ENGINE ── */
function termPrint(el, html) {
  const s = document.createElement('span');
  s.innerHTML = html;
  el.appendChild(s);
  el.scrollTop = el.scrollHeight;
}

function termCmd(el, cmd) {
  const clean = cmd.trim().toLowerCase();
  const echo = document.createElement('div');
  echo.innerHTML = `<span class="tl" style="color:#d8ffd8">┌──(ExploitNilX㉿kali)-[~]<br>└─$ ${clean}</span>`;
  el.appendChild(echo);
  if (clean === 'clear') { el.innerHTML = ''; return; }
  if (CMDS[clean]) { termPrint(el, CMDS[clean]); }
  else if (clean === '') {}
  else { termPrint(el, `<span class="tl r">bash: ${clean}: command not found</span>\n<span class="tl d">Type 'help' to list commands.</span>\n<span class="tl"> </span>`); }
  el.scrollTop = el.scrollHeight;
}

const heroBody  = document.getElementById('hero-term-body');
const heroInput = document.getElementById('hero-term-input');

function heroSplash() {
  termPrint(heroBody,
`<span class="tl g"> ███╗   ██╗██╗██╗     ███████╗███████╗██╗  ██╗</span>
<span class="tl g"> ████╗  ██║██║██║     ██╔════╝██╔════╝╚██╗██╔╝</span>
<span class="tl g"> ██╔██╗ ██║██║██║     █████╗  ███████╗ ╚███╔╝ </span>
<span class="tl g"> ██║╚██╗██║██║██║     ██╔══╝  ╚════██║ ██╔██╗ </span>
<span class="tl g"> ██║ ╚████║██║███████╗███████╗███████║██╔╝ ██╗</span>
<span class="tl g"> ╚═╝  ╚═══╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝</span>
<span class="tl"> </span>
<span class="tl"> Kali Linux 2024.1 — ExploitNilX@redteam</span>
<span class="tl d"> Type <span style="color:var(--g)">help</span> to see commands.</span>
<span class="tl"> </span>`);
}

function heroExec(cmd) { heroInput.value = ''; termCmd(heroBody, cmd); }
heroInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') { const v = heroInput.value; heroInput.value = ''; termCmd(heroBody, v); }
});
document.querySelector('.hero-right').addEventListener('click', () => heroInput.focus());

// Floating terminal
const ftBody  = document.getElementById('ft-body');
const ftInput = document.getElementById('ft-input');
let ftOpen = false, ftHist = [], ftIdx = -1;

function toggleFloat() {
  ftOpen = !ftOpen;
  document.getElementById('float-term').classList.toggle('open', ftOpen);
  if (ftOpen) {
    if (!ftBody.children.length) {
      termPrint(ftBody, `<span class="tl g"> ExploitNilX@kali — terminal</span>\n<span class="tl d"> Type <span style="color:var(--g)">help</span> to list commands.</span>\n<span class="tl"> </span>`);
    }
    setTimeout(() => ftInput.focus(), 100);
  }
}

function ftExec(cmd) { ftInput.value = ''; termCmd(ftBody, cmd); ftInput.focus(); }

ftInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const v = ftInput.value;
    if (v.trim()) { ftHist.unshift(v); ftIdx = -1; }
    ftInput.value = ''; termCmd(ftBody, v); ftInput.focus();
  }
  if (e.key === 'ArrowUp')   { e.preventDefault(); if (ftIdx < ftHist.length - 1) { ftIdx++; ftInput.value = ftHist[ftIdx]; } }
  if (e.key === 'ArrowDown') { e.preventDefault(); if (ftIdx > 0) { ftIdx--; ftInput.value = ftHist[ftIdx]; } else { ftIdx = -1; ftInput.value = ''; } }
  if (e.key === 'Tab') {
    e.preventDefault();
    const cmds = Object.keys(CMDS).concat(['clear']);
    const p = ftInput.value.trim().toLowerCase();
    const m = cmds.filter(c => c.startsWith(p));
    if (m.length === 1) ftInput.value = m[0];
    else if (m.length > 1) termPrint(ftBody, `<span class="tl d">${m.join('  ')}</span>`);
  }
});

// Drag + resize
(() => {
  const el = document.getElementById('float-term');
  const drag = document.getElementById('ft-drag');
  const resz = document.getElementById('ft-resize');
  let dX, dY, rW, rH, rMX, rMY, dragging = false, resizing = false;
  drag.addEventListener('mousedown', e => {
    if (e.target.classList.contains('ft-dot') || e.target.classList.contains('ft-act')) return;
    dragging = true; dX = e.clientX - el.offsetLeft; dY = e.clientY - el.offsetTop; el.style.transition = 'none';
  });
  resz.addEventListener('mousedown', e => {
    resizing = true; rW = el.offsetWidth; rH = el.offsetHeight; rMX = e.clientX; rMY = e.clientY; e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (dragging) {
      el.style.left = Math.max(0, Math.min(e.clientX - dX, innerWidth - el.offsetWidth)) + 'px';
      el.style.top  = Math.max(34, Math.min(e.clientY - dY, innerHeight - el.offsetHeight)) + 'px';
      el.style.right = 'auto';
    }
    if (resizing) {
      el.style.width  = Math.max(360, rW + (e.clientX - rMX)) + 'px';
      el.style.height = Math.max(240, rH + (e.clientY - rMY)) + 'px';
    }
  });
  document.addEventListener('mouseup', () => { dragging = false; resizing = false; el.style.transition = ''; });
})();

/* ── CONTACT FORM ── */
async function sendMessage() {
  const btn     = document.getElementById('cf-btn');
  const res     = document.getElementById('cf-result');
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  if (!name || !email || !message) {
    res.className = 'cf-msg err'; res.style.display = 'block';
    res.textContent = '⚠ Please fill in name, email, and message.'; return;
  }
  btn.disabled = true; btn.textContent = 'SENDING...';
  // TODO: replace with your Formspree / EmailJS / backend endpoint
  await new Promise(r => setTimeout(r, 800));
  res.className = 'cf-msg ok'; res.style.display = 'block';
  res.textContent = '✓ Message sent! I will get back to you soon.';
  ['cf-name','cf-email','cf-subject','cf-message'].forEach(id => document.getElementById(id).value = '');
  btn.disabled = false; btn.textContent = 'SEND MESSAGE ↗';
}

/* ── AMBIENT ── */
function startMatrix() {
  const cv = document.getElementById('matrix-canvas'), cx = cv.getContext('2d');
  function resize() { cv.width = innerWidth; cv.height = innerHeight; }
  resize(); window.addEventListener('resize', resize);
  const chars = 'アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';
  const fs = 13; let drops = [];
  function initD() { drops = Array(Math.floor(cv.width / fs)).fill(1); }
  initD(); window.addEventListener('resize', initD);
  setInterval(() => {
    cx.fillStyle = 'rgba(0,0,0,.055)'; cx.fillRect(0, 0, cv.width, cv.height);
    drops.forEach((y, i) => {
      const c = chars[Math.floor(Math.random() * chars.length)];
      cx.fillStyle = Math.random() > .97 ? '#aaffaa' : '#00ff41';
      cx.font = fs + 'px JetBrains Mono,monospace';
      cx.fillText(c, i * fs, y * fs);
      if (y * fs > cv.height && Math.random() > .975) drops[i] = 0;
      drops[i]++;
    });
  }, 55);
}

function initCursor() {
  const ring = document.getElementById('cursor-ring'), dot = document.getElementById('cursor-dot');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
  (function loop() { rx += (mx - rx) * .15; ry += (my - ry) * .15; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop); })();
}

function initHovers() {
  document.querySelectorAll('a,button,.skt,.cc,.ai,.pc,.hstat,.kpill,.ic,.hbtn,.edu-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

function startClock() {
  const el = document.getElementById('tb-clock');
  const tick = () => el.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
  tick(); setInterval(tick, 1000);
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 60); });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function smoothTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }

document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.altKey && e.key === 't') { e.preventDefault(); toggleFloat(); }
  if (e.key === 'Escape' && ftOpen) toggleFloat();
});
