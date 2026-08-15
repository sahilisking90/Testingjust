/* nav.js — shared sidebar + mobile hamburger for all pages
   Include AFTER <body> opens. Pass current page as data-page on <body>
   e.g. <body data-page="analytics"> */
(function () {
  'use strict';

  var PAGES = [
    { href: '/api',        label: 'Endpoints',        icon: '<path d="M2 4h12M2 8h12M2 12h8"/>',                                                                 svgViewBox: '0 0 16 16' },
    { href: '/analytics',  label: 'Analytics',        icon: '<rect x="1" y="10" width="3" height="5" rx=".5"/><rect x="6" y="6" width="3" height="9" rx=".5"/><rect x="11" y="2" width="3" height="13" rx=".5"/>', svgViewBox: '0 0 16 16' },
    { href: '/db-manager', label: 'DB Manager',       icon: '<ellipse cx="8" cy="4" rx="6" ry="2"/><path d="M2 4v4c0 1.1 2.7 2 6 2s6-.9 6-2V4"/><path d="M2 8v4c0 1.1 2.7 2 6 2s6-.9 6-2V8"/>',                svgViewBox: '0 0 16 16' },
    { href: '/health',     label: 'Health Check',     icon: '<path d="M1 8h3l2-5 3 10 2-5h4"/>',                                                                 svgViewBox: '0 0 16 16' },
    { href: '/analytics/data', label: 'Raw JSON',     icon: '<rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 5h6M5 8h6M5 11h3"/>',                  svgViewBox: '0 0 16 16', blank: true },
  ];

  var CSS = `
  #nav-sidebar{
    width:240px;flex-shrink:0;background:rgba(13,17,23,.97);border-right:1px solid rgba(255,255,255,.07);
    display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:50;
    backdrop-filter:blur(20px);transition:transform .28s cubic-bezier(.4,0,.2,1);
  }
  #nav-sidebar.nav-hidden{transform:translateX(-100%)}
  .nav-logo{padding:1.4rem 1.25rem 1.1rem;border-bottom:1px solid rgba(255,255,255,.07)}
  .nav-logo-mark{display:flex;align-items:center;gap:.6rem;font-family:'JetBrains Mono',monospace;font-size:.72rem;font-weight:700;color:#a855f7;letter-spacing:.12em;text-transform:uppercase;margin-bottom:.5rem}
  .nav-diamond{width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg,#7c3aed,#a855f7);display:grid;place-items:center;flex-shrink:0;font-size:.7rem}
  .nav-owner{font-size:.75rem;color:#7d8590}
  .nav-channel{font-size:.7rem;color:#484f58;margin-top:.1rem}
  .nav-section{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:#484f58;padding:.9rem 1.1rem .4rem;font-weight:600}
  .nav-list{flex:1;padding:.4rem .6rem;overflow-y:auto}
  .nav-link{display:flex;align-items:center;gap:.65rem;padding:.52rem .75rem;border-radius:8px;font-size:.82rem;color:#7d8590;text-decoration:none;transition:background .15s,color .15s;cursor:pointer;margin-bottom:.1rem;border:none;background:none;width:100%;text-align:left}
  .nav-link svg{flex-shrink:0;opacity:.65;transition:opacity .15s}
  .nav-link:hover{background:#161b22;color:#e6edf3}
  .nav-link:hover svg{opacity:1}
  .nav-link.nav-active{background:rgba(124,58,237,.18);color:#a855f7;font-weight:500}
  .nav-link.nav-active svg{opacity:1}
  .nav-link .nav-badge{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:.6rem;color:#484f58;background:#1c2128;border:1px solid rgba(255,255,255,.07);border-radius:4px;padding:.1rem .4rem}
  .nav-live-dot{margin-left:auto;width:7px;height:7px;border-radius:50%;background:#3fb950;box-shadow:0 0 7px #3fb950;animation:nav-blink 2s ease-in-out infinite;flex-shrink:0}
  .nav-db-dot{margin-left:auto;width:7px;height:7px;border-radius:50%;background:#58a6ff;box-shadow:0 0 7px #58a6ff;animation:nav-blink 2s ease-in-out infinite;flex-shrink:0}
  @keyframes nav-blink{0%,100%{opacity:1}50%{opacity:.25}}
  .nav-footer{padding:.8rem 1.1rem;border-top:1px solid rgba(255,255,255,.07);font-family:'JetBrains Mono',monospace;font-size:.62rem;color:#484f58}

  /* hamburger */
  #nav-hamburger{
    display:none;position:fixed;top:.85rem;left:.85rem;z-index:60;
    width:38px;height:38px;border-radius:9px;cursor:pointer;
    background:rgba(13,17,23,.92);border:1px solid rgba(255,255,255,.1);
    backdrop-filter:blur(12px);align-items:center;justify-content:center;
    flex-direction:column;gap:4px;padding:0;
  }
  #nav-hamburger span{display:block;width:18px;height:2px;background:#a855f7;border-radius:2px;transition:all .25s}
  #nav-hamburger.open span:nth-child(1){transform:translateY(6px) rotate(45deg)}
  #nav-hamburger.open span:nth-child(2){opacity:0}
  #nav-hamburger.open span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
  #nav-overlay{display:none;position:fixed;inset:0;z-index:45;background:rgba(0,0,0,.55);backdrop-filter:blur(2px)}
  #nav-overlay.show{display:block}

  @media(max-width:860px){
    #nav-sidebar{transform:translateX(-100%)}
    #nav-sidebar.nav-open{transform:translateX(0)}
    #nav-hamburger{display:flex}
    .nav-main-offset{margin-left:0!important;padding-left:1.25rem!important;padding-right:1.25rem!important}
  }
  `;

  // inject CSS
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  // detect current page
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/api';

  // build sidebar HTML
  var linksHTML = PAGES.map(function (p) {
    var isActive = currentPath === p.href || (p.href !== '/api' && currentPath.startsWith(p.href));
    var dot = p.href === '/analytics' ? '<span class="nav-live-dot"></span>' : (p.href === '/db-manager' ? '<span class="nav-db-dot"></span>' : '');
    return (
      '<a class="nav-link' + (isActive ? ' nav-active' : '') + '" href="' + p.href + '"' + (p.blank ? ' target="_blank" rel="noopener"' : '') + '>' +
      '<svg width="15" height="15" viewBox="' + p.svgViewBox + '" fill="none" stroke="currentColor" stroke-width="1.5">' + p.icon + '</svg>' +
      p.label + dot +
      '</a>'
    );
  }).join('');

  var sidebarHTML =
    '<nav id="nav-sidebar">' +
    '<div class="nav-logo">' +
    '<div class="nav-logo-mark"><div class="nav-diamond">◈</div>OSINT Gateway</div>' +
    '<div class="nav-owner" id="nav-owner-txt">Loading…</div>' +
    '<div class="nav-channel" id="nav-channel-txt"></div>' +
    '</div>' +
    '<div class="nav-list">' +
    '<div class="nav-section">Navigation</div>' +
    linksHTML +
    '</div>' +
    '<div class="nav-footer" id="nav-footer-txt">Built by …</div>' +
    '</nav>' +
    '<div id="nav-overlay"></div>' +
    '<button id="nav-hamburger" aria-label="Toggle menu"><span></span><span></span><span></span></button>';

  // inject into body
  document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

  // add offset class to .main
  var mainEl = document.querySelector('.main') || document.querySelector('main');
  if (mainEl) mainEl.classList.add('nav-main-offset');

  // hamburger logic
  var sidebar   = document.getElementById('nav-sidebar');
  var overlay   = document.getElementById('nav-overlay');
  var hamburger = document.getElementById('nav-hamburger');

  function openNav()  { sidebar.classList.add('nav-open');  overlay.classList.add('show');  hamburger.classList.add('open');  }
  function closeNav() { sidebar.classList.remove('nav-open'); overlay.classList.remove('show'); hamburger.classList.remove('open'); }

  hamburger.addEventListener('click', function () {
    sidebar.classList.contains('nav-open') ? closeNav() : openNav();
  });
  overlay.addEventListener('click', closeNav);

  // load meta (owner/channel) from /meta
  fetch('/meta').then(function (r) { return r.json(); }).then(function (d) {
    var o = d.owner || '';
    var c = d.channel || '';
    document.getElementById('nav-owner-txt').textContent = o;
    document.getElementById('nav-channel-txt').textContent = c;
    document.getElementById('nav-footer-txt').textContent = 'Built by ' + o;
    // update page title
    if (o) document.title = document.title.replace('…', o).replace('Loading', o);
    // update ep badge if present
    var badge = document.querySelector('.nav-link[href="/api"] .nav-badge');
    if (badge && d.totalEndpoints) badge.textContent = d.totalEndpoints;
  }).catch(function () {});

})();
