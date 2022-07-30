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

const v1 = new Hono()

type CreateUserParams = {
  id: string
  password: string
}

v1.post('/users', async (c) => {
  const createUserParams = await c.req.json<CreateUserParams>()

  console.log(createUserParams)

  return c.json({ message: 'Success.' })
})

app.route('/v1', v1)

export default app
