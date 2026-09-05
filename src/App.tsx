import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { api, type Task } from './api'
import './App.css'

type Filter = 'all' | 'active' | 'done'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api
      .list()
      .then(setTasks)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const remaining = useMemo(() => tasks.filter((t) => !t.done).length, [tasks])
  const visible = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.done)
    if (filter === 'done') return tasks.filter((t) => t.done)
    return tasks
  }, [tasks, filter])

  async function addTask(e: FormEvent) {
    e.preventDefault()
    const value = title.trim()
    if (!value) return
    try {
      const created = await api.create(value)
      setTasks((prev) => [created, ...prev])
      setTitle('')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  async function toggle(task: Task) {
    try {
      const updated = await api.toggle(task.id, !task.done)
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    } catch (err) {
      setError((err as Error).message)
    }
  }

  async function remove(task: Task) {
    try {
      await api.remove(task.id)
      setTasks((prev) => prev.filter((t) => t.id !== task.id))
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="app">
      <div className="card">
        <header className="header">
          <div className="brand">
            <span className="logo" aria-hidden />
            <h1>TaskFlow</h1>
          </div>
          <p className="subtitle">
            {remaining === 0
              ? 'All caught up — nice work!'
              : `${remaining} task${remaining === 1 ? '' : 's'} to go`}
          </p>
        </header>

        <form className="composer" onSubmit={addTask}>
          <input
            className="input"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="New task title"
          />
          <button className="btn primary" type="submit" disabled={!title.trim()}>
            Add
          </button>
        </form>

        <div className="filters" role="tablist" aria-label="Filter tasks">
          {(['all', 'active', 'done'] as Filter[]).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`chip ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="empty">Loading…</div>
        ) : visible.length === 0 ? (
          <div className="empty">Nothing here yet.</div>
        ) : (
          <ul className="list">
            {visible.map((task) => (
              <li key={task.id} className={`item ${task.done ? 'done' : ''}`}>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggle(task)}
                  />
                  <span className="checkmark" aria-hidden />
                  <span className="title">{task.title}</span>
                </label>
                <button
                  className="btn ghost"
                  onClick={() => remove(task)}
                  aria-label={`Delete ${task.title}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <footer className="foot">Vite + React + TypeScript · Express API</footer>
    </div>
  )
}
