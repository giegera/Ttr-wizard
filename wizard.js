// Aventuriers du Rail Europe — Wizard Stratégique
// Rendu entièrement par manipulation DOM (pas de template literals HTML)

// ── DATA ──────────────────────────────────────────────────────────────────────
var CITIES = {
  "Edinburgh":[.10,.92],"Londres":[.13,.83],"Brest":[.09,.72],"Dieppe":[.17,.76],
  "Paris":[.22,.72],"Amsterdam":[.26,.84],"Bruxelles":[.24,.78],"Pampelune":[.18,.62],
  "Madrid":[.13,.53],"Lisboa":[.05,.50],"Cadix":[.10,.44],"Barcelone":[.22,.56],
  "Marseille":[.26,.60],"Frankfurt":[.32,.78],"Essen":[.29,.84],"Kobenhavn":[.33,.93],
  "Stockholm":[.42,.97],"Berlin":[.38,.83],"Dantzig":[.44,.84],"Riga":[.50,.90],
  "Wilno":[.53,.84],"Varsovie":[.47,.78],"Petrograd":[.58,.95],"Moscou":[.68,.88],
  "Smolensk":[.60,.83],"Kiev":[.58,.74],"Kharkov":[.64,.68],"Rostov":[.70,.60],
  "Sochi":[.73,.54],"Zürich":[.30,.68],"Munich":[.34,.70],"Vienne":[.39,.70],
  "Venise":[.36,.63],"Zagreb":[.40,.63],"Budapest":[.44,.66],"Sarajevo":[.43,.57],
  "Bucarest":[.52,.60],"Sofia":[.48,.52],"Sébastopol":[.60,.54],"Constantinople":[.55,.45],
  "Ankara":[.63,.43],"Erzurum":[.73,.40],"Smyrne":[.58,.38],"Athènes":[.48,.38],
  "Brindisi":[.42,.48],"Rome":[.36,.52],"Palerme":[.37,.43]
};

var ROUTES = [
  ["Edinburgh","Londres",4,true],["Londres","Dieppe",2,true],["Londres","Amsterdam",2,false],
  ["Amsterdam","Bruxelles",1,false],["Amsterdam","Essen",3,false],["Amsterdam","Frankfurt",2,false],
  ["Bruxelles","Dieppe",2,false],["Bruxelles","Frankfurt",2,false],["Bruxelles","Paris",2,true],
  ["Dieppe","Paris",1,false],["Essen","Frankfurt",2,false],["Essen","Berlin",2,false],
  ["Essen","Kobenhavn",3,true],["Kobenhavn","Stockholm",3,true],["Stockholm","Petrograd",8,false],
  ["Brest","Dieppe",2,false],["Brest","Paris",3,false],["Brest","Pampelune",4,false],
  ["Paris","Pampelune",4,true],["Paris","Zürich",3,false],["Paris","Frankfurt",3,true],
  ["Frankfurt","Berlin",3,true],["Frankfurt","Munich",2,false],["Pampelune","Barcelone",2,false],
  ["Pampelune","Madrid",3,true],["Barcelone","Madrid",2,false],["Barcelone","Marseille",4,false],
  ["Madrid","Lisboa",3,false],["Madrid","Cadix",3,false],["Cadix","Lisboa",2,false],
  ["Marseille","Pampelune",4,false],["Marseille","Paris",4,false],["Marseille","Rome",4,false],
  ["Marseille","Zürich",2,false],["Zürich","Munich",2,false],["Zürich","Venise",2,false],
  ["Munich","Vienne",3,false],["Munich","Venise",2,false],["Venise","Rome",2,false],
  ["Venise","Zagreb",2,false],["Vienne","Budapest",1,true],["Vienne","Zagreb",2,false],
  ["Vienne","Berlin",3,false],["Vienne","Varsovie",4,false],["Berlin","Dantzig",4,false],
  ["Berlin","Varsovie",4,true],["Dantzig","Varsovie",2,false],["Dantzig","Riga",3,false],
  ["Varsovie","Kiev",4,false],["Varsovie","Wilno",3,false],["Budapest","Zagreb",2,false],
  ["Budapest","Sarajevo",3,false],["Budapest","Bucarest",4,false],["Budapest","Kiev",6,false],
  ["Zagreb","Sarajevo",3,false],["Sarajevo","Sofia",2,false],["Sarajevo","Athènes",4,false],
  ["Rome","Brindisi",2,false],["Rome","Palerme",4,false],["Brindisi","Palerme",3,false],
  ["Brindisi","Athènes",4,false],["Athènes","Smyrne",2,false],["Athènes","Sofia",3,false],
  ["Sofia","Bucarest",2,false],["Sofia","Constantinople",3,false],["Constantinople","Bucarest",3,false],
  ["Constantinople","Smyrne",2,false],["Constantinople","Sébastopol",4,false],
  ["Constantinople","Ankara",2,false],["Smyrne","Ankara",3,false],["Palerme","Smyrne",6,false],
  ["Ankara","Erzurum",3,false],["Riga","Petrograd",4,false],["Riga","Wilno",4,false],
  ["Wilno","Petrograd",4,false],["Wilno","Kiev",2,false],["Kiev","Smolensk",3,false],
  ["Kiev","Kharkov",4,false],["Kiev","Bucarest",4,false],["Smolensk","Moscou",2,false],
  ["Smolensk","Wilno",3,false],["Moscou","Petrograd",4,false],["Moscou","Kharkov",4,false],
  ["Kharkov","Rostov",2,false],["Rostov","Sébastopol",4,false],["Rostov","Sochi",2,false],
  ["Sébastopol","Bucarest",4,false],["Sébastopol","Sochi",2,false],
  ["Erzurum","Sébastopol",4,false],["Erzurum","Sochi",3,false]
];

var JEWELS = [
  {a:"Stockholm",b:"Petrograd",w:8,pts:21,label:"Stockholm\u2192Petrograd"},
  {a:"Budapest",b:"Kiev",w:6,pts:15,label:"Budapest\u2192Kiev"},
  {a:"Palerme",b:"Smyrne",w:6,pts:15,label:"Palerme\u2192Smyrne"}
];

var PTS = {1:1,2:2,3:4,4:7,5:10,6:15,7:15,8:21};

var LONG_TICKETS = [
  {name:"Brest \u2192 Petrograd",pts:20},{name:"Kobenhavn \u2192 Erzurum",pts:21},
  {name:"Cadix \u2192 Stockholm",pts:21},{name:"Lisboa \u2192 Dantzig",pts:20},
  {name:"Palerme \u2192 Moscou",pts:20},{name:"Edinburgh \u2192 Ath\u00e8nes",pts:21}
];

var SHORT_TICKETS = [
  {name:"Ath\u00e8nes \u2192 Ankara",pts:5},
  {name:"Ath\u00e8nes \u2192 Wilno",pts:11},
  {name:"Amsterdam \u2192 Pampelune",pts:7},
  {name:"Amsterdam \u2192 Wilno",pts:12},
  {name:"Barcelone \u2192 Bruxelles",pts:8},
  {name:"Barcelone \u2192 Munich",pts:8},
  {name:"Berlin \u2192 Bucarest",pts:8},
  {name:"Berlin \u2192 Moscou",pts:12},
  {name:"Berlin \u2192 Rome",pts:9},
  {name:"Brest \u2192 Marseille",pts:7},
  {name:"Brest \u2192 Venise",pts:8},
  {name:"Bruxelles \u2192 Dantzig",pts:9},
  {name:"Budapest \u2192 Sofia",pts:5},
  {name:"Edinburgh \u2192 Paris",pts:7},
  {name:"Erzurum \u2192 Rostov",pts:5},
  {name:"Essen \u2192 Kiev",pts:10},
  {name:"Frankfurt \u2192 Kobenhavn",pts:5},
  {name:"Frankfurt \u2192 Smolensk",pts:13},
  {name:"Kiev \u2192 Petrograd",pts:6},
  {name:"Kiev \u2192 Sochi",pts:8},
  {name:"Londres \u2192 Berlin",pts:7},
  {name:"Londres \u2192 Vienne",pts:10},
  {name:"Madrid \u2192 Dieppe",pts:8},
  {name:"Madrid \u2192 Z\u00fcrich",pts:8},
  {name:"Marseille \u2192 Essen",pts:8},
  {name:"Palerme \u2192 Constantinople",pts:8},
  {name:"Paris \u2192 Vienne",pts:8},
  {name:"Paris \u2192 Zagreb",pts:7},
  {name:"Riga \u2192 Bucarest",pts:10},
  {name:"Rome \u2192 Smyrne",pts:8},
  {name:"Sarajevo \u2192 S\u00e9bastopol",pts:8},
  {name:"Smolensk \u2192 Rostov",pts:8},
  {name:"Sofia \u2192 Smyrne",pts:5},
  {name:"Stockholm \u2192 Vienne",pts:11},
  {name:"Ankara \u2192 Kharkov",pts:10},
  {name:"Varsovie \u2192 Smolensk",pts:6},
  {name:"Venise \u2192 Constantinople",pts:10},
  {name:"Zagreb \u2192 Brindisi",pts:6},
  {name:"Z\u00fcrich \u2192 Brindisi",pts:6},
  {name:"Z\u00fcrich \u2192 Budapest",pts:6}
];

var COLORS = {long:'#E63946', shorts:['#2A9D8F','#457B9D','#6A4C93']};

// ── GRAPH ──────────────────────────────────────────────────────────────────────
var GRAPH = {};
ROUTES.forEach(function(r) {
  var a = r[0], b = r[1], w = r[2];
  if (!GRAPH[a]) GRAPH[a] = [];
  if (!GRAPH[b]) GRAPH[b] = [];
  GRAPH[a].push([b,w]);
  GRAPH[b].push([a,w]);
});

function ptsByLen(n) { return PTS[n] || 0; }

function dijkstra(src, dst) {
  var dist = {}, prev = {}, vis = {};
  Object.keys(CITIES).forEach(function(n) { dist[n] = Infinity; });
  dist[src] = 0;
  var pq = [[0, src]];
  while (pq.length) {
    pq.sort(function(a,b){return a[0]-b[0];});
    var du = pq.shift(), d = du[0], u = du[1];
    if (vis[u]) continue;
    vis[u] = true;
    if (u === dst) break;
    (GRAPH[u] || []).forEach(function(vw) {
      var v = vw[0], w = vw[1];
      if (d + w < dist[v]) { dist[v] = d+w; prev[v] = u; pq.push([dist[v], v]); }
    });
  }
  if (dist[dst] === Infinity) return null;
  var path = [], c = dst;
  while (c) { path.unshift(c); c = prev[c]; }
  return {path: path, cost: dist[dst]};
}

function segsFromPath(path) {
  var s = {};
  for (var i = 0; i < path.length-1; i++) {
    var key = [path[i], path[i+1]].sort().join('|');
    s[key] = true;
  }
  return s;
}

function wagonsFromSegs(segs) {
  var w = 0;
  Object.keys(segs).forEach(function(k) {
    var r = ROUTES.filter(function(r){ return [r[0],r[1]].sort().join('|') === k; })[0];
    if (r) w += r[2];
  });
  return w;
}

function ptsFromSegs(segs) {
  var p = 0;
  Object.keys(segs).forEach(function(k) {
    var r = ROUTES.filter(function(r){ return [r[0],r[1]].sort().join('|') === k; })[0];
    if (r) p += ptsByLen(r[2]);
  });
  return p;
}

function isConnected(segs) {
  var keys = Object.keys(segs);
  if (!keys.length) return true;
  var adj = {};
  keys.forEach(function(k) {
    var ab = k.split('|'), a = ab[0], b = ab[1];
    if (!adj[a]) adj[a] = [];
    if (!adj[b]) adj[b] = [];
    adj[a].push(b); adj[b].push(a);
  });
  var cities = Object.keys(adj);
  var vis = {}, q = [cities[0]];
  vis[cities[0]] = true;
  while (q.length) {
    var u = q.shift();
    (adj[u] || []).forEach(function(v) { if (!vis[v]) { vis[v]=true; q.push(v); } });
  }
  return Object.keys(vis).length === cities.length;
}

function areConnected(a, b, segs) {
  var adj = {};
  Object.keys(segs).forEach(function(k) {
    var ab = k.split('|'), x = ab[0], y = ab[1];
    if (!adj[x]) adj[x] = [];
    if (!adj[y]) adj[y] = [];
    adj[x].push(y); adj[y].push(x);
  });
  var vis = {}, q = [a];
  vis[a] = true;
  while (q.length) {
    var u = q.shift();
    if (u === b) return true;
    (adj[u] || []).forEach(function(v) { if (!vis[v]) { vis[v]=true; q.push(v); } });
  }
  return false;
}

function ticketCities(name) {
  var parts = name.split(' \u2192 ');
  return [parts[0].trim(), parts[parts.length-1].trim()];
}

function buildNetworkFromSeq(seq) {
  var segs = {}, wagons = 0;
  for (var i = 0; i < seq.length-1; i++) {
    if (seq[i] === seq[i+1]) continue;
    var r = dijkstra(seq[i], seq[i+1]);
    if (!r) return null;
    var newSegs = segsFromPath(r.path);
    Object.keys(newSegs).forEach(function(sg) {
      if (!segs[sg]) {
        segs[sg] = true;
        var ro = ROUTES.filter(function(ro){ return [ro[0],ro[1]].sort().join('|') === sg; })[0];
        wagons += ro ? ro[2] : 0;
      }
    });
    if (wagons > 45) return null;
  }
  return {segs: segs, wagons: wagons};
}

// ── STATE ──────────────────────────────────────────────────────────────────────
var S = {
  step: 1,
  freeMode: false,
  longTicket: null,
  shortTickets: [],
  sequence: [],
  network: null,
  drawnTickets: [],   // indices des 3 tickets courts tirés (étape 1b)
  keptTickets: []     // indices des tickets courts à garder (décision joueur)
};

// ── CANVAS ──────────────────────────────────────────────────────────────────────
var canvas, ctx;

function cityPos(name) {
  var rc = CITIES[name];
  return [20 + rc[0]*(canvas.width-40), 20 + (1-rc[1])*(canvas.height-40)];
}

function edgeW(len) {
  return ({1:.8,2:1.2,3:1.6,4:2,6:3,8:4})[len] || 1.2;
}

function draw() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#C8DDE8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Highlighted segments
  var hlSegs = {};

  if (S.network) {
    Object.keys(S.network.segs).forEach(function(k) {
      if (!hlSegs[k]) hlSegs[k] = [];
      hlSegs[k].push('#FFD700');
    });
  }

  if (S.sequence.length >= 2 && !S.network) {
    var net = buildNetworkFromSeq(S.sequence);
    if (net) {
      Object.keys(net.segs).forEach(function(k) {
        if (!hlSegs[k]) hlSegs[k] = [];
        hlSegs[k].push('#FFD700');
      });
    }
  }

  if (S.step <= 2 || S.step === '1b') {
    if (S.longTicket !== null) {
      var lp = ticketCities(LONG_TICKETS[S.longTicket].name);
      var lr = dijkstra(lp[0], lp[1]);
      if (lr) {
        Object.keys(segsFromPath(lr.path)).forEach(function(k) {
          if (!hlSegs[k]) hlSegs[k] = [];
          hlSegs[k].push(COLORS.long);
        });
      }
    }
    var ticketsToShow = S.step === '1b' ? S.drawnTickets : S.shortTickets;
    ticketsToShow.forEach(function(idx, si) {
      var sp = ticketCities(SHORT_TICKETS[idx].name);
      var sr = dijkstra(sp[0], sp[1]);
      if (sr) {
        Object.keys(segsFromPath(sr.path)).forEach(function(k) {
          if (!hlSegs[k]) hlSegs[k] = [];
          hlSegs[k].push(COLORS.shorts[si] || '#888');
        });
      }
    });
  }

  // Draw background routes
  var drawn = {};
  ROUTES.forEach(function(route) {
    var a = route[0], b = route[1], len = route[2], dbl = route[3];
    var k = [a,b].sort().join('|');
    if (drawn[k]) return;
    drawn[k] = true;
    var p1 = cityPos(a), p2 = cityPos(b);
    ctx.beginPath(); ctx.moveTo(p1[0],p1[1]); ctx.lineTo(p2[0],p2[1]);
    ctx.strokeStyle = '#B8C8D8'; ctx.lineWidth = edgeW(len)*.6;
    ctx.setLineDash([]); ctx.stroke();
    if (dbl) {
      var dx = p2[0]-p1[0], dy = p2[1]-p1[1], nm = Math.sqrt(dx*dx+dy*dy);
      var ox = -dy/nm*3, oy = dx/nm*3;
      ctx.beginPath(); ctx.moveTo(p1[0]+ox,p1[1]+oy); ctx.lineTo(p2[0]+ox,p2[1]+oy);
      ctx.setLineDash([3,3]); ctx.stroke(); ctx.setLineDash([]);
    }
  });

  // Draw highlighted routes
  Object.keys(hlSegs).forEach(function(k) {
    var colors = hlSegs[k];
    var ab = k.split('|'), a = ab[0], b = ab[1];
    if (!CITIES[a] || !CITIES[b]) return;
    var p1 = cityPos(a), p2 = cityPos(b);
    var ro = ROUTES.filter(function(r){ return [r[0],r[1]].sort().join('|') === k; })[0];
    var lw = edgeW(ro ? ro[2] : 2);
    var n = colors.length;
    var dx = p2[0]-p1[0], dy = p2[1]-p1[1], nm = Math.sqrt(dx*dx+dy*dy);
    var ox = -dy/nm, oy = dx/nm;
    colors.forEach(function(col, ci) {
      var off = (ci - (n-1)/2) * 4;
      ctx.beginPath();
      ctx.moveTo(p1[0]+ox*off, p1[1]+oy*off);
      ctx.lineTo(p2[0]+ox*off, p2[1]+oy*off);
      ctx.strokeStyle = col; ctx.lineWidth = lw*2; ctx.lineCap = 'round';
      ctx.setLineDash([]); ctx.stroke();
    });
    if (ro && ro[2] >= 3) {
      var mx = (p1[0]+p2[0])/2, my = (p1[1]+p2[1])/2;
      ctx.fillStyle = 'rgba(0,0,0,.7)';
      ctx.beginPath(); ctx.arc(mx,my,8,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = 'white'; ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(ro[2], mx, my);
    }
  });

  // Important cities
  var importantCities = {};
  if (S.longTicket !== null) ticketCities(LONG_TICKETS[S.longTicket].name).forEach(function(c){ importantCities[c]=true; });
  S.shortTickets.forEach(function(idx){ ticketCities(SHORT_TICKETS[idx].name).forEach(function(c){ importantCities[c]=true; }); });
  S.sequence.forEach(function(c){ importantCities[c]=true; });
  JEWELS.forEach(function(j){ importantCities[j.a]=true; importantCities[j.b]=true; });

  var offsets = {
    "Edinburgh":[-45,0],"Londres":[-45,0],"Brest":[-42,0],"Paris":[-10,12],
    "Madrid":[-40,0],"Lisboa":[-42,0],"Cadix":[-35,-10],"Barcelone":[12,-10],
    "Marseille":[12,8],"Frankfurt":[12,8],"Essen":[-10,12],"Kobenhavn":[12,8],
    "Stockholm":[12,8],"Berlin":[12,8],"Dantzig":[12,8],"Riga":[12,8],
    "Wilno":[12,8],"Varsovie":[-10,-14],"Petrograd":[12,8],"Moscou":[12,8],
    "Smolensk":[12,8],"Kiev":[-38,8],"Kharkov":[12,8],"Rostov":[12,8],
    "Sochi":[12,-12],"Z\u00fcrich":[-38,8],"Munich":[-38,-10],"Vienne":[12,8],
    "Venise":[-38,8],"Zagreb":[12,-12],"Budapest":[12,8],"Sarajevo":[-48,-10],
    "Bucarest":[12,8],"Sofia":[-35,-13],"S\u00e9bastopol":[12,8],"Constantinople":[12,-13],
    "Ankara":[12,8],"Erzurum":[12,8],"Smyrne":[12,-12],"Ath\u00e8nes":[-40,-10],
    "Brindisi":[12,8],"Rome":[-38,8],"Palerme":[-40,-12],
    "Amsterdam":[12,8],"Bruxelles":[12,8],"Dieppe":[0,12],"Pampelune":[-10,-15]
  };

  Object.keys(CITIES).forEach(function(name) {
    var p = cityPos(name);
    var imp = importantCities[name];
    var inSeq = S.sequence.indexOf(name) >= 0;
    var size = inSeq ? 9 : imp ? 6 : 3.5;
    var col = inSeq ? '#FF6B00' : imp ? '#1F4E79' : '#8899AA';
    ctx.beginPath(); ctx.arc(p[0],p[1],size,0,Math.PI*2);
    ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = 'white'; ctx.lineWidth = inSeq?2:1; ctx.stroke();

    if (imp || inSeq) {
      var off = offsets[name] || [12,8];
      ctx.font = (inSeq?'bold ':'')+((inSeq?11:9)+'px sans-serif');
      ctx.textAlign = off[0] < 0 ? 'right' : 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255,255,255,.8)';
      ctx.fillText(name, p[0]+off[0]+1, p[1]+off[1]);
      ctx.fillStyle = inSeq ? '#FF6B00' : '#1F4E79';
      ctx.fillText(name, p[0]+off[0], p[1]+off[1]);
    }
  });

  // Sequence numbers
  S.sequence.forEach(function(city, i) {
    var p = cityPos(city);
    ctx.fillStyle = '#FF6B00';
    ctx.beginPath(); ctx.arc(p[0],p[1]-14,9,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'white'; ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(i+1, p[0], p[1]-14);
  });

  // Jewel indicators
  if (S.step >= 2 || S.step === '1b') {
    JEWELS.forEach(function(j) {
      var p1 = cityPos(j.a), p2 = cityPos(j.b);
      var mx = (p1[0]+p2[0])/2, my = (p1[1]+p2[1])/2;
      var k = [j.a,j.b].sort().join('|');
      var used = S.network && S.network.segs[k];
      ctx.fillStyle = used ? 'rgba(30,107,60,.85)' : 'rgba(255,215,0,.85)';
      ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('\u2b50'+j.pts, mx, my-12);
    });
  }
}

// ── DOM HELPERS ──────────────────────────────────────────────────────────────
function el(tag, opts) {
  var e = document.createElement(tag);
  if (opts) {
    if (opts.cls) e.className = opts.cls;
    if (opts.html) e.innerHTML = opts.html;
    if (opts.text) e.textContent = opts.text;
    if (opts.style) e.setAttribute('style', opts.style);
    if (opts.onclick) e.onclick = opts.onclick;
    if (opts.id) e.id = opts.id;
    if (opts.disabled) e.disabled = true;
    if (opts.title) e.title = opts.title;
  }
  return e;
}

function append(parent) {
  var children = Array.prototype.slice.call(arguments, 1);
  children.forEach(function(c) { if (c) parent.appendChild(c); });
  return parent;
}

function metricCard(label, val, sub, cls) {
  var d = el('div', {cls: 'metric' + (cls ? ' '+cls : '')});
  append(d,
    el('div', {cls:'m-label', text:label}),
    el('div', {cls:'m-val', text:String(val)}),
    sub ? el('div', {cls:'m-sub', text:sub}) : null
  );
  return d;
}

function infoBox(text, cls) {
  return el('div', {cls:'info-box'+(cls?' '+cls:''), html:text});
}

function btn(text, primary, onclick, disabled) {
  var b = el('button', {cls:'btn'+(primary?' primary':''), onclick:onclick});
  b.textContent = text;
  if (disabled) b.disabled = true;
  return b;
}

function sectionLabel(text) {
  return el('div', {cls:'section-label', text:text});
}

function ticketCard(name, pts, color, selected, isLong, onclick) {
  var d = el('div', {cls:'ticket-card'+(selected?' selected':'')+(isLong?' long':''), onclick:onclick});
  d.style.setProperty('--tc', color);
  var check = el('div', {cls:'check', text:'\u2713'});
  var hdr = el('div', {cls:'t-header'});
  var nm = el('div', {cls:'t-name', text:name});
  if (isLong) {
    var tag = el('span', {cls:'tag', text:'Long'});
    nm.appendChild(tag);
  }
  var p = el('div', {cls:'t-pts', text:pts+'pts'});
  p.style.color = color;
  append(hdr, nm, p);
  append(d, check, hdr);
  return d;
}

function jewelRow(j, used) {
  var d = el('div', {cls:'jewel-row'});
  var dot = el('div', {cls:'jewel-dot'+(used?' used':'')});
  var nm = el('div', {cls:'jewel-name', text:j.label});
  var badge = el('div', {cls:'jewel-badge', text: used ? '+'+j.pts+'pts \u2713' : 'non utilis\u00e9'});
  append(d, dot, nm, badge);
  return d;
}

// ── RENDER ────────────────────────────────────────────────────────────────────
function render() {
  var sb = document.getElementById('sidebar');
  if (!sb) return;
  sb.innerHTML = '';

  var stepLabels = ['1','1b','2','3','4'];
  var stepDisplay = S.step === '1b' ? '2' : (S.step < 5 ? S.step + 1 : 5);
  document.getElementById('step-indicator').textContent = '\u00c9tape '+stepDisplay+' / 5';
  ['s1','s2','s3','s4'].forEach(function(id, i) {
    var e = document.getElementById(id);
    if (!e) return;
    var stepOrder = [1,'1b',2,3,4];
    var curIdx = stepOrder.indexOf(S.step);
    e.className = 'step' + (curIdx===i?' active':curIdx>i?' done':'');
  });

  if (S.step === 1) renderStep1(sb);
  else if (S.step === '1b') renderStep1b(sb);
  else if (S.step === 2) renderStep2(sb);
  else if (S.step === 3) renderStep3(sb);
  else renderStep4(sb);
}

function renderStep1(sb) {
  // Mode libre
  var freeCard = el('div');
  append(freeCard, sectionLabel('Mode de jeu'));
  var fc = el('div', {cls:'ticket-card'+(S.freeMode?' selected':'')});
  fc.style.setProperty('--tc','#8B2E0A');
  fc.onclick = toggleFreeMode;
  var fcheck = el('div', {cls:'check', text:'\u2713'});
  var fhdr = el('div', {cls:'t-header'});
  var fnm = el('div', {cls:'t-name'});
  fnm.textContent = 'Parcours libre ';
  var ftag = el('span', {cls:'tag', text:'Libre'});
  ftag.style.background = '#8B2E0A';
  fnm.appendChild(ftag);
  var fpts = el('div', {cls:'t-pts', text:'+10 bonus'});
  fpts.style.color = '#8B2E0A';
  var fmeta = el('div', {cls:'t-meta', text:'Maximiser pts routes sans ticket'});
  append(fhdr, fnm, fpts);
  append(fc, fcheck, fhdr, fmeta);
  append(freeCard, fc);
  sb.appendChild(freeCard);

  if (!S.freeMode) {
    // Long tickets
    var longDiv = el('div');
    append(longDiv, sectionLabel('Grand ticket (1 parmi 6)'));
    LONG_TICKETS.forEach(function(t, i) {
      append(longDiv, ticketCard(t.name, t.pts, '#E63946', S.longTicket===i, true, function(){ selectLong(i); }));
    });
    sb.appendChild(longDiv);

    // Short tickets
    var shortDiv = el('div');
    append(shortDiv, sectionLabel('Tickets courts (3 max)'));
    var sel = document.createElement('select');
    sel.className = 'select';
    var opt0 = document.createElement('option');
    opt0.value = ''; opt0.textContent = '\u2014 Ajouter un ticket court \u2014';
    sel.appendChild(opt0);
    SHORT_TICKETS.forEach(function(t, i) {
      if (S.shortTickets.indexOf(i) >= 0) return;
      var opt = document.createElement('option');
      opt.value = i; opt.textContent = t.name + ' (' + t.pts + 'pts)';
      sel.appendChild(opt);
    });
    sel.onchange = function() { addShort(sel); };
    shortDiv.appendChild(sel);

    S.shortTickets.forEach(function(idx, si) {
      append(shortDiv, ticketCard(
        SHORT_TICKETS[idx].name, SHORT_TICKETS[idx].pts,
        COLORS.shorts[si], true, false,
        function(){ removeShort(si); }
      ));
    });
    sb.appendChild(shortDiv);
  }

  var canProceed = S.freeMode || S.longTicket !== null || S.shortTickets.length > 0;
  var btnRow = el('div', {cls:'btn-row'});
  var nextBtn = btn('Suivant \u2192', true, function(){
    // Si un grand ticket est choisi (sans mode libre), passer par l'étape tirage
    if (!S.freeMode && S.longTicket !== null) {
      S.drawnTickets = []; S.keptTickets = [];
      goStep('1b');
    } else {
      goStep(2);
    }
  }, !canProceed);
  append(btnRow, nextBtn);
  sb.appendChild(btnRow);
}

// ── MODULE ANALYSE COÛT MARGINAL ──────────────────────────────────────────────
var OPTIMAL_NETWORKS = {
  "Brest \u2192 Petrograd": { tpts:20, segments:[
    ["Brest","Paris"],["Paris","Frankfurt"],["Frankfurt","Amsterdam"],
    ["Amsterdam","Essen"],["Essen","Kobenhavn"],["Kobenhavn","Stockholm"],
    ["Stockholm","Petrograd"],["Petrograd","Wilno"],["Wilno","Smolensk"],
    ["Smolensk","Moscou"],["Wilno","Kiev"],["Kiev","Budapest"],["Frankfurt","Berlin"]
  ]},
  "Kobenhavn \u2192 Erzurum": { tpts:21, segments:[
    ["Kobenhavn","Stockholm"],["Stockholm","Petrograd"],["Petrograd","Wilno"],
    ["Wilno","Kiev"],["Kiev","Budapest"],["Budapest","Bucarest"],
    ["Bucarest","S\u00e9bastopol"],["S\u00e9bastopol","Erzurum"],
    ["Kobenhavn","Essen"],["Essen","Frankfurt"],["Frankfurt","Amsterdam"],
    ["Kiev","Smolensk"]
  ]},
  "Cadix \u2192 Stockholm": { tpts:21, segments:[
    ["Cadix","Madrid"],["Madrid","Barcelone"],["Barcelone","Marseille"],
    ["Marseille","Z\u00fcrich"],["Z\u00fcrich","Munich"],["Munich","Vienne"],
    ["Vienne","Budapest"],["Budapest","Kiev"],["Kiev","Varsovie"],
    ["Varsovie","Dantzig"],["Dantzig","Riga"],["Riga","Petrograd"],
    ["Petrograd","Stockholm"]
  ]},
  "Lisboa \u2192 Dantzig": { tpts:20, segments:[
    ["Lisboa","Madrid"],["Madrid","Barcelone"],["Barcelone","Marseille"],
    ["Marseille","Z\u00fcrich"],["Z\u00fcrich","Munich"],["Munich","Vienne"],
    ["Vienne","Budapest"],["Budapest","Kiev"],["Kiev","Varsovie"],
    ["Varsovie","Dantzig"],["Dantzig","Riga"],["Riga","Petrograd"],
    ["Petrograd","Stockholm"]
  ]},
  "Palerme \u2192 Moscou": { tpts:20, segments:[
    ["Palerme","Smyrne"],["Smyrne","Constantinople"],["Constantinople","Bucarest"],
    ["Bucarest","Kiev"],["Kiev","Budapest"],["Budapest","Vienne"],
    ["Vienne","Varsovie"],["Varsovie","Wilno"],["Wilno","Petrograd"],
    ["Petrograd","Stockholm"],["Petrograd","Moscou"]
  ]},
  "Edinburgh \u2192 Ath\u00e8nes": { tpts:21, segments:[
    ["Edinburgh","Londres"],["Londres","Amsterdam"],["Amsterdam","Essen"],
    ["Essen","Kobenhavn"],["Kobenhavn","Stockholm"],["Stockholm","Petrograd"],
    ["Petrograd","Wilno"],["Wilno","Kiev"],["Kiev","Budapest"],
    ["Budapest","Sarajevo"],["Sarajevo","Ath\u00e8nes"],["Ath\u00e8nes","Sofia"]
  ]}
};

function segKey(a,b) { return [a,b].sort().join('|'); }

function buildOptimalSegs(longTicketName) {
  var net = OPTIMAL_NETWORKS[longTicketName];
  if (!net) return {};
  var segs = {};
  net.segments.forEach(function(ab) {
    var k = segKey(ab[0],ab[1]);
    if (!segs[k]) {
      var r = ROUTES.find(function(r){ return segKey(r[0],r[1])===k; });
      if (r) segs[k] = r[2];
    }
  });
  return segs;
}

function areConnectedInSegs(a,b,segs) {
  var adj = {};
  Object.keys(segs).forEach(function(k) {
    var ab=k.split('|');
    adj[ab[0]]=adj[ab[0]]||[]; adj[ab[1]]=adj[ab[1]]||[];
    adj[ab[0]].push(ab[1]); adj[ab[1]].push(ab[0]);
  });
  if (!adj[a]||!adj[b]) return false;
  var vis={},q=[a]; vis[a]=true;
  while(q.length){ var u=q.shift(); if(u===b) return true; (adj[u]||[]).forEach(function(v){if(!vis[v]){vis[v]=true;q.push(v);}}); }
  return false;
}

function dijkstraMarginal(src,dst,posedSegs) {
  var dist={},prev={},vis={};
  Object.keys(CITIES).forEach(function(c){dist[c]=Infinity;});
  if(dist[src]===undefined||dist[dst]===undefined) return null;
  dist[src]=0;
  var pq=[[0,src]];
  while(pq.length){
    pq.sort(function(a,b){return a[0]-b[0];});
    var item=pq.shift(),d=item[0],u=item[1];
    if(vis[u]) continue; vis[u]=true;
    if(u===dst) break;
    (GRAPH[u]||[]).forEach(function(vw){
      var v=vw[0],w=vw[1],k=segKey(u,v);
      var cost=posedSegs[k]?0:w;
      if(d+cost<(dist[v]!==undefined?dist[v]:Infinity)){
        dist[v]=d+cost; prev[v]=u; pq.push([dist[v],v]);
      }
    });
  }
  if(dist[dst]===Infinity) return null;
  var path=[],cur=dst;
  while(cur!==undefined){path.unshift(cur);cur=prev[cur];}
  return {path:path,marginalWagons:dist[dst]};
}

function computeMarginalCost(shortTicketName,posedSegs) {
  var parts=shortTicketName.split(' \u2192 ');
  var a=parts[0].trim(),b=parts[parts.length-1].trim();
  if(!CITIES[a]||!CITIES[b]) return null;
  if(areConnectedInSegs(a,b,posedSegs)) return {marginalWagons:0,alreadyValid:true,path:[]};
  var result=dijkstraMarginal(a,b,posedSegs);
  if(!result) return null;
  return {marginalWagons:result.marginalWagons,alreadyValid:false,path:result.path};
}

function analyzeShortTickets(longTicketName,shortTicketIndices) {
  var posedSegs=buildOptimalSegs(longTicketName);
  var net=OPTIMAL_NETWORKS[longTicketName];
  if(!net) return null;
  var wagonsUsed=Object.keys(posedSegs).reduce(function(s,k){return s+posedSegs[k];},0);
  var wagonsLeft=45-wagonsUsed;
  var results=shortTicketIndices.map(function(idx){
    var ticket=SHORT_TICKETS[idx];
    var mc=computeMarginalCost(ticket.name,posedSegs);
    if(!mc) return {idx:idx,ticket:ticket,marginalWagons:999,alreadyValid:false,path:[],ratio:0,pts:ticket.pts};
    var ratio=mc.marginalWagons===0?999:ticket.pts/mc.marginalWagons;
    return {idx:idx,ticket:ticket,marginalWagons:mc.marginalWagons,alreadyValid:mc.alreadyValid,path:mc.path,ratio:ratio,pts:ticket.pts};
  });
  var best=null,bestScore=-1;
  for(var mask=1;mask<8;mask++){
    var kept=[],totalW=0,totalPts=0;
    for(var i=0;i<3;i++){
      if(mask&(1<<i)){kept.push(results[i]);totalW+=results[i].marginalWagons;totalPts+=results[i].pts;}
    }
    if(totalW<=wagonsLeft&&totalPts>bestScore){bestScore=totalPts;best={kept:kept,totalMarginalWagons:totalW,totalPts:totalPts};}
  }
  if(!best){
    var sorted=results.slice().sort(function(a,b){return b.ratio-a.ratio||b.pts-a.pts;});
    best={kept:[sorted[0]],totalMarginalWagons:sorted[0].marginalWagons,totalPts:sorted[0].pts,forced:true};
  }
  return {longTicket:longTicketName,wagonsUsed:wagonsUsed,wagonsLeft:wagonsLeft,tickets:results,recommendation:best};
}

// ── STEP 1b : TIRAGE TICKETS COURTS ──────────────────────────────────────────
function drawRandomTickets() {
  var available = [];
  for (var i = 0; i < SHORT_TICKETS.length; i++) available.push(i);
  // Fisher-Yates shuffle, prendre les 3 premiers
  for (var j = available.length - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1));
    var tmp = available[j]; available[j] = available[k]; available[k] = tmp;
  }
  S.drawnTickets = [available[0], available[1], available[2]];
  S.keptTickets = [];
  render(); draw();
}

function renderStep1b(sb) {
  var longName = LONG_TICKETS[S.longTicket].name;
  var analysis = S.drawnTickets.length === 3 ? analyzeShortTickets(longName, S.drawnTickets) : null;

  append(sb, sectionLabel('Grand ticket sélectionné'));
  var lt = el('div', {cls:'ticket-card selected'});
  lt.style.setProperty('--tc','#E63946');
  var lh = el('div', {cls:'t-header'});
  var ln = el('div', {cls:'t-name', text:longName});
  var lp = el('div', {cls:'t-pts', text:LONG_TICKETS[S.longTicket].pts+'pts'});
  lp.style.color='#E63946';
  append(lh,ln,lp); append(lt,lh); sb.appendChild(lt);

  // Tirage aléatoire
  append(sb, sectionLabel('Tirage des tickets courts'));

  if (S.drawnTickets.length === 0) {
    // Bouton de tirage
    var drawBtn = el('button');
    drawBtn.className = 'btn btn-primary';
    drawBtn.style.cssText = 'width:100%;padding:14px;font-size:15px;margin:8px 0;';
    drawBtn.textContent = '\uD83C\uDFB2 Tirer 3 tickets courts';
    drawBtn.onclick = drawRandomTickets;
    sb.appendChild(drawBtn);
    var hint = el('div', {cls:'t-meta', text:'Appuyez pour simuler le tirage aléatoire de 3 tickets'});
    hint.style.cssText='color:#888;font-size:12px;text-align:center;';
    sb.appendChild(hint);
  } else {
    // Afficher les 3 tickets tirés avec leur analyse
    S.drawnTickets.forEach(function(idx,si){
      var t=SHORT_TICKETS[idx];
      var card=el('div',{cls:'ticket-card selected'});
      card.style.setProperty('--tc', COLORS.shorts[si]||'#555');
      var hdr=el('div',{cls:'t-header'});
      var nm=el('div',{cls:'t-name',text:t.name});
      var pts=el('div',{cls:'t-pts',text:t.pts+'pts'});
      pts.style.color=COLORS.shorts[si]||'#555';

      if(analysis){
        var res=analysis.tickets[si];
        var meta=el('div',{cls:'t-meta'});
        if(res.alreadyValid){
          meta.textContent='\u2705 Déjà dans le réseau — 0w';
          meta.style.color='#1E6B3C';
        } else {
          meta.textContent='\u26A0 Coût marginal : '+res.marginalWagons+'w ('+
            (res.ratio===999?'\u221e':res.ratio.toFixed(1))+'pts/w)';
          meta.style.color=res.marginalWagons<=3?'#CC6600':'#E63946';
        }
        append(hdr,nm,pts);
        append(card,hdr,meta);
      } else {
        append(hdr,nm,pts); append(card,hdr);
      }
      sb.appendChild(card);
    });

    // Recommandation
    if(analysis){
      var recDiv=el('div');
      recDiv.style.cssText='margin-top:12px;padding:10px;background:#EAF5EE;border-radius:8px;border-left:4px solid #1E6B3C;';

      var recTitle=el('div');
      recTitle.style.cssText='font-weight:bold;color:#1E6B3C;font-size:13px;margin-bottom:6px;';
      recTitle.textContent='\uD83C\uDFAF Recommandation';
      recDiv.appendChild(recTitle);

      var rec=analysis.recommendation;
      analysis.tickets.forEach(function(t){
        var isKept=rec.kept.indexOf(t)>=0;
        var line=el('div');
        line.style.cssText='display:flex;align-items:center;margin:3px 0;font-size:12px;';
        var icon=el('span');
        icon.textContent=isKept?'\u2705 GARDER ':'\u274C D\u00c9FAUSSER ';
        icon.style.cssText='font-weight:bold;color:'+(isKept?'#1E6B3C':'#E63946')+';min-width:90px;';
        var name=el('span',{text:t.ticket.name+' ('+t.ticket.pts+'pts)'});
        name.style.color=isKept?'#2C2416':'#888';
        append(line,icon,name);
        recDiv.appendChild(line);
      });

      var summary=el('div');
      summary.style.cssText='margin-top:8px;padding-top:8px;border-top:1px solid #B8DBC5;font-size:12px;color:#2C2416;';
      var wagonsInfo='';
      if(rec.totalMarginalWagons===0){
        wagonsInfo='Sans wagon supplémentaire';
      } else if(rec.forced){
        wagonsInfo='Attention : +'+rec.totalMarginalWagons+'w nécessaires';
      } else {
        wagonsInfo='+'+rec.totalMarginalWagons+'w marginaux';
      }
      summary.textContent='Gain : +'+rec.totalPts+'pts  |  '+wagonsInfo;
      recDiv.appendChild(summary);
      sb.appendChild(recDiv);
    }

    // Bouton retirer (relancer)
    var rerollBtn = el('button');
    rerollBtn.className = 'btn';
    rerollBtn.style.cssText='width:100%;margin-top:8px;font-size:12px;';
    rerollBtn.textContent='\uD83D\uDD04 Nouveau tirage';
    rerollBtn.onclick = drawRandomTickets;
    sb.appendChild(rerollBtn);
  }

  // Navigation
  var btnRow=el('div',{cls:'btn-row'});
  if(analysis){
    append(btnRow,
      btn('\u2190 Retour',false,function(){goStep(1);}),
      btn('Continuer \u2192',true,function(){
        S.keptTickets=analysis.recommendation.kept.map(function(t){return t.idx;});
        S.shortTickets=S.keptTickets.slice();
        goStep(2);
      })
    );
  } else {
    append(btnRow, btn('\u2190 Retour',false,function(){goStep(1);}));
  }
  sb.appendChild(btnRow);
}

function renderStep2(sb) {
  var allTermini = [];
  if (!S.freeMode) {
    if (S.longTicket !== null) ticketCities(LONG_TICKETS[S.longTicket].name).forEach(function(c){ if (allTermini.indexOf(c)<0) allTermini.push(c); });
    S.shortTickets.forEach(function(idx){ ticketCities(SHORT_TICKETS[idx].name).forEach(function(c){ if (allTermini.indexOf(c)<0) allTermini.push(c); }); });
  }

  var net = S.sequence.length >= 2 ? buildNetworkFromSeq(S.sequence) : null;
  var wagons = net ? net.wagons : 0;
  var connected = net ? isConnected(net.segs) : false;

  // Info box
  sb.appendChild(infoBox('Clique sur les villes dans l\'ordre pour construire l\'encha\u00eenement. Recliquer sur la derni\u00e8re ville la retire.'));

  // Termini
  if (allTermini.length) {
    var td = el('div');
    append(td, sectionLabel('Terminus obligatoires'));
    var tlist = el('div');
    tlist.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px';
    allTermini.forEach(function(c) {
      var idx = S.sequence.indexOf(c);
      var ti = el('div', {cls:'terminus-item'});
      var num = el('div', {cls:'terminus-num'});
      num.style.background = idx >= 0 ? '#1E6B3C' : '#AAA';
      num.textContent = idx >= 0 ? String(idx+1) : '?';
      var nm = el('div');
      nm.textContent = c;
      nm.style.fontSize = '11px';
      var ok = el('span');
      ok.textContent = idx >= 0 ? ' \u2713' : ' \u2014';
      ok.style.color = idx >= 0 ? 'var(--green)' : 'var(--ink3)';
      append(ti, num, nm, ok);
      tlist.appendChild(ti);
    });
    append(td, tlist);
    sb.appendChild(td);
  }

  // Jewels
  var jd = el('div');
  append(jd, sectionLabel('Joyaux disponibles \u2b50'));
  JEWELS.forEach(function(j) {
    var k = [j.a,j.b].sort().join('|');
    var used = net && net.segs[k];
    append(jd, jewelRow(j, used));
  });
  sb.appendChild(jd);

  // Metrics
  if (S.sequence.length >= 2) {
    var md = el('div');
    append(md, sectionLabel('R\u00e9seau en cours'));
    var mg = el('div', {cls:'metrics'});
    var wagClass = wagons <= 30 ? 'good' : wagons <= 44 ? 'warn' : 'bad';
    append(mg,
      metricCard('Wagons', wagons+'/45', null, wagClass),
      metricCard('Connect\u00e9', connected ? '\u2713' : '\u2717', null, connected ? 'good' : 'bad'),
      metricCard('Wagons ok', wagons<=45 ? '\u2713' : '\u2717', null, wagons<=45 ? 'good' : 'bad')
    );
    append(md, mg);
    sb.appendChild(md);
  }

  var btnRow = el('div', {cls:'btn-row'});
  var valBtn = btn('Valider le r\u00e9seau \u2192', true, function(){ goStep(3); }, !(net && wagons <= 45));
  valBtn.id = 'btn-validate';
  append(btnRow,
    btn('\u2190 Retour', false, function(){
      goStep(!S.freeMode && S.longTicket !== null ? '1b' : 1);
    }),
    btn('Effacer', false, function(){ clearSequence(); }),
    valBtn
  );
  sb.appendChild(btnRow);
}

function renderStep3(sb) {
  var net = S.network;
  if (!net) { sb.appendChild(infoBox('Erreur r\u00e9seau')); return; }
  var ptsR = ptsFromSegs(net.segs);

  if (S.freeMode) {
    var score = ptsR + 10;
    var validLong = LONG_TICKETS.filter(function(t){
      var ab = ticketCities(t.name);
      return CITIES[ab[0]] && CITIES[ab[1]] && areConnected(ab[0],ab[1],net.segs);
    }).sort(function(a,b){return b.pts-a.pts;});
    var validShort = SHORT_TICKETS.filter(function(t){
      var ab = ticketCities(t.name);
      return CITIES[ab[0]] && CITIES[ab[1]] && areConnected(ab[0],ab[1],net.segs);
    }).sort(function(a,b){return b.pts-a.pts;});
    var bestLong = validLong[0] || null;
    var best3 = validShort.slice(0,3);
    var bonusTotal = (bestLong?bestLong.pts:0) + best3.reduce(function(s,t){return s+t.pts;},0);

    append(sb, sectionLabel('R\u00e9seau libre \u2713'));
    var mg = el('div', {cls:'metrics'});
    append(mg,
      metricCard('Wagons', net.wagons+'/45', (45-net.wagons)+' restants', 'good'),
      metricCard('Pts routes', ptsR, null, 'good'),
      metricCard('Total', score, ptsR+' routes + 10', 'good')
    );
    sb.appendChild(mg);

    append(sb, sectionLabel('Meilleure combinaison tickets (1 long + 3 courts max)'));
    if (bonusTotal > 0) {
      sb.appendChild(infoBox('Bonus potentiel : +'+bonusTotal+' pts \u2192 score total '+(score+bonusTotal)+' pts', 'good'));
      if (bestLong) sb.appendChild(ticketCard(bestLong.name, bestLong.pts, '#E63946', false, true, null));
      best3.forEach(function(t){ sb.appendChild(ticketCard(t.name, t.pts, 'var(--green)', false, false, null)); });
    } else {
      sb.appendChild(infoBox('Aucun ticket valid\u00e9 par ce r\u00e9seau.', 'warn'));
    }

    append(sb, sectionLabel('Joyaux int\u00e9gr\u00e9s'));
    JEWELS.forEach(function(j){ var k=[j.a,j.b].sort().join('|'); sb.appendChild(jewelRow(j,net.segs[k])); });

    var br = el('div', {cls:'btn-row'});
    append(br, btn('\u2190 Modifier', false, function(){ goStep(2); }), btn('Analyse \u2192', true, function(){ goStep(4); }));
    sb.appendChild(br);
    return;
  }

  var tickets = [];
  if (S.longTicket !== null) tickets.push(LONG_TICKETS[S.longTicket]);
  S.shortTickets.forEach(function(i){ tickets.push(SHORT_TICKETS[i]); });
  var ticketResults = tickets.map(function(t){
    var ab = ticketCities(t.name);
    var ok = areConnected(ab[0],ab[1],net.segs);
    return {name:t.name, pts:t.pts, ok:ok, score:ok?t.pts:-t.pts};
  });
  var ptsT = ticketResults.reduce(function(s,t){return s+t.score;},0);
  var score = ptsR + ptsT + 10;

  append(sb, sectionLabel('R\u00e9seau valid\u00e9 \u2713'));
  var mg = el('div', {cls:'metrics'});
  append(mg,
    metricCard('Wagons', net.wagons+'/45', (45-net.wagons)+' restants', 'good'),
    metricCard('Pts routes', ptsR, null, 'good'),
    metricCard('Score total', score, ptsT+' tickets + '+ptsR+' routes + 10', 'good')
  );
  sb.appendChild(mg);

  append(sb, sectionLabel('Tickets'));
  ticketResults.forEach(function(t){
    var d = el('div', {cls:'ticket-card'});
    d.style.setProperty('--tc', t.ok ? 'var(--green)' : 'var(--red)');
    var hdr = el('div', {cls:'t-header'});
    var nm = el('div', {cls:'t-name', text:t.name});
    var pts = el('div', {cls:'t-pts', text:(t.ok?'+':'\u2212')+t.pts+'pts'});
    pts.style.color = t.ok ? 'var(--green)' : 'var(--red)';
    var meta = el('div', {cls:'t-meta', text:t.ok ? '\u2713 Compl\u00e9t\u00e9' : '\u2717 Non r\u00e9alis\u00e9 \u2014 malus \u2212'+t.pts+' pts'});
    append(hdr, nm, pts);
    append(d, hdr, meta);
    sb.appendChild(d);
  });

  append(sb, sectionLabel('Joyaux int\u00e9gr\u00e9s'));
  JEWELS.forEach(function(j){ var k=[j.a,j.b].sort().join('|'); sb.appendChild(jewelRow(j,net.segs[k])); });

  var br = el('div', {cls:'btn-row'});
  append(br, btn('\u2190 Modifier', false, function(){ goStep(2); }), btn('Analyse compl\u00e8te \u2192', true, function(){ goStep(4); }));
  sb.appendChild(br);
}

function renderStep4(sb) {
  var net = S.network;
  if (!net) { sb.appendChild(infoBox('Erreur')); return; }
  var ptsR = ptsFromSegs(net.segs);
  var wagonsLeft = 45 - net.wagons;

  if (S.freeMode) {
    var score = ptsR + 10;
    var validLong = LONG_TICKETS.filter(function(t){
      var ab=ticketCities(t.name); return CITIES[ab[0]]&&CITIES[ab[1]]&&areConnected(ab[0],ab[1],net.segs);
    }).sort(function(a,b){return b.pts-a.pts;});
    var validShort = SHORT_TICKETS.filter(function(t){
      var ab=ticketCities(t.name); return CITIES[ab[0]]&&CITIES[ab[1]]&&areConnected(ab[0],ab[1],net.segs);
    }).sort(function(a,b){return b.pts-a.pts;});
    var bestLong = validLong[0]||null;
    var best3 = validShort.slice(0,3);
    var bonusTotal = (bestLong?bestLong.pts:0)+best3.reduce(function(s,t){return s+t.pts;},0);

    append(sb, sectionLabel('Score libre'));
    var mg = el('div', {cls:'metrics'});
    append(mg,
      metricCard('Wagons', net.wagons+'/45', null, 'good'),
      metricCard('Pts routes', ptsR, null, 'good'),
      metricCard('Total', score, '+10 bonus', 'good')
    );
    sb.appendChild(mg);

    append(sb, sectionLabel('Tickets valid\u00e9s (1 long + 3 courts max)'));
    if (bonusTotal > 0) {
      sb.appendChild(infoBox('Si tu avais tir\u00e9 ces tickets : +'+bonusTotal+' pts \u2192 score total '+(score+bonusTotal)+' pts', 'good'));
      if (bestLong) sb.appendChild(ticketCard(bestLong.name, bestLong.pts, '#E63946', false, true, null));
      best3.forEach(function(t){ sb.appendChild(ticketCard(t.name, t.pts, 'var(--green)', false, false, null)); });
    } else {
      sb.appendChild(infoBox('Aucun ticket valid\u00e9 par ce r\u00e9seau.', 'warn'));
    }

    var br = el('div', {cls:'btn-row'});
    append(br, btn('\u2190 Modifier', false, function(){ goStep(2); }), btn('\u21ba Nouveau', false, function(){ resetAll(); }));
    br.lastChild.className = 'btn danger';
    sb.appendChild(br);
    return;
  }

  var tickets = [];
  if (S.longTicket !== null) tickets.push(LONG_TICKETS[S.longTicket]);
  S.shortTickets.forEach(function(i){ tickets.push(SHORT_TICKETS[i]); });
  var ticketResults = tickets.map(function(t){
    var ab=ticketCities(t.name); var ok=areConnected(ab[0],ab[1],net.segs);
    return {name:t.name,pts:t.pts,ok:ok,score:ok?t.pts:-t.pts};
  });
  var ptsT = ticketResults.reduce(function(s,t){return s+t.score;},0);
  var score = ptsR + ptsT + 10;

  append(sb, sectionLabel('Score final'));
  var mg = el('div', {cls:'metrics'});
  append(mg,
    metricCard('Tickets', ptsT, null, 'good'),
    metricCard('Routes', ptsR, null, 'good'),
    metricCard('Total', score, '+10 bonus', 'good')
  );
  sb.appendChild(mg);

  // Wagons restants + joyaux accessibles
  if (wagonsLeft > 0) {
    var accessibleJewels = JEWELS.filter(function(j){
      var k=[j.a,j.b].sort().join('|'); return !net.segs[k] && j.w <= wagonsLeft;
    });
    if (accessibleJewels.length > 0) {
      var jd = el('div');
      append(jd, sectionLabel('Joyaux accessibles (' + wagonsLeft + ' wagons restants)'));
      accessibleJewels.forEach(function(j) {
        var row = el('div', {cls:'jewel-row'});
        var dot = el('div', {cls:'jewel-dot'});
        var nm = el('div', {cls:'jewel-name', text:j.label+' ('+j.w+'w \u2192 +'+j.pts+'pts)'});
        var addBtn = btn('Ajouter', true, function(){ addJewel(j.a, j.b); });
        addBtn.style.cssText = 'padding:3px 8px;height:auto;font-size:11px';
        append(row, dot, nm, addBtn);
        jd.appendChild(row);
      });
      sb.appendChild(jd);
    }
  }

  // Goulots
  var singleSegs = Object.keys(net.segs).filter(function(k){
    var r = ROUTES.filter(function(r){ return [r[0],r[1]].sort().join('|')===k; })[0];
    return r && !r[3] && r[2] >= 4;
  });
  if (singleSegs.length) {
    append(sb, sectionLabel('Goulots \u00e0 surveiller'));
    var sl = el('div', {cls:'seg-list'});
    singleSegs.forEach(function(k){
      var ab=k.split('|'); sl.appendChild(el('span',{text:ab[0]+' \u2014 '+ab[1]}));
    });
    sb.appendChild(sl);
    sb.appendChild(infoBox('Liaisons simples critiques \u2014 construire en priorit\u00e9 !', 'warn'));
  }

  var br = el('div', {cls:'btn-row'});
  var backBtn = btn('\u2190 Modifier', false, function(){ goStep(2); });
  var newBtn = btn('\u21ba Nouveau tirage', false, function(){ resetAll(); });
  newBtn.className = 'btn danger';
  append(br, backBtn, newBtn);
  sb.appendChild(br);
}

// ── ACTIONS ──────────────────────────────────────────────────────────────────
function selectLong(i) { S.longTicket = S.longTicket===i ? null : i; render(); draw(); }
function addShort(sel) {
  if (!sel.value || S.shortTickets.length >= 3) return;
  S.shortTickets.push(parseInt(sel.value));
  sel.value = '';
  render(); draw();
}
function removeShort(si) { S.shortTickets.splice(si,1); render(); draw(); }
function clearSequence() { S.sequence.length = 0; render(); draw(); }
function toggleFreeMode() {
  S.freeMode = !S.freeMode;
  if (S.freeMode) { S.longTicket=null; S.shortTickets=[]; }
  render(); draw();
}
function resetAll() {
  S.step=1; S.freeMode=false; S.longTicket=null; S.shortTickets=[];
  S.sequence=[]; S.network=null; S.drawnTickets=[]; S.keptTickets=[];
  render(); draw();
}

function goStep(n) {
  if (n===3) {
    var net = buildNetworkFromSeq(S.sequence);
    if (!net) { alert('R\u00e9seau invalide \u2014 trop de wagons ou chemin impossible'); return; }
    S.network = net;
  }
  S.step = n; render(); draw();
}

function addJewel(a, b) {
  var net = S.network; if (!net) return;
  var r = dijkstra(a,b); if (!r) return;
  var wagons = net.wagons;
  Object.keys(segsFromPath(r.path)).forEach(function(seg){
    if (!net.segs[seg]) {
      net.segs[seg] = true;
      var ro = ROUTES.filter(function(ro){ return [ro[0],ro[1]].sort().join('|')===seg; })[0];
      wagons += ro ? ro[2] : 0;
    }
  });
  if (wagons > 45) { alert('Pas assez de wagons !'); return; }
  net.wagons = wagons;
  render(); draw();
}

function handleMapClick(e) {
  if (S.step !== 2) return;
  var rect = canvas.getBoundingClientRect();
  var scaleX = canvas.width/rect.width, scaleY = canvas.height/rect.height;
  var cx = (e.clientX-rect.left)*scaleX, cy = (e.clientY-rect.top)*scaleY;
  var best = null, bestD = 20*Math.max(scaleX,scaleY);
  Object.keys(CITIES).forEach(function(name){
    var p = cityPos(name);
    var d = Math.sqrt((p[0]-cx)*(p[0]-cx)+(p[1]-cy)*(p[1]-cy));
    if (d < bestD) { bestD=d; best=name; }
  });
  if (!best) return;
  if (S.sequence.length > 0 && S.sequence[S.sequence.length-1] === best) {
    S.sequence.pop();
  } else if (S.sequence.indexOf(best) < 0) {
    S.sequence.push(best);
  }
  render(); draw();
}

// ── TOGGLE MAP ──────────────────────────────────────────────────────────────
var mapFullscreen = false;
function toggleView() {
  mapFullscreen = !mapFullscreen;
  var mapArea = document.getElementById('mapArea');
  var sidebar = document.getElementById('sidebar');
  var tbtn = document.getElementById('toggleBtn');
  if (mapFullscreen) {
    mapArea.classList.add('fullscreen');
    sidebar.classList.add('hidden');
    tbtn.textContent = '\ud83d\udccb';
  } else {
    mapArea.classList.remove('fullscreen');
    sidebar.classList.remove('hidden');
    tbtn.textContent = '\ud83d\uddfa';
  }
  setTimeout(function(){ resize(); draw(); }, 50);
}

// ── INIT ──────────────────────────────────────────────────────────────────────
function resize() {
  if (!canvas) return;
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  draw();
}

function initApp() {
  canvas = document.getElementById('map');
  ctx = canvas.getContext('2d');
  canvas.addEventListener('click', handleMapClick);
  window.addEventListener('resize', resize);
  resize();
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
