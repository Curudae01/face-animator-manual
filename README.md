# Face Animator — Manual de usuario

Manual público de **Face Animator v1.6.2** para Second Life.

Este repositorio contiene únicamente documentación para usuarios. **No contiene el código fuente privado del producto.**

## Manual web

La web está preparada dentro de `docs/` para publicarse con GitHub Pages.

URL prevista:

`https://curudae01.github.io/face-animator-manual/`

## Idiomas

- Español
- English
- Português
- Deutsch
- Français
- 日本語

Los nombres técnicos del producto permanecen en inglés en todos los idiomas:

`Config Face Animator`, `PART`, `MODE`, `FACES`, `START`, `DELAYS`, `REPEAT`, `REPEAT_DELAY`, `PENDULUM`, `LINEAR`, `RANDOM`, `INFINITE`.

## Alcance documentado

- Face Animator v1.6.2.
- Hasta 64 PART configuradas, sujeto a memoria disponible.
- Máximo 8 FACES por PART.
- Prueba real: 64 PART × 5 FACES = 320 frames.
- Configuración de estrés: 510 líneas leídas completamente hasta EOF.
- La combinación 64 PART × 8 FACES no ha sido probada y no se garantiza.
- El método actual de visibilidad usa alpha Blinn-Phong; caras PBR no son compatibles con este mecanismo.

## Publicación con GitHub Pages

Configurar en GitHub:

1. **Settings → Pages**
2. **Build and deployment**
3. **Source: Deploy from a branch**
4. Branch: **main**
5. Folder: **/docs**
6. Guardar

## Archivos

- `docs/index.html` — Español.
- `docs/en.html` — English.
- `docs/pt.html` — Português.
- `docs/de.html` — Deutsch.
- `docs/fr.html` — Français.
- `docs/ja.html` — 日本語.
- `docs/styles.css` — diseño responsive.
- `docs/app.js` — búsqueda, navegación, selector de idioma, tema y botones de copiar.
- `docs/.nojekyll` — publicación estática directa.
- `docs/404.html` — retorno al manual.

Manual web: **v1.0**.
