import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

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

const users = new Hono()

users.use('/*', async (c, next) => {
  await next()
  if (c.res.status === 401) {
    return c.json({ message: 'Unauthorized.' }, 401)
  }
})
users.use('/*', basicAuth({ username: 'user', password: 'pass' }))

users.put('/:user_id', async (c) => {
  const { user_id } = c.req.param()
  const { password } = await c.req.json()

  console.log({ user_id, password })

  return c.json({ message: 'Success.' })
})

users.delete('/:user_id', (c) => {
  return c.json({ message: 'Success.' })
})

v1.route('/users', users)
app.route('/v1', v1)

export default app
