import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.html("Hello, HabiTra!\n"))

app.notFound((c) => {
  return c.json({ message: '404 Not Found.' }, 404)
})

app.onError((err, c) => {
  console.error(err)
  return c.json({ message: 'Whoops!' }, 500)
})

const v1 = new Hono()

v1.post('/users', async (c) => {
  const { id, password } = await c.req.json()

  console.log({ id, password })

  return c.json({ message: 'Success.' })
})

app.route('/v1', v1)

export default app
