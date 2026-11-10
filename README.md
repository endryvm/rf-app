# RF App — Rompiendo Fortalezas

App web para el equipo de músicos y cantantes de la iglesia **Rompiendo Fortalezas**
(repertorio, servicios, cifrados, ensayos y mezcla de in-ears). Proyecto **personal**
de Endry Vásquez (cuenta GitHub **endryvm** y Supabase personal) — **no** es de Launch Media.

En vivo: **https://app.rfortalezas.com** (también `endryvm.github.io/rf-app`).

---

## Cómo está hecho (importante)

Es una **app web de un solo archivo**: todo el HTML, CSS y JavaScript viven dentro de
**`index.html`** (~3.100 líneas, legible y sin minificar). **Ese archivo ES el código fuente**:
se edita directo con cualquier editor o IA, sin pasos de compilación.

| Archivo | Qué es |
|---|---|
| `index.html` | La app completa (HTML + CSS + JS inline). Aquí se trabaja. |
| `config.js` | `window.RF_CFG = { url, key, vapid }` de Supabase. La `key` es **publishable** (pública por diseño; la seguridad la dan las reglas RLS de Supabase). **Nunca** poner aquí la clave `service_role`/secreta. |
| `manifest.webmanifest`, `sw.js` | PWA (instalable, offline básico). |
| `icon-180/192/512.png` | Íconos (logo RF dorado sobre negro). |
| `CNAME` | Dominio `app.rfortalezas.com` (GitHub Pages). **No borrar.** |
| `privacidad.html`, `drive.html` | Páginas sueltas de apoyo. |

**Backend:** Supabase (proyecto personal **"RF Project"**) — tablas, reglas RLS de quién ve/edita,
tiempo real y el canal de la mezcla. Login por enlace mágico (código al correo) y por usuario/contraseña.

---

## Cómo trabajarla (desde cualquier máquina o IA)

```bash
git clone https://github.com/endryvm/rf-app.git
cd rf-app
# edita index.html con tu editor/IA favorito
# pruébala abriendo index.html en el navegador (con config.js al lado)
git add -A && git commit -m "describe el cambio"
git push
```

**Publicar = `git push` a `main`.** GitHub Pages reconstruye en 1–2 min y queda en
`app.rfortalezas.com`. (Alternativa histórica: `~/Documents/RF App - subir a GitHub/Publicar RF App.command`,
que sube por la API de `gh`; ambas llegan al mismo sitio.)

> Nota de identidad: en el Mac de desarrollo el `git` global está puesto como la cuenta de **Launch**.
> Para estos repos personales, fija la identidad **local**:
> `git config user.name "Endry Vásquez"` · `git config user.email "endryvm@users.noreply.github.com"`.

---

## App nativa (iPhone / Android)

La versión nativa envuelve esta misma web con **Capacitor** (proyecto en
`~/Documents/RF App Android`, paquete `com.rfortalezas.app`). Añade acceso **directo a la consola
Behringer X32** por UDP/OSC (plugin propio **RFUdp**) para la mezcla de in-ears en vivo; la web
hace lo mismo pero pasando por la nube.

- **TestFlight (iPhone):** enlace del equipo → `https://testflight.apple.com/join/5BfpG8J7`
- Nuevas versiones nativas: `~/Documents/RF App Android/Subir a TestFlight.command`.

---

## Reglas del proyecto (texto y estilo)

- **No** usar la palabra «alabanza» en la app; usar **«canciones»**.
- La iglesia **no** hace Santa Cena; ofrenda sí.
- No representar a la iglesia como una «fortaleza».
- Estilo Apple: negro y blanco, acentos **dorado `#d4af37`** y **azul `#0a84ff`**; se siente premium y fácil.
- Textos humanos y cercanos, nada corporativo.
