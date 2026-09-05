export interface Task {
  id: string
  title: string
  done: boolean
  createdAt: string
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(body?.error ?? `Request failed with status ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const api = {
  list: () => fetch('/api/tasks').then((r) => handle<Task[]>(r)),
  create: (title: string) =>
    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    }).then((r) => handle<Task>(r)),
  toggle: (id: string, done: boolean) =>
    fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done }),
    }).then((r) => handle<Task>(r)),
  remove: (id: string) =>
    fetch(`/api/tasks/${id}`, { method: 'DELETE' }).then((r) => handle<Task>(r)),
}
