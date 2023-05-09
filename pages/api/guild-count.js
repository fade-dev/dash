import guildsSchema from '@schemas/guilds.schema'
import mongoConnect from '@util/mongo-connect'

const GET = async (req, res) => {
  await mongoConnect()

  const guilds = await guildsSchema.find()

  res.status(200).json({
    amount: guilds.length,
  })
}

export default async (req, res) => {
  if (req.method === 'GET') {
    await GET(req, res)
  } else {
    res.status(405).end()
  }
}
