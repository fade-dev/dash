import mongoConnect from '@util/mongo-connect'
import statusesSchema from '@schemas/statuses.schema'

const GET = async (req, res) => {
  await mongoConnect()

  const statuses = await statusesSchema.find({})
  res.status(200).json({ statuses })
}

const POST = async (req, res) => {
  const { id, text, duration, activityType } = req.query

  if (!text || !duration) {
    return res.status(400).json({
      error: 'Please provide "text" and "duration" fields.',
    })
  }

  await mongoConnect()

  if (id) {
    await statusesSchema.updateOne(
      { _id: id },
      { text, duration, activityType }
    )

    res.status(200).json({ id })
  } else {
    const item = await new statusesSchema({
      text,
      duration,
      activityType,
    }).save()

    res.status(200).json({ id: item._id })
  }
}

const DELETE = async (req, res) => {
  const { id } = req.query

  await mongoConnect()

  await statusesSchema.deleteOne({ _id: id })

  res.status(200).json({ id })
}

const statuses = async (req, res) => {
  if (req.method === 'GET') {
    await GET(req, res)
  } else if (req.method === 'POST') {
    await POST(req, res)
  } else if (req.method === 'DELETE') {
    await DELETE(req, res)
  } else {
    res.status(405).end()
  }
}
export default statuses;
