# Open Whimsi Planner in VS Code

1. Extract the ZIP file.
2. Open VS Code.
3. Choose **File > Open Folder...** and select the `whimsi-planner` folder.
4. Open **Terminal > New Terminal**.
5. Install dependencies:

```bash
npm install
```

6. Start the development server:

```bash
npm run dev
```

7. Open the local address Vite prints, normally `http://localhost:5173`.

## Useful VS Code extensions

When VS Code opens the project it may recommend:

- Tailwind CSS IntelliSense
- ESLint

The recommendations live in `.vscode/extensions.json` and are optional.

## Pet evolution rules

- 0–99 XP: Baby form
- 100–199 XP: Adult form
- 200+ XP: Mystical form
- Every completed activity hour earns 10 XP.

The pet form data is in `src/App.tsx` inside the `PETS` array. This makes it easy to replace emoji visuals with PNG/SVG artwork later.
