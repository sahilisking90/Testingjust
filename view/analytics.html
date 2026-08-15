<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Analytics — OSINT Gateway</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<style>
:root{
  --bg:#030712;--surface:#0d1117;--surface2:#161b22;--surface3:#1c2128;
  --border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.12);
  --text:#e6edf3;--muted:#7d8590;--muted2:#58636d;
  --green:#3fb950;--red:#f85149;--blue:#58a6ff;
  --purple:#bc8cff;--amber:#e3b341;--cyan:#39d353;
  --accent:#7c3aed;--accent2:#a855f7;--glow:rgba(124,58,237,.15);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;-webkit-font-smoothing:antialiased;}
::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--surface3);border-radius:3px}
.layout{display:flex;min-height:100vh}
.main{margin-left:240px;flex:1;padding:1.5rem 1.75rem 3rem;max-width:100%}
.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.75rem;gap:1rem;flex-wrap:wrap}
.topbar h1{font-size:1.35rem;font-weight:600;letter-spacing:-.02em}
.topbar-right{display:flex;align-items:center;gap:.75rem;flex-wrap:wrap}
.status-dot{display:inline-flex;align-items:center;gap:.45rem;font-size:.75rem;color:var(--green);background:rgba(63,185,80,.1);border:1px solid rgba(63,185,80,.25);border-radius:999px;padding:.28rem .7rem}
.status-dot::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green);animation:blink 2s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
.refresh-info{font-family:'JetBrains Mono',monospace;font-size:.68rem;color:var(--muted2)}
.btn-link{font-size:.78rem;color:var(--blue);text-decoration:none;padding:.3rem .7rem;border-radius:6px;border:1px solid rgba(88,166,255,.25);background:rgba(88,166,255,.07);transition:background .15s}
.btn-link:hover{background:rgba(88,166,255,.15)}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;margin-bottom:1.5rem}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.1rem 1.2rem;position:relative;overflow:hidden;transition:border-color .2s}
.stat-card:hover{border-color:var(--border2)}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:12px 12px 0 0}
.stat-card.green::before{background:linear-gradient(90deg,var(--green),transparent)}
.stat-card.red::before{background:linear-gradient(90deg,var(--red),transparent)}
.stat-card.blue::before{background:linear-gradient(90deg,var(--blue),transparent)}
.stat-card.purple::before{background:linear-gradient(90deg,var(--purple),transparent)}
.stat-card.amber::before{background:linear-gradient(90deg,var(--amber),transparent)}
.stat-card.cyan::before{background:linear-gradient(90deg,var(--cyan),transparent)}
.stat-label{font-size:.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.55rem;font-weight:500}
.stat-value{font-family:'JetBrains Mono',monospace;font-size:1.75rem;font-weight:700;line-height:1;letter-spacing:-.03em}
.stat-value.green{color:var(--green)}.stat-value.red{color:var(--red)}.stat-value.blue{color:var(--blue)}.stat-value.purple{color:var(--purple)}.stat-value.amber{color:var(--amber)}.stat-value.white{color:var(--text)}
.stat-sub{font-size:.7rem;color:var(--muted2);margin-top:.35rem}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
.grid-3-1{display:grid;grid-template-columns:2fr 1fr;gap:1rem;margin-bottom:1rem}
.panel{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.panel-head{display:flex;align-items:center;justify-content:space-between;padding:.9rem 1.2rem;border-bottom:1px solid var(--border)}
.panel-title{font-size:.82rem;font-weight:600;color:var(--text);display:flex;align-items:center;gap:.5rem}
.panel-badge{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:var(--muted2);background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:.1rem .4rem}
.panel-body{padding:1.1rem 1.2rem}
.chart-wrap{position:relative;width:100%}
.chart-wrap canvas{max-width:100%}
.tbl{width:100%;border-collapse:collapse;font-size:.78rem}
.tbl th{text-align:left;padding:.5rem .75rem;font-size:.65rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid var(--border);white-space:nowrap}
.tbl td{padding:.55rem .75rem;border-bottom:1px solid rgba(255,255,255,.04);vertical-align:middle}
.tbl tr:last-child td{border-bottom:none}
.tbl tr:hover td{background:rgba(255,255,255,.025)}
.ep-name{font-family:'JetBrains Mono',monospace;color:var(--blue);font-size:.75rem}
.num{font-family:'JetBrains Mono',monospace;font-weight:600}
.num-green{color:var(--green)}.num-red{color:var(--red)}.num-blue{color:var(--blue)}.num-amber{color:var(--amber)}.num-muted{color:var(--muted)}
.mini-bar{height:4px;border-radius:2px;background:var(--surface3);margin-top:3px;overflow:hidden}
.mini-bar-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--accent),var(--accent2));transition:width .6s ease}
.status-grid{display:flex;flex-direction:column;gap:.5rem}
.status-row{display:flex;align-items:center;gap:.7rem}
.status-code{font-family:'JetBrains Mono',monospace;font-size:.72rem;font-weight:700;width:40px;flex-shrink:0}
.sc-2xx{color:var(--green)}.sc-4xx{color:var(--amber)}.sc-5xx{color:var(--red)}.sc-other{color:var(--muted)}
.status-bar{flex:1;height:6px;background:var(--surface3);border-radius:3px;overflow:hidden}
.status-bar-fill{height:100%;border-radius:3px;transition:width .6s ease}
.sc-2xx-fill{background:var(--green)}.sc-4xx-fill{background:var(--amber)}.sc-5xx-fill{background:var(--red)}.sc-other-fill{background:var(--muted2)}
.status-count{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--muted);min-width:36px;text-align:right}
.log-row{display:flex;align-items:center;gap:.7rem;padding:.45rem 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:.75rem}
.log-row:last-child{border-bottom:none}
.log-time{font-family:'JetBrains Mono',monospace;color:var(--muted2);font-size:.66rem;white-space:nowrap}
.log-ep{font-family:'JetBrains Mono',monospace;color:var(--blue);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.log-status{font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:700;padding:.1rem .4rem;border-radius:4px;white-space:nowrap}
.log-ok{color:var(--green);background:rgba(63,185,80,.1)}.log-err{color:var(--red);background:rgba(248,81,73,.1)}
.log-lat{font-family:'JetBrains Mono',monospace;color:var(--muted2);font-size:.68rem;white-space:nowrap}
.empty{text-align:center;padding:2.5rem 1rem;color:var(--muted);font-size:.82rem}
.empty span{display:block;font-size:1.8rem;margin-bottom:.5rem}
.loading{opacity:.4;animation:pulse-load 1.5s ease-in-out infinite}
@keyframes pulse-load{0%,100%{opacity:.4}50%{opacity:.9}}
.btn-csv{display:inline-flex;align-items:center;gap:.4rem;padding:.28rem .65rem;border-radius:6px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:var(--green);background:rgba(63,185,80,.07);border:1px solid rgba(63,185,80,.28);transition:background .2s;white-space:nowrap}
.btn-csv:hover{background:rgba(63,185,80,.16)}
@media(max-width:900px){.main{margin-left:0;padding:1rem}.grid-2,.grid-3-1{grid-template-columns:1fr}}
@media(max-width:600px){.stats-grid{grid-template-columns:1fr 1fr}}
</style>
</head>
<body data-page="analytics">
<div class="layout">
<div class="main">
  <div class="topbar">
    <div>
      <div style="font-size:.7rem;color:var(--muted);margin-bottom:.3rem;font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.1em">Gateway Dashboard</div>
      <h1>Analytics <span style="color:var(--accent2)">Overview</span></h1>
    </div>
    <div class="topbar-right">
      <span class="status-dot">Live</span>
      <span class="refresh-info" id="refresh-timer">Refreshing in 15s</span>
      <button class="btn-csv" id="export-csv" type="button">
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 1v10M4 7l4 4 4-4M2 14h12"/></svg>
        Export CSV
      </button>
      <a href="/db-manager" class="btn-link">DB Manager →</a>
    </div>
  </div>

  <div class="stats-grid">
    <div class="stat-card blue loading"><div class="stat-label">Total Requests</div><div class="stat-value blue" id="s-total">—</div><div class="stat-sub" id="s-uptime">uptime —</div></div>
    <div class="stat-card green loading"><div class="stat-label">Successful</div><div class="stat-value green" id="s-success">—</div><div class="stat-sub" id="s-success-pct">—% success rate</div></div>
    <div class="stat-card red loading"><div class="stat-label">Errors</div><div class="stat-value red" id="s-error">—</div><div class="stat-sub" id="s-error-rate">—% error rate</div></div>
    <div class="stat-card purple loading"><div class="stat-label">Unique IPs</div><div class="stat-value purple" id="s-ips">—</div><div class="stat-sub">distinct callers</div></div>
    <div class="stat-card amber loading"><div class="stat-label">Avg Latency</div><div class="stat-value amber" id="s-latency">—</div><div class="stat-sub">milliseconds</div></div>
    <div class="stat-card cyan loading"><div class="stat-label">Endpoints</div><div class="stat-value white" id="s-endpoints">—</div><div class="stat-sub">registered routes</div></div>
  </div>

  <div class="panel" style="margin-bottom:1rem">
    <div class="panel-head">
      <div class="panel-title"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12l4-5 3 3 4-6 3 4"/></svg>Requests — Last 24 Hours</div>
      <span class="panel-badge" id="hourly-total">loading...</span>
    </div>
    <div class="panel-body"><div class="chart-wrap" style="height:200px"><canvas id="chart-hourly"></canvas></div></div>
  </div>

  <div class="grid-3-1">
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="10" width="3" height="5" rx=".5"/><rect x="6" y="6" width="3" height="9" rx=".5"/><rect x="11" y="2" width="3" height="13" rx=".5"/></svg>Top Endpoints</div>
        <button class="btn-csv" id="csv-endpoints" type="button"><svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 1v10M4 7l4 4 4-4M2 14h12"/></svg>CSV</button>
      </div>
      <div style="overflow-x:auto">
        <table class="tbl"><thead><tr><th>Endpoint</th><th>Hits</th><th>OK</th><th>Errors</th><th>Avg ms</th><th>Error%</th><th style="min-width:80px">Share</th></tr></thead>
        <tbody id="ep-tbody"><tr><td colspan="7" class="empty"><span>◎</span>No requests yet</td></tr></tbody></table>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><div class="panel-title"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v4l2 2"/></svg>Status Codes</div></div>
      <div class="panel-body"><div class="status-grid" id="status-grid"><div class="empty" style="padding:1rem 0"><span>◎</span>No data</div></div></div>
    </div>
  </div>

  <div class="grid-2">
    <div class="panel">
      <div class="panel-head"><div class="panel-title">Success vs Error Ratio</div></div>
      <div class="panel-body">
        <div class="chart-wrap" style="height:180px;display:flex;align-items:center;justify-content:center"><canvas id="chart-pie" style="max-width:180px;max-height:180px"></canvas></div>
        <div style="display:flex;justify-content:center;gap:1.5rem;margin-top:.75rem">
          <div style="display:flex;align-items:center;gap:.4rem;font-size:.75rem;color:var(--muted)"><span style="width:10px;height:10px;border-radius:50%;background:var(--green);display:inline-block"></span>Success (<span id="pie-success-pct">—</span>%)</div>
          <div style="display:flex;align-items:center;gap:.4rem;font-size:.75rem;color:var(--muted)"><span style="width:10px;height:10px;border-radius:50%;background:var(--red);display:inline-block"></span>Error (<span id="pie-error-pct">—</span>%)</div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title">Recent Requests</div>
        <div style="display:flex;align-items:center;gap:.5rem">
          <button class="btn-csv" id="csv-recent" type="button"><svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 1v10M4 7l4 4 4-4M2 14h12"/></svg>CSV</button>
          <span class="panel-badge" id="recent-count">0</span>
        </div>
      </div>
      <div class="panel-body" style="padding:0 1.2rem"><div id="recent-log"><div class="empty" style="padding:2rem 0"><span>◎</span>No recent requests</div></div></div>
    </div>
  </div>
</div>
</div>
<script src="/nav.js"></script>
<script>
(function(){
'use strict';
var hourlyChart=null,pieChart=null,countdown=15,timer=null,_snap=null;
Chart.defaults.color='#7d8590';Chart.defaults.font.family="'JetBrains Mono',monospace";Chart.defaults.font.size=10;
var C={green:'#3fb950',red:'#f85149',blue:'#58a6ff',purple:'#bc8cff',amber:'#e3b341',accent:'#7c3aed',accent2:'#a855f7',muted:'#30363d'};
function initHourly(){var ctx=document.getElementById('chart-hourly').getContext('2d');hourlyChart=new Chart(ctx,{type:'bar',data:{labels:[],datasets:[{label:'Success',data:[],backgroundColor:'rgba(63,185,80,.6)',borderColor:C.green,borderWidth:1,borderRadius:3},{label:'Error',data:[],backgroundColor:'rgba(248,81,73,.5)',borderColor:C.red,borderWidth:1,borderRadius:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true,position:'top',align:'end',labels:{boxWidth:8,boxHeight:8,padding:12,pointStyle:'circle',usePointStyle:true}},tooltip:{mode:'index',intersect:false,backgroundColor:'#0d1117',borderColor:'rgba(255,255,255,.12)',borderWidth:1}},scales:{x:{stacked:true,grid:{color:C.muted,drawTicks:false},border:{display:false},ticks:{maxRotation:0,maxTicksLimit:12}},y:{stacked:true,beginAtZero:true,grid:{color:C.muted,drawTicks:false},border:{display:false},ticks:{precision:0}}}}});}
function initPie(){var ctx=document.getElementById('chart-pie').getContext('2d');pieChart=new Chart(ctx,{type:'doughnut',data:{labels:['Success','Error'],datasets:[{data:[0,0],backgroundColor:[C.green,C.red],borderColor:'#0d1117',borderWidth:3,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:true,cutout:'68%',plugins:{legend:{display:false},tooltip:{backgroundColor:'#0d1117',borderColor:'rgba(255,255,255,.12)',borderWidth:1}}}});}
function fmt(n){if(n==null)return'—';if(n>=1e6)return(n/1e6).toFixed(1)+'M';if(n>=1e3)return(n/1e3).toFixed(1)+'K';return String(n);}
function fmtUp(s){if(!s)return'—';var h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;return h>0?h+'h '+m+'m uptime':m>0?m+'m '+sec+'s uptime':sec+'s uptime';}
function fmtT(iso){try{return new Date(iso).toLocaleTimeString('en-US',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'});}catch(e){return iso;}}
function scCls(code){var c=parseInt(code,10);if(c>=200&&c<300)return'2xx';if(c>=400&&c<500)return'4xx';if(c>=500)return'5xx';return'other';}
function update(d){
  document.querySelectorAll('.loading').forEach(function(el){el.classList.remove('loading');});
  document.getElementById('s-total').textContent=fmt(d.totalRequests);
  document.getElementById('s-uptime').textContent=fmtUp(d.uptime);
  document.getElementById('s-success').textContent=fmt(d.totalSuccess);
  document.getElementById('s-success-pct').textContent=(d.totalRequests>0?((d.totalSuccess/d.totalRequests)*100).toFixed(1):'0.0')+'% success rate';
  document.getElementById('s-error').textContent=fmt(d.totalError);
  document.getElementById('s-error-rate').textContent=d.errorRate+'% error rate';
  document.getElementById('s-ips').textContent=fmt(d.uniqueIps);
  document.getElementById('s-latency').textContent=d.avgLatency+'ms';
  if(d.hourlyChart&&hourlyChart){hourlyChart.data.labels=d.hourlyChart.map(function(b){return b.label;});hourlyChart.data.datasets[0].data=d.hourlyChart.map(function(b){return b.success;});hourlyChart.data.datasets[1].data=d.hourlyChart.map(function(b){return b.error;});hourlyChart.update('none');document.getElementById('hourly-total').textContent=fmt(d.hourlyChart.reduce(function(s,b){return s+b.hits;},0))+' reqs / 24h';}
  if(pieChart){pieChart.data.datasets[0].data=[d.totalSuccess||0,d.totalError||0];pieChart.update('none');}
  document.getElementById('pie-success-pct').textContent=d.totalRequests>0?((d.totalSuccess/d.totalRequests)*100).toFixed(1):'0.0';
  document.getElementById('pie-error-pct').textContent=d.totalRequests>0?((d.totalError/d.totalRequests)*100).toFixed(1):'0.0';
  var tbody=document.getElementById('ep-tbody');
  var maxH=d.topEndpoints&&d.topEndpoints.length?d.topEndpoints[0].hits:1;
  tbody.innerHTML=!d.topEndpoints||!d.topEndpoints.length?'<tr><td colspan="7" class="empty"><span>◎</span>No hits yet</td></tr>':d.topEndpoints.map(function(ep){var p=maxH>0?Math.round((ep.hits/maxH)*100):0;var ec=parseFloat(ep.errorRate);var ecls=ec>20?'num-red':ec>5?'num-amber':'num-green';return'<tr><td><span class="ep-name">/api/'+ep.name+'</span></td><td><span class="num num-blue">'+fmt(ep.hits)+'</span></td><td><span class="num num-green">'+fmt(ep.success)+'</span></td><td><span class="num num-red">'+fmt(ep.error)+'</span></td><td><span class="num num-amber">'+ep.avgLatencyMs+'</span></td><td><span class="num '+ecls+'">'+ep.errorRate+'%</span></td><td><div class="mini-bar"><div class="mini-bar-fill" style="width:'+p+'%"></div></div></td></tr>';}).join('');
  var sg=document.getElementById('status-grid');sg.innerHTML=!d.statusDist||!d.statusDist.length?'<div class="empty" style="padding:1rem 0"><span>◎</span>No data</div>':d.statusDist.map(function(s){var cls=scCls(s.code);var p=d.statusDist[0].count>0?Math.round((s.count/d.statusDist[0].count)*100):0;return'<div class="status-row"><span class="status-code sc-'+cls+'">'+s.code+'</span><div class="status-bar"><div class="status-bar-fill sc-'+cls+'-fill" style="width:'+p+'%"></div></div><span class="status-count">'+fmt(s.count)+'</span></div>';}).join('');
  var rl=document.getElementById('recent-log');document.getElementById('recent-count').textContent=d.recentRequests?d.recentRequests.length:0;
  rl.innerHTML=!d.recentRequests||!d.recentRequests.length?'<div class="empty" style="padding:2rem 0"><span>◎</span>No recent requests</div>':d.recentRequests.map(function(r){return'<div class="log-row"><span class="log-time">'+fmtT(r.time)+'</span><span class="log-ep">'+r.endpoint+'</span><span class="log-status '+(r.success?'log-ok':'log-err')+'">'+(r.statusCode||(r.success?'200':'ERR'))+'</span><span class="log-lat">'+r.latencyMs+'ms</span></div>';}).join('');
}
function fetchData(){fetch('/analytics/data').then(function(r){return r.json();}).then(function(d){_snap=d;update(d);}).catch(function(e){console.warn('err',e.message);});}
function fetchMeta(){fetch('/meta').then(function(r){return r.json();}).then(function(d){document.getElementById('s-endpoints').textContent=d.totalEndpoints||'—';}).catch(function(){});}
function startCD(){countdown=15;clearInterval(timer);timer=setInterval(function(){countdown--;document.getElementById('refresh-timer').textContent='Refreshing in '+countdown+'s';if(countdown<=0){countdown=15;fetchData();}},1000);}
function toCSV(h,rows){return[h.join(',')].concat(rows.map(function(r){return r.map(function(c){var s=String(c==null?'':c);if(s.includes(',')||s.includes('"'))s='"'+s.replace(/"/g,'""')+'"';return s;}).join(',')})).join('\n');}
function dlCSV(fn,csv){var b=new Blob([csv],{type:'text/csv'});var u=URL.createObjectURL(b);var a=document.createElement('a');a.href=u;a.download=fn;document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(function(){URL.revokeObjectURL(u);},2000);}
document.getElementById('export-csv').onclick=function(){if(!_snap)return;var csv='# Summary\nMetric,Value\ntotal_requests,'+_snap.totalRequests+'\ntotal_success,'+_snap.totalSuccess+'\ntotal_errors,'+_snap.totalError+'\nerror_rate,'+_snap.errorRate+'%\nuptime_s,'+_snap.uptime;dlCSV('analytics-'+new Date().toISOString().slice(0,10)+'.csv',csv);};
document.getElementById('csv-endpoints').onclick=function(){if(!_snap||!_snap.topEndpoints||!_snap.topEndpoints.length)return;dlCSV('endpoints-'+new Date().toISOString().slice(0,10)+'.csv',toCSV(['Endpoint','Hits','Success','Errors','Avg_ms','Error_pct'],_snap.topEndpoints.map(function(ep){return[ep.name,ep.hits,ep.success,ep.error,ep.avgLatencyMs,ep.errorRate];})));};
document.getElementById('csv-recent').onclick=function(){if(!_snap||!_snap.recentRequests||!_snap.recentRequests.length)return;dlCSV('recent-'+new Date().toISOString().slice(0,10)+'.csv',toCSV(['Time','Endpoint','Status','Latency_ms','Success'],_snap.recentRequests.map(function(r){return[r.time,r.endpoint,r.statusCode,r.latencyMs,r.success];})));};
initHourly();initPie();fetchData();fetchMeta();startCD();
})();
</script>
</body>
</html>
