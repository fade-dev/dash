import axios from 'axios'
import mongoConnect from '@util/mongo-connect'
import buttonRoleSchema from '@schemas/button-role.schema'

const buttonRoles = async (req, res) => {
  const { guildId } = req.query

  if (!guildId) {
    return res.status(400).json({
      error: 'Please provide a "guildId" parameter.',
    })
  }

  await mongoConnect()

  const channelResult = await axios({
    url: `https://discord.com/api/v10/guilds/${guildId}/channels`,
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
  }).catch((err) => {
    console.error(err)
  })

  if (!channelResult) {
    res
      .status(400)
      .json({ error: 'Failed to fetch Discord channels from the API' })
    return
  }

  const roleResult = await axios({
    url: `https://discord.com/api/v10/guilds/${guildId}/roles`,
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
  }).catch((err) => {
    console.error(err)
  })

  if (!roleResult) {
    res
      .status(400)
      .json({ error: 'Failed to fetch Discord roles from the API' })
    return
  }

  const item = await buttonRoleSchema.findById(guildId)
  const textChannels = channelResult.data.filter(
    (channel) => channel.type === 0
  )
  const roles = roleResult.data.filter((role) => role.id !== guildId)

  const currentData = item?._doc || {
    text: '',
    channelId: '',
    hexColor: 'Random',
    buttons: [],
  }

  res.status(200).json({
    ...currentData,
    textChannels,
    roles,
  })
}

export default buttonRoles;