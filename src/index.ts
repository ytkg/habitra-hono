import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.html("Hello, HabiTra!\n"))

app.notFound((c) => {
  return c.json({ message: '404 Not Found.' })
})

app.onError((err, c) => {
  console.error(err)
  return c.json({ message: 'Whoops!' })
})

export default app
