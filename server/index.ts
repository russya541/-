import express, { type Request, type Response } from 'express'
import { randomUUID } from 'node:crypto'

export interface Task {
  id: string
  title: string
  done: boolean
  createdAt: string
}

const PORT = Number(process.env.PORT ?? 3001)

// In-memory store. Good enough for a demo/dev environment; swap for a real
// database when persistence is needed.
const tasks: Task[] = [
  {
    id: randomUUID(),
    title: 'Welcome to TaskFlow — try adding a task!',
    done: false,
    createdAt: new Date().toISOString(),
  },
]

const app = express()
app.use(express.json())

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

app.get('/api/tasks', (_req: Request, res: Response) => {
  res.json(tasks)
})

app.post('/api/tasks', (req: Request, res: Response) => {
  const title = typeof req.body?.title === 'string' ? req.body.title.trim() : ''
  if (!title) {
    res.status(400).json({ error: 'Title is required' })
    return
  }
  const task: Task = {
    id: randomUUID(),
    title,
    done: false,
    createdAt: new Date().toISOString(),
  }
  tasks.unshift(task)
  res.status(201).json(task)
})

app.patch('/api/tasks/:id', (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id)
  if (!task) {
    res.status(404).json({ error: 'Task not found' })
    return
  }
  if (typeof req.body?.done === 'boolean') task.done = req.body.done
  if (typeof req.body?.title === 'string' && req.body.title.trim()) {
    task.title = req.body.title.trim()
  }
  res.json(task)
})

app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  const index = tasks.findIndex((t) => t.id === req.params.id)
  if (index === -1) {
    res.status(404).json({ error: 'Task not found' })
    return
  }
  const [removed] = tasks.splice(index, 1)
  res.json(removed)
})

app.listen(PORT, () => {
  console.log(`[server] TaskFlow API listening on http://localhost:${PORT}`)
})
