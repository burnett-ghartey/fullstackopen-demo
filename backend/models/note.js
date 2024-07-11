const mongoose = require('mongoose')




const url = process.env.MONGODB_URL


mongoose.set('strictQuery',false)
mongoose.connect(url).then(result => {
    console.log('Connected to mongodb')
}).catch(error => {
    console.log('error connecting to mongodb', error.message)
})

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)