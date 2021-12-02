import mongoose from 'mongoose'

const Connection = mongoose.createConnection(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/casper`,
  {
    authSource: process.env.DB_AUTH_SOURCE,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

export default Connection
