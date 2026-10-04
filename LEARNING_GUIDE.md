# Whimsi Planner Learning Guide

This project is intentionally small enough to understand end-to-end while still using a real modern stack: React + TypeScript + Tailwind CSS + Vite.

## 1. The mental model

Think of the stack as four layers:

1. **Vite** starts the development server and bundles the finished app.
2. **React** controls the UI and updates it when state changes.
3. **TypeScript** checks the shape of your data and catches many mistakes before runtime.
4. **Tailwind CSS** handles the visual styling through utility classes placed directly on JSX elements.

A button such as:

```tsx
<button
  onClick={() => setSelectedPet('lion')}
  className="rounded-2xl bg-violet-600 px-4 py-2 font-bold text-white"
>
  Choose Panda
</button>
```

uses all three main technologies at once:

- `<button>...</button>` is JSX rendered by React.
- `onClick={() => setSelectedPet('lion')}` is React behavior.
- TypeScript checks that `'panda'` is an allowed `PetKind`.
- `className="..."` contains Tailwind utilities that style the button.

## 2. Creating the project yourself

Run:

```bash
npm create vite@latest whimsi-planner -- --template react-ts
cd whimsi-planner
npm install
npm install tailwindcss @tailwindcss/vite
```

The `react-ts` template gives you React and TypeScript together.

Then configure `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

And place this at the top of `src/index.css`:

```css
@import "tailwindcss";
```

That is the current Tailwind + Vite integration. Older tutorials may show `tailwind.config.js`, `postcss.config.js`, and three `@tailwind` directives. Those belong to the older v3 workflow and are not required for this setup.

## 3. React: how the app changes on screen

React is based heavily on **state**. State is information that can change while the user uses the app.

Example:

```tsx
const [xp, setXp] = useState(0)
```

- `xp` is the current value.
- `setXp` is the function used to change it.
- `0` is the starting value.

When we call:

```tsx
setXp((current) => current + earnedXp)
```

React stores the new number and rerenders the component. Every place displaying `{xp}` automatically updates.

The app also stores:

```tsx
const [selectedPet, setSelectedPet] = useState<PetKind>('lion')
const [activities, setActivities] = useState<Activity[]>([])
```

So the UI is really a visual representation of those state values.

## 4. TypeScript: defining what data is allowed

This union type:

```ts
type PetKind = 'lion' | 'jaguar' | 'dog' | 'hyena'
```

means a `PetKind` can ONLY be one of those four strings.

This object type:

```ts
type Activity = {
  id: string
  title: string
  date: string
  startTime: string
  hours: number
  completed: boolean
  xpClaimed: boolean
}
```

acts like a contract. Every activity must have those fields with those data types.

So this is valid:

```ts
const activity: Activity = {
  id: '123',
  title: 'Study',
  date: '2026-10-04',
  startTime: '16:00',
  hours: 2,
  completed: false,
  xpClaimed: false,
}
```

But TypeScript would reject something like `hours: 'two'` because `hours` must be a number.

## 5. Tailwind: styling without writing a giant CSS file

Tailwind gives you tiny utility classes.

Example:

```tsx
<div className="rounded-2xl bg-white p-6 shadow-lg">
```

Breakdown:

- `rounded-2xl` gives the element rounded corners.
- `bg-white` makes the background white.
- `p-6` adds padding on all sides.
- `shadow-lg` adds a large shadow.

Responsive example:

```tsx
<div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
```

- `grid` turns the container into CSS Grid.
- `gap-6` puts space between children.
- `lg:` means "apply this only at the large breakpoint and above."
- `lg:grid-cols-[1.2fr_0.8fr]` creates two columns on larger screens.

State-based styling also works because React can build the class string:

```tsx
className={selectedPet === candidate.kind
  ? 'border-violet-500 bg-violet-50'
  : 'border-stone-200 bg-white'
}
```

React chooses which Tailwind classes are used based on application state.

## 6. Adding an activity

The form uses React-controlled inputs:

```tsx
<input
  value={title}
  onChange={(event) => setTitle(event.target.value)}
/>
```

The browser fires the `change` event, React reads the input value, and `setTitle` updates state.

Submission runs:

```tsx
function addActivity(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const newActivity: Activity = {
    id: crypto.randomUUID(),
    title: title.trim(),
    date,
    startTime,
    hours,
    completed: false,
    xpClaimed: false,
  }

  setActivities((current) => [...current, newActivity])
}
```

`event.preventDefault()` stops the browser from reloading the page when the form submits.

`[...current, newActivity]` creates a new array containing all old activities plus the new one. React state should generally be treated as immutable rather than directly modified.

## 7. Completing an activity

To change one item in an array, the code uses `.map()`:

```tsx
setActivities((current) =>
  current.map((activity) =>
    activity.id === id
      ? { ...activity, completed: !activity.completed }
      : activity,
  ),
)
```

This means:

- loop through every activity;
- if its ID matches, create a copy with `completed` flipped;
- otherwise keep it unchanged.

The `{ ...activity }` syntax copies the existing object.

## 8. XP system

The project uses your rule:

```ts
const earnedXp = Math.round(activity.hours * 10)
```

Examples:

- 1 hour = 10 XP
- 2 hours = 20 XP
- 2.5 hours = 25 XP

XP can only be claimed after completion, and each activity can only be claimed once:

```ts
if (!activity.completed || activity.xpClaimed) return
```

That guard clause prevents accidental XP farming. Humanity has already invented enough currencies to exploit.

## 9. Evolution system

The evolution function is deliberately simple:

```ts
function getEvolutionStage(xp: number) {
  if (xp >= 200) return 3
  if (xp >= 100) return 2
  return 1
}
```

The three forms are:

- Stage 1: 0–99 XP
- Stage 2: 100–199 XP
- Stage 3: 200+ XP

So the pet evolves exactly twice.

## 10. Choosing a pet

The pet data is stored in one array:

```ts
const PETS: PetDefinition[] = [
  // lion, jaguar, dog, hyena
]
```

Instead of writing four separate pet components, React maps over the array:

```tsx
{PETS.map((candidate) => (
  <button key={candidate.kind} onClick={() => setSelectedPet(candidate.kind)}>
    {candidate.emoji}
    {candidate.name}
  </button>
))}
```

This is an important React pattern: store similar data in an array, then render it with `.map()`.

## 11. Saving everything with localStorage

Without storage, refreshing the page would erase the schedule and XP.

This effect runs whenever pet, XP, or activities change:

```tsx
useEffect(() => {
  const state = { selectedPet, xp, activities }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}, [selectedPet, xp, activities])
```

`JSON.stringify` converts the JavaScript object into text that browser storage can save.

On startup, `loadState()` reads that saved text and turns it back into an object using `JSON.parse()`.

This is suitable for a single-browser learning project. A production app with accounts would normally use a backend/database instead.

## 12. `useMemo`

The schedule is sorted with:

```tsx
const sortedActivities = useMemo(
  () => [...activities].sort(...),
  [activities],
)
```

`useMemo` tells React to reuse a calculated value until one of its dependencies changes. Here, we only resort when `activities` changes.

This optimization is not essential for a tiny list, but it teaches the pattern cleanly.

## 13. File responsibilities

### `index.html`
Contains the root HTML page and this empty mount point:

```html
<div id="root"></div>
```

### `src/main.tsx`
Finds `#root` and mounts the React application there.

### `src/App.tsx`
Contains the application itself: types, state, event handling, XP logic, pet evolution, scheduling, and JSX.

### `src/index.css`
Loads Tailwind and contains only the custom global CSS that is easier to express as normal CSS, such as the floating animation.

### `vite.config.ts`
Connects the React and Tailwind plugins to Vite.

## 14. Development workflow

A sensible process for extending this project is:

1. Define the new data in TypeScript.
2. Add or update React state.
3. Write the function that changes that state.
4. Render the state in JSX.
5. Connect buttons/forms to the functions.
6. Style the resulting UI with Tailwind.
7. Run the TypeScript/build check.
8. Test the feature manually in the browser.

For example, to add a `notes` field to activities:

1. Add `notes: string` to `Activity`.
2. Add `const [notes, setNotes] = useState('')`.
3. Add a notes input.
4. Add `notes` to `newActivity`.
5. Render `{activity.notes}`.
6. Style it.

That order keeps the data model and behavior clear before decoration starts.

## 15. Good next upgrades

- Real calendar/week view.
- Drag-and-drop scheduling.
- Different art for all three evolutionary forms instead of scaling the same emoji.
- Streak bonuses.
- Hunger/energy meters.
- Pet naming.
- Task categories and colors.
- Authentication and cloud storage.
- Supabase or Firebase backend.
- PWA/offline support.
