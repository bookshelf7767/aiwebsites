import { FormEvent, useEffect, useMemo, useState } from 'react'

type PetKind = 'lion' | 'jaguar' | 'dog' | 'hyena'

type Activity = {
  id: string
  title: string
  date: string
  startTime: string
  hours: number
  completed: boolean
  xpClaimed: boolean
}

type PetForm = {
  name: 'Baby' | 'Adult' | 'Mystical'
  visual: string
  subtitle: string
  aura: string
}

type PetDefinition = {
  kind: PetKind
  name: string
  selectorEmoji: string
  accent: string
  description: string
  forms: [PetForm, PetForm, PetForm]
}

type SavedState = {
  selectedPet: PetKind
  xp: number
  activities: Activity[]
}

const PETS: PetDefinition[] = [
  {
    kind: 'lion',
    name: 'Lai the Lion',
    selectorEmoji: '🦁',
    accent: 'from-amber-200 to-yellow-100',
    description: 'Bold, confident, and ready to turn a finished schedule into a victory roar.',
    forms: [
      { name: 'Baby', visual: '🦁', subtitle: 'Lion Cub', aura: 'bg-amber-50' },
      { name: 'Adult', visual: '🦁👑', subtitle: 'Pride King', aura: 'bg-amber-100' },
      { name: 'Mystical', visual: '✨🦁👑✨', subtitle: 'Solar Guardian', aura: 'bg-yellow-100' },
    ],
  },
  {
    kind: 'jaguar',
    name: 'Junik the Jaguar',
    selectorEmoji: '🐆',
    accent: 'from-orange-200 to-amber-100',
    description: 'Fast, focused, and happiest when your task list disappears one item at a time.',
    forms: [
      { name: 'Baby', visual: '🐆', subtitle: 'Jaguar Cub', aura: 'bg-orange-50' },
      { name: 'Adult', visual: '🐆⚡', subtitle: 'Jungle Hunter', aura: 'bg-orange-100' },
      { name: 'Mystical', visual: '🌙🐆⚡', subtitle: 'Shadow Prowler', aura: 'bg-violet-100' },
    ],
  },
  {
    kind: 'dog',
    name: 'Daniel the Dog',
    selectorEmoji: '🐶',
    accent: 'from-amber-200 to-orange-100',
    description: 'Loyal, energetic, and convinced every completed task deserves a celebration.',
    forms: [
      { name: 'Baby', visual: '🐶', subtitle: 'Puppy', aura: 'bg-amber-50' },
      { name: 'Adult', visual: '🐕🛡️', subtitle: 'Guardian Dog', aura: 'bg-sky-100' },
      { name: 'Mystical', visual: '⚡🐺🛡️', subtitle: 'Storm Hound', aura: 'bg-indigo-100' },
    ],
  },
  {
    kind: 'hyena',
    name: 'Hyun the Hyena',
    selectorEmoji: '🐺',
    accent: 'from-violet-200 to-indigo-100',
    description: 'Clever, persistent, and always ready to laugh at a schedule that thought it could win.',
    forms: [
      { name: 'Baby', visual: '🐺', subtitle: 'Hyena Pup', aura: 'bg-stone-100' },
      { name: 'Adult', visual: '🐺🔥', subtitle: 'Savanna Rogue', aura: 'bg-orange-100' },
      { name: 'Mystical', visual: '🌌🐺🔥', subtitle: 'Chaos Spirit', aura: 'bg-fuchsia-100' },
    ],
  },
]

const STORAGE_KEY = 'whimsi-planner-state-v1'
const VALID_PETS: PetKind[] = ['lion', 'jaguar', 'dog', 'hyena']
const XP_PER_HOUR = 10
const TODAY = new Date().toISOString().slice(0, 10)

function getEvolutionStage(xp: number) {
  if (xp >= 200) return 3
  if (xp >= 100) return 2
  return 1
}

function getNextEvolutionXp(xp: number) {
  if (xp >= 200) return null
  return xp < 100 ? 100 : 200
}

function getProgressPercent(xp: number) {
  const nextEvolutionXp = getNextEvolutionXp(xp)

  if (!nextEvolutionXp) return 100

  const currentStageFloor = xp < 100 ? 0 : 100
  const stageProgress = nextEvolutionXp - currentStageFloor

  return Math.min(100, ((xp - currentStageFloor) / stageProgress) * 100)
}

function loadState(): SavedState {
  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return {
      selectedPet: 'lion',
      xp: 0,
      activities: [],
    }
  }

  try {
    const parsed = JSON.parse(raw) as Partial<SavedState>
    const selectedPet = VALID_PETS.includes(parsed.selectedPet as PetKind)
      ? (parsed.selectedPet as PetKind)
      : 'lion'

    return {
      selectedPet,
      xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
      activities: Array.isArray(parsed.activities) ? parsed.activities : [],
    }
  } catch {
    return {
      selectedPet: 'lion',
      xp: 0,
      activities: [],
    }
  }
}

type AppHeaderProps = { xp: number }

function AppHeader({ xp }: AppHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-xl shadow-stone-200/50 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <p className="mb-2 text-sm font-black uppercase tracking-[0.28em] text-violet-600">
          Whimsi Planner
        </p>
        <h1 className="text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">
          Plan your day. Raise a tiny legend.
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Complete scheduled activities, feed the earned XP to your pet, and evolve it twice as your focus adds up.
        </p>
      </div>
      <div className="rounded-2xl bg-stone-900 px-5 py-3 text-center text-white">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-stone-300">Total XP</div>
        <div className="text-3xl font-black">{xp}</div>
      </div>
    </header>
  )
}

type ActivityFormProps = {
  title: string
  date: string
  startTime: string
  hours: number
  onTitleChange: (value: string) => void
  onDateChange: (value: string) => void
  onStartTimeChange: (value: string) => void
  onHoursChange: (value: number) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function ActivityForm({
  title,
  date,
  startTime,
  hours,
  onTitleChange,
  onDateChange,
  onStartTimeChange,
  onHoursChange,
  onSubmit,
}: ActivityFormProps) {
  return (
    <div className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-lg shadow-stone-200/40 backdrop-blur">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">Schedule</p>
          <h2 className="text-2xl font-black text-stone-900">Add an activity</h2>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
          {XP_PER_HOUR} XP / hour
        </span>
      </div>

      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
        <label className="md:col-span-2">
          <span className="mb-1.5 block text-sm font-bold text-stone-700">Activity</span>
          <input
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Study calculus, swim practice, build robot..."
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />
        </label>

        <label>
          <span className="mb-1.5 block text-sm font-bold text-stone-700">Date</span>
          <input
            type="date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />
        </label>

        <label>
          <span className="mb-1.5 block text-sm font-bold text-stone-700">Start time</span>
          <input
            type="time"
            value={startTime}
            onChange={(event) => onStartTimeChange(event.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />
        </label>

        <label>
          <span className="mb-1.5 block text-sm font-bold text-stone-700">Duration (hours)</span>
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={hours}
            onChange={(event) => onHoursChange(Number(event.target.value))}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />
        </label>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-2xl bg-stone-900 px-5 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-violet-700"
          >
            Add to schedule
          </button>
        </div>
      </form>
    </div>
  )
}

type ActivityCardProps = {
  activity: Activity
  onToggleComplete: (id: string) => void
  onFeedPet: (activity: Activity) => void
  onRemove: (id: string) => void
}

function ActivityCard({ activity, onToggleComplete, onFeedPet, onRemove }: ActivityCardProps) {
  const earnedXp = Math.round(activity.hours * XP_PER_HOUR)

  return (
    <article
      key={activity.id}
      className={`rounded-2xl border p-4 transition ${
        activity.completed ? 'border-emerald-200 bg-emerald-50/80' : 'border-stone-200 bg-white'
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`font-black ${activity.completed ? 'text-stone-500 line-through' : 'text-stone-900'}`}>
              {activity.title}
            </h3>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-800">
              +{earnedXp} XP
            </span>
          </div>
          <p className="mt-1 text-sm text-stone-500">
            {activity.date} at {activity.startTime} · {activity.hours} hour{activity.hours === 1 ? '' : 's'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onToggleComplete(activity.id)}
            className="rounded-xl border border-stone-200 px-3 py-2 text-sm font-bold text-stone-700 hover:bg-stone-100"
          >
            {activity.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => onFeedPet(activity)}
            disabled={!activity.completed || activity.xpClaimed}
            className="rounded-xl bg-violet-600 px-3 py-2 text-sm font-black text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {activity.xpClaimed ? 'Fed ✓' : 'Feed XP'}
          </button>
          <button
            onClick={() => onRemove(activity.id)}
            className="rounded-xl px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

type ActivityListProps = {
  activities: Activity[]
  onToggleComplete: (id: string) => void
  onFeedPet: (activity: Activity) => void
  onRemove: (id: string) => void
}

function ActivityList({ activities, onToggleComplete, onFeedPet, onRemove }: ActivityListProps) {
  return (
    <div className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-lg shadow-stone-200/40 backdrop-blur">
      <div className="mb-5">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Your day</p>
        <h2 className="text-2xl font-black text-stone-900">Scheduled activities</h2>
      </div>

      <div className="space-y-3">
        {activities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
            No activities yet. Your pet is staring at you with financially motivated concern.
          </div>
        ) : (
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onToggleComplete={onToggleComplete}
              onFeedPet={onFeedPet}
              onRemove={onRemove}
            />
          ))
        )}
      </div>
    </div>
  )
}

type CompanionCardProps = {
  pet: PetDefinition
  xp: number
  stage: number
  form: PetForm
  nextEvolutionXp: number | null
  progressPercent: number
}

function CompanionCard({ pet, xp, stage, form, nextEvolutionXp, progressPercent }: CompanionCardProps) {
  return (
    <div className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${pet.accent} p-6 shadow-xl shadow-stone-200/50`}>
      <div className="rounded-[1.5rem] bg-white/75 p-6 text-center backdrop-blur">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-stone-500">Your companion</p>
        <div
          className={`pet-float mx-auto my-6 flex h-48 w-48 items-center justify-center rounded-full border-8 border-white/80 ${form.aura} text-center shadow-xl ${
            stage === 3 ? 'mystical-glow scale-110' : stage === 2 ? 'scale-105' : ''
          }`}
        >
          <span className={`${stage === 1 ? 'text-8xl' : stage === 2 ? 'text-6xl' : 'text-5xl'} leading-none`}>
            {form.visual}
          </span>
        </div>
        <h2 className="text-3xl font-black text-stone-900">{pet.name}</h2>
        <p className="mt-1 font-black text-violet-700">
          Stage {stage}: {form.name}
        </p>
        <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-stone-500">{form.subtitle}</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-stone-600">{pet.description}</p>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-xs font-black uppercase tracking-wider text-stone-500">
            <span>{xp} XP</span>
            <span>{nextEvolutionXp ? `Next evolution: ${nextEvolutionXp} XP` : 'Max evolution!'}</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-white/80 shadow-inner">
            <div className="h-full rounded-full bg-violet-600 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="mt-2 text-xs text-stone-500">Evolves at 100 XP and again at 200 XP.</p>
        </div>
      </div>
    </div>
  )
}

type PetSelectorProps = {
  selectedPet: PetKind
  onSelectPet: (petKind: PetKind) => void
}

function PetSelector({ selectedPet, onSelectPet }: PetSelectorProps) {
  return (
    <div className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-lg shadow-stone-200/40 backdrop-blur">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-600">Pet selector</p>
      <h2 className="mb-4 text-2xl font-black text-stone-900">Choose your pet</h2>

      <div className="grid grid-cols-2 gap-3">
        {PETS.map((candidate) => (
          <button
            key={candidate.kind}
            onClick={() => onSelectPet(candidate.kind)}
            className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
              selectedPet === candidate.kind
                ? 'border-violet-500 bg-violet-50 ring-4 ring-violet-100'
                : 'border-stone-200 bg-white hover:border-violet-300'
            }`}
          >
            <div className="text-4xl">{candidate.selectorEmoji}</div>
            <div className="mt-2 text-sm font-black text-stone-900">{candidate.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function RulesPanel() {
  return (
    <div className="rounded-[2rem] bg-stone-900 p-6 text-white shadow-xl">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">Game rules</p>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-300">
        <li>• Complete an activity before its XP can be fed.</li>
        <li>• Every hour is worth 10 XP. A 2.5-hour activity earns 25 XP.</li>
        <li>• Your pet evolves from Baby → Adult at 100 XP, then Adult → Mystical at 200 XP.</li>
        <li>• Your schedule, pet, and XP are saved in browser local storage.</li>
      </ul>
    </div>
  )
}

export default function App() {
  const initialState = useMemo(loadState, [])
  const [selectedPet, setSelectedPet] = useState<PetKind>(initialState.selectedPet)
  const [xp, setXp] = useState(initialState.xp)
  const [activities, setActivities] = useState<Activity[]>(initialState.activities)

  const [title, setTitle] = useState('')
  const [date, setDate] = useState(TODAY)
  const [startTime, setStartTime] = useState('16:00')
  const [hours, setHours] = useState(1)

  useEffect(() => {
    const state: SavedState = { selectedPet, xp, activities }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [selectedPet, xp, activities])

  const pet = PETS.find((candidate) => candidate.kind === selectedPet) ?? PETS[0]
  const stage = getEvolutionStage(xp)
  const nextEvolutionXp = getNextEvolutionXp(xp)
  const form = pet.forms[stage - 1]
  const progressPercent = getProgressPercent(xp)

  const sortedActivities = useMemo(
    () =>
      [...activities].sort((a, b) =>
        `${a.date}-${a.startTime}`.localeCompare(`${b.date}-${b.startTime}`),
      ),
    [activities],
  )

  function addActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim() || hours <= 0) return

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
    setTitle('')
    setHours(1)
  }

  function toggleComplete(id: string) {
    setActivities((current) =>
      current.map((activity) =>
        activity.id === id ? { ...activity, completed: !activity.completed } : activity,
      ),
    )
  }

  function feedPet(activity: Activity) {
    if (!activity.completed || activity.xpClaimed) return

    const earnedXp = Math.round(activity.hours * XP_PER_HOUR)
    setXp((current) => current + earnedXp)
    setActivities((current) =>
      current.map((item) => (item.id === activity.id ? { ...item, xpClaimed: true } : item)),
    )
  }

  function removeActivity(id: string) {
    setActivities((current) => current.filter((activity) => activity.id !== id))
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AppHeader xp={xp} />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <ActivityForm
              title={title}
              date={date}
              startTime={startTime}
              hours={hours}
              onTitleChange={setTitle}
              onDateChange={setDate}
              onStartTimeChange={setStartTime}
              onHoursChange={setHours}
              onSubmit={addActivity}
            />

            <ActivityList
              activities={sortedActivities}
              onToggleComplete={toggleComplete}
              onFeedPet={feedPet}
              onRemove={removeActivity}
            />
          </section>

          <aside className="space-y-6">
            <CompanionCard
              pet={pet}
              xp={xp}
              stage={stage}
              form={form}
              nextEvolutionXp={nextEvolutionXp}
              progressPercent={progressPercent}
            />

            <PetSelector selectedPet={selectedPet} onSelectPet={setSelectedPet} />
            <RulesPanel />
          </aside>
        </div>
      </div>
    </main>
  )
}
