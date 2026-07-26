# The Royal Stone & Wall Facing — Website

A static site (HTML/CSS/JS) with a free, no-code content editor built in.

## Folder structure
```
index.html         → the whole site (Home, Products, Services, Gallery, FAQ, Contact)
css/style.css       → all styling
js/script.js        → all interactivity (tabs, gallery filter/lightbox, FAQ, counters, animations)
images/             → logo, favicon, uploaded photos
content/            → products.json, gallery.json, faq.json — the editable content (edit these via /admin, not by hand)
admin/              → the content editor panel (Decap CMS)
netlify.toml        → hosting configuration for Netlify
```

## Hosting: Netlify (needed for the /admin editor to work)
The site itself is plain HTML/CSS/JS and could run anywhere, but the `/admin` content editor specifically needs **Netlify Identity** and **Git Gateway**, so it must be hosted on Netlify (not GitHub Pages) for editing to work.

1. Go to **netlify.com** → sign up (free) → **Add new site → Import an existing project**.
2. Connect it to this GitHub repository.
3. Build settings: leave **Build command** empty and **Publish directory** as `.` (root) — there's no build step.
4. Deploy. Netlify gives you a `something.netlify.app` URL immediately.
5. Move your custom domain (`theroyalstone.shop`) over: in Netlify, go to **Domain settings → Add a domain**, enter `theroyalstone.shop`, then update your DNS records at your registrar to point to Netlify instead of GitHub (Netlify shows you the exact records to use once you add the domain).
6. In the Netlify dashboard for this site, go to **Site configuration → Identity → Enable Identity**.
7. Under Identity → **Registration**, set it to **Invite only** (important — this stops random people from signing up as editors).
8. Under Identity → **Services**, enable **Git Gateway** — this is what lets logged-in editors save changes back to this repository without needing their own GitHub account.
9. Go to the **Identity** tab (top of the site dashboard) → **Invite users** → enter your client's email. They'll get an email invite to set a password.

## How your client edits content (no coding, no GitHub)
1. They go to `https://theroyalstone.shop/admin/`
2. Log in with the email/password from their invite
3. Pick **Products**, **Gallery**, or **FAQ** from the sidebar
4. Add, edit, reorder, or delete entries — including uploading their own photos directly
5. Click **Publish** — the live site updates within about a minute

## Editing content yourself, without the CMS
- `content/products.json`, `content/gallery.json`, `content/faq.json` can also be edited directly on GitHub if you ever prefer that — each is a plain JSON list. The CMS is just a friendlier way to edit the same files.
- Colors, spacing, fonts: edit `css/style.css` (brand colors are CSS variables at the top).
- Page text/sections/links: edit `index.html`.
- Logo: replace `images/logo-icon.png` and/or `images/logo-full.png` with a same-named file to update it everywhere.

## Notes
- Product and gallery photos are currently hotlinked from Pexels (free-license stock photography) as placeholders — replace them with real photos any time, either through the CMS (upload a new photo per entry) or by editing the JSON directly.
- The contact form redirects to WhatsApp (`wa.me`) with the submitted details pre-filled — no backend or paid service required.
