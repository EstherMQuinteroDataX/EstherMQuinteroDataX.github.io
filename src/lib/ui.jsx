import React, { useState } from 'react';

// Converts a CSS declaration string ("color:red;font-size:12px") into a React style object.
const cache = new Map();
export function css(str) {
  if (str == null) return undefined;
  const hit = cache.get(str);
  if (hit) return hit;
  const out = {};
  let depth = 0, start = 0;
  const decls = [];
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ';' && depth === 0) { decls.push(str.slice(start, i)); start = i + 1; }
  }
  decls.push(str.slice(start));
  for (const d of decls) {
    const c = d.indexOf(':');
    if (c < 0) continue;
    const prop = d.slice(0, c).trim();
    const val = d.slice(c + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith('--') ? prop : prop.replace(/^-(webkit|moz|ms)-/, (_, v) => v.charAt(0).toUpperCase() + v.slice(1) + '-').replace(/-([a-z])/g, (_, l) => l.toUpperCase());
    out[key] = val;
  }
  if (cache.size < 5000) cache.set(str, out);
  return out;
}

// Element with a hover style (the design's `style-hover`).
export function Hv({ as: Tag, style, hover, onMouseEnter, onMouseLeave, onFocus, onBlur, ...rest }) {
  const [on, setOn] = useState(false);
  return (
    <Tag
      {...rest}
      style={on ? { ...style, ...hover } : style}
      onMouseEnter={(e) => { setOn(true); onMouseEnter && onMouseEnter(e); }}
      onMouseLeave={(e) => { setOn(false); onMouseLeave && onMouseLeave(e); }}
      onFocus={(e) => { setOn(true); onFocus && onFocus(e); }}
      onBlur={(e) => { setOn(false); onBlur && onBlur(e); }}
    />
  );
}

// Photo slot: shows the image configured in src/data/site.js (images), or a placeholder.
export function ImageSlot({ id, shape, radius, placeholder, style, images = {}, base = '/' }) {
  const src = images[id];
  const r = shape === 'circle' ? '50%' : (radius || 16) + 'px';
  const box = { ...style, borderRadius: r, overflow: 'hidden', position: 'relative' };
  if (src) {
    const url = /^https?:/.test(src) ? src : base + src.replace(/^\//, '');
    return (
      <div style={box}>
        <img src={url} alt={placeholder || ''} loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.8) contrast(.94)' }} />
      </div>
    );
  }
  return (
    <div style={{ ...box, background: 'color-mix(in srgb, var(--surface) 55%, transparent)', border: '2px dashed var(--divider)', boxSizing: 'border-box', display: 'grid', placeItems: 'center', color: 'var(--muted)', fontSize: 13, textAlign: 'center', padding: 16 }}>
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" /></svg>
        {placeholder}
      </span>
    </div>
  );
}
