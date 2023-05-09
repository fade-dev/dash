import { Schema, models, model } from 'mongoose'

const reqString = {
  type: String,
  required: true,
}

const guildSchema = new Schema({
  // Discord guild ID
  _id: reqString,
})

const name = 'guilds'
export default models[name] || model(name, guildSchema)
