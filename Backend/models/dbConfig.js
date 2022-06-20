const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGO_DB,
  { useNewUrlParser : true , useUnifiedTopology: true },
  (err) => {
    if(!err) console.log('mongoDB connected')
    else console.log(" Connection error :", err)
  }
)