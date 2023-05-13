import { Schema, model, models } from 'mongoose'

const reqString = {
  type: String,
  required: true,
}

const statusesSchema = new Schema({
  text: reqString,
  duration: reqString,
  activityType: {
    type: String,
    default: 'Playing',
  },
})

const name = 'statuses'
export default models[name] || model(name, statusesSchema)
