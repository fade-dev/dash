import mongoose from 'mongoose'

let cached

const mongoConnect = async () => {
  if (cached) {
    return cached
  }

  return await new Promise((resolve) => {
    mongoose.connect(process.env.MONGO_URI).then((mongoose) => {
      cached = mongoose
      resolve(cached)
    })
  })
}

export default mongoConnect
