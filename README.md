# Ossama Saidi – Portfolio (Angular)

Same design as the published portfolio (navy / cream / coral), rebuilt as an Angular app.
Requires **Angular 19 or newer** (standalone components by default, signals, `@for` / `@defer` control flow)
and Node 20+.

## Run it

```bash
npm install -g @angular/cli
ng new ossama-portfolio --style=css --routing=false --ssr=false
cd ossama-portfolio

# remove the generated starter files, then copy this project's src/ over yours
rm -rf src/app src/main.ts src/index.html src/styles.css
cp -r /path/to/this/zip/src/* src/

ng serve          # http://localhost:4200
ng build          # production build -> dist/ossama-portfolio/browser
```

Deploy the `dist/ossama-portfolio/browser` folder to Netlify, Vercel, Cloudflare Pages or GitHub Pages
(for GitHub Pages add `--base-href /your-repo-name/` to `ng build`).

## Where to change things

| I want to change…              | Edit                                           |
| ------------------------------ | ---------------------------------------------- |
| Text, jobs, projects, skills   | `src/app/core/portfolio.data.ts`               |
| Colors (navy / cream / coral)  | the `:root` variables at the top of `src/styles.css` |
| Photo                          | the `<svg>` inside `components/hero/hero.component.html` |
| Email / LinkedIn               | `PROFILE` in `portfolio.data.ts`               |

## Angular concepts used, and where to read them

| Concept                         | File                                                        |
| ------------------------------- | ----------------------------------------------------------- |
| Standalone components           | every `*.component.ts` (no NgModule anywhere)               |
| Signals (`signal`, `effect`)    | `core/scroll.service.ts`, `header`, `experience`, `about`   |
| Signal queries                  | `viewChild`, `viewChildren` in `header`, `experience`, `hero` |
| Signal inputs and outputs       | `input.required` in `count-up.directive.ts`, `output` in `reveal.directive.ts` |
| Control flow `@for`, `@if`      | all templates                                               |
| `@defer (on viewport)`          | `components/projects/projects.component.html`               |
| Services with `inject()`        | `core/scroll.service.ts`, `core/toast.service.ts`           |
| Attribute directives            | `directives/` (reveal, tilt, magnetic, count-up)            |
| `host` listeners                | `components/header/header.component.ts`                     |
| `NgZone.runOutsideAngular`      | particle canvas, cursor ring, directives (keeps scrolling smooth) |
| `OnPush` change detection       | every component                                             |
| Typed data and interfaces       | `core/portfolio.data.ts`                                    |

## Honest note

This project was written without being able to run `npm install` or `ng build` where it was authored,
so it has had a syntax check but **no real compile**. If `ng serve` prints an error, send it to me and
I'll fix it. The CSS in `styles.css` is the same stylesheet that was tested in a browser on desktop
and mobile for the plain HTML version.



# Quick Commands
Start Dev Server: npm start (or npx ng serve)
Production Build: npm run build (or npx ng build)