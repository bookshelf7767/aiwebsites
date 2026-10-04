# Whimsi Planner

A learning project built with React, TypeScript, Vite, and Tailwind CSS.

## Features
- Schedule activities with date, time, and duration.
- Complete activities and feed their XP to a pet.
- Earn 10 XP per activity hour.
- Pet evolution at 100 XP and 200 XP.
- Four selectable pets: Lai the Lion, Junik the Jaguar, Daniel the Dog, Hyun the Hyena.
- Browser persistence with localStorage.
- Responsive Tailwind CSS interface.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Build it

```bash
npm run build
npm run preview
```

## Main learning files
- `src/App.tsx` — React UI, state, event handlers, TypeScript types, XP/evolution logic.
- `src/index.css` — Tailwind import plus the tiny amount of custom CSS used for global styles/animation.
- `src/main.tsx` — mounts the React application into `index.html`.
- `vite.config.ts` — enables React and Tailwind's Vite plugin.
