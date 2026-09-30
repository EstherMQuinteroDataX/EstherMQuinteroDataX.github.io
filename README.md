# Web personal de Esther

Portfolio hecho con [Astro](https://astro.build) a partir del diseño de Claude Design (versión *Tabs*).
Se publica solo en GitHub Pages cada vez que haces `push` a `main`.

**Dirección:** https://esthermquinterodatax.github.io

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, emails, GitHub, LinkedIn, CV, enlaces de Nayra, fotos | `src/data/site.js` |
| Textos de la web y experiencia (ES y EN) | `src/data/content.js` |
| Certificaciones | `src/data/certs.js` |
| Eventos y formación | `src/data/events.js` |
| Logos de herramientas | `src/data/tools.js` |
| Fotos de la experiencia | `public/assets/` |
| Tu foto y la captura de Nayra | `public/photos/` + `images` en `src/data/site.js` |
| CV descargable | `public/cv/` |
| Cuadernos de notas de eventos (Markdown) | `public/notes/` |

El diseño y la lógica están en `src/components/Portfolio.jsx`.

## Probar en tu ordenador

Necesitas [Node.js](https://nodejs.org) 22 o superior.

```bash
npm install
npm run dev      # abre http://localhost:4321
```

## Publicar por primera vez

1. En GitHub, crea un repositorio **público y vacío** llamado exactamente `EstherMQuinteroDataX.github.io`.
2. Desde esta carpeta:
   ```bash
   git remote add origin https://github.com/EstherMQuinteroDataX/EstherMQuinteroDataX.github.io.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. En la pestaña **Actions** verás el despliegue. En uno o dos minutos la web está en línea.

A partir de ahí: editas, `git commit`, `git push`, y se actualiza sola.

> Si prefieres otro nombre de repositorio (por ejemplo `portfolio`), la web quedará en
> `https://esthermquinterodatax.github.io/portfolio/` y tienes que poner `base: '/portfolio'` en `astro.config.mjs`.
