// Hand-drawn, animated sketches for the event notebooks. Referenced from notes via "::sketch <id>".
(function () {
  const INK = '#2a2622', TC = '#c67139', SG = '#7a8a5e', MU = '#8a7f70', PAPER = '#fbf3e4';
  const drawStyle = (delay, dur) => `stroke-dasharray:1;stroke-dashoffset:1;animation:nbDraw ${dur}s ease-out ${delay}s forwards`;
  const path = (d, o = {}) => `<path d="${d}" pathLength="1" fill="none" stroke="${o.c || INK}" stroke-width="${o.w || 2.2}" stroke-linecap="round" stroke-linejoin="round" style="${drawStyle(o.delay || 0, o.dur || 0.8)}"/>`;
  const dashed = (d, o = {}) => `<path d="${d}" fill="none" stroke="${o.c || MU}" stroke-width="${o.w || 2}" stroke-dasharray="5 6" stroke-linecap="round" style="opacity:0;animation:nbFade .5s ${o.delay || 0}s forwards"/>`;
  const ring = (cx, cy, r, o = {}) => `<circle cx="${cx}" cy="${cy}" r="${r}" pathLength="1" fill="${o.fill || 'none'}" stroke="${o.c || INK}" stroke-width="${o.w || 2.2}" style="${drawStyle(o.delay || 0, o.dur || 0.9)}"/>`;
  const box = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 12}" pathLength="1" fill="none" stroke="${o.c || INK}" stroke-width="${o.w || 2.2}" style="${drawStyle(o.delay || 0, o.dur || 0.9)}"/>`;
  const pop = (cx, cy, r, fill, delay = 0, extra = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra} style="transform-box:fill-box;transform-origin:center;transform:scale(0);animation:nbPop .5s cubic-bezier(.3,1.6,.5,1) ${delay}s forwards"/>`;
  const text = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size || 13}" fill="${o.c || INK}" text-anchor="${o.anchor || 'middle'}" font-weight="${o.weight || 400}" ${o.font ? `font-family="${o.font}"` : ''} style="opacity:0;animation:nbFade .45s ${o.delay || 0}s forwards">${s}</text>`;
  const arrow = (x1, y1, x2, y2, o = {}) => {
    const a = Math.atan2(y2 - y1, x2 - x1), L = o.head || 9;
    const hx1 = x2 - L * Math.cos(a - 0.5), hy1 = y2 - L * Math.sin(a - 0.5), hx2 = x2 - L * Math.cos(a + 0.5), hy2 = y2 - L * Math.sin(a + 0.5);
    const d = o.curve ? `M${x1} ${y1} Q ${o.curve[0]} ${o.curve[1]} ${x2} ${y2}` : `M${x1} ${y1} L ${x2} ${y2}`;
    return path(d, o) + path(`M${hx1.toFixed(1)} ${hy1.toFixed(1)} L ${x2} ${y2} L ${hx2.toFixed(1)} ${hy2.toFixed(1)}`, { ...o, delay: (o.delay || 0) + (o.dur || 0.8) * 0.8, dur: 0.25 });
  };
  const svg = (uid, h, strokes, texts) => `<svg viewBox="0 0 360 ${h}" width="100%" style="display:block;overflow:visible" xmlns="http://www.w3.org/2000/svg" font-family="Kalam, cursive"><defs><filter id="rough${uid}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.4"/></filter></defs><g filter="url(#rough${uid})">${strokes}</g>${texts}</svg>`;
  const along = (d, r, fill, delay, dur = 2.6) => `<circle r="${r}" fill="${fill}" style="offset-path:path('${d}');offset-distance:0%;opacity:0;animation:nbAlong ${dur}s ease-in-out ${delay}s infinite"/>`;

  const S = {};

  S.five = { h: 200, svg: uid => {
    const pts = [[30, 146, 'Identity &amp; access', 30, 184, 'start'], [100, 80, 'RBAC', 100, 50], [170, 126, 'Models', 170, 166], [250, 146, 'Data &amp; privacy', 250, 186], [320, 62, 'Capabilities', 312, 30]];
    let st = path('M16 160 C 60 70, 110 50, 150 108 S 220 180, 262 138 S 310 60, 344 44', { c: MU, w: 2, dur: 1.4, delay: 0.1 });
    let tx = '';
    pts.forEach((p, i) => {
      const d = 0.4 + i * 0.28;
      st += pop(p[0], p[1], 17, i % 2 ? SG : TC, d);
      tx += text(p[0], p[1] + 5, String(i + 1), { c: PAPER, size: 15, font: 'Caprasimo, serif', delay: d + 0.15 });
      tx += text(p[3], p[4], p[2], { size: 13, anchor: p[5] || 'middle', delay: d + 0.2, weight: 700 });
    });
    tx += text(344, 64, 'launch', { size: 11, c: MU, anchor: 'end', delay: 2 });
    return svg(uid, 200, st, tx);
  } };

  S.opus = { h: 184, svg: uid => {
    const rows = [['price', 0.75, '−25%'], ['cache reads', 0.4, '−60%'], ['speed', 1.4, '+40%'], ['tokens', 0.7, '−30%']];
    const X = 110, B = 150;
    let st = '', tx = '';
    rows.forEach((r, i) => {
      const y = 18 + i * 38, d = 0.2 + i * 0.25, w = Math.round(B * r[1]);
      tx += text(10, y + 15, r[0], { anchor: 'start', size: 14, delay: d });
      st += dashed(`M${X} ${y} H ${X + B} V ${y + 20} H ${X} Z`, { delay: d });
      st += `<rect x="${X}" y="${y + 4}" width="${w}" height="12" rx="6" fill="${i === 2 ? SG : TC}" style="transform-box:fill-box;transform-origin:left center;transform:scaleX(0);animation:nbGrowX .8s cubic-bezier(.2,.7,.2,1) ${d + 0.2}s forwards"/>`;
      tx += i === 2 ? text(X + w - 8, y + 15, r[2], { anchor: 'end', size: 13, c: PAPER, weight: 700, delay: d + 0.9 }) : text(X + B + 10, y + 15, r[2], { anchor: 'start', size: 15, c: '#8c491a', weight: 700, delay: d + 0.9 });
    });
    st += dashed('M110 168 h 22 v 10 h -22 Z', { delay: 1.4 });
    st += `<rect x="200" y="168" width="22" height="10" rx="5" fill="${TC}" style="opacity:0;animation:nbFade .4s 1.4s forwards"/>`;
    tx += text(138, 177, 'Opus 5', { anchor: 'start', size: 12, c: MU, delay: 1.4 }) + text(228, 177, 'Opus 5.5', { anchor: 'start', size: 12, c: MU, delay: 1.4 });
    return svg(uid, 184, st, tx);
  } };

  S.provision = { h: 160, svg: uid => {
    let st = arrow(20, 112, 340, 112, { c: MU, w: 2, dur: 1 });
    st += ring(60, 112, 11, { fill: PAPER, delay: 0.5 }) + ring(170, 112, 14, { fill: PAPER, delay: 0.75 });
    st += pop(290, 112, 20, SG, 1);
    st += `<g style="transform-box:view-box;transform-origin:290px 112px;animation:nbSpin 5s linear infinite">${path('M262 112 A 28 28 0 0 1 305 88', { c: TC, delay: 1.2, dur: 0.5 })}${path('M318 112 A 28 28 0 0 1 275 136', { c: TC, delay: 1.3, dur: 0.5 })}${path('M298 82 L 305 88 L 297 94', { c: TC, delay: 1.6, dur: 0.2 })}${path('M282 142 L 275 136 L 283 130', { c: TC, delay: 1.6, dur: 0.2 })}</g>`;
    let tx = text(60, 86, 'Invite only', { weight: 700, delay: 0.6 }) + text(170, 84, 'JIT', { weight: 700, delay: 0.85 }) + text(170, 146, 'on first login', { size: 12, c: MU, delay: 0.9 });
    tx += text(290, 70, 'SCIM', { weight: 700, size: 15, delay: 1.1 }) + text(290, 50, 'recommended', { c: '#8c491a', size: 12, delay: 1.4 });
    tx += text(20, 140, 'manual', { anchor: 'start', size: 12, c: MU, delay: 0.3 }) + text(340, 156, 'automated', { anchor: 'end', size: 12, c: MU, delay: 0.3 });
    return svg(uid, 160, st, tx);
  } };

  S.rbac = { h: 212, svg: uid => {
    const ys = [52, 78, 104, 140, 166, 192];
    let st = '', tx = text(34, 22, 'members', { c: SG, weight: 700, size: 12 }) + text(152, 22, 'groups', { c: SG, weight: 700, size: 12 }) + text(286, 22, 'roles', { c: SG, weight: 700, size: 12 });
    ys.forEach((y, i) => { st += pop(34, y, 7, INK, 0.1 + i * 0.08); });
    const targets = [[118, 78], [118, 78], [118, 78], [122, 166], [122, 166], [122, 166]];
    ys.forEach((y, i) => { const [tx2, ty] = targets[i]; st += path(`M44 ${y} Q 80 ${(y + ty) / 2} ${tx2} ${ty}`, { c: MU, w: 1.6, delay: 0.6 + i * 0.05, dur: 0.5 }); });
    st += ring(152, 78, 34, { c: TC, w: 2.6, delay: 0.9 }) + ring(152, 166, 30, { c: SG, w: 2.6, delay: 1 });
    st += arrow(190, 78, 236, 78, { delay: 1.4, dur: 0.4 }) + arrow(186, 166, 236, 166, { delay: 1.5, dur: 0.4 });
    st += box(242, 58, 96, 40, { delay: 1.7 }) + box(242, 146, 96, 40, { delay: 1.8 });
    ys.forEach((y, i) => { const [tx2, ty] = targets[i]; st += along(`M44 ${y} Q 80 ${(y + ty) / 2} ${tx2} ${ty}`, 3.5, TC, 2.2 + i * 0.35, 2.8); });
    tx += text(152, 83, 'Builders', { weight: 700, delay: 1.1 }) + text(152, 163, 'Finance', { weight: 700, size: 12, delay: 1.2 }) + text(152, 177, 'leads', { weight: 700, size: 12, delay: 1.2 });
    tx += text(213, 68, 'apply', { size: 11, c: MU, delay: 1.6 }) + text(290, 83, 'Builder role', { weight: 700, size: 12, delay: 1.9 }) + text(290, 171, 'Finance role', { weight: 700, size: 12, delay: 2 });
    tx += text(290, 118, 'permissions', { size: 11, c: '#8c491a', delay: 2.1 }) + text(290, 131, 'live on the role', { size: 11, c: '#8c491a', delay: 2.1 });
    return svg(uid, 212, st, tx);
  } };

  S.additive = { h: 150, svg: uid => {
    let st = pop(52, 66, 34, SG, 0.1) + path('M100 66 H 124 M112 54 V 78', { delay: 0.5, dur: 0.3 });
    st += `<circle cx="172" cy="66" r="34" fill="none" stroke="${INK}" stroke-width="2.2" stroke-dasharray="5 6" style="opacity:0;animation:nbFade .5s .6s forwards"/>`;
    st += path('M220 60 H 246 M220 72 H 246', { delay: 1, dur: 0.3 });
    st += pop(300, 66, 40, TC, 1.3) + `<circle cx="300" cy="66" r="40" fill="none" stroke="${TC}" stroke-width="2" style="transform-box:fill-box;transform-origin:center;animation:nbPulse 2.4s ease-out 2s infinite"/>`;
    const tx = text(52, 71, 'Group A', { c: PAPER, weight: 700, delay: 0.3 }) + text(52, 122, 'everything', { size: 13, delay: 0.4 })
      + text(172, 71, 'Group B', { weight: 700, delay: 0.7 }) + text(172, 122, 'nothing', { size: 13, delay: 0.8 })
      + text(300, 71, 'you', { c: PAPER, weight: 700, size: 16, delay: 1.5 }) + text(300, 128, 'everything', { size: 13, weight: 700, c: '#8c491a', delay: 1.6 })
      + text(180, 146, 'the broadest permission wins', { size: 12, c: MU, delay: 1.9 });
    return svg(uid, 150, st, tx);
  } };

  S.grant = { h: 176, svg: uid => {
    let st = `<path d="M18 44 L 342 150 L 342 172 L 18 172 Z" fill="rgba(122,138,94,.18)" style="opacity:0;animation:nbFade .6s .1s forwards"/>`;
    st += path('M18 44 L 342 150', { w: 2.6, dur: 0.8 });
    st += arrow(306, 104, 118, 42, { c: TC, w: 5, head: 13, delay: 0.8, dur: 0.9 });
    st += `<g style="offset-path:path('M44 24 L 318 114');offset-rotate:auto;offset-distance:0%;animation:nbRoll 3.2s cubic-bezier(.5,0,.8,.6) 1.4s infinite"><circle r="15" fill="${INK}"/><path d="M-8 -6 L 8 6" stroke="${PAPER}" stroke-width="2" stroke-linecap="round"/></g>`;
    const tx = text(214, 44, 'revoke = uphill push', { c: '#8c491a', weight: 700, delay: 1.3 }) + text(190, 158, 'grant = rolls down on its own', { size: 13, delay: 1 })
      + text(18, 20, 'start restrictive', { anchor: 'start', size: 13, weight: 700, c: SG, delay: 1.8 });
    return svg(uid, 176, st, tx);
  } };

  S.retention = { h: 150, svg: uid => {
    let st = arrow(16, 62, 344, 62, { c: MU, w: 2, dur: 0.9 });
    for (let x = 34; x <= 314; x += 28) st += pop(x, 62, 4.5, x < 180 ? 'rgba(42,38,34,.25)' : INK, 0.3 + x / 900);
    st += path('M180 50 V 40 H 322 V 50', { c: TC, w: 2.4, delay: 0.9, dur: 0.6 }) + path('M322 56 V 70', { w: 2.4, delay: 0.4, dur: 0.3 });
    st += `<rect x="180" y="96" width="142" height="14" rx="7" fill="${SG}" style="transform-box:fill-box;transform-origin:right center;transform:scaleX(0);animation:nbGrowX .9s cubic-bezier(.2,.7,.2,1) 1.3s forwards"/>`;
    st += dashed('M34 103 H 172', { delay: 1.9 });
    const tx = text(251, 30, 'retention: X days', { c: '#8c491a', weight: 700, delay: 1.1 }) + text(322, 86, 'today', { size: 11, c: MU, delay: 0.5 })
      + text(251, 132, 'memory reaches back X days', { size: 13, delay: 1.8 }) + text(104, 132, 'out of reach', { size: 12, c: MU, delay: 2 });
    return svg(uid, 150, st, tx);
  } };

  S.plugins = { h: 190, svg: uid => {
    let st = ring(36, 40, 11, { delay: 0.1 }) + path('M31 29 V 20 M41 29 V 20', { delay: 0.4, dur: 0.3 });
    st += box(25, 84, 22, 28, { rx: 4, delay: 0.3 }) + path('M30 93 H 42 M30 101 H 40', { delay: 0.6, dur: 0.3, w: 1.6 });
    st += pop(36, 152, 13, TC, 0.5) + pop(31, 149, 2, INK, 0.8) + pop(41, 149, 2, INK, 0.8) + path('M31 156 Q 36 160 41 156', { delay: 0.9, dur: 0.3, w: 1.6 });
    st += arrow(134, 40, 186, 70, { delay: 0.9, dur: 0.5, curve: [165, 44] }) + arrow(134, 98, 186, 98, { delay: 1, dur: 0.5 }) + arrow(134, 152, 186, 126, { delay: 1.1, dur: 0.5, curve: [165, 150] });
    st += box(192, 60, 84, 76, { rx: 18, c: TC, w: 2.8, delay: 1.3 });
    st += arrow(282, 98, 304, 98, { delay: 1.8, dur: 0.3 }) + ring(330, 98, 24, { c: SG, w: 2.6, delay: 1.9 });
    const tx = text(56, 44, 'connectors', { anchor: 'start', delay: 0.3 }) + text(56, 102, 'skills', { anchor: 'start', delay: 0.5 }) + text(56, 157, 'agents', { anchor: 'start', delay: 0.7 })
      + text(234, 103, 'plugin', { font: 'Caprasimo, serif', size: 17, delay: 1.5 }) + text(330, 103, 'group', { size: 12, weight: 700, delay: 2.1 })
      + text(234, 162, 'library · default · required', { size: 12, c: MU, delay: 2.2 });
    return svg(uid, 190, st, tx);
  } };

  window.NB_SKETCHES = S;
})();
