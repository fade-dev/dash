import guildsSchema from '@schemas/guilds.schema'
import mongoConnect from '@util/mongo-connect'

const GET = async (req, res) => {
  const { ids } = req.query

  if (!ids) {
    res.status(400).json({ error: 'No guild IDs provided!' })
    return
  }

  await mongoConnect()

  const guilds = await guildsSchema.find({ _id: { $in: ids.split(',') } })

  res.status(200).json(guilds.map((guild) => guild._id))
}

export default async (req, res) => {
  if (req.method === 'GET') {
    await GET(req, res)
  } else {
    res.status(405).end()
  }
}
