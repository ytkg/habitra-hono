import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.html("Hello, HabiTra!\n"))

export default app
